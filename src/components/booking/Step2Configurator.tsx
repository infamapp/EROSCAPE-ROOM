'use client'

import type { LucideIcon } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Flame, Heart, Infinity as InfinityIcon, Sparkles, Swords, Users, X, Zap } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

import { StepHeader } from '@/components/booking/StepHeader'
import { useBookingFlow } from '@/hooks/useBookingFlow'
import { useTextScramble } from '@/hooks/useTextScramble'
import { getPlayerArchetype } from '@/lib/archetype'
import { COMPANY_TYPES } from '@/lib/constants'
import { cn } from '@/lib/utils'
import type { BookingState, BookingStep2, CompanyType, IntensityLevel, MissionLevel } from '@/types/booking'

const SENSUAL_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

const gmCardVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: 'auto', transition: { duration: 0.4, ease: SENSUAL_EASE } },
  exit: { opacity: 0, height: 0, transition: { duration: 0.35, ease: SENSUAL_EASE } },
} as const

const archetypePreviewVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: SENSUAL_EASE } },
  exit: { opacity: 0, y: 12, transition: { duration: 0.25, ease: SENSUAL_EASE } },
} as const

const archetypeNameVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.25, ease: SENSUAL_EASE } },
  exit: { opacity: 0, transition: { duration: 0.2, ease: SENSUAL_EASE } },
} as const

const COMPANY_ICON_MAP: Record<CompanyType, LucideIcon> = {
  pareja: Heart,
  rollete: Zap,
  'plan-golfo': Users,
  swinger: InfinityIcon,
}

interface OmegaGmMessageProps {
  text: string
  shouldReduceMotion: boolean
  replayToken: number
}

function OmegaGmMessage({ text, shouldReduceMotion, replayToken }: OmegaGmMessageProps) {
  const { displayText, isComplete } = useTextScramble({
    text,
    trigger: true,
    speed: 35,
    scrambleDuration: 900,
    replayToken,
  })

  return (
    <>
      {shouldReduceMotion ? text : displayText}
      {!shouldReduceMotion && isComplete ? (
        <motion.span
          className="inline-block"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.9, repeat: Infinity, ease: SENSUAL_EASE }}
          aria-hidden="true"
        >
          _
        </motion.span>
      ) : null}
    </>
  )
}

function getIntensityGradient(level: IntensityLevel | null): string {
  if (level === 'bajo') return 'var(--gradient-alpha)'
  if (level === 'medio') return 'var(--gradient-beta)'
  if (level === 'turbio') return 'var(--gradient-omega)'
  return 'transparent'
}

function intensityDotLeft(level: IntensityLevel | null): string {
  if (level === 'medio') return '50%'
  if (level === 'turbio') return '84%'
  return '16%'
}

interface CompanyTypeCardProps {
  id: CompanyType
  label: string
  icon: LucideIcon
  description: string
  isSelected: boolean
  onSelect: (id: CompanyType) => void
}

function CompanyTypeCard({ id, label, icon: Icon, description, isSelected, onSelect }: CompanyTypeCardProps) {
  const shouldReduceMotion = useReducedMotion()
  const [isHover, setIsHover] = useState(false)

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(id)}
      onPointerEnter={() => setIsHover(true)}
      onPointerLeave={() => setIsHover(false)}
      className={cn('relative overflow-hidden rounded-2xl p-6 text-center', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-base)]')}
      style={{
        background: 'var(--color-bg-elevated)',
        border: isSelected ? '2px solid var(--color-magenta)' : '2px solid rgba(185,48,158,0.18)',
        boxShadow: 'var(--glow-card)',
      }}
      animate={
        shouldReduceMotion
          ? undefined
          : isSelected
            ? { scale: 1.04, boxShadow: ['var(--glow-card)', 'var(--glow-magenta)', 'var(--glow-card)'] }
            : { scale: 1, boxShadow: 'var(--glow-card)' }
      }
      transition={
        shouldReduceMotion
          ? undefined
          : isSelected
            ? { scale: { type: 'spring', stiffness: 300, damping: 20 }, boxShadow: { duration: 1.6, repeat: Infinity, ease: SENSUAL_EASE } }
            : { type: 'spring', stiffness: 300, damping: 22 }
      }
      whileHover={shouldReduceMotion ? undefined : { scale: isSelected ? 1.04 : 1.02 }}
    >
      <div className="relative">
        <Icon className="mx-auto h-10 w-10" style={{ color: 'var(--color-magenta)' }} aria-hidden="true" />
        <div className="mt-4 font-[var(--font-playfair)] text-lg text-white">{label}</div>

        <motion.div className="overflow-hidden" initial={false} animate={{ height: shouldReduceMotion ? 'auto' : isHover ? 'auto' : 0 }} transition={{ duration: 0.25, ease: SENSUAL_EASE }}>
          <p className="pt-3 text-center font-[var(--font-inter)] text-xs leading-5" style={{ color: 'var(--color-text-muted)' }}>
            {description}
          </p>
        </motion.div>
      </div>
    </motion.button>
  )
}

