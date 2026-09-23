const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),C=require('../race-core.js');
const context={window:{}};vm.runInNewContext(fs.readFileSync('study-data.js','utf8'),context);const D=context.window.STUDY;
const page=fs.readFileSync('vocab_race.html','utf8');
assert(!page.includes('id="raceScope"'),'scope control should be removed');
assert(page.includes('<select id="raceLength"><option value="all">All selected terms</option>'),'all terms should be the default distance');

const allTerms=C.course(D.vocabulary,'all');
assert.equal(allTerms.length,D.vocabulary.length,'default course should contain every vocabulary term');
const sprintA=C.course(D.vocabulary,10,()=>0),sprintB=C.course(D.vocabulary,10,()=>.9);
assert.equal(sprintA.length,10);assert.equal(sprintB.length,10);
assert.notDeepEqual(sprintA.map(w=>w.id),sprintB.map(w=>w.id),'10-word sprint should draw a randomized set');
const firstModule=D.modules[0].id,moduleTerms=D.vocabulary.filter(w=>w.module===firstModule);
assert.equal(C.course(moduleTerms,'all').map(w=>w.id).join(','),moduleTerms.map(w=>w.id).join(','),'module choice should include every term in that module');

assert.equal(C.key(sprintA,'definition'),C.key([...sprintA].reverse(),'definition'));assert.notEqual(C.key(sprintA,'scenario'),C.key(sprintA,'definition'));
assert.notEqual(C.key(sprintA,'definition'),C.key(sprintA.map((w,i)=>i? w:{...w,def:'Changed clue'}),'definition'),'edited content must not reuse an old ghost');
for(const word of D.vocabulary){
 const options=C.options(word,D.vocabulary);assert(options.length>=2&&options.length<=4);assert.equal(options.filter(x=>x.id===word.id).length,1);assert(options.filter(x=>x.id!==word.id).every(x=>!word.excludeDistractors.includes(x.term)&&!x.excludeDistractors.includes(word.term)));
}
const runA=C.createRun(sprintA,()=>0),runB=C.createRun(sprintA,()=>.9);
assert.notDeepEqual(runA.queue.map(w=>w.id),runB.queue.map(w=>w.id),'cards should reshuffle for every race');
const run=runB,first=run.queue[0];let result=C.answer(run,'wrong-id',1000);assert.equal(result.correct,false);assert.equal(run.completed,0);assert.equal(run.queue.length,10);assert.equal(run.queue.at(-1).id,first.id);assert(run.missed.has(first.id));
let time=1000;while(run.queue.length){time+=1000;result=C.answer(run,run.queue[0].id,time);}assert.equal(result.finished,true);assert.equal(run.completed,10);assert.equal(run.attempts,11);assert.equal(run.missed.size,1);assert.equal(run.checkpoints.length,10);assert.equal(C.answer(run,'x',time),null,'completed run cannot score again');
const record={totalMs:time,checkpoints:run.checkpoints};assert(C.validRecord(record,10));assert(!C.validRecord(record,9));assert(!C.validRecord({...record,totalMs:NaN},10));assert(!C.validRecord({totalMs:10,checkpoints:[{timeMs:-1,progress:100}]},1));assert(!C.validRecord({totalMs:10,checkpoints:[{timeMs:11,progress:100}]},1));assert.equal(C.ghostProgress(record,0),0);assert.equal(C.ghostProgress(record,time),100);assert.equal(C.ghostProgress(record,time+1000),100);assert(C.ghostProgress(record,1000)>0&&C.ghostProgress(record,1000)<10);
console.log('PASS: all-term defaults, module filtering, randomized sprints and card order, content-keyed records, wrong-answer recycling, completion locking, and ghost validation/interpolation.');
