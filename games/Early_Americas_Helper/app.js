const state = {
  currentPage: "home",
  currentCiv: "maya",
  mapView: "geo",
  flashIndex: 0,
  flashFlipped: false,
  matchingSelection: [],
  matchingMatched: new Set(),
  quizIndex: 0,
  quizScore: 0,
  quizLocked: false,
  teacherMode: false,
  savingEnabled: true,
  civStep: {},
  civIntroOnly: false,
  civChecks: {},
  examStudy: {
    mode: "flash",
    score: 0,
    attempts: 0,
    current: null,
  },
  miniLessonReplay: {},
  miniLesson: {
    score: 0,
    gate: 45,
    streak: 0,
    currentQuestionId: null,
    q3CorrectTerm: null,
    locked: false,
    revealedCount: 0,
    started: false,
  },
  vocabProgress: {
    flashcardsSeen: 0,
    matchingMatches: 0,
    quizCorrect: 0,
    quizTotal: 0,
  },
  civProgress: {},
};

const storage = {
  load(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (err) {
      return fallback;
    }
  },
  save(key, value) {
    if (!state.savingEnabled) return;
    localStorage.setItem(key, JSON.stringify(value));
  },
};

const els = {
  tabs: document.querySelectorAll(".tab"),
  pages: document.querySelectorAll(".page"),
  startMap: document.getElementById("startMap"),
  mapToggle: document.getElementById("mapToggle"),
  mapImage: document.getElementById("mapImage"),
  mapOverlay: document.getElementById("mapOverlay"),
  mapShell: document.getElementById("mapShell"),
  viewLabel: document.getElementById("viewLabel"),
  mapCredit: document.getElementById("mapCredit"),
  civPills: document.getElementById("civPills"),
  civDetail: document.getElementById("civDetail"),
  galleryPills: document.getElementById("galleryPills"),
  vocabPills: document.querySelectorAll("[data-vocab-tab]"),
  vocabPanels: document.querySelectorAll(".vocab-panel"),
  teacherMode: document.getElementById("teacherMode"),
  flashcard: document.getElementById("flashcard"),
  flashFront: document.getElementById("flashFront"),
  flashBack: document.getElementById("flashBack"),
  prevCard: document.getElementById("prevCard"),
  nextCard: document.getElementById("nextCard"),
  flipCard: document.getElementById("flipCard"),
  matchingGrid: document.getElementById("matchingGrid"),
  resetMatching: document.getElementById("resetMatching"),
  quizBox: document.getElementById("quizBox"),
  nextQuiz: document.getElementById("nextQuiz"),
  glossary: document.getElementById("glossary"),
  vocabProgress: document.getElementById("vocabProgress"),
  civProgress: document.getElementById("civProgress"),
  examModePills: document.querySelectorAll("[data-exam-mode]"),
  examModeHost: document.getElementById("examModeHost"),
};

