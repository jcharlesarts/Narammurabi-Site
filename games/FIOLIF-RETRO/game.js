  // --- Main Menu Button (in-game) ---
// ========== ROMAN NAME GENERATOR ==========
const romanSuffixes = [
  "ius", "aeus", "onius", "ianus", "ellus", "ulus", "icus", "illa", "illae", "ara", "ina", "iana", "inae",
  "ilius", "ella", "ola", "ora", "us", "a", "as", "ian", "io", "ianum", "illa", "ianis", "illaus", "iorum",
  "enus", "atus", "itius", "etia", "enus", "erva", "ianae", "avia", "oria", "arius", "alia", "enius", "asia",
  "avia", "etta", "aria", "ilia", "inia", "ossa", "osa", "ena", "ona", "ura", "eva", "etta", "aena", "onia",
  "icia", "itia", "asa", "aca", "una", "uta", "ena", "orae"
];
function makeRomanName(base) {
  const suffix = romanSuffixes[Math.floor(Math.random() * romanSuffixes.length)];
  let simple = base.replace(/[^a-zA-Z]/g, '').split(' ')[0];
  if (!simple) simple = "Senator";
  simple = simple.charAt(0).toUpperCase() + simple.slice(1).toLowerCase();
  return simple + suffix;
}

let problemArea, messageLog, roundNumEl, yearDisplay, senatorNameDisplay, treasuryDisplay, riotDisplay, unrestDisplay, infraDisplay, politicsDisplay;
let btnNextRound, btnRestart, roundSummary, summaryRound, roundSummaryText, gameOverScreen, gameOverText;
let difficultyBtns, chosenDiffP, nameInput;
let gameMode = 'standard';
let openingCard, openingBtn, introScreen, scrollText, cutsceneScreen, startMenu, btnStart;
let introSkipOverlay;
let audioToggle, JupiterTheme, MarsTheAvenger, epicTheme, gameScreen;
// ========== GLOBAL GAME STATE ==========
const endGameWinMessages = [
  "You survived all 12 rounds... The Republic limps on!",
  "You outlasted a dozen crises—Rome owes you a debt (but don’t count on repayment).",
  "Victory! The Senate remains... for now.",
  "Against all odds, your leadership preserved the Republic. For another day.",
  "Triumph! Rome staggers onward, with you at the helm.",
  "Through riots and fire, you held Rome together. Jupiter approves.",
  "Congratulations, Senator! The mob is (temporarily) appeased.",
  "Rome stands. Your enemies grind their teeth in the shadows.",
  "The plebs cheer, the patricians grumble, but the city endures.",
  "You have restored order, for now. The gods are watching."
];
const endGameDefeatMessages = [
  "Disaster! Your name will be whispered as a warning to future senators.",
  "The Republic falls—on your watch. Sic transit gloria.",
  "Your reforms failed, and chaos consumes the city.",
  "Rome crumbles, and the Senate blames you (even if it wasn’t your fault).",
  "The mob storms the Senate. Hope you hid an escape tunnel.",
  "History will remember this as the day the Republic died.",
  "The city burns, and only the bards profit.",
  "Enemies rejoice as the Republic collapses into darkness.",
  "The people curse your name in the streets.",
  "Unrest and ruin—such is the fate of the unprepared.",
  "The Tiber runs red and the treasury runs dry. Tough luck, Senator.",
  "You kept the Senate arguing while Rome fell apart. Oops."
];

// ===== ENDGAME STAT COMMENTARY LIBRARY =====
const endGameStatMessages = {
  treasury: [
    { min: 10000, msg: "Treasury overflowing! Quaestors refer to the Temple of Saturn as it were your own." },
    { min: 7000,  msg: "The Republic's coffers are stable and healthy—well done, Senator." },
    { min: 3000,  msg: "Barely solvent, but the city survives. Watch your spending next time." },
    { min: 0,     msg: "Treasury nearly empty! The merchants grumble, and you do well to avoid creditors for a while." },
    { min: -Infinity, msg: "The city is bankrupt. Debtors riot, and you’re lucky to escape alive. Foreign adversaries are ready to pounce!" }
  ],
  riotTokens: [
    { max: 0, msg: "Not a riot to be seen! Your control over the mob is legendary!" },
    { max: 2, msg: "Only a few minor disturbances. The plebs are mostly content." },
    { max: 4, msg: "Rioters are a fact of Roman life. You did your best... mostly." },
    { max: Infinity, msg: "Riots rage in the streets, and the seven hills of Rome burn." }
  ],
  unrest: [
    { max: 1, msg: "The city is at peace. The people toast your name in the temples and the taverns." },
    { max: 4, msg: "Some unrest, but nothing the Praetorian Guard can’t handle." },
    { max: 7, msg: "Discontent simmers, especially among the Plebeians. Watch for daggers in the dark." },
    { max: Infinity, msg: "Unrest tears the city apart. Statues topple, and the forum echoes with curses of your name." }
  ],
  infrastructure: [
    { min: 7, msg: "Rome gleams with new roads, aqueducts, and baths—Master Builder status achieved!" },
    { min: 3, msg: "Infrastructure is sound. Foreigners and Romans alike praise your improvements." },
    { min: -2, msg: "Repairs were neglected. What's a few uncobbled roads? And people hardly notice the sewers over their own stench." },
    { min: -Infinity, msg: "The city crumbles. Citizens wade through mud, but your legacy is dust." }
  ],
  politics: [
    { min: 7, msg: "You outmaneuvered every rival. They will sing songs of your statesmanship!" },
    { min: 2, msg: "Politics is a dirty game—yet you got out cleaner than most." },
    { min: -2, msg: "The Senate collectively yawns when you speak. Oration is not your strong suit..." },
    { min: -Infinity, msg: "Enemies circled and feasted. You are the Senate’s laughingstock." }
  ]
};
function getStatCommentary(stat, value) {
  const messages = endGameStatMessages[stat];
  if (!messages) return "";
  if (stat === "riotTokens" || stat === "unrest") {
    for (let i = 0; i < messages.length; i++) {
      if (value <= messages[i].max) return messages[i].msg;
    }
  } else {
    for (let i = 0; i < messages.length; i++) {
      if (value >= messages[i].min) return messages[i].msg;
    }
  }
  return "";
}
let logQueue = []; // Queue for messages to be logged
let gameOver = false;
let currentRound = 1; // Start at 11 for testing purposes, change to 1 for normal play
const totalRounds = 12;
let year = 509;
let problemsDoneThisRound = 0;
let treasury = 12000;
let riotTokens = 0;
let unrest = 0;
let infrastructure = 0;
let politics = 0;
let senatorName = "";
// Share honorary titles with other modules (event trees) via window
let honoraryTitles = (function(){
  try {
    if (!Array.isArray(window.honoraryTitles)) window.honoraryTitles = [];
    return window.honoraryTitles;
  } catch(_) {
    return [];
  }
})();
let usedProblems = [];
let chosenDifficulty = null;

const PROBLEMS_PER_ROUND = 3;
const difficultyMap = {
  easy: 12000,
  normal: 7530,
  hard: 4900
};

let isLogging = false;
// ========== DOM & AUDIO INITIALIZATION ==========

