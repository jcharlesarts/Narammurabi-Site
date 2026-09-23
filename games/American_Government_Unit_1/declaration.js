'use strict';

const RESPONSE_KEY = 'declaration-reader-responses-v1';
const TEXT_SIZE_KEY = 'declaration-reader-text-size';
const languageLabels = {
  es:'Español / Spanish',
  ar:'العربية / Arabic',
  ps:'پښتو / Pashto',
  so:'Soomaali / Somali',
  sw:'Kiswahili / Swahili'
};
const rtlLanguages = new Set(['ar','ps']);

function renderLanguageHelp(language = document.documentElement.dataset.languageHelp || 'none') {
  document.querySelectorAll('[data-help]').forEach(box => {
    const translated = window.DECLARATION_HELP?.[box.dataset.help]?.[language];
    box.hidden = !translated;
    if (!translated) {
      box.textContent = '';
      box.removeAttribute('lang');
      box.removeAttribute('dir');
      return;
    }
    box.textContent = translated;
    box.dataset.languageLabel = languageLabels[language] || 'Language help';
    box.lang = language;
    box.dir = rtlLanguages.has(language) ? 'rtl' : 'ltr';
  });
}

window.addEventListener('site-language-change', event => renderLanguageHelp(event.detail.language));

function initDeclarationReader() {
  const root = document.documentElement;
  const readButton = document.getElementById('readAloud');
  const stopButton = document.getElementById('stopReading');
  const progressBar = document.getElementById('readingProgress');
  const progressText = document.getElementById('readingProgressText');
  const documentReader = document.getElementById('documentText');
  const responseFields = [...document.querySelectorAll('[data-response]')];
  const saveStatus = document.getElementById('saveStatus');
  let textSize = 18;
  try { textSize = Number(localStorage.getItem(TEXT_SIZE_KEY)) || 18; } catch {}
  let saveTimer;

  const applyTextSize = () => {
    textSize = Math.max(16, Math.min(23, textSize));
    root.style.setProperty('--document-size', `${textSize}px`);
    try { localStorage.setItem(TEXT_SIZE_KEY, textSize); } catch {}
  };
  applyTextSize();

  document.getElementById('decreaseText').addEventListener('click', () => { textSize -= 1; applyTextSize(); });
  document.getElementById('increaseText').addEventListener('click', () => { textSize += 1; applyTextSize(); });

  readButton.addEventListener('click', () => {
    if (!('speechSynthesis' in window)) {
      readButton.textContent = 'Audio unavailable';
      return;
    }
    window.speechSynthesis.cancel();
    const originalText = [
      'In Congress, July 4, 1776.',
      ...documentReader.querySelectorAll('.primary-source,.grievance-list li')
    ].map(item => typeof item === 'string' ? item : item.textContent.trim()).join(' ');
    const speech = new SpeechSynthesisUtterance(originalText);
    speech.rate = .86;
    speech.pitch = 1;
    speech.onstart = () => { readButton.textContent = 'Reading…'; };
    speech.onend = speech.onerror = () => { readButton.textContent = 'Hear the document'; };
    window.speechSynthesis.speak(speech);
  });
  stopButton.addEventListener('click', () => {
    window.speechSynthesis?.cancel();
    readButton.textContent = 'Hear the document';
  });

  const updateProgress = () => {
    const start = documentReader.offsetTop;
    const end = start + documentReader.offsetHeight - window.innerHeight;
    const percentage = end <= start ? 100 : Math.max(0, Math.min(100, Math.round(((window.scrollY - start) / (end - start)) * 100)));
    progressBar.style.width = `${percentage}%`;
    progressText.textContent = `${percentage}%`;
  };
  window.addEventListener('scroll', updateProgress, {passive:true});
  window.addEventListener('resize', updateProgress);
  updateProgress();

  if ('IntersectionObserver' in window) {
    const navLinks = [...document.querySelectorAll('.section-nav a')];
    const byId = new Map(navLinks.map(link => [link.getAttribute('href').slice(1),link]));
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      navLinks.forEach(link => link.removeAttribute('aria-current'));
      byId.get(visible.target.id)?.setAttribute('aria-current','true');
    }, {rootMargin:'-18% 0px -65% 0px',threshold:[0,.2,.5]});
    document.querySelectorAll('[data-section],#responses').forEach(section => observer.observe(section));
  }

  try {
    const saved = JSON.parse(localStorage.getItem(RESPONSE_KEY) || '{}');
    responseFields.forEach(field => { field.value = saved[field.dataset.response] || ''; });
  } catch {}

  const saveResponses = () => {
    const responses = Object.fromEntries(responseFields.map(field => [field.dataset.response,field.value]));
    try {
      localStorage.setItem(RESPONSE_KEY, JSON.stringify(responses));
      saveStatus.textContent = `Saved on this device at ${new Date().toLocaleTimeString([], {hour:'numeric',minute:'2-digit'})}.`;
    } catch {
      saveStatus.textContent = 'This browser could not save your responses.';
    }
  };
  responseFields.forEach(field => field.addEventListener('input', () => {
    saveStatus.textContent = 'Saving…';
    clearTimeout(saveTimer);
    saveTimer = setTimeout(saveResponses, 350);
  }));

  document.getElementById('clearResponses').addEventListener('click', () => {
    if (!window.confirm('Clear all five saved responses on this device?')) return;
    responseFields.forEach(field => { field.value = ''; });
    try { localStorage.removeItem(RESPONSE_KEY); } catch {}
    saveStatus.textContent = 'Responses cleared.';
    responseFields[0].focus();
  });

  const print = responsesOnly => {
    document.body.classList.toggle('print-responses-only', responsesOnly);
    window.print();
  };
  document.getElementById('printReader').addEventListener('click', () => print(false));
  document.getElementById('printResponses').addEventListener('click', () => print(true));
  window.addEventListener('afterprint', () => document.body.classList.remove('print-responses-only'));
  window.addEventListener('pagehide', () => window.speechSynthesis?.cancel());

  renderLanguageHelp();
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initDeclarationReader, {once:true});
else initDeclarationReader();
