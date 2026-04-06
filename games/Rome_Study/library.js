const PAGE_CONFIG = {
    home: {
        title: "Ancient Rome Study Tools",
        eyebrow: "Ancient Rome",
        lead: "Pick a pathway and start a tool.",
        pathways: [
            { key: "master", label: "Study Guide Maximus", href: "master-study-helper.html" },
            { key: "geography", label: "G | Geography", href: "geography.html" },
            { key: "religion", label: "R | Religion", href: "religion.html" },
            { key: "achievements", label: "A | Achievements", href: "achievements.html" },
            { key: "politics", label: "P | Politics", href: "politics.html" },
            { key: "economics", label: "E | Economics", href: "economics.html" },
            { key: "society", label: "S | Society", href: "society.html" }
        ]
    },
    geography: {
        title: "G | Geography",
        eyebrow: "GRAPES",
        buckets: ["geo_founding"]
    },
    religion: {
        title: "R | Religion",
        eyebrow: "GRAPES",
        buckets: ["christianity"]
    },
    geo_founding: {
        title: "Geography + Founding",
        eyebrow: "Rome 1",
        lead: "Learn how Italy's location and founding story helped Rome grow.",
        intro: "Focus on physical geography, trade access, and the legend of Romulus and Remus.",
        buckets: ["geo_founding"]
    },
    republic: {
        title: "Roman Republic",
        eyebrow: "Rome 1",
        lead: "Study Rome's government, social groups, and growing instability.",
        intro: "This section covers monarchy to republic, government roles, and why the Republic weakened.",
        buckets: ["republic"]
    },
    caesar_augustus: {
        title: "Julius Caesar to Augustus",
        eyebrow: "Rome 2",
        lead: "Trace the shift from late Republic conflict to imperial rule.",
        intro: "Compare Caesar and Augustus and practice key leadership terms.",
        buckets: ["caesar_augustus"]
    },
    pax_res_gestae: {
        title: "Pax Romana + Res Gestae",
        eyebrow: "Rome 2",
        lead: "Review peace, prosperity, propaganda, and Augustus's self-presentation.",
        intro: "Use the quotes to think about audience, bias, and legacy.",
        buckets: ["pax_res_gestae"]
    },
    christianity: {
        title: "Spread of Christianity",
        eyebrow: "Rome 2",
        lead: "Follow the timeline from Roman control of Judaea to Christianity becoming official.",
        intro: "This page combines vocabulary, timeline events, and compare and contrast notes.",
        buckets: ["christianity"]
    },
    achievements: {
        title: "A | Achievements",
        eyebrow: "GRAPES",
        buckets: ["achievements"]
    },
    politics: {
        title: "P | Politics",
        eyebrow: "GRAPES",
        buckets: ["republic", "caesar_augustus", "pax_res_gestae", "review"]
    },
    economics: {
        title: "E | Economics",
        eyebrow: "GRAPES",
        buckets: ["fall_empire", "geo_founding", "pax_res_gestae"]
    },
    society: {
        title: "S | Society",
        eyebrow: "GRAPES",
        buckets: ["republic", "achievements"]
    },
    achievements_legacy: {
        title: "Roman Achievements",
        eyebrow: "Rome 2",
        buckets: ["achievements"]
    },
    fall_empire: {
        title: "Fall of the Roman Empire",
        eyebrow: "Rome 2",
        lead: "Study the three big problem areas: government, military, and economy.",
        intro: "The matching set and questions here reinforce cause and effect.",
        buckets: ["fall_empire"]
    },
    review: {
        title: "Test Targets + Review",
        eyebrow: "Rome Review",
        lead: "Use the side-by-side comparisons and matching sets to prepare for both tests.",
        intro: "This page collects the highest-priority review material from the full unit.",
        buckets: ["review"]
    },
    master: {
        title: "Study Guide Maximus",
        eyebrow: "Ancient Rome",
        lead: "Everything in one place.",
        buckets: ["geo_founding", "republic", "caesar_augustus", "pax_res_gestae", "christianity", "achievements", "fall_empire", "review"]
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const data = window.ROME_STUDY;
    const pageKey = document.body.dataset.page;
    const config = PAGE_CONFIG[pageKey];
    const root = document.getElementById("page-root");

    if (!data || !config || !root) {
        return;
    }

    markActiveNav(pageKey);
    root.innerHTML = renderPage(data, config, pageKey);
    bindInteractions();
});

function markActiveNav(pageKey) {
    document.querySelectorAll("[data-nav]").forEach((link) => {
        if (link.dataset.nav === pageKey) {
            link.setAttribute("aria-current", "page");
        }
    });
}

function renderPage(data, config, pageKey) {
    if (pageKey === "home") {
        return renderHomePage(data, config);
    }

    if (pageKey === "master") {
        return renderMasterPage(data, config);
    }

    if (["geography", "religion", "achievements", "politics", "economics", "society"].includes(pageKey)) {
        return renderPathwayPage(data, config, pageKey);
    }

    const bucketSet = new Set(config.buckets);
    const vocab = data.vocabCards.filter((item) => bucketSet.has(item.bucket));
    const matching = data.matchingSets.filter((item) => bucketSet.has(item.bucket));
    const timelines = data.timelineEvents.filter((item) => bucketSet.has(item.bucket));
    const comparisons = data.comparativeNotes.filter((item) => bucketSet.has(item.bucket));
    const practice = data.practiceQuestions.filter((item) => bucketSet.has(item.bucket));
    const quotes = data.resGestaeQuotes.filter((item) => bucketSet.has(item.bucket));
    const targets = pageKey === "home" || pageKey === "master" || pageKey === "review" ? data.reviewTargets : [];
    const glossary = pageKey === "master" ? data.glossary_en_es : [];

    return `
        <section class="hero-card">
            <div>
                <p class="eyebrow">${config.eyebrow}</p>
                <h1>${config.title}</h1>
                <p class="lead">${config.lead}</p>
                <p class="intro-copy">${config.intro}</p>
                ${config.links ? renderLinkGrid(config.links) : ""}
                ${pageKey === "master" ? '<button type="button" class="button secondary" id="reset-all">Reset Page</button>' : ""}
            </div>
        </section>
        ${renderToolsSection(config, vocab, matching, practice)}
        ${vocab.length ? renderVocabSection(vocab) : ""}
        ${comparisons.length ? renderComparisons(comparisons) : ""}
        ${timelines.length ? renderTimelineSection(timelines) : ""}
        ${quotes.length ? renderQuoteSection(quotes) : ""}
        ${matching.length ? renderMatchingSection(matching) : ""}
        ${practice.length ? renderPracticeSection(practice) : ""}
        ${targets.length ? renderTargetsSection(targets) : ""}
        ${glossary.length ? renderGlossarySection(glossary) : ""}
    `;
}

function renderHomePage(data, config) {
    return `
        <section class="home-stage">
            <div class="home-stage-track" aria-hidden="true">
                <span class="home-stage-lane home-stage-lane-top"></span>
                <span class="home-stage-lane home-stage-lane-right"></span>
                <span class="home-stage-lane home-stage-lane-bottom"></span>
                <span class="home-stage-lane home-stage-lane-left"></span>
                <span class="home-stage-curve home-stage-curve-top-left"></span>
                <span class="home-stage-curve home-stage-curve-top-right"></span>
                <span class="home-stage-curve home-stage-curve-bottom-right"></span>
                <span class="home-stage-curve home-stage-curve-bottom-left"></span>
                <span class="home-stage-marker home-stage-marker-start">Start</span>
                <span class="home-stage-marker home-stage-marker-finish">Rome</span>
                <img src="assets/characters/winged-runner.png" alt="" class="home-stage-sprite home-stage-sprite-runner">
                <img src="assets/characters/column-mascot.png" alt="" class="home-stage-sprite home-stage-sprite-column">
                <img src="assets/characters/colosseum-mascot.png" alt="" class="home-stage-sprite home-stage-sprite-colosseum">
                <img src="assets/characters/roman-soldier.png" alt="" class="home-stage-sprite home-stage-sprite-soldier">
                <img src="assets/characters/coin-duo.png" alt="" class="home-stage-sprite home-stage-sprite-coins">
                <img src="assets/characters/laurel-owl.png" alt="" class="home-stage-sprite home-stage-sprite-owl">
            </div>
            <section class="hero-card">
                <div>
                    <p class="eyebrow">${config.eyebrow}</p>
                    <h1>${config.title}</h1>
                    <p class="lead">${config.lead}</p>
                </div>
            </section>
            <section class="content-card">
                <div class="pathway-grid">
                    ${config.pathways.map((item) => renderPathwayCard(item)).join("")}
                </div>
            </section>
        </section>
    `;
}

function renderPathwayCard(item) {
    return `
        <a class="pathway-card${item.key === "master" ? " pathway-card-featured" : ""}" href="${item.href}">
            <span class="pathway-label">${item.label}</span>
        </a>
    `;
}

function renderMasterPage(data, config) {
    const content = collectBucketContent(data, config.buckets);
    const cumulativePractice = buildVocabularyQuestionDeck(content.vocab);
    const cumulativeWriting = buildWritingPrompts(content.vocab, content.practice, "master");
    const masterTools = [
        { key: "notes", label: "Quick Notes", title: "Quick Notes", body: renderMasterNotes(data) },
        { key: "flash", label: "All Flash Cards", title: "All Flash Cards", body: renderVocabTool(content.vocab) },
        { key: "match", label: "Mix and Match", title: "Mix and Match", body: renderTableMatchTool(content.vocab) },
        { key: "practice", label: "Practice Mode", title: "Practice Mode", body: renderCircusPracticeTool(cumulativePractice) },
        { key: "race", label: "Race Game", title: "Race Game", body: renderRaceGameTool(cumulativePractice) },
        { key: "writing", label: "Short Answer", title: "Short Answer", body: renderShortAnswerPractice(cumulativeWriting, "master") }
    ];

    return `
        <section class="hero-card">
            <div>
                <p class="eyebrow">${config.eyebrow}</p>
                <h1>${config.title}</h1>
                <p class="lead">${config.lead}</p>
            </div>
        </section>
        <section class="content-card launcher-shell master-shell" data-inline-launcher="master-maximus">
            <div class="activity-button-grid tool-button-grid">
                ${masterTools.map((tool) => `
                    <button type="button" class="button activity-link" data-open-inline-tool="${tool.key}">
                        ${tool.label}
                    </button>
                `).join("")}
            </div>
            <div class="tool-popover" data-tool-popover hidden>
                <div class="tool-popover-backdrop" data-close-inline-tool></div>
                <div class="tool-popover-dialog" role="dialog" aria-modal="true" aria-label="Study tool" tabindex="-1">
                    <div class="tool-popover-head">
                        <button type="button" class="button secondary" data-close-inline-tool>Close</button>
                    </div>
                    <div class="tool-popover-body">
                        ${masterTools.map((tool) => `
                            <section class="inline-tool-panel" data-inline-tool-panel="${tool.key}" hidden>
                                ${tool.body}
                            </section>
                        `).join("")}
                    </div>
                </div>
            </div>
        </section>
    `;
}

