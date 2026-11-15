import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useMotionValue, useSpring } from 'framer-motion';
import * as THREE from 'three';
import IconTile from './IconTile';
import { useStage } from './stageContext';
import { clamp, easeOut, glossMask, roundedMask, setOpacity, useIconTextures, useInvalidateOnChange } from './helpers';
import type { SceneProps } from './types';

const TILT_SPRING = { stiffness: 180, damping: 20 };
const SWAP_SECONDS = 0.3;

const ProjectScene: React.FC<Pick<SceneProps, 'progress' | 'theme' | 'spec'>> = ({ progress, theme, spec }) => {
  const { tier, keyLight } = useStage();
  const icons = useMemo(() => (spec.kind === 'projects' ? spec.icons : []), [spec]);
  const count = Math.max(icons.length, 1);
  const isStatic = tier === 'static';
  const textures = useIconTextures(icons, 512, theme);
  const invalidate = useThree((state) => state.invalidate);
  const finePointer = useMemo(() => window.matchMedia('(hover: hover) and (pointer: fine)').matches, []);

  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const swap = useRef(1);
  const tile = useRef<THREE.Group>(null);
  const echoA = useRef<THREE.Mesh>(null);
  const echoB = useRef<THREE.Mesh>(null);
  const gloss = useRef<THREE.Mesh>(null);
  const pivot = useRef<THREE.Group>(null);

  const mask = useMemo(() => roundedMask(1, 0.2237), []);
  const glossAlpha = useMemo(() => glossMask(), []);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const tiltY = useSpring(pointerX, TILT_SPRING);
  const tiltX = useSpring(pointerY, TILT_SPRING);

  useEffect(() => {
    if (!finePointer || tier !== 'full') return;
    const onMove = (event: PointerEvent) => {
      pointerX.set(clamp((event.clientX / window.innerWidth - 0.5) * 0.4, -0.2, 0.2));
      pointerY.set(clamp((event.clientY / window.innerHeight - 0.5) * 0.4, -0.2, 0.2));
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [finePointer, tier, pointerX, pointerY]);

  useInvalidateOnChange(progress, !isStatic);
  useInvalidateOnChange(tiltY, !isStatic);
  useInvalidateOnChange(tiltX, !isStatic);

  useEffect(() => {
    invalidate();
  }, [textures, active, theme, invalidate]);

  useFrame((state, delta) => {
    const p = isStatic ? 0.5 / count : progress.get();
    const scaled = clamp(p * count, 0, count - 0.0001);
    const index = Math.floor(scaled);
    const q = scaled - index;

    if (index !== activeRef.current) {
      activeRef.current = index;
      swap.current = 0;
      setActive(index);
    }
    if (swap.current < 1) {
      swap.current = Math.min(1, swap.current + delta / SWAP_SECONDS);
      state.invalidate();
    }

    const pop = easeOut(swap.current);
    if (pivot.current) {
      pivot.current.rotation.y = -0.45 + q * 0.9 + tiltY.get();
      pivot.current.rotation.x = 0.12 - q * 0.24 + tiltX.get();
      pivot.current.position.z = -0.4 + Math.sin(q * Math.PI) * 0.8;
      pivot.current.scale.setScalar(2.2 * (0.95 + 0.05 * pop));
    }
    if (tile.current) setOpacity(tile.current, pop);
    const shift = (q - 0.5) * 0.35;
    if (echoA.current) {
      echoA.current.position.set(shift, 0, -0.35);
      echoA.current.scale.setScalar(0.94);
    }
    if (echoB.current) {
      echoB.current.position.set(shift * 1.6, 0, -0.7);
      echoB.current.scale.setScalar(0.88);
    }
    if (gloss.current) {
      const magnitude = Math.hypot(tiltX.get(), tiltY.get());
      (gloss.current.material as THREE.MeshBasicMaterial).opacity = clamp(magnitude / 0.2) * 0.18;
    }
    if (keyLight.current) keyLight.current.position.set(3 + tiltY.get() * 2, 4, 5);
  });

  const current = icons[active];
  const texture = textures[active];
  if (!current || !texture) return null;

  return (
    <group ref={pivot} scale={2.2}>
      <mesh ref={echoB}>
        <planeGeometry args={[0.7, 0.7]} />
        <meshBasicMaterial map={texture} alphaMap={mask} transparent opacity={0.12} depthWrite={false} toneMapped={false} />
      </mesh>
      <mesh ref={echoA}>
        <planeGeometry args={[0.7, 0.7]} />
        <meshBasicMaterial map={texture} alphaMap={mask} transparent opacity={0.12} depthWrite={false} toneMapped={false} />
      </mesh>
      <IconTile key={current.id} ref={tile} texture={texture} muted={current.inProgress} />
      <mesh ref={gloss} position={[0, 0, 0.045]}>
        <planeGeometry args={[0.7, 0.7]} />
        <meshBasicMaterial color="#ffffff" alphaMap={glossAlpha} transparent opacity={0} depthWrite={false} toneMapped={false} />
      </mesh>
    </group>
  );
};

export default ProjectScene;
