import { AnimatePresence, motion, MotionConfig, type Variants } from 'framer-motion';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { slides } from './content';
import { AsIs, Journey, Portada, Timeline, ToBe } from './slides';
import { EASE, IconCollapse, IconExpand } from './ui';

const N = slides.length;
const W = 1920;
const H = 1080;

const readHash = () => {
  const n = Number(window.location.hash.replace('#', ''));
  return Number.isInteger(n) && n >= 1 && n <= N ? n - 1 : 0;
};

const slideV: Variants = {
  enter: (d: number) => ({ x: d * 90, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.45, ease: EASE, staggerChildren: 0.07, delayChildren: 0.08 } },
  exit: (d: number) => ({ x: d * -90, opacity: 0, transition: { duration: 0.4, ease: EASE } }),
};

function renderSlide(i: number) {
  const s = slides[i];
  switch (s.kind) {
    case 'portada': return <Portada />;
    case 'asIs': return <AsIs />;
    case 'toBe': return <ToBe />;
    case 'timeline': return <Timeline i={s.timelineIndex!} />;
    case 'journey': return <Journey />;
  }
}

const fsElement = () => document.fullscreenElement ?? (document as any).webkitFullscreenElement ?? null;
function toggleFullscreen() {
  const d = document as any;
  if (fsElement()) (document.exitFullscreen ?? d.webkitExitFullscreen)?.call(document);
  else {
    const el = document.documentElement as any;
    const req = el.requestFullscreen ?? el.webkitRequestFullscreen;
    Promise.resolve(req?.call(el)).catch(() => {});
  }
}

