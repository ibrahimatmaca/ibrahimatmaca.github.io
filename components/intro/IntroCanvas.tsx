import React, { useEffect, useMemo, useRef } from 'react';
import type { MutableRefObject } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import { useMotionValue, useSpring } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import StageCanvas from '../three/StageCanvas';
import { PALETTE, SCREEN_ASPECT, contactShadowTexture, glowTexture, roundedMask, screenTexture, seg, useIconTextures, useInvalidateOnChange } from '../three/helpers';
import { DOME_R, PHONE_CY, PHONE_H, PHONE_W, TRAY, easeInOut, phonePose, serve } from './introTimeline';
import type { Handoff, IntroLayout } from './introTimeline';
import type { StageIcon } from '../../lib/stageIcons';
import type { Theme } from '../../hooks/useTheme';

// Camera: the hero's (fov 32 at z 7.5), looking straight ahead, so the docked phone has the same perspective.
// The art box's centre maps to the stage centre by pixels, so everything below is authored in the same SVG
// units as the 2D art and scaled once at the root.
const FOV = 32;
const CAM_Z = 7.5;
const POINTER_SPRING = { stiffness: 90, damping: 14 };
const VIEW_H = 2 * CAM_Z * Math.tan((FOV * Math.PI) / 360);
const ART_MID_Y = 280;
const TRAY_LOCAL_Y = -(TRAY.cy - ART_MID_Y);

const METAL = { color: '#d8d2c6', metalness: 0.55, roughness: 0.42 };

