'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import { Step2DesiresPanel } from '@/components/booking/Step2DesiresPanel'
import { Step2IntensityPanel } from '@/components/booking/Step2IntensityPanel'
import { Step2NivelProhibidoGate } from '@/components/booking/Step2NivelProhibidoGate'
import { areParticipantNamesValid } from '@/lib/booking-participants'
import { useBookingFlow } from '@/hooks/useBookingFlow'
import type { CompanyType, IntensityLevel } from '@/types/booking'

const SENSUAL_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

export type Step2Phase = 'deseos' | 'umbral' | 'intensidad'

function parsePhase(raw: string | null): Step2Phase {
  if (raw === 'umbral' || raw === 'intensidad' || raw === 'deseos') return raw
  return 'deseos'
}

function isDeseosComplete(companyType: CompanyType | null | undefined, names: string[]): boolean {
  if (!companyType) return false
  return areParticipantNamesValid(companyType, names)
}

export function Step2Configurator() {
  const shouldReduceMotion = useReducedMotion()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { state, updateStep2 } = useBookingFlow()

  const phase = parsePhase(searchParams.get('phase'))
  const companyType = state.step2.companyType ?? null
  const intensityLevel = state.step2.intensityLevel ?? null
  const language = state.step2.language ?? 'es'
  const names = state.step2.names ?? []

  const deseosComplete = useMemo(
    () => isDeseosComplete(companyType, names),
    [companyType, names],
  )

  useEffect(() => {
    if (phase === 'umbral' || phase === 'intensidad') {
      if (!deseosComplete) {
        router.replace('/reservar?step=2&phase=deseos')
      }
    }
  }, [phase, deseosComplete, router])

  const panelDirection = phase === 'deseos' ? -1 : 1

  const goPhase = (next: Step2Phase) => {
    router.push(`/reservar?step=2&phase=${next}`)
  }

  return (
    <div className="booking-flow relative bg-(--color-bg-base)">
      <AnimatePresence mode="wait" custom={panelDirection} initial={false}>
        {phase === 'deseos' ? (
          <motion.div
            key="deseos"
            custom={panelDirection}
            initial={shouldReduceMotion ? false : { opacity: 0, x: -24 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, x: 24 }}
            transition={{ duration: 0.32, ease: SENSUAL_EASE }}
          >
            <Step2DesiresPanel
              companyType={companyType}
              names={names}
              language={language}
              onUpdate={updateStep2}
              onBack={() => router.push('/reservar?step=1')}
              onContinue={() => {
                if (!deseosComplete) return
                goPhase('umbral')
              }}
            />
          </motion.div>
        ) : null}

        {phase === 'umbral' ? (
          <motion.div
            key="umbral"
            custom={panelDirection}
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.5, ease: SENSUAL_EASE }}
            className="flex min-h-[calc(100dvh-12rem)] items-center justify-center"
          >
            <Step2NivelProhibidoGate onComplete={() => goPhase('intensidad')} />
          </motion.div>
        ) : null}

        {phase === 'intensidad' ? (
          <motion.div
            key="intensidad"
            custom={panelDirection}
            initial={shouldReduceMotion ? false : { opacity: 0, x: 24 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, x: -24 }}
            transition={{ duration: 0.32, ease: SENSUAL_EASE }}
          >
            <Step2IntensityPanel
              experienceSlug={state.step1.experienceSlug}
              intensityLevel={intensityLevel}
              onSelectIntensity={(level: IntensityLevel) => updateStep2({ intensityLevel: level })}
              onBack={() => goPhase('deseos')}
              onNext={() => {
                if (!intensityLevel) return
                router.push('/reservar?step=3')
              }}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
