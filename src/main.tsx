import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Footer, Header } from './components/chrome';
import { RouterProvider, useRouter } from './lib/router';
import { Home } from './pages/Home';
import { NotFound, Privacy } from './pages/Privacy';
import { Resources } from './pages/Resources';
import './styles/index.css';

function Current() {
  const { page } = useRouter();
  if (page === 'resources') return <Resources />;
  if (page === 'privacy') return <Privacy />;
  if (page === 'notfound') return <NotFound />;
  return <Home />;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider>
      <a href="#main" className="skip" onClick={(e) => { e.preventDefault(); document.getElementById('main')?.focus(); }}>Skip to main content</a>
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <Current />
      </main>
      <Footer />
    </RouterProvider>
  </StrictMode>,
);
