#!/usr/bin/env node
'use strict';

const path = require('path');

const target =
  process.argv[2] ||
  path.join(__dirname, '..', 'data', 'event_trees.js');

global.window = {};

try {
  require(target);
} catch (err) {
  console.error(`Failed to load ${target}:`, err && err.message ? err.message : err);
  process.exit(1);
}

const trees = global.window.randomEventTrees;
if (!trees || typeof trees !== 'object') {
  console.error(`No randomEventTrees found after loading ${target}.`);
  process.exit(1);
}

function isInt(value) {
  return Number.isInteger(value);
}

function formatRangeList(ranges) {
  return ranges.map(([min, max]) => (min === max ? `${min}` : `${min}-${max}`)).join(', ');
}

const report = [];
const summary = {
  totalTrees: 0,
  treesWithIssues: 0,
  totalIssues: 0
};

for (const [key, tree] of Object.entries(trees)) {
  summary.totalTrees += 1;
  const steps = Array.isArray(tree.steps) ? tree.steps : [];
  const stepCount = steps.length;
  const issues = [];

  if (!stepCount) {
    issues.push('No steps found.');
    report.push({ key, issues });
    summary.treesWithIssues += 1;
    summary.totalIssues += issues.length;
    continue;
  }

  const edges = new Map();
  const explicitTerminalSteps = new Set();
  const optionIssues = [];
  const rngIssues = [];
  const rollIssues = [];
  const invalidNextSteps = [];
  const stepsWithNoOptions = [];

  steps.forEach((step, stepIndex) => {
    const options = Array.isArray(step && step.options) ? step.options : [];
    if (!options.length) {
      stepsWithNoOptions.push(stepIndex);
      if (stepIndex + 1 < stepCount) {
        edges.set(stepIndex, new Set([stepIndex + 1]));
      } else {
        edges.set(stepIndex, new Set());
      }
      return;
    }

    const edgeSet = new Set();
    options.forEach((opt, optIndex) => {
      let hasResult = false;

      if (opt && opt.fixed) {
        hasResult = true;
        const nextStep = opt.fixed.nextStep;
        if (nextStep == null) {
          explicitTerminalSteps.add(stepIndex);
        } else if (!isInt(nextStep) || nextStep < 0 || nextStep >= stepCount) {
          invalidNextSteps.push({
            step: stepIndex,
            option: opt.label || `Option ${optIndex + 1}`,
            nextStep
          });
        } else {
          edgeSet.add(nextStep);
        }
      }

      if (opt && opt.rng) {
        hasResult = true;
        if (!Array.isArray(opt.rng)) {
          rngIssues.push({
            step: stepIndex,
            option: opt.label || `Option ${optIndex + 1}`,
            issue: 'rng is not an array'
          });
        } else {
          const ranges = opt.rng.map((r) => ({
            min: r && typeof r.min === 'number' ? r.min : 1,
            max: r && typeof r.max === 'number' ? r.max : 100
          }));

          ranges.forEach((range) => {
            if (range.min > range.max) {
              rngIssues.push({
                step: stepIndex,
                option: opt.label || `Option ${optIndex + 1}`,
                issue: `rng range has min > max (${range.min} > ${range.max})`
              });
            }
          });

          const sorted = ranges
            .map((range) => ({ min: range.min, max: range.max }))
            .sort((a, b) => (a.min - b.min) || (a.max - b.max));
          let lastMax = 0;
          const gaps = [];
          let hasOverlap = false;

          sorted.forEach((range) => {
            if (range.min <= lastMax) {
              hasOverlap = true;
            }
            if (range.min > lastMax + 1) {
              gaps.push([lastMax + 1, range.min - 1]);
            }
            lastMax = Math.max(lastMax, range.max);
          });
          if (lastMax < 100) gaps.push([lastMax + 1, 100]);

          if (gaps.length) {
            rngIssues.push({
              step: stepIndex,
              option: opt.label || `Option ${optIndex + 1}`,
              issue: `rng gaps: ${formatRangeList(gaps)}`
            });
          }
          if (hasOverlap) {
            rngIssues.push({
              step: stepIndex,
              option: opt.label || `Option ${optIndex + 1}`,
              issue: 'rng overlaps detected'
            });
          }

          opt.rng.forEach((entry) => {
            const result = entry && entry.result ? entry.result : entry;
            const nextStep = result ? result.nextStep : undefined;
            if (nextStep == null) {
              explicitTerminalSteps.add(stepIndex);
            } else if (!isInt(nextStep) || nextStep < 0 || nextStep >= stepCount) {
              invalidNextSteps.push({
                step: stepIndex,
                option: opt.label || `Option ${optIndex + 1}`,
                nextStep
              });
            } else {
              edgeSet.add(nextStep);
            }
          });
        }
      }

      if (opt && opt.roll) {
        hasResult = true;
        const rollSpec = opt.roll || {};
        const rollSides = isInt(rollSpec.sides) && rollSpec.sides > 0 ? rollSpec.sides : 100;
        const outcomes = Array.isArray(rollSpec.outcomes)
          ? rollSpec.outcomes
          : (Array.isArray(rollSpec.rng) ? rollSpec.rng : null);
        if (!Array.isArray(outcomes)) {
          rollIssues.push({
            step: stepIndex,
            option: opt.label || `Option ${optIndex + 1}`,
            issue: 'roll outcomes is not an array'
          });
        } else {
          const ranges = outcomes.map((r) => ({
            min: r && typeof r.min === 'number' ? r.min : 1,
            max: r && typeof r.max === 'number' ? r.max : rollSides
          }));

          ranges.forEach((range) => {
            if (range.min > range.max) {
              rollIssues.push({
                step: stepIndex,
                option: opt.label || `Option ${optIndex + 1}`,
                issue: `roll range has min > max (${range.min} > ${range.max})`
              });
            }
          });

          const sorted = ranges
            .map((range) => ({ min: range.min, max: range.max }))
            .sort((a, b) => (a.min - b.min) || (a.max - b.max));
          let lastMax = 0;
          const gaps = [];
          let hasOverlap = false;

          sorted.forEach((range) => {
            if (range.min <= lastMax) {
              hasOverlap = true;
            }
            if (range.min > lastMax + 1) {
              gaps.push([lastMax + 1, range.min - 1]);
            }
            lastMax = Math.max(lastMax, range.max);
          });
          if (lastMax < rollSides) gaps.push([lastMax + 1, rollSides]);

          if (gaps.length) {
            rollIssues.push({
              step: stepIndex,
              option: opt.label || `Option ${optIndex + 1}`,
              issue: `roll gaps: ${formatRangeList(gaps)}`
            });
          }
          if (hasOverlap) {
            rollIssues.push({
              step: stepIndex,
              option: opt.label || `Option ${optIndex + 1}`,
              issue: 'roll overlaps detected'
            });
          }

          outcomes.forEach((entry) => {
            const result = entry && entry.result ? entry.result : entry;
            const nextStep = result ? result.nextStep : undefined;
            if (nextStep == null) {
              explicitTerminalSteps.add(stepIndex);
            } else if (!isInt(nextStep) || nextStep < 0 || nextStep >= stepCount) {
              invalidNextSteps.push({
                step: stepIndex,
                option: opt.label || `Option ${optIndex + 1}`,
                nextStep
              });
            } else {
              edgeSet.add(nextStep);
            }
          });
        }
      }

      if (!hasResult) {
        optionIssues.push({
          step: stepIndex,
          option: opt.label || `Option ${optIndex + 1}`,
          issue: 'No fixed or rng result'
        });
      }
    });

    edges.set(stepIndex, edgeSet);
  });

  const reachable = new Set();
  const queue = [];
  reachable.add(0);
  queue.push(0);

  while (queue.length) {
    const idx = queue.shift();
    const nextSet = edges.get(idx);
    if (!nextSet) continue;
    for (const nextIdx of nextSet) {
      if (!reachable.has(nextIdx)) {
        reachable.add(nextIdx);
        queue.push(nextIdx);
      }
    }
  }

  const unreachableSteps = [];
  for (let i = 0; i < stepCount; i += 1) {
    if (!reachable.has(i)) unreachableSteps.push(i);
  }

  const lastIdx = stepCount - 1;
  const lastStep = steps[lastIdx];
  const lastHasNoOptions = !lastStep || !Array.isArray(lastStep.options) || lastStep.options.length === 0;
  const reachableExplicitTerminal = [...explicitTerminalSteps].some((idx) => reachable.has(idx));
  const reachableImplicitTerminal = lastHasNoOptions && reachable.has(lastIdx);
  const hasTermination = reachableExplicitTerminal || reachableImplicitTerminal;

  if (invalidNextSteps.length) {
    invalidNextSteps.forEach((item) => {
      issues.push(`Invalid nextStep at step ${item.step} (${item.option}): ${item.nextStep}`);
    });
  }
  if (optionIssues.length) {
    optionIssues.forEach((item) => {
      issues.push(`Missing result at step ${item.step} (${item.option}).`);
    });
  }
  if (rngIssues.length) {
    rngIssues.forEach((item) => {
      issues.push(`RNG issue at step ${item.step} (${item.option}): ${item.issue}`);
    });
  }
  if (rollIssues.length) {
    rollIssues.forEach((item) => {
      issues.push(`Roll issue at step ${item.step} (${item.option}): ${item.issue}`);
    });
  }
  if (unreachableSteps.length) {
    issues.push(`Unreachable steps: ${unreachableSteps.join(', ')}`);
  }
  if (!hasTermination) {
    issues.push('No reachable termination path detected.');
  }
  if (stepsWithNoOptions.length) {
    issues.push(`Steps without options: ${stepsWithNoOptions.join(', ')}`);
  }

  if (issues.length) {
    report.push({ key, issues });
    summary.treesWithIssues += 1;
    summary.totalIssues += issues.length;
  }
}

if (!report.length) {
  console.log(`No structural issues found in ${summary.totalTrees} tree(s) from ${target}.`);
  process.exit(0);
}

console.log(`Event tree audit for ${target}`);
report.forEach((item) => {
  console.log(`\n${item.key}`);
  item.issues.forEach((issue) => {
    console.log(`- ${issue}`);
  });
});

console.log(`\nSummary: ${summary.treesWithIssues}/${summary.totalTrees} tree(s) with issues; ${summary.totalIssues} issue(s) total.`);
process.exit(1);
