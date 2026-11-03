#!/usr/bin/env node
/**
 * Runs after `vite build`. Gives every route its own HTML file with its own title, description,
 * canonical link, social tags, structured data and a plain-text copy of the page for crawlers
 * that do not run JavaScript. GitHub Pages serves /support from support.html and so on.
 *
 * Everything written here comes from content.json, content.tr.json and the table below.
 * Nothing is read from the network, and every value is escaped for the place it lands in.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const SITE = 'https://ibrahimatmaca.github.io';
const OG_IMAGE = `${SITE}/og-image.png`;

const en = JSON.parse(readFileSync(join(root, 'content.json'), 'utf8'));
const tr = JSON.parse(readFileSync(join(root, 'content.tr.json'), 'utf8'));
const template = readFileSync(join(dist, 'index.html'), 'utf8');

const escapeHtml = (value) =>
  String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// "<" is escaped so a string can never close the script tag it sits in.
const jsonLd = (data) =>
  `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;

const elevana = en.projects.list.find((project) => project.appStoreId);
const social = [
  'https://github.com/ibrahimatmaca',
  'https://www.linkedin.com/in/ibrahimatmaca',
  'https://www.instagram.com/com.ibrahimatmaca',
];

function structuredData(copy, lang, url) {
  const person = {
    '@type': 'Person',
    '@id': `${SITE}/#person`,
    name: copy.hero.title,
    url: `${SITE}/`,
    image: OG_IMAGE,
    jobTitle: 'Senior Mobile Engineer',
    description: copy.meta.description,
    sameAs: social,
    knowsAbout: ['iOS', 'SwiftUI', 'Swift', 'Android', 'Kotlin', 'Flutter', 'Fintech', 'Payment systems'],
    address: { '@type': 'PostalAddress', addressCountry: 'TR' },
  };
  const website = {
    '@type': 'WebSite',
    '@id': `${SITE}/#website`,
    name: copy.hero.title,
    url: `${SITE}/`,
    inLanguage: lang,
    publisher: { '@id': `${SITE}/#person` },
  };
  const page = {
    '@type': 'WebPage',
    '@id': `${url}#page`,
    url,
    name: copy.meta.title,
    description: copy.meta.description,
    inLanguage: lang,
    isPartOf: { '@id': `${SITE}/#website` },
    about: { '@id': `${SITE}/#person` },
  };
  const graph = [person, website, page];

  if (elevana) {
    const cache = elevana.appStoreCache;
    const localized = copy.projects.list.find((project) => project.id === elevana.id);
    graph.push({
      '@type': 'MobileApplication',
      '@id': `${SITE}/#elevana`,
      name: cache?.name ?? elevana.title,
      url: elevana.appStoreUrl,
      description: localized?.description ?? elevana.description,
      operatingSystem: 'iOS',
      applicationCategory: 'LifestyleApplication',
      author: { '@id': `${SITE}/#person` },
    });
  }
  return jsonLd({ '@context': 'https://schema.org', '@graph': graph });
}

/** Plain-text copy of the home page, for crawlers and readers that do not run JavaScript. */
function homeFallback(copy) {
  const projects = copy.projects.list
    .map((project) => {
      const name = project.appStoreCache?.name ?? project.title;
      const link = project.appStoreUrl ? `<a href="${escapeHtml(project.appStoreUrl)}">${escapeHtml(name)}</a>` : escapeHtml(name);
      return `<li>${link}: ${escapeHtml(project.description)}</li>`;
    })
    .join('');
  const services = copy.services.items
    .map((item) => `<li><strong>${escapeHtml(item.title)}</strong>: ${escapeHtml(item.text)}</li>`)
    .join('');
  const steps = copy.process.steps
    .map((step) => `<li><strong>${escapeHtml(step.title)}</strong>: ${escapeHtml(step.text)}</li>`)
    .join('');

  return `<main class="seo-fallback">
<h1>${escapeHtml(copy.hero.headline)}</h1>
<p>${escapeHtml(copy.hero.title)} · ${escapeHtml(copy.hero.subtitle)}</p>
<p>${escapeHtml(copy.hero.description)}</p>
<h2>${escapeHtml(copy.services.title)}</h2>
<p>${escapeHtml(copy.services.description)}</p>
<ul>${services}</ul>
<h2>${escapeHtml(copy.projects.title)}</h2>
<ul>${projects}</ul>
<h2>${escapeHtml(copy.process.title)}</h2>
<ol>${steps}</ol>
<h2>${escapeHtml(copy.about.title)}</h2>
${copy.about.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('\n')}
<h2>${escapeHtml(copy.contact.title)}</h2>
<p>${escapeHtml(copy.contact.description)}</p>
<p><a href="mailto:${escapeHtml(copy.contact.email)}">${escapeHtml(copy.contact.email)}</a></p>
<p>${social.map((url) => `<a href="${escapeHtml(url)}">${escapeHtml(url)}</a>`).join(' · ')}</p>
</main>`;
}