export default function App() {
  const [nav, setNav] = useState(() => ({ index: readHash(), dir: 0 }));
  const { index, dir } = nav;
  const [notes, setNotes] = useState(false);
  const [isFs, setIsFs] = useState(false);
  const [idle, setIdle] = useState(false);
  const [dotsOpen, setDotsOpen] = useState(false);
  const [scale, setScale] = useState(1);

  const go = useCallback((target: number) => {
    setNav((p) => {
      const t = Math.max(0, Math.min(N - 1, target));
      return t === p.index ? p : { index: t, dir: t > p.index ? 1 : -1 };
    });
  }, []);
  const step = useCallback((d: number) => {
    setNav((p) => {
      const t = Math.max(0, Math.min(N - 1, p.index + d));
      return t === p.index ? p : { index: t, dir: d };
    });
  }, []);

  /* Escalado 16:9 con letterboxing */
  useLayoutEffect(() => {
    const fit = () => setScale(Math.min(window.innerWidth / W, window.innerHeight / H));
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);

  /* URL ↔ slide */
  useEffect(() => {
    const h = `#${index + 1}`;
    if (window.location.hash !== h) history.replaceState(null, '', h);
  }, [index]);
  useEffect(() => {
    const on = () => go(readHash());
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, [go]);

  /* Pantalla completa */
  useEffect(() => {
    const on = () => setIsFs(!!fsElement());
    document.addEventListener('fullscreenchange', on);
    document.addEventListener('webkitfullscreenchange', on);
    return () => {
      document.removeEventListener('fullscreenchange', on);
      document.removeEventListener('webkitfullscreenchange', on);
    };
  }, []);

  /* Teclado (incluye presentadores inalámbricos: Re Pág / Av Pág) */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      switch (e.key) {
        case 'ArrowRight': case 'ArrowDown': case 'PageDown':
          e.preventDefault(); step(1); break;
        case 'ArrowLeft': case 'ArrowUp': case 'PageUp':
          e.preventDefault(); step(-1); break;
        case ' ': case 'Spacebar':
          e.preventDefault(); step(e.shiftKey ? -1 : 1); break;
        case 'Home': e.preventDefault(); go(0); break;
        case 'End': e.preventDefault(); go(N - 1); break;
        case 'f': case 'F': toggleFullscreen(); break;
        case 'n': case 'N': setNotes((v) => !v); break;
        case 'Escape': setNotes(false); break;
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, step]);

  /* Controles que se desvanecen tras 2.5 s sin mover el mouse */
  useEffect(() => {
    let t = 0;
    const wake = () => {
      setIdle(false);
      clearTimeout(t);
      t = window.setTimeout(() => setIdle(true), 2500);
    };
    wake();
    const evs = ['mousemove', 'mousedown', 'touchstart'] as const;
    evs.forEach((e) => window.addEventListener(e, wake, { passive: true }));
    return () => {
      clearTimeout(t);
      evs.forEach((e) => window.removeEventListener(e, wake));
    };
  }, []);

  /* Swipe */
  const touch = useRef<{ x: number; y: number } | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touch.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touch.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touch.current.x;
    const dy = t.clientY - touch.current.y;
    touch.current = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.2) step(dx < 0 ? 1 : -1);
  };

  const blurAfter = (fn: () => void) => (e: React.MouseEvent<HTMLButtonElement>) => {
    fn();
    e.currentTarget.blur();
  };

  const dark = !!slides[index].dark;
  const showControls = !idle || dotsOpen;

  return (
    <MotionConfig reducedMotion="user">
      <div className={`viewport${idle ? ' is-idle' : ''}`} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <div className="canvas" style={{ transform: `translate(-50%, -50%) scale(${scale})` }}>
          <AnimatePresence initial custom={dir}>
            <motion.section
              key={index}
              className={`slide${dark ? ' slide--dark' : ''}`}
              custom={dir}
              variants={slideV}
              initial="enter"
              animate="center"
              exit="exit"
              aria-roledescription="slide"
              aria-label={`${index + 1} de ${N}: ${slides[index].nav}`}
            >
              {renderSlide(index)}
            </motion.section>
          </AnimatePresence>

          {/* Pantalla completa */}
          <div className={`ctrl fs${dark ? ' ctrl--dark' : ''}${showControls ? '' : ' is-hidden'}`}>
            <button
              type="button"
              className="fs-btn"
              onClick={blurAfter(toggleFullscreen)}
              aria-label={isFs ? 'Salir de pantalla completa' : 'Pantalla completa'}
            >
              {isFs ? <IconCollapse /> : <IconExpand />}
            </button>
            <span className="tooltip" role="tooltip">{isFs ? 'Salir de pantalla completa' : 'Pantalla completa'}</span>
          </div>

          {/* Notas del presentador */}
          <AnimatePresence>
            {notes && (
              <motion.aside
                className="notes"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.25 }}
                aria-label="Notas del presentador"
              >
                <div className="notes-head">
                  <span>Notas · {index + 1} / {N} · {slides[index].nav}</span>
                  <span className="notes-key">N para ocultar</span>
                </div>
                <p>{slides[index].notas}</p>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Barra de avance */}
          <div
            className={`progress${dark ? ' ctrl--dark' : ''}${dotsOpen ? ' is-open' : ''}`}
            onMouseEnter={() => setDotsOpen(true)}
            onMouseLeave={() => setDotsOpen(false)}
          >
            <nav className="progress-dots" aria-label="Ir a slide">
              {slides.map((s, i) => (
                <button
                  key={i}
                  type="button"
                  className={`pdot${i === index ? ' is-active' : ''}`}
                  style={{ left: `${((i + 0.5) / N) * 100}%` }}
                  onClick={blurAfter(() => go(i))}
                  tabIndex={dotsOpen ? 0 : -1}
                >
                  <span className="pdot-label">{s.nav}</span>
                  <span className="pdot-dot" />
                </button>
              ))}
            </nav>
            <div className="progress-track">
              <motion.div
                className="progress-fill"
                style={{ originX: 0 }}
                initial={false}
                animate={{ scaleX: (index + 1) / N }}
                transition={{ type: 'spring', stiffness: 140, damping: 24, mass: 0.8 }}
              />
            </div>
            <div className={`progress-count${showControls ? '' : ' is-hidden'}`}>
              {index + 1} / {N}
            </div>
          </div>
        </div>
      </div>
    </MotionConfig>
  );
}