interface IntensityOptionProps {
  level: IntensityLevel
  missionLevel: MissionLevel
  isSelected: boolean
  onSelect: (level: IntensityLevel) => void
  title: string
  descriptor: string
  icon: LucideIcon
  accentVar: string
}

function IntensityOption({ level, missionLevel, isSelected, onSelect, title, descriptor, icon: Icon, accentVar }: IntensityOptionProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(level)}
      className={cn('relative overflow-hidden rounded-2xl p-5 text-left', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-base)]')}
      style={{
        background: 'var(--color-bg-elevated)',
        border: isSelected ? `2px solid ${accentVar}` : '2px solid rgba(185,48,158,0.18)',
        boxShadow: 'var(--glow-card)',
        filter: isSelected ? `drop-shadow(0 0 14px ${accentVar})` : undefined,
      }}
      animate={shouldReduceMotion ? undefined : isSelected ? { scale: 1.05 } : { scale: 1 }}
      transition={shouldReduceMotion ? undefined : { type: 'spring', stiffness: 320, damping: 22 }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="font-[var(--font-jetbrains)] text-[10px] tracking-[0.18em]" style={{ color: accentVar }}>
            NIVEL {missionLevel}
          </div>
          <div className="mt-2 font-[var(--font-playfair)] text-lg text-white">{title}</div>
          <div className="mt-2 font-[var(--font-inter)] text-xs" style={{ color: 'var(--color-text-secondary)' }}>
            {descriptor}
          </div>
        </div>
        <Icon className="h-6 w-6 shrink-0" style={{ color: accentVar }} aria-hidden="true" />
      </div>

      <div className="mt-4 flex justify-center">
        <svg width="120" height="56" viewBox="0 0 120 56" aria-hidden="true">
          <path
            d="M60 6 L86 14 L86 34 Q86 48 60 52 Q34 48 34 34 L34 14 Z"
            fill="none"
            stroke="rgba(255,255,255,0.22)"
            strokeWidth="2"
          />
          <motion.path
            d="M60 6 L86 14 L86 34 Q86 48 60 52 Q34 48 34 34 L34 14 Z"
            fill={accentVar}
            initial={false}
            animate={shouldReduceMotion ? undefined : { fillOpacity: isSelected ? 0.45 : 0 }}
            transition={{ duration: 0.35, ease: SENSUAL_EASE }}
          />
        </svg>
      </div>
    </motion.button>
  )
}