// --- Teaching intro helpers (typewriter + vocab popover) ---
const SUPPLEMENTAL_VOCAB = {
  astronomer: {
    term: "Astronomer",
    definition:
      "A person who studies stars, planets, and the sky to understand how they move and what they mean.",
  },
  "city-state": {
    term: "City-state",
    definition:
      "A city that acts like its own country with its own leaders, rules, and way of life.",
  },
  "city-states": {
    term: "City-states",
    definition:
      "Cities that act like their own countries, each with its own leaders, rules, and way of life.",
  },
  codex: {
    term: "Codex",
    definition:
      "An early kind of book made from folded pages where people wrote important information.",
  },
  codices: {
    term: "Codices",
    definition:
      "More than one codex: early books made from folded pages where people wrote important information.",
  },
  chinampas: {
    term: "Chinampas",
    definition:
      "Man-made farming islands built in shallow lakes using mud, plants, and reeds to grow crops.",
  },
};
function escapeHtml(str) {
  return (str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function wrapVocab(text) {
  const vocabTerms = Array.isArray(VOCAB) ? VOCAB.map((v) => v.term) : [];
  const extraTerms = Object.values(SUPPLEMENTAL_VOCAB).map((v) => v.term);
  const terms = [...vocabTerms, ...extraTerms]
    .filter(Boolean)
    .sort((a, b) => b.length - a.length);

  let html = escapeHtml(text);
  for (const term of terms) {
    const safe = term.replace(/[.*+?^${}()|[\\]\\]/g, "\\$&");
    const re = new RegExp(`\\b(${safe})\\b`, "gi");
    html = html.replace(re, (m) => {
      return `<span class=\"vocab-pop\" data-term=\"${escapeHtml(term)}\">${m}</span>`;
    });
  }
  return html;
}

function ensureVocabPopover() {
  let pop = document.getElementById("vocabPopover");
  if (pop) return pop;

  pop = document.createElement("div");
  pop.id = "vocabPopover";
  pop.className = "vocab-popover";
  pop.innerHTML = `
    <div class=\"vocab-popover-title\" id=\"vpTitle\"></div>
    <div class=\"vocab-popover-def\" id=\"vpDef\"></div>
    <div class=\"vocab-popover-mini\" id=\"vpMini\"></div>
    <button class=\"vocab-popover-close\" id=\"vpClose\">Close</button>
  `;
  document.body.appendChild(pop);

  pop.querySelector("#vpClose").addEventListener("click", (e) => {
    e.stopPropagation();
    pop.classList.remove("show");
  });

  return pop;
}

function showVocabPopover(term) {
  if (!term) return;
  const normalized = (term || "").toLowerCase();
  const v =
    (Array.isArray(VOCAB)
      ? VOCAB.find((x) => (x.term || "").toLowerCase() === normalized)
      : null) || SUPPLEMENTAL_VOCAB[normalized];
  if (!v) return;

  const pop = ensureVocabPopover();
  pop.querySelector("#vpTitle").textContent = v.term;
  pop.querySelector("#vpDef").textContent = v.definition || "";
  pop.querySelector("#vpMini").textContent = v.clue ? `Quick clue: ${v.clue}` : "";
  pop.classList.add("show");
}

function typewriterToBox(boxEl, plainText, speed = 16, onDone = null) {
  if (!boxEl) return;
  boxEl.classList.add("fade-out");

  setTimeout(() => {
    boxEl.classList.remove("fade-out");
    boxEl.innerHTML = '<div class="teach-text"></div>';
    const liveTextEl = boxEl.querySelector(".teach-text");

    const chars = (plainText || "").split("");
    let i = 0;

    const tick = () => {
      const ch = chars[i++] || "";
      if (liveTextEl) liveTextEl.textContent += ch;
      if (i < chars.length) {
        const extra =
          ch === "." || ch === "!" || ch === "?"
            ? speed * 8
            : ch === "," || ch === ";" || ch === ":"
            ? speed * 4
            : 0;
        setTimeout(tick, speed + extra);
      } else {
        boxEl.innerHTML = `<div class=\"teach-text\">${wrapVocab(plainText)}</div>`;
        boxEl.querySelectorAll(".vocab-pop").forEach((span) => {
          span.addEventListener("click", (e) => {
            e.stopPropagation();
            showVocabPopover(span.dataset.term);
          });
        });
        if (typeof onDone === "function") {
          onDone(boxEl);
        }
      }
    };

    if (!chars.length) {
      boxEl.innerHTML = "";
      return;
    }

    tick();
  }, 140);
}

function typewriterPlain(el, text, speed = 20) {
  if (!el) return;
  const chars = (text || "").split("");
  let i = 0;
  el.textContent = "";
  const tick = () => {
    const ch = chars[i++] || "";
    el.textContent += ch;
    if (i < chars.length) {
      const extra =
        ch === "." || ch === "!" || ch === "?"
          ? speed * 8
          : ch === "," || ch === ";" || ch === ":"
          ? speed * 4
          : 0;
      setTimeout(tick, speed + extra);
    }
  };
  tick();
}

function renderIncaTeachCheck(boxEl, promptIndex) {
  if (!boxEl) return;
  const existing = boxEl.querySelector(".teach-check");
  if (existing) existing.remove();

  if (promptIndex === 0) {
    renderIncaWhoCheck(boxEl);
  } else if (promptIndex === 1) {
    renderIncaFarmCheck(boxEl);
  } else if (promptIndex === 2) {
    renderIncaRecordsCheck(boxEl);
  }
}

function renderIncaWhoCheck(boxEl) {
  const completed = Boolean(state.civProgress.inca && state.civProgress.inca.introWhoCheck);
  const container = document.createElement("div");
  container.className = `teach-check${completed ? " locked" : ""}`;
  container.innerHTML = `
    <div class="teach-check-title">Test Your Knowledge!</div>
    <div class="teach-check-sub">Complete the sentence using the dropdowns.</div>
    <div class="knowledge-sentence">
      The Inca built a powerful empire in the
      <select class="knowledge-select" data-blank="b1">
        <option value="">Select</option>
        <option value="Andes">Andes</option>
        <option value="Appalachian">Appalachian</option>
        <option value="Alps">Alps</option>
      </select>
      Mountains and managed it with
      <select class="knowledge-select" data-blank="b2">
        <option value="">Select</option>
        <option value="roads">roads</option>
        <option value="chinampas">chinampas</option>
        <option value="pyramids">pyramids</option>
      </select>,
      <select class="knowledge-select" data-blank="b3">
        <option value="">Select</option>
        <option value="messengers">messengers</option>
        <option value="calendars">calendars</option>
        <option value="codices">codices</option>
      </select>,
      and record-keeping.
    </div>
    <div class="knowledge-actions">
      <button class="primary" id="incaWhoCheckBtn">Check</button>
      <div class="knowledge-status" id="incaWhoStatus">${completed ? "✅ Complete" : ""}</div>
    </div>
  `;
  boxEl.appendChild(container);

  if (completed) return;

  const button = container.querySelector("#incaWhoCheckBtn");
  const status = container.querySelector("#incaWhoStatus");
  const selects = container.querySelectorAll("select");

  button.addEventListener("click", () => {
    let allFilled = true;
    let allCorrect = true;
    selects.forEach((sel) => {
      sel.classList.remove("correct", "wrong");
      if (!sel.value) allFilled = false;
    });
    if (!allFilled) {
      status.textContent = "Pick an answer for each blank.";
      status.classList.add("bad");
      return;
    }
    const b1 = container.querySelector('[data-blank="b1"]').value;
    const b2 = container.querySelector('[data-blank="b2"]').value;
    const b3 = container.querySelector('[data-blank="b3"]').value;
    const correct = { b1: "Andes", b2: "roads", b3: "messengers" };
    if (b1 !== correct.b1) allCorrect = false;
    if (b2 !== correct.b2) allCorrect = false;
    if (b3 !== correct.b3) allCorrect = false;

    selects.forEach((sel) => {
      const key = sel.dataset.blank;
      if (sel.value === correct[key]) {
        sel.classList.add("correct");
      } else {
        sel.classList.add("wrong");
      }
    });

    if (allCorrect) {
      status.textContent = "Nice work! You got it.";
      status.classList.remove("bad");
      status.classList.add("good");
      if (!state.civProgress.inca) state.civProgress.inca = {};
      state.civProgress.inca.introWhoCheck = true;
      if (!state.teacherMode && state.savingEnabled) {
        storage.save("earlyAmericasCivProgress", state.civProgress);
      }
      container.classList.add("locked");
    } else {
      status.textContent = "Not yet — re-read the answer and try again.";
      status.classList.add("bad");
    }
  });
}

function renderIncaFarmCheck(boxEl) {
  const completed = Boolean(state.civProgress.inca && state.civProgress.inca.introFarmCheck);
  const pieces = ["terrace", "farming"].sort(() => Math.random() - 0.5);
  const container = document.createElement("div");
  container.className = `teach-check${completed ? " locked" : ""}`;
  container.innerHTML = `
    <div class="teach-check-title">Quick Check: Build the phrase</div>
    <div class="teach-check-sub">Drag the pieces into the right order to spell the farming method.</div>
    <div class="bank-row" id="incaFarmBank">
      ${pieces.map((p) => `<div class="drag-chip" draggable="true" data-piece="${p}">${p}</div>`).join("")}
    </div>
    <div class="slot-row" id="incaFarmSlots">
      <div class="drop-slot" data-slot="0"></div>
      <div class="drop-slot" data-slot="1"></div>
    </div>
    <div class="knowledge-actions">
      <button class="primary" id="incaFarmCheckBtn">Check</button>
      <button class="secondary" id="incaFarmResetBtn">Reset</button>
      <div class="knowledge-status" id="incaFarmStatus">${completed ? "✅ Complete" : ""}</div>
    </div>
  `;
  boxEl.appendChild(container);

  if (completed) return;

  const bank = container.querySelector("#incaFarmBank");
  const slots = container.querySelectorAll(".drop-slot");
  const status = container.querySelector("#incaFarmStatus");
  const checkBtn = container.querySelector("#incaFarmCheckBtn");
  const resetBtn = container.querySelector("#incaFarmResetBtn");

  const onDragStart = (e) => {
    e.dataTransfer.setData("text/plain", e.target.dataset.piece);
  };

  const onDropToSlot = (e) => {
    e.preventDefault();
    const piece = e.dataTransfer.getData("text/plain");
    if (!piece || e.currentTarget.firstChild) return;
    const chip = container.querySelector(`.drag-chip[data-piece="${piece}"]`);
    if (chip) e.currentTarget.appendChild(chip);
  };

  const onDropToBank = (e) => {
    e.preventDefault();
    const piece = e.dataTransfer.getData("text/plain");
    if (!piece) return;
    const chip = container.querySelector(`.drag-chip[data-piece="${piece}"]`);
    if (chip) bank.appendChild(chip);
  };

  container.querySelectorAll(".drag-chip").forEach((chip) => {
    chip.addEventListener("dragstart", onDragStart);
  });

  slots.forEach((slot) => {
    slot.addEventListener("dragover", (e) => e.preventDefault());
    slot.addEventListener("drop", onDropToSlot);
  });

  bank.addEventListener("dragover", (e) => e.preventDefault());
  bank.addEventListener("drop", onDropToBank);

  resetBtn.addEventListener("click", () => {
    container.querySelectorAll(".drag-chip").forEach((chip) => bank.appendChild(chip));
    status.textContent = "";
    status.classList.remove("good", "bad");
  });

  checkBtn.addEventListener("click", () => {
    const result = Array.from(slots).map((slot) => slot.textContent.trim());
    if (result[0] === "terrace" && result[1] === "farming") {
      status.textContent = "Nice work! You got it.";
      status.classList.remove("bad");
      status.classList.add("good");
      if (!state.civProgress.inca) state.civProgress.inca = {};
      state.civProgress.inca.introFarmCheck = true;
      if (!state.teacherMode && state.savingEnabled) {
        storage.save("earlyAmericasCivProgress", state.civProgress);
      }
      container.classList.add("locked");
    } else {
      status.textContent = "Not yet — try again.";
      status.classList.add("bad");
    }
  });
}

function renderIncaRecordsCheck(boxEl) {
  const completed = Boolean(state.civProgress.inca && state.civProgress.inca.introRecordsCheck);
  const container = document.createElement("div");
  container.className = `teach-check${completed ? " locked" : ""}`;
  container.innerHTML = `
    <div class="teach-check-title">Quick Check</div>
    <div class="teach-check-sub">What is a quipu?</div>
    <div class="mc-list">
      <label class="mc-option"><input type="radio" name="incaQuipu" value="correct" /> knotted cords used to record information</label>
      <label class="mc-option"><input type="radio" name="incaQuipu" value="wrong1" /> a pyramid temple</label>
      <label class="mc-option"><input type="radio" name="incaQuipu" value="wrong2" /> floating gardens for farming</label>
    </div>
    <div class="knowledge-actions">
      <button class="primary" id="incaRecordsCheckBtn">Check</button>
      <div class="knowledge-status" id="incaRecordsStatus">${completed ? "✅ Complete" : ""}</div>
    </div>
  `;
  boxEl.appendChild(container);

  if (completed) return;

  const status = container.querySelector("#incaRecordsStatus");
  const checkBtn = container.querySelector("#incaRecordsCheckBtn");
  const options = container.querySelectorAll("input[type='radio']");

  checkBtn.addEventListener("click", () => {
    const selected = Array.from(options).find((o) => o.checked);
    if (!selected) {
      status.textContent = "Pick an answer for each blank.";
      status.classList.add("bad");
      return;
    }
    if (selected.value === "correct") {
      status.textContent = "Nice work! You got it.";
      status.classList.remove("bad");
      status.classList.add("good");
      if (!state.civProgress.inca) state.civProgress.inca = {};
      state.civProgress.inca.introRecordsCheck = true;
      if (!state.teacherMode && state.savingEnabled) {
        storage.save("earlyAmericasCivProgress", state.civProgress);
      }
      container.classList.add("locked");
    } else {
      status.textContent = "Not yet — re-read the answer and try again.";
      status.classList.add("bad");
    }
  });
}
function openAztecKnowledgeOverlay(civKey, civ) {
  const knowledgeCheck = civ.knowledgeChecks ? civ.knowledgeChecks.intro : null;
  if (!knowledgeCheck) return;
  const modal = ensureCheckOverlay();
  const title = modal.querySelector("#checkTitle");
  const prompt = modal.querySelector("#checkPrompt");
  const sentenceEl = modal.querySelector("#checkSentence");
  const result = modal.querySelector("#checkResult");
  const submit = modal.querySelector("#checkSubmit");

  const shuffleArray = (arr) => [...arr].sort(() => Math.random() - 0.5);

  const steps = [
    {
      id: "intro",
      title: knowledgeCheck.title || "Test Your Knowledge!",
      prompt: knowledgeCheck.directions || "Complete the sentence.",
      render() {
        const template = Array.isArray(knowledgeCheck.template) ? knowledgeCheck.template : [];
        const sentenceHtml = template
          .map((part) => {
            if (typeof part === "string") return `<span>${escapeHtml(part)}</span>`;
            if (!part || !part.blankId) return "";
            const blank = knowledgeCheck.blanks && knowledgeCheck.blanks[part.blankId];
            const options = blank ? shuffleArray(blank.options || []) : [];
            return `
              <select class="knowledge-select" data-blank="${part.blankId}">
                <option value="">Select</option>
                ${options.map((opt) => `<option value="${escapeHtml(opt)}">${escapeHtml(opt)}</option>`).join("")}
              </select>
            `;
          })
          .join("");
        sentenceEl.innerHTML = sentenceHtml;
      },
      validate() {
        const selects = sentenceEl.querySelectorAll("select[data-blank]");
        let allFilled = true;
        let allCorrect = true;
        selects.forEach((sel) => {
          if (!sel.value) allFilled = false;
          const blankId = sel.dataset.blank;
          const blank = knowledgeCheck.blanks && knowledgeCheck.blanks[blankId];
          if (!blank || sel.value !== blank.answer) allCorrect = false;
        });
        if (!allFilled) return { ok: false, message: "Pick an answer for each blank.", type: "bad" };
        if (allCorrect) {
          return { ok: true, message: "Correct! Nice work!", type: "good" };
        }
        return { ok: false, message: knowledgeCheck.retryMessage || "Almost — try again.", type: "bad" };
      },
      isComplete() {
        return getCivCheckState(civKey, "intro");
      },
    },
    {
      id: "chinampas",
      title: "Quick Check: Build the word",
      prompt:
        "They built floating gardens called _________ to farm on the lake.\n\nWhat were their floating gardens called?",
      render() {
        const pieces = shuffleArray(["chi", "nam", "pas"]);
        sentenceEl.innerHTML = `
          <div class="teach-check-sub">Drag the pieces into the right order to spell the word.</div>
          <div class="bank-row" id="chinampaBank">
            ${pieces.map((p) => `<div class="drag-chip" draggable="true" data-piece="${p}">${p}</div>`).join("")}
          </div>
          <div class="slot-row" id="chinampaSlots">
            <div class="drop-slot" data-slot="0"></div>
            <div class="drop-slot" data-slot="1"></div>
            <div class="drop-slot" data-slot="2"></div>
          </div>
        `;
        const bank = sentenceEl.querySelector("#chinampaBank");
        const slots = sentenceEl.querySelectorAll(".drop-slot");
        const onDragStart = (e) => {
          e.dataTransfer.setData("text/plain", e.target.dataset.piece);
        };
        const onDropToSlot = (e) => {
          e.preventDefault();
          const piece = e.dataTransfer.getData("text/plain");
          if (!piece || e.currentTarget.firstChild) return;
          const chip = sentenceEl.querySelector(`.drag-chip[data-piece="${piece}"]`);
          if (chip) e.currentTarget.appendChild(chip);
        };
        const onDropToBank = (e) => {
          e.preventDefault();
          const piece = e.dataTransfer.getData("text/plain");
          if (!piece) return;
          const chip = sentenceEl.querySelector(`.drag-chip[data-piece="${piece}"]`);
          if (chip) bank.appendChild(chip);
        };
        sentenceEl.querySelectorAll(".drag-chip").forEach((chip) => {
          chip.addEventListener("dragstart", onDragStart);
        });
        slots.forEach((slot) => {
          slot.addEventListener("dragover", (e) => e.preventDefault());
          slot.addEventListener("drop", onDropToSlot);
        });
        bank.addEventListener("dragover", (e) => e.preventDefault());
        bank.addEventListener("drop", onDropToBank);
      },
      validate() {
        const slots = sentenceEl.querySelectorAll(".drop-slot");
        const resultWord = Array.from(slots).map((slot) => slot.textContent.trim()).join("");
        if (resultWord === "chinampas") {
          return { ok: true, message: "Correct! Nice work!", type: "good" };
        }
        return { ok: false, message: "Not yet — try again.", type: "bad" };
      },
      isComplete() {
        return Boolean(state.civProgress.aztec && state.civProgress.aztec.introFoodCheck);
      },
    },
    {
      id: "tribute",
      title: "Quick Check",
      prompt: "They collected tribute from conquered groups. What does “tribute” mean?",
      render() {
        const choices = shuffleArray([
          { value: "correct", label: "payments in goods or work" },
          { value: "wrong1", label: "free gifts given to neighbors" },
          { value: "wrong2", label: "a type of Aztec temple" },
        ]);
        sentenceEl.innerHTML = `
          <div class="mc-list">
            ${choices
              .map(
                (choice) =>
                  `<label class="mc-option"><input type="radio" name="tribute" value="${choice.value}" /> ${choice.label}</label>`
              )
              .join("")}
          </div>
        `;
      },
      validate() {
        const selected = sentenceEl.querySelector("input[type='radio']:checked");
        if (!selected) {
          return { ok: false, message: "Pick an answer for each blank.", type: "bad" };
        }
        if (selected.value === "correct") {
          return { ok: true, message: "Correct! Nice work!", type: "good" };
        }
        return { ok: false, message: "Not yet — re-read the sentence and try again.", type: "bad" };
      },
      isComplete() {
        return Boolean(state.civProgress.aztec && state.civProgress.aztec.introTributeCheck);
      },
    },
  ];

  const sequence = [0, 1, 2];
  let sequencePos = 0;
  let stepIndex = sequence[sequencePos];
  const allComplete = steps.every((step) => step.isComplete());
  const sessionCorrect = [false, false, false];

  const showCompletion = () => {
    title.textContent = "All Checks Complete";
    prompt.textContent = "";
    sentenceEl.innerHTML = "<div class=\"teach-check-title\">Nice work! You completed all 3 checks.</div>";
    result.textContent = "";
    submit.textContent = "Close";
    submit.onclick = () => modal.classList.remove("show");
  };

  const renderStep = (idx) => {
    const step = steps[idx];
    title.textContent = step.title;
    prompt.textContent = step.prompt;
    result.textContent = "";
    result.classList.remove("good", "bad");
    step.render();
    submit.textContent = "Check";
    submit.dataset.next = "false";
  };

  const showNextButton = () => {
    const nextBtn = document.createElement("button");
    nextBtn.className = "primary next-question-btn";
    nextBtn.textContent = "Next Question";
    nextBtn.addEventListener("click", () => {
      nextBtn.remove();
      if (sequencePos < sequence.length - 1) {
        sequencePos += 1;
        stepIndex = sequence[sequencePos];
        renderStep(stepIndex);
      } else {
        if (sessionCorrect.every(Boolean)) {
          if (!state.civProgress.aztec) state.civProgress.aztec = {};
          state.civProgress.aztec.introFoodCheck = true;
          state.civProgress.aztec.introTributeCheck = true;
          if (!state.teacherMode) {
            storage.save("earlyAmericasCivProgress", state.civProgress);
            setCivCheckState(civKey, "intro", true);
          }
          updateProgressCards();
          showCompletion();
        } else {
          result.textContent = "Keep going — you need all 3 correct in one attempt.";
          result.classList.remove("good");
          result.classList.add("bad");
        }
      }
    });
    const actions = modal.querySelector(".check-actions");
    actions.appendChild(nextBtn);
  };

  submit.onclick = () => {
    const step = steps[stepIndex];
    if (submit.dataset.next === "true") {
      return;
    }
    const outcome = step.validate();
    result.textContent = outcome.message;
    result.classList.toggle("good", outcome.type === "good");
    result.classList.toggle("bad", outcome.type === "bad");
    if (outcome.ok) {
      sessionCorrect[stepIndex] = true;
      submit.textContent = "Check";
      submit.dataset.next = "false";
      showNextButton();
    }
  };

  modal.classList.add("show");
  if (allComplete) {
    showCompletion();
  } else {
    renderStep(stepIndex);
  }
}

function openMayaKnowledgeOverlay(civKey) {
  const modal = ensureCheckOverlay();
  const title = modal.querySelector("#checkTitle");
  const prompt = modal.querySelector("#checkPrompt");
  const sentenceEl = modal.querySelector("#checkSentence");
  const result = modal.querySelector("#checkResult");
  const submit = modal.querySelector("#checkSubmit");

  const shuffleArray = (arr) => [...arr].sort(() => Math.random() - 0.5);
  const sessionCorrect = [false, false, false];
  let sequencePos = 0;

  const steps = [
    {
      id: "who",
      title: "Test Your Knowledge!",
      prompt: "Complete the sentence using the dropdowns.",
      render() {
        const b1 = shuffleArray(["astronomers", "warriors", "messengers"]);
        const b2 = shuffleArray(["builders", "fishers", "emperors"]);
        const b3 = shuffleArray(["city-states", "chinampas", "terraces"]);
        sentenceEl.innerHTML = `
          The Maya were skilled
          <select class="knowledge-select" data-blank="b1">
            <option value="">Select</option>
            ${b1.map((o) => `<option value="${o}">${o}</option>`).join("")}
          </select>
          and
          <select class="knowledge-select" data-blank="b2">
            <option value="">Select</option>
            ${b2.map((o) => `<option value="${o}">${o}</option>`).join("")}
          </select>
          who developed
          <select class="knowledge-select" data-blank="b3">
            <option value="">Select</option>
            ${b3.map((o) => `<option value="${o}">${o}</option>`).join("")}
          </select>
          in the jungles of Mesoamerica.
        `;
      },
      validate() {
        const b1 = sentenceEl.querySelector('[data-blank="b1"]').value;
        const b2 = sentenceEl.querySelector('[data-blank="b2"]').value;
        const b3 = sentenceEl.querySelector('[data-blank="b3"]').value;
        if (!b1 || !b2 || !b3) {
          return { ok: false, message: "Pick an answer for each blank.", type: "bad" };
        }
        const ok = b1 === "astronomers" && b2 === "builders" && b3 === "city-states";
        if (ok) return { ok: true, message: "Nice work! You got it.", type: "good" };
        return { ok: false, message: "Not yet — re-read the answer and try again.", type: "bad" };
      },
    },
    {
      id: "where",
      title: "Test Your Knowledge!",
      prompt: "Complete the sentence using the dropdowns.",
      render() {
        const b1 = shuffleArray(["Mexico", "Peru", "Spain"]);
        const b2 = shuffleArray(["Central America", "the Andes", "Italy"]);
        const b3 = shuffleArray(["both", "neither", "only oceans"]);
        sentenceEl.innerHTML = `
          Mesoamerica includes parts of
          <select class="knowledge-select" data-blank="b1">
            <option value="">Select</option>
            ${b1.map((o) => `<option value="${o}">${o}</option>`).join("")}
          </select>
          and
          <select class="knowledge-select" data-blank="b2">
            <option value="">Select</option>
            ${b2.map((o) => `<option value="${o}">${o}</option>`).join("")}
          </select>
          (and also
          <select class="knowledge-select" data-blank="b3">
            <option value="">Select</option>
            ${b3.map((o) => `<option value="${o}">${o}</option>`).join("")}
          </select>
          ).
        `;
      },
      validate() {
        const b1 = sentenceEl.querySelector('[data-blank="b1"]').value;
        const b2 = sentenceEl.querySelector('[data-blank="b2"]').value;
        const b3 = sentenceEl.querySelector('[data-blank="b3"]').value;
        if (!b1 || !b2 || !b3) {
          return { ok: false, message: "Pick an answer for each blank.", type: "bad" };
        }
        const ok = b1 === "Mexico" && b2 === "Central America" && b3 === "both";
        if (ok) return { ok: true, message: "Nice work! You got it.", type: "good" };
        return { ok: false, message: "Not yet — re-read the answer and try again.", type: "bad" };
      },
    },
    {
      id: "famous",
      title: "Test Your Knowledge!",
      prompt: "Which THREE things are the Maya famous for?",
      render() {
        const options = shuffleArray([
          { label: "calendars", correct: true },
          { label: "astronomy", correct: true },
          { label: "writing (codices)", correct: true },
          { label: "chinampas", correct: false },
          { label: "terrace farming", correct: false },
          { label: "quipu", correct: false },
        ]);
        sentenceEl.innerHTML = `
          <div class="mc-list">
            ${options
              .map(
                (opt, idx) =>
                  `<div class="mc-option option-chip" data-correct="${opt.correct}" data-id="m${idx}">${opt.label}</div>`
              )
              .join("")}
          </div>
        `;
        sentenceEl.querySelectorAll(".option-chip").forEach((chip) => {
          chip.addEventListener("click", () => {
            chip.classList.toggle("selected");
          });
        });
      },
      validate() {
        const chips = Array.from(sentenceEl.querySelectorAll(".option-chip"));
        const selected = chips.filter((c) => c.classList.contains("selected"));
        if (selected.length !== 3) {
          return { ok: false, message: "Not yet — pick the THREE that match the answer.", type: "bad" };
        }
        const allCorrect = selected.every((c) => c.dataset.correct === "true");
        if (allCorrect) return { ok: true, message: "Nice work! You got it.", type: "good" };
        return { ok: false, message: "Not yet — pick the THREE that match the answer.", type: "bad" };
      },
    },
  ];

  const renderStep = (idx) => {
    const step = steps[idx];
    title.textContent = step.title;
    prompt.textContent = step.prompt;
    result.textContent = "";
    result.classList.remove("good", "bad");
    step.render();
    submit.textContent = "Check";
    submit.dataset.next = "false";
  };

  const showCompletion = () => {
    title.textContent = "All Checks Complete";
    prompt.textContent = "";
    sentenceEl.innerHTML = "<div class=\"teach-check-title\">Nice work! You completed all 3 checks.</div>";
    result.textContent = "";
    submit.textContent = "Close";
    submit.onclick = () => modal.classList.remove("show");
  };

  const showNextButton = () => {
    const nextBtn = document.createElement("button");
    nextBtn.className = "primary next-question-btn";
    nextBtn.textContent = "Next Question";
    nextBtn.addEventListener("click", () => {
      nextBtn.remove();
      if (sequencePos < steps.length - 1) {
        sequencePos += 1;
        renderStep(sequencePos);
      } else {
        if (sessionCorrect.every(Boolean)) {
          if (!state.civProgress.maya) state.civProgress.maya = {};
          state.civProgress.maya.introWhoCheck = true;
          state.civProgress.maya.introWhereCheck = true;
          state.civProgress.maya.introFamousCheck = true;
          if (!state.teacherMode) {
            storage.save("earlyAmericasCivProgress", state.civProgress);
          }
          updateProgressCards();
          showCompletion();
        } else {
          result.textContent = "Keep going — you need all 3 correct in one attempt.";
          result.classList.remove("good");
          result.classList.add("bad");
        }
      }
    });
    modal.querySelector(".check-actions").appendChild(nextBtn);
  };

  submit.onclick = () => {
    if (submit.dataset.next === "true") return;
    const step = steps[sequencePos];
    const outcome = step.validate();
    result.textContent = outcome.message;
    result.classList.toggle("good", outcome.type === "good");
    result.classList.toggle("bad", outcome.type === "bad");
    if (outcome.ok) {
      sessionCorrect[sequencePos] = true;
      showNextButton();
    } else if (step.id === "famous") {
      const chips = Array.from(sentenceEl.querySelectorAll(".option-chip"));
      chips.forEach((chip) => {
        if (chip.classList.contains("selected")) {
          chip.classList.toggle("wrong", chip.dataset.correct !== "true");
          chip.classList.toggle("correct", chip.dataset.correct === "true");
        }
      });
    }
  };

  modal.classList.add("show");
  renderStep(sequencePos);
}

function openIncaKnowledgeOverlay(civKey) {
  const modal = ensureCheckOverlay();
  const title = modal.querySelector("#checkTitle");
  const prompt = modal.querySelector("#checkPrompt");
  const sentenceEl = modal.querySelector("#checkSentence");
  const result = modal.querySelector("#checkResult");
  const submit = modal.querySelector("#checkSubmit");

  const shuffleArray = (arr) => [...arr].sort(() => Math.random() - 0.5);
  const sessionCorrect = [false, false, false];
  let sequencePos = 0;

  const steps = [
    {
      id: "who",
      title: "Test Your Knowledge!",
      prompt: "Complete the sentence using the dropdowns.",
      render() {
        const b1 = shuffleArray(["Andes", "Appalachian", "Alps"]);
        const b2 = shuffleArray(["roads", "chinampas", "pyramids"]);
        const b3 = shuffleArray(["messengers", "calendars", "codices"]);
        sentenceEl.innerHTML = `
          The Inca built a powerful empire in the
          <select class="knowledge-select" data-blank="b1">
            <option value="">Select</option>
            ${b1.map((o) => `<option value="${o}">${o}</option>`).join("")}
          </select>
          Mountains and managed it with
          <select class="knowledge-select" data-blank="b2">
            <option value="">Select</option>
            ${b2.map((o) => `<option value="${o}">${o}</option>`).join("")}
          </select>,
          <select class="knowledge-select" data-blank="b3">
            <option value="">Select</option>
            ${b3.map((o) => `<option value="${o}">${o}</option>`).join("")}
          </select>,
          and record-keeping.
        `;
      },
      validate() {
        const b1 = sentenceEl.querySelector('[data-blank="b1"]').value;
        const b2 = sentenceEl.querySelector('[data-blank="b2"]').value;
        const b3 = sentenceEl.querySelector('[data-blank="b3"]').value;
        if (!b1 || !b2 || !b3) {
          return { ok: false, message: "Pick an answer for each blank.", type: "bad" };
        }
        const ok = b1 === "Andes" && b2 === "roads" && b3 === "messengers";
        if (ok) return { ok: true, message: "Nice work! You got it.", type: "good" };
        return { ok: false, message: "Not yet — re-read the answer and try again.", type: "bad" };
      },
    },
    {
      id: "farm",
      title: "Quick Check: Build the phrase",
      prompt: "Drag the pieces into the right order to spell the farming method.",
      render() {
        const pieces = shuffleArray(["terrace", "farming"]);
        sentenceEl.innerHTML = `
          <div class="bank-row" id="incaFarmBank">
            ${pieces.map((p) => `<div class="drag-chip" draggable="true" data-piece="${p}">${p}</div>`).join("")}
          </div>
          <div class="slot-row" id="incaFarmSlots">
            <div class="drop-slot" data-slot="0"></div>
            <div class="drop-slot" data-slot="1"></div>
          </div>
        `;
        const bank = sentenceEl.querySelector("#incaFarmBank");
        const slots = sentenceEl.querySelectorAll(".drop-slot");
        const onDragStart = (e) => {
          e.dataTransfer.setData("text/plain", e.target.dataset.piece);
        };
        const onDropToSlot = (e) => {
          e.preventDefault();
          const piece = e.dataTransfer.getData("text/plain");
          if (!piece || e.currentTarget.firstChild) return;
          const chip = sentenceEl.querySelector(`.drag-chip[data-piece="${piece}"]`);
          if (chip) e.currentTarget.appendChild(chip);
        };
        const onDropToBank = (e) => {
          e.preventDefault();
          const piece = e.dataTransfer.getData("text/plain");
          if (!piece) return;
          const chip = sentenceEl.querySelector(`.drag-chip[data-piece="${piece}"]`);
          if (chip) bank.appendChild(chip);
        };
        sentenceEl.querySelectorAll(".drag-chip").forEach((chip) => {
          chip.addEventListener("dragstart", onDragStart);
        });
        slots.forEach((slot) => {
          slot.addEventListener("dragover", (e) => e.preventDefault());
          slot.addEventListener("drop", onDropToSlot);
        });
        bank.addEventListener("dragover", (e) => e.preventDefault());
        bank.addEventListener("drop", onDropToBank);
      },
      validate() {
        const slots = sentenceEl.querySelectorAll(".drop-slot");
        const resultWord = Array.from(slots).map((slot) => slot.textContent.trim()).join(" ");
        if (resultWord === "terrace farming") {
          return { ok: true, message: "Nice work! You got it.", type: "good" };
        }
        return { ok: false, message: "Not yet — try again.", type: "bad" };
      },
    },
    {
      id: "records",
      title: "Quick Check",
      prompt: "What is a quipu?",
      render() {
        const choices = shuffleArray([
          { value: "correct", label: "knotted cords used to record information" },
          { value: "wrong1", label: "a pyramid temple" },
          { value: "wrong2", label: "floating gardens for farming" },
        ]);
        sentenceEl.innerHTML = `
          <div class="mc-list">
            ${choices
              .map(
                (choice) =>
                  `<label class="mc-option"><input type="radio" name="incaQuipu" value="${choice.value}" /> ${choice.label}</label>`
              )
              .join("")}
          </div>
        `;
      },
      validate() {
        const selected = sentenceEl.querySelector("input[type='radio']:checked");
        if (!selected) {
          return { ok: false, message: "Pick an answer for each blank.", type: "bad" };
        }
        if (selected.value === "correct") {
          return { ok: true, message: "Nice work! You got it.", type: "good" };
        }
        return { ok: false, message: "Not yet — re-read the answer and try again.", type: "bad" };
      },
    },
  ];

  const renderStep = (idx) => {
    const step = steps[idx];
    title.textContent = step.title;
    prompt.textContent = step.prompt;
    result.textContent = "";
    result.classList.remove("good", "bad");
    step.render();
    submit.textContent = "Check";
    submit.dataset.next = "false";
  };

  const showCompletion = () => {
    title.textContent = "All Checks Complete";
    prompt.textContent = "";
    sentenceEl.innerHTML = "<div class=\"teach-check-title\">Nice work! You completed all 3 checks.</div>";
    result.textContent = "";
    submit.textContent = "Close";
    submit.onclick = () => modal.classList.remove("show");
  };

  const showNextButton = () => {
    const nextBtn = document.createElement("button");
    nextBtn.className = "primary next-question-btn";
    nextBtn.textContent = "Next Question";
    nextBtn.addEventListener("click", () => {
      nextBtn.remove();
      if (sequencePos < steps.length - 1) {
        sequencePos += 1;
        renderStep(sequencePos);
      } else {
        if (sessionCorrect.every(Boolean)) {
          if (!state.civProgress.inca) state.civProgress.inca = {};
          state.civProgress.inca.introWhoCheck = true;
          state.civProgress.inca.introFarmCheck = true;
          state.civProgress.inca.introRecordsCheck = true;
          if (!state.teacherMode && state.savingEnabled) {
            storage.save("earlyAmericasCivProgress", state.civProgress);
          }
          updateProgressCards();
          showCompletion();
        } else {
          result.textContent = "Keep going — you need all 3 correct in one attempt.";
          result.classList.remove("good");
          result.classList.add("bad");
        }
      }
    });
    modal.querySelector(".check-actions").appendChild(nextBtn);
  };

  submit.onclick = () => {
    if (submit.dataset.next === "true") return;
    const step = steps[sequencePos];
    const outcome = step.validate();
    result.textContent = outcome.message;
    result.classList.toggle("good", outcome.type === "good");
    result.classList.toggle("bad", outcome.type === "bad");
    if (outcome.ok) {
      sessionCorrect[sequencePos] = true;
      showNextButton();
    }
  };

  modal.classList.add("show");
  renderStep(sequencePos);
}

function renderMayaMiniLessonHTML(civ, completed) {
  const ideaCards = (civ.miniLesson.keyIdeas || [])
    .map(
      (idea, idx) => `
        <div class="idea-card${completed ? "" : " hidden"}" data-idea-index="${idx}">
          <div class="idea-text">${completed ? escapeHtml(idea) : ""}</div>
        </div>
      `
    )
    .join("");

  const hookText = completed ? escapeHtml(civ.miniLesson.hook || "") : "";
  const scoreFill = completed ? "100%" : "0%";

  return `
    <div class="card mini-lesson-shell" data-step="0">
      <div class="card-header">
        <h3>Mini-Lesson</h3>
        <button class="secondary directions-btn" data-dir="mini">Direcciones</button>
      </div>
      <p class="directions-text-inline" data-en="Read the hook, then the key ideas. Answer the quick check in your own words." data-es="Lee el gancho, luego las ideas clave. Responde la verificación rápida con tus propias palabras.">
        Read the hook, then the key ideas. Answer the quick check in your own words.
      </p>
      <div class="hook-box" id="mayaHook">${hookText}</div>
      ${completed ? "" : `<button class="primary" id="mayaBegin">First, let’s set the scene</button>`}
      <div class="idea-cards" id="mayaIdeas">${ideaCards}</div>
      <div class="mini-game" id="mayaGame">
        <div class="score-bar"><div class="score-fill" style="width:${scoreFill}"></div></div>
        <div class="question-card" id="mayaQuestion"></div>
        <div class="answer-row" id="mayaAnswers"></div>
        <div class="knowledge-actions">
          <div class="knowledge-status" id="mayaGameStatus"></div>
          ${completed ? `<div class="knowledge-badge">✅ Complete</div>` : ""}
        </div>
      </div>
      ${completed ? `<div class="mini-complete-actions"><button class="primary" id="mayaContinue">Continue</button><button class="secondary" id="mayaReplay">Replay Mini-Lesson</button></div>` : ""}
      <label class="section-check">
        <input type="checkbox" data-section="mini" ${completed ? "checked" : ""} ${completed ? "disabled" : "disabled"} />
        <span>I completed the Mini-Lesson.</span>
      </label>
      ${completed ? `<button class="primary step-next" data-next="1">Next</button>` : ""}
    </div>
  `;
}

function initMayaMiniLesson(civ) {
  const hookEl = document.getElementById("mayaHook");
  const ideasEl = document.getElementById("mayaIdeas");
  const beginBtn = document.getElementById("mayaBegin");
  const questionEl = document.getElementById("mayaQuestion");
  const answersEl = document.getElementById("mayaAnswers");
  const scoreFill = document.querySelector(".score-fill");
  const statusEl = document.getElementById("mayaGameStatus");
  const continueBtn = document.getElementById("mayaContinue");

  if (!hookEl || !ideasEl || !questionEl || !answersEl) return;

  const completed = Boolean(state.civProgress.maya && state.civProgress.maya.miniLessonComplete);
  const replayMode = Boolean(state.miniLessonReplay.maya);
  if (completed) {
    if (continueBtn) {
      continueBtn.addEventListener("click", () => {
        state.civStep.maya = 1;
        renderCivDetail();
      });
    }
    const replayBtn = document.getElementById("mayaReplay");
    if (replayBtn) {
      replayBtn.addEventListener("click", () => {
        state.miniLessonReplay.maya = true;
        renderCivDetail();
      });
    }
    if (!replayMode) return;
  }

  state.miniLesson = {
    score: 0,
    gate: 45,
    streak: 0,
    currentQuestionId: null,
    q3CorrectTerm: null,
    locked: false,
    revealedCount: 0,
    started: false,
    phase: "idle",
  };

  const ideas = civ.miniLesson.keyIdeas || [];
  const ideaCards = Array.from(ideasEl.querySelectorAll(".idea-card"));

  const revealIdea = (index) => {
    const card = ideaCards[index];
    if (!card) return;
    card.classList.remove("hidden");
    const textEl = card.querySelector(".idea-text");
    if (textEl) {
      typewriterToBox(textEl, ideas[index], 28);
      card.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const startGame = () => {
    askQuestion();
  };

  const shuffleIdeas = () => {
    const cards = [...ideaCards];
    const shuffled = cards.sort(() => Math.random() - 0.5);
    shuffled.forEach((card) => ideasEl.appendChild(card));
  };

  const updateScore = () => {
    const pct = Math.min(100, (state.miniLesson.score / state.miniLesson.gate) * 100);
    if (scoreFill) scoreFill.style.width = `${pct}%`;
  };

  // Use a plain typewriter here to avoid vocab markup in question prompts.

  const questionBank = [
    {
      id: "q1",
      prompt: "The Maya lived in ________.",
      correct: "Mesoamerica",
      wrongs: ["The Andes Mountains", "Central Mexico"],
    },
    {
      id: "q2",
      prompt: "Mesoamerica is mostly…",
      correct: "warm, tropical regions",
      wrongs: ["frozen tundra", "dry desert only"],
    },
    {
      id: "q3",
      prompt: "Which clue tells you the Maya did *not* live in a cold climate?",
      correct: "warm, tropical regions",
      wrongs: ["snowy mountains", "polar nights"],
    },
    {
      id: "q4",
      prompt: "A city-state is…",
      correct: "a city that acts like its own country",
      wrongs: ["one big empire controlled by one king", "a farm built on water"],
    },
    {
      id: "q5",
      prompt: "The Maya built city-states with ________ and ________.",
      correct: "temples and pyramids",
      wrongs: ["roads and quipu", "chinampas and causeways"],
    },
    {
      id: "q6",
      prompt: "If the Maya lived in city-states, that means they had…",
      correct: "multiple powerful cities with their own leaders",
      wrongs: ["only one capital city ruling everyone", "no leaders at all"],
    },
    {
      id: "q7",
      prompt: "The Maya studied ________.",
      correct: "astronomy",
      wrongs: ["smallpox", "iron tools"],
    },
    {
      id: "q8",
      prompt: "Astronomy means studying the…",
      correct: "stars and sky",
      wrongs: ["oceans", "soil"],
    },
    {
      id: "q9",
      prompt: "The Maya used writing to ________.",
      correct: "record information",
      wrongs: ["grow food", "build terraces"],
    },
    {
      id: "q10",
      prompt: "Which combo matches the Maya best?",
      correct: "warm region + city-states + astronomy",
      wrongs: ["mountains + quipu + terrace farming", "lake capital + chinampas + tribute"],
    },
    {
      id: "q11",
      prompt: "Which sentence is MOST accurate?",
      correct: "The Maya lived in warm tropical regions and recorded information using writing.",
      wrongs: [
        "The Maya lived in the Andes and recorded information using knotted cords.",
        "The Maya lived on a lake and recorded information using tribute lists.",
      ],
    },
    {
      id: "q12",
      prompt: "What’s the best summary of all 3 big ideas?",
      correct: "The Maya lived in warm Mesoamerica, built city-states with temples/pyramids, and used astronomy + writing.",
      wrongs: [
        "The Maya lived in cold North America and built one giant empire.",
        "The Maya lived in the Andes and used quipu to track farming.",
      ],
    },
  ];

  const askQuestion = () => {
    if (state.miniLesson.locked) return;
    const question = questionBank[Math.floor(Math.random() * questionBank.length)];
    state.miniLesson.currentQuestionId = question.id;
    const options = [question.correct, ...question.wrongs].sort(() => Math.random() - 0.5);
    renderQuestion(question.prompt, options, question.correct);
  };

  const renderQuestion = (promptText, options, correct) => {
    questionEl.textContent = "";
    typewriterPlain(questionEl, promptText, 20);
    questionEl.scrollIntoView({ behavior: "smooth", block: "center" });
    answersEl.innerHTML = options
      .map((opt) => `<button class="answer-option" data-answer="${escapeHtml(opt)}">${opt}</button>`)
      .join("");
    answersEl.querySelectorAll(".answer-option").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (state.miniLesson.locked) return;
        const isCorrect = btn.dataset.answer === correct;
        if (isCorrect) {
          state.miniLesson.score += 3;
          state.miniLesson.streak += 1;
          btn.classList.add("correct");
          statusEl.textContent = "Nice work!";
          statusEl.classList.add("good");
        } else {
          state.miniLesson.score = Math.max(0, state.miniLesson.score - 1);
          state.miniLesson.streak = 0;
          btn.classList.add("wrong");
          statusEl.textContent = "Not yet — try again.";
          statusEl.classList.add("bad");
        }
        updateScore();
        shuffleIdeas();
        if (state.miniLesson.score >= state.miniLesson.gate) {
          state.miniLesson.locked = true;
          if (!state.civProgress.maya) state.civProgress.maya = {};
          state.civProgress.maya.miniLessonComplete = true;
          if (!state.teacherMode) {
            storage.save("earlyAmericasCivProgress", state.civProgress);
          }
          const continueBtn = document.createElement("button");
          continueBtn.className = "primary";
          continueBtn.textContent = "Continue";
          continueBtn.addEventListener("click", () => {
            state.civStep.maya = 1;
            renderCivDetail();
          });
          answersEl.innerHTML = "";
          answersEl.appendChild(continueBtn);
          statusEl.textContent = "✅ Complete";
        } else {
          setTimeout(askQuestion, 600);
        }
      });
    });
  };

  const revealNextIdea = () => {
    if (state.miniLesson.revealedCount >= ideas.length) return;
    revealIdea(state.miniLesson.revealedCount);
    state.miniLesson.revealedCount += 1;
    if (state.miniLesson.revealedCount >= ideas.length) {
      if (beginBtn) beginBtn.remove();
      const goBtn = document.createElement("button");
      goBtn.className = "primary mini-lesson-go";
      goBtn.id = "mayaStartGame";
      goBtn.textContent = "Got it? Let’s go!";
      goBtn.addEventListener("click", () => {
        goBtn.remove();
        startGame();
      });
      hookEl.parentElement?.appendChild(goBtn);
    }
  };

  const begin = () => {
    if (state.miniLesson.started && !["ready", "ideas"].includes(state.miniLesson.phase)) return;
    if (!state.miniLesson.started) {
      state.miniLesson.started = true;
      state.miniLesson.phase = "hook";
      if (beginBtn) {
        beginBtn.disabled = true;
        beginBtn.textContent = "Alright - click to learn the 3 big ideas";
        beginBtn.classList.add("mini-lesson-cta");
      }
      typewriterToBox(hookEl, civ.miniLesson.hook || "", 36, () => {
        state.miniLesson.phase = "ready";
        if (beginBtn) {
          beginBtn.disabled = false;
          beginBtn.textContent = "Okay, next big idea";
        }
      });
      return;
    }
    if (state.miniLesson.phase === "ready" || state.miniLesson.phase === "ideas") {
      state.miniLesson.phase = "ideas";
      if (beginBtn) beginBtn.textContent = "Okay, next big idea";
      revealNextIdea();
    }
  };

  if (beginBtn) {
    beginBtn.disabled = false;
    beginBtn.type = "button";
    beginBtn.classList.add("mini-lesson-cta");
    beginBtn.onclick = begin;
  }

  const shell = beginBtn ? beginBtn.closest(".mini-lesson-shell") : null;
  if (shell) {
    shell.addEventListener("click", (e) => {
      if (e.target && e.target.id === "mayaBegin") {
        begin();
      }
    });
  }
}

