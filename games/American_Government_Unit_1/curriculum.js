'use strict';

const data = window.STUDY;
const content = document.getElementById('content');
const esc = value => String(value).replace(/[&<>"']/g, character => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
}[character]));

const CONTENT_GROUPS = [
  {
    title: 'Government Foundations',
    description: 'Why governments form, how laws work, and who holds power.',
    modules: ['1', '2', '3', '4']
  },
  {
    title: 'Road to Independence',
    description: 'How colonial experiences led Americans toward self-rule and independence.',
    modules: ['5', '5x']
  },
  {
    title: 'Founding Ideas and First Government',
    description: 'The ideas behind the Declaration and the nation’s first plan of government.',
    modules: ['6', '7', '8']
  }
];

const lessonLabel = module => module.id === '5x' ? 'Bridge lesson' : `Lesson ${module.id}`;
const reviewLink = module => `midterm_review.html?module=${module.id}`;

function catalog() {
  document.title = 'Lesson Guide | American Government';
  content.innerHTML = `
    <section class="intro">
      <p class="eyebrow">Read · study · practice</p>
      <h1>Lesson Guide</h1>
      <p class="muted">Follow the three sections in order, or search for a lesson or idea.</p>
    </section>
    <label for="search" class="small">Find a lesson or idea</label><br>
    <input class="search" id="search" type="search" placeholder="Search for natural rights or confederation">
    <div id="path"></div>`;

  const render = () => {
    const query = document.getElementById('search').value.trim().toLowerCase();

    document.getElementById('path').innerHTML = CONTENT_GROUPS.map((group, groupIndex) => {
      const lessons = data.modules.filter(module => (
        group.modules.includes(module.id)
        && JSON.stringify([module.title, module.question, module.sections]).toLowerCase().includes(query)
      ));

      if (!lessons.length) return '';

      return `
        <section class="lesson-group" aria-labelledby="lesson-group-${groupIndex}">
          <div class="lesson-group-heading">
            <span class="eyebrow">Section ${groupIndex + 1}</span>
            <h2 class="section-label" id="lesson-group-${groupIndex}">${esc(group.title)}</h2>
            <p class="muted">${esc(group.description)}</p>
          </div>
          <div class="path-grid">
            ${lessons.map(module => `
              <article class="card path-card">
                <span class="eyebrow">${lessonLabel(module)}</span>
                <h3>${esc(module.title)}</h3>
                <p>${esc(module.question)}</p>
                <a class="button" href="curriculum.html?module=${module.id}">Open lesson →</a>
              </article>`).join('')}
          </div>
        </section>`;
    }).join('') || '<p class="callout" role="status">No lessons match. Try a different word.</p>';
  };

  document.getElementById('search').oninput = render;
  render();
}

function lesson(module) {
  document.title = `${module.title} | American Government`;
  const words = data.vocabulary.filter(word => word.module === module.id);
  const index = data.modules.indexOf(module);

  content.innerHTML = `
    <div class="intro">
      <a href="curriculum.html">← Lesson Guide</a>
      <p class="eyebrow lesson-number">${lessonLabel(module)}</p>
      <h1>${esc(module.title)}</h1>
      <h2>${esc(module.question)}</h2>
      <button id="hear" class="read-toggle">Hear this lesson</button>
      <button id="stop" class="read-toggle">Stop reading</button>
    </div>
    <div class="lesson-layout">
      <article class="lesson-copy">
        ${module.sections.map(section => `
          <section class="card">
            <h3>${esc(section.title)}</h3>
            <p>${esc(section.text)}</p>
          </section>`).join('')}
        <section class="card">
          <p class="eyebrow">Practice</p>
          <h3>Answer the lesson question.</h3>
          <p>State your answer. Give one example from the lesson. Explain how the example supports your answer.</p>
          <a class="button primary" href="${reviewLink(module)}">Practice this lesson →</a>
        </section>
        ${module.sources.length ? `
          <section class="card">
            <h3>Read the sources</h3>
            <ul class="source-list">
              ${module.sources.map(source => `<li><a href="${source.url}" target="_blank" rel="noopener">${esc(source.title)}</a></li>`).join('')}
            </ul>
          </section>` : ''}
      </article>
      <aside class="card sticky">
        <p class="eyebrow">Key words</p>
        <h3>Words for this lesson</h3>
        ${words.map(word => `
          <details class="vocab-link">
            <summary>${esc(word.term)}</summary>
            <p>${esc(word.def)}</p>
            <p class="small">${esc(word.example)}</p>
          </details>`).join('')}
        <p class="small" style="margin-top:16px">${data.questions.filter(question => question.module === module.id).length} practice questions in this lesson.</p>
      </aside>
    </div>
    <nav class="lesson-nav" aria-label="Lesson navigation">
      ${index > 0 ? `<a class="button" href="?module=${data.modules[index - 1].id}">← Previous lesson</a>` : '<span></span>'}
      ${index < data.modules.length - 1 ? `<a class="button" href="?module=${data.modules[index + 1].id}">Next lesson →</a>` : ''}
    </nav>`;

  document.getElementById('hear').onclick = () => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const speech = new SpeechSynthesisUtterance([
      module.title,
      module.question,
      ...module.sections.map(section => `${section.title}. ${section.text}`)
    ].join('. '));
    speech.rate = .9;
    window.speechSynthesis.speak(speech);
  };
  document.getElementById('stop').onclick = () => window.speechSynthesis?.cancel();
}

const id = new URLSearchParams(location.search).get('module');
const selectedModule = data.modules.find(module => module.id === id);
if (selectedModule) lesson(selectedModule);
else catalog();

window.addEventListener('pagehide', () => window.speechSynthesis?.cancel());
