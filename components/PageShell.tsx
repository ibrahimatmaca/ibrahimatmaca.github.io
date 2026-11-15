import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SiteNav from './SiteNav';
import SiteFooter from './SiteFooter';
import { Theme } from '../hooks/useTheme';

interface PageShellProps {
  /** Mono label above the title: "Support", "Legal", "404". */
  eyebrow: string;
  title: string;
  /** Short supporting text under the title. */
  lead?: React.ReactNode;
  children: React.ReactNode;
  /** `narrow` is 46rem for reading, `wide` is 64rem. */
  width?: 'narrow' | 'wide';
  nav?: { theme: Theme; onToggleTheme: () => void };
}

/** Shared look for Support and the legal pages: flat canvas, eyebrow, serif H1, hairline. */
const PageShell: React.FC<PageShellProps> = ({ eyebrow, title, lead, children, width = 'narrow', nav }) => {
  const reduce = useReducedMotion();

  return (
    <div className="relative min-h-svh font-sans text-ink antialiased selection:bg-tint/25">
      <SiteNav mode="page" {...nav} />

      <main id="main" tabIndex={-1} className="relative outline-none">
        <div className="mx-auto w-full max-w-[80rem] px-4 pb-24 pt-32 sm:px-6 lg:px-10">
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0.2 : 0.32, ease: [0.23, 1, 0.32, 1] }}
            className={width === 'wide' ? 'max-w-[64rem]' : 'max-w-[46rem]'}
          >
            <p className="mb-5 font-mono text-[0.8125rem] font-medium uppercase leading-[1.2] tracking-[0.08em] text-ink-3">
              {eyebrow}
            </p>
            <h1 className="font-display text-[clamp(3rem,2rem+3vw,4.5rem)] font-medium leading-[1] tracking-[-0.03em] text-ink">
              {title}
            </h1>
            {lead && <div className="mt-6 text-[1.25rem] leading-[1.45] text-ink-2">{lead}</div>}
            <div className="mb-10 mt-10 h-px bg-line" />
            {children}
          </motion.div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
};

export default PageShell;
