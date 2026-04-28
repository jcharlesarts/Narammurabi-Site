const APP_STORAGE = {
  theme: "eaStudyTheme",
  cards: "eaStudyCardsState",
  quiz: "eaStudyQuizState"
};

const FLASHCARDS = [
  { tag:"AZTEC", front:"Aztec settlement clue: What kind of place did they choose for their capital?", back:"Think: water + island + difficult farmland. They still built a major city." },
  { tag:"AZTEC", front:"Aztec capital name check: What was the capital city called?", back:"Tenochtitlan, the capital built on a lake island." },
  { tag:"AZTEC", front:"Aztec rulers: Why did people accept the emperor's power?", back:"People believed the emperor had a special connection to the gods." },
  { tag:"AZTEC", front:"Aztec roles: What training was expected for boys?", back:"Boys were prepared for fighting, defense, and service to the empire." },
  { tag:"AZTEC", front:"Aztec roles: What training was expected for girls?", back:"Girls were prepared for household work and family life." },
  { tag:"AZTEC", front:"Aztec collapse: What outside force ended the empire?", back:"Spanish conquest captured the capital and ended the empire." },

  { tag:"INCA", front:"Inca geography snapshot: Which landscape shaped daily life and travel?", back:"Steep mountains, valleys, and high elevations shaped Inca life." },
  { tag:"INCA", front:"Inca travel clue: What did they build to connect far places?", back:"They built a road network that linked the empire." },
  { tag:"INCA", front:"Inca power clue: Who sat just under the emperor?", back:"Priests and top military leaders held major power." },
  { tag:"INCA", front:"Inca expansion: What did they use to grow their empire?", back:"Conquest and warfare drove expansion." },
  { tag:"INCA", front:"Inca expectations: What service did boys owe the state?", back:"They owed military or state service tied to empire control." },

  { tag:"MAYA", front:"Maya environment clue: What natural feature gave reliable water?", back:"Sinkholes called cenotes provided water." },
  { tag:"MAYA", front:"Maya religion: What was one way priests tried to please the gods?", back:"Some ceremonies included human sacrifice." },
  { tag:"MAYA", front:"Maya society: How did marriages between families help city-states?", back:"Marriage alliances improved relationships and exchange." },
  { tag:"MAYA", front:"Maya achievement: Pick one. What did writing, calendars, or astronomy help them do?", back:"These helped them record history, organize time, and track the sky." },

  { tag:"AG", front:"Match farming: Which method fits the Aztec water and garden setting?", back:"Chinampa farming, the floating-garden style method." },
  { tag:"AG", front:"Match farming: Which method fits the Inca steep slopes?", back:"Terrace farming, with step-like fields cut into mountains." },
  { tag:"AG", front:"Match farming: Which method fits the Maya forest clearing pattern?", back:"Slash-and-burn farming." },

  { tag:"KINGS", front:"Big idea: Why were kings seen as all-powerful in these civilizations?", back:"People believed rulers were connected to gods or the sun." },

  { tag:"MIX", front:"Civilization ID: Lake island capital and big trade city =", back:"Aztec." },
  { tag:"MIX", front:"Civilization ID: Mountains, road network, and terrace fields =", back:"Inca." },
  { tag:"MIX", front:"Civilization ID: Cenotes, astronomy, and calendars =", back:"Maya." }
];

const CARD_DECKS = [
  { id:"aztec", label:"Aztec", description:"Capital, rulers, roles, and decline.", tags:["AZTEC"] },
  { id:"inca", label:"Inca", description:"Landscape, roads, power, and expansion.", tags:["INCA"] },
  { id:"maya", label:"Maya", description:"Water, religion, alliances, and achievements.", tags:["MAYA"] },
  { id:"agriculture", label:"Farming", description:"Match each place to the right farming method.", tags:["AG"] },
  { id:"kings", label:"Kings", description:"Practice the big idea that connects all three civilizations.", tags:["KINGS"] },
  { id:"mixed", label:"Mixed Review", description:"Quick identification cards for last-minute checks.", tags:["MIX"] }
];