// ========== IMMEDIATE GAME OVER CHECK ==========
function checkImmediateGameOver() {
  // Treasury defeat (immediate)
  if (treasury < 0) {
    endGame(false, "Bankruptcy! The city revolts violently.");
    return true;
  }
  if (treasury < 200) {
    endGame(false, "Your treasury is under 200; riots break out everywhere!");
    return true;
  }
  if (riotTokens >= 6) {
    endGame(false, "Too many riot tokens: A mob storms the Senate!");
    return true;
  }
  if (unrest >= 10) {
    endGame(false, "Unrest has boiled over: The city is in chaos!");
    return true;
  }
  if (infrastructure < -10) {
    endGame(false, "Infrastructure collapse! The city crumbles and pestilence abounds!");
    return true;
  }
  if (politics < -7) {
    endGame(false, "Political ruin! The Senate is in disarray and your enemies close in with their knives!");
    return true;
  }
  return false;
}

  window.addEventListener("DOMContentLoaded", () => {
  // Ensure global inventory exists
  try { window.inventory = Array.isArray(window.inventory) ? window.inventory : []; } catch(_) {}
  openingCard         = document.getElementById("opening-card");
  openingBtn          = document.getElementById("opening-continue-btn");
  introScreen         = document.getElementById("intro-screen");
  scrollText          = document.getElementById("scroll-text");
  cutsceneScreen      = document.getElementById("cutscene-screen");
  startMenu           = document.getElementById("start-menu");
  btnStart            = document.getElementById("btn-start");
  difficultyBtns      = document.querySelectorAll(".difficulty-btn");
  chosenDiffP         = document.getElementById("chosen-diff");
  nameInput           = document.getElementById("name-input");
  btnNextRound        = document.getElementById("btn-next-round");
  btnRestart          = document.getElementById("btn-restart");
  roundSummary        = document.getElementById("round-summary");
  summaryRound        = document.getElementById("summary-round");
  roundSummaryText    = document.getElementById("round-summary-text");
  senatorNameDisplay  = document.getElementById("senator-name-display");
  yearDisplay         = document.getElementById("year-display");
  treasuryDisplay     = document.getElementById("treasury-display");
  riotDisplay         = document.getElementById("riot-display");
  unrestDisplay       = document.getElementById("unrest-display");
  infraDisplay        = document.getElementById("infra-display");
  politicsDisplay     = document.getElementById("politics-display");
  audioToggle         = document.getElementById("audio-toggle");
  audioNextTrack      = document.getElementById("audio-next-track");
  JupiterTheme        = document.getElementById("JupiterTheme");
  MarsTheAvenger      = document.getElementById("MarsTheAvenger");
  epicTheme           = document.getElementById("epicTheme");
  gameScreen          = document.getElementById("game-screen");
  roundNumEl          = document.getElementById("round-num");
  problemArea         = document.getElementById("problem-area");
  messageLog          = document.getElementById("message-log");
  gameOverScreen      = document.getElementById("game-over-screen");
  gameOverText        = document.getElementById("game-over-text");
  titlesDisplay       = document.getElementById("titles-display");
  const btnLoot       = document.getElementById("btn-loot");
  const lootModal     = document.getElementById("loot-modal");
  const lootListEl    = document.getElementById("loot-list");
  const lootEmptyMsg  = document.getElementById("loot-empty-msg");

  const btnReturnMenu = document.getElementById("btn-return-menu");

  introSkipOverlay    = document.getElementById("intro-skip-overlay");
  // Hide the return to menu button initially
  if (btnReturnMenu) btnReturnMenu.classList.add('hidden');

  // Attach Main Menu Button handler after all elements and functions are defined
  if (btnReturnMenu) {
    btnReturnMenu.addEventListener("click", () => {
      resetGame();
      showScreen("start-menu");
      if (audioNextTrack) audioNextTrack.classList.add('hidden');
      btnReturnMenu.classList.add('hidden');
    });
  }

  // --- MODAL OPENERS FOR HOW TO PLAY & CREDITS ---
  const btnHowto = document.getElementById('btn-howto');
  const howtoModal = document.getElementById('howto-modal');
  if (btnHowto && howtoModal) {
    btnHowto.addEventListener('click', () => {
      howtoModal.classList.remove('hidden');
    });
  }
  const btnCredits = document.getElementById('btn-credits');
  const creditsModal = document.getElementById('credits-modal');
  if (btnCredits && creditsModal) {
    btnCredits.addEventListener('click', () => {
      creditsModal.classList.remove('hidden');
    });
  }
  // (Optional: ESC closes both modals)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      howtoModal && howtoModal.classList.add('hidden');
      creditsModal && creditsModal.classList.add('hidden');
      lootModal && lootModal.classList.add('hidden');
    }
  });

  // --- LOOT MODAL LOGIC ---
  function renderLootList() {
    try {
      const inv = Array.isArray(window.inventory) ? window.inventory : [];
      if (lootEmptyMsg) lootEmptyMsg.style.display = inv.length ? 'none' : '';
      if (!lootListEl) return;
      lootListEl.innerHTML = '';
      if (!inv.length) return;
      inv.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        lootListEl.appendChild(li);
      });
    } catch(_) {}
  }
  if (btnLoot && lootModal) {
    btnLoot.addEventListener('click', () => {
      renderLootList();
      lootModal.classList.remove('hidden');
    });
  }
  // --- AUDIO TOGGLE LOGIC ---
  function stopAllMusic() {
    [JupiterTheme, MarsTheAvenger, epicTheme].forEach(audio => {
      if (audio) { audio.pause(); audio.currentTime = 0; }
    });
  }
  function resumeCurrentMusic() {
    // Always stop current track(s) before switching
    stopAllMusic();
    if (audioMuted) return;

    // If an Event Tree modal is visible, prefer MarsTheAvenger during story play
    try {
      const isVisible = (id) => {
        const el = document.getElementById(id);
        return !!(el && !el.classList.contains("hidden"));
      };
      if (isVisible('event-tree-modal')) {
        if (MarsTheAvenger) {
          MarsTheAvenger.currentTime = 0;
          MarsTheAvenger.volume = 1;
          MarsTheAvenger.play().catch(()=>{});
          return;
        }
      }
    } catch(_) {}

    if (!openingCard.classList.contains("hidden")) {
      // Opening card screen (maybe silent, or future theme)
      // No music
    } else if (!introScreen.classList.contains("hidden")) {
      if (JupiterTheme) {
        JupiterTheme.currentTime = 0;
        JupiterTheme.volume = 0.8;
        JupiterTheme.play().catch(()=>{});
      }
    } else if (!cutsceneScreen.classList.contains("hidden")) {
      if (MarsTheAvenger) {
        MarsTheAvenger.currentTime = 0;
        MarsTheAvenger.volume = 1;
        MarsTheAvenger.play().catch(()=>{});
      }
    } else if (!startMenu.classList.contains("hidden") ||
               !gameScreen.classList.contains("hidden")) {
      if (epicTheme) {
        epicTheme.currentTime = 0;
        epicTheme.volume = 0.4;
        epicTheme.play().catch(()=>{});
      }
    }
    // Add more as you add screens!
  }
  // Expose for other modules (e.g., event trees) to request music state updates
  try { window.resumeCurrentMusic = resumeCurrentMusic; } catch(_) {}
  const allAudio = [JupiterTheme, MarsTheAvenger, epicTheme];
  let audioMuted = false;
  if (audioToggle) {
    audioToggle.addEventListener("click", () => {
      audioMuted = !audioMuted;
      allAudio.forEach(audio => { if (audio) audio.muted = audioMuted; });
      audioToggle.classList.toggle("muted", audioMuted);
      // Update audio icon image src
      const audioIconImg = document.getElementById("audio-icon-img");
      if (audioIconImg) {
        if (audioMuted) {
          audioIconImg.src = "assets/buttons/cornu-muted.png";
        } else {
          audioIconImg.src = "assets/buttons/cornu.png";
        }
      }
      stopAllMusic();
      resumeCurrentMusic(); // <--- Correct replacement!
    });
  }
  // --- AUDIO NEXT TRACK BUTTON ---
  let currentTrack = 0;
  if (audioNextTrack) {
    audioNextTrack.addEventListener("click", () => {
      allAudio.forEach(audio => { if (audio) { audio.pause(); audio.currentTime = 0; } });
      currentTrack = (currentTrack + 1) % allAudio.length;
      if (!audioMuted && allAudio[currentTrack]) {
        allAudio[currentTrack].currentTime = 0;
        allAudio[currentTrack].play().catch(()=>{});
      }
    });
  }
  // Set initial audio properties (prevent autoplay)
  if (JupiterTheme)   { JupiterTheme.volume = 0.8; JupiterTheme.pause(); }
  if (MarsTheAvenger) { MarsTheAvenger.volume = 1; MarsTheAvenger.pause(); }
  if (epicTheme)      { epicTheme.volume     = 0.4; epicTheme.pause(); }

  // --- SCREEN FLOW EXAMPLE (Intro, cutscene, main menu) ---
  // 1. Only show the opening card first
  document.querySelectorAll('.screen').forEach(el => el.classList.add('hidden'));
  if (openingCard) openingCard.classList.remove('hidden');
  if (introSkipOverlay) introSkipOverlay.classList.add('hidden');

  if (openingBtn) openingBtn.addEventListener("click", () => {
    openingCard.classList.add('fadeout');
    setTimeout(() => {
      openingCard.classList.add('hidden');
      if (introScreen) introScreen.classList.remove('hidden');
      if (JupiterTheme) {
        JupiterTheme.currentTime = 0;
        JupiterTheme.volume = 0.8;
        JupiterTheme.play().catch(()=>{});
      }
      if (scrollText) scrollText.classList.add('scroll-animation');
      // Show skip overlay only now, and attach skip handler
      if (introSkipOverlay) {
        introSkipOverlay.classList.remove('hidden');
        introSkipOverlay.classList.add('fadein');
        // Remove any previous handler first (in case of replay)
        introSkipOverlay.onclick = null;
        // Remove previous event listener if any (cleanup)
        introSkipOverlay.removeEventListener("click", finishIntro);
        // Optional: show a prompt in the overlay
        if (!introSkipOverlay.querySelector('.skip-prompt')) {
          const prompt = document.createElement('div');
          prompt.className = 'skip-prompt';
          prompt.textContent = 'Click anywhere to skip intro';
          introSkipOverlay.appendChild(prompt);
        }
        // --- Skip Prompt Delayed Reveal Logic ---
        const skipPrompt = introSkipOverlay ? introSkipOverlay.querySelector('.skip-prompt') : null;
        if (skipPrompt) skipPrompt.classList.remove('visible');
        if (window.skipPromptTimeout) clearTimeout(window.skipPromptTimeout);
        window.skipPromptTimeout = setTimeout(() => {
          if (skipPrompt) skipPrompt.classList.add('visible');
        }, 7000);
        setTimeout(() => {
          introSkipOverlay.classList.remove('fadein');
        }, 400);
        introSkipOverlay.addEventListener("click", finishIntro, { once: true });
      }
      // Attach scroll listeners after showing the overlay
      if (scrollText) {
        scrollText.addEventListener("animationend", finishIntro, { once: true });
        scrollText.addEventListener("click", finishIntro, { once: true });
      }
    }, 1000);
  });

  let introDone = false;
  function finishIntro() {
    if (introDone) return;
    introDone = true;
    // --- Skip Prompt Hide/Cleanup Logic ---
    if (window.skipPromptTimeout) clearTimeout(window.skipPromptTimeout);
    if (introSkipOverlay) {
      const skipPrompt = introSkipOverlay.querySelector('.skip-prompt');
      if (skipPrompt) skipPrompt.classList.remove('visible');
    }
    // Always immediately hide skip overlay
    if (introSkipOverlay) {
      introSkipOverlay.classList.add('hidden');
      introSkipOverlay.onclick = null;
      introSkipOverlay.removeEventListener("click", finishIntro, { once: true });
    }
    // Clean up scrollText listeners
    if (scrollText) {
      scrollText.removeEventListener("animationend", finishIntro, { once: true });
      scrollText.removeEventListener("click", finishIntro, { once: true });
    }
    introScreen.classList.add('fadeout');
    setTimeout(() => {
      introScreen.classList.add('hidden');
      if (cutsceneScreen) cutsceneScreen.classList.remove('hidden');
      stopAllMusic();
      if (MarsTheAvenger) {
        MarsTheAvenger.currentTime = 0;
        MarsTheAvenger.volume = 1;
        MarsTheAvenger.play().catch(()=>{});
      }
      // --- Trigger pan/zoom animation for cutscene ---
      setTimeout(() => {
        const zoomImg = document.getElementById('cutscene-img-zoom');
        if (zoomImg) zoomImg.classList.add('active');
      }, 60);
      cutsceneScreen.addEventListener('click', finishCutscene, { once: true });
    }, 1200);
  }
  function finishCutscene() {
    stopAllMusic();
    if (MarsTheAvenger) {
      MarsTheAvenger.pause();
      MarsTheAvenger.currentTime = 0;
    }
    // Remove cutscene pan/zoom class so it's ready for next run
    const zoomImg = document.getElementById('cutscene-img-zoom');
    if (zoomImg) zoomImg.classList.remove('active');
    if (cutsceneScreen) {
      cutsceneScreen.classList.add('fadeout');
      setTimeout(() => {
        cutsceneScreen.classList.add('hidden');
        if (startMenu) startMenu.classList.remove('hidden');
        if (epicTheme) {
          epicTheme.currentTime = 0;
          epicTheme.play().catch(()=>{});
        }
      }, 800);
    }
  }

  // --- DIFFICULTY BUTTONS ---
  if (difficultyBtns && chosenDiffP) {
    function updateDifficultyUI() {
      try {
        difficultyBtns.forEach(b => {
          const isSel = (b && b.dataset && b.dataset.diff === chosenDifficulty);
          if (isSel) b.classList.add('selected'); else b.classList.remove('selected');
        });
      } catch(_) {}
    }
    difficultyBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        chosenDifficulty = btn.dataset.diff;
        const denarii = difficultyMap[chosenDifficulty] ?? "???";
        chosenDiffP.textContent = `Chosen difficulty: ${chosenDifficulty.toUpperCase()} (${denarii} denarii)`;
        updateDifficultyUI();
        checkStartButton();
      });
    });
    // On load, reapply UI if a difficulty was remembered somehow
    updateDifficultyUI();
  }
  // --- NAME INPUT (Roman name preview) ---
  if (nameInput) {
    nameInput.addEventListener('input', function() {
      let v = nameInput.value;
      let simple = v.replace(/[^a-zA-Z]/g, '').split(' ')[0];
      if (simple.length > 0) {
        let roman = makeRomanName(simple);
        senatorNameDisplay.textContent = "Senator " + roman;
      } else {
        senatorNameDisplay.textContent = "";
      }
      checkStartButton();
    });
  }

  // --- START GAME BUTTON ---
  if (btnStart) btnStart.addEventListener("click", startGame);

  // Mode selection (defaults to 'standard' and doesn't gate Start)
  const modeInputs = document.querySelectorAll('input[name="mode"]');
  if (modeInputs && modeInputs.length) {
    modeInputs.forEach(r => r.addEventListener('change', () => {
      const sel = document.querySelector('input[name="mode"]:checked');
      gameMode = sel ? sel.value : 'standard';
      // Start button enablement no longer depends on mode selection
      // Reassert chosen difficulty label in case any UI reflow cleared it
      try {
        if (chosenDifficulty && chosenDiffP) {
          const denarii = difficultyMap[chosenDifficulty] ?? "???";
          chosenDiffP.textContent = `Chosen difficulty: ${chosenDifficulty.toUpperCase()} (${denarii} denarii)`;
        }
      } catch(_) {}
      // Also re-assert selection highlight
      try {
        if (difficultyBtns) {
          difficultyBtns.forEach(b => b.classList.toggle('selected', b.dataset.diff === chosenDifficulty));
        }
      } catch(_) {}
      checkStartButton();
    }));
    let sel = document.querySelector('input[name="mode"]:checked');
    if (!sel) {
      const std = document.querySelector('input[name="mode"][value="standard"]');
      if (std) { std.checked = true; sel = std; }
    }
    gameMode = sel ? sel.value : 'standard';
  }

  // ========== AUDIO NEXT TRACK BUTTON ROBUST HANDLER ==========
  function setupAudioNextTrackBtn() {
    const audioNextTrack = document.getElementById("audio-next-track");
    if (audioNextTrack && !audioNextTrack._handlerSet) {
      audioNextTrack.addEventListener("click", () => {
        allAudio.forEach(audio => { if (audio) { audio.pause(); audio.currentTime = 0; } });
        currentTrack = (currentTrack + 1) % allAudio.length;
        if (!audioMuted && allAudio[currentTrack]) {
          allAudio[currentTrack].currentTime = 0;
          allAudio[currentTrack].play().catch(()=>{});
        }
      });
      audioNextTrack._handlerSet = true; // prevent duplicate handlers
    }
  }

  function checkStartButton() {
    // Allow any selection order; default mode is standard, so no mode requirement here
    btnStart.disabled = !(chosenDifficulty && nameInput.value.trim().length > 0);
  }

  // --- BEGIN GAME ---
  function startGame() {
    gameOver = false;
    currentRound = 1;
    year = 509;
    problemsDoneThisRound = 0;
    riotTokens = 0;
    unrest = 0;
    infrastructure = 0;
    politics = 0;
    // Clear titles in-place so window.honoraryTitles stays in sync
    if (Array.isArray(honoraryTitles)) honoraryTitles.length = 0;
    try { window.honoraryTitles = honoraryTitles; } catch(_) {}
    usedProblems = [];
    let base = nameInput.value.trim();
    senatorName = "" + makeRomanName(base);
    treasury = difficultyMap[chosenDifficulty] || 12000;
    showScreen('game-screen');
    // Show the return to menu button when gameplay starts
    if (btnReturnMenu) btnReturnMenu.classList.remove('hidden');
    setupAudioNextTrackBtn();
    // Show audio next track button after entering game screen
    if (audioNextTrack) audioNextTrack.classList.remove('hidden');
    senatorNameDisplay.textContent = senatorName;
    yearDisplay.textContent = year;
    roundNumEl.textContent = currentRound;
    updateScoreboard();
    problemArea.innerHTML = '';
    messageLog.innerHTML = '';
    // Branch by selected mode
    if (gameMode === 'eventTrees' && (window.EventTrees || window.startRandomEventTree)) {
      const data = (window.EventTrees && window.EventTrees.data) || (window.randomEventTrees) || {};
      const keys = Object.keys(data);
      const key = keys[Math.floor(Math.random() * keys.length)] || null;
      if (key) {
        // Start immediately to guarantee rendering; log for flavor separately
        const runner = (k, cb) => {
          if (window.EventTrees && typeof window.EventTrees.startRandomEventTree === 'function') return window.EventTrees.startRandomEventTree(k, cb);
          if (typeof window.startRandomEventTree === 'function') return window.startRandomEventTree(k, cb);
        };
        runner(key, () => {
          runRound(); // resume campaign afterward
        });
        delayedLog('Starting Event Story: ' + key.replace(/_/g, ' '), 'log-info');
        return;
      }
    }

    if (gameMode === 'spins' && window.Spin) {
      delayedLog('Spin Trials: test your fate!', 'log-info', () => {
        const q = window.Spin.checkAllSpins();
        if (!q || q.length === 0) {
          // Fallback: always show one demo spin so mode is meaningful
          const pools = [];
          if (window.Spin.data && Array.isArray(window.Spin.data.unrestSpinStories) && window.Spin.data.unrestSpinStories.length) {
            pools.push({ type: 'unrest', list: window.Spin.data.unrestSpinStories });
          }
          if (window.Spin.data && Array.isArray(window.Spin.data.politicsSpinStories) && window.Spin.data.politicsSpinStories.length) {
            pools.push({ type: 'politics', list: window.Spin.data.politicsSpinStories });
          }
          if (pools.length) {
            const chosenPool = pools[Math.floor(Math.random() * pools.length)];
            const story = chosenPool.list[Math.floor(Math.random() * chosenPool.list.length)];
            window.Spin.triggerSpin(chosenPool.type, 0, () => {
              delayedLog('Spin resolved. Back to the Senate floor.', 'log-neutral', () => runRound());
            }, story);
          } else {
            // If somehow no pools exist, just proceed to campaign
            runRound();
          }
        } else {
          window.Spin.processSpinQueue(q, () => {
            delayedLog('Spins resolved. Back to the Senate floor.', 'log-neutral', () => runRound());
          });
        }
      });
      return;
    }

    runRound();
  }

  // --- SCREEN SHOW/ HIDE ---
  function showScreen(screenId) {
    // Only use .hidden class to manage visibility
    document.querySelectorAll('.screen').forEach(el => el.classList.add('hidden'));
    const next = document.getElementById(screenId);
    if (next) next.classList.remove('hidden');
  }
  // ========== ROUND LOGIC ==========
  function runRound() {
    if (gameOver) return;
    problemsDoneThisRound = 0;
    roundNumEl.textContent = currentRound;
    yearDisplay.textContent = year;
    updateScoreboard();
    problemArea.innerHTML = '';
    showNextProblem();
  }

  function showNextProblem() {
    // Event tree interrupt layer before normal problems
    if (window.EventTrees && typeof window.EventTrees.maybeStartRandom === 'function' && !window.EventTrees.isActive()) {
      const started = window.EventTrees.maybeStartRandom(() => showNextProblem());
      if (started) return; // event tree will resume here when finished
    }
    if (problemsDoneThisRound >= PROBLEMS_PER_ROUND) {
      showRoundSummary();
      return;
    }
    const problem = pickProblem();
    renderProblem(problem, () => {
      problemsDoneThisRound++;
      const YEARS_PER_PROBLEM = 13; // Or use 13.333... for perfect accuracy
      year -= YEARS_PER_PROBLEM;
      yearDisplay.textContent = Math.round(year); // Update display immediately
      updateScoreboard();
      updateScoreboard();
      checkForHonoraryTitles();
      cameoComment();// Add random event/cameo logic here if needed!
      showNextProblem();
    });
  }

  function showRoundSummary() {
    // Advance year and round here!
    year -= 1;
    currentRound++;
    updateScoreboard();
    if (checkImmediateGameOver()) return;
    problemArea.innerHTML = '';
    
    // If we've just finished the last round, end game immediately
    if (currentRound > totalRounds) {
      let summaryMsg = `Treasury: ${treasury}, Riot Tokens: ${riotTokens}, Unrest: ${unrest}, Infrastructure: ${infrastructure}, Politics: ${politics}. `;
      const winMsg = endGameWinMessages[Math.floor(Math.random() * endGameWinMessages.length)];
      endGame(true, winMsg + "\n\n" + summaryMsg);
      return;
    }
    
    // Otherwise show round summary as usual
    if (roundSummary) roundSummary.classList.remove('hidden');
    if (btnNextRound) btnNextRound.classList.remove('hidden');
    if (summaryRound) summaryRound.textContent = currentRound - 1;
    if (roundSummaryText) {
      let msg = `Treasury: ${treasury}, Riot Tokens: ${riotTokens}, Unrest: ${unrest}, Infrastructure: ${infrastructure}, Politics: ${politics}`;
      roundSummaryText.textContent = msg;
    }
  }

  if (btnNextRound) btnNextRound.addEventListener("click", () => {
    if (roundSummary) roundSummary.classList.add('hidden');
    if (btnNextRound) btnNextRound.classList.add('hidden');
    runRound();
  });

  if (btnRestart) btnRestart.addEventListener("click", () => {
    resetGame();
    showScreen('start-menu');
    if (btnReturnMenu) btnReturnMenu.classList.add('hidden');
  });

  function resetGame() {
    chosenDifficulty = null;
    // Clear titles in-place so window.honoraryTitles stays in sync
    if (Array.isArray(honoraryTitles)) honoraryTitles.length = 0;
    try { window.honoraryTitles = honoraryTitles; } catch(_) {}
    usedProblems = [];
    currentRound = 1;
    problemsDoneThisRound = 0;
    year = 509;
    riotTokens = 0;
    unrest = 0;
    infrastructure = 0;
    politics = 0;
    treasury = 12000;
    senatorName = "";
    if (difficultyBtns) difficultyBtns.forEach(b => b.classList.remove("selected"));
    if (chosenDiffP) chosenDiffP.innerHTML = "<em>No difficulty selected</em>";
    if (nameInput) nameInput.value = "";
    updateScoreboard();
    // Hide audio next track button on reset
    if (audioNextTrack) audioNextTrack.classList.add('hidden');
    // Hide the return to menu button on reset
    if (btnReturnMenu) btnReturnMenu.classList.add('hidden');

    // Reset Event Tree session memory so a new game is clean
    try {
      if (window._playedEventTrees && typeof window._playedEventTrees.clear === 'function') {
        window._playedEventTrees.clear();
      } else {
        window._playedEventTrees = new Set();
      }
    } catch(_) {}
    try {
      const trees = window.randomEventTrees || {};
      Object.keys(trees).forEach(k => { try { delete trees[k]._completed; delete trees[k]._lastPlayedAt; } catch(_) {} });
    } catch(_) {}
    try {
      if (window.EventTrees) {
        window.EventTrees._suppressNextOnce = false;
        window.EventTrees._blockUntil = 0;
        if (typeof window.EventTrees.setArc === 'function') window.EventTrees.setArc(null);
      }
    } catch(_) {}
    // Ensure event modals are hidden
    try {
      const m1 = document.getElementById('event-tree-modal');
      const m2 = document.getElementById('random-event-modal');
      if (m1) m1.classList.add('hidden');
      if (m2) m2.classList.add('hidden');
      document.querySelectorAll('.event-options').forEach(el => el.remove());
    } catch(_) {}
  }

  // ========== UPDATE SCOREBOARD ==========
  function updateScoreboard() {
    yearDisplay.textContent = year;
    senatorNameDisplay.textContent = senatorName;
    if (treasuryDisplay) treasuryDisplay.textContent = treasury;
    if (riotDisplay) riotDisplay.textContent = riotTokens;
    if (unrestDisplay) unrestDisplay.textContent = unrest;
    if (infraDisplay) infraDisplay.textContent = infrastructure;
    if (politicsDisplay) politicsDisplay.textContent = politics;
    // Update loot button count if present
    try {
      const btnLoot = document.getElementById('btn-loot');
      if (btnLoot) {
        const count = Array.isArray(window.inventory) ? window.inventory.length : 0;
        btnLoot.textContent = `🎒 Loot${count ? ` (${count})` : ''}`;
      }
    } catch(_) {}

    // --- SCOREBOARD BAR GRAPH LOGIC ---
    // Helper function for scoreboard bars with support for "reverse" coloring.
    function updateScoreBar(barId, value, min, max, direction = "normal") {
      const bar = document.getElementById(barId);
      if (!bar) return;
      let fill = bar.querySelector('.score-bar-fill');
      if (!fill) {
        fill = document.createElement('div');
        fill.className = 'score-bar-fill';
        bar.appendChild(fill);
      }
      const centerVal = 0;
      let percent;
      if (direction === "reverse") {
        // For stats where low is good: green left, red right
        if (value <= centerVal) {
          percent = (centerVal - value) / (centerVal - min); // 0 to 1 left
          fill.style.left = (50 - Math.min(1, percent) * 50) + '%';
          fill.style.width = (Math.min(1, percent) * 50) + '%';
          fill.style.background = '#4ec650';
        } else {
          percent = (value - centerVal) / (max - centerVal); // 0 to 1 right
          fill.style.left = '50%';
          fill.style.width = (Math.min(1, percent) * 50) + '%';
          fill.style.background = '#f44';
        }
      } else {
        // Normal direction: negative=red/left, positive=green/right
        if (value >= centerVal) {
          percent = (value - centerVal) / (max - centerVal); // 0 to 1 right
          fill.style.left = '50%';
          fill.style.width = (Math.min(1, percent) * 50) + '%';
          fill.style.background = '#4ec650';
        } else {
          percent = (centerVal - value) / (centerVal - min); // 0 to 1 left
          fill.style.left = (50 - Math.min(1, percent) * 50) + '%';
          fill.style.width = (Math.min(1, percent) * 50) + '%';
          fill.style.background = '#f44';
        }
      }
    }
    // updateScoreBar('treasury-bar', treasury, -5000, 10000);            // normal
    updateScoreBar('riot-bar', riotTokens, -6, 6, "reverse");          // reverse: green left, red right
    updateScoreBar('unrest-bar', unrest, -10, 10, "reverse");          // reverse: green left, red right
    updateScoreBar('infra-bar', infrastructure, -10, 12);              // normal
    updateScoreBar('politics-bar', politics, -7, 15);                  // normal

    // --- DANGER SHAKE & DANGER CLASS LOGIC ---
    function applyDangerShake(barId, dangerCondition) {
      const bar = document.getElementById(barId);
      if (!bar) return;
      const fill = bar.querySelector('.score-bar-fill');
      if (dangerCondition) {
        bar.classList.add('danger-shake');
        if (fill) fill.classList.add('danger', 'danger-shake');
      } else {
        bar.classList.remove('danger-shake');
        if (fill) fill.classList.remove('danger', 'danger-shake');
      }
    }

    // Danger if RIOTS is too high (>= 6)
    applyDangerShake('riot-bar', riotTokens >= 6);
    // Danger if UNREST is too high (>= 10)
    applyDangerShake('unrest-bar', unrest >= 10);
    // Danger if INFRA is too low (<= -10)
    applyDangerShake('infra-bar', infrastructure <= -10);
    // Danger if POLITICS is too low (<= -7)
    applyDangerShake('politics-bar', politics <= -7);

    // --- TIMELINE BAR FILL LOGIC ---
    const timelineFill = document.getElementById("timeline-fill");
    if (timelineFill) {
      let progress = ((totalRounds - currentRound + 1) / totalRounds) * 100;
      timelineFill.style.width = progress + "%";
    }
  }

});
  // --- AUDIO TOGGLE LOGIC ---
  // Duplicate logic removed for clarity.
