'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import { CITIES, DEFAULT_CITY_SLUG, EXPERIENCES_TEMPLATE, isCityBookable } from '@/lib/constants'
import {
  clearBookingPrefillSession,
  mergeBookingPrefillIntoStep1,
  parseBookingPrefillFromSearchParams,
  readBookingPrefillFromSession,
} from '@/lib/booking-prefill'
import { getCityBookingSummary, getExperienceBookingSummary } from '@/lib/booking-selection-copy'
import { getMonthStart, isExperienceCalendarDayAvailable } from '@/lib/experience-calendar'
import { cn, formatCurrency } from '@/lib/utils'
import { useBookingFlow } from '@/hooks/useBookingFlow'
import { BookingBottomBar } from '@/components/booking/BookingBottomBar'
import { BookingFlowHeader } from '@/components/booking/BookingFlowHeader'
import { BookingCalendarPanel } from '@/components/booking/BookingCalendarPanel'
import { BookingSelectionDetail } from '@/components/booking/BookingSelectionDetail'
import { BookingTimePanel } from '@/components/booking/BookingTimePanel'

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

export function Step1Selection() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { state, updateStep1, isStepValid, isHydrated } = useBookingFlow()
  const prefillAppliedRef = useRef(false)

  const selectedCity = (state.step1.citySlug as CitySlug | undefined) ?? DEFAULT_CITY_SLUG
  const selectedExp = state.step1.experienceSlug as ExperienceSlug | undefined
  const selectedDate = state.step1.date
  const selectedTime = state.step1.timeSlot

  const [monthCursor, setMonthCursor] = useState(() => getMonthStart(new Date()))

  const citySummary = useMemo(() => getCityBookingSummary(selectedCity), [selectedCity])
  const experienceSummary = useMemo(
    () => (selectedExp ? getExperienceBookingSummary(selectedExp) : null),
    [selectedExp],
  )

  const urlCiudad = searchParams.get('ciudad')
  const urlSala = searchParams.get('sala')

  useEffect(() => {
    if (!isHydrated) return

    const fromUrl = parseBookingPrefillFromSearchParams(searchParams)
    const fromSession = readBookingPrefillFromSession()

    if (!fromUrl && !fromSession) return
    if (!fromUrl && prefillAppliedRef.current) return

    const prefill = fromUrl ?? fromSession
    if (!prefill) return

    const patch = mergeBookingPrefillIntoStep1(state.step1, prefill)
    if (Object.keys(patch).length > 0) {
      updateStep1(patch)
    }

    clearBookingPrefillSession()
    if (!fromUrl) prefillAppliedRef.current = true

    if (fromUrl && (urlCiudad || urlSala)) {
      router.replace('/reservar?step=1', { scroll: false })
    }
  }, [isHydrated, router, searchParams, state.step1, updateStep1, urlCiudad, urlSala])

  const canContinue = isStepValid(1)
  const canPickDate = Boolean(selectedExp)
  const canPickTime = Boolean(selectedDate)

  const handleSelectCity = (slug: CitySlug) => {
    const city = CITIES.find((c) => c.slug === slug)
    if (!city || !isCityBookable(city)) return
    if (slug === selectedCity) return
    updateStep1({ citySlug: slug, date: undefined, timeSlot: undefined })
  }

  const handleSelectExperience = (slug: ExperienceSlug) => {
    updateStep1({ experienceSlug: slug, citySlug: selectedCity })
  }

  const handlePickDate = (day: number) => {
    if (!canPickDate) return
    const date = new Date(monthCursor.getFullYear(), monthCursor.getMonth(), day)
    if (!isExperienceCalendarDayAvailable(date)) return
    const iso = date.toISOString().slice(0, 10)
    updateStep1({ date: iso, timeSlot: undefined })
  }

  const handlePickTime = (slot: (typeof TIME_SLOTS)[number]) => {
    if (!canPickTime || !isTimeSlotAvailable(selectedDate, slot)) return
    updateStep1({ timeSlot: slot })
  }

  return (
    <div className="booking-step1-shell mx-auto flex w-full max-w-[94rem] flex-col px-4 sm:px-8 lg:px-10">
      <BookingFlowHeader actLabel="I" title="¿Dónde y cuándo?" />

      <div className="booking-step1-stage grid min-h-0 flex-1 gap-4 lg:grid-cols-[minmax(0,3fr)_minmax(220px,1fr)] lg:gap-6">
        {/* 75% — Lugar + Experiencia apilados */}
        <div className="flex min-h-0 flex-col gap-4 overflow-hidden">
          <section
            className="shrink-0 rounded-2xl border border-white/12 bg-(--color-bg-subtle) p-4"
            aria-labelledby="booking-lugar-heading"
          >
            <h3
              id="booking-lugar-heading"
              className="font-(--font-jetbrains) text-[10px] uppercase tracking-[0.2em] text-(--color-text-secondary)"
            >
              Lugar
            </h3>

            <div className="mt-3 flex flex-wrap gap-2">
              {CITIES.map((c) => {
                const isActive = c.slug === selectedCity
                const bookable = isCityBookable(c)
                return (
                  <button
                    key={c.slug}
                    type="button"
                    disabled={!bookable}
                    onClick={() => handleSelectCity(c.slug)}
                    className={cn(
                      'rounded-full border px-3 py-1.5 transition-colors',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta)',
                      !bookable && 'cursor-not-allowed border-dashed border-white/10 opacity-45',
                      bookable && !isActive && 'border-white/16 bg-(--color-bg-elevated) hover:border-(--color-magenta)/40',
                      bookable &&
                        isActive &&
                        'border-(--color-magenta)/65 bg-(--color-bg-elevated) [box-shadow:var(--glow-magenta)]',
                    )}
                    aria-pressed={isActive}
                  >
                    <span className="font-(--font-playfair) text-sm text-white">{c.displayName}</span>
                    {!bookable ? (
                      <span className="ml-1.5 font-(--font-inter) text-[10px] text-(--color-text-muted)">· pronto</span>
                    ) : null}
                  </button>
                )
              })}
            </div>

            {citySummary ? (
              <div className="mt-3 rounded-xl border border-white/10 bg-(--color-bg-elevated) px-3 py-2.5">
                <p className="font-(--font-playfair) text-base text-white">{citySummary.title}</p>
                <p className="mt-1 font-(--font-inter) text-sm leading-relaxed text-(--color-text-secondary)">
                  {citySummary.summary}
                </p>
              </div>
            ) : null}
          </section>

          <section
            className="flex min-h-0 flex-1 flex-col rounded-2xl border border-white/12 bg-(--color-bg-subtle) p-4"
            aria-labelledby="booking-experiencia-heading"
          >
            <h3
              id="booking-experiencia-heading"
              className="shrink-0 font-(--font-jetbrains) text-[10px] uppercase tracking-[0.2em] text-(--color-text-secondary)"
            >
              Experiencia
            </h3>

            <div
              className="mt-3 min-h-0 flex-1 overflow-y-auto overscroll-contain"
              role="listbox"
              aria-label="Experiencias"
            >
              <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 lg:grid-cols-3">
                {EXPERIENCES_TEMPLATE.map((exp) => {
                  const isSelected = exp.slug === selectedExp
                  const summary = getExperienceBookingSummary(exp.slug)
                  return (
                    <button
                      key={exp.slug}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => handleSelectExperience(exp.slug)}
                      className={cn(
                        'flex items-center justify-between gap-2 rounded-lg border px-3 py-2 text-left transition-colors',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta)',
                        isSelected
                          ? 'border-(--color-magenta)/65 bg-(--color-bg-elevated) [box-shadow:var(--glow-magenta)]'
                          : 'border-white/10 bg-(--color-bg-elevated)/70 hover:border-white/20',
                      )}
                    >
                      <div className="min-w-0">
                        <p className="truncate font-(--font-playfair) text-[13px] text-white">{exp.title}</p>
                        <p className="truncate font-(--font-inter) text-[10px] text-(--color-text-muted)">
                          {summary?.intensityLabel}
                        </p>
                      </div>
                      <span className="shrink-0 font-(--font-playfair) text-xs text-(--color-gold)">
                        {formatCurrency(exp.basePrice)}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {experienceSummary ? (
              <BookingSelectionDetail
                dense
                className="mt-3 shrink-0"
                label="Tu sala"
                title={experienceSummary.title}
                summary={experienceSummary.summary}
                meta={
                  <p className="line-clamp-2 font-(--font-inter) text-xs leading-relaxed text-(--color-text-secondary)">
                    {experienceSummary.detail}
                  </p>
                }
              />
            ) : (
              <p className="mt-3 shrink-0 font-(--font-inter) text-xs text-(--color-text-muted)">
                Elige una experiencia para continuar con fecha y hora.
              </p>
            )}
          </section>
        </div>

        {/* 25% — Calendario + horarios */}
        <aside
          className="flex min-h-0 flex-col gap-3 rounded-2xl border border-white/12 bg-(--color-bg-subtle) p-3 lg:p-4"
          aria-label="Fecha y hora"
        >
          <h3 className="shrink-0 font-(--font-jetbrains) text-[10px] uppercase tracking-[0.2em] text-(--color-text-secondary)">
            Cuándo
          </h3>

          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
            <BookingCalendarPanel
              narrow
              monthCursor={monthCursor}
              onMonthChange={setMonthCursor}
              selectedDate={selectedDate}
              disabled={!canPickDate}
              onPickDate={handlePickDate}
            />
          </div>

          <div className="shrink-0 border-t border-white/10 pt-3">
            <p className="mb-2 font-(--font-jetbrains) text-[9px] uppercase tracking-[0.16em] text-(--color-text-muted)">
              Horarios
            </p>
            <BookingTimePanel
              stacked
              timeSlots={TIME_SLOTS}
              selectedTime={selectedTime}
              disabled={!canPickTime}
              isSlotAvailable={(slot) =>
                isTimeSlotAvailable(selectedDate, slot as (typeof TIME_SLOTS)[number])
              }
              onPickTime={(slot) => handlePickTime(slot as (typeof TIME_SLOTS)[number])}
            />
          </div>
        </aside>
      </div>

      <BookingBottomBar
        currentStep={1}
        isValid={canContinue}
        showBack
        maxWidthClass="max-w-[94rem]"
        onBack={() => router.push('/')}
        onNext={() => {
          if (canContinue) router.push('/reservar?step=2')
        }}
        subtotal={experienceSummary?.priceFrom}
        className="shrink-0"
      />
    </div>
  )
}
