// LEONIDA // PLATINUM FILES — entry module: loads the trophy data, wires the tracker, filters, spoiler shield, roadmap and audit strip.
import {
  STORAGE_KEYS,
  loadEarnedIds,
  saveEarnedIds,
  loadCounterValues,
  saveCounterValues,
  loadSpoilerSetting,
  saveSpoilerSetting,
  buildExportPayload,
  parseImportPayload,
  downloadJsonFile,
} from './src/storage.js';
import {
  computeAudit,
  renderAuditStrip,
  renderJudgeLine,
  renderSourceMatrix,
  trophyClaimStats,
} from './src/audit.js';
import {
  FILTER_DEFAULTS,
  findTrophyByParam,
  filterTrophies,
  sortForList,
} from './src/filters.js';
import {
  isSpoilerMasked,
  maskedName,
  maskedDescription,
  spoilerShieldLabel,
} from './src/spoiler.js';
import {
  trackerValue,
  trackerReached,
  bumpTracker,
  trackerProgress,
  formatTrackerNumber,
} from './src/tracker.js';
import {
  nextUpTrophies,
  renderRoadmap,
  renderMissableGrid,
} from './src/roadmap.js';
import {
  DISPUTE_PANELS,
  renderDisputes,
  disputesForTrophy,
  renderUnconfirmedRegister,
} from './src/disputes.js';

export const LEONIDA_DEMO_EARNED = [2, 3, 4, 8, 9, 15, 16, 18, 20, 21];
export const LEONIDA_POSITIVE_MENTAL_ATTITUDE = 28;

const params = new URLSearchParams(location.search);
const demoMode = params.get('demo') === 'earned10';

let doc = null;
let trophies = [];
let audit = null;
let earned = loadEarnedIds();
let counters = loadCounterValues();
let spoilerOn = loadSpoilerSetting();
let filters = { ...FILTER_DEFAULTS };
let selectedId = LEONIDA_POSITIVE_MENTAL_ATTITUDE;
let currentView = 'command';

if (demoMode) {
  earned = new Set(LEONIDA_DEMO_EARNED);
}

function persist() {
  if (demoMode) return;
  saveEarnedIds(earned);
  saveCounterValues(counters);
}

export function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function guideStepsHtml(guide) {
  const parts = guide
    .split(/(?=\d+\.\s)/)
    .map((s) => s.trim())
    .filter(Boolean);
  if (parts.length > 1 && /^\d+\.\s/.test(parts[0])) {
    return (
      '<ol class="guideSteps">' +
      parts.map((p) => `<li>${escapeHtml(p.replace(/^\d+\.\s/, ''))}</li>`).join('') +
      '</ol>'
    );
  }
  return `<p>${escapeHtml(guide)}</p>`;
}

function trophyById(id) {
  return trophies.find((t) => t.id === id) || null;
}

function displayName(t) {
  return isSpoilerMasked(t, earned, spoilerOn) ? maskedName(t) : t.name;
}

function displayDescription(t) {
  return isSpoilerMasked(t, earned, spoilerOn) ? maskedDescription() : t.description;
}

function missableBoxHtml(t) {
  if (t.missable === 'potential') {
    return `<div class="missableBox potential"><b>⚠ POTENTIALLY MISSABLE — the only one in the set.</b><br>${escapeHtml(
      t.pointOfNoReturn || '',
    )}<br>Do it in Chapter 1 and keep a Chapter 1 save. It is still unclear whether the balcony meditation is required for the trophy.</div>`;
  }
  if (t.missable === 'yes') {
    return `<div class="missableBox potential"><b>⚠ MISSABLE.</b><br>${escapeHtml(t.pointOfNoReturn || '')}</div>`;
  }
  const why =
    t.kind === 'story'
      ? 'Automatic story trophy — it cannot be missed.'
      : 'Not missable — it can be earned after the story in free-roam.';
  return `<div class="missableBox"><b>Not missable.</b> ${why}</div>`;
}

function trackerBoxHtml(t) {
  if (!t.tracker) return '';
  const p = trackerProgress(counters, t);
  const done = trackerReached(counters, t);
  return `<div class="trackerBox"><b>Count tracker — ${escapeHtml(t.tracker.label)}:</b> ` +
    `<span class="count">${formatTrackerNumber(p.value)} / ${formatTrackerNumber(p.goal)}</span> (${p.pct}%)${done ? ' — goal reached' : ''}` +
    `<span class="stepper"><button type="button" data-step="-1" data-trophy="${t.id}" aria-label="Decrease count">−</button>` +
    `<button type="button" data-step="1" data-trophy="${t.id}" aria-label="Increase count">+</button></span> ` +
    `<span class="tMeta">Step ${formatTrackerNumber(t.tracker.step || 1)} · saved in this browser</span></div>`;
}

