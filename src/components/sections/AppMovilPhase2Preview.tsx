'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Lock } from 'lucide-react'

const SENSUAL_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: SENSUAL_EASE } },
} as const

function FeedSkeletonRow() {
  return (
    <div className="flex gap-3 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(8,0,8,0.6)] p-3">
      <div className="h-10 w-10 shrink-0 rounded-full" style={{ background: 'var(--color-bg-subtle)' }} />
      <div className="min-w-0 flex-1 space-y-2 pt-1">
        <div className="h-2 w-1/3 rounded-full bg-white/10" />
        <div className="h-2 w-full rounded-full bg-white/5" />
        <div className="h-2 w-4/5 rounded-full bg-white/5" />
      </div>
    </div>
  )
}

export function AppMovilPhase2Preview() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.section
      className="mx-auto max-w-5xl px-4 pb-20 pt-16 sm:px-6"
      variants={sectionVariants}
      initial={shouldReduceMotion ? false : 'hidden'}
      whileInView={shouldReduceMotion ? undefined : 'visible'}
      viewport={{ once: true, margin: '-50px' }}
      aria-labelledby="app-phase2-heading"
    >
      <h2 id="app-phase2-heading" className="font-[var(--font-playfair)] text-2xl text-white">
        Red social
      </h2>
      <p className="mt-2 max-w-2xl font-[var(--font-inter)] text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
        Conecta con otros operativos. Comparte logros. Encuentra tu siguiente misión.
      </p>

      <div className="relative mt-10 overflow-hidden rounded-2xl border border-[rgba(185,48,158,0.15)]" style={{ background: 'var(--color-bg-elevated)' }}>
        <div
          className="pointer-events-none select-none space-y-3 p-5"
          style={{ filter: shouldReduceMotion ? undefined : 'blur(12px)' }}
          aria-hidden="true"
        >
          <FeedSkeletonRow />
          <FeedSkeletonRow />
          <FeedSkeletonRow />
          <FeedSkeletonRow />
        </div>
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center"
          style={{
            background:
              'linear-gradient(180deg, color-mix(in srgb, var(--color-bg-base) 55%, transparent) 0%, color-mix(in srgb, var(--color-bg-base) 88%, transparent) 100%)',
          }}
        >
          <Lock className="h-8 w-8 text-white/80" aria-hidden="true" />
          <p className="font-[var(--font-jetbrains)] text-xs tracking-[0.35em] text-white">PRÓXIMAMENTE</p>
          <p className="max-w-sm font-[var(--font-inter)] text-xs" style={{ color: 'var(--color-text-muted)' }}>
            Fase 2. Contenido bloqueado hasta apertura del protocolo social.
          </p>
        </div>
      </div>
    </motion.section>
  )
}
