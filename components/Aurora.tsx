import React from 'react';

// Position, size and drift of each blob. Sizes use vmax so the glow scales with the screen.
const BLOBS = [
  { color: '--aurora-1', size: '62vmax', pos: { top: '-22vmax', left: '-16vmax' }, x: '12vmax', y: '8vmax', d: '26s' },
  { color: '--aurora-2', size: '56vmax', pos: { top: '8vmax', right: '-22vmax' }, x: '-10vmax', y: '12vmax', d: '32s' },
  { color: '--aurora-3', size: '52vmax', pos: { bottom: '-26vmax', left: '8vmax' }, x: '14vmax', y: '-10vmax', d: '30s' },
  { color: '--aurora-4', size: '40vmax', pos: { top: '42vh', left: '32vw' }, x: '-12vmax', y: '-6vmax', d: '38s' },
];

/** Soft moving color behind the page. Follows the theme tokens, so it works in light and dark. */
const Aurora: React.FC = () => (
  <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
    {BLOBS.map(({ color, size, pos, x, y, d }) => (
      <div
        key={color}
        className="aurora-blob"
        style={
          {
            ...pos,
            width: size,
            height: size,
            '--c': `var(${color})`,
            '--x': x,
            '--y': y,
            '--d': d,
          } as unknown as React.CSSProperties
        }
      />
    ))}
    <div className="aurora-grid absolute inset-0" />
    <div className="aurora-grain absolute inset-0" />
  </div>
);

export default Aurora;
