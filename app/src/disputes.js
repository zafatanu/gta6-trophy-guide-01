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
  {
    id: 'in-the-beginning',
    trophy: 'In The Beginning…',
    title: 'SOURCES DIFFER — the In The Beginning… method',
    a: 'PowerPyx publishes a specific method with screenshots: go to the Ocean View Rooftop Bar and buy an Apple Martini, then drink it standing next to the bar.',
    b: 'GTABase says "The exact steps aren’t confirmed yet". KeenGamer lists the exact trigger as still being confirmed, and EGamers counts it among the five trophies whose method is not yet known.',
    verdict: 'PowerPyx is the only detailed lead, so try the Apple Martini first. If it does not pop, the trigger is still genuinely unconfirmed — do not trust any other named method.',
  },
  {
    id: 'capital-offense',
    trophy: 'Capital Offense',
    title: 'SOURCES DIFFER — the Capital Offense method',
    a: 'PowerPyx publishes a specific method: steal the blue Banshee from the vehicle showroom in the south of Vice City with the Key Cloner from the Chapter 3 mission Clonin’ Keys, Makin’ Gs, then drive straight out through the showroom window.',
    b: 'GTABase says the description points to crashing a car out through the window of a vehicle showroom, but "The exact steps aren’t confirmed yet". KeenGamer lists the exact method as still unconfirmed, and EGamers counts it among the five not yet known.',
    verdict: 'PowerPyx is the only detailed lead, so try the blue Banshee first. The showroom-escape shape itself is agreed — only the exact trigger is disputed.',
  },
  {
    id: 'bad-luck',
    trophy: 'Bad Luck, I Guess',
    title: 'SOURCES DIFFER — the Bad Luck, I Guess method',
    a: 'PowerPyx publishes a specific method: Lucia robs a Payday Loans store in the Prologue, and the trophy is for robbing the same store again as Lucia — earliest after the Chapter 3 mission Credit Check — alone, on foot, until it unlocks.',
    b: 'GTABase says "Second time’s the charm" suggests succeeding at something on a second attempt, but "The exact steps aren’t confirmed yet". KeenGamer calls it a hidden trophy with an unconfirmed unlock method, and EGamers counts it among the five not yet known.',
    verdict: 'PowerPyx is the only detailed lead, so try the second Payday Loans robbery as Lucia first. If it does not pop, the trigger is still genuinely unconfirmed.',
  },
  {
    id: 'truth-ufo',
    trophy: 'The Truth Is Out There',
    title: 'SOURCES DIFFER — the Truth Is Out There method',
    a: 'PowerPyx publishes a specific method: a UFO easter egg on the road north-west of Starlet Motel in Kelly County, at night after 2AM, solo — follow a blinking car into the woods, approach the UFO, and help the woman it drops.',
    b: 'GTABase says only to "Expect a strange event or Easter egg somewhere in Leonida. The exact steps aren’t confirmed yet". KeenGamer calls it a hidden trophy with an unconfirmed unlock method, and EGamers counts it among the five not yet known.',
    verdict: 'PowerPyx is the only detailed lead, so try the Starlet Motel road after 2AM first. The spawn is random even by PowerPyx’s own account, so a miss proves nothing.',
  },
  {
    id: 'ten-pin',
    trophy: 'Ten Pin',
    title: 'SOURCES DIFFER — the Ten Pin method',
    a: 'PowerPyx publishes a specific method: ride any bike and kick 10 pedestrians with Square within 60 seconds, in a crowded area like Vice City or Ocean Beach.',
    b: 'GTABase says the description points to knocking people down with a melee attack from a vehicle, but "The exact steps aren’t confirmed yet". KeenGamer says the precise method is still being confirmed, and EGamers counts it among the five not yet known.',
    verdict: 'PowerPyx is the only detailed lead, so try the bike-kick method first. The melee drive-by shape itself is agreed — only the exact trigger is disputed.',
  },
  {
    id: 'tyrone-final-job',
    trophy: 'Spin On This!',
    title: 'SOURCES DIFFER — Tyrone’s final job name',
    a: 'PowerPyx names Tyrone’s two quests Take Out Kitty Litter, then Spin On This — and the trophy for his final mission is itself named "Spin On This!".',
    b: 'GTABase says the last job is "(Shut Down the Labs)": destroy the purple-marked synthetic labs and the trophy is awarded at the end of that job.',
    verdict: 'The shape is agreed — destroy the purple-marked labs as Jason after Here Kitty Kitty in Chapter 3. Follow the purple markers, not the quest name; the trophy name backs PowerPyx’s version.',
  },
  {
    id: 'pma-18-vs-15',
    trophy: 'Positive Mental Attitude',
    title: 'SOURCES DIFFER — 18 meditations or 15?',
    a: 'PowerPyx and GTABase count 18 meditation spots, and the trophy wants every spot — meditate at all 18.',
    b: 'KeenGamer’s 100% table says "15 of 18 for 100%; complete all 18 for the separate trophy", and EGamers notes the same split: 18 for the trophy, 15 for the checklist.',
    verdict: 'Both numbers are right for different things: 15 counts toward 100%, all 18 are needed for the trophy. Do all 18 and both are covered.',
  },
  {
    id: 'final-mission-wording',
    trophy: 'You Gotta Know When to Get Off',
    title: 'SOURCES DIFFER — "Complete the final mission" or "Complete Chapter 5"?',
    a: 'The official description of You Gotta Know When to Get Off is "Complete the final mission."',
    b: 'Beebom and Insider Gaming both word the same trophy as "Complete Chapter 5".',
    verdict: 'Same trophy, different wording. The official text wins — it is the final mission, not a chapter-completion trophy.',
  },
  {
    id: 'stranger-windows',
    trophy: 'Strangers & Freaks',
    title: 'SOURCES DIFFER — do Strangers & Freaks strands stay open after the story?',
    a: 'PowerPyx and GTABase say the strands stay available after the story — Andy, Billy and the rest can be finished in free roam.',
    b: 'TechWiser, quoted by EGamers, warns that stranger mission chains behind five hidden trophies have windows linked to story progress, and says to begin those chains as soon as they unlock to be safe.',
    verdict: 'Start every stranger chain the moment it unlocks. If the "stay after story" version is right you lose nothing; if the warning is right you save the trophy.',
  },
  {
    id: 'shooting-range-12-vs-14',
    trophy: 'The Shootist',
    title: 'SOURCES DIFFER — 12 shooting range challenges or 14?',
    a: 'PowerPyx’s dedicated shooting-range page says 12 challenges: 6 at Griffin (3 golds each, 18 golds) and 6 at Rodgers Ranch (4 golds each, 24 golds), 42 golds in total.',
    b: 'PowerPyx’s own collectible guide lists “14 Shooting Range Challenges (42 Gold Medals)”.',
    verdict: '12 is right — 6 + 6 courses, 42 golds either way. The 14 in the collectible guide looks like a slip (14 is the drone-location count).',
  },
  {
    id: 'vehicle-scan-200-of-557',
    trophy: 'A Long Road',
    title: 'SOURCES DIFFER — scan 200 of 557 vehicles or 200 of 277?',
    a: 'PowerPyx’s 100% intro says “scan any 200 of 557 vehicles with the WAiNK app”.',
    b: 'Its own checklist line — and GTABase — say 200 of 277 Base Model Vehicles, and both say the 280 Standout vehicles do not count.',
    verdict: '200 of 277 base models is right. 557 is the total vehicle count, not the scan pool.',
  },
  {
    id: 'red-rocks-county',
    trophy: 'Positive Mental Attitude',
    title: 'SOURCES DIFFER — which county is the Red Rocks meditation in?',
    a: 'PowerPyx and KeenGamer put the Red Rocks meditation in Kelly County, in Manifest Canyon where the railroad tracks cross the highway.',
    b: 'Beebom puts it in “Manifest County”, north of Kelly County and south of Lummox County.',
    verdict: 'Same spot, different county label — follow the map filter (Meditate Around Leonida), not the county name.',
  },
  {
    id: 'throttled-minutes-vs-miles',
    trophy: 'One Last Thing',
    title: 'SOURCES DIFFER — Throttled: 2 minutes or 2 miles?',
    a: 'PowerPyx: Throttled is “Maintain a speed of over 100mph in a motor vehicle for 2 minutes”.',
    b: 'Insider Gaming: Throttled is “Maintain a speed of over 100mph in a motor vehicle for 2 miles”.',
    verdict: 'Minutes vs miles — check the in-game challenge text before attempting it; do not trust either wording alone.',
  },
  {
    id: 'robberies-everything',
    trophy: 'A Long Road',
    title: 'SOURCES DIFFER — do the robberies all need everything?',
    a: 'PowerPyx and GTABase both say the only lines needing everything are “Robberies, Underwater Discoveries, Shooting Ranges, Drone Races, Bret’s Hunting Quests”.',
    b: 'Their own tables say Stick Ups need only 50 of 91 and Smash ‘N’ Grabs 34 of 35.',
    verdict: 'Only Gang Operations (39/39), Bank Jobs (22/22), Payday Loan Jobs (7/7) and Vaults (8/8) need every one. The “robberies need everything” summary is loose.',
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
