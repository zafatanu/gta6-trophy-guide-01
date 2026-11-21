// Spoiler shield: story trophies stay masked until earned. Hidden is a PlayStation flag; storySpoiler is ours.
export function isSpoilerMasked(trophy, earned, spoilerOn) {
  return spoilerOn && trophy.storySpoiler && !earned.has(trophy.id);
}

export function maskedName(trophy) {
  return `Hidden story trophy — Chapter ${trophy.chapter ?? '?'}`;
}

export function maskedDescription() {
  return 'Story spoiler — earn this trophy (or turn the spoiler shield off) to reveal it.';
}

export function spoilerShieldNote(trophy) {
  if (!trophy.storySpoiler) return '';
  return 'This is a story trophy: its name and description stay hidden behind the spoiler shield until it is earned.';
}

export function spoilerShieldLabel(on) {
  return `Spoiler shield: ${on ? 'ON' : 'OFF'}`;
}
