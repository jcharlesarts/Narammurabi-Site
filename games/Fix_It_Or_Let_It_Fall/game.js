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

const evidenceKeywords = [
  "ledger", "testimony", "dossier", "notes", "note", "map", "plan", "route", "roster",
  "list", "writ", "summons", "alibi", "confession", "tally", "tallies", "cipher", "code",
  "coded", "scroll", "tablet", "docket", "deed", "record", "report", "log", "sketch",
  "pattern", "impression", "seal", "whisper", "rumor", "gossip", "intel", "suspicion",
  "letter", "letters", "fragment", "fragments", "manifest", "invoice", "evidence"
];
function isEvidenceItem(item) {
  if (!item || typeof item !== "string") return false;
  const normalized = item.toLowerCase();
  return evidenceKeywords.some(keyword => normalized.includes(keyword));
}
function getInventoryBuckets() {
  const inv = Array.isArray(window.inventory) ? window.inventory : [];
  const lootItems = [];
  const evidenceItems = [];
  inv.forEach(item => {
    if (isEvidenceItem(item)) {
      evidenceItems.push(item);
    } else {
      lootItems.push(item);
    }
  });
  return { inv, lootItems, evidenceItems };
}
function updateInventoryButtons() {
  try {
    const { lootItems, evidenceItems } = getInventoryBuckets();
    const btnLoot = document.getElementById("btn-loot");
    if (btnLoot) {
      btnLoot.textContent = `🎒 Loot${lootItems.length ? ` (${lootItems.length})` : ""}`;
    }
    const btnEvidence = document.getElementById("btn-evidence");
    if (btnEvidence) {
      btnEvidence.textContent = `📜 Ledger${evidenceItems.length ? ` (${evidenceItems.length})` : ""}`;
    }
  } catch(_) {}
}
try { window.isEvidenceItem = isEvidenceItem; } catch(_) {}

let problemArea, messageLog, roundNumEl, yearDisplay, senatorNameDisplay, treasuryDisplay, riotDisplay, unrestDisplay, infraDisplay, politicsDisplay;
let btnNextRound, btnRestart, roundSummary, summaryRound, roundSummaryText, gameOverScreen, gameOverText;
let difficultyBtns, chosenDiffP, nameInput;
let gameMode = 'standard';
let openingCard, openingBtn, introScreen, scrollText, cutsceneScreen, startMenu, btnStart;
let introSkipOverlay;
let audioToggle, JupiterTheme, MarsTheAvenger, epicTheme, gameScreen;
let pauseModal, btnPauseResume, btnPauseMenu, btnPauseNewGame, btnPauseHowto, btnPauseCredits;
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

let MenuScreensaverFX = null;

