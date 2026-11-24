export type FormCode =
  | 'P0' | 'P1' | 'P2' | 'P3' | 'P4' | 'P5' | 'P6' | 'P7' | 'P8' | 'P9' | 'P10';

export type Focus = 'left' | 'right' | 'center';

type Profile = 'flat' | 'pinch' | 'bell' | 'bulge' | 'wave' | 'lean' | 'pillow' | 'notch';

type Edge = { profile: Profile; sign: number; scale?: number };

export const smoothstep = (a: number, b: number, x: number): number => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * t * (t * (t * 6 - 15) + 10);
};

const pinch = (u: number) => smoothstep(0.03, 0.42, u) * (1 - smoothstep(0.66, 0.97, u));
const bell = (u: number) => Math.sin(Math.PI * u) ** 2;
const wave = (u: number) => Math.sin(2 * Math.PI * u);
const lean = (u: number) => 2 * u - 1;

function value(profile: Profile, u: number): number {
  switch (profile) {
    case 'pinch': return pinch(u);
    case 'bell': return bell(u);
    case 'bulge': return bell(u);
    case 'wave': return wave(u);
    case 'lean': return lean(u);
    case 'pillow': return bell(u) * 0.36;
    default: return 0;
  }
}

/** Welche Kante welchen Formprofile trägt. Sign: +1 = nach außen, -1 = nach innen. */
export function edgesFor(code: FormCode, focus: Focus = 'left'): Record<'top' | 'right' | 'bottom' | 'left', Edge> {
  const base: Record<'top' | 'right' | 'bottom' | 'left', Edge> = {
    top: { profile: 'flat', sign: 0 },
    right: { profile: 'flat', sign: 0 },
    bottom: { profile: 'flat', sign: 0 },
    left: { profile: 'flat', sign: 0 },
  };
  switch (code) {
    case 'P1': base[focus === 'right' ? 'left' : 'right'] = { profile: 'pinch', sign: -1 }; break;
    case 'P2': base.left = { profile: 'bell', sign: -1 }; base.right = { profile: 'bell', sign: -1 }; break;
    case 'P3': base.left = { profile: 'bulge', sign: 1 }; base.right = { profile: 'bulge', sign: 1 };
      base.top = { profile: 'bulge', sign: 1, scale: 0.5 }; base.bottom = { profile: 'bulge', sign: 1, scale: 0.5 }; break;
    case 'P4': base.top = { profile: 'bulge', sign: 1 }; break;
    case 'P5': base.bottom = { profile: 'bulge', sign: 1 }; break;
    case 'P6': base.bottom = { profile: 'wave', sign: 1 }; break;
    case 'P7': base.left = { profile: 'lean', sign: 1 }; base.right = { profile: 'lean', sign: 1 }; break;
    case 'P8': base.top = { profile: 'notch', sign: 1 }; base.right = { profile: 'notch', sign: 1 }; break;
    case 'P9':
      base.left = { profile: 'pillow', sign: 1 }; base.right = { profile: 'pillow', sign: 1 };
      base.top = { profile: 'pillow', sign: 1 }; base.bottom = { profile: 'pillow', sign: 1 }; break;
    case 'P10': base.bottom = { profile: 'pinch', sign: 0.2 }; break;
    default: break;
  }
  return base;
}

type Pt = [number, number];

/** Berechnet die Außenkontur in einem um A px erweiterten Koordinatensystem. */
export function outline(width: number, height: number, amp: number, code: FormCode, focus: Focus = 'left'): string {
  if (code === 'P0' || amp <= 0) {
    return `M 0 0 L ${width} 0 L ${width} ${height} L 0 ${height} Z`;
  }
  if (code === 'P8') {
    const c = Math.min(32, Math.min(width, height) * 0.22);
    return `M 0 0 L ${width - c} 0 L ${width} ${c} L ${width} ${height} L 0 ${height} Z`;
  }
  const e = edgesFor(code, focus);
  const n = 18;
  const off = amp;
  const pts: Pt[] = [];
  const push = (p: Pt) => pts.push([p[0] + off, p[1] + off]);
  const ampOf = (edge: Edge) => amp * (edge.scale ?? 1);

  for (let i = 0; i <= n; i++) {
    const u = i / n;
    const edge = e.top;
    push([width * u, -value(edge.profile, u) * edge.sign * ampOf(edge)]);
  }
  for (let i = 0; i <= n; i++) {
    const u = i / n;
    const edge = e.right;
    push([width + value(edge.profile, u) * edge.sign * ampOf(edge), height * u]);
  }
  for (let i = 0; i <= n; i++) {
    const u = 1 - i / n;
    const edge = e.bottom;
    push([width * u, height + value(edge.profile, u) * edge.sign * ampOf(edge)]);
  }
  for (let i = 0; i <= n; i++) {
    const u = 1 - i / n;
    const edge = e.left;
    push([-value(edge.profile, u) * edge.sign * ampOf(edge), height * u]);
  }
  return pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0].toFixed(2)} ${p[1].toFixed(2)}`).join(' ') + ' Z';
}

/** Gibt die polygon()-Punkte für denselben Pfad zurück (für Nicht-SVG-Fallbacks). */
export function polygonPoints(width: number, height: number, amp: number, code: FormCode, focus: Focus = 'left'): string {
  const path = outline(width, height, amp, code, focus);
  return path.replace(/[ML]\s*/g, '').replace(' Z', '').split(/\s+/).filter(Boolean)
    .reduce<string[]>((acc, v, i, arr) => { if (i % 2 === 0) acc.push(`${v}px ${arr[i + 1]}px`); return acc; }, [])
    .join(', ');
}
