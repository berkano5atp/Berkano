import { useState } from 'react';
import { ArrowRight, Check, Mail, Minus, Plus, RotateCcw, X } from 'lucide-react';
import { FullLogo, TreeRings } from '../components/brand';
import { CopyEmail } from '../components/chrome';
import { CONTACT_EMAIL, MAILTO } from '../data/site';
import { TEAM } from '../data/team';
import { Reveal } from '../lib/motion';
import { Link } from '../lib/router';

export function Birch() {
  const start = [18, 22, 7, 24, 20];
  const [widths, setWidths] = useState(start);
  const [lastNew, setLastNew] = useState(false);
  const add = (w: number) => { setWidths((x) => [...x, w]); setLastNew(true); };
  const full = widths.length >= 16;
  return (
    <section aria-labelledby="birch-title">
      <div className="wrap sec grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal className="min-w-0">
          <h2 id="birch-title" className="h-sec">Named for the birch.</h2>
          <p className="lede mt-5">Often among the first trees back on cleared ground. A symbol of renewal, resilience, protection and new beginnings.</p>
          <dl className="mt-9 grid gap-5 sm:grid-cols-2">
            <div className="border-t-2 border-line pt-3"><dt className="font-display text-[1.7rem]">Mission</dt><dd className="mt-1 text-ink-2">Make recovery self-management more accessible, supportive and personal.</dd></div>
            <div className="border-t-2 border-line pt-3"><dt className="font-display text-[1.7rem]">Vision</dt><dd className="mt-1 text-ink-2">Recovery approached with hope, dignity, confidence and encouragement.</dd></div>
          </dl>
        </Reveal>
        <Reveal className="min-w-0" delay={120}>
          <p className="text-center font-display text-[1.7rem] leading-tight">A hard season leaves a narrow ring. The tree keeps growing.</p>
          <div className="mx-auto mt-3 aspect-square w-full max-w-[420px]">
            <TreeRings widths={widths} start={12} viewBox="-210 -210 420 420" lastIsNew={lastNew} className="h-full w-full" />
          </div>
          <div className="flex flex-wrap justify-center gap-2.5" role="group" aria-label="Grow the illustration">
            <button type="button" disabled={full} onClick={() => add(24)} className="btn btn-line disabled:opacity-50"><Plus size={18} aria-hidden="true" />Easier season</button>
            <button type="button" disabled={full} onClick={() => add(6)} className="btn btn-line disabled:opacity-50"><Minus size={18} aria-hidden="true" />Harder season</button>
            <button type="button" aria-label="Start the illustration over" onClick={() => { setWidths(start); setLastNew(false); }} className="btn btn-line !px-3.5"><RotateCcw size={18} /></button>
          </div>
          <p className="mt-3 text-center text-[1rem] text-ink-2" aria-live="polite">{widths.length} seasons, and every ring stays. An illustration, not an app feature.</p>
        </Reveal>
      </div>
    </section>
  );
}

const PAIRS = [
  ['Self-management support', 'A diagnosis or medical treatment'],
  ['Coping tools for hard moments', 'An emergency service'],
  ['Reflective insights', 'A way to predict relapse'],
  ['A companion alongside care', 'A replacement for professional care'],
];

export function Boundaries() {
  return (
    <section className="bg-beige text-ink" aria-labelledby="bound-title">
      <div className="wrap sec !py-20">
        <Reveal><h2 id="bound-title" className="h-sec max-w-[16ch]">What Berkano is, and is not.</h2></Reveal>
        <ul className="mt-10 grid gap-x-12 md:grid-cols-2">
          {PAIRS.map(([yes, no], i) => (
            <Reveal as="li" key={yes} delay={i * 80} className="grid grid-cols-2 gap-4 border-t-2 border-line py-5 text-[1.1rem] font-semibold">
              <span className="flex items-start gap-2"><Check size={21} className="mt-0.5 shrink-0" aria-label="Berkano is" />{yes}</span>
              <span className="flex items-start gap-2 text-ink-2"><X size={21} className="mt-0.5 shrink-0" aria-label="Berkano is not" />{no}</span>
            </Reveal>
          ))}
        </ul>
        <p className="mt-6 text-[1.05rem]">
          Work in healthcare or recovery support? <a href={MAILTO.feedback} className="tlink font-bold">Share feedback on the concept</a>
        </p>
      </div>
    </section>
  );
}

