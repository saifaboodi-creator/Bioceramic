// GENERATED from src/scene.jsx — run `node build.mjs` to rebuild.
(function () {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// scene.jsx — "Bioceramics in Endodontics" explainer.
//
// Verbatim from the design bundle's bioceramic-scene.jsx (the DC-only TimeLabel
// commenting helper is the sole omission). Six scenes over a 138-second
// timeline; clinical blues/whites; IBM Plex type; on-screen captions only.
//
// Reads timeline primitives from window (engine.jsx loaded first).
const {
  Stage,
  Sprite,
  useTime,
  useSprite,
  Easing,
  interpolate,
  animate,
  clamp
} = window;

// ── Palette (clinical blues / whites) ───────────────────────────────────────
const C = {
  bg: '#eaf1f8',
  bgDeep: '#dfeaf4',
  panel: '#ffffff',
  ink: '#102f49',
  inkSoft: '#5c7a97',
  line: '#cfe0ef',
  blue: '#1f6fb2',
  blueDeep: '#0f4576',
  cyan: '#0f9fbd',
  amber: '#d68a24',
  // reserved: high-pH / bioactive highlight only
  coral: '#d98a86' // pulp tissue
};
const SANS = "'IBM Plex Sans', system-ui, sans-serif";
const MONO = "'IBM Plex Mono', ui-monospace, monospace";
const W = 1280,
  H = 720;

// ── Small helpers ────────────────────────────────────────────────────────────
// Motion fades+rises children in on entry and out before the Sprite window ends.
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
      willChange: 'transform,opacity',
      ...style
    }
  }, children);
}
function Eyebrow({
  children,
  color = C.blue,
  x,
  y,
  start,
  end
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

// A window-scoped 0→1 tween on absolute timeline seconds.
const useWin = (start, end) => {
  const t = useTime();
  return clamp((t - start) / (end - start), 0, 1);
};

// ── SCENE 1 — Title (0–9) ───────────────────────────────────────────────────
function SceneTitle() {
  const t = useTime();
  const rings = [0, 1, 2, 3].map(i => {
    const phase = (t * 0.35 + i * 0.25) % 1;
    const r = 60 + phase * 520;
    const op = (1 - phase) * 0.18;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        position: 'absolute',
        left: 900 - r,
        top: 360 - r,
        width: r * 2,
        height: r * 2,
        borderRadius: '50%',
        border: `1.5px solid ${C.blue}`,
        opacity: op
      }
    });
  });
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0
    }
  }, rings), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 900,
      top: 360,
      width: 26,
      height: 26,
      borderRadius: '50%',
      background: C.cyan,
      transform: 'translate(-50%,-50%)',
      boxShadow: `0 0 0 10px ${C.cyan}22`
    }
  }), /*#__PURE__*/React.createElement(Eyebrow, {
    x: 110,
    y: 210,
    start: 0.2,
    end: 9
  }, "An Illustrated Clinical Guide"), /*#__PURE__*/React.createElement(Sprite, {
    start: 0.5,
    end: 9
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 108,
      top: 246
    }
  }, /*#__PURE__*/React.createElement(Motion, {
    riseY: 22
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: SANS,
      fontWeight: 600,
      fontSize: 96,
      lineHeight: 0.98,
      color: C.ink,
      letterSpacing: '-0.02em'
    }
  }, "Bioceramics", /*#__PURE__*/React.createElement("br", null), "in Endodontics")))), /*#__PURE__*/React.createElement(Sprite, {
    start: 1.4,
    end: 9
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 112,
      top: 470,
      maxWidth: 620
    }
  }, /*#__PURE__*/React.createElement(Motion, null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: SANS,
      fontWeight: 400,
      fontSize: 27,
      lineHeight: 1.45,
      color: C.inkSoft
    }
  }, "How calcium-silicate materials turned uncertain procedures into predictable, biologically driven treatment.")))), /*#__PURE__*/React.createElement(Sprite, {
    start: 2.2,
    end: 9
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 112,
      top: 600,
      fontFamily: MONO,
      fontSize: 14,
      color: C.blue,
      letterSpacing: '0.06em'
    }
  }, /*#__PURE__*/React.createElement(Motion, null, "MTA \xB7 Biodentine \xB7 BC Sealer \xB7 calcium-silicate chemistry"))));
}

