import React, { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import { useMotionValue, useSpring } from 'framer-motion';
import * as THREE from 'three';
import IconTile from './IconTile';
import { useStage } from './stageContext';
import { PALETTE, SCREEN_ASPECT, contactShadowTexture, glowTexture, lerp, roundedMask, screenTexture, useIconTextures, useInvalidateOnChange } from './helpers';
import type { SceneProps } from './types';

/** Smoothstep: gentle at both ends, no abrupt start or stop. */
const smooth = (t: number) => t * t * (3 - 2 * t);

const Y_OFFSETS = [0.55, -0.35, 0.95, -0.85, 0.15, -0.15];
const POINTER_SPRING = { stiffness: 90, damping: 14 };
const STATIC_POSE = 0.4;
const PHONE_H = 2.1;
const YAW = 0.35;
// Half an orbit over the whole runway, one direction only.
const SPIN = Math.PI;
const CAM_Z = 7.5;

const HeroScene: React.FC<Pick<SceneProps, 'progress' | 'theme' | 'spec'>> = ({ progress, theme, spec }) => {
  const { tier, level } = useStage();
  const icons = useMemo(() => (spec.kind === 'hero' ? spec.icons : []), [spec]);
  const isStatic = tier === 'static';
  const finePointer = useMemo(() => window.matchMedia('(hover: hover) and (pointer: fine)').matches, []);

  const maxTiles = tier === 'lite' ? 4 : 6;
  const tiles = useMemo(
    () => icons.filter((icon) => !icon.inProgress).slice(0, level >= 2 ? Math.min(3, maxTiles) : maxTiles),
    [icons, level, maxTiles],
  );
  const textures = useIconTextures(tiles, tier === 'lite' ? 256 : 512, theme);
  const textureKey = textures.map((texture) => texture.uuid).join('|');
  const screenMask = useMemo(() => roundedMask(SCREEN_ASPECT, 0.09), []);
  const screen = useMemo(
    () =>
      screenTexture(
        textures.map((texture) => texture.image as CanvasImageSource),
        tiles.map((tile) => tile.name),
        theme,
        tier === 'lite' ? 384 : 512,
      ),
    // textures is a new array every render; its uuids say when it really changed.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [textureKey, tiles, theme, tier],
  );
  useEffect(() => () => screen.dispose(), [screen]);
  const shadow = useMemo(() => contactShadowTexture(), []);
  const glow = useMemo(() => glowTexture(), []);
  const colors = PALETTE[theme];
  const dark = theme === 'dark';

  const invalidate = useThree((state) => state.invalidate);
  const camera = useThree((state) => state.camera);
  const size = useThree((state) => state.size);
  // World size of the view at the phone's depth. Phone and orbit are fitted to it.
  const fov = (camera as THREE.PerspectiveCamera).fov;
  const viewH = 2 * CAM_Z * Math.tan((fov * Math.PI) / 360);
  const viewW = viewH * (size.width / size.height);
  const phoneScale = Math.min((viewH * 0.64) / PHONE_H, (viewW * 0.5) / 1.0);
  const orbitX = Math.min(Math.max(viewW / 2 - 1.05, phoneScale * 0.7), 2.2);
  const orbitZ = 1.0;

  const phone = useRef<THREE.Group>(null);
  const tileRefs = useRef<(THREE.Group | null)[]>([]);
  const lastChange = useRef(0);
  const lastP = useRef(-1);

  // Pointer offsets, fine pointers only.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const tiltY = useSpring(pointerX, POINTER_SPRING);
  const tiltX = useSpring(pointerY, POINTER_SPRING);
  useEffect(() => {
    if (!finePointer || tier !== 'full') return;
    const onMove = (event: PointerEvent) => {
      pointerX.set((event.clientX / window.innerWidth - 0.5) * 0.16);
      pointerY.set((event.clientY / window.innerHeight - 0.5) * 0.16);
      lastChange.current = performance.now();
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [finePointer, tier, pointerX, pointerY]);

  useInvalidateOnChange(progress, !isStatic);
  useInvalidateOnChange(tiltY, !isStatic);
  useInvalidateOnChange(tiltX, !isStatic);

  // New textures or a different tile count need one more frame.
  useEffect(() => {
    invalidate();
  }, [screen, tiles, invalidate, theme, phoneScale]);

  useFrame((state) => {
    // Scroll progress is already spring-smoothed in the Hero, so it is used as is.
    const p = isStatic ? STATIC_POSE : progress.get();
    const now = performance.now();
    if (Math.abs(p - lastP.current) > 0.0005) {
      lastP.current = p;
      lastChange.current = now;
    }
    const sinceInput = now - lastChange.current;
    const idle = !isStatic && sinceInput > 300 && sinceInput < 3300;
    const eased = smooth(p);

    if (phone.current) {
      const bob = idle ? Math.sin(state.clock.elapsedTime * 0.6) * 0.03 : 0;
      phone.current.scale.setScalar(phoneScale);
      phone.current.rotation.set(0.04 + tiltX.get(), lerp(-YAW, YAW, eased) + tiltY.get(), 0, 'YXZ');
      phone.current.position.y = bob;
    }

    tileRefs.current.forEach((tile, index) => {
      if (!tile) return;
      const angle = (index / Math.max(tiles.length, 1)) * Math.PI * 2 + eased * SPIN;
      tile.position.set(Math.sin(angle) * orbitX, Y_OFFSETS[index % Y_OFFSETS.length] * (phoneScale / 1.2), Math.cos(angle) * orbitZ);
      // Always faces the camera, with a gentle lean toward the side it is on.
      tile.rotation.set(-0.06, Math.sin(angle) * 0.3, 0, 'YXZ');
    });

    camera.position.set(0, 0.1, CAM_Z);
    camera.lookAt(0, 0, 0);

    if (idle) state.invalidate();
  });

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -PHONE_H * phoneScale * 0.5 - 0.15, 0]}>
        <circleGeometry args={[Math.min(phoneScale * 1.25, (viewW * 0.4) / 1), 48]} />
        <meshBasicMaterial map={shadow} transparent opacity={dark ? 0.5 : 0.18} depthWrite={false} toneMapped={false} />
      </mesh>

      {dark && (
        <mesh position={[0, -0.1, -1.2]} scale={Math.min(phoneScale * 1.9, (viewW * 0.92) / 2.4)}>
          <planeGeometry args={[2.4, 2.4]} />
          <meshBasicMaterial
            alphaMap={glow}
            color={colors.glow}
            transparent
            opacity={0.22}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      )}

      <group ref={phone}>
        <RoundedBox args={[1.0, PHONE_H, 0.11]} radius={0.14} smoothness={6}>
          <meshStandardMaterial color={colors.frame} metalness={dark ? 0.7 : 0.85} roughness={dark ? 0.35 : 0.32} />
        </RoundedBox>
        <mesh position={[0, 0, 0.055 + 0.006]}>
          <planeGeometry args={[0.9, 1.98]} />
          <meshBasicMaterial map={screen} alphaMap={screenMask} transparent toneMapped={false} />
        </mesh>
      </group>

      {tiles.map((tile, index) => (
        <group
          key={tile.id}
          ref={(node) => {
            tileRefs.current[index] = node;
          }}
        >
          <IconTile texture={textures[index]} />
        </group>
      ))}
    </group>
  );
};

export default HeroScene;
