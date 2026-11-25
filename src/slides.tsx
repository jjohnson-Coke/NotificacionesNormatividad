import { animate, AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Fragment, useEffect, useState } from 'react';
import { asIs, FECHA_VALIDACION, journey, pills, portada, timelineLegend, timelineSlides, toBe, type Moment, type Stage } from './content';
import { Arc, CountUp, growV, Internal, Item, lineV, nb } from './ui';

/* ---------------- 1 · Portada ---------------- */
export function Portada() {
  return (
    <div className="cover">
      <Arc />
      <div className="cover-inner">
        <Item className="cover-eyebrow">{portada.etiqueta}</Item>
        <Item>
          <h1 className="cover-title">{portada.titulo}</h1>
        </Item>
        <Item className="cover-sub">{portada.subtitulo}</Item>
      </div>
      <Item className="cover-foot">{portada.pie}</Item>
    </div>
  );
}

/* ---------------- 2 · As Is ---------------- */
export function AsIs() {
  return (
    <Internal etiqueta={asIs.etiqueta} titulo={asIs.titulo}>
      <Item className="row-title">{asIs.equipos.titulo}</Item>
      <div className="stat-row">
        {asIs.equipos.tarjetas.map((t) => (
          <Item key={t.texto} className="stat-card">
            <div className="stat-num">
              <CountUp to={t.valor} suffix={t.sufijo} />
            </div>
            <div className="stat-text">{nb(t.texto)}</div>
          </Item>
        ))}
      </div>
      <Item className="row-title row-title--accent">{asIs.normatividad.titulo}</Item>
      <Item className="stat-row stat-row--dark">
        {asIs.normatividad.tarjetas.map((t) => (
          <div key={t.texto} className="stat-cell">
            <div className="stat-num stat-num--cian">
              <CountUp to={t.valor} suffix={t.sufijo} delay={0.7} />
            </div>
            <div className="stat-text">{nb(t.texto)}</div>
          </div>
        ))}
      </Item>
      <Item className="callout">
        <strong>{asIs.callout.destacado}</strong> {asIs.callout.texto}
      </Item>
    </Internal>
  );
}

/* ---------------- 3 · To Be ---------------- */
function Morph() {
  const { desde, hacia } = toBe;
  const reduce = useReducedMotion();
  const [v, setV] = useState(desde);
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (reduce) {
      const t = setTimeout(() => { setV(hacia); setDone(true); }, 900);
      return () => clearTimeout(t);
    }
    const c = animate(desde, hacia, {
      delay: 1.1, duration: 1.5, ease: [0.65, 0, 0.35, 1],
      onUpdate: setV, onComplete: () => setDone(true),
    });
    return () => c.stop();
  }, [desde, hacia, reduce]);
  const p = (desde - v) / (desde - hacia); // 0 → 1
  const scale = reduce ? 1 : 1 - 0.16 * Math.sin(Math.PI * p);
  return (
    <Item className="morph">
      <div className="morph-num-wrap">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={reduce ? String(done) : 'n'}
            className={`morph-num ${done ? 'is-done' : ''}`}
            style={{ scale }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            {Math.round(v)}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="morph-bar">
        <div className="morph-bar-fill" style={{ width: `${(v / desde) * 100}%` }} />
      </div>
      <div className="morph-caption">
        <span className={done ? 'is-dim' : 'is-on'}><b>{desde}</b>{toBe.leyendaDesde}</span>
        <span className={done ? 'is-on is-cian' : 'is-dim'}><span className="morph-arrow" aria-hidden="true">→ </span><b>{hacia}</b>{toBe.leyendaHacia}</span>
      </div>
    </Item>
  );
}

