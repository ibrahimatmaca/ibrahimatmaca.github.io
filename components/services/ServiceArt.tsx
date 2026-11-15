import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { line, roughRect, softRect } from '../intro/introPaths';

/**
 * One pencil drawing per service, in the same hand-drawn language as the intro. Every path is baked
 * once at module load, so rendering only mounts the elements and lets them draw themselves.
 */

const EASE = [0.77, 0, 0.175, 1] as const;

const circle = (cx: number, cy: number, r: number) => `M${cx - r} ${cy}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;
const arrowHead = (x: number, y: number, dx: number, dy: number, seed: number) =>
  line(x - dx * 9 - dy * 5, y - dy * 9 + dx * 5, x, y, seed, 0.4) + line(x - dx * 9 + dy * 5, y - dy * 9 - dx * 5, x, y, seed + 1, 0.4);

type Delay = () => number;

interface PenProps {
  d: string;
  delay: number;
  w?: number;
  cls?: string;
  fillCls?: string;
}

/** A stroke that draws itself. Under Reduce Motion it only fades in. */
const Pen: React.FC<PenProps> = ({ d, delay, w = 2, cls = 'stroke-ink', fillCls = 'fill-none' }) => {
  const reduce = useReducedMotion();
  return (
    <motion.path
      d={d}
      strokeWidth={w}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${fillCls} ${cls}`}
      initial={reduce ? { opacity: 0 } : { pathLength: 0, opacity: 0 }}
      animate={reduce ? { opacity: 1 } : { pathLength: 1, opacity: 1 }}
      transition={
        reduce
          ? { duration: 0.2 }
          : { pathLength: { duration: 0.5, delay, ease: EASE }, opacity: { duration: 0.05, delay } }
      }
    />
  );
};