export function Team() {
  return (
    <section id="team" className="wrap sec" aria-labelledby="team-title">
      <Reveal>
        <h2 id="team-title" className="h-sec">The team.</h2>
        <p className="lede mt-3">Five students at IIT Sri Lanka, building Berkano as an Agile team project.</p>
      </Reveal>
      <ul className="mt-12 grid grid-cols-2 gap-x-5 gap-y-10 max-[359px]:grid-cols-1 md:grid-cols-3 lg:grid-cols-5">
        {TEAM.map((m, i) => (
          <Reveal as="li" key={m.name} delay={i * 90} className="team-card min-w-0">
            <div className="relative aspect-square overflow-hidden rounded-full bg-beige">
              {m.photo ? (
                <img src={m.photo} alt={`Portrait of ${m.name}`} loading="lazy" className="h-full w-full object-cover" />
              ) : (
                <div role="img" aria-label={`Photo placeholder for ${m.name}`} className="grid h-full w-full place-items-center">
                  <span className="team-ring absolute inset-0"><TreeRings widths={[24, 18, 7 + i, 26, 20, 8, 28]} start={16 + i * 4} viewBox="-150 -150 300 300" className="h-full w-full" /></span>
                  <span className="relative font-display text-[clamp(1.8rem,3.4vw,2.8rem)] text-ink">{m.initials}</span>
                </div>
              )}
            </div>
            <p className="mt-4 font-display text-[1.14rem] leading-tight [overflow-wrap:normal] sm:text-[1.4rem]">{m.name}</p>
            <p className="mt-1 text-ink-2">{m.role}</p>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

export function Join() {
  return (
    <section id="join" className="band on-band relative overflow-clip" aria-labelledby="join-title">
      <div className="pointer-events-none absolute top-1/2 right-[-260px] aspect-square w-[760px] -translate-y-1/2 opacity-40 max-lg:hidden" aria-hidden="true">
        <TreeRings widths={[20, 26, 7, 28, 24, 6, 32, 28, 8, 34, 30]} start={40} className="h-full w-full" />
      </div>
      <div className="wrap sec relative grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_auto]">
        <Reveal className="min-w-0">
          <h2 id="join-title" className="max-w-[14ch] text-[clamp(2.8rem,6.4vw,5.4rem)]">Follow Berkano as it grows.</h2>
          <p className="mt-5 max-w-[44ch] text-[1.2rem] text-band-2">Email us to join the interest list, and we will share news and chances to give feedback.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={MAILTO.interest} className="btn btn-solid"><Mail size={18} aria-hidden="true" />Email us to join</a>
            <CopyEmail />
          </div>
          <p className="mt-5 select-all font-display text-[1.6rem] break-all">{CONTACT_EMAIL}</p>
          <p className="mt-2 max-w-[56ch] text-[1rem] text-band-2">Nothing is sent until you press send. Please do not include health details. <Link to="/privacy" className="tlink">Privacy notice</Link></p>
        </Reveal>
        <Reveal delay={120} className="hidden lg:block"><FullLogo className="h-72" /></Reveal>
      </div>
    </section>
  );
}

export function ResourcesTeaser() {
  return (
    <section className="bg-sec" aria-labelledby="teaser-title">
      <Reveal className="wrap flex flex-wrap items-center justify-between gap-6 py-12">
        <h2 id="teaser-title" className="text-[clamp(1.9rem,3.6vw,2.9rem)]">Looking for support today?</h2>
        <Link to="/resources" className="btn btn-solid">Open support resources<ArrowRight size={18} aria-hidden="true" /></Link>
      </Reveal>
    </section>
  );
}
