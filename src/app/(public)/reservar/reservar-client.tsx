'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import { Step1Selection } from '@/components/booking/Step1Selection'
import { Step2Configurator } from '@/components/booking/Step2Configurator'
import { Step3Upselling } from '@/components/booking/Step3Upselling'
import { Step4Legal } from '@/components/booking/Step4Legal'
import { Step5Checkout } from '@/components/booking/Step5Checkout'
import { MissionProgress } from '@/components/booking/MissionProgress'
import { StepIndicator } from '@/components/booking/StepIndicator'
import { useBookingFlow } from '@/hooks/useBookingFlow'

type Step = 1 | 2 | 3 | 4 | 5

const SENSUAL_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

const pageVariants = {
  enter: (direction: 1 | -1) => ({ opacity: 0, x: direction === 1 ? 32 : -32 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.3, ease: SENSUAL_EASE } },
  exit: (direction: 1 | -1) => ({
    opacity: 0,
    x: direction === 1 ? -32 : 32,
    transition: { duration: 0.25, ease: SENSUAL_EASE },
  }),
}

function parseStep(raw: string | null): Step {
  const n = raw ? Number(raw) : 1
  if (n === 1 || n === 2 || n === 3 || n === 4 || n === 5) return n
  return 1
}

export function ReservarClient() {
  const shouldReduceMotion = useReducedMotion()
  const router = useRouter()
  const sp = useSearchParams()
  const { state, isStepValid } = useBookingFlow()
  const lastRenderedStepRef = useRef<Step>(1)

  const raw = sp.get('step')
  const urlStep = parseStep(raw)

  // Guardrail: don't allow jumping ahead if prior steps aren't valid.
  let safeStep: Step = urlStep
  for (let s: Step = 1; s < urlStep; s = ((s + 1) as Step)) {
    if (!isStepValid(s)) {
      safeStep = s
      break
    }
  }

  const [direction, setDirection] = useState<1 | -1>(1)

  const tension = useMemo(() => {
    const base = (safeStep - 1) * 20
    const bonusOmega = state.step2.intensityLevel === 'turbio' ? 5 : 0
    const bonusUpsells = Math.min(10, state.step3.selectedUpsells.length * 2)
    const bonusConsent = state.step4.consent ? 5 : 0
    return Math.min(100, base + bonusOmega + bonusUpsells + bonusConsent)
  }, [safeStep, state.step2.intensityLevel, state.step3.selectedUpsells.length, state.step4.consent])

  useEffect(() => {
    // Normalize missing/invalid params.
    if (!raw) {
      router.replace('/reservar?step=1')
      return
    }
    // If URL is ahead of what we allow, correct it.
    if (safeStep !== urlStep) {
      router.replace(`/reservar?step=${safeStep}`)
      return
    }
    const prev = lastRenderedStepRef.current
    lastRenderedStepRef.current = safeStep
    setDirection(safeStep >= prev ? 1 : -1)
  }, [raw, router, safeStep, urlStep])

  // When changing steps, ensure the new section is visible.
  useEffect(() => {
    if (typeof window === 'undefined') return
    // Use standards-compliant behavior to avoid runtime errors in some browsers.
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [safeStep])

  const content = (() => {
    switch (safeStep) {
      case 1:
        return <Step1Selection />
      case 2:
        return <Step2Configurator />
      case 3:
        return <Step3Upselling />
      case 4:
        return <Step4Legal />
      case 5:
        return <Step5Checkout />
      default: {
        const _exhaustive: never = safeStep
        return _exhaustive
      }
    }
  })()

  return (
    <>
      <MissionProgress tension={tension} />
      <div className="pt-18">
        <StepIndicator currentStep={safeStep} />
      </div>
      <div className="min-h-screen pb-24">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={safeStep}
          custom={direction}
          variants={pageVariants}
          initial={shouldReduceMotion ? false : 'enter'}
          animate={shouldReduceMotion ? undefined : 'center'}
          exit={shouldReduceMotion ? undefined : 'exit'}
        >
          {content}
        </motion.div>
      </AnimatePresence>
      </div>
    </>
  )
}

