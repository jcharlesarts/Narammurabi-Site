const assert=require('node:assert/strict');
const feedback=require('../review-feedback.js');

const cases=[
  ['mc',100,'mc'],
  ['mc',50,'mc'],
  ['order',100,'order'],
  ['order',50,'order'],
  ['text',100,'text-100'],
  ['text',50,'text-50'],
  ['text',0,'text-0']
];

for(const [key,bank] of Object.entries(feedback.banks)){
  assert(bank.length>=10,`${key} needs at least 10 responses`);
  assert.equal(new Set(bank).size,bank.length,`${key} contains duplicate responses`);
  assert(bank.every(message=>/[.!?]$/.test(message)),`${key} responses need ending punctuation`);
}

for(const [kind,earned,key] of cases){
  feedback.reset();
  const bank=feedback.banks[key];
  const cycle=Array.from({length:bank.length},()=>feedback.next(kind,earned,()=>.37));
  assert.equal(new Set(cycle).size,bank.length,`${key} repeated before using its full deck`);
  const previous=cycle.at(-1),next=feedback.next(kind,earned,()=>.37);
  assert.notEqual(next,previous,`${key} repeated across a deck reset`);
}

console.log('PASS: type-aware Midterm Review feedback has 10+ unique responses per bank, uses each deck before repeating, and avoids back-to-back repeats.');