function claimsHtml(t) {
  const items = (t.claims || [])
    .map((c) => {
      const chips = (c.sources || [])
        .map((s) => `<span class="chip${c.sources.length >= 2 ? ' two' : ''}">${escapeHtml(s)}</span>`)
        .join('');
      return `<li>${escapeHtml(c.text)}${chips}</li>`;
    })
    .join('');
  const stats = trophyClaimStats(t);
  return `<h3>Evidence — ${stats.claims} cited claims (${stats.twoPlus} backed by 2+ sources)</h3><ol class="claimsList">${items}</ol>`;
}

function sourcesHtml(t) {
  const items = (t.sources || [])
    .map((s) => {
      const link = s.url
        ? `<a href="${escapeHtml(s.url)}" target="_blank" rel="noopener">${escapeHtml(s.name)}</a>`
        : escapeHtml(s.name);
      return `<li>${link} — backs ${s.claims} claim${s.claims === 1 ? '' : 's'} on this trophy</li>`;
    })
    .join('');
  return `<h3>Sources for this guide</h3><ul class="srcList">${items}</ul>`;
}

function disputesHtml(t) {
  const panels = disputesForTrophy(t.name);
  if (!panels.length) return '';
  return `<h3>Disputes — where the sources differ</h3>` + panels.map((d) => {
    return `<div class="dispute"><h4>${escapeHtml(d.title)}</h4><div class="ab"><div><b>A</b> — ${escapeHtml(d.a)}</div><div><b>B</b> — ${escapeHtml(d.b)}</div></div><p class="verdict">${escapeHtml(d.verdict)}</p></div>`;
  }).join('');
}

export function renderTrophyDetail(t, container) {
  if (!t) {
    container.innerHTML = '<p>Pick a trophy from the list.</p>';
    return;
  }
  const masked = isSpoilerMasked(t, earned, spoilerOn);
  const isEarned = earned.has(t.id);
  container.innerHTML =
    `<h2 class="detailName">${escapeHtml(displayName(t))}</h2>` +
    `<p class="detailDesc">${escapeHtml(displayDescription(t))}</p>` +
    `<p class="detailMeta"><span class="grade ${t.grade}">${t.grade}</span> ${escapeHtml(t.kind)}` +
    `${t.chapter ? ` · Chapter ${t.chapter}` : ''}${t.hidden ? ' · <span class="flag cyan">HIDDEN</span>' : ''}` +
    `${t.guideStatus === 'unconfirmed-method' ? ' · <span class="flag">UNCONFIRMED METHOD</span>' : ''}</p>` +
    `<p class="earnedToggle"><label><input type="checkbox" data-earned-toggle="${t.id}" ${isEarned ? 'checked' : ''}> Earned</label>` +
    `${masked ? ' <span class="spoilerMask">(earning it reveals the story text)</span>' : ''}</p>` +
    (masked ? '' : `<h3>Guide — in our own words</h3>${guideStepsHtml(t.guide)}`) +
    missableBoxHtml(t) +
    trackerBoxHtml(t) +
    (masked ? '' : disputesHtml(t) + claimsHtml(t) + sourcesHtml(t));
  container.querySelectorAll('[data-earned-toggle]').forEach((box) => {
    box.addEventListener('change', () => toggleEarned(t.id, box.checked));
  });
  container.querySelectorAll('[data-step]').forEach((btn) => {
    btn.addEventListener('click', () => {
      counters = bumpTracker(counters, t, Number(btn.dataset.step) * (t.tracker.step || 1));
      persist();
      renderAll();
    });
  });
}

function renderProgress() {
  const n = earned.size;
  document.getElementById('progressBig').textContent = `${n} / ${trophies.length}`;
  document.getElementById('progressFill').style.width = `${Math.round((100 * n) / trophies.length)}%`;
  document.getElementById('progressLabel').textContent =
    `trophies earned — progress saves in this browser${demoMode ? ' (demo: 10 seeded, not saved)' : ''}`;
}

