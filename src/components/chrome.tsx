import { useEffect, useRef, useState } from 'react';
import { Check, Copy, Mail, Menu, X } from 'lucide-react';
import { CONTACT_EMAIL, MAILTO, SOCIAL_LINKS } from '../data/site';
import { Link, useRouter } from '../lib/router';
import { FullLogo, Symbol, ThemeToggle } from './brand';

const LINKS = [
  { to: '/#features', label: 'Features' },
  { to: '/#demo', label: 'Try the demo' },
  { to: '/#numbers', label: 'Numbers' },
  { to: '/#team', label: 'Team' },
  { to: '/resources', label: 'Resources' },
];

/** The logo sits inside a ring that grows as you scroll the page. */
function ScrollRing() {
  const ref = useRef<SVGCircleElement>(null);
  useEffect(() => {
    let raf = 0;
    const paint = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      ref.current?.setAttribute('stroke-dashoffset', String(1 - (max > 0 ? Math.min(1, window.scrollY / max) : 0)));
    };
    const queue = () => { if (!raf) raf = requestAnimationFrame(paint); };
    paint();
    window.addEventListener('scroll', queue, { passive: true });
    return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', queue); };
  }, []);
  return (
    <svg viewBox="0 0 54 54" className="pointer-events-none absolute -inset-1" aria-hidden="true">
      <circle ref={ref} cx="27" cy="27" r="25.5" fill="none" stroke="var(--ring-active)" strokeWidth="2" pathLength={1} strokeDasharray="1" strokeDashoffset="1" strokeLinecap="round" transform="rotate(-90 27 27)" />
    </svg>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const { page } = useRouter();
  useEffect(() => setOpen(false), [page]);
  return (
    <header className="sticky z-40 border-b border-line bg-paper/95 backdrop-blur" style={{ top: 'env(safe-area-inset-top, 0px)' }}>
      <div className="wrap flex h-[72px] items-center justify-between gap-3">
        <Link to="/" className="flex min-w-0 items-center gap-2 sm:gap-3" aria-label="Berkano home">
          <span className="relative inline-grid"><Symbol size={46} /><ScrollRing /></span>
          <span className="font-display text-[1.05rem] tracking-[0.06em] sm:text-xl sm:tracking-[0.08em]">BERKANO</span>
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {LINKS.map((l) => (
            <Link key={l.to} to={l.to} aria-current={l.to === '/resources' && page === 'resources' ? 'page' : undefined} className="navlink">{l.label}</Link>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <ThemeToggle />
          <Link to="/#join" className="btn btn-solid hidden !min-h-11 !py-2 lg:inline-flex">Join the interest list</Link>
          <button
            type="button"
            className="inline-grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-line lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="wrap flex flex-col gap-1 border-t border-line pt-3 pb-5 lg:hidden">
          {LINKS.map((l) => <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="py-2.5 font-display text-2xl">{l.label}</Link>)}
          <Link to="/#join" onClick={() => setOpen(false)} className="btn btn-solid mt-3">Join the interest list</Link>
        </nav>
      )}
    </header>
  );
}

export function CopyEmail({ className = '' }: { className?: string }) {
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle');
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setState('copied');
    } catch {
      setState('failed');
    }
    window.setTimeout(() => setState('idle'), 3000);
  };
  return (
    <button type="button" onClick={copy} className={`btn btn-line ${className}`}>
      {state === 'copied' ? <Check size={18} /> : <Copy size={18} />}
      <span aria-live="polite">{state === 'copied' ? 'Copied' : state === 'failed' ? 'Select the address to copy' : 'Copy address'}</span>
    </button>
  );
}

export function Footer() {
  return (
    <footer className="bg-paper-2">
      <div className="wrap grid gap-10 py-14 md:grid-cols-[auto_1fr_auto]">
        <FullLogo className="h-44 w-fit self-start" />
        <div className="prose-w min-w-0">
          <p className="font-display text-[1.7rem] leading-tight">A proposed recovery self-management app, in development as a university team project.</p>
          <p className="mt-3 text-[1rem] text-ink-2">
            Non-clinical. Does not diagnose, treat, replace professional care or guarantee recovery. Not an emergency service. Need help now? See the{' '}
            <Link to="/resources" className="tlink">support resources</Link>.
          </p>
        </div>
        <div className="flex flex-col items-start gap-2.5">
          <a href={MAILTO.general} className="tlink inline-flex items-center gap-2 font-semibold"><Mail size={17} />{CONTACT_EMAIL}</a>
          <Link to="/resources" className="tlink">Resources</Link>
          <Link to="/privacy" className="tlink">Privacy notice</Link>
          {SOCIAL_LINKS.map((s) => <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" className="tlink">{s.label}</a>)}
        </div>
      </div>
      <p className="wrap pb-8 text-[0.95rem] text-ink-2">© 2026 The Berkano team. Developed for the IIT Agile Team Project.</p>
    </footer>
  );
}
