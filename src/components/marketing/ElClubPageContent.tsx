'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'

import { ElClubComparisonTable } from '@/components/marketing/ElClubComparisonTable'
import { ElClubHero } from '@/components/marketing/ElClubHero'
import { ElClubMembershipActions } from '@/components/marketing/ElClubMembershipActions'
import { ElClubTestimonialsSection } from '@/components/marketing/ElClubTestimonialsSection'
import { ElClubTierGrid } from '@/components/marketing/ElClubTierGrid'
import { setClubMemberLocalStorage, type ClubTierDefinition, type ClubTierId } from '@/lib/el-club'

const SENSUAL_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

const toastVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: SENSUAL_EASE } },
  exit: { opacity: 0, y: 12, transition: { duration: 0.2, ease: SENSUAL_EASE } },
} as const

export function ElClubPageContent() {
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
    setDemoHint('Insignia activa en este dispositivo. Abre tu sede de agente para verla.')
  }, [])

  return (
    <main className="pb-24 pt-20">
      <ElClubHero />

      <div className="mx-auto max-w-6xl px-4 pt-14 sm:px-6">
        <ElClubTierGrid hoveredTier={hoveredTier} onHoverTier={setHoveredTier} onActivate={handleActivate} />

        <div className="mt-20">
          <ElClubComparisonTable />
        </div>

        <ElClubTestimonialsSection />

        <ElClubMembershipActions
          onNotifyLaunch={() => setToast('Disponible próximamente · Stripe Subscriptions')}
          onDemoBadge={handleDemoBadge}
          demoHint={demoHint}
        />
      </div>

      <AnimatePresence>
        {toast ? (
          <motion.div
            role="status"
            className="fixed bottom-6 left-1/2 z-[70] w-[min(92vw,28rem)] -translate-x-1/2 rounded-xl border px-4 py-3 font-[var(--font-jetbrains)] text-xs shadow-lg"
            style={{
              borderColor: 'rgba(185,48,158,0.35)',
              background: 'rgba(8,0,8,0.96)',
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
