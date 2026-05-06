'use client'

import { cn, formatCurrency } from '@/lib/utils'

export interface BookingBottomBarProps {
  currentStep: 1 | 2 | 3 | 4 | 5
  isValid: boolean
  onNext: () => void
  onBack: () => void
  subtotal?: number
  className?: string
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

export function BookingBottomBar({ currentStep, isValid, onNext, onBack, subtotal, className }: BookingBottomBarProps) {
  // Prompt: no renderizar en step 5 (checkout tiene su CTA propio)
  if (currentStep === 5) return null

  const showBack = currentStep > 1
  const primaryLabel = primaryLabelForStep(currentStep)

  return (
    <div
      className={cn(
        'fixed inset-x-0 bottom-0 z-40 border-t border-(--border-subtle) bg-(--color-bg-elevated)/95 px-4 py-3 backdrop-blur-md',
        className,
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
        <div className="min-w-[120px]">
          {showBack ? (
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center rounded-full px-2 py-2 font-(--font-inter) text-sm text-(--color-text-muted) transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg-base)"
            >
              ← Volver
            </button>
          ) : null}
        </div>

        <div className="hidden min-w-0 flex-1 text-center sm:block">
          {typeof subtotal === 'number' ? (
            <span className="truncate text-sm font-semibold text-(--color-gold) [font-family:var(--font-playfair)]">
              {formatCurrency(subtotal)}
            </span>
          ) : null}
        </div>

        <div className="min-w-[180px] text-right">
          <button
            type="button"
            onClick={onNext}
            disabled={!isValid}
            className={cn(
              'inline-flex w-full items-center justify-center rounded-full px-6 py-2.5 font-(--font-jetbrains) text-[11px] uppercase tracking-[0.18em] text-white transition-[filter,transform] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg-base)',
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
}

