'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'

import { cn } from '@/lib/utils'

const SENSUAL_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: SENSUAL_EASE } },
}

export interface CtaHelpSectionClientProps {
  className?: string
}

export function CtaHelpSectionClient({ className }: CtaHelpSectionClientProps) {
  const shouldReduceMotion = useReducedMotion()
  const shouldAnimate = !shouldReduceMotion

  return (
    <section
      className={cn(
        'relative w-full border-y border-(--border-subtle) py-14 sm:py-20 lg:py-24',
        className,
      )}
      style={{
        background:
          'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.00) 55%, rgba(255,255,255,0.02) 100%), var(--color-bg-base)',
      }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          variants={shouldAnimate ? containerVariants : undefined}
          initial={shouldAnimate ? 'hidden' : false}
          whileInView={shouldAnimate ? 'visible' : undefined}
          viewport={{ once: true, margin: '-20%' }}
          className="grid gap-5 md:grid-cols-2 md:gap-6"
        >
          <motion.div
            variants={shouldAnimate ? cardVariants : undefined}
            className="rounded-2xl border-(--border-subtle) p-8 [box-shadow:var(--glow-card)]"
            style={{ background: 'var(--gradient-help-cta-card)' }}
          >
            <p className="font-(--font-jetbrains) text-[10px] uppercase tracking-[0.22em] text-(--color-text-muted) sm:text-[11px]">
              EL GAME MASTER SUGIERE
            </p>
            <h3 className="mt-4 font-(--font-cormorant) text-2xl text-white sm:text-3xl">
              ¿No sabés cuál elegir?
            </h3>
            <p className="mt-4 font-(--font-inter) text-sm leading-relaxed text-(--color-text-secondary) sm:text-base">
              Contestás un par de preguntas y te recomendamos la experiencia perfecta para vos.
            </p>

            <div className="mt-8">
              <Link
                href="/reservar"
                className="inline-flex w-full items-center justify-center rounded-full px-8 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-[filter,transform] duration-200 hover:brightness-110 active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg-base) sm:w-auto"
                style={{ background: 'var(--gradient-cta)', boxShadow: 'var(--glow-magenta)' }}
              >
                AYUDAME A ELEGIR
              </Link>
            </div>
          </motion.div>

          <motion.div
            variants={shouldAnimate ? cardVariants : undefined}
            className="rounded-2xl border-(--border-gold) p-8 [box-shadow:var(--glow-gold)]"
            style={{ background: 'var(--color-bg-elevated)' }}
          >
            <p className="font-(--font-jetbrains) text-[10px] uppercase tracking-[0.22em] text-(--color-text-muted) sm:text-[11px]">
              PARA LOS QUE QUIEREN MÁS
            </p>
            <h3 className="mt-4 font-(--font-cormorant) text-2xl text-white sm:text-3xl">
              La Sociedad
            </h3>
            <p className="mt-4 font-(--font-inter) text-sm leading-relaxed text-(--color-text-secondary) sm:text-base">
              Acceso anticipado, eventos privados y una comunidad que entiende el placer como vos.
            </p>

            <div className="mt-8">
              <Link
                href="/la-sociedad"
                className="inline-flex w-full items-center justify-center rounded-full border px-8 py-3 text-xs font-semibold uppercase tracking-[0.18em] transition-[filter,transform,background-color] duration-200 hover:brightness-110 active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-gold-light) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg-base) sm:w-auto"
                style={{
                  border: 'var(--border-gold)',
                  color: 'var(--color-gold-light)',
                  background: 'transparent',
                }}
              >
                DESCUBRIR LA SOCIEDAD
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