function renderIncaMiniLessonHTML(civ, completed) {
  const ideaCards = (civ.miniLesson.keyIdeas || [])
    .map(
      (idea, idx) => `
        <div class="idea-card${completed ? "" : " hidden"}" data-idea-index="${idx}">
          <div class="idea-text">${completed ? escapeHtml(idea) : ""}</div>
        </div>
      `
    )
    .join("");

  const hookText = completed ? escapeHtml(civ.miniLesson.hook || "") : "";
  const scoreFill = completed ? "100%" : "0%";

  return `
    <div class="card mini-lesson-shell" data-step="0">
      <div class="card-header">
        <h3>Mini-Lesson</h3>
        <button class="secondary directions-btn" data-dir="mini">Direcciones</button>
      </div>
      <p class="directions-text-inline" data-en="Read the hook, then the key ideas. Answer the quick check in your own words." data-es="Lee el gancho, luego las ideas clave. Responde la verificación rápida con tus propias palabras.">
        Read the hook, then the key ideas. Answer the quick check in your own words.
      </p>
      <div class="hook-box" id="incaHook">${hookText}</div>
      ${completed ? "" : `<button class="primary" id="incaBegin">First, let’s set the scene</button>`}
      <div class="idea-cards" id="incaIdeas">${ideaCards}</div>
      <div class="mini-game" id="incaGame">
        <div class="score-bar"><div class="score-fill" style="width:${scoreFill}"></div></div>
        <div class="question-card" id="incaQuestion"></div>
        <div class="answer-row" id="incaAnswers"></div>
        <div class="knowledge-actions">
          <div class="knowledge-status" id="incaGameStatus"></div>
          ${completed ? `<div class="knowledge-badge">✅ Complete</div>` : ""}
        </div>
      </div>
      ${completed ? `<div class="mini-complete-actions"><button class="primary" id="incaContinue">Continue</button><button class="secondary" id="incaReplay">Replay Mini-Lesson</button></div>` : ""}
      <label class="section-check">
        <input type="checkbox" data-section="mini" ${completed ? "checked" : ""} ${completed ? "disabled" : "disabled"} />
        <span>I completed the Mini-Lesson.</span>
      </label>
      ${completed ? `<button class="primary step-next" data-next="1">Next</button>` : ""}
    </div>
  `;
}

