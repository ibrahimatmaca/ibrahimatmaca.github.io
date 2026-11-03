import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Home, Smartphone } from 'lucide-react';
import Aurora from './Aurora';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';
import { useTheme } from '../hooks/useTheme';
import { useDocumentLang, useLanguage } from '../hooks/useLanguage';
import { usePageTitle } from '../hooks/usePageTitle';

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: EASE_OUT },
});

const NotFound: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useDocumentLang();
  usePageTitle(t.notFound.pageTitle);

  useEffect(() => {
    const robots = document.createElement('meta');
    robots.name = 'robots';
    robots.content = 'noindex';
    document.head.appendChild(robots);
    return () => robots.remove();
  }, []);

  const goBack = () => {
    // A direct visit has nothing to go back to.
    if (window.history.state?.idx > 0) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="font-sans antialiased relative flex min-h-svh items-center justify-center overflow-hidden px-4 py-16 text-ink selection:bg-brand-500/30">
      <Aurora />

      <div className="absolute right-3 top-[calc(0.75rem+env(safe-area-inset-top))] z-20 flex items-center gap-1">
        <LanguageToggle />
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </div>

      <main className="relative z-10 flex w-full max-w-xl flex-col items-center text-center">
        <motion.div
          {...fadeUp(0)}
          aria-hidden="true"
          className="mb-8 flex select-none items-center gap-[0.08em] font-mono text-[clamp(6rem,24vw,10rem)] font-bold leading-none text-ink"
        >
          <span>4</span>
          {/* The missing app. It jiggles like an iOS home screen and can be dragged. */}
          <motion.div
            drag
            dragSnapToOrigin
            dragElastic={0.5}
            dragTransition={{ bounceStiffness: 300, bounceDamping: 18 }}
            whileDrag={{ scale: 1.08, rotate: 0 }}
            animate={{ rotate: [-2.5, 2.5, -2.5] }}
            transition={{ repeat: Infinity, duration: 0.5, ease: 'easeInOut' }}
            className="flex h-[0.86em] w-[0.86em] cursor-grab touch-none items-center justify-center rounded-[22%] border-2 border-dashed border-tint bg-tint/10 text-tint active:cursor-grabbing"
          >
            <Smartphone className="h-[0.4em] w-[0.4em]" strokeWidth={1.5} />
          </motion.div>
          <span>4</span>
        </motion.div>

        <motion.h1 {...fadeUp(0.08)} className="mb-3 text-3xl font-bold sm:text-4xl">
          {t.notFound.title}
        </motion.h1>

        <motion.p {...fadeUp(0.16)} className="mb-3 text-lg leading-relaxed text-ink-2">
          {t.notFound.text}
        </motion.p>

        <motion.code {...fadeUp(0.2)} className="mb-8 max-w-full break-all rounded-lg bg-raised px-3 py-1 font-mono text-sm text-ink-2">
          {pathname}
        </motion.code>

        <motion.div {...fadeUp(0.28)} className="flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
          <Link
            to="/"
            className="press inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-fill px-8 py-3 font-semibold text-on-fill shadow-lg shadow-brand-500/25"
          >
            <Home size={18} aria-hidden="true" />
            {t.notFound.home}
          </Link>
          <button
            type="button"
            onClick={goBack}
            className="press inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-line bg-surface/70 px-8 py-3 font-semibold text-ink hover:bg-raised"
          >
            <ArrowLeft size={18} aria-hidden="true" />
            {t.notFound.back}
          </button>
        </motion.div>
      </main>
    </div>
  );
};

export default NotFound;
