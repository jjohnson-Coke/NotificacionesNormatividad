/* ==========================================================================
   CONTENIDO DE LA PRESENTACIÓN
   Edita aquí textos, cifras y notas. Los componentes no contienen texto.
   Tipos de momento: 'P' principal · 'E' excepción · 'I' interno · 'Pl' en plataforma
   ========================================================================== */

/** Fecha límite de validación. Mientras sea null se muestra «[fecha]» resaltada en violeta. */
export const FECHA_VALIDACION: string | null = null; // p. ej. '5 de diciembre de 2026'

export type MomentType = 'P' | 'E' | 'I' | 'Pl';

export interface Moment {
  type: MomentType;
  name: string;
  trigger: string;
  /** Píldora opcional adicional (p. ej. «Portal»). I y Pl ya muestran «Interno» / «Plataforma». */
  pill?: string;
}

export interface Stage {
  id: string;
  name: string;
  team: string;
  /** Número que se muestra en el encabezado «Normatividad · N». El test lo compara con moments.length. */
  declaredCount: number;
  moments: Moment[];
}

export const marca = {
  footerIzquierda: 'TEC360 · Experiencia de Aprendedores',
  footerDerecha: 'VPAF · Aprendizaje para el Futuro',
};

export const pills: Record<'I' | 'Pl', string> = { I: 'Interno', Pl: 'Plataforma' };

/* ---------- Slide 1 · Portada ---------- */
export const portada = {
  etiqueta: 'SESIÓN DE ALINEACIÓN · NORMATIVIDAD',
  titulo: 'Radiografía de correos',
  subtitulo: 'De lo que hoy recibe el aprendedor a lo que va a vivir: qué cambia para Normatividad.',
  pie: 'Journeys y Experiencia · VPAF · Noviembre 2026',
};

/* ---------- Slide 2 · Lo que vimos (As Is) ---------- */
export const asIs = {
  etiqueta: '1 · LO QUE VIMOS (AS IS)',
  titulo: 'Revisamos el 100 %: 131 correos',
  /** Cifras base (las usa el test de consistencia). */
  cifras: { total: 131, requierenAjuste: 86, aMano: 111, normatividad: 102, normAjuste: 85, normAMano: 99 },
  equipos: {
    titulo: 'Los 4 equipos',
    tarjetas: [
      { valor: 131, sufijo: '', texto: 'correos de Marketing, Comercial, Vivencia y Normatividad' },
      { valor: 66, sufijo: ' %', texto: 'requieren algún ajuste (86 correos)' },
      { valor: 85, sufijo: ' %', texto: 'se envían a mano (111 correos)' },
    ],
  },
  normatividad: {
    titulo: 'En Normatividad',
    porcentajeDelTotal: 78,
    tarjetas: [
      { valor: 102, sufijo: '', texto: 'correos: 78 % del total' },
      { valor: 85, sufijo: '', texto: 'requieren ajuste' },
      { valor: 99, sufijo: '', texto: 'se envían a mano' },
    ],
  },
  callout: {
    destacado: 'Ejemplo:',
    texto: 'la liga de Calendly viaja en 5 correos distintos y las preguntas frecuentes del PIDA, en 6.',
  },
};

