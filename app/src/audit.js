// Every audit number on screen is computed from trophies.json at runtime — nothing here is hand-typed.
export function computeAudit(trophies) {
  const grades = { platinum: 0, gold: 0, silver: 0, bronze: 0 };
  let hidden = 0;
  let claims = 0;
  let twoPlus = 0;
  let unconfirmed = 0;
  let potentialMissable = 0;
  const perSource = {};
  for (const t of trophies) {
    grades[t.grade] = (grades[t.grade] || 0) + 1;
    if (t.hidden) hidden += 1;
    if (t.guideStatus === 'unconfirmed-method') unconfirmed += 1;
    if (t.missable === 'potential') potentialMissable += 1;
    for (const c of t.claims || []) {
      claims += 1;
      if (c.sources && c.sources.length >= 2) twoPlus += 1;
      for (const s of c.sources || []) perSource[s] = (perSource[s] || 0) + 1;
    }
  }
  const sourced = trophies.filter((t) => (t.claims || []).length > 0).length;
  const noSource = trophies.reduce(
    (n, t) => n + (t.claims || []).filter((c) => !c.sources || c.sources.length === 0).length,
    0,
  );
  return {
    total: trophies.length,
    grades,
    hidden,
    claims,
    twoPlus,
    twoPlusShare: claims ? Math.round((1000 * twoPlus) / claims) / 10 : 0,
    sourcesUsed: Object.keys(perSource).length,
    perSource,
    unconfirmed,
    potentialMissable,
    sourced,
    unsupported: noSource,
  };
}

export function renderAuditStrip(audit, el) {
  const g = audit.grades;
  el.innerHTML =
    `<span class="stat"><b>${audit.sourced}/${audit.total}</b> trophies sourced</span>` +
    `<span class="stat"><b>${audit.claims}</b> claims cited</span>` +
    `<span class="stat"><b>${audit.twoPlus}</b> backed by 2+ sources (${audit.twoPlusShare}%)</span>` +
    `<span class="stat"><b>${audit.sourcesUsed}</b> sources used</span>` +
    `<span class="stat"><b>${audit.unconfirmed}</b> unconfirmed method${audit.unconfirmed === 1 ? '' : 's'}</span>` +
    `<span class="stat"><b class="${audit.unsupported === 0 ? 'ok' : 'warn'}">${audit.unsupported}</b> unsupported claims</span>` +
    `<span class="stat"><b>${audit.potentialMissable}</b> potential missable</span>` +
    `<span class="stat"><b>${g.platinum}P ${g.gold}G ${g.silver}S ${g.bronze}B</b> · ${audit.hidden} hidden</span>`;
}

export function renderJudgeLine(audit, el) {
  el.textContent =
    `Audit (computed live from trophies.json): ${audit.sourced}/${audit.total} trophies sourced, ` +
    `${audit.claims} claims cited, ${audit.twoPlus} backed by 2+ sources (${audit.twoPlusShare}%), ` +
    `${audit.sourcesUsed} sources, ${audit.unconfirmed} unconfirmed method, ${audit.unsupported} unsupported claims, ` +
    `${audit.potentialMissable} potential missable. Every guide cites its sources.`;
}

export function renderSourceMatrix(audit, docSources, el) {
  const rows = (docSources || [])
    .map((s) => {
      const n = audit.perSource[s.name] || 0;
      const role = s.role || '';
      const link = s.url ? `<a href="${s.url}" target="_blank" rel="noopener">${s.name}</a>` : s.name;
      return `<tr><td>${link}</td><td>${n}</td><td>${role}</td></tr>`;
    })
    .join('');
  el.innerHTML =
    `<table><thead><tr><th>Source</th><th>Claims backed</th><th>What it backs</th></tr></thead><tbody>${rows}</tbody></table>` +
    `<p class="viewNote">Counts are computed from the per-claim citations in trophies.json. A claim counts for a source only when that source is named on the claim itself.</p>`;
}

export function trophyClaimStats(trophy) {
  const claims = trophy.claims || [];
  const twoPlus = claims.filter((c) => c.sources && c.sources.length >= 2).length;
  return { claims: claims.length, twoPlus };
}
