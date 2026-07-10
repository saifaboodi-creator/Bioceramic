# Bioceramics in Endodontics — Animated Clinical Explainer

A ~2:18 animated clinical explainer on calcium-silicate bioceramics (MTA,
Biodentine, BC Sealer) in endodontics, for practicing dentists and
endodontists. 16:9, clinical blues/whites, IBM Plex type, on-screen captions
only (no audio). Built as a standalone React animation with a built-in
timeline/transport — no build server required to view, no external runtime.

## Run it

Just open **`index.html`** in a browser — it loads vendored React, the
precompiled scene, and self-hosted IBM Plex fonts entirely from local files, so
it works straight from `file://` with **no network at all**.

For a clean http origin instead:

```bash
npm run serve      # → http://localhost:8080
```

### Controls

- **Space** — play / pause
- **← / →** — seek 0.1 s (hold **Shift** for 1 s)
- **0** or **Home** — return to start
- Click / drag the scrub bar to seek; hover to preview

The playhead position is remembered across reloads (localStorage).

## The six scenes

| Time        | Scene                                                                    |
|-------------|--------------------------------------------------------------------------|
| 0:00–0:09   | **Title** — animated concentric rings, positioning line                  |
| 0:09–0:33   | **Why they matter** — the MTA statement, bioinert/bioactive/bioresorbable classification, four defining properties |
| 0:33–1:08   | **Setting & sealing** — Portland-cement composition, silicate + aluminate reactions, an animated pH gauge (10.2 → 12.5) with Ca²⁺ release, hydroxyapatite tags growing into dentine |
| 1:08–1:35   | **Clinical uses** — a schematic molar with sites highlighted in sequence (pulp capping, perforation repair, apexification, root-end filling, obturation) |
| 1:35–2:02   | **Comparison** — animated setting-time bars and radiopacity for MTA, MTA Angelus, Biodentine, BC Sealer, plus the sealer takeaway |
| 2:02–2:18   | **Closing** — the bottom line and the "long-term RCTs still needed" caveat |

## Project layout

```
index.html      Entry point — loads React + compiled scene, mounts it
src/engine.jsx  Timeline engine: Stage / Sprite primitives, hooks, easing, transport
src/scene.jsx   The explainer itself — six scenes over a 138 s timeline
build/          Precompiled JS output (generated; committed so index.html runs as-is)
vendor/         Pinned React 18.3.1 UMD, self-hosted IBM Plex woff2 + fonts.css
build.mjs       Babel build: src/*.jsx → build/*.js
serve.mjs       Zero-dependency static file server
project/        Original Claude Design handoff (design source, chat transcript, PDF)
```

## Editing

The animation lives in `src/scene.jsx` (content, layout, timing) and
`src/engine.jsx` (the Stage/Sprite timeline machinery). After editing, rebuild
the browser bundles:

```bash
npm install      # first time only — installs Babel
npm run build    # src/*.jsx → build/*.js
```

`index.html` loads the compiled `build/*.js` directly (classic scripts wired
together through `window`), so there is no runtime Babel and no bundler.

## Provenance

Recreated from a [Claude Design](https://claude.ai/design) handoff. The original
prototype (`project/Bioceramics Explainer.dc.html` + `project/bioceramic-scene.jsx`)
ran on Claude Design's proprietary Design Components runtime; this
implementation reproduces it pixel-for-pixel as a self-contained app with that
runtime removed. All figures are drawn from the source clinical text in
`project/uploads/`.
