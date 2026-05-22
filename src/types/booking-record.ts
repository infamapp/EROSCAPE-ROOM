import type { IdentityDocumentType } from '@/types/booking'

export type MissionDashboardStatus = 'confirmed' | 'completed'

export interface BookingRecord {
  bookingId: string
  confirmationCode?: string
  experienceTitle: string
  cityDisplayName: string
  citySlug: string
  dateIso: string
  timeSlot: string
  missionNumber: number
  safeWord: string
  participantNames: string[]
  payerName: string
  payerEmail: string
  documentType: IdentityDocumentType
  documentLabel: string
  documentMasked: string
  cardLast4: string
  totalPaid: number
  paidAt: string
  archetypeId: string
  archetypeName: string
  archetypeIcon: string
  archetypeDescription: string
  archetypeGradient: string
  status: MissionDashboardStatus
  /** Suscripción El Club activa (servidor o mock). */
  isClubMember?: boolean
}

export interface PastBookingRecord {
  bookingId: string
  experienceTitle: string
  dateIso: string
  archetypeName: string
  archetypeIcon: string
  status: 'completed'
}
