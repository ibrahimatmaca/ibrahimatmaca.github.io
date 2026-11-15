export type Tier3D = 'poster' | 'static' | 'lite' | 'full';

let webglSupported: boolean | null = null;

function hasWebGL(): boolean {
  if (webglSupported !== null) return webglSupported;
  try {
    const canvas = document.createElement('canvas');
    webglSupported = Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    webglSupported = false;
  }
  return webglSupported;
}

interface NavigatorHints extends Navigator {
  deviceMemory?: number;
  connection?: { saveData?: boolean; effectiveType?: string };
}

/**
 * Picks how much 3D this device gets. First match wins:
 * poster (no 3D), static (one frame), lite (phones), full.
 */
export function detectTier(): Tier3D {
  if (typeof window === 'undefined' || !hasWebGL()) return 'poster';
  const nav = navigator as NavigatorHints;
  if (
    nav.connection?.saveData ||
    (nav.deviceMemory !== undefined && nav.deviceMemory <= 2) ||
    (nav.hardwareConcurrency !== undefined && nav.hardwareConcurrency <= 2) ||
    window.matchMedia('(prefers-reduced-data: reduce)').matches
  ) {
    return 'poster';
  }
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 'static';
  if (window.innerWidth < 768) return 'lite';
  return 'full';
}

export function isSlowConnection(): boolean {
  const type = (navigator as NavigatorHints).connection?.effectiveType;
  return type === 'slow-2g' || type === '2g';
}
