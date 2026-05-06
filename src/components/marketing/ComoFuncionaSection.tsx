'use client'

import Link from 'next/link'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import {
  Compass,
  SlidersHorizontal,
  Package,
  PenLine,
  Unlock,
} from 'lucide-react'

import { cn } from '@/lib/utils'
import { useRef } from 'react'

const SENSUAL_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

const headerVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: SENSUAL_EASE },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: SENSUAL_EASE, delay: index * 0.15 },
  }),
}

interface RitualStep {
  act: 'I' | 'II' | 'III' | 'IV' | 'V'
  label: string
  icon: LucideIcon
  desc: string
}

const STEPS: readonly RitualStep[] = [
  { act: 'I', label: 'EL ENCUENTRO', icon: Compass, desc: 'Elegís la experiencia y la ciudad. El universo se prepara para vosotros.' },
  { act: 'II', label: 'TUS DESEOS', icon: SlidersHorizontal, desc: 'Nos contás con quién venís y hasta dónde queréis llegar. Sin presión.' },
  { act: 'III', label: 'TU BAÚL', icon: Package, desc: 'Personalizás la noche con extras que elevan cada detalle.' },
  { act: 'IV', label: 'EL JURAMENTO', icon: PenLine, desc: 'Confirmás tus límites y elegís tu palabra mágica. El control es tuyo.' },
  { act: 'V', label: 'LAS PUERTAS SE ABREN', icon: Unlock, desc: 'La noche es vuestra. El resto es historia.' },
] as const

interface TimelineStepProps {
  data: RitualStep
  index: number
  shouldAnimate: boolean
}

function TimelineStep({ data, index, shouldAnimate }: TimelineStepProps) {
  const reduceMotion = useReducedMotion()
  const Icon = data.icon

  return (
    <motion.li
      custom={index}
      variants={shouldAnimate ? itemVariants : undefined}
      initial={shouldAnimate ? 'hidden' : false}
      whileInView={shouldAnimate ? 'visible' : undefined}
      viewport={{ once: true, margin: '-20%' }}
      className="relative z-10 flex min-w-0 flex-1 flex-col items-center text-center"
    >
      <div
        className={cn(
          'relative mb-5 sm:mb-6',
          !reduceMotion && 'motion-safe:transition-transform motion-safe:duration-300 motion-safe:hover:scale-[1.03]',
        )}
      >
        <div
          className="flex h-12 w-12 items-center justify-center rounded-full border sm:h-12 sm:w-12"
          style={{
            borderColor: 'var(--color-magenta)',
            background: 'var(--color-bg-base)',
          }}
        >
          <Icon className="size-6 text-(--color-magenta)" strokeWidth={1.6} aria-hidden="true" />
        </div>
        <span
          className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full font-(--font-jetbrains) text-[10px] text-white"
          style={{
            background: 'var(--gradient-cta)',
            boxShadow: 'var(--glow-magenta)',
          }}
          aria-hidden="true"
        >
          {data.act}
        </span>
      </div>

      <h3 className="max-w-56 font-(--font-jetbrains) text-[11px] uppercase tracking-[0.18em] text-white">
        {data.label}
      </h3>
      <p className="mt-3 max-w-60 font-(--font-inter) text-sm leading-relaxed text-(--color-text-secondary) sm:max-w-[16rem]">
        {data.desc}
      </p>
    </motion.li>
  )
}

