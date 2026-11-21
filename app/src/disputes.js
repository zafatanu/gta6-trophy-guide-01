// Dispute panels: where the sources disagree, or where a method is still being confirmed, both versions are shown.
export const DISPUTE_PANELS = [
  {
    id: 'pma-balcony',
    trophy: 'Positive Mental Attitude',
    title: 'SOURCES DIFFER — is the Chapter 1 balcony meditation required?',
    a: 'PowerPyx: the balcony meditation raises the counter by 1 but is not marked as a Meditation Spot like the rest, so it is currently unclear if it is required for the trophy. When the author earned the trophy, they had done the Chapter 1 meditation.',
    b: 'The 100% checklist needs only 15 of 18 meditations, so the balcony one does not matter for 100%. The trophy itself wants every spot — all 18.',
    verdict: 'Do the balcony meditation in Chapter 1 and keep a Chapter 1 save. That is the only safe play.',
  },
  {
    id: 'fair-game-animal',
    trophy: 'Fair Game',
    title: 'UNCONFIRMED — which animal unlocks Fair Game?',
    a: 'PowerPyx: it is still undergoing confirmation which animal exactly unlocks this trophy. Bret’s line is about hunting the animals he requests; the trigger animal is not named.',
    b: 'No second source names the animal either. Any guide that names one specific animal is guessing.',
    verdict: 'Do the whole Bret line and all 15 Target Decks. Do not trust a single named animal until a source confirms it.',
  },
  {
    id: 'truth-spawn',
    trophy: 'The Truth Is Out There',
    title: 'CAVEAT — the UFO spawn is random, not guaranteed',
    a: 'PowerPyx: the easter egg is at the road north-west of Starlet Motel in Kelly County, at night after 2AM, solo. The blinking car that marks the trigger is only sometimes there.',
    b: 'If the car is not there, drive away and come back. The method is confirmed; the spawn is the uncertain part.',
    verdict: 'Expect several tries. This is the one trophy where patience, not skill, is the requirement.',
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
    id: 'resolved-methods',
    trophy: null,
    title: 'RESOLVED — four methods earlier research flagged unconfirmed',
    a: 'Early research flagged In The Beginning…, Capital Offense, Bad Luck I Guess and Ten Pin as unconfirmed. The live PowerPyx guide (read 21 Nov 2026) has full sections with screenshots for all four.',
    b: 'The methods are now written into those four guides in our own words, each cited to PowerPyx. Nothing there is guessed.',
    verdict: 'Flagged honestly at intake, resolved by reading the source — not by assuming.',
  },
];

export function renderDisputes(el, panels) {
  el.innerHTML = panels
    .map(
      (d) => `<div class="dispute"><h4>${d.title}</h4><p>${d.trophy ? `Trophy: ${d.trophy}` : ''}</p><div class="ab"><div><b>A</b> — ${d.a}</div><div><b>B</b> — ${d.b}</div></div><p class="verdict">${d.verdict}</p></div>`,
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
