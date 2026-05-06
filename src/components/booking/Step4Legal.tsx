'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Check, CheckCircle, ChevronDown, PenLine, Shield } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import type SignaturePad from 'signature_pad'
import { useRouter } from 'next/navigation'

import { StepHeader } from '@/components/booking/StepHeader'
import { useBookingFlow } from '@/hooks/useBookingFlow'
import { SAFE_WORD_SUGGESTIONS } from '@/lib/constants'
import type { LegalConsent } from '@/types/booking'
import { BookingBottomBar } from '@/components/booking/BookingBottomBar'

const SENSUAL_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

const chipContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
} as const

const chipItemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: SENSUAL_EASE } },
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
      const h = 140
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
    <div
      className="relative rounded-2xl border p-4"
      style={{
        borderColor: 'rgba(185,48,158,0.2)',
        background: 'var(--color-bg-subtle)',
        boxShadow: 'inset 0 2px 12px rgba(0,0,0,0.45)',
      }}
    >
      <div className="mb-2 flex items-start justify-between gap-2">
        <p className="font-(--font-jetbrains) text-[10px] tracking-[0.18em]" style={{ color: 'var(--color-text-muted)' }}>
          FIRMA AQUÍ
        </p>
        <button
          type="button"
          onClick={handleClear}
          className="font-(--font-jetbrains) text-[10px] tracking-[0.18em] underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg-subtle)"
          style={{ color: 'var(--color-text-muted)' }}
        >
          BORRAR
        </button>
      </div>
      <div className="relative mx-auto w-full" style={{ height: 140 }}>
        <canvas ref={canvasRef} className="touch-none h-full w-full rounded-md border border-[rgba(185,48,158,0.15)] bg-(--color-bg-base)" />
        <AnimatePresence>
          {placeholderVisible ? (
            <motion.p
              initial={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: SENSUAL_EASE }}
              className="pointer-events-none absolute inset-0 flex items-center justify-center px-4 text-center font-(--font-inter) text-sm"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Firma aquí
            </motion.p>
          ) : null}
        </AnimatePresence>
      </div>
      <p className="mt-3 text-center font-(--font-inter) text-xs italic" style={{ color: 'var(--color-text-muted)' }}>
        Firma digital completa en producción — para la demo, el checkbox es suficiente.
      </p>
    </div>
  )
}

function WaxSealMark() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      className="mx-auto mt-8 flex justify-center pb-2"
      initial={shouldReduceMotion ? false : { opacity: 0, scale: 0, rotate: -15 }}
      animate={
        shouldReduceMotion
          ? { opacity: 1, scale: 1, rotate: 0 }
          : {
            scale: 1,
            transition: {
              opacity: { duration: 0.2, ease: SENSUAL_EASE },
              scale: { type: 'spring', stiffness: 200, damping: 10 },
              rotate: { type: 'spring', stiffness: 200, damping: 10 },
            },
            }
      }
      style={{ filter: 'drop-shadow(var(--shadow-wax-seal))' }}
    >
      <svg width="80" height="80" viewBox="0 0 80 80" aria-hidden="true">
        <circle cx="40" cy="40" r="36" fill="var(--color-wax-seal)" stroke="var(--color-gold)" strokeWidth="3" />
        <text
          x="40"
          y="46"
          textAnchor="middle"
          className="font-(--font-playfair)"
          fill="var(--color-gold-light)"
          style={{ fontSize: '22px', fontWeight: 600 }}
        >
          ER
        </text>
      </svg>
    </motion.div>
  )
}