function initIncaMiniLesson(civ) {
  const hookEl = document.getElementById("incaHook");
  const ideasEl = document.getElementById("incaIdeas");
  const beginBtn = document.getElementById("incaBegin");
  const questionEl = document.getElementById("incaQuestion");
  const answersEl = document.getElementById("incaAnswers");
  const scoreFill = document.querySelector(".score-fill");
  const statusEl = document.getElementById("incaGameStatus");
  const continueBtn = document.getElementById("incaContinue");

  if (!hookEl || !ideasEl || !questionEl || !answersEl) return;

  const completed = Boolean(state.civProgress.inca && state.civProgress.inca.miniLessonComplete);
  const replayMode = Boolean(state.miniLessonReplay.inca);
  if (completed) {
    if (continueBtn) {
      continueBtn.addEventListener("click", () => {
        state.civStep.inca = 1;
        renderCivDetail();
      });
    }
    const replayBtn = document.getElementById("incaReplay");
    if (replayBtn) {
      replayBtn.addEventListener("click", () => {
        state.miniLessonReplay.inca = true;
        renderCivDetail();
      });
    }
    if (!replayMode) return;
  }

  state.miniLesson = {
    score: 0,
    gate: 45,
    streak: 0,
    currentQuestionId: null,
    q3CorrectTerm: null,
    locked: false,
    revealedCount: 0,
    started: false,
    phase: "idle",
  };

  const ideas = civ.miniLesson.keyIdeas || [];
  const ideaCards = Array.from(ideasEl.querySelectorAll(".idea-card"));

  const revealIdea = (index) => {
    const card = ideaCards[index];
    if (!card) return;
    card.classList.remove("hidden");
    const textEl = card.querySelector(".idea-text");
    if (textEl) {
      typewriterToBox(textEl, ideas[index], 28);
      card.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const shuffleIdeas = () => {
    const cards = [...ideaCards];
    const shuffled = cards.sort(() => Math.random() - 0.5);
    shuffled.forEach((card) => ideasEl.appendChild(card));
  };

  const updateScore = () => {
    const pct = Math.min(100, (state.miniLesson.score / state.miniLesson.gate) * 100);
    if (scoreFill) scoreFill.style.width = `${pct}%`;
  };

  const questionBank = [
    {
      id: "q1",
      prompt: "The Inca lived in the ________ Mountains.",
      correct: "Andes",
      wrongs: ["Rocky", "Appalachian"],
    },
    {
      id: "q2",
      prompt: "The Andes Mountains are in…",
      correct: "South America",
      wrongs: ["Central America", "North America"],
    },
    {
      id: "q3",
      prompt: "Which word best describes the Inca’s terrain?",
      correct: "mountainous",
      wrongs: ["flat grassland", "frozen tundra"],
    },
    {
      id: "q4",
      prompt: "Terrace farming is…",
      correct: "farming on flat steps carved into mountains",
      wrongs: [
        "farming on floating gardens in a lake",
        "farming only in deserts with irrigation canals",
      ],
    },
    {
      id: "q5",
      prompt: "The Inca built terraces mainly to…",
      correct: "farm in steep mountain areas",
      wrongs: ["travel faster across oceans", "build taller pyramids"],
    },
    {
      id: "q6",
      prompt: "A crop the Inca grew was…",
      correct: "quinoa",
      wrongs: ["rice", "wheat"],
    },
    {
      id: "q7",
      prompt: "Which set matches the Inca best?",
      correct: "mountains + terraces + quinoa",
      wrongs: ["jungle + city-states + astronomy", "lake capital + chinampas + tribute"],
    },
    {
      id: "q8",
      prompt: "The Inca used roads mainly to…",
      correct: "connect their empire and move people/messages",
      wrongs: ["float gardens across lakes", "predict solar eclipses"],
    },
    {
      id: "q9",
      prompt: "Inca runners were important because they…",
      correct: "carried messages across long distances",
      wrongs: ["taught writing in codices", "built pyramids for temples"],
    },
    {
      id: "q10",
      prompt: "A quipu is…",
      correct: "a knotted cord used to record information",
      wrongs: ["a floating garden made from mud and plants", "a stone temple pyramid"],
    },
    {
      id: "q11",
      prompt: "Which tool helped the Inca keep records without a writing system?",
      correct: "quipu",
      wrongs: ["codex", "alphabet"],
    },
    {
      id: "q12",
      prompt: "Which sentence is MOST accurate?",
      correct:
        "The Inca lived in the Andes in South America and used roads, runners, and quipu to manage their empire.",
      wrongs: [
        "The Inca lived in Mesoamerica and used writing in codices to manage their empire.",
        "The Inca lived on a lake and used chinampas to manage their empire.",
      ],
    },
    {
      id: "q13",
      prompt: "What’s the best summary of all 3 big ideas?",
      correct:
        "The Inca lived in the Andes (South America), farmed with terraces and quinoa, and used roads/runners/quipu to run their empire.",
      wrongs: [
        "The Inca lived in the jungle, built city-states, and studied astronomy.",
        "The Inca lived in central Mexico, built a lake capital, and collected tribute.",
      ],
    },
  ];

  const askQuestion = () => {
    if (state.miniLesson.locked) return;
    const question = questionBank[Math.floor(Math.random() * questionBank.length)];
    state.miniLesson.currentQuestionId = question.id;
    const options = [question.correct, ...question.wrongs].sort(() => Math.random() - 0.5);
    renderQuestion(question.prompt, options, question.correct);
  };

  const renderQuestion = (promptText, options, correct) => {
    questionEl.textContent = "";
    typewriterPlain(questionEl, promptText, 20);
    questionEl.scrollIntoView({ behavior: "smooth", block: "center" });
    answersEl.innerHTML = options
      .map((opt) => `<button class="answer-option" data-answer="${escapeHtml(opt)}">${opt}</button>`)
      .join("");
    answersEl.querySelectorAll(".answer-option").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (state.miniLesson.locked) return;
        const isCorrect = btn.dataset.answer === correct;
        if (isCorrect) {
          state.miniLesson.score += 3;
          btn.classList.add("correct");
          statusEl.textContent = "Nice work!";
          statusEl.classList.add("good");
        } else {
          state.miniLesson.score = Math.max(0, state.miniLesson.score - 1);
          btn.classList.add("wrong");
          statusEl.textContent = "Not yet — try again.";
          statusEl.classList.add("bad");
        }
        updateScore();
        shuffleIdeas();
        if (state.miniLesson.score >= state.miniLesson.gate) {
          state.miniLesson.locked = true;
          if (!state.civProgress.inca) state.civProgress.inca = {};
          state.civProgress.inca.miniLessonComplete = true;
          if (!state.teacherMode && state.savingEnabled) {
            storage.save("earlyAmericasCivProgress", state.civProgress);
          }
          const continueBtn = document.createElement("button");
          continueBtn.className = "primary";
          continueBtn.textContent = "Continue";
          continueBtn.addEventListener("click", () => {
            state.civStep.inca = 1;
            renderCivDetail();
          });
          answersEl.innerHTML = "";
          answersEl.appendChild(continueBtn);
          statusEl.textContent = "✅ Complete";
        } else {
          setTimeout(askQuestion, 600);
        }
      });
    });
  };

  const revealNextIdea = () => {
    if (state.miniLesson.revealedCount >= ideas.length) return;
    revealIdea(state.miniLesson.revealedCount);
    state.miniLesson.revealedCount += 1;
    if (state.miniLesson.revealedCount >= ideas.length) {
      if (beginBtn) beginBtn.remove();
      const goBtn = document.createElement("button");
      goBtn.className = "primary mini-lesson-go";
      goBtn.id = "incaStartGame";
      goBtn.textContent = "Got it? Let’s go!";
      goBtn.addEventListener("click", () => {
        goBtn.remove();
        askQuestion();
      });
      hookEl.parentElement?.appendChild(goBtn);
    }
  };

  const begin = () => {
    if (state.miniLesson.started && !["ready", "ideas"].includes(state.miniLesson.phase)) return;
    if (!state.miniLesson.started) {
      state.miniLesson.started = true;
      state.miniLesson.phase = "hook";
      if (beginBtn) {
        beginBtn.disabled = true;
        beginBtn.textContent = "Alright - click to learn the 3 big ideas";
        beginBtn.classList.add("mini-lesson-cta");
      }
      typewriterToBox(hookEl, civ.miniLesson.hook || "", 36, () => {
        state.miniLesson.phase = "ready";
        if (beginBtn) {
          beginBtn.disabled = false;
          beginBtn.textContent = "Okay, next big idea";
        }
      });
      return;
    }
    if (state.miniLesson.phase === "ready" || state.miniLesson.phase === "ideas") {
      state.miniLesson.phase = "ideas";
      if (beginBtn) beginBtn.textContent = "Okay, next big idea";
      revealNextIdea();
    }
  };

  if (beginBtn) {
    beginBtn.addEventListener("click", begin);
    beginBtn.classList.add("mini-lesson-cta");
  }
}

