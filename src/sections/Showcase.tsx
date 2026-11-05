import { useEffect, useState } from 'react';
import { BookOpen, ChartColumn, ChevronLeft, ChevronRight, Home, LifeBuoy, Users, User, type LucideIcon } from 'lucide-react';
import { TreeRings } from '../components/brand';
import { AppThumbnail, BerkanoApp } from '../demo/BerkanoApp';
import { SCREENS, type DemoScreen } from '../demo/types';
import { useDemoState } from '../demo/useDemoState';
import { Reveal, useInView, useReducedMotion } from '../lib/motion';

const ICONS: Record<DemoScreen, LucideIcon> = { home: Home, safe: LifeBuoy, journal: BookOpen, insights: ChartColumn, support: Users, me: User };
const RINGS = [30, 24, 8, 34, 28, 6, 38, 32, 9, 40, 36, 44, 7, 42];

function Ghost({ side, screen, onClick }: { side: 'l' | 'r'; screen: DemoScreen; onClick: () => void }) {
  return (
    <button type="button" tabIndex={-1} aria-hidden="true" onClick={onClick} className={`ghost ghost-${side} hidden xl:block`}>
      <span className="phone !max-w-none block">
        <AppThumbnail key={screen} screen={screen} />
      </span>
    </button>
  );
}

export function Showcase() {
  const demo = useDemoState('home');
  const reduced = useReducedMotion();
  const [phoneRef, phoneSeen] = useInView<HTMLDivElement>();
  const [announce, setAnnounce] = useState('');
  const index = SCREENS.findIndex((x) => x.id === demo.screen);
  const prev = SCREENS[(index + 5) % 6];
  const next = SCREENS[(index + 1) % 6];
  const { setScreen } = demo;

  useEffect(() => {
    const open = (e: Event) => setScreen((e as CustomEvent<DemoScreen>).detail);
    window.addEventListener('berkano-demo', open);
    return () => window.removeEventListener('berkano-demo', open);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pick = (id: DemoScreen) => {
    demo.setScreen(id);
    setAnnounce(`Showing the ${SCREENS.find((x) => x.id === id)!.label} screen`);
  };

  return (
    <section id="demo" className="stage" aria-labelledby="demo-title">
      <div className="wrap sec relative !pb-16">
        <Reveal className="text-center">
          <h2 id="demo-title" className="h-sec mx-auto max-w-[16ch]">Hold the app in your hand.</h2>
          <p className="mt-4 text-[1.15rem] text-ink-2">An interactive concept demo with fictional data. Tap anything.</p>
        </Reveal>

        <Reveal className="mt-8" delay={100}>
          <div role="group" aria-label="Choose a demo screen" className="dock">
            {SCREENS.map((sc) => {
              const Icon = ICONS[sc.id];
              return (
                <button key={sc.id} type="button" aria-pressed={demo.screen === sc.id} onClick={() => pick(sc.id)}>
                  <Icon size={18} aria-hidden="true" />{sc.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="relative mt-10">
          {/* Rings turn behind the phone as you move between screens. */}
          <div
            className="pointer-events-none absolute top-1/2 left-1/2 aspect-square w-[min(1040px,170vw)]"
            style={{ transform: `translate(-50%, -50%) rotate(${index * 28}deg)`, transition: reduced ? undefined : 'transform 1s cubic-bezier(0.2,0.7,0.2,1)' }}
          >
            <TreeRings widths={RINGS} start={70} className="h-full w-full" />
          </div>
          <div className="relative mx-auto" style={{ maxWidth: 1180 }}>
            <Ghost side="l" screen={prev.id} onClick={() => pick(prev.id)} />
            <Ghost side="r" screen={next.id} onClick={() => pick(next.id)} />
            <div className="pointer-events-none relative flex items-center justify-center gap-5 [&>*]:pointer-events-auto">
              <button type="button" className="arrow max-md:hidden relative z-3" aria-label={`Previous screen: ${prev.label}`} onClick={() => pick(prev.id)}><ChevronLeft size={24} /></button>
              <div
                ref={phoneRef}
                className="phone"
                role="region"
                aria-label="Interactive Berkano app concept demonstration"
                style={{ transition: reduced ? undefined : 'transform 0.9s cubic-bezier(0.2,0.7,0.2,1), opacity 0.9s ease', transform: phoneSeen || reduced ? 'none' : 'translateY(50px) scale(0.96)', opacity: phoneSeen || reduced ? 1 : 0.3 }}
              >
                <span className="phone-speaker" aria-hidden="true" />
                <BerkanoApp state={demo} />
              </div>
              <button type="button" className="arrow max-md:hidden relative z-3" aria-label={`Next screen: ${next.label}`} onClick={() => pick(next.id)}><ChevronRight size={24} /></button>
            </div>
          </div>
        </div>

        <div className="relative mt-8 text-center">
          <p aria-live="polite" className="mx-auto max-w-[46ch] text-[1.12rem] font-semibold">{SCREENS[index].tip}</p>
          <p className="mt-2 text-[1rem] text-ink-2">Please type made-up text only. Nothing is saved or sent.</p>
          {demo.screen === 'journal' && <button type="button" className="btn btn-line mt-4" onClick={demo.fillExample}>Fill in a fictional example</button>}
          <p className="sr-only" aria-live="polite">{announce}</p>
        </div>
      </div>
    </section>
  );
}
