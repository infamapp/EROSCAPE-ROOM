'use client'

import { CardElement, Elements, PaymentRequestButtonElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import type { PaymentRequest, PaymentRequestPaymentMethodEvent, StripeCardElementChangeEvent } from '@stripe/stripe-js'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { CalendarDays, ChevronDown, Clock, Clock3, Cpu, Gift, Headphones, Lock, Package, PenLine, Shield } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { StepHeader } from '@/components/booking/StepHeader'
import { ArchetypeCard } from '@/components/ui/ArchetypeCard'
import { useBookingFlow } from '@/hooks/useBookingFlow'
import { getPlayerArchetype } from '@/lib/archetype'
import { CITIES, EXPERIENCES_TEMPLATE, UPSELL_ITEMS } from '@/lib/constants'
import { formatCurrency } from '@/lib/utils'
import type { BookingState } from '@/types/booking'

const SENSUAL_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

const stripePk = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ''
const stripePromise = stripePk.startsWith('pk_') ? loadStripe(stripePk) : null

const cardAppearance = {
  theme: 'night' as const,
  variables: {
    colorBackground: '#110011',
    colorText: '#FFFFFF',
    colorPrimary: '#B9309E',
    colorDanger: '#EF4444',
    fontFamily: 'Inter, system-ui, sans-serif',
    borderRadius: '10px',
  },
  rules: {
    '.Input': {
      backgroundColor: '#110011',
      color: '#FFFFFF',
      border: '1px solid rgba(185,48,158,0.25)',
    },
    '.Input--focus': {
      border: '1px solid #B9309E',
      boxShadow: '0 0 0 1px #B9309E',
    },
    '.Label': { color: '#C8B8D0' },
    '::placeholder': { color: '#7A6A82' },
    '.Icon': { color: '#B9309E' },
  },
}

const CONFETTI_COLORS = ['#B9309E', '#9F349B', '#CB7B1B']

const UPS_ICON: Record<string, typeof Package> = {
  Package,
  Clock,
  Clock3,
  Cpu,
  Gift,
}

function fireConfettiBurst(originY = 0.42) {
  void import('canvas-confetti').then(({ default: confetti }) => {
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { x: 0.5, y: originY },
      colors: CONFETTI_COLORS,
      ticks: 200,
      gravity: 1.05,
    })
  })
}

interface AccessGrantedOverlayProps {
  onComplete: () => void
}

function AccessGrantedOverlay({ onComplete }: AccessGrantedOverlayProps) {
  const shouldReduceMotion = useReducedMotion()
  const [visibleLines, setVisibleLines] = useState(0)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    if (shouldReduceMotion) return undefined
    const a = window.setTimeout(() => setVisibleLines(1), 200)
    const b = window.setTimeout(() => setVisibleLines(2), 800)
    const c = window.setTimeout(() => setVisibleLines(3), 1400)
    const d = window.setTimeout(() => setFadeOut(true), 2000)
    return () => {
      window.clearTimeout(a)
      window.clearTimeout(b)
      window.clearTimeout(c)
      window.clearTimeout(d)
    }
  }, [shouldReduceMotion])

  useEffect(() => {
    if (!fadeOut) return undefined
    const t = window.setTimeout(() => onComplete(), 420)
    return () => window.clearTimeout(t)
  }, [fadeOut, onComplete])

  if (shouldReduceMotion) return null

  return (
    <motion.div
      className="fixed inset-0 z-200 flex flex-col items-center justify-center px-6"
      style={{ background: 'var(--color-bg-base)' }}
      initial={{ opacity: 1 }}
      animate={{ opacity: fadeOut ? 0 : 1 }}
      transition={{ duration: 0.4, ease: SENSUAL_EASE }}
    >
      <div
        className="w-full max-w-md space-y-3 font-(--font-jetbrains) text-sm"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        {visibleLines >= 1 ? <p>&gt; Preparando tu noche...</p> : null}
        {visibleLines >= 2 ? <p>&gt; Confirmando tus deseos...</p> : null}
        {visibleLines >= 3 ? <p>&gt; Todo listo. Bienvenido.</p> : null}
      </div>
    </motion.div>
  )
}