// ── SCENE 2 — What they are / why they matter (9–33) ──────────────────────────
const PROPS4 = [{
  k: 'Set in a wet field',
  d: 'Moisture is required, not avoided — they set in the wet canal.',
  ic: 'drop'
}, {
  k: 'High pH on setting',
  d: 'Liberated Ca(OH)₂ raises pH above 12 — antibacterial while unset.',
  ic: 'ph'
}, {
  k: 'Dimensionally stable',
  d: 'Marginal expansion, no shrinkage — an excellent, lasting seal.',
  ic: 'seal'
}, {
  k: 'Form hydroxyapatite',
  d: 'Bond to dentine and induce tissue healing — bioactive once set.',
  ic: 'apatite'
}];
function MiniIcon({
  ic
}) {
  const s = {
    stroke: C.blue,
    strokeWidth: 2,
    fill: 'none',
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  };
  return /*#__PURE__*/React.createElement("svg", {
    width: "34",
    height: "34",
    viewBox: "0 0 34 34"
  }, ic === 'drop' && /*#__PURE__*/React.createElement("path", _extends({
    d: "M17 5 C17 5 27 16 27 22 A10 10 0 0 1 7 22 C7 16 17 5 17 5 Z"
  }, s)), ic === 'ph' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", _extends({
    d: "M6 24 H28"
  }, s)), /*#__PURE__*/React.createElement("path", _extends({
    d: "M10 24 V13 M17 24 V8 M24 24 V17"
  }, s))), ic === 'seal' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", _extends({
    x: "7",
    y: "9",
    width: "20",
    height: "16",
    rx: "2"
  }, s)), /*#__PURE__*/React.createElement("path", _extends({
    d: "M7 15 H27"
  }, s))), ic === 'apatite' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", _extends({
    d: "M17 6 L27 17 L17 28 L7 17 Z"
  }, s)), /*#__PURE__*/React.createElement("path", _extends({
    d: "M17 6 V28 M7 17 H27"
  }, s))));
}
function SceneWhy() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Eyebrow, {
    x: 108,
    y: 78,
    start: 9.2,
    end: 19.2
  }, "Why they changed endodontics"), /*#__PURE__*/React.createElement(Sprite, {
    start: 9.4,
    end: 19.2
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 106,
      top: 118,
      maxWidth: 1060
    }
  }, /*#__PURE__*/React.createElement(Motion, {
    riseY: 18
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: SANS,
      fontWeight: 500,
      fontSize: 46,
      lineHeight: 1.18,
      color: C.ink,
      letterSpacing: '-0.015em'
    }
  }, "In a single generation, mineral trioxide aggregate made sealing a perforation, capping a pulp and treating an open apex ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: C.blue
    }
  }, "predictable."))))), /*#__PURE__*/React.createElement(Sprite, {
    start: 13.0,
    end: 19.2
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 106,
      top: 372
    }
  }, /*#__PURE__*/React.createElement(Motion, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14
    }
  }, [['Bioinert', 'coexists'], ['Bioactive', 'bonds to tissue'], ['Bioresorbable', 'replaced by tissue']].map(([a, b], i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      padding: '14px 20px',
      borderRadius: 12,
      background: i === 1 ? C.blue : C.panel,
      border: `1px solid ${i === 1 ? C.blue : C.line}`,
      minWidth: 180
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: SANS,
      fontWeight: 600,
      fontSize: 22,
      color: i === 1 ? '#fff' : C.ink
    }
  }, a), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: MONO,
      fontSize: 13,
      color: i === 1 ? '#dbeafc' : C.inkSoft,
      marginTop: 3
    }
  }, b))))))), /*#__PURE__*/React.createElement(Sprite, {
    start: 13.4,
    end: 19.2
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 640,
      top: 402,
      maxWidth: 520
    }
  }, /*#__PURE__*/React.createElement(Motion, null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: SANS,
      fontSize: 20,
      color: C.inkSoft
    }
  }, "Endodontic materials are the ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: C.ink
    }
  }, "bioactive"), " calcium-silicate cements and sealers.")))), /*#__PURE__*/React.createElement(Eyebrow, {
    x: 108,
    y: 78,
    start: 19.8,
    end: 33,
    color: C.cyan
  }, "Four properties that define them"), PROPS4.map((p, i) => /*#__PURE__*/React.createElement(Sprite, {
    key: i,
    start: 20.2 + i * 0.5,
    end: 33
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 106 + i % 2 * 555,
      top: 150 + Math.floor(i / 2) * 220,
      width: 520
    }
  }, /*#__PURE__*/React.createElement(Motion, {
    riseY: 20
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: C.panel,
      border: `1px solid ${C.line}`,
      borderRadius: 16,
      padding: '26px 28px',
      boxShadow: '0 12px 30px rgba(16,47,73,0.06)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 56,
      height: 56,
      borderRadius: 12,
      background: C.bgDeep,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(MiniIcon, {
    ic: p.ic
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: MONO,
      fontSize: 14,
      color: C.blue
    }
  }, "0", i + 1)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: SANS,
      fontWeight: 600,
      fontSize: 28,
      color: C.ink,
      marginTop: 16
    }
  }, p.k), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: SANS,
      fontSize: 19,
      color: C.inkSoft,
      marginTop: 6,
      lineHeight: 1.45
    }
  }, p.d)))))));
}

