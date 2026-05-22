'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'

import { AgentProfileTab } from '@/components/dashboard/AgentProfileTab'
import { ArchiveTab } from '@/components/dashboard/ArchiveTab'
import { CredentialTab } from '@/components/dashboard/CredentialTab'
import { MissionActiveTab } from '@/components/dashboard/MissionActiveTab'
import { cn } from '@/lib/utils'
import type { BookingRecord } from '@/types/booking-record'

const SENSUAL_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

const TAB_KEYS = ['TU NOCHE', 'TUS DESEOS', 'TU ACCESO', 'TU HISTORIAL'] as const
export type AgentHeadquartersTab = (typeof TAB_KEYS)[number]

const tabContentVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.3, ease: SENSUAL_EASE } },
  exit: { opacity: 0, x: -12, transition: { duration: 0.2, ease: SENSUAL_EASE } },
} as const

export interface AgentHeadquartersProps {
  bookingId: string
  booking: BookingRecord
  /** Insignia El Club: mock `booking.isClubMember` o almacenamiento local (demo). */
  showClubBadge?: boolean
}

export function AgentHeadquarters({ bookingId, booking, showClubBadge }: AgentHeadquartersProps) {
  const shouldReduceMotion = useReducedMotion()
  const [activeTab, setActiveTab] = useState<AgentHeadquartersTab>('TU NOCHE')

  return (
    <div className="mx-auto max-w-5xl px-4 pb-24 pt-8 sm:px-6">
      <header className="mb-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p
              className="[font-family:var(--font-jetbrains)] text-[10px] tracking-[0.25em]"
              style={{ color: 'var(--color-magenta)' }}
            >
              YA TE ESPERÁBAMOS.
            </p>
            <h1 className="mt-2 [font-family:var(--font-playfair)] text-3xl text-white sm:text-4xl">
              Tu espacio privado
            </h1>
            <p
              className="mt-2 [font-family:var(--font-inter)] text-sm"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Tu reserva:{' '}
              <span className="[font-family:var(--font-jetbrains)] text-xs text-white/90">{bookingId}</span>
              {booking.confirmationCode ? (
                <>
                  {' '}
                  · Código{' '}
                  <span className="[font-family:var(--font-jetbrains)] text-xs text-(--color-gold)">
                    {booking.confirmationCode}
                  </span>
                </>
              ) : null}
            </p>
          </div>
          {showClubBadge ? (
            <motion.span
              className="inline-flex shrink-0 items-center rounded-full border px-3 py-1.5 [font-family:var(--font-jetbrains)] text-[9px] tracking-[0.2em] text-white"
              style={{
                borderColor: 'color-mix(in srgb, var(--color-gold) 45%, transparent)',
                background: 'color-mix(in srgb, var(--color-gold) 18%, var(--color-bg-elevated))',
                boxShadow: 'var(--glow-gold)',
              }}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
              animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: SENSUAL_EASE }}
            >
              MIEMBRO DE LA SOCIEDAD
            </motion.span>
          ) : null}
        </div>
      </header>

      <nav
        className="mb-8 flex gap-2 overflow-x-auto pb-2"
        aria-label="Secciones del panel"
      >
        {TAB_KEYS.map((tab) => {
          const isActive = activeTab === tab
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={cn(
                'shrink-0 whitespace-nowrap rounded-full px-4 py-2 [font-family:var(--font-jetbrains)] text-[10px] tracking-[0.18em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg-base) sm:text-xs',
                isActive ? 'text-white' : 'hover:text-white',
              )}
              style={{
                background: isActive ? 'var(--gradient-cta)' : 'transparent',
                border: isActive ? '1px solid transparent' : 'var(--border-subtle)',
                color: isActive ? '#FFFFFF' : 'var(--color-text-muted)',
                boxShadow: isActive ? 'var(--glow-magenta)' : undefined,
              }}
              aria-current={isActive ? 'page' : undefined}
            >
              {tab}
            </button>
          )
        })}
      </nav>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          variants={tabContentVariants}
          initial={shouldReduceMotion ? false : 'initial'}
          animate={shouldReduceMotion ? undefined : 'animate'}
          exit={shouldReduceMotion ? undefined : 'exit'}
        >
          {activeTab === 'TU NOCHE' ? <MissionActiveTab booking={booking} /> : null}
          {activeTab === 'TUS DESEOS' ? <AgentProfileTab key={bookingId} bookingId={bookingId} /> : null}
          {activeTab === 'TU ACCESO' ? <CredentialTab bookingId={bookingId} /> : null}
          {activeTab === 'TU HISTORIAL' ? <ArchiveTab bookingId={bookingId} /> : null}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
