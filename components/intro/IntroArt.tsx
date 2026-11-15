import React, { useLayoutEffect, useRef } from 'react';
import { animate, motion, useMotionValue, useMotionValueEvent, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import {
  BEATS,
  PHONE_CX,
  PHONE_CY,
  PHONE_H,
  PHONE_W,
  beatRange,
  NO_HANDOFF,
  clamp,
  easeInOut,
  easeOut,
  gripPoint,
  phonePose,
  seg,
  serve,
} from './introTimeline';
import type { Handoff } from './introTimeline';
import * as P from './introPaths';

type MV = MotionValue<number>;

const CODE_FONT = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';
/** Transform around the art's own origin, not the element's box: the pivots below are SVG units. */
const VB = 'intro-vb';

const useRange = (driver: MV, a: number, b: number, ease: (t: number) => number = easeInOut) =>
  useTransform(driver, (v) => ease(seg(v, a, b)));
const useWindow = (driver: MV, a: number, b: number) => useTransform(driver, (v) => (v >= a && v <= b ? 'inline' : 'none'));

interface PenProps {
  d: string;
  driver: MV;
  from: number;
  to: number;
  w?: number;
  className?: string;
  /** Pencil double line: the same path again, nudged, at 55%. */
  double?: boolean;
  ease?: (t: number) => number;
}

/** A stroke that draws itself. */
const Pen: React.FC<PenProps> = ({ d, driver, from, to, w = 2.5, className = 'stroke-ink', double = false, ease = easeInOut }) => {
  const pathLength = useRange(driver, from, to, ease);
  const opacity = useTransform(pathLength, (v) => (v > 0.002 ? 1 : 0));
  const style = { pathLength, opacity };
  return (
    <>
      {double && (
        <motion.path
          d={d}
          style={style}
          transform="translate(0.8 0.7)"
          strokeOpacity={0.55}
          strokeWidth={w * 0.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`fill-none ${className}`}
        />
      )}
      <motion.path d={d} style={style} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" className={`fill-none ${className}`} />
    </>
  );
};

/** Fill underlay for a drawn shape. Fades in while the outline draws. */
const Paper: React.FC<{ d: string; driver: MV; from: number; to: number; className: string }> = ({ d, driver, from, to, className }) => {
  const opacity = useRange(driver, from, to, easeOut);
  return <motion.path d={d} style={{ opacity }} className={className} />;
};

const CODE = [
  [['struct', true], [' OrderView: View {', false]],
  [['  @State private var items: [Item] = []', false]],
  [['  var body: some View {', false]],
  [['    List(items) { ItemRow($0) }', false]],
  [['      .task { items = ', false], ['await', true], [' load() }', false]],
  [['  }', false]],
  [['}', false]],
] as const;

const CodeLine: React.FC<{ index: number; progress: MV }> = ({ index, progress }) => {
  const [a, b] = beatRange(2, 0.28 + index * 0.065, 0.28 + index * 0.065 + 0.22);
  const clipPath = useTransform(progress, (v) => `inset(0 ${(1 - easeOut(seg(v, a, b))) * 100}% 0 0)`);
  return (
    <motion.text
      x={P.CODE_X}
      y={P.CODE_Y + index * P.CODE_STEP}
      style={{ clipPath, whiteSpace: 'pre', fontFamily: CODE_FONT }}
      fontSize={11}
      className="fill-ink-2"
    >
      {CODE[index].map(([text, keyword], i) => (
        <tspan key={i} className={keyword ? 'fill-tint' : undefined}>
          {text}
        </tspan>
      ))}
    </motion.text>
  );
};

const Spark: React.FC<{ progress: MV; auto: MV }> = ({ progress, auto }) => {
  const pulse = useMotionValue(1);
  const pulsed = useRef(false);
  useMotionValueEvent(auto, 'change', (value) => {
    if (value >= 1 && !pulsed.current) {
      pulsed.current = true;
      void animate(pulse, [1, 1.06, 1], { duration: 0.4, ease: [0.23, 1, 0.32, 1] });
    }
  });

  const [m1a, m1b] = beatRange(1, 0, 0.6);
  const [m2a, m2b] = beatRange(2, 0, 0.5);
  const x = useTransform(progress, [m1a, m1b, m2a, m2b], [240, 192, 192, 116], { ease: easeInOut });
  const y = useTransform(progress, [m1a, m1b, m2a, m2b], [280, 156, 156, 183], { ease: easeInOut });
  const shrink = useTransform(progress, [m1a, m1b], [1, 0.3], { ease: easeInOut });
  const scale = useTransform([shrink, pulse], ([s, k]: number[]) => s * k);
  const dot = useRange(auto, 0, 0.2, easeOut);

  return (
    <motion.g style={{ x, y }}>
      <motion.g className={VB} style={{ scale, originX: 0, originY: 0 }}>
        <motion.circle r={5.5} style={{ scale: dot }} className="fill-tint" />
        {P.RAYS.map((d, i) => (
          <Pen key={i} d={d} driver={auto} from={0.2 + i * 0.075} to={0.5 + i * 0.075} w={2.6 + (i % 3) * 0.3} className="stroke-tint" />
        ))}
      </motion.g>
    </motion.g>
  );
};

interface ArtProps {
  progress: MV;
  /** Beat 1 plays by itself, before any scroll. 0 to 1. */
  auto: MV;
  /** 1 while the 3D layer draws the phone, tray and dome. */
  threeMix: MV;
  handoff: Handoff;
  svgRef?: React.Ref<SVGSVGElement>;
}

/**
 * All five beats as one SVG. Every group is a pure function of scroll progress, so scrolling back
 * plays it backwards. Beats 4 and 5 are also the fallback when 3D is not available.
 */
const IntroArt: React.FC<ArtProps> = ({ progress: p, auto, threeMix, handoff, svgRef }) => {
  const handoffRef = useRef(handoff);
  useLayoutEffect(() => {
    handoffRef.current = handoff;
  }, [handoff]);

  // Beat 2 and 3: the sketch is redrawn, then folded away.
  const [sketchOutA, sketchOutB] = beatRange(1, 0, 0.35);
  const sketchOpacity = useTransform(p, (v) => 1 - easeInOut(seg(v, sketchOutA, sketchOutB)));
  const [wireA, wireB] = beatRange(2, 0, 0.2);
  const wireOpacity = useTransform(p, (v) => 1 - 0.85 * easeInOut(seg(v, wireA, wireB)));
  const [foldA, foldB] = beatRange(2, 0.72, 0.88);
  const [unfoldA, unfoldB] = beatRange(2, 0.86, 1);
  const foldY = useTransform(p, (v) => Math.max(0.0001, Math.cos(easeInOut(seg(v, foldA, foldB)) * (Math.PI / 2))));
  const foldDisplay = useWindow(p, 0, foldB + 0.003);
  const tileY = useTransform(p, (v) => Math.max(0.0001, Math.sin(easeInOut(seg(v, unfoldA, unfoldB)) * (Math.PI / 2))));
  const tileDisplay = useWindow(p, unfoldA - 0.002, BEATS[4]);

  // Beat 2 layout: the boxes slide into the list, notes arrive from the edges.
  const [snapA, snapB] = beatRange(1, 0.25, 0.65);
  const boxAx = useTransform(p, (v) => 116 * easeOutBackSoft(seg(v, snapA, snapB)));
  const boxAy = useTransform(p, (v) => 12 * easeOutBackSoft(seg(v, snapA, snapB)));
  const boxBx = useTransform(p, (v) => -160 * easeOutBackSoft(seg(v, snapA, snapB)));
  const boxBy = useTransform(p, (v) => -68 * easeOutBackSoft(seg(v, snapA, snapB)));
  const [noteA, noteB] = beatRange(1, 0.3, 0.7);
  const noteLx = useTransform(p, (v) => -150 * (1 - easeOut(seg(v, noteA, noteB))));
  const noteRx = useTransform(p, (v) => 150 * (1 - easeOut(seg(v, noteA + 0.04, noteB + 0.04))));
  const noteOpacity = useRange(p, noteA, noteA + (noteB - noteA) * 0.4, easeOut);

  // Beat 4: the tile becomes an icon and drops into the phone.
  const [iconA, iconB] = beatRange(3, 0, 0.22);
  const [dockA, dockB] = beatRange(3, 0.45, 0.8);
  const iconFill = useRange(p, iconA, iconB);
  const dock = useRange(p, dockA, dockB, easeInOut);
  const floatScale = useTransform(dock, (v) => 1 - v * 0.8);
  const floatY = useTransform(dock, (v) => 280 - v * 36);
  const floatOpacity = useTransform(p, (v) => (v < dockB ? 1 : 0));
  const docked = useTransform(p, (v) => (v >= dockB ? 1 : 0));
  const tileGlyphOpacity = useRange(p, iconA + 0.002, iconB);

  // The phone, from its drop to its place in the hero.
  const pose = useTransform(p, (v) => phonePose(v, handoffRef.current));
  const poseX = useTransform(pose, (s) => s.x);
  const poseY = useTransform(pose, (s) => s.y);
  const poseScale = useTransform(pose, (s) => s.scale);
  const poseSquash = useTransform(pose, (s) => 1 + (0.523 - 1) * s.lying);
  const poseYaw = useTransform(pose, (s) => Math.cos(s.b));
  const poseSpin = useTransform(pose, (s) => (s.c * 180) / Math.PI);
  const poseShow = useTransform(pose, (s) => s.show);
  const poseOpacity = useTransform([poseShow, threeMix], ([s, m]: number[]) => s * (1 - m));
  const phoneDisplay = useTransform([p, threeMix], ([v, m]: number[]) => (v >= BEATS[3] + 0.01 && m < 0.99 ? 'inline' : 'none'));

  // Beat 5: tray, dome, people.
  const objects = useTransform(p, (v) => serve(v, handoffRef.current));
  const trayX = useTransform(objects, (s) => s.trayX);
  const trayY = useTransform(objects, (s) => s.trayY);
  const trayRoll = useTransform(objects, (s) => (s.trayRoll * 180) / Math.PI);
  const domeX = useTransform(objects, (s) => s.trayX + s.domeLift * handoffRef.current.up * 0.25);
  const domeY = useTransform(objects, (s) => s.trayY + s.domeY - s.domeLift * handoffRef.current.up);
  const domeRoll = useTransform(objects, (s) => s.domeLift * 34 + (s.trayRoll * 180) / Math.PI);
  const domeDisplay = useTransform([p, threeMix], ([v, m]: number[]) => (v >= BEATS[4] - 0.01 && v < 0.9 && m < 0.99 ? 'inline' : 'none'));
  const trayDisplay = useTransform([p, threeMix], ([v, m]: number[]) => (v >= BEATS[4] - 0.01 && v < 0.999 && m < 0.99 ? 'inline' : 'none'));
  const solid = useTransform(threeMix, (m) => 1 - m);

  const sketchDisplay = useWindow(p, 0, BEATS[2] + 0.005);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 480 560"
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="xMidYMid meet"
      className="intro-art block h-full w-full"
      style={{ overflow: 'visible' }}
    >
      {/* Beats 1 to 3: pencil on paper. Everything here folds away at the end of beat 3. */}
      <motion.g className={VB} style={{ display: foldDisplay, scaleY: foldY, originX: 0.5, originY: 0.5 }}>
        <motion.g style={{ display: sketchDisplay, opacity: sketchOpacity }}>
          <g transform="translate(240 280)">
            <Pen d={P.SCRIBBLE} driver={p} from={beatRange(0, 0, 0.5)[0]} to={beatRange(0, 0, 0.5)[1]} w={2.2} double className="stroke-ink" />
          </g>
          <Pen d={P.PHONE_SKETCH} driver={p} from={beatRange(0, 0.3, 0.8)[0]} to={beatRange(0, 0.3, 0.8)[1]} w={2.7} double />
          <Pen d={P.UNDERLINE} driver={p} from={beatRange(0, 0.78, 0.95)[0]} to={beatRange(0, 0.78, 0.95)[1]} w={2} />
          <Pen d={P.CROSS_OUT} driver={p} from={beatRange(0, 0.82, 1)[0]} to={beatRange(0, 0.82, 1)[1]} w={2.2} />
          <Pen d={P.MARGIN_ARROW} driver={p} from={beatRange(0, 0.8, 1)[0]} to={beatRange(0, 0.8, 1)[1]} w={2} />
        </motion.g>

        <motion.g style={{ opacity: wireOpacity }}>
          <Pen d={P.PHONE_CLEAN} driver={p} from={beatRange(1, 0, 0.5)[0]} to={beatRange(1, 0, 0.5)[1]} w={2.7} double />
          <motion.g style={{ x: boxAx, y: boxAy }}>
            <Pen d={P.BOX_A} driver={p} from={beatRange(0, 0.5, 0.9)[0]} to={beatRange(0, 0.5, 0.9)[1]} w={2.4} double />
          </motion.g>
          <motion.g style={{ x: boxBx, y: boxBy }}>
            <Pen d={P.BOX_B} driver={p} from={beatRange(0, 0.6, 1)[0]} to={beatRange(0, 0.6, 1)[1]} w={2.4} double />
          </motion.g>
          <Pen d={P.BOX_C} driver={p} from={beatRange(1, 0.4, 0.7)[0]} to={beatRange(1, 0.4, 0.7)[1]} w={2.4} />
          <Pen d={P.HEADER_BAR} driver={p} from={beatRange(1, 0.2, 0.4)[0]} to={beatRange(1, 0.2, 0.4)[1]} w={2.8} />
          <Pen d={P.SQUIGGLES} driver={p} from={beatRange(1, 0.45, 0.85)[0]} to={beatRange(1, 0.45, 0.85)[1]} w={2} className="stroke-ink-3" />
          <Pen d={P.QUESTION} driver={p} from={beatRange(1, 0.55, 0.8)[0]} to={beatRange(1, 0.55, 0.8)[1]} w={2.6} />
          <Pen d={P.STRIKE} driver={p} from={beatRange(1, 0.72, 0.9)[0]} to={beatRange(1, 0.72, 0.9)[1]} w={2.4} />
          <Pen d={P.V2} driver={p} from={beatRange(1, 0.6, 0.85)[0]} to={beatRange(1, 0.6, 0.85)[1]} w={2.2} className="stroke-ink-2" />
          <Pen d={P.V2_STRIKE} driver={p} from={beatRange(1, 0.82, 1)[0]} to={beatRange(1, 0.82, 1)[1]} w={2.2} />

          <motion.g style={{ x: noteLx, opacity: noteOpacity }}>
            <path d={P.NOTE_LEFT} className="fill-raised" />
            <Pen d={P.NOTE_LEFT} driver={p} from={noteA} to={noteB} w={2} />
            <Pen d={P.NOTE_LINES_L} driver={p} from={noteB - 0.01} to={beatRange(1, 0.8, 0.95)[1]} w={1.8} className="stroke-ink-3" />
          </motion.g>
          <motion.g style={{ x: noteRx, opacity: noteOpacity }}>
            <path d={P.NOTE_RIGHT} className="fill-raised" />
            <Pen d={P.NOTE_RIGHT} driver={p} from={noteA} to={noteB} w={2} />
            <Pen d={P.NOTE_LINES_R} driver={p} from={noteB - 0.01} to={beatRange(1, 0.8, 0.95)[1]} w={1.8} className="stroke-ink-3" />
            <Pen d={P.NOTE_STRIKE} driver={p} from={beatRange(1, 0.85, 1)[0]} to={beatRange(1, 0.85, 1)[1]} w={2.4} />
          </motion.g>
          <Pen d={P.NOTE_ARROW} driver={p} from={beatRange(1, 0.7, 0.95)[0]} to={beatRange(1, 0.7, 0.95)[1]} w={2} className="stroke-ink-2" />
        </motion.g>

        <Paper d={P.CARD} driver={p} from={beatRange(2, 0.05, 0.3)[0]} to={beatRange(2, 0.05, 0.3)[1]} className="fill-surface" />
        <Pen d={P.CARD} driver={p} from={beatRange(2, 0.05, 0.4)[0]} to={beatRange(2, 0.05, 0.4)[1]} w={2.8} double />
        {CODE.map((_, i) => (
          <CodeLine key={i} index={i} progress={p} />
        ))}

        <Spark progress={p} auto={auto} />
      </motion.g>

      {/* Beat 3 to 4: the folded card opens as a square tile, then an app icon. */}
      <motion.g className={VB} style={{ display: tileDisplay, scaleY: tileY, originX: 0.5, originY: 0.5 }}>
        <motion.g style={{ opacity: floatOpacity }}>
          <g transform={`translate(${PHONE_CX} 0)`}>
            <motion.g className={VB} style={{ y: floatY, scale: floatScale, originX: 0, originY: 0 }}>
              <rect x={-60} y={-60} width={120} height={120} rx={8} strokeWidth={2.6} className="fill-raised stroke-ink" />
              <motion.rect x={-60} y={-60} width={120} height={120} rx={26.8} style={{ opacity: iconFill }} className="fill-fill" />
              <motion.path d={P.GLYPH} style={{ opacity: tileGlyphOpacity }} strokeWidth={3} strokeLinecap="round" className="fill-none stroke-white" />
            </motion.g>
          </g>
        </motion.g>
      </motion.g>

      {/* Beat 4 and 5: phone, tray, dome. The 3D layer replaces these while it is up. */}
      <motion.g style={{ display: trayDisplay, opacity: solid }}>
        <motion.g style={{ x: trayX, y: trayY, rotate: trayRoll, originX: 0.5, originY: 0.629 }} className={VB}>
          <path d={P.TRAY_RIM} strokeWidth={2.6} className="fill-raised stroke-ink" />
          <path d={P.TRAY_FACE} strokeWidth={1.8} className="fill-surface stroke-line-strong" />
        </motion.g>
      </motion.g>

      <motion.g style={{ display: phoneDisplay, opacity: poseOpacity }}>
        <g transform={`translate(${PHONE_CX} ${PHONE_CY})`}>
          <motion.g className={VB} style={{ x: poseX, y: poseY, scale: poseScale, scaleY: poseSquash, originX: 0, originY: 0 }}>
            <motion.g className={VB} style={{ scaleX: poseYaw, originX: 0, originY: 0 }}>
              <motion.g className={VB} style={{ rotate: poseSpin, originX: 0, originY: 0 }}>
                <rect x={-PHONE_W / 2} y={-PHONE_H / 2} width={PHONE_W} height={PHONE_H} rx={18} strokeWidth={2.5} className="fill-device stroke-ink" />
                <rect x={-PHONE_W / 2 + 5.5} y={-PHONE_H / 2 + 5.5} width={PHONE_W - 11} height={PHONE_H - 11} rx={13} className="fill-surface" />
                <rect x={-17} y={-PHONE_H / 2 + 11} width={34} height={9} rx={4.5} className="fill-device" />
                <path d={SCREEN_TILES} className="fill-line" />
                <rect x={-47} y={92} width={94} height={20} rx={10} className="fill-raised" />
                <motion.g style={{ opacity: docked }}>
                  <rect x={-12} y={-41 - 12} width={24} height={24} rx={5.4} className="fill-fill" />
                  <g transform="translate(0 -41) scale(0.2)">
                    <path d={P.GLYPH} strokeWidth={9} strokeLinecap="round" className="fill-none stroke-white" />
                  </g>
                </motion.g>
              </motion.g>
            </motion.g>
          </motion.g>
        </g>
      </motion.g>

      <motion.g style={{ display: domeDisplay, opacity: solid }}>
        <motion.g style={{ x: domeX, y: domeY, rotate: domeRoll, originX: 0.5, originY: 0.629 }} className={VB}>
          <path d={P.DOME_BASE} strokeWidth={2.4} className="fill-raised stroke-ink" />
          <path d={P.DOME} strokeWidth={2.6} className="fill-surface stroke-ink" />
          <path d={P.DOME_SHINE} strokeWidth={3} strokeLinecap="round" className="fill-none stroke-line" />
          <circle cx={240} cy={207} r={9} strokeWidth={2.4} className="fill-raised stroke-ink" />
        </motion.g>
      </motion.g>
    </svg>
  );
};

