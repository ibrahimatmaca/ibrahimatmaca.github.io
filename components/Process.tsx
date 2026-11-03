import React, { useRef } from 'react';
import { motion, MotionValue, useScroll, useTransform } from 'framer-motion';
import SectionHeading from './SectionHeading';
import SpotlightCard from './SpotlightCard';
import { useLanguage } from '../hooks/useLanguage';

const Step: React.FC<{
  index: number;
  count: number;
  title: string;
  text: string;
  progress: MotionValue<number>;
}> = ({ index, count, title, text, progress }) => {
  // A step lights up as the line reaches it.
  const start = index / count;
  const opacity = useTransform(progress, [start - 0.08, start + 0.04], [0.45, 1]);
  const scale = useTransform(progress, [start - 0.08, start + 0.04], [0.8, 1]);

  return (
    <motion.li style={{ opacity }} className="relative pl-14 lg:pl-0 lg:pt-14">
      <motion.span
        aria-hidden="true"
        style={{ scale }}
        className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-fill font-mono text-sm font-bold text-on-fill shadow-lg shadow-brand-500/30"
      >
        {index + 1}
      </motion.span>
      <SpotlightCard className="h-full">
        <div className="p-5 sm:p-6">
          <h3 className="mb-2 text-xl font-bold text-ink">{title}</h3>
          <p className="text-ink-2">{text}</p>
        </div>
      </SpotlightCard>
    </motion.li>
  );
};

const Process: React.FC = () => {
  const { t } = useLanguage();
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] });
  const steps = t.process.steps;

  return (
    <section id="process" className="relative scroll-mt-24 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <SectionHeading kicker={t.process.kicker} title={t.process.title} />

        <ol ref={ref} className="relative grid grid-cols-1 gap-6 lg:grid-cols-4 lg:gap-5">
          {/* Track and fill. A vertical line on small screens, a horizontal one on large. */}
          <span aria-hidden="true" className="absolute bottom-10 left-5 top-5 w-px bg-line lg:hidden" />
          <motion.span
            aria-hidden="true"
            style={{ scaleY: scrollYProgress }}
            className="absolute bottom-10 left-5 top-5 w-px origin-top bg-tint lg:hidden"
          />
          <span aria-hidden="true" className="absolute left-5 right-5 top-5 hidden h-px bg-line lg:block" />
          <motion.span
            aria-hidden="true"
            style={{ scaleX: scrollYProgress }}
            className="absolute left-5 right-5 top-5 hidden h-px origin-left bg-tint lg:block"
          />

          {steps.map((step, i) => (
            <Step key={step.title} index={i} count={steps.length} title={step.title} text={step.text} progress={scrollYProgress} />
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Process;