export function Step2Configurator() {
  const shouldReduceMotion = useReducedMotion()
  const { state, updateStep2, nextStep, prevStep } = useBookingFlow()

  const companyType = state.step2.companyType ?? null
  const intensityLevel = state.step2.intensityLevel ?? null
  const language: BookingStep2['language'] = state.step2.language ?? 'es'
  const names = state.step2.names ?? []

  const [intensityBg, setIntensityBg] = useState(() => getIntensityGradient(intensityLevel))
  const [gmDismissed, setGmDismissed] = useState(false)
  const [gmReplayKey, setGmReplayKey] = useState(0)

  useEffect(() => {
    const t = window.setTimeout(() => setIntensityBg(getIntensityGradient(intensityLevel)), 0)
    return () => window.clearTimeout(t)
  }, [intensityLevel])

  useEffect(() => {
    if (intensityLevel !== 'turbio') {
      const t = window.setTimeout(() => setGmDismissed(false), 0)
      return () => window.clearTimeout(t)
    }
    return undefined
  }, [intensityLevel])

  const showGm = intensityLevel === 'turbio' && !gmDismissed
  const gmText =
    'Has elegido la experiencia sin filtros. La intensidad será total. Define tu Palabra Mágica en el siguiente paso — es tu control absoluto.'

  // Re-play scramble when the Omega GM card appears (SPA back/forward, step revisit, etc.).
  useEffect(() => {
    if (!showGm) return
    const t = window.setTimeout(() => setGmReplayKey((k) => k + 1), 0)
    return () => window.clearTimeout(t)
  }, [showGm])

  const bookingForArchetype = useMemo<BookingState>(
    () => ({
      ...state,
      step3: state.step3,
      step4: state.step4,
    }),
    [state],
  )
  const archetype = useMemo(() => getPlayerArchetype(bookingForArchetype), [bookingForArchetype])
  const hasPreview = Boolean(companyType || intensityLevel)

  const nameFieldCount = !companyType ? 0 : companyType === 'plan-golfo' || companyType === 'swinger' ? 2 : 1

  const handleCompanySelect = (id: CompanyType) => {
    updateStep2({ companyType: id })
    const nextLen = id === 'plan-golfo' || id === 'swinger' ? 2 : 1
    const current = names
    if (current.length === nextLen) return
    if (current.length > nextLen) {
      updateStep2({ companyType: id, names: current.slice(0, nextLen) })
      return
    }
    updateStep2({ companyType: id, names: [...current, ...Array(nextLen - current.length).fill('')] })
  }

  const handleIntensitySelect = (level: IntensityLevel) => {
    updateStep2({ intensityLevel: level })
    if (level === 'turbio') {
      setGmDismissed(false)
      setGmReplayKey((k) => k + 1)
    }
  }

  const handleNameChange = (index: number, value: string) => {
    const next = [...names]
    next[index] = value
    updateStep2({ names: next })
  }

  const canContinue = Boolean(companyType && intensityLevel)

  return (
    <div className="relative min-h-screen overflow-hidden pb-32" style={{ background: 'var(--color-bg-base)' }}>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: intensityBg,
          transition: 'background 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
      />

      <AnimatePresence initial={false}>
        {intensityLevel ? (
          <motion.div
            key={intensityLevel}
            className="pointer-events-none absolute inset-0"
            style={{ background: getIntensityGradient(intensityLevel) }}
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0 }}
            transition={shouldReduceMotion ? undefined : { duration: 1, ease: SENSUAL_EASE }}
          />
        ) : null}
      </AnimatePresence>

      <div className="relative mx-auto max-w-6xl px-4 pt-10 sm:px-6">
        <StepHeader actLabel="II" title="CUÉNTANOS LO QUE DESEAS" />

        <p className="font-[var(--font-jetbrains)] text-xs tracking-[0.2em] uppercase" style={{ color: 'var(--color-text-muted)' }}>
          ¿CON QUIÉN VAS A EXPLORAR?
        </p>

        <div className="mt-4 grid grid-cols-2 gap-4">
          {COMPANY_TYPES.map((c) => (
            <CompanyTypeCard
              key={c.id}
              id={c.id}
              label={c.label}
              icon={COMPANY_ICON_MAP[c.id]}
              description={c.description}
              isSelected={companyType === c.id}
              onSelect={handleCompanySelect}
            />
          ))}
        </div>

        <div className="mt-12">
          <p className="font-[var(--font-jetbrains)] text-xs tracking-[0.2em] uppercase" style={{ color: 'var(--color-text-muted)' }}>
            ¿HASTA DÓNDE QUIERES LLEGAR?
          </p>

          <div className="relative mt-6">
            <div className="relative mb-3 hidden h-3 md:block">
              <div className="absolute left-[10%] right-[10%] top-1/2 h-px -translate-y-1/2" style={{ background: 'rgba(255,255,255,0.08)' }} />
              <motion.div
                className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{ background: 'var(--color-magenta)' }}
                animate={shouldReduceMotion ? undefined : { left: intensityDotLeft(intensityLevel) }}
                transition={shouldReduceMotion ? undefined : { duration: 0.35, ease: SENSUAL_EASE }}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <IntensityOption
                level="bajo"
                missionLevel="ALPHA"
                title="SUAVE · Despertar los sentidos"
                descriptor="Un inicio lento. Insinuación, piel, respiración."
                icon={Sparkles}
                accentVar="var(--color-intensity-alpha)"
                isSelected={intensityLevel === 'bajo'}
                onSelect={handleIntensitySelect}
              />
              <IntensityOption
                level="medio"
                missionLevel="BETA"
                title="INTENSO · Cruzar algún límite"
                descriptor="Más cerca. Más claro. Donde el juego ya se nota."
                icon={Flame}
                accentVar="var(--color-intensity-beta)"
                isSelected={intensityLevel === 'medio'}
                onSelect={handleIntensitySelect}
              />
              <IntensityOption
                level="turbio"
                missionLevel="OMEGA"
                title="SIN FILTROS · Todo está permitido"
                descriptor="Sin frenos innecesarios. Solo límites reales."
                icon={Swords}
                accentVar="var(--color-intensity-omega)"
                isSelected={intensityLevel === 'turbio'}
                onSelect={handleIntensitySelect}
              />
            </div>
          </div>
        </div>

        <AnimatePresence>
          {showGm ? (
            <motion.div
              key="gm-omega"
              variants={gmCardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="mt-8 overflow-hidden rounded-2xl border border-[rgba(185,48,158,0.2)] border-l-[3px] border-l-[var(--color-gm-alert)]"
              style={{ background: 'var(--color-bg-elevated)' }}
            >
              <div className="relative p-5">
                <button
                  type="button"
                  className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-magenta)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-elevated)]"
                  style={{ border: 'var(--border-subtle)' }}
                  aria-label="Cerrar mensaje"
                  onClick={() => setGmDismissed(true)}
                >
                  <X className="h-4 w-4" style={{ color: 'var(--color-text-secondary)' }} />
                </button>

                <div className="flex items-center gap-1 font-[var(--font-jetbrains)] text-xs" style={{ color: 'var(--color-gm-terminal)' }}>
                  <span>EL MAESTRO &gt;</span>
                  {shouldReduceMotion ? null : (
                    <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.9, repeat: Infinity, ease: SENSUAL_EASE }} aria-hidden="true">
                      _
                    </motion.span>
                  )}
                </div>

                <p className="mt-3 font-[var(--font-inter)] text-sm leading-6" style={{ color: 'var(--color-text-secondary)' }}>
                  <OmegaGmMessage text={gmText} shouldReduceMotion={Boolean(shouldReduceMotion)} replayToken={gmReplayKey} />
                </p>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <div className="mt-10">
          <p className="font-[var(--font-jetbrains)] text-xs tracking-[0.2em] uppercase" style={{ color: 'var(--color-text-muted)' }}>
            ¿CÓMO QUIERES QUE TE LLAMEN?
          </p>

          {nameFieldCount === 0 ? (
            <p className="mt-4 font-[var(--font-inter)] text-sm" style={{ color: 'var(--color-text-muted)' }}>
              Selecciona un tipo de operativo para continuar.
            </p>
          ) : (
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {Array.from({ length: nameFieldCount }).map((_, idx) => (
                <input
                  key={idx}
                  value={names[idx] ?? ''}
                  onChange={(e) => handleNameChange(idx, e.target.value)}
                  placeholder="Tu nombre, un apodo, lo que prefieras..."
                  className="w-full rounded-xl border border-[rgba(185,48,158,0.2)] bg-[var(--color-bg-elevated)] px-4 py-3 font-[var(--font-inter)] text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus-visible:border-[var(--color-magenta)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-magenta)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-base)]"
                />
              ))}
            </div>
          )}
        </div>

        <div className="mt-8">
          <label className="block font-[var(--font-jetbrains)] text-xs tracking-[0.2em] uppercase" style={{ color: 'var(--color-text-muted)' }} htmlFor="booking-language">
            IDIOMA DEL PLACER
          </label>
          <select
            id="booking-language"
            value={language}
            onChange={(e) => {
              const v = e.target.value
              if (v === 'es' || v === 'en' || v === 'fr') updateStep2({ language: v })
            }}
            className="mt-3 w-full rounded-xl border border-[rgba(185,48,158,0.2)] bg-[var(--color-bg-elevated)] px-4 py-3 font-[var(--font-inter)] text-sm text-[var(--color-text-primary)] focus-visible:border-[var(--color-magenta)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-magenta)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-base)] md:w-64"
          >
            <option value="es">ES</option>
            <option value="en">EN</option>
            <option value="fr">FR</option>
          </select>
        </div>

        <AnimatePresence>
          {hasPreview ? (
            <motion.div
              key="archetype-preview"
              variants={archetypePreviewVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="z-[90] mt-10 w-full md:fixed md:bottom-10 md:right-6 md:mt-0 md:w-[min(92vw,360px)]"
              title="Tu perfil de placer se revelará cuando completes tu reserva."
            >
              <div
                className="rounded-2xl border p-4"
                style={{
                  background: 'color-mix(in srgb, var(--color-bg-elevated) 92%, transparent)',
                  borderColor: 'rgba(185,48,158,0.2)',
                  boxShadow: 'var(--glow-card)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl leading-none" aria-hidden="true">
                    {archetype.icon}
                  </span>
                  <div className="min-w-0">
                    <p className="font-[var(--font-jetbrains)] text-[10px] tracking-[0.18em]" style={{ color: 'var(--color-text-muted)' }}>
                      Empezamos a conocerte:
                    </p>
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={archetype.id}
                        variants={archetypeNameVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="mt-1 font-[var(--font-playfair)] text-lg italic text-white"
                      >
                        {archetype.name}
                      </motion.p>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <div className="mt-14 flex flex-col gap-3 pb-6 md:flex-row md:items-center md:justify-between">
          <button
            type="button"
            onClick={prevStep}
            className="rounded-full border border-[rgba(185,48,158,0.2)] px-6 py-3 font-[var(--font-jetbrains)] text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-magenta)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-base)]"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            ← VOLVER
          </button>

          <button
            type="button"
            onClick={nextStep}
            disabled={!canContinue}
            className="rounded-full px-6 py-3 font-[var(--font-jetbrains)] text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-magenta)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-base)] disabled:cursor-not-allowed disabled:opacity-50"
            style={{ background: canContinue ? 'var(--gradient-cta)' : 'var(--color-bg-subtle)' }}
          >
            CONTINUAR →
          </button>
        </div>
      </div>
    </div>
  )
}
