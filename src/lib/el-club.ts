import { ARCHETYPES } from '@/lib/constants'

export const EROSCAPE_CLUB_MEMBER_STORAGE_KEY = 'eroscape_club_member' as const

export type ClubTierId = 'basico' | 'premium' | 'black'

export type ClubFeatureId =
  | 'discount_missions'
  | 'tocador_discount'
  | 'early_access'
  | 'gm_extended'
  | 'private_events'
  | 'priority_support'
  | 'anniversary_upgrade'

export interface ClubFeatureRow {
  id: ClubFeatureId
  label: string
}

export const CLUB_FEATURE_ROWS: readonly ClubFeatureRow[] = [
  { id: 'discount_missions', label: 'Descuento en noches' },
  { id: 'tocador_discount', label: 'Descuento en El Tocador' },
  { id: 'early_access', label: 'Acceso anticipado a nuevas salas' },
  { id: 'gm_extended', label: 'Game Master IA, más cerca' },
  { id: 'private_events', label: 'Encuentros y eventos solo socios' },
  { id: 'priority_support', label: 'Soporte prioritario' },
  { id: 'anniversary_upgrade', label: 'Detalle sorpresa en aniversario' },
] as const

export interface ClubTierDefinition {
  id: ClubTierId
  name: string
  price: number
  period: 'mes'
  /** CSS color token for top border / accents */
  accentVar: string
  featured?: boolean
  benefits: readonly string[]
  includes: ReadonlySet<ClubFeatureId>
}

function ids(...xs: ClubFeatureId[]): ReadonlySet<ClubFeatureId> {
  return new Set(xs)
}

export const CLUB_TIERS: readonly ClubTierDefinition[] = [
  {
    id: 'basico',
    name: 'INICIADO',
    price: 29,
    period: 'mes',
    accentVar: 'var(--color-purple-muted)',
    benefits: [
      '5% de descuento en noches',
      '5% en kits de El Tocador',
      'Una carta mensual (de puertas adentro)',
      'Acceso a novedades de La Sociedad',
    ],
    includes: ids('discount_missions', 'tocador_discount'),
  },
  {
    id: 'premium',
    name: 'INICIADO NEGRO',
    price: 59,
    period: 'mes',
    accentVar: 'var(--color-magenta)',
    featured: true,
    benefits: [
      '10% de descuento en noches',
      '10% en El Tocador',
      'Prioridad al elegir fechas',
      'Tus deseos con lectura de la Game Master IA',
      'Invitaciones a aperturas privadas',
    ],
    includes: ids('discount_missions', 'tocador_discount', 'early_access', 'gm_extended', 'priority_support'),
  },
  {
    id: 'black',
    name: 'EL COLECCIONISTA',
    price: 99,
    period: 'mes',
    accentVar: 'var(--color-gold)',
    benefits: [
      '15% de descuento en noches',
      '15% en El Tocador y envío prioritario',
      'Concierge para diseñar tu experiencia',
      'Eventos exclusivos presenciales',
      'Detalle aniversario incluido',
      'Línea directa, sin esperas',
    ],
    includes: ids(
      'discount_missions',
      'tocador_discount',
      'early_access',
      'gm_extended',
      'private_events',
      'priority_support',
      'anniversary_upgrade',
    ),
  },
] as const

export interface ClubTestimonial {
  id: string
  quote: string
  archetypeName: string
  avatarVariant: 1 | 2 | 3
}

const arch = ARCHETYPES

export const CLUB_TESTIMONIALS: readonly ClubTestimonial[] = [
  {
    id: 't1',
    quote: 'La prioridad en reservas cambió cómo planificamos nuestras escapadas. Discreto y fluido.',
    archetypeName: arch[0]?.name ?? 'Iniciado',
    avatarVariant: 1,
  },
  {
    id: 't2',
    quote: 'La IA nota matices que ni escribimos. Se siente hecho a medida — sin nadie mirando.',
    archetypeName: arch[3]?.name ?? 'Estratega',
    avatarVariant: 2,
  },
  {
    id: 't3',
    quote: 'Los eventos solo socios son otro nivel: atmósfera, detalle, cero ruido innecesario.',
    archetypeName: arch[2]?.name ?? 'Coleccionista',
    avatarVariant: 3,
  },
] as const

export function notifyClubMemberStorageUpdated(): void {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new Event('eroscape-club-member-updated'))
}

export function setClubMemberLocalStorage(value: boolean): void {
  if (typeof window === 'undefined') return
  try {
    if (value) {
      window.localStorage.setItem(EROSCAPE_CLUB_MEMBER_STORAGE_KEY, '1')
    } else {
      window.localStorage.removeItem(EROSCAPE_CLUB_MEMBER_STORAGE_KEY)
    }
    notifyClubMemberStorageUpdated()
  } catch {
    // ignore
  }
}
