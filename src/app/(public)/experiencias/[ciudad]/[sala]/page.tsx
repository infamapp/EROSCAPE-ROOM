import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ExperienceThresholdView } from '@/components/experiences/ExperienceThresholdView'
import { CITIES, EXPERIENCES_TEMPLATE } from '@/lib/constants'
import type { ExperienciasCatalogIntensity } from '@/types/experiencias-catalog'

type RouteParams = {
  ciudad: string
  sala: string
}

function getExperienceBySlug(slug: string) {
  return EXPERIENCES_TEMPLATE.find((e) => e.slug === slug) ?? null
}

export function generateStaticParams(): RouteParams[] {
  return CITIES.flatMap((c) => EXPERIENCES_TEMPLATE.map((e) => ({ ciudad: c.slug, sala: e.slug })))
}

export async function generateMetadata({ params }: { params: Promise<RouteParams> }): Promise<Metadata> {
  const { sala } = await params
  const exp = getExperienceBySlug(sala)
  const title = exp ? `${exp.title} — Eroscape` : 'Experiencia — Eroscape'

  return {
    title,
    description: 'Antesala de tu noche: elige fecha y cruza el umbral con discreción.',
    openGraph: {
      title,
      description: 'Antesala de tu noche: elige fecha y cruza el umbral con discreción.',
      type: 'website',
    },
  }
}

export default async function ExperiencePage({ params }: { params: Promise<RouteParams> }) {
  const { ciudad, sala } = await params
  const city = CITIES.find((c) => c.slug === ciudad)
  const exp = getExperienceBySlug(sala)

  if (!city || !exp) {
    notFound()
  }

  const catalogIntensity = exp.missionLevel as ExperienciasCatalogIntensity

  return (
    <ExperienceThresholdView
      slug={exp.slug}
      title={exp.title}
      citySlug={city.slug}
      cityDisplayName={city.displayName}
      catalogIntensity={catalogIntensity}
      durationMin={exp.duration}
      capacity={exp.maxParticipants}
      basePrice={exp.basePrice}
    />
  )
}
