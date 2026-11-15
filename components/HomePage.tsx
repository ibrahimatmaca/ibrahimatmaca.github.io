import React, { useCallback, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import SiteNav from './SiteNav';
import SiteFooter from './SiteFooter';
import Hero from './Hero';
import Intro from './intro/Intro';
import IntroStrip from './intro/IntroStrip';
import Services from './Services';
import Projects from './Projects';
import OpenSource from './OpenSource';
import Process from './Process';
import About from './About';
import Contact from './Contact';
import FoxMascot from './fox/FoxMascot';
import FoxSplash from './fox/FoxSplash';
import { useTheme } from '../hooks/useTheme';
import { useLenis } from '../hooks/useLenis';
import { useDocumentLang, useLanguage } from '../hooks/useLanguage';
import { usePageTitle } from '../hooks/usePageTitle';
import { introMode } from '../lib/introSeen';

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
  // Decided once, so nothing shifts when the page settles.
  const [intro] = useState(introMode);
  const [introActive, setIntroActive] = useState(intro !== 'none');
  const [heroReady, setHeroReady] = useState(intro === 'none');
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
    <div className="relative min-h-svh font-sans text-ink antialiased selection:bg-tint/25">
      <AnimatePresence>{isSplashing && <FoxSplash onDone={finishSplash} />}</AnimatePresence>

      <SiteNav mode="home" theme={theme} onToggleTheme={toggleTheme} />

      <main id="main" tabIndex={-1} className="relative outline-none">
        {/* The intro and the hero's entrance wait for the splash to finish. */}
        {!isSplashing && intro === 'play' && <Intro onActive={setIntroActive} onHeroReady={setHeroReady} />}
        {!isSplashing && intro === 'strip' && <IntroStrip onActive={setIntroActive} onHeroReady={setHeroReady} />}
        {!isSplashing && <Hero introDone={heroReady} revealNow={intro === 'none'} />}
        <Services />
        <Projects />
        <OpenSource />
        <Process />
        <About />
        <Contact />
      </main>

      <SiteFooter home />
      <FoxMascot active={!isSplashing && !introActive} />
    </div>
  );
};

export default HomePage;
