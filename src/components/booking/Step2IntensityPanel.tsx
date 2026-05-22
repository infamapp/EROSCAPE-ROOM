'use client'

import type { LucideIcon } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Flame, Sparkles, Swords, X } from 'lucide-react'
import { useMemo, useState } from 'react'

import { BookingBottomBar } from '@/components/booking/BookingBottomBar'
import { BookingFlowHeader } from '@/components/booking/BookingFlowHeader'
import { BookingSelectionDetail } from '@/components/booking/BookingSelectionDetail'
import { INTENSITY_BOOKING_OPTIONS, STEP2_INTENSITY_COPY } from '@/lib/booking-intensity-copy'
import {
  getBookingExperiencePrice,
  getExperienceBasePrice,
  getIntensitySurcharge,
} from '@/lib/booking-pricing'
import { cn, formatCurrency } from '@/lib/utils'
import type { IntensityLevel } from '@/types/booking'

const SENSUAL_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

const INTENSITY_ICONS: Record<IntensityLevel, LucideIcon> = {
  bajo: Sparkles,
  medio: Flame,
  turbio: Swords,
}

const INTENSITY_ACCENT: Record<IntensityLevel, string> = {
  bajo: 'var(--color-intensity-alpha)',
  medio: 'var(--color-intensity-beta)',
  turbio: 'var(--color-intensity-omega)',
}

function intensityOverlay(level: IntensityLevel | null): string {
  if (level === 'bajo') return 'var(--gradient-alpha)'
  if (level === 'medio') return 'var(--gradient-beta)'
  if (level === 'turbio') return 'var(--gradient-omega)'
  return 'transparent'
}

export interface Step2IntensityPanelProps {
  experienceSlug: string | undefined
  intensityLevel: IntensityLevel | null
  onSelectIntensity: (level: IntensityLevel) => void
  onBack: () => void
  onNext: () => void
}

interface IntensityCardProps {
  level: IntensityLevel
  missionLevel: string
  title: string
  descriptor: string
  priceLabel: string
  isSelected: boolean
  onSelect: (level: IntensityLevel) => void
}

function IntensityCard({
  level,
  missionLevel,
  title,
  descriptor,
  priceLabel,
  isSelected,
  onSelect,
}: IntensityCardProps) {
  const Icon = INTENSITY_ICONS[level]
  const accentVar = INTENSITY_ACCENT[level]

  return (
    <button
      type="button"
      onClick={() => onSelect(level)}
      className={cn(
        'flex w-full flex-col rounded-lg border px-4 py-3.5 text-left transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta)',
        isSelected
          ? 'border-(--color-magenta)/65 bg-(--color-bg-elevated) [box-shadow:var(--glow-magenta)]'
          : 'border-white/10 bg-(--color-bg-elevated)/70 hover:border-white/20',
      )}
      aria-pressed={isSelected}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="font-(--font-jetbrains) text-[10px] tracking-[0.16em]" style={{ color: accentVar }}>
          {missionLevel}
        </p>
        <Icon className="h-5 w-5 shrink-0" style={{ color: accentVar }} aria-hidden="true" />
      </div>
      <p className="mt-2 font-(--font-playfair) text-base text-white sm:text-lg">{title}</p>
      <p className="mt-1.5 flex-1 font-(--font-inter) text-xs leading-relaxed text-(--color-text-secondary) sm:text-sm">
        {descriptor}
      </p>
      <p className="mt-3 font-(--font-playfair) text-sm text-(--color-gold) sm:text-base">{priceLabel}</p>
    </button>
  )
}

