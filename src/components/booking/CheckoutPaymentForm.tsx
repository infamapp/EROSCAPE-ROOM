'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { CreditCard, LockKeyhole } from 'lucide-react'
import { useMemo, useState } from 'react'

import { STEP5_CHECKOUT_COPY } from '@/lib/booking-checkout-copy'
import {
  digitsOnly,
  formatCardNumber,
  formatExpiry,
  getCardLast4,
  getDocumentTypeLabel,
  getPaymentFormErrors,
  isPaymentFormValid,
  normalizeDocumentNumber,
  type PaymentFormInput,
} from '@/lib/booking-identity'
import { cn } from '@/lib/utils'
import type { BookingState, IdentityDocumentType } from '@/types/booking'
import type { CompletedBookingSnapshot } from '@/types/completed-booking'

const SENSUAL_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

const DOCUMENT_TYPES: readonly IdentityDocumentType[] = ['dni', 'nie', 'pasaporte']

const SIMULATION_MS = 1400

export interface CheckoutPaymentFormProps {
  bookingState: BookingState
  totalEur: number
  onSuccess: (snapshot: CompletedBookingSnapshot) => void
}

interface ReservasResponse {
  bookingId: string
  confirmationCode: string
  paidAt: string
  status: string
  state: BookingState
}

function fieldClass(hasError: boolean): string {
  return cn(
    'w-full rounded-lg border bg-(--color-bg-elevated) px-3 py-2.5 font-(--font-inter) text-sm text-white placeholder:text-(--color-text-muted)',
    'focus-visible:border-(--color-magenta) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta)',
    hasError ? 'border-red-400/60' : 'border-white/12',
  )
}

