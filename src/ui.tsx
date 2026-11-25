import { animate, motion, useReducedMotion, type MotionStyle, type Variants } from 'framer-motion';
import { useEffect, useId, useState, type ReactNode } from 'react';
import { marca } from './content';

export const EASE = [0.22, 1, 0.36, 1] as const;

/** Espacio no separable antes de «%» para que nunca se parta la cifra. */
export const nb = (s: string) => s.replace(/ %/g, ' %');

/* Variantes compartidas: usan los mismos nombres que la slide (enter/center) para heredar el stagger. */
export const itemV: Variants = {
  enter: { opacity: 0, y: 18 },
  center: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
};
export const lineV: Variants = {
  enter: { scaleY: 0, opacity: 0 },
  center: { scaleY: 1, opacity: 1, transition: { duration: 0.32, ease: EASE } },
};
export const growV: Variants = {
  enter: { scaleX: 0, opacity: 0 },
  center: { scaleX: 1, opacity: 1, transition: { duration: 0.6, ease: EASE } },
};

export function Item({ className, style, children }: { className?: string; style?: MotionStyle; children?: ReactNode }) {
  return (
    <motion.div className={className} style={style} variants={itemV}>
      {children}
    </motion.div>
  );
}

export function CountUp({ to, suffix = '', delay = 0.35, duration = 1.1 }: { to: number; suffix?: string; delay?: number; duration?: number }) {
  const reduce = useReducedMotion();
  const [v, setV] = useState(reduce ? to : 0);
  useEffect(() => {
    if (reduce) return setV(to);
    const c = animate(0, to, { delay, duration, ease: [0.16, 1, 0.3, 1], onUpdate: setV });
    return () => c.stop();
  }, [to, reduce, delay, duration]);
  return (
    <span className="num">
      {Math.round(v)}
      {suffix && nb(suffix)}
    </span>
  );
}

export function Arc({ corner = 'tr', dim = false }: { corner?: 'tr' | 'bl'; dim?: boolean }) {
  const id = useId();
  return (
    <svg className={`arc arc--${corner}${dim ? ' arc--dim' : ''}`} viewBox="0 0 800 800" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#00A9CE" />
          <stop offset="1" stopColor="#1DD2DD" />
        </linearGradient>
      </defs>
      <circle cx="800" cy="0" r="560" fill="none" stroke={`url(#${id})`} strokeWidth="110" opacity="0.16" />
      <circle cx="800" cy="0" r="640" fill="none" stroke={`url(#${id})`} strokeWidth="3" opacity="0.7" />
      <circle cx="800" cy="0" r="470" fill="none" stroke={`url(#${id})`} strokeWidth="2" opacity="0.45" />
    </svg>
  );
}

export function Footer() {
  return (
    <div className="footer">
      <span>{marca.footerIzquierda}</span>
      <span>{marca.footerDerecha}</span>
    </div>
  );
}

export function Internal({ etiqueta, titulo, children, arc }: { etiqueta: string; titulo: string; children: ReactNode; arc?: boolean }) {
  return (
    <>
      <div className="stripe" />
      {arc && <Arc dim />}
      <div className="internal">
        <Item className="eyebrow">
          <span className="eyebrow-bar" />
          {etiqueta}
        </Item>
        <Item className="title">
          <h1>{nb(titulo)}</h1>
        </Item>
        <div className="internal-body">{children}</div>
      </div>
      <Footer />
    </>
  );
}

/* Íconos (trazo simple) */
export const IconExpand = () => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
  </svg>
);
export const IconCollapse = () => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5" />
  </svg>
);