// ── SCENE 3 — Setting & sealing mechanism (33–68) ─────────────────────────────
function IonCloud({
  start,
  end,
  cx,
  cy
}) {
  const p = useWin(start, end);
  const ions = [];
  for (let i = 0; i < 9; i++) {
    const ang = i / 9 * Math.PI * 2 + i;
    const local = clamp(p * 1.4 - i * 0.05, 0, 1);
    const dist = local * (90 + i % 3 * 34);
    const x = cx + Math.cos(ang) * dist;
    const y = cy + Math.sin(ang) * dist * 0.85;
    const op = local < 0.15 ? local / 0.15 : (1 - local) * 0.9;
    ions.push(/*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        position: 'absolute',
        left: x,
        top: y,
        transform: 'translate(-50%,-50%)',
        fontFamily: MONO,
        fontSize: 13,
        color: C.blue,
        opacity: op,
        fontWeight: 600
      }
    }, "Ca\xB2\u207A"));
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, ions);
}
function PhGauge({
  start,
  end,
  x,
  y
}) {
  const p = useWin(start, end);
  const ph = 10.2 + (12.5 - 10.2) * Easing.easeInOutCubic(p);
  const h = 260;
  const fillH = (ph - 7) / 6 * h;
  const hot = ph >= 12;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: x,
      top: y
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: 74,
      height: h,
      borderRadius: 37,
      background: C.bgDeep,
      border: `1px solid ${C.line}`,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      height: fillH,
      background: `linear-gradient(to top, ${C.blue}, ${hot ? C.amber : C.cyan})`
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: (12 - 7) / 6 * h,
      height: 2,
      background: C.ink,
      opacity: 0.35
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 86,
      bottom: (12 - 7) / 6 * h - 8,
      fontFamily: MONO,
      fontSize: 13,
      color: C.inkSoft
    }
  }, "pH 12"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: -6,
      top: -50,
      fontFamily: SANS,
      fontWeight: 700,
      fontSize: 38,
      whiteSpace: 'nowrap',
      color: hot ? C.amber : C.blueDeep
    }
  }, "pH ", ph.toFixed(1)));
}
function DentineBond({
  start,
  end,
  x,
  y
}) {
  const p = useWin(start, end);
  const tubes = [0, 1, 2, 3, 4];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: x,
      top: y,
      width: 460,
      height: 280
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      top: 0,
      width: 150,
      height: 280,
      borderRadius: '10px 0 0 10px',
      background: `linear-gradient(135deg, ${C.blue}, ${C.blueDeep})`
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 20,
      top: 16,
      fontFamily: MONO,
      fontSize: 13,
      color: '#dbeafc'
    }
  }, "SET CEMENT"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 150,
      top: 0,
      width: 310,
      height: 280,
      background: '#f4e7dc',
      borderRadius: '0 10px 10px 0',
      border: '1px solid #e6d3c2',
      borderLeft: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 322,
      top: 16,
      fontFamily: MONO,
      fontSize: 13,
      color: '#a97e5c'
    }
  }, "DENTINE"), tubes.map(i => {
    const ty = 52 + i * 44;
    const grow = clamp(p * 1.3 - i * 0.08, 0, 1);
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: i
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        left: 150,
        top: ty,
        width: 300,
        height: 10,
        background: '#e7d2bf',
        borderRadius: 5
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        left: 150,
        top: ty + 1,
        width: grow * (150 + i * 20),
        height: 8,
        background: `linear-gradient(90deg, ${C.cyan}, ${C.amber})`,
        borderRadius: 4
      }
    }));
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 150,
      top: 252,
      fontFamily: MONO,
      fontSize: 12,
      color: C.blueDeep
    }
  }, "hydroxyapatite tags \u2192 bond"));
}
function SceneMechanism() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Eyebrow, {
    x: 108,
    y: 72,
    start: 33.2,
    end: 45.3
  }, "How they set & seal"), /*#__PURE__*/React.createElement(Sprite, {
    start: 33.5,
    end: 45.3
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 106,
      top: 112,
      maxWidth: 520
    }
  }, /*#__PURE__*/React.createElement(Motion, {
    riseY: 18
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: SANS,
      fontWeight: 500,
      fontSize: 34,
      color: C.ink,
      lineHeight: 1.2,
      letterSpacing: '-0.01em'
    }
  }, "MTA is essentially a purified Portland cement."), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: SANS,
      fontSize: 20,
      color: C.inkSoft,
      marginTop: 14,
      lineHeight: 1.5
    }
  }, "Mixed with water, two reactions drive the set \u2014 and give the material its biology.")))), [{
    t: 'Silicate reaction',
    d: 'Silicate phases hydrate → C–S–H + calcium hydroxide. Raises pH, seeds apatite — the bioactive engine.',
    c: C.blue,
    s: 34.6
  }, {
    t: 'Aluminate reaction',
    d: 'Tricalcium aluminate + water + sulfate → ettringite, then monosulfate. Governs the early set.',
    c: C.cyan,
    s: 35.2
  }].map((r, i) => /*#__PURE__*/React.createElement(Sprite, {
    key: i,
    start: r.s,
    end: 45.3
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 640,
      top: 150 + i * 168,
      width: 540
    }
  }, /*#__PURE__*/React.createElement(Motion, {
    riseY: 20
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: C.panel,
      border: `1px solid ${C.line}`,
      borderLeft: `4px solid ${r.c}`,
      borderRadius: 14,
      padding: '22px 26px',
      boxShadow: '0 10px 26px rgba(16,47,73,0.06)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: MONO,
      fontSize: 14,
      color: r.c
    }
  }, "0", i + 1), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: SANS,
      fontWeight: 600,
      fontSize: 26,
      color: C.ink
    }
  }, r.t)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: SANS,
      fontSize: 19,
      color: C.inkSoft,
      marginTop: 8,
      lineHeight: 1.5
    }
  }, r.d)))))), /*#__PURE__*/React.createElement(Sprite, {
    start: 46,
    end: 56.8
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 106,
      top: 118,
      maxWidth: 460
    }
  }, /*#__PURE__*/React.createElement(Motion, {
    riseY: 16
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: SANS,
      fontWeight: 500,
      fontSize: 34,
      color: C.ink,
      lineHeight: 1.2
    }
  }, "Alkalinity climbs as calcium ions release."), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: SANS,
      fontSize: 20,
      color: C.inkSoft,
      marginTop: 14,
      lineHeight: 1.5
    }
  }, "pH rises from ~10.2 at mixing to ~12.5 by three hours \u2014 antibacterial while unset, and the driver of mineralised-apatite deposition.")))), /*#__PURE__*/React.createElement(Sprite, {
    start: 46.2,
    end: 56.8
  }, /*#__PURE__*/React.createElement(PhGauge, {
    start: 46.6,
    end: 54,
    x: 640,
    y: 300
  })), /*#__PURE__*/React.createElement(Sprite, {
    start: 46.2,
    end: 56.8
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 940,
      top: 360
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      top: 0,
      width: 90,
      height: 90,
      borderRadius: 16,
      background: `linear-gradient(135deg,${C.blue},${C.blueDeep})`
    }
  }), /*#__PURE__*/React.createElement(IonCloud, {
    start: 47,
    end: 56.5,
    cx: 45,
    cy: 45
  }))), /*#__PURE__*/React.createElement(Sprite, {
    start: 57.5,
    end: 68
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 106,
      top: 118,
      maxWidth: 440
    }
  }, /*#__PURE__*/React.createElement(Motion, {
    riseY: 16
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: SANS,
      fontWeight: 500,
      fontSize: 34,
      color: C.ink,
      lineHeight: 1.2
    }
  }, "Apatite forms \u2014 and bonds to dentine."), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: SANS,
      fontSize: 20,
      color: C.inkSoft,
      marginTop: 14,
      lineHeight: 1.5
    }
  }, "Released Ca(OH)\u2082 reacts with tissue phosphates to precipitate hydroxyapatite. Mineral tags grow into the dentinal tubules, reinforcing the seal.")))), /*#__PURE__*/React.createElement(Sprite, {
    start: 57.8,
    end: 68
  }, /*#__PURE__*/React.createElement(DentineBond, {
    start: 58.4,
    end: 66,
    x: 620,
    y: 210
  })));
}

