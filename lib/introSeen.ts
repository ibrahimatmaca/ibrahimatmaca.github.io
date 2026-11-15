const KEY = 'intro-seen';

export type IntroMode = 'play' | 'strip' | 'none';

export const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

function seen(): boolean {
  try {
    return sessionStorage.getItem(KEY) === '1';
  } catch {
    return false;
  }
}

export function markIntroSeen(): void {
  try {
    sessionStorage.setItem(KEY, '1');
  } catch {
    // The intro may play again on the next load. That is fine.
  }
}

/** Forgets that the intro was seen, so the next load plays it. Used by the footer's replay link. */
export function clearIntroSeen(): void {
  try {
    sessionStorage.removeItem(KEY);
  } catch {
    // Nothing stored, nothing to clear.
  }
}

/** Save-Data, a weak device or a request for less data: same intro, shorter runway, no canvas. */
export function prefersLightIntro(): boolean {
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
  return Boolean(
    nav.connection?.saveData ||
      (nav.deviceMemory !== undefined && nav.deviceMemory <= 2) ||
      (nav.hardwareConcurrency !== undefined && nav.hardwareConcurrency <= 2) ||
      window.matchMedia('(prefers-reduced-data: reduce)').matches,
  );
}

/**
 * Decides once, when the home page mounts, what the opening looks like.
 * Plays once per session. A fragment, a restored scroll position or a seen flag skips it.
 * `#intro` forces a replay. Reduced motion and short landscape screens get the static strip.
 */
export function introMode(): IntroMode {
  const forced = window.location.hash === '#intro';
  if (!forced) {
    if (seen()) return 'none';
    if (window.location.hash) return 'none';
    if (window.scrollY > 100) return 'none';
  }
  const reduced = window.matchMedia(REDUCED_MOTION).matches;
  const shortLandscape = window.innerHeight < 480 && window.innerWidth > window.innerHeight;
  return reduced || shortLandscape ? 'strip' : 'play';
}
