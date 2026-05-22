import {
  isValidEmail,
  isValidIdentityDocument,
  normalizeDocumentNumber,
  normalizeEmail,
} from '@/lib/booking-identity'
import type { BookingState, IdentityDocumentType, LegalConsent } from '@/types/booking'

export interface BookingPayerPayload {
  cardholderName: string
  email: string
  documentType: IdentityDocumentType
  documentNumber: string
  cardLast4: string
  totalPaid: number
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v)
}

function isNonEmptyString(v: unknown): v is string {
  return typeof v === 'string' && v.trim().length > 0
}

function parseConsent(raw: unknown): LegalConsent | null {
  if (!isRecord(raw)) return null
  const safeWord = raw.safeWord
  const hasReadDocument = raw.hasReadDocument === true
  const hasSignedDocument = raw.hasSignedDocument === true
  const ageConfirmed = raw.ageConfirmed === true
  const signedAt = raw.signedAt
  const documentHash = raw.documentHash
  if (!isNonEmptyString(safeWord)) return null
  if (!hasReadDocument || !hasSignedDocument || !ageConfirmed) return null
  if (!isNonEmptyString(signedAt) || !isNonEmptyString(documentHash)) return null
  return {
    safeWord,
    hasReadDocument,
    hasSignedDocument,
    ageConfirmed,
    signedAt,
    documentHash,
  }
}

export function parseBookingStateJson(raw: unknown): { ok: true; state: BookingState } | { ok: false; error: string } {
  if (!isRecord(raw)) {
    return { ok: false, error: 'Cuerpo JSON inválido' }
  }

  const step1 = raw.step1
  if (!isRecord(step1)) {
    return { ok: false, error: 'step1 requerido' }
  }
  if (!isNonEmptyString(step1.citySlug)) return { ok: false, error: 'step1.citySlug requerido' }
  if (!isNonEmptyString(step1.experienceSlug)) return { ok: false, error: 'step1.experienceSlug requerido' }
  if (!isNonEmptyString(step1.date)) return { ok: false, error: 'step1.date requerido' }
  if (!isNonEmptyString(step1.timeSlot)) return { ok: false, error: 'step1.timeSlot requerido' }

  const step4 = raw.step4
  if (!isRecord(step4)) {
    return { ok: false, error: 'step4 requerido' }
  }
  const consent = parseConsent(step4.consent)
  if (!consent) {
    return { ok: false, error: 'step4.consent incompleto o inválido' }
  }

  const step2 = isRecord(raw.step2) ? raw.step2 : {}
  const step3Raw = raw.step3
  const step3: BookingState['step3'] =
    isRecord(step3Raw) && Array.isArray(step3Raw.selectedUpsells)
      ? { selectedUpsells: step3Raw.selectedUpsells.filter((x): x is string => typeof x === 'string') }
      : { selectedUpsells: [] }

  const step5Raw = isRecord(raw.step5) ? raw.step5 : {}
  const step5: BookingState['step5'] = {
    cardholderName: typeof step5Raw.cardholderName === 'string' ? step5Raw.cardholderName : '',
    email: typeof step5Raw.email === 'string' ? step5Raw.email : '',
    documentType:
      step5Raw.documentType === 'dni' || step5Raw.documentType === 'nie' || step5Raw.documentType === 'pasaporte'
        ? step5Raw.documentType
        : null,
    documentNumber: typeof step5Raw.documentNumber === 'string' ? step5Raw.documentNumber : '',
    paymentStatus: step5Raw.paymentStatus === 'paid' ? 'paid' : 'pending',
    paidAt: typeof step5Raw.paidAt === 'string' ? step5Raw.paidAt : null,
    confirmationCode: typeof step5Raw.confirmationCode === 'string' ? step5Raw.confirmationCode : null,
    cardLast4: typeof step5Raw.cardLast4 === 'string' ? step5Raw.cardLast4 : null,
  }

  const bookingId = isNonEmptyString(raw.bookingId) ? raw.bookingId.trim() : crypto.randomUUID()
  const totalPrice = typeof raw.totalPrice === 'number' && Number.isFinite(raw.totalPrice) ? raw.totalPrice : 0
  const currentStep = raw.currentStep === 5 || raw.currentStep === 4 ? raw.currentStep : 5

  const state: BookingState = {
    currentStep,
    step1: {
      citySlug: step1.citySlug,
      experienceSlug: step1.experienceSlug,
      date: step1.date,
      timeSlot: step1.timeSlot,
    },
    step2: {
      companyType: typeof step2.companyType === 'string' ? (step2.companyType as BookingState['step2']['companyType']) : null,
      intensityLevel: typeof step2.intensityLevel === 'string' ? (step2.intensityLevel as BookingState['step2']['intensityLevel']) : null,
      names: Array.isArray(step2.names) ? step2.names.filter((n): n is string => typeof n === 'string') : [],
      language: step2.language === 'en' || step2.language === 'fr' ? step2.language : 'es',
    },
    step3: step3,
    step4: { consent },
    step5,
    bookingId,
    totalPrice,
  }

  return { ok: true, state }
}

function isDocumentType(v: unknown): v is IdentityDocumentType {
  return v === 'dni' || v === 'nie' || v === 'pasaporte'
}

export function parseBookingPayerJson(
  raw: unknown,
): { ok: true; payer: BookingPayerPayload } | { ok: false; error: string } {
  if (!isRecord(raw)) {
    return { ok: false, error: 'payer requerido' }
  }

  const cardholderName = raw.cardholderName
  const email = raw.email
  const documentType = raw.documentType
  const documentNumber = raw.documentNumber
  const cardLast4 = raw.cardLast4
  const totalPaid = raw.totalPaid

  if (!isNonEmptyString(cardholderName) || cardholderName.trim().length < 3) {
    return { ok: false, error: 'payer.cardholderName inválido' }
  }
  if (!isNonEmptyString(email) || !isValidEmail(email)) {
    return { ok: false, error: 'payer.email inválido' }
  }
  if (!isDocumentType(documentType)) {
    return { ok: false, error: 'payer.documentType inválido' }
  }
  if (!isNonEmptyString(documentNumber)) {
    return { ok: false, error: 'payer.documentNumber requerido' }
  }
  const normalized = normalizeDocumentNumber(documentNumber)
  if (!isValidIdentityDocument(documentType, normalized)) {
    return { ok: false, error: 'payer.documentNumber no válido' }
  }
  if (!isNonEmptyString(cardLast4) || cardLast4.length !== 4) {
    return { ok: false, error: 'payer.cardLast4 inválido' }
  }
  if (typeof totalPaid !== 'number' || !Number.isFinite(totalPaid) || totalPaid < 0) {
    return { ok: false, error: 'payer.totalPaid inválido' }
  }

  return {
    ok: true,
    payer: {
      cardholderName: cardholderName.trim(),
      email: normalizeEmail(email),
      documentType,
      documentNumber: normalized,
      cardLast4,
      totalPaid,
    },
  }
}

export function makeConfirmationCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  const bytes = new Uint8Array(8)
  crypto.getRandomValues(bytes)
  let out = ''
  for (let i = 0; i < bytes.length; i++) {
    out += chars[bytes[i]! % chars.length] ?? 'X'
  }
  return out
}
