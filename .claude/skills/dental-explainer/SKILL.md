---
name: dental-explainer
description: Turn a dental source (PDF guide, chapter, paper) into an animated, caption-only clinical explainer (16:9 HTML timeline with play/scrub controls), built on this repo's engine in src/engine.jsx. Use for "make an explainer/animation/video/lecture animation about…", "turn this PDF into an explainer", "animate the mechanism of…", or a new explainer like the bioceramics one. Not for slide decks (use a slides skill), static figures, or evidence summaries (use dental-evidence-summary).
---

# Dental explainer (PDF → animated clinical explainer)

Output is a self-contained page in `explainers/<slug>/`. It reuses the repo's `vendor/` (React, IBM Plex) and the compiled `build/engine.js`. Never edit the existing root `src/scene.jsx` or `index.html` for a new explainer.

## Steps

1. **Intake — ask only what's missing.** Defaults come from the user's first explainer; say which ones you're using:

   | Question | Default |
   |---|---|
   | Goal & audience | Practising dentists / endodontists |
   | Topics to cover | — always ask |
   | Length | ~30 s per topic; ask if > 2 min |
   | Aspect | 16:9 (1280×720) |
   | Tone & colour | Clean clinical; blues/whites; IBM Plex Sans/Mono |
   | Narration | On-screen captions only |

2. **Fact sheet from the source.** Extract every number and claim you plan to show:
   `python3 .claude/skills/dental-explainer/scripts/find-fact.py "<file.pdf>" "<regex>" ...`
   Write it as a table: `# | claim as it will appear on screen | source wording | PDF page`. Anything the script reports **NOT FOUND** stays off screen. No numbers from memory.

3. **Storyboard first, then code.** Show the user a table: `time | scene | what's shown | captions | fact #`. Each scene has an establishing frame, then the detail. **Wait for OK before building.**
   - Reading pace (captions only): hold each caption on screen for at least **1 s + 0.3 s per word**.

4. **Scaffold**:
   - `mkdir -p explainers/<slug>` and copy `templates/index.html` into it. Replace `{{TITLE}}` and `{{COMPONENT}}` (e.g. `DiscolorationScene`).
   - Write `explainers/<slug>/scene.jsx`. Copy the palette `C`, the fonts, and the `Motion` and `Eyebrow` helpers from the top of `src/scene.jsx` so the style matches. Read primitives off `window`: `const { Stage, Sprite, useTime, useSprite, Easing, interpolate, clamp } = window;`
   - Root component: `<Stage width={1280} height={720} duration={…} background={C.bg} persistKey="<slug>">`, and finish with `window.<Component> = <Component>;`.

5. **Scene rules** (learnt from the first explainer):
   - Every `<Sprite>` gets a **scene-bounded** `start`/`end`. Never use `keepMounted` or `end={9999}`, because those elements ghost into later scenes.
   - One reusable component per visual element (gauge, tooth, bar chart). Keep hand-drawn SVG simple.
   - Each on-screen number keeps its fact # in a comment beside it: `{/* F3 p.19 */}`.

6. **Build & check**:
   - First time only: `npm install`.
   - `node .claude/skills/dental-explainer/scripts/build-explainer.mjs explainers/<slug>`
   - `node .claude/skills/dental-explainer/scripts/snapshot.mjs explainers/<slug> <scratchpad>/shots <mid-point of each scene> <one time just after each scene ends>`
   - Look at every screenshot. Check that text fits **without unwanted line breaks inside names**, nothing from the previous scene remains, and there are **no console errors**. Fix and repeat.
   - **Re-check every on-screen sentence against the fact sheet after building.** Wording drifts while coding: a test run added "over time", which isn't in the source. Any phrase not backed by a fact # gets rewritten from the source wording or removed.

7. **Deliver**: give the path, how to open it (`explainers/<slug>/index.html`, or `npm run serve` then `/explainers/<slug>/`), the fact sheet, and the screenshots. Do not publish, upload or send it anywhere without the user's OK.

## Good example 1 — fact sheet row

> | F5 | "Biodentine: only slight discolouration" | "it produces only slight clinical discolouration — an advantage over MTA in aesthetic regions (Keskin et al., 2015)" | p.22 |

**Why it's good:** the on-screen wording stays faithful to the source and can be checked by page.

## Good example 2 — storyboard row

> | 0:08–0:18 | Why it stains | Tooth crown greys as a "Bi₂O₃" chip pulses | "Bismuth oxide is added for radiopacity" (F3) · "…and can darken dentine" (F2) | F2, F3 |

**Why it's good:** each caption maps to a fact #, and the visual shows the mechanism rather than restating the caption.

## Bad example

> Scene 3: "Biodentine causes 0% discolouration vs 83% with MTA."

**Why it's bad:** these numbers aren't in the source PDF (they come from a separate review). On-screen figures must come from the fact sheet, or the user must add the second source explicitly.
