import { getPlayerArchetype } from '@/lib/archetype'
import { CITIES, EXPERIENCES_TEMPLATE } from '@/lib/constants'
import { getDocumentTypeLabel, maskDocumentNumber } from '@/lib/booking-identity'
import type { CompletedBookingSnapshot } from '@/types/completed-booking'
import type { BookingRecord } from '@/types/booking-record'

export function buildBookingRecordFromSnapshot(snapshot: CompletedBookingSnapshot): BookingRecord {
  const { state } = snapshot
  const citySlug = state.step1.citySlug ?? 'granada'
  const city = CITIES.find((c) => c.slug === citySlug) ?? CITIES[0]
  const expSlug = state.step1.experienceSlug
  const experience = EXPERIENCES_TEMPLATE.find((e) => e.slug === expSlug) ?? EXPERIENCES_TEMPLATE[0]
  const archetype = getPlayerArchetype(state)

  return {
    bookingId: snapshot.bookingId,
    confirmationCode: snapshot.confirmationCode,
    experienceTitle: experience.title,
    cityDisplayName: city.displayName,
    citySlug: city.slug,
    dateIso: state.step1.date ?? '',
    timeSlot: state.step1.timeSlot ?? '',
    missionNumber: experience.n,
    safeWord: state.step4.consent?.safeWord ?? '',
    participantNames: state.step2.names ?? [],
    payerName: snapshot.cardholderName,
    payerEmail: snapshot.email,
    documentType: snapshot.documentType,
    documentLabel: getDocumentTypeLabel(snapshot.documentType),
    documentMasked: maskDocumentNumber(snapshot.documentType, snapshot.documentNumber),
    cardLast4: snapshot.cardLast4,
    totalPaid: snapshot.totalPaid,
    paidAt: snapshot.paidAt,
    archetypeId: archetype.id,
    archetypeName: archetype.name,
    archetypeIcon: archetype.icon,
    archetypeDescription: archetype.description,
    archetypeGradient: archetype.gradient,
    status: 'confirmed',
    isClubMember: snapshot.bookingId.toLowerCase().includes('club-member'),
  }
}
