import React, { useMemo } from 'react';
import { RoundedBox } from '@react-three/drei';
import type * as THREE from 'three';
import { roundedMask } from './helpers';

interface IconTileProps {
  texture: THREE.Texture;
  size?: number;
  /** In-progress apps: colours multiplied by 0.7. */
  muted?: boolean;
  ref?: React.Ref<THREE.Group>;
}

const DEPTH_RATIO = 0.08 / 0.7;

/** App icon as a thin rounded tile: metal edge, unlit icon on the front face. */
const IconTile: React.FC<IconTileProps> = ({ texture, size = 0.7, muted = false, ref }) => {
  const depth = size * DEPTH_RATIO;
  const mask = useMemo(() => roundedMask(1, 0.2237), []);

  return (
    <group ref={ref}>
      <RoundedBox args={[size, size, depth]} radius={size * 0.2237} smoothness={6}>
        <meshStandardMaterial color="#d8d2c6" metalness={0.2} roughness={0.5} transparent />
      </RoundedBox>
      <mesh position={[0, 0, depth / 2 + 0.001]}>
        <planeGeometry args={[size, size]} />
        <meshBasicMaterial map={texture} alphaMap={mask} transparent toneMapped={false} color={muted ? '#b3b3b3' : '#ffffff'} />
      </mesh>
    </group>
  );
};

export default IconTile;
