'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Eye, EyeOff } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

import { ArchetypeCard } from '@/components/ui/ArchetypeCard'
import type { BookingRecord } from '@/types/booking-record'
import type { Archetype } from '@/types/archetype'

const SENSUAL_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

function formatMissionDateLine(booking: BookingRecord): string {
  const city = booking.cityDisplayName.toUpperCase()
  const dotted = booking.dateIso.replaceAll('-', '.')
  return `${city} · ${dotted} · ${booking.timeSlot}H`
}

function pad2(n: number): string {
  return String(Math.max(0, n)).padStart(2, '0')
}

interface CountdownCellProps {
  char: string
  flash: boolean
  urgency: 'normal' | 'amber' | 'red'
  shouldReduceMotion: boolean | null
}

function CountdownCell({ char, flash, urgency, shouldReduceMotion }: CountdownCellProps) {
  const bg =
    urgency === 'red'
      ? 'color-mix(in srgb, var(--color-gm-alert) 22%, var(--color-bg-elevated))'
      : urgency === 'amber'
        ? 'color-mix(in srgb, var(--color-intensity-beta) 18%, var(--color-bg-elevated))'
        : 'var(--color-bg-elevated)'

  return (
    <motion.span
      className="inline-flex min-w-[2.25rem] items-center justify-center rounded-lg px-1 py-2 font-[var(--font-jetbrains)] text-[clamp(2rem,6vw,3rem)] sm:min-w-[2.75rem] sm:text-[3rem]"
      style={{
        background: bg,
        color: 'var(--color-magenta)',
        boxShadow: urgency === 'red' ? 'var(--glow-magenta)' : undefined,
      }}
      animate={shouldReduceMotion || !flash ? undefined : { scale: [1, 1.05, 1] }}
      transition={{ duration: 0.1, ease: SENSUAL_EASE }}
    >
      {char}
    </motion.span>
  )
}

export interface MissionActiveTabProps {
  booking: BookingRecord
}

