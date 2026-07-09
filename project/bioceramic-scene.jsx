// bioceramic-scene.jsx — "Bioceramics in Endodontics" explainer.
// Reads timeline primitives from window (animations.jsx loaded first).
const { Stage, Sprite, useTime, useSprite, Easing, interpolate, animate, clamp } = window;

// ── Palette (clinical blues / whites) ───────────────────────────────────────
const C = {
  bg:      '#eaf1f8',
  bgDeep:  '#dfeaf4',
  panel:   '#ffffff',
  ink:     '#102f49',
  inkSoft: '#5c7a97',
  line:    '#cfe0ef',
  blue:    '#1f6fb2',
  blueDeep:'#0f4576',
  cyan:    '#0f9fbd',
  amber:   '#d68a24',   // reserved: high-pH / bioactive highlight only
  coral:   '#d98a86',   // pulp tissue
};
const SANS = "'IBM Plex Sans', system-ui, sans-serif";
const MONO = "'IBM Plex Mono', ui-monospace, monospace";
const W = 1280, H = 720;

// ── Small helpers ────────────────────────────────────────────────────────────
// Motion fades+rises children in on entry and out before the Sprite window ends.
function Motion({ children, style = {}, riseY = 16, dur = 0.55, exit = 0.4 }) {
  const { localTime, duration } = useSprite();
  const exitStart = Math.max(0, duration - exit);
  let opacity = 1, ty = 0;
  if (localTime < dur) { const t = Easing.easeOutCubic(clamp(localTime / dur, 0, 1)); opacity = t; ty = (1 - t) * riseY; }
  else if (localTime > exitStart) { const t = Easing.easeInCubic(clamp((localTime - exitStart) / exit, 0, 1)); opacity = 1 - t; ty = -t * 10; }
  return <div style={{ opacity, transform: `translateY(${ty}px)`, willChange: 'transform,opacity', ...style }}>{children}</div>;
}

function Eyebrow({ children, color = C.blue, x, y, start, end }) {
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

// A window-scoped 0→1 tween on absolute timeline seconds.
const useWin = (start, end) => {
  const t = useTime();
  return clamp((t - start) / (end - start), 0, 1);
};

// ── SCENE 1 — Title (0–9) ───────────────────────────────────────────────────
function SceneTitle() {
  const t = useTime();
  const rings = [0, 1, 2, 3].map((i) => {
    const phase = ((t * 0.35) + i * 0.25) % 1;
    const r = 60 + phase * 520;
    const op = (1 - phase) * 0.18;
    return <div key={i} style={{ position: 'absolute', left: 900 - r, top: 360 - r, width: r * 2, height: r * 2, borderRadius: '50%', border: `1.5px solid ${C.blue}`, opacity: op }} />;
  });
  return (
    <>
      <div style={{ position: 'absolute', inset: 0 }}>{rings}</div>
      <div style={{ position: 'absolute', left: 900, top: 360, width: 26, height: 26, borderRadius: '50%', background: C.cyan, transform: 'translate(-50%,-50%)', boxShadow: `0 0 0 10px ${C.cyan}22` }} />
      <Eyebrow x={110} y={210} start={0.2} end={9}>An Illustrated Clinical Guide</Eyebrow>
      <Sprite start={0.5} end={9}>
        <div style={{ position: 'absolute', left: 108, top: 246 }}>
          <Motion riseY={22}>
            <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 96, lineHeight: 0.98, color: C.ink, letterSpacing: '-0.02em' }}>
              Bioceramics<br />in Endodontics
            </div>
          </Motion>
        </div>
      </Sprite>
      <Sprite start={1.4} end={9}>
        <div style={{ position: 'absolute', left: 112, top: 470, maxWidth: 620 }}>
          <Motion>
            <div style={{ fontFamily: SANS, fontWeight: 400, fontSize: 27, lineHeight: 1.45, color: C.inkSoft }}>
              How calcium-silicate materials turned uncertain procedures into predictable, biologically driven treatment.
            </div>
          </Motion>
        </div>
      </Sprite>
      <Sprite start={2.2} end={9}>
        <div style={{ position: 'absolute', left: 112, top: 600, fontFamily: MONO, fontSize: 14, color: C.blue, letterSpacing: '0.06em' }}>
          <Motion>MTA · Biodentine · BC Sealer · calcium-silicate chemistry</Motion>
        </div>
      </Sprite>
    </>
  );
}