export function ToBe() {
  return (
    <Internal etiqueta={toBe.etiqueta} titulo={toBe.titulo}>
      <div className="tobe-main">
        <Morph />
        <div className="decisions">
          {toBe.decisiones.map((d, i) => (
            <Item key={d.verbo} className="decision">
              <div className="decision-head">
                <span className="decision-verb">{d.verbo}</span>
                <span className="decision-num"><CountUp to={d.valor} delay={0.5 + i * 0.08} /></span>
              </div>
              <p className="decision-text">{d.texto}</p>
            </Item>
          ))}
        </div>
      </div>
      <div className="split">
        <Item className="split-title">{toBe.repartoTitulo}</Item>
        <motion.div className="split-bar" variants={growV} style={{ originX: 0 }}>
          {toBe.reparto.map((r) => (
            <div key={r.tipo} className={`seg seg--${r.tipo}`} style={{ flexGrow: r.valor }}>
              {r.valor}
            </div>
          ))}
        </motion.div>
        <Item className="split-legend">
          {toBe.reparto.map((r) => (
            <span key={r.tipo} className="legend-item">
              <span className={`swatch seg--${r.tipo}`} />
              <strong>{r.valor}</strong>&nbsp;{r.texto}
            </span>
          ))}
        </Item>
      </div>
    </Internal>
  );
}

/* ---------------- 4–6 · Línea del tiempo ---------------- */
function MomentRow({ m }: { m: Moment }) {
  const pill = m.type === 'I' || m.type === 'Pl' ? pills[m.type] : null;
  return (
    <div className={`moment moment--${m.type}`}>
      <motion.span className="moment-line" variants={lineV} style={{ originY: 0 }} />
      <Item className="moment-text">
        <span className="moment-name">{m.name}</span>
        <span className="moment-trigger"> · {m.trigger}</span>
        {pill && <span className="pill">{pill}</span>}
        {m.pill && <span className="pill">{m.pill}</span>}
      </Item>
    </div>
  );
}

function StageBlock({ s }: { s: Stage }) {
  return (
    <div className="stage">
      <Item className="stage-head">
        <h2>{s.name}</h2>
        <span className="stage-badge">
          {s.team} · {s.declaredCount}
        </span>
      </Item>
      <div className="stage-list">
        {s.moments.map((m) => <MomentRow key={m.name + m.trigger} m={m} />)}
      </div>
    </div>
  );
}

export function TimelineLegend() {
  return (
    <Item className="tl-legend">
      {timelineLegend.map((l) => (
        <span key={l.tipo} className="legend-item">
          <span className={`legend-line moment--${l.tipo}`} />
          {l.texto}
        </span>
      ))}
    </Item>
  );
}

export function Timeline({ i }: { i: number }) {
  const t = timelineSlides[i];
  return (
    <Internal etiqueta={t.etiqueta} titulo={t.titulo}>
      <div className="tl-cols">
        {t.columnas.map((col, ci) => (
          <div key={ci} className="tl-col">
            {col.map((s) => <StageBlock key={s.id} s={s} />)}
          </div>
        ))}
      </div>
      <TimelineLegend />
    </Internal>
  );
}

/* ---------------- 7 · Journey ---------------- */
function Fecha() {
  return FECHA_VALIDACION ? <strong>{FECHA_VALIDACION}</strong> : <mark className="fecha-pendiente">[fecha]</mark>;
}

export function Journey() {
  return (
    <Internal etiqueta={journey.etiqueta} titulo={journey.titulo} arc>
      <div className="journey">
        {journey.etapas.map((e, i) => {
          const norm = e.momentos !== undefined;
          return (
            <Item key={e.nombre} className={`chev ${norm ? 'chev--norm' : ''} ${i === 0 ? 'chev--first' : ''}`}>
              <div className="chev-name">{e.nombre}</div>
              <div className="chev-team">{e.equipos}</div>
              {norm && (
                <div className="chev-count">
                  <CountUp to={e.momentos!} delay={0.6} /> {journey.sufijoMomentos}
                </div>
              )}
            </Item>
          );
        })}
      </div>
      <Item className="row-title row-title--big">{journey.acuerdosTitulo}</Item>
      <div className="agreements">
        {journey.acuerdos.map((a, i) => {
          const parts = a.texto.split('{fecha}');
          return (
            <Item key={a.titulo} className="agreement">
              <span className="agreement-num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{a.titulo}</h3>
              <p>
                {parts.map((p, pi) => (
                  <Fragment key={pi}>
                    {p}
                    {pi < parts.length - 1 && <Fecha />}
                  </Fragment>
                ))}
              </p>
            </Item>
          );
        })}
      </div>
    </Internal>
  );
}
