'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'

import { CITIES, EXPERIENCES_TEMPLATE } from '@/lib/constants'
import {
  formatMonthTitleEsUpper,
  getDaysInMonth,
  getMonthStart,
  getWeekdayIndexMon0,
  isExperienceCalendarDayAvailable,
} from '@/lib/experience-calendar'
import { cn, formatCurrency } from '@/lib/utils'
import { useBookingFlow } from '@/hooks/useBookingFlow'
import { StepHeader } from '@/components/booking/StepHeader'
import { CityMap } from '@/components/ui/CityMap'
import { BookingBottomBar } from '@/components/booking/BookingBottomBar'

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

function isTimeSlotAvailable(dateIso: string | undefined, slot: (typeof TIME_SLOTS)[number]): boolean {
  if (!dateIso) return false
  const day = Number(dateIso.slice(-2))
  if (!Number.isFinite(day)) return true
  if (slot === '23:00') return day % 2 === 0
  return true
}

type CitySlug = (typeof CITIES)[number]['slug']
type ExperienceSlug = (typeof EXPERIENCES_TEMPLATE)[number]['slug']

interface PrefillPayload {
  citySlug?: unknown
  experienceSlug?: unknown
}

function isCitySlug(value: unknown): value is CitySlug {
  return typeof value === 'string' && CITIES.some((c) => c.slug === value)
}

function isExperienceSlug(value: unknown): value is ExperienceSlug {
  return typeof value === 'string' && EXPERIENCES_TEMPLATE.some((e) => e.slug === value)
}