function renderAztecMiniLessonHTML(civ, completed) {
  const ideaCards = (civ.miniLesson.keyIdeas || [])
    .map(
      (idea, idx) => `
        <div class="idea-card${completed ? "" : " hidden"}" data-idea-index="${idx}">
          <div class="idea-text">${completed ? escapeHtml(idea) : ""}</div>
        </div>
      `
    )
    .join("");

  const hookText = completed ? escapeHtml(civ.miniLesson.hook || "") : "";
  const scoreFill = completed ? "100%" : "0%";

  return `
    <div class="card mini-lesson-shell" data-step="0">
      <div class="card-header">
        <h3>Mini-Lesson</h3>
        <button class="secondary directions-btn" data-dir="mini">Direcciones</button>
      </div>
      <p class="directions-text-inline" data-en="Read the hook, then the key ideas. Answer the quick check in your own words." data-es="Lee el gancho, luego las ideas clave. Responde la verificación rápida con tus propias palabras.">
        Read the hook, then the key ideas. Answer the quick check in your own words.
      </p>
      <div class="hook-box" id="aztecHook">${hookText}</div>
      ${completed ? "" : `<button class="primary" id="aztecBegin">First, let’s set the scene</button>`}
      <div class="idea-cards" id="aztecIdeas">${ideaCards}</div>
      <div class="mini-game" id="aztecGame">
        <div class="score-bar"><div class="score-fill" style="width:${scoreFill}"></div></div>
        <div class="question-card" id="aztecQuestion"></div>
        <div class="answer-row" id="aztecAnswers"></div>
        <div class="knowledge-actions">
          <div class="knowledge-status" id="aztecGameStatus"></div>
          ${completed ? `<div class="knowledge-badge">✅ Complete</div>` : ""}
        </div>
      </div>
      ${completed ? `<div class="mini-complete-actions"><button class="primary" id="aztecContinue">Continue</button><button class="secondary" id="aztecReplay">Replay Mini-Lesson</button></div>` : ""}
      <label class="section-check">
        <input type="checkbox" data-section="mini" ${completed ? "checked" : ""} ${completed ? "disabled" : "disabled"} />
        <span>I completed the Mini-Lesson.</span>
      </label>
      ${completed ? `<button class="primary step-next" data-next="1">Next</button>` : ""}
    </div>
  `;
}

function initAztecMiniLesson(civ) {
  const hookEl = document.getElementById("aztecHook");
  const ideasEl = document.getElementById("aztecIdeas");
  const beginBtn = document.getElementById("aztecBegin");
  const questionEl = document.getElementById("aztecQuestion");
  const answersEl = document.getElementById("aztecAnswers");
  const scoreFill = document.querySelector(".score-fill");
  const statusEl = document.getElementById("aztecGameStatus");
  const continueBtn = document.getElementById("aztecContinue");

  if (!hookEl || !ideasEl || !questionEl || !answersEl) return;

  const completed = Boolean(state.civProgress.aztec && state.civProgress.aztec.miniLessonComplete);
  const replayMode = Boolean(state.miniLessonReplay.aztec);
  if (completed) {
    if (continueBtn) {
      continueBtn.addEventListener("click", () => {
        state.civStep.aztec = 1;
        renderCivDetail();
      });
    }
    const replayBtn = document.getElementById("aztecReplay");
    if (replayBtn) {
      replayBtn.addEventListener("click", () => {
        state.miniLessonReplay.aztec = true;
        renderCivDetail();
      });
    }
    if (!replayMode) return;
  }

  state.miniLesson = {
    score: 0,
    gate: 45,
    streak: 0,
    currentQuestionId: null,
    q3CorrectTerm: null,
    locked: false,
    revealedCount: 0,
    started: false,
    phase: "idle",
  };

  const ideas = civ.miniLesson.keyIdeas || [];
  const ideaCards = Array.from(ideasEl.querySelectorAll(".idea-card"));

  const revealIdea = (index) => {
    const card = ideaCards[index];
    if (!card) return;
    card.classList.remove("hidden");
    const textEl = card.querySelector(".idea-text");
    if (textEl) {
      typewriterToBox(textEl, ideas[index], 28);
      card.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const shuffleIdeas = () => {
    const cards = [...ideaCards];
    const shuffled = cards.sort(() => Math.random() - 0.5);
    shuffled.forEach((card) => ideasEl.appendChild(card));
  };

  const updateScore = () => {
    const pct = Math.min(100, (state.miniLesson.score / state.miniLesson.gate) * 100);
    if (scoreFill) scoreFill.style.width = `${pct}%`;
  };

  const questionBank = [
    {
      id: "q1",
      prompt: "The Aztec lived in…",
      correct: "Mesoamerica",
      wrongs: ["South America", "Europe"],
    },
    {
      id: "q2",
      prompt: "The Aztec capital was called…",
      correct: "Tenochtitlan",
      wrongs: ["Cuzco", "Tikal"],
    },
    {
      id: "q3",
      prompt: "Tenochtitlan was built on a…",
      correct: "lake",
      wrongs: ["mountain", "desert"],
    },
    {
      id: "q4",
      prompt: "Which combo matches the Aztec best?",
      correct: "Mesoamerica + lake capital + tribute",
      wrongs: ["Andes + terraces + quinoa", "jungle + city-states + astronomy"],
    },
    {
      id: "q5",
      prompt: "Chinampas were used to…",
      correct: "grow food",
      wrongs: ["record numbers", "build pyramids"],
    },
    {
      id: "q6",
      prompt: "A chinampa is…",
      correct: "a floating garden made from mud and plants",
      wrongs: ["a knotted cord system for record-keeping", "a stone pyramid used as a temple"],
    },
    {
      id: "q7",
      prompt: "Why were chinampas helpful?",
      correct: "They created more farming space on the water",
      wrongs: ["They created roads through the mountains", "They created written books called codices"],
    },
    {
      id: "q8",
      prompt: "The Aztec built an empire, which means they…",
      correct: "controlled many groups and lands",
      wrongs: ["only lived in one small village", "never fought wars"],
    },
    {
      id: "q9",
      prompt: "Tribute means…",
      correct: "payments in goods or work",
      wrongs: ["a calendar made from stars", "a type of mountain farming"],
    },
    {
      id: "q10",
      prompt: "Who paid tribute to the Aztec?",
      correct: "conquered groups",
      wrongs: ["only Aztec rulers", "people from Europe"],
    },
    {
      id: "q11",
      prompt: "Which is an example of tribute?",
      correct: "corn, cloth, or labor sent to the rulers",
      wrongs: ["knots tied on cords to record numbers", "terraces carved into a mountain"],
    },
    {
      id: "q12",
      prompt: "Which sentence is MOST accurate?",
      correct: "The Aztec lived in Mesoamerica and built Tenochtitlan on a lake.",
      wrongs: [
        "The Aztec lived in the Andes Mountains in South America.",
        "The Aztec lived in jungle city-states and studied astronomy.",
      ],
    },
    {
      id: "q13",
      prompt: "What’s the best summary of all 3 big ideas?",
      correct:
        "The Aztec lived in Mesoamerica, built Tenochtitlan on a lake, used chinampas to grow food, and collected tribute as an empire.",
      wrongs: [
        "The Aztec lived in the Andes, used terraces for quinoa, and kept records with quipu.",
        "The Aztec lived in jungle city-states, used writing in codices, and studied astronomy.",
      ],
    },
  ];

  const askQuestion = () => {
    if (state.miniLesson.locked) return;
    const question = questionBank[Math.floor(Math.random() * questionBank.length)];
    state.miniLesson.currentQuestionId = question.id;
    const options = [question.correct, ...question.wrongs].sort(() => Math.random() - 0.5);
    renderQuestion(question.prompt, options, question.correct);
  };

  const renderQuestion = (promptText, options, correct) => {
    questionEl.textContent = "";
    typewriterPlain(questionEl, promptText, 20);
    questionEl.scrollIntoView({ behavior: "smooth", block: "center" });
    answersEl.innerHTML = options
      .map((opt) => `<button class="answer-option" data-answer="${escapeHtml(opt)}">${opt}</button>`)
      .join("");
    answersEl.querySelectorAll(".answer-option").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (state.miniLesson.locked) return;
        const isCorrect = btn.dataset.answer === correct;
        if (isCorrect) {
          state.miniLesson.score += 3;
          btn.classList.add("correct");
          statusEl.textContent = "Nice work!";
          statusEl.classList.add("good");
        } else {
          state.miniLesson.score = Math.max(0, state.miniLesson.score - 1);
          btn.classList.add("wrong");
          statusEl.textContent = "Not yet — try again.";
          statusEl.classList.add("bad");
        }
        updateScore();
        shuffleIdeas();
        if (state.miniLesson.score >= state.miniLesson.gate) {
          state.miniLesson.locked = true;
          if (!state.civProgress.aztec) state.civProgress.aztec = {};
          state.civProgress.aztec.miniLessonComplete = true;
          if (!state.teacherMode && state.savingEnabled) {
            storage.save("earlyAmericasCivProgress", state.civProgress);
          }
          const continueBtn = document.createElement("button");
          continueBtn.className = "primary";
          continueBtn.textContent = "Continue";
          continueBtn.addEventListener("click", () => {
            state.civStep.aztec = 1;
            renderCivDetail();
          });
          answersEl.innerHTML = "";
          answersEl.appendChild(continueBtn);
          statusEl.textContent = "✅ Complete";
        } else {
          setTimeout(askQuestion, 600);
        }
      });
    });
  };

  const revealNextIdea = () => {
    if (state.miniLesson.revealedCount >= ideas.length) return;
    revealIdea(state.miniLesson.revealedCount);
    state.miniLesson.revealedCount += 1;
    if (state.miniLesson.revealedCount >= ideas.length) {
      if (beginBtn) beginBtn.remove();
      const goBtn = document.createElement("button");
      goBtn.className = "primary mini-lesson-go";
      goBtn.id = "aztecStartGame";
      goBtn.textContent = "Got it? Let’s go!";
      goBtn.addEventListener("click", () => {
        goBtn.remove();
        askQuestion();
      });
      hookEl.parentElement?.appendChild(goBtn);
    }
  };

  const begin = () => {
    if (state.miniLesson.started && !["ready", "ideas"].includes(state.miniLesson.phase)) return;
    if (!state.miniLesson.started) {
      state.miniLesson.started = true;
      state.miniLesson.phase = "hook";
      if (beginBtn) {
        beginBtn.disabled = true;
        beginBtn.textContent = "Alright - click to learn the 3 big ideas";
        beginBtn.classList.add("mini-lesson-cta");
      }
      typewriterToBox(hookEl, civ.miniLesson.hook || "", 36, () => {
        state.miniLesson.phase = "ready";
        if (beginBtn) {
          beginBtn.disabled = false;
          beginBtn.textContent = "Okay, next big idea";
        }
      });
      return;
    }
    if (state.miniLesson.phase === "ready" || state.miniLesson.phase === "ideas") {
      state.miniLesson.phase = "ideas";
      if (beginBtn) beginBtn.textContent = "Okay, next big idea";
      revealNextIdea();
    }
  };

  if (beginBtn) {
    beginBtn.addEventListener("click", begin);
    beginBtn.classList.add("mini-lesson-cta");
  }
}

function buildImageTeachText(civ, item) {
  const label = `${item.label || item.alt || civ.name}`.toLowerCase();
  let question = "What do you notice first, and what does it make you wonder?";

  if (/(map|region|location)/.test(label)) {
    question = "What does this map tell you about where people lived and why?";
  } else if (/(temple|pyramid|structure|arch|templo)/.test(label)) {
    question = "Why would people build this, and what might it be used for?";
  } else if (/(codex|hieroglyph|writing|lintel)/.test(label)) {
    question = "What information do you think was recorded here, and why?";
  } else if (/(mask)/.test(label)) {
    question = "What might this show about power, beliefs, or important people?";
  } else if (/(ballcourt|ball)/.test(label)) {
    question = "How might this space be used for community, religion, or sport?";
  } else if (/(farming|agriculture|garden|chinampa)/.test(label)) {
    question = "How does this show the way people got food?";
  }

  return {
    caption: item.label || item.alt || `${civ.name} image`,
    question,
  };
}

