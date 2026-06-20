import { EXPERIENCES_TEMPLATE } from '@/lib/constants'
import { getBoutiquePackById, getBoutiquePackPriceEuros } from '@/lib/boutique-packs'
import type { BookingState, IntensityLevel } from '@/types/booking'

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

export function getBookingUpsellsTotal(selectedUpsells: readonly string[]): number {
  return selectedUpsells.reduce((sum, id) => {
    const pack = getBoutiquePackById(id)
    return sum + (pack ? getBoutiquePackPriceEuros(pack.price) : 0)
  }, 0)
}

/** Recalcula el total de la reserva en servidor: nunca confiar en un monto enviado por el cliente. */
export function getBookingTotalPrice(state: Pick<BookingState, 'step1' | 'step2' | 'step3'>): number {
  const experiencePrice = getBookingExperiencePrice(state.step1.experienceSlug, state.step2.intensityLevel)
  return experiencePrice + getBookingUpsellsTotal(state.step3.selectedUpsells)
}
