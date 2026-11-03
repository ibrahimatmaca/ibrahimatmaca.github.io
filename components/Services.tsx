import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check, CreditCard, Lightbulb, Rocket, Shield, Store } from 'lucide-react';
import SectionHeading from './SectionHeading';
import SpotlightCard from './SpotlightCard';
import CodeBlock from './CodeBlock';
import Reveal from './Reveal';
import { useLanguage } from '../hooks/useLanguage';

const IOS_CODE = [
  [['text-purple-400', 'struct '], ['text-sky-300', 'Greeting'], ['text-slate-300', ': '], ['text-sky-300', 'View'], ['text-slate-300', ' {']],
  [['text-purple-400', '  var '], ['text-slate-300', 'body: '], ['text-purple-400', 'some '], ['text-sky-300', 'View'], ['text-slate-300', ' {']],
  [['text-sky-300', '    Text'], ['text-slate-300', '('], ['text-emerald-300', '"Hello"'], ['text-slate-300', ')']],
  [['text-slate-300', '      .'], ['text-sky-300', 'font'], ['text-slate-300', '(.largeTitle)']],
  [['text-slate-300', '  }']],
  [['text-slate-300', '}']],
] satisfies [string, string][][];

const ANDROID_CODE = [
  [['text-purple-400', '@Composable']],
  [['text-purple-400', 'fun '], ['text-sky-300', 'Greeting'], ['text-slate-300', '() {']],
  [['text-sky-300', '  Text'], ['text-slate-300', '('], ['text-emerald-300', '"Hello"'], ['text-slate-300', ')']],
  [['text-slate-300', '}']],
] satisfies [string, string][][];

// Runs a loop only while the card is on screen.
const useLoopWhenVisible = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '-40px' });
  return { ref, inView };
};

const FlutterVisual: React.FC = () => {
  const { ref, inView } = useLoopWhenVisible();

  return (
    <div ref={ref} aria-hidden="true" className="relative mx-auto h-32 w-40">
      <motion.div
        animate={inView ? { y: [0, -6, 0] } : { y: 0 }}
        transition={{ repeat: Infinity, duration: 3.2, ease: 'easeInOut' }}
        className="absolute left-2 top-3 h-28 w-16 rounded-[1.1rem] border border-line bg-raised"
      />
      <motion.div
        animate={inView ? { y: [0, 6, 0] } : { y: 0 }}
        transition={{ repeat: Infinity, duration: 3.2, ease: 'easeInOut', delay: 0.4 }}
        className="absolute right-2 top-0 h-28 w-16 rounded-lg border border-tint/40 bg-tint/10"
      />
      <div className="absolute inset-x-0 bottom-0 flex justify-center">
        <span className="rounded-full bg-fill px-3 py-1 font-mono text-[11px] font-semibold text-on-fill">1 codebase</span>
      </div>
    </div>
  );
};

// A dot travels along a row of steps while the card is on screen.
const FlowVisual: React.FC<{ icons: React.ElementType[] }> = ({ icons }) => {
  const { ref, inView } = useLoopWhenVisible();

  return (
    <div ref={ref} aria-hidden="true" className="relative mx-auto flex w-full max-w-[16rem] items-center justify-between py-6">
      <div className="absolute inset-x-5 top-1/2 h-px bg-line" />
      <motion.span
        animate={inView ? { left: ['1.25rem', 'calc(100% - 1.25rem)'] } : { left: '1.25rem' }}
        transition={{ repeat: Infinity, duration: 2.6, ease: 'easeInOut', repeatType: 'reverse' }}
        className="absolute top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-tint shadow-[0_0_12px_rgb(var(--tint))]"
      />
      {icons.map((Icon, i) => (
        <span
          key={i}
          className="relative flex h-10 w-10 items-center justify-center rounded-full border border-line bg-canvas text-tint"
        >
          <Icon size={18} />
        </span>
      ))}
    </div>
  );
};

const AndroidVisual: React.FC = () => (
  <div aria-hidden="true" className="mx-auto w-full max-w-[12rem] space-y-2">
    {[0, 1, 2].map((row) => (
      <motion.div
        key={row}
        initial={{ opacity: 0, x: 16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.2 + row * 0.12, ease: [0.23, 1, 0.32, 1] }}
        className="flex items-center gap-3 rounded-xl border border-line bg-raised/70 p-2.5"
      >
        <span className="h-7 w-7 rounded-full bg-tint/25" />
        <span className="flex-1 space-y-1.5">
          <span className="block h-1.5 w-4/5 rounded bg-ink-3/50" />
          <span className="block h-1.5 w-1/2 rounded bg-line" />
        </span>
      </motion.div>
    ))}
  </div>
);

const Services: React.FC = () => {
  const { t } = useLanguage();
  const items = Object.fromEntries(t.services.items.map((item) => [item.id, item]));

  const cardBody = (id: string) => (
    <>
      <h3 className="mb-2 text-xl font-bold text-ink">{items[id].title}</h3>
      <p className="text-ink-2">{items[id].text}</p>
    </>
  );

  return (
    <section id="services" className="relative scroll-mt-24 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <SectionHeading kicker={t.services.kicker} title={t.services.title} description={t.services.description} />

        <div className="grid grid-cols-1 gap-4 md:gap-5 lg:grid-cols-6">
          <Reveal className="lg:col-span-3">
            <SpotlightCard className="h-full">
              <div className="flex h-full flex-col gap-6 p-6 sm:p-8">
                <div className="rounded-2xl border border-white/5 bg-slate-950 p-4">
                  <CodeBlock lines={IOS_CODE} delay={0.2} />
                </div>
                <div>{cardBody('ios')}</div>
              </div>
            </SpotlightCard>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-3">
            <SpotlightCard className="h-full">
              <div className="flex h-full flex-col gap-6 p-6 sm:p-8">
                <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/5 bg-slate-950 p-4">
                    <CodeBlock lines={ANDROID_CODE} delay={0.2} />
                  </div>
                  <AndroidVisual />
                </div>
                <div>{cardBody('android')}</div>
              </div>
            </SpotlightCard>
          </Reveal>

          <Reveal delay={0.04} className="lg:col-span-2">
            <SpotlightCard className="h-full">
              <div className="flex h-full flex-col gap-6 p-6 sm:p-8">
                <FlutterVisual />
                <div>{cardBody('flutter')}</div>
              </div>
            </SpotlightCard>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-2">
            <SpotlightCard className="h-full">
              <div className="flex h-full flex-col gap-6 p-6 sm:p-8">
                <FlowVisual icons={[CreditCard, Shield, Check]} />
                <div>{cardBody('fintech')}</div>
              </div>
            </SpotlightCard>
          </Reveal>

          <Reveal delay={0.16} className="lg:col-span-2">
            <SpotlightCard className="h-full">
              <div className="flex h-full flex-col gap-6 p-6 sm:p-8">
                <FlowVisual icons={[Lightbulb, Rocket, Store]} />
                <div>{cardBody('mvp')}</div>
              </div>
            </SpotlightCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Services;
