'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react'
import { useMemo, useState } from 'react'

import { CITIES, EXPERIENCES_TEMPLATE } from '@/lib/constants'
import { cn, formatCurrency } from '@/lib/utils'
import { useBookingFlow } from '@/hooks/useBookingFlow'
import { StepHeader } from '@/components/booking/StepHeader'

const SENSUAL_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

const pillPulse = {
  tap: { scale: 1.05, transition: { duration: 0.2 } },
}

const gridFade = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: SENSUAL_EASE } },
  exit: { opacity: 0, y: 12, transition: { duration: 0.2, ease: SENSUAL_EASE } },
}

const TIME_SLOTS = ['19:00', '21:00', '23:00'] as const

function getMonthStart(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), 1)
}

function getDaysInMonth(d: Date): number {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate()
}

function getWeekdayIndexMon0(d: Date): number {
  const js = d.getDay()
  return (js + 6) % 7
}

function isAvailableDay(date: Date): boolean {
  const day = date.getDay()
  const weekend = day === 0 || day === 6
  const someWeekdays = date.getDate() % 3 === 0
  return weekend || someWeekdays
}

function isTimeSlotAvailable(dateIso: string | undefined, slot: (typeof TIME_SLOTS)[number]): boolean {
  if (!dateIso) return false
  const day = Number(dateIso.slice(-2))
  if (!Number.isFinite(day)) return true
  if (slot === '23:00') return day % 2 === 0
  return true
}

type CitySlug = (typeof CITIES)[number]['slug']
type ExperienceSlug = (typeof EXPERIENCES_TEMPLATE)[number]['slug']

