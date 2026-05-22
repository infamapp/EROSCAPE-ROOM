'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

import { BookingAdvisorLink } from '@/components/booking/BookingAdvisorLink'
import { cn, formatCurrency } from '@/lib/utils'

/** Reserva espacio bajo el contenido cuando la barra está fija (pasos I–IV). */
export const BOOKING_FLOW_BOTTOM_PAD_CLASS =
  'pb-[calc(5.25rem+env(safe-area-inset-bottom,0px))]'

export interface BookingBottomBarProps {
  currentStep: 1 | 2 | 3 | 4 | 5
  isValid: boolean
  onNext: () => void
  onBack: () => void
  subtotal?: number
  className?: string
  showBack?: boolean
  nextLabel?: string
  maxWidthClass?: string
}

function primaryLabelForStep(step: 1 | 2 | 3 | 4 | 5): string {
  switch (step) {
    case 1:
    case 2:
      return 'SIGUIENTE →'
    case 3:
      return 'CONTINUAR →'
    case 4:
      return 'FIRMAR EL JURAMENTO'
    case 5:
      return 'CONFIRMAR MI NOCHE'
  }
}

export function BookingBottomBar({
  currentStep,
  isValid,
  onNext,
  onBack,
  subtotal,
  className,
  showBack: showBackProp,
  nextLabel,
  maxWidthClass = 'max-w-[94rem]',
}: BookingBottomBarProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (currentStep === 5) return null

  const showBack = showBackProp ?? currentStep > 1
  const primaryLabel = nextLabel ?? primaryLabelForStep(currentStep)

  const bar = (
    <div
      role="region"
      aria-label="Acciones del paso"
      className={cn(
        'booking-bottom-bar fixed inset-x-0 bottom-0 z-50 border-t border-(--border-subtle) bg-(--color-bg-elevated)/98 backdrop-blur-md',
        'pb-[max(0.75rem,env(safe-area-inset-bottom,0px))] pt-3',
        'shadow-[0_-12px_40px_rgba(0,0,0,0.5)]',
        className,
      )}
    >
      <div
        className={cn(
          'mx-auto flex w-full items-center justify-between gap-3 px-4 sm:gap-4 sm:px-8 lg:px-10',
          maxWidthClass,
        )}
      >
        <div className="min-w-[72px] shrink-0 sm:min-w-[100px]">
          {showBack ? (
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center rounded-full px-1 py-2 font-(--font-inter) text-sm text-(--color-text-muted) transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg-base) sm:px-2"
            >
              ← Volver
            </button>
          ) : null}
        </div>

        <div className="hidden min-w-0 flex-1 text-center md:block">
          {typeof subtotal === 'number' ? (
            <span className="truncate text-sm font-semibold text-(--color-gold) [font-family:var(--font-playfair)]">
              {formatCurrency(subtotal)}
            </span>
          ) : null}
        </div>

        <div className="flex min-w-0 flex-1 items-center justify-end gap-2 sm:gap-3 md:flex-none">
          {typeof subtotal === 'number' ? (
            <span className="truncate text-sm font-semibold text-(--color-gold) [font-family:var(--font-playfair)] md:hidden">
              {formatCurrency(subtotal)}
            </span>
          ) : null}
          <BookingAdvisorLink />
          <button
            type="button"
            onClick={onNext}
            disabled={!isValid}
            className={cn(
              'inline-flex min-w-0 flex-1 items-center justify-center rounded-full px-4 py-2.5 font-(--font-jetbrains) text-[10px] uppercase tracking-[0.16em] text-white transition-[filter,transform] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg-base) sm:flex-none sm:px-6 sm:text-[11px] sm:tracking-[0.18em]',
              !isValid && 'cursor-not-allowed opacity-60',
            )}
            style={{ background: isValid ? 'var(--gradient-cta)' : 'var(--color-cta-disabled)' }}
          >
            {primaryLabel}
          </button>
        </div>
      </div>
    </div>
  )

  if (!mounted) return null
  return createPortal(bar, document.body)
}