// ========== PROBLEM PICKING & RENDERING ==========
const bigProblemsPool = [
  // Original Problems (retained)
  {
    title: "Small Market Fire",
    desc: "A minor blaze damages stalls in the forum.",
    rarity: "common",
    options: [
      {label: "Fund Repairs (200)", cost: 200, riot: 0, unrest: 0, infra: +1, pol: 0, msg: "Vendors are thankful, commerce resumes."},
      {label: "Ignore (0)", cost: 0, riot: 1, unrest: +1, infra: -1, pol: 0, msg: "Stalls burn, discontent grows."}
    ]
  },
  {
    title: "Revolt in Campania",
    desc: "Captives of war and gladiators have escaped and begun to organize and attack Patrician estates.",
    rarity: "uncommon",
    options: [
      {label: "Crush Revolt (800)", cost: 800, riot: 0, unrest: -1, infra: 0, pol: +1, msg: "Order restored, landowners pleased."},
      {label: "Negotiate Amnesty (400)", cost: 400, riot: 0, unrest: 0, infra: 0, pol: 0, msg: "Tense peace established, uneasy balance."},
      {label: "Ignore (0)", cost: 0, riot: 1, unrest: +2, infra: -1, pol: -1, msg: "Rebellion grows stronger."}
    ]
  },
  {
    title: "Pirates Disrupting Mediterranean Trade",
    desc: "Pirate fleets are severely hindering vital grain shipments.",
    rarity: "rare",
    options: [
      {label: "Large Naval Expedition (1000)", cost: 1000, riot: 0, unrest: -1, infra: +1, pol: +1, msg: "Seas cleared, commerce flourishes."},
      {label: "Pay Tribute (500)", cost: 500, riot: 0, unrest: 0, infra: 0, pol: -1, msg: "Temporary peace at a cost to pride."},
      {label: "Ignore (0)", cost: 0, riot: 2, unrest: +2, infra: -2, pol: -1, msg: "Food shortages incite riots."}
    ]
  },
  {
    title: "Bribery Scandal",
    desc: "Prominent senators are accused of corruption.",
    rarity: "common",
    options: [
      {label: "Public Trial (300)", cost: 300, riot: 0, unrest: -1, infra: 0, pol: +1, msg: "Justice seen, popularity rises."},
      {label: "Quietly Settle (150)", cost: 150, riot: 0, unrest: 0, infra: 0, pol: -1, msg: "Rumors persist, trust weakens."},
      {label: "Ignore (0)", cost: 0, riot: 1, unrest: +1, infra: 0, pol: -2, msg: "Public outrage grows."}
    ]
  },
  {
    title: "Plague Outbreak in Ostia",
    desc: "A severe epidemic threatens Rome's main port.",
    rarity: "rare",
    options: [
      {label: "Immediate Quarantine (700)", cost: 700, riot: 0, unrest: -1, infra: 0, pol: 0, msg: "Spread contained, trade slowed temporarily."},
      {label: "Minimal Aid (300)", cost: 300, riot: 0, unrest: +1, infra: -1, pol: 0, msg: "Deaths limited, public uneasy."},
      {label: "Ignore (0)", cost: 0, riot: 2, unrest: +3, infra: -2, pol: -1, msg: "Disease ravages populace."}
    ]
  },
  {
    title: "Road Infrastructure Crumbling",
    desc: "Key Roman roads vital to commerce need maintenance.",
    rarity: "common",
    options: [
      {label: "Full Restoration (500)", cost: 500, riot: 0, unrest: -1, infra: +2, pol: 0, msg: "Travel and trade prosper."},
      {label: "Quick Fixes (250)", cost: 250, riot: 0, unrest: 0, infra: +1, pol: 0, msg: "Temporary relief achieved."},
      {label: "Ignore (0)", cost: 0, riot: 1, unrest: +1, infra: -2, pol: -1, msg: "Commerce suffers greatly."}
    ]
  },
  {
    title: "Religious Sectarian Conflict",
    desc: "New cults worshiping minor gods are causing religious tensions in Rome.",
    rarity: "uncommon",
    options: [
      {label: "Suppress Sect (600)", cost: 600, riot: 0, unrest: -1, infra: 0, pol: 0, msg: "Traditionalists pleased, tension fades."},
      {label: "Allow Worship (0)", cost: 0, riot: -1, unrest: +1, infra: 0, pol: -1, msg: "Public confused, unrest grows."}
    ]
  },
  {
    title: "Flooding of the Tiber",
    desc: "Severe flooding damages homes and granaries.",
    rarity: "rare",
    options: [
      {label: "Major Relief Effort (800)", cost: 800, riot: 0, unrest: -2, infra: +1, pol: +1, msg: "City recovers, people grateful."},
      {label: "Minimal Assistance (400)", cost: 400, riot: 0, unrest: 0, infra: 0, pol: 0, msg: "Partial recovery, mixed feelings."},
      {label: "Ignore (0)", cost: 0, riot: 2, unrest: +3, infra: -2, pol: -2, msg: "People lose faith, chaos rises."}
    ]
  },
  {
    title: "Gladiator Riots",
    desc: "Violence and riots erupt following a controversial arena fight.",
    rarity: "uncommon",
    options: [
      {label: "Send in the Legions to teach them a lesson(500)", cost: 500, riot: -1, unrest: -1, infra: 0, pol: +1, msg: "Order in the streets swiftly restored ."},
      {label: "Pacify Crowds with bread and promises (200)", cost: 200, riot: 0, unrest: 0, infra: 0, pol: 0, msg: "Riots quelled until the next fight."},
      {label: "Mobs will be mobs. Ignore (0)", cost: 0, riot: 2, unrest: +2, infra: -1, pol: -1, msg: "Violence spreads into the surrounding neighborhoods."}
    ]
  },
  {
    title: "Toga Shortage",
    desc: "Senators complain about insufficient luxury fabrics.",
    rarity: "silly",
    options: [
      {label: "Import Egyptian Cotton (145)", cost: 145, riot: 0, unrest: 0, infra: 0, pol: +1, msg: "Senators looking faaaabulous."},
      {label: "Use Cheap Wool (45)", cost: 45, riot: 0, unrest: 0, infra: 0, pol: -1, msg: "Itchy senators complain even louder."}
    ]
  },
  {
    title: "Lions Escape from Patrician's Private Pames",
    desc: "Lions from the games roam freely in streets causing panic.",
    rarity: "silly",
    options: [
      {label: "Round Them Up and return them to owner for bribe (+300)", cost: -300, riot: 0, unrest: -1, infra: +1, pol: -2, msg: "Lions returned safely."},
      {label: "Ignore (0)", cost: 0, riot: 0, unrest: +1, infra: 0, pol: -1, msg: "Chaos ensues, but it’s entertaining."},
      {label: "Send in the Legions to hunt them down (500)", cost: 500, riot: 0, unrest: -1, infra: +1, pol: +1, msg: "Lions eliminated, citizens relieved."},
      {label: "Keep them as pets (0)", cost: 0, riot: 0, unrest: +1, infra: 0, pol: -1, msg: "Lions become local celebrities."}
    ]
  },
  {
    title: "Overpriced Garum",
    desc: "Fish sauce (garum) prices spike, citizens distressed over staple condiment.",
    rarity: "silly",
    options: [
      {label: "Subsidize Sauce (110)", cost: 110, riot: 0, unrest: -1, infra: 0, pol: +1, msg: "Citizens happily slather sauce again."},
      {label: "Ignore Complaints (0)", cost: 0, riot: 0, unrest: +1, infra: 0, pol: -1, msg: "Dry meals create disgruntled citizens."}
    ]
  },
  {
    title: "Excessive Bird Droppings in Forum",
    desc: "Swallows are making the forum quite unpleasant for public gatherings.",
    rarity: "silly",
    options: [
      {label: "Hire Bird Shooers (90)", cost: 90, riot: 0, unrest: 0, infra: +1, pol: 0, msg: "Clean forum, happy citizens."},
      {label: "Do Nothing (0)", cost: 0, riot: 0, unrest: +1, infra: -1, pol: -1, msg: "Attendance at fourm is low, angering orators and worrying market vendors."}
    ]
  },
  {
    title: "Statue Missing Nose",
    desc: "A prominent statue of Zeus loses its nose; citizens demand repairs.",
    rarity: "silly",
    options: [
      {label: "Repair Nose (75)", cost: 280, riot: 0, unrest: -1, infra: 0, pol: 0, msg: "Statue's dignity restored."},
      {label: "Embrace New Look (0)", cost: 0, riot: 0, unrest: +1, infra: 0, pol: -1, msg: "Statue becomes joke and minor embarrassment. The gods are displeased."}
    ]
  },
  {
    title: "Drought in Africa",
    desc: "Grain supply from Africa is severely reduced.",
    rarity: "rare",
    options: [
      {label: "Buy Alternative Supplies from Barbarians in the north (850)", cost: 850, riot: 0, unrest: -1, infra: 0, pol: +1, msg: "Food supply stabilized."},
      {label: "Ration Grain (400)", cost: 400, riot: 1, unrest: +1, infra: 0, pol: 0, msg: "Citizens grumble but adapt."},
      {label: "Ignore (0)", cost: 0, riot: 2, unrest: +3, infra: -1, pol: -2, msg: "Small famine as food shortages ensue."}
    ]
  },
  {
    title: "Eruption of Mount Vesuvius",
    desc: "Fire and ash devastate nearby towns and block major roads.",
    rarity: "extreme",
    options: [
      {label: "Massive Relief Operation (1300)", cost: 1300, riot: 0, unrest: -3, infra: +2, pol: +2, msg: "Region stabilized, citizens thankful."},
      {label: "Minimal Aid (600)", cost: 600, riot: 0, unrest: +1, infra: 0, pol: -1, msg: "Partial recovery, but resentment percolates like the moountain itself."},
      {label: "Ignore (0)", cost: 0, riot: 3, unrest: +4, infra: -3, pol: -3, msg: "Devastation widespread, crisis deepens as the people despair your leadership."}
    ]
  },
  {
    title: "Germanic Tribes Cross the Rhine!",
    desc: "Tribes are invading Roman territory, causing chaos.",
    rarity: "extreme",
    options: [
      {label: "Raise New Legions (1100)", cost: 1100, riot: 0, unrest: -2, infra: +1, pol: +1, msg: "Your swift actions crush the barbarian hordes."},
      {label: "Fortify Borders (550)", cost: 550, riot: 0, unrest: +1, infra: 0, pol: 0, msg: "The frontiers settle into an uneasy peace."},
      {label: "Ignore (0)", cost: 0, riot: 2, unrest: +3, infra: -2, pol: -2, msg: "Border regions ravaged and a darkness falls on Rome."}
    ]
  },
  {
    title: "Coinage Crisis: Minting Error",
    desc: "This isn't silver! Magistrates caught using incorrect alloys.",
    rarity: "rare",
    options: [
      {label: "Recall and Reissue Coins (900)", cost: 900, riot: 0, unrest: -1, infra: +1, pol: +1, msg: "Currency stabilized."},
      {label: "Minor Monetary Adjustment (500)", cost: 500, riot: 0, unrest: 0, infra: 0, pol: -1, msg: "Temporary economic relief."},
      {label: "Feed Those Resposible to the Lions (0)", cost: 0, riot: -1, unrest: -1, infra: -1, pol: 2, msg: "Economy collapses, but the public is entertained."},
      {label: "Ignore (0)", cost: 0, riot: 2, unrest: +2, infra: -2, pol: -2, msg: "Economy collapses. Rome crumbles."}
    ]
  },
  // Personal, Surreptitious Senatorial Problems
  {
    title: "Black Market Weapon Deal",
    desc: "A greek mercenery offers you a chance to sell surplus military equipment.",
    rarity: "personal",
    options: [
      {label: "Sell Weapons (+500 gold)", cost: -500, riot: +1, unrest: +1, infra: 0, pol: -1, msg: "Profits gained, shady connections strengthened."},
      {label: "Redirect to Legion (infra +1)", cost: 0, riot: 0, unrest: 0, infra: +1, pol: 0, msg: "Legion strengthened, goodwill increased."}
    ]
  },
  {
    title: "Hidden Informant",
    desc: "A trusted contact offers critical political intel on the Tribunes, but for a price.",
    rarity: "personal",
    options: [
      {label: "Buy Intel (250)", cost: 250, riot: 0, unrest: 0, infra: 0, pol: +2, msg: "You gain political leverage."},
      {label: "Ignore (0)", cost: 0, riot: 0, unrest: 0, infra: 0, pol: 0, msg: "Missed opportunity. The spy might sell the information to your rivals."}
    ]
  },
  {
    title: "Secret Tax Skimming",
    desc: "Tax collectors offer you a cut from provincial collections.",
    rarity: "personal",
    options: [
      {label: "Take Cut (+450 gold)", cost: -450, riot: 0, unrest: +1, infra: 0, pol: -1, msg: "Your coffers grow heavy."},
      {label: "Refuse and instead direct funds to Public Works (infra +1)", cost: 0, riot: 0, unrest: -1, infra: +1, pol: +1, msg: "Streets get new cobblestones and citizens rejoice."},
      {label: "Report to Authorities", cost: 0, riot: 0, unrest: -1, infra: 0, pol: -1, msg: "Your virtue is honorable, but your honesty makes colleagues in the senate uneasy."}
    ]
  },
  {
    title: "Back-Alley Assassin",
    desc: "An assassin offers to quietly remove a political rival.",
    rarity: "personal",
    options: [
      {label: "Hire Assassin (400)", cost: 400, riot: 0, unrest: 0, infra: 0, pol: +2, msg: "Rival mysteriously disappears."},
      {label: "Decline (0)", cost: 0, riot: 0, unrest: 0, infra: 0, pol: 0, msg: "Your conscience wins the day, but your rival might not be so honorable."},
      {label: "Report to Authorities (0) (pol +1)", cost: 0, riot: 0, unrest: -1, infra: 0, pol: +1, msg: "You appear virtuous and principled."},
      {label: "Do it yourself (0) (pol -1)", cost: 0, riot: 0, unrest: +1, infra: 0, pol: -1, msg: "You take matters into your own hands, but at a cost to your reputation."}
    ]
  },
  {
    title: "Exotic Goods Smuggling",
    desc: "Smugglers offer you exotic luxury items to sell.",
    rarity: "personal",
    options: [
      {label: "Sell Goods (+350 gold)", cost: -350, riot: 0, unrest: 0, infra: 0, pol: 0, msg: "You make out like a bandit."},
      {label: "Gift to Public (+1 pol)", cost: 0, riot: 0, unrest: -1, infra: 0, pol: +1, msg: "You gain popular favor."}
    ]
  },
  {
    title: "Private Gladiator Match",
    desc: "Host a private match to impress influential figures.",
    rarity: "personal",
    options: [
      {label: "Host Match (200)", cost: 200, riot: 0, unrest: 0, infra: 0, pol: +2, msg: "These influential new friends will come in handy."},
      {label: "Pass Opportunity (0)", cost: 0, riot: 0, unrest: 0, infra: 0, pol: 0, msg: "Your modesty reeks of virtue."}
    ]
  },
  {
    title: "Secret Grain Hoard",
    desc: "You discover a large stash of grain at the estate of a recently deceased Patrician.",
    rarity: "personal",
    options: [
      {label: "Sell discreetly to disreputable breadmakers (+400 gold)", cost: -400, riot: 0, unrest: +1, infra: 0, pol: -1, msg: "You quietly enrich yourself."},
      {label: "Donate to City (unrest -1)", cost: 0, riot: -1, unrest: -1, infra: 0, pol: +1, msg: "The people make sacrifices to your name and laud your generosity."}
    ]
  },
  {
    title: "Fake Relic Scam",
    desc: "Craftsman offers convincing fake relics for quick profit.",
    rarity: "personal",
    options: [
      {label: "Sell Relics (+250 gold)", cost: -250, riot: 0, unrest: +1, infra: 0, pol: -1, msg: "Profits high, morals questionable."},
      {label: "Expose Fraud (pol +1)", cost: 0, riot: 0, unrest: -1, infra: 0, pol: +1, msg: "You appear righteous and trustworthy."}
    ]
  }
];
function pickProblem() {
  const roll = Math.random();
  let pool;
  if (roll < 0.5) {
    pool = bigProblemsPool.filter(p => p.rarity==="common");
  } else if (roll < 0.85) {
    pool = bigProblemsPool.filter(p => p.rarity==="uncommon");
  } else if (roll < 0.95) {
    pool = bigProblemsPool.filter(p => p.rarity==="extreme");
  } else {
    pool = bigProblemsPool.filter(p => p.rarity==="silly");
  }

  let available = pool.filter(p => !usedProblems.includes(p.title));
  if (available.length === 0) {
    available = bigProblemsPool.filter(p => !usedProblems.includes(p.title));
  }
  if (available.length === 0) {
    available = bigProblemsPool; // allow repeats
  }

  const chosen = available[Math.floor(Math.random() * available.length)];
  if (chosen) usedProblems.push(chosen.title);
  return chosen;
}

  function typewriterEffect(element, text, delay = 24, callback = null) {
  let i = 0;
  function typeNext() {
    element.textContent = text.slice(0, i + 1);
    i++;
    if (i < text.length) {
      setTimeout(typeNext, delay);
    } else if (callback) {
      callback();
    }
  }
  typeNext();
}
// ========== PROBLEM RENDERING ==========
function renderProblem(problem, onResolved) {
  // Clear area
  problemArea.innerHTML = "";

  // Create title & description
  const title = document.createElement("div");
  title.className = "problem-title";
  title.textContent = "";
  typewriterEffect(title, problem.title, 28);

  const desc = document.createElement("div");
  desc.className = "problem-desc";
  desc.textContent = ""; //start empty for typewriter effect

  // Append title and desc
  problemArea.appendChild(title);
  problemArea.appendChild(desc);

  // Add a delay before starting the typewriter effect
  // This allows the title to appear first before the description starts typin
  setTimeout(() => {
    typewriterEffect(desc, problem.desc, 34, () => {
      setTimeout(() => {   
        problemArea.appendChild(optionsRow);
      }, 150); // Slight delay before showing options
    });
  }, 400); // <--- Delay before starting description

  // Create a flex row for the options
  const optionsRow = document.createElement("div");
  optionsRow.className = "problem-options-row";

  // Render each button inside the flex row
  problem.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt.label;
    btn.className = "problem-option-btn";
    btn.onclick = () => {
      treasury += opt.cost !== undefined ? -opt.cost : 0;
      riotTokens += opt.riot || 0;
      unrest += opt.unrest || 0;
      infrastructure += opt.infra || 0;
      politics += opt.pol || 0;

      delayedLog(
        opt.msg,
        (opt.riot > 0 || opt.unrest > 0 || opt.cost > 0) ? "log-negative" : "log-positive",
        () => {
          updateScoreboard();
          pickRandomEvent();
          if (onResolved) onResolved();
        }
      );

      // Disable all buttons after selection
      Array.from(optionsRow.querySelectorAll('button')).forEach(b => b.disabled = true);
    };
    optionsRow.appendChild(btn);
  });

  // Add the flex row to the problem area
      problemArea.appendChild(optionsRow);
}
// ========== RANDOM EVENTS & NPC CAMEOS ==========
// ==========================================
// NPC CAMEOS (Historic Figures & Quotes)
// ==========================================
const cameoNPCs = [
  {name: "Cicero", quote: "The welfare of the people is the ultimate law."},
  {name: "Seneca", quote: "Fire tests gold, suffering tests brave men."},
  {name: "Caesar", quote: "Experience is the teacher of all things."},
  {name: "Cato the Elder", quote: "Carthago delenda est! (Carthage must be destroyed!)"},
  {name: "Cleopatra", quote: "I will not be triumphed over."},
  {name: "Pliny the Elder", quote: "Fortune favors the bold."},
  {name: "Livy", quote: "Events of great consequence often spring from trifling circumstances."},
  {name: "Virgil", quote: "Fortunate is he who is able to know the causes of things."},
  {name: "Spartacus", quote: "Better to die free than live as a slave."},
  {name: "Crassus", quote: "You can never have too much gold. Or too many enemies."},
  {name: "Pompey the Great", quote: "Stop quoting laws to us. We carry swords."},
  {name: "Brutus", quote: "I love Caesar, but I love Rome more."},
  {name: "Sulla", quote: "No friend ever served me, and no enemy ever wronged me, whom I have not repaid in full."},
  {name: "Horace", quote: "Pulvis et umbra sumus. (We are but dust and shadow.)"},
  {name: "Ovid", quote: "Happy is the man who has broken the chains which hurt the mind, once and for all."},
  {name: "Cicero", quote: "O tempora, o mores! (Oh, the times! Oh, the morals!)"},
  {name: "Catullus", quote: "I hate and I love. Perhaps you ask why? I do not know, but I feel it, and I am tortured."},
  {name: "Vitruvius", quote: "Well building hath three conditions: firmness, commodity, and delight."},
  {name: "Seneca", quote: "Religion is regarded by the common people as true, by the wise as false, and by rulers as useful."},
  {name: "Plutarch", quote: "An imbalance between rich and poor is the oldest and most fatal ailment of all republics."},
  {name: "Cornelia points to assassinated sons and", quote: "These are my jewels!"},
  {name: "Scipio Africanus", quote: "I am never less at leisure than when at leisure, nor less alone than when alone."},
  {name: "Pliny the Younger", quote: "It is better to act too quickly than too late."}
];

