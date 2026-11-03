import React, { useEffect, useRef } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import SpotlightCard from './SpotlightCard';
import { useLanguage } from '../hooks/useLanguage';

const techStack = [
  {
    name: 'Swift',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/swift/swift-original.svg',
    color: 'from-orange-500 to-red-500'
  },
  {
    name: 'Flutter',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/flutter/flutter-original.svg',
    color: 'from-blue-400 to-cyan-500'
  },
  {
    name: 'Android',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/android/android-original.svg',
    color: 'from-green-400 to-emerald-500'
  },
  {
    name: 'Kotlin',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/kotlin/kotlin-original.svg',
    color: 'from-purple-500 to-pink-500'
  },
  {
    name: 'React',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/react/react-original.svg',
    color: 'from-cyan-400 to-blue-500'
  },
  {
    name: 'Firebase',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/firebase/firebase-plain.svg',
    color: 'from-yellow-500 to-orange-500'
  }
];

const statValueClassName =
  'font-bold mb-1 bg-gradient-to-r from-brand-700 to-brand-500 dark:from-brand-400 dark:to-brand-600 bg-clip-text text-transparent';

// Counts up to a value such as "5+" the first time it scrolls into view.
const CountUp: React.FC<{ value: string; className?: string }> = ({ value, className }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const reduceMotion = useReducedMotion();
  const target = parseInt(value, 10);
  const suffix = value.replace(/^\d+/, '');

  useEffect(() => {
    if (!inView || reduceMotion || Number.isNaN(target)) return;
    const controls = animate(0, target, {
      duration: 1.2,
      ease: [0.23, 1, 0.32, 1],
      onUpdate: (latest) => {
        if (ref.current) ref.current.textContent = `${Math.round(latest)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, reduceMotion, target, suffix]);

  return <div ref={ref} className={className}>{value}</div>;
};

const TechTile: React.FC<{ tech: (typeof techStack)[number]; decorative?: boolean }> = ({ tech, decorative }) => (
  <div className="flex w-24 sm:w-28 shrink-0 flex-col items-center gap-2 rounded-xl border border-line bg-raised/60 p-3 sm:p-4">
    <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-gradient-to-br ${tech.color} p-0.5 shadow-lg`}>
      <div className="w-full h-full bg-white dark:bg-slate-900 rounded-[7px] flex items-center justify-center p-2">
        <img
          src={tech.icon}
          alt=""
          width={40}
          height={40}
          loading="lazy"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
    <span aria-hidden={decorative} className="text-xs font-semibold text-ink text-center">{tech.name}</span>
  </div>
);

const About: React.FC = () => {
  const { t } = useLanguage();
  const about = t.about;

  return (
    <section id="about" className="container mx-auto scroll-mt-24 px-4 py-16 md:py-24">
      <SectionHeading kicker={about.kicker} title={about.title} />

      <div className="grid grid-cols-1 gap-4 md:gap-5 lg:grid-cols-6">
        <Reveal className="lg:col-span-4">
          <SpotlightCard className="h-full">
            <div className="p-6 sm:p-8 md:p-10">
              <div className="space-y-5 text-base leading-relaxed text-ink-2 md:text-lg">
                {about.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <p className="mt-6 text-lg font-bold text-tint">{about.education}</p>
            </div>
          </SpotlightCard>
        </Reveal>

        <div className="grid grid-cols-2 gap-4 md:gap-5 lg:col-span-2 lg:grid-cols-1">
          <Reveal delay={0.1}>
            <SpotlightCard className="h-full">
              <div className="p-5 md:p-7">
                <CountUp value={about.stats.experience} className={`text-5xl ${statValueClassName}`} />
                <div className="text-xs font-medium uppercase tracking-wider text-ink-2">{about.statLabels.experience}</div>
              </div>
            </SpotlightCard>
          </Reveal>

          <Reveal delay={0.18}>
            <SpotlightCard className="h-full">
              <div className="p-5 md:p-7">
                <div className={`text-4xl ${statValueClassName}`}>{about.stats.specialization}</div>
                <div className="text-xs font-medium uppercase tracking-wider text-ink-2">{about.statLabels.specialization}</div>
              </div>
            </SpotlightCard>
          </Reveal>

          <Reveal delay={0.26} className="col-span-2 lg:col-span-1">
            <SpotlightCard className="h-full">
              <div className="flex items-center gap-3 p-5 md:p-7">
                <div className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-green-500" />
                <div>
                  <div className="text-lg font-bold text-ink">{about.badgeTitle}</div>
                  <div className="text-sm text-ink-2">{about.badgeText}</div>
                </div>
              </div>
            </SpotlightCard>
          </Reveal>
        </div>

        <Reveal className="lg:col-span-6">
          <SpotlightCard>
            <div className="p-6 sm:p-8">
              <h3 className="mb-4 text-xl font-bold text-ink">{about.stackTitle}</h3>
              <div className="marquee -mx-2">
                <div className="marquee-track">
                  {[0, 1].map((group) => (
                    <div key={group} aria-hidden={group === 1} className={`flex gap-3 pr-3 motion-reduce:flex-wrap ${group === 1 ? 'marquee-clone' : ''}`}>
                      {techStack.map((tech) => (
                        <TechTile key={tech.name} tech={tech} decorative={group === 1} />
                      ))}
                      {/* Repeated so one group is always wider than the container. */}
                      {techStack.map((tech) => (
                        <div key={`${tech.name}-repeat`} aria-hidden="true" className="marquee-clone">
                          <TechTile tech={tech} decorative />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SpotlightCard>
        </Reveal>
      </div>
    </section>
  );
};

export default About;
