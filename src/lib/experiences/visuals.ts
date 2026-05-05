/**
 * Arte por sala: cards (home, /experiencias), hero y galería de ficha, polaroids.
 * Una sola tabla por slug evita desajustes entre catálogo y ficha.
 */

export interface ExperienceCardImage {
  src: string
  alt: string
}

export interface ExperienceDetailMedia {
  heroImageSrc: string
  galleryImageSrcs: readonly [string, string, string]
}

type ExperienceVisualEntry = {
  /** Card catálogo / previews (misma pieza que el hero salvo que indiques lo contrario). */
  cardSrc: string
  alt: string
  heroSrc: string
  gallerySrcs: readonly [string, string, string]
}

const PLACEHOLDER_TRIPLET = ['/placeholder.png', '/placeholder.png', '/placeholder.png'] as const

const EXPERIENCE_VISUALS: Record<string, ExperienceVisualEntry> = {
  'habitacion-veneciana': {
    cardSrc: '/habitacioveneciana.png',
    alt: 'La Habitación Veneciana',
    heroSrc: '/habitacioveneciana.png',
    gallerySrcs: ['/Hv-1.png', '/Hv-2.png', '/hv-3.png'],
  },
  'ritual-de-medianoche': {
    cardSrc: '/ritualmedianoche.png',
    alt: 'El Ritual de Medianoche',
    heroSrc: '/ritualmedianoche.png',
    /** Arte de galería específico pendiente: se reutiliza el key visual hasta nuevos assets. */
    gallerySrcs: ['/ritualmedianoche.png', '/ritualmedianoche.png', '/ritualmedianoche.png'],
  },
  'la-confesion': {
    cardSrc: '/laconfesion.png',
    alt: 'La Confesión',
    heroSrc: '/laconfesion.png',
    gallerySrcs: ['/lc-1.png', '/lc-2.png', '/lc-3.png'],
  },
  'espejo-negro': {
    cardSrc: '/espejonegro.png',
    alt: 'Espejo Negro',
    heroSrc: '/espejonegro.png',
    gallerySrcs: ['/tds-1.png', '/tds-2.png', '/tds-3.png'],
  },
  'el-coleccionista': {
    cardSrc: '/coleccionista.png',
    alt: 'El Coleccionista',
    heroSrc: '/coleccionista.png',
    gallerySrcs: ['/ec-1.png', '/ec-2.png', '/ec-3.png'],
  },
  'la-mascarada': {
    cardSrc: '/lamascarada.png',
    alt: 'La Mascarada',
    heroSrc: '/lamascarada.png',
    gallerySrcs: ['/lm-1.png', '/lm-2.png', '/lm-3.png'],
  },
}

const FALLBACK_DETAIL: ExperienceDetailMedia = {
  heroImageSrc: '/placeholder.png',
  galleryImageSrcs: PLACEHOLDER_TRIPLET,
}

export function getExperienceCardImage(slug: string, titleForAlt?: string): ExperienceCardImage {
  const entry = EXPERIENCE_VISUALS[slug]
  if (entry) {
    return { src: entry.cardSrc, alt: entry.alt }
  }
  return {
    src: '/placeholder.png',
    alt: titleForAlt ? `Experiencia: ${titleForAlt}` : 'Experiencia Eroscape',
  }
}

export function getExperienceDetailMedia(slug: string): ExperienceDetailMedia {
  const entry = EXPERIENCE_VISUALS[slug]
  if (!entry) return FALLBACK_DETAIL
  return {
    heroImageSrc: entry.heroSrc,
    galleryImageSrcs: entry.gallerySrcs,
  }
}

/** Orden del carrusel / polaroids en MissionBriefing. */
export const EXPERIENCE_CARD_GALLERY_SLUG_ORDER = [
  'habitacion-veneciana',
  'ritual-de-medianoche',
  'la-confesion',
  'espejo-negro',
  'el-coleccionista',
  'la-mascarada',
] as const

export type ExperienceCardGallerySlug = (typeof EXPERIENCE_CARD_GALLERY_SLUG_ORDER)[number]
