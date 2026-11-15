/**
 * Hand-drawn path data for the intro, baked once at module load from a seeded generator,
 * so nothing is computed per frame and no SVG filter is needed. Same seed, same wobble.
 */

type Pt = [number, number];

function prng(seed: number) {
  let s = seed >>> 0 || 1;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

const f = (n: number) => Math.round(n * 10) / 10;

/** Smooth open curve through points. */
function curve(pts: Pt[]): string {
  let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
  for (let i = 0; i < pts.length - 1; i += 1) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    d += `C${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)} ${f(p2[1] - (p3[1] - p1[1]) / 6)} ${f(p2[0])} ${f(p2[1])}`;
  }
  return d;
}

/** One pencil line: a slight bow, ends that miss by a point or two. */
export function line(x1: number, y1: number, x2: number, y2: number, seed = 1, bow = 2.2): string {
  const r = prng(seed);
  const j = () => (r() - 0.5) * 2;
  const mx = (x1 + x2) / 2 + j() * bow;
  const my = (y1 + y2) / 2 + j() * bow;
  return `M${f(x1 + j())} ${f(y1 + j())}Q${f(mx)} ${f(my)} ${f(x2 + j())} ${f(y2 + j())}`;
}

/** A rectangle drawn as four separate strokes that overshoot the corners and never quite close. */
export function roughRect(x: number, y: number, w: number, h: number, seed: number, amt = 1.8): string {
  const r = prng(seed);
  const j = (k = 1) => (r() - 0.5) * 2 * amt * k;
  const tl: Pt = [x + j(), y + j()];
  const tr: Pt = [x + w + j(), y + j()];
  const br: Pt = [x + w + j(), y + h + j()];
  const bl: Pt = [x + j(), y + h + j()];
  const side = (a: Pt, b: Pt) => {
    const dx = b[0] - a[0];
    const dy = b[1] - a[1];
    const len = Math.hypot(dx, dy);
    const ux = dx / len;
    const uy = dy / len;
    const o1 = 1 + r() * 4;
    const o2 = 1 + r() * 5;
    const bow = j(1.2);
    const mx = (a[0] + b[0]) / 2 - uy * bow;
    const my = (a[1] + b[1]) / 2 + ux * bow;
    return `M${f(a[0] - ux * o1)} ${f(a[1] - uy * o1)}Q${f(mx)} ${f(my)} ${f(b[0] + ux * o2)} ${f(b[1] + uy * o2)}`;
  };
  return side(tl, tr) + side(tr, br) + side(br, bl) + side(bl, tl);
}

/** A redrawn, rounded outline: one continuous stroke that overlaps where it started. */
export function softRect(x: number, y: number, w: number, h: number, rad: number, seed: number, amt = 0.9): string {
  const r = prng(seed);
  const j = (k = 1) => (r() - 0.5) * 2 * amt * k;
  const P = (px: number, py: number) => `${f(px + j())} ${f(py + j())}`;
  return (
    `M${P(x + rad, y)}` +
    `Q${f(x + w / 2 + j(3))} ${f(y + j(2))} ${P(x + w - rad, y)}` +
    `Q${f(x + w)} ${f(y)} ${P(x + w, y + rad)}` +
    `Q${f(x + w + j(2))} ${f(y + h / 2 + j(3))} ${P(x + w, y + h - rad)}` +
    `Q${f(x + w)} ${f(y + h)} ${P(x + w - rad, y + h)}` +
    `Q${f(x + w / 2 + j(3))} ${f(y + h + j(2))} ${P(x + rad, y + h)}` +
    `Q${f(x)} ${f(y + h)} ${P(x, y + h - rad)}` +
    `Q${f(x + j(2))} ${f(y + h / 2 + j(3))} ${P(x, y + rad)}` +
    `Q${f(x)} ${f(y)} ${P(x + rad + 7, y - 0.5)}`
  );
}

// Spark: seven uneven rays around the origin, a loose loop around it.
const RAY_ANGLES = [-96, -54, -9, 36, 82, 129, 196];
const RAY_LENGTHS = [40, 31, 44, 30, 41, 33, 37];
export const RAYS = RAY_ANGLES.map((deg, i) => {
  const a = (deg * Math.PI) / 180;
  const r0 = 15 + (i % 3);
  const r1 = RAY_LENGTHS[i];
  const bend = i % 2 ? 2.2 : -2.2;
  return `M${f(Math.cos(a) * r0)} ${f(Math.sin(a) * r0)}Q${f(Math.cos(a) * ((r0 + r1) / 2) - Math.sin(a) * bend)} ${f(Math.sin(a) * ((r0 + r1) / 2) + Math.cos(a) * bend)} ${f(Math.cos(a) * r1)} ${f(Math.sin(a) * r1)}`;
});
export const GLYPH = RAYS.join('');

const loopRandom = prng(7);
export const SCRIBBLE = curve(
  Array.from({ length: 30 }, (_, i): Pt => {
    const t = i / 29;
    const a = -2.2 + t * Math.PI * 2 * 2.15;
    const rad = 66 + t * 22 + (loopRandom() - 0.5) * 7;
    return [Math.cos(a) * rad * 1.04, Math.sin(a) * rad * 0.94];
  }),
);