export function CheckoutPaymentForm({ bookingState, totalEur, onSuccess }: CheckoutPaymentFormProps) {
  const shouldReduceMotion = useReducedMotion()
  const [form, setForm] = useState<PaymentFormInput>({
    cardholderName: bookingState.step5.cardholderName,
    email: bookingState.step5.email,
    documentType: bookingState.step5.documentType,
    documentNumber: bookingState.step5.documentNumber,
    cardNumber: '',
    expiry: '',
    cvc: '',
  })
  const [phase, setPhase] = useState<'form' | 'processing' | 'success'>('form')
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [confirmationCode, setConfirmationCode] = useState<string | null>(null)

  const errors = useMemo(() => getPaymentFormErrors(form), [form])
  const canSubmit = isPaymentFormValid(form) && phase === 'form'

  const patch = (partial: Partial<PaymentFormInput>) => {
    setForm((prev) => ({ ...prev, ...partial }))
    setSubmitError(null)
  }

  const handleSubmit = async () => {
    if (!canSubmit || !form.documentType) return
    setSubmitError(null)
    setPhase('processing')

    const cardLast4 = getCardLast4(form.cardNumber)
    const payer = {
      cardholderName: form.cardholderName.trim(),
      email: form.email.trim().toLowerCase(),
      documentType: form.documentType,
      documentNumber: normalizeDocumentNumber(form.documentNumber),
      cardLast4,
      totalPaid: totalEur,
    }

    const payload = {
      state: {
        ...bookingState,
        currentStep: 5 as const,
        step5: {
          ...bookingState.step5,
          cardholderName: payer.cardholderName,
          email: payer.email,
          documentType: payer.documentType,
          documentNumber: payer.documentNumber,
        },
      },
      payer,
    }

    try {
      await new Promise((resolve) => window.setTimeout(resolve, SIMULATION_MS))

      const res = await fetch('/api/reservas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = (await res.json()) as ReservasResponse & { error?: string }
      if (!res.ok || !data.confirmationCode) {
        setPhase('form')
        setSubmitError(data.error ?? 'No se pudo confirmar la reserva')
        return
      }

      const snapshot: CompletedBookingSnapshot = {
        bookingId: data.bookingId,
        confirmationCode: data.confirmationCode,
        paidAt: data.paidAt,
        cardLast4,
        cardholderName: payer.cardholderName,
        email: payer.email,
        documentType: payer.documentType,
        documentNumber: payer.documentNumber,
        totalPaid: totalEur,
        state: data.state,
      }

      setConfirmationCode(data.confirmationCode)
      setPhase('success')
      window.setTimeout(() => onSuccess(snapshot), shouldReduceMotion ? 0 : 1800)
    } catch {
      setPhase('form')
      setSubmitError('Error de conexión. Intentad de nuevo.')
    }
  }

  if (phase === 'success' && confirmationCode) {
    return (
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-xl border border-(--color-magenta)/40 bg-(--color-bg-elevated) p-5 text-center"
        style={{ boxShadow: 'var(--glow-magenta)' }}
      >
        <p className="font-(--font-jetbrains) text-[10px] uppercase tracking-[0.2em] text-(--color-magenta-glow)">
          {STEP5_CHECKOUT_COPY.successTitle}
        </p>
        <p className="mt-2 font-(--font-inter) text-sm text-(--color-text-secondary)">
          {STEP5_CHECKOUT_COPY.successSubtitle}
        </p>
        <p className="mt-4 font-(--font-jetbrains) text-[10px] uppercase tracking-[0.16em] text-(--color-text-muted)">
          {STEP5_CHECKOUT_COPY.confirmationCodeLabel}
        </p>
        <p className="mt-1 font-(--font-playfair) text-2xl tracking-[0.2em] text-(--color-gold)">
          {confirmationCode}
        </p>
      </motion.div>
    )
  }

  return (
    <div className="space-y-4">
      <p className="flex items-center gap-2 font-(--font-inter) text-xs text-(--color-text-muted)">
        <LockKeyhole className="h-3.5 w-3.5 shrink-0 text-(--color-gold-light)" aria-hidden="true" />
        {STEP5_CHECKOUT_COPY.simulationNote}
      </p>

      <div className="space-y-3">
        <div>
          <label htmlFor="checkout-holder-name" className="font-(--font-jetbrains) text-[10px] uppercase tracking-[0.14em] text-(--color-text-secondary)">
            {STEP5_CHECKOUT_COPY.holderNameLabel}
          </label>
          <input
            id="checkout-holder-name"
            type="text"
            autoComplete="cc-name"
            value={form.cardholderName}
            onChange={(e) => patch({ cardholderName: e.target.value })}
            placeholder={STEP5_CHECKOUT_COPY.holderNamePlaceholder}
            className={cn(fieldClass(Boolean(errors.cardholderName)), 'mt-1.5')}
          />
          <p className="mt-1 font-(--font-inter) text-xs text-(--color-text-muted)">
            {STEP5_CHECKOUT_COPY.holderNameHint}
          </p>
          {errors.cardholderName ? (
            <p className="mt-1 font-(--font-inter) text-xs text-red-400">{errors.cardholderName}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="checkout-email" className="font-(--font-jetbrains) text-[10px] uppercase tracking-[0.14em] text-(--color-text-secondary)">
            {STEP5_CHECKOUT_COPY.emailLabel}
          </label>
          <input
            id="checkout-email"
            type="email"
            autoComplete="email"
            inputMode="email"
            value={form.email}
            onChange={(e) => patch({ email: e.target.value })}
            placeholder={STEP5_CHECKOUT_COPY.emailPlaceholder}
            className={cn(fieldClass(Boolean(errors.email)), 'mt-1.5')}
          />
          <p className="mt-1 font-(--font-inter) text-xs text-(--color-text-muted)">
            {STEP5_CHECKOUT_COPY.emailHint}
          </p>
          {errors.email ? (
            <p className="mt-1 font-(--font-inter) text-xs text-red-400">{errors.email}</p>
          ) : null}
        </div>

        <div>
          <p className="font-(--font-jetbrains) text-[10px] uppercase tracking-[0.14em] text-(--color-text-secondary)">
            {STEP5_CHECKOUT_COPY.documentTypeLabel}
          </p>
          <div className="mt-1.5 flex flex-wrap gap-2" role="radiogroup" aria-label={STEP5_CHECKOUT_COPY.documentTypeLabel}>
            {DOCUMENT_TYPES.map((type) => {
              const active = form.documentType === type
              return (
                <button
                  key={type}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => patch({ documentType: type })}
                  className={cn(
                    'rounded-full border px-3 py-1.5 font-(--font-jetbrains) text-[10px] uppercase tracking-[0.12em] transition-colors',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta)',
                    active
                      ? 'border-(--color-magenta)/55 bg-(--color-bg-elevated) text-(--color-magenta-glow)'
                      : 'border-white/12 bg-(--color-bg-elevated)/80 text-(--color-text-secondary) hover:border-white/22',
                  )}
                >
                  {getDocumentTypeLabel(type)}
                </button>
              )
            })}
          </div>
          {errors.documentType ? (
            <p className="mt-1 font-(--font-inter) text-xs text-red-400">{errors.documentType}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="checkout-document" className="font-(--font-jetbrains) text-[10px] uppercase tracking-[0.14em] text-(--color-text-secondary)">
            {STEP5_CHECKOUT_COPY.documentNumberLabel}
          </label>
          <input
            id="checkout-document"
            type="text"
            autoComplete="off"
            value={form.documentNumber}
            onChange={(e) => patch({ documentNumber: e.target.value.toUpperCase() })}
            placeholder={STEP5_CHECKOUT_COPY.documentNumberPlaceholder}
            className={cn(fieldClass(Boolean(errors.documentNumber)), 'mt-1.5 uppercase')}
          />
          {errors.documentNumber ? (
            <p className="mt-1 font-(--font-inter) text-xs text-red-400">{errors.documentNumber}</p>
          ) : null}
        </div>
      </div>

      <div className="border-t border-white/10 pt-4">
        <p className="mb-3 flex items-center gap-2 font-(--font-jetbrains) text-[10px] uppercase tracking-[0.14em] text-(--color-text-secondary)">
          <CreditCard className="h-3.5 w-3.5" aria-hidden="true" />
          Tarjeta
        </p>

        <div className="space-y-3">
          <div>
            <label htmlFor="checkout-card" className="font-(--font-jetbrains) text-[10px] uppercase tracking-[0.14em] text-(--color-text-secondary)">
              {STEP5_CHECKOUT_COPY.cardNumberLabel}
            </label>
            <input
              id="checkout-card"
              type="text"
              inputMode="numeric"
              autoComplete="cc-number"
              value={form.cardNumber}
              onChange={(e) => patch({ cardNumber: formatCardNumber(e.target.value) })}
              placeholder="4242 4242 4242 4242"
              className={cn(fieldClass(Boolean(errors.cardNumber)), 'mt-1.5 font-(--font-jetbrains) tracking-widest')}
            />
            {errors.cardNumber ? (
              <p className="mt-1 font-(--font-inter) text-xs text-red-400">{errors.cardNumber}</p>
            ) : null}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="checkout-expiry" className="font-(--font-jetbrains) text-[10px] uppercase tracking-[0.14em] text-(--color-text-secondary)">
                {STEP5_CHECKOUT_COPY.expiryLabel}
              </label>
              <input
                id="checkout-expiry"
                type="text"
                inputMode="numeric"
                autoComplete="cc-exp"
                value={form.expiry}
                onChange={(e) => patch({ expiry: formatExpiry(e.target.value) })}
                placeholder="MM/AA"
                className={cn(fieldClass(Boolean(errors.expiry)), 'mt-1.5 font-(--font-jetbrains)')}
              />
              {errors.expiry ? <p className="mt-1 font-(--font-inter) text-xs text-red-400">{errors.expiry}</p> : null}
            </div>
            <div>
              <label htmlFor="checkout-cvc" className="font-(--font-jetbrains) text-[10px] uppercase tracking-[0.14em] text-(--color-text-secondary)">
                {STEP5_CHECKOUT_COPY.cvcLabel}
              </label>
              <input
                id="checkout-cvc"
                type="password"
                inputMode="numeric"
                autoComplete="cc-csc"
                value={form.cvc}
                onChange={(e) => patch({ cvc: digitsOnly(e.target.value).slice(0, 4) })}
                placeholder="•••"
                className={cn(fieldClass(Boolean(errors.cvc)), 'mt-1.5 font-(--font-jetbrains)')}
              />
              {errors.cvc ? <p className="mt-1 font-(--font-inter) text-xs text-red-400">{errors.cvc}</p> : null}
            </div>
          </div>
        </div>
      </div>

      {submitError ? <p className="font-(--font-inter) text-sm text-red-400">{submitError}</p> : null}

      <motion.button
        type="button"
        disabled={!canSubmit}
        onClick={() => void handleSubmit()}
        className="relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full px-5 py-3.5 font-(--font-jetbrains) text-xs uppercase tracking-[0.14em] text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg-subtle) disabled:cursor-not-allowed disabled:opacity-50"
        style={{ background: 'var(--gradient-cta)' }}
        whileHover={canSubmit && phase === 'form' ? { scale: 1.01 } : undefined}
        whileTap={canSubmit && phase === 'form' ? { scale: 0.98 } : undefined}
      >
        {phase === 'processing' ? (
          <>
            <motion.span
              className="inline-block h-5 w-5 rounded-full border-2 border-white/25"
              style={{ borderTopColor: 'var(--color-magenta)' }}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 0.85, ease: 'linear' }}
              aria-hidden="true"
            />
            {STEP5_CHECKOUT_COPY.processing}
          </>
        ) : (
          STEP5_CHECKOUT_COPY.confirmNight
        )}
      </motion.button>
    </div>
  )
}
