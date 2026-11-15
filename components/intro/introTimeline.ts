import type { HeroSlot } from '../../lib/introHandoff';

/**
 * One timeline for the SVG and the 3D layer. Pure math, no three.js import,
 * so the first-load chunk never pulls the 3D code in.
 */

export const BEATS = [0, 0.16, 0.32, 0.51, 0.7, 1] as const;
/** Each beat holds still for its last quarter so it can be read. */
export const HOLD = 0.25;
/** The canvas starts loading its scene here, invisible. */
export const THREE_WARM = 0.5;
/** The 3D layer fades in over the SVG phone here, once the icon has docked into the phone. */
export const THREE_IN = 0.63;

export const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
/** 0 to 1 progress of `p` between `a` and `b`. */
export const seg = (p: number, a: number, b: number) => clamp((p - a) / (b - a));
export const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
export const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
/** Ease out that overshoots a little, like something set down by hand. */
export const easeOutBack = (t: number, s = 1.4) => 1 + (s + 1) * Math.pow(t - 1, 3) + s * Math.pow(t - 1, 2);

/** Range of the page progress a beat uses for its motion, before the hold. */
export function beatRange(beat: number, from: number, to: number): [number, number] {
  const start = BEATS[beat];
  const length = (BEATS[beat + 1] - start) * (1 - HOLD);
  return [start + from * length, start + to * length];
}

/** Local time 0 to 1 of a beat's moving part. */
export function beatTime(p: number, beat: number): number {
  const [a, b] = beatRange(beat, 0, 1);
  return seg(p, a, b);
}

/** Which caption shows. Moves only once `p` is 0.02 past the edge, so it never flickers on a boundary. */
export function captionIndex(p: number, current: number): number {
  let raw = 0;
  for (let i = 1; i < 5; i += 1) if (p >= BEATS[i]) raw = i;
  if (raw === current) return current;
  const edge = raw > current ? BEATS[current + 1] : BEATS[current];
  return Math.abs(p - edge) < 0.02 ? current : raw;
}

// Art box and objects, in SVG units. 125 units are one world unit of the hero phone (1.0 x 2.1).
export const ART_W = 480;
export const ART_H = 560;
export const UNIT = 125;
export const PHONE_W = 125;
export const PHONE_H = 262.5;
export const PHONE_CX = 240;
export const PHONE_CY = 285;
export const TRAY = { cx: 240, cy: 352, r: 190, tilt: 0.55 };
export const DOME_R = 150;
/** Where a lying phone rests: just above the tray's face, which leans toward the viewer. */
export const LYING = { y: 343.5 - PHONE_CY, z: 5.2, a: -(Math.PI / 2 - TRAY.tilt), c: 1.75 };

// The hero phone at its first frame. See HeroScene: rotX 0.04, rotY -YAW, size 0.64 of the stage.
export const HERO_POSE = { a: 0.04, b: -0.35 };

export interface IntroLayout {
  stageW: number;
  stageH: number;
  /** Pixels per SVG unit. */
  scale: number;
  artCx: number;
  artCy: number;
  slot: HeroSlot | null;
}

export interface Handoff {
  dx: number;
  dy: number;
  scale: number;
  /** How far left of the art centre the tray starts, so it comes from beyond the screen edge. */
  off: number;
  /** How far the dome travels up to leave the screen. */
  up: number;
}

export const NO_HANDOFF: Handoff = { dx: 0, dy: 0, scale: 1, off: 520, up: 640 };

/** Where the phone ends: the hero's slot, same size as the hero phone, in SVG units from its rest place. */
export function handoffTarget(layout: IntroLayout | null): Handoff {
  if (!layout || layout.scale <= 0) return NO_HANDOFF;
  const edges = {
    off: layout.artCx / layout.scale + TRAY.r + 60,
    up: layout.artCy / layout.scale + (TRAY.cy - ART_H / 2) + DOME_R * 1.3,
  };
  if (!layout.slot) return { ...NO_HANDOFF, ...edges };
  const { slot, scale, artCx, artCy, stageH } = layout;
  const heightPx = Math.min(slot.height * 0.64, slot.width * 0.5 * 2.1);
  return {
    dx: (slot.cx - artCx) / scale,
    dy: (stageH / 2 - artCy) / scale + (ART_H / 2 - PHONE_CY),
    scale: heightPx / scale / PHONE_H,
    ...edges,
  };
}

