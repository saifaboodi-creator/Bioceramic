// scene.jsx — "Why some bioceramics stain teeth" (test explainer for the
// dental-explainer skill). Four scenes over 34 s; captions only.
// Source: project/uploads/Bioceramic in Dentistry.pdf — fact # and page beside
// each on-screen claim.
const { Stage, Sprite, useTime, useSprite, Easing, interpolate, clamp } = window;

// ── Palette & type (shared with src/scene.jsx) ───────────────────────────────
const C = {
  bg: '#eaf1f8', panel: '#ffffff', ink: '#102f49', inkSoft: '#5c7a97',
  line: '#cfe0ef', blue: '#1f6fb2', cyan: '#0f9fbd', amber: '#d68a24',
  stain: '#7d8590',
};
const SANS = "'IBM Plex Sans', system-ui, sans-serif";
const MONO = "'IBM Plex Mono', ui-monospace, monospace";

// ── Helpers (from src/scene.jsx) ─────────────────────────────────────────────
function Motion({ children, style = {}, riseY = 16, dur = 0.55, exit = 0.4 }) {
  const { localTime, duration } = useSprite();
  const exitStart = Math.max(0, duration - exit);
  let opacity = 1, ty = 0;
  if (localTime < dur) { const t = Easing.easeOutCubic(clamp(localTime / dur, 0, 1)); opacity = t; ty = (1 - t) * riseY; }
  else if (localTime > exitStart) { const t = Easing.easeInCubic(clamp((localTime - exitStart) / exit, 0, 1)); opacity = 1 - t; ty = -t * 10; }
  return <div style={{ opacity, transform: `translateY(${ty}px)`, ...style }}>{children}</div>;
}

function Eyebrow({ children, x, y, start, end, color = C.blue }) {
  return (
    <Sprite start={start} end={end}>
      <div style={{ position: 'absolute', left: x, top: y }}>
        <Motion>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: MONO, fontSize: 15, letterSpacing: '0.22em', textTransform: 'uppercase', color, fontWeight: 500 }}>
            <span style={{ width: 26, height: 2, background: color, display: 'inline-block' }} />
            {children}
          </div>
        </Motion>
      </div>
    </Sprite>
  );
}

function Caption({ start, end, x, y, w = 560, size = 30, children }) {
  return (
    <Sprite start={start} end={end}>
      <div style={{ position: 'absolute', left: x, top: y, width: w }}>
        <Motion>
          <div style={{ fontFamily: SANS, fontSize: size, lineHeight: 1.25, color: C.ink, fontWeight: 500 }}>{children}</div>
        </Motion>
      </div>
    </Sprite>
  );
}

// ── Tooth crown whose dentine greys with `stain` (0..1) ──────────────────────
function Crown({ x, y, stain }) {
  const mix = (a, b, t) => Math.round(a + (b - a) * t);
  const col = `rgb(${mix(250, 125, stain)},${mix(248, 133, stain)},${mix(240, 144, stain)})`;
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: 240, height: 300 }}>
      <div style={{ position: 'absolute', left: 0, top: 0, width: 240, height: 190, background: col, border: `3px solid ${C.ink}`, borderRadius: '90px 90px 40px 40px' }} />
      <div style={{ position: 'absolute', left: 40, top: 180, width: 60, height: 120, background: col, border: `3px solid ${C.ink}`, borderTop: 'none', borderRadius: '0 0 30px 30px' }} />
      <div style={{ position: 'absolute', left: 140, top: 180, width: 60, height: 120, background: col, border: `3px solid ${C.ink}`, borderTop: 'none', borderRadius: '0 0 30px 30px' }} />
    </div>
  );
}

function Chip({ label, sub, color }) {
  return (
    <div style={{ background: C.panel, border: `2px solid ${color}`, borderRadius: 12, padding: '14px 20px', width: 480 }}>
      <div style={{ fontFamily: MONO, fontSize: 22, color, fontWeight: 600 }}>{label}</div>
      <div style={{ fontFamily: SANS, fontSize: 19, color: C.inkSoft, marginTop: 4 }}>{sub}</div>
    </div>
  );
}

