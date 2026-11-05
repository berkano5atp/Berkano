import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Mail, Minus, Plus, RotateCcw } from 'lucide-react';
import { BirchBark, FullLogo, Symbol, TreeRings } from '../components/brand';
import { CopyEmail } from '../components/chrome';
import { AppThumbnail, BerkanoApp } from '../demo/BerkanoApp';
import { SCREENS, type DemoScreen } from '../demo/types';
import { useDemoState } from '../demo/useDemoState';
import { FEATURES } from '../data/features';
import symbol from '../assets/brand/berkano-symbol.png';
import { CONTACT_EMAIL, MAILTO } from '../data/site';
import { TEAM } from '../data/team';
import { Link } from '../lib/router';

const HERO_RINGS = [22, 25, 19, 27, 6, 5, 24, 30, 26, 7, 21, 32, 34, 28, 8, 5, 6, 26, 36, 33, 40, 9, 34, 42, 38];

function Hero() {
  return (
    <section className="relative overflow-clip" aria-labelledby="hero-title">
      <div className="pointer-events-none absolute top-[500px] left-1/2 aspect-square w-[860px] -translate-x-[38%] sm:top-[300px] lg:top-1/2 lg:left-auto lg:right-[-280px] lg:w-[1040px] lg:translate-x-0 lg:-translate-y-1/2">
        <TreeRings widths={HERO_RINGS} start={60} animate className="h-full w-full" />
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"><Symbol size={112} /></span>
      </div>
      <div className="wrap relative pt-12 pb-[500px] sm:pb-[520px] md:pt-20 lg:pb-28 lg:pt-24">
        <h1 id="hero-title" className="max-w-[11ch] text-[clamp(3.3rem,8.2vw,7.4rem)] leading-[0.98]">
          Recovery grows in rings, not straight lines.
        </h1>
        <div className="mt-8 max-w-[46ch] rounded-2xl bg-paper/85 lg:bg-transparent">
          <p className="text-xl leading-snug">
            Berkano is a proposed mobile app that helps people recovering from eating disorders or substance addiction notice their triggers, get through hard moments and stay close to support.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/#demo" className="btn btn-solid">Try the app concept</Link>
            <Link to="/#join" className="btn btn-line bg-paper">Join the interest list</Link>
          </div>
          <p className="mt-6 text-[0.95rem] text-ink-2">
            Currently in development as a university team project. Not yet available to download. Berkano is non-clinical and does not replace professional care.
          </p>
        </div>
      </div>
    </section>
  );
}

const PAIRS = [
  ['Triggers can be hard to recognise until afterwards.', 'The Trigger Journal gives you a simple place to record what happened and how it felt.'],
  ['Patterns are difficult to see from inside them.', 'The Recovery Dashboard brings your activity and reflections into one view.'],
  ['Urges and hard moments rarely arrive at a good time.', 'Safe Mode keeps coping activities and grounding exercises one tap away.'],
  ['A setback can feel like the whole story.', 'Progress is shown supportively, as something to learn from. It is never a competition.'],
  ['Reliable support information can be hard to find.', 'The Professional Hub gathers support resources and educational information.'],
  ['Goals can slip out of view.', 'Your Recovery Profile keeps your goals, preferences and known triggers close.'],
];

