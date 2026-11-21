// Progress, counters and spoiler preference live in localStorage; export/import round-trips them as one JSON file.
export const STORAGE_KEYS = {
  earned: 'leonida-platinum-earned',
  counters: 'leonida-platinum-counters',
  spoiler: 'leonida-platinum-spoiler',
};
export const EXPORT_APP = 'leonida-platinum-files';
export const EXPORT_VERSION = 1;

export function loadEarnedIds() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.earned);
    if (!raw) return new Set();
    const list = JSON.parse(raw);
    if (!Array.isArray(list)) return new Set();
    return new Set(list.filter((n) => Number.isInteger(n)));
  } catch {
    return new Set();
  }
}

export function saveEarnedIds(earned) {
  localStorage.setItem(STORAGE_KEYS.earned, JSON.stringify([...earned].sort((a, b) => a - b)));
}

export function loadCounterValues() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.counters);
    if (!raw) return {};
    const obj = JSON.parse(raw);
    if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return {};
    const clean = {};
    for (const [k, v] of Object.entries(obj)) {
      if (/^\d+$/.test(k) && Number.isFinite(v) && v >= 0) clean[k] = Math.floor(v);
    }
    return clean;
  } catch {
    return {};
  }
}

export function saveCounterValues(counters) {
  localStorage.setItem(STORAGE_KEYS.counters, JSON.stringify(counters));
}

export function loadSpoilerSetting() {
  return localStorage.getItem(STORAGE_KEYS.spoiler) !== 'off';
}

export function saveSpoilerSetting(on) {
  localStorage.setItem(STORAGE_KEYS.spoiler, on ? 'on' : 'off');
}

export function buildExportPayload(earned, counters) {
  return JSON.stringify(
    { app: EXPORT_APP, version: EXPORT_VERSION, earned: [...earned].sort((a, b) => a - b), counters },
    null,
    2,
  );
}

export function parseImportPayload(text) {
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error('That file is not valid JSON.');
  }
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    throw new Error('That file is not a Leonida progress export (expected an object).');
  }
  if (!Array.isArray(data.earned)) {
    throw new Error('That file has no earned list to import.');
  }
  for (const n of data.earned) {
    if (!Number.isInteger(n) || n < 1 || n > 55) {
      throw new Error('That file names a trophy id outside 1-55, so it was not imported.');
    }
  }
  const counters = {};
  if (data.counters !== undefined) {
    if (!data.counters || typeof data.counters !== 'object' || Array.isArray(data.counters)) {
      throw new Error('That file has a counters value that is not an object, so it was not imported.');
    }
    for (const [k, v] of Object.entries(data.counters)) {
      if (!/^\d+$/.test(k) || !Number.isFinite(v) || v < 0) {
        throw new Error('That file has a counter value that is not a whole number, so it was not imported.');
      }
      counters[k] = Math.floor(v);
    }
  }
  return { earned: new Set(data.earned), counters };
}

export function downloadJsonFile(filename, text) {
  const blob = new Blob([text], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.rel = 'noopener';
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
