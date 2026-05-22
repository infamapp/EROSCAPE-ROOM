import { CITIES, EXPERIENCES_TEMPLATE, isCityBookable } from '@/lib/constants'
import { getExperienceDetailCopy } from '@/lib/experiences/detail-copy'

export interface CityBookingSummary {
  title: string
  summary: string
}

export interface ExperienceBookingSummary {
  title: string
  summary: string
  detail: string
  intensityLabel: string
  durationMin: number
  priceFrom: number
}

function intensityLabel(missionLevel: 'ALPHA' | 'BETA' | 'OMEGA'): string {
  if (missionLevel === 'ALPHA') return 'Despertar · Suave'
  if (missionLevel === 'BETA') return 'Intenso · Sin frenos'
  return 'Sin límites · Todo permitido'
}

export function getCityBookingSummary(citySlug: string): CityBookingSummary | null {
  const city = CITIES.find((c) => c.slug === citySlug)
  if (!city) return null

  if (!isCityBookable(city)) {
    return {
      title: city.displayName,
      summary: `${city.displayName} llegará pronto. Por ahora puedes reservar en Granada.`,
    }
  }

  return {
    title: city.displayName,
    summary: `Tu noche en ${city.displayName} (${city.barrio}). Espacio privado, acceso discreto y una experiencia diseñada para dos.`,
  }
}

export function getExperienceBookingSummary(slug: string): ExperienceBookingSummary | null {
  const exp = EXPERIENCES_TEMPLATE.find((e) => e.slug === slug)
  if (!exp) return null

  const copy = getExperienceDetailCopy(slug)
  const detail =
    copy.bodyTwoParagraphs[0].length > 220
      ? `${copy.bodyTwoParagraphs[0].slice(0, 217).trim()}…`
      : copy.bodyTwoParagraphs[0]

  return {
    title: exp.title,
    summary: copy.subtitle,
    detail,
    intensityLabel: intensityLabel(exp.missionLevel),
    durationMin: exp.duration,
    priceFrom: exp.basePrice,
  }
}