/** Fill-only shape that fades in. */
const Wash: React.FC<{ d: string; delay: number; cls?: string }> = ({ d, delay, cls = 'fill-raised' }) => {
  const reduce = useReducedMotion();
  return (
    <motion.path
      d={d}
      className={`stroke-none ${cls}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reduce ? 0.2 : 0.4, delay: reduce ? 0 : delay + 0.1 }}
    />
  );
};

type Token = [text: string, keyword?: boolean];

const CodeCard: React.FC<{ x: number; y: number; w: number; h: number; seed: number; lines: Token[][]; delay: Delay }> = ({
  x,
  y,
  w,
  h,
  seed,
  lines,
  delay,
}) => {
  const reduce = useReducedMotion();
  const outline = React.useMemo(() => roughRect(x, y, w, h, seed), [x, y, w, h, seed]);
  const wash = React.useMemo(() => softRect(x, y, w, h, 6, seed + 40, 0.3), [x, y, w, h, seed]);
  const base = delay();
  return (
    <g>
      <Wash d={wash} delay={base} cls="fill-surface" />
      <Pen d={outline} delay={base} w={1.8} cls="stroke-ink-2" />
      <text x={x + 14} y={y + 26} className="font-mono" fontSize="12" style={{ whiteSpace: 'pre' }}>
        {lines.map((tokens, i) => (
          <motion.tspan
            key={i}
            x={x + 14}
            dy={i === 0 ? 0 : 20}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduce ? 0.2 : 0.25, delay: reduce ? 0 : base + 0.35 + i * 0.09 }}
          >
            {tokens.map(([text, keyword], j) => (
              <tspan key={j} className={keyword ? 'fill-tint' : 'fill-ink'}>
                {text}
              </tspan>
            ))}
          </motion.tspan>
        ))}
      </text>
    </g>
  );
};

/** Sequential delays so a drawing is laid down stroke by stroke, with a cap so it never drags. */
const sequence = (): Delay => {
  let n = 0;
  return () => Math.min(0.08 + n++ * 0.055, 1.1);
};

/* ---------------------------------------------------------------- iOS */
const IOS = {
  phone: softRect(70, 24, 170, 312, 30, 11),
  island: line(134, 44, 176, 44, 12, 0.6),
  header: roughRect(88, 62, 134, 26, 13),
  card1: roughRect(88, 102, 134, 68, 14),
  card2: roughRect(88, 182, 134, 68, 15),
  dot: circle(106, 136, 9),
  dot2: circle(106, 216, 9),
  t1: line(124, 128, 200, 128, 16, 0.8),
  t2: line(124, 144, 180, 144, 17, 0.8),
  t3: line(124, 208, 200, 208, 18, 0.8),
  t4: line(124, 224, 170, 224, 19, 0.8),
  button: softRect(88, 266, 134, 34, 14, 20),
  btnLabel: line(130, 283, 180, 283, 21, 0.6),
  home: line(122, 322, 188, 322, 22, 0.6),
  link: line(224, 136, 258, 136, 23, 1) + arrowHead(258, 136, 1, 0, 24),
  link2: line(224, 216, 258, 190, 25, 1.4),
};

const iosCode: Token[][] = [
  [['struct', true], [' Home: '], ['View', true], [' {']],
  [['  var', true], [' body: '], ['some View', true], [' {']],
  [['    VStack(spacing: 12) {']],
  [['      Header()']],
  [['      Card()']],
  [['    }']],
];

export const IosArt: React.FC = () => {
  const d = sequence();
  return (
    <>
      <Wash d={IOS.phone} delay={0} cls="fill-surface" />
      <Pen d={IOS.phone} delay={d()} w={2.4} />
      <Pen d={IOS.island} delay={d()} w={5} />
      <Wash d={IOS.header} delay={0.2} />
      <Pen d={IOS.header} delay={d()} cls="stroke-ink-2" />
      <Pen d={IOS.card1} delay={d()} cls="stroke-ink-2" />
      <Pen d={IOS.card2} delay={d()} cls="stroke-ink-2" />
      <Pen d={IOS.dot} delay={d()} cls="stroke-tint" fillCls="fill-tint/20" />
      <Pen d={IOS.dot2} delay={d()} cls="stroke-ink-3" />
      <Pen d={IOS.t1} delay={d()} cls="stroke-ink-3" />
      <Pen d={IOS.t2} delay={d()} cls="stroke-ink-3" />
      <Pen d={IOS.t3} delay={d()} cls="stroke-ink-3" />
      <Pen d={IOS.t4} delay={d()} cls="stroke-ink-3" />
      <Pen d={IOS.button} delay={d()} cls="stroke-tint" w={2.2} />
      <Pen d={IOS.btnLabel} delay={d()} cls="stroke-tint" />
      <Pen d={IOS.home} delay={d()} cls="stroke-ink-3" w={3} />
      <Pen d={IOS.link} delay={d()} cls="stroke-tint" w={1.8} />
      <Pen d={IOS.link2} delay={d()} cls="stroke-ink-3" w={1.5} />
      <CodeCard x={262} y={86} w={200} h={150} seed={30} lines={iosCode} delay={d} />
    </>
  );
};

/* ------------------------------------------------------------ Android */
const AND = {
  phone: softRect(70, 24, 170, 312, 18, 41),
  hole: circle(155, 42, 3.5),
  bar: roughRect(88, 62, 134, 24, 42),
  card: roughRect(88, 100, 134, 118, 43),
  image: roughRect(98, 110, 114, 48, 44),
  hill: line(98, 150, 130, 128, 45, 1) + line(130, 128, 152, 144, 46, 1) + line(152, 144, 170, 132, 47, 1) + line(170, 132, 212, 152, 48, 1),
  t1: line(98, 174, 192, 174, 49, 0.8),
  t2: line(98, 190, 164, 190, 50, 0.8),
  t3: line(98, 206, 130, 206, 51, 0.8),
  r1: circle(104, 244, 9),
  r1t: line(124, 240, 190, 240, 52, 0.8),
  r1u: line(124, 252, 164, 252, 53, 0.8),
  r2: circle(104, 280, 9),
  r2t: line(124, 276, 180, 276, 54, 0.8),
  fab: softRect(184, 288, 38, 38, 14, 55),
  plus: line(203, 298, 203, 316, 56, 0.4) + line(194, 307, 212, 307, 57, 0.4),
  nav: line(122, 326, 188, 326, 58, 0.6),
  link: line(224, 150, 258, 150, 59, 1) + arrowHead(258, 150, 1, 0, 60),
};

const androidCode: Token[][] = [
  [['@Composable', true]],
  [['fun', true], [' Home() {']],
  [['  Card {']],
  [['    Text("Hello")']],
  [['  }']],
  [['}']],
];

export const AndroidArt: React.FC = () => {
  const d = sequence();
  return (
    <>
      <Wash d={AND.phone} delay={0} cls="fill-surface" />
      <Pen d={AND.phone} delay={d()} w={2.4} />
      <Pen d={AND.hole} delay={d()} w={2} fillCls="fill-ink" />
      <Wash d={AND.bar} delay={0.2} />
      <Pen d={AND.bar} delay={d()} cls="stroke-ink-2" />
      <Pen d={AND.card} delay={d()} cls="stroke-ink-2" />
      <Pen d={AND.image} delay={d()} cls="stroke-ink-3" />
      <Pen d={AND.hill} delay={d()} cls="stroke-ink-3" w={1.6} />
      <Pen d={AND.t1} delay={d()} cls="stroke-ink-3" />
      <Pen d={AND.t2} delay={d()} cls="stroke-ink-3" />
      <Pen d={AND.t3} delay={d()} cls="stroke-tint" />
      <Pen d={AND.r1} delay={d()} cls="stroke-ink-3" />
      <Pen d={AND.r1t} delay={d()} cls="stroke-ink-3" />
      <Pen d={AND.r1u} delay={d()} cls="stroke-ink-3" />
      <Pen d={AND.r2} delay={d()} cls="stroke-ink-3" />
      <Pen d={AND.r2t} delay={d()} cls="stroke-ink-3" />
      <Pen d={AND.fab} delay={d()} cls="stroke-tint" w={2.4} fillCls="fill-tint/20" />
      <Pen d={AND.plus} delay={d()} cls="stroke-tint" w={2.2} />
      <Pen d={AND.nav} delay={d()} cls="stroke-ink-3" w={3} />
      <Pen d={AND.link} delay={d()} cls="stroke-tint" w={1.8} />
      <CodeCard x={262} y={86} w={200} h={150} seed={70} lines={androidCode} delay={d} />
    </>
  );
};

/* -------------------------------------------------------- Cross-platform */
const phoneBlocks = (x: number, seed: number) => ({
  head: roughRect(x + 12, 192, 96, 16, seed),
  card: roughRect(x + 12, 220, 96, 46, seed + 1),
  l1: line(x + 20, 236, x + 90, 236, seed + 2, 0.6),
  l2: line(x + 20, 250, x + 66, 250, seed + 3, 0.6),
  l3: line(x + 12, 284, x + 108, 284, seed + 4, 0.6),
  l4: line(x + 12, 300, x + 78, 300, seed + 5, 0.6),
});

const CROSS = {
  phoneL: softRect(60, 172, 120, 170, 22, 81),
  islandL: line(105, 184, 135, 184, 82, 0.4),
  phoneR: softRect(300, 172, 120, 170, 10, 83),
  holeR: circle(360, 184, 2.8),
  left: phoneBlocks(60, 84),
  right: phoneBlocks(300, 94),
  arrowL: line(204, 126, 126, 166, 104, 3) + arrowHead(126, 166, -0.88, 0.47, 105),
  arrowR: line(276, 126, 354, 166, 106, 3) + arrowHead(354, 166, 0.88, 0.47, 107),
};

const dartCode: Token[][] = [
  [['void', true], [' main() {']],
  [['  runApp(', false], ['const', true], [' App());']],
  [['}']],
];

export const CrossArt: React.FC<{ label: string }> = ({ label }) => {
  const d = sequence();
  const chipPath = React.useMemo(() => softRect(176, 8, 128, 26, 13, 108, 0.5), []);
  return (
    <>
      <CodeCard x={150} y={22} w={180} h={96} seed={100} lines={dartCode} delay={d} />
      <Wash d={chipPath} delay={0.6} cls="fill-canvas" />
      <Pen d={chipPath} delay={0.55} cls="stroke-tint" w={1.8} />
      <motion.text
        x={240}
        y={26}
        textAnchor="middle"
        fontSize="12"
        className="fill-tint font-mono font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.8 }}
      >
        {label}
      </motion.text>
      <Pen d={CROSS.arrowL} delay={d()} cls="stroke-tint" w={1.8} />
      <Pen d={CROSS.arrowR} delay={d()} cls="stroke-tint" w={1.8} />
      <Wash d={CROSS.phoneL} delay={0.5} cls="fill-surface" />
      <Pen d={CROSS.phoneL} delay={d()} w={2.4} />
      <Pen d={CROSS.islandL} delay={d()} w={4} />
      <Wash d={CROSS.phoneR} delay={0.5} cls="fill-surface" />
      <Pen d={CROSS.phoneR} delay={d()} w={2.4} />
      <Pen d={CROSS.holeR} delay={d()} w={2} fillCls="fill-ink" />
      {[CROSS.left, CROSS.right].map((b, i) => (
        <g key={i}>
          <Pen d={b.head} delay={d()} cls="stroke-ink-2" />
          <Pen d={b.card} delay={d()} cls="stroke-ink-2" />
          <Pen d={b.l1} delay={d()} cls="stroke-ink-3" />
          <Pen d={b.l2} delay={d()} cls="stroke-ink-3" />
          <Pen d={b.l3} delay={d()} cls="stroke-ink-3" />
          <Pen d={b.l4} delay={d()} cls="stroke-tint" />
        </g>
      ))}
    </>
  );
};

/* ------------------------------------------------------------- Fintech */
const FIN = {
  card: roughRect(40, 112, 176, 108, 121),
  cardWash: softRect(40, 112, 176, 108, 8, 122, 0.3),
  stripe: roughRect(40, 134, 176, 20, 123, 0.8),
  chip: softRect(58, 168, 30, 22, 5, 124),
  n1: line(58, 206, 82, 206, 125, 0.5),
  n2: line(96, 206, 120, 206, 126, 0.5),
  n3: line(134, 206, 158, 206, 127, 0.5),
  pos: softRect(296, 40, 148, 272, 18, 128),
  screen: roughRect(312, 60, 116, 66, 129),
  amount: line(324, 108, 372, 108, 130, 0.6),
  check: 'M392 90l8 8 16-18',
  keys: [0, 1, 2].flatMap((r) => [0, 1, 2].map((c) => circle(334 + c * 36, 158 + r * 30, 6.5))),
  action: softRect(312, 256, 116, 34, 12, 131),
  slot: line(330, 48, 410, 48, 132, 0.4),
  flow: 'M222 150C246 112 266 112 288 140',
  flowHead: arrowHead(290, 142, 0.7, 0.7, 133),
  lock: 'M250 192v-8a9 9 0 0 1 18 0v8',
  lockBody: roughRect(244, 192, 30, 24, 134, 0.8),
  key: circle(259, 204, 2.6),
};

export const FintechArt: React.FC = () => {
  const d = sequence();
  const reduce = useReducedMotion();
  return (
    <>
      <g transform="rotate(-7 128 166)">
        <Wash d={FIN.cardWash} delay={0} cls="fill-surface" />
        <Pen d={FIN.card} delay={d()} w={2.4} />
        <Wash d={FIN.stripe} delay={0.3} />
        <Pen d={FIN.stripe} delay={d()} cls="stroke-ink-3" w={1.6} />
        <Pen d={FIN.chip} delay={d()} cls="stroke-tint" fillCls="fill-tint/20" />
        <Pen d={FIN.n1} delay={d()} cls="stroke-ink-3" w={2.4} />
        <Pen d={FIN.n2} delay={d()} cls="stroke-ink-3" w={2.4} />
        <Pen d={FIN.n3} delay={d()} cls="stroke-ink-3" w={2.4} />
      </g>
      <Wash d={FIN.pos} delay={0} cls="fill-surface" />
      <Pen d={FIN.pos} delay={d()} w={2.4} />
      <Pen d={FIN.slot} delay={d()} cls="stroke-ink-3" w={3} />
      <Wash d={FIN.screen} delay={0.4} />
      <Pen d={FIN.screen} delay={d()} cls="stroke-ink-2" />
      <Pen d={FIN.amount} delay={d()} cls="stroke-ink" w={3} />
      {FIN.keys.map((k, i) => (
        <Pen key={i} d={k} delay={0.7 + i * 0.03} cls="stroke-ink-3" w={1.6} />
      ))}
      <Pen d={FIN.action} delay={d()} cls="stroke-tint" w={2.2} fillCls="fill-tint/20" />
      <Pen d={FIN.flow} delay={d()} cls="stroke-tint" w={2} />
      <Pen d={FIN.flowHead} delay={d()} cls="stroke-tint" w={2} />
      <Pen d={FIN.lockBody} delay={d()} cls="stroke-ink" w={2.2} fillCls="fill-canvas" />
      <Pen d={FIN.lock} delay={d()} cls="stroke-ink" w={2.2} />
      <Pen d={FIN.key} delay={d()} cls="stroke-tint" w={2} />
      <Pen d={FIN.check} delay={reduce ? 0 : 1.15} cls="stroke-tint" w={3.2} />
    </>
  );
};

/* ------------------------------------------------------------- Idea to App Store */
const MVP = {
  sketch: roughRect(34, 84, 112, 112, 141, 2.4),
  sketch2: roughRect(36, 86, 108, 108, 142, 2.4),
  cross1: line(34, 84, 146, 196, 143, 3),
  cross2: line(146, 84, 34, 196, 144, 3),
  scribble: line(48, 108, 118, 106, 145, 3) + line(48, 126, 96, 124, 146, 3),
  arrow: line(160, 140, 214, 140, 147, 3) + arrowHead(214, 140, 1, 0, 148),
  icon: softRect(228, 84, 112, 112, 25, 149),
  glyph: 'M254 142l22 22 38-48',
  steps: line(70, 280, 410, 280, 150, 2),
  s1: circle(70, 280, 7),
  s2: circle(240, 280, 7),
  s3: circle(410, 280, 7),
  rise: line(350, 120, 392, 120, 151, 1) + arrowHead(392, 120, 1, 0, 152),
};

export const MvpArt: React.FC<{ steps: string[] }> = ({ steps }) => {
  const d = sequence();
  const reduce = useReducedMotion();
  const xs = [70, 240, 410];
  return (
    <>
      <Pen d={MVP.sketch} delay={d()} w={1.8} cls="stroke-ink-3" />
      <Pen d={MVP.sketch2} delay={d()} w={1.4} cls="stroke-ink-3" />
      <Pen d={MVP.cross1} delay={d()} w={1.4} cls="stroke-ink-3" />
      <Pen d={MVP.cross2} delay={d()} w={1.4} cls="stroke-ink-3" />
      <Pen d={MVP.scribble} delay={d()} w={2} cls="stroke-ink-2" />
      <Pen d={MVP.arrow} delay={d()} cls="stroke-tint" w={2} />
      <Wash d={MVP.icon} delay={0.5} cls="fill-tint" />
      <Pen d={MVP.icon} delay={d()} cls="stroke-tint" w={2.4} />
      <Pen d={MVP.glyph} delay={d()} cls="stroke-canvas" w={7} />
      <Pen d={MVP.steps} delay={d()} cls="stroke-ink-3" w={1.8} />
      {[MVP.s1, MVP.s2, MVP.s3].map((s, i) => (
        <Pen key={i} d={s} delay={d()} cls={i === 2 ? 'stroke-tint' : 'stroke-ink-2'} fillCls={i === 2 ? 'fill-tint' : 'fill-canvas'} w={2.2} />
      ))}
      {xs.map((x, i) => (
        <motion.text
          key={x}
          x={x}
          y={312}
          textAnchor={i === 0 ? 'start' : i === 2 ? 'end' : 'middle'}
          fontSize="12"
          className={`font-mono ${i === 2 ? 'fill-tint' : 'fill-ink-2'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduce ? 0.2 : 0.3, delay: reduce ? 0 : 0.9 + i * 0.1 }}
        >
          {steps[i]}
        </motion.text>
      ))}
    </>
  );
};

export const ServiceArt: React.FC<{ id: string; codebase: string; steps: string[] }> = ({ id, codebase, steps }) => (
  <svg viewBox="0 0 480 360" aria-hidden="true" focusable="false" className="absolute inset-0 h-full w-full overflow-visible">
    {id === 'ios' && <IosArt />}
    {id === 'android' && <AndroidArt />}
    {id === 'flutter' && <CrossArt label={codebase} />}
    {id === 'fintech' && <FintechArt />}
    {id === 'mvp' && <MvpArt steps={steps} />}
  </svg>
);

export default ServiceArt;