export function Step1Selection() {
  const shouldReduceMotion = useReducedMotion()
  const { state, updateStep1, nextStep, isStepValid } = useBookingFlow()

  const selectedCity = (state.step1.citySlug as CitySlug | undefined) ?? 'madrid'
  const selectedExp = state.step1.experienceSlug as ExperienceSlug | undefined
  const selectedDate = state.step1.date
  const selectedTime = state.step1.timeSlot

  const [monthCursor, setMonthCursor] = useState(() => getMonthStart(new Date()))

  const cityData = useMemo(() => CITIES.find((c) => c.slug === selectedCity) ?? CITIES[0], [selectedCity])

  const monthDays = useMemo(() => {
    const days = getDaysInMonth(monthCursor)
    const start = getWeekdayIndexMon0(monthCursor)
    return { days, start }
  }, [monthCursor])

  const selectedExpData = useMemo(
    () => EXPERIENCES_TEMPLATE.find((e) => e.slug === selectedExp) ?? null,
    [selectedExp],
  )

  const canContinue = isStepValid(1)

  const handleSelectCity = (slug: CitySlug) => {
    if (slug === selectedCity) return
    updateStep1({ citySlug: slug, experienceSlug: undefined, date: undefined, timeSlot: undefined })
  }

  const handleSelectExperience = (slug: ExperienceSlug) => {
    updateStep1({ experienceSlug: slug, citySlug: selectedCity })
  }

  const handlePickDate = (day: number) => {
    const date = new Date(monthCursor.getFullYear(), monthCursor.getMonth(), day)
    if (!isAvailableDay(date)) return
    const iso = date.toISOString().slice(0, 10)
    updateStep1({ date: iso, timeSlot: undefined })
  }

  const handlePickTime = (slot: (typeof TIME_SLOTS)[number]) => {
    if (!isTimeSlotAvailable(selectedDate, slot)) return
    updateStep1({ timeSlot: slot })
  }

  const handleNext = () => {
    if (!canContinue) return
    nextStep()
  }

  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
      <StepHeader actLabel="I" title="¿DÓNDE QUIERES QUE OCURRA?" />

      {/* City pills */}
      <div className="flex gap-3 overflow-x-auto pb-2 md:justify-center">
        {CITIES.map((c) => {
          const isActive = c.slug === selectedCity
          return (
            <motion.button
              key={c.slug}
              type="button"
              variants={pillPulse}
              whileTap={shouldReduceMotion ? undefined : 'tap'}
              onClick={() => handleSelectCity(c.slug)}
              className={cn('shrink-0 rounded-full px-5 py-2 text-sm transition-colors')}
              style={{
                background: isActive ? 'var(--gradient-cta)' : 'var(--color-bg-elevated)',
                color: isActive ? 'white' : 'var(--color-text-muted)',
                boxShadow: isActive ? 'var(--glow-magenta)' : 'none',
                border: isActive ? '1px solid rgba(185,48,158,0.35)' : '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {c.displayName}
            </motion.button>
          )
        })}
      </div>

      {/* Experiences */}
      <div className="mt-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCity}
            variants={gridFade}
            initial={shouldReduceMotion ? false : 'hidden'}
            animate={shouldReduceMotion ? undefined : 'visible'}
            exit={shouldReduceMotion ? undefined : 'exit'}
            className="grid gap-4 md:grid-cols-2"
          >
            {EXPERIENCES_TEMPLATE.map((exp) => {
              const isSelected = exp.slug === selectedExp
              const intensityLabel =
                exp.missionLevel === 'ALPHA'
                  ? 'DESPERTAR · Suave'
                  : exp.missionLevel === 'BETA'
                    ? 'INTENSO · Sin frenos'
                    : 'SIN LÍMITES · Todo permitido'

              return (
                <button
                  key={exp.slug}
                  type="button"
                  onClick={() => handleSelectExperience(exp.slug)}
                  className="relative text-left"
                >
                  <div
                    className={cn('rounded-2xl p-5 transition-transform')}
                    style={{
                      background: 'var(--color-bg-elevated)',
                      border: isSelected ? '1px solid rgba(185,48,158,0.75)' : 'var(--border-subtle)',
                      boxShadow: isSelected ? 'var(--glow-magenta)' : 'var(--glow-card)',
                    }}
                  >
                    {isSelected ? (
                      <div className="absolute left-4 top-2">
                        <CheckCircle2 className="h-5 w-5 text-white" aria-hidden="true" />
                      </div>
                    ) : null}

                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="mt-3 font-[var(--font-playfair)] text-base text-white">{exp.title}</div>
                      </div>

                      <div
                        className="shrink-0 rounded-full px-3 py-1 font-[var(--font-jetbrains)] text-[10px] tracking-[0.16em]"
                        style={{
                          color: exp.missionLevel === 'OMEGA' ? '#FDA4AF' : 'var(--color-text-secondary)',
                          background:
                            exp.missionLevel === 'ALPHA'
                              ? 'rgba(6,95,70,0.35)'
                              : exp.missionLevel === 'BETA'
                                ? 'rgba(120,53,15,0.35)'
                                : 'rgba(159,18,57,0.35)',
                          border:
                            exp.missionLevel === 'OMEGA'
                              ? '1px solid rgba(244,63,94,0.45)'
                              : '1px solid rgba(255,255,255,0.08)',
                        }}
                      >
                        {intensityLabel}
                      </div>
                    </div>

                    <div className="mt-4 flex items-end justify-between gap-3">
                      <div className="font-[var(--font-playfair)] text-lg" style={{ color: 'var(--color-gold)' }}>
                        Desde {formatCurrency(exp.basePrice)}
                      </div>
                      <div
                        className="rounded-full px-4 py-2 text-xs font-[var(--font-jetbrains)] tracking-[0.18em]"
                        style={{
                          border: isSelected ? '1px solid rgba(185,48,158,0.7)' : '1px solid rgba(185,48,158,0.35)',
                          color: 'white',
                        }}
                      >
                        SELECCIONAR
                      </div>
                    </div>
                  </div>
                </button>
              )
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Calendar */}
      <div className="mt-12">
        <div className="font-[var(--font-jetbrains)] text-xs tracking-[0.2em] uppercase" style={{ color: 'var(--color-text-muted)' }}>
          ELIGE TU NOCHE
        </div>

        <div className="mt-4 rounded-2xl p-4" style={{ background: 'var(--color-bg-elevated)', border: 'var(--border-subtle)' }}>
          <div className="flex items-center justify-between">
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full"
              style={{ border: 'var(--border-subtle)' }}
              aria-label="Mes anterior"
              onClick={() => setMonthCursor((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1))}
            >
              <ChevronLeft className="h-4 w-4" style={{ color: 'var(--color-text-secondary)' }} />
            </button>
            <div className="font-[var(--font-jetbrains)] text-xs tracking-[0.18em]" style={{ color: 'var(--color-text-secondary)' }}>
              {new Intl.DateTimeFormat('es-ES', { month: 'long', year: 'numeric' }).format(monthCursor).toUpperCase()}
            </div>
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full"
              style={{ border: 'var(--border-subtle)' }}
              aria-label="Mes siguiente"
              onClick={() => setMonthCursor((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1))}
            >
              <ChevronRight className="h-4 w-4" style={{ color: 'var(--color-text-secondary)' }} />
            </button>
          </div>

          <div className="mt-4 grid grid-cols-7 gap-2">
            {Array.from({ length: monthDays.start }).map((_, i) => (
              <div key={`sp-${i}`} />
            ))}
            {Array.from({ length: monthDays.days }).map((_, i) => {
              const day = i + 1
              const date = new Date(monthCursor.getFullYear(), monthCursor.getMonth(), day)
              const available = isAvailableDay(date)
              const iso = date.toISOString().slice(0, 10)
              const isSelected = selectedDate === iso

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => handlePickDate(day)}
                  disabled={!available}
                  className="relative flex h-10 w-10 items-center justify-center rounded-lg text-sm"
                  style={{
                    color: available ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
                    border: available ? '1px solid rgba(185,48,158,0.25)' : '1px solid rgba(255,255,255,0.06)',
                    background: isSelected
                      ? 'var(--color-magenta)'
                      : available
                        ? 'rgba(185,48,158,0.08)'
                        : 'rgba(255,255,255,0.02)',
                    cursor: available ? 'pointer' : 'not-allowed',
                    fontWeight: isSelected ? 700 : 400,
                  }}
                >
                  {day}
                  {available && !isSelected ? (
                    <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full" style={{ background: 'var(--color-magenta)' }} />
                  ) : null}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Time slots */}
      <div className="mt-10">
        <div className="font-[var(--font-jetbrains)] text-xs tracking-[0.2em] uppercase" style={{ color: 'var(--color-text-muted)' }}>
          ¿A QUÉ HORA EMPIEZA TODO?
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3">
          {TIME_SLOTS.map((slot) => {
            const available = isTimeSlotAvailable(selectedDate, slot)
            const isSelected = selectedTime === slot

            return (
              <button
                key={slot}
                type="button"
                disabled={!available}
                onClick={() => handlePickTime(slot)}
                className="rounded-full px-4 py-3 text-center font-[var(--font-jetbrains)] text-xs tracking-[0.18em]"
                style={{
                  background: isSelected ? 'var(--color-magenta)' : 'transparent',
                  color: available ? (isSelected ? 'white' : 'var(--color-text-secondary)') : 'var(--color-text-muted)',
                  border: isSelected ? '1px solid rgba(185,48,158,0.85)' : '1px solid rgba(185,48,158,0.35)',
                  textDecoration: available ? 'none' : 'line-through',
                  cursor: available ? 'pointer' : 'not-allowed',
                }}
              >
                {slot}
              </button>
            )
          })}
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="fixed inset-x-0 bottom-0 z-[120] border-t"
        style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(8,0,8,0.92)', backdropFilter: 'blur(10px)' }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <div className="min-w-0">
            <div className="font-[var(--font-jetbrains)] text-[10px] tracking-[0.18em]" style={{ color: 'var(--color-text-muted)' }}>
              SELECCIÓN ACTIVA
            </div>
            <div className="mt-1 truncate text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              {cityData.displayName}
              {' · '}
              {selectedExpData?.title ?? '—'}
              {' · '}
              {selectedDate ?? '—'}
              {' · '}
              {selectedTime ?? '—'}
            </div>
          </div>

          <button
            type="button"
            onClick={handleNext}
            disabled={!canContinue}
            className="shrink-0 rounded-full px-5 py-3 text-sm text-white"
            style={{
              background: canContinue ? 'var(--gradient-cta)' : '#4B5563',
              cursor: canContinue ? 'pointer' : 'not-allowed',
            }}
          >
            ASÍ LO QUIERO →
          </button>
        </div>
      </div>
    </div>
  )
}