export function Step1Selection() {
  const shouldReduceMotion = useReducedMotion()
  const router = useRouter()
  const { state, updateStep1, isStepValid } = useBookingFlow()

  const selectedCity = (state.step1.citySlug as CitySlug | undefined) ?? 'madrid'
  const selectedExp = state.step1.experienceSlug as ExperienceSlug | undefined
  const selectedDate = state.step1.date
  const selectedTime = state.step1.timeSlot

  const [monthCursor, setMonthCursor] = useState(() => getMonthStart(new Date()))

  const cityData = useMemo(() => CITIES.find((c) => c.slug === selectedCity) ?? CITIES[0], [selectedCity])

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('eroscape_booking_prefill')
      if (!raw) return
      const parsed: unknown = JSON.parse(raw)
      const payload = parsed as PrefillPayload

      const nextCity = isCitySlug(payload.citySlug) ? payload.citySlug : null
      const nextExp = isExperienceSlug(payload.experienceSlug) ? payload.experienceSlug : null

      if (nextCity || nextExp) {
        updateStep1({
          citySlug: nextCity ?? selectedCity,
          experienceSlug: nextExp ?? selectedExp,
        })
      }
      sessionStorage.removeItem('eroscape_booking_prefill')
    } catch {
      // ignore
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const monthDays = useMemo(() => {
    const days = getDaysInMonth(monthCursor)
    const start = getWeekdayIndexMon0(monthCursor)
    return { days, start }
  }, [monthCursor])

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
    if (!isExperienceCalendarDayAvailable(date)) return
    const iso = date.toISOString().slice(0, 10)
    updateStep1({ date: iso, timeSlot: undefined })
  }

  const handlePickTime = (slot: (typeof TIME_SLOTS)[number]) => {
    if (!isTimeSlotAvailable(selectedDate, slot)) return
    updateStep1({ timeSlot: slot })
  }

  const handleNext = () => {
    if (!canContinue) return
    router.push('/reservar?step=2')
  }

  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 sm:pb-24">
      <StepHeader actLabel="I" title="¿DÓNDE QUIERES QUE OCURRA?" />

      {/* Top: mapa (izq) + selector de ciudad (der) */}
      <section className="mt-6 grid gap-5 sm:mt-8 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <div
            className="rounded-3xl border-(--border-subtle) bg-(--color-bg-elevated) px-3 py-4 [box-shadow:var(--glow-card)] sm:px-4 sm:py-5"
            style={{
              background:
                'radial-gradient(ellipse 90% 70% at 50% 30%, color-mix(in srgb, var(--color-magenta) 10%, transparent) 0%, transparent 55%), var(--color-bg-elevated)',
            }}
          >
            <div className="mx-auto w-full max-w-[520px] lg:max-w-none">
              <CityMap
                className="w-full"
                cities={CITIES}
                activeCitySlug={selectedCity}
                onSelectCity={(slug) => handleSelectCity(slug as CitySlug)}
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-3xl border-(--border-subtle) bg-(--color-bg-elevated) p-5 [box-shadow:var(--glow-card)] sm:p-6">
            <div className="text-center">
              <p className="font-(--font-jetbrains) text-[10px] uppercase tracking-[0.22em] text-(--color-text-muted) sm:text-[11px]">
                CIUDAD
              </p>
              <p className="mt-3 text-2xl font-bold tracking-[0.06em] text-(--color-text-primary) [font-family:var(--font-playfair)] sm:text-3xl">
                {cityData.displayName}
              </p>
              <p className="mt-3 font-(--font-inter) text-sm leading-relaxed text-(--color-text-secondary)">
                Elegí el escenario. El resto se revela cuando estés listo.
              </p>
            </div>

            <div className="mt-5 flex gap-2.5 overflow-x-auto pb-2 sm:mt-6 sm:gap-3 lg:flex-wrap lg:justify-center">
              {CITIES.map((c) => {
                const isActive = c.slug === selectedCity
                return (
                  <motion.button
                    key={c.slug}
                    type="button"
                    variants={pillPulse}
                    whileTap={shouldReduceMotion ? undefined : 'tap'}
                    onClick={() => handleSelectCity(c.slug)}
                    className={cn(
                      'shrink-0 rounded-full px-4 py-1.5 text-xs transition-colors sm:px-5 sm:py-2 sm:text-sm',
                      'focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg-base)',
                    )}
                    style={{
                      background: isActive ? 'var(--gradient-cta)' : 'var(--color-bg-elevated)',
                      color: isActive ? 'white' : 'var(--color-text-muted)',
                      boxShadow: isActive ? 'var(--glow-magenta)' : 'none',
                      border: isActive
                        ? '1px solid color-mix(in srgb, var(--color-magenta) 55%, transparent)'
                        : '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    {c.displayName}
                  </motion.button>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Abajo: cards de salas */}
      <section className="mt-8 sm:mt-10">
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
                  className="relative text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg-base)"
                >
                  <div
                    className={cn('rounded-2xl p-4 transition-transform sm:p-5')}
                    style={{
                      background: 'var(--color-bg-elevated)',
                      border: isSelected ? '1px solid rgba(185,48,158,0.75)' : 'var(--border-subtle)',
                      boxShadow: isSelected ? 'var(--glow-magenta)' : 'var(--glow-card)',
                    }}
                  >
                    {isSelected ? (
                      <div className="absolute right-4 top-3">
                        <CheckCircle2 className="h-5 w-5 text-(--color-magenta-glow)" aria-hidden="true" />
                      </div>
                    ) : null}

                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="mt-3 font-(--font-playfair) text-[15px] text-white sm:text-base">{exp.title}</div>
                      </div>

                      <div
                        className="shrink-0 rounded-full px-2.5 py-1 font-(--font-jetbrains) text-[9px] tracking-[0.16em] sm:px-3 sm:text-[10px]"
                        style={{
                          color:
                            exp.missionLevel === 'OMEGA'
                              ? 'var(--color-omega-badge, var(--color-text-secondary))'
                              : 'var(--color-text-secondary)',
                          background:
                            exp.missionLevel === 'ALPHA'
                              ? 'color-mix(in srgb, var(--color-intensity-alpha) 18%, transparent)'
                              : exp.missionLevel === 'BETA'
                                ? 'color-mix(in srgb, var(--color-intensity-beta) 18%, transparent)'
                                : 'color-mix(in srgb, var(--color-intensity-omega) 18%, transparent)',
                          border:
                            exp.missionLevel === 'OMEGA'
                              ? '1px solid color-mix(in srgb, var(--color-intensity-omega) 45%, transparent)'
                              : '1px solid rgba(255,255,255,0.08)',
                        }}
                      >
                        {intensityLabel}
                      </div>
                    </div>

                    <div className="mt-4 flex items-end justify-between gap-3">
                      <div className="font-(--font-playfair) text-base sm:text-lg" style={{ color: 'var(--color-gold)' }}>
                        Desde {formatCurrency(exp.basePrice)}
                      </div>
                      <div
                        className="rounded-full px-3 py-1.5 text-[11px] font-(--font-jetbrains) tracking-[0.18em] sm:px-4 sm:py-2 sm:text-xs"
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
      </section>

      {/* Abajo: calendario y horario */}
      <section className="mt-10 grid gap-8 sm:mt-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <div className="font-(--font-jetbrains) text-xs tracking-[0.2em] uppercase" style={{ color: 'var(--color-text-muted)' }}>
            AGENDA
          </div>

          <div
            className="mt-4 rounded-2xl p-3 sm:p-4"
            style={{ background: 'var(--color-bg-elevated)', border: 'var(--border-subtle)', boxShadow: 'var(--glow-card)' }}
          >
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
              <div className="font-(--font-jetbrains) text-xs tracking-[0.18em]" style={{ color: 'var(--color-text-secondary)' }}>
                {formatMonthTitleEsUpper(monthCursor)}
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
                const available = isExperienceCalendarDayAvailable(date)
                const iso = date.toISOString().slice(0, 10)
                const isSelected = selectedDate === iso

                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => handlePickDate(day)}
                    disabled={!available}
                    className="relative flex h-9 w-9 items-center justify-center rounded-full text-sm sm:h-10 sm:w-10"
                    style={{
                      color: available ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
                      border: available ? '1px solid rgba(185,48,158,0.25)' : '1px solid rgba(255,255,255,0.06)',
                      background: isSelected ? 'var(--gradient-cta)' : 'transparent',
                      cursor: available ? 'pointer' : 'not-allowed',
                      fontWeight: isSelected ? 700 : 400,
                    }}
                  >
                    {day}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="font-(--font-jetbrains) text-xs tracking-[0.2em] uppercase" style={{ color: 'var(--color-text-muted)' }}>
            ¿A QUÉ HORA EMPIEZA TODO?
          </div>

          <div className="mt-4 rounded-2xl p-4" style={{ background: 'var(--color-bg-elevated)', border: 'var(--border-subtle)', boxShadow: 'var(--glow-card)' }}>
            <div className="grid grid-cols-3 gap-3">
              {TIME_SLOTS.map((slot) => {
                const available = isTimeSlotAvailable(selectedDate, slot)
                const isSelected = selectedTime === slot

                return (
                  <button
                    key={slot}
                    type="button"
                    disabled={!available}
                    onClick={() => handlePickTime(slot)}
                    className="rounded-full px-3 py-2.5 text-center font-(--font-jetbrains) text-[11px] tracking-[0.18em] sm:px-4 sm:py-3 sm:text-xs"
                    style={{
                      background: isSelected ? 'var(--color-magenta)' : 'transparent',
                      color: available ? (isSelected ? 'white' : 'var(--color-text-secondary)') : 'var(--color-text-muted)',
                      border: isSelected ? '1px solid rgba(185,48,158,0.85)' : '1px solid rgba(185,48,158,0.35)',
                      cursor: available ? 'pointer' : 'not-allowed',
                      opacity: available ? 1 : 0.5,
                    }}
                  >
                    {available ? slot : 'COMPLETO'}
                  </button>
                )
              })}
            </div>
            <p className="mt-4 text-center font-(--font-inter) text-xs text-(--color-text-muted)">
              Elegí fecha y horario para sellar el inicio.
            </p>
          </div>
        </div>
      </section>

      <BookingBottomBar
        currentStep={1}
        isValid={canContinue}
        onBack={() => router.push('/')}
        onNext={handleNext}
      />
    </div>
  )
}

