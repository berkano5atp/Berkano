// Turns the single-file build into page content for a Claude Artifact, which supplies its own document shell.
import { readFileSync, writeFileSync } from 'node:fs';
let h = readFileSync('dist-artifact/index.html', 'utf8');
const inner = (tag) => h.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*)</${tag}>`))[1];
let head = inner('head'), body = inner('body');
head = head.replace(/<meta charset[^>]*>|<meta name="viewport"[^>]*>|<link rel="(icon|apple-touch-icon|canonical)"[^>]*>|<meta property="og:[^>]*>|<meta name="twitter:[^>]*>|<meta name="theme-color"[^>]*>/g, '');
// Module scripts must run after #root exists.
const scripts = [...head.matchAll(/<script type="module"[\s\S]*?<\/script>/g)].map((m) => m[0]);
scripts.forEach((s) => { head = head.replace(s, () => ''); });
body = body.replace(/<script type="module" src[^>]*><\/script>/, '');
writeFileSync('dist-artifact/berkano.html', head.trim() + '\n' + body.trim() + '\n' + scripts.join('\n'));
console.log('dist-artifact/berkano.html', (readFileSync('dist-artifact/berkano.html').length / 1e6).toFixed(2), 'MB');
