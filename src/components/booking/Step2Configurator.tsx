'use client'

import type { LucideIcon } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Flame, Heart, Infinity as InfinityIcon, Sparkles, Swords, Users, X, Zap } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { StepHeader } from '@/components/booking/StepHeader'
import { useBookingFlow } from '@/hooks/useBookingFlow'
import { COMPANY_TYPES } from '@/lib/constants'
import { cn } from '@/lib/utils'
import type { BookingStep2, CompanyType, IntensityLevel, MissionLevel } from '@/types/booking'
import { BookingBottomBar } from '@/components/booking/BookingBottomBar'

const SENSUAL_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

const gmCardVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: 'auto', transition: { duration: 0.4, ease: SENSUAL_EASE } },
  exit: { opacity: 0, height: 0, transition: { duration: 0.35, ease: SENSUAL_EASE } },
} as const

const TYPEWRITER_MS_PER_CHAR = 30

const COMPANY_ICON_MAP: Record<CompanyType, LucideIcon> = {
  pareja: Heart,
  rollete: Zap,
  'plan-golfo': Users,
  swinger: InfinityIcon,
}

const COMPANY_HOVER_DETAILS: Record<CompanyType, string> = {
  pareja:
    'Para dos personas que quieren volver a mirarse distinto. Ritmo cuidado, tensión suave y un final que se queda en la piel.',
  rollete:
    'Para encuentros sin guion. Directo, lúdico, sin promesas: solo química, elección y un espacio que acompaña lo que pasa.',
  'plan-golfo':
    'Para cuando la risa también aprieta. Dinámica de grupo, decisiones rápidas y ese momento en que alguien por fin dice “sí”.',
  swinger:
    'Para quienes ya conocen sus acuerdos. Libertad, cuidado y discreción: el placer se expande sin perder el control.',
}

interface OmegaGmMessageProps {
  text: string
  shouldReduceMotion: boolean
  replayToken: number
}

function OmegaGmMessage({ text, shouldReduceMotion, replayToken }: OmegaGmMessageProps) {
  if (shouldReduceMotion) return <>{text}</>

  const durationMs = Math.min(2000, Math.max(450, text.length * TYPEWRITER_MS_PER_CHAR))

  return (
    <>
      <motion.span
        key={replayToken}
        className="inline-block overflow-hidden whitespace-nowrap align-bottom"
        initial={{ width: '0ch' }}
        animate={{ width: `${Math.max(0, text.length)}ch` }}
        transition={{ duration: durationMs / 1000, ease: 'linear' }}
      >
        {text}
      </motion.span>
      <motion.span
        className="inline-block"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.9, repeat: Infinity, ease: SENSUAL_EASE }}
        aria-hidden="true"
      >
        _
      </motion.span>
    </>
  )
}

function intensityBgColor(level: IntensityLevel | null): string {
  if (level === 'bajo') return 'hsl(260, 60%, 5%)'
  if (level === 'medio') return 'hsl(35, 50%, 6%)'
  if (level === 'turbio') return 'hsl(340, 60%, 5%)'
  return 'var(--color-bg-base)'
}

