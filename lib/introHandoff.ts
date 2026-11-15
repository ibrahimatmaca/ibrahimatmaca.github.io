import { useSyncExternalStore } from 'react';

/** Where the hero's 3D stage sits, in viewport pixels. Hero publishes it, the intro docks its phone there. */
export interface HeroSlot {
  /** Centre x, measured from the viewport's left edge. */
  cx: number;
  width: number;
  height: number;
}

let slot: HeroSlot | null = null;
let live = false;
let holding = false;
const listeners = new Set<() => void>();

export function publishHeroSlot(next: HeroSlot | null): void {
  const same =
    slot === next ||
    (slot !== null &&
      next !== null &&
      Math.abs(slot.cx - next.cx) < 0.5 &&
      Math.abs(slot.width - next.width) < 0.5 &&
      Math.abs(slot.height - next.height) < 0.5);
  if (same) return;
  slot = next;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useHeroSlot(): HeroSlot | null {
  return useSyncExternalStore(subscribe, () => slot, () => null);
}

/**
 * True once the hero's own phone is pinned in its slot and drawn (or has had long enough to be).
 * The intro keeps its phone fixed on screen until then, so the swap happens in place.
 */
export function publishHeroLive(next: boolean): void {
  if (live === next) return;
  live = next;
  listeners.forEach((listener) => listener());
}

export function useHeroLive(): boolean {
  return useSyncExternalStore(subscribe, () => live, () => false);
}

/** True while the intro's 3D phone is fixed on screen and the hero's own stage must wait. */
export function publishIntroHolds(next: boolean): void {
  if (holding === next) return;
  holding = next;
  listeners.forEach((listener) => listener());
}

export function useIntroHolds(): boolean {
  return useSyncExternalStore(subscribe, () => holding, () => false);
}
