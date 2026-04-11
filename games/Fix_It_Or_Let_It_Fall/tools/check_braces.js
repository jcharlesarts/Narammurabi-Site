const fs = require('fs');

const path = process.argv[2] || 'data/event_trees.js';
const src = fs.readFileSync(path, 'utf8');

let depth = 0;
let badClosings = [];
const stack = [];
const closes = [];
let line = 1;

let mode = 'code'; // code|string_d|string_s|string_t|comment_line|comment_block
for (let i = 0; i < src.length; i++) {
  const ch = src[i];
  const next = src[i+1];
  if (ch === '\n') line++;
  switch (mode) {
    case 'code':
      if (ch === '"') mode = 'string_d';
      else if (ch === "'") mode = 'string_s';
      else if (ch === '`') mode = 'string_t';
      else if (ch === '/' && next === '/') { mode = 'comment_line'; i++; }
      else if (ch === '/' && next === '*') { mode = 'comment_block'; i++; }
      else if (ch === '{') { depth++; stack.push(line); }
      else if (ch === '}') { depth--; closes.push(line); if (depth < 0) badClosings.push(line); else stack.pop(); }
      break;
    case 'string_d':
      if (ch === '\\') { i++; }
      else if (ch === '"') mode = 'code';
      break;
    case 'string_s':
      if (ch === '\\') { i++; }
      else if (ch === "'") mode = 'code';
      break;
    case 'string_t':
      if (ch === '\\') { i++; }
      else if (ch === '`') mode = 'code';
      break;
    case 'comment_line':
      if (ch === '\n') mode = 'code';
      break;
    case 'comment_block':
      if (ch === '*' && next === '/') { mode = 'code'; i++; }
      break;
  }
}

console.log('Brace depth end:', depth);
console.log('Bad closing braces at lines:', badClosings.length ? badClosings.join(',') : 'none');
if (depth > 0) console.log('Unclosed opening braces at lines:', stack.join(','));
console.log('Last 10 closings at lines:', closes.slice(-10).join(','));
