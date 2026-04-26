export const CITIES = [
  {
    slug: 'madrid',
    displayName: 'Madrid',
    barrio: 'Centro / Malasaña',
    lat: 40.4167,
    lon: -3.7033,
    svgX: '10%',
    svgY: '56%',
  },
  {
    slug: 'barcelona',
    displayName: 'Barcelona',
    barrio: 'Eixample / Gràcia',
    lat: 41.5851,
    lon: 1.1734,
    svgX: '40%',
    svgY: '40%',
  },
  {
    slug: 'valencia',
    displayName: 'Valencia',
    barrio: 'Ruzafa / Centro',
    lat: 39.4699,
    lon: -1.,
    svgX: '73%',
    svgY: '63%',
  },
  {
    slug: 'sevilla',
    displayName: 'Sevilla',
    barrio: 'Triana / Centro',
    lat: 37.3891,
    lon: -5.5845,
    svgX: '36%',
    svgY: '80%',
  },
  {
    slug: 'bilbao',
    displayName: 'Bilbao',
    barrio: 'Casco Viejo',
    lat: 43.,
    lon: -2.935,
    svgX: '42%',
    svgY: '26%',
  },
] as const

export const EXPERIENCES_TEMPLATE = [
  { n: 1, slug: 'habitacion-veneciana', title: 'La Habitación Veneciana', intensity: 'bajo', missionLevel: 'ALPHA', duration: 90, maxParticipants: 2, basePrice: 120 },
  { n: 2, slug: 'ritual-de-medianoche', title: 'El Ritual de Medianoche', intensity: 'medio', missionLevel: 'BETA', duration: 90, maxParticipants: 4, basePrice: 140 },
  { n: 3, slug: 'la-confesion', title: 'La Confesión', intensity: 'medio', missionLevel: 'BETA', duration: 90, maxParticipants: 2, basePrice: 140 },
  { n: 4, slug: 'espejo-negro', title: 'Espejo Negro', intensity: 'turbio', missionLevel: 'OMEGA', duration: 90, maxParticipants: 4, basePrice: 160 },
  { n: 5, slug: 'el-coleccionista', title: 'El Coleccionista', intensity: 'turbio', missionLevel: 'OMEGA', duration: 90, maxParticipants: 2, basePrice: 160 },
] as const

export const UPSELL_ITEMS = [
  { id: 'pack-sensorial', name: 'Caja de Placeres', rarity: 'raro', price: 39, description: 'Juguetes y accesorios sensuales esperándote en la sala al llegar.', popular: false, icon: 'Package' },
  { id: 'tiempo-15', name: '+15 min de abandono', rarity: 'descomun', price: 25, description: 'Porque a veces el placer no puede apurarse.', popular: false, icon: 'Clock' },
  { id: 'tiempo-30', name: '+30 min sin apuro', rarity: 'raro', price: 45, description: 'El doble de tiempo para perderte en la experiencia.', popular: true, icon: 'Clock3' },
  { id: 'upgrade-ia', name: 'El Maestro te conoce', rarity: 'epico', price: 20, description: 'La IA personaliza cada detalle según tus deseos más profundos.', popular: false, icon: 'Cpu' },
  { id: 'sorpresa', name: 'Susurro para tu acompañante', rarity: 'descomun', price: 15, description: 'Un mensaje secreto y un detalle especial que solo ellos recibirán.', popular: false, icon: 'Gift' },
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
      'Lo tuyo es la conexión profunda. Cada gesto, cada mirada, cada pausa. El Maestro lo ha entendido.',
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
      'Sabes exactamente lo que quieres y confías en que El Maestro puede dártelo. Alianza perfecta.',
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
  'Ya tenemos tu reserva. Ahora queremos conocerte mejor.',
  'Cada detalle de esta noche se moldeará a lo que deseas.',
  'Antes de que llegues, necesito saber algo más sobre ti.',
] as const
