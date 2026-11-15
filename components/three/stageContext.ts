import { createContext, useContext } from 'react';
import type * as THREE from 'three';
import type { Theme } from '../../hooks/useTheme';

export interface StageState {
  tier: 'static' | 'lite' | 'full';
  theme: Theme;
  /** 0 is full quality. Each step down is a cheaper scene. At 3 the stage gives up. */
  level: number;
  keyLight: React.RefObject<THREE.DirectionalLight | null>;
}

export const StageContext = createContext<StageState | null>(null);

export function useStage(): StageState {
  const state = useContext(StageContext);
  if (!state) throw new Error('useStage must be used inside StageCanvas');
  return state;
}
