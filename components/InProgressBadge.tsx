import React from 'react';

/** Text plus a dot, so the state never relies on colour alone. */
const InProgressBadge: React.FC<{ label: string }> = ({ label }) => (
  <span className="inline-flex items-center gap-2 rounded-full border border-line-strong px-3 py-1 font-mono text-[0.8125rem] font-medium leading-[1.2] text-ink-2">
    <span aria-hidden="true" className="h-2 w-2 rounded-full border border-ink-2" />
    {label}
  </span>
);

export default InProgressBadge;