function intensityOverlay(level: IntensityLevel | null): string {
  if (level === 'bajo') return 'var(--gradient-alpha)'
  if (level === 'medio') return 'var(--gradient-beta)'
  if (level === 'turbio') return 'var(--gradient-omega)'
  return 'transparent'
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
  const detail = COMPANY_HOVER_DETAILS[id]

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(id)}
      onPointerEnter={() => setIsHover(true)}
      onPointerLeave={() => setIsHover(false)}
      onFocus={() => setIsHover(true)}
      onBlur={() => setIsHover(false)}
      className={cn(
        'relative overflow-hidden rounded-2xl p-6 text-center',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg-base)',
      )}
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
        <div className="mt-4 font-(--font-playfair) text-lg text-white">{label}</div>
        <p className="mt-2 text-center font-(--font-inter) text-xs leading-5" style={{ color: 'var(--color-text-muted)' }}>
          {description}
        </p>

        <AnimatePresence initial={false}>
          {isHover ? (
            <motion.div
              key="detail"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
              animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, y: 6 }}
              transition={shouldReduceMotion ? undefined : { duration: 0.25, ease: SENSUAL_EASE }}
              className="mx-auto mt-4 max-w-xs rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left backdrop-blur-md"
            >
              <p className="font-(--font-inter) text-xs leading-5 text-(--color-text-secondary)">{detail}</p>
            </motion.div>
          ) : null}
        </AnimatePresence>
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
      className={cn(
        'relative overflow-hidden rounded-2xl p-5 text-left',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg-base)',
      )}
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
          <div className="font-(--font-jetbrains) text-[10px] tracking-[0.18em]" style={{ color: accentVar }}>
            NIVEL {missionLevel}
          </div>
          <div className="mt-2 font-(--font-playfair) text-lg text-white">{title}</div>
          <div className="mt-2 font-(--font-inter) text-xs" style={{ color: 'var(--color-text-secondary)' }}>
            {descriptor}
          </div>
        </div>
        <Icon className="h-6 w-6 shrink-0" style={{ color: accentVar }} aria-hidden="true" />
      </div>

      <div className="mt-4 flex justify-center">
        <div className="relative h-[56px] w-[120px]" aria-hidden="true">
          <motion.div
            className="absolute inset-0 rounded-2xl"
            initial={false}
            animate={shouldReduceMotion ? undefined : { opacity: isSelected ? 1 : 0 }}
            transition={{ duration: 0.35, ease: SENSUAL_EASE }}
            style={{
              background: `radial-gradient(circle at 50% 50%, color-mix(in srgb, ${accentVar} 45%, transparent) 0%, transparent 62%)`,
              filter: 'blur(10px)',
            }}
          />
          <div className="absolute inset-0 " aria-hidden="true" />
          <div
            className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2"
            style={{
              backgroundColor: isSelected ? accentVar : 'white',
              WebkitMaskImage: "url('/fire-svgrepo-com.svg')",
              WebkitMaskRepeat: 'no-repeat',
              WebkitMaskPosition: 'center',
              WebkitMaskSize: 'contain',
              maskImage: "url('/fire-svgrepo-com.svg')",
              maskRepeat: 'no-repeat',
              maskPosition: 'center',
              maskSize: 'contain',
              opacity: 0.95,
              filter: isSelected
                ? `drop-shadow(0 0 10px color-mix(in srgb, ${accentVar} 65%, transparent))`
                : 'none',
            }}
          />
        </div>
      </div>
    </motion.button>
  )
}

