import type { BookingState, IdentityDocumentType } from '@/types/booking'

export interface CompletedBookingSnapshot {
  bookingId: string
  confirmationCode: string
  paidAt: string
  cardLast4: string
  cardholderName: string
  email: string
  documentType: IdentityDocumentType
  documentNumber: string
  totalPaid: number
  state: BookingState
}
