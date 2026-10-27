// GENERATED from scene.jsx — rebuild with build-explainer.mjs.
(function () {
// scene.jsx — "Why some bioceramics stain teeth" (test explainer for the
// dental-explainer skill). Four scenes over 34 s; captions only.
// Source: project/uploads/Bioceramic in Dentistry.pdf — fact # and page beside
// each on-screen claim.
const {
  Stage,
  Sprite,
  useTime,
  useSprite,
  Easing,
  interpolate,
  clamp
} = window;

// ── Palette & type (shared with src/scene.jsx) ───────────────────────────────
const C = {
  bg: '#eaf1f8',
  panel: '#ffffff',
  ink: '#102f49',
  inkSoft: '#5c7a97',
  line: '#cfe0ef',
  blue: '#1f6fb2',
  cyan: '#0f9fbd',
  amber: '#d68a24',
  stain: '#7d8590'
};
const SANS = "'IBM Plex Sans', system-ui, sans-serif";
const MONO = "'IBM Plex Mono', ui-monospace, monospace";

// ── Helpers (from src/scene.jsx) ─────────────────────────────────────────────
function Motion({
  children,
  style = {},
  riseY = 16,
  dur = 0.55,
  exit = 0.4
}) {
  const {
    localTime,
    duration
  } = useSprite();
  const exitStart = Math.max(0, duration - exit);
  let opacity = 1,
    ty = 0;
  if (localTime < dur) {
    const t = Easing.easeOutCubic(clamp(localTime / dur, 0, 1));
    opacity = t;
    ty = (1 - t) * riseY;
  } else if (localTime > exitStart) {
    const t = Easing.easeInCubic(clamp((localTime - exitStart) / exit, 0, 1));
    opacity = 1 - t;
    ty = -t * 10;
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      opacity,
      transform: `translateY(${ty}px)`,
      ...style
    }
  }, children);
}
function Eyebrow({
  children,
  x,
  y,
  start,
  end,
  color = C.blue
}) {
  return /*#__PURE__*/React.createElement(Sprite, {
    start: start,
    end: end
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: x,
      top: y
    }
  }, /*#__PURE__*/React.createElement(Motion, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      fontFamily: MONO,
      fontSize: 15,
      letterSpacing: '0.22em',
      textTransform: 'uppercase',
      color,
      fontWeight: 500
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 26,
      height: 2,
      background: color,
      display: 'inline-block'
    }
  }), children))));
}
function Caption({
  start,
  end,
  x,
  y,
  w = 560,
  size = 30,
  children
}) {
  return /*#__PURE__*/React.createElement(Sprite, {
    start: start,
    end: end
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: x,
      top: y,
      width: w
    }
  }, /*#__PURE__*/React.createElement(Motion, null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: SANS,
      fontSize: size,
      lineHeight: 1.25,
      color: C.ink,
      fontWeight: 500
    }
  }, children))));
}

// ── Tooth crown whose dentine greys with `stain` (0..1) ──────────────────────
function Crown({
  x,
  y,
  stain
}) {
  const mix = (a, b, t) => Math.round(a + (b - a) * t);
  const col = `rgb(${mix(250, 125, stain)},${mix(248, 133, stain)},${mix(240, 144, stain)})`;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: x,
      top: y,
      width: 240,
      height: 300
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      top: 0,
      width: 240,
      height: 190,
      background: col,
      border: `3px solid ${C.ink}`,
      borderRadius: '90px 90px 40px 40px'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 40,
      top: 180,
      width: 60,
      height: 120,
      background: col,
      border: `3px solid ${C.ink}`,
      borderTop: 'none',
      borderRadius: '0 0 30px 30px'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 140,
      top: 180,
      width: 60,
      height: 120,
      background: col,
      border: `3px solid ${C.ink}`,
      borderTop: 'none',
      borderRadius: '0 0 30px 30px'
    }
  }));
}
function Chip({
  label,
  sub,
  color
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: C.panel,
      border: `2px solid ${color}`,
      borderRadius: 12,
      padding: '14px 20px',
      width: 480
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: MONO,
      fontSize: 22,
      color,
      fontWeight: 600
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: SANS,
      fontSize: 19,
      color: C.inkSoft,
      marginTop: 4
    }
  }, sub));
}

// ── SCENE 1 — Title (0–6) ────────────────────────────────────────────────────
function SceneTitle() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Eyebrow, {
    x: 110,
    y: 250,
    start: 0.2,
    end: 6
  }, "Aesthetic zone"), /*#__PURE__*/React.createElement(Sprite, {
    start: 0.5,
    end: 6
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 108,
      top: 290
    }
  }, /*#__PURE__*/React.createElement(Motion, {
    riseY: 22
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: SANS,
      fontWeight: 600,
      fontSize: 72,
      lineHeight: 1.02,
      color: C.ink,
      letterSpacing: '-0.02em'
    }
  }, "Why some bioceramics", /*#__PURE__*/React.createElement("br", null), "stain teeth")))));
}

