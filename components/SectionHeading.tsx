import React from 'react';
import Reveal from './Reveal';

interface SectionHeadingProps {
  /** Section number, shown in the accent colour: "01". */
  index?: string;
  kicker: string;
  title: string;
  titleId?: string;
  description?: string;
}

/** Eyebrow, serif H2 and supporting text. The text sits in the right columns from 1024px. */
const SectionHeading: React.FC<SectionHeadingProps> = ({ index, kicker, title, titleId, description }) => (
  <Reveal className="mb-12 grid grid-cols-1 gap-x-8 gap-y-6 lg:mb-16 lg:grid-cols-12">
    <div className="lg:col-span-8">
      <p data-fox-avoid className="mb-5 flex items-center gap-3 font-mono text-[0.8125rem] font-medium uppercase leading-[1.2] tracking-[0.08em] text-ink-3">
        {index && <span className="text-tint">{index}</span>}
        <span>{kicker}</span>
      </p>
      <h2
        id={titleId}
        data-fox-perch
        className="font-display text-[clamp(2.25rem,1.4rem+3.6vw,4.5rem)] font-medium leading-[1.02] tracking-[-0.02em] text-ink"
      >
        {title}
      </h2>
    </div>
    {description && (
      <p className="max-w-[40rem] text-[1.0625rem] leading-[1.6] text-ink-2 lg:col-span-4 lg:self-end">{description}</p>
    )}
  </Reveal>
);

export default SectionHeading;
