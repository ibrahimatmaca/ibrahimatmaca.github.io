import React, { lazy, Suspense, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { animate, motion, useMotionValue, useMotionValueEvent, useScroll, useSpring, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import IntroArt, { IntroHands } from './IntroArt';
import { SceneBoundary } from '../Stage3D';
import { ART_H, ART_W, THREE_IN, THREE_WARM, captionIndex, handoffTarget } from './introTimeline';
import type { IntroLayout } from './introTimeline';
import { detectTier, isSlowConnection } from '../../lib/capability';
import { publishIntroHolds, useHeroLive, useHeroSlot } from '../../lib/introHandoff';
import { buildStageIcons } from '../../lib/stageIcons';
import type { Project } from '../../types';
import { markIntroSeen, prefersLightIntro } from '../../lib/introSeen';
import { scrollToPosition } from '../../lib/scroll';
import { useDocumentTheme } from '../../hooks/useDocumentTheme';
import { useLanguage } from '../../hooks/useLanguage';
import { useMediaQuery } from '../../hooks/useMediaQuery';

const IntroCanvas = lazy(() => import('./IntroCanvas'));
const loadCanvas = () => Promise.all([import('./IntroCanvas'), import('../three/Scene3D')]);

// Same soft follow as the hero.
const SCROLL_SPRING = { stiffness: 60, damping: 22, mass: 0.6, restDelta: 0.0005 };
const EASE_OUT = [0.23, 1, 0.32, 1] as const;

const ART_BOX =
  'pointer-events-none absolute left-1/2 top-[40svh] aspect-[480/560] h-[min(52svh,91vw)] -translate-x-1/2 -translate-y-1/2 md:top-[42svh] md:h-[min(54svh,40rem)] lg:top-[46svh] lg:h-[min(60svh,46rem)]';

type Phase = 'before' | 'warm' | 'live';

function phaseOf(p: number): Phase {
  if (p < THREE_WARM) return 'before';
  return p < THREE_IN ? 'warm' : 'live';
}

/** Calls back when the canvas layer goes away, so a later mount starts from "not drawn yet". */
const Unmount: React.FC<{ onUnmount: () => void }> = ({ onUnmount }) => {
  useEffect(() => onUnmount, [onUnmount]);
  return null;
};

interface IntroProps {
  /** True while the intro is on screen. The fox waits for it to leave. */
  onActive: (active: boolean) => void;
  /** True once the hero may start its own 3D canvas. */
  onHeroReady: (ready: boolean) => void;
}

/**
 * Scroll story before the hero: idea, shape, code, app, served. A sticky stage inside a tall runway.
 * Scroll is never captured; the page keeps moving at its own speed.
 */
const Intro: React.FC<IntroProps> = ({ onActive, onHeroReady }) => {
  const { t } = useLanguage();
  const copy = t.intro;
  const theme = useDocumentTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const artRef = useRef<HTMLDivElement>(null);
  const layoutRef = useRef<IntroLayout | null>(null);

  const wide = useMediaQuery('(min-width: 1024px)');
  const mid = useMediaQuery('(min-width: 768px)');
  const [light] = useState(prefersLightIntro);
  const runway = light ? (wide ? 240 : mid ? 220 : 200) : wide ? 300 : mid ? 260 : 220;

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const progress = useSpring(scrollYProgress, SCROLL_SPRING);
  const auto = useMotionValue(0);
  /** 1 while the 3D layer owns the phone: the SVG phone stays hidden, also while the canvas fades out. */
  const threeMix = useMotionValue(0);
  const canvasFade = useMotionValue(0);

  const [active, setActive] = useState(true);
  const [skipping, setSkipping] = useState(false);
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('before');
  const [pastNinety, setPastNinety] = useState(false);
  const [chunkReady, setChunkReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);
  const [retired, setRetired] = useState(false);
  const [gone, setGone] = useState(false);
  const heroLive = useHeroLive();
  const tier = useMemo(() => detectTier(), []);
  const icons = useMemo(
    () => buildStageIcons(t.projects.list as Project[], t.openSource.items as { id: string; title: string; icon?: string }[]),
    [t.projects.list, t.openSource.items],
  );

  // Beat 1 plays by itself shortly after the splash, before any scroll.
  useEffect(() => {
    const controls = animate(auto, 1, { delay: 0.7, duration: 1.7, ease: EASE_OUT });
    return () => controls.stop();
  }, [auto]);

  // Where the art sits and how big it is, in stage pixels. The hero publishes its own slot.
  const [base, setBase] = useState<Omit<IntroLayout, 'slot'> | null>(null);
  const slot = useHeroSlot();
  const layout = useMemo<IntroLayout | null>(() => (base ? { ...base, slot } : null), [base, slot]);
  useLayoutEffect(() => {
    layoutRef.current = layout;
  }, [layout]);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    const art = artRef.current;
    if (!stage || !art) return;
    const measure = () => {
      const s = stage.getBoundingClientRect();
      const a = art.getBoundingClientRect();
      setBase({
        stageW: s.width,
        stageH: s.height,
        scale: Math.min(a.width / ART_W, a.height / ART_H),
        artCx: a.left - s.left + a.width / 2,
        artCy: a.top - s.top + a.height / 2,
      });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    observer.observe(art);
    return () => observer.disconnect();
  }, []);
  const handoff = useMemo(() => handoffTarget(layout), [layout]);

  // Seen flag: finishing the intro, or leaving it upward by any route.
  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    if (value >= 0.98) markIntroSeen();
  });
  useMotionValueEvent(progress, 'change', (value) => {
    setIndex((current) => captionIndex(value, current));
    const next = phaseOf(value);
    setPhase((current) => (next === current ? current : next));
    setPastNinety((current) => (value >= 0.9 ? true : value < 0.88 ? false : current));
  });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => {
      setActive(entry.isIntersecting);
      // Coming back to the intro after a skip shows it again.
      if (!entry.isIntersecting) setSkipping(false);
      if (!entry.isIntersecting && entry.boundingClientRect.bottom <= 0) markIntroSeen();
    });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    onActive(active);
  }, [active, onActive]);
  useEffect(() => () => onActive(false), [onActive]);

  // 3D layer: beats 4 and 5 on desktop and tablet. Everything else keeps the SVG.
  const allow3D = useMemo(
    () => (tier === 'full' || tier === 'lite') && window.innerWidth >= 768 && !light && !isSlowConnection(),
    [tier, light],
  );
  const threeUsable = allow3D && !failed && !skipping;

  useEffect(() => {
    if (!threeUsable || chunkReady) return;
    const start = () => void loadCanvas().then(() => setChunkReady(true), () => setFailed(true));
    if ('requestIdleCallback' in window) {
      const handle = window.requestIdleCallback(start, { timeout: 3000 });
      return () => window.cancelIdleCallback(handle);
    }
    const handle = globalThis.setTimeout(start, 800);
    return () => globalThis.clearTimeout(handle);
  }, [threeUsable, chunkReady]);

  // Hand-over. Wide: the canvas covers the viewport and stays put after the section ends, so the phone
  // does not slide away; once the hero's own phone is pinned in the same spot and drawn, this one holds for
  // a moment, then fades out in place. Narrower: the stage scrolls away with its phone and the canvas goes
  // when the stage has left.
  const handedOver = wide ? heroLive : !active;
  useEffect(() => {
    if (!handedOver) return;
    const id = window.setTimeout(() => setRetired(true), wide ? 450 : 0);
    return () => {
      window.clearTimeout(id);
      setRetired(false);
    };
  }, [handedOver, wide]);
  useEffect(() => {
    if (!retired) return;
    const id = window.setTimeout(() => setGone(true), 320);
    return () => {
      window.clearTimeout(id);
      setGone(false);
    };
  }, [retired]);

  const mounted = threeUsable && chunkReady && phase !== 'before' && !(retired && gone);
  const owns = mounted && ready && phase === 'live';
  useEffect(() => {
    const controls = animate(threeMix, owns ? 1 : 0, { duration: 0.2, ease: EASE_OUT });
    return () => controls.stop();
  }, [owns, threeMix]);
  useEffect(() => {
    const controls = animate(canvasFade, owns && !retired ? 1 : 0, { duration: retired ? 0.3 : 0.2, ease: EASE_OUT });
    return () => controls.stop();
  }, [owns, retired, canvasFade]);

  // The hero keeps its own stage hidden while this phone is fixed on screen.
  const holds = wide && threeUsable && chunkReady && phase === 'live' && !retired;
  useEffect(() => {
    publishIntroHolds(holds);
  }, [holds]);
  useEffect(() => () => publishIntroHolds(false), []);

  const heroReady = pastNinety && (!threeUsable || wide || (retired && gone));
  useEffect(() => {
    onHeroReady(heroReady);
  }, [heroReady, onHeroReady]);

  const handleFail = useCallback(() => setFailed(true), []);
  const handleReady = useCallback(() => setReady(true), []);
  const handleUnready = useCallback(() => setReady(false), []);

  // Chrome of the stage fades while the phone docks.
  const chrome = useTransform(progress, [0.9, 1], [1, 0]);
  const hint = useTransform(progress, [0, 0.03], [1, 0]);
  const stageOpacity = skipping ? 0 : 1;

  const skip = () => {
    const section = sectionRef.current;
    if (!section) return;
    markIntroSeen();
    setSkipping(true);
    const bottom = section.getBoundingClientRect().bottom + window.scrollY;
    scrollToPosition(bottom);
    const heading = document.getElementById('hero-title');
    heading?.focus({ preventScroll: true });
  };

  return (
    <section id="intro" ref={sectionRef} aria-label={copy.label} className="relative" style={{ height: `${runway}svh` }}>
      <div
        ref={stageRef}
        className="sticky top-0 h-svh overflow-hidden transition-opacity duration-200 ease-out"
        style={{ opacity: stageOpacity }}
      >
        <motion.div className="pointer-events-none absolute inset-0" style={{ opacity: chrome }}>
          <button
            type="button"
            onClick={skip}
            className="btn btn-secondary press pointer-events-auto absolute bottom-[calc(1.5rem+env(safe-area-inset-bottom))] right-4 z-10 !min-h-11 !px-5 sm:right-6 md:bottom-[calc(3.5rem+env(safe-area-inset-bottom))] lg:right-10"
          >
            {copy.skip}
          </button>
        </motion.div>

        <div ref={artRef} className={ART_BOX} style={{ willChange: active ? 'transform' : undefined }}>
          <IntroArt progress={progress} auto={auto} threeMix={threeMix} handoff={handoff} />
        </div>

        {mounted && (
          <motion.div
            aria-hidden="true"
            className={`pointer-events-none inset-0 ${wide ? 'fixed' : 'absolute'}`}
            style={{ opacity: canvasFade, touchAction: 'pan-y' }}
          >
            <Unmount onUnmount={handleUnready} />
            <SceneBoundary onFail={handleFail}>
              <Suspense fallback={null}>
                <IntroCanvas
                  progress={progress}
                  layoutRef={layoutRef}
                  handoff={handoff}
                  theme={theme}
                  tier={tier === 'lite' ? 'lite' : 'full'}
                  icons={icons}
                  onReady={handleReady}
                  onFail={handleFail}
                />
              </Suspense>
            </SceneBoundary>
          </motion.div>
        )}

        <div className={ART_BOX}>
          <IntroHands progress={progress} handoff={handoff} />
        </div>

        <motion.div className="pointer-events-none absolute inset-0 flex items-end justify-center" style={{ opacity: chrome }}>
          <ol className="pointer-events-none relative grid w-full max-w-[40rem] px-6 pb-[calc(5.5rem+env(safe-area-inset-bottom))] text-center md:pb-[calc(6.5rem+env(safe-area-inset-bottom))] lg:absolute lg:bottom-10 lg:left-10 lg:max-w-[26rem] lg:p-0 lg:text-left">
            {copy.steps.map((step, i) => {
              const [numeral, ...rest] = step.eyebrow.split(' ');
              return (
                <li key={step.eyebrow} className="intro-cap [grid-area:1/1]" data-state={i < index ? 'before' : i > index ? 'after' : 'active'}>
                  <p className="font-mono text-[0.8125rem] font-medium uppercase leading-[1.2] tracking-[0.08em] text-ink-3">
                    <span className="text-tint">{numeral}</span> {rest.join(' ')}
                  </p>
                  <p className="mt-2 font-display text-[1.75rem] font-medium leading-[1.15] tracking-[-0.01em] text-ink [text-wrap:balance] lg:text-[2.25rem]">
                    {step.text}
                  </p>
                  <span className="sr-only">{step.alt}</span>
                </li>
              );
            })}
          </ol>
        </motion.div>

        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-[calc(1rem+env(safe-area-inset-bottom))] flex justify-center lg:bottom-6"
          style={{ opacity: hint }}
        >
          <span className="intro-hint flex flex-col items-center gap-1 font-mono text-[0.8125rem] leading-[1.2] tracking-[0.08em] text-ink-3">
            {copy.scroll}
            <ChevronDown className="intro-chevron h-4 w-4" strokeWidth={2} />
          </span>
        </motion.div>

        <motion.ul
          aria-hidden="true"
          className="pointer-events-none absolute bottom-6 right-6 hidden gap-2 md:flex lg:right-10"
          style={{ opacity: chrome }}
        >
          {copy.steps.map((step, i) => (
            <li key={step.eyebrow} className="intro-tick" data-active={i === index} />
          ))}
        </motion.ul>
      </div>
    </section>
  );
};

export default Intro;
