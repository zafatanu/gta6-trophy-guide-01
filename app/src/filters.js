// List filtering: grade, kind, earned state, hidden, missable, and text search. Spoiler masking is decided in spoiler.js.
export const FILTER_DEFAULTS = {
  search: '',
  grade: 'all',
  kind: 'all',
  status: 'all',
  hiddenOnly: false,
  missableOnly: false,
};

export function slugifyName(name) {
  return name
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function findTrophyByParam(trophies, param) {
  if (!param) return null;
  const byId = trophies.find((t) => String(t.id) === String(param));
  if (byId) return byId;
  const slug = slugifyName(param);
  return trophies.find((t) => slugifyName(t.name) === slug) || null;
}

export function trophyMatchesFilters(t, f, earned) {
  if (f.grade !== 'all' && t.grade !== f.grade) return false;
  if (f.kind !== 'all' && t.kind !== f.kind) return false;
  if (f.status === 'earned' && !earned.has(t.id)) return false;
  if (f.status === 'remaining' && earned.has(t.id)) return false;
  if (f.hiddenOnly && !t.hidden) return false;
  if (f.missableOnly && t.missable === 'no') return false;
  if (f.search) {
    const q = f.search.toLowerCase();
    const hay = `${t.name} ${t.description} ${t.guide}`.toLowerCase();
    const chapterHay = t.chapter ? ` chapter ${t.chapter} ch${t.chapter} ch ${t.chapter}` : '';
    if (!hay.includes(q) && !chapterHay.includes(q)) return false;
  }
  return true;
}

export function filterTrophies(trophies, filters, earned) {
  return trophies.filter((t) => trophyMatchesFilters(t, filters, earned));
}

export function sortForList(trophies) {
  return [...trophies].sort((a, b) => (a.chapter ?? 99) - (b.chapter ?? 99) || a.id - b.id);
}
