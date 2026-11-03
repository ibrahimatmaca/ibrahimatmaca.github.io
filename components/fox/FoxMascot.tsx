import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  animate,
  motion,
  useAnimationFrame,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'framer-motion';
import FoxArt from './FoxArt';
import { FINE_POINTER, useMediaQuery } from '../../hooks/useMediaQuery';

const PERCH = '[data-fox-perch]';
const IDLE_MS = 6500;

/** True while the card the fox sits on is still comfortably on screen. */
function isOnScreen(perch: HTMLElement | null): boolean {
  if (!perch || !perch.isConnected) return false;
  const top = perch.getBoundingClientRect().top;
  return top > 70 && top < window.innerHeight - 60;
}
const EDGE = 12;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const random = (min: number, max: number) => min + Math.random() * (max - min);

/** Picks a random card or heading that is comfortably on screen. */
function pickPerch(exclude: HTMLElement | null, foxWidth: number): HTMLElement | null {
  const viewport = window.innerHeight;
  const candidates = Array.from(document.querySelectorAll<HTMLElement>(PERCH)).filter((element) => {
    if (element === exclude) return false;
    const rect = element.getBoundingClientRect();
    return rect.width > foxWidth + EDGE * 2 && rect.top > 100 && rect.top < viewport - 90;
  });
  return candidates.length ? candidates[Math.floor(Math.random() * candidates.length)] : null;
}

/**
 * A fox that hops onto random cards as the page scrolls, and watches the mouse.
 * It lives in page coordinates, so it scrolls along with the card it sits on.
 */
