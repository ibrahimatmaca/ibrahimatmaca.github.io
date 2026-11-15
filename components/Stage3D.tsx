import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import type { MotionValue } from 'framer-motion';
import { detectTier, isSlowConnection, Tier3D } from '../lib/capability';
import { useDocumentTheme } from '../hooks/useDocumentTheme';
import type { SceneSpec } from './three/types';

// The three.js chunk. Only the home page sections import this file, so legal pages never load it.
const loadScene = () => import('./three/Scene3D');
const Scene3D = lazy(loadScene);

export class SceneBoundary extends React.Component<{ onFail: () => void; children: React.ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    this.props.onFail();
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

interface Stage3DProps {
  spec: SceneSpec;
  progress: MotionValue<number>;
  /** Static stand-in shown first, and kept when 3D is unavailable. Must fill its box. */
  poster: React.ReactNode;
  className?: string;
  /** Scenes that cannot show a single still frame (a pinned sequence) skip 3D when motion is reduced. */
  needsMotion?: boolean;
  /** Set false to keep the poster only, for example below 1024px. */
  enabled?: boolean;
  /** How far outside the viewport the canvas stays mounted, as a share of the viewport height. */
  margin?: string;
  /** Called with true once the canvas has drawn its first frame, false when it goes away again. */
  onReadyChange?: (ready: boolean) => void;
}

/**
 * Lazy 3D stage with a poster fallback. The poster shows immediately; the canvas fades over it
 * once it has drawn its first frame. Mounted only while near the viewport.
 */
const Stage3D: React.FC<Stage3DProps> = ({ spec, progress, poster, className = '', needsMotion = false, enabled = true, margin = '200%', onReadyChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tier] = useState<Tier3D>(detectTier);
  const [failed, setFailed] = useState(false);
  const [idle, setIdle] = useState(false);
  const [nearViewport, setNearViewport] = useState(false);
  const [ready, setReady] = useState(false);
  const theme = useDocumentTheme();

  // Start loading the chunk once the page has painted. Slow connections wait until the stage is near.
  useEffect(() => {
    if (tier === 'poster' || !enabled) return;
    const start = () => setIdle(true);
    if ('requestIdleCallback' in window) {
      const handle = window.requestIdleCallback(start, { timeout: 2500 });
      return () => window.cancelIdleCallback(handle);
    }
    const handle = globalThis.setTimeout(start, 600);
    return () => globalThis.clearTimeout(handle);
  }, [tier, enabled]);

  useEffect(() => {
    const node = containerRef.current;
    if (!node || tier === 'poster' || !enabled) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setNearViewport(entry.isIntersecting);
        // The canvas unmounts when it leaves, so the poster must come back until it draws again.
        if (!entry.isIntersecting) setReady(false);
      },
      { rootMargin: `${margin} 0px` },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [tier, enabled, margin]);

  useEffect(() => {
    if (idle && tier !== 'poster' && enabled && !isSlowConnection()) void loadScene().catch(() => setFailed(true));
  }, [idle, tier, enabled]);

  useEffect(() => {
    onReadyChange?.(ready);
  }, [ready, onReadyChange]);

  const allowed = enabled && !failed && tier !== 'poster' && !(needsMotion && tier === 'static');
  const mount = allowed && idle && nearViewport;
  const sceneTier = tier === 'poster' ? 'lite' : tier;

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div
        className="absolute inset-0 transition-opacity duration-300 ease-out motion-reduce:transition-none"
        style={{ opacity: mount && ready ? 0 : 1 }}
      >
        {poster}
      </div>
      {mount && (
        <div
          aria-hidden="true"
          className="absolute inset-0 transition-opacity duration-300 ease-out motion-reduce:transition-none"
          style={{ opacity: ready ? 1 : 0, touchAction: 'pan-y', pointerEvents: 'none' }}
        >
          <SceneBoundary onFail={() => setFailed(true)}>
            <Suspense fallback={null}>
              <Scene3D
                spec={spec}
                tier={sceneTier}
                theme={theme}
                progress={progress}
                onReady={() => setReady(true)}
                onFail={() => setFailed(true)}
              />
            </Suspense>
          </SceneBoundary>
        </div>
      )}
    </div>
  );
};

export default Stage3D;
