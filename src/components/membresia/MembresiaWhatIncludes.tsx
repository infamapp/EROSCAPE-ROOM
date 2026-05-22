'use client'

import { motion, useReducedMotion } from 'framer-motion'

import { MEMBRESIA_COPY, MEMBRESIA_PILLARS } from '@/lib/membresia'
import { cn } from '@/lib/utils'

const SENSUAL_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
} as const

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: SENSUAL_EASE } },
} as const

export function MembresiaWhatIncludes() {
  const reduceMotion = useReducedMotion()

  return (
    <section
      id="que-incluye"
      className="scroll-mt-28 border-t border-white/6 px-4 py-16 sm:px-6 sm:py-20"
      aria-labelledby="membresia-pillars-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="membresia-pillars-heading"
            className="font-(--font-playfair) text-3xl font-bold tracking-[0.04em] text-white sm:text-4xl"
          >
            {MEMBRESIA_COPY.pillarsHeading}
          </h2>
          <p className="mt-3 font-(--font-inter) text-sm leading-relaxed text-(--color-text-secondary) sm:text-base">
            {MEMBRESIA_COPY.pillarsSub}
          </p>
        </div>

        <motion.ul
          className="mt-12 grid gap-5 lg:grid-cols-3 lg:gap-6"
          variants={reduceMotion ? undefined : containerVariants}
          initial={reduceMotion ? false : 'hidden'}
          whileInView={reduceMotion ? undefined : 'visible'}
          viewport={{ once: true, margin: '-10%' }}
        >
          {MEMBRESIA_PILLARS.map((pillar) => {
            const PillarIcon = pillar.Icon
            return (
              <motion.li
                key={pillar.id}
                variants={reduceMotion ? undefined : itemVariants}
                className={cn(
                  'flex flex-col rounded-2xl border border-white/12 bg-(--color-bg-subtle) p-6 sm:p-7',
                  pillar.id === 'tocador' && 'lg:-mt-1 lg:border-(--color-magenta)/35',
                )}
                style={pillar.id === 'tocador' ? { boxShadow: 'var(--glow-card)' } : undefined}
              >
                <span
                  className="flex size-11 items-center justify-center rounded-full border border-white/10 bg-[color-mix(in_srgb,var(--color-magenta)_12%,transparent)] text-(--color-magenta-glow)"
                  aria-hidden="true"
                >
                  <PillarIcon className="size-5" strokeWidth={1.35} />
                </span>
                <h3 className="mt-4 font-(--font-playfair) text-xl text-(--color-gold-light) sm:text-2xl">{pillar.title}</h3>
                <p className="mt-3 flex-1 font-(--font-inter) text-sm leading-relaxed text-(--color-text-secondary)">
                  {pillar.body}
                </p>
                <p className="mt-4 border-t border-white/8 pt-4 font-(--font-jetbrains) text-[10px] uppercase tracking-[0.14em] text-(--color-text-muted)">
                  {pillar.detail}
                </p>
              </motion.li>
            )
          })}
        </motion.ul>
      </div>
    </section>
  )
}
