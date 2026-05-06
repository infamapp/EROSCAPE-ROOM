'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Bell, BookOpen, MessageSquare, Music, RefreshCw, ShieldCheck, type LucideIcon } from 'lucide-react'

import { APP_MOVIL_FEATURES, type AppMovilFeatureId } from '@/lib/app-movil'

const SENSUAL_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

const gridContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.06 } },
}

const gridItem = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.48, ease: SENSUAL_EASE } },
}

function iconForFeature(id: AppMovilFeatureId): LucideIcon {
  switch (id) {
    case 'curacion':
      return RefreshCw
    case 'palabra':
      return ShieldCheck
    case 'preludio':
      return Bell
    case 'conserjeria':
      return MessageSquare
    case 'diario':
      return BookOpen
    case 'erosense':
      return Music
  }
}

export function AppMovilArchitectureSection() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="px-4 py-20 sm:px-6 sm:py-28" style={{ background: 'var(--color-bg-elevated)' }}>
      <div className="mx-auto max-w-6xl">
        <header className="mb-14 space-y-3 text-center sm:mb-20">
          <h2 className="text-4xl font-semibold text-white [font-family:var(--font-playfair)] sm:text-5xl">
            Arquitectura del placer
          </h2>
          <p className="mx-auto max-w-xl font-(--font-inter) text-sm text-(--color-text-muted) sm:text-base">
            Funcionalidades pensadas para la inmersión total, sin ruido ni prisas.
          </p>
        </header>

        <motion.ul
          className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3"
          variants={reduceMotion ? undefined : gridContainer}
          initial={reduceMotion ? false : 'hidden'}
          whileInView={reduceMotion ? undefined : 'visible'}
          viewport={{ once: true, margin: '-40px' }}
        >
          {APP_MOVIL_FEATURES.map((f) => {
            const Icon = iconForFeature(f.id)
            return (
              <motion.li key={f.id} variants={reduceMotion ? undefined : gridItem}>
                <article className="group flex h-full flex-col gap-4 rounded-2xl border-(--border-subtle) bg-(--color-bg-elevated) p-5 transition-[box-shadow,transform,border-color] duration-300 hover:-translate-y-1 hover:[box-shadow:var(--glow-card)] hover:border-[color-mix(in_srgb,var(--color-magenta)_40%,transparent)]">
                  <Icon
                    className="size-5 text-(--color-purple-muted)"
                    aria-hidden="true"
                    strokeWidth={1.6}
                  />
                  <h3 className="text-base font-bold text-(--color-gold-light) [font-family:var(--font-playfair)]">
                    {f.title}
                  </h3>
                  <p className="font-(--font-inter) text-sm leading-relaxed text-(--color-text-secondary)">{f.body}</p>
                </article>
              </motion.li>
            )
          })}
        </motion.ul>
      </div>
    </section>
  )
}