// List of "verbs" for flavor dialogue:
const cameoVerbs = [
  "whispers from the void", "shouts", "growls", "mocks", "proclaims", "boasts", "warns", "chuckles",
  "sighs", "remarks", "intones", "laments", "declares", "cries", "hisses",
  "scoffs", "mutters", "utters", "chants", "writes", "recites", "observes", "reminds you", "exclaims", "sneers"
];

// Cameo comment function:
function cameoComment(force = false) {
  // About 4 out of 13 times.
  if (!force && Math.random() > (4/13)) return;

  if (!Array.isArray(cameoNPCs) || cameoNPCs.length === 0) {
    delayedLog("No more historic voices echo through the Senate.", "log-cameo");
    return;
  }
  // Pick a random cameo
  const idx = Math.floor(Math.random() * cameoNPCs.length);
  const cameo = cameoNPCs.splice(idx, 1)[0]; // Remove to avoid repeats

  // Pick a random verb (make sure cameoVerbs is defined!)
  const verb = cameoVerbs[Math.floor(Math.random() * cameoVerbs.length)];

  // Build the narrative cameo message, as HTML
  const msg = `<span class="cameo-npc-name">${cameo.name} ${verb}:<br></span>
    <span class="cameo-quote">${cameo.quote}</span>`;
  setTimeout(() => delayedLog(msg, "log-cameo"), 900); // <---- PAUSE HERE (900ms is a “beat” or two)

}const randomEvents = [
  {
    desc: "Bandit Raids! -200 denarii",
    effect: () => { treasury -= 200; },
    cameo: "A merchant complains, 'Highway robbery is rampant!' Rival merchant scoffs, 'Look who's talking, with your inflated prices!'"
  },
  {
    desc: "The Consuls celebrate new tax revenues! +300 denarii",
    effect: () => { treasury += 300; },
    cameo: "A citizen grumbles, 'Why does a tax collector wield a club?'"
  },
  {
    desc: "Tax Revenue! +350 denarii",
    effect: () => { treasury += 350; },
    cameo: "A collector beams, 'Gold flows from distant provinces!'"
  },
  {
    desc: "Plague Strikes! -400 denarii, +1 unrest",
    effect: () => { treasury -= 400; unrest++; },
    cameo: "A physician laments, 'Pestilence grips the slums!'"
  },
  {
    desc: "Gladiator Riot! -100 denarii, +2 Riot Token",
    effect: () => { treasury -= 100; riotTokens +=2; },
    cameo: "A guard shouts, 'They have broken loose in the streets!'"
  },
  {
    desc: "Bountiful Harvest! +325 denarii, -1 unrest",
    effect: () => { treasury += 325; unrest = Math.max(0, unrest-1); },
    cameo: "A farmer grins, 'Praise Ceres, for she has blessed our fields!'"
  },
  {
    desc: "Temple Donation! Corruption? +150 denarii, +1 politics",
    effect: () => { treasury += 150; politics++; },
    cameo: "A priest smiles, 'Generous offerings please the gods!'"
  },
  {
    desc: "Collapsed Acqueduct! -250 denarii, -1 infrastructure",
    effect: () => { treasury -= 250; infrastructure--; },
    cameo: "A stonemason shakes his head, 'We warned you about those cracks!'"
  },
  {
    desc: "Saturnalia Festival Celebrations! -100 denarii, -2 unrest",
    effect: () => { treasury -= 100; unrest = Math.max(0, unrest-2); },
    cameo: "A citizen cheers, 'Facitis vobis suaviter, ego canto! (Get ready, 'cause I'm about to sing!'"
  },
  {
    desc: "Foreign Tribute From The West! +400 denarii",
    effect: () => { treasury += 400; },
    cameo: "An envoy bows, 'Allies abroad respect Rome's strength!'"
  },
  {
    desc: "Military Desertion in Numibia! -150 denarii, +1 unrest",
    effect: () => { treasury -= 150; unrest++; },
    cameo: "A centurion grimaces, 'Morale is dangerously low!'"
  },
  {
    desc: "Public Bath Renovation! -200 denarii, +1 infrastructure",
    effect: () => { treasury -= 200; infrastructure++; },
    cameo: "An architect nods approvingly, 'Mars himself will grace these waters after battle!'"
  },
  {
    desc: "New Overland Trade Route Discovered! +350 denarii, +1 politics",
    effect: () => { treasury += 350; politics++; },
    cameo: "A merchant boasts, 'Business has never been better!'"
  },
  {
    desc: "Barbarian lands conquered! +800 denarii, +2 politics",
    effect: () => { treasury += 800; politics += 2; },
    cameo: "A legion commander cautions, 'The soldiers are tired and wish to see their families.'"
  },
  {
    desc: "Grain Spoilage! -200 denarii, +1 unrest",
    effect: () => { treasury -= 200; unrest++; },
    cameo: "A storekeeper frowns, 'My customers go hungry!'"
  },
  {
    desc: "Wealthy patrician bequeaths estate to the Republic! +600 denarii, +2 politics",
    effect: () => { treasury += 600; politics += 2; },
    cameo: "An aristocrat smirks, 'I hear his death was of natural causes, too!'"
  },
  {
    desc: "Street Thieves Apprehended! +150 denarii, -1 unrest",
    effect: () => { treasury += 150; unrest = Math.max(0, unrest-1); },
    cameo: "A night watchman proudly reports, 'The vigiles have made our streets safe again!'"
  },
  {
    desc: "Political Scandal! -300 denarii, +2 unrest",
    effect: () => { treasury -= 300; unrest += 2; },
    cameo: "The condemned senator whispers, 'The Plebeians have it out for me!'"
  },
  {
    desc: "Unexpected Senate Vote on this year's Saturnalia plans! -100 denarii, +1 politics",
    effect: () => { treasury -= 100; politics++; },
    cameo: "A senator grumbles, 'I thought we were done for the day!'"
  },
  {
    desc: "Public Works Project Complete! +200 denarii, +1 infrastructure",
    effect: () => { treasury += 200; infrastructure++; },
    cameo: "An engineer dances, 'My aqueducts bring all the puer to the forum!'"
  },
  {
    desc: "Civic Festival! -150 denarii, -1 unrest",
    effect: () => { treasury -= 150; unrest = Math.max(0, unrest-1); },
    cameo: "A throng of citizens cheer, 'Long live the Republic!'"
  },
  {   
    desc: "Corrupt Quaestor Exposed! -500 denarii, +2 politics",
    effect: () => { treasury -= 200; politics++; },
    cameo: "A courtesan rolls her eyes, 'Rome is saved!'"
  },
  { 
    desc: "Senatorial Rivalry Escalates! -300 denarii, +2 politics",
    effect: () => { treasury -= 300; politics += 2; },
    cameo: "Your rival sneers, 'Fool. You think you can outwit me?'"
  },

];
function pickRandomEvent() {
  if (Math.random() < 0.2) { // 20% chance of a random event
    const availableEvents = randomEvents.filter(event => !event.used);
    if (availableEvents.length === 0) return null; // No more events available

    // Pick a random event from the available ones
    const event = availableEvents[Math.floor(Math.random() * availableEvents.length)];
    event.used = true;

    // Apply the effect
    if (event.effect) event.effect();
    if (checkImmediateGameOver()) return;

    // Show event in modal
    const modal = document.getElementById("random-event-modal");
    const descEl = document.getElementById("random-event-desc");
    const cameoEl = document.getElementById("random-event-cameo");
    const closeBtn = document.getElementById("random-event-close-btn");
    if (modal && descEl && cameoEl && closeBtn) {
      descEl.textContent = event.desc;
      cameoEl.textContent = event.cameo || "";
      modal.classList.remove("hidden");
      modal.style.zIndex = "4000"; // ensure above all game UI
      closeBtn.focus();

      function closeModal() {
        modal.classList.add("hidden");
        modal.style.zIndex = ""; // reset to default when closed
        closeBtn.removeEventListener("click", closeModal);
      }
      closeBtn.addEventListener("click", closeModal, { once: true });
    }
    return event; // Now returns the correct event object
  }
  return null;
}
function updatetitlesDisplay() {
  const left = document.getElementById('titles-left');
  const right = document.getElementById('titles-right');
  if (!left && !right) return;
  if (left) left.innerHTML = '';
  if (right) right.innerHTML = '';
  const list = (function(){
    try { return Array.isArray(window.honoraryTitles) ? window.honoraryTitles : honoraryTitles; }
    catch(_) { return honoraryTitles || []; }
  })();
  list.forEach((title, idx) => {
    const badge = document.createElement('div');
    badge.className = 'honorary-title-badge';
    badge.textContent = title;
    const target = (left && right) ? ((idx % 2 === 0) ? left : right) : (left || right);
    if (target) target.appendChild(badge);
  });
}
// ========== END ROUND & SUMMARY ==========
function endRound() {
  if (checkGameEnd()) return;
  gameScreen.classList.add("hidden");
  roundSummary.classList.remove("hidden");

  summaryRound.textContent = currentRound;
  let summaryMsg = `Treasury: ${treasury}, Riot Tokens: ${riotTokens}, Unrest: ${unrest}, Infrastructure: ${infrastructure}, Politics: ${politics}. `;

  if (treasury < 500) summaryMsg += "Your coffers are dangerously low! ";
  if (treasury > 10000) summaryMsg += "Riches abound! Envy follows... ";
  if (unrest > 5) summaryMsg += "The streets rumble with discontent. ";
  if (infrastructure < -2) summaryMsg += "City infrastructure crumbles. ";
  if (politics < -3) summaryMsg += "Rivals mock your incompetence. ";
  if (riotTokens >= 2) summaryMsg += "A mob forms in the back alleys... ";

  if (summaryMsg.trim() === "") summaryMsg = "Rome stands... for now.";

  roundSummaryText.textContent = summaryMsg;
}