const QUIZ = [
  {
    q:"1) Aztec settlement: Which option best matches the setting where they built their major capital?",
    opts:[
      "an island site connected to a lake environment",
      "a flat grassland far from major water sources",
      "a cold tundra region with permafrost",
      "a high mountain plateau with terrace fields"
    ],
    answer:"an island site connected to a lake environment",
    key:"Think: island plus lake."
  },
  {
    q:"2) Why did many people accept the Aztec emperor’s power?",
    opts:[
      "He claimed a religious or divine connection to the gods",
      "He was elected by popular vote every year",
      "He earned the title by winning sports competitions",
      "He was chosen by foreign kings from Europe"
    ],
    answer:"He claimed a religious or divine connection to the gods",
    key:"People believed the emperor got power from the gods."
  },
  {
    q:"3) Aztec expectations: Which pairing best matches typical training roles?",
    opts:[
      "boys trained for warfare; girls trained for home life",
      "boys trained to be priests; girls trained to be soldiers",
      "boys trained for astronomy; girls trained for road building",
      "boys trained for fishing; girls trained for temple guarding"
    ],
    answer:"boys trained for warfare; girls trained for home life",
    key:"Boys trained for war. Girls trained for home life."
  },
  {
    q:"4) Aztec decline: Which option best explains what ended the Aztec Empire?",
    opts:[
      "European conquest captured the capital city",
      "a volcanic eruption destroyed all major cities",
      "a peaceful merger with the Inca formed a new empire",
      "a drought immediately forced everyone to leave"
    ],
    answer:"European conquest captured the capital city",
    key:"Spanish conquest ended the empire by taking the capital."
  },
  {
    q:"5) Inca geography: Which landscape best matches where the Inca built their empire?",
    opts:[
      "mountains and valleys",
      "swampy islands and canals",
      "open desert dunes",
      "flat river deltas"
    ],
    answer:"mountains and valleys",
    key:"Think Andes: mountains and valleys."
  },
  {
    q:"6) Inca solution: What helped the Inca move people and supplies across difficult terrain?",
    opts:[
      "a road network connecting the empire",
      "large ocean-going ships",
      "floating garden farms",
      "written laws carved into stone pillars"
    ],
    answer:"a road network connecting the empire",
    key:"The road network is the key clue."
  },
  {
    q:"7) Inca leadership: Who held major power just under the emperor?",
    opts:[
      "priests and top military leaders",
      "only farmers and artisans",
      "merchants elected by city councils",
      "artists and musicians from royal schools"
    ],
    answer:"priests and top military leaders",
    key:"Priests and military leaders were right below the emperor."
  },
  {
    q:"8) Maya water source: Which natural feature gave reliable water in many Maya areas?",
    opts:[
      "sinkholes (cenotes)",
      "glaciers",
      "ocean tides",
      "artificial dams only"
    ],
    answer:"sinkholes (cenotes)",
    key:"Cenotes were the natural water source."
  },
  {
    q:"9) Maya religion included ceremonies that could involve human sacrifice.",
    opts:["True", "False"],
    answer:"True",
    key:"True, in some ceremonies."
  },
  {
    q:"10) Maya society: What was one effect of marriage between important families?",
    opts:[
      "it built alliances between groups",
      "it eliminated trade completely",
      "it created terrace farms in the mountains",
      "it ended the need for calendars"
    ],
    answer:"it built alliances between groups",
    key:"Marriage helped build alliances between groups."
  },
  {
    q:"11) Agriculture matching: Which set matches the correct method to each civilization?",
    opts:[
      "Aztec=chinampa, Maya=slash-and-burn, Inca=terrace farming",
      "Aztec=terrace farming, Maya=chinampa, Inca=slash-and-burn",
      "Aztec=slash-and-burn, Maya=terrace farming, Inca=chinampa",
      "Aztec=chinampa, Maya=terrace farming, Inca=slash-and-burn"
    ],
    answer:"Aztec=chinampa, Maya=slash-and-burn, Inca=terrace farming",
    key:"Match by environment: water gardens, forest clearing, and mountain steps."
  },
  {
    q:"12) Why were kings often seen as all-powerful in the Maya, Inca, and Aztec?",
    opts:[
      "People believed rulers had divine ties to gods or the sun",
      "Rulers were chosen by random lottery",
      "Rulers were always the best merchants",
      "Rulers were only symbolic with no power"
    ],
    answer:"People believed rulers had divine ties to gods or the sun",
    key:"People believed rulers were connected to gods or the sun."
  }
];

