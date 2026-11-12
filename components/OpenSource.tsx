import React from 'react';
import { ArrowUpRight, Download, Github } from 'lucide-react';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import SpotlightCard from './SpotlightCard';
import { useLanguage } from '../hooks/useLanguage';
import { fill } from '../lib/i18n';

interface Tool {
  id: string;
  title: string;
  description: string;
  tech: string[];
  icon?: string;
  downloadUrl?: string;
  githubUrl?: string;
}

const OpenSource: React.FC = () => {
  const { t } = useLanguage();
  const os = t.openSource;
  const items = os.items as Tool[];

  return (
    <section className="relative scroll-mt-24 py-16 md:py-24" id="open-source">
      <div className="container mx-auto px-4">
        <SectionHeading kicker={os.kicker} title={os.title} description={os.description} />
        <div className="flex flex-col gap-4 md:gap-6">
          {items.map((tool, index) => (
            <Reveal key={tool.id} delay={index * 0.08}>
              <SpotlightCard>
                <div className="flex flex-col gap-6 p-5 sm:p-7 md:flex-row md:items-center md:justify-between">
                  <div className="flex min-w-0 gap-5 md:max-w-2xl">
                    {tool.icon && (
                      <div className="relative flex-shrink-0">
                        <div aria-hidden="true" className="absolute inset-2 rounded-[22%] bg-tint/30 blur-2xl" />
                        <img
                          src={tool.icon}
                          alt=""
                          width={112}
                          height={112}
                          loading="lazy"
                          className="relative h-20 w-20 rounded-[22%] shadow-xl sm:h-28 sm:w-28"
                        />
                      </div>
                    )}
                    <div className="min-w-0">
                      <h3 className="mb-2 text-xl font-bold text-ink sm:text-2xl">{tool.title}</h3>
                      <p className="mb-4 text-sm text-ink-2 sm:text-base">{tool.description}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {tool.tech.map((tech) => (
                          <span key={tech} className="rounded-full bg-raised px-2.5 py-1 text-xs text-ink-2">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {tool.downloadUrl && (
                    <a
                      href={tool.downloadUrl}
                      download
                      aria-label={fill(os.downloadApp, { name: tool.title })}
                      className="glass-button press group relative flex min-h-12 flex-shrink-0 items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-full px-6 py-3 text-sm font-semibold text-ink"
                    >
                      <Download size={18} className="transition-transform duration-200 group-hover:translate-y-0.5" aria-hidden="true" />
                      <span>{os.download}</span>
                    </a>
                  )}
                  {tool.githubUrl && (
                    <a
                      href={tool.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="press flex min-h-11 flex-shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-fill px-5 py-2 text-sm font-semibold text-on-fill"
                    >
                      <Github size={18} aria-hidden="true" />
                      <span>{os.github}</span>
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                  )}
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OpenSource;
