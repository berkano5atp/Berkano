import { useEffect, useState } from 'react';
import { Check, Copy, Mail, Menu, X } from 'lucide-react';
import { CONTACT_EMAIL, MAILTO, SOCIAL_LINKS } from '../data/site';
import { Link, useRouter } from '../lib/router';
import { FullLogo, Symbol, ThemeToggle } from './brand';

const LINKS = [
  { to: '/#features', label: 'Features' },
  { to: '/#demo', label: 'Try the demo' },
  { to: '/#team', label: 'Team' },
  { to: '/resources', label: 'Resources' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const { page } = useRouter();
  useEffect(() => setOpen(false), [page]);
  return (
    <header className="sticky z-40 border-b border-line bg-paper/95 backdrop-blur" style={{ top: 'env(safe-area-inset-top, 0px)' }}>
      <div className="wrap flex h-[72px] items-center justify-between gap-3">
        <Link to="/" className="flex items-center gap-3" aria-label="Berkano home">
          <Symbol size={46} />
          <span className="font-display text-xl tracking-[0.08em]">BERKANO</span>
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {LINKS.map((l) => (
            <Link key={l.to} to={l.to} aria-current={l.to === '/resources' && page === 'resources' ? 'page' : undefined} className="font-medium underline-offset-4 hover:underline aria-[current=page]:underline">{l.label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
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
      <span aria-live="polite">{state === 'copied' ? 'Email address copied' : state === 'failed' ? 'Copy failed: select the address' : 'Copy email address'}</span>
    </button>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="wrap grid gap-10 py-14 md:grid-cols-[auto_1fr_auto]">
        <FullLogo className="h-44 self-start" />
        <div className="prose-w min-w-0">
          <p className="font-display text-2xl leading-tight">A proposed recovery self-management app, in development as a university team project.</p>
          <p className="mt-4 text-[0.95rem] text-ink-2">
            Berkano is non-clinical. It does not diagnose conditions, provide medical treatment, replace professional care or guarantee recovery outcomes. It is not an emergency service. If you need help now, please see the{' '}
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
      <p className="wrap pb-8 text-sm text-ink-2">© 2026 The Berkano team. Developed for the IIT Agile Team Project.</p>
    </footer>
  );
}
