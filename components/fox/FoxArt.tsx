import React from 'react';
import { motion, MotionValue } from 'framer-motion';

interface FoxArtProps {
  /** Where the pupils look, in SVG units. */
  lookX: MotionValue<number>;
  lookY: MotionValue<number>;
  /** Head tilt in degrees. */
  headRotate: MotionValue<number>;
  className?: string;
}

const ORANGE = '#f97316';
const ORANGE_DARK = '#ea580c';
const CREAM = '#fff7ed';
const BROWN = '#7c2d12';

/** A fox facing right. Mirror it with CSS to face left. */
const FoxArt: React.FC<FoxArtProps> = ({ lookX, lookY, headRotate, className }) => (
  <svg viewBox="0 0 130 100" className={className} aria-hidden="true">
    {/* Tail */}
    <g className="fox-tail">
      <path d="M34 70 C8 70 2 40 18 26 C18 42 30 50 44 58 Z" fill={ORANGE} />
      <path d="M18 26 C10 30 6 40 8 48 C14 42 20 40 26 42 C24 36 22 30 18 26 Z" fill={CREAM} />
    </g>

    {/* Back legs */}
    <rect x="42" y="78" width="8" height="18" rx="4" fill={BROWN} />
    <rect x="54" y="80" width="8" height="16" rx="4" fill={BROWN} />

    {/* Body */}
    <ellipse cx="64" cy="68" rx="30" ry="19" fill={ORANGE} />
    <ellipse cx="84" cy="74" rx="12" ry="11" fill={CREAM} />

    {/* Front legs */}
    <rect x="78" y="80" width="8" height="16" rx="4" fill={BROWN} />
    <rect x="90" y="80" width="8" height="16" rx="4" fill={BROWN} />

    {/* Head */}
    <motion.g style={{ rotate: headRotate, originX: 0.7, originY: 0.9 }}>
      <path d="M78 38 L80 12 L95 30 Z" fill={ORANGE_DARK} />
      <path d="M82 30 L82.5 19 L90 28 Z" fill={BROWN} />
      <path d="M92 30 L106 10 L110 36 Z" fill={ORANGE_DARK} />
      <path d="M97 31 L105 18 L106 32 Z" fill={BROWN} />
      <ellipse cx="94" cy="48" rx="21" ry="17" fill={ORANGE} />
      <path d="M104 42 L125 54 L106 63 Z" fill={ORANGE} />
      <path d="M86 58 C94 68 108 66 114 58 C104 55 94 54 86 58 Z" fill={CREAM} />
      <circle cx="125" cy="54" r="3.2" fill={BROWN} />
      <g className="fox-eye">
        <circle cx="100" cy="46" r="4.6" fill="white" />
        <motion.circle cx="100" cy="46" r="2.4" fill={BROWN} style={{ x: lookX, y: lookY }} />
      </g>
    </motion.g>
  </svg>
);

export default FoxArt;