export function Step2IntensityPanel({
  experienceSlug,
  intensityLevel,
  onSelectIntensity,
  onBack,
  onNext,
}: Step2IntensityPanelProps) {
  const shouldReduceMotion = useReducedMotion()
  const [gmDismissed, setGmDismissed] = useState(false)

  const basePrice = getExperienceBasePrice(experienceSlug)
  const canContinue = Boolean(intensityLevel)
  const totalPrice = getBookingExperiencePrice(experienceSlug, intensityLevel)

  const cards = useMemo(
    () =>
      INTENSITY_BOOKING_OPTIONS.map((opt) => {
        const surcharge = getIntensitySurcharge(opt.level)
        const total = basePrice + surcharge
        const priceLabel =
          surcharge === 0
            ? formatCurrency(total)
            : `${formatCurrency(total)} (+${formatCurrency(surcharge)})`
        return { ...opt, priceLabel }
      }),
    [basePrice],
  )

  const selectedOption = useMemo(
    () => INTENSITY_BOOKING_OPTIONS.find((o) => o.level === intensityLevel),
    [intensityLevel],
  )

  const showGm = intensityLevel === 'turbio' && !gmDismissed

  return (
    <div className="relative mx-auto w-full max-w-[94rem] px-4 pt-1 sm:px-8 lg:px-10">
      <AnimatePresence initial={false}>
        {intensityLevel ? (
          <motion.div
            key={intensityLevel}
            className="pointer-events-none absolute inset-0 z-0"
            style={{ background: intensityOverlay(intensityLevel) }}
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={shouldReduceMotion ? undefined : { opacity: 0.35 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.6, ease: SENSUAL_EASE }}
          />
        ) : null}
      </AnimatePresence>

      <div className="relative z-10">
        <BookingFlowHeader
          actLabel="II"
          title={STEP2_INTENSITY_COPY.title}
          subtitle={STEP2_INTENSITY_COPY.subtitle}
        />

        <section className="mt-4 rounded-2xl border border-white/12 bg-(--color-bg-subtle) p-4">
          <h3 className="font-(--font-jetbrains) text-[10px] uppercase tracking-[0.2em] text-(--color-text-secondary)">
            Temperatura de la noche
          </h3>

          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {cards.map((card) => (
              <IntensityCard
                key={card.level}
                level={card.level}
                missionLevel={card.missionLevel}
                title={card.title}
                descriptor={card.descriptor}
                priceLabel={card.priceLabel}
                isSelected={intensityLevel === card.level}
                onSelect={onSelectIntensity}
              />
            ))}
          </div>

          {selectedOption ? (
            <BookingSelectionDetail
              dense
              className="mt-3"
              label="Intensidad elegida"
              title={selectedOption.title}
              summary={selectedOption.descriptor}
              meta={
                <p className="font-(--font-inter) text-xs text-(--color-text-secondary)">
                  {selectedOption.hint} · Total experiencia:{' '}
                  <span className="text-(--color-gold)">{formatCurrency(totalPrice)}</span>
                </p>
              }
            />
          ) : null}

          <AnimatePresence>
            {showGm ? (
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, height: 0 }}
                animate={shouldReduceMotion ? undefined : { opacity: 1, height: 'auto' }}
                exit={shouldReduceMotion ? undefined : { opacity: 0, height: 0 }}
                className="relative mt-3 overflow-hidden rounded-xl border border-l-[3px] border-white/12 border-l-(--color-gm-alert) bg-(--color-bg-elevated) p-3"
              >
                <button
                  type="button"
                  className="absolute right-2 top-2 rounded-full p-1"
                  aria-label="Cerrar mensaje"
                  onClick={() => setGmDismissed(true)}
                >
                  <X className="h-4 w-4 text-(--color-text-secondary)" />
                </button>
                <p className="font-(--font-jetbrains) text-[10px] text-(--color-gm-terminal)">GAME_MASTER_IA &gt;</p>
                <p className="mt-1.5 font-(--font-inter) text-xs leading-relaxed text-(--color-text-secondary)">
                  Sin límites elegido. La IA autómata ajustará ritmo y ambiente en un ámbito privado. Tu palabra segura
                  llega en el juramento; solo entonces habrá asistente humano por voz si lo necesitáis.
                </p>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </section>
      </div>

      <BookingBottomBar
        currentStep={2}
        isValid={canContinue}
        showBack
        nextLabel="SIGUIENTE →"
        maxWidthClass="max-w-[94rem]"
        subtotal={canContinue ? totalPrice : undefined}
        onBack={onBack}
        onNext={onNext}
      />
    </div>
  )
}
