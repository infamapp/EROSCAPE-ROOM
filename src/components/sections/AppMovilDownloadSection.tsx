'use client'

import { motion, useReducedMotion } from 'framer-motion'

import { AppMovilPlaceholderQr } from '@/components/sections/AppMovilPlaceholderQr'
import { AppStoreBadgeSvg, GooglePlayBadgeSvg } from '@/components/sections/AppMovilStoreBadges'
import { APP_MOVIL_STORES_ANCHOR_ID, APP_STORE_URL, GOOGLE_PLAY_URL } from '@/lib/app-movil'

const SENSUAL_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: SENSUAL_EASE } },
} as const

export function AppMovilDownloadSection() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.section
      id={APP_MOVIL_STORES_ANCHOR_ID}
      className="scroll-mt-24 border-t border-[rgba(185,48,158,0.12)] px-4 py-16 sm:px-6"
      style={{ background: 'color-mix(in srgb, var(--color-bg-subtle) 88%, transparent)' }}
      variants={sectionVariants}
      initial={shouldReduceMotion ? false : 'hidden'}
      whileInView={shouldReduceMotion ? undefined : 'visible'}
      viewport={{ once: true, margin: '-60px' }}
      aria-labelledby="app-download-heading"
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-10 md:flex-row md:items-start md:justify-between">
        <div className="text-center md:text-left">
          <h2 id="app-download-heading" className="font-[var(--font-playfair)] text-2xl text-white">
            Descarga directa
          </h2>
          <p className="mt-2 max-w-md font-[var(--font-inter)] text-sm" style={{ color: 'var(--color-text-muted)' }}>
            Código de demostración: enlaza a los botones de tienda. Próximamente QR dinámico con deep link.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:justify-center md:justify-start">
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-magenta)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-base)]"
              aria-label="Descargar en App Store"
            >
              <AppStoreBadgeSvg className="h-11 w-auto sm:h-12" />
            </a>
            <a
              href={GOOGLE_PLAY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-magenta)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-base)]"
              aria-label="Descargar en Google Play"
            >
              <GooglePlayBadgeSvg className="h-11 w-auto sm:h-12" />
            </a>
          </div>
        </div>
        <div
          className="flex flex-col items-center rounded-2xl border p-6"
          style={{ borderColor: 'rgba(185,48,158,0.2)', background: 'var(--color-bg-elevated)', boxShadow: 'var(--glow-card)' }}
        >
          <p className="font-[var(--font-jetbrains)] text-[10px] tracking-[0.2em]" style={{ color: 'var(--color-text-muted)' }}>
            QR (DEMO)
          </p>
          <div className="mt-4">
            <AppMovilPlaceholderQr className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-magenta)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-elevated)]" />
          </div>
        </div>
      </div>
    </motion.section>
  )
}
