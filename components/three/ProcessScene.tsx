import React, { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { PALETTE, clamp, plateTexture, roundedMask, setOpacity, useInvalidateOnChange } from './helpers';
import type { SceneProps } from './types';

const ProcessScene: React.FC<Pick<SceneProps, 'progress' | 'theme' | 'spec'>> = ({ progress, theme, spec }) => {
  const count = spec.kind === 'process' ? spec.count : 0;
  const colors = PALETTE[theme];
  const invalidate = useThree((state) => state.invalidate);
  const plates = useRef<(THREE.Group | null)[]>([]);
  const faces = useMemo(
    () => Array.from({ length: count }, (_, i) => plateTexture(String(i + 1).padStart(2, '0'), theme)),
    [count, theme],
  );
  const mask = useMemo(() => roundedMask(2.6 / 1.6, 0.075), []);

  useEffect(() => () => faces.forEach((texture) => texture.dispose()), [faces]);
  useEffect(() => {
    invalidate();
  }, [faces, invalidate]);
  useInvalidateOnChange(progress, true);

  useFrame((state) => {
    // Progress runs 0 to 1 across the runway and the last step is reached at 1, so s tops out at count - 1.
    const s = progress.get() * Math.max(count - 1, 1);
    plates.current.forEach((plate, i) => {
      if (!plate) return;
      const d = i - s;
      const exit = clamp((-d - 0.2) / 0.5);
      // Later steps wait behind the active plate, a little lower and further back.
      plate.position.set(-3.2 * exit, d * -0.12, d * -0.5);
      plate.rotation.x = clamp(d, -1, 3) * 0.05;
      setOpacity(plate, (1 - clamp(d - 2)) * (1 - exit));
      const bar = plate.getObjectByName('bar');
      if (bar) bar.visible = Math.abs(d) < 0.5;
    });
    state.camera.position.set(0, 0, 12 - clamp(progress.get()));
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <group>
      {faces.map((face, i) => (
        <group
          key={i}
          ref={(node) => {
            plates.current[i] = node;
          }}
        >
          <RoundedBox args={[2.6, 1.6, 0.06]} radius={0.12} smoothness={6}>
            <meshStandardMaterial color={colors.plate} roughness={0.6} transparent />
          </RoundedBox>
          <mesh position={[0, 0, 0.031]}>
            <planeGeometry args={[2.6, 1.6]} />
            <meshBasicMaterial map={face} alphaMap={mask} transparent toneMapped={false} />
          </mesh>
          <mesh name="bar" position={[-1.27, 0, 0.034]}>
            <boxGeometry args={[0.06, 1.1, 0.01]} />
            <meshBasicMaterial color={colors.tint} transparent toneMapped={false} />
          </mesh>
        </group>
      ))}
    </group>
  );
};

export default ProcessScene;
