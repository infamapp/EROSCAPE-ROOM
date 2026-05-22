'use client'

import type { LucideIcon } from 'lucide-react'
import { Heart, Infinity as InfinityIcon, Plus, Users, Zap } from 'lucide-react'
import { useMemo } from 'react'

import { BookingBottomBar } from '@/components/booking/BookingBottomBar'
import { BookingFlowHeader } from '@/components/booking/BookingFlowHeader'
import { BookingSelectionDetail } from '@/components/booking/BookingSelectionDetail'
import {
  areParticipantNamesValid,
  getParticipantLimits,
  PARTICIPANT_LIMITS,
  resizeParticipantNames,
} from '@/lib/booking-participants'
import { getCompanyTypeDetail } from '@/lib/booking-company-copy'
import { STEP2_DESIRES_COPY } from '@/lib/booking-intensity-copy'
import { COMPANY_TYPES } from '@/lib/constants'
import { cn } from '@/lib/utils'
import type { BookingStep2, CompanyType } from '@/types/booking'

const COMPANY_ICON_MAP: Record<CompanyType, LucideIcon> = {
  pareja: Heart,
  rollete: Zap,
  'plan-golfo': Users,
  swinger: InfinityIcon,
}

export interface Step2DesiresPanelProps {
  companyType: CompanyType | null
  names: string[]
  language: BookingStep2['language']
  onUpdate: (data: Partial<BookingStep2>) => void
  onBack: () => void
  onContinue: () => void
}

