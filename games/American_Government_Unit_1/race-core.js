/* Pure race rules, shared by the page and the regression checks. */
(function(root){
  'use strict';
  function shuffled(items,random=Math.random){const copy=[...items];for(let i=copy.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[copy[i],copy[j]]=[copy[j],copy[i]];}return copy;}
  function hash(text){let value=2166136261;for(const char of text){value^=char.charCodeAt(0);value=Math.imul(value,16777619);}return (value>>>0).toString(36);}
  function course(words,count,random=Math.random){return count==='all'?[...words]:shuffled(words,random).slice(0,Math.min(Number(count),words.length));}
  function key(words,route){return 'civics-vocab-race-v1:'+hash(JSON.stringify([route,words.map(w=>[w.id,w.term,w.def,w.scenario,w.excludeDistractors]).sort((a,b)=>a[0].localeCompare(b[0]))]));}
  function options(word,pool,random=Math.random){const candidates=pool.filter(w=>w.id!==word.id&&!word.excludeDistractors?.includes(w.term)&&!w.excludeDistractors?.includes(word.term));return shuffled([word,...shuffled(candidates,random).slice(0,3)],random);}
  function createRun(words,random=Math.random){return {queue:shuffled(words,random),total:words.length,completed:0,attempts:0,missed:new Set(),checkpoints:[]};}
  function answer(run,termId,elapsed){if(!run.queue.length)return null;const word=run.queue.shift(),correct=word.id===termId;run.attempts++;if(correct){run.completed++;run.checkpoints.push({timeMs:elapsed,progress:run.completed/run.total*100});}else{run.missed.add(word.id);run.queue.push(word);}return {correct,word,finished:run.queue.length===0};}
  function validRecord(record,count){return !!record&&Number.isFinite(record.totalMs)&&record.totalMs>0&&Array.isArray(record.checkpoints)&&record.checkpoints.length===count&&record.checkpoints.every((p,i)=>Number.isFinite(p.timeMs)&&p.timeMs>=0&&p.timeMs<=record.totalMs&&(i===0||p.timeMs>=record.checkpoints[i-1].timeMs)&&Math.abs(p.progress-(i+1)/count*100)<.001);}
  function ghostProgress(record,elapsed){if(!record)return 0;if(elapsed>=record.totalMs)return 100;let previous={timeMs:0,progress:0};for(const next of record.checkpoints){if(elapsed<=next.timeMs){const fraction=Math.max(0,Math.min(1,(elapsed-previous.timeMs)/Math.max(1,next.timeMs-previous.timeMs)));return previous.progress+(next.progress-previous.progress)*fraction;}previous=next;}return previous.progress;}
  const api={shuffled,hash,course,key,options,createRun,answer,validRecord,ghostProgress};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.RaceCore=api;
})(typeof window!=='undefined'?window:globalThis);
