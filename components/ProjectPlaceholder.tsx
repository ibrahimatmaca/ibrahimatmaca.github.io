import React from 'react';
import { Sparkles } from 'lucide-react';

interface ProjectPlaceholderProps {
  title: string;
  className?: string;
}

const ProjectPlaceholder: React.FC<ProjectPlaceholderProps> = ({ title, className = '' }) => {
  const initial = title.charAt(0).toUpperCase();

  return (
    <div
      className={`relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-slate-600/40 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 shadow-lg ${className}`}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.12),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(99,102,241,0.1),transparent_45%)]" />
      <Sparkles className="relative mb-1 h-4 w-4 text-brand-400/70" strokeWidth={1.5} />
      <span className="relative text-2xl font-bold text-slate-300 sm:text-3xl">{initial}</span>
    </div>
  );
};

export default ProjectPlaceholder;