/* ---------- Slide 3 · Antes → después (To Be) ---------- */
export const toBe = {
  etiqueta: '2 · ANTES → DESPUÉS (TO BE)',
  titulo: 'De 102 correos a 37 momentos claros',
  desde: 102,
  hacia: 37,
  leyendaDesde: 'correos hoy',
  leyendaHacia: 'momentos en el To Be',
  decisiones: [
    { verbo: 'Fusionar', valor: 12, texto: 'Kit del evaluador, convocatoria de arranque y un cierre PIDA único (resultado, firma, insignia y encuesta).' },
    { verbo: 'Automatizar', valor: 9, texto: 'Recordatorios de entrega, agendas de retroalimentación y coaching, e insignia digital.' },
    { verbo: 'Rediseñar', valor: 9, texto: '«Del certificado a la certificación», guía «Tu ruta PIDA» y bajas en una plantilla con variantes.' },
    { verbo: 'Sacar del correo', valor: 5, texto: 'Calendly y preguntas frecuentes viven en plataforma; el cambio de calificación es aviso en portal.' },
  ],
  repartoTitulo: 'Cómo se reparten los 37 momentos',
  reparto: [
    { tipo: 'P' as MomentType, valor: 13, texto: 'principales: todos los reciben' },
    { tipo: 'E' as MomentType, valor: 18, texto: 'excepciones: solo si ocurre' },
    { tipo: 'I' as MomentType, valor: 3, texto: 'internos del equipo' },
    { tipo: 'Pl' as MomentType, valor: 3, texto: 'viven en plataforma, no en correo' },
  ],
};

/* ---------- Slides 4–6 · Tu línea del tiempo ---------- */
const N = 'Normatividad';

export const stages: Record<string, Stage> = {
  vivencia: {
    id: 'vivencia', name: 'Vivencia de propuesta de valor', team: N, declaredCount: 4,
    moments: [
      { type: 'E', name: 'Bajas: una plantilla, variantes A–C', trigger: 'al aprobar una solicitud de baja' },
      { type: 'P', name: 'Tu insignia digital está lista', trigger: 'al emitirse (programas sin PIDA)' },
      { type: 'E', name: 'Aviso de cambio de calificación', trigger: 'si cambia una calificación', pill: 'Portal' },
      { type: 'E', name: 'Constancias por autoservicio', trigger: 'cuando el aprendedor pide un documento' },
    ],
  },
  pidaArranque: {
    id: 'pidaArranque', name: 'PIDA · Arranque', team: N, declaredCount: 7,
    moments: [
      { type: 'P', name: 'Del certificado a la certificación', trigger: 'al acreditar la fase de entrenamiento' },
      { type: 'I', name: 'Kit del evaluador', trigger: 'al confirmar el grupo' },
      { type: 'Pl', name: 'Liga de Calendly fija', trigger: 'al confirmar el grupo' },
      { type: 'P', name: 'Convocatoria a la sesión de arranque', trigger: '7 días antes, + WhatsApp 24 h antes' },
      { type: 'Pl', name: 'Preguntas frecuentes del PIDA', trigger: 'siempre visibles desde el arranque' },
      { type: 'P', name: 'Guía «Tu ruta PIDA»', trigger: '1 día después de la sesión de arranque' },
      { type: 'E', name: 'Pausa del PIDA', trigger: 'a solicitud, antes de la primera entrega' },
    ],
  },
  pidaPropuesta: {
    id: 'pidaPropuesta', name: 'PIDA · Propuesta y plan de trabajo', team: N, declaredCount: 11,
    moments: [
      { type: 'P', name: 'Recordatorio de entrega de propuesta', trigger: '3 días hábiles antes' },
      { type: 'E', name: 'Prórroga de entrega', trigger: '1 día después de la fecha límite' },
      { type: 'E', name: 'Te falta una carta', trigger: 'si la entrega quedó incompleta' },
      { type: 'P', name: 'Agenda tu sesión de retroalimentación', trigger: 'al registrarse la entrega' },
      { type: 'Pl', name: 'Reserva en Calendly', trigger: 'al reservar' },
      { type: 'E', name: 'Aún no agendas tu sesión', trigger: '3 días antes del cierre del periodo' },
      { type: 'E', name: 'No te conectaste', trigger: 'el día de la sesión' },
      { type: 'I', name: 'Registro del evaluador', trigger: 'al terminar la sesión' },
      { type: 'E', name: 'Ajustes a tu entrega', trigger: 'si la propuesta requiere ajustes' },
      { type: 'E', name: 'Tercer intento', trigger: 'si la 2.ª entrega sigue con menos de 80' },
      { type: 'P', name: 'Tu calendario de implementación', trigger: 'al aprobarse la propuesta' },
    ],
  },
  pidaImplementacion: {
    id: 'pidaImplementacion', name: 'PIDA · Implementación y avance', team: N, declaredCount: 4,
    moments: [
      { type: 'P', name: 'Recordatorio de entrega de avance', trigger: '3 días hábiles antes' },
      { type: 'E', name: 'Prórroga de entrega (avance)', trigger: '1 día después de la fecha límite' },
      { type: 'P', name: 'Agenda tu sesión de coaching', trigger: 'al registrarse el avance' },
      { type: 'E', name: 'Aún no agendas · No te conectaste', trigger: 'sin reserva o sin conexión a coaching' },
    ],
  },
  pidaFinal: {
    id: 'pidaFinal', name: 'PIDA · Entrega final', team: N, declaredCount: 6,
    moments: [
      { type: 'P', name: 'Recordatorio de entrega final', trigger: '3 días hábiles antes' },
      { type: 'P', name: 'Agenda tu presentación final', trigger: 'al iniciar la Etapa 4 o registrar la entrega' },
      { type: 'E', name: 'Ajustes a tu entrega (final)', trigger: 'si la entrega requiere ajustes' },
      { type: 'E', name: 'Te falta una carta (validación)', trigger: 'si falta la carta de validación' },
      { type: 'E', name: 'Última oportunidad por reglamento', trigger: 'al pedir prórroga o vencer la entrega' },
      { type: 'I', name: 'Ticket a soporte', trigger: 'cuando se requiere un intento extra' },
    ],
  },
  cierre: {
    id: 'cierre', name: 'Cierre de la certificación', team: N, declaredCount: 4,
    moments: [
      { type: 'P', name: 'Cierre PIDA único', trigger: 'al publicarse la calificación aprobatoria: resultado, firma, insignia y encuesta' },
      { type: 'E', name: 'Cierre no aprobatorio con opciones', trigger: 'si la calificación final es menor a 80' },
      { type: 'E', name: 'Baja temporal PIDA', trigger: 'sin respuesta tras prórroga' },
      { type: 'E', name: 'Reactivación sin respuesta', trigger: 'sin entregas ni respuesta' },
    ],
  },
  reconocimiento: {
    id: 'reconocimiento', name: 'Reconocimiento', team: N, declaredCount: 1,
    moments: [
      { type: 'P', name: 'Tu insignia digital está lista', trigger: 'al recibir la insignia' },
    ],
  },
};

