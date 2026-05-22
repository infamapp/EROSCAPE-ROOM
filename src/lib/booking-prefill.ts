import { CITIES, DEFAULT_CITY_SLUG, EXPERIENCES_TEMPLATE, isCityBookable } from '@/lib/constants'
import type { BookingStep1 } from '@/types/booking'

export interface BookingPrefillPayload {
  citySlug?: string
  experienceSlug?: string
  date?: string
  timeSlot?: string
}

function isExperienceSlug(value: string): boolean {
  return EXPERIENCES_TEMPLATE.some((e) => e.slug === value)
}

function isCitySlug(value: string): boolean {
  return CITIES.some((c) => c.slug === value)
}

export function readBookingPrefillFromSession(): BookingPrefillPayload | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.sessionStorage.getItem('eroscape_booking_prefill')
    if (!raw) return null
    const parsed: unknown = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') return null
    return parsed as BookingPrefillPayload
  } catch {
    return null
  }
}

export function clearBookingPrefillSession(): void {
  if (typeof window === 'undefined') return
  try {
    window.sessionStorage.removeItem('eroscape_booking_prefill')
  } catch {
    // ignore
  }
}

export function parseBookingPrefillFromSearchParams(
  params: Pick<URLSearchParams, 'get'>,
): BookingPrefillPayload | null {
  const ciudad = params.get('ciudad')
  const sala = params.get('sala')
  if (!ciudad && !sala) return null

  const payload: BookingPrefillPayload = {}
  if (ciudad && isCitySlug(ciudad)) payload.citySlug = ciudad
  if (sala && isExperienceSlug(sala)) payload.experienceSlug = sala
  return Object.keys(payload).length > 0 ? payload : null
}

export function mergeBookingPrefillIntoStep1(
  current: Partial<BookingStep1>,
  prefill: BookingPrefillPayload,
): Partial<BookingStep1> {
  const next: Partial<BookingStep1> = {}

  if (prefill.citySlug && isCitySlug(prefill.citySlug)) {
    const city = CITIES.find((c) => c.slug === prefill.citySlug)
    if (city && isCityBookable(city)) next.citySlug = prefill.citySlug
  }

  if (prefill.experienceSlug && isExperienceSlug(prefill.experienceSlug)) {
    next.experienceSlug = prefill.experienceSlug
  }

  if (typeof prefill.date === 'string' && prefill.date.length > 0) {
    next.date = prefill.date
  }

  if (typeof prefill.timeSlot === 'string' && prefill.timeSlot.length > 0) {
    next.timeSlot = prefill.timeSlot
  }

  if (!next.citySlug && !current.citySlug) {
    next.citySlug = DEFAULT_CITY_SLUG
  }

  return next
}
