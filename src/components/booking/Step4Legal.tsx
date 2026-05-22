'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Check, Shield } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import type SignaturePad from 'signature_pad'
import { useRouter } from 'next/navigation'

import { BookingBottomBar } from '@/components/booking/BookingBottomBar'
import { BookingFlowHeader } from '@/components/booking/BookingFlowHeader'
import { BookingLegalAccordion } from '@/components/booking/BookingLegalAccordion'
import { useBookingFlow } from '@/hooks/useBookingFlow'
import { STEP4_LEGAL_COPY } from '@/lib/booking-legal-copy'
import { SAFE_WORD_SUGGESTIONS } from '@/lib/constants'
import { cn } from '@/lib/utils'
import type { LegalConsent } from '@/types/booking'

const SENSUAL_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

const chipContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
} as const

const chipItemVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.22, ease: SENSUAL_EASE } },
} as const

interface PactSignatureBlockProps {
  onSignedChange: (signed: boolean) => void
}

function PactSignatureBlock({ onSignedChange }: PactSignatureBlockProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const padRef = useRef<SignaturePad | null>(null)
  const [placeholderVisible, setPlaceholderVisible] = useState(true)

  const handleClear = useCallback(() => {
    padRef.current?.clear()
    setPlaceholderVisible(true)
    onSignedChange(false)
  }, [onSignedChange])

  useEffect(() => {
    let cancelled = false
    let dispose: (() => void) | undefined

    void import('signature_pad').then(({ default: SignaturePadCtor }) => {
      if (cancelled || !canvasRef.current) return

      const c = canvasRef.current
      const ratio = Math.max(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 1)
      const containerWidth = c.parentElement?.clientWidth ?? 320
      const w = Math.max(260, Math.min(640, containerWidth))
      const h = 120
      c.width = Math.floor(w * ratio)
      c.height = Math.floor(h * ratio)
      c.style.width = `${w}px`
      c.style.height = `${h}px`
      const ctx = c.getContext('2d')
      if (ctx) ctx.scale(ratio, ratio)

      const pad = new SignaturePadCtor(c, {
        penColor: '#ffffff',
        minWidth: 0.8,
        maxWidth: 2.5,
        backgroundColor: 'rgba(0,0,0,0)',
      })
      padRef.current = pad

      const syncSigned = () => {
        onSignedChange(!pad.isEmpty())
      }

      const onBegin = () => {
        setPlaceholderVisible(false)
      }

      const onEnd = () => {
        syncSigned()
      }

      pad.addEventListener('beginStroke', onBegin)
      pad.addEventListener('endStroke', onEnd)

      dispose = () => {
        pad.removeEventListener('beginStroke', onBegin)
        pad.removeEventListener('endStroke', onEnd)
        pad.off()
        padRef.current = null
      }
    })

    return () => {
      cancelled = true
      dispose?.()
    }
  }, [onSignedChange])

  return (
    <div className="rounded-xl border border-white/10 bg-(--color-bg-elevated) p-3 sm:p-4">
      <div className="mb-2 flex items-center justify-between gap-2">
        <p className="font-(--font-jetbrains) text-[10px] uppercase tracking-[0.18em] text-(--color-text-muted)">
          {STEP4_LEGAL_COPY.signatureHeading}
        </p>
        <button
          type="button"
          onClick={handleClear}
          className="font-(--font-jetbrains) text-[10px] uppercase tracking-[0.14em] text-(--color-text-muted) underline-offset-2 hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta)"
        >
          Borrar
        </button>
      </div>
      <div className="relative mx-auto w-full" style={{ height: 120 }}>
        <canvas
          ref={canvasRef}
          className="touch-none h-full w-full rounded-md border border-white/12 bg-(--color-bg-base)"
        />
        <AnimatePresence>
          {placeholderVisible ? (
            <motion.p
              initial={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: SENSUAL_EASE }}
              className="pointer-events-none absolute inset-0 flex items-center justify-center px-4 text-center font-(--font-inter) text-sm text-(--color-text-muted)"
            >
              Firma aquí
            </motion.p>
          ) : null}
        </AnimatePresence>
      </div>
      <p className="mt-2 text-center font-(--font-inter) text-[11px] italic text-(--color-text-muted)">
        Firma digital completa en producción — para la demo, el trazo en pantalla es suficiente.
      </p>
    </div>
  )
}

interface LegalCheckboxProps {
  checked: boolean
  onChange: () => void
  label: string
  className?: string
}

function LegalCheckbox({ checked, onChange, label, className }: LegalCheckboxProps) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={onChange}
      className={cn(
        'flex w-full items-start gap-3 rounded-lg border px-3 py-2.5 text-left transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg-subtle)',
        checked ? 'border-(--color-magenta)/45 bg-(--color-bg-elevated)' : 'border-white/10 bg-(--color-bg-elevated)/80',
        className,
      )}
    >
      <span
        className={cn(
          'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2',
          checked ? 'border-(--color-magenta) bg-(--color-magenta)' : 'border-white/25 bg-transparent',
        )}
        aria-hidden="true"
      >
        {checked ? <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} /> : null}
      </span>
      <span className="font-(--font-inter) text-[13px] leading-relaxed text-(--color-text-secondary) sm:text-sm">
        {label}
      </span>
    </button>
  )
}