function renderTeachBoxHTML(caption, question) {
  return `
    <div class="civ-teach">
      <div id="civTeachCaption" class="civ-teach-caption">${caption || ""}</div>
      <div id="civTeachQ" class="civ-teach-q">${question || ""}</div>
    </div>
  `;
}

function ensureMiniFlashcard() {
  let modal = document.getElementById("miniFlashcard");
  if (modal) return modal;

  modal = document.createElement("div");
  modal.id = "miniFlashcard";
  modal.className = "mini-flashcard-overlay";
  modal.innerHTML = `
    <div class="mini-flashcard-panel">
      <div class="mini-flashcard-header">
        <div id="miniFlashcardTerm" class="mini-flashcard-term"></div>
        <button class="secondary" id="miniFlashcardClose">Close</button>
      </div>
      <div id="miniFlashcardBody" class="mini-flashcard-body"></div>
    </div>
  `;
  document.body.appendChild(modal);

  modal.querySelector("#miniFlashcardClose").addEventListener("click", () => {
    modal.classList.remove("show");
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("show");
    }
  });

  return modal;
}

function showMiniFlashcard(term) {
  if (!term) return;
  const item = VOCAB.find(
    (v) => (v.term || "").toLowerCase() === term.toLowerCase()
  );
  if (!item) return;

  const modal = ensureMiniFlashcard();
  const termEl = modal.querySelector("#miniFlashcardTerm");
  const bodyEl = modal.querySelector("#miniFlashcardBody");

  termEl.textContent = item.term || "";
  const parts = [];
  if (item.definition) parts.push(`<div><strong>Definition:</strong> ${item.definition}</div>`);
  if (item.clue) parts.push(`<div><strong>Clue:</strong> ${item.clue}</div>`);
  if (item.example) parts.push(`<div><strong>Example:</strong> ${item.example}</div>`);
  if (item.spanish) parts.push(`<div><strong>Spanish:</strong> ${item.spanish}</div>`);
  bodyEl.innerHTML = parts.join("");

  modal.classList.add("show");
}

function getCivCheckState(civKey, checkId) {
  if (!state.civChecks[civKey]) return false;
  return Boolean(state.civChecks[civKey][checkId]);
}

function setCivCheckState(civKey, checkId, value) {
  if (!state.civChecks[civKey]) state.civChecks[civKey] = {};
  state.civChecks[civKey][checkId] = value;
  storage.save("earlyAmericasCivChecks", state.civChecks);
}

function renderKnowledgeCheck(civKey, civ, checkObj) {
  if (!checkObj) return "";
  const completed = getCivCheckState(civKey, checkObj.id);
  const template = Array.isArray(checkObj.template) ? checkObj.template : [];

  const sentenceHtml = buildKnowledgeSentence(checkObj, false);

  return `
    <div class="card knowledge-check" data-check-id="${checkObj.id}">
      <div class="card-header">
        <h3>${escapeHtml(checkObj.title || "Test Your Knowledge!")}</h3>
        ${completed ? `<div class="knowledge-badge">✅ Completed</div>` : ""}
      </div>
      <div>${escapeHtml(checkObj.directions || "")}</div>
      <div class="knowledge-sentence">${sentenceHtml}</div>
      <div class="knowledge-actions">
        <button class="primary knowledge-check-btn">Check</button>
        <div class="knowledge-status ${completed ? "good" : ""}" data-check-status>
          ${completed ? escapeHtml(checkObj.successMessage || "Nice work! You got it.") : ""}
        </div>
      </div>
    </div>
  `;
}

function wireKnowledgeCheckEvents(civKey, civ, checkObj) {
  if (!checkObj) return;
  const card = els.civDetail.querySelector(`.knowledge-check[data-check-id="${checkObj.id}"]`);
  if (!card) return;
  const status = card.querySelector("[data-check-status]");
  const button = card.querySelector(".knowledge-check-btn");
  const selects = Array.from(card.querySelectorAll("select[data-blank]"));

  button.addEventListener("click", () => {
    let allFilled = true;
    let allCorrect = true;

    selects.forEach((select) => {
      if (!select.value) allFilled = false;
      const blankId = select.dataset.blank;
      const blank = checkObj.blanks && checkObj.blanks[blankId];
      if (!blank || select.value !== blank.answer) allCorrect = false;
    });

    if (!allFilled) {
      status.textContent = "Pick an answer for each blank.";
      status.classList.remove("good");
      status.classList.add("bad");
      return;
    }

    if (allCorrect) {
      status.textContent = checkObj.successMessage || "Nice work! You got it.";
      status.classList.remove("bad");
      status.classList.add("good");
      setCivCheckState(civKey, checkObj.id, true);
      renderCivDetail();
    } else {
      status.textContent = checkObj.retryMessage || "Almost — double check your choices and try again.";
      status.classList.remove("good");
      status.classList.add("bad");
    }
  });
}

function buildKnowledgeSentence(checkObj, forOverlay) {
  const template = Array.isArray(checkObj.template) ? checkObj.template : [];
  return template
    .map((part) => {
      if (typeof part === "string") return `<span>${escapeHtml(part)}</span>`;
      if (!part || !part.blankId) return "";
      const blank = checkObj.blanks && checkObj.blanks[part.blankId];
      const options = (blank && blank.options) || [];
      return `
        <select class="knowledge-select" data-blank="${part.blankId}">
          <option value="">Select</option>
          ${options.map((opt) => `<option value="${escapeHtml(opt)}">${escapeHtml(opt)}</option>`).join("")}
        </select>
      `;
    })
    .join("");
}