function renderMasterNotes(data) {
    const cards = [
        {
            title: "Geography + Founding",
            bullets: collectBucketContent(data, ["geo_founding"]).vocab.slice(0, 3).map((item) => `${item.term}: ${item.definition}`)
        },
        {
            title: "Republic + Leaders",
            bullets: collectBucketContent(data, ["republic", "caesar_augustus", "pax_res_gestae"]).vocab.slice(0, 3).map((item) => `${item.term}: ${item.definition}`)
        },
        {
            title: "Christianity + Fall",
            bullets: collectBucketContent(data, ["christianity", "fall_empire"]).vocab.slice(0, 3).map((item) => `${item.term}: ${item.definition}`)
        },
        {
            title: "Top Test Targets",
            bullets: data.reviewTargets.flatMap((target) => target.items.slice(0, 2)).slice(0, 4)
        }
    ];

    return `
        <div class="concept-grid">
            ${cards.map((card) => `
                <article class="concept-card">
                    <h3>${card.title}</h3>
                    <ul class="card-list">
                        ${card.bullets.map((bullet) => `<li>${bullet}</li>`).join("")}
                    </ul>
                </article>
            `).join("")}
        </div>
    `;
}

function renderPathwayPage(data, config, pageKey) {
    const content = collectBucketContent(data, config.buckets);
    const targets = pageKey === "politics" ? data.reviewTargets : [];

    return `
        <section class="hero-card">
            <div>
                <p class="eyebrow">${config.eyebrow}</p>
                <h1>${config.title}</h1>
            </div>
        </section>
        ${renderHomeToolLauncher({ id: pageKey, label: config.title }, content)}
        ${targets.length ? renderTargetsSection(targets) : ""}
    `;
}

function renderHomeBucketSection(data, bucket) {
    const content = collectBucketContent(data, [bucket.id]);
    const targets = bucket.id === "review" ? data.reviewTargets : [];

    return `
        <section class="home-bucket" id="section-${bucket.id}">
            ${renderHomeToolLauncher(bucket, content)}
            ${targets.length ? renderTargetsSection(targets) : ""}
        </section>
    `;
}

function renderLinkGrid(links) {
    return `<div class="activity-button-grid">${links.map(([href, label]) => `<a class="button activity-link" href="${href}">${label}</a>`).join("")}</div>`;
}

function renderShellTitle(eyebrow, title) {
    return `
        <div class="shell-title">
            <p class="eyebrow">${eyebrow}</p>
            <h2>${title}</h2>
        </div>
    `;
}

function renderToolsSection(config, vocab, matching, practice) {
    const quickPractice = buildQuickPractice(vocab, practice);

    return `
        <section class="content-card tool-shell">
            <div class="tool-grid">
                ${renderVocabTool(vocab)}
                ${renderMatchingTool(vocab, matching)}
                <article class="study-card tool-card quick-practice-tool" data-practice-items='${escapeAttribute(JSON.stringify(quickPractice))}'>
                    <p class="mini-label">Practice</p>
                    <h3>Quick Check</h3>
                    ${quickPractice.length ? `
                        <p class="tool-term" data-quick-question>${quickPractice[0].prompt}</p>
                        <p class="tool-detail" data-quick-answer hidden>${quickPractice[0].answer}</p>
                        <div class="question-actions">
                            <button type="button" class="button" data-quick-toggle>Show Answer</button>
                            <button type="button" class="button secondary" data-quick-next>Next Prompt</button>
                        </div>
                        <p class="tool-counter" data-quick-counter>1 / ${quickPractice.length}</p>
                    ` : "<p>No practice prompts loaded for this section.</p>"}
                </article>
            </div>
        </section>
    `;
}

function renderBucketOverview(buckets) {
    return `
        <section class="content-card">
            <div class="section-heading">
                <p class="eyebrow">Unit Map</p>
                <h2>Rome Buckets</h2>
            </div>
            <div class="pill-grid">
                ${buckets.map((bucket) => `<span class="pill">${bucket.label}</span>`).join("")}
            </div>
        </section>
    `;
}

function renderVocabSection(vocab) {
    return `
        <section class="content-card">
            <div class="section-heading">
                <p class="eyebrow">Vocabulary</p>
                <h2>Key Terms</h2>
            </div>
            <div class="card-grid">
                ${vocab.map((item) => `
                    <article class="study-card">
                        <p class="mini-label">${item.testTags.join(" / ").toUpperCase()}</p>
                        <h3>${item.term}</h3>
                        <p>${item.definition}</p>
                        <p class="example"><strong>Example:</strong> ${item.example}</p>
                    </article>
                `).join("")}
            </div>
        </section>
    `;
}

function renderComparisons(comparisons) {
    return comparisons.map((item) => `
        <section class="content-card">
            <div class="section-heading">
                <p class="eyebrow">Compare</p>
                <h2>${item.title}</h2>
            </div>
            <div class="comparison-grid">
                <article class="study-card">
                    <h3>${item.leftTitle}</h3>
                    <ul>${item.leftBullets.map((bullet) => `<li>${bullet}</li>`).join("")}</ul>
                </article>
                <article class="study-card">
                    <h3>${item.rightTitle}</h3>
                    <ul>${item.rightBullets.map((bullet) => `<li>${bullet}</li>`).join("")}</ul>
                </article>
            </div>
            <div class="check-box">
                <p><strong>Check yourself:</strong> ${item.checkYourself.prompt}</p>
                <p>${item.checkYourself.choices.join(" | ")}</p>
                <p class="answer-key">Answer: ${item.checkYourself.answer}</p>
            </div>
        </section>
    `).join("");
}

function renderTimelineSection(events) {
    return `
        <section class="content-card">
            <div class="section-heading">
                <p class="eyebrow">Timeline</p>
                <h2>Important Dates</h2>
            </div>
            <div class="timeline">
                ${events.map((item) => `
                    <article class="timeline-item">
                        <p class="timeline-date">${item.date}</p>
                        <h3>${item.event}</h3>
                        <p>${item.explain}</p>
                    </article>
                `).join("")}
            </div>
        </section>
    `;
}

function renderQuoteSection(quotes) {
    return `
        <section class="content-card">
            <div class="section-heading">
                <p class="eyebrow">Source Study</p>
                <h2>Res Gestae Quotes</h2>
            </div>
            <div class="card-grid">
                ${quotes.map((item) => `
                    <article class="study-card">
                        <p class="mini-label">${item.label}</p>
                        <blockquote>${item.quote}</blockquote>
                        <ul>
                            <li>${item.studentPrompt.inMyWords}</li>
                            <li>${item.studentPrompt.wantsYouToBelieve}</li>
                            <li>${item.studentPrompt.reallySaying}</li>
                            <li>${item.studentPrompt.leavesOut}</li>
                        </ul>
                    </article>
                `).join("")}
            </div>
        </section>
    `;
}

function renderMatchingSection(sets) {
    return `
        <section class="content-card">
            <div class="section-heading">
                <p class="eyebrow">Matching</p>
                <h2>Study Matches</h2>
            </div>
            ${sets.map((set) => `
                <article class="study-card matching-card">
                    <h3>${set.title}</h3>
                    <div class="pair-grid">
                        ${set.pairs.map((pair) => `
                            <div class="pair-row">
                                <span>${pair[0]}</span>
                                <span>${pair[1]}</span>
                            </div>
                        `).join("")}
                    </div>
                </article>
            `).join("")}
        </section>
    `;
}

function renderPracticeSection(questions) {
    return `
        <section class="content-card">
            <div class="section-heading">
                <p class="eyebrow">Practice</p>
                <h2>Questions</h2>
            </div>
            <div class="question-stack">
                ${questions.map((item) => item.type === "mc" ? renderMcQuestion(item) : renderShortQuestion(item)).join("")}
            </div>
        </section>
    `;
}

function renderMcQuestion(item) {
    return `
        <form class="study-card question-card quiz-form" data-answer="${item.answerIndex}">
            <p class="mini-label">${item.testTags.join(" / ").toUpperCase()}</p>
            <h3>${item.question}</h3>
            <div class="choice-list">
                ${item.choices.map((choice, index) => `
                    <label class="choice-item">
                        <input type="radio" name="${item.id}" value="${index}">
                        <span>${choice}</span>
                    </label>
                `).join("")}
            </div>
            <div class="question-actions">
                <button type="submit" class="button">Check Answer</button>
                <button type="reset" class="button secondary">Clear</button>
            </div>
            <p class="feedback" hidden></p>
            <p class="explain-text">${item.explain}</p>
        </form>
    `;
}

function renderShortQuestion(item) {
    return `
        <form class="study-card question-card short-form">
            <p class="mini-label">${item.testTags.join(" / ").toUpperCase()}</p>
            <h3>${item.question}</h3>
            <textarea rows="5" placeholder="Write your answer here."></textarea>
            <div class="question-actions">
                <button type="reset" class="button secondary">Clear</button>
            </div>
            <p class="answer-key"><strong>Sample strong answer:</strong> ${item.sampleStrongAnswer}</p>
        </form>
    `;
}

function renderTargetsSection(targets) {
    return `
        <section class="content-card">
            <div class="section-heading">
                <p class="eyebrow">Targets</p>
                <h2>What to Know</h2>
            </div>
            <div class="card-grid">
                ${targets.map((target) => `
                    <article class="study-card">
                        <h3>${target.title}</h3>
                        <ul>${target.items.map((item) => `<li>${item}</li>`).join("")}</ul>
                    </article>
                `).join("")}
            </div>
        </section>
    `;
}

function renderGlossarySection(glossary) {
    return `
        <section class="content-card">
            <div class="section-heading">
                <p class="eyebrow">Support</p>
                <h2>English to Spanish Glossary</h2>
            </div>
            <div class="pair-grid glossary-grid">
                ${glossary.map((item) => `
                    <div class="pair-row">
                        <span>${item.en}</span>
                        <span>${item.es}</span>
                    </div>
                `).join("")}
            </div>
        </section>
    `;
}

