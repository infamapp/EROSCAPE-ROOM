'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { AlertOctagon, Brain, Map } from 'lucide-react'

import { cn } from '@/lib/utils'

const SENSUAL_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: SENSUAL_EASE, delay: i * 0.08 },
  }),
}

export function AppMovilInRoomFeatures() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="mx-auto max-w-5xl px-4 sm:px-6" aria-labelledby="app-in-room-heading">
      <h2 id="app-in-room-heading" className="font-[var(--font-playfair)] text-2xl text-white">
        En la sala
      </h2>
      <p className="mt-2 font-[var(--font-inter)] text-sm" style={{ color: 'var(--color-text-muted)' }}>
        Herramientas pensadas para el momento de la misión.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <motion.article
          custom={0}
          variants={cardVariants}
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView={shouldReduceMotion ? undefined : 'visible'}
          viewport={{ once: true, margin: '-40px' }}
          className="rounded-2xl border border-[rgba(185,48,158,0.15)] p-6"
          style={{ background: 'var(--color-bg-elevated)', boxShadow: 'var(--glow-card)' }}
        >
          <Brain className="h-9 w-9" style={{ color: 'var(--color-magenta)' }} aria-hidden="true" />
          <h3 className="mt-4 font-[var(--font-jetbrains)] text-sm tracking-wide text-white">Inventario Digital</h3>
          <p className="mt-2 font-[var(--font-inter)] text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
            Gestiona los elementos de la sala desde la App.
          </p>
        </motion.article>

        <motion.article
          custom={1}
          variants={cardVariants}
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView={shouldReduceMotion ? undefined : 'visible'}
          viewport={{ once: true, margin: '-40px' }}
          className="rounded-2xl border border-[rgba(185,48,158,0.15)] p-6"
          style={{ background: 'var(--color-bg-elevated)', boxShadow: 'var(--glow-card)' }}
        >
          <Map className="h-9 w-9" style={{ color: 'var(--color-purple-muted)' }} aria-hidden="true" />
          <h3 className="mt-4 font-[var(--font-jetbrains)] text-sm tracking-wide text-white">Control de Sala</h3>
          <p className="mt-2 font-[var(--font-inter)] text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
            Accede a pistas y mecánicas digitales en tiempo real.
          </p>
        </motion.article>
      </div>

      <motion.article
        custom={2}
        variants={cardVariants}
        initial={shouldReduceMotion ? false : 'hidden'}
        whileInView={shouldReduceMotion ? undefined : 'visible'}
        viewport={{ once: true, margin: '-40px' }}
        className={cn('relative mt-6 overflow-hidden rounded-2xl border-2 p-7 sm:p-8')}
        style={{
          borderColor: 'color-mix(in srgb, var(--color-gm-alert) 55%, transparent)',
          background: 'color-mix(in srgb, var(--color-gm-alert) 12%, var(--color-bg-elevated))',
          boxShadow:
            '0 0 0 1px color-mix(in srgb, var(--color-gm-alert) 22%, transparent), 0 12px 48px color-mix(in srgb, var(--color-gm-alert) 15%, transparent)',
        }}
      >
        <div
          className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-30 blur-2xl"
          style={{ background: 'var(--color-gm-alert)' }}
          aria-hidden="true"
        />
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
          <AlertOctagon className="h-11 w-11 shrink-0 sm:h-12 sm:w-12" style={{ color: 'var(--color-gm-alert)' }} aria-hidden="true" />
          <div>
            <h3 className="font-[var(--font-jetbrains)] text-sm font-medium tracking-[0.18em]" style={{ color: 'var(--color-gm-alert)' }}>
              BOTÓN DE PÁNICO
            </h3>
            <p className="mt-3 max-w-3xl font-[var(--font-inter)] text-base leading-relaxed text-white sm:text-lg">
              Un toque detiene todo. Luces. Staff. Seguridad.
            </p>
            <p className="mt-3 font-[var(--font-inter)] text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              Prioridad absoluta en el protocolo Eroscape. Visible y accesible durante toda la misión.
            </p>
          </div>
        </div>
      </motion.article>
    </section>
  )
}
