/** Enlaces de tienda (prototipo). */
export const APP_STORE_URL = 'https://apps.apple.com/' as const
export const GOOGLE_PLAY_URL = 'https://play.google.com/store' as const

/** Ancla en la misma página: el QR decorativo enlaza aquí. */
export const APP_MOVIL_STORES_ANCHOR_ID = 'descarga-tiendas' as const

export const APP_MOVIL_FEATURES = [
  {
    id: 'curacion',
    title: 'Curación que aprende contigo',
    body: 'Sugerencias que se afinan con tu ritmo y tus preferencias, sin prisas ni juicios.',
  },
  {
    id: 'palabra',
    title: 'Tu palabra segura',
    body: 'Acceso inmediato al modo discretísimo y recordatorios suaves para que siempre vuelvas cuando quieras.',
  },
  {
    id: 'preludio',
    title: 'Preludio antes de llegar',
    body: 'Pistas sensoriales y listas curadas que empiezan a tejer la noche mucho antes de cruzar la puerta.',
  },
  {
    id: 'conserjeria',
    title: 'Comunicación velada',
    body: 'Canal reservado con conserjería y anfitriones: pocas palabras, mucha claridad.',
  },
  {
    id: 'diario',
    title: 'Diario de sensaciones',
    body: 'Un espacio privado para atesorar lo vivido, si tú lo deseas, con total discreción.',
  },
  {
    id: 'erosense',
    title: 'EROSENSE integrado',
    body: 'Armoniza luces, aroma y vibración con lo que ocurre en sala, desde la palma de la mano.',
  },
] as const

export type AppMovilFeatureId = (typeof APP_MOVIL_FEATURES)[number]['id']

export const APP_MOVIL_PREVIEW_FRAMES = [
  {
    id: 'onboarding',
    imageSrc: '/heroImage.png',
    imageAlt: 'Pantalla de bienvenida oscura con logotipo dorado y tipografía elegante.',
    label: 'Bienvenida',
    caption: 'Tu identidad discreta comienza aquí',
    emphasis: 'side' as const,
  },
  {
    id: 'reservas',
    imageSrc: '/habitacioveneciana.png',
    imageAlt: 'Selección de experiencias con tarjetas tipo cristal y acentos magenta.',
    label: 'Reservas',
    caption: 'Elige tu noche',
    emphasis: 'center' as const,
  },
  {
    id: 'guia',
    imageSrc: '/laconfesion.png',
    imageAlt: 'Conversación fluida con burbujas translúcidas sobre fondo oscuro.',
    label: 'Guía digital',
    caption: 'Compañía silenciosa en el bolsillo',
    emphasis: 'side' as const,
  },
] as const
