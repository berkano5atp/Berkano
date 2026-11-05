import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import {
  Bell, BookOpen, Check, ChevronLeft, ChevronRight, HeartHandshake, Heart, Home, Play, PhoneCall, Settings, ShieldCheck,
  ShoppingBag, Target, Type, User, Users, Wind, XCircle,
} from 'lucide-react';
import symbol from '../assets/brand/berkano-symbol.png';
import { Link } from '../lib/router';
import { useDemoState, type DemoState } from './useDemoState';
import { MOODS, PERIODS, SAMPLE_ENTRIES, type DemoScreen, type Period } from './types';

const Logo = () => (
  <span className="bk-logo">
    <img src={symbol} alt="Berkano" />
  </span>
);

function TopBar({ onBack, s, left }: { onBack?: () => void; s: DemoState; left?: boolean }) {
  const gear = (
    <button type="button" className="bk-iconbtn" aria-label="Settings, opens Me" onClick={() => s.setScreen('me')}>
      <Settings size={24} />
    </button>
  );
  if (left) return <div className="bk-top left"><Logo />{gear}</div>;
  return (
    <div className="bk-top">
      <button type="button" className="bk-back" onClick={onBack}><ChevronLeft size={18} />Back</button>
      <Logo />
      {gear}
    </div>
  );
}

function Nav({ s }: { s: DemoState }) {
  const items: { id: DemoScreen; label: string; Icon: typeof Home }[] = [
    { id: 'home', label: 'Home', Icon: Home },
    { id: 'journal', label: 'Journal', Icon: BookOpen },
    { id: 'support', label: 'Support', Icon: Users },
    { id: 'me', label: 'Me', Icon: User },
  ];
  const active = s.screen === 'safe' ? 'home' : s.screen === 'insights' ? 'journal' : s.screen;
  return (
    <nav className="bk-nav" aria-label="App demo navigation">
      {items.map(({ id, label, Icon }) => (
        <button key={id} type="button" aria-current={active === id ? 'page' : undefined} onClick={() => s.setScreen(id)}>
          <Icon size={21} />
          {label}
        </button>
      ))}
    </nav>
  );
}

function HomeScreen({ s }: { s: DemoState }) {
  return (
    <>
      <TopBar s={s} left />
      <h2 className="bk-greet">Good morning, {s.displayName || 'Jay'}!</h2>
      <section className="bk-card" aria-label="Current goal, sample data">
        <div className="bk-goalhead">
          <span className="bk-label">CURRENT GOAL</span>
          <span className="bk-pct"><Target size={14} style={{ color: 'var(--a-icon)' }} />75% Complete</span>
        </div>
        <div className="bk-goal"><strong>5 Days</strong><span>Clean and sober</span></div>
        <div className="bk-stats">
          <div className="bk-stat">Total Clean Hours<b>120 hrs</b></div>
          <div className="bk-stat">Slips this week<b>0</b></div>
        </div>
      </section>
      <button type="button" className="bk-safe" onClick={() => s.setScreen('safe')}>SAFE MODE</button>
      <section className="bk-card bk-activity">
        <h3>Recent Activity</h3>
        {[['Morning Meditation', 'Completed 10 mins ago'], ['Support Group Call', 'Completed 2 hours ago']].map(([a, b]) => (
          <div className="bk-act" key={a}>
            <i><Check size={15} strokeWidth={3} /></i>
            <span><b>{a}</b>{b}</span>
          </div>
        ))}
      </section>
    </>
  );
}

const GROUNDING = [
  'Notice 5 things you can see.',
  'Notice 4 things you can touch.',
  'Notice 3 things you can hear.',
  'Notice 2 things you can smell.',
  'Notice 1 thing you can taste.',
];

