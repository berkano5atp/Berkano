import { useEffect, useMemo, useRef } from 'react';
import { useReducedMotion } from '../lib/motion';

function rng(seed: number) {
  let s = seed;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

type Trunk = { x: number; w: number; lean: number; marks: { dx: number; y: number; w: number; h: number }[] };

function makeTrunks(xs: number[], width: number, seed: number, height: number): Trunk[] {
  const r = rng(seed);
  return xs.map((x) => ({
    x, w: width * (0.75 + r() * 0.5), lean: (r() - 0.5) * 34,
    marks: Array.from({ length: Math.round((height + 800) / 26) }, () => ({ dx: r() * 0.7, y: r() * (height + 800) - 800, w: 0.22 + r() * 0.5, h: 1.5 + r() * r() * 7 })),
  }));
}

function Trunks({ trunks, height, fill, mark, line, leaves }: { trunks: Trunk[]; height: number; fill: string; mark: string; line?: string; leaves?: boolean }) {
  return (
    <>
      {trunks.map((t, i) => {
        const top = t.w * 0.55;
        const lean = t.lean;
        const clipId = `tk-${t.x}-${Math.round(t.w * 10)}`;
        // Trunks run far above the frame so they always leave through the top of the hero.
        const points = `${t.x},${height + 10} ${t.x + t.w},${height + 10} ${t.x + t.w / 2 + top / 2 + lean},-810 ${t.x + t.w / 2 - top / 2 + lean},-810`;
        return (
          <g key={i}>
            <clipPath id={clipId}><polygon points={points} /></clipPath>
            <polygon points={points} fill={fill} stroke={line} strokeWidth={line ? 1.2 : 0} style={{ transition: 'fill 0.8s ease' }} />
            <g clipPath={`url(#${clipId})`}>
              {t.marks.map((m, k) => {
                const shift = (lean * (height - m.y)) / (height + 810);
                const narrow = 1 - ((height - m.y) / (height + 810)) * 0.45;
                return <rect key={k} x={t.x + t.w / 2 + shift - (t.w * narrow) / 2 + m.dx * t.w * narrow * 0.7} y={m.y} width={m.w * t.w * narrow} height={m.h} rx={m.h / 2} fill={mark} style={{ transition: 'fill 0.8s ease' }} />;
              })}
            </g>
            {leaves && <Branch x={t.x + t.w / 2 + lean * 0.45} y={height * 0.3} flip={i % 2 === 1} seed={i * 13 + 5} />}
          </g>
        );
      })}
    </>
  );
}

function Branch({ x, y, flip, seed }: { x: number; y: number; flip: boolean; seed: number }) {
  const sign = flip ? -1 : 1;
  const leaves = useMemo(() => {
    const r = rng(seed + 11);
    return Array.from({ length: 18 }, (_, i) => ({ x: x + sign * (24 + (i / 18) * 96), y: y - 22 - (i / 18) * 42 + (r() - 0.5) * 34, rot: r() * 90 - 45, gold: r() > 0.72 }));
  }, [x, y, sign, seed]);
  return (
    <g className="sway">
      <path d={`M${x} ${y} Q ${x + sign * 55} ${y - 18} ${x + sign * 125} ${y - 66}`} fill="none" stroke="var(--branch)" strokeWidth={3} strokeLinecap="round" />
      {leaves.map((l, i) => <ellipse key={i} cx={l.x} cy={l.y} rx={10} ry={5} transform={`rotate(${l.rot} ${l.x} ${l.y})`} fill={l.gold ? 'var(--leaf-2)' : 'var(--leaf)'} style={{ transition: 'fill 0.8s ease' }} />)}
    </g>
  );
}

/** Drifting birch seeds in the light theme, fireflies in the dark theme. Pauses off screen. */
function Particles() {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = canvas.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    if (!ctx) return;
    const r = rng(42);
    const dots = Array.from({ length: 34 }, () => ({ x: r(), y: r(), s: 1.4 + r() * 2.2, v: 0.00012 + r() * 0.00028, phase: r() * 6.28 }));
    let raf = 0;
    let visible = true;
    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      c.width = c.offsetWidth * dpr;
      c.height = c.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    size();
    const isDark = () => getComputedStyle(document.documentElement).getPropertyValue('--moon-o').trim() === '1';
    const draw = (t: number) => {
      raf = requestAnimationFrame(draw);
      if (!visible) return;
      const w = c.offsetWidth;
      const h = c.offsetHeight;
      const dark = isDark();
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        d.y += dark ? -d.v * 0.5 : d.v;
        if (d.y > 1.03) d.y = -0.03;
        if (d.y < -0.03) d.y = 1.03;
        const x = (d.x + Math.sin(t * 0.00025 + d.phase) * 0.018) * w;
        const y = d.y * h;
        if (dark) {
          const a = 0.2 + 0.8 * Math.max(0, Math.sin(t * 0.0012 + d.phase));
          ctx.fillStyle = `rgba(233,205,150,${a * 0.22})`;
          ctx.beginPath(); ctx.arc(x, y, d.s * 4, 0, 6.3); ctx.fill();
          ctx.fillStyle = `rgba(250,230,185,${a})`;
          ctx.beginPath(); ctx.arc(x, y, d.s * 0.9, 0, 6.3); ctx.fill();
        } else {
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(Math.sin(t * 0.0006 + d.phase) * 1.2);
          ctx.fillStyle = 'rgba(122,92,51,0.42)';
          ctx.beginPath(); ctx.ellipse(0, 0, d.s * 1.5, d.s * 0.6, 0, 0, 6.3); ctx.fill();
          ctx.restore();
        }
      }
    };
    raf = requestAnimationFrame(draw);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(c);
    window.addEventListener('resize', size);
    return () => { cancelAnimationFrame(raf); io.disconnect(); window.removeEventListener('resize', size); };
  }, []);
  return <canvas ref={canvas} className="hero-canvas" aria-hidden="true" />;
}

