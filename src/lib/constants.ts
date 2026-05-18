export type CityAvailability = 'available' | 'coming_soon'

export const DEFAULT_CITY_SLUG = 'granada' as const

export const CITIES = [
  {
    slug: 'granada',
    displayName: 'Granada',
    barrio: 'Centro histórico',
    lat: 37.5,
    lon: -3.59904,
    svgX: '44%',
    svgY: '78%',
    availability: 'available',
  },
  {
    slug: 'madrid',
    displayName: 'Madrid',
    barrio: 'Centro / Malasaña',
    lat: 40.4167,
    lon: -3.7033,
    svgX: '10%',
    svgY: '56%',
    availability: 'coming_soon',
  },
  {
    slug: 'barcelona',
    displayName: 'Barcelona',
    barrio: 'Eixample / Gràcia',
    lat: 41.5851,
    lon: 1.1734,
    svgX: '40%',
    svgY: '40%',
    availability: 'coming_soon',
  },
  {
    slug: 'valencia',
    displayName: 'Valencia',
    barrio: 'Ruzafa / Centro',
    lat: 39.4699,
    lon: -0.3763,
    svgX: '73%',
    svgY: '63%',
    availability: 'coming_soon',
  },
  {
    slug: 'sevilla',
    displayName: 'Sevilla',
    barrio: 'Triana / Centro',
    lat: 37.3891,
    lon: -5.5845,
    svgX: '36%',
    svgY: '80%',
    availability: 'coming_soon',
  },
  {
    slug: 'bilbao',
    displayName: 'Bilbao',
    barrio: 'Casco Viejo',
    lat: 43.263,
    lon: -2.935,
    svgX: '42%',
    svgY: '26%',
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

export const UPSELL_ITEMS = [
  { id: 'pack-sensorial', name: 'Caja de Placeres', rarity: 'raro', price: 39, description: 'Juguetes y accesorios sensuales esperándote en la sala al llegar.', popular: false, icon: 'Package' },
  { id: 'tiempo-15', name: '+30 min de abandono', rarity: 'descomun', price: 25, description: 'Amplía tu experiencia media hora más. Porque el placer no debería apurarse.', popular: false, icon: 'Clock' },
  { id: 'tiempo-30', name: '+60 min sin apuro', rarity: 'raro', price: 45, description: 'Una hora más para perderte del todo en la experiencia.', popular: true, icon: 'Clock3' },
  { id: 'sorpresa', name: 'El Susurro', rarity: 'descomun', price: 15, description: 'Un mensaje secreto y personalizado que solo tu acompañante recibirá. Una dedicatoria íntima antes de que todo empiece.', popular: false, icon: 'Gift' },
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
      'Lo tuyo es la conexión profunda. Cada gesto, cada mirada, cada pausa. El Game Master lo ha entendido.',
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
      'Sabes exactamente lo que quieres y confías en que el Game Master puede dártelo. Alianza perfecta.',
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

export const GAME_MASTER_INTRO_MESSAGES = [
  'Ya te esperábamos.',
  'He analizado tus preferencias. La noche se adapta a vos.',
  'Tengo una pregunta antes de preparar tu experiencia.',
] as const