function SafeMode({ s }: { s: DemoState }) {
  const [next, setNext] = useState(1);
  const [panel, setPanel] = useState<'grounding' | 'friend' | 'therapist' | null>(null);
  const [step, setStep] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const close = useRef<HTMLButtonElement>(null);
  const finished = next > 9;

  useEffect(() => {
    close.current?.focus({ preventScroll: true });
  }, []);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') s.setScreen('home');
    if (e.key !== 'Tab' || !root.current) return;
    const items = root.current.querySelectorAll<HTMLElement>('button, a[href]');
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  };

  return (
    <div className="bk-modalwrap" ref={root} role="dialog" aria-modal="true" aria-label="Safe mode" onKeyDown={onKey}>
      <div className="bk-dimtop" aria-hidden="true"><Logo /><Settings size={24} /></div>
      <div className="bk-modal">
        <div className="bk-modalhead">
          <span className="bk-logo-s"><img src={symbol} alt="" /></span>
          <h3>Safe mode</h3>
          <button type="button" ref={close} className="bk-closebtn" aria-label="Close Safe mode" onClick={() => s.setScreen('home')}>
            <XCircle size={30} strokeWidth={2.4} />
          </button>
        </div>
        <section className="bk-game">
          <h4>MINI GAME</h4>
          <div className="bk-grid">
            {Array.from({ length: 9 }, (_, i) => i + 1).map((n) => (
              <button key={n} type="button" data-done={n < next} aria-label={`${n}${n < next ? ', done' : ''}`} onClick={() => n === next && setNext(next + 1)}>
                {n}
              </button>
            ))}
          </div>
          <p role="status">{finished ? 'All done. Play again whenever you like.' : next === 1 ? 'Tap the numbers in order, at your own pace.' : `Next: ${next}`}</p>
        </section>
        <p className="bk-qt">Quick Coping Tools:</p>
        <div className="bk-tools">
          <button type="button" aria-expanded={panel === 'grounding'} onClick={() => { setPanel(panel === 'grounding' ? null : 'grounding'); setStep(0); }}><Wind size={25} />Grounding exercises</button>
          <button type="button" onClick={() => { setNext(1); setPanel(null); }}><Play size={25} />Play again</button>
          <button type="button" aria-expanded={panel === 'friend'} onClick={() => setPanel(panel === 'friend' ? null : 'friend')}><Heart size={25} />Call a friend</button>
          <button type="button" aria-expanded={panel === 'therapist'} onClick={() => setPanel(panel === 'therapist' ? null : 'therapist')}><PhoneCall size={25} />Call my therapist</button>
        </div>
        <div aria-live="polite">
          {panel === 'grounding' && (
            <div className="bk-note">
              <b>{step < GROUNDING.length ? GROUNDING[step] : 'Well done. Take your time before moving on.'}</b>
              <div className="bk-opts">
                <button type="button" onClick={() => setStep(step < GROUNDING.length ? step + 1 : 0)}>{step < GROUNDING.length ? 'Next' : 'Start again'}</button>
              </div>
            </div>
          )}
          {(panel === 'friend' || panel === 'therapist') && (
            <div className="bk-note">
              Demo only, so no call is made. In the proposed app, this would call the {panel === 'friend' ? 'trusted contact' : 'professional'} you chose.
            </div>
          )}
        </div>
        <p className="bk-note">Safe Mode is not an emergency service. <Link className="ln" to="/resources">See support contacts</Link></p>
      </div>
    </div>
  );
}

function Journal({ s }: { s: DemoState }) {
  const d = s.draft;
  const set = (k: keyof typeof d) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => s.setDraft({ ...d, [k]: e.target.value });
  return (
    <>
      <TopBar s={s} onBack={() => s.setScreen('home')} />
      <h2 className="bk-h1">Trigger journal</h2>
      <div className="bk-tabs2">
        <button type="button" aria-pressed="true">Log trigger</button>
        <button type="button" aria-pressed="false" onClick={() => s.setScreen('insights')}>View insights</button>
      </div>
      <form onSubmit={(e) => { e.preventDefault(); s.save(); }} autoComplete="off">
        <fieldset>
          <legend className="bk-q">How are you feeling right now?</legend>
          <div className="bk-moods">
            {MOODS.map((m) => (
              <button key={m.label} type="button" aria-label={m.label} title={m.label} aria-pressed={d.mood === m.label} onClick={() => s.setDraft({ ...d, mood: d.mood === m.label ? '' : m.label })}>
                <span aria-hidden="true">{m.emoji}</span>
              </button>
            ))}
          </div>
        </fieldset>
        <label className="bk-q" htmlFor="bk-what">1. What happened right before you felt this way?</label>
        <input id="bk-what" className="bk-input" value={d.what} onChange={set('what')} placeholder="Describe what happened..." />
        <label className="bk-q" htmlFor="bk-feel">2. How are you feeling right now?</label>
        <input id="bk-feel" className="bk-input" value={d.feeling} onChange={set('feeling')} placeholder="Name the feelings you notice..." />
        <label className="bk-q" htmlFor="bk-need">3. What do you need to feel safe?</label>
        <input id="bk-need" className="bk-input" value={d.need} onChange={set('need')} placeholder="What would help right now?" />
        <label className="bk-q" htmlFor="bk-notes">Notes:</label>
        <textarea id="bk-notes" className="bk-input" rows={2} value={d.notes} onChange={set('notes')} placeholder="Anything else you want to remember about this moment..." />
        <button type="submit" className="bk-save">Save Entry</button>
      </form>
      <div aria-live="polite">
        {s.saveError && <p className="bk-ok">{s.saveError}</p>}
        {s.justSaved && (
          <p className="bk-ok">
            Entry saved for this visit only. It disappears when you leave the page.{' '}
            <button type="button" className="tlink" onClick={() => s.setScreen('insights')}>View insights</button>
          </p>
        )}
      </div>
    </>
  );
}