function renderTrophyList() {
  const list = document.getElementById('trophyList');
  const shown = sortForList(filterTrophies(trophies, filters, earned));
  document.getElementById('listCount').textContent = `(${shown.length} of ${trophies.length})`;
  list.innerHTML = '';
  for (const t of shown) {
    const li = document.createElement('li');
    if (t.id === selectedId) li.classList.add('selected');
    if (earned.has(t.id)) li.classList.add('earned');
    const box = document.createElement('input');
    box.type = 'checkbox';
    box.checked = earned.has(t.id);
    box.setAttribute('aria-label', `Earned: ${t.name}`);
    box.addEventListener('change', (e) => {
      e.stopPropagation();
      toggleEarned(t.id, box.checked);
    });
    const wrap = document.createElement('div');
    const flags = [
      t.hidden ? '<span class="flag cyan">HIDDEN</span>' : '',
      t.missable === 'potential' ? '<span class="flag">MISSABLE</span>' : '',
      t.guideStatus === 'unconfirmed-method' ? '<span class="flag">UNCONFIRMED</span>' : '',
    ].filter(Boolean).join(' ');
    wrap.innerHTML =
      `<span class="tName">${escapeHtml(displayName(t))}</span>` +
      `<span class="tMeta"><span class="grade ${t.grade}">${t.grade}</span>${escapeHtml(t.kind)}` +
      `${t.chapter ? ` · Ch. ${t.chapter}` : ''} ${flags}</span>`;
    li.append(box, wrap);
    li.tabIndex = 0;
    li.addEventListener('click', (e) => {
      // A click on the row's checkbox must reach the checkbox's own change
      // handler: if the row re-renders first, the checkbox is detached and
      // its change event never fires, so the toggle is silently swallowed.
      if (e.target.closest('input')) return;
      selectTrophy(t.id);
    });
    li.addEventListener('keydown', (e) => {
      if (e.target.closest('input')) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectTrophy(t.id);
      }
    });
    list.append(li);
  }
  if (!shown.length) {
    list.innerHTML = '<li>No trophies match these filters.</li>';
  }
}

function renderDatabase() {
  const rows = document.getElementById('databaseRows');
  const shown = sortForList(filterTrophies(trophies, filters, earned));
  rows.innerHTML = '';
  for (const t of shown) {
    const stats = trophyClaimStats(t);
    const tr = document.createElement('tr');
    if (earned.has(t.id)) tr.classList.add('earned');
    const box = document.createElement('input');
    box.type = 'checkbox';
    box.checked = earned.has(t.id);
    box.setAttribute('aria-label', `Earned: ${t.name}`);
    box.addEventListener('change', (e) => {
      e.stopPropagation();
      toggleEarned(t.id, box.checked);
    });
    const cells = [
      box,
      displayName(t),
      t.grade,
      t.kind,
      t.chapter ?? '—',
      String(stats.claims),
      String(stats.twoPlus),
      t.missable === 'potential' ? 'POTENTIAL' : t.missable === 'yes' ? 'YES' : 'No',
      t.guideStatus,
    ];
    for (const c of cells) {
      const td = document.createElement('td');
      if (typeof c === 'string') td.textContent = c;
      else td.append(c);
      tr.append(td);
    }
    tr.addEventListener('click', (e) => {
      if (e.target.closest('input')) return;
      selectTrophy(t.id, { view: 'trophy' });
    });
    rows.append(tr);
  }
}

function renderSidePane() {
  const next = nextUpTrophies(trophies, earned, 5);
  document.getElementById('nextUp').innerHTML =
    `<h2>Next up — roadmap order</h2><ul>` +
    next.map((t) => `<li data-next="${t.id}"><span class="grade ${t.grade}">${t.grade}</span> <span class="nextName">${escapeHtml(t.name)}</span><br><span class="tMeta">${escapeHtml(t.kind)}${t.chapter ? ` · Ch. ${t.chapter}` : ''}</span></li>`).join('') +
    `</ul>`;
  document.querySelectorAll('[data-next]').forEach((li) => {
    li.addEventListener('click', () => selectTrophy(Number(li.dataset.next)));
  });
  renderDisputes(document.getElementById('sideDisputes'), DISPUTE_PANELS.slice(0, 2));
  const top = Object.entries(audit.perSource).sort((a, b) => b[1] - a[1]);
  document.getElementById('sideSources').innerHTML =
    `<h2>Source matrix — claims backed</h2><ul>` +
    top.map(([name, n]) => `<li><b>${escapeHtml(name)}</b> — ${n} claims</li>`).join('') +
    `</ul>`;
}

