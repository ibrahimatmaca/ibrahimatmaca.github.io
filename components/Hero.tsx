import React, { useEffect, useRef, useState } from 'react';
import {
  animate,
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { ArrowDown, Check, Github, Instagram, Linkedin } from 'lucide-react';
import { Project } from '../types';
import ProjectPlaceholder from './ProjectPlaceholder';
import CodeBlock from './CodeBlock';
import Magnetic from './Magnetic';
import { isInProgressProject, getProjectStoreUrl } from '../lib/projectUtils';
import { scrollToId } from '../lib/scroll';
import { DESKTOP, FINE_POINTER, useMediaQuery } from '../hooks/useMediaQuery';
import { useLanguage } from '../hooks/useLanguage';

const EASE_OUT = [0.23, 1, 0.32, 1] as const;
const BUILD_ROTATE_MS = 2800;

const PHONE_CODE = [
  [['text-purple-400', 'struct '], ['text-sky-300', 'Dream'], ['text-slate-300', ': '], ['text-sky-300', 'App'], ['text-slate-300', ' {']],
  [['text-purple-400', '  var '], ['text-slate-300', 'body: '], ['text-purple-400', 'some '], ['text-sky-300', 'Scene'], ['text-slate-300', ' {']],
  [['text-sky-300', '    WindowGroup'], ['text-slate-300', ' { '], ['text-emerald-300', 'Shipped'], ['text-slate-300', '() }']],
  [['text-slate-300', '  }']],
  [['text-slate-300', '}']],
] satisfies [string, string][][];

const SOCIAL_LINKS = [
  { Icon: Github, href: 'https://github.com/ibrahimatmaca', label: 'GitHub' },
  { Icon: Linkedin, href: 'https://www.linkedin.com/in/ibrahimatmaca', label: 'LinkedIn' },
  { Icon: Instagram, href: 'https://www.instagram.com/com.ibrahimatmaca', label: 'Instagram' },
];

const ProjectAppIcon: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const iconUrl = project.appStoreCache?.icon;
  const appName = project.appStoreCache?.name ?? project.title;

  const isInProgress = isInProgressProject(project);
  const storeUrl = getProjectStoreUrl(project);
  const Wrapper = storeUrl ? 'a' : 'div';
  const wrapperProps = storeUrl
    ? { href: storeUrl, target: '_blank' as const, rel: 'noopener noreferrer' }
    : {};

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', duration: 0.5, bounce: 0.25, delay: 0.5 + index * 0.08 }}
    >
      <Wrapper {...wrapperProps} className="press relative z-20 flex flex-col items-center gap-1.5">
        <div className="relative h-12 w-12 overflow-hidden rounded-[22%] border border-white/5 shadow-lg sm:h-14 sm:w-14">
          {iconUrl ? (
            <img src={iconUrl} alt={appName} width={56} height={56} className="h-full w-full object-cover" />
          ) : (
            <ProjectPlaceholder title={project.title} className="h-full w-full rounded-[22%]" />
          )}
          {isInProgress && (
            <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border border-slate-900 bg-amber-400" />
          )}
        </div>
        <span className="line-clamp-2 w-full text-center text-[11px] font-medium leading-tight text-white/90">
          {appName}
        </span>
      </Wrapper>
    </motion.div>
  );
};

const RotatingBuilds: React.FC = () => {
  const { t } = useLanguage();
  const [index, setIndex] = useState(0);
  const builds = t.hero.builds;

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % builds.length);
    }, BUILD_ROTATE_MS);
    return () => window.clearInterval(timer);
  }, [builds.length]);

  return (
    <p className="mb-6 text-lg font-medium text-ink-2 sm:text-xl">
      <span className="sr-only">{`${t.hero.buildsLabel} ${builds.join(', ')}.`}</span>
      <span aria-hidden="true" className="flex min-h-[3.5em] flex-wrap items-baseline gap-x-2 sm:min-h-[1.75em]">
        <span>{t.hero.buildsLabel}</span>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={`${t.hero.buildsLabel}-${index}`}
            initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(4px)', transition: { duration: 0.16 } }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
            className="inline-block font-semibold text-tint"
          >
            {builds[index % builds.length]}
          </motion.span>
        </AnimatePresence>
      </span>
    </p>
  );
};

