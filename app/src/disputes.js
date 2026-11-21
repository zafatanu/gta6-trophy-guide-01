// Dispute panels: where the sources disagree, or where a method is still being confirmed, both versions are shown.
export const DISPUTE_PANELS = [
  {
    id: 'pma-balcony',
    trophy: 'Positive Mental Attitude',
    title: 'SOURCES DIFFER — is the Chapter 1 balcony meditation required?',
    a: 'PowerPyx: the balcony meditation raises the counter by 1 but is not marked as a Meditation Spot like the rest, so it is currently unclear if it is required for the trophy. When the author earned the trophy, they had done the Chapter 1 meditation.',
    b: 'KeenGamer lists it as the only currently identified potentially missable trophy-related interaction and says to complete the balcony meditation before leaving Chapter 1. The 100% checklist needs only 15 of 18 meditations, so the balcony one does not matter for 100%. The trophy itself wants every spot — all 18.',
    verdict: 'Do the balcony meditation in Chapter 1 and keep a Chapter 1 save. That is the only safe play.',
  },
  {
    id: 'fair-game-animal',
    trophy: 'Fair Game',
    title: 'UNCONFIRMED — which animal unlocks Fair Game?',
    a: 'PowerPyx: it is still undergoing confirmation which animal exactly unlocks this trophy. Bret’s line is about hunting the animals he requests; the trigger animal is not named.',
    b: 'No second source names the animal either. KeenGamer says only "hunt a unique animal for Bret". Any guide that names one specific animal is guessing.',
    verdict: 'Do the whole Bret line and all 15 Target Decks. Do not trust a single named animal until a source confirms it.',
  },
  {
    id: 'strangers-rest',
    trophy: 'Strangers & Freaks',
    title: 'STILL BEING CONFIRMED — the remaining qualifying strands',
    a: 'PowerPyx: Kirk, Kyle, Yago and Pilot Pete are confirmed to count. Moses, Tyrone, Yasmani, Andy, Billy and Eddie do NOT count.',
    b: 'PowerPyx again: “there are more strangers yet to be discovered.” The full 8 are not yet a settled list.',
    verdict: 'Count only the four confirmed strands in your plan, and check the in-game trophy tracker for your running total.',
  },
  {
    id: 'platinum-time',
    trophy: 'Vice Got a Price!',
    title: 'SOURCES DIFFER — how long does the platinum take?',
    a: 'PowerPyx and KeenGamer both put the platinum at roughly 200 hours, difficulty 4/10.',
    b: 'Push Square says to expect "up to 300 hours or more" for the same platinum.',
    verdict: 'Plan for 200 hours; budget 300. The gap is in how much cleanup the writer assumes, not in the trophy list.',
  },
];

export function renderDisputes(el, panels) {
  el.innerHTML = panels
    .map(
      (d) => `<div class="dispute" data-dispute="${d.id}"><h4>${d.title}</h4><p>${d.trophy ? `Trophy: ${d.trophy}` : ''}</p><div class="ab"><div><b>A</b> — ${d.a}</div><div><b>B</b> — ${d.b}</div></div><p class="verdict">${d.verdict}</p></div>`,
    )
    .join('');
}

export function disputesForTrophy(name) {
  return DISPUTE_PANELS.filter((d) => d.trophy === name);
}

export function renderUnconfirmedRegister(trophies, el) {
  const list = trophies.filter((t) => t.guideStatus === 'unconfirmed-method');
  if (!list.length) {
    el.innerHTML = '<p>No trophy in this guide has an unconfirmed method.</p>';
    return;
  }
  el.innerHTML =
    '<ul>' +
    list
      .map((t) => {
        const unknown = (t.claims || []).find((c) => /UNCONFIRMED/i.test(c.text));
        return `<li><b>${t.name}</b> — ${t.guideStatus}. What is unknown: ${unknown ? unknown.text : 'see its guide.'}</li>`;
      })
      .join('') +
    '</ul>';
}
