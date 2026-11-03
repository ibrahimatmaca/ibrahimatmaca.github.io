import React, { useRef } from 'react';

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
}

/** Glass card with a soft light that follows a mouse pointer. Touch and pen get a plain card. */
const SpotlightCard: React.FC<SpotlightCardProps> = ({ children, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const card = ref.current;
    if (!card || e.pointerType !== 'mouse') return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    card.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      data-fox-perch
      onPointerMove={handlePointerMove}
      className={`group relative overflow-hidden rounded-3xl border border-line bg-surface/60 backdrop-blur-md ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgb(var(--tint) / 0.16), transparent 60%)',
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
};

export default SpotlightCard;