export function Step4Legal() {
  const shouldReduceMotion = useReducedMotion()
  const router = useRouter()
  const { state, sealPactAndAdvance } = useBookingFlow()

  const scrollRef = useRef<HTMLDivElement | null>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [hasReadDocument, setHasReadDocument] = useState(() => state.step4.consent?.hasReadDocument ?? false)
  const [safeWord, setSafeWord] = useState(() => state.step4.consent?.safeWord ?? '')
  const [ageConfirmed, setAgeConfirmed] = useState(() => state.step4.consent?.ageConfirmed ?? false)
  const [isSigned, setIsSigned] = useState(() => state.step4.consent?.hasSignedDocument ?? false)
  const [privacyOpen, setPrivacyOpen] = useState(false)
  const [chipFlash, setChipFlash] = useState<string | null>(null)
  const [buttonPhase, setButtonPhase] = useState<'idle' | 'pressed' | 'seal' | 'done'>('idle')

  const handleScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const max = el.scrollHeight - el.clientHeight
    const p = max <= 0 ? 1 : el.scrollTop / max
    setScrollProgress(p)
    if (p >= 0.95) setHasReadDocument(true)
  }, [])

  const canSeal = hasReadDocument && safeWord.trim().length >= 2 && ageConfirmed && isSigned

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
    if (!canSeal || buttonPhase !== 'idle') return
    setButtonPhase('seal')

    const consent: LegalConsent = {
      safeWord: safeWord.trim(),
      hasReadDocument: true,
      hasSignedDocument: true,
      ageConfirmed: true,
      signedAt: new Date().toISOString(),
      documentHash: buildDocumentHash(safeWord.trim()),
    }

    // Advance immediately to avoid state/URL desync.
    sealPactAndAdvance(consent)
    router.push('/reservar?step=5')
  }

  return (
    <div className="relative mx-auto max-w-3xl px-4 pb-24 pt-8 sm:px-6 sm:pb-28 sm:pt-10">
      <StepHeader actLabel="IV" title="EL JURAMENTO" />
      <p className="-mt-4 mb-5 font-(--font-inter) text-[13px] sm:mb-6 sm:text-sm" style={{ color: 'var(--color-text-secondary)' }}>
        Lo que sigue tiene reglas. Tuyas. Nuestras. De nadie más.
      </p>

      <div
        className="mb-6 flex items-center gap-2 rounded-xl border px-4 py-2.5 sm:mb-8 sm:py-3"
        style={{ borderColor: 'rgba(22,163,74,0.35)', background: 'rgba(22,163,74,0.08)' }}
      >
        <Shield className="h-5 w-5 shrink-0" style={{ color: 'var(--color-gm-terminal)' }} aria-hidden="true" />
        <p className="font-(--font-inter) text-[13px] sm:text-sm" style={{ color: 'var(--color-gm-terminal)' }}>
          Tu privacidad es sagrada aquí
        </p>
      </div>

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="relative max-h-[42vh] overflow-y-auto rounded-2xl border font-(--font-playfair) text-[15px] leading-7 sm:max-h-[45vh] sm:text-base sm:leading-relaxed"
        style={{
          borderColor: 'var(--color-magenta-dim)',
          backgroundColor: 'var(--color-bg-elevated)',
          backgroundImage: 'var(--texture-parchment-noise)',
          color: 'var(--color-text-secondary)',
        }}
      >
        <div className="sticky top-0 z-10 h-[3px] w-full overflow-hidden bg-black/40">
          <div
            className="h-full transition-[width] duration-100 ease-out"
            style={{ width: `${Math.min(100, Math.max(0, scrollProgress)) * 100}%`, background: 'var(--color-magenta)' }}
          />
        </div>

        <div className="space-y-5 px-4 py-5 sm:space-y-6 sm:px-8 sm:py-6">
          <section>
            <h3 className="mb-2 font-(--font-jetbrains) text-[10px] tracking-[0.2em]" style={{ color: 'var(--color-text-muted)' }}>
              ALCANCE DE LA EXPERIENCIA
            </h3>
            <p>
              El servicio consiste en una experiencia de escape room para adultos con temática sensual y narrativa inmersiva. Todo ocurre en un espacio controlado, con personal
              profesional y protocolos de seguridad. No constituye asesoramiento médico, psicológico ni terapéutico.
            </p>
          </section>

          <section>
            <h3 className="mb-2 font-(--font-jetbrains) text-[10px] tracking-[0.2em]" style={{ color: 'var(--color-text-muted)' }}>
              LÍMITES Y CONSENTIMIENTO
            </h3>
            <p>
              Participas de forma libre, voluntaria y revocable en cualquier momento mediante la palabra de seguridad acordada. Se respetan límites explícitos y se prioriza el
              bienestar de todas las personas presentes. Cualquier indicación de malestar detiene la experiencia.
            </p>
          </section>

          <section>
            <h3 className="mb-2 font-(--font-jetbrains) text-[10px] tracking-[0.2em]" style={{ color: 'var(--color-text-muted)' }}>
              CONFIDENCIALIDAD
            </h3>
            <p>
              Los datos personales y preferencias declaradas se tratan con estricta confidencialidad, conforme a la normativa aplicable en materia de protección de datos. No se
              comparten con terceros salvo obligación legal o tu consentimiento expreso.
            </p>
          </section>

          <section>
            <h3 className="mb-2 font-(--font-jetbrains) text-[10px] tracking-[0.2em]" style={{ color: 'var(--color-text-muted)' }}>
              VIGENCIA DEL CONSENTIMIENTO
            </h3>
            <p>
              Al firmar digitalmente este pacto confirmas que has leído y comprendido el documento, que la información facilitada es veraz y que aceptas las condiciones aplicables
              a tu reserva concreta.
            </p>
          </section>

          <section>
            <h3 className="mb-2 font-(--font-jetbrains) text-[10px] tracking-[0.2em]" style={{ color: 'var(--color-text-muted)' }}>
              USO DE LA PALABRA DE SEGURIDAD
            </h3>
            <p>
              La palabra de seguridad que elijas tiene efecto inmediato: interrumpe cualquier acción en curso sin juicio ni represalias. El equipo está entrenado para responder de
              forma neutral y discreta.
            </p>
          </section>

          <section>
            <h3 className="mb-2 font-(--font-jetbrains) text-[10px] tracking-[0.2em]" style={{ color: 'var(--color-text-muted)' }}>
              CANCELACIÓN Y MODIFICACIONES
            </h3>
            <p>
              Las políticas de cancelación, reprogramación y reembolso se aplican según las condiciones publicadas en el momento de la contratación. Las modificaciones sustanciales
              de este documento serán comunicadas con antelación razonable.
            </p>
          </section>
        </div>

        <AnimatePresence>{hasReadDocument ? <WaxSealMark key="wax" /> : null}</AnimatePresence>
      </div>

      <div className="mt-8 border-t pt-6 sm:mt-10 sm:pt-8" style={{ borderColor: 'var(--color-gold)' }}>
        <h3 className="font-(--font-playfair) text-lg italic sm:text-xl" style={{ color: 'var(--color-gold)' }}>
          La Palabra que Para el Tiempo
        </h3>
        <p className="mt-2.5 font-(--font-inter) text-[13px] sm:mt-3 sm:text-sm" style={{ color: 'var(--color-text-muted)' }}>
          Esta palabra detiene todo. Inmediatamente. Sin preguntas.
        </p>

        <input
          type="text"
          value={safeWord}
          onChange={(e) => setSafeWord(e.target.value)}
          placeholder="Elige tu palabra..."
          autoComplete="off"
          className="mt-4 w-full border-b border-(--border-subtle) bg-transparent px-0 py-2.5 text-lg italic text-(--color-text-primary) placeholder:text-(--color-text-muted) focus-visible:border-(--color-magenta) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg-base) [font-family:var(--font-playfair)]"
        />

        <motion.div
          className="mt-4 flex flex-wrap gap-2"
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
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg-base)"
              style={{
                color: 'var(--color-text-secondary)',
              }}
              animate={chipFlash === w && !shouldReduceMotion ? { scale: [1, 1.1, 1] } : { scale: 1 }}
              transition={{ duration: 0.28, ease: SENSUAL_EASE }}
            >
              {w}
            </motion.button>
          ))}
        </motion.div>
      </div>

      <div className="mt-8 sm:mt-10">
        <PactSignatureBlock onSignedChange={setIsSigned} />
      </div>

      <div className="mt-6 sm:mt-8">
        <button
          type="button"
          role="checkbox"
          aria-checked={ageConfirmed}
          onClick={() => setAgeConfirmed((v) => !v)}
          className="flex w-full items-start gap-3 rounded-xl border border-[rgba(185,48,158,0.15)] p-3.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg-base) sm:p-4"
          style={{ background: 'var(--color-bg-elevated)' }}
        >
          <span
            className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2"
            style={{
              borderColor: ageConfirmed ? 'var(--color-magenta)' : 'rgba(185,48,158,0.35)',
              background: ageConfirmed ? 'var(--color-magenta)' : 'transparent',
            }}
            aria-hidden="true"
          >
            {ageConfirmed ? <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} /> : null}
          </span>
          <span className="font-(--font-inter) text-[13px] sm:text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            Confirmo que soy mayor de edad (+18) y acepto las condiciones de este espacio.
          </span>
        </button>
      </div>

      <div className="mt-6 border-t border-[rgba(185,48,158,0.15)] pt-4 sm:mt-8">
        <button
          type="button"
          onClick={() => setPrivacyOpen((o) => !o)}
          className="flex w-full items-center justify-between gap-2 py-2 font-(--font-inter) text-[13px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg-base) sm:text-sm"
          style={{ color: 'var(--color-text-secondary)' }}
          aria-expanded={privacyOpen}
        >
          <span>¿Qué hacemos con tu información?</span>
          <motion.span animate={{ rotate: privacyOpen ? 180 : 0 }} transition={{ duration: 0.25, ease: SENSUAL_EASE }}>
            <ChevronDown className="h-5 w-5" aria-hidden="true" />
          </motion.span>
        </button>
        <AnimatePresence initial={false}>
          {privacyOpen ? (
            <motion.div
              key="privacy"
              initial={shouldReduceMotion ? false : { height: 0, opacity: 0 }}
              animate={shouldReduceMotion ? undefined : { height: 'auto', opacity: 1 }}
              exit={shouldReduceMotion ? undefined : { height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: SENSUAL_EASE }}
              className="overflow-hidden"
            >
              <div className="pb-4 pt-2 font-(--font-inter) text-xs leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                Tratamos tus datos conforme al RGPD: base legitimadora del contrato, conservación limitada al tiempo necesario, derechos de acceso, rectificación, supresión,
                limitación, portabilidad y oposición. Puedes ejercerlos contactando con el responsable del tratamiento indicado en la web.
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <div className="relative mt-9 sm:mt-12">
        <AnimatePresence>
          {buttonPhase === 'seal' ? (
            <motion.div
              key="btn-seal"
              className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.35, ease: SENSUAL_EASE }}
            >
              <svg width="56" height="56" viewBox="0 0 80 80" aria-hidden="true">
                <circle cx="40" cy="40" r="34" fill="var(--color-wax-seal)" stroke="var(--color-gold)" strokeWidth="2" />
                <text x="40" y="46" textAnchor="middle" fill="var(--color-gold-light)" className="font-(--font-playfair)" style={{ fontSize: '16px', fontWeight: 600 }}>
                  ER
                </text>
              </svg>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <motion.button
          type="button"
          disabled={!canSeal || buttonPhase !== 'idle'}
          onClick={handleSealPact}
          className="relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full px-5 py-3.5 font-(--font-jetbrains) text-[13px] tracking-wide text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg-base) disabled:cursor-not-allowed sm:px-6 sm:py-4 sm:text-sm"
          style={{
            background: canSeal ? 'var(--gradient-cta)' : 'var(--color-cta-disabled)',
            boxShadow: shouldReduceMotion && canSeal ? 'var(--glow-magenta)' : undefined,
          }}
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  scale: buttonPhase === 'pressed' ? 0.95 : 1,
                  boxShadow: canSeal ? 'var(--glow-magenta)' : 'none',
                }
          }
          transition={{
            duration: buttonPhase === 'pressed' ? 0.12 : 0.6,
            ease: SENSUAL_EASE,
            boxShadow: { duration: 0.6, ease: SENSUAL_EASE },
          }}
        >
          {buttonPhase === 'seal' || buttonPhase === 'done' ? (
            <CheckCircle className="h-5 w-5" aria-hidden="true" />
          ) : (
            <PenLine className="h-5 w-5" aria-hidden="true" />
          )}
          FIRMAR EL JURAMENTO
        </motion.button>
      </div>

      <div className="h-28" aria-hidden="true" />

      <BookingBottomBar
        currentStep={4}
        isValid={canSeal && buttonPhase === 'idle'}
        onBack={() => router.push('/reservar?step=3')}
        onNext={handleSealPact}
      />
    </div>
  )
}