export const timelineLegend = [
  { tipo: 'P' as MomentType, texto: 'Línea continua: principal, la reciben todos' },
  { tipo: 'E' as MomentType, texto: 'Línea punteada: excepción, solo si ocurre' },
  { tipo: 'I' as MomentType, texto: 'Gris: interno o en plataforma' },
];

const notasLinea =
  '≈2 min por slide. No leas cada fila: señala los principales (línea sólida) y explica que lo punteado solo llega si ocurre algo, y lo gris vive en plataforma o es interno. Es la vista que el equipo puede usar para validar sus fichas.';

/** Cada slide de la línea del tiempo: columnas → etapas (en orden). */
export const timelineSlides = [
  { parte: '1/3', columnas: [[stages.vivencia], [stages.pidaArranque]] },
  { parte: '2/3', columnas: [[stages.pidaPropuesta], [stages.pidaImplementacion]] },
  { parte: '3/3', columnas: [[stages.pidaFinal], [stages.cierre, stages.reconocimiento]] },
].map((s) => ({
  ...s,
  etiqueta: `3 · TU LÍNEA DEL TIEMPO (${s.parte})`,
  titulo: `Dónde viven tus correos (${s.parte})`,
}));

/* ---------- Slide 7 · Tu tramo del journey ---------- */
export const journey = {
  etiqueta: '4 · TU TRAMO DEL JOURNEY',
  titulo: 'Un solo journey, cuatro equipos',
  etapas: [
    { nombre: 'Descubrimiento', equipos: 'Marketing' },
    { nombre: 'Exploración', equipos: 'Comercial' },
    { nombre: 'Definición', equipos: 'Comercial' },
    { nombre: 'Vivencia de propuesta de valor', equipos: 'Vivencia · Normatividad', momentos: 4, etapasLinea: ['vivencia'] },
    { nombre: 'Certificación PIDA', equipos: 'Normatividad', momentos: 28, etapasLinea: ['pidaArranque', 'pidaPropuesta', 'pidaImplementacion', 'pidaFinal'] },
    { nombre: 'Cierre y reconocimiento', equipos: 'Normatividad', momentos: 5, etapasLinea: ['cierre', 'reconocimiento'] },
    { nombre: 'Continuidad', equipos: 'Vivencia' },
  ] as { nombre: string; equipos: string; momentos?: number; etapasLinea?: string[] }[],
  sufijoMomentos: 'momentos',
  acuerdosTitulo: 'Lo que necesitamos de Normatividad',
  acuerdos: [
    { titulo: 'Validar las fichas', texto: 'Revisar en «VERSIÓN PULIDA» tus 37 momentos y marcar lo que no sea viable.' },
    { titulo: 'Confirmar dueños', texto: 'Un responsable por cada envío, sin correos huérfanos.' },
    { titulo: 'Priorizar', texto: 'Definir con qué cambios arrancamos y cuáles necesitan apoyo de plataforma.' },
    { titulo: 'Fecha de validación', texto: 'Respuesta del equipo a más tardar el {fecha}.' },
  ],
};

