'use client';

import { Fragment, useEffect, useRef, useState, type ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const iconPaths: Record<string, ReactNode> = {
  arrow: <><path d="M4 12h15" /><path d="m13 6 6 6-6 6" /></>,
  arrowUp: <><path d="M6 18 18 6" /><path d="M9 6h9v9" /></>,
  sparkles: <><path d="m12 3 1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3Z" /><path d="m19 16 .7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z" /></>,
  refresh: <><path d="M20 11a8 8 0 1 0-2 6" /><path d="M20 4v7h-7" /></>,
  brain: <><path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-1 5.8V16a3 3 0 0 0 4 2.8" /><path d="M15 4a3 3 0 0 1 3 3 3 3 0 0 1 1 5.8V16a3 3 0 0 1-4 2.8" /><path d="M12 4v16" /></>,
  layers: <><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5" /><path d="m3 16 9 5 9-5" /></>,
  phone: <><path d="M5 3h4l2 5-2.5 1.5a12 12 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2Z" /></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M7 3v4M17 3v4M3 10h18" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
  pin: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="3" /></>,
  chevron: <path d="m6 9 6 6 6-6" />,
  check: <path d="m4 12 5 5L20 6" />,
  menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
  close: <><path d="M5 5 19 19M19 5 5 19" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="m16 16 5 5" /></>,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>,
  moon: <path d="M20 15.5A8.5 8.5 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5Z" />,
  command: <><path d="M9 6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6Z" /></>,
  shield: <><path d="m12 3 8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3Z" /><path d="m9 12 2 2 4-4" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  cart: <><path d="M3 4h2l2.1 11h10.7L20 7H6" /><circle cx="9" cy="20" r="1.4" /><circle cx="17" cy="20" r="1.4" /></>,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
  quote: <path d="M9 7H5a2 2 0 0 0-2 2v3h5v5H3v-5M20 7h-4a2 2 0 0 0-2 2v3h5v5h-5v-5" />,
  plus: <><path d="M12 5v14M5 12h14" /></>,
  filter: <><path d="M3 5h18l-7 8v6l-4 2v-8L3 5Z" /></>,
  compass: <><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" /></>,
  crystal: <><path d="m12 2 7 6-7 14L5 8l7-6Z" /><path d="M5 8h14M12 2l-2 6 2 14 2-14-2-6Z" /></>,
  link: <><path d="M10 13a5 5 0 0 0 7 0l2-2a5 5 0 0 0-7-7l-1 1" /><path d="M14 11a5 5 0 0 0-7 0l-2 2a5 5 0 0 0 7 7l1-1" /></>,
  target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /></>,
  chart: <><path d="M4 20V4M4 20h16" /><path d="m7 15 4-5 3 3 5-7" /></>,
  leaf: <><path d="M20 4C9 4 4 9 4 15a5 5 0 0 0 5 5c6 0 11-5 11-16Z" /><path d="M4 20C8 14 13 10 18 7" /></>,
  sprout: <><path d="M12 21v-9" /><path d="M12 12C7 12 4 9 4 4c5 0 8 3 8 8Z" /><path d="M12 14c0-5 3-8 8-8 0 5-3 8-8 8Z" /></>,
  heart: <path d="M20.8 5.6a5.4 5.4 0 0 0-7.6 0L12 6.8l-1.2-1.2a5.4 5.4 0 0 0-7.6 7.6L12 21l8.8-7.8a5.4 5.4 0 0 0 0-7.6Z" />,
  share: <><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="m8.6 10.6 6.8-4m-6.8 7 6.8 4" /></>,
  users: <><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0" /><path d="M16 5a3.5 3.5 0 0 1 0 7M18 14.5a6.5 6.5 0 0 1 3.5 5.5" /></>,
  flag: <><path d="M5 21V4" /><path d="M5 4h11l-2 4 2 4H5" /></>,
  arrowLeft: <><path d="M20 12H5" /><path d="m11 6-6 6 6 6" /></>,
  play: <path d="m8 5 11 7-11 7V5Z" />,
  pause: <><path d="M9 5v14" /><path d="M15 5v14" /></>,
  store: <><path d="M3 9 5 4h14l2 5v2a3 3 0 0 1-6 0 3 3 0 0 1-6 0 3 3 0 0 1-6 0V9Z" /><path d="M5 13v7h14v-7" /><path d="M9 20v-5h6v5" /></>,
  carrot: <><path d="M15 9c-2-2-6-2-9 1-2 2-3 5-4 9 4-1 7-2 9-4 3-3 3-7 4-6Z" /><path d="M14 9c1-3 3-5 6-5-1 3-3 5-6 5Z" /><path d="M13 10c3-1 5-3 6-6" /></>,
  egg: <><path d="M12 21c4.4 0 7-4.8 7-9.5A7 7 0 0 0 5 11.5C5 16.2 7.6 21 12 21Z" /></>,
  milk: <><path d="M9 3h6v3l2 3v11a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V9l2-3V3Z" /><path d="M7 9h10" /><path d="M10 14h4" /></>,
  wheat: <><path d="M12 21V8" /><path d="M12 12c-3 0-5-2-5-5 3 0 5 2 5 5Zm0 0c3 0 5-2 5-5-3 0-5 2-5 5Zm0 5c-3 0-5-2-5-5 3 0 5 2 5 5Zm0 0c3 0 5-2 5-5-3 0-5 2-5 5Z" /></>,
  tractor: <><circle cx="6" cy="17" r="3.5" /><circle cx="18" cy="18" r="2.5" /><path d="M9.5 17h6M6 13.5V9h6l3 5" /><path d="M12 9V5h4" /></>,
  info: <><circle cx="12" cy="12" r="9" /><path d="M12 11v5" /><path d="M12 8h.01" /></>,
  alert: <><path d="m12 3 10 18H2L12 3Z" /><path d="M12 9v5" /><path d="M12 18h.01" /></>,
  camera: <><path d="M4 8h3l2-3h6l2 3h3v12H4V8Z" /><circle cx="12" cy="13" r="3.5" /></>,
  map: <><path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z" /><path d="M9 3v15M15 6v15" /></>,
  external: <><path d="M13 4h7v7" /><path d="M20 4 10 14" /><path d="M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" /></>,
};

export function Fraktur({ children }: { children: ReactNode }) {
  return <span className="fraktur">{children}</span>;
}

export function FrakturText({ children }: { children: ReactNode }) {
  if (typeof children !== 'string') return <>{children}</>;
  return <>{children.split(/(Irlenhofs?)/g).map((part, i) => (
    part.startsWith('Irlenhof') ? <Fraktur key={i}>{part}</Fraktur> : part
  ))}</>;
}

export function Icon({ name, size = 20, className = '' }: { name: string; size?: number; className?: string }) {
  return (
    <svg className={`icon ${className}`} width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {iconPaths[name] ?? iconPaths.crystal}
    </svg>
  );
}

export function Button({ children, href, variant = 'primary', className = '', icon, onClick, type = 'button', disabled, ariaLabel }: {
  children?: ReactNode; href?: string; variant?: 'primary' | 'secondary' | 'ghost' | 'link';
  className?: string; icon?: string; onClick?: () => void; type?: 'button' | 'submit'; disabled?: boolean; ariaLabel?: string;
}) {
  const cls = `btn btn--${variant} ${className}`;
  const inner = <><FrakturText>{children}</FrakturText>{icon && <Icon name={icon} size={17} />}</>;
  if (href) return <Link href={href} className={cls} aria-label={ariaLabel}>{inner}</Link>;
  return <button type={type} className={cls} onClick={onClick} disabled={disabled} aria-label={ariaLabel}>{inner}</button>;
}

export function Chip({ children, active, onClick, href, className = '' }: {
  children: ReactNode; active?: boolean; onClick?: () => void; href?: string; className?: string;
}) {
  const cls = `chip ${active ? 'is-active' : ''} ${className}`;
  const content = <FrakturText>{children}</FrakturText>;
  if (href) return <Link href={href} className={cls}>{content}</Link>;
  if (onClick) return <button type="button" className={cls} onClick={onClick} aria-pressed={active}>{content}</button>;
  return <span className={cls}>{content}</span>;
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow"><span className="eyebrow__line" /><FrakturText>{children}</FrakturText></p>;
}

export function SectionHead({ eyebrow, title, lead, accent, align = 'left' }: {
  eyebrow?: string; title: string; lead?: string; accent?: string; align?: 'left' | 'center';
}) {
  return (
    <Reveal variant="text" className={`section-head section-head--${align}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2><SplitText text={title} accent={accent} /></h2>
      {lead && <p className="lead"><FrakturText>{lead}</FrakturText></p>}
    </Reveal>
  );
}

export function Accordion({ items, name = 'faq' }: { items: { q: string; a: string }[]; name?: string }) {
  return (
    <div className="accordion">
      {items.map((item) => (
        <details key={item.q} name={name} className="accordion__item">
          <summary><span><FrakturText>{item.q}</FrakturText></span><Icon name="plus" size={18} /></summary>
          <div className="accordion__body"><p><FrakturText>{item.a}</FrakturText></p></div>
        </details>
      ))}
    </div>
  );
}

export function SplitText({ text, accent, frakturAccent = false }: { text: string; accent?: string; frakturAccent?: boolean }) {
  const parts = accent ? text.split(accent) : [text];
  let word = 0;
  const render = (part: string, isAccent: boolean) =>
    part.split(/\s+/).filter(Boolean).flatMap((w, i) => {
      const inner = (
        <span className="split-word__inner" style={{ transitionDelay: `${word++ * 75}ms` }}>
          {isAccent ? <em>{frakturAccent ? <FrakturText>{w}</FrakturText> : w}</em> : <FrakturText>{w}</FrakturText>}
        </span>
      );
      return [<span className="split-word" key={`${isAccent ? 'a' : 't'}-${i}-${w}`}>{inner}</span>, ' '];
    });
  return <>{parts.map((part, i) => (
    <Fragment key={i}>{render(part, false)}{i < parts.length - 1 && render(accent ?? '', true)}</Fragment>
  ))}</>;
}

type RevealVariant = 'up' | 'left' | 'right' | 'cards' | 'text';

export function Reveal({ children, delay = 0, className = '', variant = 'up' }: {
  children: ReactNode; delay?: number; className?: string; variant?: RevealVariant;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    document.documentElement.classList.add('has-js');
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) { el.classList.add('is-in'); io.disconnect(); }
    }, { threshold: 0.06, rootMargin: '0px 0px -4% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`reveal reveal--${variant} ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

export function Counter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { setN(value); return; }
    let raf = 0;
    const io = new IntersectionObserver((entries) => {
      if (!entries[0]?.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / 1100);
        setN(Math.round(value * (1 - (1 - p) ** 3)));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [value]);
  return <span ref={ref}>{n}{suffix}</span>;
}

export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="stat">
      <strong className="stat__value"><FrakturText>{value}</FrakturText></strong>
      <span className="stat__label"><FrakturText>{label}</FrakturText></span>
    </div>
  );
}

export function Marquee({ items }: { items: string[] }) {
  const repeated = Array.from({ length: 6 }, () => items).flat();
  return (
    <div className="marquee" aria-label="Schlagwörter">
      <div className="marquee__track">
        {[...repeated, ...repeated].map((item, i) => <span className="marquee__item" key={i} aria-hidden={i >= items.length}><FrakturText>{item}</FrakturText></span>)}
      </div>
    </div>
  );
}

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <ol>{items.map((it, i) => (
        <li key={`${it.label}-${i}`}>
          {it.href ? <Link href={it.href}><FrakturText>{it.label}</FrakturText></Link> : <span aria-current="page"><FrakturText>{it.label}</FrakturText></span>}
          {i < items.length - 1 && <span className="crumbs__sep" aria-hidden="true">/</span>}
        </li>
      ))}</ol>
    </nav>
  );
}

