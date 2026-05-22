'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'

import { MembresiaFeatures } from '@/components/membresia/MembresiaFeatures'
import { MembresiaHero } from '@/components/membresia/MembresiaHero'
import { MembresiaWhatIncludes } from '@/components/membresia/MembresiaWhatIncludes'
import { ElClubComparisonTable } from '@/components/marketing/ElClubComparisonTable'
import { ElClubMembershipActions } from '@/components/marketing/ElClubMembershipActions'
import { ElClubTestimonialsSection } from '@/components/marketing/ElClubTestimonialsSection'
import { ElClubTierGrid } from '@/components/marketing/ElClubTierGrid'
import { MEMBRESIA_COPY } from '@/lib/membresia'
import { setClubMemberLocalStorage, type ClubTierDefinition, type ClubTierId } from '@/lib/el-club'

const SENSUAL_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

const toastVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: SENSUAL_EASE } },
  exit: { opacity: 0, y: 12, transition: { duration: 0.2, ease: SENSUAL_EASE } },
} as const

export function MembresiaPageContent() {
  const [hoveredTier, setHoveredTier] = useState<ClubTierId | null>(null)
  const [toast, setToast] = useState<string | null>(null)
  const [demoHint, setDemoHint] = useState<string | null>(null)

  useEffect(() => {
    if (!toast) return undefined
    const id = window.setTimeout(() => setToast(null), 4200)
    return () => window.clearTimeout(id)
  }, [toast])

  const handleActivate = useCallback((tier: ClubTierDefinition) => {
    setToast(`Disponible próximamente · ${tier.name}`)
  }, [])

  const handleDemoBadge = useCallback(() => {
    setClubMemberLocalStorage(true)
    setDemoHint('Insignia activa en este dispositivo. Abre tu espacio de reserva para verla.')
  }, [])

  return (
    <main className="membresia-page-root min-h-screen bg-(--color-bg-base) pb-24">
      <MembresiaHero />
      <MembresiaWhatIncludes />

      <section
        id="niveles"
        className="scroll-mt-28 border-t border-white/6 px-4 py-16 sm:px-6 sm:py-20"
        aria-labelledby="membresia-tiers-heading"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 id="membresia-tiers-heading" className="font-(--font-playfair) text-3xl font-bold text-white sm:text-4xl">
              {MEMBRESIA_COPY.tiersHeading}
            </h2>
            <p className="mt-3 font-(--font-inter) text-sm text-(--color-text-secondary) sm:text-base">
              {MEMBRESIA_COPY.tiersSub}
            </p>
            <p className="mt-4 font-(--font-inter) text-xs text-(--color-text-muted)">
              ¿Solo boutique?{' '}
              <Link href="/boutique" className="text-(--color-magenta-glow) underline-offset-4 hover:underline">
                Explora El Tocador
              </Link>
              {' · '}
              <Link href="/la-sociedad" className="text-(--color-magenta-glow) underline-offset-4 hover:underline">
                La Sociedad
              </Link>
            </p>
          </div>

          <ElClubTierGrid hoveredTier={hoveredTier} onHoverTier={setHoveredTier} onActivate={handleActivate} />

          <div className="mt-20">
            <ElClubComparisonTable />
          </div>
        </div>
      </section>

      <MembresiaFeatures />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="border-t border-white/6 pt-4">
          <p className="font-(--font-jetbrains) text-[10px] uppercase tracking-[0.2em] text-(--color-text-muted)">
            {MEMBRESIA_COPY.testimonialsHeading}
          </p>
        </div>
        <ElClubTestimonialsSection />
        <ElClubMembershipActions
          onNotifyLaunch={() => setToast('Disponible próximamente · suscripción recurrente')}
          onDemoBadge={handleDemoBadge}
          demoHint={demoHint}
        />
      </div>

      <AnimatePresence>
        {toast ? (
          <motion.div
            role="status"
            className="fixed bottom-6 left-1/2 z-[70] w-[min(92vw,28rem)] -translate-x-1/2 rounded-xl border px-4 py-3 font-(--font-jetbrains) text-xs shadow-lg"
            style={{
              borderColor: 'color-mix(in srgb, var(--color-magenta) 35%, transparent)',
              background: 'color-mix(in srgb, var(--color-bg-base) 96%, transparent)',
              color: 'var(--color-text-secondary)',
              boxShadow: 'var(--glow-card)',
            }}
            variants={toastVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {toast}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </main>
  )
}
