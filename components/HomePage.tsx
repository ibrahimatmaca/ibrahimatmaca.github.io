import React, { useCallback, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Aurora from './Aurora';
import SiteNav from './SiteNav';
import SiteFooter from './SiteFooter';
import Hero from './Hero';
import Services from './Services';
import Projects from './Projects';
import Process from './Process';
import About from './About';
import Contact from './Contact';
import FoxMascot from './fox/FoxMascot';
import FoxSplash from './fox/FoxSplash';
import { useTheme } from '../hooks/useTheme';
import { useLenis } from '../hooks/useLenis';
import { useDocumentLang, useLanguage } from '../hooks/useLanguage';
import { usePageTitle } from '../hooks/usePageTitle';

const SPLASH_KEY = 'splash-seen';

// The splash plays once per visit, and never for people who ask for less motion.
function shouldShowSplash(): boolean {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  try {
    return sessionStorage.getItem(SPLASH_KEY) !== '1';
  } catch {
    return true;
  }
}

const HomePage: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isSplashing, setIsSplashing] = useState(shouldShowSplash);
  const { t } = useLanguage();
  useLenis();
  useDocumentLang();
  usePageTitle(t.meta.title);

  const finishSplash = useCallback(() => {
    try {
      sessionStorage.setItem(SPLASH_KEY, '1');
    } catch {
      // The splash may play again on the next visit. That is fine.
    }
    setIsSplashing(false);
  }, []);

  return (
    <div className="relative min-h-svh font-sans text-ink antialiased selection:bg-brand-500/30">
      <AnimatePresence>{isSplashing && <FoxSplash onDone={finishSplash} />}</AnimatePresence>

      <Aurora />
      <SiteNav mode="home" theme={theme} onToggleTheme={toggleTheme} />

      <main className="relative">
        {/* The hero's entrance animation waits for the splash to finish. */}
        {!isSplashing && <Hero />}
        <Services />
        <Projects />
        <Process />
        <About />
        <Contact />
      </main>

      <SiteFooter home />
      <FoxMascot active={!isSplashing} />
    </div>
  );
};

export default HomePage;
