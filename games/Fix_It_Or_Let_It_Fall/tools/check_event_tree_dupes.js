#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const target =
  process.argv[2] ||
  path.join(__dirname, '..', 'data', 'event_trees.js');

const source = fs.readFileSync(target, 'utf8');
const lines = source.split(/\r?\n/);

const patterns = {
  text: /\btext:\s*(["'])(.*?)\1/g,
  cameo: /\bcameo:\s*(["'])(.*?)\1/g,
  label: /\blabel:\s*(["'])(.*?)\1/g,
  continueLabel: /\bcontinueLabel:\s*(["'])(.*?)\1/g
};

const minLen = {
  text: 60,
  cameo: 40,
  label: 30,
  continueLabel: 10
};

const maps = {
  text: new Map(),
  cameo: new Map(),
  label: new Map(),
  continueLabel: new Map()
};

function add(map, str, loc) {
  const key = str.trim();
  if (!key) return;
  const list = map.get(key);
  if (list) list.push(loc);
  else map.set(key, [loc]);
}

lines.forEach((line, index) => {
  const lineNum = index + 1;
  for (const [key, regex] of Object.entries(patterns)) {
    regex.lastIndex = 0;
    let match;
    while ((match = regex.exec(line)) !== null) {
      add(maps[key], match[2], `L${lineNum}`);
    }
  }
});

function collect(map, min) {
  const out = [];
  for (const [str, locs] of map.entries()) {
    if (locs.length > 1 && str.length >= min) {
      out.push({ str, locs });
    }
  }
  out.sort((a, b) => b.locs.length - a.locs.length || b.str.length - a.str.length);
  return out;
}

function short(str, max = 120) {
  const oneLine = str.replace(/\s+/g, ' ').trim();
  return oneLine.length > max ? oneLine.slice(0, max - 3) + '...' : oneLine;
}

let total = 0;
for (const key of Object.keys(patterns)) {
  const items = collect(maps[key], minLen[key]);
  if (!items.length) continue;
  total += items.length;
  console.log(`\n${key.toUpperCase()} DUPES (${items.length})`);
  items.forEach((item) => {
    console.log(`- [${item.locs.length}] ${short(item.str)}`);
    console.log(`  ${item.locs.join(' | ')}`);
  });
}

if (total) {
  console.error(`\nFound ${total} duplicate string group(s) in ${target}.`);
  process.exit(1);
}

console.log(`\nNo duplicate string groups found in ${target}.`);
