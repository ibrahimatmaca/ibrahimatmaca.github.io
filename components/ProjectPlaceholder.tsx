import React from 'react';

interface ProjectPlaceholderProps {
  title: string;
  className?: string;
}

/** Stand-in for a missing app icon: the first letter, in serif, on a raised field. */
const ProjectPlaceholder: React.FC<ProjectPlaceholderProps> = ({ title, className = '' }) => (
  <div
    className={`flex items-center justify-center rounded-[22.37%] bg-raised font-display font-medium text-ink [container-type:inline-size] ${className}`}
    aria-hidden="true"
  >
    <span className="text-[52cqw] leading-none">{title.charAt(0).toUpperCase()}</span>
  </div>
);

export default ProjectPlaceholder;
