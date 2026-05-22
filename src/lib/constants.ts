export type CityAvailability = 'available' | 'coming_soon'

export const DEFAULT_CITY_SLUG = 'granada' as const

/** Copy compartido para mapa / selector de ciudad. */
export const CITY_AVAILABILITY_COPY = {
  tagline: 'Granada disponible · Próximamente Málaga, Madrid y Alicante',
  detail: 'Reserva hoy en Granada. Málaga, Madrid y Alicante, próximamente.',
} as const

export const CITIES = [
  {
    slug: 'granada',
    displayName: 'Granada',
    barrio: 'Centro histórico',
    lat: 37.1773,
    lon: -3.5986,
    svgX: '44%',
    svgY: '78%',
    availability: 'available',
  },
  {
    slug: 'malaga',
    displayName: 'Málaga',
    barrio: 'Centro / Soho',
    lat: 37,
    lon: -4.2,
    svgX: '38%',
    svgY: '84%',
    availability: 'coming_soon',
  },
  {
    slug: 'madrid',
    displayName: 'Madrid',
    barrio: 'Centro / Malasaña',
    lat: 40.4167,
    lon: -3.7033,
    svgX: '48%',
    svgY: '52%',
    availability: 'coming_soon',
  },
  {
    slug: 'alicante',
    displayName: 'Alicante',
    barrio: 'Centro / Playa',
    lat: 38.7,
    lon: -0.9,
    svgX: '72%',
    svgY: '72%',
    availability: 'coming_soon',
  },
] as const

export function isCityBookable(city: { availability: CityAvailability }): boolean {
  return city.availability === 'available'
}

export function getBookableCitySlug(): typeof DEFAULT_CITY_SLUG {
  return DEFAULT_CITY_SLUG
}

export const EXPERIENCES_TEMPLATE = [
  { n: 1, slug: 'habitacion-veneciana', title: 'La Habitación Veneciana', intensity: 'bajo', missionLevel: 'ALPHA', duration: 120, maxParticipants: 2, basePrice: 140 },
  { n: 2, slug: 'ritual-de-medianoche', title: 'El Ritual de Medianoche', intensity: 'medio', missionLevel: 'BETA', duration: 120, maxParticipants: 4, basePrice: 160 },
  { n: 3, slug: 'la-confesion', title: 'La Confesión', intensity: 'medio', missionLevel: 'BETA', duration: 120, maxParticipants: 2, basePrice: 160 },
  { n: 4, slug: 'espejo-negro', title: 'Espejo Negro', intensity: 'turbio', missionLevel: 'OMEGA', duration: 120, maxParticipants: 4, basePrice: 180 },
  { n: 5, slug: 'el-coleccionista', title: 'El Coleccionista', intensity: 'turbio', missionLevel: 'OMEGA', duration: 120, maxParticipants: 2, basePrice: 180 },
  { n: 6, slug: 'la-mascarada', title: 'La Mascarada', intensity: 'medio', missionLevel: 'BETA', duration: 120, maxParticipants: 2, basePrice: 160 },
] as const

export const ARCHETYPES = [
  {
    id: 'explorador',
    name: 'El Alma Curiosa',
    icon: '🕯️',
    description:
      'Llegas con los sentidos abiertos y sin prisa. La experiencia te irá desvelando sus secretos a tu ritmo.',
    gradient: 'var(--gradient-alpha)',
  },
  {
    id: 'romantico',
    name: 'El Amante Verdadero',
    icon: '🌹',
    description:
      'Lo tuyo es la conexión profunda. Cada gesto, cada mirada, cada pausa. La Game Master IA ya lo ha calibrado.',
    gradient: 'var(--gradient-cta)',
  },
  {
    id: 'caos',
    name: 'El Libertino',
    icon: '🔥',
    description:
      'Sin frenos innecesarios. Viniste a entregarte por completo. La experiencia no va a decepcionarte.',
    gradient: 'var(--gradient-omega)',
  },
  {
    id: 'estratega',
    name: 'El Arquitecto del Placer',
    icon: '🪞',
    description:
      'Sabes exactamente lo que quieres y confías en que la Game Master IA puede dártelo. Alianza perfecta.',
    gradient: 'var(--gradient-hero)',
  },
  {
    id: 'arquitecto',
    name: 'El Conductor',
    icon: '👁️',
    description:
      'Lideras. Diseñas el placer para ti y para los tuyos. Aquí tienes todo lo que necesitas para hacerlo.',
    gradient: 'var(--gradient-beta)',
  },
] as const

export const COMPANY_TYPES = [
  { id: 'pareja', label: 'Pareja', icon: 'Heart', description: 'Dos cuerpos, una complicidad.' },
  { id: 'rollete', label: 'Rollete', icon: 'Zap', description: 'Sin etiquetas. Con todo.' },
  { id: 'plan-golfo', label: 'Plan Golfo', icon: 'Users', description: 'Un grupo que quiere jugar.' },
  { id: 'swinger', label: 'Swinger', icon: 'Infinity', description: 'Libertad consensuada.' },
] as const

export const SAFE_WORD_SUGGESTIONS = ['Lluvia', 'Mariposa', 'Pausa', 'Aurora', 'Eclipse', 'Bruma'] as const

export { GAME_MASTER_INTRO_MESSAGES } from '@/lib/game-master-copy'