function renderHomeToolLauncher(bucket, content) {
    const generatedPractice = buildDropdownItems(content.vocab, content.practice, bucket.id);
    const writingPrompts = buildWritingPrompts(content.vocab, content.practice, bucket.id);
    const tools = [
        { key: "notes", label: "Quick Notes", title: "Quick Notes", body: renderInfoTool(bucket, content) },
        { key: "vocab", label: "Flash Cards", title: "Flash Cards", body: renderVocabTool(content.vocab) },
        { key: "matching", label: "Matching", title: "Matching", body: renderMatchingTool(content.vocab, content.matching) },
        { key: "practice", label: "Practice Questions", title: "Practice Questions", body: renderDropdownPractice(generatedPractice, bucket.id) },
        { key: "race", label: "Race Game", title: "Race Game", body: renderRaceGameTool(generatedPractice) },
        { key: "writing", label: "Short Answer", title: "Short Answer", body: renderShortAnswerPractice(writingPrompts, bucket.id) }
    ];

    if (content.timelines.length) {
        tools.push({ key: "timeline", label: "Timeline", title: "Timeline", body: renderTimelineSection(content.timelines) });
    }

    if (content.comparisons.length) {
        tools.push({ key: "compare", label: "Compare", title: "Compare", body: renderComparisons(content.comparisons) });
    }

    if (content.quotes.length) {
        tools.push({ key: "sources", label: "Source Study", title: "Source Study", body: renderQuoteSection(content.quotes) });
    }

    return `
        <section class="content-card launcher-shell" data-inline-launcher="${bucket.id}">
            <div class="activity-button-grid tool-button-grid">
                ${tools.map((tool) => `
                    <button type="button" class="button activity-link" data-open-inline-tool="${tool.key}">
                        ${tool.label}
                    </button>
                `).join("")}
            </div>
            <div class="section-sprite-stage" data-section-sprite-stage aria-hidden="true"></div>
            <div class="tool-popover" data-tool-popover hidden>
                <div class="tool-popover-backdrop" data-close-inline-tool></div>
                <div class="tool-popover-dialog" role="dialog" aria-modal="true" aria-label="Study tool" tabindex="-1">
                    <div class="tool-popover-head">
                        <button type="button" class="button secondary" data-close-inline-tool>Close</button>
                    </div>
                    <div class="tool-popover-body">
                ${tools.map((tool) => `
                    <section class="inline-tool-panel" data-inline-tool-panel="${tool.key}" hidden>
                        ${tool.body}
                    </section>
                `).join("")}
                    </div>
                </div>
            </div>
        </section>
    `;
}

function renderInfoTool(bucket, content) {
    const cards = buildInfoCards(bucket, content);
    return `
        <div class="concept-grid">
            ${cards.map((card) => `
                <article class="concept-card">
                    <h3>${card.title}</h3>
                    <p>${card.text}</p>
                    <ul class="card-list">
                        ${card.bullets.map((bullet) => `<li>${bullet}</li>`).join("")}
                    </ul>
                </article>
            `).join("")}
        </div>
    `;
}

function renderVocabTool(vocab) {
    const firstCard = vocab[0];

    if (!firstCard) {
        return "<article class=\"study-card\"><p>No vocabulary loaded for this section.</p></article>";
    }

    return `
        <article class="tool-card vocab-tool" data-tool-terms='${escapeAttribute(JSON.stringify(vocab))}'>
            <p class="mini-label">Flash Cards</p>
            <button type="button" class="flashcard" data-vocab-card aria-label="Tap to flip flash card">
                <span class="flashcard-inner">
                    <span class="flashcard-face flashcard-face-front">
                        <span class="flashcard-label">Word</span>
                        <span class="flashcard-main" data-vocab-term>${firstCard.term}</span>
                        <span class="flashcard-hint">Tap to flip</span>
                    </span>
                    <span class="flashcard-face flashcard-face-back">
                        <span class="flashcard-label">Meaning</span>
                        <span class="flashcard-main flashcard-main-small" data-vocab-detail>${firstCard.definition}</span>
                        <span class="flashcard-example" data-vocab-example>${firstCard.example}</span>
                    </span>
                </span>
            </button>
            <div class="question-actions">
                <button type="button" class="button secondary" data-vocab-prev>Back</button>
                <button type="button" class="button secondary" data-vocab-next>Next</button>
            </div>
            <p class="tool-counter" data-vocab-counter>1 / ${vocab.length}</p>
            <details class="tool-dropdown">
                <summary>Show All Vocab Words</summary>
                <div class="tool-dropdown-body">
                    <ul class="vocab-word-list">
                        ${vocab.map((item) => `<li><strong>${item.term}:</strong> ${item.definition}</li>`).join("")}
                    </ul>
                </div>
            </details>
            <details class="tool-dropdown">
                <summary>Random Practice</summary>
                <div class="tool-dropdown-body">
                    <p class="tool-instructions">Mix the cards and start again in a new random order.</p>
                    <button type="button" class="button secondary" data-vocab-randomize>Shuffle Deck</button>
                </div>
            </details>
        </article>
    `;
}

function renderMatchingTool(vocab, matching) {
    const matchSet = buildToolMatchingSet(vocab, matching);

    if (!matchSet.length) {
        return "<article class=\"study-card\"><p>No matching content loaded for this section.</p></article>";
    }

    return `
        <article class="study-card tool-card matching-tool" data-match-pairs='${escapeAttribute(JSON.stringify(matchSet))}'>
            <p class="mini-label">Matching</p>
            <p class="tool-instructions">Select a term, then select its match.</p>
            <div class="match-columns">
                <div class="match-stack" data-match-left></div>
                <div class="match-stack" data-match-right></div>
            </div>
            <p class="feedback" data-match-feedback hidden></p>
        </article>
    `;
}

function renderTableMatchTool(vocab) {
    const deck = vocab.slice(0, 24).map((item) => ({
        term: item.term,
        definition: item.definition
    }));

    if (!deck.length) {
        return "<article class=\"study-card\"><p>No matching content loaded for this section.</p></article>";
    }

    return `
        <article class="study-card tool-card table-match-tool" data-table-match-deck='${escapeAttribute(JSON.stringify(deck))}'>
            <p class="mini-label">Mix and Match</p>
            <div class="lightning-head">
                <p class="tool-counter" data-table-match-counter>Matches: 0</p>
                <p class="tool-counter" data-table-match-status>Find the pairs.</p>
            </div>
            <div class="table-match-meta">
                <div class="table-match-stack" aria-hidden="true">
                    <span class="table-match-stack-card table-match-stack-card-back"></span>
                    <span class="table-match-stack-card table-match-stack-card-mid"></span>
                    <span class="table-match-stack-card table-match-stack-card-front"></span>
                </div>
                <div class="table-match-readout">
                    <p class="tool-counter" data-table-match-deck>Deck: ${deck.length} pairs</p>
                    <p class="tool-counter" data-table-match-board-count>On table: 0</p>
                </div>
            </div>
            <div class="table-match-board" data-table-match-board></div>
        </article>
    `;
}

function renderDropdownPractice(questions, bucketId) {
    return `
        <div class="question-list" data-dropdown-practice="${bucketId}">
            ${questions.map((item, index) => `
                <article class="question-card dropdown-question">
                    <label class="question-label" for="${bucketId}-select-${index}">
                        ${index + 1}. ${item.question}
                    </label>
                    <select class="answer-select" id="${bucketId}-select-${index}" data-answer="${escapeAttribute(item.answer)}">
                        <option value="">Choose one</option>
                        ${shuffleArray(item.options).map((choice) => `
                            <option value="${escapeAttribute(choice)}">${choice}</option>
                        `).join("")}
                    </select>
                    <div class="feedback" data-dropdown-feedback></div>
                    <p class="tool-instructions">${item.explain}</p>
                </article>
            `).join("")}
            <div class="button-row">
                <button type="button" class="button" data-check-dropdowns>Check Answers</button>
                <p class="score-banner" data-dropdown-score hidden></p>
            </div>
        </div>
    `;
}

function renderShortAnswerPractice(prompts, bucketId) {
    return `
        <div class="practice-support-grid">
            ${prompts.map((item, index) => `
                <article class="prompt-card">
                    <h3>Prompt ${index + 1}</h3>
                    <p>${item.prompt}</p>
                    <textarea class="response-box" rows="5" placeholder="Write 2 or 3 strong sentences here."></textarea>
                    <details>
                        <summary>What a strong answer can include</summary>
                        <ul class="card-list">
                            ${buildShortAnswerBullets(item).map((bullet) => `<li>${bullet}</li>`).join("")}
                        </ul>
                    </details>
                    ${item.sampleStrongAnswer ? `<p class="answer-key"><strong>Sample strong answer:</strong> ${item.sampleStrongAnswer}</p>` : ""}
                </article>
            `).join("")}
        </div>
    `;
}

function renderLightningRound(items) {
    if (!items.length) {
        return "<article class=\"study-card\"><p>No challenge loaded yet.</p></article>";
    }

    return `
        <article class="study-card lightning-tool" data-lightning-items='${escapeAttribute(JSON.stringify(items.slice(0, 12)))}'>
            <p class="mini-label">Lightning Round</p>
            <div class="lightning-head">
                <p class="tool-counter" data-lightning-counter>1 / ${Math.min(items.length, 12)}</p>
                <p class="tool-counter" data-lightning-score>Score: 0</p>
            </div>
            <h3 class="lightning-question" data-lightning-question>${items[0].question}</h3>
            <div class="lightning-options" data-lightning-options></div>
            <p class="feedback" data-lightning-feedback hidden></p>
            <div class="question-actions next-action-row">
                <button type="button" class="button secondary next-action-button" data-lightning-next hidden>Next</button>
                <button type="button" class="button secondary" data-lightning-restart hidden>Play Again</button>
            </div>
        </article>
    `;
}

function renderCircusTrack(prefix, spriteSrc, spriteClass = "") {
    return `
        <div class="circus-track" data-${prefix}-track>
            <div class="circus-track-lane"></div>
            <div class="circus-track-spine"></div>
            <div class="circus-track-finish" aria-hidden="true">
                <span class="circus-track-finish-label">Finish</span>
                <span class="circus-track-finish-post"></span>
            </div>
            <div class="circus-track-burst" data-${prefix}-burst hidden aria-hidden="true"></div>
            <div class="circus-track-racer ${spriteClass}" data-${prefix}-racer aria-hidden="true">
                <img src="${spriteSrc}" alt="" class="circus-track-racer-sprite">
            </div>
        </div>
    `;
}

