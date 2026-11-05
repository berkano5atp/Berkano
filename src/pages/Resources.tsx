import { useMemo, useState } from 'react';
import { ExternalLink, Phone } from 'lucide-react';
import { LAST_CHECKED, RESOURCES, TOPICS, type Region, type Resource, type Topic } from '../data/resources';
import { TreeRings } from '../components/brand';
import { PROVIDERS_2025, SOURCES } from '../data/stats';
import { CONTACT_EMAIL, MAILTO } from '../data/site';
import { Reveal } from '../lib/motion';

const nf = new Intl.NumberFormat('en-US');

function Item({ r }: { r: Resource }) {
  return (
    <Reveal as="li" className="grid gap-x-10 gap-y-3 border-t border-line py-7 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
      <div className="min-w-0">
        <h3 className="text-[1.65rem] leading-tight">{r.name}</h3>
        <p className="prose-w mt-2 text-ink-2">{r.description}</p>
        <p className="mt-2 text-[0.95rem] text-ink-2">{r.where}. Checked using: {r.checkedVia}.</p>
      </div>
      <div className="flex min-w-0 flex-col items-start gap-3">
        {r.phones?.map((p) => (
          <div key={p.tel}>
            <a href={`tel:${p.tel}`} className="inline-flex items-center gap-2 font-display text-[1.75rem] leading-none underline-offset-4 hover:underline">
              <Phone size={19} aria-hidden="true" /><span>{p.label}</span>
            </a>
            {p.note && <p className="mt-1 text-[0.95rem] text-ink-2">{p.note}</p>}
          </div>
        ))}
        <a href={r.href} target="_blank" rel="noopener noreferrer" className="tlink inline-flex items-center gap-1.5 font-semibold">
          {r.linkLabel}<ExternalLink size={15} aria-hidden="true" /><span className="sr-only">(opens in a new tab)</span>
        </a>
      </div>
    </Reveal>
  );
}

function Breakdown() {
  const max = PROVIDERS_2025[0].count;
  return (
    <section className="bg-sec" aria-labelledby="stats-title">
      <div className="wrap sec grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-16">
        <div className="min-w-0">
          <h2 id="stats-title" className="text-[clamp(2.2rem,4.4vw,3.6rem)]">Who provided treatment in 2025.</h2>
          <p className="mt-4 text-ink-2">Treatment admissions for drug use disorders in Sri Lanka, as reported by the NDDCB. These are admissions, and the report does not say they are unique people. They do not describe recovery outcomes.</p>
          <p className="mt-4 text-ink-2">NDDCB publications use different provider coverage from year to year. Its 2025 Handbook gives 3,140 for 2024, so we do not present the two totals as a trend.</p>
        </div>
        <div className="min-w-0">
          <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Scrollable table of treatment admissions by provider">
            <table className="w-full min-w-[440px] border-collapse text-left">
              <caption className="pb-4 text-left font-semibold">Treatment admissions by service provider, Sri Lanka, 2025</caption>
              <thead>
                <tr className="text-[0.95rem] text-ink-2">
                  <th scope="col" className="py-2 pr-4 font-semibold">Provider</th>
                  <th scope="col" className="w-[34%] py-2 pr-4"><span className="sr-only">Relative size</span></th>
                  <th scope="col" className="py-2 pr-3 text-right font-semibold">Admissions</th>
                  <th scope="col" className="py-2 text-right font-semibold">Share</th>
                </tr>
              </thead>
              <tbody className="tabular-nums">
                {PROVIDERS_2025.map((row) => (
                  <tr key={row.provider} className="border-t border-line">
                    <th scope="row" className="py-3 pr-4 font-semibold">{row.provider}</th>
                    <td className="py-3 pr-4" aria-hidden="true"><div className="h-2.5 rounded-r" style={{ background: 'var(--bar)', width: `${Math.max((row.count / max) * 100, 1.2)}%` }} /></td>
                    <td className="py-3 pr-3 text-right">{nf.format(row.count)}</td>
                    <td className="py-3 text-right">{row.pct.toFixed(1)}%</td>
                  </tr>
                ))}
                <tr className="border-t-2 border-ink font-bold">
                  <th scope="row" className="py-3 pr-4">Total</th>
                  <td aria-hidden="true" />
                  <td className="py-3 pr-3 text-right">6,030</td>
                  <td className="py-3 text-right">100.0%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-[0.95rem] text-ink-2">
            Sources: <a className="tlink" href={SOURCES.report2025.href} target="_blank" rel="noopener noreferrer">{SOURCES.report2025.label}</a>; <a className="tlink" href="https://www.nddcb.gov.lk/Docs/research/Final_Handbook_2025.pdf" target="_blank" rel="noopener noreferrer">NDDCB Handbook of Drug Abuse Information 2025</a>. Provider names are as labelled in the report.
          </p>
        </div>
      </div>
    </section>
  );
}

