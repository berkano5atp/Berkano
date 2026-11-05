import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode, type RefObject } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

export function useReducedMotion() {
  const [reduced, setReduced] = useState(() => window.matchMedia(QUERY).matches);
  useEffect(() => {
    const media = window.matchMedia(QUERY);
    const sync = () => setReduced(media.matches);
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);
  return reduced;
}

/** Becomes true once, the first time the element comes into view. */
export function useInView<T extends Element>(rootMargin = '0px 0px -12% 0px'): [RefObject<T>, boolean] {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (!ref.current || !('IntersectionObserver' in window)) return setSeen(true);
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setSeen(true); io.disconnect(); }
    }, { rootMargin });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [rootMargin]);
  return [ref, seen];
}

/** Scroll progress of a tall section, from 0 at its top to 1 when its bottom meets the viewport. */
export function useSectionProgress(ref: RefObject<HTMLElement>, enabled = true) {
  const [p, setP] = useState(0);
  useEffect(() => {
    if (!enabled) return;
    let raf = 0;
    const read = () => {
      raf = 0;
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const span = r.height - window.innerHeight;
      setP(span <= 0 ? 1 : Math.round(Math.min(1, Math.max(0, -r.top / span)) * 400) / 400);
    };
    const queue = () => { if (!raf) raf = requestAnimationFrame(read); };
    read();
    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', queue);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', queue);
      window.removeEventListener('resize', queue);
    };
  }, [ref, enabled]);
  return p;
}

export function Reveal({ as, children, delay = 0, className = '', style }: { as?: ElementType; children: ReactNode; delay?: number; className?: string; style?: CSSProperties }) {
  const [ref, seen] = useInView<HTMLElement>();
  const Tag = (as ?? 'div') as ElementType;
  return (
    <Tag ref={ref} className={`reveal ${seen ? 'in' : ''} ${className}`} style={{ ...style, transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  );
}

const easeOut = (t: number) => 1 - Math.pow(1 - t, 4);

/**
 * Counts from zero to `value` when it enters view, and always lands on the exact value.
 * Screen readers and reduced-motion visitors get the final figure immediately.
 */
export function CountUp({ value, decimals = 0, duration = 1800, className = '' }: { value: number; decimals?: number; duration?: number; className?: string }) {
  const reduced = useReducedMotion();
  const [ref, seen] = useInView<HTMLSpanElement>('0px 0px -8% 0px');
  const [shown, setShown] = useState(0);
  const fmt = (n: number) => n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  useEffect(() => {
    if (!seen || reduced) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setShown(t === 1 ? value : value * easeOut(t));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, reduced, value, duration]);
  return (
    <span ref={ref} className={`tabular-nums ${className}`} data-final={fmt(value)}>
      <span className="sr-only">{fmt(value)}</span>
      <span aria-hidden="true" data-count>{fmt(reduced ? value : shown)}</span>
    </span>
  );
}
