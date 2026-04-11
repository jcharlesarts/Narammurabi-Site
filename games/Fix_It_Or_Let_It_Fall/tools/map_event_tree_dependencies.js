#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const target =
  args.find((arg) => arg.endsWith('.js')) ||
  path.join(__dirname, '..', 'data', 'event_trees.js');

let outPath = null;
for (let i = 0; i < args.length; i += 1) {
  if (args[i] === '--out' && args[i + 1]) {
    outPath = args[i + 1];
    i += 1;
  }
}

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

function addAll(set, items) {
  items.forEach((item) => set.add(item));
}

function parseList(value) {
  if (!value) return [];
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }
  return String(value)
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function collectLootTable(table, produced) {
  if (!table) return;
  const entries = Array.isArray(table)
    ? table
    : (table && Array.isArray(table.entries) ? table.entries : []);
  if (!entries.length) return;
  entries.forEach((entry) => {
    if (!entry) return;
    const item = entry.item != null ? entry.item : entry.loot;
    addAll(produced.loot, parseList(item));
  });
}

function collectResult(res, produced) {
  if (!res) return;
  addAll(produced.loot, parseList(res.loot));
  addAll(produced.badges, parseList(res.badge));
  collectLootTable(res.lootTable, produced);
}

function collectCondition(cond, acc, negate) {
  if (!cond) return;
  if (typeof cond === 'boolean' || typeof cond === 'function') return;
  if (Array.isArray(cond)) {
    cond.forEach((entry) => collectCondition(entry, acc, negate));
    return;
  }
  if (typeof cond !== 'object') return;

  if (cond.any) {
    cond.any.forEach((entry) => collectCondition(entry, acc, negate));
    return;
  }
  if (cond.all) {
    cond.all.forEach((entry) => collectCondition(entry, acc, negate));
    return;
  }
  if (cond.not) {
    collectCondition(cond.not, acc, !negate);
    return;
  }

  const loot = [
    ...parseList(cond.loot),
    ...parseList(cond.anyLoot),
    ...parseList(cond.allLoot)
  ];
  const badges = [
    ...parseList(cond.badge),
    ...parseList(cond.anyBadges),
    ...parseList(cond.allBadges)
  ];

  if (loot.length) addAll(negate ? acc.notLoot : acc.loot, loot);
  if (badges.length) addAll(negate ? acc.notBadges : acc.badges, badges);
}

function collectResults(opt, produced) {
  if (opt.fixed) {
    collectResult(opt.fixed, produced);
  }
  if (Array.isArray(opt.rng)) {
    opt.rng.forEach((entry) => {
      const res = entry && entry.result ? entry.result : entry;
      collectResult(res, produced);
    });
  }
  if (opt.roll) {
    const rollSpec = opt.roll || {};
    const outcomes = Array.isArray(rollSpec.outcomes)
      ? rollSpec.outcomes
      : (Array.isArray(rollSpec.rng) ? rollSpec.rng : []);
    outcomes.forEach((entry) => {
      const res = entry && entry.result ? entry.result : entry;
      collectResult(res, produced);
    });
  }
}

const report = {
  generatedAt: new Date().toISOString(),
  target,
  totals: {
    trees: 0,
    producedLoot: 0,
    producedBadges: 0,
    requiredLoot: 0,
    requiredBadges: 0,
    notLoot: 0,
    notBadges: 0
  },
  trees: {}
};

const allProducedLoot = new Set();
const allProducedBadges = new Set();
const allRequiredLoot = new Set();
const allRequiredBadges = new Set();
const allNotLoot = new Set();
const allNotBadges = new Set();

for (const [key, tree] of Object.entries(trees)) {
  const produced = { loot: new Set(), badges: new Set() };
  const required = { loot: new Set(), badges: new Set(), notLoot: new Set(), notBadges: new Set() };

  report.totals.trees += 1;

  if (tree && tree.meta && tree.meta.requires) {
    collectCondition(tree.meta.requires, required, false);
  }

  (tree.steps || []).forEach((step) => {
    if (step && step.condition) collectCondition(step.condition, required, false);
    (step.options || []).forEach((opt) => {
      if (opt && opt.condition) collectCondition(opt.condition, required, false);
      collectResults(opt, produced);
    });
  });

  addAll(allProducedLoot, produced.loot);
  addAll(allProducedBadges, produced.badges);
  addAll(allRequiredLoot, required.loot);
  addAll(allRequiredBadges, required.badges);
  addAll(allNotLoot, required.notLoot);
  addAll(allNotBadges, required.notBadges);

  report.trees[key] = {
    producedLoot: Array.from(produced.loot).sort(),
    producedBadges: Array.from(produced.badges).sort(),
    requiredLoot: Array.from(required.loot).sort(),
    requiredBadges: Array.from(required.badges).sort(),
    notLoot: Array.from(required.notLoot).sort(),
    notBadges: Array.from(required.notBadges).sort()
  };
}

const producedLoot = Array.from(allProducedLoot).sort();
const producedBadges = Array.from(allProducedBadges).sort();
const requiredLoot = Array.from(allRequiredLoot).sort();
const requiredBadges = Array.from(allRequiredBadges).sort();
const notLoot = Array.from(allNotLoot).sort();
const notBadges = Array.from(allNotBadges).sort();

report.totals.producedLoot = producedLoot.length;
report.totals.producedBadges = producedBadges.length;
report.totals.requiredLoot = requiredLoot.length;
report.totals.requiredBadges = requiredBadges.length;
report.totals.notLoot = notLoot.length;
report.totals.notBadges = notBadges.length;

report.orphans = {
  producedLootOnly: producedLoot.filter((item) => !allRequiredLoot.has(item)),
  requiredLootOnly: requiredLoot.filter((item) => !allProducedLoot.has(item)),
  producedBadgesOnly: producedBadges.filter((item) => !allRequiredBadges.has(item)),
  requiredBadgesOnly: requiredBadges.filter((item) => !allProducedBadges.has(item))
};

if (outPath) {
  try {
    fs.writeFileSync(outPath, JSON.stringify(report, null, 2) + '\n', 'utf8');
  } catch (err) {
    console.error(`Failed to write ${outPath}:`, err && err.message ? err.message : err);
    process.exit(1);
  }
}

console.log(`Event tree dependency map for ${target}`);
console.log(`- Trees: ${report.totals.trees}`);
console.log(`- Produced loot: ${report.totals.producedLoot}`);
console.log(`- Produced badges: ${report.totals.producedBadges}`);
console.log(`- Required loot: ${report.totals.requiredLoot}`);
console.log(`- Required badges: ${report.totals.requiredBadges}`);

if (report.orphans.producedLootOnly.length) {
  console.log(`\nProduced loot never required (${report.orphans.producedLootOnly.length}):`);
  console.log(report.orphans.producedLootOnly.join(', '));
}
if (report.orphans.requiredLootOnly.length) {
  console.log(`\nRequired loot never produced (${report.orphans.requiredLootOnly.length}):`);
  console.log(report.orphans.requiredLootOnly.join(', '));
}
if (report.orphans.producedBadgesOnly.length) {
  console.log(`\nProduced badges never required (${report.orphans.producedBadgesOnly.length}):`);
  console.log(report.orphans.producedBadgesOnly.join(', '));
}
if (report.orphans.requiredBadgesOnly.length) {
  console.log(`\nRequired badges never produced (${report.orphans.requiredBadgesOnly.length}):`);
  console.log(report.orphans.requiredBadgesOnly.join(', '));
}
