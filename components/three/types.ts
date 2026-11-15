import type { MotionValue } from 'framer-motion';
import type { StageIcon } from '../../lib/stageIcons';
import type { Theme } from '../../hooks/useTheme';

export type SceneSpec =
  | { kind: 'hero'; icons: StageIcon[] }
  | { kind: 'projects'; icons: StageIcon[] }
  | { kind: 'process'; count: number };

export interface SceneProps {
  spec: SceneSpec;
  /** 'static' draws one frame and stops. */
  tier: 'static' | 'lite' | 'full';
  theme: Theme;
  /** Scroll progress, 0 to 1 over the scene's runway. Already smoothed by a spring. */
  progress: MotionValue<number>;
  onReady: () => void;
  onFail: () => void;
}
