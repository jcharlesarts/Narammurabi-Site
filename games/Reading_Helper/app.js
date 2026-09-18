const sourceText = document.getElementById("sourceText");
const sampleSelect = document.getElementById("sampleSelect");
const prepareBtn = document.getElementById("prepareBtn");
const wordCount = document.getElementById("wordCount");
const wpmSelect = document.getElementById("wpmSelect");
const fontSelect = document.getElementById("fontSelect");
const sizeRange = document.getElementById("sizeRange");
const themeSelect = document.getElementById("themeSelect");
const playPauseBtn = document.getElementById("playPauseBtn");
const restartBtn = document.getElementById("restartBtn");
const pivotToggleBtn = document.getElementById("pivotToggleBtn");
const focusToggleBtn = document.getElementById("focusToggleBtn");
const tickerToggleBtn = document.getElementById("tickerToggleBtn");
const scrubRange = document.getElementById("scrubRange");
const progressText = document.getElementById("progressText");
const viewerHome = document.getElementById("viewerHome");
const rsvpViewer = document.getElementById("rsvpViewer");
const tickerPanel = document.getElementById("tickerPanel");
const tickerCloseBtn = document.getElementById("tickerCloseBtn");
const tickerScrubRange = document.getElementById("tickerScrubRange");
const tickerPositionText = document.getElementById("tickerPositionText");
const tickerTrack = document.getElementById("tickerTrack");
const focusOverlay = document.getElementById("focusOverlay");
const focusViewerHost = document.getElementById("focusViewerHost");
const focusPlayPauseBtn = document.getElementById("focusPlayPauseBtn");
const focusCloseBtn = document.getElementById("focusCloseBtn");

const state = {
  words: [],
  index: 0,
  isPlaying: false,
  timerId: null,
  pivotMode: true,
  focusMode: false,
  themeBeforeFocus: "dark-blue",
  tickerMode: false,
  tickerWordEls: [],
  activeTickerWordEl: null,
  activeSampleId: null,
};

const sampleTexts = window.SAMPLE_TEXT_LIBRARY || {};

function tokenize(text) {
  return text
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean);
}

function renderSampleOptions() {
  if (!sampleSelect) return;

  const entries = Object.entries(sampleTexts);
  entries.forEach(([id, sample]) => {
    const option = document.createElement("option");
    option.value = id;
    option.textContent = sample.label;
    sampleSelect.append(option);
  });
}

async function getSampleText(sampleId) {
  const sample = sampleTexts[sampleId];
  if (!sample) return null;

  if (typeof sample.text === "string") {
    return sample.text;
  }

  if (typeof sample.textUrl === "string") {
    const response = await fetch(sample.textUrl);
    if (!response.ok) {
      throw new Error(`Failed to load sample: ${sample.textUrl}`);
    }

    const loadedText = await response.text();
    sample.text = loadedText;
    return loadedText;
  }

  return null;
}

function syncSampleSelect() {
  if (!sampleSelect) return;
  sampleSelect.value = state.activeSampleId || "";
}

function getDelayMs() {
  const wpm = Number(wpmSelect.value);
  return Math.round(60000 / wpm);
}

