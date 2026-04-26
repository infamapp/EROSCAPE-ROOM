import type { Metadata } from 'next'

import { CITIES, EXPERIENCES_TEMPLATE } from '@/lib/constants'
import { MissionBriefing } from '@/components/sections/MissionBriefing'

type Params = {
  ciudad: string
  sala: string
}

function getExperienceBySlug(slug: string) {
  return EXPERIENCES_TEMPLATE.find((e) => e.slug === slug) ?? null
}

export function generateStaticParams(): Params[] {
  return CITIES.flatMap((c) => EXPERIENCES_TEMPLATE.map((e) => ({ ciudad: c.slug, sala: e.slug })))
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const exp = getExperienceBySlug(params.sala)
  const title = exp ? `${exp.title} — Eroscape` : 'Experiencia — Eroscape'

  return {
    title,
    description: 'Reserva tu noche con discreción absoluta.',
    openGraph: {
      title,
      description: 'Reserva tu noche con discreción absoluta.',
      type: 'website',
    },
  }
}

export default function ExperiencePage({ params }: { params: Params }) {
  const city = CITIES.find((c) => c.slug === params.ciudad) ?? CITIES[0]
  const exp = getExperienceBySlug(params.sala) ?? EXPERIENCES_TEMPLATE[0]

  const experience = {
    ...exp,
    citySlug: city.slug,
    missionCode: '',
    teaser: 'Lo que te espera no se explica del todo. Se siente.',
    synopsis: [
      'Empieza con una invitación apenas perceptible. Un gesto pequeño. Una puerta entornada. Y la decisión — íntima — de dar un paso más.',
      'Dentro, cada elección cambia el aire: luces, ritmo, cercanía. No hay prisa. Solo un camino que se revela cuando te dejas llevar.',
      'El Maestro escucha. Ajusta. Cuida los límites. Y convierte tus deseos en una noche hecha a tu medida.',
    ],
    specs: {
      aiLevel: 'Estándar' as const,
      theme: 'El Umbral' as const,
    },
  }

  return <MissionBriefing experience={experience} citySlug={city.slug} />
}

