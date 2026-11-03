import type Lenis from 'lenis';

const HEADER_OFFSET = -88;

let lenis: Lenis | null = null;

export function setLenis(instance: Lenis | null): void {
  lenis = instance;
}

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function scrollToId(id: string): void {
  const element = document.getElementById(id);
  if (!element) return;
  if (lenis) {
    // `force` lets a menu link scroll while the open menu still has scrolling locked.
    lenis.scrollTo(element, { offset: HEADER_OFFSET, duration: 1.2, force: true });
  } else {
    const top = element.getBoundingClientRect().top + window.scrollY + HEADER_OFFSET;
    window.scrollTo({ top, behavior: reducedMotion() ? 'auto' : 'smooth' });
  }
}

export function scrollToTop(): void {
  if (lenis) {
    lenis.scrollTo(0, { duration: 1.2, force: true });
  } else {
    window.scrollTo({ top: 0, behavior: reducedMotion() ? 'auto' : 'smooth' });
  }
}

/** Stops page scrolling while a menu is open. */
export function lockScroll(lock: boolean): void {
  if (lenis) {
    if (lock) lenis.stop();
    else lenis.start();
  }
  document.body.style.overflow = lock ? 'hidden' : '';
}