export function Resources() {
  const [topic, setTopic] = useState<Topic | 'all'>('all');
  const list = useMemo(() => RESOURCES.filter((r) => topic === 'all' || r.topics.includes(topic)), [topic]);
  const by = (region: Region) => list.filter((r) => r.region === region);
  const groups: [string, Region][] = [['In Sri Lanka', 'lk'], ['International', 'intl']];
  return (
    <>
      <section className="hero" aria-labelledby="res-title">
        <div className="pointer-events-none absolute top-1/2 right-[-200px] aspect-square w-[640px] -translate-y-1/2 max-md:opacity-40" aria-hidden="true">
          <TreeRings widths={[20, 24, 7, 28, 24, 6, 30, 28, 8, 32]} start={50} animate className="h-full w-full" />
        </div>
        <div className="wrap relative pt-14 pb-14 md:pt-20 md:pb-20">
          <h1 id="res-title" className="rise max-w-[13ch] text-[clamp(3rem,7vw,6rem)] leading-[1]">Support is out there. Start small.</h1>
          <p className="rise lede mt-6 !text-ink" style={{ animationDelay: '150ms' }}>Information, emotional support and professional care. Berkano is not affiliated with or endorsed by these organisations.</p>
        </div>
      </section>

      <section className="band on-band" aria-labelledby="urgent-title">
        <div className="wrap grid items-center gap-6 py-9 md:grid-cols-[minmax(0,1fr)_auto]">
          <div className="prose-w">
            <h2 id="urgent-title" className="text-3xl">If you or someone else is in immediate danger</h2>
            <p className="mt-2 text-band-2">Contact local emergency services or go to the nearest hospital. In Sri Lanka, 1990 Suwa Seriya is a free, 24-hour ambulance service. To talk to someone, you can call 1333 or 1926.</p>
          </div>
          <a href="tel:1990" className="btn btn-solid text-lg"><Phone size={18} aria-hidden="true" />Call 1990</a>
        </div>
      </section>

      <section className="wrap py-14" aria-label="Organisations">
        <div role="group" aria-label="Filter by topic" className="flex flex-wrap gap-2">
          {[{ id: 'all' as const, label: 'All topics' }, ...TOPICS].map((t) => (
            <button
              key={t.id} type="button" aria-pressed={topic === t.id} onClick={() => setTopic(t.id)}
              className="chip"
            >
              {t.label}
            </button>
          ))}
        </div>
        <p className="sr-only" aria-live="polite">{list.length} resources shown</p>
        {topic === 'eating' && (
          <p className="prose-w mt-6 rounded-2xl bg-beige px-4 py-3 text-ink">
            We have not yet found a Sri Lankan organisation dedicated only to eating disorders. The Sri Lankan helplines below are listed for eating and body image concerns, and a doctor or mental-health service can advise on specialist care.
          </p>
        )}
        {groups.map(([label, region]) => by(region).length > 0 && (
          <div key={region} className="mt-12">
            <h2 className="text-[clamp(2rem,3.6vw,3rem)]">{label}</h2>
            <ul className="mt-6 border-b border-line">{by(region).map((r) => <Item key={r.name} r={r} />)}</ul>
          </div>
        ))}
        <p className="prose-w mt-8 text-[0.95rem] text-ink-2">
          Details last checked on {LAST_CHECKED}. Numbers and hours can change, so please confirm them with the organisation. Found an error? Email <a className="tlink" href={MAILTO.general}>{CONTACT_EMAIL}</a>.
        </p>
      </section>
      <Breakdown />
    </>
  );
}