function escapeHtml(value){
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&":"&amp;",
    "<":"&lt;",
    ">":"&gt;",
    '"':"&quot;",
    "'":"&#39;"
  }[char]));
}

function escapeAttr(value){
  return escapeHtml(value);
}

function safeGetItem(key){
  try {
    return localStorage.getItem(key);
  } catch (error) {
    return null;
  }
}

function safeSetItem(key, value){
  try {
    localStorage.setItem(key, value);
  } catch (error) {}
}

function safeRemoveItem(key){
  try {
    localStorage.removeItem(key);
  } catch (error) {}
}

function applyTheme(theme){
  const button = document.querySelector("[data-theme-toggle]");
  const resolved = theme === "light" ? "light" : "dark";
  document.body.setAttribute("data-theme", resolved);
  if (button) {
    button.textContent = resolved === "light" ? "Dark Mode" : "Light Mode";
  }
  safeSetItem(APP_STORAGE.theme, resolved);
}

function bindThemeToggle(){
  const button = document.querySelector("[data-theme-toggle]");
  if (!button) {
    return;
  }

  const savedTheme = safeGetItem(APP_STORAGE.theme) || "light";
  applyTheme(savedTheme);

  button.addEventListener("click", () => {
    const current = document.body.getAttribute("data-theme") || "dark";
    applyTheme(current === "light" ? "dark" : "light");
  });
}

