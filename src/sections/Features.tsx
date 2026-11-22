import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import symbol from '../assets/brand/berkano-symbol.png';
import { FEATURES } from '../data/features';
import { Link } from '../lib/router';
import { Reveal } from '../lib/motion';

const N = FEATURES.length;
const radius = (i: number) => 0.17 + (i / (N - 1)) * 0.3; // share of the box width
const angle = (i: number) => ((-100 + i * 137.5) * Math.PI) / 180; // the golden angle, as in leaves on a stem

export function Features() {
  const [activeId, setActiveId] = useState('journal');
  const active = FEATURES.find((f) => f.id === activeId)!;
  const Icon = active.icon;
  return (
    <section id="features" className="wrap sec" aria-labelledby="features-title">
      <Reveal className="max-w-3xl">
        <h2 id="features-title" className="h-sec">Seven tools, growing outward from you.</h2>
      </Reveal>
      <div className="mt-10 grid items-center gap-10 lg:mt-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-16">
        <Reveal className="relative mx-auto aspect-square w-full max-w-[600px]">
          <svg viewBox="-100 -100 200 200" className="absolute inset-0 h-full w-full" aria-hidden="true">
            {FEATURES.map((f, i) => {
              const on = f.id === activeId;
              return (
                <circle
                  key={f.id} r={radius(i) * 200} fill="none"
                  stroke={on ? 'var(--ring-active)' : 'var(--ring-track)'} strokeWidth={on ? 3.2 : 2.4}
                  strokeDasharray={f.planned ? '3 2.4' : undefined}
                  style={{ transition: 'stroke 0.3s ease, stroke-width 0.3s ease' }}
                />
              );
            })}
            <circle r="16" fill="var(--plate)" />
            <image href={symbol} x="-9" y="-11" width="18" height="22" />
          </svg>
          <div role="group" aria-label="Choose a feature">
            {FEATURES.map((f, i) => {
              const NodeIcon = f.icon;
              return (
                <button
                  key={f.id} type="button" className="node" aria-pressed={f.id === activeId} aria-label={f.name} title={f.name}
                  style={{ left: `${50 + Math.cos(angle(i)) * radius(i) * 100}%`, top: `${50 + Math.sin(angle(i)) * radius(i) * 100}%` }}
                  onClick={() => setActiveId(f.id)}
                >
                  <NodeIcon size={22} aria-hidden="true" />
                </button>
              );
            })}
          </div>
        </Reveal>
        <div className="min-h-[320px] min-w-0" aria-live="polite">
          <div key={active.id} className="panel-in">
            <Icon size={38} strokeWidth={1.5} className="text-accent" aria-hidden="true" />
            <h3 className="mt-3 text-[clamp(2.2rem,4vw,3.4rem)]">{active.name}</h3>
            <p className="mt-3 text-[1.35rem] font-semibold leading-snug">{active.summary}</p>
            <p className="prose-w mt-2 text-[1.1rem] text-ink-2">{active.detail}</p>
            {active.caveat && <p className="prose-w mt-4 rounded-2xl bg-beige px-4 py-3 text-[1rem] text-ink">{active.caveat}</p>}
            <Link to="/#demo" onClick={() => window.dispatchEvent(new CustomEvent('berkano-demo', { detail: active.screen }))} className="btn btn-line mt-6">
              See it in the demo<ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