export function Step4Legal() {
  const shouldReduceMotion = useReducedMotion()
  const router = useRouter()
  const { state, sealPactAndAdvance } = useBookingFlow()

  const [hasReadLegal, setHasReadLegal] = useState(() => state.step4.consent?.hasReadDocument ?? false)
  const [safeWord, setSafeWord] = useState(() => state.step4.consent?.safeWord ?? '')
  const [ageConfirmed, setAgeConfirmed] = useState(() => state.step4.consent?.ageConfirmed ?? false)
  const [isSigned, setIsSigned] = useState(() => state.step4.consent?.hasSignedDocument ?? false)
  const [chipFlash, setChipFlash] = useState<string | null>(null)

  const canSeal = hasReadLegal && safeWord.trim().length >= 2 && ageConfirmed && isSigned

  const handleChip = (word: string) => {
    setSafeWord(word)
    setChipFlash(word)
    window.setTimeout(() => setChipFlash(null), 320)
  }

  const buildDocumentHash = (word: string): string => {
    const payload = `${word}${Date.now()}`
    try {
      return btoa(payload)
    } catch {
      return btoa(unescape(encodeURIComponent(payload)))
    }
  }

  const handleSealPact = () => {
    if (!canSeal) return

    const consent: LegalConsent = {
      safeWord: safeWord.trim(),
      hasReadDocument: true,
      hasSignedDocument: true,
      ageConfirmed: true,
      signedAt: new Date().toISOString(),
      documentHash: buildDocumentHash(safeWord.trim()),
    }

    sealPactAndAdvance(consent)
    router.push('/reservar?step=5')
  }

  return (
    <div className="mx-auto w-full max-w-[94rem] px-4 pt-1 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-3xl">
        <BookingFlowHeader
          actLabel="IV"
          title={STEP4_LEGAL_COPY.title}
          subtitle={STEP4_LEGAL_COPY.subtitle}
        />

        <div className="mt-4 flex items-center gap-2.5 rounded-xl border border-(--color-gm-terminal)/30 bg-(--color-gm-terminal)/8 px-3 py-2.5 sm:px-4">
          <Shield className="h-4 w-4 shrink-0 text-(--color-gm-terminal)" aria-hidden="true" />
          <p className="font-(--font-inter) text-xs text-(--color-gm-terminal) sm:text-sm">
            {STEP4_LEGAL_COPY.trustBanner}
          </p>
        </div>

        <section
          className="mt-4 rounded-2xl border border-white/12 bg-(--color-bg-subtle) p-3 sm:p-4"
          aria-labelledby="step4-legal-docs-heading"
        >
          <h3
            id="step4-legal-docs-heading"
            className="font-(--font-jetbrains) text-[10px] uppercase tracking-[0.2em] text-(--color-text-secondary)"
          >
            {STEP4_LEGAL_COPY.documentsHeading}
          </h3>
          <p className="mt-1 font-(--font-inter) text-xs text-(--color-text-muted)">{STEP4_LEGAL_COPY.documentsHint}</p>

          <BookingLegalAccordion className="mt-3" />

          <div className="mt-3">
            <LegalCheckbox
              checked={hasReadLegal}
              onChange={() => setHasReadLegal((v) => !v)}
              label={STEP4_LEGAL_COPY.readConfirmLabel}
            />
          </div>
        </section>

        <section
          className="mt-4 rounded-2xl border border-white/12 bg-(--color-bg-subtle) p-3 sm:p-4"
          aria-labelledby="step4-safe-word-heading"
        >
          <h3
            id="step4-safe-word-heading"
            className="font-(--font-playfair) text-base italic text-(--color-gold) sm:text-lg"
          >
            {STEP4_LEGAL_COPY.safeWordHeading}
          </h3>
          <p className="mt-1 font-(--font-inter) text-xs text-(--color-text-muted) sm:text-sm">
            {STEP4_LEGAL_COPY.safeWordHint}
          </p>

          <input
            type="text"
            value={safeWord}
            onChange={(e) => setSafeWord(e.target.value)}
            placeholder={STEP4_LEGAL_COPY.safeWordPlaceholder}
            autoComplete="off"
            className="mt-3 w-full border-b border-white/15 bg-transparent py-2 font-(--font-playfair) text-lg italic text-(--color-text-primary) placeholder:text-(--color-text-muted) focus-visible:border-(--color-magenta) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg-subtle)"
          />

          <motion.div
            className="mt-3 flex flex-wrap gap-2"
            variants={chipContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {SAFE_WORD_SUGGESTIONS.map((w) => (
              <motion.button
                key={w}
                type="button"
                variants={chipItemVariants}
                onClick={() => handleChip(w)}
                className="rounded-full border border-white/12 bg-(--color-bg-elevated) px-3 py-1 font-(--font-inter) text-sm text-(--color-text-secondary) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta)"
                animate={chipFlash === w && !shouldReduceMotion ? { scale: [1, 1.06, 1] } : { scale: 1 }}
                transition={{ duration: 0.28, ease: SENSUAL_EASE }}
              >
                {w}
              </motion.button>
            ))}
          </motion.div>
        </section>

        <div className="mt-4">
          <PactSignatureBlock onSignedChange={setIsSigned} />
        </div>

        <div className="mt-3">
          <LegalCheckbox
            checked={ageConfirmed}
            onChange={() => setAgeConfirmed((v) => !v)}
            label={STEP4_LEGAL_COPY.ageConfirmLabel}
          />
        </div>
      </div>

      <BookingBottomBar
        currentStep={4}
        isValid={canSeal}
        showBack
        maxWidthClass="max-w-[94rem]"
        onBack={() => router.push('/reservar?step=3')}
        onNext={handleSealPact}
      />
    </div>
  )
}
