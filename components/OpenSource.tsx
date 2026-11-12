import React from 'react';
import { ArrowUpRight, Github } from 'lucide-react';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import SpotlightCard from './SpotlightCard';
import { useLanguage } from '../hooks/useLanguage';

const OpenSource: React.FC = () => {
  const { t } = useLanguage();
  const os = t.openSource;

  return (
    <section className="relative scroll-mt-24 py-16 md:py-24" id="open-source">
      <div className="container mx-auto px-4">
        <SectionHeading kicker={os.kicker} title={os.title} />
        <Reveal>
          <SpotlightCard>
            <div className="flex flex-col gap-6 p-5 sm:p-7 md:flex-row md:items-center md:justify-between">
              <div className="min-w-0 md:max-w-2xl">
                <p className="mb-4 text-base text-ink-2 sm:text-lg">{os.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {os.tech.map((tech) => (
                    <span key={tech} className="rounded-full bg-raised px-2.5 py-1 text-xs text-ink-2">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <a
                href={os.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="press flex min-h-11 flex-shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-fill px-5 py-2 text-sm font-semibold text-on-fill"
              >
                <Github size={18} aria-hidden="true" />
                <span>{os.github}</span>
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </div>
          </SpotlightCard>
        </Reveal>
      </div>
    </section>
  );
};

export default OpenSource;