// ── SCENE 4 — Clinical uses (68–95) ───────────────────────────────────────────
const SITES = [{
  id: 'pulp',
  label: 'Pulp capping & vital pulp therapy',
  px: 170,
  py: 132,
  s: 71.5
}, {
  id: 'furc',
  label: 'Perforation repair (furcal / lateral)',
  px: 170,
  py: 246,
  s: 74.5
}, {
  id: 'apex',
  label: 'Apexification — apical plug',
  px: 133,
  py: 452,
  s: 77.5
}, {
  id: 'root',
  label: 'Root-end filling (retrograde)',
  px: 214,
  py: 452,
  s: 80.5
}, {
  id: 'obt',
  label: 'Canal obturation & sealing',
  px: 195,
  py: 330,
  s: 83.5
}];
function ToothSchematic() {
  return /*#__PURE__*/React.createElement("svg", {
    width: "348",
    height: "500",
    viewBox: "0 0 348 500",
    style: {
      position: 'absolute',
      left: 0,
      top: 0
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M64,92 C58,34 290,34 284,92 C296,150 296,182 282,206 L66,206 C52,182 52,150 64,92 Z",
    fill: "#f3f8fc",
    stroke: C.blue,
    strokeWidth: "2.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M98,204 C92,300 86,398 122,452 C136,472 156,454 156,398 L156,204 Z",
    fill: "#f3f8fc",
    stroke: C.blue,
    strokeWidth: "2.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M250,204 C256,300 262,398 226,452 C212,472 192,454 192,398 L192,204 Z",
    fill: "#f3f8fc",
    stroke: C.blue,
    strokeWidth: "2.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M126,116 C126,102 222,102 222,116 L214,186 L134,186 Z",
    fill: C.coral,
    opacity: "0.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M138,186 C130,300 128,400 132,446",
    fill: "none",
    stroke: C.coral,
    strokeWidth: "9",
    strokeLinecap: "round",
    opacity: "0.6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M210,186 C218,300 220,400 214,446",
    fill: "none",
    stroke: C.coral,
    strokeWidth: "9",
    strokeLinecap: "round",
    opacity: "0.6"
  }));
}
function SiteMarker({
  site,
  active
}) {
  const scale = active ? 1 : 0.7;
  const op = active ? 1 : 0.28;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: site.px,
      top: site.py,
      transform: `translate(-50%,-50%) scale(${scale})`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 22,
      height: 22,
      borderRadius: '50%',
      background: active ? C.amber : C.blue,
      opacity: op,
      boxShadow: active ? `0 0 0 8px ${C.amber}22` : 'none'
    }
  }));
}
function SceneClinical() {
  const t = useTime();
  const activeIdx = SITES.reduce((acc, s, i) => t >= s.s ? i : acc, -1);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Eyebrow, {
    x: 108,
    y: 72,
    start: 68.4,
    end: 95
  }, "One material, many clinical roles"), /*#__PURE__*/React.createElement(Sprite, {
    start: 68.6,
    end: 95
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 106,
      top: 108,
      maxWidth: 640
    }
  }, /*#__PURE__*/React.createElement(Motion, {
    riseY: 16
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: SANS,
      fontWeight: 500,
      fontSize: 40,
      color: C.ink,
      lineHeight: 1.16,
      letterSpacing: '-0.015em'
    }
  }, "From the surgical root end to the immature tooth.")))), /*#__PURE__*/React.createElement(Sprite, {
    start: 69,
    end: 95
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 200,
      top: 190,
      width: 348,
      height: 500
    }
  }, /*#__PURE__*/React.createElement(Motion, {
    dur: 0.7,
    riseY: 0
  }, /*#__PURE__*/React.createElement(ToothSchematic, null), SITES.map((s, i) => /*#__PURE__*/React.createElement(SiteMarker, {
    key: s.id,
    site: s,
    active: i === activeIdx
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 660,
      top: 250
    }
  }, SITES.map((s, i) => /*#__PURE__*/React.createElement(Sprite, {
    key: s.id,
    start: s.s,
    end: 95
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      top: i * 74,
      width: 560
    }
  }, /*#__PURE__*/React.createElement(Motion, {
    riseY: 18,
    exit: 0.3
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 18,
      opacity: i === activeIdx ? 1 : 0.4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: MONO,
      fontSize: 15,
      color: i === activeIdx ? C.amber : C.blue,
      width: 30
    }
  }, "0", i + 1), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: SANS,
      fontWeight: i === activeIdx ? 600 : 500,
      fontSize: 27,
      color: C.ink
    }
  }, s.label))))))));
}

