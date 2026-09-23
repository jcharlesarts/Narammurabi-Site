'use strict';

(() => {
  const LANGUAGE_KEY = 'american-government-language-help';
  const languages = [
    ['none','English only'],
    ['es','Español / Spanish'],
    ['ar','العربية / Arabic'],
    ['ps','پښتو / Pashto'],
    ['so','Soomaali / Somali'],
    ['sw','Kiswahili / Swahili']
  ];
  const TIER_TWO_COURSE_TERMS = new Set(['leadership','power','authority','representation','independence','grievance']);
  const COURSE_FORMS = {
    government:['governments'], law:['laws'], citizen:['citizens'], autocracy:['autocracies'],
    monarchy:['monarch','monarchies'], dictatorship:['dictatorships'], oligarchy:['oligarchies'],
    democracy:['democracies'], republic:['republics'], authority:['authorities'],
    representation:['representative','representatives'], independence:['independent'],
    grievance:['grievances'], 'social contract':['social-contract'], confederacy:['confederacies']
  };
  const SUPPLEMENTAL_VOCAB = [
    ['Accountability','Being responsible for decisions and answerable for their results.',2,['accountable']],
    ['Abolish','To formally end a system, practice, or institution.',2,['abolished','abolishing']],
    ['Abuse','The harmful or improper use of power.',2,['abuses']],
    ['Adopt','To formally accept or put something into effect.',2,['adopted','adopting']],
    ['Amend','To formally change a law or governing document.',3,['amending','amendment','amendments']],
    ['Authorization','Official permission or approval to act.',2,['authorize','authorized']],
    ['Autonomy','The ability to govern or make decisions for oneself.',2,[]],
    ['Capacity','The ability or power to do something.',2,[]],
    ['Classification','A category used to group something by shared features.',2,['classify','classified']],
    ['Collective','Shared by, involving, or done by a group.',2,[]],
    ['Commerce','The buying, selling, and exchange of goods and services.',3,[]],
    ['Concentrated','Gathered under the control of one person, group, or place.',2,['concentrates','concentration']],
    ['Confederation','A union in which member states keep most governing power.',3,[]],
    ['Conflict','A serious disagreement or struggle between people or groups.',2,['conflicts']],
    ['Consent','Permission or agreement freely given.',2,[]],
    ['Consequence','A result that follows an action or decision.',2,['consequences']],
    ['Consistent','Applied or carried out in the same reliable way.',2,['consistently']],
    ['Constitution','A fundamental set of rules describing how a government works.',3,['constitutions']],
    ['Constrain','To limit what someone or something can do.',2,['constrained','constrains']],
    ['Cooperate','To work together toward a shared goal.',2,['cooperation','coordinated','coordinate','coordination']],
    ['Delegate','A person chosen to represent others, or the act of assigning authority.',2,['delegates','delegating']],
    ['Diplomacy','The management of relationships and negotiations between governments.',3,[]],
    ['Dispute','A disagreement or argument.',2,['disputes']],
    ['Distribution','The way something is divided or spread among people or places.',2,['distribute','distributed']],
    ['Enforce','To make sure a law or rule is followed.',2,['enforced','enforcing','enforcement']],
    ['Equality','The condition of having equal status, rights, or opportunities.',2,[]],
    ['Evidence','Information or facts used to support a claim or conclusion.',2,[]],
    ['Executive','A person or branch responsible for carrying out laws.',3,['executives']],
    ['Framework','A basic structure that organizes a system or idea.',2,['frameworks']],
    ['Fundamental','Basic, central, and necessary to understanding something.',2,[]],
    ['Hereditary','Passed through a family from one generation to the next.',2,[]],
    ['Ideal','A principle or standard viewed as worth trying to achieve.',2,['ideals']],
    ['Influence','The power to affect a person, decision, or result.',2,['influences','influenced']],
    ['Institution','An established organization or part of a political system.',2,['institutions']],
    ['Interstate commerce','Trade or economic activity that crosses state lines.',3,[]],
    ['Legislature','A group with the authority to make laws.',3,['legislatures']],
    ['Legitimate','Accepted as lawful, proper, or justified.',2,['legitimizes','legitimized']],
    ['Northwest Ordinance','A law that created a process for governing and adding western territories to the United States.',3,[]],
    ['Obligation','A duty or responsibility that a person or government is expected to fulfill.',2,['obligations']],
    ['Opposition','People or groups that challenge a leader, policy, or ruling group.',2,[]],
    ['Participation','Taking part in an activity, decision, or government.',2,['participate','participating']],
    ['Parliamentary','Related to a parliament or representative lawmaking body.',3,[]],
    ['Petition','A formal request to a government or other authority.',2,['petitioning','petitions']],
    ['Principle','A basic belief or rule used to guide decisions.',2,['principles']],
    ['Priority','Something judged to be especially important.',2,['priorities']],
    ['Regulation','An official rule used to control an activity.',2,['regulations','regulate','regulated']],
    ['Resolution','A solution to a problem or the act of settling a disagreement.',2,[]],
    ['Retain','To keep or continue to hold something.',2,['retained','retains']],
    ['Shays’ Rebellion','An armed uprising in Massachusetts that exposed weaknesses in the Articles of Confederation.',3,["Shays' Rebellion"]],
    ['Sovereignty','Supreme political authority or the power to govern.',3,[]],
    ['Stability','The condition of being steady, secure, or unlikely to change suddenly.',2,[]],
    ['Suppress','To prevent an action, idea, or group from being expressed or active.',2,['suppressed','suppression']],
    ['Taxation','The collection of money by a government to pay for public purposes.',3,['taxing','taxes']],
    ['Tradeoff','A choice that gains one benefit while giving up another.',2,['tradeoffs']],
    ['Universal','Applying to everyone or every case.',2,[]],
    ['Unrest','Public disorder or dissatisfaction that may lead to protest or conflict.',2,[]],
    ['Violate','To break a law, right, agreement, or important principle.',2,['violated','violates','violation','violations']]
  ];
  const VOCAB_BLOCKED = 'script,style,noscript,textarea,input,select,option,button,label,a,summary,code,pre,svg,.vocab-highlight,.vocab-definition-dialog,.language-access,.sr-only,.translation,[data-no-vocab]';
  let vocabHelper = null;
  let lastVocabTrigger = null;
  const selector = [
    '.example', '.control-help', '.note', '.ghost-label', '.storage-note',
    '.meter-note', '.status', '.evidence-button small', '#quizMode .feedback',
    '#matchMode .feedback', '.game-shell .feedback', '#activity .summary',
    '#activity .feedback', '#ready p:last-child', '#paused p',
    '.review-app .feedback', '.review-app .callout',
    'main:not(.review-app) .callout',
    'main:not(.app):not(.review-app):not(.race-app) .scope-note',
    '.review-app .setup-note', '#raceFeedback', '.intro-help div',
    '.mission-strip p:not(.label)', '.concept-card p:not(.label)',
    '.power-step span', '.game-shell .choice span', '.clue-list',
    '.app > .scope-note'
  ].join(',');

  function wrapText(element) {
    if (element.childNodes.length === 1 && element.firstElementChild?.classList.contains('aux-text')) return;
    const wrapper = document.createElement('span');
    wrapper.className = 'aux-text';
    while (element.firstChild) wrapper.append(element.firstChild);
    element.append(wrapper);
    element.classList.add('aux-zoom');
  }

  function scan(root) {
    if (!(root instanceof Element)) return;
    if (root.matches(selector)) wrapText(root);
    root.querySelectorAll(selector).forEach(wrapText);
  }

  function storedLanguage() {
    try {
      const value = localStorage.getItem(LANGUAGE_KEY);
      return languages.some(([id]) => id === value) ? value : 'none';
    } catch {
      return 'none';
    }
  }

  function saveLanguage(value) {
    try { localStorage.setItem(LANGUAGE_KEY, value); } catch {}
  }

  function addLanguageAccess() {
    if (document.querySelector('.language-access')) return;
    const onVocabularyPage = location.pathname.endsWith('/vocabulary.html') || location.pathname.endsWith('vocabulary.html');
    const onDeclarationPage = location.pathname.endsWith('/declaration.html') || location.pathname.endsWith('declaration.html');
    const languageDescription = onDeclarationPage
      ? 'English stays visible. Your choice adds translated section guides and available vocabulary translations on this page.'
      : 'English stays visible. Your choice follows you across the study tools. Translated key terms appear in Vocabulary Study Cards.';
    const details = document.createElement('details');
    details.className = 'language-access';
    details.innerHTML = `<summary><span class="language-access-icon" aria-hidden="true">文/A</span><span class="language-access-label"><strong>Language help</strong><small id="siteLanguageStatus">English only</small></span></summary><div class="language-access-panel"><label for="siteLanguageSelect">Choose your language</label><select id="siteLanguageSelect">${languages.map(([id,label])=>`<option value="${id}">${label}</option>`).join('')}</select><p>${languageDescription}</p><p class="vocab-help-tip"><span class="vocab-key">Vocabulary</span> Click any highlighted word for its definition.</p>${onVocabularyPage?'':'<a href="vocabulary.html">Open translated vocabulary →</a>'}</div>`;
    const header = document.querySelector('main header') || document.querySelector('header');
    if (header) {
      header.classList.add('has-language-access');
      header.append(details);
    } else document.body.prepend(details);
    const select = details.querySelector('#siteLanguageSelect');
    const status = details.querySelector('#siteLanguageStatus');
    const apply = value => {
      const language = languages.some(([id]) => id === value) ? value : 'none';
      const label = languages.find(([id]) => id === language)[1];
      select.value = language;
      status.textContent = label;
      document.documentElement.dataset.languageHelp = language;
      window.dispatchEvent(new CustomEvent('site-language-change', { detail:{ language,label } }));
    };
    select.addEventListener('change', () => { saveLanguage(select.value); apply(select.value); });
    document.addEventListener('click', event => { if (details.open && !details.contains(event.target)) details.open = false; });
    details.addEventListener('keydown', event => { if (event.key === 'Escape') { details.open = false; details.querySelector('summary').focus(); } });
    apply(storedLanguage());
  }

  function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\s+/g, '\\s+');
  }

  function normalizeVocabForm(value) {
    return String(value).toLocaleLowerCase().replace(/\s+/g,' ').trim();
  }

  function buildVocabHelper() {
    const course = Array.isArray(window.STUDY?.vocabulary) ? window.STUDY.vocabulary : [];
    if (!course.length) return null;
    const entries = course.map(word => ({
      term:word.term,
      definition:word.def,
      example:word.example,
      translations:word.tr || {},
      tier:TIER_TWO_COURSE_TERMS.has(word.term.toLowerCase()) ? 2 : 3,
      forms:[word.term,...(word.aliases || []),...(COURSE_FORMS[word.term.toLowerCase()] || [])]
    }));
    SUPPLEMENTAL_VOCAB.forEach(([term,definition,tier,forms]) => entries.push({term,definition,tier,forms:[term,...forms],translations:{}}));
    const pageVocabulary = Array.isArray(window.PAGE_VOCAB) ? window.PAGE_VOCAB : [];
    pageVocabulary.forEach(word => entries.push({
      term:word.term,
      definition:word.definition || word.def,
      example:word.example,
      translations:word.translations || word.tr || {},
      tier:word.tier || 2,
      forms:[word.term,...(word.forms || []),...(word.aliases || [])]
    }));
    const byForm = new Map();
    entries.forEach(entry => entry.forms.forEach(form => { if (form) byForm.set(normalizeVocabForm(form),entry); }));
    const forms = [...byForm.keys()].sort((a,b) => b.length-a.length).map(escapeRegExp);
    return {entries,byForm,pattern:new RegExp(`(^|[^\\p{L}\\p{N}’'-])(${forms.join('|')})(?=$|[^\\p{L}\\p{N}’'-])`,'giu')};
  }

  function canHighlight(node) {
    const parent = node.parentElement;
    return parent && node.nodeValue?.trim() && !parent.closest(VOCAB_BLOCKED);
  }

  function highlightTextNode(node) {
    if (!vocabHelper || !canHighlight(node)) return;
    const text = node.nodeValue;
    const pattern = vocabHelper.pattern;
    pattern.lastIndex = 0;
    if (!pattern.test(text)) return;
    pattern.lastIndex = 0;
    const fragment = document.createDocumentFragment();
    let cursor = 0;
    for (const match of text.matchAll(pattern)) {
      const prefix = match[1] || '';
      const displayed = match[2];
      const termStart = match.index + prefix.length;
      if (termStart > cursor) fragment.append(text.slice(cursor,termStart));
      const entry = vocabHelper.byForm.get(normalizeVocabForm(displayed));
      if (!entry) continue;
      const highlight = document.createElement('span');
      highlight.className = 'vocab-highlight';
      highlight.dataset.vocabTerm = entry.term;
      highlight.tabIndex = 0;
      highlight.setAttribute('role','button');
      highlight.setAttribute('aria-label',`${displayed}: open definition`);
      highlight.title = 'Click for definition';
      highlight.textContent = displayed;
      fragment.append(highlight);
      cursor = termStart + displayed.length;
    }
    if (!cursor) return;
    fragment.append(text.slice(cursor));
    node.replaceWith(fragment);
  }

  function highlightVocabulary(root) {
    if (!vocabHelper || !root) return;
    if (root.nodeType === Node.TEXT_NODE) { highlightTextNode(root); return; }
    if (!(root instanceof Element) || root.closest?.(VOCAB_BLOCKED)) return;
    const walker = document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
    const nodes=[];
    while(walker.nextNode()) if(canHighlight(walker.currentNode)) nodes.push(walker.currentNode);
    nodes.forEach(highlightTextNode);
  }

  function ensureVocabDialog() {
    let dialog = document.getElementById('vocabDefinitionDialog');
    if (dialog?.querySelector('.vocab-dialog-heading')) return dialog;
    if (dialog) dialog.remove();
    dialog = document.createElement('dialog');
    dialog.id = 'vocabDefinitionDialog';
    dialog.className = 'vocab-definition-dialog';
    dialog.setAttribute('aria-labelledby','vocabDefinitionTitle');
    dialog.setAttribute('aria-live','polite');
    dialog.innerHTML = `<div class="vocab-dialog-heading"><div><p class="vocab-dialog-kicker">Vocabulary assistant</p><h2 id="vocabDefinitionTitle"></h2></div><button class="vocab-dialog-close" type="button" aria-label="Close definition">×</button></div><p class="vocab-definition" id="vocabDefinitionText"></p><p class="vocab-translation" id="vocabDefinitionTranslation" hidden></p><p class="vocab-example" id="vocabDefinitionExample" hidden></p>`;
    document.body.append(dialog);
    const close = () => { if (typeof dialog.close === 'function') dialog.close(); else dialog.removeAttribute('open'); };
    dialog.querySelector('.vocab-dialog-close').addEventListener('click',close);
    dialog.addEventListener('close',() => lastVocabTrigger?.focus());
    return dialog;
  }

  function showVocabDefinition(trigger) {
    const entry = vocabHelper?.byForm.get(normalizeVocabForm(trigger.dataset.vocabTerm));
    if (!entry) return;
    lastVocabTrigger = trigger;
    const dialog = ensureVocabDialog();
    dialog.querySelector('#vocabDefinitionTitle').textContent = entry.term;
    dialog.querySelector('#vocabDefinitionText').textContent = entry.definition;
    const language = document.documentElement.dataset.languageHelp || storedLanguage();
    const translation = entry.translations?.[language];
    const translationBox = dialog.querySelector('#vocabDefinitionTranslation');
    translationBox.hidden = !translation;
    if (translation) {
      translationBox.textContent = `${languages.find(([id])=>id===language)?.[1] || 'Translation'}: ${translation}`;
      translationBox.dir = ['ar','ps'].includes(language) ? 'rtl' : 'ltr';
      translationBox.lang = language;
    }
    const example = dialog.querySelector('#vocabDefinitionExample');
    example.hidden = !entry.example;
    if(entry.example) example.textContent = `Example: ${entry.example}`;
    if (!dialog.open) {
      if (typeof dialog.show === 'function') dialog.show();
      else dialog.setAttribute('open','');
    }
    trigger.focus({preventScroll:true});
  }

  function initVocabHighlights() {
    vocabHelper = buildVocabHelper();
    if (!vocabHelper) return;
    document.addEventListener('click',event => {
      const trigger = event.target.closest?.('.vocab-highlight');
      if (!trigger) return;
      event.preventDefault();
      event.stopPropagation();
      showVocabDefinition(trigger);
    },true);
    document.addEventListener('keydown',event => {
      const openDialog = document.getElementById('vocabDefinitionDialog');
      if (event.key === 'Escape' && openDialog?.open) {
        event.preventDefault();
        if (typeof openDialog.close === 'function') openDialog.close();
        else openDialog.removeAttribute('open');
        return;
      }
      const trigger = event.target.closest?.('.vocab-highlight');
      if (!trigger || !['Enter',' '].includes(event.key)) return;
      event.preventDefault();
      event.stopPropagation();
      showVocabDefinition(trigger);
    },true);
  }

  function start() {
    addLanguageAccess();
    initVocabHighlights();
    scan(document.body);
    highlightVocabulary(document.body);
    new MutationObserver(records => {
      for (const record of records) {
        scan(record.target);
        highlightVocabulary(record.target);
        record.addedNodes.forEach(scan);
        record.addedNodes.forEach(highlightVocabulary);
      }
    }).observe(document.body, { childList:true, subtree:true });
  }

  if (document.readyState === 'complete') start();
  else document.addEventListener('DOMContentLoaded', start, { once:true });
})();