interface StripePaymentFormProps {
  clientSecret: string
  totalEur: number
  onSuccess: () => void
  onError: (message: string) => void
  loading: boolean
  setLoading: (v: boolean) => void
}

function StripePaymentForm({ clientSecret, totalEur, onSuccess, onError, loading, setLoading }: StripePaymentFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [canPr, setCanPr] = useState(false)
  const [cardComplete, setCardComplete] = useState(false)
  const [paymentRequest, setPaymentRequest] = useState<PaymentRequest | null>(null)

  useEffect(() => {
    if (!stripe || !clientSecret) return undefined

    const pr = stripe.paymentRequest({
      country: 'ES',
      currency: 'eur',
      total: { label: 'Eroscape', amount: Math.round(totalEur * 100) },
      requestPayerName: true,
      requestPayerEmail: true,
    })

    void pr.canMakePayment().then((result) => {
      if (result) {
        setCanPr(true)
        setPaymentRequest(pr)
      }
    })

    const onPaymentMethod = async (ev: PaymentRequestPaymentMethodEvent) => {
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        { payment_method: ev.paymentMethod.id },
        { handleActions: false },
      )
      if (error) {
        ev.complete('fail')
        onError(error.message ?? 'No se pudo completar el pago')
        return
      }
      if (paymentIntent?.status === 'requires_action') {
        const { error: e2 } = await stripe.confirmCardPayment(clientSecret)
        if (e2) {
          ev.complete('fail')
          onError(e2.message ?? 'Autenticación fallida')
          return
        }
      }
      ev.complete('success')
      onSuccess()
    }

    pr.on('paymentmethod', onPaymentMethod)

    return () => {
      pr.off('paymentmethod', onPaymentMethod)
    }
  }, [stripe, clientSecret, totalEur, onError, onSuccess])

  const handleCardPay = async () => {
    if (!stripe || !elements || !clientSecret) return
    setLoading(true)
    const card = elements.getElement(CardElement)
    if (!card) {
      setLoading(false)
      onError('Introduce los datos de la tarjeta')
      return
    }
    const { error } = await stripe.confirmCardPayment(clientSecret, { payment_method: { card } })
    setLoading(false)
    if (error) {
      onError(error.message ?? 'Pago rechazado')
      return
    }
    onSuccess()
  }

  const handleCardChange = (e: StripeCardElementChangeEvent) => {
    setCardComplete(e.complete)
  }

  return (
    <div className="space-y-6">
      {canPr && paymentRequest ? (
        <div className="rounded-xl border border-[rgba(185,48,158,0.2)] p-3" style={{ background: 'var(--color-bg-elevated)' }}>
          <PaymentRequestButtonElement
            options={{
              paymentRequest,
              style: {
                paymentRequestButton: {
                  type: 'default',
                  theme: 'dark',
                  height: '44px',
                },
              },
            }}
          />
        </div>
      ) : null}

      {canPr ? (
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-[rgba(185,48,158,0.2)]" />
          <span className="font-(--font-jetbrains) text-[10px] tracking-widest" style={{ color: 'var(--color-text-muted)' }}>
            o paga con tarjeta
          </span>
          <div className="h-px flex-1 bg-[rgba(185,48,158,0.2)]" />
        </div>
      ) : null}

      <div className="rounded-xl border border-[rgba(185,48,158,0.2)] p-4" style={{ background: 'var(--color-bg-elevated)' }}>
        <CardElement options={{ style: { base: { fontSize: '16px', color: '#FFFFFF', '::placeholder': { color: '#7A6A82' } } } }} onChange={handleCardChange} />
      </div>

      <motion.button
        type="button"
        disabled={loading || !cardComplete || !stripe}
        onClick={() => void handleCardPay()}
        className="relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full px-5 py-3.5 font-(--font-playfair) text-[13px] tracking-[0.14em] text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg-base) disabled:cursor-not-allowed disabled:opacity-50 sm:px-6 sm:py-4 sm:text-base"
        style={{ background: 'var(--gradient-cta)' }}
        whileHover={loading ? undefined : { scale: 1.01 }}
        whileTap={loading ? undefined : { scale: 0.98 }}
      >
        {loading ? (
          <>
            <motion.span
              className="inline-block h-5 w-5 rounded-full border-2 border-white/25"
              style={{ borderTopColor: 'var(--color-magenta)' }}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 0.85, ease: 'linear' }}
              aria-hidden="true"
            />
            <span className="font-(--font-jetbrains) text-xs tracking-[0.15em]">PROCESANDO PROTOCOLO...</span>
          </>
        ) : (
          <span className="flex items-center gap-2">
            <PenLine className="h-5 w-5 shrink-0" aria-hidden="true" />
            [ CONFIRMAR MI NOCHE ]
          </span>
        )}
      </motion.button>
    </div>
  )
}

