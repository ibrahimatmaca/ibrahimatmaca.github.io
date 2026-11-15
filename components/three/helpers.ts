import { useEffect, useMemo, useState } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import type { MotionValue } from 'framer-motion';
import type { StageIcon } from '../../lib/stageIcons';
import type { Theme } from '../../hooks/useTheme';

export const PALETTE = {
  light: { plate: '#fcfaf6', field: '#fcfaf6', raised: '#ece8de', tint: '#c2410c', ink: '#181613', sub: '#6c665c', frame: '#1b1a18', glow: '#c2410c' },
  dark: { plate: '#12151c', field: '#12151c', raised: '#1b1f29', tint: '#ff8048', ink: '#eeece6', sub: '#8c909c', frame: '#2b2f3a', glow: '#ff8048' },
} satisfies Record<Theme, Record<string, string>>;

export const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
/** 0 to 1 progress of `p` between `a` and `b`. */
export const seg = (p: number, a: number, b: number) => clamp((p - a) / (b - a));
export const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
export const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

function makeCanvas(width: number, height: number): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  return [canvas, canvas.getContext('2d') as CanvasRenderingContext2D];
}

function roundedRectPath(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
}

const maskCache = new Map<string, THREE.CanvasTexture>();

/** Alpha map: white rounded rectangle on black. Three reads the green channel. */
export function roundedMask(aspect: number, radiusRatio: number): THREE.CanvasTexture {
  const key = `${aspect}-${radiusRatio}`;
  const cached = maskCache.get(key);
  if (cached) return cached;
  const width = 256;
  const height = Math.round(width / aspect);
  const [canvas, ctx] = makeCanvas(width, height);
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = '#fff';
  roundedRectPath(ctx, 0, 0, width, height, Math.min(width, height) * radiusRatio);
  ctx.fill();
  const texture = new THREE.CanvasTexture(canvas);
  maskCache.set(key, texture);
  return texture;
}

let shadowTexture: THREE.CanvasTexture | null = null;

/** Soft round contact shadow. Black with a radial alpha falloff. */
export function contactShadowTexture(): THREE.CanvasTexture {
  if (shadowTexture) return shadowTexture;
  const [canvas, ctx] = makeCanvas(128, 128);
  const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  gradient.addColorStop(0, 'rgba(0,0,0,1)');
  gradient.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 128, 128);
  shadowTexture = new THREE.CanvasTexture(canvas);
  return shadowTexture;
}

let glowTex: THREE.CanvasTexture | null = null;

/** Alpha map: white centre fading to black. Three reads the green channel. */
export function glowTexture(): THREE.CanvasTexture {
  if (glowTex) return glowTex;
  const [canvas, ctx] = makeCanvas(256, 256);
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, 256, 256);
  const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  gradient.addColorStop(0, '#fff');
  gradient.addColorStop(0.5, '#555');
  gradient.addColorStop(1, '#000');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 256, 256);
  glowTex = new THREE.CanvasTexture(canvas);
  return glowTex;
}

export const SCREEN_ASPECT = 0.9 / 1.98;

/**
 * App-store-like screen for the hero phone: status bar, large app icon, name and a short list of
 * the other apps. Decorative, so it holds names only.
 */
export function screenTexture(images: CanvasImageSource[], names: string[], theme: Theme, width = 512): THREE.CanvasTexture {
  const c = PALETTE[theme];
  const W = 512;
  const H = Math.round(W / SCREEN_ASPECT);
  const [canvas, ctx] = makeCanvas(width, Math.round(width / SCREEN_ASPECT));
  ctx.scale(width / W, width / W);
  const sans = '-apple-system, "SF Pro Display", system-ui, sans-serif';
  const drawImg = (img: CanvasImageSource | undefined, x: number, y: number, size: number) => {
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(x, y, size, size, size * 0.2237);
    ctx.clip();
    ctx.fillStyle = c.raised;
    ctx.fillRect(x, y, size, size);
    try {
      if (img) ctx.drawImage(img, x, y, size, size);
    } catch {
      // A tainted or unfinished image keeps the plain tile.
    }
    ctx.restore();
  };

  ctx.fillStyle = c.field;
  ctx.fillRect(0, 0, W, H);

  // Status bar and island.
  ctx.fillStyle = c.ink;
  ctx.font = `600 26px ${sans}`;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText('9:41', 52, 46);
  ctx.fillStyle = '#000';
  ctx.beginPath();
  ctx.roundRect(W / 2 - 62, 26, 124, 38, 19);
  ctx.fill();
  ctx.fillStyle = c.ink;
  ctx.beginPath();
  ctx.roundRect(W - 112, 38, 44, 22, 6);
  ctx.fill();
  ctx.fillRect(W - 66, 44, 4, 10);

  // Lead app.
  drawImg(images[0], W / 2 - 100, 130, 200);
  ctx.fillStyle = c.ink;
  ctx.textAlign = 'center';
  ctx.font = `700 46px ${sans}`;
  ctx.fillText(names[0] ?? '', W / 2, 382);
  ctx.fillStyle = c.tint;
  ctx.beginPath();
  ctx.roundRect(W / 2 - 52, 430, 104, 12, 6);
  ctx.fill();

  // List of the other apps.
  const rows = Math.min(5, Math.max(images.length - 1, 0));
  for (let i = 0; i < rows; i += 1) {
    const y = 506 + i * 110;
    ctx.fillStyle = c.raised;
    ctx.beginPath();
    ctx.roundRect(36, y, W - 72, 94, 26);
    ctx.fill();
    drawImg(images[i + 1], 54, y + 16, 62);
    ctx.fillStyle = c.ink;
    ctx.textAlign = 'left';
    ctx.font = `600 27px ${sans}`;
    ctx.fillText(names[i + 1] ?? '', 134, y + 36);
    ctx.fillStyle = c.sub;
    ctx.globalAlpha = 0.45;
    ctx.beginPath();
    ctx.roundRect(134, y + 58, 150, 10, 5);
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.strokeStyle = c.sub;
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(W - 82, y + 36);
    ctx.lineTo(W - 70, y + 47);
    ctx.lineTo(W - 82, y + 58);
    ctx.stroke();
  }

  // Home indicator.
  ctx.fillStyle = c.ink;
  ctx.globalAlpha = 0.3;
  ctx.beginPath();
  ctx.roundRect(W / 2 - 76, H - 30, 152, 6, 3);
  ctx.fill();
  ctx.globalAlpha = 1;

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

let glossTexture: THREE.CanvasTexture | null = null;

/** Diagonal highlight, clipped to the icon's rounded corners. Used as an alpha map. */
export function glossMask(): THREE.CanvasTexture {
  if (glossTexture) return glossTexture;
  const [canvas, ctx] = makeCanvas(256, 256);
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, 256, 256);
  roundedRectPath(ctx, 0, 0, 256, 256, 256 * 0.2237);
  ctx.clip();
  const gradient = ctx.createLinearGradient(0, 0, 256, 256);
  gradient.addColorStop(0, '#fff');
  gradient.addColorStop(0.55, '#000');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 256, 256);
  glossTexture = new THREE.CanvasTexture(canvas);
  return glossTexture;
}

