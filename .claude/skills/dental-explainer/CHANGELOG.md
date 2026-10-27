# CHANGELOG — dental-explainer

## 2026-10-27 — v1.1 (after test: "Why some bioceramics stain teeth", 34 s, explainers/discoloration/)
- Fixed `scripts/snapshot.mjs`: ESM `import 'playwright'` can't see the pre-installed browser; now uses `createRequire`.
- Added to step 6: re-check every on-screen sentence against the fact sheet **after** building. The test caption drifted to "…over time", which isn't in the source (now rewritten from p.60).
- Added to step 6: look for unwanted line breaks inside names ("MTA / Angelus" wrapped; box widened).
- Test note: the storyboard approval stop was skipped for this test only; in real use, wait for OK.

## 2026-10-27 — v1.0
- First version: fact-finder (PDF page per claim), per-explainer build script, screenshot + console-error checker, index.html template.