function Insights({ s }: { s: DemoState }) {
  const p = PERIODS[s.period];
  const added = s.entries.length;
  const rows = useMemo(() => {
    const map = new Map(p.counts.map((c) => [c.name, c.n]));
    s.entries.forEach((e) => map.set(e.mood, (map.get(e.mood) ?? 0) + 1));
    return [...map.entries()].map(([name, n]) => ({ name, n })).sort((a, b) => b.n - a.n);
  }, [p, s.entries]);
  const max = Math.max(...rows.map((r) => r.n));
  const total = rows.reduce((t, r) => t + r.n, 0);

  if (s.sub === 'entries') {
    return (
      <>
        <TopBar s={s} onBack={() => s.setSub(null)} />
        <h2 className="bk-title">Journal entries</h2>
        <p className="bk-sub">Fictional examples, plus anything you saved on this visit.</p>
        {[...s.entries, ...SAMPLE_ENTRIES].map((e) => (
          <article key={e.id} className="bk-reflect">
            <h3>{e.mood}{e.sample ? ' (example)' : ' (this visit)'}</h3>
            {e.what && <p>{e.what}</p>}
            {e.need && <p style={{ color: 'var(--a-muted)', marginTop: 4 }}>Needed: {e.need}</p>}
          </article>
        ))}
      </>
    );
  }

  return (
    <>
      <TopBar s={s} onBack={() => s.setScreen('journal')} />
      <h2 className="bk-title">Insights</h2>
      <p className="bk-sub">A little space to notice your patterns.</p>
      <div className="bk-seg">
        {(Object.keys(PERIODS) as Period[]).map((k) => (
          <button key={k} type="button" aria-pressed={s.period === k} onClick={() => s.setPeriod(k)}>{PERIODS[k].tab}</button>
        ))}
      </div>
      <div className="bk-example">
        <div>
          <b>{p.title}</b>
          <small>{added ? `Illustration, plus ${added} from this visit.` : 'Illustration only, not your journal data.'}</small>
        </div>
        <strong>{total}<small>entries</small></strong>
      </div>
      <section className="bk-panel">
        <h3>Feelings you noted</h3>
        <p>Example: one feeling per entry.</p>
        {rows.map((r) => (
          <div className="bk-bar" key={r.name}>
            <span>{r.name}</span>
            <span><i style={{ width: `${(r.n / max) * 86}%` }} /></span>
            <b>{r.n}</b>
          </div>
        ))}
      </section>
      <section className="bk-reflect">
        <h3><BookOpen size={18} />Something to reflect on</h3>
        <p>When anxious feelings show up, what helps you feel safe? Revisit an entry and notice what you needed.</p>
      </section>
      <button type="button" className="bk-wide" onClick={() => s.setSub('entries')}>Review journal entries</button>
      <p className="bk-foot">A reflection tool, not a diagnosis or a measure of progress.</p>
    </>
  );
}

function Sub({ title, s, children }: { title: string; s: DemoState; children: ReactNode }) {
  return (
    <>
      <TopBar s={s} onBack={() => s.setSub(null)} />
      <h2 className="bk-title">{title}</h2>
      {children}
    </>
  );
}

const HUB: Record<string, string> = {
  'Find a Therapist': 'The proposed app would help you discover professional support. This demo has no real listings.',
  'Recovery Coaches': 'The proposed app would explain recovery-support services and how to find them. This demo has no real listings.',
};

