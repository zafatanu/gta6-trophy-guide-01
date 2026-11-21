// Persistent +/- count trackers for every trophy that has a count (meditations, stunts, vehicles, dollars…).
export function trackerValue(counters, trophy) {
  if (!trophy.tracker) return 0;
  return counters[String(trophy.id)] || 0;
}

export function trackerReached(counters, trophy) {
  if (!trophy.tracker) return false;
  return trackerValue(counters, trophy) >= trophy.tracker.goal;
}

export function bumpTracker(counters, trophy, delta) {
  if (!trophy.tracker) return counters;
  const key = String(trophy.id);
  const next = Math.max(0, Math.min(trophy.tracker.goal, (counters[key] || 0) + delta));
  return { ...counters, [key]: next };
}

export function trackerProgress(counters, trophy) {
  if (!trophy.tracker) return null;
  const value = trackerValue(counters, trophy);
  const goal = trophy.tracker.goal;
  return { value, goal, pct: goal ? Math.round((100 * value) / goal) : 0 };
}

export function formatTrackerNumber(n) {
  return n.toLocaleString('en-US');
}