// Fills, shows success, then starts again. Stops while off screen.
const BuildWidget: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const reduceMotion = useReducedMotion();
  const progress = useMotionValue(reduceMotion ? 100 : 0);
  const percent = useTransform(progress, (value) => `${Math.round(value)}%`);
  const scaleX = useTransform(progress, [0, 100], [0, 1]);
  const [isDone, setIsDone] = useState(Boolean(reduceMotion));

  useEffect(() => {
    if (!inView || reduceMotion) return;
    let controls: ReturnType<typeof animate> | undefined;
    let restartTimer: number | undefined;

    const run = () => {
      setIsDone(false);
      progress.set(0);
      controls = animate(progress, 100, {
        duration: 3.4,
        ease: [0.65, 0, 0.35, 1],
        onComplete: () => {
          setIsDone(true);
          restartTimer = window.setTimeout(run, 2600);
        },
      });
    };
    run();

    return () => {
      controls?.stop();
      window.clearTimeout(restartTimer);
    };
  }, [inView, reduceMotion, progress]);

  return (
    <div ref={ref} aria-hidden="true" className="relative z-10 mt-auto rounded-2xl border border-white/5 bg-slate-800/80 p-4">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-medium text-slate-300">{isDone ? 'Build succeeded' : 'Running build...'}</span>
        {isDone ? (
          <Check size={14} className="text-emerald-400" strokeWidth={3} />
        ) : (
          <motion.span className="text-xs font-bold tabular-nums text-brand-400">{percent}</motion.span>
        )}
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-700/50">
        <motion.div
          className={`h-full w-full origin-left rounded-full ${isDone ? 'bg-emerald-400' : 'bg-brand-500'}`}
          style={{ scaleX }}
        />
      </div>
    </div>
  );
};