function renderCircusPracticeTool(items) {
    if (!items.length) {
        return "<article class=\"study-card\"><p>No practice loaded yet.</p></article>";
    }

    return `
        <article class="study-card circus-tool practice-loop-tool" data-practice-loop='${escapeAttribute(JSON.stringify(items))}'>
            <p class="mini-label">Practice Mode</p>
            ${renderCircusTrack("practice", "assets/characters/laurel-owl.png", "circus-track-racer-practice")}
            <div class="lightning-head">
                <p class="tool-counter" data-practice-loop-counter>1 / ${items.length}</p>
                <p class="tool-counter" data-practice-loop-score>Correct: 0</p>
            </div>
            <h3 class="lightning-question" data-practice-loop-question>${items[0].question}</h3>
            <div class="lightning-options" data-practice-loop-options></div>
            <p class="feedback" data-practice-loop-feedback hidden></p>
            <div class="question-actions next-action-row">
                <button type="button" class="button secondary next-action-button" data-practice-loop-next hidden>Next</button>
            </div>
        </article>
    `;
}

function renderRaceGameTool(items) {
    if (!items.length) {
        return "<article class=\"study-card\"><p>No race loaded yet.</p></article>";
    }

    return `
        <article class="study-card circus-tool race-game-tool" data-race-game='${escapeAttribute(JSON.stringify(items))}'>
            <p class="mini-label">Race Game</p>
            ${renderCircusTrack("race", "assets/characters/winged-runner.png", "circus-track-racer-race")}
            <div class="lightning-head">
                <p class="tool-counter" data-race-counter>1 / ${items.length}</p>
                <p class="tool-counter" data-race-score>Locked In: 0</p>
            </div>
            <p class="tool-counter race-timer" data-race-timer>Chariot Clock: 0:00</p>
            <h3 class="lightning-question" data-race-question>${items[0].question}</h3>
            <div class="lightning-options" data-race-options></div>
            <p class="feedback" data-race-feedback hidden></p>
            <div class="question-actions next-action-row">
                <button type="button" class="button secondary next-action-button" data-race-next hidden>Next</button>
                <button type="button" class="button secondary" data-race-restart hidden>Play Again</button>
            </div>
        </article>
    `;
}

function collectBucketContent(data, bucketIds) {
    const bucketSet = new Set(bucketIds);
    return {
        vocab: data.vocabCards.filter((item) => bucketSet.has(item.bucket)),
        matching: data.matchingSets.filter((item) => bucketSet.has(item.bucket)),
        timelines: data.timelineEvents.filter((item) => bucketSet.has(item.bucket)),
        comparisons: data.comparativeNotes.filter((item) => bucketSet.has(item.bucket)),
        practice: data.practiceQuestions.filter((item) => bucketSet.has(item.bucket)),
        quotes: data.resGestaeQuotes.filter((item) => bucketSet.has(item.bucket))
    };
}

function getBucketSummary(bucketId) {
    const summaries = {
        geo_founding: "Learn where Rome began and how mountains, rivers, and the sea helped protect Rome and connect it to trade.",
        republic: "See how Rome changed from kings to elected leaders, and why problems like unfairness, corruption, and civil war hurt the Republic.",
        caesar_augustus: "Follow the change from Julius Caesar to Augustus and how Rome moved from republic to empire.",
        pax_res_gestae: "Study Rome's time of peace and what Augustus wanted people to believe about his rule.",
        christianity: "Track how Christianity started, spread through the empire, faced persecution, and later became accepted.",
        achievements: "Review Roman building ideas and inventions like aqueducts, concrete, arches, and public spaces.",
        fall_empire: "Understand the big reasons Rome fell: weak government, military problems, and economic troubles.",
        review: "Use these test targets to check the most important ideas from both Rome tests."
    };

    return summaries[bucketId] || "";
}

function buildInfoCards(bucket, content) {
    const cards = [];
    cards.push({
        title: "Big Idea",
        text: getBucketSummary(bucket.id),
        bullets: buildBigIdeaBullets(content)
    });

    if (content.comparisons.length) {
        const compare = content.comparisons[0];
        cards.push({
            title: compare.title,
            text: `Compare ${compare.leftTitle} and ${compare.rightTitle}.`,
            bullets: [compare.leftBullets[0], compare.rightBullets[0], `Check yourself: ${compare.checkYourself.prompt}`].filter(Boolean)
        });
    } else if (content.timelines.length) {
        cards.push({
            title: "Important Dates",
            text: "These events help you see what changed over time.",
            bullets: content.timelines.slice(0, 3).map((item) => `${item.date}: ${item.event}`)
        });
    } else if (content.quotes.length) {
        cards.push({
            title: "Source Thinking",
            text: "This section asks you to think about what a leader wanted people to believe.",
            bullets: [
                "Put the quote in your own words.",
                "Explain the message the speaker wants people to believe.",
                "Notice what the quote leaves out."
            ]
        });
    }

    cards.push({
        title: "Words To Know",
        text: "These are good words to review before classwork or a quiz.",
        bullets: content.vocab.slice(0, 4).map((item) => `${item.term}: ${item.definition}`)
    });

    return cards.slice(0, 3);
}

function buildBigIdeaBullets(content) {
    const bullets = [];

    if (content.vocab.length) {
        bullets.push(`Key word: ${content.vocab[0].term}`);
    }

    if (content.practice.length) {
        bullets.push(content.practice[0].question);
    }

    if (content.matching.length) {
        bullets.push(`Matching set: ${content.matching[0].title}`);
    }

    return bullets.slice(0, 3);
}

function buildShortAnswerBullets(item) {
    const bullets = [];
    const sample = item.sampleStrongAnswer || "";

    if (sample) {
        const parts = sample.split(". ").map((part) => part.replace(/\.$/, "").trim()).filter(Boolean);
        bullets.push(...parts.slice(0, 3));
    }

    if (!bullets.length) {
        bullets.push("Answer the question clearly.");
        bullets.push("Use one or two facts from the section.");
        bullets.push("Write in complete sentences.");
    }

    return bullets;
}

function buildDropdownItems(vocab, practice, bucketId) {
    const authored = practice
        .filter((item) => item.type === "mc")
        .map((item) => ({
            question: item.question,
            options: item.choices,
            answer: item.choices[item.answerIndex],
            explain: item.explain
        }));

    if (authored.length) {
        return authored;
    }

    return vocab.slice(0, 5).map((item, index) => {
        const distractors = shuffleArray(
            vocab.filter((entry) => entry.id !== item.id).map((entry) => entry.definition)
        ).slice(0, 3);

        return {
            question: buildVocabQuestionPrompt(item.term),
            options: shuffleArray([item.definition, ...distractors]),
            answer: item.definition,
            explain: item.example || `Review ${item.term}.`
        };
    });
}

function buildVocabQuestionPrompt(term) {
    const normalized = term.trim();
    const lower = normalized.toLowerCase();

    const promptMap = {
        "natural barriers": "What are natural barriers?",
        "peninsula": "What is a peninsula?",
        "alps": "What are the Alps?",
        "apennine mountains": "What are the Apennine Mountains?",
        "mediterranean sea": "What is the Mediterranean Sea?",
        "tiber river": "What is the Tiber River?",
        "romulus and remus": "Who were Romulus and Remus?",
        "monarchy": "What is a monarchy?",
        "republic": "What is a republic?",
        "senate": "What was the Senate?",
        "consul": "What was a consul?",
        "tribune": "What was a tribune?",
        "veto": "What does veto mean?",
        "patricians": "Who were patricians?",
        "plebeians": "Who were plebeians?",
        "enslaved people": "Who were enslaved people?",
        "corruption": "What is corruption?",
        "civil war": "What is a civil war?",
        "dictator": "What is a dictator?",
        "dictator for life": "What does dictator for life mean?",
        "ambitious": "What does ambitious mean?",
        "reform": "What is a reform?",
        "triumvirate": "What is a triumvirate?",
        "emperor": "What is an emperor?",
        "pax romana": "What was the Pax Romana?",
        "propaganda": "What is propaganda?",
        "legacy": "What is a legacy?",
        "disciple": "What is a disciple?",
        "resurrection": "What does resurrection mean?",
        "martyr": "What is a martyr?",
        "gospels": "What are the gospels?",
        "persecution": "What is persecution?",
        "engineering": "What is engineering?",
        "architecture": "What is architecture?",
        "aqueduct": "What is an aqueduct?",
        "concrete": "What is concrete?",
        "vault": "What is a vault?",
        "forum": "What was the forum?",
        "inflation": "What is inflation?",
        "barter": "What is barter?",
        "loyalty": "What is loyalty?",
        "invader": "What is an invader?"
    };

    if (promptMap[lower]) {
        return promptMap[lower];
    }

    return `What is ${normalized}?`;
}

