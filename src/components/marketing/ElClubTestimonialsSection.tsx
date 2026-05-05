'use client'

import { motion, useReducedMotion } from 'framer-motion'

import { GeometricMemberAvatar } from '@/components/marketing/GeometricMemberAvatar'
import { CLUB_TESTIMONIALS } from '@/lib/el-club'

const SENSUAL_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: SENSUAL_EASE } },
} as const

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: SENSUAL_EASE } },
} as const

export function ElClubTestimonialsSection() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.section
      className="mt-20"
      variants={sectionVariants}
      initial={shouldReduceMotion ? false : 'hidden'}
      whileInView={shouldReduceMotion ? undefined : 'visible'}
      viewport={{ once: true, margin: '-50px' }}
      aria-labelledby="club-social-heading"
    >
      <h2 id="club-social-heading" className="font-[var(--font-playfair)] text-2xl text-white">
        Voces del protocolo
      </h2>
      <p className="mt-2 font-[var(--font-inter)] text-sm" style={{ color: 'var(--color-text-muted)' }}>
        Testimonios anónimos de miembros verificados.
      </p>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {CLUB_TESTIMONIALS.map((t) => (
          <motion.figure
            key={t.id}
            variants={staggerItem}
            initial={shouldReduceMotion ? false : 'hidden'}
            whileInView={shouldReduceMotion ? undefined : 'visible'}
            viewport={{ once: true, margin: '-20px' }}
            className="rounded-2xl border border-[rgba(185,48,158,0.12)] p-5"
            style={{ background: 'var(--color-bg-elevated)', boxShadow: 'var(--glow-card)' }}
          >
            <div className="flex items-start gap-3">
              <GeometricMemberAvatar variant={t.avatarVariant} className="h-14 w-14 shrink-0 rounded-xl" />
              <blockquote className="font-[var(--font-inter)] text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                “{t.quote}”
              </blockquote>
            </div>
            <figcaption className="mt-4 font-[var(--font-jetbrains)] text-[10px] tracking-wide" style={{ color: 'var(--color-text-muted)' }}>
              Miembro verificado · Arquetipo: {t.archetypeName}
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </motion.section>
  )
}