// ========== GAME OVER CHECK & LOGIC ==========
function checkGameEnd() {
  // --- WIN: Survived All Rounds ---
  if (currentRound > totalRounds && !gameOver) {
    endGame(true, "You survived all 12 rounds... The Republic limps on!");
    return true;
  }
  return false; // No end condition met or not a win
}

function endGame(survived = false, msg = "") {
  if (gameOver) return; // Prevent double-trigger
  gameOver = true;
  if (gameScreen) gameScreen.classList.add("hidden");
  if (roundSummary) roundSummary.classList.add("hidden");
  if (btnNextRound) btnNextRound.classList.add("hidden");

  // Hide gameplay, show game over screen using only .hidden class
  gameScreen.classList.add("hidden");
  roundSummary.classList.add("hidden");
  gameOverScreen.classList.remove("hidden");

  // Hide audio next track button on game over
  if (audioNextTrack) audioNextTrack.classList.add('hidden');

  // Art/animation
  const artDiv = document.getElementById("gameover-art");
  if (artDiv) {
    artDiv.innerHTML = survived
      ? `<img src="assets/victory_laurel.png" alt="Victory Laurel" style="width:200px;height:auto;">`
      : `<img src="assets/defeat_ruins.png" alt="Defeated Rome" style="width:200px;height:auto;">`;
  }

  // Heading
  const heading = document.getElementById("game-over-heading");
  if (heading) {
    heading.textContent = survived ? "VICTORY!" : "DEFEAT";
  }
  // Launch confetti if victory
  if (survived) launchVictoryConfetti();

  // Quotes
  const victoryQuotes = [
    "“You have restored the Republic. The people rejoice!” – Cicero",
    "“Rome stands, and you stand with her.” – Livy",
    "“Fortune favors the bold.” – Pliny the Elder"
  ];
  const defeatQuotes = [
    "“Alas, how quickly things decline.” – Ovid",
    "“The Republic falls not by force, but by neglect.” – Seneca",
    "“The mob is fickle.” – Julius Caesar"
  ];
  const quote = survived
    ? victoryQuotes[Math.floor(Math.random() * victoryQuotes.length)]
    : defeatQuotes[Math.floor(Math.random() * defeatQuotes.length)];
  const quoteEl = document.getElementById("game-over-quote");
  if (quoteEl) {
    quoteEl.textContent = quote;
  }

  // === Endgame Stat Commentary Table ===
  // Use only id="endgame-stats-panel" for stats container,
  // only class="endgame-panel-title" for heading,
  // only .endgame-stats-row, .endgame-stats-label, .endgame-stats-msg for stats rows/cells.
  const endStats = [
    { label: "Treasury", stat: "treasury", value: treasury },
    { label: "Riot Tokens", stat: "riotTokens", value: riotTokens },
    { label: "Unrest", stat: "unrest", value: unrest },
    { label: "Infrastructure", stat: "infrastructure", value: infrastructure },
    { label: "Politics", stat: "politics", value: politics }
  ];
  // Create a container for the stats table and title
  const statsContainer = document.getElementById("endgame-stats-panel");
  if (statsContainer) {
    statsContainer.innerHTML = "";
    // Add a standardized heading
    const statsHeading = document.createElement("div");
    statsHeading.className = "endgame-panel-title";
    statsHeading.textContent = "Your Consular Record";
    statsContainer.appendChild(statsHeading);
    // Table
    const endStatsTable = document.createElement("div");
    endStats.forEach(({ label, stat, value }) => {
      const row = document.createElement("div");
      row.className = "endgame-stats-row";
      const labelCol = document.createElement("div");
      labelCol.className = "endgame-stats-label";
      labelCol.textContent = `${label}: ${value}`;
      const msgCol = document.createElement("div");
      msgCol.className = "endgame-stats-msg";
      msgCol.textContent = getStatCommentary(stat, value);
      row.appendChild(labelCol);
      row.appendChild(msgCol);
      endStatsTable.appendChild(row);
    });
    statsContainer.appendChild(endStatsTable);

    // Honorary Titles Section
    if (honoraryTitles && honoraryTitles.length > 0) {
      const titlesSection = document.createElement('div');
      titlesSection.className = 'endgame-titles-section';
      titlesSection.innerHTML = `
        <div class="endgame-stats-label" style="margin:0.7em 0 0.1em 0; text-align:center;">Titles Earned</div>
        <div class="endgame-titles-list">
          ${honoraryTitles.map(title => `<span class="honorary-title-badge">${title}</span>`).join(' ')}
        </div>
      `;
      statsContainer.appendChild(titlesSection);
    }
  }

  // Final message
  let randomEndMsg;
  if (survived) {
    randomEndMsg = endGameWinMessages[Math.floor(Math.random() * endGameWinMessages.length)];
  } else {
    randomEndMsg = endGameDefeatMessages[Math.floor(Math.random() * endGameDefeatMessages.length)];
  }
  let finalMsg = randomEndMsg + "\n\n" + msg;
  if (survived && treasury >= 10000) {
    finalMsg += "\nIncredible wealth! Perhaps you are the next Augustus...";
  }
  if (gameOverText) {
    gameOverText.textContent = finalMsg;
  }

  // Update scoreboard (if you want stats visible in background)
  updateScoreboard();
}



