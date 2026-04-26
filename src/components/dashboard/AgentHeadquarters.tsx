'use client'

import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'framer-motion'
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
  initial: { opacity: 0, x: 16 },
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
            <p className="font-[var(--font-jetbrains)] text-[10px] tracking-[0.25em]" style={{ color: 'var(--color-text-muted)' }}>
              YA TE ESPERÁBAMOS.
            </p>
            <h1 className="mt-2 font-[var(--font-playfair)] text-3xl text-white sm:text-4xl">Tu espacio privado</h1>
            <p className="mt-2 font-[var(--font-inter)] text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              Tu reserva: <span className="font-[var(--font-jetbrains)] text-xs text-white/90">{bookingId}</span>
            </p>
          </div>
          {showClubBadge ? (
            <motion.span
              className="inline-flex shrink-0 items-center rounded-full border px-3 py-1.5 font-[var(--font-jetbrains)] text-[9px] tracking-[0.2em] text-white"
              style={{
                borderColor: 'rgba(203,123,27,0.45)',
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

      <LayoutGroup>
        <nav className="mb-8 flex gap-2 overflow-x-auto border-b border-[rgba(185,48,158,0.15)] pb-1" aria-label="Secciones del panel">
          {TAB_KEYS.map((tab) => {
            const isActive = activeTab === tab
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={cn(
                  'relative shrink-0 whitespace-nowrap rounded-full px-4 py-2 font-[var(--font-jetbrains)] text-[10px] tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-magenta)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-base)] sm:text-xs',
                  isActive ? 'text-white' : '',
                )}
                style={{
                  background: isActive ? 'rgba(185,48,158,0.12)' : 'transparent',
                  color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
                }}
                aria-current={isActive ? 'page' : undefined}
              >
                {tab}
                {isActive ? (
                  <motion.span layoutId="hq-tab-line" className="absolute inset-x-3 -bottom-1 h-0.5 rounded-full" style={{ background: 'var(--color-magenta)' }} />
                ) : null}
              </button>
            )
          })}
        </nav>
      </LayoutGroup>

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
