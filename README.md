# İbrahim Atmaca - Senior Mobile Engineer Portfolio

<div align="center">
  <img width="1200" height="475" alt="Portfolio Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

A modern, responsive portfolio website showcasing my work as a Senior Mobile Engineer. Built with React, TypeScript, and Tailwind CSS, deployed as a static site on GitHub Pages.

🌐 **Live Site:** [https://ibrahimatmaca.github.io](https://ibrahimatmaca.github.io)

## Features

- Modern, dark-themed UI with smooth animations (Framer Motion)
- Fully responsive design
- Fast performance with Vite
- Contact form via native `mailto:` integration
- App Store metadata with build-time cache and CORS proxy fallback
- Privacy policy and terms pages for mobile apps (including bilingual KidTales AI pages)
- SEO meta tags, sitemap, and GitHub Pages SPA routing

## Tech Stack

- **Frontend:** React 19, TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Routing:** React Router DOM
- **Build Tool:** Vite
- **Hosting:** GitHub Pages (static)

## Getting Started

### Prerequisites

- Node.js v20 or higher
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

This project is automatically deployed to GitHub Pages using GitHub Actions on every push to `main` or `master`.

**Deployment flow:**
1. Push changes to the repository
2. GitHub Actions runs `npm run fetch-appstore` then `npm run build`
3. The site is published at `https://ibrahimatmaca.github.io`

**SSL/HTTPS:** GitHub Pages provides HTTPS automatically. No extra configuration is required.

### Manual Deployment

```bash
npm run fetch-appstore
npm run build
npm run preview
```

Built files are output to the `dist` directory.

## Project Structure

```
├── components/
│   ├── privacy/
│   │   ├── PrivacyPolicy.tsx
│   │   ├── KidTalesLegalLayout.tsx
│   │   ├── ElevanaPrivacy.tsx
│   │   ├── KidTalesPrivacy.tsx
│   │   ├── KidTalesTerms.tsx
│   │   └── GeneralPrivacy.tsx
│   ├── About.tsx
│   ├── Background.tsx
│   ├── Contact.tsx
│   ├── Hero.tsx
│   ├── HomePage.tsx
│   ├── Projects.tsx
│   ├── Support.tsx
│   └── ...
├── hooks/
│   └── usePageTitle.ts
├── scripts/
│   └── fetch-appstore-metadata.mjs
├── .github/workflows/
│   └── deploy.yml
├── content.json
└── public/
    ├── 404.html
    ├── .nojekyll
    ├── robots.txt
    └── sitemap.xml
```

## Routes

### Public Routes
- `/` — Home page
- `/#projects` — Projects section
- `/#about` — About section
- `/#contact` — Contact section

### Hidden Routes (Legal & Support)
- `/support` — Support page
- `/elevana-privacy` — Elevana privacy policy
- `/kidtales-privacy` — KidTales AI privacy policy (English/Turkish)
- `/kidtales-terms` — KidTales AI terms of use (English/Turkish)
- `/privacy-policy` — General mobile game privacy policy

These pages are accessible via direct URLs (e.g. App Store links) but are not shown in the main navigation.

## App Store Metadata

In production (GitHub Pages), live App Store lookups use a CORS proxy (`api.allorigins.win`) with graceful fallback to static images in `content.json`.

At build time, `npm run fetch-appstore` caches iTunes metadata into `content.json` (`appStoreCache`) so the site works even when the proxy is unavailable.

## Contact Form

The contact form opens the user's default email client via `mailto:` — no server-side email API is required for GitHub Pages hosting.

## Development

```bash
npm run dev      # Start dev server (port 3000, iTunes API proxy enabled)
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