/* ---------- Orden de slides, nombres de navegación y notas ---------- */
export type SlideKind = 'portada' | 'asIs' | 'toBe' | 'timeline' | 'journey';

export const slides: { kind: SlideKind; nav: string; dark?: boolean; timelineIndex?: number; notas: string }[] = [
  {
    kind: 'portada', nav: 'Portada', dark: true,
    notas: 'Bienvenida. Objetivo de la sesión (30 min): ver juntos qué cambia para Normatividad entre lo que hoy recibe el aprendedor (As Is) y lo que va a vivir (To Be). Venimos a validar, no a imponer.',
  },
  {
    kind: 'asIs', nav: 'Lo que vimos',
    notas: '≈5 min. Revisamos el 100 % de las comunicaciones de los 4 equipos: 131 correos, y 102 son de Normatividad. Encuadre clave: esto habla de la carga que hoy tiene el equipo (99 envíos a mano), no de que se haga mal. El ejemplo de Calendly y las preguntas frecuentes muestra cómo la misma información se repite en varios correos.',
  },
  {
    kind: 'toBe', nav: 'Antes → después',
    notas: '≈12 min. Es el cambio más grande y el que más libera al equipo: 102 correos se vuelven 37 momentos, y solo 13 los recibe todo mundo. Las 2 piezas restantes son mixtas (Mantener/Sacar en la página de Calendly; Automatizar/Fusionar en coaching). Pregunta directa: ¿algo de esto no es viable? Nota: la insignia digital aparece en dos momentos (programas sin PIDA y Reconocimiento); confirmar si es intencional.',
  },
  { kind: 'timeline', nav: 'Línea del tiempo 1/3', timelineIndex: 0, notas: notasLinea },
  { kind: 'timeline', nav: 'Línea del tiempo 2/3', timelineIndex: 1, notas: notasLinea },
  { kind: 'timeline', nav: 'Línea del tiempo 3/3', timelineIndex: 2, notas: notasLinea },
  {
    kind: 'journey', nav: 'Tu tramo del journey',
    notas: '≈10 min. Normatividad sostiene la mayor parte del journey del PIDA. Cerrar con los acuerdos: con 9 automatizaciones, priorizar es lo más importante. Definir la fecha de validación.',
  },
];
