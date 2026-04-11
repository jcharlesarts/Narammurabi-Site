(function () {
  // --- Badge helper ---
  function awardTitleFromEvents(name) {
    try {
      window.honoraryTitles = window.honoraryTitles || [];
      if (!window.honoraryTitles.includes(name)) {
        window.honoraryTitles.push(name);
        if (typeof delayedLog === "function") {
          delayedLog(`🏅 Honorary Title Earned: <span class="honorary-title-badge">${name}</span>`, "log-positive");
        }
      }
      if (typeof updateScoreboard === "function") updateScoreboard();
    } catch (e) {
      console.warn("awardTitleFromEvents error:", e);
    }
  }

  // Expose event data globally (safety)
  try {
    if (typeof window.randomEventTrees === 'undefined' && typeof randomEventTrees !== 'undefined') {
      window.randomEventTrees = randomEventTrees;
    }
  } catch (e) {
    console.error("Failed to export randomEventTrees:", e);
  }

  let resumeCb = null;

  // --- Non-repeatable events: played set + helpers ---
  try { window._playedEventTrees = window._playedEventTrees || new Set(); } catch (_) { /* no-op */ }
  let currentKey = null;
  let currentTree = null;
  function markCompleted(tree, key) {
    try {
      if (!tree) return;
      tree._completed = true;
      tree._lastPlayedAt = Date.now ? Date.now() : (tree._lastPlayedAt || 1);
      if (window._playedEventTrees && key) window._playedEventTrees.add(key);
    } catch (_) { /* no-op */ }
  }
  function isPlayedKey(trees, k) {
    const t = trees && trees[k];
    const inSet = !!(window._playedEventTrees && window._playedEventTrees.has(k));
    return !!(inSet || (t && t._completed));
  }

  // --- Condition helpers ---
  if (typeof window.hasBadge !== "function") {
    window.hasBadge = function(name) {
      try { return Array.isArray(window.honoraryTitles) && window.honoraryTitles.includes(name); }
      catch (_) { return false; }
    };
  }
  if (typeof window.hasLoot !== "function") {
    window.hasLoot = function(name) {
      try { return Array.isArray(window.inventory) && window.inventory.includes(name); }
      catch (_) { return false; }
    };
  }

  // --- Composable condition evaluator ---
  function evalCondition(cond) {
    try {
      if (cond == null) return true;                 // undefined / null = allowed
      if (typeof cond === "boolean") return cond;    // boolean literal
      if (typeof cond === "function") return !!cond();
      if (Array.isArray(cond)) {                      // array => ALL by default
        return cond.every(c => evalCondition(c));
      }
      if (typeof cond === "object") {
        // Logical composition
        if (cond.any) return cond.any.some(c => evalCondition(c));
        if (cond.all) return cond.all.every(c => evalCondition(c));
        if (cond.not) return !evalCondition(cond.not);

        // Badge / Loot primitives
        if (cond.badge)    return !!(window.hasBadge && window.hasBadge(cond.badge));
        if (cond.notBadge) return !(window.hasBadge && window.hasBadge(cond.notBadge));
        if (cond.loot)     return !!(window.hasLoot  && window.hasLoot(cond.loot));
        if (cond.notLoot)  return !(window.hasLoot  && window.hasLoot(cond.notLoot));

        // Collections
        if (cond.anyBadges) return (cond.anyBadges || []).some(b => window.hasBadge && window.hasBadge(b));
        if (cond.allBadges) return (cond.allBadges || []).every(b => window.hasBadge && window.hasBadge(b));
        if (cond.anyLoot)   return (cond.anyLoot   || []).some(l => window.hasLoot  && window.hasLoot(l));
        if (cond.allLoot)   return (cond.allLoot   || []).every(l => window.hasLoot  && window.hasLoot(l));

        // Simple stat gates (optional, future-proof)
        const val = (name) => (typeof window[name] === 'number') ? window[name] : 0;
        if (typeof cond.minUnrest   === 'number' && val('unrest')   < cond.minUnrest)   return false;
        if (typeof cond.maxUnrest   === 'number' && val('unrest')   > cond.maxUnrest)   return false;
        if (typeof cond.minPolitics === 'number' && val('politics') < cond.minPolitics) return false;
        if (typeof cond.maxPolitics === 'number' && val('politics') > cond.maxPolitics) return false;
        if (typeof cond.minTreasury === 'number' && val('treasury') < cond.minTreasury) return false;
        if (typeof cond.maxTreasury === 'number' && val('treasury') > cond.maxTreasury) return false;

        // Unknown object shape: allow by default
        return true;
      }
      return !!cond; // truthy fallback
    } catch (_) { return false; }
  }

  // --- Derive a human-readable hint for a condition ---
  function conditionHint(cond) {
    try {
      if (!cond) return "Requires prerequisite";
      if (typeof cond === 'function') return "Requires prerequisite";
      if (Array.isArray(cond)) return cond.map(conditionHint).join(" + ");
      if (typeof cond === 'object') {
        if (cond.badge) return `Requires badge: ${cond.badge}`;
        if (cond.loot) return `Requires loot: ${cond.loot}`;
        if (cond.anyBadges) return `Requires any badge: ${cond.anyBadges.join(', ')}`;
        if (cond.allBadges) return `Requires all badges: ${cond.allBadges.join(', ')}`;
        if (cond.anyLoot) return `Requires any loot: ${cond.anyLoot.join(', ')}`;
        if (cond.allLoot) return `Requires all loot: ${cond.allLoot.join(', ')}`;
        if (cond.any) return `Requires: any of (${cond.any.map(conditionHint).join('; ')})`;
        if (cond.all) return `Requires: all of (${cond.all.map(conditionHint).join('; ')})`;
        if (cond.not) return `Requires NOT: (${conditionHint(cond.not)})`;
      }
      return "Requires prerequisite";
    } catch (_) {
      return "Requires prerequisite";
    }
  }

  function statValue(name) {
    try {
      return (typeof window[name] === 'number') ? window[name] : 0;
    } catch (_) {
      return 0;
    }
  }
  function clampNumber(value, min, max) {
    if (typeof min === 'number' && value < min) return min;
    if (typeof max === 'number' && value > max) return max;
    return value;
  }
  function resolveRollResult(rollSpec) {
    if (!rollSpec || typeof rollSpec !== 'object') return { result: null, roll: null };
    const outcomes = Array.isArray(rollSpec.outcomes)
      ? rollSpec.outcomes
      : (Array.isArray(rollSpec.rng) ? rollSpec.rng : []);
    if (!outcomes.length) return { result: null, roll: null };
    const sides = Number.isFinite(rollSpec.sides) ? Math.max(1, Math.floor(rollSpec.sides)) : 100;
    const base = Math.floor(Math.random() * sides) + 1;
    let mod = Number.isFinite(rollSpec.base) ? rollSpec.base : 0;
    const modifiers = Array.isArray(rollSpec.modifiers) ? rollSpec.modifiers : [];
    modifiers.forEach((m) => {
      if (!m || typeof m !== 'object') return;
      if (m.condition && !evalCondition(m.condition)) return;
      if (m.loot && !(window.hasLoot && window.hasLoot(m.loot))) return;
      if (m.badge && !(window.hasBadge && window.hasBadge(m.badge))) return;
      if (m.anyLoot && !((m.anyLoot || []).some(l => window.hasLoot && window.hasLoot(l)))) return;
      if (m.allLoot && !((m.allLoot || []).every(l => window.hasLoot && window.hasLoot(l)))) return;
      if (m.anyBadges && !((m.anyBadges || []).some(b => window.hasBadge && window.hasBadge(b)))) return;
      if (m.allBadges && !((m.allBadges || []).every(b => window.hasBadge && window.hasBadge(b)))) return;
      if (typeof m.stat === 'string') {
        const scale = Number.isFinite(m.scale) ? m.scale : 1;
        mod += statValue(m.stat) * scale;
      }
      if (Number.isFinite(m.add)) mod += m.add;
    });
    const min = Number.isFinite(rollSpec.min) ? rollSpec.min : 1;
    const max = Number.isFinite(rollSpec.max) ? rollSpec.max : sides;
    const total = clampNumber(base + mod, min, max);
    let chosen = null;
    for (const entry of outcomes) {
      const rMin = (entry && typeof entry.min === 'number') ? entry.min : 1;
      const rMax = (entry && typeof entry.max === 'number') ? entry.max : sides;
      if (total >= rMin && total <= rMax) {
        chosen = entry.result || entry;
        break;
      }
    }
    if (!chosen && outcomes.length) chosen = outcomes[0].result || outcomes[0];
    if (rollSpec.debug) {
      console.debug("Event roll", { base, mod, total, sides, rollSpec });
    }
    return { result: chosen, roll: { base, mod, total, sides } };
  }
  function pickWeightedIndex(entries) {
    if (!Array.isArray(entries) || !entries.length) return -1;
    const weights = entries.map((entry) => {
      const wRaw = (entry && (entry.weight ?? entry.chance)) ?? 1;
      return Math.max(0, Number(wRaw) || 0);
    });
    const total = weights.reduce((sum, w) => sum + w, 0);
    if (!total) return -1;
    let r = Math.random() * total;
    for (let i = 0; i < entries.length; i += 1) {
      r -= weights[i];
      if (r <= 0) return i;
    }
    return entries.length - 1;
  }
  function normalizeLootTable(table) {
    if (!table) return null;
    if (Array.isArray(table)) {
      return { entries: table, picks: 1, unique: true, silent: false };
    }
    if (typeof table === 'object') {
      return {
        entries: Array.isArray(table.entries) ? table.entries : [],
        picks: Number.isFinite(table.picks) ? table.picks : 1,
        unique: table.unique !== false,
        silent: !!table.silent
      };
    }
    return null;
  }

  // --- Event runner (modal-based) ---
  function startRandomEventTree(key, onResume) {
    try {
      // No auto-close: gameplay resumes via the Continue button only
      // Global one-shot suppression + cooldown guard
      window.EventTrees = window.EventTrees || {};
      const nowTs = Date.now ? Date.now() : 0;
      if (window.EventTrees._suppressNextOnce) {
        window.EventTrees._suppressNextOnce = false;
        if (typeof onResume === 'function') { const cb = onResume; setTimeout(cb, 0); }
        return;
      }
      if (window.EventTrees._blockUntil && nowTs < window.EventTrees._blockUntil) {
        if (typeof onResume === 'function') { const cb = onResume; setTimeout(cb, 0); }
        return;
      }
      resumeCb = (typeof onResume === "function") ? onResume : null;
      const trees = window.randomEventTrees || {};
      const tree = trees[key];
      if (!tree) { console.warn("startRandomEventTree: event key not found:", key); return; }
      // Requirement guard: if meta.requires exists and fails, do not start
      try {
        const meta = (tree && tree.meta) || {};
        if (meta && meta.requires && typeof evalCondition === 'function') {
          if (!evalCondition(meta.requires)) {
            console.warn("startRandomEventTree: requirements not met:", key);
            if (typeof onResume === 'function') { const cb = onResume; setTimeout(cb, 0); }
            return;
          }
        }
      } catch (_) {}
      currentKey = key;
      currentTree = tree;
      if (tree && isPlayedKey(trees, key)) {
        console.warn("startRandomEventTree: event already completed, skipping:", key);
        if (typeof onResume === 'function') { const cb = onResume; setTimeout(cb, 0); }
        return;
      }

      // Prefer dedicated Event Tree modal, fallback to random-event modal
      const modal    = document.getElementById("event-tree-modal") || document.getElementById("random-event-modal");
      const content  = modal ? (modal.querySelector('.event-tree-content') || modal.querySelector('.random-event-content')) : null;
      const descEl   = document.getElementById("event-tree-desc") || document.getElementById("random-event-desc");
      const cameoEl  = document.getElementById("event-tree-cameo") || document.getElementById("random-event-cameo");
      const closeBtn = document.getElementById("event-tree-close-btn") || document.getElementById("random-event-close-btn");

      // Ensure a stable default label for the Continue button so per-event labels don't leak
      try {
        if (closeBtn) {
          // Force a stable default on each start to prevent leaked labels from prior events
          closeBtn.dataset.defaultLabel = "Continue";
          // Reset button text to default at the start of each event
          closeBtn.textContent = closeBtn.dataset.defaultLabel;
        }
      } catch (_) {}

      // fallback if modal isn’t in DOM
      if (!modal || !descEl || !closeBtn || !content) {
        const first = tree.steps && tree.steps[0];
        if (first && typeof delayedLog === "function") delayedLog(first.text, "log-event");
        if (resumeCb) { const cb = resumeCb; resumeCb = null; setTimeout(cb, 0); }
        return;
      }

      function clearOptions() {
        const priorAll = (content || modal).querySelectorAll(".event-options");
        priorAll.forEach(el => el.remove());
      }

      function awardLootItem(item, opts = {}) {
        if (!item) return;
        const items = Array.isArray(item) ? item : [item];
        items.forEach((loot) => {
          if (!loot) return;
          window.inventory = window.inventory || [];
          if (!window.inventory.includes(loot)) {
            window.inventory.push(loot);
            if (!opts.silent && typeof delayedLog === "function") {
              const isEvidence = typeof window.isEvidenceItem === "function"
                ? window.isEvidenceItem(loot)
                : false;
              const label = isEvidence ? "📜 Evidence recorded" : "🎒 Loot acquired";
              delayedLog(`${label}: ${loot}`, "log-positive");
            }
          }
        });
      }

      function applyResult(result) {
        try {
          if (typeof result.effect === "function") result.effect();
          if (result.badge) {
            if (Array.isArray(result.badge)) result.badge.forEach(b => awardTitleFromEvents(b));
            else awardTitleFromEvents(result.badge);
          }
          if (result.loot) {
            awardLootItem(result.loot);
          }
          if (result.lootTable) {
            const table = normalizeLootTable(result.lootTable);
            if (table && table.entries && table.entries.length) {
              let entries = table.entries.slice();
              const rawPicks = Number.isFinite(table.picks) ? Math.floor(table.picks) : 1;
              const picks = Math.max(0, rawPicks);
              for (let i = 0; i < picks; i += 1) {
                const idx = pickWeightedIndex(entries);
                if (idx < 0) break;
                const entry = entries[idx] || {};
                const item = (entry.item != null) ? entry.item : entry.loot;
                if (item) awardLootItem(item, { silent: !!entry.silent || table.silent });
                if (table.unique) entries.splice(idx, 1);
              }
            }
          }
          if (typeof updateScoreboard === "function") updateScoreboard();
          // Respect one-shot suppression of random chaining and apply a brief cooldown to avoid race re-entry
          try {
            if (result && result.suppressNextRandom === true) {
              window.EventTrees = window.EventTrees || {};
              window.EventTrees._suppressNextOnce = true; // one-shot block
              // also apply a brief cooldown window to avoid race re-entry
              const nowTs2 = Date.now ? Date.now() : 0;
              window.EventTrees._blockUntil = Math.max(window.EventTrees._blockUntil || 0, nowTs2 + 600);
            }
          } catch (_) {}
          if (result && result.nextStep == null) {
            clearOptions();
            markCompleted(currentTree, currentKey);
          }
        } catch (e) { console.warn("applyResult error:", e); }
      }

      function finishAndClose() {
        clearOptions();
        // brief cooldown to prevent immediate re-entry
        try {
          window.EventTrees = window.EventTrees || {};
          const nowTs3 = Date.now ? Date.now() : 0;
          window.EventTrees._blockUntil = Math.max(window.EventTrees._blockUntil || 0, nowTs3 + 600);
        } catch(_) {}
        // Ensure the current tree is marked completed on close
        try { if (currentTree && !currentTree._completed) markCompleted(currentTree, currentKey); } catch(_) {}
        modal.classList.add("hidden");
        // End story music when returning to gameplay; gameplay can resume music later if needed.
        try { if (typeof window.stopAllMusic === 'function') window.stopAllMusic(); } catch(_) {}
        // Reset continue button label, preserving a default in data attribute
        try {
          if (closeBtn) {
            if (!closeBtn.dataset.defaultLabel) closeBtn.dataset.defaultLabel = closeBtn.textContent || "Continue";
            closeBtn.textContent = closeBtn.dataset.defaultLabel;
          }
        } catch (_) {}
        const cb = resumeCb; resumeCb = null;
        setTimeout(() => {
          if (cb) cb();
          try { if (typeof window.resumeCurrentMusic === 'function') window.resumeCurrentMusic(); } catch(_) {}
        }, 0);
      }

      function renderStep(i) {
        const step = (tree.steps || [])[i];
        if (!step) { finishAndClose(); return; }

        // If the step has a condition and it fails, skip forward to the next eligible step
        if (typeof step.condition !== 'undefined' && !evalCondition(step.condition)) {
          let j = i + 1; const len = (tree.steps || []).length;
          while (j < len) {
            const st = tree.steps[j];
            if (!st || typeof st.condition === 'undefined' || evalCondition(st.condition)) break;
            j++;
          }
          if (j < len) { renderStep(j); } else { finishAndClose(); }
          return;
        }

        // Body + cameo
        if (descEl) descEl.innerHTML = step.text || "";
        if (cameoEl) cameoEl.textContent = step.cameo || "";

        // Options (filtered by conditions, with optional locked hints)
        clearOptions();
        const allOptions = Array.isArray(step.options) ? step.options : [];
        const available = allOptions.filter(opt => evalCondition(opt.condition));
        const showLocked = !!(window.EventTrees && window.EventTrees.showLocked);
        const locked = showLocked ? allOptions.filter(opt => !evalCondition(opt.condition)) : [];
        const wrap = document.createElement("div");
        wrap.className = "event-options";
        // Determine if there are any options at all (available or locked)
        const hasAnyOptions = allOptions.length > 0;
        const hasAvailable = available.length > 0;
        // Continue button visibility/behavior
        if (closeBtn) {
          // If there are available options, hide the generic Continue until a result is shown.
          if (hasAvailable) {
            closeBtn.style.display = "none";
            closeBtn.onclick = null;
          } else {
            // If there are no available options (either none at all or only locked),
            // allow the player to advance to the next step or finish the tree.
            closeBtn.style.display = "";
            try {
              closeBtn.textContent = (step && step.continueLabel)
                ? step.continueLabel
                : (closeBtn.dataset.defaultLabel || "Continue");
            } catch (_) {}
            closeBtn.onclick = () => {
              const nextIdx = i + 1;
              const hasNext = !!((tree.steps || [])[nextIdx]);
              if (hasNext) renderStep(nextIdx); else finishAndClose();
            };
          }
        }

        // Render available option buttons
        available.forEach(opt => {
          const btn = document.createElement("button");
          btn.className = "problem-option-btn";
          btn.type = "button";
          btn.textContent = opt.label || "Option";
          btn.addEventListener("click", () => {
            let result = null;
            if (opt.fixed) {
              result = opt.fixed;
            } else if (opt.roll) {
              const resolved = resolveRollResult(opt.roll);
              result = resolved && resolved.result ? resolved.result : null;
            } else if (opt.rng && Array.isArray(opt.rng)) {
              const roll = Math.floor(Math.random() * 100) + 1;
              for (const r of opt.rng) {
                if (roll >= (r.min ?? 1) && roll <= (r.max ?? 100)) {
                  result = r.result || r; break;
                }
              }
              if (!result && opt.rng.length) {
                result = opt.rng[0].result || opt.rng[0];
              }
            }
            if (result) {
              applyResult(result);
              if (descEl) descEl.innerHTML = result.text || "";
              // Remove choice buttons after deciding
              clearOptions();
              // Reveal the generic Continue button now that a result is showing
              if (closeBtn) {
                closeBtn.style.display = "";
                // Allow per-result label override
                try { closeBtn.textContent = (result && result.continueLabel) ? result.continueLabel : (closeBtn.dataset.defaultLabel || "Continue"); } catch (_) {}
                if (result.nextStep == null) {
                  closeBtn.onclick = finishAndClose;
                } else {
                  closeBtn.onclick = () => renderStep(result.nextStep);
                }
                closeBtn.focus();
              }
            }
          });
          wrap.appendChild(btn);
        });

        // Render locked choices as disabled with a hint (if enabled)
        if (locked.length) {
          locked.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'problem-option-btn option-locked';
            btn.type = 'button';
            btn.disabled = true;
            const hint = conditionHint(opt.condition);
            btn.textContent = `🔒 ${opt.label || 'Locked option'}`;
            if (hint) btn.title = hint;
            wrap.appendChild(btn);
          });
        }

        // Always render the button row if there are any options (even if only locked)
        if (content && hasAnyOptions) content.appendChild(wrap);
        modal.classList.remove("hidden");
        // Switch to Event Story music once, after the modal is visible.
        if (i === 0) {
          try { if (typeof window.resumeCurrentMusic === 'function') window.resumeCurrentMusic(); } catch(_) {}
        }
        // Show the close button only if there are no options at all (not even locked), or after a result is chosen
        if (!hasAnyOptions && closeBtn) {
          closeBtn.style.display = "";
          // Allow per-step label override
          try { closeBtn.textContent = (step && step.continueLabel) ? step.continueLabel : (closeBtn.dataset.defaultLabel || "Continue"); } catch (_) {}
          closeBtn.focus();
        }
      }

      renderStep(0);
    } catch (e) {
      console.error("startRandomEventTree error:", e);
    }
  }

  // --- Weighted picker & eligibility helpers for arc-based pools ---
  function getMeta(t){ try { return (t && t.meta) || {}; } catch(_) { return {}; } }
  function eligibleKeysByArc(trees, arcTag) {
    const keys = Object.keys(trees || {});
    const out = [];
    for (const k of keys) {
      const t = trees[k]; if (!t) continue;
      const m = getMeta(t);
      const enabled = (m.enabled !== false);
      if (!enabled) continue;
      if (isPlayedKey(trees, k)) continue;
      if (arcTag && Array.isArray(m.tags) && m.tags.length) {
        if (!m.tags.includes(arcTag)) continue;
      }
      // If there are meta requirements, ensure they are satisfied before deeming eligible
      try {
        if (m.requires && typeof evalCondition === 'function' && !evalCondition(m.requires)) continue;
      } catch (_) {}
      out.push(k);
    }
    return out;
  }
  function pickWeightedKey(trees, keys) {
    if (!keys.length) return null;
    let total = 0; const weights = [];
    for (const k of keys) {
      const w = Math.max(0, Number(getMeta(trees[k]).weight || 1));
      weights.push(w); total += w;
    }
    if (!total) return keys[Math.floor(Math.random()*keys.length)];
    let r = Math.random() * total;
    for (let i=0;i<keys.length;i++) { r -= weights[i]; if (r <= 0) return keys[i]; }
    return keys[keys.length-1];
  }

  // Export runner globally
  window.startRandomEventTree = startRandomEventTree;

  // Provide EventTrees shim with data + maybeStartRandom
  (function ensureEventTreesShim(){
    const trees = window.randomEventTrees || {};
    if (!window.randomEventTrees) {
      window.randomEventTrees = {};
      console.warn("EventTreesShim: No randomEventTrees found, initialized empty object.");
    }
    window.EventTrees = window.EventTrees && typeof window.EventTrees === 'object' ? window.EventTrees : {};
    window.EventTrees.data = trees;
    // Developer warning if event data failed to load
    try {
      const kCount = Object.keys(window.EventTrees.data || {}).length;
      if (!kCount) console.warn("EventTreesShim: randomEventTrees is empty. Check for syntax errors in data/event_trees.js");
    } catch(_) {}
    window.EventTrees.startRandomEventTree = (key, onResume) => { startRandomEventTree(key, onResume); return true; };
    // Attempt to auto-start a random event tree at safe moments in gameplay
    window.EventTrees.maybeStartRandom = (onResume) => {
      try {
        // Only auto-trigger in Event Stories mode
        const modeRadio = document.querySelector('input[name="mode"]:checked');
        const mode = modeRadio ? modeRadio.value : 'standard';
        if (mode !== 'eventTrees') return false;

        // Do not interrupt if any modal is already visible
        const isVisible = (id) => {
          const el = document.getElementById(id);
          return !!(el && !el.classList.contains('hidden'));
        };
        if (isVisible('event-tree-modal') || isVisible('random-event-modal')) return false;

        // Respect one-shot suppression and a short cooldown window
        window.EventTrees = window.EventTrees || {};
        const now = Date.now ? Date.now() : 0;
        if (window.EventTrees._suppressNextOnce) {
          window.EventTrees._suppressNextOnce = false;
          return false;
        }
        if (window.EventTrees._blockUntil && now < window.EventTrees._blockUntil) return false;

        // Chance gate per problem shown (tune as desired)
        const chance = 0.25; // 25% chance per problem
        if (Math.random() > chance) return false;

        // Pick an eligible key using arc + weights, skip already played
        const trees = window.randomEventTrees || {};
        const arc = window.EventTrees && typeof window.EventTrees.getArc === 'function' ? window.EventTrees.getArc() : null;
        let keys = eligibleKeysByArc(trees, arc);
        if (!keys.length && arc) keys = eligibleKeysByArc(trees, null);
        if (!keys.length) return false;
        const key = pickWeightedKey(trees, keys);
        if (!key) return false;

        startRandomEventTree(key, onResume);
        return true;
      } catch (e) {
        console.warn('maybeStartRandom error:', e);
        return false;
      }
    };
    window.EventTrees.setArc = (tag) => { window.EventTrees.arc = (tag && String(tag)) || null; return window.EventTrees.arc; };
    window.EventTrees.getArc = () => window.EventTrees.arc || null;
    window.EventTrees.isActive = () => {
      const m1 = document.getElementById('event-tree-modal');
      const m2 = document.getElementById('random-event-modal');
      const vis = el => !!(el && window.getComputedStyle(el).display !== "none");
      return vis(m1) || vis(m2);
    };
    window.EventTrees.isPlayed = (k) => isPlayedKey(window.randomEventTrees, k);
    window.EventTrees.played = () => Array.from(window._playedEventTrees || []);
    if (typeof window.EventTrees.showLocked === 'undefined') window.EventTrees.showLocked = true;
    window.EventTrees.setShowLocked = (v) => { window.EventTrees.showLocked = !!v; return window.EventTrees.showLocked; };
  })();

  // --- Dev hotkey: press 'e' to start a random event tree ---
  function devTriggerRandomTree() {
    try {
      const modal = document.getElementById('random-event-modal');
      if (modal && !modal.classList.contains('hidden')) return; // already showing
      const trees = window.randomEventTrees || {};
      const arc = window.EventTrees && window.EventTrees.getArc ? window.EventTrees.getArc() : null;
      let keys = eligibleKeysByArc(trees, arc);
      if (!keys.length && arc) keys = eligibleKeysByArc(trees, null); // dev fallback to any arc
      if (!keys.length) keys = Object.keys(trees); // last-resort dev fallback
      if (!keys.length) return;
      const key = pickWeightedKey(trees, keys);
      startRandomEventTree(key, () => {
        try {
          if (typeof showNextProblem === 'function') showNextProblem();
          else if (typeof runRound === 'function') runRound();
        } catch (_) {}
      });
      if (typeof delayedLog === 'function') delayedLog('DEV: Event Story → ' + key.replace(/_/g,' '), 'log-info');
    } catch (e) { console.warn('Dev trigger failed:', e); }
  }

  document.addEventListener('keydown', (ev) => {
    if (ev.key === 'e' || ev.key === 'E') {
      const t = ev.target;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
      ev.preventDefault();
      devTriggerRandomTree();
    }
  });

  (function ensureModalStyle(){
    const style = document.createElement("style");
    style.textContent = 
      ".modal{position:fixed;top:0;left:0;width:100vw;height:100vh;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.6);z-index:3000;}\n" +
      ".problem-option-btn.option-locked{opacity:0.55;cursor:not-allowed;filter:grayscale(0.2);}\n" +
      ".problem-option-btn.option-locked:hover{opacity:0.7;}\n";
    document.head.appendChild(style);
  })();
})();