export function MissionActiveTab({ booking }: MissionActiveTabProps) {
  const shouldReduceMotion = useReducedMotion()
  const [now, setNow] = useState(() => Date.now())
  const [isRevealed, setIsRevealed] = useState(false)
  const [archetypeOpen, setArchetypeOpen] = useState(false)
  const [prevDigitString, setPrevDigitString] = useState('')

  const archetypeRecord: Archetype = useMemo(
    () => ({
      id: booking.archetypeId,
      name: booking.archetypeName,
      icon: booking.archetypeIcon,
      description: booking.archetypeDescription,
      gradient: booking.archetypeGradient,
    }),
    [booking],
  )

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(id)
  }, [])

  const targetMs = useMemo(() => {
    const [y, m, d] = booking.dateIso.split('-').map(Number)
    const [hh, mm] = booking.timeSlot.split(':').map(Number)
    return new Date(y, (m ?? 1) - 1, d ?? 1, hh ?? 0, mm ?? 0, 0, 0).getTime()
  }, [booking.dateIso, booking.timeSlot])

  const remaining = Math.max(0, targetMs - now)
  const days = Math.floor(remaining / 86400000)
  const hours = Math.floor((remaining % 86400000) / 3600000)
  const minutes = Math.floor((remaining % 3600000) / 60000)
  const seconds = Math.floor((remaining % 60000) / 1000)

  const urgency = remaining < 3600000 ? 'red' : remaining < 86400000 ? 'amber' : 'normal'

  const dayDigits = days >= 100 ? String(days).padStart(3, '0').split('') : pad2(days).split('')
  const hDigits = pad2(hours).split('')
  const mDigits = pad2(minutes).split('')
  const sDigits = pad2(seconds).split('')

  const digitString = [...dayDigits, ...hDigits, ...mDigits, ...sDigits].join('')
  const flashArr = digitString.split('').map((c, i) => (i < prevDigitString.length ? prevDigitString[i] !== c : false))

  useEffect(() => {
    const t = window.setTimeout(() => setPrevDigitString(digitString), 0)
    return () => window.clearTimeout(t)
  }, [digitString])

  const countdownGroups = useMemo(() => {
    const blocks = [
      { label: 'DÍAS' as const, chars: dayDigits },
      { label: 'HRS' as const, chars: hDigits },
      { label: 'MIN' as const, chars: mDigits },
      { label: 'SEG' as const, chars: sDigits },
    ]
    let offset = 0
    return blocks.map((b) => {
      const start = offset
      offset += b.chars.length
      return { ...b, start }
    })
  }, [dayDigits, hDigits, mDigits, sDigits])

  return (
    <div className="space-y-10">
      <section className="rounded-2xl border p-6 sm:p-8" style={{ borderColor: 'rgba(185,48,158,0.2)', background: 'var(--color-bg-elevated)', boxShadow: 'var(--glow-card)' }}>
        <p className="font-[var(--font-jetbrains)] text-[10px] tracking-[0.18em]" style={{ color: 'var(--color-gm-alert)' }}>
          RESERVA CONFIRMADA · TODO LISTO
        </p>
        <h2 className="mt-3 font-[var(--font-playfair)] text-4xl font-bold text-white">{booking.experienceTitle}</h2>
        <p className="mt-3 font-[var(--font-jetbrains)] text-sm tracking-wide" style={{ color: 'var(--color-text-secondary)' }}>
          {formatMissionDateLine(booking)}
        </p>
        <div className="mt-6 flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            {!shouldReduceMotion ? (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70" style={{ background: 'var(--color-gm-terminal)' }} />
            ) : null}
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full" style={{ background: 'var(--color-gm-terminal)' }} />
          </span>
          <span className="font-[var(--font-jetbrains)] text-xs tracking-wide" style={{ color: 'var(--color-gm-terminal)' }}>
            TE ESTAMOS ESPERANDO
          </span>
        </div>
      </section>

      <section>
        <h3 className="mb-4 font-[var(--font-jetbrains)] text-xs tracking-[0.2em]" style={{ color: 'var(--color-text-muted)' }}>
          CUENTA REGRESIVA HACIA TU NOCHE
        </h3>
        <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
          {countdownGroups.map((g) => (
            <div key={g.label} className="flex flex-col items-center gap-1">
              <span className="font-[var(--font-jetbrains)] text-[10px] tracking-widest" style={{ color: 'var(--color-text-muted)' }}>
                {g.label}
              </span>
              <div className="flex gap-1">
                {g.chars.map((ch, i) => (
                  <CountdownCell
                    key={`${g.label}-${g.start + i}`}
                    char={ch}
                    flash={flashArr[g.start + i] ?? false}
                    urgency={urgency}
                    shouldReduceMotion={shouldReduceMotion}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <button
          type="button"
          onClick={() => setArchetypeOpen((o) => !o)}
          className="w-full rounded-2xl border-0 bg-transparent p-0 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-magenta)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-base)]"
        >
          <ArchetypeCard archetype={archetypeRecord} size="md" showDescription={archetypeOpen} className="w-full" />
        </button>
      </section>

      <section className="rounded-2xl border p-5" style={{ borderColor: 'rgba(185,48,158,0.2)', background: 'var(--color-bg-elevated)' }}>
        <div className="flex items-center justify-between gap-3">
          <p className="font-[var(--font-jetbrains)] text-[10px] tracking-[0.2em]" style={{ color: 'var(--color-text-muted)' }}>
            TU PALABRA MÁGICA:
          </p>
          <button
            type="button"
            onClick={() => setIsRevealed((v) => !v)}
            className="rounded-lg p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-magenta)]"
            aria-label={isRevealed ? 'Ocultar palabra mágica' : 'Ver mi palabra mágica'}
          >
            {isRevealed ? <EyeOff className="h-5 w-5" style={{ color: 'var(--color-text-secondary)' }} /> : <Eye className="h-5 w-5" style={{ color: 'var(--color-text-secondary)' }} />}
          </button>
        </div>
        <motion.p
          className="mt-3 font-[var(--font-playfair)] text-2xl tracking-widest text-white"
          animate={
            isRevealed && !shouldReduceMotion
              ? { filter: ['none', 'drop-shadow(0 0 10px var(--color-magenta))', 'none'] }
              : { filter: 'none' }
          }
          transition={{ duration: 0.5, ease: SENSUAL_EASE }}
        >
          {isRevealed ? <span>{booking.safeWord}</span> : <span>{'•'.repeat(booking.safeWord.length)}</span>}
        </motion.p>
      </section>
    </div>
  )
}