/** Stand-in icon: the first letter, in serif, on a raised field. */
export function placeholderTexture(name: string, theme: Theme, size = 256): THREE.CanvasTexture {
  const colors = PALETTE[theme];
  const [canvas, ctx] = makeCanvas(size, size);
  ctx.fillStyle = colors.raised;
  ctx.fillRect(0, 0, size, size);
  ctx.fillStyle = colors.ink;
  ctx.font = `500 ${size * 0.5}px ui-serif, "New York", Georgia, serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(name.charAt(0).toUpperCase(), size / 2, size / 2 + size * 0.03);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/** Process plate face: the step numeral on the plate colour. */
export function plateTexture(numeral: string, theme: Theme): THREE.CanvasTexture {
  const colors = PALETTE[theme];
  const [canvas, ctx] = makeCanvas(512, 316);
  ctx.fillStyle = colors.plate;
  ctx.fillRect(0, 0, 512, 316);
  ctx.fillStyle = colors.ink;
  ctx.font = '500 200px ui-serif, "New York", Georgia, serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText(numeral, 48, 232);
  ctx.fillStyle = colors.tint;
  ctx.fillRect(48, 262, 56, 4);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

/** Apple's CDN serves any square size by name, so small screens fetch a smaller image. */
function sizedIconUrl(url: string, px: number): string {
  return url.replace(/\/\d+x\d+bb\./, `/${px}x${px}bb.`);
}

/**
 * Textures for a list of icons. Placeholders are ready at once; each real icon replaces its
 * placeholder when it has loaded. A failed load (blocked CORS, 404) keeps the placeholder.
 */
export function useIconTextures(icons: StageIcon[], px: number, theme: Theme): THREE.Texture[] {
  const invalidate = useThree((state) => state.invalidate);
  const placeholders = useMemo(() => icons.map((icon) => placeholderTexture(icon.name, theme)), [icons, theme]);
  const [loaded, setLoaded] = useState<Record<string, THREE.Texture>>({});

  useEffect(() => () => placeholders.forEach((texture) => texture.dispose()), [placeholders]);

  useEffect(() => {
    let cancelled = false;
    const created: THREE.Texture[] = [];
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin('anonymous');
    icons.forEach((icon) => {
      if (!icon.icon) return;
      loader.load(
        sizedIconUrl(icon.icon, px),
        (texture) => {
          if (cancelled) {
            texture.dispose();
            return;
          }
          texture.colorSpace = THREE.SRGBColorSpace;
          texture.anisotropy = 8;
          created.push(texture);
          setLoaded((previous) => ({ ...previous, [icon.id]: texture }));
          invalidate();
        },
        undefined,
        () => undefined,
      );
    });
    return () => {
      cancelled = true;
      created.forEach((texture) => texture.dispose());
    };
  }, [icons, px, invalidate]);

  return icons.map((icon, index) => loaded[icon.id] ?? placeholders[index]);
}

/** Asks for a new frame whenever a motion value changes. */
export function useInvalidateOnChange(value: MotionValue<number>, enabled: boolean): void {
  const invalidate = useThree((state) => state.invalidate);
  useEffect(() => {
    if (!enabled) return;
    return value.on('change', () => invalidate());
  }, [value, enabled, invalidate]);
}

/** Sets opacity on every mesh material under an object, and hides it when it is invisible. */
export function setOpacity(object: THREE.Object3D, opacity: number): void {
  object.visible = opacity > 0.01;
  object.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      const material = child.material as THREE.Material | THREE.Material[];
      (Array.isArray(material) ? material : [material]).forEach((item) => {
        if (item.userData.baseOpacity === undefined) item.userData.baseOpacity = item.opacity;
        item.opacity = (item.userData.baseOpacity as number) * opacity;
      });
    }
  });
}