const fallbackNote = (label) =>
  `<main class="seo-fallback"><h1>${escapeHtml(label)}</h1><p><a href="/">${escapeHtml(en.hero.title)}</a></p></main>`;

const home = { copy: en, lang: 'en', locale: 'en_US', url: `${SITE}/` };
const homeTr = { copy: tr, lang: 'tr', locale: 'tr_TR', url: `${SITE}/tr` };

// Hidden text is the same text the page shows once JavaScript runs.
const pages = [
  { file: 'index.html', ...home, kind: 'home' },
  { file: 'tr.html', ...homeTr, kind: 'home' },
  {
    file: 'support.html',
    title: 'Support | İbrahim Atmaca',
    description: "Get help with İbrahim Atmaca's mobile apps. Send a support request by email.",
    url: `${SITE}/support`,
  },
  {
    file: 'elevana-privacy.html',
    title: 'Elevana Privacy Policy | İbrahim Atmaca',
    description: 'Privacy policy for the Elevana app: what is stored on your device and how it is used.',
    url: `${SITE}/elevana-privacy`,
    appId: elevana?.appStoreId,
  },
  {
    // The Elevana paywall links to this older address. It points search engines at the real page.
    file: 'elevana_privacy_policy.html',
    title: 'Elevana Privacy Policy | İbrahim Atmaca',
    description: 'Privacy policy for the Elevana app: what is stored on your device and how it is used.',
    url: `${SITE}/elevana-privacy`,
    appId: elevana?.appStoreId,
  },
  {
    file: 'kidtales-privacy.html',
    title: 'KidTales AI Privacy Policy | İbrahim Atmaca',
    description: 'Privacy policy for KidTales AI: Bedtime Stories, in English and Turkish.',
    url: `${SITE}/kidtales-privacy`,
  },
  {
    file: 'kidtales-terms.html',
    title: 'KidTales AI Terms of Use | İbrahim Atmaca',
    description: 'Terms of use for KidTales AI: Bedtime Stories, in English and Turkish.',
    url: `${SITE}/kidtales-terms`,
  },
  {
    file: 'privacy-policy.html',
    title: 'Mobile Game Privacy Policy | İbrahim Atmaca',
    description: "Privacy policy for İbrahim Atmaca's mobile games.",
    url: `${SITE}/privacy-policy`,
  },
];

function seoHead(page) {
  const isHome = page.kind === 'home';
  const title = isHome ? page.copy.meta.title : page.title;
  const description = isHome ? page.copy.meta.description : page.description;
  const lines = [
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="description" content="${escapeHtml(description)}" />`,
    `<link rel="canonical" href="${escapeHtml(page.url)}" />`,
    '<meta name="robots" content="index, follow, max-image-preview:large" />',
    `<meta property="og:site_name" content="${escapeHtml(en.hero.title)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    `<meta property="og:url" content="${escapeHtml(page.url)}" />`,
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
    `<meta name="twitter:image" content="${OG_IMAGE}" />`,
  ];
  if (isHome) {
    lines.push(
      `<meta property="og:locale" content="${page.locale}" />`,
      `<meta property="og:locale:alternate" content="${page.lang === 'en' ? 'tr_TR' : 'en_US'}" />`,
      `<link rel="alternate" hreflang="en" href="${SITE}/" />`,
      `<link rel="alternate" hreflang="tr" href="${SITE}/tr" />`,
      `<link rel="alternate" hreflang="x-default" href="${SITE}/" />`,
      structuredData(page.copy, page.lang, page.url),
    );
  }
  if (page.appId) {
    // Lets Safari on iPhone offer the app from its own page.
    lines.push(`<meta name="apple-itunes-app" content="app-id=${escapeHtml(page.appId)}" />`);
  }
  return `<!-- seo:start -->\n    ${lines.join('\n    ')}\n    <!-- seo:end -->`;
}

// Shown only when JavaScript is off. With JavaScript, React replaces it on first render.
const hiddenStyle =
  '<noscript><style>.seo-fallback{position:static!important;width:auto!important;height:auto!important;clip:auto!important;margin:2rem auto!important;max-width:48rem;padding:0 1rem;color:#e2e8f0;font:16px/1.6 system-ui,sans-serif}.seo-fallback a{color:#38bdf8}</style></noscript>';
const visuallyHidden =
  '.seo-fallback{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}';

for (const page of pages) {
  const isHome = page.kind === 'home';
  const label = isHome ? page.copy.meta.title : page.title;
  const fallback = isHome ? homeFallback(page.copy) : fallbackNote(label);

  let html = template
    .replace(/<!-- seo:start[\s\S]*?<!-- seo:end -->/, seoHead(page))
    .replace('<!-- seo:body -->', fallback)
    .replace('</head>', `    <style>${visuallyHidden}</style>\n    ${hiddenStyle}\n  </head>`);
  if (isHome && page.lang === 'tr') html = html.replace('<html lang="en"', '<html lang="tr"');

  writeFileSync(join(dist, page.file), html);
}

console.log(`Wrote ${pages.length} pages.`);
