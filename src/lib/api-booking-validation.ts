import type { BookingState, LegalConsent } from '@/types/booking'

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
    bookingId,
    totalPrice,
  }

  return { ok: true, state }
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
