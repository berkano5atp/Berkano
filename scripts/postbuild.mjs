// Gives every route its own HTML file, so titles work for crawlers and no server rewrite is needed.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
const env = readFileSync('.env.production', 'utf8');
const site = (env.match(/VITE_SITE_URL=(.*)/)?.[1] ?? '').trim().replace(/\/$/, '');
if (site.includes('example.com')) console.warn('\n  WARNING: set VITE_SITE_URL in .env.production to your real domain before deploying.\n');
const html = readFileSync('dist/index.html', 'utf8');
const pages = [
  ['resources', 'Support resources | Berkano', 'Sri Lankan and international organisations for eating-disorder support, substance-use recovery and emotional support. Links checked by the Berkano team.'],
  ['privacy', 'Privacy notice | Berkano', 'What the Berkano website does and does not collect, and how the interactive app demonstration handles what you type.'],
];
const swap = (src, slug, title, desc) => src
  .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
  .replace(/(<meta name="description" content=")[^"]*/, `$1${desc}`)
  .replace(/(<meta property="og:title" content=")[^"]*/, `$1${title}`)
  .replace(/(<meta property="og:description" content=")[^"]*/, `$1${desc}`)
  .replace(/(<link rel="canonical" href=")[^"]*/, `$1${site}/${slug}/`)
  .replace(/(<meta property="og:url" content=")[^"]*/, `$1${site}/${slug}/`);
for (const [slug, title, desc] of pages) {
  mkdirSync(`dist/${slug}`, { recursive: true });
  writeFileSync(`dist/${slug}/index.html`, swap(html, slug, title, desc));
}
writeFileSync('dist/404.html', swap(html, '', 'Page not found | Berkano', 'This page could not be found on the Berkano website.').replace(/<link rel="canonical"[^>]*>/, '<meta name="robots" content="noindex" />'));
writeFileSync('dist/robots.txt', `User-agent: *\nAllow: /\nSitemap: ${site}/sitemap.xml\n`);
writeFileSync('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${['', 'resources/', 'privacy/'].map((p) => `  <url><loc>${site}/${p}</loc></url>`).join('\n')}\n</urlset>\n`);
console.log('Post-build complete: route pages, 404, robots.txt and sitemap.xml written.');
