import { EXPERIENCES_TEMPLATE } from '@/lib/constants'

import { getExperienceDetailMedia } from '@/lib/experiences/visuals'
import { getExperienceNarrativeTriplet } from '@/lib/experiences/narrative'

export interface ExperienceDetailCopy {
  heroImageSrc: string
  galleryImageSrcs: readonly [string, string, string]
  eyebrow: string
  subtitle: string
  bodyTwoParagraphs: readonly [string, string]
}

type ExperienceDetailText = Pick<ExperienceDetailCopy, 'eyebrow' | 'subtitle' | 'bodyTwoParagraphs'>

const VENECIANA_TEXT: ExperienceDetailText = {
  eyebrow: 'La colección privada',
  subtitle: 'Donde el tiempo se detiene y los secretos cobran vida.',
  bodyTwoParagraphs: [
    'Tras las puertas talladas de la Habitación Veneciana, la realidad se disuelve para dar paso a una noche de intriga palaciega. Inspirada en los bailes de máscaras del siglo XVIII, esta experiencia invita a la desconexión total a través de una atmósfera cargada de erotismo elegante y misterio.',
    'Cada rincón ha sido diseñado para estimular los sentidos: el tacto del terciopelo pesado, el aroma a sándalo y especias exóticas, y una iluminación tenue que invita a explorar lo prohibido. No es solo un escape; es un viaje a través de los deseos ocultos en el corazón de Venecia.',
  ],
}

const TEXT_OVERRIDES: Partial<Record<string, ExperienceDetailText>> = {
  'habitacion-veneciana': VENECIANA_TEXT,
}

export function getExperienceDetailCopy(slug: string): ExperienceDetailCopy {
  const media = getExperienceDetailMedia(slug)
  const textOverride = TEXT_OVERRIDES[slug]
  if (textOverride) {
    return { ...media, ...textOverride }
  }

  const [a, b, c] = getExperienceNarrativeTriplet(slug)
  return {
    ...media,
    eyebrow: 'Tu noche, a medida',
    subtitle: 'Un umbral entre lo que imaginas y lo que aún no te atreves a nombrar.',
    bodyTwoParagraphs: [`${a} ${b}`, c],
  }
}

export interface ExperienceFaqItem {
  id: string
  question: string
  answer: string
}

export const EXPERIENCE_FAQ_ITEMS: readonly ExperienceFaqItem[] = [
  {
    id: 'pareja',
    question: '¿Es necesario ir en pareja?',
    answer:
      'Mínimo dos personas por reserva. Para grupos de hasta 10 consulta disponibilidad. La narrativa y el ritmo se adaptan siempre a quienes sois.',
  },
  {
    id: 'discrecion',
    question: '¿Cuál es el protocolo de discreción?',
    answer:
      'La privacidad es el pilar. Entradas discretas, coordinación sin filas innecesarias y un equipo formado en confidencialidad. No se permiten cámaras en el recorrido; tu nombre y tus elecciones se tratan con el máximo cuidado.',
  },
] as const

export interface RelatedExperienceLink {
  slug: string
  title: string
  tag: string
  href: string
}

function tagForMissionLevel(level: 'ALPHA' | 'BETA' | 'OMEGA'): string {
  switch (level) {
    case 'ALPHA':
      return 'Despertar · suave'
    case 'BETA':
      return 'Intenso · sin prisa'
    case 'OMEGA':
      return 'Sin filtros · profundo'
    default: {
      const _e: never = level
      return _e
    }
  }
}

export function getRelatedExperienceLinks(currentSlug: string, citySlug: string): RelatedExperienceLink[] {
  return EXPERIENCES_TEMPLATE.filter((e) => e.slug !== currentSlug)
    .slice(0, 2)
    .map((e) => ({
      slug: e.slug,
      title: e.title,
      tag: tagForMissionLevel(e.missionLevel),
      href: `/experiencias/${citySlug}/${e.slug}`,
    }))
}
