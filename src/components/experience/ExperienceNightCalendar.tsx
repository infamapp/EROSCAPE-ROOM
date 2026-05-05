'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useMemo } from 'react'

import {
  formatMonthTitleEsUpper,
  getDaysInMonth,
  getWeekdayIndexMon0,
  isExperienceCalendarDayAvailable,
} from '@/lib/experience-calendar'
import { cn } from '@/lib/utils'

export interface ExperienceNightCalendarProps {
  monthCursor: Date
  onShiftMonth: (delta: number) => void
  selectedDay: number | null
  onSelectDay: (day: number) => void
}

const WEEKDAY_LABELS = ['L', 'M', 'X', 'J', 'V', 'S', 'D'] as const

export function ExperienceNightCalendar({
  monthCursor,
  onShiftMonth,
  selectedDay,
  onSelectDay,
}: ExperienceNightCalendarProps) {
  const monthDays = useMemo(() => {
    const days = getDaysInMonth(monthCursor)
    const start = getWeekdayIndexMon0(monthCursor)
    return { days, start }
  }, [monthCursor])

  return (
    <div
      className="mt-6 rounded-2xl border border-[rgba(185,48,158,0.22)] p-4 sm:p-5"
      style={{ background: 'rgba(26,10,26,0.92)' }}
    >
      <div className="flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => onShiftMonth(-1)}
          className="inline-flex size-9 items-center justify-center rounded-full border border-(--border-subtle) text-(--color-text-secondary) transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta)"
          aria-label="Mes anterior"
        >
          <ChevronLeft className="size-5" />
        </button>
        <p className="font-(--font-playfair) text-sm tracking-[0.12em] text-(--color-magenta-glow) sm:text-base">
          {formatMonthTitleEsUpper(monthCursor)}
        </p>
        <button
          type="button"
          onClick={() => onShiftMonth(1)}
          className="inline-flex size-9 items-center justify-center rounded-full border border-(--border-subtle) text-(--color-text-secondary) transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta)"
          aria-label="Mes siguiente"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-y-2 text-center font-(--font-jetbrains) text-[10px] text-(--color-text-muted) sm:text-[11px]">
        {WEEKDAY_LABELS.map((d) => (
          <div key={d} className="py-1">
            {d}
          </div>
        ))}
      </div>

      <div className="mt-1 grid grid-cols-7 gap-y-1.5 text-center font-(--font-inter) text-sm text-white">
        {Array.from({ length: monthDays.start }).map((_, i) => (
          <span key={`pad-${i}`} className="py-2" aria-hidden="true" />
        ))}
        {Array.from({ length: monthDays.days }).map((_, idx) => {
          const day = idx + 1
          const date = new Date(monthCursor.getFullYear(), monthCursor.getMonth(), day)
          const available = isExperienceCalendarDayAvailable(date)
          const selected = selectedDay === day
          return (
            <button
              key={day}
              type="button"
              disabled={!available}
              onClick={() => onSelectDay(day)}
              className={cn(
                'relative mx-auto flex min-h-10 w-10 flex-col items-center justify-center rounded-full text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta)',
                !available && 'cursor-not-allowed text-(--color-text-muted) line-through opacity-45',
                available && !selected && 'hover:text-(--color-magenta-glow)',
                selected && 'bg-(--color-magenta) text-white shadow-(--glow-magenta)',
              )}
            >
              <span>{day}</span>
              {available && !selected ? (
                <span className="mt-0.5 h-1 w-1 rounded-full bg-(--color-magenta)" aria-hidden="true" />
              ) : null}
            </button>
          )
        })}
      </div>

      <p className="mt-4 text-center font-(--font-inter) text-xs italic text-(--color-text-muted)">
        Disponibilidad simulada: fines de semana + algunos días laborables.
      </p>
    </div>
  )
}
