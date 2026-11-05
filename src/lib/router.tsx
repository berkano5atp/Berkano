import { createContext, useContext, useEffect, useState, type AnchorHTMLAttributes, type ReactNode } from 'react';

/**
 * A small router with two modes.
 * Production uses real paths (/resources), matching the HTML files written by scripts/postbuild.mjs.
 * The Claude Artifact build uses plain hashes (#resources) because artifacts cannot change their path.
 */
const HASH_MODE = import.meta.env.VITE_ROUTER === 'hash';
export type Page = 'home' | 'resources' | 'privacy' | 'notfound';

const PAGE_TITLES: Record<Page, string> = {
  home: 'Berkano | A proposed app for recovery self-management',
  resources: 'Support resources | Berkano',
  privacy: 'Privacy notice | Berkano',
  notfound: 'Page not found | Berkano',
};
const PAGES = ['resources', 'privacy'];

function parse(): { page: Page; section: string | null } {
  const hash = window.location.hash.replace(/^#/, '');
  if (HASH_MODE) {
    if (PAGES.includes(hash)) return { page: hash as Page, section: null };
    return { page: 'home', section: hash || null };
  }
  const path = window.location.pathname.replace(/\/+$/, '');
  if (path === '') return { page: 'home', section: hash || null };
  const slug = path.slice(1);
  return { page: PAGES.includes(slug) ? (slug as Page) : 'notfound', section: hash || null };
}

/** `to` is written as a production URL: "/", "/resources" or "/#demo". */
export function hrefFor(to: string): string {
  if (!HASH_MODE) return to;
  const [path, hash] = to.split('#');
  if (hash) return `#${hash}`;
  return path === '/' ? '#top' : `#${path.slice(1)}`;
}

const scrollToSection = (id: string | null) => {
  if (!id || id === 'top') return window.scrollTo({ top: 0 });
  document.getElementById(id)?.scrollIntoView();
};

const Ctx = createContext<{ page: Page; go: (to: string) => void }>({ page: 'home', go: () => {} });
export const useRouter = () => useContext(Ctx);

export function RouterProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState(parse);

  useEffect(() => {
    const sync = () => setRoute(parse());
    window.addEventListener(HASH_MODE ? 'hashchange' : 'popstate', sync);
    return () => window.removeEventListener(HASH_MODE ? 'hashchange' : 'popstate', sync);
  }, []);

  useEffect(() => {
    document.title = PAGE_TITLES[route.page];
    const raf = requestAnimationFrame(() => {
      scrollToSection(route.section);
      if (!route.section) document.getElementById('main')?.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(raf);
    // A new object is set on every navigation, so repeated clicks on one section still scroll.
  }, [route]);

  const go = (to: string) => {
    const href = hrefFor(to);
    if (HASH_MODE) {
      if (window.location.hash === href) setRoute(parse());
      else window.location.hash = href;
    } else {
      window.history.pushState(null, '', href);
      setRoute(parse());
    }
  };

  return <Ctx.Provider value={{ page: route.page, go }}>{children}</Ctx.Provider>;
}

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { to: string };
export function Link({ to, onClick, ...rest }: LinkProps) {
  const { go } = useRouter();
  return (
    <a
      {...rest}
      href={hrefFor(to)}
      onClick={(e) => {
        onClick?.(e);
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        go(to);
      }}
    />
  );
}
