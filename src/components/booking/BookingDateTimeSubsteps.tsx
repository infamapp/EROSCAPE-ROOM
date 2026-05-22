'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { ReactNode } from 'react'

import {
  formatMonthTitleEsUpper,
  getDaysInMonth,
  getWeekdayIndexMon0,
  isExperienceCalendarDayAvailable,
} from '@/lib/experience-calendar'
import { cn } from '@/lib/utils'
import { formatBookingDateEs } from '@/components/booking/BookingStepSummary'

const WEEKDAY_LABELS = ['L', 'M', 'X', 'J', 'V', 'S', 'D'] as const

export interface BookingDateTimeSubstepsProps {
  monthCursor: Date
  onMonthChange: (next: Date) => void
  selectedDate?: string
  selectedTime?: string
  timeSlots: readonly string[]
  isTimeSlotAvailable: (slot: string) => boolean
  canPickDate: boolean
  canPickTime: boolean
  onPickDate: (day: number) => void
  onPickTime: (slot: string) => void
}

interface SubstepShellProps {
  substep: '1' | '2'
  title: string
  hint: string
  isComplete: boolean
  isDisabled: boolean
  children: ReactNode
}

function SubstepShell({
  substep,
  title,
  hint,
  isComplete,
  isDisabled,
  children,
}: SubstepShellProps) {
  return (
    <section
      className={cn(
        'rounded-2xl border border-white/14 bg-(--color-bg-subtle) p-5 sm:p-6',
        isDisabled && 'opacity-55',
      )}
      aria-disabled={isDisabled || undefined}
    >
      <div className="flex items-center gap-3">
        <span
          className={cn(
            'flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-(--font-jetbrains) text-xs font-semibold',
            isComplete
              ? 'bg-(--color-magenta) text-white'
              : 'border border-white/20 bg-(--color-bg-elevated) text-white',
          )}
        >
          {substep}
        </span>
        <div>
          <h3 className="font-(--font-playfair) text-lg text-white">{title}</h3>
          <p className="mt-0.5 font-(--font-inter) text-xs text-(--color-text-secondary)">{hint}</p>
        </div>
      </div>
      <div className="mt-5">{children}</div>
    </section>
  )
}

export function BookingDateTimeSubsteps({
  monthCursor,
  onMonthChange,
  selectedDate,
  selectedTime,
  timeSlots,
  isTimeSlotAvailable,
  canPickDate,
  canPickTime,
  onPickDate,
  onPickTime,
}: BookingDateTimeSubstepsProps) {
  const monthDays = (() => {
    const days = getDaysInMonth(monthCursor)
    const start = getWeekdayIndexMon0(monthCursor)
    return { days, start }
  })()

  return (
    <div className="space-y-5 sm:space-y-6">
      <SubstepShell
        substep="1"
        title="Fecha"
        hint={canPickDate ? 'Días disponibles resaltados.' : 'Primero elige una experiencia a la izquierda.'}
        isComplete={Boolean(selectedDate)}
        isDisabled={!canPickDate}
      >
        <div className="rounded-xl border border-white/12 bg-(--color-bg-elevated) p-3 sm:p-4">
          <div className="flex items-center justify-between">
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-white/30 disabled:opacity-40"
              aria-label="Mes anterior"
              disabled={!canPickDate}
              onClick={() => onMonthChange(new Date(monthCursor.getFullYear(), monthCursor.getMonth() - 1, 1))}
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </button>
            <p className="font-(--font-jetbrains) text-xs tracking-[0.16em] text-white">
              {formatMonthTitleEsUpper(monthCursor)}
            </p>
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-white/30 disabled:opacity-40"
              aria-label="Mes siguiente"
              disabled={!canPickDate}
              onClick={() => onMonthChange(new Date(monthCursor.getFullYear(), monthCursor.getMonth() + 1, 1))}
            >
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-4 grid grid-cols-7 gap-1 text-center">
            {WEEKDAY_LABELS.map((label) => (
              <span
                key={label}
                className="py-1 font-(--font-jetbrains) text-[10px] tracking-[0.12em] text-(--color-text-muted)"
              >
                {label}
              </span>
            ))}
            {Array.from({ length: monthDays.start }).map((_, i) => (
              <span key={`sp-${i}`} aria-hidden="true" />
            ))}
            {Array.from({ length: monthDays.days }).map((_, i) => {
              const day = i + 1
              const date = new Date(monthCursor.getFullYear(), monthCursor.getMonth(), day)
              const available = canPickDate && isExperienceCalendarDayAvailable(date)
              const iso = date.toISOString().slice(0, 10)
              const isSelected = selectedDate === iso

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => onPickDate(day)}
                  disabled={!available}
                  className={cn(
                    'mx-auto flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition-colors sm:h-10 sm:w-10',
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

        {selectedDate ? (
          <p className="mt-3 font-(--font-inter) text-sm text-(--color-text-secondary)">
            <span className="text-(--color-text-muted)">Elegiste: </span>
            <span className="text-white">{formatBookingDateEs(selectedDate)}</span>
          </p>
        ) : null}
      </SubstepShell>

      <SubstepShell
        substep="2"
        title="Hora"
        hint={canPickTime ? 'Horario de inicio de tu noche.' : 'Elige una fecha para ver horarios.'}
        isComplete={Boolean(selectedTime)}
        isDisabled={!canPickTime}
      >
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
          {timeSlots.map((slot) => {
            const available = canPickTime && isTimeSlotAvailable(slot)
            const isSelected = selectedTime === slot

            return (
              <button
                key={slot}
                type="button"
                disabled={!available}
                onClick={() => onPickTime(slot)}
                className={cn(
                  'rounded-xl border px-4 py-3.5 font-(--font-jetbrains) text-sm tracking-[0.12em] transition-colors',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg-subtle)',
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
      </SubstepShell>
    </div>
  )
}