// Beat 1 and 2: the sketch and the layout. Coordinates in the 480 x 560 art box.
export const PHONE_SKETCH = roughRect(165, 130, 150, 300, 11);
export const BOX_A = roughRect(62, 178, 60, 52, 21);
export const BOX_B = roughRect(338, 330, 60, 52, 35);
export const BOX_C = roughRect(178, 334, 60, 52, 44);
export const UNDERLINE = 'M64 250Q92 255 126 248';
export const CROSS_OUT = line(94, 382, 112, 400, 3, 1.4) + line(113, 381, 95, 401, 4, 1.4);
export const MARGIN_ARROW = `${line(388, 196, 426, 236, 5, 3)}M410 238L428 236 424 219`;

export const PHONE_CLEAN = softRect(165, 130, 150, 300, 24, 5);
export const HEADER_BAR = line(212, 156, 276, 157, 8, 1.2);
export const SQUIGGLES = [
  line(252, 205, 298, 204, 12, 1.5),
  line(252, 224, 288, 225, 13, 1.5),
  line(252, 277, 300, 276, 14, 1.5),
  line(252, 296, 282, 297, 15, 1.5),
  line(252, 349, 298, 348, 16, 1.5),
  line(252, 368, 292, 369, 17, 1.5),
].join('');
export const QUESTION = `M328 168Q327 150 343 150Q359 150 358 165Q357 177 346 181Q342 183 342 191M342 203L342.3 203.3`;
export const STRIKE = line(246, 266, 304, 302, 9, 2);
export const NOTE_ARROW = `${line(378, 236, 310, 208, 6, 4)}M322 200L309 208 322 218`;
export const V2 = 'M104 96L114 117 125 94M139 100Q153 90 155 103Q156 112 139 122L158 121';
export const V2_STRIKE = line(98, 108, 166, 105, 18, 2);
export const NOTE_LEFT = softRect(52, 296, 62, 62, 4, 61, 1.2);
export const NOTE_RIGHT = softRect(370, 250, 64, 64, 4, 62, 1.2);
export const NOTE_LINES_L = line(64, 320, 100, 319, 70, 1) + line(64, 336, 90, 337, 71, 1);
export const NOTE_LINES_R = line(382, 274, 420, 273, 72, 1) + line(382, 290, 410, 291, 73, 1);
export const NOTE_STRIKE = line(378, 272, 424, 292, 74, 2);

// Beat 3: the code card.
export const CARD = softRect(90, 160, 300, 225, 24, 9, 1.1);
export const CODE_X = 112;
export const CODE_Y = 202;
export const CODE_STEP = 24;

// Beat 4: the app icon tile and its glyph reuse the spark rays.
export const TILE_SIZE = 120;

// Beat 5: tray rim marks, dome and the paper-cut people.
/** Slightly lopsided ellipse, closed with a small overlap. */
function ellipse(cx: number, cy: number, rx: number, ry: number, seed: number, amt = 1.4): string {
  const r = prng(seed);
  const pts = Array.from({ length: 15 }, (_, i): Pt => {
    const a = (i / 14) * Math.PI * 2.08 - 1.6;
    return [cx + Math.cos(a) * (rx + (r() - 0.5) * 2 * amt), cy + Math.sin(a) * (ry + (r() - 0.5) * 2 * amt)];
  });
  return curve(pts);
}
export const TRAY_RIM = ellipse(240, 352, 190, 99, 21);
export const TRAY_FACE = ellipse(240, 352, 163, 85, 22, 1);
export const DOME = 'M90 352C88 270 150 215 240 215C330 215 392 270 390 352';
export const DOME_BASE = 'M90 352C100 395 165 418 240 418C315 418 380 395 390 352';
export const DOME_SHINE = 'M130 305C138 268 170 240 208 230';

/**
 * One hand, seen from the side, pinching. Its own frame: the pinch point is the origin and the arm runs
 * toward +x. Lines are plain curves with a small drift, drawn twice like the rest of the pencil work.
 */
export const HAND_BACK = 'M-1 -1C4 -10 18 -18 34 -22C52 -27 68 -30 88 -32C108 -34 126 -31 142 -27';
export const HAND_THUMB = 'M0 3C6 14 20 26 38 32C56 38 72 44 92 44C112 44 128 38 142 31';
export const HAND_FILL = `${HAND_BACK}L142 31C128 38 112 44 92 44C72 44 56 38 38 32C20 26 6 14 0 3Z`;
/** Inner marks: the gap between index finger and thumb, the nail, two knuckles peeking out. */
export const HAND_MARKS = [
  'M3 2C18 -2 36 -3 56 0C68 2 78 6 86 12',
  'M5 5C20 8 38 14 54 20C66 24 78 22 86 14',
  'M9 -9C15 -13 22 -15 29 -15',
  'M70 12C76 15 82 20 84 28',
  'M88 12C96 15 102 21 104 30',
].join('');
/** The sleeve runs far off to the right, so the arm always leaves the screen. */
export const SLEEVE = 'M141 -37C137 -12 137 14 141 36L1100 78L1100 -76Z';
export const SLEEVE_HEM = 'M141 -37C137 -12 137 14 141 36';