const FoxMascot: React.FC<{ active: boolean }> = ({ active }) => {
  const reduceMotion = useReducedMotion();
  const finePointer = useMediaQuery(FINE_POINTER);
  const isWide = useMediaQuery('(min-width: 768px)');
  const foxWidth = isWide ? 84 : 64;
  const foxHeight = (foxWidth * 100) / 130;

  const x = useMotionValue(-300);
  const y = useMotionValue(-300);
  const squashX = useMotionValue(1);
  const squashY = useMotionValue(1);
  const rawLookX = useMotionValue(0);
  const rawLookY = useMotionValue(0);
  const rawHead = useMotionValue(0);
  const lookX = useSpring(rawLookX, { stiffness: 220, damping: 22 });
  const lookY = useSpring(rawLookY, { stiffness: 220, damping: 22 });
  const headRotate = useSpring(rawHead, { stiffness: 140, damping: 16 });

  const foxRef = useRef<HTMLDivElement>(null);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isVisible, setIsVisible] = useState(false);
  const state = useRef({
    perch: null as HTMLElement | null,
    offset: 0,
    jumping: false,
    lastScrollY: 0,
    lastJumpAt: 0,
  });

  const { scrollY } = useScroll();
  const hopRef = useRef<() => void>(() => {});

  const targetFor = useCallback(
    (perch: HTMLElement, offset: number) => {
      const rect = perch.getBoundingClientRect();
      return { x: rect.left + window.scrollX + offset, y: rect.top + window.scrollY - foxHeight + 6 };
    },
    [foxHeight],
  );

  const hop = useCallback(() => {
    const s = state.current;
    if (s.jumping || !active) return;
    const perch = pickPerch(s.perch, foxWidth);
    if (!perch) return;

    const rect = perch.getBoundingClientRect();
    const offset = random(EDGE, Math.max(EDGE, rect.width - foxWidth - EDGE));
    const target = targetFor(perch, offset);
    const scroll = window.scrollY;

    // Start from where the fox is, or drop in from above the screen if it is out of sight.
    let fromX = x.get();
    let fromY = y.get();
    const currentTop = fromY - scroll;
    if (!s.perch || currentTop < -foxHeight || currentTop > window.innerHeight) {
      fromX = target.x + random(-140, 140);
      fromY = scroll - foxHeight - 40;
      x.set(fromX);
      y.set(fromY);
    }

    const dx = target.x - fromX;
    const distance = Math.hypot(dx, target.y - fromY);
    const duration = clamp(0.4 + distance / 3200, 0.45, 0.8);
    const apex = Math.min(fromY, target.y) - clamp(60 + Math.abs(dx) * 0.12, 60, 140);

    s.jumping = true;
    s.perch = perch;
    s.offset = offset;
    s.lastScrollY = scroll;
    s.lastJumpAt = performance.now();
    setDirection(dx >= 0 ? 1 : -1);
    setIsVisible(true);

    animate(squashY, [1, 0.82, 1.1, 1], { duration: 0.28, times: [0, 0.3, 0.6, 1] });
    animate(squashX, [1, 1.12, 0.94, 1], { duration: 0.28, times: [0, 0.3, 0.6, 1] });
    animate(x, target.x, { duration, ease: [0.4, 0, 0.6, 1] });
    animate(y, [fromY, apex, target.y], {
      duration,
      times: [0, 0.5, 1],
      ease: ['easeOut', 'easeIn'],
    }).then(() => {
      s.jumping = false;
      animate(squashY, [1, 0.84, 1], { duration: 0.3, ease: 'easeOut' });
      animate(squashX, [1, 1.12, 1], { duration: 0.3, ease: 'easeOut' });
      // The page may have scrolled on during the flight. Catch up right away.
      if (!isOnScreen(s.perch)) window.setTimeout(() => hopRef.current(), 0);
    });
  }, [active, foxHeight, foxWidth, squashX, squashY, targetFor, x, y]);

  useEffect(() => {
    hopRef.current = hop;
  }, [hop]);

  // A hop for every stretch of scrolling.
  useMotionValueEvent(scrollY, 'change', (value) => {
    if (reduceMotion || !active) return;
    const s = state.current;
    if (!finePointer) rawLookY.set(clamp((value - s.lastScrollY) / 60, -2, 2));
    // Hop as soon as the card it sits on scrolls away, or after a short stretch of scrolling.
    if (!s.jumping && (!isOnScreen(s.perch) || Math.abs(value - s.lastScrollY) > (isWide ? 240 : 180))) hop();
  });

  // First landing, and a hop now and then when the page is still.
  useEffect(() => {
    if (reduceMotion || !active) return;
    const timer = window.setInterval(() => {
      const s = state.current;
      if (document.hidden || s.jumping) return;
      if (!isOnScreen(s.perch) || performance.now() - s.lastJumpAt > IDLE_MS) hop();
    }, 700);
    return () => window.clearInterval(timer);
  }, [active, hop, reduceMotion]);

  // Eyes and head follow the mouse. When it is far off to one side, the fox turns to face it.
  useEffect(() => {
    if (reduceMotion || !finePointer) return;
    const handlePointerMove = (e: PointerEvent) => {
      const fox = foxRef.current;
      if (!fox) return;
      const rect = fox.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      const facing = state.current.jumping ? 0 : dx > 70 ? 1 : dx < -70 ? -1 : 0;
      if (facing) setDirection(facing);
      const side = facing || (direction as number);
      const length = Math.hypot(dx, dy) || 1;
      rawLookX.set((dx / length) * 2 * side);
      rawLookY.set((dy / length) * 1.8);
      rawHead.set(clamp(-(dy / 40) * side, -9, 9));
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [direction, finePointer, rawHead, rawLookX, rawLookY, reduceMotion]);

  // While sitting, stay glued to the card even if it moves or the layout changes.
  useAnimationFrame(() => {
    const s = state.current;
    if (reduceMotion || s.jumping || !s.perch) return;
    if (!s.perch.isConnected) {
      s.perch = null;
      return;
    }
    const target = targetFor(s.perch, s.offset);
    x.set(x.get() + (target.x - x.get()) * 0.3);
    y.set(y.get() + (target.y - y.get()) * 0.3);
  });

  if (reduceMotion) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-20 overflow-clip">
      <motion.div
        ref={foxRef}
        style={{ x, y, width: foxWidth, height: foxHeight, opacity: isVisible ? 1 : 0 }}
        className="absolute left-0 top-0"
      >
        <motion.div style={{ scaleX: squashX, scaleY: squashY, originY: 1 }} className="h-full w-full">
          <div className="h-full w-full" style={{ transform: `scaleX(${direction})` }}>
            <FoxArt lookX={lookX} lookY={lookY} headRotate={headRotate} className="h-full w-full drop-shadow-lg" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FoxMascot;
