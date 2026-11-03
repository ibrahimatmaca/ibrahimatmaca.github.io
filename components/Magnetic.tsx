import React from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { FINE_POINTER, useMediaQuery } from '../hooks/useMediaQuery';

const SPRING = { stiffness: 200, damping: 18 };
const STRENGTH = 0.25;

/** Pulls its child toward a mouse pointer. Does nothing on touch screens. */
const Magnetic: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const finePointer = useMediaQuery(FINE_POINTER);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, SPRING);
  const springY = useSpring(y, SPRING);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!finePointer) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * STRENGTH);
    y.set((e.clientY - rect.top - rect.height / 2) * STRENGTH);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
};

export default Magnetic;
