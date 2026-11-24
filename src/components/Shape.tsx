'use client';

import { useEffect, useId, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { outline, type Focus, type FormCode } from '@/lib/shape';

type Tone = 'g0' | 'g1' | 'g2' | 'g3';

type ShapeProps = {
  form?: FormCode;
  amp?: number;
  focus?: Focus;
  tone?: Tone;
  className?: string;
  children: ReactNode;
  style?: CSSProperties;
  id?: string;
};

/** Eine echte Glasfläche: Kontur als clip-path-kompatibler SVG-Pfad, Inhalt bleibt gerade. */
export function Shape({ form = 'P0', amp = 8, focus = 'left', tone = 'g1', className = '', children, style, id }: ShapeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const uid = useId().replace(/:/g, '');
  const [size, setSize] = useState({ w: 640, h: 320 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setSize({ w: el.offsetWidth, h: el.offsetHeight });
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const a = amp;
  const path = outline(size.w, size.h, a, form, focus);
  const w = size.w + a * 2;
  const h = size.h + a * 2;

  return (
    <div
      ref={ref}
      id={id}
      className={`shape shape--${tone} ${className}`}
      style={{ ...style, ['--amp' as string]: `${a}px` } as CSSProperties}
    >
      <svg className="shape__svg" width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id={`g-${uid}`} x1="0" y1="0" x2="0.25" y2="1">
            <stop offset="0%" stopColor="var(--glass-top)" />
            <stop offset="45%" stopColor="var(--glass-mid)" />
            <stop offset="100%" stopColor="var(--glass-bottom)" />
          </linearGradient>
          <linearGradient id={`r-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fff" stopOpacity=".75" />
            <stop offset="60%" stopColor="#fff" stopOpacity=".12" />
            <stop offset="100%" stopColor="#fff" stopOpacity=".9" />
          </linearGradient>
        </defs>
        <path d={path} fill={`url(#g-${uid})`} />
        <path d={path} fill="none" stroke={`url(#r-${uid})`} strokeWidth="1" />
      </svg>
      <div className="shape__content">{children}</div>
    </div>
  );
}

/** Kleiner, runder Glaskörper für Chips, Kacheln und Icons. */
export function Pill({ children, className = '', tone = 'g1' }: { children: ReactNode; className?: string; tone?: Tone }) {
  return <span className={`pill pill--${tone} ${className}`}>{children}</span>;
}
