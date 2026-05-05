export const SEGURIDAD_PROCESS_STEPS = [
  {
    id: 'consulta',
    title: 'Consulta previa',
    body: 'Completas el cuestionario de límites y preferencias para que la noche respete tu ritmo.',
  },
  {
    id: 'briefing',
    title: 'Briefing personal',
    body: 'Conversación reservada sobre códigos y palabra segura con quienes cuidan el espacio.',
  },
  {
    id: 'durante',
    title: 'Durante la experiencia',
    body: 'Voz y guía digital en sala; el equipo humano permanece a un toque en la app si lo necesitas.',
  },
  {
    id: 'aftercare',
    title: 'Aftercare',
    body: 'Cierre opcional y un momento tranquilo para integrar lo vivido, sin prisas.',
  },
] as const

export const SEGURIDAD_GUARANTEES = [
  {
    id: 'consentimiento',
    title: 'Consentimiento guiado',
    body: 'Límites explícitos antes de empezar. Tu palabra segura se respeta siempre, sin excepciones.',
  },
  {
    id: 'seguridad',
    title: 'Seguridad cuidada',
    body: 'Equipo disponible sin invadir tu intimidad: presencia discreta y canales claros.',
  },
  {
    id: 'privacidad',
    title: 'Privacidad garantizada',
    body: 'Sin grabaciones de ocio. Lo que ocurre en sala queda entre quienes estuvieron ahí.',
  },
  {
    id: 'higiene',
    title: 'Higiene premium',
    body: 'Limpieza profunda entre visitas y materiales tratados con el mismo rigor que el resto del ritual.',
  },
  {
    id: 'digital',
    title: 'Curación digital en penumbra',
    body: 'Guía por voz y capas sensoriales coordinadas, sin presencia humana dentro de la sala salvo lo acordado.',
  },
  {
    id: 'documentacion',
    title: 'Documentación clara',
    body: 'Condiciones legibles y derecho a parar o replantear en cualquier momento.',
  },
] as const

export type SeguridadProcessStepId = (typeof SEGURIDAD_PROCESS_STEPS)[number]['id']
export type SeguridadGuaranteeId = (typeof SEGURIDAD_GUARANTEES)[number]['id']

export const SEGURIDAD_PROMISES = [
  'Sin grabaciones',
  'Sin juicios',
  'Todo opcional',
  'Tú mandas',
] as const

export const SEGURIDAD_LEGAL_ITEMS = [
  {
    id: 'datos',
    title: '¿Qué información recopilamos?',
    body: 'Solo lo imprescindible para tu seguridad y la personalización de la visita: datos de contacto verificados, preferencias y límites. No vendemos datos a terceros.',
  },
  {
    id: 'proteccion',
    title: '¿Cómo protegemos tus datos?',
    body: 'Cifrado en tránsito, accesos restringidos y prácticas mínimas de retención. Puedes solicitar rectificación o borrado según la normativa aplicable.',
  },
  {
    id: 'cancelacion',
    title: 'Política de cancelación',
    body: 'Puedes cancelar o reprogramar con antelación según las condiciones de tu reserva. Los detalles concretos se confirman al sellar la noche.',
  },
] as const
