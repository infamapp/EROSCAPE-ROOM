'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Brain, CheckCircle, Compass, Package, PenLine, Unlock } from 'lucide-react'

import { cn } from '@/lib/utils'

export interface StepIndicatorProps {
  currentStep: number
}

const SENSUAL_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

const STEPS = [
  { name: 'EL ENCUENTRO', icon: Compass },
  { name: 'TUS DESEOS', icon: Brain },
  { name: 'EL BAÚL', icon: Package },
  { name: 'EL JURAMENTO', icon: PenLine },
  { name: 'LAS PUERTAS SE ABREN', icon: Unlock },
] as const

const ACTS = ['I', 'II', 'III', 'IV', 'V'] as const

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="w-full">
      <div className="mx-auto hidden max-w-6xl items-center justify-center gap-3 px-4 py-8 sm:px-6 md:flex">
        {STEPS.map((step, idx) => {
          const stepNumber = idx + 1
          const isCompleted = stepNumber < currentStep
          const isActive = stepNumber === currentStep
          const Icon = step.icon

          return (
            <div key={step.name} className="flex items-center">
              <div className="relative flex flex-col items-center">
                <div
                  className={cn('relative flex h-10 w-10 items-center justify-center rounded-full')}
                  style={{
                    background: isCompleted ? 'var(--color-magenta)' : 'var(--color-bg-elevated)',
                    border: isActive ? '2px solid var(--color-magenta)' : '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  {isCompleted ? (
                    <CheckCircle className="h-5 w-5 text-white" aria-hidden="true" />
                  ) : (
                    <Icon
                      className="h-5 w-5"
                      style={{ color: isActive ? 'var(--color-magenta-glow)' : 'var(--color-text-muted)' }}
                      aria-hidden="true"
                    />
                  )}

                  {isActive ? (
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{ border: '2px solid rgba(185,48,158,0.55)' }}
                      initial={shouldReduceMotion ? false : { scale: 1, opacity: 1 }}
                      animate={shouldReduceMotion ? undefined : { scale: [1, 1.3], opacity: [1, 0] }}
                      transition={shouldReduceMotion ? undefined : { duration: 1.2, repeat: Infinity, ease: SENSUAL_EASE }}
                      aria-hidden="true"
                    />
                  ) : null}
                </div>

                <div className="mt-3 font-[var(--font-jetbrains)] text-[9px] tracking-[0.18em]" style={{ color: 'var(--color-text-muted)' }}>
                  {ACTS[idx]} · {step.name}
                </div>
              </div>

              {idx < STEPS.length - 1 ? (
                <div className="mx-3 h-[2px] w-14 rounded-full bg-white/10">
                  <motion.div
                    className="h-[2px] rounded-full"
                    style={{ background: 'var(--color-magenta)' }}
                    initial={shouldReduceMotion ? false : { width: 0, opacity: 0 }}
                    animate={
                      shouldReduceMotion
                        ? undefined
                        : isCompleted
                          ? { width: '100%', opacity: 1, transition: { duration: 0.35, ease: SENSUAL_EASE } }
                          : { width: 0, opacity: 0 }
                    }
                    aria-hidden="true"
                  />
                </div>
              ) : null}
            </div>
          )
        })}
      </div>

      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6 sm:px-6 md:hidden">
        <div className="font-[var(--font-jetbrains)] text-xs tracking-[0.18em]" style={{ color: 'var(--color-text-muted)' }}>
          {ACTS[Math.max(0, Math.min(4, currentStep - 1))]} · DE V
        </div>
        <div className="font-[var(--font-playfair)] text-sm text-white">
          {STEPS[Math.max(0, Math.min(4, currentStep - 1))]?.name}
        </div>
      </div>
    </div>
  )
}