export function Step2Configurator() {
  const shouldReduceMotion = useReducedMotion()
  const router = useRouter()
  const { state, updateStep2 } = useBookingFlow()

  const companyType = state.step2.companyType ?? null
  const intensityLevel = state.step2.intensityLevel ?? null
  const language: BookingStep2['language'] = state.step2.language ?? 'es'
  const names = state.step2.names ?? []

  const [gmDismissed, setGmDismissed] = useState(false)
  const [gmReplayKey, setGmReplayKey] = useState(() => (intensityLevel === 'turbio' ? 1 : 0))

  const showGm = intensityLevel === 'turbio' && !gmDismissed
  const gmText =
    '> Sin límites iniciado. La experiencia será directa e intensa. Elegí tu palabra mágica en el siguiente acto.'

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
      return
    }
    setGmDismissed(false)
  }

  const handleNameChange = (index: number, value: string) => {
    const next = [...names]
    next[index] = value
    updateStep2({ names: next })
  }

  const canContinue = Boolean(companyType && intensityLevel)
  const handlePrev = () => router.push('/reservar?step=1')
  const handleNext = () => {
    if (!canContinue) return
    router.push('/reservar?step=3')
  }

  return (
    <div className="relative min-h-screen overflow-hidden pb-24 sm:pb-32" style={{ background: 'var(--color-bg-base)' }}>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: intensityBgColor(intensityLevel),
          transition: 'background 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
      />

      <AnimatePresence initial={false}>
        {intensityLevel ? (
          <motion.div
            key={intensityLevel}
            className="pointer-events-none absolute inset-0"
            style={{ background: intensityOverlay(intensityLevel) }}
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0 }}
            transition={shouldReduceMotion ? undefined : { duration: 1, ease: SENSUAL_EASE }}
          />
        ) : null}
      </AnimatePresence>

      <div className="relative mx-auto max-w-6xl px-4 pt-8 sm:px-6 sm:pt-10">
        <StepHeader actLabel="II" title="CUÉNTANOS LO QUE DESEAS" />

        <p className="font-(--font-jetbrains) text-xs tracking-[0.2em] uppercase" style={{ color: 'var(--color-text-muted)' }}>
          ¿CON QUIÉN VAS A EXPLORAR?
        </p>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4">
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

        <div className="mt-9 sm:mt-12">
          <p className="font-(--font-jetbrains) text-xs tracking-[0.2em] uppercase" style={{ color: 'var(--color-text-muted)' }}>
            ¿HASTA DÓNDE QUIERES LLEGAR?
          </p>

          <div className="relative mt-4 sm:mt-6">
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

            <div className="relative mt-6 hidden md:block" aria-hidden="true">
              <div className="absolute inset-x-8 top-1/2 h-px -translate-y-1/2 bg-white/10" />
              <div className="relative mx-8 grid grid-cols-3">
                <div className="relative flex justify-center">
                  {intensityLevel === 'bajo' ? (
                    <motion.div
                      layoutId="intensity-dot"
                      className="absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-(--color-magenta)"
                      transition={shouldReduceMotion ? undefined : { duration: 0.35, ease: SENSUAL_EASE }}
                    />
                  ) : null}
                </div>
                <div className="relative flex justify-center">
                  {intensityLevel === 'medio' ? (
                    <motion.div
                      layoutId="intensity-dot"
                      className="absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-(--color-magenta)"
                      transition={shouldReduceMotion ? undefined : { duration: 0.35, ease: SENSUAL_EASE }}
                    />
                  ) : null}
                </div>
                <div className="relative flex justify-center">
                  {intensityLevel === 'turbio' ? (
                    <motion.div
                      layoutId="intensity-dot"
                      className="absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-(--color-magenta)"
                      transition={shouldReduceMotion ? undefined : { duration: 0.35, ease: SENSUAL_EASE }}
                    />
                  ) : null}
                </div>
              </div>
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
              className="mt-6 sm:mt-8 overflow-hidden rounded-2xl border border-[rgba(185,48,158,0.2)] border-l-[3px] border-l-(--color-gm-alert)"
              style={{ background: 'var(--color-bg-elevated)' }}
            >
              <div className="relative p-4 sm:p-5">
                <button
                  type="button"
                  className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg-elevated)"
                  style={{ border: 'var(--border-subtle)' }}
                  aria-label="Cerrar mensaje"
                  onClick={() => setGmDismissed(true)}
                >
                  <X className="h-4 w-4" style={{ color: 'var(--color-text-secondary)' }} />
                </button>

                <div className="flex items-center gap-1 font-(--font-jetbrains) text-xs" style={{ color: 'var(--color-gm-terminal)' }}>
                  <span>GAME_MASTER_IA &gt;</span>
                  {shouldReduceMotion ? null : (
                    <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.9, repeat: Infinity, ease: SENSUAL_EASE }} aria-hidden="true">
                      _
                    </motion.span>
                  )}
                </div>

                <p className="mt-3 font-(--font-inter) text-[13px] leading-6 sm:text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  <OmegaGmMessage text={gmText} shouldReduceMotion={Boolean(shouldReduceMotion)} replayToken={gmReplayKey} />
                </p>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <div className="mt-8 sm:mt-10">
          <p className="font-(--font-jetbrains) text-xs tracking-[0.2em] uppercase" style={{ color: 'var(--color-text-muted)' }}>
            ¿CÓMO QUIERES QUE TE LLAMEN?
          </p>

          {nameFieldCount === 0 ? (
            <p className="mt-3 sm:mt-4 font-(--font-inter) text-[13px] sm:text-sm" style={{ color: 'var(--color-text-muted)' }}>
              Elegí con quién venís para continuar.
            </p>
          ) : (
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {Array.from({ length: nameFieldCount }).map((_, idx) => (
                <input
                  key={idx}
                  value={names[idx] ?? ''}
                  onChange={(e) => handleNameChange(idx, e.target.value)}
                  placeholder="Tu nombre, un apodo, lo que prefieras..."
                  className="w-full border-b border-(--border-subtle) bg-transparent px-0 py-2.5 font-(--font-inter) text-[13px] text-(--color-text-primary) placeholder:text-(--color-text-muted) focus-visible:border-(--color-magenta) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg-base) sm:py-3 sm:text-sm"
                />
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 sm:mt-8">
          <label className="block font-(--font-jetbrains) text-xs tracking-[0.2em] uppercase" style={{ color: 'var(--color-text-muted)' }} htmlFor="booking-language">
            IDIOMA DEL PLACER
          </label>
          <select
            id="booking-language"
            value={language}
            onChange={(e) => {
              const v = e.target.value
              if (v === 'es' || v === 'en' || v === 'fr') updateStep2({ language: v })
            }}
            className="mt-3 w-full rounded-xl border border-[rgba(185,48,158,0.2)] bg-(--color-bg-elevated) px-4 py-2.5 font-(--font-inter) text-[13px] text-(--color-text-primary) focus-visible:border-(--color-magenta) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg-base) sm:py-3 sm:text-sm md:w-64"
          >
            <option value="es">ES</option>
            <option value="en">EN</option>
            <option value="fr">FR</option>
          </select>
        </div>

        <div className="h-28" aria-hidden="true" />
      </div>

      <BookingBottomBar
        currentStep={2}
        isValid={canContinue}
        onBack={handlePrev}
        onNext={handleNext}
      />
    </div>
  )
}