function Problem() {
  return (
    <section id="problem" className="band on-band" aria-labelledby="problem-title">
      <div className="wrap py-20 md:py-28">
        <h2 id="problem-title" className="max-w-[17ch] text-[clamp(2.4rem,5.2vw,4.4rem)]">Recovery also happens on ordinary days.</h2>
        <p className="prose-w mt-6 text-xl text-band-2">
          Self-management takes awareness, tools and people, and those are often scattered. Berkano proposes to bring them together in one calm app.
        </p>
        <dl className="mt-14 grid gap-x-16 md:grid-cols-2">
          {PAIRS.map(([p, a]) => (
            <div key={p} className="border-t border-band-line py-7">
              <dt className="font-display text-[1.65rem] leading-tight">{p}</dt>
              <dd className="mt-3 text-band-2">{a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function RingExplorer() {
  const [activeId, setActiveId] = useState('journal');
  const active = FEATURES.find((f) => f.id === activeId)!;
  const Icon = active.icon;
  const n = FEATURES.length;
  return (
    <section id="features" className="wrap py-20 md:py-28" aria-labelledby="features-title">
      <div className="grid items-end gap-6 lg:grid-cols-2">
        <h2 id="features-title" className="text-[clamp(2.4rem,5.2vw,4.4rem)]">Seven proposed tools, growing outward from you.</h2>
        <p className="prose-w text-xl text-ink-2 lg:pb-2">The rings start with what is personal and widen toward the people and services around you. Select one to explore it.</p>
      </div>
      <div className="mt-14 grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <div className="mx-auto aspect-square w-full max-w-[520px]">
          <svg viewBox="-210 -210 420 420" className="h-full w-full" aria-hidden="true">
            {FEATURES.map((f, i) => {
              const r = 200 - (n - 1 - i) * 26;
              const on = f.id === activeId;
              return (
                <circle
                  key={f.id} r={r - 11} fill="none"
                  stroke={on ? 'var(--ring-active)' : 'var(--ring)'}
                  strokeWidth={on ? 18 : 12}
                  strokeDasharray={f.planned ? '10 8' : undefined}
                  className="cursor-pointer transition-[stroke,stroke-width] duration-200"
                  onClick={() => setActiveId(f.id)}
                />
              );
            })}
            <circle r={21} fill="var(--plate)" />
            <image href={symbol} x={-13} y={-16} width={26} height={32} />
          </svg>
        </div>
        <div className="min-w-0">
          <div role="group" aria-label="Choose a feature" className="flex flex-wrap gap-2">
            {FEATURES.map((f) => (
              <button
                key={f.id} type="button" aria-pressed={f.id === activeId} onClick={() => setActiveId(f.id)}
                className="min-h-11 cursor-pointer rounded-full border border-line px-4 py-1.5 text-[0.95rem] font-semibold transition-colors hover:border-ink aria-pressed:border-btn aria-pressed:bg-btn aria-pressed:text-btn-fg"
              >
                {f.name}
              </button>
            ))}
          </div>
          <div className="mt-9 min-h-[300px]" aria-live="polite">
            <Icon size={34} strokeWidth={1.5} aria-hidden="true" />
            <h3 className="mt-3 text-[clamp(2rem,3.6vw,3rem)]">{active.name}</h3>
            <p className="mt-3 text-xl font-medium leading-snug">{active.summary}</p>
            <p className="prose-w mt-3 text-ink-2">{active.detail}</p>
            {active.caveat && <p className="prose-w mt-4 rounded-xl bg-beige px-4 py-3 text-[0.95rem]">{active.caveat}</p>}
            <Link to="/#demo" onClick={() => window.dispatchEvent(new CustomEvent('berkano-demo', { detail: active.screen }))} className="tlink mt-5 inline-block font-semibold">
              See {active.screenLabel} in the demo
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Scales a full-size screen to fit the width of its picker button. */
function ScaledThumb({ screen }: { screen: DemoScreen }) {
  const box = useRef<HTMLSpanElement>(null);
  const [scale, setScale] = useState(0.3);
  useEffect(() => {
    if (!box.current) return;
    const ro = new ResizeObserver(([e]) => setScale(e.contentRect.width / 360));
    ro.observe(box.current);
    return () => ro.disconnect();
  }, []);
  return (
    <span ref={box} className="block aspect-[360/420] overflow-hidden">
      <span className="block origin-top-left" style={{ width: 360, transform: `scale(${scale})` }}>
        <AppThumbnail screen={screen} />
      </span>
    </span>
  );
}

function Demo() {
  const demo = useDemoState('home');
  const [announce, setAnnounce] = useState('');
  const tip = SCREENS.find((x) => x.id === demo.screen)!;
  const { setScreen } = demo;
  useEffect(() => {
    const open = (e: Event) => setScreen((e as CustomEvent<DemoScreen>).detail);
    window.addEventListener('berkano-demo', open);
    return () => window.removeEventListener('berkano-demo', open);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const pick = (id: DemoScreen, label: string) => {
    demo.setScreen(id);
    setAnnounce(`Showing the ${label} screen`);
  };
  return (
    <section id="demo" className="border-y border-line bg-raised" aria-labelledby="demo-title">
      <div className="wrap grid gap-12 py-20 md:py-28 lg:grid-cols-[minmax(0,1fr)_376px] lg:gap-20">
        <div className="min-w-0">
          <h2 id="demo-title" className="text-[clamp(2.4rem,5.2vw,4.4rem)]">Try the app concept.</h2>
          <p className="prose-w mt-5 text-xl text-ink-2">
            This is an interactive concept demonstration of our prototype screens. Every name and number is fictional. It is not the finished app.
          </p>
          <p className="prose-w mt-4 rounded-xl bg-beige px-4 py-3 text-[0.95rem]">
            Please type only made-up text. Nothing you enter is sent or saved, and it disappears when you leave the page.
          </p>
          <div role="group" aria-label="Choose a demo screen" className="mt-9 grid grid-cols-3 gap-3 sm:gap-4">
            {SCREENS.map((sc) => (
              <button
                key={sc.id} type="button" aria-pressed={demo.screen === sc.id} onClick={() => pick(sc.id, sc.label)}
                className="group min-w-0 cursor-pointer text-left"
              >
                <span className="block overflow-hidden rounded-[14px] border-2 border-line transition-colors group-hover:border-ink group-aria-pressed:border-ink">
                  <ScaledThumb screen={sc.id} />
                </span>
                <span className="mt-1.5 block text-sm font-semibold leading-tight group-aria-pressed:underline">{sc.label}</span>
              </button>
            ))}
          </div>
          <p className="prose-w mt-7"><strong>Try this:</strong> {tip.tip}</p>
          {demo.screen === 'journal' && (
            <button type="button" className="btn btn-line mt-4" onClick={demo.fillExample}>Fill in a fictional example</button>
          )}
          <p className="sr-only" aria-live="polite">{announce}</p>
        </div>
        <div className="min-w-0">
          <div className="phone" role="region" aria-label="Interactive Berkano app concept demonstration">
            <span className="phone-speaker" aria-hidden="true" />
            <BerkanoApp state={demo} />
          </div>
          <p className="mt-4 text-center text-sm text-ink-2">Concept demonstration with fictional data</p>
        </div>
      </div>
    </section>
  );
}

function Birch() {
  const [widths, setWidths] = useState([18, 22, 7, 24, 20]);
  const [lastNew, setLastNew] = useState(false);
  const add = (w: number) => { setWidths((x) => [...x, w]); setLastNew(true); };
  const full = widths.length >= 16;
  return (
    <section aria-labelledby="birch-title">
      <BirchBark />
      <div className="wrap grid items-center gap-12 py-20 md:py-28 lg:grid-cols-2 lg:gap-20">
        <div className="min-w-0">
          <h2 id="birch-title" className="text-[clamp(2.4rem,5.2vw,4.4rem)]">Named for the birch.</h2>
          <p className="prose-w mt-6 text-xl">
            Birch is a pioneer tree, often among the first to return to cleared or burned ground. It has long stood for renewal, resilience, protection and new beginnings.
          </p>
          <p className="prose-w mt-4 text-ink-2">
            Trees keep a record too. A hard season leaves a narrow ring, and the next season grows around it. The narrow ring stays part of the trunk. We think that is a kinder way to picture recovery.
          </p>
          <dl className="prose-w mt-9 grid gap-6">
            <div><dt className="font-display text-2xl">Our mission</dt><dd className="mt-1 text-ink-2">To make recovery self-management more accessible, supportive and personal, through tools that encourage emotional awareness, reflection, coping and meaningful connection.</dd></div>
            <div><dt className="font-display text-2xl">Our vision</dt><dd className="mt-1 text-ink-2">A supportive environment where people can approach recovery with hope, dignity, confidence and encouragement.</dd></div>
          </dl>
        </div>
        <div className="min-w-0">
          <div className="mx-auto aspect-square w-full max-w-[460px] rounded-full">
            <TreeRings widths={widths} start={12} viewBox="-210 -210 420 420" lastIsNew={lastNew} className="h-full w-full" />
          </div>
          <div className="mt-5 flex flex-wrap justify-center gap-2.5" role="group" aria-label="Grow the illustration">
            <button type="button" disabled={full} onClick={() => add(24)} className="btn btn-line disabled:opacity-50"><Plus size={18} />Add an easier season</button>
            <button type="button" disabled={full} onClick={() => add(6)} className="btn btn-line disabled:opacity-50"><Minus size={18} />Add a harder season</button>
            <button type="button" aria-label="Start the illustration over" onClick={() => { setWidths([18, 22, 7, 24, 20]); setLastNew(false); }} className="btn btn-line !px-3.5"><RotateCcw size={18} /></button>
          </div>
          <p className="mt-4 text-center text-[0.95rem] text-ink-2" aria-live="polite">
            {full ? 'The trunk is full for this illustration. Every ring stayed.' : `${widths.length} seasons so far. Every ring stays.`} This is an illustration, not an app feature.
          </p>
        </div>
      </div>
    </section>
  );
}

const IS = [
  'A self-management companion for awareness, reflection and coping.',
  'Calm and non-judgmental, including after a setback.',
  'A way to stay close to people and services you choose.',
];
const ISNT = [
  'A diagnosis, medical treatment or a replacement for professional care.',
  'An emergency service. In immediate danger, contact local emergency services.',
  'A promise of recovery. The planned AI insights will not diagnose or predict relapse.',
];

function Boundaries() {
  return (
    <section className="bg-beige" aria-labelledby="bound-title">
      <div className="wrap py-20 md:py-24">
        <h2 id="bound-title" className="max-w-[18ch] text-[clamp(2.2rem,4.6vw,3.8rem)]">Clear about what Berkano is, and what it is not.</h2>
        <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-16">
          {[['What we are building', IS], ['What it will not be', ISNT]].map(([h, items]) => (
            <div key={h as string}>
              <h3 className="text-2xl">{h as string}</h3>
              <ul className="mt-4 grid gap-3">
                {(items as string[]).map((x) => <li key={x} className="border-t border-line pt-3">{x}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <p className="prose-w mt-10">
          Work in healthcare, recovery support or lived-experience advocacy? We would value your perspective on this concept.{' '}
          <a href={MAILTO.feedback} className="tlink font-semibold">Send us feedback</a>
        </p>
      </div>
    </section>
  );
}

function Team() {
  return (
    <section id="team" className="wrap py-20 md:py-28" aria-labelledby="team-title">
      <h2 id="team-title" className="text-[clamp(2.4rem,5.2vw,4.4rem)]">The team behind Berkano.</h2>
      <p className="prose-w mt-5 text-xl text-ink-2">Five university students, building Berkano as an Agile team project at IIT Sri Lanka.</p>
      <ul className="mt-12 grid grid-cols-2 gap-x-5 gap-y-9 md:grid-cols-3 lg:grid-cols-5">
        {TEAM.map((m, i) => (
          <li key={m.name} className="min-w-0">
            <div className="relative aspect-square overflow-hidden rounded-full bg-beige">
              {m.photo ? (
                <img src={m.photo} alt={`Portrait of ${m.name}`} loading="lazy" className="h-full w-full object-cover" />
              ) : (
                <div role="img" aria-label={`Photo placeholder for ${m.name}`} className="grid h-full w-full place-items-center">
                  <TreeRings widths={[24, 18, 7 + i, 26, 20, 8, 28]} start={16 + i * 4} viewBox="-150 -150 300 300" className="absolute inset-0 h-full w-full" />
                  <span className="relative font-display text-[clamp(1.8rem,3.4vw,2.8rem)]">{m.initials}</span>
                </div>
              )}
            </div>
            <p className="mt-4 font-display text-[1.12rem] leading-tight [overflow-wrap:normal] sm:text-[1.35rem]">{m.name}</p>
            <p className="mt-1 text-ink-2">{m.role}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Join() {
  return (
    <section id="join" className="band on-band relative overflow-clip" aria-labelledby="join-title">
      <div className="wrap relative grid items-center gap-12 py-20 md:py-28 lg:grid-cols-[minmax(0,1.4fr)_auto]">
        <div className="min-w-0">
          <h2 id="join-title" className="max-w-[16ch] text-[clamp(2.6rem,6vw,5rem)]">Follow Berkano as it grows.</h2>
          <p className="prose-w mt-6 text-xl text-band-2">
            Send us an email and we will add you to our interest list by hand. You will hear from us when there is news, such as a chance to give feedback.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={MAILTO.interest} className="btn btn-solid"><Mail size={18} />Email us to join the list</a>
            <CopyEmail />
          </div>
          <p className="mt-6 select-all font-display text-2xl break-all">{CONTACT_EMAIL}</p>
          <p className="prose-w mt-4 text-[0.95rem] text-band-2">
            The button opens your own email app, and nothing is sent until you press send. Please do not include health details. Read our <Link to="/privacy" className="tlink">privacy notice</Link>.
          </p>
        </div>
        <div className="hidden lg:block"><FullLogo className="h-80" /></div>
      </div>
    </section>
  );
}

function ResourcesTeaser() {
  return (
    <section className="wrap flex flex-wrap items-center justify-between gap-6 py-14" aria-label="Support resources">
      <div className="prose-w">
        <h2 className="text-[clamp(1.8rem,3.4vw,2.6rem)]">Looking for support today?</h2>
        <p className="mt-2 text-ink-2">We have gathered Sri Lankan and international organisations you can contact now.</p>
      </div>
      <Link to="/resources" className="btn btn-solid">Open support resources<ArrowUpRight size={18} /></Link>
    </section>
  );
}

export function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <RingExplorer />
      <Demo />
      <Birch />
      <Boundaries />
      <Team />
      <ResourcesTeaser />
      <Join />
    </>
  );
}
