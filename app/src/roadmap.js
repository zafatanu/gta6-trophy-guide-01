// The 5-phase platinum roadmap, chapter-ordered, and the missable grid. Every trophy sits in exactly one phase.
export const ROADMAP_PHASES = [
  {
    n: 1,
    title: 'Story & Preservation',
    note: 'Play the story. Do the one potentially missable thing in Chapter 1, and keep a save at the start and end of each chapter — 15 manual save slots, no mission replay.',
    ponr: 'Chapter 1 balcony meditation (Positive Mental Attitude) — permanently unavailable after Chapter 1.',
    ids: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 28],
  },
  {
    n: 2,
    title: 'Early Progression',
    note: 'Unlocks that open the rest of the game: partner play after Coffee Break (Ch.2), Yasmani and jewelry jobs (Ch.3), garages and the Scooter Bros app (Ch.2). Fold activities and exploration into the story.',
    ponr: null,
    ids: [16, 17, 18, 19, 20, 21, 33, 34, 35, 42, 54, 55, 46],
  },
  {
    n: 3,
    title: '100% Completion',
    note: 'After the story, the checklist opens under Progress, Stats, 100% Completion. It is closer to 60% true completion: most side quests are not needed, and partial counts (200/277 vehicles, 100/255 animals, 15/18 meditations, 70/80 challenges) are enough.',
    ponr: null,
    ids: [14, 15, 30, 31, 32, 40, 41, 43, 25],
  },
  {
    n: 4,
    title: 'Character & Stranger Cleanup',
    note: 'Finish the companion questlines (Andy, Kenton, Billy, Randy, Tyrone, Bret), the stranger strands, the easter eggs, and the long count trophies. Everything here stays available after the story.',
    ponr: null,
    ids: [22, 23, 24, 26, 27, 29, 36, 37, 38, 39, 44, 45, 47, 48, 49, 50, 51, 52, 53],
  },
  {
    n: 5,
    title: 'Trophy Cleanup & Platinum',
    note: 'Sweep what is left — the count trackers and the random-spawn easter egg — then the platinum pops on its own when the 54th trophy lands.',
    ponr: null,
    ids: [1],
  },
];

export function nextUpTrophies(trophies, earned, n = 5) {
  const byId = new Map(trophies.map((t) => [t.id, t]));
  const ordered = [];
  for (const phase of ROADMAP_PHASES) {
    for (const id of phase.ids) {
      const t = byId.get(id);
      if (t && !earned.has(id)) ordered.push(t);
    }
  }
  return ordered.slice(0, n);
}

export function renderRoadmap(trophies, earned, el, onSelect) {
  const byId = new Map(trophies.map((t) => [t.id, t]));
  el.innerHTML = ROADMAP_PHASES.map((phase) => {
    const doneCount = phase.ids.filter((id) => earned.has(id)).length;
    const items = phase.ids
      .map((id) => byId.get(id))
      .filter(Boolean)
      .map((t) => {
        const done = earned.has(t.id) ? ' ✓' : '';
        const miss = t.missable === 'potential' ? ' <span class="flag">POTENTIALLY MISSABLE</span>' : '';
        return `<li data-trophy="${t.id}"><span class="grade ${t.grade}">${t.grade}</span> ${t.name}${done}${miss}</li>`;
      })
      .join('');
    return `<section class="phase"><h3>Phase ${phase.n} — ${phase.title} <span class="tMeta">${doneCount}/${phase.ids.length} earned</span></h3><p>${phase.note}</p>${
      phase.ponr ? `<p class="ponr">Point of no return: ${phase.ponr}</p>` : ''
    }<ul>${items}</ul></section>`;
  }).join('');
  el.querySelectorAll('[data-trophy]').forEach((li) => {
    li.addEventListener('click', () => onSelect(Number(li.dataset.trophy)));
  });
}

export function renderMissableGrid(trophies, el) {
  const rows = [...trophies]
    .sort((a, b) => (a.chapter ?? 99) - (b.chapter ?? 99) || a.id - b.id)
    .map((t) => {
      const status =
        t.missable === 'potential'
          ? '<b class="flag">POTENTIAL</b>'
          : t.missable === 'yes'
            ? '<b class="flag">YES</b>'
            : 'No';
      const ponr = t.pointOfNoReturn || '—';
      return `<tr class="${t.missable === 'potential' ? 'potential' : ''}"><td>${t.chapter ?? '—'}</td><td>${t.name}</td><td>${status}</td><td>${ponr}</td></tr>`;
    })
    .join('');
  el.innerHTML =
    `<table><thead><tr><th>Chapter</th><th>Trophy</th><th>Missable</th><th>Point of no return</th></tr></thead><tbody>${rows}</tbody></table>` +
    `<p class="viewNote">Only one trophy in the whole set is potentially missable. Every other trophy can be earned after the story in free-roam.</p>`;
}