/** The phone's screen: a home grid of seven grey tiles and the persimmon icon in the middle. */
function homeScreenTexture(theme: Theme): THREE.CanvasTexture {
  const c = PALETTE[theme];
  const W = 256;
  const H = Math.round(W / SCREEN_ASPECT);
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  const kx = W / (PHONE_W * 0.9);
  const ky = H / (PHONE_H * 0.943);
  const tile = (cx: number, cy: number, fill: string) => {
    ctx.fillStyle = fill;
    ctx.beginPath();
    ctx.roundRect(W / 2 + (cx - 12) * kx, H / 2 + (cy - 12) * ky, 24 * kx, 24 * ky, 5.4 * kx);
    ctx.fill();
  };
  ctx.fillStyle = c.field;
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#000';
  ctx.beginPath();
  ctx.roundRect(W / 2 - 17 * kx, 4 * ky, 34 * kx, 9 * ky, 4.5 * kx);
  ctx.fill();
  for (let row = 0; row < 3; row += 1) {
    for (let col = 0; col < 3; col += 1) {
      const x = -34 + col * 34;
      const y = -75 + row * 34;
      if (row === 1 && col === 1) tile(x, y, c.tint);
      else tile(x, y, c.raised);
    }
  }
  // The spark, white, on the icon.
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 1.8 * kx;
  ctx.lineCap = 'round';
  const gx = W / 2;
  const gy = H / 2 - 41 * ky;
  [-96, -54, -9, 36, 82, 129, 196].forEach((deg, i) => {
    const a = (deg * Math.PI) / 180;
    const len = [40, 31, 44, 30, 41, 33, 37][i] * 0.2;
    ctx.beginPath();
    ctx.moveTo(gx + Math.cos(a) * 3 * kx, gy + Math.sin(a) * 3 * ky);
    ctx.lineTo(gx + Math.cos(a) * len * kx, gy + Math.sin(a) * len * ky);
    ctx.stroke();
  });
  ctx.fillStyle = c.raised;
  ctx.beginPath();
  ctx.roundRect(W / 2 - 47 * kx, H / 2 + 92 * ky, 94 * kx, 20 * ky, 10 * kx);
  ctx.fill();
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

/** A small room lights the tray and the cloche, so the metal does not read flat. Procedural, no download.
 * It goes on those materials only: the phone is lit exactly like the hero's, with no environment. */
function useRoomEnvironment(): THREE.Texture {
  const gl = useThree((state) => state.gl);
  const target = useMemo(() => {
    const generator = new THREE.PMREMGenerator(gl);
    const room = new RoomEnvironment();
    const result = generator.fromScene(room, 0.04);
    generator.dispose();
    room.dispose();
    return result;
  }, [gl]);
  useEffect(() => () => target.dispose(), [target]);
  return target.texture;
}

interface SceneProps {
  progress: MotionValue<number>;
  layoutRef: MutableRefObject<IntroLayout | null>;
  handoff: Handoff;
  theme: Theme;
  /** Same tier the hero uses: it decides how many tiles the screen shows and how sharp they are. */
  tier: 'lite' | 'full';
  icons: StageIcon[];
}

const IntroScene: React.FC<SceneProps> = ({ progress, layoutRef, handoff, theme, tier, icons }) => {
  const colors = PALETTE[theme];
  const dark = theme === 'dark';
  const size = useThree((state) => state.size);
  const camera = useThree((state) => state.camera);
  const invalidate = useThree((state) => state.invalidate);
  const lite = tier === 'lite';
  const env = useRoomEnvironment();

  const root = useRef<THREE.Group>(null);
  const phone = useRef<THREE.Group>(null);
  const tray = useRef<THREE.Group>(null);
  const dome = useRef<THREE.Group>(null);
  const glow = useRef<THREE.Group>(null);
  const glowMaterial = useRef<THREE.MeshBasicMaterial>(null);
  const homeMaterial = useRef<THREE.MeshBasicMaterial>(null);

  // The hero's screen, built the same way: same tiles, same sizes, same helper.
  const tiles = useMemo(() => icons.filter((icon) => !icon.inProgress).slice(0, lite ? 4 : 6), [icons, lite]);
  const textures = useIconTextures(tiles, lite ? 256 : 512, theme);
  const textureKey = textures.map((texture) => texture.uuid).join('|');
  const heroScreen = useMemo(
    () =>
      screenTexture(
        textures.map((texture) => texture.image as CanvasImageSource),
        tiles.map((tile) => tile.name),
        theme,
        lite ? 384 : 512,
      ),
    // textures is a new array every render; its uuids say when it really changed.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [textureKey, tiles, theme, lite],
  );
  useEffect(() => () => heroScreen.dispose(), [heroScreen]);
  // The home screen the icon dropped onto. It gives way to the hero's screen as the phone is lifted.
  const homeScreen = useMemo(() => homeScreenTexture(theme), [theme]);
  useEffect(() => () => homeScreen.dispose(), [homeScreen]);
  const screenMask = useMemo(() => roundedMask(SCREEN_ASPECT, 0.09), []);
  const shadow = useMemo(() => contactShadowTexture(), []);
  const glowMask = useMemo(() => glowTexture(), []);

  // The hero leans toward a fine pointer; so does the docked phone, so the swap does not turn it.
  const finePointer = useMemo(() => window.matchMedia('(hover: hover) and (pointer: fine)').matches, []);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const tiltY = useSpring(pointerX, POINTER_SPRING);
  const tiltX = useSpring(pointerY, POINTER_SPRING);
  useEffect(() => {
    if (!finePointer || tier !== 'full') return;
    const onMove = (event: PointerEvent) => {
      pointerX.set((event.clientX / window.innerWidth - 0.5) * 0.16);
      pointerY.set((event.clientY / window.innerHeight - 0.5) * 0.16);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [finePointer, tier, pointerX, pointerY]);

  useInvalidateOnChange(progress, true);
  useInvalidateOnChange(tiltX, true);
  useInvalidateOnChange(tiltY, true);
  useEffect(() => {
    invalidate();
  }, [theme, handoff, size, heroScreen, env, invalidate]);

  useFrame(() => {
    const p = progress.get();
    const layout = layoutRef.current;
    const ppw = size.height / VIEW_H;
    const pose = phonePose(p, handoff);
    // The hero's phone sits on its own canvas's axis. As this one docks, the optical axis slides to the slot's
    // centre (a pure window shift, no rotation), so the phone is seen from the same side, not from off to one side.
    const mid = size.width / 2;
    const principal = mid + ((layout?.slot?.cx ?? mid) - mid) * pose.lift;
    const camera3 = camera as THREE.PerspectiveCamera;
    if (Math.abs(mid - principal) > 0.01) camera3.setViewOffset(size.width, size.height, mid - principal, 0, size.width, size.height);
    else camera3.clearViewOffset();
    if (root.current) {
      root.current.position.set(((layout?.artCx ?? mid) - principal) / ppw, -((layout?.artCy ?? size.height / 2) - size.height / 2) / ppw, 0);
      root.current.scale.setScalar((layout?.scale ?? 1) / ppw);
    }
    if (phone.current) {
      phone.current.visible = pose.show > 0.01;
      phone.current.position.set(pose.x, -(PHONE_CY - ART_MID_Y + pose.y), pose.z);
      phone.current.scale.setScalar(pose.scale);
      phone.current.rotation.set(pose.a + tiltX.get() * pose.lift, pose.b + tiltY.get() * pose.lift, pose.c, 'YXZ');
    }
    // The screen wakes while the hand lifts the phone.
    if (homeMaterial.current) homeMaterial.current.opacity = 1 - easeInOut(seg(pose.lift, 0.15, 0.8));
    if (glow.current && glowMaterial.current) {
      const amount = dark ? pose.lift * pose.lift : 0;
      glow.current.visible = amount > 0.01;
      glow.current.position.set(pose.x, -(PHONE_CY - ART_MID_Y + pose.y), 0);
      glow.current.scale.setScalar(pose.scale);
      glowMaterial.current.opacity = 0.22 * amount;
    }
    const s = serve(p, handoff);
    if (tray.current) {
      tray.current.visible = s.trayX > -handoff.off + 1;
      tray.current.position.set(s.trayX, TRAY_LOCAL_Y - s.trayY, 0);
      tray.current.rotation.set(TRAY.tilt, 0, -s.trayRoll, 'ZXY');
    }
    if (dome.current) {
      dome.current.visible = s.trayX > -handoff.off + 1 && s.domeLift < 0.995;
      dome.current.position.set(s.trayX + s.domeLift * handoff.up * 0.25, TRAY_LOCAL_Y - (s.trayY + s.domeY - s.domeLift * handoff.up), 0);
      dome.current.rotation.set(TRAY.tilt, 0, -(s.domeLift * 0.6 + s.trayRoll), 'ZXY');
    }
  });

  const metal = { ...METAL, envMap: env, envMapIntensity: 0.3 };

  return (
    <>
      <group ref={root}>
        <group ref={glow}>
          <mesh position={[0, 0, -115]} scale={570}>
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial ref={glowMaterial} alphaMap={glowMask} color={colors.glow} transparent opacity={0} depthWrite={false} toneMapped={false} />
          </mesh>
        </group>

        <group ref={tray}>
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[TRAY.r, TRAY.r, 5.5, 64]} />
            <meshStandardMaterial {...metal} />
          </mesh>
          <mesh position={[0, 2.7, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[TRAY.r, 3.3, 10, 64]} />
            <meshStandardMaterial {...metal} />
          </mesh>
          <mesh position={[0, -6, 0]} rotation={[-Math.PI / 2, 0, 0]} renderOrder={-1}>
            <circleGeometry args={[TRAY.r * 1.15, 32]} />
            <meshBasicMaterial map={shadow} transparent opacity={dark ? 0.35 : 0.18} depthWrite={false} toneMapped={false} />
          </mesh>
        </group>

        <group ref={phone}>
          <RoundedBox args={[PHONE_W, PHONE_H, PHONE_W * 0.11]} radius={PHONE_W * 0.14} smoothness={6}>
            <meshStandardMaterial color={colors.frame} metalness={dark ? 0.7 : 0.85} roughness={dark ? 0.35 : 0.32} />
          </RoundedBox>
          <mesh position={[0, 0, PHONE_W * 0.055 + 0.75]} renderOrder={1}>
            <planeGeometry args={[PHONE_W * 0.9, PHONE_H * 0.943]} />
            <meshBasicMaterial map={heroScreen} alphaMap={screenMask} transparent toneMapped={false} />
          </mesh>
          <mesh position={[0, 0, PHONE_W * 0.055 + 0.85]} renderOrder={2}>
            <planeGeometry args={[PHONE_W * 0.9, PHONE_H * 0.943]} />
            <meshBasicMaterial ref={homeMaterial} map={homeScreen} alphaMap={screenMask} transparent toneMapped={false} />
          </mesh>
        </group>

        <group ref={dome}>
          <mesh>
            <sphereGeometry args={[DOME_R, 48, 24, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial {...metal} side={THREE.DoubleSide} />
          </mesh>
          <mesh position={[0, DOME_R + 6, 0]}>
            <sphereGeometry args={[10, 20, 12]} />
            <meshStandardMaterial {...metal} />
          </mesh>
        </group>
      </group>
    </>
  );
};

interface IntroCanvasProps extends SceneProps {
  onReady: () => void;
  onFail: () => void;
}

/** The 3D layer of beats 4 and 5: phone, tray and cloche. Its own chunk, loaded after the intro has painted. */
const IntroCanvas: React.FC<IntroCanvasProps> = ({ onReady, onFail, ...scene }) => (
  <StageCanvas tier={scene.tier} theme={scene.theme} fov={FOV} position={[0, 0, CAM_Z]} dprCap={scene.tier === 'lite' ? 1.5 : 1.75} onReady={onReady} onFail={onFail}>
    <IntroScene {...scene} />
  </StageCanvas>
);

export default IntroCanvas;