// ── SCENE 2 — What they are / why they matter (9–33) ──────────────────────────
const PROPS4 = [
  { k: 'Set in a wet field', d: 'Moisture is required, not avoided — they set in the wet canal.', ic: 'drop' },
  { k: 'High pH on setting', d: 'Liberated Ca(OH)₂ raises pH above 12 — antibacterial while unset.', ic: 'ph' },
  { k: 'Dimensionally stable', d: 'Marginal expansion, no shrinkage — an excellent, lasting seal.', ic: 'seal' },
  { k: 'Form hydroxyapatite', d: 'Bond to dentine and induce tissue healing — bioactive once set.', ic: 'apatite' },
];
function MiniIcon({ ic }) {
  const s = { stroke: C.blue, strokeWidth: 2, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' };
  return (
    <svg width="34" height="34" viewBox="0 0 34 34">
      {ic === 'drop' && <path d="M17 5 C17 5 27 16 27 22 A10 10 0 0 1 7 22 C7 16 17 5 17 5 Z" {...s} />}
      {ic === 'ph' && <><path d="M6 24 H28" {...s} /><path d="M10 24 V13 M17 24 V8 M24 24 V17" {...s} /></>}
      {ic === 'seal' && <><rect x="7" y="9" width="20" height="16" rx="2" {...s} /><path d="M7 15 H27" {...s} /></>}
      {ic === 'apatite' && <><path d="M17 6 L27 17 L17 28 L7 17 Z" {...s} /><path d="M17 6 V28 M7 17 H27" {...s} /></>}
    </svg>
  );
}
function SceneWhy() {
  return (
    <>
      {/* beat A: the statement + classification (9–19.2) */}
      <Eyebrow x={108} y={78} start={9.2} end={19.2}>Why they changed endodontics</Eyebrow>
      <Sprite start={9.4} end={19.2}>
        <div style={{ position: 'absolute', left: 106, top: 118, maxWidth: 1060 }}>
          <Motion riseY={18}>
            <div style={{ fontFamily: SANS, fontWeight: 500, fontSize: 46, lineHeight: 1.18, color: C.ink, letterSpacing: '-0.015em' }}>
              In a single generation, mineral trioxide aggregate made sealing a perforation, capping a pulp and treating an open apex <span style={{ color: C.blue }}>predictable.</span>
            </div>
          </Motion>
        </div>
      </Sprite>
      <Sprite start={13.0} end={19.2}>
        <div style={{ position: 'absolute', left: 106, top: 372 }}>
          <Motion>
            <div style={{ display: 'flex', gap: 14 }}>
              {[['Bioinert', 'coexists'], ['Bioactive', 'bonds to tissue'], ['Bioresorbable', 'replaced by tissue']].map(([a, b], i) => (
                <div key={i} style={{ padding: '14px 20px', borderRadius: 12, background: i === 1 ? C.blue : C.panel, border: `1px solid ${i === 1 ? C.blue : C.line}`, minWidth: 180 }}>
                  <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 22, color: i === 1 ? '#fff' : C.ink }}>{a}</div>
                  <div style={{ fontFamily: MONO, fontSize: 13, color: i === 1 ? '#dbeafc' : C.inkSoft, marginTop: 3 }}>{b}</div>
                </div>
              ))}
            </div>
          </Motion>
        </div>
      </Sprite>
      <Sprite start={13.4} end={19.2}>
        <div style={{ position: 'absolute', left: 640, top: 402, maxWidth: 520 }}>
          <Motion>
            <div style={{ fontFamily: SANS, fontSize: 20, color: C.inkSoft }}>Endodontic materials are the <b style={{ color: C.ink }}>bioactive</b> calcium-silicate cements and sealers.</div>
          </Motion>
        </div>
      </Sprite>

      {/* beat B: four defining properties (19.6–33) */}
      <Eyebrow x={108} y={78} start={19.8} end={33} color={C.cyan}>Four properties that define them</Eyebrow>
      {PROPS4.map((p, i) => (
        <Sprite key={i} start={20.2 + i * 0.5} end={33}>
          <div style={{ position: 'absolute', left: 106 + (i % 2) * 555, top: 150 + Math.floor(i / 2) * 220, width: 520 }}>
            <Motion riseY={20}>
              <div style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 16, padding: '26px 28px', boxShadow: '0 12px 30px rgba(16,47,73,0.06)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ width: 56, height: 56, borderRadius: 12, background: C.bgDeep, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><MiniIcon ic={p.ic} /></div>
                  <div style={{ fontFamily: MONO, fontSize: 14, color: C.blue }}>0{i + 1}</div>
                </div>
                <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 28, color: C.ink, marginTop: 16 }}>{p.k}</div>
                <div style={{ fontFamily: SANS, fontSize: 19, color: C.inkSoft, marginTop: 6, lineHeight: 1.45 }}>{p.d}</div>
              </div>
            </Motion>
          </div>
        </Sprite>
      ))}
    </>
  );
}