/** The hero's grove: layered hills and birches beneath the sun or moon. */
export function HeroScene() {
  const reduced = useReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const back = useMemo(() => makeTrunks([1040, 1130, 1250, 1360, 1480, 1570], 26, 3, 520), []);
  const mid = useMemo(() => makeTrunks([1090, 1300, 1540], 40, 9, 620), []);
  const front = useMemo(() => makeTrunks([1190, 1490], 70, 21, 760), []);

  useEffect(() => {
    if (reduced || !root.current) return;
    const layers = [...root.current.querySelectorAll<HTMLElement>('[data-depth]')];
    let raf = 0;
    let mx = 0;
    const apply = () => {
      raf = 0;
      const y = window.scrollY;
      for (const l of layers) {
        const d = Number(l.dataset.depth);
        l.style.transform = `translate3d(${mx * d * 26}px, ${y * d}px, 0)`;
      }
    };
    const queue = () => { if (!raf) raf = requestAnimationFrame(apply); };
    const pointer = (e: PointerEvent) => { mx = e.clientX / window.innerWidth - 0.5; queue(); };
    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('pointermove', pointer, { passive: true });
    return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', queue); window.removeEventListener('pointermove', pointer); };
  }, [reduced]);

  return (
    <div ref={root} className="absolute inset-0" aria-hidden="true">
      <div className="celestial" data-depth="0.34">
        <span className="sun" />
        <span className="moon" />
      </div>
      {!reduced && <Particles />}
      <div className="hero-layer h-[64%]" data-depth="0.24">
        <svg viewBox="0 0 1600 520" preserveAspectRatio="xMaxYMax slice">
          <Trunks trunks={back} height={520} fill="var(--trunk-b)" mark="var(--mark-b)" />
          <path d="M0 420 C 300 340 520 450 820 390 S 1320 330 1600 400 V 530 H 0 Z" fill="var(--hill-1)" style={{ transition: 'fill 0.8s ease' }} />
        </svg>
      </div>
      <div className="hero-layer h-[74%]" data-depth="0.14">
        <svg viewBox="0 0 1600 620" preserveAspectRatio="xMaxYMax slice">
          <Trunks trunks={mid} height={620} fill="var(--trunk-m)" mark="var(--mark)" line="var(--trunk-line)" />
          <path d="M0 560 C 380 480 640 590 960 530 S 1400 480 1600 540 V 630 H 0 Z" fill="var(--hill-2)" style={{ transition: 'fill 0.8s ease' }} />
        </svg>
      </div>
      <div className="hero-layer h-[92%]" data-depth="0.05">
        <svg viewBox="0 0 1600 760" preserveAspectRatio="xMaxYMax slice">
          <Trunks trunks={front} height={760} fill="var(--trunk-f)" mark="var(--mark)" line="var(--trunk-line)" leaves />
          <path d="M0 720 C 420 670 800 750 1100 700 S 1500 680 1600 710 V 770 H 0 Z" fill="var(--hill-3)" style={{ transition: 'fill 0.8s ease' }} />
        </svg>
      </div>
    </div>
  );
}

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

const BRANCHES = [
  { d: 'M300 470 C 250 440 200 420 130 360', at: 0.2, tip: [130, 360] },
  { d: 'M300 420 C 360 390 410 360 480 310', at: 0.27, tip: [480, 310] },
  { d: 'M300 340 C 240 310 190 270 120 225', at: 0.34, tip: [120, 225] },
  { d: 'M300 280 C 360 250 420 215 490 165', at: 0.42, tip: [490, 165] },
  { d: 'M300 200 C 260 170 220 140 170 90', at: 0.5, tip: [170, 90] },
  { d: 'M300 150 C 335 120 370 90 410 50', at: 0.56, tip: [410, 50] },
];
const ROOTS = [
  { d: 'M300 560 C 240 590 160 590 70 610', end: [70, 610] },
  { d: 'M300 560 C 360 595 450 590 535 612', end: [535, 612] },
  { d: 'M300 560 C 280 600 230 625 170 632', end: [170, 632] },
  { d: 'M300 560 C 330 600 380 628 440 634', end: [440, 634] },
];

