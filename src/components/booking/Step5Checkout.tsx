'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { CalendarDays, ChevronDown, Headphones, Shield } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { BookingFlowHeader } from '@/components/booking/BookingFlowHeader'
import { CheckoutOrderSummary } from '@/components/booking/CheckoutOrderSummary'
import { CheckoutPaymentForm } from '@/components/booking/CheckoutPaymentForm'
import { CheckoutWelcomeOverlay } from '@/components/booking/CheckoutWelcomeOverlay'
import { useBookingFlow } from '@/hooks/useBookingFlow'
import { getBookingExperiencePrice } from '@/lib/booking-pricing'
import { getBoutiquePackById } from '@/lib/boutique-packs'
import { STEP5_CHECKOUT_COPY } from '@/lib/booking-checkout-copy'
import { CITIES, EXPERIENCES_TEMPLATE } from '@/lib/constants'
import { cn } from '@/lib/utils'
import type { BookingState } from '@/types/booking'
import type { CompletedBookingSnapshot } from '@/types/completed-booking'

const SENSUAL_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

const CONFETTI_COLORS = ['#B9309E', '#9F349B', '#CB7B1B']

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

export function Step5Checkout() {
  const router = useRouter()
  const { state, finalizeCheckout, getTotalPrice } = useBookingFlow()

  const shouldReduceMotion = useReducedMotion()
  const [overlayDone, setOverlayDone] = useState(false)
  const payingRef = useRef(false)

  useEffect(() => {
    if (shouldReduceMotion) setOverlayDone(true)
  }, [shouldReduceMotion])

  const bookingState = useMemo<BookingState>(() => ({ ...state }), [state])

  const citySlug = state.step1.citySlug
  const expSlug = state.step1.experienceSlug ?? ''
  const city = useMemo(() => CITIES.find((c) => c.slug === citySlug) ?? CITIES[0], [citySlug])
  const experience = useMemo(
    () => EXPERIENCES_TEMPLATE.find((e) => e.slug === expSlug) ?? EXPERIENCES_TEMPLATE[0],
    [expSlug],
  )

  const arsenalTotal = getTotalPrice()
  const intensityLevel = state.step2.intensityLevel ?? null
  const basePrice = useMemo(
    () => getBookingExperiencePrice(expSlug, intensityLevel),
    [expSlug, intensityLevel],
  )
  const total = basePrice + arsenalTotal

  const selectedTocadorPacks = useMemo(
    () =>
      state.step3.selectedUpsells
        .map((id) => getBoutiquePackById(id))
        .filter((p): p is NonNullable<ReturnType<typeof getBoutiquePackById>> => Boolean(p)),
    [state.step3.selectedUpsells],
  )

  const dateLine = useMemo(() => {
    if (!state.step1.date) return '—'
    const d = new Date(state.step1.date)
    const dateStr = new Intl.DateTimeFormat('es-ES', {
      weekday: 'short',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(d)
    const time = state.step1.timeSlot ?? '—'
    return `${dateStr} · ${time}h`
  }, [state.step1.date, state.step1.timeSlot])

  const [discountOpen, setDiscountOpen] = useState(false)

  const handleOverlayComplete = useCallback(() => {
    setOverlayDone(true)
  }, [])

  const handlePaymentSuccess = useCallback(
    (snapshot: CompletedBookingSnapshot) => {
      if (payingRef.current) return
      payingRef.current = true
      fireConfettiBurst(0.55)
      finalizeCheckout(snapshot)
      router.push('/')
      payingRef.current = false
    },
    [finalizeCheckout, router],
  )

  return (
    <div className="relative mx-auto w-full max-w-[94rem] px-4 pt-1 pb-8 sm:px-8 sm:pb-10 lg:px-10">
      <AnimatePresence>
        {!overlayDone ? <CheckoutWelcomeOverlay key="welcome" onComplete={handleOverlayComplete} /> : null}
      </AnimatePresence>

      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: overlayDone ? 1 : 0, y: overlayDone ? 0 : 12 }}
        transition={{ duration: 0.45, ease: SENSUAL_EASE }}
        className={cn(!overlayDone && 'pointer-events-none')}
      >
        <BookingFlowHeader
          actLabel="V"
          title={STEP5_CHECKOUT_COPY.title}
          subtitle={STEP5_CHECKOUT_COPY.subtitle}
        />

        <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)] lg:items-start lg:gap-6">
          <CheckoutOrderSummary
            experienceSlug={expSlug}
            experienceTitle={experience.title}
            cityDisplayName={city.displayName}
            dateLine={dateLine}
            intensityLevel={intensityLevel}
            selectedTocadorPacks={selectedTocadorPacks}
            basePrice={basePrice}
            tocadorTotal={arsenalTotal}
            total={total}
          />

          <section
            id="checkout-payment"
            className="lg:sticky lg:top-[calc(var(--layout-nav-height)+env(safe-area-inset-top,0px)+5rem)]"
            aria-labelledby="checkout-payment-heading"
          >
            <h3
              id="checkout-payment-heading"
              className="font-(--font-jetbrains) text-[10px] uppercase tracking-[0.2em] text-(--color-text-secondary)"
            >
              {STEP5_CHECKOUT_COPY.paymentHeading}
            </h3>
            <p className="mt-1 font-(--font-inter) text-xs text-(--color-text-muted)">{STEP5_CHECKOUT_COPY.paymentHint}</p>

            <div className="mt-3 rounded-2xl border border-white/12 bg-(--color-bg-subtle) p-3 sm:p-4">
              <CheckoutPaymentForm bookingState={bookingState} totalEur={total} onSuccess={handlePaymentSuccess} />
            </div>

            <div className="mt-3 rounded-xl border border-white/10 bg-(--color-bg-elevated)/60 px-3 py-2">
              <button
                type="button"
                onClick={() => setDiscountOpen((o) => !o)}
                className="flex w-full items-center justify-between gap-2 py-1 font-(--font-inter) text-xs text-(--color-text-secondary) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta)"
                aria-expanded={discountOpen}
              >
                {STEP5_CHECKOUT_COPY.discountLabel}
                <motion.span animate={{ rotate: discountOpen ? 180 : 0 }} transition={{ duration: 0.25, ease: SENSUAL_EASE }}>
                  <ChevronDown className="h-4 w-4" aria-hidden="true" />
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
                      placeholder={STEP5_CHECKOUT_COPY.discountPlaceholder}
                      className="mt-2 w-full rounded-lg border border-white/12 bg-(--color-bg-subtle) px-3 py-2 font-(--font-inter) text-sm text-white placeholder:text-(--color-text-muted) focus-visible:border-(--color-magenta) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta)"
                    />
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>

            <ul className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 font-(--font-inter) text-[10px] text-(--color-text-muted) sm:text-[11px]">
              <li className="flex items-center gap-1">
                <CalendarDays className="h-3.5 w-3.5 text-(--color-gold)" aria-hidden="true" />
                {STEP5_CHECKOUT_COPY.trustCancel}
              </li>
              <li className="hidden text-white/20 sm:inline" aria-hidden="true">
                ·
              </li>
              <li className="flex items-center gap-1">
                <Shield className="h-3.5 w-3.5 text-(--color-magenta-glow)" aria-hidden="true" />
                {STEP5_CHECKOUT_COPY.trustPrivacy}
              </li>
              <li className="hidden text-white/20 sm:inline" aria-hidden="true">
                ·
              </li>
              <li className="flex items-center gap-1">
                <Headphones className="h-3.5 w-3.5" aria-hidden="true" />
                {STEP5_CHECKOUT_COPY.trustSupport}
              </li>
            </ul>
          </section>
        </div>
      </motion.div>
    </div>
  )
}
