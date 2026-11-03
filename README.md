# İbrahim Atmaca - Senior Mobile Engineer Portfolio

<div align="center">
  <img width="1200" height="475" alt="Portfolio Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

A responsive portfolio for a Senior Mobile Engineer, built to help clients and teams find me and get in touch. Built with React, TypeScript, and Tailwind CSS, deployed as a static site on GitHub Pages.

🌐 **Live Site:** [https://ibrahimatmaca.github.io](https://ibrahimatmaca.github.io)

## Features

- Aurora background and bento-style sections: services, selected work, process, about and contact
- Light and dark themes (light by default, with a manual switch on the home page)
- English and Turkish: `/` for English, `/tr` for Turkish, with a switch in the navigation
- Smooth scrolling (Lenis) and animations (Framer Motion), all of which respect `prefers-reduced-motion`
- Fox splash screen and mascot that hops between cards as you scroll and watches the pointer
- Contact form via native `mailto:` integration, plus a copy-email button
- App Store metadata cached at build time
- Privacy policy and terms pages for mobile apps (including bilingual KidTales AI pages)
- Search and AI discoverability: per-page meta tags, structured data, sitemap, `llms.txt`
- Security hardening: Content Security Policy, pinned GitHub Actions, `security.txt`

## Tech Stack

- **Frontend:** React 19, TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion, Lenis
- **Routing:** React Router DOM
- **Build Tool:** Vite
- **Hosting:** GitHub Pages (static)

## Getting Started

### Prerequisites

- Node.js v22 or higher
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ibrahimatmaca/ibrahimatmaca.github.io.git
   cd ibrahimatmaca.github.io
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:3000`

## Deployment

### GitHub Pages

This project is automatically deployed to GitHub Pages using GitHub Actions on every push to `main`.

**Deployment flow:**
1. Push changes to the repository
2. GitHub Actions runs `npm run fetch-appstore` then `npm run build`
3. The site is published at `https://ibrahimatmaca.github.io`

**SSL/HTTPS:** GitHub Pages provides HTTPS automatically. Check that **Enforce HTTPS** is on in **Settings → Pages**.

**Important:** In repository **Settings → Pages → Build and deployment**, set **Source** to **GitHub Actions** (not "Deploy from a branch"). If Pages serves the repo root directly, the browser will try to load raw `/index.tsx` and fail with a MIME type error.

**Workflow security:** Actions are pinned to commit SHAs (the version is in a comment next to each one) and each job asks only for the permissions it needs. Dependabot opens updates for them.

### Manual Deployment

```bash
npm run fetch-appstore
npm run build
npm run preview
```

Built files are output to the `dist` directory. After `vite build`, `scripts/route-pages.mjs` writes one HTML file per route (for example `dist/support.html`, `dist/tr.html`) so GitHub Pages serves each with HTTP 200 and its own title, description, canonical link, social tags and structured data.

**Adding a route:** add the React route in `App.tsx`, then add an entry to the `pages` table in `scripts/route-pages.mjs` and a line in `public/sitemap.xml`.

## Project Structure

```
├── components/
│   ├── fox/                  # Splash screen and mascot
│   ├── privacy/
│   │   ├── LegalShell.tsx    # Shared frame and text styling for legal pages
│   │   ├── PrivacyPolicy.tsx
│   │   ├── KidTalesLegalLayout.tsx
│   │   ├── ElevanaPrivacy.tsx
│   │   ├── KidTalesPrivacy.tsx
│   │   ├── KidTalesTerms.tsx
│   │   └── GeneralPrivacy.tsx
│   ├── Aurora.tsx            # Moving gradient background
│   ├── SiteNav.tsx           # Navigation (home and other pages)
│   ├── SiteFooter.tsx
│   ├── HomePage.tsx
│   ├── Hero.tsx
│   ├── Services.tsx
│   ├── Projects.tsx
│   ├── Process.tsx
│   ├── About.tsx
│   ├── Contact.tsx
│   ├── NotFound.tsx
│   ├── Support.tsx
│   └── ...
├── hooks/                    # Theme, language, smooth scroll, media queries
├── lib/
│   ├── i18n.ts               # Language detection and content lookup
│   └── scroll.ts
├── scripts/
│   ├── fetch-appstore-metadata.mjs
│   └── route-pages.mjs       # Per-route HTML, meta tags and structured data
├── .github/workflows/
│   └── deploy.yml
├── content.json              # English text and project list
├── content.tr.json           # Turkish text
└── public/
    ├── .well-known/security.txt
    ├── 404.html
    ├── .nojekyll
    ├── llms.txt
    ├── og-image.png
    ├── robots.txt
    └── sitemap.xml
```

## Routes

### Public Routes
- `/` — Home page (English)
- `/tr` — Home page (Turkish)
- `/#services`, `/#projects`, `/#process`, `/#about`, `/#contact` — Home page sections

### Hidden Routes (Legal & Support)
- `/support` — Support page
- `/elevana-privacy` — Elevana privacy policy
- `/elevana_privacy_policy.html` — Older address of the Elevana policy, still used by the Elevana paywall
- `/kidtales-privacy` — KidTales AI privacy policy (English/Turkish)
- `/kidtales-terms` — KidTales AI terms of use (English/Turkish)
- `/privacy-policy` — General mobile game privacy policy

These pages are accessible via direct URLs (e.g. App Store links) but are not shown in the main navigation. They stay in English and dark, and the language switch does not apply to them.

## Content and Languages

Home page text lives in `content.json` (English) and `content.tr.json` (Turkish), and both must have the same keys. The project list and App Store data live only in `content.json`; the Turkish file carries just the text of each project, matched by `id`.

The legal and privacy text lives in its own `components/privacy/*` files and is not translated or edited with the design.

## App Store Metadata

At build time, `npm run fetch-appstore` caches iTunes metadata into `content.json` (`appStoreCache`). The site reads only this cache and makes no App Store requests at runtime, so ratings refresh on each deploy.

## Search and AI Discoverability

- `scripts/route-pages.mjs` writes each page's title, description, canonical link, Open Graph and Twitter tags. The home pages also get JSON-LD (Person, WebSite, WebPage, MobileApplication) and `hreflang` links between `/` and `/tr`.
- The home page text is also placed inside `#root` as visually hidden HTML, so crawlers that do not run JavaScript can read it. React replaces it on load.
- `public/robots.txt` allows search engines and AI assistants. To keep AI training crawlers out, set `Disallow: /` for `GPTBot` and `Google-Extended`.
- `public/llms.txt` is a short, plain-text summary for AI assistants.
- Elevana pages carry an `apple-itunes-app` tag so iPhone Safari can offer the app.

## Security

- `vite.config.ts` adds a Content Security Policy `<meta>` tag at build time. The one inline script in `index.html` is allowed by its hash, so editing that script changes the hash automatically. The dev server does not use the policy.
- Third-party content is limited to Google Fonts, Devicon icons from jsDelivr, and App Store images. Add any new host to the policy in `vite.config.ts`.
- `public/.well-known/security.txt` tells researchers where to report issues. It expires on 2027-10-01 and needs renewing before then.
- The site has no server, accounts or secrets. The contact and support forms only open the visitor's email app.

## Contact Form

The contact form opens the user's default email client via `mailto:` — no server-side email API is required for GitHub Pages hosting.

## Development

```bash
npm run dev      # Start dev server on localhost:3000 (add -- --host to test from another device)
npm run lint     # Run ESLint
npm run build    # Production build
```

## License

This project is private and proprietary.

## Contact

- **Email:** ibrahim.atmaca61@hotmail.com
- **Website:** [https://ibrahimatmaca.github.io](https://ibrahimatmaca.github.io)
- **GitHub:** [@ibrahimatmaca](https://github.com/ibrahimatmaca)

---

Built with care by İbrahim Atmaca