const MASTER_VOCAB_QUESTION_DECK = [
    {
        question: "What are natural barriers?",
        options: [
            "Land with water on three sides.",
            "A group of powerful leaders.",
            "Physical features that make travel or invasion harder.",
            "A ruler with total power."
        ],
        answer: "Physical features that make travel or invasion harder.",
        explain: "The Alps helped protect Italy from invaders from the north."
    },
    {
        question: "What is a peninsula?",
        options: [
            "Land with water on three sides.",
            "Mountains north of Italy.",
            "A leader with total power.",
            "A public meeting place."
        ],
        answer: "Land with water on three sides.",
        explain: "Italy is a peninsula in the Mediterranean Sea."
    },
    {
        question: "What are the Alps?",
        options: [
            "Mountains north of Italy.",
            "A river near early Rome.",
            "Mountains through the center of Italy.",
            "A sea used for trade and travel."
        ],
        answer: "Mountains north of Italy.",
        explain: "The Alps made it harder for enemies to invade Italy."
    },
    {
        question: "What are the Apennine Mountains?",
        options: [
            "Mountains through the center of Italy.",
            "Mountains north of Italy.",
            "A sea around Italy.",
            "A river near early Rome."
        ],
        answer: "Mountains through the center of Italy.",
        explain: "The Apennines shaped travel and settlement in Italy."
    },
    {
        question: "What is the Mediterranean Sea?",
        options: [
            "A river near early Rome.",
            "Sea around Italy used for trade and travel.",
            "Mountains north of Italy.",
            "Land with water on three sides."
        ],
        answer: "Sea around Italy used for trade and travel.",
        explain: "Rome used the Mediterranean Sea to trade across its empire."
    },
    {
        question: "What is the Tiber River?",
        options: [
            "A river near early Rome.",
            "A sea used for trade and travel.",
            "A mountain range north of Italy.",
            "A system that carries water."
        ],
        answer: "A river near early Rome.",
        explain: "Rome's location near the Tiber River helped it grow."
    },
    {
        question: "Who were Romulus and Remus?",
        options: [
            "Twin brothers in Rome's founding story.",
            "Two elected leaders who shared power.",
            "Followers of Jesus.",
            "Wealthy upper-class Romans."
        ],
        answer: "Twin brothers in Rome's founding story.",
        explain: "The myth explains Rome's beginnings and values like strength and leadership."
    },
    {
        question: "What is a monarchy?",
        options: [
            "Rule by one king or queen.",
            "A government with elected leaders.",
            "An alliance of three leaders.",
            "A leader chosen by plebeians."
        ],
        answer: "Rule by one king or queen.",
        explain: "Romans disliked kings after unfair rulers and chose a new system."
    },
    {
        question: "What is a republic?",
        options: [
            "A government with elected leaders.",
            "Rule by one king or queen.",
            "A government run by invaders.",
            "A public meeting place."
        ],
        answer: "A government with elected leaders.",
        explain: "Rome became a republic led by elected officials."
    },
    {
        question: "What was the Senate?",
        options: [
            "A group of powerful leaders.",
            "A place for shopping and trade.",
            "A group of Christian writers.",
            "A team of Roman soldiers."
        ],
        answer: "A group of powerful leaders.",
        explain: "The Senate had major influence in the Roman Republic."
    },
    {
        question: "What was a consul?",
        options: [
            "One of two top elected leaders.",
            "A ruler with total power.",
            "A leader who protected plebeians.",
            "A powerful senator for life."
        ],
        answer: "One of two top elected leaders.",
        explain: "Two consuls helped prevent one person from becoming a king."
    },
    {
        question: "What was a tribune?",
        options: [
            "A leader who protected plebeians.",
            "A ruler with total power.",
            "A wealthy upper-class Roman.",
            "A type of Roman road."
        ],
        answer: "A leader who protected plebeians.",
        explain: "A tribune could stop a law that harmed plebeians."
    },
    {
        question: "What does veto mean?",
        options: [
            "To stop a law or decision.",
            "To choose a new emperor.",
            "To build a road.",
            "To rule for life."
        ],
        answer: "To stop a law or decision.",
        explain: "A tribune could veto an unfair law."
    },
    {
        question: "Who were patricians?",
        options: [
            "Wealthy upper-class Romans.",
            "Common workers and farmers.",
            "People forced to work without freedom.",
            "Roman soldiers from other lands."
        ],
        answer: "Wealthy upper-class Romans.",
        explain: "Many senators were patricians."
    },
    {
        question: "Who were plebeians?",
        options: [
            "Common people in Rome.",
            "Wealthy upper-class Romans.",
            "People forced to work without freedom.",
            "Leaders chosen by the Senate."
        ],
        answer: "Common people in Rome.",
        explain: "Plebeians demanded more fairness and representation."
    },
    {
        question: "Who were enslaved people in Rome?",
        options: [
            "People forced to work without freedom.",
            "Common people with voting rights.",
            "Wealthy landowners.",
            "Roman governors."
        ],
        answer: "People forced to work without freedom.",
        explain: "Many enslaved people did hard labor in Roman society."
    },
    {
        question: "What is corruption?",
        options: [
            "Using power unfairly for personal gain.",
            "Sharing power with another leader.",
            "Building roads across an empire.",
            "Trading goods without money."
        ],
        answer: "Using power unfairly for personal gain.",
        explain: "Corruption weakened trust in the Republic."
    },
    {
        question: "What is a civil war?",
        options: [
            "A war between groups in one country.",
            "A war against invaders only.",
            "A peaceful change in government.",
            "A fight between two emperors."
        ],
        answer: "A war between groups in one country.",
        explain: "Civil wars weakened Rome's government and stability."
    },
    {
        question: "What is a dictator?",
        options: [
            "A leader with total power.",
            "A leader chosen by the people.",
            "A leader who shares power.",
            "A Roman governor."
        ],
        answer: "A leader with total power.",
        explain: "Julius Caesar became dictator for life."
    },
    {
        question: "What does dictator for life mean?",
        options: [
            "A ruler who keeps power for life.",
            "A leader chosen every year.",
            "A ruler who shares power.",
            "A law made by the Senate."
        ],
        answer: "A ruler who keeps power for life.",
        explain: "This made many Romans fear the Republic was ending."
    },
    {
        question: "What does ambitious mean?",
        options: [
            "Very driven to gain success or power.",
            "Willing to share power equally.",
            "Afraid to lead others.",
            "Punished for beliefs."
        ],
        answer: "Very driven to gain success or power.",
        explain: "Caesar was ambitious and gained influence."
    },
    {
        question: "What is a reform?",
        options: [
            "A change meant to improve something.",
            "A speech to persuade people.",
            "A law that cannot be changed.",
            "A group of rulers."
        ],
        answer: "A change meant to improve something.",
        explain: "Caesar made reforms that helped some people."
    },
    {
        question: "What is a triumvirate?",
        options: [
            "A group of three powerful leaders.",
            "A group of two consuls.",
            "A ruler with total power.",
            "A group of Roman soldiers."
        ],
        answer: "A group of three powerful leaders.",
        explain: "Rome had a triumvirate during the late Republic."
    },
    {
        question: "What is an emperor?",
        options: [
            "The ruler of an empire.",
            "A leader who protects plebeians.",
            "A mountain barrier north of Italy.",
            "A Roman building material."
        ],
        answer: "The ruler of an empire.",
        explain: "Augustus became Rome's first emperor."
    },
    {
        question: "What was the Pax Romana?",
        options: [
            "A long time of peace in Rome.",
            "A long civil war in Rome.",
            "A period of harsh persecution.",
            "A set of Roman laws."
        ],
        answer: "A long time of peace in Rome.",
        explain: "Trade and travel were safer during the Pax Romana."
    },
    {
        question: "What is propaganda?",
        options: [
            "Information used to persuade people.",
            "A law passed by the Senate.",
            "A letter from a governor.",
            "A speech about religion."
        ],
        answer: "Information used to persuade people.",
        explain: "Leaders can use propaganda to build support."
    },
    {
        question: "What is a legacy?",
        options: [
            "What a person is remembered for.",
            "A law that lasts forever.",
            "A Roman building style.",
            "A public speech."
        ],
        answer: "What a person is remembered for.",
        explain: "Augustus wanted a strong legacy."
    },
    {
        question: "What is a disciple?",
        options: [
            "A follower of a teacher.",
            "A ruler of an empire.",
            "A Roman soldier.",
            "A writer of laws."
        ],
        answer: "A follower of a teacher.",
        explain: "Jesus had disciples who spread his teachings."
    },
    {
        question: "What does resurrection mean?",
        options: [
            "Coming back to life after death.",
            "A trip to another city.",
            "Giving up power.",
            "Writing a gospel."
        ],
        answer: "Coming back to life after death.",
        explain: "Christians believe in the resurrection of Jesus."
    },
    {
        question: "What is a martyr?",
        options: [
            "A person killed for their beliefs.",
            "A person who writes laws.",
            "A person who leads an army.",
            "A person who builds roads."
        ],
        answer: "A person killed for their beliefs.",
        explain: "Some early Christians became martyrs."
    },
    {
        question: "What are the gospels?",
        options: [
            "Writings about Jesus's life and teachings.",
            "Roman laws about trade.",
            "Stories about Roman emperors.",
            "Letters about aqueducts."
        ],
        answer: "Writings about Jesus's life and teachings.",
        explain: "The gospels helped spread Christian ideas."
    },
    {
        question: "What is persecution?",
        options: [
            "Being harmed for your beliefs.",
            "Leading others in worship.",
            "Writing down laws.",
            "Spreading an empire."
        ],
        answer: "Being harmed for your beliefs.",
        explain: "Some Roman leaders persecuted Christians."
    },
    {
        question: "What is engineering?",
        options: [
            "Solving problems by designing and building.",
            "Writing speeches for leaders.",
            "Making laws for citizens.",
            "Trading across the sea."
        ],
        answer: "Solving problems by designing and building.",
        explain: "Romans engineered aqueducts to carry water."
    },
    {
        question: "What is architecture?",
        options: [
            "The design of buildings and structures.",
            "A way to stop a law.",
            "A kind of trade system.",
            "A Roman social class."
        ],
        answer: "The design of buildings and structures.",
        explain: "Roman architecture used arches and domes."
    },
    {
        question: "What is an aqueduct?",
        options: [
            "A system that carries fresh water.",
            "A curved Roman roof.",
            "A place for politics and trade.",
            "A Roman coin."
        ],
        answer: "A system that carries fresh water.",
        explain: "Aqueducts brought water from far away into Rome."
    },
    {
        question: "What is concrete?",
        options: [
            "A strong building material that hardens.",
            "A system that carries water.",
            "A Roman ruler for life.",
            "A type of arch."
        ],
        answer: "A strong building material that hardens.",
        explain: "Concrete helped Romans build long-lasting structures."
    },
    {
        question: "What is a vault?",
        options: [
            "A curved ceiling made from arches.",
            "A ruler with total power.",
            "A group of powerful leaders.",
            "A type of Roman road."
        ],
        answer: "A curved ceiling made from arches.",
        explain: "Vaults helped support heavy roofs."
    },
    {
        question: "What was the forum?",
        options: [
            "A public meeting place.",
            "A mountain barrier.",
            "A Roman water system.",
            "A type of emperor."
        ],
        answer: "A public meeting place.",
        explain: "Romans gathered in the forum for business and politics."
    },
    {
        question: "What is inflation?",
        options: [
            "Prices rise because money is worth less.",
            "Prices drop because money is worth more.",
            "Trade stops completely.",
            "People vote for leaders."
        ],
        answer: "Prices rise because money is worth less.",
        explain: "When coin value dropped, inflation increased."
    },
    {
        question: "What is barter?",
        options: [
            "Trading goods or services without money.",
            "Using power unfairly for personal gain.",
            "A long time of peace.",
            "A group of common people."
        ],
        answer: "Trading goods or services without money.",
        explain: "Romans began to barter when coins lost value."
    },
    {
        question: "What is loyalty?",
        options: [
            "Being faithful to a leader or country.",
            "Being rich and powerful.",
            "Being ready to invade.",
            "Being able to build roads."
        ],
        answer: "Being faithful to a leader or country.",
        explain: "Low pay reduced soldiers' loyalty to Rome."
    },
    {
        question: "What is an invader?",
        options: [
            "An attacker from outside the empire.",
            "A leader chosen by citizens.",
            "A person punished for beliefs.",
            "A river near Rome."
        ],
        answer: "An attacker from outside the empire.",
        explain: "Foreign invaders pressured Rome's borders."
    }
];

function buildVocabularyQuestionDeck() {
    return MASTER_VOCAB_QUESTION_DECK.map((item) => ({
        question: item.question,
        options: [...item.options],
        answer: item.answer,
        explain: item.explain
    }));
}

