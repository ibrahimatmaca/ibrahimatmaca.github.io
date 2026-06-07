# İbrahim Atmaca - Senior Mobile Engineer Portfolio

<div align="center">
  <img width="1200" height="475" alt="Portfolio Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

A modern, responsive portfolio website showcasing my work as a Senior Mobile Engineer. Built with React, TypeScript, Tailwind CSS, and powered by Gemini AI.

🌐 **Live Site:** [https://ibrahimatmaca.github.io](https://ibrahimatmaca.github.io)

## Features

- 🎨 Modern, dark-themed UI with smooth animations
- 📱 Fully responsive design
- 🚀 Fast performance with Vite
- 🤖 AI-powered features with Google Gemini
- 📧 Contact form with SMTP email integration
- 🔒 Privacy policy pages for mobile apps
- 🎯 SEO optimized

## Tech Stack

- **Frontend:** React 19, TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Routing:** React Router DOM
- **Build Tool:** Vite
- **AI:** Google Gemini API
- **Email:** Nodemailer (SMTP)

## Getting Started

### Prerequisites

- Node.js (v20 or higher)
- npm or yarn

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

3. Set up environment variables:
   ```bash
   cp env.example .env.local
   ```
   
   Edit `.env.local` and add your configuration:
   - `GEMINI_API_KEY`: Your Gemini API key
   - `SMTP_HOST`: SMTP server host (e.g., smtp-mail.outlook.com)
   - `SMTP_PORT`: SMTP port (usually 587)
   - `SMTP_SECURE`: false for TLS, true for SSL
   - `SMTP_USER`: Your email address
   - `SMTP_PASSWORD`: Your email app password
   - `SMTP_FROM`: Sender email address
   - `SMTP_TO`: Recipient email address

4. Run the development server:
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:3000`

## Deployment

### GitHub Pages

This project is automatically deployed to GitHub Pages using GitHub Actions. The deployment workflow runs on every push to the `main` or `master` branch.

**Deployment Steps:**
1. Push your changes to the repository
2. GitHub Actions will automatically build and deploy to GitHub Pages
3. Your site will be available at `https://ibrahimatmaca.github.io`

**SSL/HTTPS:**
GitHub Pages automatically provides SSL certificates for all sites. Your site is already accessible via HTTPS at `https://ibrahimatmaca.github.io`. No additional SSL configuration is needed. If you're using a custom domain, GitHub Pages will still provide SSL certificates automatically - just enable "Enforce HTTPS" in your repository settings.

**Environment Variables:**
Set the following secrets in your GitHub repository settings (Settings → Secrets and variables → Actions):
- `GEMINI_API_KEY`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASSWORD`
- `SMTP_FROM`
- `SMTP_TO`

### Manual Deployment

To deploy manually:

```bash
npm run build
```

The built files will be in the `dist` directory, ready to be deployed to any static hosting service.

## Project Structure

```
├── components/
│   ├── privacy/          # Privacy policy pages
│   │   ├── PrivacyPolicy.tsx
│   │   ├── ElevanaPrivacy.tsx
│   │   ├── KidTalesPrivacy.tsx
│   │   └── GeneralPrivacy.tsx
│   ├── About.tsx
│   ├── Background.tsx
│   ├── Contact.tsx
│   ├── Hero.tsx
│   ├── HomePage.tsx
│   ├── Projects.tsx
│   ├── Support.tsx
│   └── ...
├── api/                   # Serverless functions (Vercel)
│   └── send-email.ts
├── utils/                 # Utility functions
│   └── emailTemplate.ts
├── .github/
│   └── workflows/
│       └── deploy.yml     # GitHub Actions workflow
└── public/
    └── 404.html           # SPA routing fallback
```

## Routes

### Public Routes
- `/` - Home page
- `/#projects` - Projects section
- `/#about` - About section
- `/#contact` - Contact section

### Hidden Routes (Privacy Policies)
- `/support` - Support page
- `/elevana-privacy` - Elevana app privacy policy
- `/kidtales-privacy` - KidTales AI privacy policy
- `/kidtales-terms` - KidTales AI terms of use
- `/privacy-policy` - Mobile game privacy policy

## Privacy Policy Pages

The portfolio includes privacy policy pages for mobile applications:
- **Elevana** - Habit tracking app privacy policy
- **KidTales AI** - AI story generation app privacy policy and terms of use (English/Turkish)
- **Mobile Games** - General mobile game privacy policy

These pages are accessible via direct URLs but are not linked in the main navigation.

## Contact Form

The contact form sends emails via SMTP. Configure your SMTP settings in `.env.local` for local development or GitHub Secrets for production.

## Development

### Local Development

For local development with API functions, you can use Vercel CLI:

```bash
npm install -g vercel
vercel dev
```

Or run normally (API will work in production):

```bash
npm run dev
```

### Building for Production

```bash
npm run build
npm run preview
```

## License

This project is private and proprietary.

## Contact

- **Email:** ibrahim.atmaca61@hotmail.com
- **Website:** [https://ibrahimatmaca.github.io](https://ibrahimatmaca.github.io)
- **GitHub:** [@ibrahimatmaca](https://github.com/ibrahimatmaca)

---

Built with ❤️ by İbrahim Atmaca
