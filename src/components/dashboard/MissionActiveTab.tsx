'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Eye, EyeOff } from 'lucide-react'
import { useMemo, useState } from 'react'

import { ArchetypeCard } from '@/components/ui/ArchetypeCard'
import { CountdownDisplay } from '@/components/ui/CountdownDisplay'
import type { BookingRecord } from '@/types/booking-record'
import type { Archetype } from '@/types/archetype'

const SENSUAL_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

function formatMissionDateLine(booking: BookingRecord): string {
  const city = booking.cityDisplayName.toUpperCase()
  const dotted = booking.dateIso.replaceAll('-', '.')
  return `${city} · ${dotted} · ${booking.timeSlot}H`
}

export interface MissionActiveTabProps {
  booking: BookingRecord
}

export function MissionActiveTab({ booking }: MissionActiveTabProps) {
  const shouldReduceMotion = useReducedMotion()
  const [isRevealed, setIsRevealed] = useState(false)
  const [archetypeOpen, setArchetypeOpen] = useState(false)

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

  const safeWordLength = booking.safeWord.length

  return (
    <div className="space-y-10">
      <section
        className="rounded-2xl p-6 sm:p-8"
        style={{
          background: 'var(--color-bg-elevated)',
          border: 'var(--border-subtle)',
          boxShadow: 'var(--glow-card)',
        }}
      >
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            {!shouldReduceMotion ? (
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70"
                style={{ background: 'var(--color-gm-terminal)' }}
              />
            ) : null}
            <span
              className="relative inline-flex h-2 w-2 rounded-full"
              style={{ background: 'var(--color-gm-terminal)' }}
            />
          </span>
          <p
            className="[font-family:var(--font-jetbrains)] text-[9px] tracking-[0.2em]"
            style={{ color: 'var(--color-gm-terminal)' }}
          >
            STATUS: CONFIRMADA
          </p>
        </div>

        <h2 className="mt-4 [font-family:var(--font-playfair)] text-3xl font-bold text-white">
          {booking.experienceTitle}
        </h2>
        <p
          className="mt-3 [font-family:var(--font-jetbrains)] text-sm tracking-wide"
          style={{ color: 'var(--color-text-muted)' }}
        >
          {formatMissionDateLine(booking)}
        </p>

        {booking.confirmationCode ? (
          <div className="mt-4 rounded-xl border border-(--color-gold)/30 bg-(--color-bg-subtle) px-3 py-2.5">
            <p className="[font-family:var(--font-jetbrains)] text-[9px] uppercase tracking-[0.18em] text-(--color-text-muted)">
              Código de confirmación
            </p>
            <p className="mt-1 [font-family:var(--font-playfair)] text-lg tracking-[0.12em] text-(--color-gold)">
              {booking.confirmationCode}
            </p>
          </div>
        ) : null}

        <dl className="mt-4 grid gap-2 text-sm">
          <div className="flex justify-between gap-3">
            <dt className="[font-family:var(--font-jetbrains)] text-[10px] uppercase tracking-[0.12em] text-(--color-text-muted)">
              Titular (nombre real)
            </dt>
            <dd className="text-right text-white [font-family:var(--font-inter)]">{booking.payerName}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="[font-family:var(--font-jetbrains)] text-[10px] uppercase tracking-[0.12em] text-(--color-text-muted)">
              Documento
            </dt>
            <dd className="text-right text-(--color-text-secondary) [font-family:var(--font-inter)]">
              {booking.documentMasked}
            </dd>
          </div>
          {booking.cardLast4 ? (
            <div className="flex justify-between gap-3">
              <dt className="[font-family:var(--font-jetbrains)] text-[10px] uppercase tracking-[0.12em] text-(--color-text-muted)">
                Tarjeta
              </dt>
              <dd className="text-right text-(--color-text-secondary) [font-family:var(--font-jetbrains)]">
                •••• {booking.cardLast4}
              </dd>
            </div>
          ) : null}
        </dl>
      </section>

      <section>
        <h3
          className="mb-4 [font-family:var(--font-jetbrains)] text-[10px] tracking-[0.2em]"
          style={{ color: 'var(--color-text-muted)' }}
        >
          CUENTA REGRESIVA HACIA TU NOCHE
        </h3>
        <CountdownDisplay targetIso={booking.dateIso} timeSlot={booking.timeSlot} />
      </section>

      <section>
        <button
          type="button"
          onClick={() => setArchetypeOpen((o) => !o)}
          className="w-full rounded-2xl border-0 bg-transparent p-0 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg-base)"
          aria-expanded={archetypeOpen}
        >
          <ArchetypeCard archetype={archetypeRecord} size="md" showDescription={archetypeOpen} className="w-full" />
        </button>
      </section>

      <section
        className="rounded-2xl p-5"
        style={{
          background: 'var(--color-bg-elevated)',
          border: 'var(--border-subtle)',
        }}
      >
        <div className="flex items-center justify-between gap-3">
          <p
            className="[font-family:var(--font-jetbrains)] text-[9px] uppercase tracking-[0.2em]"
            style={{ color: 'var(--color-text-muted)' }}
          >
            CÓDIGO DE PARADA:
          </p>
          <button
            type="button"
            onClick={() => setIsRevealed((v) => !v)}
            className="rounded-lg p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta)"
            aria-label={isRevealed ? 'Ocultar código de parada' : 'Ver código de parada'}
          >
            {isRevealed ? (
              <EyeOff className="h-5 w-5" style={{ color: 'var(--color-text-secondary)' }} />
            ) : (
              <Eye className="h-5 w-5" style={{ color: 'var(--color-text-secondary)' }} />
            )}
          </button>
        </div>
        <motion.p
          className="mt-3 [font-family:var(--font-cormorant)] text-xl italic tracking-wide"
          style={{ color: 'var(--color-magenta)' }}
          animate={
            isRevealed && !shouldReduceMotion
              ? { textShadow: ['0 0 0px rgba(185,48,158,0)', '0 0 18px rgba(185,48,158,0.6)', '0 0 0px rgba(185,48,158,0)'] }
              : { textShadow: '0 0 0px rgba(185,48,158,0)' }
          }
          transition={{ duration: 0.5, ease: SENSUAL_EASE }}
        >
          {isRevealed ? <span>{booking.safeWord}</span> : <span>{'•'.repeat(safeWordLength)}</span>}
        </motion.p>
      </section>
    </div>
  )
}