// ── SCENE 5 — Material comparison (95–122) ────────────────────────────────────
const MATS = [{
  n: 'MTA (ProRoot)',
  set: 165,
  setL: '~165 min',
  rad: '7.2',
  note: 'Reference for sealing & bioactivity — but long set',
  c: C.blueDeep
}, {
  n: 'MTA Angelus',
  set: 14,
  setL: '~14 min',
  rad: 'lower',
  note: 'Sulfate removed → far faster set',
  c: C.blue
}, {
  n: 'Biodentine',
  set: 11,
  setL: '~10–12 min',
  rad: '>3',
  note: 'Fast set, good aesthetics, high Ca²⁺ release',
  c: C.cyan
}, {
  n: 'BC Sealer',
  set: null,
  setL: 'water-dependent',
  rad: '3.83',
  note: 'Pre-mixed sealer; high pH; hard to remove',
  c: C.blue
}];
const SETMAX = 180;
function SceneCompare() {
  const grow = useWin(96.5, 101);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Eyebrow, {
    x: 108,
    y: 72,
    start: 95.4,
    end: 122,
    color: C.cyan
  }, "Comparing the main materials"), /*#__PURE__*/React.createElement(Sprite, {
    start: 95.6,
    end: 122
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 106,
      top: 108,
      maxWidth: 900
    }
  }, /*#__PURE__*/React.createElement(Motion, {
    riseY: 16
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: SANS,
      fontWeight: 500,
      fontSize: 40,
      color: C.ink,
      lineHeight: 1.16,
      letterSpacing: '-0.015em'
    }
  }, "Newer cements trade a little radiopacity for a ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: C.blue
    }
  }, "much faster set."))))), /*#__PURE__*/React.createElement(Sprite, {
    start: 96,
    end: 122
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 108,
      top: 202,
      width: 1064
    }
  }, /*#__PURE__*/React.createElement(Motion, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      fontFamily: MONO,
      fontSize: 13,
      letterSpacing: '0.08em',
      color: C.inkSoft,
      textTransform: 'uppercase'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 250
    }
  }, "Material"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, "Setting time"), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 150,
      textAlign: 'right'
    }
  }, "Radiopacity \xB7 mm Al"))))), MATS.map((m, i) => {
    const barMax = m.set == null ? 0.12 : m.set / SETMAX;
    return /*#__PURE__*/React.createElement(Sprite, {
      key: i,
      start: 96.4 + i * 0.4,
      end: 122
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        left: 108,
        top: 238 + i * 96,
        width: 1064
      }
    }, /*#__PURE__*/React.createElement(Motion, {
      riseY: 18
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        paddingTop: 14
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 250
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: SANS,
        fontWeight: 600,
        fontSize: 24,
        color: C.ink
      }
    }, m.n), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: SANS,
        fontSize: 15,
        color: C.inkSoft,
        marginTop: 3,
        maxWidth: 230,
        lineHeight: 1.3
      }
    }, m.note)), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        paddingRight: 24
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        height: 26,
        background: C.bgDeep,
        borderRadius: 13,
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: `${barMax * grow * 100}%`,
        background: m.set == null ? `repeating-linear-gradient(45deg, ${C.blue} 0 8px, ${C.cyan} 8px 16px)` : `linear-gradient(90deg, ${m.c}, ${C.cyan})`,
        borderRadius: 13
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: MONO,
        fontSize: 14,
        color: C.blueDeep,
        marginTop: 6
      }
    }, m.setL)), /*#__PURE__*/React.createElement("div", {
      style: {
        width: 150,
        textAlign: 'right',
        fontFamily: SANS,
        fontWeight: 600,
        fontSize: 30,
        color: C.blue
      }
    }, m.rad)), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 1,
        background: C.line,
        marginTop: 14
      }
    }))));
  }), /*#__PURE__*/React.createElement(Sprite, {
    start: 112.5,
    end: 122
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 108,
      top: 636,
      width: 1064
    }
  }, /*#__PURE__*/React.createElement(Motion, {
    riseY: 16
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: C.blue,
      borderRadius: 14,
      padding: '18px 26px',
      display: 'flex',
      alignItems: 'center',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: MONO,
      fontSize: 13,
      letterSpacing: '0.14em',
      color: '#bcd9f5',
      textTransform: 'uppercase'
    }
  }, "Sealers"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: SANS,
      fontSize: 21,
      color: '#fff',
      lineHeight: 1.4
    }
  }, "Bioceramic sealers bond to coated gutta-percha \u2014 closing the core\u2013sealer gap with no shrinkage."))))));
}