/** Ease out with a small overshoot, for things that snap into place. */
function easeOutBackSoft(t: number): number {
  const c = 1.1;
  return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2);
}

// Seven grey app tiles on a 3 by 3 grid. The middle slot is left for the icon.
const SCREEN_TILES = (() => {
  let d = '';
  for (let row = 0; row < 3; row += 1) {
    for (let col = 0; col < 3; col += 1) {
      if (row === 1 && col === 1) continue;
      const x = -34 + col * 34 - 12;
      const y = -75 + row * 34 - 12;
      d += `M${x + 5.4} ${y}h13.2a5.4 5.4 0 0 1 5.4 5.4v13.2a5.4 5.4 0 0 1-5.4 5.4h-13.2a5.4 5.4 0 0 1-5.4-5.4v-13.2a5.4 5.4 0 0 1 5.4-5.4z`;
    }
  }
  return d;
})();

/** Angle of the arm, in degrees: it comes in from the lower right. */
const ARM_ANGLE = 14;
/** How far along the arm the hand waits, off screen. */
const ARM_OFF = 760;

/** The hand for beat 5. A second SVG over the 3D canvas, so it reaches in front of the tray and takes the phone. */
export const IntroHands: React.FC<{ progress: MV; handoff?: Handoff; svgRef?: React.Ref<SVGSVGElement> }> = ({ progress, handoff = NO_HANDOFF, svgRef }) => {
  const handoffRef = useRef(handoff);
  useLayoutEffect(() => {
    handoffRef.current = handoff;
  }, [handoff]);
  const grip = useTransform(progress, (v) => gripPoint(phonePose(v, handoffRef.current)));
  const gripX = useTransform(grip, (g) => g.x);
  const gripY = useTransform(grip, (g) => g.y);
  const reach = useTransform(progress, (v) => serve(v).reach);
  const leave = useTransform(progress, (v) => serve(v).leave);
  const away = useTransform([reach, leave], ([r, l]: number[]) => (1 - easeOut(r)) * ARM_OFF + l * ARM_OFF);
  const shown = useTransform(reach, (r) => clamp(r * 8));
  const display = useWindow(progress, BEATS[4] + 0.3 * 0.45, 1.01);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 480 560"
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="xMidYMid meet"
      className="intro-art block h-full w-full"
      style={{ overflow: 'visible' }}
    >
      <motion.g style={{ display, opacity: shown, x: gripX, y: gripY }}>
        <g transform={`rotate(${ARM_ANGLE})`}>
          <motion.g style={{ x: away }}>
            <path d={P.SLEEVE} strokeWidth={2.4} strokeLinejoin="round" className="fill-raised stroke-ink" />
            <path d={P.HAND_FILL} className="fill-surface" />
            <Pen d={P.HAND_BACK} driver={reach} from={0} to={0.8} w={2.6} double />
            <Pen d={P.HAND_THUMB} driver={reach} from={0.1} to={0.9} w={2.6} double />
            <Pen d={P.HAND_MARKS} driver={reach} from={0.5} to={1} w={1.9} className="stroke-ink-2" />
          </motion.g>
        </g>
      </motion.g>
    </svg>
  );
};

export default IntroArt;
