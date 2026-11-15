import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import IntroArt, { IntroHands } from './IntroArt';
import { NO_HANDOFF, STRIP_P } from './introTimeline';
import { markIntroSeen } from '../../lib/introSeen';
import { scrollToPosition } from '../../lib/scroll';
import { useLanguage } from '../../hooks/useLanguage';

/** One beat at its end state. A fixed progress, so the same art as the scroll story, without motion. */
const Panel: React.FC<{ beat: number; eyebrow: string; text: string; alt: string }> = ({ beat, eyebrow, text, alt }) => {
  const progress = useMotionValue<number>(STRIP_P[beat]);
  const auto = useMotionValue(1);
  const mix = useMotionValue(0);
  const [numeral, ...rest] = eyebrow.split(' ');

  return (
    <motion.li
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.2 }}
      className="grid grid-cols-[6rem_1fr] items-center gap-4 md:block"
    >
      <div aria-hidden="true" className="relative aspect-[480/560] w-full overflow-hidden">
        <IntroArt progress={progress} auto={auto} threeMix={mix} handoff={NO_HANDOFF} />
        <div className="absolute inset-0">
          <IntroHands progress={progress} />
        </div>
      </div>
      <div className="md:mt-4">
        <p className="font-mono text-[0.8125rem] font-medium uppercase leading-[1.2] tracking-[0.08em] text-ink-3">
          <span className="text-tint">{numeral}</span> {rest.join(' ')}
        </p>
        <p className="mt-2 font-display text-[1.375rem] font-medium leading-[1.15] tracking-[-0.01em] text-ink [text-wrap:balance]">{text}</p>
        <span className="sr-only">{alt}</span>
      </div>
    </motion.li>
  );
};

interface StripProps {
  onActive: (active: boolean) => void;
  onHeroReady: (ready: boolean) => void;
}

/**
 * Reduced motion and short landscape screens: no pin, no scroll story. The five end states side by side,
 * with the same captions as the scroll version.
 */
const IntroStrip: React.FC<StripProps> = ({ onActive, onHeroReady }) => {
  const { t } = useLanguage();
  const copy = t.intro;
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    onHeroReady(true);
  }, [onHeroReady]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => {
      onActive(entry.isIntersecting);
      if (entry.isIntersecting) markIntroSeen();
    });
    observer.observe(section);
    return () => {
      observer.disconnect();
      onActive(false);
    };
  }, [onActive]);

  const skip = (event: React.MouseEvent) => {
    event.preventDefault();
    const section = sectionRef.current;
    if (!section) return;
    scrollToPosition(section.getBoundingClientRect().bottom + window.scrollY);
    document.getElementById('hero-title')?.focus({ preventScroll: true });
  };

  return (
    <section id="intro" ref={sectionRef} aria-label={copy.label} className="relative pb-12 pt-28 lg:flex lg:min-h-[70svh] lg:items-center">
      <div className="mx-auto w-full max-w-[80rem] px-4 sm:px-6 lg:px-10">
        <a href="#hero-title" onClick={skip} className="text-link text-[1rem] font-semibold">
          {copy.skip}
        </a>
        <ol className="mt-6 grid gap-8 md:grid-cols-3 lg:grid-cols-5 lg:gap-6">
          {copy.steps.map((step, i) => (
            <Panel key={step.eyebrow} beat={i} eyebrow={step.eyebrow} text={step.text} alt={step.alt} />
          ))}
        </ol>
      </div>
    </section>
  );
};

export default IntroStrip;
