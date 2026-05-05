export type SociedadEventStatus = 'cerrado' | 'ultimas' | 'disponible'

export interface SociedadEvent {
  id: string
  imageSrc: string
  imageAlt: string
  status: SociedadEventStatus
  dateLine: string
  title: string
  quote: string
}

export const SOCIEDAD_EVENTS: readonly SociedadEvent[] = [
  {
    id: 'mascaras',
    imageSrc: '/lamascarada.png',
    imageAlt: 'Ambiente íntimo con máscaras y luz tenue, estética de velada exclusiva.',
    status: 'cerrado',
    dateLine: '15 may · Madrid',
    title: 'Noche de máscaras',
    quote: 'Donde el anonimato es la única regla y la mirada el único lenguaje permitido.',
  },
  {
    id: 'veneciana',
    imageSrc: '/habitacioveneciana.png',
    imageAlt: 'Interior lujoso con detalles barrocos y iluminación cálida.',
    status: 'ultimas',
    dateLine: '22 may · Barcelona',
    title: 'Velada veneciana',
    quote: 'Romance y misterio bajo un prisma de deseo medido y sofisticación.',
  },
  {
    id: 'confesion',
    imageSrc: '/laconfesion.png',
    imageAlt: 'Espacio contemplativo con texturas oscuras y luz suave.',
    status: 'disponible',
    dateLine: '1 jun · Valencia',
    title: 'Círculo de escucha',
    quote: 'Palabra, consentimiento y presencia como herramientas de conexión profunda.',
  },
] as const

export interface SociedadCorporateCard {
  id: string
  title: string
  subtitle: string
}

export const SOCIEDAD_CORPORATE_CARDS: readonly SociedadCorporateCard[] = [
  { id: 'despedidas', title: 'Despedidas memorables', subtitle: 'Celebraciones bajo sello de discreción' },
  { id: 'aniversarios', title: 'Aniversarios y hitos', subtitle: 'Rituales a medida para dos' },
  { id: 'corporate', title: 'Equipos y liderazgo', subtitle: 'Confianza y comunicación consciente' },
  { id: 'tematicas', title: 'Noches bajo un halo', subtitle: 'Conceptos ad hoc para tu grupo' },
] as const

export interface SociedadCommitmentPillar {
  id: string
  title: string
  body: string
}

export const SOCIEDAD_COMMITMENT: readonly SociedadCommitmentPillar[] = [
  {
    id: 'privacidad',
    title: 'Sin grabaciones',
    body: 'Privacidad digital prioritaria. Pedimos que el móvil descanse, para que lo vivido quede solo entre quienes estuvieron ahí.',
  },
  {
    id: 'respeto',
    title: 'Sin juicios',
    body: 'Un espacio cuidado para explorar con respeto absoluto hacia cada persona y su ritmo.',
  },
  {
    id: 'opcional',
    title: 'Todo opcional',
    body: 'Tú marcas el límite. Nada es obligatorio: cada propuesta es una invitación que puedes declinar en cualquier momento.',
  },
] as const
