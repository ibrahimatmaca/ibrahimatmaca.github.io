import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import ServiceArt from './services/ServiceArt';
import { DESKTOP, useMediaQuery } from '../hooks/useMediaQuery';
import { useLanguage } from '../hooks/useLanguage';
import { scrollToPosition } from '../lib/scroll';

// Technology names are not translated.
const TAGS: Record<string, string[]> = {
  ios: ['Swift', 'SwiftUI'],
  android: ['Kotlin', 'Compose'],
  flutter: ['Flutter'],
  fintech: ['Payments', 'POS'],
  mvp: ['App Store'],
};

const TILT_SPRING = { stiffness: 120, damping: 20, mass: 0.4 };
const numeral = (index: number) => String(index + 1).padStart(2, '0');

interface ItemData {
  id: string;
  title: string;
  text: string;
}

const TagList: React.FC<{ tags: string[]; className?: string }> = ({ tags, className = '' }) => (
  <ul className={`flex flex-wrap gap-x-4 gap-y-1 font-mono text-[0.8125rem] leading-[1.4] text-ink-3 ${className}`}>
    {tags.map((tag) => (
      <li key={tag}>{tag}</li>
    ))}
  </ul>
);

/** The drawing surface: hairline frame, dot grid, one illustration at a time. */
const Stage: React.FC<{ activeId: string; index: number; total: number; codebase: string; steps: string[]; tilt?: boolean }> = ({
  activeId,
  index,
  total,
  codebase,
  steps,
  tilt = false,
}) => {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, TILT_SPRING);
  const sy = useSpring(my, TILT_SPRING);
  const rotateY = useTransform(sx, (v) => v * 6);
  const rotateX = useTransform(sy, (v) => v * -5);
  const gridX = useTransform(sx, (v) => v * -14);
  const gridY = useTransform(sy, (v) => v * -14);
  const artX = useTransform(sx, (v) => v * 9);
  const artY = useTransform(sy, (v) => v * 9);
  const live = tilt && !reduce;

  const onMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!live || event.pointerType !== 'mouse') return;
    const box = event.currentTarget.getBoundingClientRect();
    mx.set((event.clientX - box.left) / box.width - 0.5);
    my.set((event.clientY - box.top) / box.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div onPointerMove={onMove} onPointerLeave={onLeave} className="relative aspect-[4/3] w-full [perspective:1100px]">
      <motion.div
        aria-hidden="true"
        style={live ? { rotateX, rotateY, transformStyle: 'preserve-3d' } : undefined}
        className="absolute inset-0 overflow-hidden rounded-3xl border border-line bg-canvas"
      >
        <motion.div
          style={live ? { x: gridX, y: gridY } : undefined}
          className="absolute -inset-6 opacity-70 [background-image:radial-gradient(rgb(var(--line))_1px,transparent_1.2px)] [background-size:22px_22px]"
        />
        <motion.div style={live ? { x: artX, y: artY } : undefined} className="absolute inset-[6%]">
          <AnimatePresence initial={false}>
            <motion.div
              key={activeId}
              className="absolute inset-0"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: reduce ? 0.12 : 0.2, ease: [0.77, 0, 0.175, 1] } }}
            >
              <ServiceArt id={activeId} codebase={codebase} steps={steps} />
            </motion.div>
          </AnimatePresence>
        </motion.div>
        <span className="absolute bottom-3 left-4 font-mono text-[0.8125rem] leading-[1.2] tracking-[0.08em] text-ink-3">
          <span className="text-tint">{numeral(index)}</span> / {numeral(total - 1)}
        </span>
      </motion.div>
    </div>
  );
};

/** Desktop: a list that scrolls past a sticky stage. The row in the middle of the screen is the active one. */
const DesktopStage: React.FC<{ items: ItemData[]; codebase: string; steps: string[] }> = ({ items, codebase, steps }) => {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const lastScroll = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      lastScroll.current = performance.now();
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="grid grid-cols-12 gap-x-8">
      <ol className="col-span-6 border-b border-line">
        {items.map((item, index) => (
          <DesktopRow
            key={item.id}
            item={item}
            index={index}
            active={active === index}
            reduce={!!reduce}
            tags={[...(TAGS[item.id] ?? []), ...(item.id === 'flutter' ? [codebase] : [])]}
            onActive={() => setActive(index)}
            onHover={() => {
              // A pointer that is only resting while the page scrolls under it must not take over.
              if (performance.now() - lastScroll.current > 250) setActive(index);
            }}
          />
        ))}
      </ol>
      <div className="col-span-6 col-start-7 hidden lg:block">
        <div className="sticky top-[max(6rem,calc(50svh-15rem))]">
          <Stage activeId={items[active].id} index={active} total={items.length} codebase={codebase} steps={steps} tilt />
        </div>
      </div>
    </div>
  );
};

