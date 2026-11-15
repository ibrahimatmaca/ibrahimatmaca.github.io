import React from 'react';
import { ArrowUpRight, Download } from 'lucide-react';
import AppIcon from './AppIcon';
import Reveal from './Reveal';
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
  const featured = items.find((tool) => tool.icon);
  const downloadable = items.find((tool) => tool.downloadUrl);

  return (
    <section id="open-source" aria-labelledby="open-source-title" className="relative scroll-mt-24 py-[clamp(6rem,12vw,10rem)]">
      <div className="mx-auto w-full max-w-[80rem] px-4 sm:px-6 lg:grid lg:grid-cols-12 lg:gap-8 lg:px-10">
        <Reveal className="lg:col-span-5">
          <p className="mb-5 flex items-center gap-3 font-mono text-[0.8125rem] font-medium uppercase leading-[1.2] tracking-[0.08em] text-ink-3">
            <span className="text-tint">03</span>
            <span>{os.kicker}</span>
          </p>
          <h2 id="open-source-title" className="font-display text-[clamp(2.25rem,1.4rem+3.6vw,4.5rem)] font-medium leading-[1.02] tracking-[-0.02em] text-ink">
            {os.title}
          </h2>
          <p className="mt-6 max-w-[40rem] text-[1.0625rem] leading-[1.6] text-ink-2">{os.description}</p>

          {featured?.icon && <AppIcon src={featured.icon} name={featured.title} className="mt-10 h-24 w-24" />}

          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
            {downloadable?.downloadUrl ? (
              <a
                href={downloadable.downloadUrl}
                download
                aria-label={fill(os.downloadApp, { name: downloadable.title })}
                className="btn btn-secondary press"
              >
                <Download size={18} aria-hidden="true" />
                {os.download}
              </a>
            ) : (
              <span aria-disabled="true" className="btn btn-secondary">
                <Download size={18} aria-hidden="true" />
                {os.download}
                <span className="font-mono text-[0.8125rem] font-medium">{t.ui.comingSoon}</span>
              </span>
            )}
            <a href="https://github.com/ibrahimatmaca" target="_blank" rel="noopener noreferrer" className="text-link text-[1rem] font-semibold">
              {os.github}
            </a>
          </div>
        </Reveal>

        <ul className="mt-16 lg:col-span-7 lg:mt-0">
          {items.map((tool, index) => {
            const link = tool.githubUrl;
            return (
              <Reveal as="li" key={tool.id} delay={index * 0.06} className="border-t border-line last:border-b">
                <div className="grid grid-cols-1 gap-x-6 gap-y-3 py-8 sm:grid-cols-[1fr_auto]">
                  <div>
                    <h3 className="font-mono text-[1rem] font-semibold leading-[1.25] text-ink">{tool.title}</h3>
                    <p className="mt-3 max-w-[40rem] text-[1.0625rem] leading-[1.6] text-ink-2">{tool.description}</p>
                    <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[0.8125rem] leading-[1.4] text-ink-3">
                      {tool.tech.map((tech) => (
                        <li key={tech}>{tech}</li>
                      ))}
                    </ul>
                  </div>
                  {link && (
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${tool.title}: ${os.github}`}
                      className="press flex h-11 w-11 items-center justify-center rounded-full border border-line-strong text-ink hover:border-ink"
                    >
                      <ArrowUpRight size={20} aria-hidden="true" />
                    </a>
                  )}
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default OpenSource;
