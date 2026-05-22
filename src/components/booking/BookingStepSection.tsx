'use client'

import type { ReactNode } from 'react'
import { Check } from 'lucide-react'

import { cn } from '@/lib/utils'

export interface BookingStepSectionProps {
  stepNumber: number
  title: string
  description?: string
  isComplete?: boolean
  isDisabled?: boolean
  children: ReactNode
  className?: string
}

export function BookingStepSection({
  stepNumber,
  title,
  description,
  isComplete = false,
  isDisabled = false,
  children,
  className,
}: BookingStepSectionProps) {
  return (
    <section
      className={cn(
        'rounded-2xl border border-white/12 bg-(--color-bg-subtle) p-5 sm:p-6',
        isDisabled && 'opacity-60',
        className,
      )}
      aria-disabled={isDisabled || undefined}
    >
      <div className="flex items-start gap-4">
        <div
          className={cn(
            'flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-(--font-jetbrains) text-xs font-semibold tracking-wider',
            isComplete
              ? 'bg-(--color-magenta) text-white'
              : 'border border-white/20 bg-(--color-bg-elevated) text-(--color-text-primary)',
          )}
          aria-hidden="true"
        >
          {isComplete ? <Check className="h-4 w-4" strokeWidth={2.5} /> : stepNumber}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-(--font-playfair) text-lg text-white sm:text-xl">{title}</h3>
          {description ? (
            <p className="mt-1 font-(--font-inter) text-sm leading-relaxed text-(--color-text-secondary)">
              {description}
            </p>
          ) : null}
          <div className="mt-5">{children}</div>
        </div>
      </div>
    </section>
  )
}
