// Run with: node scripts/check-content.cjs
// Protect assessment boundaries and shared-bank integrity as content grows.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const context={window:{}};vm.runInNewContext(fs.readFileSync('study-data.js','utf8'),context);const d=context.window.STUDY;
const ids=new Set(d.modules.map(m=>m.id));assert.equal(ids.size,d.modules.length);
for(const collection of ['questions','vocabulary','cases']){
 const seen=new Set();for(const item of d[collection]){assert(item.id&&!seen.has(item.id),`${collection}: duplicate/missing id`);seen.add(item.id);assert(ids.has(item.module),`${item.id}: unknown module`);}
}
for(const q of d.questions){assert(q.q&&q.teach);assert(['mc','text','order'].includes(q.kind));
 if(q.kind==='mc'){assert(q.opts.length>=3);assert(Number.isInteger(q.ans)&&q.ans>=0&&q.ans<q.opts.length);assert.equal(new Set(q.opts).size,q.opts.length);}
 if(q.kind==='order')assert(q.items.length>=3&&new Set(q.items).size===q.items.length);
 if(q.kind==='text')assert(q.a);
 if(q.whyChoices)assert(Number.isInteger(q.whyAnswer)&&q.whyAnswer<q.whyChoices.length);
 if(q.source)assert(q.source.text&&q.source.title&&q.source.url.startsWith('https://'));
 assert.equal(q.status,d.modules.find(m=>m.id===q.module).status);
 for(const field of ['q','teach','comparison'])if(q[field])assert(!/(?:this|the) unit|your class|the lesson|assessed standard|study paraphrase|specifically named|named in the unit/i.test(q[field]),`${q.id}: student-facing ${field} contains course-planning language`);
}
for(const id of d.assessments.current.modules)assert.equal(d.modules.find(m=>m.id===id).status,'taught','Midterm-only material leaked into the Lessons 1–5 question set');
for(const id of d.assessments.planned.modules)assert.notEqual(d.modules.find(m=>m.id===id).status,'later','Post-midterm material leaked into the through-Articles scope');
assert.equal(d.assessments.planned.modules.at(-1),'8','Midterm review must end with Articles of Confederation');
assert(!d.modules.some(m=>['9','10'].includes(m.id)),'Post-Articles modules must stay out of student-facing data');
for(const collection of ['questions','vocabulary'])assert(!d[collection].some(item=>['9','10'].includes(item.module)),`${collection}: post-Articles material is exposed`);
assert(!Object.values(d.assessments).map(({label,note})=>label+' '+note).join(' ').match(/currently taught|planned|checkpoint/i),'Teacher-planning language is exposed in question-set labels');
for(const m of d.modules){assert(d.questions.some(q=>q.module===m.id),m.title+' lacks practice');assert(d.vocabulary.some(w=>w.module===m.id),m.title+' lacks vocabulary');}
for(const w of d.vocabulary){assert(w.term&&w.def&&w.example&&w.scenario&&w.tr&&w.relatedTerms);assert.equal(typeof w.tr.ps,'string',`${w.id}: missing Pashto bridge`);assert(w.tr.ps.trim(),`${w.id}: empty Pashto bridge`);}
for(const c of d.cases)assert(c.evidence.length>=3&&c.answer<c.choices.length);
for(const file of fs.readdirSync('.').filter(f=>f.endsWith('.html'))){const html=fs.readFileSync(file,'utf8');for(const m of html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g))new vm.Script(m[1],{filename:file});for(const m of html.matchAll(/(?:href|src)="([^"#?]+)(?:[?#][^"]*)?"/g)){if(!/^(https?:|data:)/.test(m[1]))assert(fs.existsSync(m[1]),file+' broken local link: '+m[1]);}}
const vocabularyPage=fs.readFileSync('vocabulary.html','utf8'),interactions=fs.readFileSync('interactions.js','utf8');assert.match(interactions,/\['ps','پښتو \/ Pashto'\]/,'Pashto is missing from the site-wide language selector');assert.match(vocabularyPage,/new Set\(\["ar","ps"\]\)/,'Pashto must render right-to-left');assert.doesNotMatch(vocabularyPage,/id="vocabModule"/,'Lesson-title filtering should not block students from starting vocabulary practice');assert.match(vocabularyPage,/<option value="midterm" selected>Midterm review · All terms<\/option>/,'Midterm review should be the default vocabulary choice');
console.log(`PASS: ${d.modules.length} modules, ${d.questions.length} questions, ${d.vocabulary.length} terms, ${d.cases.length} cases; assessment boundaries, answer keys, scripts, and local links.`);
