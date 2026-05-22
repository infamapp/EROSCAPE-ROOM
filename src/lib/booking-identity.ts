import type { IdentityDocumentType } from '@/types/booking'

const DNI_LETTERS = 'TRWAGMYFPDXBNJZSQVHLCKE'

export function normalizeDocumentNumber(value: string): string {
  return value.replace(/\s+/g, '').toUpperCase()
}

export function getDocumentTypeLabel(type: IdentityDocumentType): string {
  switch (type) {
    case 'dni':
      return 'DNI'
    case 'nie':
      return 'NIE'
    case 'pasaporte':
      return 'Pasaporte'
  }
}

export function isValidIdentityDocument(type: IdentityDocumentType, raw: string): boolean {
  const value = normalizeDocumentNumber(raw)
  if (value.length === 0) return false

  switch (type) {
    case 'dni': {
      const match = /^(\d{8})([A-Z])$/.exec(value)
      if (!match) return false
      const num = Number.parseInt(match[1]!, 10)
      const expected = DNI_LETTERS[num % 23]
      return match[2] === expected
    }
    case 'nie': {
      const match = /^([XYZ])(\d{7})([A-Z])$/.exec(value)
      if (!match) return false
      const prefix = match[1] === 'X' ? '0' : match[1] === 'Y' ? '1' : '2'
      const num = Number.parseInt(`${prefix}${match[2]}`, 10)
      const expected = DNI_LETTERS[num % 23]
      return match[3] === expected
    }
    case 'pasaporte':
      return /^[A-Z0-9]{5,15}$/.test(value)
  }
}

export function maskDocumentNumber(type: IdentityDocumentType, raw: string): string {
  const value = normalizeDocumentNumber(raw)
  if (value.length < 4) return '••••'
  const label = getDocumentTypeLabel(type)
  return `${label} ••••${value.slice(-4)}`
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function normalizeEmail(value: string): string {
  return value.trim().toLowerCase()
}

export function isValidEmail(value: string): boolean {
  const normalized = normalizeEmail(value)
  return normalized.length >= 5 && normalized.length <= 254 && EMAIL_PATTERN.test(normalized)
}

export interface PaymentFormInput {
  cardholderName: string
  email: string
  documentType: IdentityDocumentType | null
  documentNumber: string
  cardNumber: string
  expiry: string
  cvc: string
}

export function digitsOnly(value: string): string {
  return value.replace(/\D/g, '')
}

export function formatCardNumber(value: string): string {
  const digits = digitsOnly(value).slice(0, 16)
  return digits.replace(/(\d{4})(?=\d)/g, '$1 ').trim()
}

export function formatExpiry(value: string): string {
  const digits = digitsOnly(value).slice(0, 4)
  if (digits.length <= 2) return digits
  return `${digits.slice(0, 2)}/${digits.slice(2)}`
}

export function isExpiryValid(expiry: string): boolean {
  const match = /^(\d{2})\/(\d{2})$/.exec(expiry.trim())
  if (!match) return false
  const month = Number.parseInt(match[1]!, 10)
  const year = 2000 + Number.parseInt(match[2]!, 10)
  if (month < 1 || month > 12) return false
  const now = new Date()
  const expEnd = new Date(year, month, 0, 23, 59, 59)
  return expEnd >= now
}

export function isCardNumberValid(cardNumber: string): boolean {
  const digits = digitsOnly(cardNumber)
  return digits.length === 16
}

export function isCvcValid(cvc: string): boolean {
  const digits = digitsOnly(cvc)
  return digits.length >= 3 && digits.length <= 4
}

export function getCardLast4(cardNumber: string): string {
  return digitsOnly(cardNumber).slice(-4)
}

export function isPaymentFormValid(form: PaymentFormInput): boolean {
  const name = form.cardholderName.trim()
  if (name.length < 3) return false
  if (!isValidEmail(form.email)) return false
  if (!form.documentType) return false
  if (!isValidIdentityDocument(form.documentType, form.documentNumber)) return false
  if (!isCardNumberValid(form.cardNumber)) return false
  if (!isExpiryValid(form.expiry)) return false
  if (!isCvcValid(form.cvc)) return false
  return true
}

export function getPaymentFormErrors(form: PaymentFormInput): Partial<Record<keyof PaymentFormInput, string>> {
  const errors: Partial<Record<keyof PaymentFormInput, string>> = {}
  if (form.cardholderName.trim().length < 3) {
    errors.cardholderName = 'Introduce el nombre del titular'
  }
  if (!isValidEmail(form.email)) {
    errors.email = 'Introduce un correo válido'
  }
  if (!form.documentType) {
    errors.documentType = 'Selecciona el tipo de documento'
  } else if (!isValidIdentityDocument(form.documentType, form.documentNumber)) {
    errors.documentNumber = 'Documento no válido'
  }
  if (!isCardNumberValid(form.cardNumber)) {
    errors.cardNumber = 'La tarjeta debe tener 16 dígitos'
  }
  if (!isExpiryValid(form.expiry)) {
    errors.expiry = 'Caducidad no válida'
  }
  if (!isCvcValid(form.cvc)) {
    errors.cvc = 'CVC no válido'
  }
  return errors
}
