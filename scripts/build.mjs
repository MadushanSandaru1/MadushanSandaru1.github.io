import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
const root = fileURLToPath(new URL('../', import.meta.url));
const read = (path) => readFileSync(resolve(root, path), 'utf8');
const profile = JSON.parse(read('data/profile.json'));
const { site } = JSON.parse(read('data/site-config.json'));
const esc = (value) => String(value ?? '').replace(/[&<>"']/g, (c) => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[c]));
const image = new URL(profile.profileImage.src, site.canonicalUrl).href;
const meta = `<title>${esc(site.title)}</title>
    <meta name="description" content="${esc(site.description)}">
    <meta name="keywords" content="${esc(site.keywords.join(', '))}">
    <meta property="og:type" content="website">
    <meta property="og:title" content="${esc(site.title)}">
    <meta property="og:description" content="${esc(site.description)}">
    <meta property="og:image" content="${esc(image)}">
    <meta property="og:url" content="${esc(site.canonicalUrl)}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${esc(site.title)}">
    <meta name="twitter:description" content="${esc(site.description)}">
    <meta name="twitter:image" content="${esc(image)}">
    <link rel="canonical" href="${esc(site.canonicalUrl)}">
    <script data-person-schema type="application/ld+json">${JSON.stringify({'@context':'https://schema.org','@type':'Person',name:profile.name,jobTitle:profile.title,url:site.canonicalUrl,image}).replace(/</g,'\\u003c')}</script>`;
const hero = `<div class="container hero-grid"><div class="hero-copy"><h1>${esc(profile.name)}</h1><p class="hero-title">${esc(profile.title)}</p><p class="hero-tagline">${esc(profile.tagline)}</p><p class="hero-summary">${esc(profile.shortSummary)}</p><div class="hero-actions"><a class="button button-primary" href="${esc(profile.resume.downloadUrl)}" download>Download CV</a><a class="button button-secondary" href="mailto:${esc(profile.email)}">Email me</a></div><noscript><p>Enable JavaScript to explore projects, experience, and recommendations. My CV and email are available here.</p></noscript></div><div class="hero-visual"><div class="profile-frame"><img class="profile-image" src="${esc(profile.profileImage.src)}" alt="${esc(profile.profileImage.alt)}" loading="eager" fetchpriority="high" decoding="async"></div></div></div>`;
const contact = `<div class="container"><h2>Contact</h2><p>For engineering opportunities and collaboration, <a href="mailto:${esc(profile.email)}">${esc(profile.email)}</a>.</p></div>`;
// Embed a snapshot for file:// previews, where browsers cannot fetch local JSON.
const localData = Object.fromEntries(readdirSync(resolve(root, 'data')).filter((file) => file.endsWith('.json')).map((file) => ['data/' + file, JSON.parse(read('data/' + file))]));
const localSnapshot = `<script id="portfolio-local-data" type="application/json">${JSON.stringify(localData).replace(/</g, '\\u003c')}</script>`;
let html = read('index.html');
for (const [key, value] of Object.entries({META:meta,HERO:hero,CONTACT:contact,DATA:localSnapshot})) {
  html = html.replace(new RegExp(`<!-- STATIC_${key}_START -->[\\s\\S]*?<!-- STATIC_${key}_END -->`), `<!-- STATIC_${key}_START -->\n${value}\n<!-- STATIC_${key}_END -->`);
}
// main.scss intentionally uses only CSS-compatible syntax; no Sass dependency is needed.
const css = read('scss/main.scss').replace(/^\/\/[^\n]*\n/, '');
const outputs = {'index.html':html, 'css/main.css':css};
let stale = false;
for (const [file, value] of Object.entries(outputs)) {
  if (process.argv.includes('--check')) {
    if (read(file) !== value) { console.error(`${file} is stale; run node scripts/build.mjs`); stale = true; }
  } else writeFileSync(resolve(root, file), value);
}
if (stale) process.exitCode = 1;
else console.log(process.argv.includes('--check') ? 'Generated files are current.' : 'Built static content, metadata, and stylesheet.');