interface PaymentShellProps {
  bookingId: string
  totalEur: number
  onPaid: () => void
}

function PaymentShell({ bookingId, totalEur, onPaid }: PaymentShellProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [demo, setDemo] = useState(false)
  const [intentReady, setIntentReady] = useState(false)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let cancelled = false
    const resetT = window.setTimeout(() => {
      if (!cancelled) setIntentReady(false)
    }, 0)
    void fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookingId, totalAmount: totalEur, currency: 'eur' as const }),
    })
      .then(async (r) => {
        const data = (await r.json()) as { clientSecret?: string | null; error?: string }
        if (cancelled) return
        if (r.ok && data.clientSecret) {
          setClientSecret(data.clientSecret)
          setDemo(false)
        } else {
          setClientSecret(null)
          setDemo(true)
        }
      })
      .catch(() => {
        if (!cancelled) {
          setClientSecret(null)
          setDemo(true)
        }
      })
      .finally(() => {
        if (!cancelled) setIntentReady(true)
      })
    return () => {
      cancelled = true
      window.clearTimeout(resetT)
    }
  }, [bookingId, totalEur])

  const onSuccess = useCallback(() => {
    setLoading(false)
    onPaid()
  }, [onPaid])

  const onError = useCallback((msg: string) => {
    setLoading(false)
    setLoadError(msg)
  }, [])

  if (!stripePromise) {
    return (
      <div className="rounded-xl border border-[rgba(185,48,158,0.2)] p-4" style={{ background: 'var(--color-bg-elevated)' }}>
        <p className="font-(--font-inter) text-sm" style={{ color: 'var(--color-text-muted)' }}>
          Configura <span className="font-(--font-jetbrains)">NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY</span> para pagos con tarjeta.
        </p>
        <motion.button
          type="button"
          onClick={onPaid}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-full px-5 py-3.5 font-(--font-playfair) text-[13px] tracking-[0.14em] text-white sm:px-6 sm:py-4 sm:text-base"
          style={{ background: 'var(--gradient-cta)' }}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="flex items-center gap-2">
            <PenLine className="h-5 w-5" aria-hidden="true" />[ CONFIRMAR MI NOCHE ]
          </span>
        </motion.button>
      </div>
    )
  }

  if (!intentReady) {
    return (
      <div className="flex items-center justify-center gap-3 py-8 font-(--font-jetbrains) text-xs" style={{ color: 'var(--color-text-muted)' }}>
        <motion.span
          className="inline-block h-5 w-5 rounded-full border-2 border-white/20"
          style={{ borderTopColor: 'var(--color-magenta)' }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 0.85, ease: 'linear' }}
        />
        Preparando tu experiencia...
      </div>
    )
  }

  if (demo || !clientSecret) {
    return (
      <div className="space-y-4">
        <p className="font-(--font-inter) text-sm" style={{ color: 'var(--color-text-muted)' }}>
          Cobro en modo demo (sin PaymentIntent en servidor). Puedes confirmar tu noche y continuar al panel.
        </p>
        <motion.button
          type="button"
          onClick={() => {
            setLoading(true)
            window.setTimeout(() => {
              setLoading(false)
              onPaid()
            }, 450)
          }}
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-full px-5 py-3.5 font-(--font-playfair) text-[13px] tracking-[0.14em] text-white disabled:opacity-60 sm:px-6 sm:py-4 sm:text-base"
          style={{ background: 'var(--gradient-cta)' }}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
        >
          {loading ? (
            <>
              <motion.span
                className="inline-block h-5 w-5 rounded-full border-2 border-white/25"
                style={{ borderTopColor: 'var(--color-magenta)' }}
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 0.85, ease: 'linear' }}
              />
              <span className="font-(--font-jetbrains) text-xs tracking-[0.15em]">PROCESANDO PROTOCOLO...</span>
            </>
          ) : (
            <span className="flex items-center gap-2">
              <PenLine className="h-5 w-5" aria-hidden="true" />[ CONFIRMAR MI NOCHE ]
            </span>
          )}
        </motion.button>
      </div>
    )
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret, appearance: cardAppearance }}>
      {loadError ? <p className="mb-3 font-(--font-inter) text-sm text-red-400">{loadError}</p> : null}
      <StripePaymentForm
        clientSecret={clientSecret}
        totalEur={totalEur}
        onSuccess={onSuccess}
        onError={onError}
        loading={loading}
        setLoading={setLoading}
      />
    </Elements>
  )
}

