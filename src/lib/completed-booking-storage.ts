import type { CompletedBookingSnapshot } from '@/types/completed-booking'

export const COMPLETED_BOOKING_SNAPSHOT_KEY = 'eroscape_completed_booking_snapshot'

export function saveCompletedBookingSnapshot(snapshot: CompletedBookingSnapshot): void {
  if (typeof window === 'undefined') return
  try {
    window.sessionStorage.setItem(COMPLETED_BOOKING_SNAPSHOT_KEY, JSON.stringify(snapshot))
  } catch {
    // ignore quota errors
  }
}

export function loadCompletedBookingSnapshot(bookingId: string): CompletedBookingSnapshot | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.sessionStorage.getItem(COMPLETED_BOOKING_SNAPSHOT_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as CompletedBookingSnapshot
    if (parsed.bookingId !== bookingId) return null
    return parsed
  } catch {
    return null
  }
}