export function ComoFuncionaSection() {
  const shouldReduceMotion = useReducedMotion()
  const shouldAnimate = !shouldReduceMotion
  const lineRef = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(lineRef, { margin: '-20%', once: true })

  return (
    <section
      id="como-funciona"
      className="relative w-full scroll-mt-24 border-t border-[rgba(185,48,158,0.1)] py-16 sm:py-24 lg:py-28"
      style={{ background: 'var(--color-bg-base)' }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.header
          variants={shouldAnimate ? headerVariants : undefined}
          initial={shouldAnimate ? 'hidden' : false}
          whileInView={shouldAnimate ? 'visible' : undefined}
          viewport={{ once: true, margin: '-20%' }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="font-(--font-jetbrains) text-[10px] uppercase tracking-[0.22em] text-(--color-text-muted) sm:text-[11px]">
            EL RITUAL
          </p>
          <h2 className="mt-4 font-(--font-cormorant) text-3xl italic text-(--color-text-primary) sm:text-4xl">
            ¿Cómo funciona una noche en Eroscape?
          </h2>
          <p className="mt-4 font-(--font-inter) text-sm text-(--color-text-secondary) sm:text-base">
            Cinco momentos que transforman una reserva en una experiencia.
          </p>
        </motion.header>

        <div className="relative mt-14 sm:mt-16 lg:mt-20">
          {/* Desktop connector line */}
          <div className="pointer-events-none absolute left-6 right-6 top-6 z-0 hidden h-px md:block" aria-hidden="true">
            <div className="h-full w-full bg-(--color-magenta-dim)/30" />
            <motion.div
              ref={lineRef}
              className="absolute left-0 top-0 h-full"
              style={{
                background: 'linear-gradient(90deg, var(--color-magenta-dim), var(--color-magenta))',
              }}
              initial={shouldReduceMotion ? { width: '100%' } : { width: '0%' }}
              animate={shouldReduceMotion ? { width: '100%' } : isInView ? { width: '100%' } : { width: '0%' }}
              transition={shouldReduceMotion ? undefined : { duration: 0.8, ease: SENSUAL_EASE }}
            />
          </div>

          {/* Mobile vertical spine */}
          <div className="pointer-events-none absolute left-4 top-0 hidden h-full w-px bg-(--color-magenta-dim) md:hidden" aria-hidden="true" />

          <ol className="relative z-10 flex list-none flex-col gap-10 md:flex-row md:justify-between md:gap-4 lg:gap-6">
            {STEPS.map((step, index) => (
              <li key={step.act} className="md:flex-1">
                <div className="md:hidden relative pl-10">
                  <div className="absolute left-[15px] top-2 h-full w-px bg-(--color-magenta-dim)/40" aria-hidden="true" />
                  <motion.div
                    custom={index}
                    variants={shouldAnimate ? itemVariants : undefined}
                    initial={shouldAnimate ? 'hidden' : false}
                    whileInView={shouldAnimate ? 'visible' : undefined}
                    viewport={{ once: true, margin: '-20%' }}
                    className="relative"
                  >
                    <div className="absolute -left-10 top-0 flex h-12 w-12 items-center justify-center rounded-full border border-(--color-magenta) bg-(--color-bg-base)">
                      <step.icon className="size-6 text-(--color-magenta)" strokeWidth={1.6} aria-hidden="true" />
                      <span
                        className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full font-(--font-jetbrains) text-[10px] text-white"
                        style={{ background: 'var(--gradient-cta)', boxShadow: 'var(--glow-magenta)' }}
                        aria-hidden="true"
                      >
                        {step.act}
                      </span>
                    </div>
                    <h3 className="font-(--font-jetbrains) text-[11px] uppercase tracking-[0.18em] text-white">
                      {step.label}
                    </h3>
                    <p className="mt-2 font-(--font-inter) text-sm leading-relaxed text-(--color-text-secondary)">
                      {step.desc}
                    </p>
                  </motion.div>
                </div>

                <div className="hidden md:block">
                  <TimelineStep data={step} index={index} shouldAnimate={shouldAnimate} />
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/reservar"
            className="inline-flex items-center justify-center rounded-full px-8 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-[filter,transform] duration-200 hover:brightness-110 active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
            style={{ background: 'var(--gradient-cta)' }}
          >
            [ EMPEZAR AHORA ]
          </Link>
        </div>
      </div>
    </section>
  )
}
