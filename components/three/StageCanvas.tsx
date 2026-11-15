import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerformanceMonitor } from '@react-three/drei';
import type * as THREE from 'three';
import type { Theme } from '../../hooks/useTheme';
import { StageContext } from './stageContext';

const Lights: React.FC<{ theme: Theme; keyLight: React.RefObject<THREE.DirectionalLight | null> }> = ({ theme, keyLight }) => {
  const invalidate = useThree((state) => state.invalidate);
  const dark = theme === 'dark';

  useEffect(() => {
    invalidate();
  }, [theme, invalidate]);

  return (
    <>
      <ambientLight intensity={dark ? 0.55 : 0.9} />
      <directionalLight ref={keyLight} position={[3, 4, 5]} intensity={dark ? 1.9 : 1.6} color="#fff4e6" />
      <directionalLight position={[-4, -1, 2]} intensity={dark ? 0.35 : 0.25} color="#cfd8ff" />
      {dark && <directionalLight position={[-3, 2, -4]} intensity={2.2} color="#ff9566" />}
      {dark && <directionalLight position={[4, 1, -3]} intensity={1.4} color="#8fb0ff" />}
    </>
  );
};

const ReadySignal: React.FC<{ onReady: () => void }> = ({ onReady }) => {
  const done = useRef(false);
  useFrame(() => {
    if (done.current) return;
    done.current = true;
    onReady();
  });
  return null;
};

interface StageCanvasProps {
  tier: 'static' | 'lite' | 'full';
  theme: Theme;
  fov: number;
  position: [number, number, number];
  onReady: () => void;
  onFail: () => void;
  /** Upper bound for the pixel ratio. Scenes that are small on screen can ask for less. */
  dprCap?: number;
  children: React.ReactNode;
}

/** Shared canvas: transparent, demand-driven, capped DPR, shared lights, quality watchdog. */
const StageCanvas: React.FC<StageCanvasProps> = ({ tier, theme, fov, position, onReady, onFail, dprCap: dprLimit, children }) => {
  const [level, setLevel] = useState(0);
  const keyLight = useRef<THREE.DirectionalLight>(null);
  // Unmounting the canvas also loses its context on purpose; that must not read as a failure.
  const alive = useRef(true);
  // Layout effect: its cleanup must run before the canvas tears down and fires its context-lost event.
  useLayoutEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
    };
  }, []);
  const dprCap = dprLimit ?? (tier === 'lite' ? 1.5 : 1.75);
  const antialias = !(tier === 'lite' && window.devicePixelRatio >= 2);

  const handleDecline = () => {
    if (level >= 2) onFail();
    else setLevel(level + 1);
  };

  return (
    <Canvas
      dpr={[1, level >= 1 ? 1 : dprCap]}
      frameloop="demand"
      flat
      gl={{ antialias, alpha: true, powerPreference: 'high-performance' }}
      camera={{ fov, position, near: 0.1, far: 60 }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
        gl.domElement.addEventListener('webglcontextlost', (event) => {
          event.preventDefault();
          if (alive.current) onFail();
        });
      }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <StageContext.Provider value={{ tier, theme, level, keyLight }}>
        <Lights theme={theme} keyLight={keyLight} />
        {tier !== 'static' && <PerformanceMonitor bounds={() => [42, 120]} flipflops={2} onDecline={handleDecline} />}
        <ReadySignal onReady={onReady} />
        {children}
      </StageContext.Provider>
    </Canvas>
  );
};

export default StageCanvas;