function ensureCheckOverlay() {
  let modal = document.getElementById("checkOverlay");
  if (modal) return modal;

  modal = document.createElement("div");
  modal.id = "checkOverlay";
  modal.className = "check-overlay";
  modal.innerHTML = `
    <div class="check-panel">
      <div class="check-header">
        <h3 id="checkTitle">Test Your Knowledge</h3>
        <button class="secondary" id="checkClose">Close</button>
      </div>
      <p id="checkPrompt"></p>
      <div id="checkSentence" class="check-sentence"></div>
      <div class="check-actions">
        <button class="primary" id="checkSubmit">Check</button>
        <div id="checkResult" class="check-result"></div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  modal.querySelector("#checkClose").addEventListener("click", () => {
    modal.classList.remove("show");
  });

  return modal;
}

function openKnowledgeOverlay(civKey, civ, checkObj) {
  if (!checkObj) return;
  const modal = ensureCheckOverlay();
  const title = modal.querySelector("#checkTitle");
  const prompt = modal.querySelector("#checkPrompt");
  const sentenceEl = modal.querySelector("#checkSentence");
  const result = modal.querySelector("#checkResult");
  const submit = modal.querySelector("#checkSubmit");

  title.textContent = checkObj.title || "Test Your Knowledge";
  prompt.textContent = checkObj.directions || "";
  result.textContent = "";

  sentenceEl.innerHTML = buildKnowledgeSentence(checkObj, true);

  submit.onclick = () => {
    const selects = sentenceEl.querySelectorAll("select[data-blank]");
    let allFilled = true;
    let allCorrect = true;
    selects.forEach((sel) => {
      if (!sel.value) allFilled = false;
      const blankId = sel.dataset.blank;
      const blank = checkObj.blanks && checkObj.blanks[blankId];
      if (!blank || sel.value !== blank.answer) allCorrect = false;
    });

    if (!allFilled) {
      result.textContent = "Pick an answer for each blank.";
      result.classList.remove("good");
      result.classList.add("bad");
      return;
    }

    if (allCorrect) {
      result.textContent = checkObj.successMessage || "Nice work! You got it.";
      result.classList.remove("bad");
      result.classList.add("good");
      setCivCheckState(civKey, checkObj.id, true);
      renderCivDetail();
    } else {
      result.textContent = checkObj.retryMessage || "Almost — double check your choices and try again.";
      result.classList.remove("good");
      result.classList.add("bad");
    }
  };

  modal.classList.add("show");
}

function examShuffle(list) {
  return [...list].sort(() => Math.random() - 0.5);
}

function buildExamBank() {
  const civKeys = ["maya", "aztec", "inca"];
  const targets = [];
  const quick = [];
  civKeys.forEach((key) => {
    const civ = CIVS[key];
    (civ.testTargets || []).forEach((line) => targets.push({ civ: civ.name, text: line }));
    (civ.testQuickCheck || []).forEach((item) =>
      quick.push({ civ: civ.name, prompt: item.prompt, answer: item.answer })
    );
  });

  return {
    civButtons: civKeys.map((key) => ({ key, label: CIVS[key].name })),
    targets,
    quick,
    agriculture: [
      { civ: "Aztec", method: "chinampa" },
      { civ: "Maya", method: "slash-and-burn" },
      { civ: "Inca", method: "terrace farming" },
    ],
    sunStatements: [
      { text: "The king was seen as a descendant of the sun god.", value: true },
      { text: "Only Maya kings were considered all-powerful.", value: false },
      { text: "Aztec, Inca, and Maya kings had divine authority.", value: true },
      { text: "Kings were seen as descendants of the moon god.", value: false },
    ],
  };
}

function setExamMode(mode) {
  state.examStudy.mode = mode;
  state.examStudy.score = 0;
  state.examStudy.attempts = 0;
  state.examStudy.current = null;
  renderExamStudy();
}

function nextExamPrompt() {
  const bank = buildExamBank();
  const mode = state.examStudy.mode;

  if (mode === "flash") {
    state.examStudy.current = bank.targets[Math.floor(Math.random() * bank.targets.length)];
  } else if (mode === "civ-match") {
    const item = bank.targets[Math.floor(Math.random() * bank.targets.length)];
    state.examStudy.current = {
      prompt: item.text,
      civ: item.civ,
      choices: examShuffle(bank.civButtons.map((btn) => btn.label)),
    };
  } else if (mode === "sun-check") {
    state.examStudy.current =
      bank.sunStatements[Math.floor(Math.random() * bank.sunStatements.length)];
  } else if (mode === "mixed-quiz") {
    const item = bank.quick[Math.floor(Math.random() * bank.quick.length)];
    const wrongPool = bank.quick
      .map((q) => q.answer)
      .filter((answer) => answer !== item.answer);
    const wrongs = examShuffle(wrongPool).slice(0, 2);
    state.examStudy.current = {
      civ: item.civ,
      prompt: item.prompt,
      answer: item.answer,
      choices: examShuffle([item.answer, ...wrongs]),
    };
  }
}

function renderExamStudy() {
  if (!els.examModeHost) return;
  const bank = buildExamBank();
  const mode = state.examStudy.mode;
  if (!state.examStudy.current) {
    nextExamPrompt();
  }

  els.examModePills.forEach((pill) => {
    pill.classList.toggle("active", pill.dataset.examMode === mode);
  });

  if (mode === "flash") {
    const item = state.examStudy.current;
    els.examModeHost.innerHTML = `
      <h3>Focus Flash</h3>
      <p class="exam-sub">Read one target, then reveal the civilization.</p>
      <div class="exam-question">${escapeHtml(item.text || "")}</div>
      <div class="exam-actions">
        <button class="secondary" id="examReveal">Reveal Civ</button>
        <button class="primary" id="examNext">Next Card</button>
      </div>
      <div class="exam-feedback" id="examFeedback"></div>
    `;
    const feedback = els.examModeHost.querySelector("#examFeedback");
    els.examModeHost.querySelector("#examReveal").addEventListener("click", () => {
      feedback.textContent = `Civilization: ${item.civ}`;
    });
    els.examModeHost.querySelector("#examNext").addEventListener("click", () => {
      nextExamPrompt();
      renderExamStudy();
    });
    return;
  }

  if (mode === "civ-match") {
    const item = state.examStudy.current;
    els.examModeHost.innerHTML = `
      <h3>Civilization Match</h3>
      <p class="exam-sub">Choose which civilization matches the statement.</p>
      <div class="exam-question">${escapeHtml(item.prompt || "")}</div>
      <div class="exam-choice-row">
        ${item.choices
          .map((label) => `<button class="secondary exam-choice-btn" data-choice="${escapeHtml(label)}">${escapeHtml(label)}</button>`)
          .join("")}
      </div>
      <div class="exam-feedback" id="examFeedback"></div>
      <button class="primary" id="examNext">Next</button>
    `;
    const feedback = els.examModeHost.querySelector("#examFeedback");
    els.examModeHost.querySelectorAll(".exam-choice-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const isCorrect = btn.dataset.choice === item.civ;
        state.examStudy.attempts += 1;
        if (isCorrect) state.examStudy.score += 1;
        feedback.textContent = isCorrect ? "Correct." : `Not quite. Answer: ${item.civ}`;
      });
    });
    els.examModeHost.querySelector("#examNext").addEventListener("click", () => {
      nextExamPrompt();
      renderExamStudy();
    });
    return;
  }

  if (mode === "agri-match") {
    const methods = examShuffle(bank.agriculture.map((item) => item.method));
    els.examModeHost.innerHTML = `
      <h3>Agriculture Match</h3>
      <p class="exam-sub">Match each civilization with its agriculture strategy.</p>
      <div class="agri-grid">
        ${bank.agriculture
          .map(
            (item, idx) => `
              <label class="agri-row">
                <span>${escapeHtml(item.civ)}</span>
                <select data-agri-civ="${escapeHtml(item.civ)}">
                  <option value="">Choose...</option>
                  ${methods.map((method) => `<option value="${escapeHtml(method)}">${escapeHtml(method)}</option>`).join("")}
                </select>
              </label>
            `
          )
          .join("")}
      </div>
      <div class="exam-actions">
        <button class="primary" id="examCheckAgri">Check</button>
      </div>
      <div class="exam-feedback" id="examFeedback"></div>
    `;
    els.examModeHost.querySelector("#examCheckAgri").addEventListener("click", () => {
      const selected = Array.from(els.examModeHost.querySelectorAll("select[data-agri-civ]"));
      let correct = 0;
      selected.forEach((sel) => {
        const row = bank.agriculture.find((a) => a.civ === sel.dataset.agriCiv);
        if (row && row.method === sel.value) correct += 1;
      });
      els.examModeHost.querySelector("#examFeedback").textContent = `You got ${correct}/3 correct.`;
    });
    return;
  }

  if (mode === "sun-check") {
    const item = state.examStudy.current;
    els.examModeHost.innerHTML = `
      <h3>Sun Check</h3>
      <p class="exam-sub">Decide whether the statement is true or false.</p>
      <div class="exam-question">${escapeHtml(item.text || "")}</div>
      <div class="exam-choice-row">
        <button class="secondary exam-tf-btn" data-value="true">True</button>
        <button class="secondary exam-tf-btn" data-value="false">False</button>
      </div>
      <div class="exam-feedback" id="examFeedback"></div>
      <button class="primary" id="examNext">Next</button>
    `;
    const feedback = els.examModeHost.querySelector("#examFeedback");
    els.examModeHost.querySelectorAll(".exam-tf-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const pick = btn.dataset.value === "true";
        const isCorrect = pick === item.value;
        feedback.textContent = isCorrect ? "Correct." : `Not quite. This one is ${item.value ? "True" : "False"}.`;
      });
    });
    els.examModeHost.querySelector("#examNext").addEventListener("click", () => {
      nextExamPrompt();
      renderExamStudy();
    });
    return;
  }

  if (mode === "mixed-quiz") {
    const item = state.examStudy.current;
    els.examModeHost.innerHTML = `
      <h3>Mixed Quiz</h3>
      <p class="exam-sub">One exam-style question at a time.</p>
      <div class="exam-question"><strong>${escapeHtml(item.civ)}</strong>: ${escapeHtml(item.prompt)}</div>
      <div class="exam-choice-col">
        ${item.choices
          .map(
            (choice) => `<button class="secondary exam-mix-btn" data-choice="${escapeHtml(choice)}">${escapeHtml(choice)}</button>`
          )
          .join("")}
      </div>
      <div class="exam-feedback" id="examFeedback"></div>
      <div class="exam-score">Score: ${state.examStudy.score}/${state.examStudy.attempts}</div>
      <button class="primary" id="examNext">Next</button>
    `;
    const feedback = els.examModeHost.querySelector("#examFeedback");
    els.examModeHost.querySelectorAll(".exam-mix-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const isCorrect = btn.dataset.choice === item.answer;
        state.examStudy.attempts += 1;
        if (isCorrect) state.examStudy.score += 1;
        feedback.textContent = isCorrect ? "Correct." : `Answer: ${item.answer}`;
        const scoreEl = els.examModeHost.querySelector(".exam-score");
        if (scoreEl) scoreEl.textContent = `Score: ${state.examStudy.score}/${state.examStudy.attempts}`;
      });
    });
    els.examModeHost.querySelector("#examNext").addEventListener("click", () => {
      nextExamPrompt();
      renderExamStudy();
    });
  }
}

function initExamStudy() {
  if (!els.examModeHost) return;
  els.examModePills.forEach((pill) => {
    pill.addEventListener("click", () => {
      setExamMode(pill.dataset.examMode);
    });
  });
  renderExamStudy();
}

function init() {
  loadProgress();
  initTabs();
  initMap();
  initCivs();
  initVocab();
  initGallery();
  initExamStudy();
  updateProgressCards();
}

function loadProgress() {
  state.vocabProgress = storage.load("earlyAmericasVocabProgress", state.vocabProgress);
  state.civProgress = storage.load("earlyAmericasCivProgress", state.civProgress);
  state.civChecks = storage.load("earlyAmericasCivChecks", state.civChecks);
}

function initTabs() {
  els.tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      showPage(tab.dataset.target);
    });
  });
  if (els.startMap) {
    els.startMap.addEventListener("click", () => showPage("map"));
  }
}

function showPage(pageId, options = {}) {
  state.currentPage = pageId;
  const current = document.querySelector(".page.active");
  const next = Array.from(els.pages).find((p) => p.id === pageId);

  if (current && current !== next) {
    current.classList.add("fade-out");
    setTimeout(() => {
      current.classList.remove("active", "fade-out");
      if (next) {
        next.classList.add("active");
        requestAnimationFrame(() => {
          next.classList.add("fade-in");
        });
        setTimeout(() => next.classList.remove("fade-in"), 320);
      }
    }, 220);
  } else if (next) {
    next.classList.add("active");
    requestAnimationFrame(() => {
      next.classList.add("fade-in");
    });
    setTimeout(() => next.classList.remove("fade-in"), 320);
  }
  els.tabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.target === pageId);
  });
}

function initMap() {
  els.mapToggle.addEventListener("change", () => {
    state.mapView = els.mapToggle.checked ? "civ" : "geo";
    updateMapView();
  });

  els.mapOverlay.addEventListener("click", (event) => {
    const target = event.target.closest("polygon");
    if (!target) return;
    const civ = target.dataset.civ;
    selectCiv(civ);
    state.civIntroOnly = true;
    showPage("civilizations");
  });

  let startX = 0;
  els.mapShell.addEventListener("touchstart", (event) => {
    startX = event.touches[0].clientX;
  });
  els.mapShell.addEventListener("touchend", (event) => {
    const endX = event.changedTouches[0].clientX;
    const delta = endX - startX;
    if (Math.abs(delta) > 50) {
      state.mapView = delta < 0 ? "civ" : "geo";
      els.mapToggle.checked = state.mapView === "civ";
      updateMapView();
    }
  });

  updateMapView();
}

function updateMapView() {
  const view = MAP_VIEWS[state.mapView];
  if (!view) return;
  els.mapImage.src = view.local || "";
  els.mapImage.alt = view.label || "Map view";
  els.viewLabel.textContent = view.label;

  if (els.mapCredit) {
    els.mapCredit.textContent = view.credit || "";
    els.mapCredit.hidden = !view.credit;
  }

  if (view.remote) {
    const tester = new Image();
    tester.onload = () => {
      els.mapImage.src = view.remote;
      if (els.mapCredit) {
        els.mapCredit.textContent = view.credit || "";
        els.mapCredit.hidden = !view.credit;
      }
    };
    tester.src = view.remote;
  }
}

function initCivs() {
  els.civPills.innerHTML = Object.keys(CIVS)
    .map(
      (key) =>
        `<button class="pill" data-civ-pill="${key}">${CIVS[key].name}</button>`
    )
    .join("");

  els.civPills.querySelectorAll(".pill").forEach((pill) => {
    pill.addEventListener("click", () => selectCiv(pill.dataset.civPill));
  });

  selectCiv(state.currentCiv);
}

function selectCiv(civKey) {
  state.currentCiv = civKey;
  els.civPills.querySelectorAll(".pill").forEach((pill) => {
    pill.classList.toggle("active", pill.dataset.civPill === civKey);
  });
  renderCivDetail();
  updateProgressCards();
}

function renderTestTargetsCard(civ) {
  const targets = Array.isArray(civ.testTargets) ? civ.testTargets : [];
  const starters = Array.isArray(civ.achievementStarters) ? civ.achievementStarters : [];
  if (!targets.length && !starters.length) return "";

  const lineHtml = (item) => {
    const text = String(item || "");
    const idx = text.indexOf(":");
    if (idx === -1) {
      return `<span class="target-answer">${escapeHtml(text)}</span>`;
    }
    const label = text.slice(0, idx + 1).trim();
    const answer = text.slice(idx + 1).trim();
    return `
      <span class="target-label">${escapeHtml(label)}</span>
      <span class="target-answer">${escapeHtml(answer)}</span>
    `;
  };

  return `
    <div class="card">
      <div class="card-header">
        <h3 class="test-target-title">TEST TARGETS</h3>
      </div>
      <ul class="test-target-list">
        ${targets.map((item) => `<li tabindex="0">${lineHtml(item)}</li>`).join("")}
      </ul>
      ${
        starters.length
          ? `
            <div class="test-target-starters">
              <strong>Achievement sentence starters</strong>
              <ul>
                ${starters.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
              </ul>
            </div>
          `
          : ""
      }
    </div>
  `;
}

function renderTestCheckCard(civ) {
  const chunks = Array.isArray(civ.testCheckChunks) ? civ.testCheckChunks : [];
  if (!chunks.length) return "";
  return `
    <div class="card">
      <div class="card-header">
        <h3>TEST CHECK (Reading Flow)</h3>
      </div>
      <div class="test-check-grid">
        ${chunks
          .map(
            (item, idx) => `
              <div class="test-check-item">
                <div><strong>${escapeHtml(item.chunk || `Chunk ${idx + 1}`)}</strong></div>
                <div>${escapeHtml(item.question || "")}</div>
                <div class="stem-prompt"><strong>Sentence stem:</strong> ${escapeHtml(item.stem || "I can explain this by saying...")}</div>
                <div class="fill-line"></div>
                <button class="secondary test-check-answer-btn">Show Answer</button>
                <div class="answer-line hidden-answer">Answer target: ${escapeHtml(item.answer || "")}</div>
              </div>
            `
          )
          .join("")}
      </div>
    </div>
  `;
}

function renderQuickCheckCard(civ) {
  const items = (Array.isArray(civ.testQuickCheck) ? civ.testQuickCheck : []).slice(0, 10);
  if (!items.length) return "";
  return `
    <div class="card">
      <div class="card-header">
        <h3>Quick Check</h3>
        <button class="secondary show-answers-btn" data-answer-target="quick-check">Show Answers</button>
      </div>
      <ol class="quick-check-list">
        ${items
          .map(
            (item) => `
              <li>
                <div>${escapeHtml(item.prompt || "")}</div>
                <div class="answer-line hidden-answer">Answer: ${escapeHtml(item.answer || "")}</div>
              </li>
            `
          )
          .join("")}
      </ol>
    </div>
  `;
}

function renderCivDetail() {
  const civ = CIVS[state.currentCiv];

  const miniLesson = civ.miniLesson || { hook: "", keyIdeas: [], quickCheck: [] };
  const vocabLinks = civ.vocabLinks || [];
  const infoSources = civ.infoSources || [];
  const civProgress = state.civProgress[state.currentCiv] || {};
  const checks = civ.checks || {};
  const knowledgeCheck = civ.knowledgeChecks ? civ.knowledgeChecks.intro : null;
  const stepKey = state.currentCiv;
  const steps = [
    "Mini-Lesson",
    "Vocab to Know",
    "Activity",
    "Organizer Helper",
    "Info Sources (Extension)",
  ];
  const currentStep = state.civStep[stepKey] ?? 0;

  els.civDetail.innerHTML = `
    ${renderTestTargetsCard(civ)}
    <div class="card teach-intro" data-civ="${state.currentCiv}">
      <div class="teach-header">
        <h2 class="teach-title">${(civ.teachIntro && civ.teachIntro.title) ? civ.teachIntro.title : `The ${civ.name}`}</h2>
        <button class="primary explore-btn" id="exploreCiv" ${state.currentCiv === "aztec" || state.currentCiv === "maya" || state.currentCiv === "inca" || knowledgeCheck ? "" : "disabled"}>
          ${state.currentCiv === "aztec" || state.currentCiv === "maya" || state.currentCiv === "inca" || knowledgeCheck ? "Test Your Knowledge!" : "Test Your Knowledge (Coming Soon)"}
        </button>
      </div>
      <p class="teach-sub">Tap a question. Read the answer. Tap underlined words if you need help.</p>

      <div class="teach-buttons">
        ${((civ.teachIntro && Array.isArray(civ.teachIntro.prompts)) ? civ.teachIntro.prompts : [])
          .map((p, i) => `<button class="teach-btn" data-intro-index="${i}">${p.q}</button>`)
          .join("")}
      </div>

      <div class="teach-answer" id="teachAnswer">
        <div class="teach-placeholder">Choose a question to reveal the answer.</div>
      </div>
    </div>
    ${renderTestCheckCard(civ)}
    ${renderQuickCheckCard(civ)}
    ${
      state.currentCiv === "maya"
        ? renderMayaMiniLessonHTML(
            civ,
            Boolean(civProgress.maya && civProgress.maya.miniLessonComplete) &&
              !state.miniLessonReplay.maya
          )
        : state.currentCiv === "inca"
        ? renderIncaMiniLessonHTML(
            civ,
            Boolean(civProgress.inca && civProgress.inca.miniLessonComplete) &&
              !state.miniLessonReplay.inca
          )
        : state.currentCiv === "aztec"
        ? renderAztecMiniLessonHTML(
            civ,
            Boolean(civProgress.aztec && civProgress.aztec.miniLessonComplete) &&
              !state.miniLessonReplay.aztec
          )
        : `
    <div class="card" data-step="0">
      <div class="card-header">
        <h3>Mini-Lesson</h3>
        <button class="secondary directions-btn" data-dir="mini">Direcciones</button>
      </div>
      <p class="directions-text-inline" data-en="Read the hook, then the key ideas. Answer the quick check in your own words." data-es="Lee el gancho, luego las ideas clave. Responde la verificación rápida con tus propias palabras.">
        Read the hook, then the key ideas. Answer the quick check in your own words.
      </p>
      <p class="lesson-hook">${miniLesson.hook || ""}</p>
      <div>
        <strong>Key Ideas</strong>
        <ul>
          ${(miniLesson.keyIdeas || []).map((idea) => `<li>${idea}</li>`).join("")}
        </ul>
      </div>
      <div>
        <strong>Quick Check</strong>
        <ol>
          ${(miniLesson.quickCheck || []).map((item) => `<li>${item}</li>`).join("")}
        </ol>
      </div>
      <label class="section-check">
        <input type="checkbox" data-section="mini" ${civProgress.mini ? "checked" : ""} ${checks.intro ? "disabled" : ""} />
        <span>I completed the Mini-Lesson.</span>
      </label>
      <button class="primary step-next" data-next="1">Next</button>
    </div>
    `
    }
    <div class="card" data-step="1">
      <div class="card-header">
        <h3>Vocab to Know</h3>
        <button class="secondary directions-btn" data-dir="vocab">Direcciones</button>
      </div>
      <p class="directions-text-inline" data-en="Tap each chip to study the flashcard. Try to say the meaning aloud." data-es="Toca cada ficha para estudiar la tarjeta. Intenta decir el significado en voz alta.">
        Tap each chip to study the flashcard. Try to say the meaning aloud.
      </p>
      <div class="chip-row">
        ${vocabLinks
          .map(
            (term) =>
              `<button class="chip vocab-link" data-term="${term}">${term}</button>`
          )
          .join("")}
      </div>
      <label class="section-check">
        <input type="checkbox" data-section="vocab" ${civProgress.vocab ? "checked" : ""} />
        <span>I completed the Vocab practice.</span>
      </label>
      <button class="primary step-next" data-next="2">Next</button>
    </div>
    <div class="card" data-step="2">
      <div class="card-header">
        <h3>Activity: ${civ.activity.title}</h3>
        <button class="secondary directions-btn" data-dir="activity">Direcciones</button>
      </div>
      <p class="directions-text-inline" data-en="Complete the activity and check your work." data-es="Completa la actividad y revisa tu trabajo.">
        Complete the activity and check your work.
      </p>
      <div class="mini-activity">
        <div>${civ.activity.prompt}</div>
        <div class="activity-grid">
          ${civ.activity.cards.map((card) => `<div class="activity-card">${card}</div>`).join("")}
        </div>
      </div>
      <label class="section-check">
        <input type="checkbox" data-section="activity" ${civProgress.activity ? "checked" : ""} />
        <span>I completed the Activity.</span>
      </label>
      <button class="primary step-next" data-next="3">Next</button>
    </div>
    <div class="card" data-step="3">
      <div class="card-header">
        <h3>Organizer Helper</h3>
        <button class="secondary directions-btn" data-dir="organizer">Direcciones</button>
      </div>
      <p class="directions-text-inline" data-en="Use the stems and word bank to write complete notes." data-es="Usa las oraciones guía y el banco de palabras para escribir notas completas.">
        Use the stems and word bank to write complete notes.
      </p>
      <div class="organizer-helper">
        <div>
          <strong>Sentence Stems</strong>
          <ul>
            ${civ.organizer.stems.map((stem) => `<li>${stem}</li>`).join("")}
          </ul>
        </div>
        <div>
          <strong>Word Bank</strong>
          <div class="activity-grid">
            ${civ.organizer.wordBank.map((word) => `<div class="activity-card">${word}</div>`).join("")}
          </div>
        </div>
      </div>
      <label class="section-check">
        <input type="checkbox" data-section="organizer" ${civProgress.organizer ? "checked" : ""} />
        <span>I completed the Organizer.</span>
      </label>
      <button class="primary step-next" data-next="4">Next</button>
    </div>
    <div class="card" data-step="4">
      <div class="card-header">
        <h3>Info Sources (Extension)</h3>
        <button class="secondary directions-btn" data-dir="sources">Direcciones</button>
      </div>
      <p class="directions-text-inline" data-en="Use these sources at home if allowed." data-es="Usa estas fuentes en casa si es posible.">
        Use these sources at home if allowed.
      </p>
      <div class="info-sources">
        ${infoSources
          .map((src) => {
            if (!src) {
              return `<button class="secondary info-btn" disabled>(coming soon)</button>`;
            }
            return `<button class="secondary info-btn">${src}</button>`;
          })
          .join("")}
      </div>
      <label class="section-check">
        <input type="checkbox" data-section="sources" ${civProgress.sources ? "checked" : ""} />
        <span>I completed the Extension sources.</span>
      </label>
    </div>
  `;

  els.civDetail.classList.toggle("intro-only", state.civIntroOnly);

  els.civDetail.querySelectorAll(".vocab-link").forEach((chip) => {
    chip.addEventListener("click", () => {
      setFlashcardToTerm(chip.dataset.term);
      showMiniFlashcard(chip.dataset.term);
    });
  });

  els.civDetail.querySelectorAll(".step-next").forEach((button) => {
    button.addEventListener("click", () => {
      const next = Number(button.dataset.next);
      if (Number.isNaN(next)) return;
      state.civStep[stepKey] = Math.min(next, steps.length - 1);
      renderCivDetail();
    });
  });

  applyCivStepGating(currentStep);

  // Teaching intro buttons (typewriter answer)
  els.civDetail.querySelectorAll(".teach-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = Number(btn.dataset.introIndex);
      const intro = civ.teachIntro;
      const prompt = intro && Array.isArray(intro.prompts) ? intro.prompts[idx] : null;
      const box = els.civDetail.querySelector("#teachAnswer");
      if (!box || !prompt) return;
      typewriterToBox(box, prompt.a, 16);
    });
  });

  els.civDetail.querySelectorAll(".section-check input").forEach((box) => {
    box.addEventListener("change", () => {
      if (!state.civProgress[state.currentCiv]) {
        state.civProgress[state.currentCiv] = {};
      }
      state.civProgress[state.currentCiv][box.dataset.section] = box.checked;
      storage.save("earlyAmericasCivProgress", state.civProgress);
      updateProgressCards();
    });
  });

  els.civDetail.querySelectorAll(".directions-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const section = btn.dataset.dir;
      const text = btn.closest(".card")?.querySelector(".directions-text-inline");
      if (!text) return;
      const isEnglish = text.dataset.lang !== "es";
      text.dataset.lang = isEnglish ? "es" : "en";
      text.textContent = isEnglish ? text.dataset.es : text.dataset.en;
    });
  });

  els.civDetail.querySelectorAll(".show-answers-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".card");
      if (!card) return;
      const hiddenLines = card.querySelectorAll(".hidden-answer");
      const showing = card.classList.toggle("answers-visible");
      hiddenLines.forEach((line) => {
        line.classList.toggle("show-answer", showing);
      });
      btn.textContent = showing ? "Hide Answers" : "Show Answers";
    });
  });

  els.civDetail.querySelectorAll(".test-check-answer-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".test-check-item");
      if (!item) return;
      const answer = item.querySelector(".hidden-answer");
      if (!answer) return;
      const showing = answer.classList.toggle("show-answer");
      btn.textContent = showing ? "Hide Answer" : "Show Answer";
    });
  });

  els.civDetail.querySelectorAll(".test-target-list li").forEach((item) => {
    item.addEventListener("click", () => {
      item.classList.toggle("active");
    });
    item.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        item.classList.toggle("active");
      }
    });
  });

  const exploreBtn = els.civDetail.querySelector("#exploreCiv");
  if (exploreBtn) {
    exploreBtn.addEventListener("click", () => {
      if (state.currentCiv === "aztec") {
        openAztecKnowledgeOverlay(state.currentCiv, civ);
      } else if (state.currentCiv === "maya") {
        openMayaKnowledgeOverlay(state.currentCiv, civ);
      } else if (state.currentCiv === "inca") {
        openIncaKnowledgeOverlay(state.currentCiv, civ);
      } else if (knowledgeCheck) {
        openKnowledgeOverlay(state.currentCiv, civ, knowledgeCheck);
      }
    });
  }

  if (state.currentCiv === "maya") {
    initMayaMiniLesson(civ);
  } else if (state.currentCiv === "inca") {
    initIncaMiniLesson(civ);
  } else if (state.currentCiv === "aztec") {
    initAztecMiniLesson(civ);
  }

}

function applyCivStepGating(currentStep) {
  const stepCards = Array.from(els.civDetail.querySelectorAll("[data-step]"));
  stepCards.forEach((card) => {
    const step = Number(card.dataset.step);
    const isActive = step <= currentStep;
    card.style.display = isActive ? "block" : "none";
  });
}

function applyCivImage(civ) {
  if (!civ || !civ.image) return;
  const img = document.getElementById("civImage");
  const credit = document.getElementById("civCredit");
  const thumbs = document.getElementById("civThumbs");
  const teachCaption = document.getElementById("civTeachCaption");
  const teachQ = document.getElementById("civTeachQ");
  if (!img) return;

  const gallery = Array.isArray(civ.image.gallery) ? civ.image.gallery : [civ.image];
  if (!gallery.length) return;

  const setImage = (item) => {
    const localSrc = item.local || "";
    img.src = localSrc;
    img.alt = item.alt || civ.name;
    if (credit) {
      credit.textContent = item.credit || "";
      credit.hidden = true;
    }
    const teach = buildImageTeachText(civ, item);
    if (teachCaption) teachCaption.textContent = teach.caption;
    if (teachQ) teachQ.textContent = teach.question;

    if (item.remote) {
      const tester = new Image();
      tester.onload = () => {
        img.src = item.remote;
        if (credit && item.credit) {
          credit.textContent = item.credit;
          credit.hidden = false;
        }
      };
      tester.onerror = () => {
        if (credit) credit.hidden = true;
      };
      tester.src = item.remote;
    }
  };

  if (thumbs) {
    thumbs.innerHTML = gallery
      .map(
        (item, index) => `
          <button class="civ-thumb" data-thumb-index="${index}">
            <img src="${item.thumb || item.local || ""}" alt="${item.label || item.alt || civ.name}" />
            <span>${item.label || "Image"}</span>
          </button>
        `
      )
      .join("");

    thumbs.querySelectorAll(".civ-thumb").forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = Number(btn.dataset.thumbIndex);
        const item = gallery[idx] || gallery[0];
        thumbs.querySelectorAll(".civ-thumb").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        setImage(item);
      });
    });
  }

  if (thumbs && thumbs.querySelector(".civ-thumb")) {
    thumbs.querySelector(".civ-thumb").classList.add("active");
  }
  setImage(gallery[0]);
}

function initGallery() {
  if (!els.galleryPills) return;
  els.galleryPills.innerHTML = Object.keys(CIVS)
    .map(
      (key) =>
        `<button class="pill" data-gallery-pill="${key}">${CIVS[key].name}</button>`
    )
    .join("");

  els.galleryPills.querySelectorAll(".pill").forEach((pill) => {
    pill.addEventListener("click", () => {
      const civKey = pill.dataset.galleryPill;
      setGalleryCiv(civKey);
    });
  });

  setGalleryCiv(state.currentCiv);
}

function setGalleryCiv(civKey) {
  const civ = CIVS[civKey];
  if (!civ) return;
  els.galleryPills.querySelectorAll(".pill").forEach((pill) => {
    pill.classList.toggle("active", pill.dataset.galleryPill === civKey);
  });
  applyCivImage(civ);
}

function initVocab() {
  els.vocabPills.forEach((pill) => {
    pill.addEventListener("click", () => {
      const target = pill.dataset.vocabTab;
      activateVocabPanel(target);
    });
  });

  els.teacherMode.addEventListener("change", () => {
    state.teacherMode = els.teacherMode.checked;
    state.savingEnabled = !state.teacherMode;
    document.body.classList.toggle("teacher-active", state.teacherMode);
    updateProgressCards();
  });

  renderFlashcard();
  renderMatching();
  renderQuiz();
  renderGlossary();

  els.prevCard.addEventListener("click", () => cycleFlash(-1));
  els.nextCard.addEventListener("click", () => cycleFlash(1));
  els.flipCard.addEventListener("click", toggleFlash);
  els.flashcard.addEventListener("click", toggleFlash);

  els.resetMatching.addEventListener("click", () => {
    state.matchingSelection = [];
    state.matchingMatched = new Set();
    renderMatching();
  });

  els.nextQuiz.addEventListener("click", () => {
    state.quizIndex = (state.quizIndex + 1) % VOCAB.length;
    renderQuiz();
  });
}

function activateVocabPanel(target) {
  els.vocabPills.forEach((pill) => {
    pill.classList.toggle("active", pill.dataset.vocabTab === target);
  });
  els.vocabPanels.forEach((panel) => {
    panel.classList.toggle("active", panel.dataset.panel === target);
  });
}

function setFlashcardToTerm(term) {
  if (!term) return;
  const index = VOCAB.findIndex(
    (item) => item.term && item.term.toLowerCase() === term.toLowerCase()
  );
  if (index === -1) return;
  state.flashIndex = index;
  state.flashFlipped = false;
  renderFlashcard();
}

function renderFlashcard() {
  const item = VOCAB[state.flashIndex];
  const backParts = [];
  if (item.definition) backParts.push(`<div><strong>Definition:</strong> ${item.definition}</div>`);
  if (item.clue) backParts.push(`<div><strong>Clue:</strong> ${item.clue}</div>`);
  if (item.example) backParts.push(`<div><strong>Example:</strong> ${item.example}</div>`);
  if (item.spanish) backParts.push(`<div><strong>Spanish:</strong> ${item.spanish}</div>`);

  els.flashFront.textContent = item.term || "";
  els.flashBack.innerHTML = backParts.join("");
  els.flashcard.classList.toggle("flipped", state.flashFlipped);
}

function cycleFlash(delta) {
  state.flashIndex = (state.flashIndex + delta + VOCAB.length) % VOCAB.length;
  state.flashFlipped = false;
  state.vocabProgress.flashcardsSeen += 1;
  storage.save("earlyAmericasVocabProgress", state.vocabProgress);
  renderFlashcard();
  updateProgressCards();
}

function toggleFlash() {
  state.flashFlipped = !state.flashFlipped;
  renderFlashcard();
}

function renderMatching() {
  const shuffled = [...VOCAB]
    .sort(() => Math.random() - 0.5)
    .slice(0, 6);
  const cards = [];
  shuffled.forEach((item) => {
    cards.push({ type: "term", value: item.term, key: item.term });
    cards.push({ type: "def", value: item.definition, key: item.term });
  });
  cards.sort(() => Math.random() - 0.5);

  els.matchingGrid.innerHTML = cards
    .map(
      (card, index) =>
        `<div class="matching-card" data-match-index="${index}" data-key="${card.key}">${card.value}</div>`
    )
    .join("");

  els.matchingGrid.querySelectorAll(".matching-card").forEach((card) => {
    card.addEventListener("click", () => handleMatch(card));
  });
}

function handleMatch(card) {
  if (card.classList.contains("matched") || card.classList.contains("mismatch")) return;
  if (state.matchingSelection.some((item) => item.element === card)) return;
  const key = card.dataset.key;
  state.matchingSelection.push({ key, element: card });
  card.classList.add("selected");

  if (state.matchingSelection.length === 2) {
    const [first, second] = state.matchingSelection;
    if (first.key === second.key) {
      first.element.classList.add("matched");
      second.element.classList.add("matched");
      first.element.classList.remove("selected");
      second.element.classList.remove("selected");
      state.matchingMatched.add(first.key);
      state.vocabProgress.matchingMatches += 1;
      storage.save("earlyAmericasVocabProgress", state.vocabProgress);
      state.matchingSelection = [];
      updateProgressCards();
    } else {
      first.element.classList.add("mismatch");
      second.element.classList.add("mismatch");
      const clear = () => {
        first.element.classList.remove("selected", "mismatch");
        second.element.classList.remove("selected", "mismatch");
        state.matchingSelection = [];
      };
      setTimeout(clear, 900);
    }
  }
}

function renderQuiz() {
  const current = VOCAB[state.quizIndex];
  state.quizLocked = false;
  const options = [current.term];
  while (options.length < 4) {
    const random = VOCAB[Math.floor(Math.random() * VOCAB.length)].term;
    if (!options.includes(random)) options.push(random);
  }
  options.sort(() => Math.random() - 0.5);

  els.quizBox.innerHTML = `
    <div><strong>Which term matches this definition?</strong></div>
    <div>${current.definition}</div>
    ${options
      .map(
        (opt) => `<div class="quiz-option" data-answer="${opt}">${opt}</div>`
      )
      .join("")}
  `;

  els.quizBox.querySelectorAll(".quiz-option").forEach((option) => {
    option.addEventListener("click", () => {
      if (state.quizLocked) return;
      state.quizLocked = true;
      const correct = option.dataset.answer === current.term;
      option.classList.add(correct ? "correct" : "wrong");
      els.quizBox.querySelectorAll(".quiz-option").forEach((opt) => {
        if (opt.dataset.answer === current.term) {
          opt.classList.add("correct");
        }
      });
      state.vocabProgress.quizTotal += 1;
      if (correct) state.vocabProgress.quizCorrect += 1;
      storage.save("earlyAmericasVocabProgress", state.vocabProgress);
      updateProgressCards();
    });
  });
}

function renderGlossary() {
  els.glossary.innerHTML = VOCAB.map(
    (item) => `
      <div class="glossary-item">
        <span>${item.term} — ${item.definition}</span>
        <strong>${item.spanish}</strong>
      </div>
    `
  ).join("");
}

function updateProgressCards() {
  const vocab = state.vocabProgress;
  els.vocabProgress.textContent = `Flashcards viewed: ${vocab.flashcardsSeen}. Matching pairs: ${vocab.matchingMatches}. Quiz: ${vocab.quizCorrect}/${vocab.quizTotal}.`;

  const civ = CIVS[state.currentCiv];
  const progress = state.civProgress[state.currentCiv] || {};
  const total = 5;
  const checked = Object.values(progress).filter(Boolean).length;
  els.civProgress.textContent = `${civ.name} stations: ${checked}/${total} complete.`;

  if (state.teacherMode) {
    els.vocabProgress.textContent = "Teacher Mode is on. Progress saving is disabled.";
  }
}

document.addEventListener("click", (e) => {
  const pop = document.getElementById("vocabPopover");
  if (!pop || !pop.classList.contains("show")) return;
  const inside = e.target.closest(".vocab-popover");
  const vocabTap = e.target.closest(".vocab-pop");
  if (!inside && !vocabTap) pop.classList.remove("show");
});

init();
