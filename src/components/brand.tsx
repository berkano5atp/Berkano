import { useMemo } from 'react';
import { Moon, Sun } from 'lucide-react';
import logo from '../assets/brand/berkano-logo.png';
import symbol from '../assets/brand/berkano-symbol.png';
import { useTheme } from '../lib/theme';

/** The official logo always sits on a cream plate, so its colours stay unchanged in dark mode too. */
export function FullLogo({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-block rounded-[28px] p-6 ${className}`} style={{ background: 'var(--plate)' }}>
      <img src={logo} width={314} height={576} alt="Berkano logo: two overlapping circles, each holding a forward-pointing triangle, above the name Berkano" className="h-full w-auto" />
    </span>
  );
}

export function Symbol({ size = 40 }: { size?: number }) {
  return (
    <span className="inline-grid shrink-0 place-items-center rounded-full" style={{ width: size, height: size, background: 'var(--plate)' }}>
      <img src={symbol} alt="" style={{ height: size * 0.76, width: 'auto' }} />
    </span>
  );
}

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const dark = theme === 'dark';
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      className="inline-grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-line transition-colors hover:bg-beige"
    >
      {dark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}

function wobblyCircle(r: number, seed: number, amp: number) {
  const pts: string[] = [];
  const steps = 96;
  for (let i = 0; i < steps; i++) {
    const t = (i / steps) * Math.PI * 2;
    const w = Math.sin(t * 3 + seed) * amp + Math.sin(t * 5 + seed * 1.7) * amp * 0.55 + Math.sin(t * 2 - seed * 0.6) * amp * 0.8;
    pts.push(`${(Math.cos(t) * (r + w)).toFixed(1)} ${(Math.sin(t) * (r + w)).toFixed(1)}`);
  }
  return `M${pts.join('L')}Z`;
}

/**
 * A trunk cross-section. `widths` lists the gap between each ring, from the centre outward.
 * Narrow gaps are marked in a stronger colour: they read as harder seasons, and they stay in the trunk.
 */
export function TreeRings({ widths, start = 34, viewBox, animate, lastIsNew, className }: {
  widths: number[]; start?: number; viewBox?: string; animate?: boolean; lastIsNew?: boolean; className?: string;
}) {
  const rings = useMemo(() => {
    let r = start;
    return widths.map((w, i) => {
      r += w;
      const hard = w < 10;
      return { key: i, hard, d: wobblyCircle(r, 2 + i * 0.02, 0.6 + r * 0.022) };
    });
  }, [widths, start]);
  const size = start + widths.reduce((a, b) => a + b, 0) + 12;
  return (
    <svg viewBox={viewBox ?? `${-size} ${-size} ${size * 2} ${size * 2}`} className={className} aria-hidden="true" fill="none">
      <g className={animate ? 'ring-grow' : undefined}>
        {rings.map((ring) => (
          <path
            key={ring.key}
            d={ring.d}
            className={lastIsNew && ring.key === rings.length - 1 ? 'ring-new' : undefined}
            stroke={ring.hard ? 'var(--ring-hard)' : 'var(--ring)'}
            strokeWidth={ring.hard ? 2.2 : 1.4}
          />
        ))}
      </g>
    </svg>
  );
}

/** Dark birch-bark marks, used once as the transition into the birch story. */
export function BirchBark() {
  const marks = useMemo(() => {
    const out: { x: number; y: number; w: number; h: number }[] = [];
    let seed = 7;
    const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    for (let i = 0; i < 110; i++) {
      out.push({ x: rnd() * 1600, y: rnd() * 118 + 4, w: 14 + rnd() * rnd() * 150, h: 1.5 + rnd() * rnd() * 7 });
    }
    return out;
  }, []);
  return (
    <svg viewBox="0 0 1600 130" preserveAspectRatio="xMidYMid slice" className="block h-24 w-full md:h-32" aria-hidden="true">
      <rect width="1600" height="130" fill="var(--beige)" />
      {marks.map((m, i) => <rect key={i} x={m.x} y={m.y} width={m.w} height={m.h} rx={m.h / 2} fill="var(--ink)" opacity={0.78} />)}
    </svg>
  );
}
