import { useSyncExternalStore } from 'react';
import type { Theme } from './useTheme';

function subscribe(onChange: () => void): () => void {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  return () => observer.disconnect();
}

/** Reads the theme that useTheme put on <html>, so any component can follow it without owning it. */
export function useDocumentTheme(): Theme {
  return useSyncExternalStore(
    subscribe,
    () => (document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark'),
    () => 'light',
  );
}
