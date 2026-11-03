import React from 'react';
import { motion } from 'framer-motion';
import Aurora from '../Aurora';
import SiteNav from '../SiteNav';
import SiteFooter from '../SiteFooter';

// Typography for the legal text. Only the look lives here, the text itself comes in through `html`.
const baseClassName =
  'overflow-x-auto rounded-3xl border border-line bg-surface/70 p-6 shadow-2xl backdrop-blur-xl sm:p-8 md:p-12 max-w-none ' +
  '[&_h1]:hidden ' +
  '[&_h2]:mb-6 [&_h2]:mt-12 [&_h2]:border-b [&_h2]:border-line [&_h2]:pb-3 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:leading-tight [&_h2]:tracking-tight [&_h2]:text-ink [&_h2]:first:mt-0 [&_h2]:md:text-3xl ' +
  '[&_h3]:mb-4 [&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:leading-tight [&_h3]:text-ink [&_h3]:md:text-2xl ' +
  '[&_h5]:mb-4 [&_h5]:mt-8 [&_h5]:border-b [&_h5]:border-line [&_h5]:pb-2 [&_h5]:text-xl [&_h5]:font-semibold [&_h5]:leading-tight [&_h5]:text-ink [&_h5]:md:text-2xl ' +
  '[&_p]:mb-6 [&_p]:text-base [&_p]:leading-relaxed [&_p]:text-ink-2 [&_p]:md:text-lg ' +
  '[&_ul]:mb-8 [&_ul]:ml-4 [&_ul]:list-inside [&_ul]:list-disc [&_ul]:space-y-3 [&_ul]:text-ink-2 [&_ul]:md:ml-6 ' +
  '[&_li]:mb-2 [&_li]:text-base [&_li]:leading-relaxed [&_li]:text-ink-2 [&_li]:md:text-lg ' +
  '[&_strong]:font-semibold [&_strong]:text-ink ' +
  '[&_em]:italic [&_em]:text-ink-3 ' +
  '[&_a]:text-tint [&_a]:underline [&_a]:decoration-tint/40 [&_a]:underline-offset-4 [&_a]:transition-colors [&_a]:hover:decoration-tint';

const tableClassName =
  ' [&_table]:my-6 [&_table]:w-full [&_table]:border-collapse [&_table]:text-sm [&_table]:md:text-base ' +
  '[&_thead]:bg-raised ' +
  '[&_th]:border [&_th]:border-line [&_th]:p-3 [&_th]:text-left [&_th]:align-top [&_th]:font-semibold [&_th]:text-ink ' +
  '[&_td]:border [&_td]:border-line [&_td]:p-3 [&_td]:align-top [&_td]:text-ink-2';

interface LegalShellProps {
  title: string;
  html: string;
  /** Extra controls shown between the title and the text, such as a language switch. */
  toolbar?: React.ReactNode;
  tables?: boolean;
}

/** Shared page frame for the privacy and terms pages. It only styles the text it is given. */
const LegalShell: React.FC<LegalShellProps> = ({ title, html, toolbar, tables = false }) => (
  <div className="min-h-svh font-sans text-ink antialiased selection:bg-brand-500/30">
    <Aurora />
    <SiteNav mode="page" />

    <main className="relative">
      <section className="relative min-h-svh py-32">
        <div className="container mx-auto w-full max-w-4xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="mb-12 text-center"
          >
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-ink md:text-5xl">{title}</h1>
            <div className="mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-brand-400 to-violet-400" />
          </motion.div>

          {toolbar}

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            className={baseClassName + (tables ? tableClassName : '')}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </section>
    </main>

    <SiteFooter />
  </div>
);

export default LegalShell;
