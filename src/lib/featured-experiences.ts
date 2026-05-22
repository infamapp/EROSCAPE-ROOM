export type FeaturedExperienceIntensity = 'ALPHA' | 'BETA' | 'OMEGA'

export type FeaturedExperienceCity = 'Granada' | 'Málaga' | 'Madrid' | 'Alicante'

export interface FeaturedExperience {
  title: string
  teaser: string
  intensity: FeaturedExperienceIntensity
  durationMin: number
  priceFrom: number
  city: FeaturedExperienceCity
  slug: string
  imageSrc?: string
}

export const FEATURED_EXPERIENCES: readonly FeaturedExperience[] = [
  {
    city: 'Granada',
    title: 'La Habitación Veneciana',
    teaser: 'Máscara, susurro y tensión elegante. Dos cuerpos, una sola historia.',
    intensity: 'ALPHA',
    durationMin: 120,
    priceFrom: 140,
    slug: 'habitacion-veneciana',
  },
  {
    city: 'Granada',
    title: 'El Ritual de Medianoche',
    teaser: 'Luz baja. Reglas claras. Un juego que se acelera cuando lo mirás de frente.',
    intensity: 'BETA',
    durationMin: 120,
    priceFrom: 160,
    slug: 'ritual-de-medianoche',
  },
  {
    city: 'Granada',
    title: 'Espejo Negro',
    teaser: 'Un reflejo que no perdona. Si seguís, es porque querés.',
    intensity: 'OMEGA',
    durationMin: 120,
    priceFrom: 180,
    slug: 'espejo-negro',
  },
  {
    city: 'Málaga',
    title: 'La Habitación Veneciana',
    teaser: 'Costa y calor contenido. Un inicio suave con final cuidado.',
    intensity: 'ALPHA',
    durationMin: 120,
    priceFrom: 140,
    slug: 'habitacion-veneciana',
  },
  {
    city: 'Málaga',
    title: 'La Confesión',
    teaser: 'Palabras que abren puertas. Lo íntimo empieza en lo que no decís.',
    intensity: 'BETA',
    durationMin: 120,
    priceFrom: 160,
    slug: 'la-confesion',
  },
  {
    city: 'Málaga',
    title: 'La Mascarada',
    teaser: 'Cuando todos llevan máscara, nadie miente. O quizá todos lo hacen.',
    intensity: 'BETA',
    durationMin: 120,
    priceFrom: 160,
    slug: 'la-mascarada',
  },
  {
    city: 'Madrid',
    title: 'La Habitación Veneciana',
    teaser: 'Máscara, susurro y tensión elegante. Dos cuerpos, una sola historia.',
    intensity: 'ALPHA',
    durationMin: 120,
    priceFrom: 140,
    slug: 'habitacion-veneciana',
  },
  {
    city: 'Madrid',
    title: 'El Ritual de Medianoche',
    teaser: 'Luz baja. Reglas claras. Un juego que se acelera cuando lo mirás de frente.',
    intensity: 'BETA',
    durationMin: 120,
    priceFrom: 160,
    slug: 'ritual-de-medianoche',
  },
  {
    city: 'Madrid',
    title: 'Espejo Negro',
    teaser: 'Un reflejo que no perdona. Si seguís, es porque querés.',
    intensity: 'OMEGA',
    durationMin: 120,
    priceFrom: 180,
    slug: 'espejo-negro',
  },
  {
    city: 'Madrid',
    title: 'La Confesión',
    teaser: 'Palabras que abren puertas. Lo íntimo empieza en lo que no decís.',
    intensity: 'BETA',
    durationMin: 120,
    priceFrom: 160,
    slug: 'la-confesion',
  },
  {
    city: 'Madrid',
    title: 'El Coleccionista',
    teaser: 'Deseos guardados como reliquias. Entrás para tocar lo prohibido.',
    intensity: 'OMEGA',
    durationMin: 120,
    priceFrom: 180,
    slug: 'el-coleccionista',
  },
  {
    city: 'Alicante',
    title: 'La Habitación Veneciana',
    teaser: 'Insinuación, ritmo lento y un premio final cuidado.',
    intensity: 'ALPHA',
    durationMin: 120,
    priceFrom: 140,
    slug: 'habitacion-veneciana',
  },
  {
    city: 'Alicante',
    title: 'La Mascarada',
    teaser: 'Ritual, identidad y juego social. Todo sugerido, nada impuesto.',
    intensity: 'BETA',
    durationMin: 120,
    priceFrom: 160,
    slug: 'la-mascarada',
  },
  {
    city: 'Alicante',
    title: 'El Ritual de Medianoche',
    teaser: 'Donde el deseo se ordena en pasos y la noche responde.',
    intensity: 'BETA',
    durationMin: 120,
    priceFrom: 160,
    slug: 'ritual-de-medianoche',
  },
] as const