// ── SCENE 2 — The culprits (6–16) ────────────────────────────────────────────
function SceneCulprits() {
  const t = useTime();
  const stain = Easing.easeInOutCubic(clamp((t - 9) / 5, 0, 1));
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Eyebrow, {
    x: 110,
    y: 70,
    start: 6.2,
    end: 16
  }, "The culprits"), /*#__PURE__*/React.createElement(Crown, {
    x: 820,
    y: 200,
    stain: stain
  }), /*#__PURE__*/React.createElement(Sprite, {
    start: 6.6,
    end: 16
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 110,
      top: 150
    }
  }, /*#__PURE__*/React.createElement(Motion, null, /*#__PURE__*/React.createElement(Chip, {
    label: "Bismuth oxide",
    sub: "added to raise radiopacity \xB7 20% of MTA Angelus",
    color: C.amber
  })))), /*#__PURE__*/React.createElement(Sprite, {
    start: 8.2,
    end: 16
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 110,
      top: 270
    }
  }, /*#__PURE__*/React.createElement(Motion, null, /*#__PURE__*/React.createElement(Chip, {
    label: "Iron oxide",
    sub: "in MTA \xB7 can discolour crown and gingiva",
    color: C.stain
  })))), /*#__PURE__*/React.createElement(Caption, {
    start: 10,
    end: 16,
    x: 110,
    y: 430,
    w: 600
  }, "Some formulations discolour tooth or soft tissue through these oxides."));
}

// ── SCENE 3 — How the materials compare (16–26) ──────────────────────────────
function Row({
  start,
  y,
  name,
  note,
  tone
}) {
  return /*#__PURE__*/React.createElement(Sprite, {
    start: start,
    end: 26
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 110,
      top: y
    }
  }, /*#__PURE__*/React.createElement(Motion, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 24,
      height: 24,
      borderRadius: '50%',
      background: tone,
      border: `2px solid ${C.ink}`
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 260,
      fontFamily: SANS,
      fontSize: 30,
      fontWeight: 600,
      color: C.ink
    }
  }, name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: SANS,
      fontSize: 24,
      color: C.inkSoft
    }
  }, note)))));
}
function SceneCompare() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Eyebrow, {
    x: 110,
    y: 70,
    start: 16.2,
    end: 26
  }, "How they compare"), /*#__PURE__*/React.createElement(Row, {
    start: 16.6,
    y: 170,
    name: "Grey MTA",
    note: "known for dentine discolouration",
    tone: "#8a9099"
  }), /*#__PURE__*/React.createElement(Row, {
    start: 18.6,
    y: 260,
    name: "White MTA",
    note: "developed to reduce it",
    tone: "#e9ecef"
  }), /*#__PURE__*/React.createElement(Row, {
    start: 20.6,
    y: 350,
    name: "Biodentine",
    note: "only slight discolouration \xB7 no staining heavy metals",
    tone: "#ffffff"
  }), /*#__PURE__*/React.createElement(Sprite, {
    start: 22.5,
    end: 26
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 110,
      top: 470,
      fontFamily: MONO,
      fontSize: 15,
      color: C.inkSoft
    }
  }, /*#__PURE__*/React.createElement(Motion, null, "Source: Bioceramic in Dentistry, pp. 18, 22, 33"))));
}

// ── SCENE 4 — Takeaway (26–34) ───────────────────────────────────────────────
function SceneTakeaway() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Eyebrow, {
    x: 110,
    y: 200,
    start: 26.2,
    end: 34,
    color: C.cyan
  }, "Clinical takeaway"), /*#__PURE__*/React.createElement(Caption, {
    start: 26.6,
    end: 34,
    x: 108,
    y: 250,
    w: 1000,
    size: 48
  }, "Near the visible gingival margin, choose white or heavy-metal-free formulations."));
}
function DiscolorationScene() {
  return /*#__PURE__*/React.createElement(Stage, {
    width: 1280,
    height: 720,
    duration: 34,
    background: C.bg,
    persistKey: "discoloration"
  }, /*#__PURE__*/React.createElement(Sprite, {
    start: 0,
    end: 6
  }, /*#__PURE__*/React.createElement(SceneTitle, null)), /*#__PURE__*/React.createElement(Sprite, {
    start: 6,
    end: 16
  }, /*#__PURE__*/React.createElement(SceneCulprits, null)), /*#__PURE__*/React.createElement(Sprite, {
    start: 16,
    end: 26
  }, /*#__PURE__*/React.createElement(SceneCompare, null)), /*#__PURE__*/React.createElement(Sprite, {
    start: 26,
    end: 34
  }, /*#__PURE__*/React.createElement(SceneTakeaway, null)));
}
window.DiscolorationScene = DiscolorationScene;
})();
