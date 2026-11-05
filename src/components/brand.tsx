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
    <button type="button" onClick={toggle} data-dark={dark} aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'} className="toggle">
      <span className="toggle-knob">{dark ? <Moon size={16} /> : <Sun size={16} />}</span>
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
 * Narrow gaps are drawn in a stronger colour: they read as harder seasons, and they stay in the trunk.
 */
export function TreeRings({ widths, start = 34, viewBox, animate, lastIsNew, className, spin }: {
  widths: number[]; start?: number; viewBox?: string; animate?: boolean; lastIsNew?: boolean; className?: string; spin?: boolean;
}) {
  const rings = useMemo(() => {
    let r = start;
    return widths.map((w, i) => {
      r += w;
      return { key: i, hard: w < 10, d: wobblyCircle(r, 2 + i * 0.02, 0.6 + r * 0.022) };
    });
  }, [widths, start]);
  const size = start + widths.reduce((a, b) => a + b, 0) + 12;
  return (
    <svg viewBox={viewBox ?? `${-size} ${-size} ${size * 2} ${size * 2}`} className={className} aria-hidden="true" fill="none">
      <g className={animate ? 'ring-grow' : undefined}>
        <g className={spin ? 'ring-spin' : undefined}>
          {rings.map((ring) => (
            <path
              key={ring.key} d={ring.d}
              className={lastIsNew && ring.key === rings.length - 1 ? 'ring-new' : undefined}
              stroke={ring.hard ? 'var(--ring-hard)' : 'var(--ring)'}
              strokeWidth={ring.hard ? 2.4 : 1.5}
            />
          ))}
        </g>
      </g>
    </svg>
  );
}