function Support({ s }: { s: DemoState }) {
  if (s.sub && HUB[s.sub]) {
    return (
      <Sub title={s.sub} s={s}>
        <p className="bk-reflect">{HUB[s.sub]}</p>
        <p className="bk-note">Looking for real support? <Link className="ln" to="/resources">Open the Resources page</Link></p>
      </Sub>
    );
  }
  if (s.sub === 'Hotlines & Resources') {
    return (
      <Sub title="Hotlines & Resources" s={s}>
        <p className="bk-reflect">The website's Resources page lists organisations and helplines that the team has checked.</p>
        <p className="bk-note"><Link className="ln" to="/resources">Open the Resources page</Link></p>
      </Sub>
    );
  }
  return (
    <>
      <div className="bk-top" style={{ gridTemplateColumns: '1fr auto' }}>
        <button type="button" className="bk-roundback" aria-label="Back to Home" onClick={() => s.setScreen('home')}><ChevronLeft size={20} /></button>
        <button type="button" className="bk-iconbtn" aria-label="Settings, opens Me" onClick={() => s.setScreen('me')}><Settings size={24} /></button>
      </div>
      <div style={{ display: 'grid', placeItems: 'center', marginBottom: 12 }}><Logo /></div>
      <h2 className="bk-title">Support &amp; help</h2>
      <section className="bk-panel" style={{ marginTop: 14 }}>
        <h3 style={{ fontSize: 'calc(20px * var(--s))' }}>Professional hub</h3>
        <p>Explore professional support for your recovery.</p>
        {Object.keys(HUB).concat('Hotlines & Resources').map((t) => (
          <button key={t} type="button" className="bk-row bk-hub-row" onClick={() => s.setSub(t)}>
            <ShoppingBag size={30} strokeWidth={1.8} />{t}
          </button>
        ))}
      </section>
    </>
  );
}

function Row({ icon, title, sub, onClick }: { icon: ReactNode; title: string; sub: string; onClick: () => void }) {
  return (
    <button type="button" className="bk-row bk-me-row" onClick={onClick}>
      {icon}
      <span><b>{title}</b><small>{sub}</small></span>
      <ChevronRight size={18} className="chev" />
    </button>
  );
}

