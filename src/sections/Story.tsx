import { useRef } from 'react';
import { GrowingBirch } from '../components/scene';
import { useReducedMotion, useSectionProgress } from '../lib/motion';

const BEATS = [
  { title: 'Triggers hide in plain sight.', tool: 'Trigger Journal', body: 'Record what happened and how it felt, so patterns become easier to see.' },
  { title: 'Hard moments don’t wait.', tool: 'Safe Mode', body: 'Coping activities and grounding exercises, one tap away.' },
  { title: 'A setback isn’t the whole story.', tool: 'Recovery Dashboard', body: 'See your progress without scores, shame or competition.' },
  { title: 'Nobody has to grow alone.', tool: 'Support Circle and Professional Hub', body: 'Keep trusted people and reliable support close.' },
];

const Heading = () => <h2 id="story-title" className="text-[clamp(1.9rem,3.6vw,3rem)]">Recovery takes many tools. Berkano proposes one calm home for them.</h2>;

function Beat({ b, i }: { b: (typeof BEATS)[number]; i: number }) {
  return (
    <div>
      <p className="font-semibold text-accent">{i + 1} of 4</p>
      <h3 className="mt-1 text-[clamp(2rem,4.4vw,3.6rem)]">{b.title}</h3>
      <p className="mt-3 text-[1.15rem]"><strong>{b.tool}.</strong> <span className="text-ink-2">{b.body}</span></p>
    </div>
  );
}

export function Story() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const p = useSectionProgress(ref, !reduced);
  const active = Math.min(3, Math.floor(p * 4));

  if (reduced) {
    return (
      <section id="why" className="bg-sec" aria-labelledby="story-title">
        <div className="wrap sec grid items-center gap-10 lg:grid-cols-2">
          <div className="grid gap-8">
            <Heading />
            {BEATS.map((b, i) => <Beat key={b.title} b={b} i={i} />)}
          </div>
          <div className="mx-auto w-full max-w-[520px]"><GrowingBirch p={1} /></div>
        </div>
      </section>
    );
  }

  const jump = (i: number) => {
    if (!ref.current) return;
    const top = ref.current.offsetTop;
    const span = ref.current.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + span * ((i + 0.5) / 4) });
  };

  return (
    <section id="why" ref={ref} className="relative h-[340vh] bg-sec" aria-labelledby="story-title">
      <div className="sticky top-[72px] flex h-[calc(100vh-72px)] items-stretch overflow-hidden">
        <div className="wrap grid h-full grid-rows-[auto_1fr_auto] gap-2 py-5 lg:grid-cols-2 lg:grid-rows-1 lg:items-center lg:gap-12 lg:py-8">
          <div className="min-h-0 lg:order-2 lg:h-full">
            <div className="mx-auto h-[36vh] max-w-[520px] lg:h-full"><GrowingBirch p={Math.min(1, p * 1.05)} /></div>
          </div>
          <div className="relative flex min-h-0 flex-col justify-center lg:order-1 lg:h-full">
            <div className="max-lg:sr-only"><Heading /></div>
            <div className="relative mt-4 min-h-[250px] lg:mt-10">
              {BEATS.map((b, i) => (
                <div key={b.title} className="story-beat absolute inset-x-0 top-0" style={{ opacity: i === active ? 1 : 0, transform: `translateY(${i === active ? 0 : i < active ? -18 : 18}px)`, pointerEvents: i === active ? 'auto' : 'none' }}>
                  <Beat b={b} i={i} />
                </div>
              ))}
            </div>
            
            <nav aria-label="Story steps" className="mt-2 flex gap-0 lg:absolute lg:bottom-4 lg:left-[-10px]">
              {BEATS.map((b, i) => (
                <button key={b.title} type="button" className="story-dot" aria-label={`Step ${i + 1}: ${b.title}`} aria-current={i === active ? 'step' : undefined} onClick={() => jump(i)}><i /></button>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
}