function markCurrentNav(){
  const currentFile = location.pathname.split("/").pop() || "EA_Study.html";
  document.querySelectorAll(".nav-link").forEach((link) => {
    const href = link.getAttribute("href");
    const isCurrent = href === currentFile;
    link.classList.toggle("active", isCurrent);
    if (isCurrent) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function clearSavedProgress(){
  safeRemoveItem(APP_STORAGE.cards);
  safeRemoveItem(APP_STORAGE.quiz);
}

function initHomePage(){
  const cardCount = document.getElementById("cardCount");
  const questionCount = document.getElementById("questionCount");
  const deckCount = document.getElementById("deckCount");

  if (cardCount) {
    cardCount.textContent = String(FLASHCARDS.length);
  }
  if (questionCount) {
    questionCount.textContent = String(QUIZ.length);
  }
  if (deckCount) {
    deckCount.textContent = String(CARD_DECKS.length);
  }
}

function loadCardState(){
  const raw = safeGetItem(APP_STORAGE.cards);
  if (!raw) {
    return new Set();
  }

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return new Set();
    }

    return new Set(parsed.filter((value) => Number.isInteger(value) && value >= 0 && value < FLASHCARDS.length));
  } catch (error) {
    return new Set();
  }
}

function initCardsPage(){
  const cardsRoot = document.getElementById("cardsRoot");
  const answersRoot = document.getElementById("answersRoot");
  const deckNav = document.getElementById("deckNav");
  const cardProgress = document.getElementById("cardProgress");

  if (!cardsRoot || !answersRoot || !deckNav || !cardProgress) {
    return null;
  }

  const deckEntries = CARD_DECKS.map((deck) => ({
    ...deck,
    cards: FLASHCARDS.map((card, index) => ({ ...card, index })).filter((card) => deck.tags.includes(card.tag))
  }));

  let revealed = loadCardState();

  function saveState(){
    safeSetItem(APP_STORAGE.cards, JSON.stringify([...revealed]));
  }

  function toggleCard(index){
    if (revealed.has(index)) {
      revealed.delete(index);
    } else {
      revealed.add(index);
    }
    saveState();
    render();
  }

  function render(){
    cardProgress.textContent = `${revealed.size} / ${FLASHCARDS.length} cards`;
    deckNav.innerHTML = deckEntries.map((deck) => `
      <a class="nav-link nav-link--subtle" href="#deck-${escapeAttr(deck.id)}">${escapeHtml(deck.label)}</a>
    `).join("");

    cardsRoot.innerHTML = deckEntries.map((deck) => `
      <section class="box stack" id="deck-${escapeAttr(deck.id)}">
        <div>
          <h2 class="deck-title">${escapeHtml(deck.label)}</h2>
          <p class="deck-copy">${escapeHtml(deck.description)}</p>
        </div>
        <div class="flash-section-heading">Tap Cards</div>
        <div class="flash-grid">
          ${deck.cards.map((card) => {
            const isRevealed = revealed.has(card.index);
            return `
              <button
                class="flip-card${isRevealed ? " revealed" : ""}"
                type="button"
                data-card-index="${card.index}"
                aria-pressed="${isRevealed ? "true" : "false"}">
                <span class="badge">${escapeHtml(card.tag)}</span>
                <span class="k">${escapeHtml(card.front)}</span>
                <span class="v">${escapeHtml(isRevealed ? card.back : "Tap to check")}</span>
              </button>
            `;
          }).join("")}
        </div>
      </section>
    `).join("");

    answersRoot.innerHTML = deckEntries.map((deck) => `
      <section class="box stack">
        <div>
          <h2 class="deck-title">${escapeHtml(deck.label)}</h2>
          <p class="deck-copy">${escapeHtml(deck.description)}</p>
        </div>
        <div class="flash-section-heading">Question + Answer</div>
        <div class="answer-grid">
          ${deck.cards.map((card) => `
            <article class="answer-card">
              <div class="answer-card-label">Question</div>
              <div class="answer-card-front">${escapeHtml(card.front)}</div>
              <div class="answer-card-divider"></div>
              <div class="answer-card-label">Answer</div>
              <div class="answer-card-back">${escapeHtml(card.back)}</div>
            </article>
          `).join("")}
        </div>
      </section>
    `).join("");

    cardsRoot.querySelectorAll(".flip-card").forEach((button) => {
      button.addEventListener("click", () => {
        toggleCard(Number(button.dataset.cardIndex));
      });
    });
  }

  function reset(){
    revealed = new Set();
    saveState();
    render();
  }

  render();
  return reset;
}

function createDefaultQuizState(){
  return {
    qIdx: 0,
    answered: new Array(QUIZ.length).fill(null),
    showKey: false
  };
}

function loadQuizState(){
  const raw = safeGetItem(APP_STORAGE.quiz);
  if (!raw) {
    return createDefaultQuizState();
  }

  try {
    const parsed = JSON.parse(raw);
    const answered = Array.isArray(parsed.answered) ? parsed.answered.slice(0, QUIZ.length) : [];
    while (answered.length < QUIZ.length) {
      answered.push(null);
    }

    answered.forEach((choice, index) => {
      if (choice === null || choice === "__NO_ANSWER__") {
        return;
      }
      const valid = QUIZ[index].opts.includes(choice);
      if (!valid) {
        answered[index] = null;
      }
    });

    const qIdx = Number.isInteger(parsed.qIdx)
      ? Math.min(Math.max(parsed.qIdx, 0), QUIZ.length - 1)
      : 0;

    return {
      qIdx,
      answered,
      showKey: Boolean(parsed.showKey)
    };
  } catch (error) {
    return createDefaultQuizState();
  }
}

function initTimedPage(){
  const timerText = document.getElementById("timerText");
  const qCard = document.getElementById("qCard");
  const btnPrevQ = document.getElementById("btnPrevQ");
  const btnNextQ = document.getElementById("btnNextQ");
  const btnStart = document.getElementById("btnStart");
  const btnPause = document.getElementById("btnPause");
  const btnKey = document.getElementById("btnKey");
  const answerKey = document.getElementById("answerKey");
  const scoreText = document.getElementById("scoreText");
  const scoreTotal = document.getElementById("scoreTotal");
  const answeredCount = document.getElementById("answeredCount");
  const answeredTotal = document.getElementById("answeredTotal");

  if (!timerText || !qCard || !btnPrevQ || !btnNextQ || !btnStart || !btnPause || !btnKey || !answerKey || !scoreText || !scoreTotal || !answeredCount || !answeredTotal) {
    return null;
  }

  scoreTotal.textContent = String(QUIZ.length);
  answeredTotal.textContent = String(QUIZ.length);

  let state = loadQuizState();
  let timer = 12;
  let intervalId = null;
  let advanceTimeoutId = null;

  function getScore(){
    return state.answered.reduce((total, choice, index) => {
      return total + (choice === QUIZ[index].answer ? 1 : 0);
    }, 0);
  }

  function getAnsweredCount(){
    return state.answered.filter((choice) => choice !== null).length;
  }

  function saveState(){
    safeSetItem(APP_STORAGE.quiz, JSON.stringify(state));
  }

  function updateTimerText(label){
    timerText.textContent = label || `Time: ${timer}`;
  }

  function resetTimer(label){
    timer = 12;
    updateTimerText(label);
  }

  function clearAdvanceTimeout(){
    if (advanceTimeoutId !== null) {
      clearTimeout(advanceTimeoutId);
      advanceTimeoutId = null;
    }
  }

  function pause(){
    if (intervalId === null) {
      return;
    }
    clearInterval(intervalId);
    intervalId = null;
  }

  function start(){
    if (intervalId !== null || advanceTimeoutId !== null) {
      return;
    }
    if (getAnsweredCount() === QUIZ.length) {
      updateTimerText("Time: done");
      return;
    }
    intervalId = setInterval(tick, 1000);
    updateTimerText();
  }

  function scheduleAdvance(){
    clearAdvanceTimeout();
    if (state.qIdx >= QUIZ.length - 1) {
      updateTimerText("Time: done");
      return;
    }
    advanceTimeoutId = setTimeout(() => {
      state.qIdx += 1;
      saveState();
      resetTimer();
      renderQuestion();
      start();
    }, 550);
  }

  function choose(choice){
    if (state.answered[state.qIdx] !== null) {
      return;
    }

    const shouldResume = intervalId !== null;
    pause();
    clearAdvanceTimeout();

    state.answered[state.qIdx] = choice;
    saveState();
    renderQuestion();

    if (shouldResume) {
      if (state.qIdx < QUIZ.length - 1) {
        scheduleAdvance();
      } else {
        updateTimerText("Time: done");
      }
    }
  }

  function tick(){
    if (state.answered[state.qIdx] !== null) {
      pause();
      updateTimerText(state.qIdx >= QUIZ.length - 1 ? "Time: done" : `Time: ${timer}`);
      return;
    }

    timer -= 1;
    updateTimerText();

    if (timer > 0) {
      return;
    }

    pause();
    state.answered[state.qIdx] = "__NO_ANSWER__";
    saveState();
    renderQuestion();

    if (state.qIdx < QUIZ.length - 1) {
      scheduleAdvance();
    } else {
      updateTimerText("Time: done");
    }
  }

  function goToQuestion(index){
    clearAdvanceTimeout();
    state.qIdx = Math.min(Math.max(index, 0), QUIZ.length - 1);
    saveState();
    resetTimer();
    renderQuestion();
  }

  function renderQuestion(){
    const item = QUIZ[state.qIdx];
    const prior = state.answered[state.qIdx];
    const locked = prior !== null;
    const statusCopy = prior === null
      ? "Pick the best answer."
      : prior === "__NO_ANSWER__"
        ? "Time ran out. Check the right answer."
        : prior === item.answer
          ? "Nice. You got it."
          : "Check the right answer.";

    qCard.innerHTML = `
      <div class="qtitle">${escapeHtml(item.q)}</div>
      <div class="opts">
        ${item.opts.map((opt) => `
          <button class="opt" type="button" data-option="${escapeAttr(opt)}">${escapeHtml(opt)}</button>
        `).join("")}
      </div>
      <div class="question-meta">
        <div>Question ${state.qIdx + 1} of ${QUIZ.length}</div>
        <div>${escapeHtml(statusCopy)}</div>
      </div>
    `;

    qCard.querySelectorAll(".opt").forEach((button) => {
      const option = button.dataset.option;
      if (locked) {
        button.disabled = true;
      }
      button.addEventListener("click", () => choose(option));
    });

    if (locked) {
      qCard.querySelectorAll(".opt").forEach((button) => {
        const option = button.dataset.option;
        if (option === item.answer) {
          button.classList.add("correct");
        }
        if (prior !== "__NO_ANSWER__" && option === prior && prior !== item.answer) {
          button.classList.add("wrong");
        }
      });
    }

    btnPrevQ.disabled = state.qIdx === 0;
    btnNextQ.disabled = state.qIdx === QUIZ.length - 1;

    scoreText.textContent = String(getScore());
    answeredCount.textContent = String(getAnsweredCount());

    answerKey.innerHTML = `
      <div class="qtitle">Answer Help</div>
      <div class="section-copy"><b>Correct choice:</b> ${escapeHtml(item.answer)}</div>
      <div class="muted section-copy">${escapeHtml(item.key)}</div>
    `;
    answerKey.classList.toggle("show", state.showKey);
    btnKey.textContent = state.showKey ? "Hide Answer Help" : "Show Answer Help (optional)";

    if (intervalId === null && advanceTimeoutId === null) {
      updateTimerText(getAnsweredCount() === QUIZ.length ? "Time: done" : `Time: ${timer}`);
    }
  }

  function reset(){
    clearAdvanceTimeout();
    pause();
    state = createDefaultQuizState();
    saveState();
    resetTimer();
    renderQuestion();
  }

  btnPrevQ.addEventListener("click", () => {
    if (state.qIdx === 0) {
      return;
    }
    goToQuestion(state.qIdx - 1);
  });

  btnNextQ.addEventListener("click", () => {
    if (state.qIdx >= QUIZ.length - 1) {
      return;
    }
    goToQuestion(state.qIdx + 1);
  });

  btnStart.addEventListener("click", start);
  btnPause.addEventListener("click", pause);
  btnKey.addEventListener("click", () => {
    state.showKey = !state.showKey;
    saveState();
    answerKey.classList.toggle("show", state.showKey);
    btnKey.textContent = state.showKey ? "Hide Answer Help" : "Show Answer Help (optional)";
  });

  resetTimer();
  renderQuestion();
  return reset;
}

function bindResetProgress(resetHandler){
  document.querySelectorAll("[data-reset-progress]").forEach((button) => {
    button.addEventListener("click", () => {
      clearSavedProgress();
      if (typeof resetHandler === "function") {
        resetHandler();
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  bindThemeToggle();
  markCurrentNav();

  const page = document.body.dataset.page || "";
  let resetHandler = null;

  if (page === "home") {
    initHomePage();
  } else if (page === "cards") {
    resetHandler = initCardsPage();
  } else if (page === "timed") {
    resetHandler = initTimedPage();
  }

  bindResetProgress(resetHandler);
});
