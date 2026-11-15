import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useScroll, useSpring } from 'framer-motion';
import Magnetic from './Magnetic';
import Stage3D from './Stage3D';
import IconCluster from './IconCluster';
import { Project } from '../types';
import { buildStageIcons } from '../lib/stageIcons';
import { scrollToId } from '../lib/scroll';
import { publishHeroLive, publishHeroSlot, useIntroHolds } from '../lib/introHandoff';
import { useLanguage } from '../hooks/useLanguage';

// Soft follow: the scene never tracks the scroll position 1:1.
const SCROLL_SPRING = { stiffness: 60, damping: 22, mass: 0.6, restDelta: 0.0005 };

interface HeroProps {
  /** False while the intro's 3D layer is still up: the hero then keeps its poster and starts no canvas. */
  introDone?: boolean;
  /** True when no intro plays before the hero, so the headline reveals at once. */
  revealNow?: boolean;
}

const Hero: React.FC<HeroProps> = ({ introDone = true, revealNow = true }) => {
  const { t } = useLanguage();
  const runwayRef = useRef<HTMLDivElement>(null);
  const slotRef = useRef<HTMLDivElement>(null);
  const columnRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(revealNow);

  // The headline reveals when the hero scrolls into view, not while the intro still covers it.
  useEffect(() => {
    if (revealed) return;
    // The text column, not the headline: a clipped element never counts as visible.
    const title = columnRef.current;
    if (!title) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setRevealed(true);
      },
      { threshold: 0.25 },
    );
    observer.observe(title);
    return () => observer.disconnect();
  }, [revealed]);

  // While the intro's phone is fixed on screen the hero's own stage waits, then takes over in place:
  // once its slot is pinned at the top and its canvas has drawn, or after a short grace period.
  const holds = useIntroHolds();
  const [docked, setDocked] = useState(false);
  const [stageReady, setStageReady] = useState(false);
  const [waited, setWaited] = useState(false);
  const [taken, setTaken] = useState(false);
  const live = docked && (stageReady || waited);
  useEffect(() => {
    const runway = runwayRef.current;
    if (!runway) return;
    // A line at the top of the viewport: true from the moment the runway's top reaches it, and after. The
    // slot is pinned from exactly that point, so the swap with the intro's phone happens with both in place.
    const observer = new IntersectionObserver(([entry]) => setDocked(entry.boundingClientRect.top <= 0.5), {
      rootMargin: '0px 0px -100% 0px',
    });
    observer.observe(runway);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!docked || stageReady) return;
    const id = window.setTimeout(() => setWaited(true), 1500);
    return () => {
      window.clearTimeout(id);
      setWaited(false);
    };
  }, [docked, stageReady]);
  // Once the hero's stage has been shown it stays shown.
  if (live && !taken) setTaken(true);
  useEffect(() => {
    publishHeroLive(live);
  }, [live]);
  useEffect(() => () => publishHeroLive(false), []);

  // Tell the intro where the 3D stage sits, so its phone can dock there without a jump.
  useLayoutEffect(() => {
    const slot = slotRef.current;
    if (!slot) return;
    const publish = () => {
      const rect = slot.getBoundingClientRect();
      publishHeroSlot({ cx: rect.left + rect.width / 2, width: rect.width, height: rect.height });
    };
    publish();
    const observer = new ResizeObserver(publish);
    observer.observe(slot);
    window.addEventListener('resize', publish);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', publish);
      publishHeroSlot(null);
    };
  }, []);
  // Side by side (lg): progress runs while the runway scrolls away. Stacked: from entering to leaving the pin.
  const wide = useMemo(() => typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches, []);
  const { scrollYProgress } = useScroll({
    target: runwayRef,
    offset: wide ? ['start start', 'end start'] : ['start end', 'end end'],
  });
  const progress = useSpring(scrollYProgress, SCROLL_SPRING);

  const icons = useMemo(
    () => buildStageIcons(t.projects.list as Project[], t.openSource.items as { id: string; title: string; icon?: string }[]),
    [t.projects.list, t.openSource.items],
  );
  const spec = useMemo(() => ({ kind: 'hero' as const, icons }), [icons]);

  const { headline, headlineAccent } = t.hero;
  const accentAt = headline.indexOf(headlineAccent);
  const before = accentAt >= 0 ? headline.slice(0, accentAt) : headline;
  const after = accentAt >= 0 ? headline.slice(accentAt + headlineAccent.length) : '';

  return (
    <section aria-labelledby="hero-title" className="relative">
      <div className="mx-auto w-full max-w-[80rem] px-4 sm:px-6 lg:grid lg:grid-cols-12 lg:gap-8 lg:px-10">
        <div ref={columnRef} className="relative z-10 flex min-h-svh flex-col justify-center pb-12 pt-28 lg:col-span-7 lg:pt-24 lg:col-start-1 lg:row-start-1 lg:self-start">
          <p data-fox-avoid className="mb-8 flex items-center gap-2 font-mono text-[0.8125rem] font-medium uppercase leading-[1.2] tracking-[0.08em] text-ink-2">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-tint" />
            {t.hero.availability}
          </p>

          <h1
            id="hero-title"
            tabIndex={-1}
            data-fox-perch
            className={`hero-title-reveal${revealed ? ' is-revealed' : ''} font-display text-[clamp(3rem,min(1.5rem+7vw,12.5svh),7.5rem)] font-medium leading-[0.95] tracking-[-0.03em] text-ink outline-none`}
          >
            {before}
            {accentAt >= 0 && <em className="font-medium italic text-tint">{headlineAccent}</em>}
            {after}
          </h1>

          <p className="mt-6 max-w-[40rem] text-[1.25rem] leading-[1.45] text-ink-2 lg:text-[1.5rem]">{t.hero.description}</p>

          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Magnetic>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId('contact');
                }}
                className="btn btn-primary press"
              >
                {t.hero.ctaPrimary}
              </a>
            </Magnetic>
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                scrollToId('projects');
              }}
              className="text-link text-[1rem] font-semibold"
            >
              {t.hero.ctaSecondary}
            </a>
          </div>

          <ul className="mt-14 flex max-w-[40rem] flex-wrap gap-x-5 gap-y-1 border-t border-line pt-5 font-mono text-[0.8125rem] leading-[1.4] text-ink-3">
            {t.hero.trust.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          {/* Keyboard and screen reader route to the same targets the 3D tiles show. */}
          <ul className="sr-only">
            {icons
              .filter((icon) => icon.href && !icon.inProgress)
              .map((icon) => (
                <li key={icon.id}>
                  <a href={icon.href} {...(icon.href?.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                    {icon.name}
                  </a>
                </li>
              ))}
          </ul>
        </div>

        <div
          ref={runwayRef}
          className="relative -mx-4 h-[110svh] sm:-mx-6 lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:-mr-10 lg:ml-0 lg:h-[120svh]"
        >
          <div
            ref={slotRef}
            className="sticky top-[12svh] h-[70svh] transition-opacity duration-300 ease-out motion-reduce:transition-none lg:top-0 lg:h-svh"
            style={{ opacity: holds && !taken ? 0 : 1 }}
          >
            <Stage3D
              spec={spec}
              progress={progress}
              poster={<IconCluster icons={icons} />}
              enabled={introDone}
              onReadyChange={setStageReady}
              className="h-full w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