// ── SCENE 1 — Title (0–6) ────────────────────────────────────────────────────
function SceneTitle() {
  return (
    <>
      <Eyebrow x={110} y={250} start={0.2} end={6}>Aesthetic zone</Eyebrow>
      <Sprite start={0.5} end={6}>
        <div style={{ position: 'absolute', left: 108, top: 290 }}>
          <Motion riseY={22}>
            <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 72, lineHeight: 1.02, color: C.ink, letterSpacing: '-0.02em' }}>
              Why some bioceramics<br />stain teeth
            </div>
          </Motion>
        </div>
      </Sprite>
    </>
  );
}

// ── SCENE 2 — The culprits (6–16) ────────────────────────────────────────────
function SceneCulprits() {
  const t = useTime();
  const stain = Easing.easeInOutCubic(clamp((t - 9) / 5, 0, 1));
  return (
    <>
      <Eyebrow x={110} y={70} start={6.2} end={16}>The culprits</Eyebrow>
      <Crown x={820} y={200} stain={stain} />
      <Sprite start={6.6} end={16}>
        <div style={{ position: 'absolute', left: 110, top: 150 }}>
          <Motion>
            {/* F3 p.19, F4 p.21 */}
            <Chip label="Bismuth oxide" sub="added to raise radiopacity · 20% of MTA Angelus" color={C.amber} />
          </Motion>
        </div>
      </Sprite>
      <Sprite start={8.2} end={16}>
        <div style={{ position: 'absolute', left: 110, top: 270 }}>
          <Motion>
            {/* F6 p.33 */}
            <Chip label="Iron oxide" sub="in MTA · can discolour crown and gingiva" color={C.stain} />
          </Motion>
        </div>
      </Sprite>
      {/* F9 p.60 — 9 words → ≥ 3.7 s */}
      <Caption start={10} end={16} x={110} y={430} w={600}>
        Some formulations discolour tooth or soft tissue through these oxides.
      </Caption>
    </>
  );
}

// ── SCENE 3 — How the materials compare (16–26) ──────────────────────────────
function Row({ start, y, name, note, tone }) {
  return (
    <Sprite start={start} end={26}>
      <div style={{ position: 'absolute', left: 110, top: y }}>
        <Motion>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <div style={{ width: 24, height: 24, borderRadius: '50%', background: tone, border: `2px solid ${C.ink}` }} />
            <div style={{ width: 260, fontFamily: SANS, fontSize: 30, fontWeight: 600, color: C.ink }}>{name}</div>
            <div style={{ fontFamily: SANS, fontSize: 24, color: C.inkSoft }}>{note}</div>
          </div>
        </Motion>
      </div>
    </Sprite>
  );
}

function SceneCompare() {
  return (
    <>
      <Eyebrow x={110} y={70} start={16.2} end={26}>How they compare</Eyebrow>
      {/* F2 p.18 */}
      <Row start={16.6} y={170} name="Grey MTA" note="known for dentine discolouration" tone="#8a9099" />
      {/* F2 p.18 */}
      <Row start={18.6} y={260} name="White MTA" note="developed to reduce it" tone="#e9ecef" />
      {/* F5 p.22, F6 p.33 */}
      <Row start={20.6} y={350} name="Biodentine" note="only slight discolouration · no staining heavy metals" tone="#ffffff" />
      <Sprite start={22.5} end={26}>
        <div style={{ position: 'absolute', left: 110, top: 470, fontFamily: MONO, fontSize: 15, color: C.inkSoft }}>
          <Motion>Source: Bioceramic in Dentistry, pp. 18, 22, 33</Motion>
        </div>
      </Sprite>
    </>
  );
}

// ── SCENE 4 — Takeaway (26–34) ───────────────────────────────────────────────
function SceneTakeaway() {
  return (
    <>
      <Eyebrow x={110} y={200} start={26.2} end={34} color={C.cyan}>Clinical takeaway</Eyebrow>
      {/* F7 p.60, F8 p.77 — 13 words → ≥ 4.9 s */}
      <Caption start={26.6} end={34} x={108} y={250} w={1000} size={48}>
        Near the visible gingival margin, choose white or heavy-metal-free formulations.
      </Caption>
    </>
  );
}

function DiscolorationScene() {
  return (
    <Stage width={1280} height={720} duration={34} background={C.bg} persistKey="discoloration">
      <Sprite start={0} end={6}><SceneTitle /></Sprite>
      <Sprite start={6} end={16}><SceneCulprits /></Sprite>
      <Sprite start={16} end={26}><SceneCompare /></Sprite>
      <Sprite start={26} end={34}><SceneTakeaway /></Sprite>
    </Stage>
  );
}

window.DiscolorationScene = DiscolorationScene;
