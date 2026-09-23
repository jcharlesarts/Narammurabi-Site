# American Government Study Hub

Static HTML/CSS/JavaScript resource aligned to `lesson_data_updated.md`. Open `index.html`, or serve this directory with `python3 -m http.server 8001` and visit `http://localhost:8001/`.

## Content and study boundaries

`study-data.js` is the shared content source for all activities: nine active modules, 59 vocabulary entries, 71 review items, six case files, and nine government-classification scenarios.

- **Lessons 1–5:** the default Quick Review question set.
- **Pre-midterm planned:** the expanded self-rule bridge (`5x`), Enlightenment (6), Declaration (7), and Articles of Confederation (8).
- **Midterm endpoint:** the Articles of Confederation. Convention/compromises and ratification/rights are excluded from all student-facing tools for now.

The midterm cutoff is confirmed through the Articles of Confederation. `STUDY.assessments` defines each review’s included modules independently of instructional status. Merely opening a lesson does not change its status. To activate instruction, update the module status (content inherits it automatically), then change assessment membership as appropriate. Run the content checks afterward. There is no saved student account. Vocabulary Race saves personal-best times and ghost checkpoints locally in this browser; other activities do not track progress across sessions.

## Activities

- `curriculum.html`: searchable learning path, short explanations, vocabulary connections, source links, read-aloud, and targeted practice.
- `quick_review.html` + `review.js` + `review-feedback.js`: lesson selection; 10, 15, or all-question rounds (shorter if the bank is smaller); multiple choice, written explanation/self-assessment, keyboard-accessible ordering, source comparison, evidence follow-up, diagrams and comparison tables; retry scoring, missed-concept practice, and shuffled feedback matched to each question type.
- `who_rules.html`: classification followed by required evidence selection, including constitutional monarchy.
- `case_files.html`: six selectable fictional classroom cases with evidence, citizen voice, and tradeoffs. The meter is an illustrative teaching aid, not an empirical country rating.
- `vocabulary.html`: lesson-set and lesson filters, study cards, three quiz modes, read-aloud, aliases, and language bridges. Existing translations and relevant entries from the supplied glossary are preserved. New terms without translations say so; English remains visible. Closely overlapping concepts are excluded as distractors to reduce ambiguous questions.

Sources are linked alongside historical excerpts. Study paraphrases and fictional perspectives are labeled; they are not presented as quotations. The geography activity is an Atlantic relationship diagram, not a geographic map. The architecture supports diagrams/tables; a detailed 13-colony map can be added if classroom pacing calls for it. Great Awakening is optional background, excluded from the required vocabulary and question banks.

- `vocab_race.html` + `race.js` + `race-core.js`: adapts the Rome helper’s race mechanics. Correct terms advance the racer; misses return to the queue. A stopwatch, personal-best ghost, pause/resume, replay, and missed-word recap support repeated practice. All terms are included by default, with optional module filtering and a randomized 10-word sprint. Cards reshuffle for every race. Bests are keyed to exact course content and clue type. `race-core.js` keeps queue, course, ghost, and storage-validation rules testable.

## Verification

Run `node scripts/check-content.cjs` to validate identifiers, module references, answer keys, required fields, current/planned assessment exclusions, JavaScript syntax in HTML, and local links. Run `node --check review.js` and `node --check curriculum.js` after engine changes. Browser checks cover navigation, scope filters, answer/retry scoring, ordering, evidence follow-up, vocabulary filters, and narrow-screen layouts.

Quick Review feedback checks: `node scripts/check-review-feedback.cjs`.

No build step or external JavaScript libraries are required. Google Fonts are optional enhancements; system-font fallbacks keep the pages usable offline.

Race checks: `node scripts/check-race.cjs` and `node --check race.js`. Browser QA includes recycling a miss, completing a race, ghost replay, pause/resume, and mobile layout.
