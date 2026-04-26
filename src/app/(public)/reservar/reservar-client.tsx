'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import { Step1Selection } from '@/components/booking/Step1Selection'
import { Step2Configurator } from '@/components/booking/Step2Configurator'
import { Step3Upselling } from '@/components/booking/Step3Upselling'
import { Step4Legal } from '@/components/booking/Step4Legal'
import { Step5Checkout } from '@/components/booking/Step5Checkout'
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
  const { state, goToStep, isStepValid } = useBookingFlow()
  const step = state.currentStep
  const isApplyingUrlRef = useRef(false)

  const [lastStep, setLastStep] = useState<Step>(step)
  const direction: 1 | -1 = step >= lastStep ? 1 : -1

  useEffect(() => {
    if (step === lastStep) return
    const t = window.setTimeout(() => setLastStep(step), 0)
    return () => window.clearTimeout(t)
  }, [lastStep, step])

  // URL -> state (back/forward + deep links). This effect MUST NOT also "sync state -> URL"
  // or we can end up oscillating between steps in production.
  useEffect(() => {
    const raw = sp.get('step')
    if (!raw) {
      router.replace('/reservar?step=1')
      return
    }

    const urlStep = parseStep(raw)

    // Guardrail: don't allow jumping ahead if prior steps aren't valid.
    let safeStep: Step = urlStep
    for (let s: Step = 1; s < urlStep; s = ((s + 1) as Step)) {
      if (!isStepValid(s)) {
        safeStep = s
        break
      }
    }

    // If URL is ahead of what we allow, correct it.
    if (safeStep !== urlStep) {
      router.replace(`/reservar?step=${safeStep}`)
      return
    }

    // If URL changed (e.g. back/forward) update state.
    if (safeStep !== step) {
      isApplyingUrlRef.current = true
      goToStep(safeStep)
    }
  }, [goToStep, isStepValid, router, sp, step])

  // state -> URL (user clicks Next/Back). Skip immediately after URL -> state to avoid ping-pong.
  useEffect(() => {
    if (isApplyingUrlRef.current) {
      isApplyingUrlRef.current = false
      return
    }
    const urlStep = parseStep(sp.get('step'))
    if (urlStep !== step) {
      router.replace(`/reservar?step=${step}`)
    }
  }, [router, sp, step])

  // When changing steps, ensure the new section is visible.
  useEffect(() => {
    if (typeof window === 'undefined') return
    // Use standards-compliant behavior to avoid runtime errors in some browsers.
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [step])

  const content = (() => {
    switch (step) {
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
        const _exhaustive: never = step
        return _exhaustive
      }
    }
  })()

  return (
    <div className="min-h-screen pb-24">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={step}
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
  )
}