function Me({ s }: { s: DemoState }) {
  const [cleared, setCleared] = useState(false);
  switch (s.sub) {
    case 'profile':
      return (
        <Sub title="Your profile" s={s}>
          <label className="bk-q" htmlFor="bk-name">Display name (fictional)</label>
          <input id="bk-name" className="bk-input" value={s.displayName} maxLength={16} onChange={(e) => s.setDisplayName(e.target.value)} />
          <p className="bk-note">The Home greeting updates for this visit only.</p>
        </Sub>
      );
    case 'goals':
      return (
        <Sub title="My goals" s={s}>
          <div className="bk-reflect"><h3>Example goal</h3><p>Check in with myself every morning.</p></div>
          <div className="bk-reflect"><h3>Example goal</h3><p>Reach out to someone I trust when a day feels heavy.</p></div>
          <p className="bk-note">In the proposed app, you would set or adjust goals that matter to you.</p>
        </Sub>
      );
    case 'contacts':
      return (
        <Sub title="Support contacts" s={s}>
          <div className="bk-reflect"><h3>Sam (fictional)</h3><p>Friend</p></div>
          <div className="bk-reflect"><h3>Dr. Example (fictional)</h3><p>Therapist</p></div>
          <p className="bk-note">In the proposed app, you decide who is in your support circle. No calls or messages are made from this demo.</p>
        </Sub>
      );
    case 'reminders':
      return (
        <Sub title="Reminders" s={s}>
          <div className="bk-reflect bk-toggle">
            <span id="bk-rem">Daily check-in at 9:00 am</span>
            <button type="button" role="switch" className="bk-switch" aria-labelledby="bk-rem" aria-checked={s.reminders} onClick={() => s.setReminders(!s.reminders)}><i /></button>
          </div>
          <p className="bk-note">Demo only, so no notifications are sent.</p>
        </Sub>
      );
    case 'display':
      return (
        <Sub title="Display & accessibility" s={s}>
          <p className="bk-q">Text size</p>
          <div className="bk-opts">
            {[['Regular', 1], ['Large', 1.1], ['Larger', 1.2]].map(([l, v]) => (
              <button key={l} type="button" aria-pressed={s.textScale === v} onClick={() => s.setTextScale(v as number)}>{l}</button>
            ))}
          </div>
          <p className="bk-note">This changes the text size inside the demo. Dark mode follows the website's theme.</p>
        </Sub>
      );
    case 'privacy':
      return (
        <Sub title="Privacy & journal data" s={s}>
          <p className="bk-reflect">This demo stores nothing. Entries you save stay in memory and disappear when you leave the page.</p>
          <div className="bk-opts">
            <button type="button" onClick={() => { s.setEntries([]); setCleared(true); }}>Delete demo entries</button>
          </div>
          <div aria-live="polite">{cleared && <p className="bk-note">Demo entries deleted.</p>}</div>
        </Sub>
      );
  }
  return (
    <>
      <TopBar s={s} onBack={() => s.setScreen('home')} />
      <h2 className="bk-title">Me</h2>
      <p className="bk-sub">Your recovery, at your own pace.</p>
      <button type="button" className="bk-profile" onClick={() => s.setSub('profile')}>
        <span className="bk-avatar"><User size={22} /></span>
        <span><b>Your profile</b><small>Choose a name and avatar</small></span>
        <ChevronRight size={18} style={{ marginLeft: 'auto', flex: 'none' }} />
      </button>
      <section className="bk-group">
        <h3>My recovery</h3>
        <Row icon={<Target size={22} />} title="My goals" sub="Set or adjust what matters to you" onClick={() => s.setSub('goals')} />
        <Row icon={<Users size={22} />} title="Support contacts" sub="Add or edit people you trust" onClick={() => s.setSub('contacts')} />
      </section>
      <section className="bk-group">
        <h3>Make it yours</h3>
        <Row icon={<Bell size={22} />} title="Reminders" sub="Choose when to check in" onClick={() => s.setSub('reminders')} />
        <Row icon={<Type size={22} />} title="Display & accessibility" sub="Text size and reading preferences" onClick={() => s.setSub('display')} />
        <Row icon={<ShieldCheck size={22} />} title="Privacy & journal data" sub="App lock, export or delete entries" onClick={() => s.setSub('privacy')} />
      </section>
      <p className="bk-pact"><HeartHandshake size={22} style={{ flex: 'none' }} />You decide what to share, and who to include in your support circle.</p>
    </>
  );
}

export function BerkanoApp({ state }: { state: DemoState }) {
  const s = state;
  const scroller = useRef<HTMLDivElement>(null);
  useEffect(() => {
    scroller.current?.scrollTo({ top: 0 });
  }, [s.screen, s.sub]);

  // Return keyboard focus to the Safe Mode button when the dialog closes.
  const root = useRef<HTMLDivElement>(null);
  const wasSafe = useRef(false);
  useEffect(() => {
    if (wasSafe.current && s.screen === 'home') root.current?.querySelector<HTMLElement>('.bk-safe')?.focus({ preventScroll: true });
    wasSafe.current = s.screen === 'safe';
  }, [s.screen]);

  const base = s.screen === 'safe' ? 'home' : s.screen;
  return (
    <div ref={root} className="bk" style={{ '--s': s.textScale } as React.CSSProperties}>
      <div className="bk-scroll" ref={scroller} tabIndex={-1} {...(s.screen === 'safe' ? { inert: '' } : {})}>
        {base === 'home' && <HomeScreen s={s} />}
        {base === 'journal' && <Journal s={s} />}
        {base === 'insights' && <Insights s={s} />}
        {base === 'support' && <Support s={s} />}
        {base === 'me' && <Me s={s} />}
      </div>
      <div {...(s.screen === 'safe' ? { inert: '' } : {})}><Nav s={s} /></div>
      {s.screen === 'safe' && <SafeMode s={s} />}
    </div>
  );
}

/** A small, non-interactive copy of one screen, used as the picker thumbnail and screen mockup. */
export function AppThumbnail({ screen }: { screen: DemoScreen }) {
  const s = useDemoState(screen);
  return (
    <div aria-hidden="true" {...{ inert: '' }} style={{ pointerEvents: 'none' }}>
      <BerkanoApp state={s} />
    </div>
  );
}
