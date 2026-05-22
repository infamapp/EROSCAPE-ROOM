'use client'

import { cn } from '@/lib/utils'

export interface BookingTimePanelProps {
  timeSlots: readonly string[]
  selectedTime?: string
  disabled?: boolean
  isSlotAvailable: (slot: string) => boolean
  onPickTime: (slot: string) => void
  stacked?: boolean
  className?: string
}

export function BookingTimePanel({
  timeSlots,
  selectedTime,
  disabled = false,
  isSlotAvailable,
  onPickTime,
  stacked = false,
  className,
}: BookingTimePanelProps) {
  return (
    <div className={cn('flex w-full flex-col gap-2', !stacked && 'mx-auto max-w-2xl items-center justify-center gap-4', className)}>
      {!stacked ? (
        <p className="text-center font-(--font-inter) text-sm text-(--color-text-secondary)">
          Horario de inicio de tu noche
        </p>
      ) : null}
      <div className={cn('grid w-full gap-2', stacked ? 'grid-cols-1' : 'grid-cols-3 gap-3 sm:gap-4')}>
        {timeSlots.map((slot) => {
          const available = !disabled && isSlotAvailable(slot)
          const isSelected = selectedTime === slot

          return (
            <button
              key={slot}
              type="button"
              disabled={!available}
              onClick={() => onPickTime(slot)}
              className={cn(
                stacked
                  ? 'rounded-lg border px-3 py-2.5 font-(--font-jetbrains) text-xs tracking-[0.12em] transition-colors'
                  : 'rounded-xl border px-3 py-4 font-(--font-jetbrains) text-sm tracking-[0.14em] transition-colors sm:py-5 sm:text-base',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta)',
                !available && 'cursor-not-allowed border-white/8 text-(--color-text-muted) opacity-40',
                available &&
                  !isSelected &&
                  'border-white/18 bg-(--color-bg-elevated) text-white hover:border-(--color-magenta)/45',
                available &&
                  isSelected &&
                  'border-(--color-magenta)/70 text-white [background:var(--gradient-cta)] [box-shadow:var(--glow-magenta)]',
              )}
              aria-pressed={isSelected}
            >
              {available ? slot : 'Completo'}
            </button>
          )
        })}
      </div>
    </div>
  )
}
