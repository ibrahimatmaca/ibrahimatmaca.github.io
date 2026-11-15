import React, { useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import Stage3D from './Stage3D';
import { DESKTOP, useMediaQuery } from '../hooks/useMediaQuery';
import { useLanguage } from '../hooks/useLanguage';
import { fill } from '../lib/i18n';
import { scrollToPosition } from '../lib/scroll';

const SCROLL_SPRING = { stiffness: 120, damping: 28, mass: 0.4 };
const HYSTERESIS = 0.15;

const numeral = (index: number) => String(index + 1).padStart(2, '0');

/** Large outline numeral. The stroke uses the strong hairline colour. */
const Numeral: React.FC<{ index: number; className?: string }> = ({ index, className = '' }) => (
  <span
    aria-hidden="true"
    className={`block font-display font-medium leading-none text-transparent [-webkit-text-stroke:1px_rgb(var(--line-strong))] ${className}`}
  >
    {numeral(index)}
  </span>
);

/** Poster for the pinned scene: three stacked plates and the active numeral. */
const PlatePoster: React.FC<{ step: number }> = ({ step }) => (
  <div aria-hidden="true" className="css3d-stage absolute inset-0 flex items-center justify-center">
    <div className="css3d-ring relative aspect-[2.6/1.6] w-[min(100%,28rem)]">
      {[2, 1, 0].map((depth) => (
        <div
          key={depth}
          className="absolute inset-0 rounded-[0.75rem] border border-line bg-surface"
          style={{ transform: `translate3d(${depth * 14}px, ${depth * 10}px, ${-depth * 40}px)` }}
        >
          {depth === 0 && (
            <span className="absolute left-6 top-4 font-display text-[4.5rem] font-medium leading-none text-ink">{numeral(step)}</span>
          )}
          {depth === 0 && <span className="absolute bottom-6 left-6 h-0.5 w-14 bg-tint" />}
        </div>
      ))}
    </div>
  </div>
);

const Process: React.FC = () => {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const desktop = useMediaQuery(DESKTOP);
  const pinned = desktop && !reduce;
  const steps = t.process.steps;
  const count = steps.length;
  const runwayRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);

  const { scrollYProgress } = useScroll({ target: runwayRef, offset: ['start start', 'end end'] });
  const progress = useSpring(scrollYProgress, SCROLL_SPRING);
  const spec = useMemo(() => ({ kind: 'process' as const, count }), [count]);

  // The text changes at the halfway point between steps, with a margin so it does not flicker.
  useMotionValueEvent(scrollYProgress, 'change', (value: number) => {
    const s = value * (count - 1);
    setStep((current) => (Math.abs(s - current) > 0.5 + HYSTERESIS ? Math.min(count - 1, Math.max(0, Math.round(s))) : current));
  });

  const jumpTo = (index: number) => {
    const runway = runwayRef.current;
    if (!runway) return;
    const top = runway.getBoundingClientRect().top + window.scrollY;
    const length = runway.offsetHeight - window.innerHeight;
    scrollToPosition(top + (index / Math.max(count - 1, 1)) * length);
  };

  const heading = (
    <SectionHeading index="04" kicker={t.process.kicker} title={t.process.title} titleId="process-title" />
  );

  return (
    <section id="process" aria-labelledby="process-title" className="relative scroll-mt-24 pt-[clamp(6rem,12vw,10rem)]">
      <div className="mx-auto w-full max-w-[80rem] px-4 sm:px-6 lg:px-10">{heading}</div>

      {pinned ? (
        <div ref={runwayRef} style={{ height: `${count * 100}svh` }} className="relative">
          <div className="sticky top-0 flex h-svh flex-col">
            <div className="mx-auto grid min-h-0 w-full max-w-[80rem] flex-1 grid-cols-12 gap-8 px-10 pt-24">
              <div aria-hidden="true" className="col-span-5 flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 8, filter: 'blur(2px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.24, ease: [0.23, 1, 0.32, 1] } }}
                    exit={{ opacity: 0, y: -8, filter: 'blur(2px)', transition: { duration: 0.16, ease: [0.77, 0, 0.175, 1] } }}
                  >
                    <Numeral index={step} className="text-[8rem]" />
                    <h3 className="mt-6 font-display text-[1.75rem] font-medium leading-[1.15] tracking-[-0.01em] text-ink">{steps[step].title}</h3>
                    <p className="mt-4 max-w-[40rem] text-[1.0625rem] leading-[1.6] text-ink-2">{steps[step].text}</p>
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="col-span-7 min-h-0">
                <Stage3D spec={spec} progress={progress} needsMotion poster={<PlatePoster step={step} />} className="h-full w-full" />
              </div>
            </div>

            <nav aria-label={t.process.railLabel} className="mx-auto w-full max-w-[80rem] px-10 pb-[calc(2rem+env(safe-area-inset-bottom))]">
              <ol className="flex gap-2">
                {steps.map((item, index) => (
                  <li key={item.title} className="flex-1">
                    <button
                      type="button"
                      onClick={() => jumpTo(index)}
                      aria-current={index === step ? 'step' : undefined}
                      aria-label={fill(t.process.stepLabel, { n: String(index + 1), title: item.title })}
                      className="group flex h-11 w-full flex-col justify-end"
                    >
                      <span className="relative block h-0.5 w-full bg-line">
                        <span className={`absolute inset-0 origin-left bg-tint transition-transform duration-200 ease-out ${index <= step ? 'scale-x-100' : 'scale-x-0'}`} />
                      </span>
                      <span aria-hidden="true" className={`mt-2 block text-left font-mono text-[0.8125rem] leading-[1.2] ${index === step ? 'text-ink' : 'text-ink-3'}`}>
                        {numeral(index)} {item.title}
                      </span>
                    </button>
                  </li>
                ))}
              </ol>
            </nav>
          </div>

          {/* The visible stage is decorative; this list carries every step for assistive technology. */}
          <ol className="sr-only">
            {steps.map((item) => (
              <li key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      ) : (
        <div ref={runwayRef} className="mx-auto w-full max-w-[80rem] px-4 pb-[clamp(6rem,12vw,10rem)] sm:px-6 lg:px-10">
          <ol>
            {steps.map((item, index) => (
              <Reveal as="li" key={item.title} delay={index * 0.06} className="relative border-t border-line before:absolute before:left-0 before:top-[-1px] before:h-0.5 before:w-12 before:bg-tint last:border-b">
                <div className="grid grid-cols-1 gap-x-6 gap-y-3 py-8 md:grid-cols-12 md:items-baseline">
                  <Numeral index={index} className="text-[4rem] md:col-span-3" />
                  <h3 className="font-display text-[1.75rem] font-medium leading-[1.15] tracking-[-0.01em] text-ink md:col-span-4">{item.title}</h3>
                  <p className="max-w-[40rem] text-[1.0625rem] leading-[1.6] text-ink-2 md:col-span-5">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      )}
    </section>
  );
};

export default Process;
