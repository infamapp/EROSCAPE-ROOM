'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Drama, Handshake, MessageCircle, Moon, type LucideIcon } from 'lucide-react'

import { SEGURIDAD_PROCESS_STEPS, type SeguridadProcessStepId } from '@/lib/la-sociedad-seguridad'

const SENSUAL_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

function stepIcon(id: SeguridadProcessStepId): LucideIcon {
  switch (id) {
    case 'consulta':
      return MessageCircle
    case 'briefing':
      return Handshake
    case 'durante':
      return Drama
    case 'aftercare':
      return Moon
  }
}

export function SeguridadProcess() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="relative px-4 py-20 sm:px-6 sm:py-28">
      <div className="relative mx-auto max-w-7xl">
        <div className="pointer-events-none hidden md:block">
          <div className="absolute left-0 right-0 top-12 z-0 h-px bg-[color-mix(in_srgb,var(--color-magenta)_18%,transparent)]" aria-hidden="true" />
          <div className="absolute left-0 right-0 top-12 z-0 h-px overflow-hidden">
            <motion.div
              className="h-full w-full origin-left bg-[var(--color-magenta-glow)]"
              style={{ boxShadow: '0 0 16px color-mix(in srgb, var(--color-magenta-glow) 35%, transparent)' }}
              initial={reduceMotion ? false : { scaleX: 0 }}
              whileInView={reduceMotion ? undefined : { scaleX: 1 }}
              viewport={{ once: true, margin: '-20%' }}
              transition={{ duration: 1.8, ease: SENSUAL_EASE }}
            />
          </div>
        </div>

        <ol className="relative z-10 flex flex-col gap-14 md:flex-row md:justify-between md:gap-8">
          {SEGURIDAD_PROCESS_STEPS.map((step, index) => {
            const Icon = stepIcon(step.id)
            return (
              <li key={step.id} className="group flex-1 md:max-w-[22%]">
                <div className="glass-card-detail mb-6 flex size-20 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--color-magenta)_28%,transparent)] transition-transform duration-500 group-hover:scale-110 group-hover:border-[color-mix(in_srgb,var(--color-magenta)_50%,transparent)] sm:size-24">
                  <Icon className="size-9 text-[var(--color-magenta-glow)] sm:size-10" aria-hidden="true" strokeWidth={1.15} />
                </div>
                <p className="font-(--font-jetbrains) text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h2 className="mt-2 font-(--font-playfair) text-xl text-white sm:text-2xl">{step.title}</h2>
                <p className="mt-3 font-(--font-inter) text-sm leading-relaxed text-[var(--color-text-muted)]">{step.body}</p>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
