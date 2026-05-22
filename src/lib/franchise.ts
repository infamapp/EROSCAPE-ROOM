import { CITIES } from '@/lib/constants'

export interface FranchiseMetric {
  value: string
  label: string
}

export const FRANCHISE_ROUTE = '/franquicia' as const
export const FRANCHISE_FORM_ANCHOR = '#solicitud' as const

export const FRANCHISE_METRICS: readonly FranchiseMetric[] = [
  { value: '5 ciudades', label: 'PRESENCIA' },
  { value: '25 experiencias', label: 'IPS ÚNICAS' },
  { value: '€180 ticket medio', label: 'MARGEN ALTO' },
] as const

export const FRANCHISE_CITY_OPTIONS = [
  ...CITIES.map((city) => ({
    slug: city.slug,
    label: city.displayName,
  })),
  { slug: 'otra', label: 'Otra ciudad' },
] as const

export const FRANCHISE_PAGE_COPY = {
  eyebrow: 'EXPANSIÓN',
  heroTitle: '¿Quieres montar tu propio Eroscape?',
  heroIntro:
    'Te montamos tu propia franquicia. Una oportunidad única en su categoría — calidad, discreción y experiencia en cada ciudad.',
  formTitle: 'Solicitar información',
  formIntro: 'Déjanos tus datos y te contactamos con total discreción para contarte el modelo y los próximos pasos.',
  submitLabel: 'Enviar solicitud',
  successTitle: 'Recibimos tu solicitud',
  successBody: 'Nos pondremos en contacto contigo pronto. Gracias por tu interés en abrir un Eroscape.',
  privacyNote: 'Tus datos solo se usan para responder a esta solicitud. Sin spam, sin exposición.',
} as const

/** Copy reducido para el CTA de home (antes del footer). */
export const FRANCHISE_HOME_COPY = {
  eyebrow: 'EXPANSIÓN',
  title: 'Monta tu propia franquicia',
  intro: 'Una oportunidad única en su categoría — calidad, discreción y experiencia en cada ciudad.',
  ctaLabel: 'Quiero montar mi Eroscape',
  ctaHref: `${FRANCHISE_ROUTE}${FRANCHISE_FORM_ANCHOR}`,
} as const
