'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'

import {
  formatMonthTitleEsUpper,
  getDaysInMonth,
  getWeekdayIndexMon0,
  isExperienceCalendarDayAvailable,
} from '@/lib/experience-calendar'
import { cn } from '@/lib/utils'
import { formatBookingDateEs } from '@/components/booking/BookingStepSummary'

const WEEKDAY_LABELS = ['L', 'M', 'X', 'J', 'V', 'S', 'D'] as const

export interface BookingCalendarPanelProps {
  monthCursor: Date
  onMonthChange: (next: Date) => void
  selectedDate?: string
  disabled?: boolean
  onPickDate: (day: number) => void
  compact?: boolean
  narrow?: boolean
  className?: string
}

export function BookingCalendarPanel({
  monthCursor,
  onMonthChange,
  selectedDate,
  disabled = false,
  onPickDate,
  compact = false,
  narrow = false,
  className,
}: BookingCalendarPanelProps) {
  const days = getDaysInMonth(monthCursor)
  const start = getWeekdayIndexMon0(monthCursor)
  const daySize = narrow
    ? 'h-7 w-7 text-[11px]'
    : compact
      ? 'h-8 w-8 text-xs sm:h-9 sm:w-9'
      : 'h-9 w-9 text-sm sm:h-10 sm:w-10'

  return (
    <div className={cn('w-full', !narrow && 'mx-auto max-w-md', className)}>
      <div className={cn('rounded-xl border border-white/12 bg-(--color-bg-elevated)', narrow ? 'p-2' : 'p-3 sm:p-4')}>
        <div className="flex items-center justify-between">
          <button
            type="button"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-white/30 disabled:opacity-40"
            aria-label="Mes anterior"
            disabled={disabled}
            onClick={() => onMonthChange(new Date(monthCursor.getFullYear(), monthCursor.getMonth() - 1, 1))}
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <p
            className={cn(
              'font-(--font-jetbrains) tracking-[0.14em] text-white',
              narrow ? 'text-[9px]' : 'text-xs tracking-[0.16em]',
            )}
          >
            {formatMonthTitleEsUpper(monthCursor)}
          </p>
          <button
            type="button"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-white/30 disabled:opacity-40"
            aria-label="Mes siguiente"
            disabled={disabled}
            onClick={() => onMonthChange(new Date(monthCursor.getFullYear(), monthCursor.getMonth() + 1, 1))}
          >
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-3 grid grid-cols-7 gap-0.5 text-center sm:gap-1">
          {WEEKDAY_LABELS.map((label) => (
            <span
              key={label}
              className="py-0.5 font-(--font-jetbrains) text-[9px] tracking-[0.12em] text-(--color-text-muted) sm:text-[10px]"
            >
              {label}
            </span>
          ))}
          {Array.from({ length: start }).map((_, i) => (
            <span key={`sp-${i}`} aria-hidden="true" />
          ))}
          {Array.from({ length: days }).map((_, i) => {
            const day = i + 1
            const date = new Date(monthCursor.getFullYear(), monthCursor.getMonth(), day)
            const available = !disabled && isExperienceCalendarDayAvailable(date)
            const iso = date.toISOString().slice(0, 10)
            const isSelected = selectedDate === iso

            return (
              <button
                key={day}
                type="button"
                onClick={() => onPickDate(day)}
                disabled={!available}
                className={cn(
                  'mx-auto flex items-center justify-center rounded-full font-medium transition-colors',
                  daySize,
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta)',
                  !available && 'cursor-not-allowed text-(--color-text-muted) opacity-35',
                  available &&
                    !isSelected &&
                    'border border-white/15 text-white hover:border-(--color-magenta)/45 hover:bg-white/5',
                  available &&
                    isSelected &&
                    'border-transparent text-white [background:var(--gradient-cta)] [box-shadow:var(--glow-magenta)]',
                )}
                aria-pressed={isSelected}
              >
                {day}
              </button>
            )
          })}
        </div>
      </div>

      {selectedDate && !narrow ? (
        <p className="mt-3 text-center font-(--font-inter) text-sm text-(--color-text-secondary)">
          <span className="text-(--color-text-muted)">Elegiste: </span>
          <span className="text-white">{formatBookingDateEs(selectedDate)}</span>
        </p>
      ) : null}
    </div>
  )
}
