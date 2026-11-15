import React from 'react';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import { useLanguage } from '../hooks/useLanguage';

// Technology names are not translated.
const TECH_STACK = ['Swift', 'SwiftUI', 'Flutter', 'Kotlin', 'Android', 'React', 'Firebase'];

const About: React.FC = () => {
  const { t } = useLanguage();
  const about = t.about;
  const [lead, ...rest] = about.paragraphs;
  const stats = [
    { value: about.stats.experience, label: about.statLabels.experience },
    { value: about.stats.specialization, label: about.statLabels.specialization },
  ];

  return (
    <section id="about" aria-labelledby="about-title" className="relative scroll-mt-24 py-[clamp(6rem,12vw,10rem)]">
      <div className="mx-auto w-full max-w-[80rem] px-4 sm:px-6 lg:px-10">
        <SectionHeading index="05" kicker={about.kicker} title={about.title} titleId="about-title" />

        <div className="grid grid-cols-1 gap-x-8 gap-y-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5 lg:self-start lg:sticky lg:top-28">
            <dl className="border-t border-line">
              {stats.map((stat) => (
                <div key={stat.label} className="border-b border-line py-6">
                  <dd className="font-display text-[clamp(3rem,2rem+3vw,4.5rem)] font-medium leading-none tracking-[-0.02em] text-ink">{stat.value}</dd>
                  <dt className="mt-3 font-mono text-[0.8125rem] font-medium uppercase leading-[1.2] tracking-[0.08em] text-ink-3">{stat.label}</dt>
                </div>
              ))}
            </dl>
            <p className="mt-6 flex items-start gap-3 text-[1.0625rem] leading-[1.6] text-ink-2">
              <span aria-hidden="true" className="mt-2 h-3 w-3 shrink-0 rounded-full border border-ink-2" />
              <span>
                <span className="font-semibold text-ink">{about.badgeTitle}.</span> {about.badgeText}
              </span>
            </p>
          </Reveal>

          <div className="lg:col-span-7">
            <Reveal>
              <p className="max-w-[62ch] text-[1.25rem] leading-[1.45] text-ink lg:text-[1.5rem]">{lead}</p>
            </Reveal>
            <div className="mt-8 space-y-6">
              {rest.map((paragraph, index) => (
                <Reveal key={index} delay={index * 0.06}>
                  <p className="max-w-[62ch] text-[1.1875rem] leading-[1.6] text-ink-2">{paragraph}</p>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-12 border-t border-line pt-6">
              <p className="text-[1.0625rem] leading-[1.6] text-ink">{about.education}</p>
            </Reveal>

            <Reveal className="mt-12">
              <h3 className="mb-4 font-mono text-[0.8125rem] font-medium uppercase leading-[1.2] tracking-[0.08em] text-ink-3">{about.stackTitle}</h3>
              <ul className="flex flex-wrap gap-2">
                {TECH_STACK.map((name) => (
                  <li key={name} className="rounded-full border border-line-strong px-3 py-1 font-mono text-[0.8125rem] leading-[1.4] text-ink-2">
                    {name}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
