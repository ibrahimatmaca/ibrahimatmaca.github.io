import React, { useEffect } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import FoxArt from './FoxArt';

const SPLASH_MS = 2000;

/** Opening screen: the fox runs in, sits, and the page opens. Click or press a key to skip. */
const FoxSplash: React.FC<{ onDone: () => void }> = ({ onDone }) => {
  const still = useMotionValue(0);

  useEffect(() => {
    const timer = window.setTimeout(onDone, SPLASH_MS);
    window.addEventListener('keydown', onDone);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('keydown', onDone);
    };
  }, [onDone]);

  return (
    <motion.div
      aria-hidden="true"
      onClick={onDone}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
      className="fixed inset-0 z-[100] flex cursor-pointer flex-col items-center justify-center bg-canvas"
    >
      <motion.div
        initial={{ x: '-70vw' }}
        animate={{ x: 0 }}
        transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
      >
        {/* Bobs while it runs in, then settles. */}
        <motion.div
          animate={{ y: [0, -14, 0, -14, 0, -8, 0] }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
          style={{ originY: 1 }}
        >
          <FoxArt lookX={still} lookY={still} headRotate={still} className="h-28 w-36 drop-shadow-xl sm:h-36 sm:w-48" />
        </motion.div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7, ease: [0.23, 1, 0.32, 1] }}
        className="mt-6 font-mono text-xl font-bold tracking-tighter text-ink"
      >
        IBRAHIM<span className="text-tint">DEV</span>
      </motion.p>

      <div className="mt-5 h-0.5 w-32 overflow-hidden rounded-full bg-line">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: SPLASH_MS / 1000 - 0.2, ease: 'linear' }}
          className="h-full origin-left bg-tint"
        />
      </div>
    </motion.div>
  );
};

export default FoxSplash;
