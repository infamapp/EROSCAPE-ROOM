'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

import { cn } from '@/lib/utils'

const SENSUAL_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

const helpCardReveal = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: SENSUAL_EASE },
  },
}

export interface CtaSectionProps {
  /** Título principal de la tarjeta */
  title?: string
  /** Párrafo bajo el título */
  description?: string
  /** Texto del botón */
  ctaLabel?: string
  /** Destino del CTA */
  ctaHref?: string
  /** Clases extra en el contenedor exterior */
  className?: string
  /** Ancla opcional para la sección */
  id?: string
}

export function CtaSection({
  title = '¿No sabes cuál elegir?',
  description = 'Cuéntanos un poco sobre ti y te recomendamos la experiencia perfecta para tu noche.',
  ctaLabel = 'AYÚDAME A ELEGIR →',
  ctaHref = '/reservar',
  className,
  id,
}: CtaSectionProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section
      id={id}
      className={cn('w-full py-14 sm:py-20 lg:py-24', className)}
      style={{ background: 'var(--color-bg-base)' }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          variants={shouldReduceMotion ? undefined : helpCardReveal}
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView={shouldReduceMotion ? undefined : 'visible'}
          viewport={{ once: true, margin: '-10%' }}
        >
          <div
            className="mx-auto max-w-3xl rounded-3xl border px-6 py-10 text-center sm:px-12 sm:py-12"
            style={{
              background: 'var(--gradient-help-cta-card)',
              borderColor: 'rgba(185,48,158,0.25)',
              boxShadow: 'var(--glow-card)',
            }}
          >
            <div className="mx-auto mb-4 flex justify-center text-(--color-magenta-glow)">
              <Sparkles className="size-8 sm:size-9" aria-hidden="true" />
            </div>
            <h2 className="font-(--font-cormorant) text-2xl text-white sm:text-3xl">{title}</h2>
            <p className="mx-auto mt-4 max-w-xl font-(--font-inter) text-sm leading-relaxed text-(--color-text-secondary) sm:text-base">
              {description}
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                href={ctaHref}
                className="inline-flex items-center justify-center rounded-full px-8 py-3 font-(--font-playfair) text-sm tracking-[0.12em] text-white transition-[filter,transform] duration-300 hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg-base)"
                style={{ background: 'var(--gradient-cta)', boxShadow: 'var(--glow-magenta)' }}
              >
                {ctaLabel}
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