export function Step2DesiresPanel({
  companyType,
  names,
  language,
  onUpdate,
  onBack,
  onContinue,
}: Step2DesiresPanelProps) {
  const participantLimits = getParticipantLimits(companyType)
  const nameFieldCount = participantLimits ? names.length : 0
  const canAddParticipant = participantLimits ? names.length < participantLimits.max : false
  const canContinue = Boolean(companyType && areParticipantNamesValid(companyType, names))

  const selectedCompany = useMemo(
    () => (companyType ? COMPANY_TYPES.find((c) => c.id === companyType) : null),
    [companyType],
  )

  const handleCompanySelect = (id: CompanyType) => {
    const limits = PARTICIPANT_LIMITS[id]
    onUpdate({
      companyType: id,
      names: resizeParticipantNames(names, limits),
    })
  }

  return (
    <div className="mx-auto w-full max-w-[94rem] px-4 pt-1 sm:px-8 lg:px-10">
      <BookingFlowHeader
        actLabel="II"
        title={STEP2_DESIRES_COPY.title}
        subtitle={STEP2_DESIRES_COPY.subtitle}
      />

      <div className="mt-4 grid gap-4 lg:grid-cols-2 lg:items-start lg:gap-6">
        <section
          className="shrink-0 rounded-2xl border border-white/12 bg-(--color-bg-subtle) p-4"
          aria-labelledby="step2-company-heading"
        >
          <h3
            id="step2-company-heading"
            className="font-(--font-jetbrains) text-[10px] uppercase tracking-[0.2em] text-(--color-text-secondary)"
          >
            {STEP2_DESIRES_COPY.companyHeading}
          </h3>

          <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {COMPANY_TYPES.map((c) => {
              const isSelected = companyType === c.id
              const Icon = COMPANY_ICON_MAP[c.id]
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => handleCompanySelect(c.id)}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-lg border px-3 py-2.5 text-left transition-colors',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta)',
                    isSelected
                      ? 'border-(--color-magenta)/65 bg-(--color-bg-elevated) [box-shadow:var(--glow-magenta)]'
                      : 'border-white/10 bg-(--color-bg-elevated)/70 hover:border-white/20',
                  )}
                  aria-pressed={isSelected}
                >
                  <Icon className="h-5 w-5 shrink-0 text-(--color-magenta-glow)" aria-hidden="true" />
                  <div className="min-w-0">
                    <p className="font-(--font-playfair) text-[15px] text-white">{c.label}</p>
                    <p className="mt-0.5 font-(--font-inter) text-xs text-(--color-text-muted)">{c.description}</p>
                  </div>
                </button>
              )
            })}
          </div>

          {selectedCompany && companyType ? (
            <BookingSelectionDetail
              dense
              className="mt-3"
              label="Con quién venís"
              title={selectedCompany.label}
              summary={getCompanyTypeDetail(companyType)}
            />
          ) : (
            <p className="mt-3 font-(--font-inter) text-xs text-(--color-text-muted)">
              Elegí una opción para ver el detalle.
            </p>
          )}
        </section>

        <section
          className="shrink-0 rounded-2xl border border-white/12 bg-(--color-bg-subtle) p-4"
          aria-labelledby="step2-names-heading"
        >
          <h3
            id="step2-names-heading"
            className="font-(--font-jetbrains) text-[10px] uppercase tracking-[0.2em] text-(--color-text-secondary)"
          >
            {STEP2_DESIRES_COPY.namesHeading}
          </h3>

          {nameFieldCount === 0 ? (
            <p className="mt-3 font-(--font-inter) text-sm text-(--color-text-muted)">
              Elegí con quién venís para continuar.
            </p>
          ) : (
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {Array.from({ length: nameFieldCount }).map((_, idx) => (
                <div key={idx}>
                  <label
                    htmlFor={`participant-name-${idx}`}
                    className="mb-1 block font-(--font-jetbrains) text-[10px] uppercase tracking-[0.14em] text-(--color-text-muted)"
                  >
                    {nameFieldCount === 1 ? 'Participante' : `Participante ${idx + 1}`}
                  </label>
                  <input
                    id={`participant-name-${idx}`}
                    value={names[idx] ?? ''}
                    onChange={(e) => {
                      const next = [...names]
                      next[idx] = e.target.value
                      onUpdate({ names: next })
                    }}
                    placeholder="Nombre o apodo…"
                    className="w-full rounded-lg border border-white/12 bg-(--color-bg-elevated) px-3 py-2.5 font-(--font-inter) text-sm text-white placeholder:text-(--color-text-muted) focus-visible:border-(--color-magenta) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta)"
                  />
                </div>
              ))}

              {canAddParticipant ? (
                <div className={cn(nameFieldCount % 2 === 1 ? 'md:col-span-2' : '')}>
                  <button
                    type="button"
                    onClick={() => onUpdate({ names: [...names, ''] })}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-(--color-bg-elevated) px-4 py-2 font-(--font-jetbrains) text-[10px] uppercase tracking-[0.14em] text-(--color-text-secondary) transition-colors hover:border-(--color-magenta)/45"
                  >
                    <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                    Añadir participante ({names.length}/{participantLimits?.max})
                  </button>
                </div>
              ) : null}
            </div>
          )}

          <div className="mt-5 border-t border-white/10 pt-4">
            <label
              htmlFor="booking-language"
              className="font-(--font-jetbrains) text-[10px] uppercase tracking-[0.2em] text-(--color-text-secondary)"
            >
              {STEP2_DESIRES_COPY.languageHeading}
            </label>
            <select
              id="booking-language"
              value={language}
              onChange={(e) => {
                const v = e.target.value
                if (v === 'es' || v === 'en' || v === 'fr') onUpdate({ language: v })
              }}
              className="mt-2 w-full max-w-xs rounded-lg border border-white/12 bg-(--color-bg-elevated) px-3 py-2.5 font-(--font-inter) text-sm text-white focus-visible:border-(--color-magenta) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta)"
            >
              <option value="es">Español</option>
              <option value="en">English</option>
              <option value="fr">Français</option>
            </select>
          </div>
        </section>
      </div>

      <BookingBottomBar
        currentStep={2}
        isValid={canContinue}
        showBack
        nextLabel="CONTINUAR →"
        maxWidthClass="max-w-[94rem]"
        onBack={onBack}
        onNext={onContinue}
      />
    </div>
  )
}
