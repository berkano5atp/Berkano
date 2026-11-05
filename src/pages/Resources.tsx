import { useMemo, useState } from 'react';
import { ExternalLink, Phone } from 'lucide-react';
import { LAST_CHECKED, NDDCB_2025, RESOURCES, TOPICS, type Region, type Resource, type Topic } from '../data/resources';
import { CONTACT_EMAIL, MAILTO } from '../data/site';

const nf = new Intl.NumberFormat('en-US');

function Item({ r }: { r: Resource }) {
  return (
    <li className="grid gap-x-10 gap-y-3 border-t border-line py-7 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
      <div className="min-w-0">
        <h3 className="text-[1.65rem] leading-tight">{r.name}</h3>
        <p className="prose-w mt-2 text-ink-2">{r.description}</p>
        <p className="mt-2 text-sm text-ink-2">{r.where}. Checked using: {r.checkedVia}.</p>
      </div>
      <div className="flex min-w-0 flex-col items-start gap-3">
        {r.phones?.map((p) => (
          <div key={p.tel}>
            <a href={`tel:${p.tel}`} className="inline-flex items-center gap-2 font-display text-[1.75rem] leading-none underline-offset-4 hover:underline">
              <Phone size={19} aria-hidden="true" /><span>{p.label}</span>
            </a>
            {p.note && <p className="mt-1 text-sm text-ink-2">{p.note}</p>}
          </div>
        ))}
        <a href={r.href} target="_blank" rel="noopener noreferrer" className="tlink inline-flex items-center gap-1.5 font-semibold">
          {r.linkLabel}<ExternalLink size={15} aria-hidden="true" /><span className="sr-only">(opens in a new tab)</span>
        </a>
      </div>
    </li>
  );
}

function Stats() {
  const max = NDDCB_2025.rows[0].count;
  return (
    <section className="band on-band" aria-labelledby="stats-title">
      <div className="wrap grid gap-12 py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] lg:gap-20">
        <div className="min-w-0">
          <h2 id="stats-title" className="text-[clamp(2.2rem,4.4vw,3.6rem)]">Where people in Sri Lanka received treatment in 2025.</h2>
          <p className="mt-5 text-band-2">
            The National Dangerous Drugs Control Board reported <strong className="text-band-fg">{nf.format(NDDCB_2025.total)} treatment admissions</strong> for drug use disorders in 2025. Private services accounted for the largest share.
          </p>
          <p className="mt-4 text-[0.95rem] text-band-2">
            These figures count admissions reported to the NDDCB, not individual people. They do not cover alcohol-only care or eating disorders, and they say nothing about recovery outcomes. Berkano has no connection with these services.
          </p>
        </div>
        <div className="min-w-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[440px] border-collapse text-left">
              <caption className="pb-4 text-left font-semibold">Treatment admissions by service provider, Sri Lanka, 2025</caption>
              <thead>
                <tr className="text-sm text-band-2">
                  <th scope="col" className="py-2 pr-4 font-medium">Provider</th>
                  <th scope="col" className="w-[38%] py-2 pr-4 font-medium"><span className="sr-only">Relative size</span></th>
                  <th scope="col" className="py-2 pr-3 text-right font-medium">Admissions</th>
                  <th scope="col" className="py-2 text-right font-medium">Share</th>
                </tr>
              </thead>
              <tbody className="tabular-nums">
                {NDDCB_2025.rows.map((row) => (
                  <tr key={row.provider} className="border-t border-band-line">
                    <th scope="row" className="py-3 pr-4 font-medium">{row.provider}</th>
                    <td className="py-3 pr-4" aria-hidden="true">
                      <div className="h-2.5 rounded-r bg-band-2" style={{ width: `${Math.max((row.count / max) * 100, 1.2)}%` }} />
                    </td>
                    <td className="py-3 pr-3 text-right">{nf.format(row.count)}</td>
                    <td className="py-3 text-right">{row.pct.toFixed(1)}%</td>
                  </tr>
                ))}
                <tr className="border-t-2 border-band-2 font-bold">
                  <th scope="row" className="py-3 pr-4">Total</th>
                  <td aria-hidden="true" />
                  <td className="py-3 pr-3 text-right">{nf.format(NDDCB_2025.total)}</td>
                  <td className="py-3 text-right">100.0%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-band-2">
            Source: <a className="tlink" href={NDDCB_2025.href} target="_blank" rel="noopener noreferrer">{NDDCB_2025.source}</a>. Provider names are shown as labelled in the report.
          </p>
          <p className="mt-6 border-t border-band-line pt-6">
            Worldwide, the WHO reports that 18 million people experienced eating disorders in 2023, including 4.7 million children and adolescents.{' '}
            <a className="tlink text-sm" href="https://www.who.int/news-room/fact-sheets/detail/mental-disorders" target="_blank" rel="noopener noreferrer">WHO, Mental disorders fact sheet, dated 11 September 2026</a>
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
      <section className="wrap pt-14 pb-12 md:pt-20" aria-labelledby="res-title">
        <h1 id="res-title" className="max-w-[15ch] text-[clamp(3rem,7vw,6rem)] leading-[1]">Support is out there, and you can start small.</h1>
        <p className="prose-w mt-6 text-xl text-ink-2">
          These organisations offer information, emotional support or professional care. Berkano is not affiliated with or endorsed by any of them.
        </p>
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
              className="min-h-11 cursor-pointer rounded-full border border-line px-4 py-1.5 text-[0.95rem] font-semibold transition-colors hover:border-ink aria-pressed:border-btn aria-pressed:bg-btn aria-pressed:text-btn-fg"
            >
              {t.label}
            </button>
          ))}
        </div>
        <p className="sr-only" aria-live="polite">{list.length} resources shown</p>
        {topic === 'eating' && (
          <p className="prose-w mt-6 rounded-xl bg-beige px-4 py-3">
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
      <Stats />
    </>
  );
}