const TrustMarquee: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="marquee mt-12 w-full" aria-hidden="true">
      <div className="marquee-track">
        {[0, 1].map((group) => (
          <div key={group} className={`flex shrink-0 items-center gap-3 pr-3 ${group === 1 ? 'marquee-clone' : ''}`}>
            {t.hero.trust.map((item) => (
              <span
                key={item}
                className="rounded-full border border-line bg-surface/50 px-4 py-2 font-mono text-sm text-ink-2 backdrop-blur-sm"
              >
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const Hero: React.FC = () => {
  const { t } = useLanguage();
  const projects = t.projects.list as Project[];
  const containerRef = useRef<HTMLElement>(null);
  const finePointer = useMediaQuery(FINE_POINTER);
  const isDesktop = useMediaQuery(DESKTOP);
  const { scrollY } = useScroll();

  // Parallax. Desktop only: stacked on a phone, the text and mockup would collide.
  const textY = useTransform(scrollY, [0, 500], isDesktop ? [0, 120] : [0, 0]);
  const phoneY = useTransform(scrollY, [0, 500], isDesktop ? [0, -60] : [0, 0]);
  const scrollIndicatorOpacity = useTransform(scrollY, [0, 100], [1, 0]);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || !finePointer) return;
    const rect = containerRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const accentWords = new Set(t.hero.headlineAccent.split(' '));

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden pb-12 pt-32 lg:pb-16"
    >
      <div className="container mx-auto grid grid-cols-1 items-center gap-14 px-4 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Text */}
        <motion.div style={{ y: textY }} className="z-10 text-left">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            data-fox-perch
            className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/60 py-1.5 pl-3 pr-4 backdrop-blur-md"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            <span className="text-sm font-medium text-ink">{t.hero.availability}</span>
          </motion.div>

          {/* Each word rises out of its own mask. */}
          <h1 className="mb-5 flex flex-wrap gap-x-[0.25em] text-[clamp(2.5rem,7vw,5.25rem)] font-bold leading-[1.02] tracking-[-0.03em]">
            {t.hero.headline.split(' ').map((word, i) => (
              <span key={`${word}-${i}`} className="inline-block overflow-hidden py-[0.1em]">
                <motion.span
                  initial={{ y: '115%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 + i * 0.08, ease: EASE_OUT }}
                  className={
                    accentWords.has(word)
                      ? 'inline-block bg-gradient-to-r from-brand-700 via-indigo-600 to-violet-600 bg-clip-text text-transparent dark:from-brand-300 dark:via-indigo-300 dark:to-violet-300'
                      : 'inline-block text-ink'
                  }
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: EASE_OUT }}
          >
            <p className="mb-5 font-mono text-sm uppercase tracking-widest text-tint">
              {t.hero.title} · {t.hero.subtitle}
            </p>

            <RotatingBuilds />

            <p className="mb-8 max-w-xl leading-relaxed text-ink-2">{t.hero.description}</p>

            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-5">
              <div className="flex flex-wrap items-center gap-3">
                <Magnetic>
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToId('contact');
                    }}
                    className="press inline-flex min-h-12 items-center rounded-full bg-fill px-8 py-3 font-semibold text-on-fill shadow-lg shadow-brand-500/25"
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
                  className="press inline-flex min-h-12 items-center rounded-full border border-line bg-surface/60 px-7 py-3 font-semibold text-ink backdrop-blur-md hover:bg-raised"
                >
                  {t.hero.cta}
                </a>
              </div>
              <div className="flex gap-2">
                {SOCIAL_LINKS.map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="press flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface/60 text-ink-2 hover:bg-raised hover:text-ink"
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* 3D phone */}
        <div className="flex items-center justify-center [perspective:1000px]">
          {/* Touch screens have no pointer to follow, so the phone drifts on its own. */}
          <motion.div
            animate={finePointer ? { rotateY: 0 } : { rotateY: [-6, 6, -6] }}
            transition={finePointer ? { duration: 0 } : { repeat: Infinity, duration: 9, ease: 'easeInOut' }}
            style={{ transformStyle: 'preserve-3d' }}
            className="relative"
          >
            <motion.div
              style={{ rotateX, rotateY, y: phoneY, transformStyle: 'preserve-3d' }}
              initial={{ opacity: 0, scale: 0.9, rotateZ: -5 }}
              animate={{ opacity: 1, scale: 1, rotateZ: 0 }}
              transition={{ type: 'spring', duration: 1, bounce: 0.25 }}
              className="relative h-[560px] w-[280px] sm:h-[640px] sm:w-[320px] xl:h-[680px] xl:w-[340px]"
            >
              {/* A device screen stays dark in both themes. */}
              <div
                className="backface-hidden absolute inset-0 overflow-hidden rounded-[3rem] border-8 border-slate-900 bg-slate-950 shadow-2xl ring-1 ring-black/10 dark:ring-white/10"
                style={{ transform: 'translateZ(20px)' }}
              >
                <div className="absolute left-1/2 top-2.5 z-30 h-6 w-24 -translate-x-1/2 rounded-full bg-black" />

                <div className="absolute left-6 right-6 top-3.5 z-20 flex justify-between text-[11px] font-medium text-white">
                  <span>9:41</span>
                  <div className="flex items-center gap-0.5">
                    <div className="h-2.5 w-4 rounded-[2px] bg-white" />
                    <div className="h-1.5 w-0.5 rounded-[1px] bg-white" />
                  </div>
                </div>

                <div className="no-scrollbar relative flex h-full w-full flex-col overflow-y-auto bg-slate-900 px-5 pb-8 pt-14">
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-brand-900/30 to-transparent" />

                  <div className="relative z-10 grid grid-cols-4 gap-x-2 gap-y-5">
                    {projects.map((p, i) => (
                      <ProjectAppIcon key={p.id} project={p} index={i} />
                    ))}
                  </div>

                  <div className="relative z-10 mt-5 rounded-2xl border border-white/5 bg-slate-800/80 p-3">
                    <div className="mb-2 text-[11px] font-medium text-slate-400">Dream.swift</div>
                    <CodeBlock lines={PHONE_CODE} delay={0.9} />
                  </div>
                  <BuildWidget />
                </div>

                <div className="absolute bottom-2 left-1/2 z-30 h-1 w-1/3 -translate-x-1/2 rounded-full bg-white/30" />
              </div>

              <div className="absolute inset-0 -z-10 rounded-[3rem] bg-slate-800" style={{ transform: 'translateZ(0px)' }} />
              <div className="absolute inset-0 -z-20 rounded-[3rem] bg-slate-900" style={{ transform: 'translateZ(-10px)' }} />
              <div
                className="absolute inset-0 -z-30 rounded-[3rem] bg-black/30 blur-xl"
                style={{ transform: 'translateZ(-60px) translateY(3rem) scale(0.9)' }}
              />
            </motion.div>

            {/* Floating chips. Desktop only, next to the phone. */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="absolute -right-20 top-1/4 z-50 hidden items-center gap-3 rounded-2xl border border-line bg-surface/90 px-4 py-3 shadow-xl backdrop-blur-md xl:flex"
            >
              <svg className="h-5 w-5 text-tint" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <span className="whitespace-nowrap text-sm font-medium text-ink">{t.hero.chips.platforms}</span>
            </motion.div>

            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1 }}
              className="absolute -left-20 bottom-1/3 z-50 hidden items-center gap-3 rounded-2xl border border-line bg-surface/90 px-4 py-3 shadow-xl backdrop-blur-md xl:flex"
            >
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
              <span className="whitespace-nowrap text-sm font-medium text-ink">{t.hero.chips.live}</span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <TrustMarquee />
      </div>

      <motion.div
        aria-hidden="true"
        style={{ opacity: scrollIndicatorOpacity }}
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 text-ink-3 xl:block"
      >
        <ArrowDown size={22} />
      </motion.div>
    </section>
  );
};

export default Hero;
