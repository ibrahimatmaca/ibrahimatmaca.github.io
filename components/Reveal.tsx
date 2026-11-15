import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Seconds. Use `index * 0.06` for a stagger. */
  delay?: number;
  as?: 'div' | 'li';
}

/** Fades content up the first time it scrolls into view. Opacity only when motion is reduced. */
const Reveal: React.FC<RevealProps> = ({ children, className, delay = 0, as = 'div' }) => {
  const reduce = useReducedMotion();
  const Component = as === 'li' ? motion.li : motion.div;

  return (
    <Component
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: reduce ? 0.2 : 0.5, delay: reduce ? 0 : Math.min(delay, 0.3), ease: [0.23, 1, 0.32, 1] }}
      className={className}
    >
      {children}
    </Component>
  );
};

export default Reveal;
