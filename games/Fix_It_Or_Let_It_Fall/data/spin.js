// ====== spin.js ======
// Data + simple global API for spins/minigame

(function(){
const unrestSpinThresholds = [-5, -10, 5];
const unrestSpinStories = [
  {
    type: 'good',
    thresholds: [-5, -10],
    narrative: [
      "Your generosity brings festivals; a poet proclaims you 'Savior of the Plebs.'",
      "A baker's guild carves your face in bread and statues alike.",
      "You’re granted the honorary title 'Friend of the Masses' (Amicus Populi)."
    ],
    outcome: (threshold, done) => {
      let winnings = 400 + Math.floor(Math.random() * 300);
      delayedLog(`Lottery win! +${winnings} denarii flood into the treasury!`, "log-positive", () => {
        treasury += winnings;
        updateScoreboard();
        if (done) done();
      });
    }
  },
  {
    type: 'bad',
    thresholds: [5],
    narrative: [
      "The mob chants your name, for better or worse.",
      "A playwright debuts 'Consul Calamitas'—it’s a hit, but at your expense."
    ],
    outcome: (threshold, done) => {
      let gain = Math.random() < 0.5;
      let swing = 200 + Math.floor(Math.random() * 200);
      if (gain) {
        delayedLog(`Unexpected windfall! +${swing} denarii from satire rights.`, "log-positive", () => {
          treasury += swing;
          updateScoreboard();
          if (done) done();
        });
      } else {
        delayedLog(`Pay the price! -${swing} denarii for riot repairs.`, "log-negative", () => {
          treasury -= swing;
          updateScoreboard();
          if (done) done();
        });
      }
    }
  }
];

const politicsSpinThresholds = [-3, 3];
const politicsSpinStories = [
  {
    type: 'good',
    thresholds: [3],
    narrative: [
      "Senate applauds your genius; you’re awarded the badge 'Consul Triumphalis.'"
    ],
    outcome: (threshold, done) => {
      awardTitleOrBadge("Consul Triumphalis");
      if (done) done();
    }
  },
  {
    type: 'bad',
    thresholds: [-3],
    narrative: [
      "A rival senator accuses you of treason; the nickname 'Shadow of the Senate' sticks."
    ],
    outcome: (threshold, done) => {
      awardTitleOrBadge("Cult of Fools");
      if (done) done();
    }
  }
];

function awardTitleOrBadge(name){
  try {
    window.honoraryTitles = window.honoraryTitles || [];
    if (!honoraryTitles.includes(name)) {
      honoraryTitles.push(name);
      if (typeof delayedLog === 'function') {
        delayedLog(`🏅 Honorary Title Earned: <span class="honorary-title-badge">${name}</span>`, 'log-positive');
      }
    }
  } catch(e) {}
}

// Spin mechanics
function checkAllSpins() {
  const spins = [];
  try {
    unrestSpinThresholds.forEach(th => {
      if ((th < 0 && unrest <= th) || (th > 0 && unrest >= th)) {
        const pool = unrestSpinStories.filter(s => s.thresholds.includes(th));
        if (pool.length) spins.push({ type: 'unrest', th, story: pool[Math.floor(Math.random()*pool.length)] });
      }
    });
  } catch(e) {}
  try {
    politicsSpinThresholds.forEach(th => {
      if ((th < 0 && politics <= th) || (th > 0 && politics >= th)) {
        const pool = politicsSpinStories.filter(s => s.thresholds.includes(th));
        if (pool.length) spins.push({ type: 'politics', th, story: pool[Math.floor(Math.random()*pool.length)] });
      }
    });
  } catch(e) {}
  return spins;
}

function processSpinQueue(queue, done) {
  const next = queue.shift();
  if (!next) { if (done) done(); return; }
  triggerSpin(next.type, next.th, () => processSpinQueue(queue, done), next.story);
}

function triggerSpin(type, threshold, onContinue, storyOverride) {
  const story = storyOverride;
  if (!story) { if (onContinue) onContinue(); return; }
  const title = type === 'unrest' ? 'Unrest Spin!' : 'Politics Spin!';
  const text = (story.narrative || []).join(' ');
  showSpinAnnouncement(title, text, story.type, () => {
    try { story.outcome(threshold, onContinue); }
    catch(e) { console.warn(e); if (onContinue) onContinue(); }
  });
}

function showSpinAnnouncement(title, text, styleType, onClick) {
  // Prefer the existing random event modal UI
  const modal = document.getElementById('random-event-modal');
  const descEl = document.getElementById('random-event-desc');
  const cameoEl = document.getElementById('random-event-cameo');
  const closeBtn = document.getElementById('random-event-close-btn');
  if (modal && descEl && cameoEl && closeBtn) {
    descEl.textContent = `${title}: ${text}`;
    cameoEl.textContent = styleType === 'bad' ? 'A hush falls over the Curia…' : 'Fortuna smiles upon you…';
    modal.classList.remove('hidden');
    closeBtn.focus();
    const closeModal = () => {
      modal.classList.add('hidden');
      closeBtn.removeEventListener('click', closeModal);
      if (onClick) onClick();
    };
    closeBtn.addEventListener('click', closeModal, { once: true });
    return;
  }

  // Fallback to message log if modal not available
  const log = document.getElementById('message-log');
  const box = document.createElement('div');
  box.className = 'spin-announcement ' + (styleType === 'bad' ? 'log-bad' : 'log-good');
  box.innerHTML = `<strong>${title}</strong><br>${text}<br><button class="button">Continue</button>`;
  const btn = box.querySelector('button');
  btn.onclick = () => { box.remove(); if (onClick) onClick(); };
  if (log && log.prepend) log.prepend(box); else document.body.appendChild(box);
}

window.Spin = {
  checkAllSpins,
  processSpinQueue,
  triggerSpin,
  showSpinAnnouncement,
  data: { unrestSpinThresholds, unrestSpinStories, politicsSpinThresholds, politicsSpinStories }
};

})();