// ========== UPDATE SCOREBOARD & DELAYED LOGS ==========
// Call this at the end of updateScoreboard()
function updateScoreboard() {
  if (yearDisplay) yearDisplay.textContent = year;
  if (senatorNameDisplay) senatorNameDisplay.textContent = senatorName;
  if (treasuryDisplay) treasuryDisplay.textContent = treasury;
  if (riotDisplay) riotDisplay.textContent = riotTokens;
  if (unrestDisplay) unrestDisplay.textContent = unrest;
  if (infraDisplay) infraDisplay.textContent = infrastructure;
  if (politicsDisplay) politicsDisplay.textContent = politics;

  // Update loot button count if present
  try {
    const btnLoot = document.getElementById('btn-loot');
    if (btnLoot) {
      const count = Array.isArray(window.inventory) ? window.inventory.length : 0;
      btnLoot.textContent = `🎒 Loot${count ? ` (${count})` : ''}`;
    }
  } catch(_) {}

  // --- SCOREBOARD BAR GRAPH LOGIC ---
  function updateScoreBar(barId, value, min, max, direction = "normal") {
    const bar = document.getElementById(barId);
    if (!bar) return;
    let fill = bar.querySelector('.score-bar-fill');
    if (!fill) {
      fill = document.createElement('div');
      fill.className = 'score-bar-fill';
      bar.appendChild(fill);
    }
    const centerVal = 0;
    let percent;
    if (direction === "reverse") {
      if (value <= centerVal) {
        percent = (centerVal - value) / (centerVal - min);
        fill.style.left = (50 - Math.min(1, percent) * 50) + '%';
        fill.style.width = (Math.min(1, percent) * 50) + '%';
        fill.style.background = '#4ec650';
      } else {
        percent = (value - centerVal) / (max - centerVal);
        fill.style.left = '50%';
        fill.style.width = (Math.min(1, percent) * 50) + '%';
        fill.style.background = '#f44';
      }
    } else {
      if (value >= centerVal) {
        percent = (value - centerVal) / (max - centerVal);
        fill.style.left = '50%';
        fill.style.width = (Math.min(1, percent) * 50) + '%';
        fill.style.background = '#4ec650';
      } else {
        percent = (centerVal - value) / (centerVal - min);
        fill.style.left = (50 - Math.min(1, percent) * 50) + '%';
        fill.style.width = (Math.min(1, percent) * 50) + '%';
        fill.style.background = '#f44';
      }
    }
  }
  updateScoreBar('riot-bar', riotTokens, -6, 6, "reverse");
  updateScoreBar('unrest-bar', unrest, -10, 10, "reverse");
  updateScoreBar('infra-bar', infrastructure, -10, 12);
  updateScoreBar('politics-bar', politics, -7, 15);

  // --- DANGER SHAKE & DANGER CLASS LOGIC ---
  function applyDangerShake(barId, dangerCondition) {
    const bar = document.getElementById(barId);
    if (!bar) return;
    const fill = bar.querySelector('.score-bar-fill');
    if (dangerCondition) {
      bar.classList.add('danger-shake');
      if (fill) fill.classList.add('danger', 'danger-shake');
    } else {
      bar.classList.remove('danger-shake');
      if (fill) fill.classList.remove('danger', 'danger-shake');
    }
  }
  applyDangerShake('riot-bar', riotTokens >= 6);
  applyDangerShake('unrest-bar', unrest >= 10);
  applyDangerShake('infra-bar', infrastructure <= -10);
  applyDangerShake('politics-bar', politics <= -7);

  // --- TIMELINE BAR FILL LOGIC ---
  const timelineFill = document.getElementById("timeline-fill");
  if (timelineFill) {
    let progress = ((totalRounds - currentRound + 1) / totalRounds) * 100;
    timelineFill.style.width = progress + "%";
  }

  updatetitlesDisplay();
}
if (roundNumEl) roundNumEl.textContent = currentRound;
function delayedLog(message, cssClass="log-info", callback=null) {
  logQueue.push({ message, cssClass, callback });
  processLogQueue();
}

