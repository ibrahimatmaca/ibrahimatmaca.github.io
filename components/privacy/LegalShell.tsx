import React, { useEffect, useRef } from 'react';
import PageShell from '../PageShell';

// Typography for the legal text. Only the look lives here, the text itself comes in through `html`.
const baseClassName =
  'max-w-[68ch] ' +
  '[&_h1]:hidden ' +
  '[&_h2]:mb-4 [&_h2]:mt-12 [&_h2]:scroll-mt-24 [&_h2]:border-t [&_h2]:border-line [&_h2]:pt-8 [&_h2]:font-sans [&_h2]:text-[1.5rem] [&_h2]:font-semibold [&_h2]:leading-tight [&_h2]:text-ink [&_h2]:first:mt-0 [&_h2]:first:border-t-0 [&_h2]:first:pt-0 [&_h2]:md:text-[1.75rem] ' +
  '[&_h3]:mb-3 [&_h3]:mt-8 [&_h3]:scroll-mt-24 [&_h3]:text-[1.25rem] [&_h3]:font-semibold [&_h3]:leading-tight [&_h3]:text-ink ' +
  '[&_h5]:mb-3 [&_h5]:mt-8 [&_h5]:scroll-mt-24 [&_h5]:border-t [&_h5]:border-line [&_h5]:pt-6 [&_h5]:text-[1.25rem] [&_h5]:font-semibold [&_h5]:leading-tight [&_h5]:text-ink ' +
  '[&_p]:mb-5 [&_p]:text-[1.0625rem] [&_p]:leading-[1.7] [&_p]:text-ink-2 [&_p]:md:text-[1.125rem] ' +
  '[&_ul]:mb-6 [&_ul]:list-outside [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_ul]:text-ink-2 ' +
  '[&_li]:text-[1.0625rem] [&_li]:leading-[1.7] [&_li]:text-ink-2 [&_li]:md:text-[1.125rem] ' +
  '[&_strong]:font-semibold [&_strong]:text-ink ' +
  '[&_em]:italic [&_em]:text-ink-3 ' +
  '[&_a]:text-tint [&_a]:underline [&_a]:decoration-1 [&_a]:underline-offset-4';

const tableClassName =
  ' [&_table]:my-6 [&_table]:block [&_table]:max-w-full [&_table]:overflow-x-auto [&_table]:border-collapse [&_table]:text-[1rem] ' +
  '[&_th]:border [&_th]:border-line [&_th]:bg-raised [&_th]:p-3 [&_th]:text-left [&_th]:align-top [&_th]:font-semibold [&_th]:text-ink ' +
  '[&_td]:border [&_td]:border-line [&_td]:p-3 [&_td]:align-top [&_td]:text-ink-2';

interface LegalShellProps {
  title: string;
  html: string;
  /** Extra controls shown between the title and the text, such as a language switch. */
  toolbar?: React.ReactNode;
  tables?: boolean;
}

/** Shared page frame for the privacy and terms pages. It only styles the text it is given. */
const LegalShell: React.FC<LegalShellProps> = ({ title, html, toolbar, tables = false }) => {
  const bodyRef = useRef<HTMLDivElement>(null);

  // Wide tables scroll sideways, so they must be reachable and named for keyboard and screen reader users.
  useEffect(() => {
    bodyRef.current?.querySelectorAll('table').forEach((table) => {
      table.setAttribute('tabindex', '0');
      table.setAttribute('role', 'region');
      table.setAttribute('aria-label', title);
    });
  }, [html, title]);

  return (
    <PageShell eyebrow="Legal" title={title}>
      {toolbar && <div className="mb-10 [&>div]:justify-start">{toolbar}</div>}
      <div ref={bodyRef} className={baseClassName + (tables ? tableClassName : '')} dangerouslySetInnerHTML={{ __html: html }} />
    </PageShell>
  );
};

export default LegalShell;
