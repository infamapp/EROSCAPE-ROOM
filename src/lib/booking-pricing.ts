import { EXPERIENCES_TEMPLATE } from '@/lib/constants'
import type { IntensityLevel } from '@/types/booking'

/** Recargo por intensidad sobre el precio base de la sala (relación de precios). */
export const INTENSITY_PRICE_SURCHARGE: Record<IntensityLevel, number> = {
  bajo: 0,
  medio: 20,
  turbio: 40,
} as const

export function getExperienceBasePrice(experienceSlug: string | undefined): number {
  const exp = EXPERIENCES_TEMPLATE.find((e) => e.slug === experienceSlug)
  return exp?.basePrice ?? 0
}

export function getIntensitySurcharge(level: IntensityLevel | null | undefined): number {
  if (!level) return 0
  return INTENSITY_PRICE_SURCHARGE[level]
}

export function getBookingExperiencePrice(
  experienceSlug: string | undefined,
  intensityLevel: IntensityLevel | null | undefined,
): number {
  return getExperienceBasePrice(experienceSlug) + getIntensitySurcharge(intensityLevel)
}
