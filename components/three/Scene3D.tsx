import React from 'react';
import { useMotionValue } from 'framer-motion';
import StageCanvas from './StageCanvas';
import HeroScene from './HeroScene';
import ProjectScene from './ProjectScene';
import ProcessScene from './ProcessScene';
import type { SceneProps } from './types';

const CAMERAS: Record<SceneProps['spec']['kind'], { fov: number; position: [number, number, number] }> = {
  hero: { fov: 32, position: [0, 0.2, 7.5] },
  projects: { fov: 28, position: [0, 0, 6] },
  process: { fov: 20, position: [0, 0, 12] },
};

/** Entry of the three.js chunk. Everything under components/three is loaded through this file only. */
const Scene3D: React.FC<SceneProps> = ({ spec, tier, theme, progress, onReady, onFail }) => {
  // The static tier ignores scroll and draws a fixed pose once.
  const fixed = useMotionValue(0);
  const value = tier === 'static' ? fixed : progress;
  const { fov, position } = CAMERAS[spec.kind];

  return (
    <StageCanvas tier={tier} theme={theme} fov={fov} position={position} onReady={onReady} onFail={onFail}>
      {spec.kind === 'hero' && <HeroScene spec={spec} progress={value} theme={theme} />}
      {spec.kind === 'projects' && <ProjectScene spec={spec} progress={value} theme={theme} />}
      {spec.kind === 'process' && <ProcessScene spec={spec} progress={value} theme={theme} />}
    </StageCanvas>
  );
};

export default Scene3D;