export interface Pose {
  x: number;
  y: number;
  z: number;
  scale: number;
  /** Euler angles in YXZ order: tilt, yaw, spin in the screen plane. */
  a: number;
  b: number;
  c: number;
  /** 0 hidden, 1 shown. */
  show: number;
  /** 0 upright, 1 lying on the tray. */
  lying: number;
  /** 0 resting on the tray, 1 in the hero pose. */
  lift: number;
}

/** The phone from the moment it drops in to its place in the hero slot. */
export function phonePose(p: number, target: Handoff): Pose {
  const u4 = beatTime(p, 3);
  const drop = easeOut(seg(u4, 0.1, 0.55));
  const yaw = lerp(1.35, -0.49, easeOutBack(seg(u4, 0.1, 0.6)));
  const u5 = clamp((p - BEATS[4]) / (BEATS[5] - BEATS[4]));
  const lay = easeInOut(seg(u5, 0.03, 0.19));
  const lift = easeInOut(seg(u5, 0.62, 0.93));

  const a = lerp(lerp(HERO_POSE.a, LYING.a, lay), HERO_POSE.a, lift);
  const b = lerp(lerp(yaw, 0, lay), HERO_POSE.b, lift);
  const c = lerp(lerp(0, LYING.c, lay), 0, lift);
  const y = lerp(lerp(lerp(-150, 0, drop), LYING.y, lay), target.dy, lift);
  return {
    x: lerp(0, target.dx, lift),
    y,
    z: lerp(LYING.z * lay, 0, lift),
    scale: lerp(1, target.scale, lift),
    a,
    b,
    c,
    show: seg(u4, 0.1, 0.22),
    lying: clamp((HERO_POSE.a - a) / (HERO_POSE.a - LYING.a)),
    lift,
  };
}

export interface Serve {
  trayX: number;
  trayY: number;
  trayRoll: number;
  domeY: number;
  /** 0 on the tray, 1 lifted away. */
  domeLift: number;
  /** 0 hand away, 1 holding the phone. */
  reach: number;
  /** 0 holding, 1 gone again. */
  leave: number;
}

/**
 * Beat 5 as one gesture, in the beat's own time u: the tray comes in under a dome, the dome lifts away,
 * a hand takes the phone, the tray leaves, the hand lets go. Nothing else is on stage.
 */
export function serve(p: number, h: Handoff = NO_HANDOFF): Serve {
  const u = clamp((p - BEATS[4]) / (BEATS[5] - BEATS[4]));
  const slide = easeOut(seg(u, 0, 0.22));
  const toward = easeInOut(seg(u, 0.5, 0.62));
  const exit = easeInOut(seg(u, 0.66, 0.9));
  return {
    trayX: lerp(-h.off, 0, slide) + 16 * toward + (-16 - h.off) * exit,
    trayY: 36 * exit,
    trayRoll: 0.07 * toward * (1 - easeInOut(seg(u, 0.64, 0.78))),
    domeY: lerp(-210, 0, easeInOut(seg(u, 0.22, 0.34))),
    domeLift: easeOutBack(seg(u, 0.38, 0.58)),
    reach: easeOut(seg(u, 0.5, 0.64)),
    leave: easeInOut(seg(u, 0.92, 1)),
  };
}

/** Where the hand pinches: the phone's end while it lies, the edge of its right side once upright. */
export function gripPoint(pose: Pose): { x: number; y: number } {
  const cx = PHONE_CX + pose.x;
  const cy = PHONE_CY + pose.y;
  const up = { x: cx + 63 * pose.scale * Math.cos(pose.b), y: cy - 34 * pose.scale };
  const flat = { x: cx + 122 * pose.scale, y: cy - 8 };
  return { x: lerp(up.x, flat.x, pose.lying), y: lerp(up.y, flat.y, pose.lying) };
}

/** Progress used for the static strip: the end state of each beat. */
export const STRIP_P = [0.155, 0.315, 0.505, 0.695, 0.89] as const;
