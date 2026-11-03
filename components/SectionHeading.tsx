import React from 'react';
import Reveal from './Reveal';

interface SectionHeadingProps {
  kicker: string;
  title: string;
  description?: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ kicker, title, description }) => (
  <Reveal className="mb-10 max-w-3xl md:mb-14">
    <p className="mb-3 flex items-center gap-3 font-mono text-sm uppercase tracking-widest text-tint">
      <span className="h-px w-10 bg-tint" aria-hidden="true" />
      {kicker}
    </p>
    <h2 className="mb-4 text-3xl font-bold leading-tight tracking-[-0.02em] text-ink sm:text-4xl md:text-5xl">{title}</h2>
    {description && <p className="text-lg text-ink-2">{description}</p>}
  </Reveal>
);

export default SectionHeading;