function getPunctuationPauseMs(word) {
  const cleanedWord = word.trim();
  const wpm = Number(wpmSelect.value);
  const scale = 650 / wpm;

  // Baseline tuning point from classroom testing:
  // sentence-ending punctuation should add ~200ms at 650 WPM.
  const sentenceEndBaseAt650 = 200;
  const clauseBaseAt650 = 120;
  const commaBaseAt650 = 80;

  if (/[.!?]["')\]]*$/.test(cleanedWord)) {
    return Math.round(sentenceEndBaseAt650 * scale);
  }

  if (/[;:]["')\]]*$/.test(cleanedWord)) {
    return Math.round(clauseBaseAt650 * scale);
  }

  if (/[,]["')\]]*$/.test(cleanedWord)) {
    return Math.round(commaBaseAt650 * scale);
  }

  return 0;
}

function setPlaying(nextValue) {
  state.isPlaying = nextValue;
  playPauseBtn.textContent = nextValue ? "Pause" : "Play";
  focusPlayPauseBtn.textContent = nextValue ? "Stop" : "Start";
}

function stopPlayback() {
  if (state.timerId !== null) {
    clearTimeout(state.timerId);
    state.timerId = null;
  }
  setPlaying(false);
}

function renderWord(word) {
  rsvpViewer.textContent = "";

  if (!state.pivotMode || word.length < 2) {
    const line = document.createElement("span");
    line.className = "word-line";
    line.textContent = word;
    rsvpViewer.append(line);
    return;
  }

  const pivotIndex = Math.floor((word.length - 1) / 2);
  const before = word.slice(0, pivotIndex);
  const pivot = word.charAt(pivotIndex);
  const after = word.slice(pivotIndex + 1);

  const orpWord = document.createElement("span");
  orpWord.className = "orp-word";

  const leftSpan = document.createElement("span");
  leftSpan.className = "orp-left";
  leftSpan.textContent = before;

  const pivotSpan = document.createElement("span");
  pivotSpan.className = "pivot-letter orp-pivot";
  pivotSpan.textContent = pivot;

  const rightSpan = document.createElement("span");
  rightSpan.className = "orp-right";
  rightSpan.textContent = after;

  orpWord.append(leftSpan, pivotSpan, rightSpan);
  rsvpViewer.append(orpWord);
}

function renderCurrentWord() {
  if (!state.words.length) {
    rsvpViewer.textContent = "Paste text and click Prepare Text";
    progressText.textContent = "Word 0 of 0";
    syncTickerPosition();
    return;
  }

  const safeIndex = Math.min(state.index, state.words.length - 1);
  renderWord(state.words[safeIndex]);
  scrubRange.value = String(safeIndex);
  progressText.textContent = `Word ${safeIndex + 1} of ${state.words.length}`;
  syncTickerPosition();
}

function scheduleNextTick() {
  if (!state.isPlaying) return;

  const currentWord = state.words[state.index] || "";
  const delayMs = getDelayMs() + getPunctuationPauseMs(currentWord);

  state.timerId = setTimeout(() => {
    if (state.index >= state.words.length - 1) {
      stopPlayback();
      return;
    }

    state.index += 1;
    renderCurrentWord();
    scheduleNextTick();
  }, delayMs);
}

function setControlsEnabled(enabled) {
  playPauseBtn.disabled = !enabled;
  restartBtn.disabled = !enabled;
  scrubRange.disabled = !enabled;
  focusPlayPauseBtn.disabled = !enabled;
  tickerToggleBtn.disabled = !enabled;
  tickerScrubRange.disabled = !enabled;
}

function togglePlayback() {
  if (!state.words.length) return;

  if (state.isPlaying) {
    stopPlayback();
    return;
  }

  if (state.tickerMode) {
    closeTickerMode();
  }

  setPlaying(true);
  scheduleNextTick();
}

function syncPivotButton() {
  pivotToggleBtn.classList.toggle("is-active", state.pivotMode);
  pivotToggleBtn.textContent = state.pivotMode ? "Median Letter: On" : "Median Letter: Off";
  pivotToggleBtn.setAttribute("aria-pressed", state.pivotMode ? "true" : "false");
}

function syncFocusButton() {
  focusToggleBtn.classList.toggle("is-active", state.focusMode);
  focusToggleBtn.textContent = state.focusMode ? "Focus Mode: On" : "Focus Mode: Off";
  focusToggleBtn.setAttribute("aria-pressed", state.focusMode ? "true" : "false");
}

function syncTickerButton() {
  tickerToggleBtn.classList.toggle("is-active", state.tickerMode);
  tickerToggleBtn.textContent = state.tickerMode ? "Ticker Review: On" : "Ticker Review: Off";
  tickerToggleBtn.setAttribute("aria-pressed", state.tickerMode ? "true" : "false");
}

function buildTickerTrack() {
  tickerTrack.textContent = "";
  state.tickerWordEls = [];
  state.activeTickerWordEl = null;

  state.words.forEach((word, index) => {
    const tickerWord = document.createElement("span");
    tickerWord.className = "ticker-word";
    tickerWord.dataset.index = String(index);
    tickerWord.textContent = word;
    tickerTrack.append(tickerWord);
    state.tickerWordEls.push(tickerWord);
  });
}

function syncTickerPosition() {
  if (!state.words.length) {
    tickerScrubRange.value = "0";
    tickerPositionText.textContent = "Word 0 of 0";
    return;
  }

  const safeIndex = Math.min(state.index, state.words.length - 1);
  tickerScrubRange.value = String(safeIndex);
  tickerPositionText.textContent = `Word ${safeIndex + 1} of ${state.words.length}`;

  if (!state.tickerMode) return;

  if (state.activeTickerWordEl) {
    state.activeTickerWordEl.classList.remove("is-active");
  }

  const nextTickerWord = state.tickerWordEls[safeIndex];
  if (!nextTickerWord) return;

  nextTickerWord.classList.add("is-active");
  state.activeTickerWordEl = nextTickerWord;
  nextTickerWord.scrollIntoView({
    inline: "center",
    block: "nearest",
    behavior: state.isPlaying ? "auto" : "smooth",
  });
}

function openTickerMode() {
  if (!state.words.length) return;

  stopPlayback();
  state.tickerMode = true;
  tickerPanel.hidden = false;
  if (state.tickerWordEls.length !== state.words.length) {
    buildTickerTrack();
  }
  syncTickerButton();
  syncTickerPosition();
}

function closeTickerMode() {
  if (!state.tickerMode) return;

  state.tickerMode = false;
  tickerPanel.hidden = true;
  syncTickerButton();
}

function enterFocusMode() {
  if (state.focusMode) return;

  state.themeBeforeFocus = themeSelect.value;
  themeSelect.value = "black";
  applyTheme("black");

  state.focusMode = true;
  document.body.classList.add("focus-open");
  focusOverlay.setAttribute("aria-hidden", "false");
  focusViewerHost.append(rsvpViewer);
  syncFocusButton();
}

function exitFocusMode() {
  if (!state.focusMode) return;

  state.focusMode = false;
  viewerHome.append(rsvpViewer);
  document.body.classList.remove("focus-open");
  focusOverlay.setAttribute("aria-hidden", "true");

  if (state.themeBeforeFocus) {
    themeSelect.value = state.themeBeforeFocus;
    applyTheme(state.themeBeforeFocus);
  }

  syncFocusButton();
}

function applyTheme(themeValue) {
  if (themeValue === "normal") {
    document.body.removeAttribute("data-theme");
    return;
  }

  document.body.setAttribute("data-theme", themeValue);
}

prepareBtn.addEventListener("click", () => {
  stopPlayback();
  state.words = tokenize(sourceText.value);
  state.index = 0;

  wordCount.textContent = `${state.words.length} words loaded`;

  if (!state.words.length) {
    setControlsEnabled(false);
    closeTickerMode();
    tickerTrack.textContent = "";
    state.tickerWordEls = [];
    state.activeTickerWordEl = null;
    scrubRange.max = "0";
    tickerScrubRange.max = "0";
    renderCurrentWord();
    return;
  }

  setControlsEnabled(true);
  scrubRange.max = String(state.words.length - 1);
  scrubRange.value = "0";
  tickerScrubRange.max = String(state.words.length - 1);
  tickerScrubRange.value = "0";
  buildTickerTrack();
  renderCurrentWord();
});

sampleSelect.addEventListener("change", async () => {
  const sampleId = sampleSelect.value;
  if (!sampleId) return;

  try {
    const sampleText = await getSampleText(sampleId);
    if (!sampleText) return;

    sourceText.value = sampleText;
    state.activeSampleId = sampleId;
    syncSampleSelect();
    prepareBtn.click();
  } catch (error) {
    wordCount.textContent = "Could not load selected sample text";
  }
});

playPauseBtn.addEventListener("click", togglePlayback);
focusPlayPauseBtn.addEventListener("click", togglePlayback);

restartBtn.addEventListener("click", () => {
  if (!state.words.length) return;

  stopPlayback();
  state.index = 0;
  renderCurrentWord();
});

pivotToggleBtn.addEventListener("click", () => {
  state.pivotMode = !state.pivotMode;
  syncPivotButton();
  renderCurrentWord();
});

focusToggleBtn.addEventListener("click", () => {
  if (state.focusMode) {
    exitFocusMode();
    return;
  }

  enterFocusMode();
});

tickerToggleBtn.addEventListener("click", () => {
  if (state.tickerMode) {
    closeTickerMode();
    return;
  }

  openTickerMode();
});

tickerCloseBtn.addEventListener("click", () => {
  closeTickerMode();
});

tickerScrubRange.addEventListener("input", () => {
  if (!state.words.length) return;

  stopPlayback();
  state.index = Number(tickerScrubRange.value);
  renderCurrentWord();
});

tickerTrack.addEventListener("click", (event) => {
  const clickedWord = event.target.closest(".ticker-word");
  if (!clickedWord || !clickedWord.dataset.index) return;

  stopPlayback();
  state.index = Number(clickedWord.dataset.index);
  renderCurrentWord();
});

focusCloseBtn.addEventListener("click", () => {
  exitFocusMode();
});

focusOverlay.addEventListener("click", (event) => {
  if (event.target === focusOverlay) {
    exitFocusMode();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && state.focusMode) {
    exitFocusMode();
  }
});

scrubRange.addEventListener("input", () => {
  if (!state.words.length) return;

  stopPlayback();
  state.index = Number(scrubRange.value);
  renderCurrentWord();
});

wpmSelect.addEventListener("change", () => {
  if (!state.isPlaying) return;

  clearTimeout(state.timerId);
  scheduleNextTick();
});

fontSelect.addEventListener("change", () => {
  rsvpViewer.style.fontFamily = fontSelect.value;
});

sizeRange.addEventListener("input", () => {
  rsvpViewer.style.fontSize = `${sizeRange.value}px`;
});

themeSelect.addEventListener("change", () => {
  applyTheme(themeSelect.value);
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {
      // Keep app behavior unchanged if service worker registration fails.
    });
  });
}

fontSelect.dispatchEvent(new Event("change"));
sizeRange.dispatchEvent(new Event("input"));
themeSelect.dispatchEvent(new Event("change"));
document.body.classList.remove("focus-open");
focusOverlay.setAttribute("aria-hidden", "true");
syncPivotButton();
syncFocusButton();
syncTickerButton();
setControlsEnabled(false);
renderCurrentWord();
renderSampleOptions();
syncSampleSelect();
