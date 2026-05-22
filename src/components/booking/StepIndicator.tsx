'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Check, Compass, Package, PenLine, SlidersHorizontal, Unlock } from 'lucide-react'

import { cn } from '@/lib/utils'

export interface StepIndicatorProps {
  currentStep: number
  compact?: boolean
}

const SENSUAL_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

const STEPS = [
  { name: 'EL ENCUENTRO', icon: Compass },
  { name: 'TUS DESEOS', icon: SlidersHorizontal },
  { name: 'EL TOCADOR', icon: Package },
  { name: 'EL JURAMENTO', icon: PenLine },
  { name: 'ACCESO', icon: Unlock },
] as const

const ACTS = ['I', 'II', 'III', 'IV', 'V'] as const

export function StepIndicator({ currentStep, compact = false }: StepIndicatorProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="w-full">
      <div
        className={cn(
          'mx-auto hidden max-w-[94rem] items-center justify-center gap-3 px-4 sm:px-8 md:flex',
          compact ? 'py-3' : 'py-8',
        )}
      >
        {STEPS.map((step, idx) => {
          const stepNumber = idx + 1
          const isCompleted = stepNumber < currentStep
          const isActive = stepNumber === currentStep
          const Icon = step.icon

          return (
            <div key={step.name} className="flex items-center">
              <div className="relative flex flex-col items-center">
                <div
                  className={cn(
                    'relative flex items-center justify-center rounded-full',
                    isActive ? 'h-10 w-10' : 'h-8 w-8',
                  )}
                  style={
                    isCompleted
                      ? { background: 'var(--color-magenta)' }
                      : isActive
                        ? { background: 'var(--gradient-cta)', boxShadow: 'var(--glow-magenta)' }
                        : { background: 'var(--color-bg-subtle)', border: '1px solid rgba(255,255,255,0.14)' }
                  }
                >
                  {isCompleted ? (
                    <Check className="h-4 w-4 text-white" aria-hidden="true" />
                  ) : (
                    <Icon
                      className={cn(isActive ? 'h-5 w-5' : 'h-4 w-4')}
                      style={{ color: isActive ? 'white' : 'var(--color-text-secondary)' }}
                      aria-hidden="true"
                    />
                  )}

                  {isActive ? (
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{ border: '2px solid rgba(185,48,158,0.45)' }}
                      initial={shouldReduceMotion ? false : { scale: 1, opacity: 1 }}
                      animate={shouldReduceMotion ? undefined : { scale: [1, 1.05, 1], opacity: 1 }}
                      transition={shouldReduceMotion ? undefined : { duration: 2, repeat: Infinity, ease: SENSUAL_EASE }}
                      aria-hidden="true"
                    />
                  ) : null}
                </div>

                <div
                  className="mt-3 font-(--font-jetbrains) text-[9px] uppercase tracking-[0.12em]"
                  style={{
                    color: isActive
                      ? 'var(--color-text-primary)'
                      : isCompleted
                        ? 'var(--color-magenta)'
                        : 'var(--color-text-muted)',
                  }}
                >
                  {ACTS[idx]} · {step.name}
                </div>
              </div>

              {idx < STEPS.length - 1 ? (
                <div className="mx-3 h-px w-14 bg-white/12">
                  <div
                    className="h-px"
                    style={{ background: isCompleted ? 'var(--color-magenta)' : 'transparent' }}
                    aria-hidden="true"
                  />
                </div>
              ) : null}
            </div>
          )
        })}
      </div>

      <div
        className={cn(
          'mx-auto flex max-w-[94rem] items-center justify-between px-4 sm:px-8 md:hidden',
          compact ? 'py-3' : 'py-6',
        )}
      >
        <div className="w-full text-center">
          <p className="font-(--font-jetbrains) text-[10px] uppercase tracking-[0.18em] text-(--color-text-muted)">
            ACTO {ACTS[Math.max(0, Math.min(4, currentStep - 1))]} de V · {STEPS[Math.max(0, Math.min(4, currentStep - 1))]?.name}
          </p>
        </div>
      </div>
    </div>
  )
}