const DesktopRow: React.FC<{
  item: ItemData;
  index: number;
  active: boolean;
  reduce: boolean;
  tags: string[];
  onActive: () => void;
  onHover: () => void;
}> = ({ item, index, active, reduce, tags, onActive, onHover }) => {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { margin: '-48% 0px -48% 0px' });

  useEffect(() => {
    if (inView) onActive();
    // onActive only closes over a stable setter.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  const jump = () => {
    onActive();
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.46;
    scrollToPosition(Math.max(0, top));
  };

  const move = reduce ? '' : 'translate-y-2';

  return (
    <li ref={ref} onPointerEnter={onHover} className="min-h-[36svh] border-t border-line py-8 first:border-t-0">
      <h3 className="font-display text-[clamp(1.75rem,1rem+1.6vw,2.5rem)] font-medium leading-[1.1] tracking-[-0.015em]">
        <button
          type="button"
          onClick={jump}
          onFocus={onActive}
          aria-current={active ? 'true' : undefined}
          className={`group -mx-2 flex min-h-11 w-[calc(100%+1rem)] items-baseline gap-5 rounded-lg px-2 text-left transition-colors duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-tint ${active ? 'text-ink' : 'text-ink-3 hover:text-ink-2'}`}
        >
          <span
            aria-hidden="true"
            className={`font-mono text-[0.8125rem] font-medium leading-[1.2] tracking-[0.08em] transition-colors duration-200 ${active ? 'text-tint' : 'text-ink-3'}`}
          >
            {numeral(index)}
          </span>
          <span>{item.title}</span>
        </button>
      </h3>
      <div
        className={`pl-[calc(1.25rem+1.4rem)] transition duration-300 ease-out ${active ? 'opacity-100' : `opacity-0 ${move}`}`}
      >
        <p className="mt-3 max-w-[30rem] text-[1.0625rem] leading-[1.6] text-ink-2">{item.text}</p>
        <TagList tags={tags} className="mt-4" />
        <span
          aria-hidden="true"
          className={`mt-6 block h-0.5 w-12 origin-left bg-tint transition-transform duration-500 ease-out ${active ? 'scale-x-100' : 'scale-x-0'}`}
        />
      </div>
    </li>
  );
};

/** Below 1024px: every service is a row with its drawing inline and no sticky stage. */
const StackedList: React.FC<{ items: ItemData[]; codebase: string; steps: string[] }> = ({ items, codebase, steps }) => (
  <ol>
    {items.map((item, index) => {
      const tags = [...(TAGS[item.id] ?? []), ...(item.id === 'flutter' ? [codebase] : [])];
      return (
        <StackedRow key={item.id} index={index} item={item} tags={tags} total={items.length} codebase={codebase} steps={steps} />
      );
    })}
  </ol>
);

const StackedRow: React.FC<{ item: ItemData; index: number; total: number; tags: string[]; codebase: string; steps: string[] }> = ({
  item,
  index,
  total,
  tags,
  codebase,
  steps,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  // Draw each illustration when it scrolls into view, and again only on a fresh mount.
  const seen = useInView(ref, { once: true, margin: '0px 0px -15% 0px' });

  return (
    <Reveal as="li" className="border-t border-line py-8 first:border-t-0 last:border-b md:py-10">
      <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2 md:items-center">
        <div>
          <h3 className="flex items-baseline gap-4 font-display text-[1.75rem] font-medium leading-[1.15] tracking-[-0.01em] text-ink">
            <span aria-hidden="true" className="font-mono text-[0.8125rem] font-medium leading-[1.2] tracking-[0.08em] text-tint">
              {numeral(index)}
            </span>
            <span>{item.title}</span>
          </h3>
          <p className="mt-3 max-w-[30rem] text-[1.0625rem] leading-[1.6] text-ink-2">{item.text}</p>
          <TagList tags={tags} className="mt-4" />
        </div>
        <div ref={ref} className="w-full max-w-[30rem] md:justify-self-end">
          {seen ? (
            <Stage activeId={item.id} index={index} total={total} codebase={codebase} steps={steps} />
          ) : (
            <div aria-hidden="true" className="aspect-[4/3] w-full" />
          )}
        </div>
      </div>
    </Reveal>
  );
};

const Services: React.FC = () => {
  const { t } = useLanguage();
  const desktop = useMediaQuery(DESKTOP);
  const items = t.services.items as ItemData[];

  return (
    <section id="services" aria-labelledby="services-title" className="relative scroll-mt-24 py-[clamp(6rem,12vw,10rem)]">
      <div className="mx-auto w-full max-w-[80rem] px-4 sm:px-6 lg:px-10">
        <SectionHeading index="01" kicker={t.services.kicker} title={t.services.title} titleId="services-title" description={t.services.description} />
        {desktop ? (
          <DesktopStage items={items} codebase={t.services.codebase} steps={t.services.steps} />
        ) : (
          <StackedList items={items} codebase={t.services.codebase} steps={t.services.steps} />
        )}
      </div>
    </section>
  );
};

export default Services;
