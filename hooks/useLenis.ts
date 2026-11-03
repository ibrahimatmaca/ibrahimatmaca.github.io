import { useEffect } from 'react';
import Lenis from 'lenis';
import { setLenis } from '../lib/scroll';

/** Smooth, momentum scrolling for the page that calls it. Off when the user asks for less motion. */
export function useLenis(): void {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({ autoRaf: true, lerp: 0.12 });
    setLenis(lenis);

    return () => {
      setLenis(null);
      lenis.destroy();
    };
  }, []);
}
