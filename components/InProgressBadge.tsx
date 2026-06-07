import React from 'react';

const InProgressBadge: React.FC = () => (
  <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-400 sm:text-xs">
    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400" />
    In Progress
  </span>
);

export default InProgressBadge;
