import type { ExperienciasCatalogItem } from '@/types/experiencias-catalog'

/** Salas mostradas en home (destacadas) y en /experiencias (catálogo completo). */
export const EXPERIENCIAS_CATALOG_ITEMS: readonly ExperienciasCatalogItem[] = [
  {
    slug: 'habitacion-veneciana',
    title: 'La Habitación Veneciana',
    intensity: 'ALPHA',
    availability: 'DISPONIBLE',
    description: 'Para quienes saben que el placer más profundo empieza por los sentidos.',
    durationMin: 120,
    capacity: 2,
    priceFrom: 140,
    isComingSoon: false,
  },
  {
    slug: 'ritual-de-medianoche',
    title: 'El Ritual de Medianoche',
    intensity: 'BETA',
    availability: 'DISPONIBLE',
    description: 'Hay rituales que no se explican. Solo se viven. ¿Estás listo?',
    durationMin: 120,
    capacity: 2,
    priceFrom: 160,
    isComingSoon: false,
  },
  {
    slug: 'la-confesion',
    title: 'La Confesión',
    intensity: 'BETA',
    availability: 'POCAS PLAZAS',
    description: 'A veces lo que más excita es admitir lo que nunca te habías atrevido a decir.',
    durationMin: 120,
    capacity: 2,
    priceFrom: 160,
    isComingSoon: false,
  },
  {
    slug: 'espejo-negro',
    title: 'Espejo Negro',
    intensity: 'OMEGA',
    availability: 'DISPONIBLE',
    description: 'El espejo no miente. Verás cosas de ti que preferías no saber.',
    durationMin: 120,
    capacity: 2,
    priceFrom: 180,
    isComingSoon: false,
  },
  {
    slug: 'el-coleccionista',
    title: 'El Coleccionista',
    intensity: 'OMEGA',
    availability: 'POCAS PLAZAS',
    description: 'Guarda recuerdos de tus visitas. Esta noche, tú serás uno de ellos.',
    durationMin: 120,
    capacity: 2,
    priceFrom: 180,
    isComingSoon: false,
  },
  {
    slug: 'la-mascarada',
    title: 'La Mascarada',
    intensity: 'BETA',
    availability: 'POCAS PLAZAS',
    description: 'Un entorno elegante donde los roles se diluyen.',
    durationMin: 120,
    capacity: 2,
    priceFrom: 160,
    isComingSoon: false,
  },
] as const

/**
 * API canónica para /experiencias.
 * Nota: hoy el mock no discrimina por ciudad; devolvemos el catálogo completo.
 * Cuando exista data por ciudad, filtrar aquí por citySlug.
 */
export function getExperiencesByCity(citySlug: string): readonly ExperienciasCatalogItem[] {
  void citySlug
  return EXPERIENCIAS_CATALOG_ITEMS
}

/** Primeras salas del catálogo para el bloque “destacadas” en la home. */
export const EXPERIENCIAS_DESTACADAS_SLICES = 3 as const