// ── SCENE 6 — Closing (122–138) ───────────────────────────────────────────────
function SceneClose() {
  const t = useTime();
  const rings = [0, 1, 2].map(i => {
    const phase = (t * 0.3 + i * 0.33) % 1;
    const r = 40 + phase * 300;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        position: 'absolute',
        left: 300 - r,
        top: 380 - r,
        width: r * 2,
        height: r * 2,
        borderRadius: '50%',
        border: `1.5px solid ${C.blue}`,
        opacity: (1 - phase) * 0.16
      }
    });
  });
  const uses = ['Pulpotomy', 'Pulp capping', 'Perforation repair', 'Root-end filling', 'Apexification', 'Canal sealing'];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0
    }
  }, rings), /*#__PURE__*/React.createElement(Eyebrow, {
    x: 520,
    y: 150,
    start: 122.4,
    end: 138
  }, "The bottom line"), /*#__PURE__*/React.createElement(Sprite, {
    start: 122.6,
    end: 138
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 518,
      top: 190,
      maxWidth: 660
    }
  }, /*#__PURE__*/React.createElement(Motion, {
    riseY: 20
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: SANS,
      fontWeight: 600,
      fontSize: 52,
      color: C.ink,
      lineHeight: 1.1,
      letterSpacing: '-0.02em'
    }
  }, "A first-choice material across endodontics.")))), /*#__PURE__*/React.createElement(Sprite, {
    start: 123.4,
    end: 138
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 520,
      top: 330,
      width: 640
    }
  }, /*#__PURE__*/React.createElement(Motion, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 12,
      maxWidth: 640
    }
  }, uses.map((u, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      fontFamily: SANS,
      fontWeight: 500,
      fontSize: 20,
      color: C.blueDeep,
      background: C.panel,
      border: `1px solid ${C.line}`,
      borderRadius: 999,
      padding: '9px 18px'
    }
  }, u)))))), /*#__PURE__*/React.createElement(Sprite, {
    start: 125,
    end: 138
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 520,
      top: 470,
      width: 620
    }
  }, /*#__PURE__*/React.createElement(Motion, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      alignItems: 'stretch'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 4,
      background: C.amber,
      borderRadius: 2
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: SANS,
      fontSize: 21,
      color: C.inkSoft,
      lineHeight: 1.5
    }
  }, "Evidence in vitro and in animal studies is strongly favourable \u2014 but long-term randomised clinical trials are still needed to confirm performance."))))), /*#__PURE__*/React.createElement(Sprite, {
    start: 126,
    end: 138
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 520,
      top: 636,
      fontFamily: MONO,
      fontSize: 13,
      color: C.blue,
      letterSpacing: '0.06em'
    }
  }, /*#__PURE__*/React.createElement(Motion, null, "Bioceramic in Dentistry \u2014 Expanded & Illustrated Edition"))));
}

