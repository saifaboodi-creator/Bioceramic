// bioceramics: pack bioceramic into a root perforation, the pH climbs to 12.5, mineral tags grow into the dentine, sealed
// Load after stick.js. Use as <stick-scene scene="bioceramic-perforation" play="view"></stick-scene>.
(function () {
  const SC = (window.SCENES = window.SCENES || {});
  const R = window.RIG;
  const { C, E, P, mix, legs, walkSeg, fig, inkFill, rr, ln, text, seg, breathe, pulse, lp, sparks, tickBadge, pill, lerp } = R;

  const MAT = '#efe9da', MAT_INK = '#8a7a55', PULP = '#f6d3d3', DEFECT = '#f3b0b0';
  const CARD = { x: -70, y: -178, w: 152, h: 148 };
  const OX = 8, OY = 14; // tooth offset inside the card
  // Tooth cross-section: crown on top, one tapered root, pulp canal inside.
  const ROOT_L = [[-30, -140], [-12, -54]], ROOT_R = [[18, -140], [0, -54]];
  const PULP_L = [[-16, -150], [-7, -64]];
  const HOLE_Y = -98, HOLE_H = 9;
  const edgeX = (e, y) => e[0][0] + ((y - e[0][1]) / (e[1][1] - e[0][1])) * (e[1][0] - e[0][0]);
  const HX0 = edgeX(ROOT_L, HOLE_Y), HX1 = edgeX(PULP_L, HOLE_Y);
  const HOLE = [HX0 + OX, HOLE_Y + OY];
  const GAUGE = { x: 106, y: -152, w: 56, h: 60 };
  const GC = [GAUGE.x + GAUGE.w / 2, GAUGE.y + 40], GR = 21;
  const HOME = -165, AT = -96;
  const TIP = 46, BUTT = 9;

  function board(g, patchK, tagK) {
    ln(g, CARD.x + 26, CARD.y + CARD.h, CARD.x + 14, 0, 2.2);
    ln(g, CARD.x + CARD.w - 26, CARD.y + CARD.h, CARD.x + CARD.w - 14, 0, 2.2);
    ln(g, CARD.x + 34, CARD.y + CARD.h + 24, CARD.x + CARD.w - 34, CARD.y + CARD.h + 24, 1.4, '#bdbdbd');
    rr(g, CARD.x, CARD.y, CARD.w, CARD.h, 6);
    inkFill(g, C.paper, 1.7);
    ln(g, CARD.x, CARD.y + 17, CARD.x + CARD.w, CARD.y + 17, 1.3);
    text(g, 'root perforation', CARD.x + 9, CARD.y + 12, 8.5, C.ink, 'left');
    text(g, 'bioceramic', CARD.x + CARD.w - 9, CARD.y + 12, 8.5, C.muted, 'right');

    g.save();
    g.translate(OX, OY);
    // root
    g.beginPath();
    g.moveTo(ROOT_L[0][0], ROOT_L[0][1]);
    g.lineTo(ROOT_L[1][0], ROOT_L[1][1]);
    g.quadraticCurveTo(-6, -46, ROOT_R[1][0], ROOT_R[1][1]);
    g.lineTo(ROOT_R[0][0], ROOT_R[0][1]);
    g.closePath();
    inkFill(g, C.paper, 1.6);
    // pulp canal
    g.beginPath();
    g.moveTo(PULP_L[0][0], PULP_L[0][1]);
    g.lineTo(PULP_L[1][0], PULP_L[1][1]);
    g.quadraticCurveTo(-5, -60, -3, -64);
    g.lineTo(6, -150);
    g.closePath();
    g.fillStyle = PULP;
    g.fill();
    // crown
    g.beginPath();
    g.moveTo(-32, -138);
    g.bezierCurveTo(-42, -150, -38, -166, -26, -168);
    g.quadraticCurveTo(-18, -160, -6, -165);
    g.quadraticCurveTo(6, -170, 14, -167);
    g.bezierCurveTo(26, -165, 30, -150, 20, -138);
    g.closePath();
    inkFill(g, C.paper, 1.6);
    g.beginPath();
    g.moveTo(-16, -150);
    g.quadraticCurveTo(-5, -156, 6, -150);
    g.closePath();
    g.fillStyle = PULP;
    g.fill();

    // the perforation: a gap through the root wall, filled with bioceramic as it is packed
    const y0 = HOLE_Y - HOLE_H / 2, y1 = HOLE_Y + HOLE_H / 2;
    const quad = [[edgeX(ROOT_L, y0) - 1.5, y0], [edgeX(PULP_L, y0) + 0.5, y0], [edgeX(PULP_L, y1) + 0.5, y1], [edgeX(ROOT_L, y1) - 1.5, y1]];
    R.poly(g, quad, true);
    g.fillStyle = DEFECT;
    g.fill();
    ln(g, quad[0][0], y0, quad[1][0], y0, 1.3, C.redInk);
    ln(g, quad[3][0], y1, quad[2][0], y1, 1.3, C.redInk);
    if (patchK > 0) {
      g.save();
      g.beginPath();
      g.rect(quad[0][0] - 2, y0 - 1, (quad[1][0] - quad[0][0] + 3) * E.out3(patchK), HOLE_H + 2);
      g.clip();
      R.poly(g, quad, true);
      inkFill(g, MAT, 1.3, MAT_INK);
      g.restore();
    }
    // mineral tags growing from the patch into the dentine above and below
    if (tagK > 0) {
      for (let i = 0; i < 4; i++) {
        const x = lerp(quad[0][0] + 3, quad[1][0] - 1.5, i / 3);
        const k = seg(tagK, i * 0.12, 0.55 + i * 0.12);
        if (k <= 0) {
          continue;
        }
        const l = 7 * E.out3(k);
        ln(g, x, y0 - 1, x - 1, y0 - 1 - l, 1.4, C.amber);
        ln(g, x + 1, y1 + 1, x, y1 + 1 + l, 1.4, C.amber);
      }
    }
    g.restore();
  }

  function gauge(g, ph) {
    R.stand(g, GAUGE.x + 12, GAUGE.x + GAUGE.w - 12, GAUGE.y + GAUGE.h, 4);
    rr(g, GAUGE.x, GAUGE.y, GAUGE.w, GAUGE.h, 6);
    inkFill(g, C.paper, 1.6);
    const ang = (v) => Math.PI + ((v - 7) / 7) * Math.PI;
    // alkaline band
    g.beginPath();
    g.arc(GC[0], GC[1], GR, ang(12), ang(13.4));
    g.lineWidth = 5;
    g.strokeStyle = C.butterHi;
    g.stroke();
    g.beginPath();
    g.arc(GC[0], GC[1], GR + 2.5, Math.PI, 2 * Math.PI);
    g.lineWidth = 1.4;
    g.strokeStyle = C.ink;
    g.stroke();
    for (let v = 7; v <= 14; v++) {
      const a = ang(v), r0 = GR + 2.5, r1 = v % 7 === 0 ? GR - 3 : GR - 0.5;
      ln(g, GC[0] + Math.cos(a) * r0, GC[1] + Math.sin(a) * r0, GC[0] + Math.cos(a) * r1, GC[1] + Math.sin(a) * r1, 1.1);
    }
    const a = ang(ph);
    ln(g, GC[0], GC[1], GC[0] + Math.cos(a) * (GR - 4), GC[1] + Math.sin(a) * (GR - 4), 2, C.redInk);
    R.circle(g, GC[0], GC[1], 2.4);
    inkFill(g, C.ink, 1);
    text(g, 'pH ' + ph.toFixed(1), GC[0], GAUGE.y + GAUGE.h - 7, 9, C.ink);
  }

  function plugger(g, hand, a, load) {
    const d = [Math.cos(a), Math.sin(a)];
    const butt = [hand[0] - d[0] * BUTT, hand[1] - d[1] * BUTT];
    const neck = [hand[0] + d[0] * 12, hand[1] + d[1] * 12];
    const tip = [hand[0] + d[0] * TIP, hand[1] + d[1] * TIP];
    ln(g, butt[0], butt[1], neck[0], neck[1], 4.4, C.ink);
    ln(g, butt[0] + d[0], butt[1] + d[1], neck[0] - d[0], neck[1] - d[1], 2.2, C.steel);
    ln(g, neck[0], neck[1], tip[0], tip[1], 1.7, C.ink);
    if (load > 0.02) {
      R.circle(g, tip[0], tip[1], 3.4 * Math.sqrt(load));
      inkFill(g, MAT, 1.1, MAT_INK);
    }
  }

  SC['bioceramic-perforation'] = {
    dur: 7.4,
    width: 390,
    label: 'A stick figure packs bioceramic into a hole in a tooth root; the pH climbs to 12.5, mineral tags grow into the root wall, and the repair is sealed.',
    draw(g, S) {
      const T = S.on ? S.u * this.dur : -1;
      const t = S.t;
      let x = HOME, gait = { ph: 0, amp: 0 };
      const rest = P({ hF: [14, -62], hB: [-4, -52] });
      let pose = breathe(rest, t);
      const REST_A = 1.2;
      let toolA = REST_A, patchK = 0, tagK = 0, ph = 7, sealK = 0, reach = 0, cheer = 0;
      const inspect = P({ hF: [18, -84], hB: [-4, -53], head: [9, -115] });
      if (T < 0) {
        const look = pulse(t, 6, 2.4, 2);
        pose = mix(pose, inspect, look);
        toolA = lerp(REST_A, -0.5, look);
      } else {
        const fade = 1 - seg(T, this.dur - 0.45, this.dur);
        const segs = [walkSeg(T, 0, 0.7, HOME, AT), walkSeg(T, 6.1, 6.8, AT, HOME)];
        const ws = T < 6.1 ? segs[0] : segs[1];
        x = ws.x;
        gait = T >= 6.1 ? { ph: -ws.ph, amp: ws.amp, stride: ws.stride } : ws;

        reach = E.soft(seg(T, 0.7, 1.15)) * (1 - E.soft(seg(T, 2.05, 2.4)));
        const jab = seg(T, 1.15, 1.95);
        const back = (1 - Math.cos(jab * Math.PI * 6)) * 0.5 * 4.5 * (jab > 0 && jab < 1 ? 1 : 0);
        const dir = [Math.cos(-0.12), Math.sin(-0.12)];
        const target = [HOLE[0] + 1 - dir[0] * (TIP + back), HOLE[1] - dir[1] * (TIP + back)];
        const watch = E.soft(seg(T, 2.3, 2.7)) * (1 - E.soft(seg(T, 3.9, 4.2)));
        cheer = E.back(seg(T, 4.25, 4.7)) * (1 - E.soft(seg(T, 5.3, 5.7)));

        pose = mix(pose, P({ hF: lp(target, x, 0, 1), hB: [-4, -54], head: [10, -114], chest: [4, -89] }), reach);
        pose = mix(pose, P({ hF: [14, -64], hB: [-4, -52], head: [11, -116], chest: [3, -90] }), watch);
        pose = mix(pose, P({ hF: [14, -132], hB: [-10, -130], head: [3, -118] }), cheer);
        toolA = lerp(REST_A, -0.12, reach);
        toolA = lerp(toolA, -1.25, cheer);

        patchK = E.soft(jab) * fade;
        ph = lerp(7, 12.5, E.soft(seg(T, 2.3, 3.8)) * fade);
        tagK = seg(T, 3.0, 4.0) * fade;
        sealK = seg(T, 4.0, 4.4) * fade;
      }
      pose = legs(pose, gait.ph, gait.amp, { arms: false, stride: gait.stride });

      board(g, patchK, tagK);
      gauge(g, ph);
      const J = fig(g, pose, x, 0, { wave: S.wave, wt: S.wt });
      plugger(g, J.w.handF, toolA, 1 - patchK);
      R.frontArm(g, J);

      // ions leaving the setting cement
      for (let i = 0; i < 3; i++) {
        R.floatText(g, i === 1 ? 'OH⁻' : 'Ca²⁺', HOLE[0] - 8 - i * 17, HOLE[1] - 4 - (i % 2) * 7, seg(T, 2.3 + i * 0.45, 3.5 + i * 0.45), C.amber, 8);
      }
      tickBadge(g, HOLE[0] - 12, HOLE[1] - 18, sealK, 7);
      if (sealK > 0) {
        g.save();
        const z = E.back(sealK);
        g.translate(50, -60);
        g.scale(z, z);
        pill(g, 0, 0, 'sealed', C.green, C.greenInk, 9);
        g.restore();
      }
      sparks(g, HOLE[0], HOLE[1], seg(T, 4.0, 4.6), 14, 6, C.greenInk);
    },
  };
})();
