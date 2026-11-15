import React, { useState } from 'react';
import ProjectPlaceholder from './ProjectPlaceholder';

interface AppIconProps {
  src: string | null | undefined;
  name: string;
  /** Tailwind size classes, for example "h-24 w-24". */
  className: string;
  muted?: boolean;
  priority?: boolean;
}

/** App icon with the iOS corner ratio. Shows a skeleton while loading and a letter if it fails. */
const AppIcon: React.FC<AppIconProps> = ({ src, name, className, muted = false, priority = false }) => {
  const [state, setState] = useState<'loading' | 'ready' | 'failed'>('loading');

  if (!src || state === 'failed') return <ProjectPlaceholder title={name} className={className} />;

  return (
    <span className={`relative block shrink-0 overflow-hidden rounded-[22.37%] bg-raised ${state === 'loading' ? 'animate-pulse' : ''} ${className}`}>
      <img
        src={src}
        alt=""
        width={256}
        height={256}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setState('ready')}
        onError={() => setState('failed')}
        className={`h-full w-full object-cover transition-opacity duration-300 ${state === 'ready' ? 'opacity-100' : 'opacity-0'} ${muted ? 'saturate-[0.6]' : ''}`}
      />
    </span>
  );
};

export default AppIcon;