function buildWritingPrompts(vocab, practice, bucketId) {
    const authored = practice
        .filter((item) => item.type === "short")
        .map((item) => ({
            prompt: item.question,
            sampleStrongAnswer: item.sampleStrongAnswer
        }));

    if (authored.length) {
        return authored;
    }

    const templates = {
        geography: `Explain how geography helped Rome grow. Use two words from this pathway: ${vocab.slice(0, 2).map((item) => item.term).join(" and ")}.`,
        religion: `Explain one reason Christianity spread in the Roman Empire.`,
        achievements: `Explain one Roman achievement and why it mattered.`,
        politics: `Explain how Rome changed from republic to empire.`,
        economics: `Explain how money and trade problems hurt Rome.`,
        society: `Describe one group in Roman society and how that group lived.`,
        geo_founding: `Explain how geography helped Rome grow.`,
        republic: `Explain one problem inside the Roman Republic.`,
        caesar_augustus: `Explain one way Julius Caesar or Augustus changed Rome.`,
        fall_empire: `Explain one reason the Roman Empire grew weak.`
    };

    return [{
        prompt: templates[bucketId] || `Explain the most important idea from this pathway.`,
        sampleStrongAnswer: ""
    }];
}

function bindInteractions() {
    bindInlineLaunchers();
    bindVocabTools();
    bindMatchingTools();
    bindTableMatchingTools();
    bindQuickPracticeTools();
    bindDropdownPractice();
    bindLightningRounds();
    bindPracticeLoopTools();
    bindRaceGameTools();
    bindSectionSpriteStages();

    document.querySelectorAll(".quiz-form").forEach((form) => {
        form.reset();
        const feedback = form.querySelector(".feedback");
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const selected = form.querySelector("input[type='radio']:checked");
            if (!selected) {
                feedback.hidden = false;
                feedback.textContent = "Pick an answer first.";
                feedback.dataset.state = "pending";
                return;
            }

            const isCorrect = Number(selected.value) === Number(form.dataset.answer);
            feedback.hidden = false;
            feedback.textContent = isCorrect ? "Correct." : "Try again, then read the explanation.";
            feedback.dataset.state = isCorrect ? "correct" : "incorrect";
        });
        form.addEventListener("reset", () => {
            window.requestAnimationFrame(() => {
                feedback.hidden = true;
                feedback.textContent = "";
                delete feedback.dataset.state;
            });
        });
    });

    document.querySelectorAll(".short-form").forEach((form) => form.reset());

    const resetButton = document.getElementById("reset-all");
    if (resetButton) {
        resetButton.addEventListener("click", () => {
            document.querySelectorAll("form").forEach((form) => form.reset());
        });
    }
}

function bindSectionSpriteStages() {
    const sprites = [
        "assets/characters/column-mascot.png",
        "assets/characters/colosseum-mascot.png",
        "assets/characters/winged-runner.png",
        "assets/characters/roman-soldier.png",
        "assets/characters/coin-duo.png",
        "assets/characters/laurel-owl.png"
    ];

    document.querySelectorAll("[data-section-sprite-stage]").forEach((stage) => {
        let active = 0;
        let timerId = 0;

        const scheduleNext = (delay = 1800 + Math.random() * 2200) => {
            window.clearTimeout(timerId);
            timerId = window.setTimeout(() => {
                if (document.body.classList.contains("has-tool-popover-open")) {
                    scheduleNext(1400);
                    return;
                }

                spawnTraveler();
                if (active < 2 && Math.random() < 0.25) {
                    window.setTimeout(() => {
                        if (!document.body.classList.contains("has-tool-popover-open")) {
                            spawnTraveler(true);
                        }
                    }, 450 + Math.random() * 550);
                }
                scheduleNext();
            }, delay);
        };

        const spawnTraveler = (forceOpposite = false) => {
            if (active >= 2) {
                return;
            }

            const sprite = document.createElement("img");
            const direction = forceOpposite
                ? (Math.random() < 0.5 ? "rtl" : "ltr")
                : (Math.random() < 0.5 ? "ltr" : "rtl");
            const size = 2.8 + (Math.random() * 1.25);
            const lane = 0.2 + (Math.random() * 1.1);
            const duration = 7 + (Math.random() * 4.5);
            const drift = 0.2 + (Math.random() * 0.42);

            sprite.src = sprites[Math.floor(Math.random() * sprites.length)];
            sprite.alt = "";
            sprite.className = `section-traveler ${direction === "ltr" ? "is-left-to-right" : "is-right-to-left"}`;
            sprite.style.setProperty("--traveler-size", `${size}rem`);
            sprite.style.setProperty("--traveler-lane", `${lane}rem`);
            sprite.style.setProperty("--traveler-duration", `${duration}s`);
            sprite.style.setProperty("--traveler-bounce", `${drift}rem`);

            active += 1;
            stage.appendChild(sprite);

            const remove = () => {
                sprite.removeEventListener("animationend", remove);
                sprite.remove();
                active = Math.max(active - 1, 0);
            };

            sprite.addEventListener("animationend", remove);
        };

        scheduleNext(900 + Math.random() * 1200);
    });
}

function bindTableMatchingTools() {
    document.querySelectorAll(".table-match-tool").forEach((tool) => {
        const deck = parseToolData(tool.dataset.tableMatchDeck);
        if (!deck.length) {
            return;
        }

        const board = tool.querySelector("[data-table-match-board]");
        const counter = tool.querySelector("[data-table-match-counter]");
        const status = tool.querySelector("[data-table-match-status]");
        const deckNode = tool.querySelector("[data-table-match-deck]");
        const boardCountNode = tool.querySelector("[data-table-match-board-count]");
        const pairCount = Math.min(4, Math.max(2, Math.floor(deck.length / 2)));
        const totalPairs = deck.length;
        let completed = 0;
        let serial = 0;
        let selected = [];
        let locked = false;
        let queue = shuffleArray(deck.map((item, index) => ({ ...item, pairId: index })));
        let activePairs = [];

        const createCardsForPair = (pair) => {
            serial += 1;
            const rotationA = `${Math.round(Math.random() * 10 - 5)}deg`;
            const rotationB = `${Math.round(Math.random() * 10 - 5)}deg`;
            return [
                {
                    id: `${pair.pairId}-${serial}-term`,
                    pairId: pair.pairId,
                    kind: "term",
                    label: pair.term,
                    rotation: rotationA
                },
                {
                    id: `${pair.pairId}-${serial}-definition`,
                    pairId: pair.pairId,
                    kind: "definition",
                    label: pair.definition,
                    rotation: rotationB
                }
            ];
        };

        const drawPair = () => {
            const next = queue.shift();
            return next ? createCardsForPair(next) : [];
        };

        const refillBoard = (removedIds = []) => {
            let cards = activePairs.filter((card) => !removedIds.includes(card.id));
            while (cards.length < pairCount * 2 && queue.length) {
                cards = [...cards, ...drawPair()];
            }
            activePairs = shuffleArray(cards);
        };

        const render = () => {
            counter.textContent = `Matches: ${completed}`;
            deckNode.textContent = `Deck left: ${queue.length} pairs`;
            boardCountNode.textContent = `On table: ${Math.floor(activePairs.length / 2)} pairs`;
            board.innerHTML = activePairs.map((card) => {
                const isSelected = selected.includes(card.id);
                return `
                    <button
                        type="button"
                        class="table-match-card table-match-card-${card.kind}${isSelected ? " is-selected" : ""}"
                        data-table-card="${card.id}"
                        style="--card-rotate:${card.rotation};"
                    >
                        <span class="table-match-card-text">${card.label}</span>
                    </button>
                `;
            }).join("");
            if (!queue.length && !activePairs.length) {
                status.textContent = `Board clear. ${completed} / ${totalPairs} pairs matched.`;
            }
        };

        const markFeedback = (ids, state) => {
            ids.forEach((id) => {
                const node = board.querySelector(`[data-table-card="${id}"]`);
                if (node) {
                    node.classList.add(state === "correct" ? "is-correct" : "is-incorrect");
                    if (state === "correct") {
                        node.classList.add("is-fading");
                    }
                }
            });
        };

        const resetIncorrect = (ids) => {
            ids.forEach((id) => {
                const node = board.querySelector(`[data-table-card="${id}"]`);
                if (node) {
                    node.classList.remove("is-incorrect", "is-selected");
                }
            });
        };

        refillBoard();
        render();

        tool.addEventListener("click", (event) => {
            const button = event.target.closest("[data-table-card]");
            if (!button || locked) {
                return;
            }

            const id = button.dataset.tableCard;

            if (selected.includes(id)) {
                selected = selected.filter((item) => item !== id);
                render();
                return;
            }

            if (selected.length === 2) {
                return;
            }

            selected = [...selected, id];
            render();

            if (selected.length < 2) {
                return;
            }

            const [firstId, secondId] = selected;
            const first = activePairs.find((card) => card.id === firstId);
            const second = activePairs.find((card) => card.id === secondId);
            const isMatch = first && second && first.pairId === second.pairId && first.kind !== second.kind;
            locked = true;

            if (isMatch) {
                status.textContent = "Match found.";
                markFeedback(selected, "correct");
                window.setTimeout(() => {
                    completed += 1;
                    refillBoard(selected);
                    selected = [];
                    locked = false;
                    status.textContent = queue.length || activePairs.length ? "Find the next pair." : "Board clear.";
                    render();
                }, 420);
                return;
            }

            status.textContent = "Not a match.";
            markFeedback(selected, "incorrect");
            window.setTimeout(() => {
                resetIncorrect(selected);
                selected = [];
                locked = false;
                status.textContent = "Try again.";
                render();
            }, 520);
        });
    });
}