export function Field({ label, name, type = 'text', required, hint, error, as = 'input', options, placeholder, value, onChange }: {
  label: string; name: string; type?: string; required?: boolean; hint?: string; error?: string;
  as?: 'input' | 'textarea' | 'select'; options?: string[]; placeholder?: string;
  value?: string; onChange?: (value: string) => void;
}) {
  const id = `field-${name}`;
  return (
    <div className={`field ${error ? 'field--error' : ''}`}>
      <label htmlFor={id}><FrakturText>{label}</FrakturText>{required && <span className="field__req"> (Pflichtfeld)</span>}</label>
      {as === 'textarea'
        ? <textarea id={id} name={name} rows={4} placeholder={placeholder} value={value} onChange={(e) => onChange?.(e.target.value)} aria-describedby={`${id}-hint ${id}-err`} aria-invalid={!!error} />
        : as === 'select'
          ? <select id={id} name={name} value={value} onChange={(e) => onChange?.(e.target.value)} aria-describedby={`${id}-hint ${id}-err`} aria-invalid={!!error}>
              {options?.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          : <input id={id} name={name} type={type} placeholder={placeholder} value={value} onChange={(e) => onChange?.(e.target.value)} aria-describedby={`${id}-hint ${id}-err`} aria-invalid={!!error} />}
      <span id={`${id}-hint`} className="field__hint">{hint}</span>
      <span id={`${id}-err`} className="field__error" role="status">{error}</span>
    </div>
  );
}

export function Stepper({ current, count, labels }: { current: number; count: number; labels: string[] }) {
  return (
    <div className="stepper" aria-label={`Schritt ${current + 1} von ${count}`}>
      {Array.from({ length: count }, (_, i) => (
        <span key={i} className={`stepper__dot ${i < current ? 'is-done' : ''} ${i === current ? 'is-current' : ''}`} title={labels[i]} />
      ))}
      <span className="stepper__label">{labels[current]}</span>
    </div>
  );
}

export function Photo({ src, alt, className = '', priority = false, sizes = '(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 40vw' }: {
  src: string; alt: string; className?: string; priority?: boolean; sizes?: string;
}) {
  return (
    <span className={`photo ${className}`}>
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} />
    </span>
  );
}

export function SectionArt({ src, className = '' }: { src: string; className?: string }) {
  return (
    <Image
      src={src}
      alt=""
      aria-hidden="true"
      width={520}
      height={520}
      className={`section-art ${className}`}
      sizes="(max-width: 900px) 60vw, 420px"
    />
  );
}