function createMenuScreensaverFX(startMenu, options = {}) {
  if (!startMenu) return null;
  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const candidates = Array.from(new Set([...(options.images || []), options.fallback].filter(Boolean)));
  const useMenuParticles = false;
  let canvas = null;
  let ctx = null;
  let particles = [];
  let rafId = null;
  let running = false;
  let active = false;
  let cycleTimer = null;
  let loadedImages = [];
  let currentIndex = 0;
  let lightningLayer = null;
  let lightningTimer = null;
  let lightningDoubleTimer = null;
  let lightningActive = false;
  let mistLayer = null;
  let mistTimer = null;
  let mistActive = false;

  function wrapMenuUI() {
    let menuUI = startMenu.querySelector(':scope > .menu-ui');
    if (!menuUI) {
      menuUI = document.createElement('div');
      menuUI.className = 'menu-ui';
      const nodes = Array.from(startMenu.childNodes);
      nodes.forEach(node => menuUI.appendChild(node));
      startMenu.appendChild(menuUI);
    }
    return menuUI;
  }

  function ensureCanvas(menuUI) {
    let existing = startMenu.querySelector(':scope > canvas.menu-canvas');
    if (existing) return existing;
    const c = document.createElement('canvas');
    c.className = 'menu-canvas';
    startMenu.insertBefore(c, menuUI);
    return c;
  }

  function ensureLightningLayer(menuUI) {
    let existing = startMenu.querySelector(':scope > .menu-lightning');
    if (existing) return existing;
    const layer = document.createElement('div');
    layer.className = 'menu-lightning';
    startMenu.insertBefore(layer, menuUI);
    return layer;
  }

  function ensureMistLayer(menuUI) {
    let existing = startMenu.querySelector(':scope > #mist-layer');
    if (existing) return existing;
    const layer = document.createElement('div');
    layer.id = 'mist-layer';
    startMenu.insertBefore(layer, menuUI);
    return layer;
  }

  function ensureCinematicLayer(menuUI) {
    let existing = startMenu.querySelector(':scope > .menu-cinematic');
    if (existing) return existing;
    const layer = document.createElement('div');
    layer.className = 'menu-cinematic';
    layer.innerHTML = `
      <div class="menu-cinematic-line line-1">Fix it...</div>
      <div class="menu-cinematic-line line-2">or let it fall?</div>
      <div class="menu-cinematic-title blast">Rome: Extreme Chaos Edition!</div>
    `;
    startMenu.insertBefore(layer, menuUI);
    return layer;
  }
  function setMenuBackground(url) {
    if (!url) return;
    startMenu.style.setProperty('--menu-bg', `url("${encodeURI(url)}")`);
  }

  async function preloadImages() {
    const loaded = [];
    for (const url of candidates) {
      // eslint-disable-next-line no-await-in-loop
      const ok = await new Promise(resolve => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
      });
      if (ok) loaded.push(url);
    }
    loadedImages = loaded.length ? loaded : [options.fallback].filter(Boolean);
    setMenuBackground(loadedImages[0]);
  }

  function createLightning() {
    const img = new Image();
    const state = {
      img,
      loaded: false,
      frameW: 192,
      frameH: 256,
      cols: 8,
      rows: 4,
      row: 0,
      frame: 0,
      frameMs: 55,
      nextAt: performance.now() + 1800 + Math.random() * 3500,
      playing: false,
      holdPeak: false,
      held: false,
      x: 0,
      y: 0,
      w: 0,
      h: 0
    };
    img.onload = () => { state.loaded = true; };
    img.onerror = () => { state.loaded = false; };
    img.src = lightningSpriteUrl;
    return state;
  }

  function resizeCanvas() {
    if (!canvas || !ctx) return;
    const rect = startMenu.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.floor(rect.width * dpr));
    canvas.height = Math.max(1, Math.floor(rect.height * dpr));
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function createParticles() {
    particles = [];
  }

  function spawnLightningStrike() {
    if (!lightningLayer) return;
    const rect = startMenu.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    const strike = document.createElement('div');
    strike.className = 'menu-lightning-strike play';
    const single = Math.random() < 0.55;
    const row = single ? (Math.random() < 0.5 ? 0 : 1) : (Math.random() < 0.5 ? 2 : 3);
    const scale = 1.15 + Math.random() * 1.6;
    const rot = (Math.random() * 12) - 6;
    const x = w * (0.1 + Math.random() * 0.8);
    const y = h * (0.04 + Math.random() * 0.4);
    strike.style.backgroundPositionY = `${-row * 256}px`;
    strike.style.left = `${x}px`;
    strike.style.top = `${y}px`;
    strike.style.transform = `translate(-50%, 0) scale(${scale}) rotate(${rot}deg)`;
    strike.style.animationDuration = `${420 + Math.random() * 230}ms`;
    lightningLayer.appendChild(strike);
    strike.addEventListener('animationend', () => {
      if (strike.parentNode) strike.parentNode.removeChild(strike);
    });
  }

  function scheduleLightning() {
    if (!lightningActive || reduceMotion) return;
    const delay = 1600 + Math.random() * 3600;
    lightningTimer = setTimeout(() => {
      spawnLightningStrike();
      if (Math.random() < 0.18) {
        lightningDoubleTimer = setTimeout(() => spawnLightningStrike(), 120 + Math.random() * 100);
      }
      scheduleLightning();
    }, delay);
  }

  function spawnMistParticle() {
    if (!mistLayer) return;
    const p = document.createElement('div');
    const w = 160 + Math.random() * 320;
    const h = w * (0.35 + Math.random() * 0.35);
    const y = Math.random() * 85;
    const blur = 10 + Math.random() * 18;
    const dur = 18 + Math.random() * 27;
    const o = 0.14 + Math.random() * 0.21;
    const r = -15 + Math.random() * 30;
    const dy = -60 + Math.random() * 180;
    p.className = `mist-particle${Math.random() < 0.45 ? ' mist-back' : ''}`;
    p.style.setProperty('--w', `${w}px`);
    p.style.setProperty('--h', `${h}px`);
    p.style.setProperty('--y', `${y}vh`);
    p.style.setProperty('--blur', `${blur}px`);
    p.style.setProperty('--dur', `${dur}s`);
    p.style.setProperty('--o', o.toFixed(2));
    p.style.setProperty('--r', `${r.toFixed(1)}deg`);
    p.style.setProperty('--dy', `${dy.toFixed(1)}px`);
    p.style.animationDelay = `${-Math.random() * dur}s`;
    mistLayer.appendChild(p);
    setTimeout(() => {
      if (p.parentNode) p.parentNode.removeChild(p);
    }, dur * 1000 + 400);
  }

  function scheduleMist() {
    if (!mistActive || reduceMotion) return;
    const cap = 26;
    const count = mistLayer ? mistLayer.children.length : 0;
    if (count < cap) spawnMistParticle();
    const delay = 800 + Math.random() * 400;
    mistTimer = setTimeout(scheduleMist, delay);
  }

  function step(ts) {
    if (!running || !ctx) return;
    const rect = startMenu.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    ctx.fillStyle = 'rgba(8, 6, 12, 0.12)';
    ctx.fillRect(0, 0, w, h);
    particles.forEach(p => {
      p.age += 16;
      p.x += p.vx;
      p.y += p.vy;
      p.r *= 1.002;
      const t = Math.min(1, p.age / p.life);
      const alpha = p.a * (1 - t);
      if (p.age >= p.life || p.y > h + 80 || p.x < -80 || p.x > w + 80) {
        p.age = 0;
        p.life = 3200 + Math.random() * 3200;
        p.x = p.source.x + (Math.random() - 0.5) * 60;
        p.y = p.source.y + (Math.random() - 0.5) * 40;
        p.r = 14 + Math.random() * 30;
        p.vx = (Math.random() - 0.5) * 0.12;
        p.vy = 0.03 + Math.random() * 0.08;
        p.a = 0.08 + Math.random() * 0.14;
      }
      ctx.beginPath();
      ctx.fillStyle = 'rgba(180, 190, 200, 1)';
      ctx.globalAlpha = Math.max(0, alpha);
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
    rafId = requestAnimationFrame(step);
  }

  function start() {
    if (running || reduceMotion || !canvas || !ctx) return;
    running = true;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (useMenuParticles) {
      createParticles();
      rafId = requestAnimationFrame(step);
    }
    if (loadedImages.length > 1) {
      cycleTimer = setInterval(() => {
        currentIndex = (currentIndex + 1) % loadedImages.length;
        setMenuBackground(loadedImages[currentIndex]);
      }, 32000);
    }
  }

  function stop() {
    running = false;
    if (rafId) cancelAnimationFrame(rafId);
    rafId = null;
    if (cycleTimer) clearInterval(cycleTimer);
    cycleTimer = null;
    if (ctx && canvas) ctx.clearRect(0, 0, canvas.width, canvas.height);
    lightningActive = false;
    if (lightningTimer) clearTimeout(lightningTimer);
    if (lightningDoubleTimer) clearTimeout(lightningDoubleTimer);
    lightningTimer = null;
    lightningDoubleTimer = null;
    if (lightningLayer) lightningLayer.innerHTML = '';
    mistActive = false;
    if (mistTimer) clearTimeout(mistTimer);
    mistTimer = null;
    if (mistLayer) mistLayer.innerHTML = '';
  }

  function setActive(next) {
    active = !!next;
    if (!active || document.hidden) {
      stop();
      return;
    }
    resizeCanvas();
    start();
    if (!reduceMotion) {
      lightningActive = true;
      scheduleLightning();
      mistActive = true;
      scheduleMist();
    }
  }

  function init() {
    startMenu.classList.add('menu-screensaver');
    const menuUI = wrapMenuUI();
    canvas = ensureCanvas(menuUI);
    lightningLayer = ensureLightningLayer(menuUI);
    mistLayer = ensureMistLayer(menuUI);
    ensureCinematicLayer(menuUI);
    ctx = canvas.getContext('2d');
    if (!ctx) return;
    resizeCanvas();
    if (useMenuParticles) createParticles();
    preloadImages();
    window.addEventListener('resize', () => {
      resizeCanvas();
      createParticles();
    });
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stop();
      else if (active) start();
    });
  }

  init();
  return { setActive };
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
  const startMenuSetup = document.getElementById("startmenu-setup");
  const btnNewGame      = document.getElementById("btn-new-game");
  const btnStartMenuBack = document.getElementById("btn-startmenu-back");
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
  const btnEvidence      = document.getElementById("btn-evidence");
  const evidenceModal    = document.getElementById("evidence-modal");
  const evidenceListEl   = document.getElementById("evidence-list");
  const evidenceEmptyMsg = document.getElementById("evidence-empty-msg");
  const lootEmptyMsgDefault = lootEmptyMsg ? lootEmptyMsg.textContent : "";
  const evidenceEmptyMsgDefault = evidenceEmptyMsg ? evidenceEmptyMsg.textContent : "";

  const defeatBanner = document.getElementById("defeat-banner");
  const defeatBannerClose = document.getElementById("defeat-banner-close");

  const btnReturnMenu = document.getElementById("btn-return-menu");
  pauseModal          = document.getElementById("pause-modal");
  btnPauseResume      = document.getElementById("btn-pause-resume");
  btnPauseMenu        = document.getElementById("btn-pause-menu");
  btnPauseNewGame     = document.getElementById("btn-pause-newgame");
  btnPauseHowto       = document.getElementById("btn-pause-howto");
  btnPauseCredits     = document.getElementById("btn-pause-credits");

  introSkipOverlay    = document.getElementById("intro-skip-overlay");
  const cutsceneImg = document.getElementById("cutscene-img-zoom");
  const cutsceneSlides = [
    "assets/cutscene/1Roman_Forum_Night_Senator.png",
    "assets/cutscene/2temple_saturn_approach.png",
    "assets/cutscene/3temple of saturn statue.png",
    "assets/cutscene/4portico1.png",
    "assets/cutscene/5saturn aerarium opening.png",
    "assets/cutscene/6aerarium3.png",
    "assets/cutscene/Cutscene_1.PNG"
  ];
  const cutsceneFullViewMs = 3800;
  const cutsceneFadeMs = 3000;
  let cutsceneTimers = [];
  let cutsceneRunning = false;
  let finalSlideStartedAt = 0;
  if (startMenu && cutsceneSlides.length) {
    const finalSlide = cutsceneSlides[cutsceneSlides.length - 1];
    startMenu.style.setProperty('--startmenu-bg', `url("${encodeURI(finalSlide)}")`);
    startMenu.style.setProperty('--menu-reveal-delay', `${cutsceneFullViewMs}ms`);
  }
  if (startMenu) {
    MenuScreensaverFX = createMenuScreensaverFX(startMenu, {
      images: cutsceneSlides,
      fallback: "assets/cutscene/Cutscene_1.PNG"
    });
    if (MenuScreensaverFX) {
      MenuScreensaverFX.setActive(!startMenu.classList.contains('hidden'));
    }
  }
  // Hide the return to menu button initially
  if (btnReturnMenu) btnReturnMenu.classList.add('hidden');

  // Attach Main Menu Button handler after all elements and functions are defined
  if (btnReturnMenu) {
    btnReturnMenu.addEventListener("click", () => {
      openPauseMenu();
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
  function resetStartMenuState() {
    if (startMenu) startMenu.classList.remove('setup-open');
    if (startMenuSetup) startMenuSetup.classList.add('hidden');
  }
  function startMenuRevealSequence(options = {}) {
    if (!startMenu) return;
    startMenu.classList.remove('startmenu-reveal', 'startmenu-reveal-instant');
    void startMenu.offsetWidth;
    if (options.instant) {
      startMenu.style.setProperty('--menu-reveal-delay', '0ms');
      startMenu.classList.add('startmenu-reveal-instant');
    } else {
      startMenu.classList.add('startmenu-reveal');
    }
  }
  function showStartMenuSetup(options = {}) {
    if (startMenu) startMenu.classList.add('setup-open');
    if (startMenuSetup) startMenuSetup.classList.remove('hidden');
    if (options.focusName && nameInput) nameInput.focus();
  }
  if (btnNewGame) {
    btnNewGame.addEventListener('click', () => {
      startMenuRevealSequence({ instant: true });
      showStartMenuSetup({ focusName: true });
    });
  }
  if (btnStartMenuBack) {
    btnStartMenuBack.addEventListener('click', () => {
      resetStartMenuState();
    });
  }
  function playMenuMusic() {
    stopAllMusic();
    if (audioMuted) return;
    if (epicTheme) {
      epicTheme.currentTime = 0;
      epicTheme.volume = 0.4;
      epicTheme.play().catch(()=>{});
    }
  }
  function openPauseMenu() {
    if (!pauseModal || !isPauseEligible()) return;
    pauseModal.classList.remove('hidden');
    playMenuMusic();
  }
  function closePauseMenu() {
    if (!pauseModal) return;
    pauseModal.classList.add('hidden');
  }
  function isPauseEligible() {
    const isVisible = (el) => !!(el && !el.classList.contains('hidden'));
    return isVisible(gameScreen) || isVisible(roundSummary) || isVisible(gameOverScreen);
  }
  function restartRunFromPause() {
    const cachedDiff = chosenDifficulty;
    const cachedName = nameInput ? nameInput.value : "";
    const cachedMode = gameMode;
    closePauseMenu();
    resetGame();
    chosenDifficulty = cachedDiff;
    if (nameInput) nameInput.value = cachedName;
    if (cachedMode) gameMode = cachedMode;
    if (difficultyBtns) {
      difficultyBtns.forEach(b => b.classList.toggle('selected', b.dataset.diff === chosenDifficulty));
    }
    if (chosenDiffP) {
      if (chosenDifficulty) {
        const denarii = difficultyMap[chosenDifficulty] ?? "???";
        chosenDiffP.textContent = `Chosen difficulty: ${chosenDifficulty.toUpperCase()} (${denarii} denarii)`;
      } else {
        chosenDiffP.innerHTML = "<em>No difficulty selected</em>";
      }
    }
    checkStartButton();
    if (chosenDifficulty && nameInput && nameInput.value.trim().length > 0) {
      startGame();
    } else {
      showScreen('start-menu');
      resetStartMenuState();
      startMenuRevealSequence({ instant: true });
      showStartMenuSetup({ focusName: true });
      resumeCurrentMusic();
    }
  }
  if (btnPauseResume) {
    btnPauseResume.addEventListener('click', () => {
      closePauseMenu();
      resumeCurrentMusic();
    });
  }
  if (btnPauseMenu) {
    btnPauseMenu.addEventListener('click', () => {
      closePauseMenu();
      resetGame();
      showScreen('start-menu');
      resetStartMenuState();
      startMenuRevealSequence({ instant: true });
      if (audioNextTrack) audioNextTrack.classList.add('hidden');
      if (btnReturnMenu) btnReturnMenu.classList.add('hidden');
      resumeCurrentMusic();
    });
  }
  if (btnPauseNewGame) {
    btnPauseNewGame.addEventListener('click', restartRunFromPause);
  }
  if (btnPauseHowto && howtoModal) {
    btnPauseHowto.addEventListener('click', () => {
      howtoModal.classList.remove('hidden');
    });
  }
  if (btnPauseCredits && creditsModal) {
    btnPauseCredits.addEventListener('click', () => {
      creditsModal.classList.remove('hidden');
    });
  }
  // (Optional: ESC closes both modals)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      let closed = false;
      if (startMenu && startMenu.classList.contains('setup-open')) {
        resetStartMenuState();
        closed = true;
      }
      if (howtoModal && !howtoModal.classList.contains('hidden')) {
        howtoModal.classList.add('hidden');
        closed = true;
      }
      if (creditsModal && !creditsModal.classList.contains('hidden')) {
        creditsModal.classList.add('hidden');
        closed = true;
      }
      if (evidenceModal && !evidenceModal.classList.contains('hidden')) {
        evidenceModal.classList.add('hidden');
        closed = true;
      }
      if (lootModal && !lootModal.classList.contains('hidden')) {
        lootModal.classList.add('hidden');
        closed = true;
      }
      if (defeatBanner && !defeatBanner.classList.contains('hidden')) {
        defeatBanner.classList.add('hidden');
        closed = true;
      }
      if (closed) return;
      if (pauseModal && !pauseModal.classList.contains('hidden')) {
        closePauseMenu();
        resumeCurrentMusic();
        return;
      }
      openPauseMenu();
    }
  });

  // --- LOOT / EVIDENCE MODAL LOGIC ---
  function renderLootList() {
    try {
      const { lootItems, evidenceItems } = getInventoryBuckets();
      if (lootEmptyMsg) {
        if (!lootItems.length && evidenceItems.length) {
          lootEmptyMsg.textContent = "No loot yet. Check your ledger for evidence.";
        } else {
          lootEmptyMsg.textContent = lootEmptyMsgDefault || "You haven't collected any items yet.";
        }
        lootEmptyMsg.style.display = lootItems.length ? "none" : "";
      }
      if (!lootListEl) return;
      lootListEl.innerHTML = "";
      if (!lootItems.length) return;
      lootItems.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        lootListEl.appendChild(li);
      });
    } catch(_) {}
  }
  function renderEvidenceList() {
    try {
      const { evidenceItems } = getInventoryBuckets();
      if (evidenceEmptyMsg) {
        evidenceEmptyMsg.textContent = evidenceEmptyMsgDefault || "No evidence recorded yet.";
        evidenceEmptyMsg.style.display = evidenceItems.length ? "none" : "";
      }
      if (!evidenceListEl) return;
      evidenceListEl.innerHTML = "";
      if (!evidenceItems.length) return;
      evidenceItems.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        evidenceListEl.appendChild(li);
      });
    } catch(_) {}
  }
  if (btnLoot && lootModal) {
    btnLoot.addEventListener("click", () => {
      renderLootList();
      lootModal.classList.remove("hidden");
    });
  }
  if (btnEvidence && evidenceModal) {
    btnEvidence.addEventListener("click", () => {
      renderEvidenceList();
      evidenceModal.classList.remove("hidden");
    });
  }
  if (defeatBanner && defeatBannerClose) {
    defeatBannerClose.addEventListener("click", () => {
      defeatBanner.classList.add("hidden");
    });
    defeatBanner.addEventListener("click", (event) => {
      if (event.target === defeatBanner) defeatBanner.classList.add("hidden");
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
  try { window.stopAllMusic = stopAllMusic; } catch(_) {}
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
      if (devSkipToMenu) return;
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

  function clearCutsceneTimers() {
    cutsceneTimers.forEach(id => clearTimeout(id));
    cutsceneTimers = [];
  }
  let menuCinematicTimers = [];
  let menuCinematicRunning = false;
  function clearMenuCinematicTimers() {
    menuCinematicTimers.forEach(id => clearTimeout(id));
    menuCinematicTimers = [];
    menuCinematicRunning = false;
  }
  function scheduleMenuCinematic(fn, delay) {
    const id = setTimeout(fn, delay);
    menuCinematicTimers.push(id);
  }
  function crossfadeAudio(from, to, durationMs = 1200, toTargetVol = 0.4) {
    if (!from || !to || audioMuted) return;
    try {
      const steps = 12;
      const interval = Math.max(40, Math.floor(durationMs / steps));
      const fromStart = typeof from.volume === 'number' ? from.volume : 1;
      to.volume = 0;
      to.currentTime = 0;
      to.play().catch(()=>{});
      let i = 0;
      const fade = setInterval(() => {
        i += 1;
        const t = i / steps;
        from.volume = Math.max(0, fromStart * (1 - t));
        to.volume = Math.min(toTargetVol, toTargetVol * t);
        if (i >= steps) {
          clearInterval(fade);
          from.pause();
          from.currentTime = 0;
          to.volume = toTargetVol;
        }
      }, interval);
    } catch (_) {}
  }
  function startMenuCinematicSequence(delayMs = 3000) {
    if (!startMenu) return;
    clearMenuCinematicTimers();
    menuCinematicRunning = true;
    startMenu.classList.add('menu-cinematic-active');
    startMenu.classList.remove('menu-ready');
    startMenu.style.setProperty('--menu-cinematic-delay', `${delayMs}ms`);
    const blastAt = delayMs + 4300;
    const revealAt = blastAt + 900;
    scheduleMenuCinematic(() => {
      if (!startMenu) return;
      startMenu.classList.add('menu-ready');
      scheduleMenuCinematic(() => {
        if (!startMenu) return;
        startMenu.classList.remove('menu-cinematic-active');
        menuCinematicRunning = false;
      }, 600);
      if (MarsTheAvenger && epicTheme) {
        crossfadeAudio(MarsTheAvenger, epicTheme, 1200, 0.4);
      } else if (epicTheme && !audioMuted) {
        epicTheme.currentTime = 0;
        epicTheme.volume = 0.4;
        epicTheme.play().catch(()=>{});
      }
    }, revealAt);
  }
  function startCutsceneCinematicSequence(delayMs = 3000) {
    if (!cutsceneScreen) return;
    clearMenuCinematicTimers();
    menuCinematicRunning = true;
    cutsceneScreen.classList.add('cinematic-active');
    cutsceneScreen.style.setProperty('--menu-cinematic-delay', `${delayMs}ms`);
    const blastAt = delayMs + 4300;
    const revealAt = blastAt + 900;
    scheduleMenuCinematic(() => {
      if (!cutsceneScreen) return;
      cutsceneScreen.classList.remove('cinematic-active');
      menuCinematicRunning = false;
    }, revealAt + 600);
    return revealAt;
  }
  function stopCutsceneSlideshow(options = {}) {
    cutsceneRunning = false;
    finalSlideStartedAt = 0;
    cutsceneAutoQueued = false;
    clearCutsceneTimers();
    if (cutsceneImg && !options.preserveFrame) {
      cutsceneImg.classList.remove('cutscene-visible', 'cutscene-zoom-out');
      cutsceneImg.style.opacity = '';
    }
  }
  function scheduleCutsceneTimeout(fn, delay) {
    const id = setTimeout(fn, delay);
    cutsceneTimers.push(id);
  }
  function showCutsceneSlide(index) {
    if (!cutsceneRunning || !cutsceneImg) return;
    if (index >= cutsceneSlides.length) return;
    const isFinal = index === cutsceneSlides.length - 1;
    cutsceneImg.classList.remove('cutscene-visible', 'cutscene-zoom-out');
    cutsceneImg.style.opacity = '';
    cutsceneImg.src = encodeURI(cutsceneSlides[index]);
    requestAnimationFrame(() => {
      if (!cutsceneRunning) return;
      if (isFinal) {
        finalSlideStartedAt = Date.now ? Date.now() : 0;
        cutsceneImg.classList.add('cutscene-zoom-out');
        if (!cutsceneAutoQueued) {
          cutsceneAutoQueued = true;
          scheduleCutsceneTimeout(() => {
            if (cutsceneRunning) finishCutscene();
          }, 3000);
        }
        return;
      }
      cutsceneImg.classList.add('cutscene-visible');
      scheduleCutsceneTimeout(() => {
        if (cutsceneRunning && cutsceneImg) cutsceneImg.classList.remove('cutscene-visible');
      }, cutsceneFadeMs + cutsceneFullViewMs);
      scheduleCutsceneTimeout(() => {
        showCutsceneSlide(index + 1);
      }, cutsceneFadeMs + cutsceneFullViewMs + cutsceneFadeMs);
    });
  }
  function startCutsceneSlideshow() {
    if (!cutsceneImg || !cutsceneSlides.length) return;
    cutsceneRunning = true;
    clearCutsceneTimers();
    cutsceneSlides.forEach(src => {
      const img = new Image();
      img.src = src;
    });
    showCutsceneSlide(0);
  }

  let devSkipToMenu = false;
  let introDone = false;
  let cutsceneAutoQueued = false;
  function finishIntro() {
    if (devSkipToMenu) return;
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
      if (devSkipToMenu) return;
      introScreen.classList.add('hidden');
      if (cutsceneScreen) cutsceneScreen.classList.remove('hidden');
      stopAllMusic();
      if (MarsTheAvenger) {
        MarsTheAvenger.currentTime = 0;
        MarsTheAvenger.volume = 1;
        MarsTheAvenger.play().catch(()=>{});
      }
      startCutsceneSlideshow();
      cutsceneScreen.addEventListener('click', finishCutscene, { once: true });
    }, 1200);
  }
  function finishCutscene() {
    if (devSkipToMenu) return;
    const cinematicDelayMs = 3000;
    if (cutsceneImg && cutsceneSlides.length) {
      const finalSlide = cutsceneSlides[cutsceneSlides.length - 1];
      cutsceneImg.src = encodeURI(finalSlide);
      cutsceneImg.classList.remove('cutscene-zoom-out');
      cutsceneImg.classList.add('cutscene-visible');
      cutsceneImg.style.opacity = '1';
      cutsceneImg.style.transform = 'scale(1)';
    }
    stopCutsceneSlideshow({ preserveFrame: true });
    if (cutsceneScreen) {
      const cinematicDelay = startCutsceneCinematicSequence(cinematicDelayMs);
      const totalDelay = 800 + (cinematicDelay || 0);
      scheduleMenuCinematic(() => {
        if (cutsceneScreen) cutsceneScreen.classList.add('fadeout');
      }, cinematicDelay || 0);
      setTimeout(() => {
        if (devSkipToMenu) return;
        cutsceneScreen.classList.add('hidden');
        if (startMenu) startMenu.classList.remove('hidden');
        resetStartMenuState();
        if (startMenu) {
          const finalSlide = cutsceneSlides[cutsceneSlides.length - 1];
          startMenu.style.setProperty('--menu-bg', `url("${encodeURI(finalSlide)}")`);
        }
        if (MenuScreensaverFX) MenuScreensaverFX.setActive(true);
        startMenu.classList.remove('menu-cinematic-active');
        startMenu.classList.add('menu-ready');
        if (MarsTheAvenger && epicTheme) {
          crossfadeAudio(MarsTheAvenger, epicTheme, 1200, 0.4);
        } else if (epicTheme && !audioMuted) {
          epicTheme.currentTime = 0;
          epicTheme.volume = 0.4;
          epicTheme.play().catch(()=>{});
        }
      }, totalDelay);
    }
  }
  function skipToStartMenu() {
    if (devSkipToMenu) return;
    devSkipToMenu = true;
    introDone = true;
    try { if (window.skipPromptTimeout) clearTimeout(window.skipPromptTimeout); } catch(_) {}
    if (introSkipOverlay) {
      const skipPrompt = introSkipOverlay.querySelector('.skip-prompt');
      if (skipPrompt) skipPrompt.classList.remove('visible');
      introSkipOverlay.classList.add('hidden');
      introSkipOverlay.onclick = null;
      introSkipOverlay.removeEventListener("click", finishIntro);
    }
    if (scrollText) {
      scrollText.classList.remove('scroll-animation');
      scrollText.removeEventListener("animationend", finishIntro);
      scrollText.removeEventListener("click", finishIntro);
    }
    if (openingCard) openingCard.classList.remove('fadeout');
    if (introScreen) introScreen.classList.remove('fadeout');
    if (cutsceneScreen) cutsceneScreen.classList.remove('fadeout');
    if (cutsceneScreen) cutsceneScreen.removeEventListener('click', finishCutscene);
    stopCutsceneSlideshow();
    showScreen('start-menu');
    resetStartMenuState();
    clearMenuCinematicTimers();
    if (startMenu) {
      startMenu.classList.remove('menu-cinematic-active');
      startMenu.classList.add('menu-ready');
    }
    if (typeof resumeCurrentMusic === 'function') resumeCurrentMusic();
  }
  document.addEventListener('keydown', (e) => {
    if (e.shiftKey && e.key && e.key.toLowerCase() === 's') {
      e.preventDefault();
      skipToStartMenu();
    }
  });

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
      if (keys.length) {
        const runner = (k, cb) => {
          if (window.EventTrees && typeof window.EventTrees.startRandomEventTree === 'function') return window.EventTrees.startRandomEventTree(k, cb);
          if (typeof window.startRandomEventTree === 'function') return window.startRandomEventTree(k, cb);
        };
        const shuffled = keys.slice().sort(() => Math.random() - 0.5);
        const tryStart = (idx) => {
          const key = shuffled[idx];
          if (!key) {
            runRound();
            return;
          }
          runner(key, () => {
            runRound(); // resume campaign afterward
          });
          const active = window.EventTrees && typeof window.EventTrees.isActive === 'function'
            ? window.EventTrees.isActive()
            : false;
          if (active) {
            delayedLog('Starting Event Story: ' + key.replace(/_/g, ' '), 'log-info');
            return;
          }
          tryStart(idx + 1);
        };
        tryStart(0);
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
    if (MenuScreensaverFX && screenId) {
      MenuScreensaverFX.setActive(screenId === 'start-menu');
    }
    if (screenId === 'start-menu' && startMenu && !menuCinematicRunning) {
      startMenu.classList.remove('menu-cinematic-active');
      startMenu.classList.add('menu-ready');
    }
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
    resetStartMenuState();
    startMenuRevealSequence({ instant: true });
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
    try {
      const lootModal = document.getElementById('loot-modal');
      const evidenceModal = document.getElementById('evidence-modal');
      const defeatBanner = document.getElementById('defeat-banner');
      if (lootModal) lootModal.classList.add('hidden');
      if (evidenceModal) evidenceModal.classList.add('hidden');
      if (defeatBanner) defeatBanner.classList.add('hidden');
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
    updateInventoryButtons();

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
          const handled = maybeTriggerCapstone(() => {
            pickRandomEvent();
            if (onResolved) onResolved();
          });
          if (!handled) {
            pickRandomEvent();
            if (onResolved) onResolved();
          }
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

}

const randomEvents = [
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

const CAPSTONE_BASE_TREASURY = 12000;
const capstoneState = { active: false };
const capstoneDefs = {
  politics: {
    title: "Political Apex",
    desc: "Your influence is absolute. How will you spend it?",
    cameo: "Every faction waits on your nod.",
    options: [
      {
        label: "Grant a sweeping amnesty (Unrest reset)",
        result: "You trade influence for calm. The streets quiet—at a price.",
        effect: () => { politics = 0; unrest = 0; }
      },
      {
        label: "Call in favors for a war chest (+1200 treasury)",
        result: "Coin arrives in silence. The price is your leverage.",
        effect: () => { politics = 0; treasury += 1200; }
      },
      {
        label: "Mandate public works (+2 infrastructure)",
        result: "Stonemasons cheer; your aura fades with the dust.",
        effect: () => { politics = 0; infrastructure += 2; }
      }
    ]
  },
  infrastructure: {
    title: "Master Builder",
    desc: "Rome has never looked better. What will you trade this moment for?",
    cameo: "The engineers await your decree.",
    options: [
      {
        label: "Sell the contracts (+900 treasury)",
        result: "The coffers swell, but the grand momentum resets.",
        effect: () => { infrastructure = 0; treasury += 900; }
      },
      {
        label: "Parade your achievements (+2 politics)",
        result: "Applause rises, and your scaffolds vanish into memory.",
        effect: () => { infrastructure = 0; politics += 2; }
      },
      {
        label: "Stabilize the neighborhoods (Riot Tokens reset)",
        result: "Order returns. The city feels new again—briefly.",
        effect: () => { infrastructure = 0; riotTokens = 0; }
      }
    ]
  },
  treasury: {
    title: "Treasury Zenith",
    desc: "Your vaults overflow. Choose how to spend this peak.",
    cameo: "Merchants jostle for your patronage.",
    options: [
      {
        label: "Fund a grain jubilee (Unrest reset)",
        result: "The crowd roars; the gold quiets down.",
        effect: () => { treasury = CAPSTONE_BASE_TREASURY; unrest = 0; }
      },
      {
        label: "Buy loyalties in the Senate (+2 politics)",
        result: "Votes flip. The treasury returns to normal.",
        effect: () => { treasury = CAPSTONE_BASE_TREASURY; politics += 2; }
      },
      {
        label: "Commission monuments (+2 infrastructure)",
        result: "Marble rises. The surplus is spent.",
        effect: () => { treasury = CAPSTONE_BASE_TREASURY; infrastructure += 2; }
      }
    ]
  },
  unrest: {
    title: "Calm of the Republic",
    desc: "Peace is absolute. How will you convert it?",
    cameo: "The Forum is quiet for once.",
    options: [
      {
        label: "Levy a peace dividend (+800 treasury)",
        result: "The coffers swell. The calm dissolves into normal life.",
        effect: () => { unrest = 0; treasury += 800; }
      },
      {
        label: "Codify reforms (+2 politics)",
        result: "Stability becomes law. The balance resets.",
        effect: () => { unrest = 0; politics += 2; }
      },
      {
        label: "Demobilize the cohorts (Riot Tokens reset)",
        result: "The streets stay quiet as patrols stand down.",
        effect: () => { unrest = 0; riotTokens = 0; }
      }
    ]
  },
  riotTokens: {
    title: "Mob Pacified",
    desc: "The streets are yours. How do you cash in the silence?",
    cameo: "Even the loudest taverns whisper.",
    options: [
      {
        label: "Sell surplus arms (+600 treasury)",
        result: "Coin replaces steel. The calm recedes.",
        effect: () => { riotTokens = 0; treasury += 600; }
      },
      {
        label: "Promote peace magistrates (+2 politics)",
        result: "Order earns you respect—briefly.",
        effect: () => { riotTokens = 0; politics += 2; }
      },
      {
        label: "Shift cohorts to construction (+2 infrastructure)",
        result: "Barracks empty, scaffolds rise.",
        effect: () => { riotTokens = 0; infrastructure += 2; }
      }
    ]
  }
};

function getCapstoneKey() {
  if (politics >= 15) return "politics";
  if (infrastructure >= 12) return "infrastructure";
  if (treasury >= 15000) return "treasury";
  if (unrest <= -10) return "unrest";
  if (riotTokens <= -6) return "riotTokens";
  return null;
}

function maybeTriggerCapstone(onDone) {
  if (capstoneState.active) return true;
  const modalOpen = (id) => {
    const el = document.getElementById(id);
    return !!(el && !el.classList.contains("hidden"));
  };
  if (modalOpen("event-tree-modal") || modalOpen("random-event-modal")) return false;
  const key = getCapstoneKey();
  if (!key) return false;
  const def = capstoneDefs[key];
  if (!def) return false;
  const barMap = {
    politics: "politics-bar",
    infrastructure: "infra-bar",
    treasury: "treasury-bar",
    unrest: "unrest-bar",
    riotTokens: "riot-bar"
  };
  const pulseBar = () => {
    const barId = barMap[key];
    const bar = barId ? document.getElementById(barId) : null;
    if (!bar) return;
    bar.classList.remove("capstone-pulse");
    void bar.offsetWidth;
    bar.classList.add("capstone-pulse");
  };

  const modal = document.getElementById("event-tree-modal");
  const content = modal ? modal.querySelector(".event-tree-content") : null;
  const descEl = document.getElementById("event-tree-desc");
  const cameoEl = document.getElementById("event-tree-cameo");
  const closeBtn = document.getElementById("event-tree-close-btn");
  if (!modal || !content || !descEl || !closeBtn) return false;

  capstoneState.active = true;
  pulseBar();
  const priorAll = content.querySelectorAll(".event-options");
  priorAll.forEach(el => el.remove());
  descEl.textContent = def.desc;
  if (cameoEl) cameoEl.textContent = def.cameo || "";
  const wrap = document.createElement("div");
  wrap.className = "event-options";
  closeBtn.style.display = "none";
  closeBtn.onclick = null;

  def.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.className = "problem-option-btn";
    btn.type = "button";
    btn.textContent = opt.label;
    btn.addEventListener("click", () => {
      opt.effect();
      updateScoreboard();
      descEl.textContent = opt.result || "Decision made.";
      wrap.remove();
      closeBtn.style.display = "";
      closeBtn.textContent = "Continue";
      closeBtn.onclick = () => {
        modal.classList.add("hidden");
        modal.style.zIndex = "";
        closeBtn.onclick = null;
        capstoneState.active = false;
        if (typeof onDone === "function") onDone();
      };
    });
    wrap.appendChild(btn);
  });

  content.appendChild(wrap);
  modal.classList.remove("hidden");
  modal.style.zIndex = "4000";
  return true;
}
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

  // Show defeat banner with the final cause
  const defeatBanner = document.getElementById("defeat-banner");
  const defeatBannerMsg = document.getElementById("defeat-banner-msg");
  if (!survived && defeatBanner && defeatBannerMsg) {
    const snippet = (msg || "").trim();
    defeatBannerMsg.textContent = snippet || "Rome has fallen.";
    defeatBanner.classList.remove("hidden");
  } else if (defeatBanner) {
    defeatBanner.classList.add("hidden");
  }

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

  updateInventoryButtons();

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