// ── Root ──────────────────────────────────────────────────────────────────────
function BioceramicScene() {
  return /*#__PURE__*/React.createElement(Stage, {
    width: W,
    height: H,
    duration: 138,
    background: C.bg,
    persistKey: "bioceramic"
  }, /*#__PURE__*/React.createElement(Sprite, {
    start: 0,
    end: 9
  }, /*#__PURE__*/React.createElement(SceneTitle, null)), /*#__PURE__*/React.createElement(Sprite, {
    start: 9,
    end: 33
  }, /*#__PURE__*/React.createElement(SceneWhy, null)), /*#__PURE__*/React.createElement(Sprite, {
    start: 33,
    end: 68
  }, /*#__PURE__*/React.createElement(SceneMechanism, null)), /*#__PURE__*/React.createElement(Sprite, {
    start: 68,
    end: 95
  }, /*#__PURE__*/React.createElement(SceneClinical, null)), /*#__PURE__*/React.createElement(Sprite, {
    start: 95,
    end: 122
  }, /*#__PURE__*/React.createElement(SceneCompare, null)), /*#__PURE__*/React.createElement(Sprite, {
    start: 122,
    end: 138
  }, /*#__PURE__*/React.createElement(SceneClose, null)));
}
window.BioceramicScene = BioceramicScene;
})();
