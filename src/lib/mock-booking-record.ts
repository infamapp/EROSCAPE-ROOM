import { ARCHETYPES, EXPERIENCES_TEMPLATE } from '@/lib/constants'
import type { BookingRecord, PastBookingRecord } from '@/types/booking-record'

function pickArchetype(seed: string) {
  const idx = Math.abs(seed.split('').reduce((a, c) => a + c.charCodeAt(0), 0)) % ARCHETYPES.length
  return ARCHETYPES[idx] ?? ARCHETYPES[0]
}

export function getMockBookingRecord(bookingId: string): BookingRecord {
  const exp = EXPERIENCES_TEMPLATE[bookingId.length % EXPERIENCES_TEMPLATE.length] ?? EXPERIENCES_TEMPLATE[0]
  const arch = pickArchetype(bookingId)

  return {
    bookingId,
    experienceTitle: exp.title,
    cityDisplayName: 'Madrid',
    citySlug: 'madrid',
    dateIso: '2026-06-15',
    timeSlot: '21:00',
    missionNumber: exp.n,
    safeWord: 'Aurora',
    archetypeId: arch.id,
    archetypeName: arch.name,
    archetypeIcon: arch.icon,
    archetypeDescription: arch.description,
    archetypeGradient: arch.gradient,
    status: 'confirmed',
    isClubMember: bookingId.toLowerCase().includes('club-member'),
  }
}

export function getMockArchiveRecords(bookingId: string): PastBookingRecord[] {
  if (bookingId.toLowerCase().includes('demo-archive')) {
    const arch = ARCHETYPES[0]
    return [
      {
        bookingId: `${bookingId}-past-1`,
        experienceTitle: 'El Ritual de Medianoche',
        dateIso: '2025-11-02',
        archetypeName: arch.name,
        archetypeIcon: arch.icon,
        status: 'completed',
      },
    ]
  }
  return []
}
