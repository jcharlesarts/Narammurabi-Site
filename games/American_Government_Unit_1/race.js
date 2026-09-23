'use strict';
const D=window.STUDY,C=window.RaceCore,$=id=>document.getElementById(id);
const params=new URLSearchParams(location.search),sessionRecords=new Map();
let words=[],run=null,record=null,recordKey='',route='definition',state='ready',locked=false,startedAt=0,elapsed=0,ticker=null,storageAvailable=true;
const escapeHTML=text=>String(text).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const format=ms=>{const tenths=Math.floor(Math.max(0,ms)/100);return `${Math.floor(tenths/600)}:${String(Math.floor(tenths/10)%60).padStart(2,'0')}.${tenths%10}`;};
function nowElapsed(){return elapsed+(state==='running'?performance.now()-startedAt:0);}
function loadRecord(){let candidate=sessionRecords.get(recordKey);try{candidate=candidate||JSON.parse(localStorage.getItem(recordKey)||'null');}catch{storageAvailable=false;}return C.validRecord(candidate,words.length)?candidate:null;}
function saveRecord(value){sessionRecords.set(recordKey,value);try{localStorage.setItem(recordKey,JSON.stringify(value));}catch{storageAvailable=false;}}
function moduleOptions(target='all'){
 $('raceModule').innerHTML='<option value="all">All terms · every lesson</option>'+D.modules.map(m=>`<option value="${m.id}">${escapeHTML(m.title)}</option>`).join('');
 if([...$('raceModule').options].some(o=>o.value===target))$('raceModule').value=target;
 prepare();
}
function prepare(){
 clearInterval(ticker);ticker=null;window.speechSynthesis?.cancel();state='ready';run=null;elapsed=0;locked=false;
 const module=$('raceModule').value;
 const pool=D.vocabulary.filter(w=>module==='all'||w.module===module);
 words=C.course(pool,$('raceLength').value);route=$('raceRoute').value;recordKey=C.key(words,route);record=loadRecord();
 $('courseNote').textContent=`${words.length} ${words.length===1?'term':'terms'} on this course · cards shuffle every race.`;
 $('ready').hidden=false;$('racePlay').hidden=true;$('paused').hidden=true;$('raceResult').hidden=true;$('finishBurst').hidden=true;
 $('raceState').textContent='On the starting line';$('startRace').disabled=words.length===0;
 document.querySelectorAll('.race-controls select').forEach(s=>s.disabled=false);
 $('bestTime').textContent=record?format(record.totalMs):'—';
 $('ghostLabel').textContent=record?`Ghost to beat: ${format(record.totalMs)}`:'Finish a race to set your ghost.';
 updateTrack();
}
function updateTrack(){
 const time=nowElapsed(),completed=run?.completed||0,progress=words.length?completed/words.length:0;
 $('clock').textContent=format(time);$('lockedCount').textContent=`${completed} / ${words.length}`;$('attempts').textContent=run?.attempts||0;
 $('runner').style.setProperty('--progress',progress);
 $('ghost').hidden=!record;$('ghost').style.setProperty('--progress',record?C.ghostProgress(record,time)/100:0);
 $('raceProgress').setAttribute('aria-valuenow',String(Math.round(progress*100)));$('raceProgress').setAttribute('aria-valuetext',`${completed} of ${words.length} words locked in`);$('raceProgress').firstElementChild.style.width=`${progress*100}%`;
}
function start(){
 if(!words.length||state==='running'||state==='paused')return;
 run=C.createRun(words);elapsed=0;locked=false;state='running';startedAt=performance.now();
 $('ready').hidden=true;$('raceResult').hidden=true;$('finishBurst').hidden=true;$('paused').hidden=true;$('racePlay').hidden=false;
 document.querySelectorAll('.race-controls select').forEach(s=>s.disabled=true);$('startRace').disabled=true;
 $('raceState').textContent='Race in progress';ticker=setInterval(updateTrack,100);renderQuestion();updateTrack();
}
function renderQuestion(){
 locked=false;const word=run.queue[0];
 $('clueLabel').textContent=`${D.modules.find(m=>m.id===word.module).title} / ${route==='definition'?'Name the term':'Read the scenario'}`;
 $('raceQuestion').textContent=route==='definition'?word.def:word.scenario;
 $('raceFeedback').textContent='Choose the term that fits the clue.';$('nextWord').hidden=true;$('raceOptions').replaceChildren();
 C.options(word,D.vocabulary).forEach(option=>{const b=document.createElement('button');b.type='button';b.textContent=option.term;b.dataset.wordId=option.id;b.onclick=()=>choose(option.id);$('raceOptions').append(b);});
 $('raceQuestion').focus();
}
function choose(id){
 if(state!=='running'||locked||!run.queue.length)return;
 locked=true;window.speechSynthesis?.cancel();const result=C.answer(run,id,nowElapsed());
 $('raceOptions').querySelectorAll('button').forEach(b=>{b.disabled=true;if(b.dataset.wordId===result.word.id)b.classList.add('correct');else if(b.dataset.wordId===id)b.classList.add('wrong');});
 $('raceFeedback').textContent=result.correct?`Locked in! ${result.word.term}. ${result.word.example}`:`Back in the deck. The term is ${result.word.term}. ${result.word.def}`;
 updateTrack();
 if(result.finished){finish();return;}
 $('nextWord').hidden=false;$('nextWord').focus();
}
function pause(){
 if(state!=='running')return;elapsed=nowElapsed();state='paused';clearInterval(ticker);ticker=null;window.speechSynthesis?.cancel();
 $('racePlay').hidden=true;$('paused').hidden=false;$('raceState').textContent='Race paused';updateTrack();$('resumeRace').focus();
}
function resume(){
 if(state!=='paused')return;state='running';startedAt=performance.now();ticker=setInterval(updateTrack,100);$('paused').hidden=true;$('racePlay').hidden=false;$('raceState').textContent='Race in progress';updateTrack();(locked?$('nextWord'):$('raceQuestion')).focus();
}
function finish(){
 elapsed=Math.max(1,nowElapsed());state='finished';clearInterval(ticker);ticker=null;window.speechSynthesis?.cancel();updateTrack();
 const previous=record,newBest=!previous||elapsed<previous.totalMs;
 if(newBest){const saved={totalMs:elapsed,checkpoints:run.checkpoints.map(p=>({...p}))};saveRecord(saved);$('bestTime').textContent=format(elapsed);}
 $('racePlay').hidden=true;$('raceResult').hidden=false;$('finishBurst').hidden=false;$('raceState').textContent='Finish line reached';
 $('ghostLabel').textContent=newBest?`Ghost set: ${format(elapsed)}`:`Ghost to beat: ${format(previous.totalMs)}`;
 const missed=words.filter(w=>run.missed.has(w.id));
 const comparison=previous?(newBest?`${format(previous.totalMs-elapsed)} faster than your previous best.`:`Your ghost finished in ${format(previous.totalMs)}. Keep practicing and race it again.`):'Your first finish sets the ghost for this course.';
 $('raceResult').innerHTML=`<p class="eyebrow">Every word locked in</p><h2 id="resultHeading" tabindex="-1">${newBest?(previous?'A new personal best!':'Your ghost is ready.'): 'You crossed the line.'}</h2><p class="result-time">${format(elapsed)}</p><p>${escapeHTML(comparison)}</p><p>${run.total} words locked in · ${run.attempts} attempts · ${run.total-missed.length} ${run.total-missed.length===1?"word":"words"} correct on the first try.</p>${missed.length?`<p><b>Give these another look:</b></p><ul class="missed-words">${missed.map(w=>`<li>${escapeHTML(w.term)}</li>`).join('')}</ul>`:'<p>Clean run: every word correct on the first try.</p>'}<div class="actions"><button class="primary" id="raceAgain">Race your ghost →</button><button id="changeCourse">Choose another course</button><a class="button" href="vocabulary.html">Study the vocabulary</a></div><p class="storage-note">${storageAvailable?'Best time saved in this browser for this course and clue type.':'Browser storage is unavailable. Your ghost lasts for this page session.'}</p>`;
 $('raceAgain').onclick=()=>{record=loadRecord();$('ghostLabel').textContent=`Ghost to beat: ${format(record.totalMs)}`;start();};$('changeCourse').onclick=()=>{prepare();$('startRace').focus();};$('resultHeading').focus();
}
['raceModule','raceRoute','raceLength'].forEach(id=>$(id).onchange=prepare);
$('startRace').onclick=start;$('nextWord').onclick=()=>{if(state==='running'&&locked)renderQuestion();};$('pauseRace').onclick=pause;$('resumeRace').onclick=resume;
['resetRace','pauseReset'].forEach(id=>$(id).onclick=()=>{prepare();$('startRace').focus();});
$('hearRace').onclick=()=>{if(state!=='running'||!('speechSynthesis'in window))return;window.speechSynthesis.cancel();const speech=new SpeechSynthesisUtterance($('raceQuestion').textContent);speech.rate=.9;window.speechSynthesis.speak(speech);};
document.addEventListener('visibilitychange',()=>{if(document.hidden)pause();});window.addEventListener('pagehide',()=>{pause();clearInterval(ticker);window.speechSynthesis?.cancel();});
moduleOptions(params.get('module')||'all');