function processLogQueue() {
  if (isLogging) return;
  if (logQueue.length === 0) return;
  isLogging = true;

  const { message, cssClass, callback } = logQueue.shift();
  const entry = document.createElement("div");
  entry.classList.add("log-entry", cssClass, "log-flash");
  // Add new log entries to the TOP of the log
  messageLog.prepend(entry);
  messageLog.scrollTop = 0;

  // Special handling for cameo logs (use innerHTML, no typewriter)
  if (cssClass === "log-cameo") {
    entry.classList.add("cameo-pop");
    // Prepare content (split for name/quote, or just text)
    entry.innerHTML = ""; // We'll typewriter in below
    let i = 0;
    function typeChar() {
      entry.innerHTML = message.slice(0, i + 1);
      i++;
      if (i < message.length) {
        setTimeout(typeChar, 26); // Slow, for drama!
      } else {
        // After typewriter, wait for click or timeout
        function shrinkAndContinue() {
          entry.classList.remove("cameo-pop");
          entry.classList.add("cameo-shrink");
          setTimeout(() => {
            entry.classList.remove("cameo-shrink");
            if (callback) callback();
            isLogging = false;
            messageLog.scrollTop = 0;
            if (logQueue.length > 0) processLogQueue();
          }, 400);
        }
        // Either click or 2.5s delay triggers shrink
        entry.addEventListener("click", shrinkAndContinue, { once: true });
        setTimeout(shrinkAndContinue, 800);
      }
    }
    typeChar();
    return;
  }
  // Typewriter effect for all other logs
  let i = 0;
  function typeNextChar() {
    entry.innerHTML = message.slice(0, i + 1); // new!
    if (++i < message.length) {
      setTimeout(typeNextChar, 28);
    } else {
      setTimeout(() => entry.classList.remove("log-flash"), 350);
      if (callback) callback();
      isLogging = false;
      messageLog.scrollTop = 0;
      if (logQueue.length > 0) processLogQueue();
    }
  }
  typeNextChar();
}
// ========== NPC CAMEOS, END ROUND, GAME OVER, LOGGING, RENDER PROBLEM ==========
function checkForHonoraryTitles() {
  let newTitles = [];

  // --- Politics ---
  if (politics >= 15 && !honoraryTitles.includes("Censor Maximus")) {
    honoraryTitles.push("Censor Maximus"); newTitles.push("Censor Maximus");
  }
  if (politics <= -10 && !honoraryTitles.includes("Infamous Demagogue")) {
    honoraryTitles.push("Infamous Demagogue"); newTitles.push("Infamous Demagogue");
  }

  // --- Infrastructure ---
  if (infrastructure >= 10 && !honoraryTitles.includes("Master Builder")) {
    honoraryTitles.push("Master Builder"); newTitles.push("Master Builder");
  }
  if (infrastructure <= -8 && !honoraryTitles.includes("Urban Menace")) {
    honoraryTitles.push("Urban Menace"); newTitles.push("Urban Menace");
  }

  // --- Treasury ---
  if (treasury >= 15000 && !honoraryTitles.includes("Treasury Titan")) {
    honoraryTitles.push("Treasury Titan"); newTitles.push("Treasury Titan");
  }
  if (treasury < 0 && !honoraryTitles.includes("Broke Senator")) {
    honoraryTitles.push("Broke Senator"); newTitles.push("Broke Senator");
  }

  // --- Riot Tokens ---
  if (riotTokens === -5 && !honoraryTitles.includes("Peacekeeper")) {
    honoraryTitles.push("Peacekeeper"); newTitles.push("Peacekeeper");
  }
  if (riotTokens >= 3 && !honoraryTitles.includes("Enemy of the Mob")) {
    honoraryTitles.push("Enemy of the Mob"); newTitles.push("Enemy of the Mob");
  }

  // --- Unrest ---
  if (unrest >= 10 && !honoraryTitles.includes("Agent of Chaos")) {
    honoraryTitles.push("Agent of Chaos"); newTitles.push("Agent of Chaos");
  }
  if (unrest <= -10 && !honoraryTitles.includes("Golden Age Consul")) {
    honoraryTitles.push("Golden Age Consul"); newTitles.push("Golden Age Consul");
  }

  // --- Multi-stat combos ---
  if (politics >= 8 && infrastructure >= 8 && !honoraryTitles.includes("True Roman")) {
    honoraryTitles.push("True Roman"); newTitles.push("True Roman");
  }
  if (treasury >= 10000 && unrest <= -5 && !honoraryTitles.includes("Beloved Provider")) {
    honoraryTitles.push("Beloved Provider"); newTitles.push("Beloved Provider");
  }

  // --- Style/Easter egg titles ---
  // Only add "The Ostrich" if game is over and player never saw a silly problem
  if (
    currentRound > totalRounds &&
    !bigProblemsPool.some(p => usedProblems.includes(p.title) && p.rarity === "silly") &&
    !honoraryTitles.includes("The Ostrich")
  ) {
    honoraryTitles.push("The Ostrich");
    newTitles.push("The Ostrich");
  }
  if (currentRound > totalRounds && !honoraryTitles.includes("Senate Survivor")) {
    honoraryTitles.push("Senate Survivor"); newTitles.push("Senate Survivor");
  }
  if (treasury < 0 && riotTokens < 3 && !honoraryTitles.includes("Pyrrhic Victor")) {
    honoraryTitles.push("Pyrrhic Victor"); newTitles.push("Pyrrhic Victor");
  }
  if (politics < -5 && unrest > 5 && !honoraryTitles.includes("Political Pariah")) {
    honoraryTitles.push("Political Pariah"); newTitles.push("Political Pariah");
  } 
  if (infrastructure < -5 && treasury < 1000 && !honoraryTitles.includes("Blight of the Land")) {
    honoraryTitles.push("Urban Decay"); newTitles.push("Urban Decay");
  }
  if (riotTokens >= 3 && unrest >= 5 && !honoraryTitles.includes("Mob's Favorite")) {
    honoraryTitles.push("Mob's Favorite"); newTitles.push("Mob's Favorite");
  }

  // Alert user about new title(s) in the log!
  if (newTitles.length > 0) {
    newTitles.forEach(title => {
      delayedLog(`🏅 Honorary Title Earned: <span class="honorary-title-badge">${title}</span>`, "log-positive");
    });
  }
}

// ========== GAME END ==========

// ====== VICTORY CONFETTI ANIMATION ======
function launchVictoryConfetti() {
  const confettiContainer = document.getElementById("victory-confetti");
  if (!confettiContainer) return;
  confettiContainer.innerHTML = ''; // Clear previous confetti

  const colors = ['#ffe30e', '#ff1697', '#24f0ff', '#8cff61', '#fffbbe', '#7e18c8', '#fffad2'];
  const count = 38 + Math.floor(Math.random() * 18); // 38–56 pieces

  for (let i = 0; i < count; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    const color = colors[Math.floor(Math.random() * colors.length)];
    piece.style.background = color;
    piece.style.left = Math.random() * 98 + "vw";
    piece.style.animationDelay = (Math.random() * 0.7) + "s";
    piece.style.transform = `rotate(${Math.random() * 90 - 45}deg)`;
    piece.style.width = 9 + Math.random() * 10 + "px";
    piece.style.height = 18 + Math.random() * 14 + "px";
    confettiContainer.appendChild(piece);
  }
  confettiContainer.style.display = 'block';

  // Remove confetti after animation
  setTimeout(() => {
    confettiContainer.innerHTML = '';
    confettiContainer.style.display = 'none';
  }, 3200);
}
