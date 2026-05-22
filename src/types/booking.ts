export type CompanyType = 'pareja' | 'rollete' | 'plan-golfo' | 'swinger'

export type IntensityLevel = 'bajo' | 'medio' | 'turbio'

export type MissionLevel = 'ALPHA' | 'BETA' | 'OMEGA'

export type ItemRarity = 'comun' | 'descomun' | 'raro' | 'epico'

export type IdentityDocumentType = 'dni' | 'nie' | 'pasaporte'

export type PaymentStatus = 'pending' | 'paid'

export function getTemperatureLabel(rarity: ItemRarity): string {
  switch (rarity) {
    case 'comun':
      return 'TENTADOR'
    case 'descomun':
      return 'ARDIENTE'
    case 'raro':
      return 'IRRESISTIBLE'
    case 'epico':
      return 'PROHIBIDO'
  }
}

export interface BookingStep1 {
  citySlug: string
  experienceSlug: string
  date: string
  timeSlot: string
}

export interface BookingStep2 {
  companyType: CompanyType | null
  intensityLevel: IntensityLevel | null
  names: string[]
  language: 'es' | 'en' | 'fr'
}

export interface UpsellItem {
  id: string
  name: string
  rarity: ItemRarity
  price: number
  description: string
  popular: boolean
  icon: string
}

export interface BookingStep3 {
  selectedUpsells: string[]
}

export interface LegalConsent {
  safeWord: string
  hasReadDocument: boolean
  hasSignedDocument: boolean
  ageConfirmed: boolean
  signedAt: string
  documentHash: string
}

export interface BookingStep4 {
  consent: LegalConsent | null
}

/** Titular del pago y documento (sin datos sensibles de tarjeta completos). */
export interface BookingStep5 {
  cardholderName: string
  email: string
  documentType: IdentityDocumentType | null
  documentNumber: string
  paymentStatus: PaymentStatus
  paidAt: string | null
  confirmationCode: string | null
  cardLast4: string | null
}

export interface BookingState {
  currentStep: 1 | 2 | 3 | 4 | 5
  step1: Partial<BookingStep1>
  step2: Partial<BookingStep2>
  step3: BookingStep3
  step4: BookingStep4
  step5: BookingStep5
  bookingId: string
  totalPrice: number
}