function bindLightningRounds() {
    document.querySelectorAll(".lightning-tool").forEach((tool) => {
        const items = parseToolData(tool.dataset.lightningItems);
        if (!items.length) {
            return;
        }

        let index = 0;
        let score = 0;
        let locked = false;

        const questionNode = tool.querySelector("[data-lightning-question]");
        const optionsNode = tool.querySelector("[data-lightning-options]");
        const feedbackNode = tool.querySelector("[data-lightning-feedback]");
        const counterNode = tool.querySelector("[data-lightning-counter]");
        const scoreNode = tool.querySelector("[data-lightning-score]");
        const nextButton = tool.querySelector("[data-lightning-next]");
        const restartButton = tool.querySelector("[data-lightning-restart]");

        const render = () => {
            const current = items[index];
            const finished = index >= items.length;

            if (finished) {
                questionNode.textContent = `Final Score: ${score} / ${items.length}`;
                optionsNode.innerHTML = "";
                feedbackNode.hidden = false;
                feedbackNode.dataset.state = score >= Math.ceil(items.length * 0.7) ? "correct" : "incorrect";
                feedbackNode.textContent = score >= Math.ceil(items.length * 0.7) ? "Strong run." : "Run it again.";
                counterNode.textContent = `${items.length} / ${items.length}`;
                scoreNode.textContent = `Score: ${score}`;
                nextButton.hidden = true;
                nextButton.classList.remove("is-ready");
                restartButton.hidden = false;
                return;
            }

            questionNode.textContent = current.question;
            optionsNode.innerHTML = current.options.map((option) => `
                <button type="button" class="match-chip lightning-option" data-lightning-option="${escapeAttribute(option)}">${option}</button>
            `).join("");
            counterNode.textContent = `${index + 1} / ${items.length}`;
            scoreNode.textContent = `Score: ${score}`;
            feedbackNode.hidden = true;
            feedbackNode.textContent = "";
            delete feedbackNode.dataset.state;
            nextButton.hidden = true;
            nextButton.classList.remove("is-ready");
            restartButton.hidden = true;
            locked = false;
        };

        tool.addEventListener("click", (event) => {
            const option = event.target.closest("[data-lightning-option]");
            if (option && !locked) {
                locked = true;
                const current = items[index];
                const selected = option.dataset.lightningOption;
                const isCorrect = selected === current.answer;
                if (isCorrect) {
                    score += 1;
                }
                feedbackNode.hidden = false;
                feedbackNode.dataset.state = isCorrect ? "correct" : "incorrect";
                feedbackNode.textContent = isCorrect ? `Correct. ${current.explain}` : `Answer: ${current.answer}. ${current.explain}`;
                nextButton.hidden = false;
                nextButton.classList.add("is-ready");
                return;
            }

            if (event.target.closest("[data-lightning-next]")) {
                index += 1;
                render();
                return;
            }

            if (event.target.closest("[data-lightning-restart]")) {
                index = 0;
                score = 0;
                render();
            }
        });

        render();
    });
}

function bindPracticeLoopTools() {
    document.querySelectorAll(".practice-loop-tool").forEach((tool) => {
        const items = parseToolData(tool.dataset.practiceLoop);
        if (!items.length) {
            return;
        }

        let index = 0;
        let correct = 0;
        let answered = 0;
        let locked = false;

        const questionNode = tool.querySelector("[data-practice-loop-question]");
        const optionsNode = tool.querySelector("[data-practice-loop-options]");
        const feedbackNode = tool.querySelector("[data-practice-loop-feedback]");
        const counterNode = tool.querySelector("[data-practice-loop-counter]");
        const scoreNode = tool.querySelector("[data-practice-loop-score]");
        const nextButton = tool.querySelector("[data-practice-loop-next]");
        const racer = tool.querySelector("[data-practice-racer]");
        const track = tool.querySelector("[data-practice-track]");
        const burst = tool.querySelector("[data-practice-burst]");

        const render = () => {
            const current = items[index];
            questionNode.textContent = current.question;
            const options = shuffleQuestionOptions(current);
            optionsNode.innerHTML = options.map((option) => `
                <button type="button" class="match-chip lightning-option" data-practice-loop-option="${escapeAttribute(option)}">${option}</button>
            `).join("");
            counterNode.textContent = `${index + 1} / ${items.length}`;
            scoreNode.textContent = `Correct: ${correct}`;
            feedbackNode.hidden = true;
            feedbackNode.textContent = "";
            delete feedbackNode.dataset.state;
            nextButton.hidden = true;
            nextButton.classList.remove("is-ready");
            locked = false;
            const progressPercent = (answered / Math.max(items.length, 1)) * 100;
            setCircusTrackProgress(track, racer, progressPercent, false);
        };

        tool.addEventListener("click", (event) => {
            const option = event.target.closest("[data-practice-loop-option]");
            if (option && !locked) {
                locked = true;
                const current = items[index];
                const isCorrect = option.dataset.practiceLoopOption === current.answer;
                answered = Math.min(answered + 1, items.length);
                if (isCorrect) {
                    correct += 1;
                }
                feedbackNode.hidden = false;
                feedbackNode.dataset.state = isCorrect ? "correct" : "incorrect";
                feedbackNode.textContent = isCorrect ? `Correct. ${current.explain}` : `Answer: ${current.answer}. ${current.explain}`;
                scoreNode.textContent = `Correct: ${correct}`;
                const progressPercent = (answered / Math.max(items.length, 1)) * 100;
                setCircusTrackProgress(track, racer, progressPercent, true, () => {
                    nextButton.hidden = false;
                    nextButton.classList.add("is-ready");
                });
                triggerCircusBurst(track, burst, progressPercent, progressPercent >= 100);
                return;
            }

            if (event.target.closest("[data-practice-loop-next]")) {
                index = (index + 1) % items.length;
                if (index === 0 && answered >= items.length) {
                    answered = 0;
                }
                render();
            }
        });

        render();
    });
}

function bindRaceGameTools() {
    document.querySelectorAll(".race-game-tool").forEach((tool) => {
        const source = parseToolData(tool.dataset.raceGame);
        if (!source.length) {
            return;
        }

        let queue = [];
        let lockedIn = 0;
        let locked = false;
        let startedAt = 0;
        let elapsedMs = 0;
        let timerId = 0;

        const questionNode = tool.querySelector("[data-race-question]");
        const optionsNode = tool.querySelector("[data-race-options]");
        const feedbackNode = tool.querySelector("[data-race-feedback]");
        const counterNode = tool.querySelector("[data-race-counter]");
        const scoreNode = tool.querySelector("[data-race-score]");
        const timerNode = tool.querySelector("[data-race-timer]");
        const nextButton = tool.querySelector("[data-race-next]");
        const restartButton = tool.querySelector("[data-race-restart]");
        const racer = tool.querySelector("[data-race-racer]");
        const track = tool.querySelector("[data-race-track]");
        const burst = tool.querySelector("[data-race-burst]");

        const formatRaceTime = (ms) => {
            const totalSeconds = Math.floor(ms / 1000);
            const minutes = Math.floor(totalSeconds / 60);
            const seconds = totalSeconds % 60;
            return `${minutes}:${String(seconds).padStart(2, "0")}`;
        };

        const updateTimer = () => {
            const currentElapsed = startedAt ? elapsedMs + (Date.now() - startedAt) : elapsedMs;
            if (timerNode) {
                timerNode.textContent = `Chariot Clock: ${formatRaceTime(currentElapsed)}`;
            }
        };

        const stopTimer = () => {
            if (startedAt) {
                elapsedMs += Date.now() - startedAt;
                startedAt = 0;
            }
            if (timerId) {
                window.clearInterval(timerId);
                timerId = 0;
            }
            updateTimer();
        };

        const startTimer = () => {
            if (startedAt) {
                return;
            }
            startedAt = Date.now();
            updateTimer();
            timerId = window.setInterval(updateTimer, 1000);
        };

        const updateRacer = () => {
            const progressPercent = (lockedIn / Math.max(source.length, 1)) * 100;
            setCircusTrackProgress(track, racer, progressPercent, false);
        };

        const render = () => {
            if (!queue.length) {
                questionNode.textContent = `Finished: ${lockedIn} / ${source.length}`;
                optionsNode.innerHTML = "";
                feedbackNode.hidden = false;
                feedbackNode.dataset.state = "correct";
                feedbackNode.textContent = `Race complete. Final time: ${formatRaceTime(elapsedMs)}.`;
                counterNode.textContent = `${source.length} / ${source.length}`;
                scoreNode.textContent = `Locked In: ${lockedIn}`;
                nextButton.hidden = true;
                nextButton.classList.remove("is-ready");
                restartButton.hidden = false;
                updateRacer();
                stopTimer();
                triggerCircusBurst(track, burst, 100, true);
                return;
            }

            const current = queue[0];
            questionNode.textContent = current.question;
            const options = shuffleQuestionOptions(current);
            optionsNode.innerHTML = options.map((option) => `
                <button type="button" class="match-chip lightning-option" data-race-option="${escapeAttribute(option)}">${option}</button>
            `).join("");
            counterNode.textContent = `${lockedIn + 1} / ${source.length}`;
            scoreNode.textContent = `Locked In: ${lockedIn}`;
            feedbackNode.hidden = true;
            feedbackNode.textContent = "";
            delete feedbackNode.dataset.state;
            nextButton.hidden = true;
            nextButton.classList.remove("is-ready");
            restartButton.hidden = true;
            locked = false;
            updateRacer();
        };

        const reset = () => {
            stopTimer();
            queue = shuffleArray(source.map((item) => ({ ...item })));
            lockedIn = 0;
            elapsedMs = 0;
            startedAt = 0;
            updateTimer();
            render();
        };

        tool.addEventListener("click", (event) => {
            const option = event.target.closest("[data-race-option]");
            if (option && !locked && queue.length) {
                startTimer();
                locked = true;
                const current = queue[0];
                const isCorrect = option.dataset.raceOption === current.answer;
                if (isCorrect) {
                    lockedIn += 1;
                    queue.shift();
                } else {
                    queue.push(queue.shift());
                }
                feedbackNode.hidden = false;
                feedbackNode.dataset.state = isCorrect ? "correct" : "incorrect";
                feedbackNode.textContent = isCorrect ? `Correct. ${current.explain}` : `Back in the deck. ${current.answer}. ${current.explain}`;
                scoreNode.textContent = `Locked In: ${lockedIn}`;
                const progressPercent = (lockedIn / Math.max(source.length, 1)) * 100;
                setCircusTrackProgress(track, racer, progressPercent, true, () => {
                    if (!queue.length) {
                        render();
                    } else {
                        nextButton.hidden = false;
                        nextButton.classList.add("is-ready");
                    }
                });
                if (isCorrect) {
                    triggerCircusBurst(track, burst, progressPercent, !queue.length);
                }
                if (!queue.length) {
                    return;
                }
                return;
            }

            if (event.target.closest("[data-race-next]")) {
                render();
                return;
            }

            if (event.target.closest("[data-race-restart]")) {
                reset();
            }
        });

        reset();
    });
}

function setCircusTrackProgress(track, racer, progressPercent, animate = false, onSettled) {
    if (track) {
        track.classList.toggle("is-finished", progressPercent >= 100);
    }
    if (!racer) {
        if (onSettled) {
            onSettled();
        }
        return;
    }
    positionCircusNode(track, racer, progressPercent);
    clearTimeout(racer._moveTimer);
    racer.classList.toggle("is-moving", animate);
    if (!animate) {
        if (onSettled) {
            onSettled();
        }
        return;
    }
    racer._moveTimer = window.setTimeout(() => {
        racer.classList.remove("is-moving");
        if (onSettled) {
            onSettled();
        }
    }, 440);
}

