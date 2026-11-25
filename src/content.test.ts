import { describe, expect, it } from 'vitest';
import { asIs, journey, stages, timelineSlides, toBe, type MomentType } from './content';

const allStages = timelineSlides.flatMap((s) => s.columnas.flat());
const allMoments = allStages.flatMap((s) => s.moments);
const countType = (t: MomentType) => allMoments.filter((m) => m.type === t).length;

describe('Línea del tiempo', () => {
  it('tiene 4 + 7 + 11 + 4 + 6 + 4 + 1 = 37 momentos', () => {
    expect(allStages.map((s) => s.moments.length)).toEqual([4, 7, 11, 4, 6, 4, 1]);
    expect(allMoments.length).toBe(37);
    expect(allMoments.length).toBe(toBe.hacia);
  });

  it('reparte 13 principales, 18 excepciones, 3 internos y 3 en plataforma', () => {
    expect(countType('P')).toBe(13);
    expect(countType('E')).toBe(18);
    expect(countType('I')).toBe(3);
    expect(countType('Pl')).toBe(3);
  });

  it('la barra apilada de la slide 3 coincide con los tipos reales', () => {
    for (const r of toBe.reparto) expect(r.valor, r.tipo).toBe(countType(r.tipo));
    expect(toBe.reparto.reduce((a, r) => a + r.valor, 0)).toBe(37);
  });

  it('el «Normatividad · N» de cada etapa coincide con sus momentos', () => {
    for (const s of allStages) expect(s.declaredCount, s.name).toBe(s.moments.length);
  });

  it('cada etapa aparece una sola vez', () => {
    expect(new Set(allStages.map((s) => s.id)).size).toBe(Object.keys(stages).length);
  });
});

describe('Journey', () => {
  const byName = Object.fromEntries(journey.etapas.map((e) => [e.nombre, e]));
  it('Vivencia 4, Certificación PIDA 28 (7 + 11 + 4 + 6), Cierre y reconocimiento 5 (4 + 1)', () => {
    expect(byName['Vivencia de propuesta de valor'].momentos).toBe(4);
    expect(byName['Certificación PIDA'].momentos).toBe(28);
    expect(byName['Cierre y reconocimiento'].momentos).toBe(5);
  });
  it('cada número del journey es la suma real de sus etapas', () => {
    for (const e of journey.etapas.filter((e) => e.etapasLinea)) {
      const real = e.etapasLinea!.reduce((a, id) => a + stages[id].moments.length, 0);
      expect(e.momentos, e.nombre).toBe(real);
    }
    expect(journey.etapas.reduce((a, e) => a + (e.momentos ?? 0), 0)).toBe(37);
  });
});

describe('As Is', () => {
  const c = asIs.cifras;
  const pct = (n: number) => Math.round((n / c.total) * 100);
  it('86/131 ≈ 66 %, 111/131 ≈ 85 %, 102/131 ≈ 78 %', () => {
    expect(pct(c.requierenAjuste)).toBe(66);
    expect(pct(c.aMano)).toBe(85);
    expect(pct(c.normatividad)).toBe(78);
  });
  it('las tarjetas muestran las mismas cifras', () => {
    const [t, a, m] = asIs.equipos.tarjetas;
    expect(t.valor).toBe(c.total);
    expect(a.valor).toBe(pct(c.requierenAjuste));
    expect(a.texto).toContain(`${c.requierenAjuste} correos`);
    expect(m.valor).toBe(pct(c.aMano));
    expect(m.texto).toContain(`${c.aMano} correos`);
    const [n, na, nm] = asIs.normatividad.tarjetas;
    expect(n.valor).toBe(c.normatividad);
    expect(n.texto).toContain(`${pct(c.normatividad)} %`);
    expect(na.valor).toBe(c.normAjuste);
    expect(nm.valor).toBe(c.normAMano);
    expect(toBe.desde).toBe(c.normatividad);
  });
});