// ── SCENE 3 — Setting & sealing mechanism (33–68) ─────────────────────────────
function IonCloud({ start, end, cx, cy }) {
  const p = useWin(start, end);
  const ions = [];
  for (let i = 0; i < 9; i++) {
    const ang = (i / 9) * Math.PI * 2 + i;
    const local = clamp((p * 1.4) - i * 0.05, 0, 1);
    const dist = local * (90 + (i % 3) * 34);
    const x = cx + Math.cos(ang) * dist;
    const y = cy + Math.sin(ang) * dist * 0.85;
    const op = local < 0.15 ? local / 0.15 : (1 - local) * 0.9;
    ions.push(<div key={i} style={{ position: 'absolute', left: x, top: y, transform: 'translate(-50%,-50%)', fontFamily: MONO, fontSize: 13, color: C.blue, opacity: op, fontWeight: 600 }}>Ca²⁺</div>);
  }
  return <>{ions}</>;
}
function PhGauge({ start, end, x, y }) {
  const p = useWin(start, end);
  const ph = 10.2 + (12.5 - 10.2) * Easing.easeInOutCubic(p);
  const h = 260;
  const fillH = ((ph - 7) / 6) * h;
  const hot = ph >= 12;
  return (
    <div style={{ position: 'absolute', left: x, top: y }}>
      <div style={{ position: 'relative', width: 74, height: h, borderRadius: 37, background: C.bgDeep, border: `1px solid ${C.line}`, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: fillH, background: `linear-gradient(to top, ${C.blue}, ${hot ? C.amber : C.cyan})` }} />
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: ((12 - 7) / 6) * h, height: 2, background: C.ink, opacity: 0.35 }} />
      </div>
      <div style={{ position: 'absolute', left: 86, bottom: ((12 - 7) / 6) * h - 8, fontFamily: MONO, fontSize: 13, color: C.inkSoft }}>pH 12</div>
      <div style={{ position: 'absolute', left: -6, top: -50, fontFamily: SANS, fontWeight: 700, fontSize: 38, whiteSpace: 'nowrap', color: hot ? C.amber : C.blueDeep }}>pH {ph.toFixed(1)}</div>
    </div>
  );
}
function DentineBond({ start, end, x, y }) {
  const p = useWin(start, end);
  const tubes = [0, 1, 2, 3, 4];
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: 460, height: 280 }}>
      <div style={{ position: 'absolute', left: 0, top: 0, width: 150, height: 280, borderRadius: '10px 0 0 10px', background: `linear-gradient(135deg, ${C.blue}, ${C.blueDeep})` }} />
      <div style={{ position: 'absolute', left: 20, top: 16, fontFamily: MONO, fontSize: 13, color: '#dbeafc' }}>SET CEMENT</div>
      <div style={{ position: 'absolute', left: 150, top: 0, width: 310, height: 280, background: '#f4e7dc', borderRadius: '0 10px 10px 0', border: '1px solid #e6d3c2', borderLeft: 'none' }} />
      <div style={{ position: 'absolute', left: 322, top: 16, fontFamily: MONO, fontSize: 13, color: '#a97e5c' }}>DENTINE</div>
      {tubes.map((i) => {
        const ty = 52 + i * 44;
        const grow = clamp(p * 1.3 - i * 0.08, 0, 1);
        return (
          <React.Fragment key={i}>
            <div style={{ position: 'absolute', left: 150, top: ty, width: 300, height: 10, background: '#e7d2bf', borderRadius: 5 }} />
            <div style={{ position: 'absolute', left: 150, top: ty + 1, width: grow * (150 + i * 20), height: 8, background: `linear-gradient(90deg, ${C.cyan}, ${C.amber})`, borderRadius: 4 }} />
          </React.Fragment>
        );
      })}
      <div style={{ position: 'absolute', left: 150, top: 252, fontFamily: MONO, fontSize: 12, color: C.blueDeep }}>hydroxyapatite tags → bond</div>
    </div>
  );
}
function SceneMechanism() {
  return (
    <>
      {/* beat A: composition + two reactions (33.5–45.3) */}
      <Eyebrow x={108} y={72} start={33.2} end={45.3}>How they set &amp; seal</Eyebrow>
      <Sprite start={33.5} end={45.3}>
        <div style={{ position: 'absolute', left: 106, top: 112, maxWidth: 520 }}>
          <Motion riseY={18}>
            <div style={{ fontFamily: SANS, fontWeight: 500, fontSize: 34, color: C.ink, lineHeight: 1.2, letterSpacing: '-0.01em' }}>MTA is essentially a purified Portland cement.</div>
            <div style={{ fontFamily: SANS, fontSize: 20, color: C.inkSoft, marginTop: 14, lineHeight: 1.5 }}>Mixed with water, two reactions drive the set — and give the material its biology.</div>
          </Motion>
        </div>
      </Sprite>
      {[
        { t: 'Silicate reaction', d: 'Silicate phases hydrate → C–S–H + calcium hydroxide. Raises pH, seeds apatite — the bioactive engine.', c: C.blue, s: 34.6 },
        { t: 'Aluminate reaction', d: 'Tricalcium aluminate + water + sulfate → ettringite, then monosulfate. Governs the early set.', c: C.cyan, s: 35.2 },
      ].map((r, i) => (
        <Sprite key={i} start={r.s} end={45.3}>
          <div style={{ position: 'absolute', left: 640, top: 150 + i * 168, width: 540 }}>
            <Motion riseY={20}>
              <div style={{ background: C.panel, border: `1px solid ${C.line}`, borderLeft: `4px solid ${r.c}`, borderRadius: 14, padding: '22px 26px', boxShadow: '0 10px 26px rgba(16,47,73,0.06)' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                  <span style={{ fontFamily: MONO, fontSize: 14, color: r.c }}>0{i + 1}</span>
                  <span style={{ fontFamily: SANS, fontWeight: 600, fontSize: 26, color: C.ink }}>{r.t}</span>
                </div>
                <div style={{ fontFamily: SANS, fontSize: 19, color: C.inkSoft, marginTop: 8, lineHeight: 1.5 }}>{r.d}</div>
              </div>
            </Motion>
          </div>
        </Sprite>
      ))}

      {/* beat B: pH rise + Ca release (46–56.8) */}
      <Sprite start={46} end={56.8}>
        <div style={{ position: 'absolute', left: 106, top: 118, maxWidth: 460 }}>
          <Motion riseY={16}>
            <div style={{ fontFamily: SANS, fontWeight: 500, fontSize: 34, color: C.ink, lineHeight: 1.2 }}>Alkalinity climbs as calcium ions release.</div>
            <div style={{ fontFamily: SANS, fontSize: 20, color: C.inkSoft, marginTop: 14, lineHeight: 1.5 }}>pH rises from ~10.2 at mixing to ~12.5 by three hours — antibacterial while unset, and the driver of mineralised-apatite deposition.</div>
          </Motion>
        </div>
      </Sprite>
      <Sprite start={46.2} end={56.8}>
        <PhGauge start={46.6} end={54} x={640} y={300} />
      </Sprite>
      <Sprite start={46.2} end={56.8}>
        <div style={{ position: 'absolute', left: 940, top: 360 }}>
          <div style={{ position: 'absolute', left: 0, top: 0, width: 90, height: 90, borderRadius: 16, background: `linear-gradient(135deg,${C.blue},${C.blueDeep})` }} />
          <IonCloud start={47} end={56.5} cx={45} cy={45} />
        </div>
      </Sprite>

      {/* beat C: apatite bond to dentine (57.5–68) */}
      <Sprite start={57.5} end={68}>
        <div style={{ position: 'absolute', left: 106, top: 118, maxWidth: 440 }}>
          <Motion riseY={16}>
            <div style={{ fontFamily: SANS, fontWeight: 500, fontSize: 34, color: C.ink, lineHeight: 1.2 }}>Apatite forms — and bonds to dentine.</div>
            <div style={{ fontFamily: SANS, fontSize: 20, color: C.inkSoft, marginTop: 14, lineHeight: 1.5 }}>Released Ca(OH)₂ reacts with tissue phosphates to precipitate hydroxyapatite. Mineral tags grow into the dentinal tubules, reinforcing the seal.</div>
          </Motion>
        </div>
      </Sprite>
      <Sprite start={57.8} end={68}>
        <DentineBond start={58.4} end={66} x={620} y={210} />
      </Sprite>
    </>
  );
}

// ── SCENE 4 — Clinical uses (68–95) ───────────────────────────────────────────
const SITES = [
  { id: 'pulp', label: 'Pulp capping & vital pulp therapy', px: 170, py: 132, s: 71.5 },
  { id: 'furc', label: 'Perforation repair (furcal / lateral)', px: 170, py: 246, s: 74.5 },
  { id: 'apex', label: 'Apexification — apical plug', px: 133, py: 452, s: 77.5 },
  { id: 'root', label: 'Root-end filling (retrograde)', px: 214, py: 452, s: 80.5 },
  { id: 'obt',  label: 'Canal obturation & sealing', px: 195, py: 330, s: 83.5 },
];
function ToothSchematic() {
  return (
    <svg width="348" height="500" viewBox="0 0 348 500" style={{ position: 'absolute', left: 0, top: 0 }}>
      <path d="M64,92 C58,34 290,34 284,92 C296,150 296,182 282,206 L66,206 C52,182 52,150 64,92 Z" fill="#f3f8fc" stroke={C.blue} strokeWidth="2.5" />
      <path d="M98,204 C92,300 86,398 122,452 C136,472 156,454 156,398 L156,204 Z" fill="#f3f8fc" stroke={C.blue} strokeWidth="2.5" />
      <path d="M250,204 C256,300 262,398 226,452 C212,472 192,454 192,398 L192,204 Z" fill="#f3f8fc" stroke={C.blue} strokeWidth="2.5" />
      <path d="M126,116 C126,102 222,102 222,116 L214,186 L134,186 Z" fill={C.coral} opacity="0.5" />
      <path d="M138,186 C130,300 128,400 132,446" fill="none" stroke={C.coral} strokeWidth="9" strokeLinecap="round" opacity="0.6" />
      <path d="M210,186 C218,300 220,400 214,446" fill="none" stroke={C.coral} strokeWidth="9" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}
function SiteMarker({ site, active }) {
  const scale = active ? 1 : 0.7;
  const op = active ? 1 : 0.28;
  return (
    <div style={{ position: 'absolute', left: site.px, top: site.py, transform: `translate(-50%,-50%) scale(${scale})` }}>
      <div style={{ width: 22, height: 22, borderRadius: '50%', background: active ? C.amber : C.blue, opacity: op, boxShadow: active ? `0 0 0 8px ${C.amber}22` : 'none' }} />
    </div>
  );
}
function SceneClinical() {
  const t = useTime();
  const activeIdx = SITES.reduce((acc, s, i) => (t >= s.s ? i : acc), -1);
  return (
    <>
      <Eyebrow x={108} y={72} start={68.4} end={95}>One material, many clinical roles</Eyebrow>
      <Sprite start={68.6} end={95}>
        <div style={{ position: 'absolute', left: 106, top: 108, maxWidth: 640 }}>
          <Motion riseY={16}>
            <div style={{ fontFamily: SANS, fontWeight: 500, fontSize: 40, color: C.ink, lineHeight: 1.16, letterSpacing: '-0.015em' }}>From the surgical root end to the immature tooth.</div>
          </Motion>
        </div>
      </Sprite>
      <Sprite start={69} end={95}>
        <div style={{ position: 'absolute', left: 200, top: 190, width: 348, height: 500 }}>
          <Motion dur={0.7} riseY={0}>
            <ToothSchematic />
            {SITES.map((s, i) => <SiteMarker key={s.id} site={s} active={i === activeIdx} />)}
          </Motion>
        </div>
      </Sprite>
      <div style={{ position: 'absolute', left: 660, top: 250 }}>
        {SITES.map((s, i) => (
          <Sprite key={s.id} start={s.s} end={95}>
            <div style={{ position: 'absolute', left: 0, top: i * 74, width: 560 }}>
              <Motion riseY={18} exit={0.3}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 18, opacity: i === activeIdx ? 1 : 0.4 }}>
                  <span style={{ fontFamily: MONO, fontSize: 15, color: i === activeIdx ? C.amber : C.blue, width: 30 }}>0{i + 1}</span>
                  <span style={{ fontFamily: SANS, fontWeight: i === activeIdx ? 600 : 500, fontSize: 27, color: C.ink }}>{s.label}</span>
                </div>
              </Motion>
            </div>
          </Sprite>
        ))}
      </div>
    </>
  );
}

// ── SCENE 5 — Material comparison (95–122) ────────────────────────────────────
const MATS = [
  { n: 'MTA (ProRoot)', set: 165, setL: '~165 min', rad: '7.2', note: 'Reference for sealing & bioactivity — but long set', c: C.blueDeep },
  { n: 'MTA Angelus',  set: 14,  setL: '~14 min',  rad: 'lower', note: 'Sulfate removed → far faster set', c: C.blue },
  { n: 'Biodentine',   set: 11,  setL: '~10–12 min', rad: '>3', note: 'Fast set, good aesthetics, high Ca²⁺ release', c: C.cyan },
  { n: 'BC Sealer',    set: null, setL: 'water-dependent', rad: '3.83', note: 'Pre-mixed sealer; high pH; hard to remove', c: C.blue },
];
const SETMAX = 180;
function SceneCompare() {
  const grow = useWin(96.5, 101);
  return (
    <>
      <Eyebrow x={108} y={72} start={95.4} end={122} color={C.cyan}>Comparing the main materials</Eyebrow>
      <Sprite start={95.6} end={122}>
        <div style={{ position: 'absolute', left: 106, top: 108, maxWidth: 900 }}>
          <Motion riseY={16}>
            <div style={{ fontFamily: SANS, fontWeight: 500, fontSize: 40, color: C.ink, lineHeight: 1.16, letterSpacing: '-0.015em' }}>Newer cements trade a little radiopacity for a <span style={{ color: C.blue }}>much faster set.</span></div>
          </Motion>
        </div>
      </Sprite>
      <Sprite start={96} end={122}>
        <div style={{ position: 'absolute', left: 108, top: 202, width: 1064 }}>
          <Motion>
            <div style={{ display: 'flex', fontFamily: MONO, fontSize: 13, letterSpacing: '0.08em', color: C.inkSoft, textTransform: 'uppercase' }}>
              <div style={{ width: 250 }}>Material</div>
              <div style={{ flex: 1 }}>Setting time</div>
              <div style={{ width: 150, textAlign: 'right' }}>Radiopacity · mm Al</div>
            </div>
          </Motion>
        </div>
      </Sprite>
      {MATS.map((m, i) => {
        const barMax = m.set == null ? 0.12 : m.set / SETMAX;
        return (
          <Sprite key={i} start={96.4 + i * 0.4} end={122}>
            <div style={{ position: 'absolute', left: 108, top: 238 + i * 96, width: 1064 }}>
              <Motion riseY={18}>
                <div style={{ display: 'flex', alignItems: 'center', paddingTop: 14 }}>
                  <div style={{ width: 250 }}>
                    <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 24, color: C.ink }}>{m.n}</div>
                    <div style={{ fontFamily: SANS, fontSize: 15, color: C.inkSoft, marginTop: 3, maxWidth: 230, lineHeight: 1.3 }}>{m.note}</div>
                  </div>
                  <div style={{ flex: 1, paddingRight: 24 }}>
                    <div style={{ position: 'relative', height: 26, background: C.bgDeep, borderRadius: 13, overflow: 'hidden' }}>
                      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${barMax * grow * 100}%`, background: m.set == null ? `repeating-linear-gradient(45deg, ${C.blue} 0 8px, ${C.cyan} 8px 16px)` : `linear-gradient(90deg, ${m.c}, ${C.cyan})`, borderRadius: 13 }} />
                    </div>
                    <div style={{ fontFamily: MONO, fontSize: 14, color: C.blueDeep, marginTop: 6 }}>{m.setL}</div>
                  </div>
                  <div style={{ width: 150, textAlign: 'right', fontFamily: SANS, fontWeight: 600, fontSize: 30, color: C.blue }}>{m.rad}</div>
                </div>
                <div style={{ height: 1, background: C.line, marginTop: 14 }} />
              </Motion>
            </div>
          </Sprite>
        );
      })}
      <Sprite start={112.5} end={122}>
        <div style={{ position: 'absolute', left: 108, top: 636, width: 1064 }}>
          <Motion riseY={16}>
            <div style={{ background: C.blue, borderRadius: 14, padding: '18px 26px', display: 'flex', alignItems: 'center', gap: 18 }}>
              <span style={{ fontFamily: MONO, fontSize: 13, letterSpacing: '0.14em', color: '#bcd9f5', textTransform: 'uppercase' }}>Sealers</span>
              <span style={{ fontFamily: SANS, fontSize: 21, color: '#fff', lineHeight: 1.4 }}>Bioceramic sealers bond to coated gutta-percha — closing the core–sealer gap with no shrinkage.</span>
            </div>
          </Motion>
        </div>
      </Sprite>
    </>
  );
}

// ── SCENE 6 — Closing (122–138) ───────────────────────────────────────────────
function SceneClose() {
  const t = useTime();
  const rings = [0, 1, 2].map((i) => {
    const phase = ((t * 0.3) + i * 0.33) % 1;
    const r = 40 + phase * 300;
    return <div key={i} style={{ position: 'absolute', left: 300 - r, top: 380 - r, width: r * 2, height: r * 2, borderRadius: '50%', border: `1.5px solid ${C.blue}`, opacity: (1 - phase) * 0.16 }} />;
  });
  const uses = ['Pulpotomy', 'Pulp capping', 'Perforation repair', 'Root-end filling', 'Apexification', 'Canal sealing'];
  return (
    <>
      <div style={{ position: 'absolute', inset: 0 }}>{rings}</div>
      <Eyebrow x={520} y={150} start={122.4} end={138}>The bottom line</Eyebrow>
      <Sprite start={122.6} end={138}>
        <div style={{ position: 'absolute', left: 518, top: 190, maxWidth: 660 }}>
          <Motion riseY={20}>
            <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 52, color: C.ink, lineHeight: 1.1, letterSpacing: '-0.02em' }}>A first-choice material across endodontics.</div>
          </Motion>
        </div>
      </Sprite>
      <Sprite start={123.4} end={138}>
        <div style={{ position: 'absolute', left: 520, top: 330, width: 640 }}>
          <Motion>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, maxWidth: 640 }}>
              {uses.map((u, i) => (
                <span key={i} style={{ fontFamily: SANS, fontWeight: 500, fontSize: 20, color: C.blueDeep, background: C.panel, border: `1px solid ${C.line}`, borderRadius: 999, padding: '9px 18px' }}>{u}</span>
              ))}
            </div>
          </Motion>
        </div>
      </Sprite>
      <Sprite start={125} end={138}>
        <div style={{ position: 'absolute', left: 520, top: 470, width: 620 }}>
          <Motion>
            <div style={{ display: 'flex', gap: 14, alignItems: 'stretch' }}>
              <div style={{ width: 4, background: C.amber, borderRadius: 2 }} />
              <div style={{ fontFamily: SANS, fontSize: 21, color: C.inkSoft, lineHeight: 1.5 }}>Evidence in vitro and in animal studies is strongly favourable — but long-term randomised clinical trials are still needed to confirm performance.</div>
            </div>
          </Motion>
        </div>
      </Sprite>
      <Sprite start={126} end={138}>
        <div style={{ position: 'absolute', left: 520, top: 636, fontFamily: MONO, fontSize: 13, color: C.blue, letterSpacing: '0.06em' }}>
          <Motion>Bioceramic in Dentistry — Expanded &amp; Illustrated Edition</Motion>
        </div>
      </Sprite>
    </>
  );
}

// ── Timestamp label (for commenting) ──────────────────────────────────────────
function TimeLabel() {
  const t = useTime();
  const ref = React.useRef(null);
  React.useEffect(() => { if (ref.current) ref.current.setAttribute('data-screen-label', `t=${Math.floor(t)}s`); }, [t]);
  return <div ref={ref} data-screen-label="t=0s" style={{ position: 'absolute', width: 0, height: 0 }} />;
}

function BioceramicScene() {
  return (
    <Stage width={W} height={H} duration={138} background={C.bg} persistKey="bioceramic">
      <TimeLabel />
      <Sprite start={0} end={9}><SceneTitle /></Sprite>
      <Sprite start={9} end={33}><SceneWhy /></Sprite>
      <Sprite start={33} end={68}><SceneMechanism /></Sprite>
      <Sprite start={68} end={95}><SceneClinical /></Sprite>
      <Sprite start={95} end={122}><SceneCompare /></Sprite>
      <Sprite start={122} end={138}><SceneClose /></Sprite>
    </Stage>
  );
}

window.BioceramicScene = BioceramicScene;