function triggerCircusBurst(track, burst, progressPercent, isFinish) {
    if (!burst) {
        return;
    }

    burst.hidden = false;
    positionCircusNode(track, burst, progressPercent);
    burst.classList.remove("is-live", "is-finish");
    void burst.offsetWidth;
    burst.classList.add("is-live");
    if (isFinish) {
        burst.classList.add("is-finish");
    }
    if (track) {
        track.classList.toggle("is-finished", isFinish || progressPercent >= 100);
    }
    clearTimeout(burst._hideTimer);
    burst._hideTimer = window.setTimeout(() => {
        burst.classList.remove("is-live", "is-finish");
        burst.hidden = true;
    }, isFinish ? 900 : 560);
}

function positionCircusNode(track, node, progressPercent) {
    if (!track || !node) {
        return;
    }

    const lane = track.querySelector(".circus-track-lane");
    const laneRect = lane ? lane.getBoundingClientRect() : track.getBoundingClientRect();
    const trackRect = track.getBoundingClientRect();
    const nodeWidth = node.getBoundingClientRect().width || node.offsetWidth || 0;
    const start = laneRect.left - trackRect.left + (nodeWidth / 2);
    const travel = Math.max(laneRect.width - nodeWidth, 0);
    const clamped = Math.min(Math.max(progressPercent, 0), 100) / 100;
    const center = start + (travel * clamped);
    node.style.left = `${center}px`;
}

function bindInlineLaunchers() {
    document.querySelectorAll("[data-inline-launcher]").forEach((root) => {
        const popover = root.querySelector("[data-tool-popover]");
        const dialog = root.querySelector(".tool-popover-dialog");
        let activeKey = "";

        const closePopover = () => {
            activeKey = "";
            root.querySelectorAll("[data-open-inline-tool]").forEach((item) => {
                item.classList.remove("is-active-tool");
            });
            root.querySelectorAll("[data-inline-tool-panel]").forEach((panel) => {
                panel.hidden = true;
            });
            if (popover) {
                popover.hidden = true;
            }
            document.body.classList.remove("has-tool-popover-open");
        };

        root.querySelectorAll("[data-open-inline-tool]").forEach((button) => {
            button.addEventListener("click", () => {
                const key = button.dataset.openInlineTool;
                root.querySelectorAll("[data-open-inline-tool]").forEach((item) => {
                    item.classList.toggle("is-active-tool", item === button);
                });
                root.querySelectorAll("[data-inline-tool-panel]").forEach((panel) => {
                    panel.hidden = panel.dataset.inlineToolPanel !== key;
                });
                activeKey = key;
                if (popover) {
                    popover.hidden = false;
                }
                document.body.classList.add("has-tool-popover-open");
                dialog?.focus();
            });
        });

        root.querySelectorAll("[data-close-inline-tool]").forEach((button) => {
            button.addEventListener("click", closePopover);
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape" && activeKey) {
                closePopover();
            }
        });
    });
}

function bindDropdownPractice() {
    document.querySelectorAll("[data-dropdown-practice]").forEach((root) => {
        const checkButton = root.querySelector("[data-check-dropdowns]");
        const scoreNode = root.querySelector("[data-dropdown-score]");

        if (!checkButton) {
            return;
        }

        checkButton.addEventListener("click", () => {
            const selects = [...root.querySelectorAll(".answer-select")];
            let correct = 0;

            selects.forEach((select) => {
                const feedback = select.closest(".dropdown-question").querySelector("[data-dropdown-feedback]");
                const expected = select.dataset.answer;

                select.classList.remove("is-correct", "is-incorrect");

                if (!select.value) {
                    feedback.hidden = false;
                    feedback.textContent = "Choose an answer first.";
                    feedback.dataset.state = "pending";
                    select.classList.add("is-incorrect");
                    return;
                }

                if (select.value === expected) {
                    correct += 1;
                    feedback.hidden = false;
                    feedback.textContent = "Correct.";
                    feedback.dataset.state = "correct";
                    select.classList.add("is-correct");
                    return;
                }

                feedback.hidden = false;
                feedback.textContent = `Try again. Correct answer: ${expected}`;
                feedback.dataset.state = "incorrect";
                select.classList.add("is-incorrect");
            });

            scoreNode.hidden = false;
            scoreNode.textContent = `You got ${correct} out of ${selects.length}.`;
            scoreNode.dataset.state = correct >= Math.ceil(selects.length * 0.7) ? "correct" : "incorrect";
        });
    });
}

function bindVocabTools() {
    document.querySelectorAll(".vocab-tool").forEach((tool) => {
        const sourceTerms = parseToolData(tool.dataset.toolTerms);
        if (!sourceTerms.length) {
            return;
        }

        let terms = sourceTerms.map((item) => ({ ...item }));
        let index = 0;
        let flipped = false;
        const termNode = tool.querySelector("[data-vocab-term]");
        const detailNode = tool.querySelector("[data-vocab-detail]");
        const exampleNode = tool.querySelector("[data-vocab-example]");
        const counterNode = tool.querySelector("[data-vocab-counter]");
        const cardNode = tool.querySelector("[data-vocab-card]");

        const render = () => {
            const current = terms[index];
            termNode.textContent = current.term;
            detailNode.textContent = current.definition;
            exampleNode.textContent = current.example;
            cardNode.classList.toggle("is-flipped", flipped);
            counterNode.textContent = `${index + 1} / ${terms.length}`;
        };

        cardNode.addEventListener("click", () => {
            flipped = !flipped;
            render();
        });
        tool.querySelector("[data-vocab-prev]").addEventListener("click", () => {
            index = (index - 1 + terms.length) % terms.length;
            flipped = false;
            render();
        });
        tool.querySelector("[data-vocab-next]").addEventListener("click", () => {
            index = (index + 1) % terms.length;
            flipped = false;
            render();
        });
        tool.querySelector("[data-vocab-randomize]")?.addEventListener("click", () => {
            terms = shuffleArray(sourceTerms.map((item) => ({ ...item })));
            index = 0;
            flipped = false;
            render();
        });

        render();
    });
}

function bindMatchingTools() {
    document.querySelectorAll(".matching-tool").forEach((tool) => {
        const pairs = parseToolData(tool.dataset.matchPairs);
        if (!pairs.length) {
            return;
        }

        const leftNode = tool.querySelector("[data-match-left]");
        const rightNode = tool.querySelector("[data-match-right]");
        const feedback = tool.querySelector("[data-match-feedback]");
        let activeLeft = null;
        let remaining = pairs.map((pair, index) => ({ ...pair, index }));

        const render = () => {
            leftNode.innerHTML = remaining.map((pair) => `
                <button type="button" class="match-chip${activeLeft === pair.index ? " is-selected" : ""}" data-left-id="${pair.index}">
                    ${pair.left}
                </button>
            `).join("");
            rightNode.innerHTML = shuffleArray(remaining).map((pair) => `
                <button type="button" class="match-chip" data-right-id="${pair.index}">
                    ${pair.right}
                </button>
            `).join("");
        };

        tool.addEventListener("click", (event) => {
            const leftButton = event.target.closest("[data-left-id]");
            const rightButton = event.target.closest("[data-right-id]");

            if (leftButton) {
                activeLeft = Number(leftButton.dataset.leftId);
                feedback.hidden = true;
                render();
                return;
            }

            if (!rightButton || activeLeft === null) {
                return;
            }

            const rightId = Number(rightButton.dataset.rightId);
            if (rightId === activeLeft) {
                remaining = remaining.filter((pair) => pair.index !== rightId);
                activeLeft = null;
                feedback.hidden = false;
                feedback.textContent = remaining.length ? "Correct match." : "All matches complete.";
                feedback.dataset.state = "correct";
                if (remaining.length) {
                    render();
                } else {
                    leftNode.innerHTML = "";
                    rightNode.innerHTML = "";
                }
                return;
            }

            feedback.hidden = false;
            feedback.textContent = "Not a match. Try again.";
            feedback.dataset.state = "incorrect";
        });

        render();
    });
}

function bindQuickPracticeTools() {
    document.querySelectorAll(".quick-practice-tool").forEach((tool) => {
        const items = parseToolData(tool.dataset.practiceItems);
        if (!items.length) {
            return;
        }

        let index = 0;
        let showing = false;
        const questionNode = tool.querySelector("[data-quick-question]");
        const answerNode = tool.querySelector("[data-quick-answer]");
        const counterNode = tool.querySelector("[data-quick-counter]");
        const toggleButton = tool.querySelector("[data-quick-toggle]");

        const render = () => {
            const current = items[index];
            questionNode.textContent = current.prompt;
            answerNode.textContent = current.answer;
            answerNode.hidden = !showing;
            toggleButton.textContent = showing ? "Hide Answer" : "Show Answer";
            counterNode.textContent = `${index + 1} / ${items.length}`;
        };

        tool.querySelector("[data-quick-next]").addEventListener("click", () => {
            index = (index + 1) % items.length;
            showing = false;
            render();
        });
        toggleButton.addEventListener("click", () => {
            showing = !showing;
            render();
        });

        render();
    });
}

function buildToolMatchingSet(vocab, matching) {
    if (matching.length) {
        return matching[0].pairs.slice(0, 6).map(([left, right]) => ({ left, right }));
    }

    return vocab.slice(0, 6).map((item) => ({
        left: item.term,
        right: item.definition
    }));
}

function buildQuickPractice(vocab, practice) {
    const explicit = practice.map((item) => {
        if (item.type === "mc") {
            return {
                prompt: item.question,
                answer: `${item.choices[item.answerIndex]} ${item.explain ? `- ${item.explain}` : ""}`.trim()
            };
        }

        return {
            prompt: item.question,
            answer: item.sampleStrongAnswer
        };
    });

    if (explicit.length) {
        return explicit;
    }

    return vocab.slice(0, 6).map((item) => ({
        prompt: `What does "${item.term}" mean?`,
        answer: `${item.definition} Example: ${item.example}`
    }));
}

function parseToolData(raw) {
    if (!raw) {
        return [];
    }

    try {
        return JSON.parse(raw);
    } catch {
        return [];
    }
}

function shuffleArray(items) {
    const copy = [...items];
    for (let index = copy.length - 1; index > 0; index -= 1) {
        const swapIndex = Math.floor(Math.random() * (index + 1));
        [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
    }
    return copy;
}

function shuffleQuestionOptions(item) {
    return shuffleArray(item.options);
}

function escapeAttribute(value) {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll("'", "&#39;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;");
}
