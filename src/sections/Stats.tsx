import { ExternalLink } from 'lucide-react';
import { PROVIDERS_2025, STAT_GROUPS, type Graphic, type Stat } from '../data/stats';
import { CountUp, useInView, useReducedMotion } from '../lib/motion';
import { Link } from '../lib/router';

function StatGraphic({ g, seen }: { g: Graphic; seen: boolean }) {
  const reduced = useReducedMotion();
  const on = seen || reduced;
  if (g.kind === 'dots') {
    return (
      <div className="mt-4 flex max-w-[260px] flex-wrap gap-1.5" aria-hidden="true">
        {Array.from({ length: g.n }, (_, i) => <span key={i} className={`dotseed ${g.alt !== undefined && i >= g.alt ? 'alt' : ''}`} style={{ transitionDelay: `${i * 70}ms` }} />)}
      </div>
    );
  }
  if (g.kind === 'ring') {
    const c = 2 * Math.PI * 40;
    return (
      <svg viewBox="0 0 100 100" className="mt-4 h-20 w-20" aria-hidden="true">
        <circle cx="50" cy="50" r="40" fill="none" stroke="var(--bar-track)" strokeWidth="11" />
        <circle cx="50" cy="50" r="40" fill="none" stroke="var(--bar)" strokeWidth="11" strokeLinecap="round" className="gauge" strokeDasharray={c} strokeDashoffset={on ? c * (1 - g.pct / 100) : c} transform="rotate(-90 50 50)" />
      </svg>
    );
  }
  if (g.kind === 'bars') {
    return (
      <div className="mt-4 grid gap-1.5" aria-hidden="true">
        {PROVIDERS_2025.map((r, i) => <span key={r.provider} className="block rounded-r bg-transparent"><span className="grow-bar block" style={{ width: `${Math.max(1.5, (r.count / 2520) * 100)}%`, transitionDelay: `${i * 90}ms` }} /></span>)}
      </div>
    );
  }
  if (g.kind === 'wave') {
    const hs = [14, 26, 42, 22, 56, 36, 64, 30, 48, 20, 38, 58, 26, 44, 16, 34];
    return (
      <div className="mt-4 flex h-16 items-end gap-1" aria-hidden="true">
        {hs.map((h, i) => <span key={i} className="wave-bar" style={{ height: h, transitionDelay: `${i * 45}ms` }} />)}
      </div>
    );
  }
  return null;
}

function StatItem({ s, delay }: { s: Stat; delay: number }) {
  const [ref, seen] = useInView<HTMLDivElement>('0px 0px -8% 0px');
  return (
    <div ref={ref} className={`min-w-0 border-t-2 border-line pt-5 ${seen ? 'dot-in' : ''}`}>
      <p className="stat-num" data-stat={s.id}>
        {s.prefix && <span className="text-[0.42em]">{s.prefix}</span>}
        <CountUp value={s.value} decimals={s.decimals} duration={1700 + delay} />
        {s.suffix && <span className={s.suffix === '%' ? '' : 'text-[0.42em]'}>{s.suffix}</span>}
      </p>
      <p className="mt-3 text-[1.15rem] font-semibold leading-snug">{s.label}</p>
      <StatGraphic g={s.graphic} seen={seen} />
      {s.note && <p className="mt-3 text-[1rem] text-ink-2">{s.note}</p>}
      <p className="stat-source mt-3">
        <span className="font-semibold">{s.scope}.</span>{' '}
        <a href={s.source.href} target="_blank" rel="noopener noreferrer" className="tlink">
          {s.source.label}<ExternalLink size={13} className="ml-1 inline align-baseline" aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span>
        </a>
      </p>
    </div>
  );
}

export function Stats() {
  return (
    <section id="numbers" className="bg-sec" aria-labelledby="stats-title">
      <div className="wrap sec">
        <h2 id="stats-title" className="h-sec max-w-[16ch]">The support landscape, in numbers.</h2>
        <div className="mt-12 grid gap-14 lg:mt-16">
          {STAT_GROUPS.map((g) => (
            <section key={g.id} aria-labelledby={`stat-${g.id}`} className="grid gap-5 lg:grid-cols-[230px_minmax(0,1fr)] lg:gap-10">
              <div>
                <h3 id={`stat-${g.id}`} className="text-[2.1rem]">{g.title}</h3>
                <p className="mt-2 text-[1.02rem] text-ink-2">{g.measure}</p>
              </div>
              <div>
                <div className={`grid gap-10 sm:grid-cols-2 ${g.stats.length === 3 ? 'xl:grid-cols-3' : ''}`}>
                  {g.stats.map((s, i) => <StatItem key={s.id} s={s} delay={i * 150} />)}
                </div>
                {g.caveat && <p className="mt-6 max-w-[62ch] rounded-2xl bg-beige px-4 py-3 text-[1rem] text-ink">{g.caveat}</p>}
              </div>
            </section>
          ))}
        </div>
        <p className="mt-12 max-w-[62ch] text-[1rem] text-ink-2">
          These figures describe services, not recovery outcomes, and Berkano has no connection with them. <Link to="/resources" className="tlink font-semibold">See the full breakdown and support contacts</Link>
        </p>
      </div>
    </section>
  );
}
