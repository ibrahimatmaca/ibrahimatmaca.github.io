import React from 'react';
import { motion } from 'framer-motion';

type Token = [className: string, text: string];

interface CodeBlockProps {
  lines: Token[][];
  /** Seconds before the first line appears. */
  delay?: number;
  className?: string;
}

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

/** Syntax-colored code that reveals line by line the first time it is on screen. */
const CodeBlock: React.FC<CodeBlockProps> = ({ lines, delay = 0, className = '' }) => (
  <div
    aria-hidden="true"
    className={`overflow-hidden whitespace-pre font-mono text-[11px] leading-relaxed ${className}`}
  >
    {lines.map((line, lineIndex) => (
      <motion.div
        key={lineIndex}
        initial={{ opacity: 0, x: -6 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35, delay: delay + lineIndex * 0.12, ease: EASE_OUT }}
      >
        {line.map(([color, text], partIndex) => (
          <span key={partIndex} className={color}>
            {text}
          </span>
        ))}
      </motion.div>
    ))}
  </div>
);

export default CodeBlock;
