[![gta6-trophy-guide-01](https://make.fun/badge/gta6-trophy-guide-01.svg)](https://make.fun/bounty/gta6-trophy-guide-01)
[![rank](https://make.fun/badge/gta6-trophy-guide-01/zafatanu/gta6-trophy-guide-01/rank.svg)](https://make.fun/bounty/gta6-trophy-guide-01)
[![reward](https://make.fun/badge/gta6-trophy-guide-01/zafatanu/gta6-trophy-guide-01/reward.svg)](https://make.fun/bounty/gta6-trophy-guide-01)

# LEONIDA // PLATINUM FILES — GTA VI Trophy Guide & Tracker

The most trustworthy GTA VI platinum guide: an offline web app covering all 55 PlayStation 5 trophies with their official names, descriptions and grades, a guide in our own words for each one, and a tracker that saves in the browser.

Every fact in the guide is a cited claim — 427 claims in total, 398 of them backed by 2+ sources (PowerPyx, GTABase, Exophase, PSNProfiles, KeenGamer, Push Square, Mobalytics, Beebom, Insider Gaming, EGamers, GamesFuze). The audit strip at the top of the app computes those numbers live from `app/data/trophies.json`; nothing is hand-typed. Where the sources disagree — or a method is still being confirmed — the guide shows both versions in a dispute panel instead of pretending certainty. Only one trophy (Fair Game) has a method still being confirmed: the live PowerPyx page says it is still undergoing confirmation which animal exactly unlocks it. The other five trophies once listed as unconfirmed now have published PowerPyx methods in the guide. The one potentially missable trophy (Positive Mental Attitude, Chapter 1) gets a red banner across the top of every view, a warning on its own page and in the roadmap; every other trophy page says plainly that it is not missable.

Features: checklist saved in localStorage, export/import of progress, filters by grade/kind/earned/hidden/missable plus text search, a spoiler shield that hides story trophies until earned, a 5-phase chapter-ordered roadmap with points of no return, a missable grid, persistent count trackers (meditations, stunts, vehicles, dollars…), a source matrix, and an unconfirmed-method register. Fully offline — the app fetches nothing but its own files. Deterministic views for screenshots: `?view=command|database|trophy|roadmap`, `?trophy=<id or slug>`, `?demo=earned10` (seeds 10 earned trophies for screenshots only, never by default).

## How to run

```sh
node serve.ts
# open http://localhost:8080
```

To build the hand-in output:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` copies `app/` and `screenshots/` into the output directory and writes `dossier.json` there.

## Sources

- PowerPyx trophy guide: https://www.powerpyx.com/gta-6-grand-theft-auto-vi-trophy-guide-roadmap/ (read live 21 Nov 2026)
- GTABase achievements: https://www.gtabase.com/gta-6/achievements (read live 21 Nov 2026)
- GTABase achievements article: https://www.gtabase.com/articles/gta-6/gta-6-achievements-trophies-list-ps5-xbox-series (read live 21 Nov 2026)
- KeenGamer trophy guide: https://www.keengamer.com/articles/guides/gta-6-trophy-guide-platinum-roadmap-all-55-trophies/ (read live 21 Nov 2026)
- Push Square trophy guide: https://www.pushsquare.com/guides/gta-6-trophy-guide-and-roadmap (read live 21 Nov 2026)
- Mobalytics trophy guide: https://mobalytics.gg/gamebase/guides/grand-theft-auto-6-all-trophies (read live 21 Nov 2026)
- Beebom trophy list: https://beebom.com/gta-6-trophy-achievements-list/ (read live 21 Nov 2026)
- Insider Gaming trophy list: https://insider-gaming.com/complete-gta-6-trophy-list-how-to-get-all-trophies-achievements/ (read live 21 Nov 2026)
- EGamers trophy list: https://egamers.io/gta-6-trophy-list-all-55-trophies-and-achievements-plus-the-hardest-ones/ (read live 21 Nov 2026)
- GamesFuze achievements: https://gamesfuze.com/gta-6-wiki/achievements/ (read live 21 Nov 2026)
- Exophase + PSNProfiles: official name, description and grade list, as cited by the competition kit.

This is an unofficial fan guide. No Rockstar Games logo or official artwork is used anywhere.

---

Built for the make.fun bounty [gta6-trophy-guide-01](https://make.fun/bounty/gta6-trophy-guide-01). Referral code: `rtjc383x`.