/** A birch that grows with `p`, from 0 to 1. It loses leaves in the third stage, regrows them, then spreads roots. */
export function GrowingBirch({ p }: { p: number }) {
  const leaves = useMemo(() => {
    const r = rng(77);
    return BRANCHES.flatMap((b, bi) => Array.from({ length: 11 }, (_, i) => {
      const a = r() * 6.28;
      const d = 12 + r() * 62;
      return { x: b.tip[0] + Math.cos(a) * d, y: b.tip[1] + Math.sin(a) * d * 0.72, rot: r() * 180, at: b.at + 0.08 + (i / 11) * 0.12, falls: i % 3 !== 0, gold: r() > 0.66, bi };
    }));
  }, []);
  const grow = clamp01(p / 0.6);
  const trunkTop = 560 - 510 * grow;
  const marks = useMemo(() => {
    const r = rng(5);
    return Array.from({ length: 22 }, () => ({ y: 60 + r() * 490, x: 278 + r() * 26, w: 8 + r() * 14, h: 1.5 + r() * 4 }));
  }, []);
  const scar = clamp01((p - 0.5) / 0.05);
  return (
    <svg viewBox="0 0 600 660" className="h-full w-full" role="img" aria-label="An illustrated birch tree that grows, loses some leaves, regrows them and spreads its roots">
      <path d="M14 606 C 110 548 210 566 300 556 C 400 546 500 556 586 606 C 560 654 40 654 14 606 Z" fill="var(--soil)" />
      {ROOTS.map((root, i) => {
        const v = clamp01((p - 0.74 - i * 0.03) / 0.12);
        return (
          <g key={i}>
            <path d={root.d} pathLength={1} fill="none" stroke="var(--root)" strokeWidth={3} strokeLinecap="round" strokeDasharray="1" strokeDashoffset={1 - v} />
            <circle cx={root.end[0]} cy={root.end[1]} r={9 * v} fill="var(--num)" />
            <circle cx={root.end[0]} cy={root.end[1]} r={18 * v} fill="none" stroke="var(--num)" strokeWidth="1.5" opacity={0.5 * v} />
          </g>
        );
      })}
      {BRANCHES.map((b) => (
        <path key={b.d} d={b.d} pathLength={1} fill="none" stroke="var(--branch)" strokeWidth={5} strokeLinecap="round" strokeDasharray="1" strokeDashoffset={1 - clamp01((p - b.at) / 0.1)} />
      ))}
      <clipPath id="story-trunk"><rect x="240" y={trunkTop} width="120" height={560 - trunkTop + 4} /></clipPath>
      <g clipPath="url(#story-trunk)">
        <path d="M272 562 C 278 400 288 180 296 48 L 306 48 C 314 180 324 400 330 562 Z" fill="var(--tree-trunk)" stroke="var(--trunk-line)" strokeWidth={1.5} />
        {marks.map((m, i) => {
          const half = 28 - ((560 - m.y) / 510) * 24;
          return <rect key={i} x={301 - half} y={m.y} width={Math.min(m.w, half * 1.5)} height={m.h} rx={m.h / 2} fill="var(--mark)" />;
        })}
        <rect x="270" y="318" width="64" height="5" fill="var(--ring-hard)" opacity={scar} />
      </g>
      {p < 0.3 && (
        <g opacity={1 - clamp01((p - 0.2) / 0.1)}>
          <ellipse cx={288} cy={trunkTop + 2} rx={14} ry={6} transform={`rotate(25 288 ${trunkTop + 2})`} fill="var(--leaf)" />
          <ellipse cx={316} cy={trunkTop + 2} rx={14} ry={6} transform={`rotate(-25 316 ${trunkTop + 2})`} fill="var(--leaf-2)" />
        </g>
      )}
      {leaves.map((l, i) => {
        let s = clamp01((p - l.at) / 0.05);
        let dy = 0;
        if (l.falls && p > 0.52) {
          const f = clamp01((p - 0.52) / 0.08);
          const back = clamp01((p - 0.62 - l.bi * 0.012) / 0.07);
          dy = f * (1 - back) * 90;
          s = back > 0 ? back : 1 - f;
        }
        return <ellipse key={i} cx={l.x} cy={l.y + dy} rx={12 * s} ry={6 * s} transform={`rotate(${l.rot} ${l.x} ${l.y + dy})`} fill={l.gold ? 'var(--leaf-2)' : 'var(--leaf)'} />;
      })}
    </svg>
  );
}
