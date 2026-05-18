export type FeaturedExperienceIntensity = 'ALPHA' | 'BETA' | 'OMEGA'

export interface FeaturedExperience {
  title: string
  teaser: string
  intensity: FeaturedExperienceIntensity
  durationMin: number
  priceFrom: number
  city: 'Granada' | 'Madrid' | 'Barcelona' | 'Valencia' | 'Sevilla' | 'Bilbao'
  slug: string
  imageSrc?: string
}

export const FEATURED_EXPERIENCES: readonly FeaturedExperience[] = [
  // Granada (3 destacadas)
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
  // Madrid (5)
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

  // Barcelona (5)
  {
    city: 'Barcelona',
    title: 'La Mascarada',
    teaser: 'Cuando todos llevan máscara, nadie miente. O quizá todos lo hacen.',
    intensity: 'BETA',
    durationMin: 120,
    priceFrom: 160,
    slug: 'la-mascarada',
  },
  {
    city: 'Barcelona',
    title: 'La Habitación Veneciana',
    teaser: 'Un inicio suave. Un final que se queda en la piel.',
    intensity: 'ALPHA',
    durationMin: 120,
    priceFrom: 140,
    slug: 'habitacion-veneciana',
  },
  {
    city: 'Barcelona',
    title: 'El Ritual de Medianoche',
    teaser: 'Entra con calma. Salí con una historia nueva.',
    intensity: 'BETA',
    durationMin: 120,
    priceFrom: 160,
    slug: 'ritual-de-medianoche',
  },
  {
    city: 'Barcelona',
    title: 'Espejo Negro',
    teaser: 'Sin filtros. Solo límites reales. El resto es diseño.',
    intensity: 'OMEGA',
    durationMin: 120,
    priceFrom: 180,
    slug: 'espejo-negro',
  },
  {
    city: 'Barcelona',
    title: 'La Confesión',
    teaser: 'Miradas que pesan. Pausas que dicen más que el ruido.',
    intensity: 'BETA',
    durationMin: 120,
    priceFrom: 160,
    slug: 'la-confesion',
  },

  // Valencia (5)
  {
    city: 'Valencia',
    title: 'La Habitación Veneciana',
    teaser: 'Insinuación, ritmo lento y un premio final cuidado.',
    intensity: 'ALPHA',
    durationMin: 120,
    priceFrom: 140,
    slug: 'habitacion-veneciana',
  },
  {
    city: 'Valencia',
    title: 'La Mascarada',
    teaser: 'Ritual, identidad y juego social. Todo sugerido, nada impuesto.',
    intensity: 'BETA',
    durationMin: 120,
    priceFrom: 160,
    slug: 'la-mascarada',
  },
  {
    city: 'Valencia',
    title: 'El Ritual de Medianoche',
    teaser: 'Donde el deseo se ordena en pasos y la noche responde.',
    intensity: 'BETA',
    durationMin: 120,
    priceFrom: 160,
    slug: 'ritual-de-medianoche',
  },
  {
    city: 'Valencia',
    title: 'Espejo Negro',
    teaser: 'Un umbral más oscuro. Si lo pedís, te lo damos.',
    intensity: 'OMEGA',
    durationMin: 120,
    priceFrom: 180,
    slug: 'espejo-negro',
  },
  {
    city: 'Valencia',
    title: 'El Coleccionista',
    teaser: 'Cada elección deja marca. Cada pista, una invitación.',
    intensity: 'OMEGA',
    durationMin: 120,
    priceFrom: 180,
    slug: 'el-coleccionista',
  },

  // Sevilla (mock extra para pills; reusa slugs)
  {
    city: 'Sevilla',
    title: 'La Habitación Veneciana',
    teaser: 'Un comienzo suave para bajar la guardia con elegancia.',
    intensity: 'ALPHA',
    durationMin: 120,
    priceFrom: 140,
    slug: 'habitacion-veneciana',
  },
  {
    city: 'Sevilla',
    title: 'El Ritual de Medianoche',
    teaser: 'Más cerca. Más claro. Donde el juego ya se nota.',
    intensity: 'BETA',
    durationMin: 120,
    priceFrom: 160,
    slug: 'ritual-de-medianoche',
  },
  {
    city: 'Sevilla',
    title: 'La Confesión',
    teaser: 'Lo íntimo empieza en lo que te animás a decir.',
    intensity: 'BETA',
    durationMin: 120,
    priceFrom: 160,
    slug: 'la-confesion',
  },
  {
    city: 'Sevilla',
    title: 'Espejo Negro',
    teaser: 'Una noche más turbia, diseñada con control.',
    intensity: 'OMEGA',
    durationMin: 120,
    priceFrom: 180,
    slug: 'espejo-negro',
  },
  {
    city: 'Sevilla',
    title: 'La Mascarada',
    teaser: 'Cuando el misterio guía, el cuerpo entiende.',
    intensity: 'BETA',
    durationMin: 120,
    priceFrom: 160,
    slug: 'la-mascarada',
  },

  // Bilbao (mock extra para pills; reusa slugs)
  {
    city: 'Bilbao',
    title: 'La Habitación Veneciana',
    teaser: 'Respirá. Elegí el ritmo. El resto se acomoda.',
    intensity: 'ALPHA',
    durationMin: 120,
    priceFrom: 140,
    slug: 'habitacion-veneciana',
  },
  {
    city: 'Bilbao',
    title: 'La Mascarada',
    teaser: 'Roles, máscaras, decisiones. Todo con cuidado.',
    intensity: 'BETA',
    durationMin: 120,
    priceFrom: 160,
    slug: 'la-mascarada',
  },
  {
    city: 'Bilbao',
    title: 'El Ritual de Medianoche',
    teaser: 'Donde la tensión tiene forma y la noche tiene tono.',
    intensity: 'BETA',
    durationMin: 120,
    priceFrom: 160,
    slug: 'ritual-de-medianoche',
  },
  {
    city: 'Bilbao',
    title: 'El Coleccionista',
    teaser: 'Un archivo vivo de deseos que no se nombran.',
    intensity: 'OMEGA',
    durationMin: 120,
    priceFrom: 180,
    slug: 'el-coleccionista',
  },
  {
    city: 'Bilbao',
    title: 'Espejo Negro',
    teaser: 'Si cruzás, cruzás de verdad. Sin frenos innecesarios.',
    intensity: 'OMEGA',
    durationMin: 120,
    priceFrom: 180,
    slug: 'espejo-negro',
  }
] as const