function renderAll() {
  renderProgress();
  renderAuditStrip(audit, document.getElementById('auditStrip'));
  renderTrophyList();
  renderTrophyDetail(trophyById(selectedId), document.getElementById('detailPane'));
  renderTrophyDetail(trophyById(selectedId), document.getElementById('trophyDetail'));
  renderDatabase();
  renderSidePane();
  renderRoadmap(trophies, earned, document.getElementById('roadmapPhases'), (id) => selectTrophy(id, { view: 'trophy' }));
  renderMissableGrid(trophies, document.getElementById('missableGrid'));
  renderSourceMatrix(audit, doc.sources || [], document.getElementById('sourceMatrix'));
  renderUnconfirmedRegister(trophies, document.getElementById('unconfirmedRegister'));
  renderJudgeLine(audit, document.getElementById('judgeLine'));
}

export function toggleEarned(id, on) {
  if (on) earned.add(id);
  else earned.delete(id);
  persist();
  renderAll();
}

export function selectTrophy(id, opts = {}) {
  selectedId = id;
  if (opts.view) setView(opts.view);
  else renderAll();
  syncUrl();
}

export function setView(view) {
  currentView = view;
  document.body.dataset.view = view;
  for (const section of document.querySelectorAll('main .view')) {
    section.hidden = section.id !== `${view}View`;
  }
  document.querySelectorAll('.tab').forEach((b) => {
    b.classList.toggle('active', b.dataset.view === view);
  });
  syncUrl();
}

function syncUrl() {
  const q = new URLSearchParams();
  q.set('view', currentView);
  q.set('trophy', String(selectedId));
  if (demoMode) q.set('demo', 'earned10');
  history.replaceState(null, '', `${location.pathname}?${q}`);
}

function wireToolbar() {
  document.querySelectorAll('.tab').forEach((b) => {
    b.addEventListener('click', () => setView(b.dataset.view));
  });
  document.getElementById('search').addEventListener('input', (e) => {
    filters.search = e.target.value.trim();
    renderTrophyList();
    renderDatabase();
  });
  document.getElementById('gradeFilter').addEventListener('change', (e) => {
    filters.grade = e.target.value;
    renderTrophyList();
    renderDatabase();
  });
  document.getElementById('kindFilter').addEventListener('change', (e) => {
    filters.kind = e.target.value;
    renderTrophyList();
    renderDatabase();
  });
  document.getElementById('statusFilter').addEventListener('change', (e) => {
    filters.status = e.target.value;
    renderTrophyList();
    renderDatabase();
  });
  document.getElementById('hiddenFilter').addEventListener('change', (e) => {
    filters.hiddenOnly = e.target.checked;
    renderTrophyList();
    renderDatabase();
  });
  document.getElementById('missableFilter').addEventListener('change', (e) => {
    filters.missableOnly = e.target.checked;
    renderTrophyList();
    renderDatabase();
  });
  const spoilerBtn = document.getElementById('spoilerToggle');
  const paintSpoiler = () => {
    spoilerBtn.textContent = spoilerShieldLabel(spoilerOn);
    spoilerBtn.setAttribute('aria-pressed', String(spoilerOn));
  };
  spoilerBtn.addEventListener('click', () => {
    spoilerOn = !spoilerOn;
    saveSpoilerSetting(spoilerOn);
    paintSpoiler();
    renderAll();
  });
  paintSpoiler();
  document.getElementById('exportBtn').addEventListener('click', () => {
    downloadJsonFile('leonida-progress.json', buildExportPayload(earned, counters));
  });
  const importError = document.getElementById('importError');
  document.getElementById('importFile').addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const parsed = parseImportPayload(await file.text());
      earned = parsed.earned;
      counters = parsed.counters;
      persist();
      importError.hidden = true;
      renderAll();
    } catch (err) {
      importError.textContent = `Import failed: ${err.message} Your saved progress was not changed.`;
      importError.hidden = false;
    }
    e.target.value = '';
  });
}

async function initLeonidaGuide() {
  try {
    const res = await fetch('data/trophies.json');
    if (!res.ok) throw new Error(`trophies.json failed to load (${res.status})`);
    doc = await res.json();
  } catch (err) {
    document.getElementById('detailPane').innerHTML =
      `<p>Could not load the trophy data: ${escapeHtml(err.message)}. The guide runs offline from its own files — check that data/trophies.json sits beside this page.</p>`;
    return;
  }
  trophies = doc.trophies || [];
  audit = computeAudit(trophies);
  const viewParam = params.get('view');
  if (viewParam && ['command', 'database', 'trophy', 'roadmap', 'sources'].includes(viewParam)) {
    currentView = viewParam;
  }
  const picked = findTrophyByParam(trophies, params.get('trophy'));
  if (picked) selectedId = picked.id;
  wireToolbar();
  setView(currentView);
  renderAll();
}

initLeonidaGuide();