export function Step5Checkout() {
  const shouldReduceMotion = useReducedMotion()
  const router = useRouter()
  const { state, finalizeCheckout, getTotalPrice } = useBookingFlow()

  const [overlayDone, setOverlayDone] = useState(false)
  const [showArchetype, setShowArchetype] = useState(false)
  const archetypeBurstRef = useRef(false)
  const payingRef = useRef(false)

  const bookingState = useMemo<BookingState>(
    () => ({
      ...state,
      step3: state.step3,
      step4: state.step4,
    }),
    [state],
  )
  const archetype = useMemo(() => getPlayerArchetype(bookingState), [bookingState])

  const citySlug = state.step1.citySlug
  const expSlug = state.step1.experienceSlug
  const city = useMemo(() => CITIES.find((c) => c.slug === citySlug) ?? CITIES[0], [citySlug])
  const experience = useMemo(() => EXPERIENCES_TEMPLATE.find((e) => e.slug === expSlug) ?? EXPERIENCES_TEMPLATE[0], [expSlug])

  const arsenalTotal = getTotalPrice()
  const basePrice = experience.basePrice
  const total = basePrice + arsenalTotal

  const selectedUpsells = useMemo(
    () => state.step3.selectedUpsells.map((id) => UPSELL_ITEMS.find((u) => u.id === id)).filter((u): u is (typeof UPSELL_ITEMS)[number] => Boolean(u)),
    [state.step3.selectedUpsells],
  )

  const dateLine = useMemo(() => {
    if (!state.step1.date) return `${city.displayName.toUpperCase()} · —`
    const d = new Date(state.step1.date)
    const dateStr = new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'short', year: 'numeric' }).format(d)
    const time = state.step1.timeSlot ?? '—'
    return `${city.displayName.toUpperCase()} · ${dateStr.toUpperCase()} · ${time}H`
  }, [city.displayName, state.step1.date, state.step1.timeSlot])

  const [discountOpen, setDiscountOpen] = useState(false)

  useEffect(() => {
    if (!shouldReduceMotion) return undefined
    const t = window.setTimeout(() => {
      setOverlayDone(true)
      setShowArchetype(true)
    }, 0)
    return () => window.clearTimeout(t)
  }, [shouldReduceMotion])

  useEffect(() => {
    if (shouldReduceMotion) return undefined
    const t = window.setTimeout(() => setShowArchetype(true), 2500)
    return () => window.clearTimeout(t)
  }, [shouldReduceMotion])

  const handleOverlayComplete = useCallback(() => {
    setOverlayDone(true)
  }, [])

  const handleArchetypeRevealDone = useCallback(() => {
    if (shouldReduceMotion || archetypeBurstRef.current) return
    archetypeBurstRef.current = true
    fireConfettiBurst(0.38)
  }, [shouldReduceMotion])

  const handlePaid = useCallback(() => {
    if (payingRef.current) return
    payingRef.current = true
    const id = state.bookingId
    fireConfettiBurst(0.55)
    window.setTimeout(() => {
      router.push(`/mi-reserva/${id}`)
      finalizeCheckout(id)
      payingRef.current = false
    }, 450)
  }, [finalizeCheckout, router, state.bookingId])

  return (
    <div className="relative mx-auto max-w-3xl px-4 pb-24 pt-8 sm:px-6 sm:pb-28">
      <AnimatePresence>{!overlayDone && !shouldReduceMotion ? <AccessGrantedOverlay key="overlay" onComplete={handleOverlayComplete} /> : null}</AnimatePresence>

      <StepHeader actLabel="V" title="LAS PUERTAS SE ABREN" />
      <p className="-mt-4 mb-6 font-(--font-inter) text-[13px] sm:mb-8 sm:text-sm" style={{ color: 'var(--color-text-secondary)' }}>
        El último paso. Después, todo empieza.
      </p>

      <AnimatePresence>
        {showArchetype ? (
          <div key="archetype" className="mb-8 sm:mb-10">
            <ArchetypeCard archetype={archetype} size="lg" onRevealAnimationComplete={handleArchetypeRevealDone} />
          </div>
        ) : null}
      </AnimatePresence>

      <section
        className="mb-6 rounded-2xl border p-4 sm:mb-8 sm:p-6"
        style={{ borderColor: 'rgba(185,48,158,0.2)', background: 'var(--color-bg-elevated)', boxShadow: 'var(--glow-card)' }}
      >
        <h3 className="font-(--font-jetbrains) text-xs tracking-[0.2em]" style={{ color: 'var(--color-text-muted)' }}>
          TU NOCHE, EN DETALLE
        </h3>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <h4 className="font-(--font-playfair) text-lg text-white sm:text-xl">{experience.title}</h4>
        </div>
        <p className="mt-2 font-(--font-jetbrains) text-xs tracking-wide" style={{ color: 'var(--color-text-secondary)' }}>
          {dateLine}
        </p>

        {selectedUpsells.length > 0 ? (
          <div className="mt-5 sm:mt-6">
            <p className="font-(--font-jetbrains) text-[10px] tracking-widest" style={{ color: 'var(--color-text-muted)' }}>
              TU BAÚL
            </p>
            <div className="mt-3 flex flex-wrap gap-2.5 sm:gap-3">
              {selectedUpsells.map((u) => {
                const Icon = UPS_ICON[u.icon] ?? Package
                return (
                  <div key={u.id} className="flex items-center gap-2 rounded-lg border border-[rgba(185,48,158,0.15)] px-2 py-1.5" style={{ background: 'rgba(0,0,0,0.2)' }}>
                    <Icon className="h-4 w-4 shrink-0" style={{ color: 'var(--color-magenta)' }} aria-hidden="true" />
                    <span className="font-(--font-inter) text-[11px] text-white sm:text-xs">{u.name}</span>
                  </div>
                )
              })}
            </div>
          </div>
        ) : null}

        <div className="mt-5">
          <ArchetypeCard archetype={archetype} size="sm" />
        </div>

        <div className="mt-6 border-t border-[rgba(185,48,158,0.15)] pt-4 font-(--font-inter) text-[13px] sm:mt-8 sm:text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          <div className="flex justify-between">
            <span>Base</span>
            <span>{formatCurrency(basePrice)}</span>
          </div>
          <div className="mt-2 flex justify-between">
            <span>Baúl</span>
            <span>{formatCurrency(arsenalTotal)}</span>
          </div>
          <div className="mt-3 flex justify-between border-t border-[rgba(185,48,158,0.15)] pt-3 font-(--font-playfair) text-base sm:text-lg" style={{ color: 'var(--color-gold)' }}>
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </div>
      </section>

      <div
        className="mb-6 rounded-2xl border p-4 sm:mb-8 sm:p-5"
        style={{ borderColor: 'var(--border-gold)', background: 'color-mix(in srgb, var(--color-bg-elevated) 92%, transparent)' }}
      >
        <div className="flex items-start gap-3">
          <Lock className="h-5 w-5 shrink-0" style={{ color: 'var(--color-gold)' }} aria-hidden="true" />
          <div>
            <p className="font-(--font-jetbrains) text-[10px] tracking-[0.18em]" style={{ color: 'var(--color-text-muted)' }}>
              EN TU EXTRACTO BANCARIO APARECERÁ COMO:
            </p>
            <p className="mt-2 font-(--font-jetbrains) text-[13px] text-white sm:text-base">Ocio y Eventos SL</p>
            <p className="mt-2 font-(--font-inter) text-xs italic" style={{ color: 'var(--color-text-muted)' }}>
              Tu privacidad protegida. Nadie sabrá lo que viviste aquí.
            </p>
          </div>
        </div>
      </div>

      <section className="mb-6 sm:mb-8">
        <h3 className="font-(--font-jetbrains) text-xs tracking-[0.2em]" style={{ color: 'var(--color-text-muted)' }}>
          EL ÚLTIMO PASO
        </h3>
        <div className="mt-4">
          <PaymentShell bookingId={state.bookingId} totalEur={total} onPaid={handlePaid} />
        </div>

        <div className="mt-5 sm:mt-6">
          <button
            type="button"
            onClick={() => setDiscountOpen((o) => !o)}
            className="flex w-full items-center justify-between py-2 font-(--font-inter) text-[13px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta) sm:text-sm"
            style={{ color: 'var(--color-text-secondary)' }}
            aria-expanded={discountOpen}
          >
            Código de descuento
            <motion.span animate={{ rotate: discountOpen ? 180 : 0 }} transition={{ duration: 0.25, ease: SENSUAL_EASE }}>
              <ChevronDown className="h-4 w-4" />
            </motion.span>
          </button>
          <AnimatePresence initial={false}>
            {discountOpen ? (
              <motion.div
                initial={shouldReduceMotion ? false : { height: 0, opacity: 0 }}
                animate={shouldReduceMotion ? undefined : { height: 'auto', opacity: 1 }}
                exit={shouldReduceMotion ? undefined : { height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: SENSUAL_EASE }}
                className="overflow-hidden"
              >
                <input
                  type="text"
                  placeholder="Introduce código"
                  className="mt-2 w-full rounded-xl border border-[rgba(185,48,158,0.25)] bg-(--color-bg-elevated) px-3 py-2 font-(--font-inter) text-[13px] text-white placeholder:text-(--color-text-muted) focus-visible:border-(--color-magenta) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta) sm:text-sm"
                />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-(--font-inter) text-[11px]" style={{ color: 'var(--color-text-muted)' }}>
          <span className="flex items-center gap-1">
            <CalendarDays className="h-4 w-4" style={{ color: 'var(--color-gold)' }} aria-hidden="true" />
            Cancelación libre 48h antes
          </span>
          <span className="text-[rgba(185,48,158,0.4)]">·</span>
          <span className="flex items-center gap-1">
            <Shield className="h-4 w-4" style={{ color: 'var(--color-magenta)' }} aria-hidden="true" />
            Discreción absoluta
          </span>
          <span className="text-[rgba(185,48,158,0.4)]">·</span>
          <span className="flex items-center gap-1">
            <Headphones className="h-4 w-4" style={{ color: 'var(--color-text-secondary)' }} aria-hidden="true" />
            Siempre hay alguien para ti
          </span>
        </div>
      </section>

      <div className="flex justify-start">
        <button
          type="button"
          onClick={() => router.push('/reservar?step=4')}
          className="rounded-full border border-[rgba(185,48,158,0.2)] px-5 py-2.5 font-(--font-jetbrains) text-[13px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg-base) sm:px-6 sm:py-3 sm:text-[11px]"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          ← VOLVER
        </button>
      </div>
    </div>
  )
}
