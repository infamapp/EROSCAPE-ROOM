'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { BookOpen, Brain, EyeOff, Flame, Shield } from 'lucide-react'

const SENSUAL_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

const headerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: SENSUAL_EASE },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40, rotate: 0 },
  visible: (rotation: number) => ({
    opacity: 1,
    y: 0,
    rotate: rotation * 0.5,
    transition: { duration: 0.5, ease: SENSUAL_EASE },
  }),
}

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

interface DossierCardProps {
  archiveNumber: string
  icon: LucideIcon
  title: string
  description: string
  initialRotation: number
  shouldAnimate: boolean
}

function DossierCard({ archiveNumber, icon: Icon, title, description, initialRotation, shouldAnimate }: DossierCardProps) {
  return (
    <motion.article
      custom={initialRotation}
      variants={shouldAnimate ? cardVariants : undefined}
      initial={shouldAnimate ? { opacity: 0, rotate: initialRotation, y: 40 } : false}
      whileInView={shouldAnimate ? 'visible' : undefined}
      viewport={{ once: true, margin: '-20%' }}
      className="group relative h-full rounded-2xl border p-6 overflow-hidden [box-shadow:0_0_30px_rgba(185,48,158,0.2),inset_0_1px_0_rgba(255,255,255,0.08)]"
      style={{
        background: 'linear-gradient(135deg, rgba(107, 32, 128, 0.3) 0%, rgba(20, 19, 22, 0.8) 100%)',
        borderColor: 'rgba(244, 208, 63, 0.3)',
        backdropFilter: 'blur(10px)',
      }}
      aria-label={`${archiveNumber} ${title}`}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(185, 48, 158, 0.4), transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="relative z-10">
        <p className="font-(--font-jetbrains) text-[9px] uppercase tracking-[0.2em] text-(--color-gold-light)">
          {archiveNumber}
        </p>

        <div className="mt-4 w-fit p-2 rounded-lg" style={{ background: 'rgba(244, 208, 63, 0.08)' }}>
          <Icon className="size-6 text-(--color-gold-light)" strokeWidth={1.2} aria-hidden="true" />
        </div>

        <h3 className="mt-4 [font-family:var(--font-playfair)] text-lg font-bold text-(--color-text-primary)">
          {title}
        </h3>

        <p className="mt-3 font-(--font-inter) text-sm leading-relaxed text-(--color-text-secondary)">
          {description}
        </p>
      </div>

      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden="true"
        style={{ border: '1px solid rgba(244, 208, 63, 0.5)' }}
      />
    </motion.article>
  )
}

const DOSSIERS = [
  {
    archiveNumber: 'ARCH-001',
    icon: BookOpen,
    title: 'Todo tiene una historia',
    description: 'Cada sala es un universo narrativo construido a medida. No improvisamos — orquestamos.',
    initialRotation: -1.2,
  },
  {
    archiveNumber: 'ARCH-002',
    icon: Flame,
    title: 'Sin necesidad de ser explícito',
    description: 'El erotismo más poderoso vive en la insinuación. La tensión es el juego.',
    initialRotation: 1.4,
  },
  {
    archiveNumber: 'ARCH-003',
    icon: Brain,
    title: 'El Game Master te conoce',
    description: 'Nuestra IA procesa tus preferencias antes de que entres. La experiencia ya está calibrada para ti.',
    initialRotation: -0.9,
  },
  {
    archiveNumber: 'ARCH-004',
    icon: Shield,
    title: 'Tú tienes el control, siempre',
    description: 'Una palabra detiene todo. Sin preguntas. Sin juicios. El control es tuyo, siempre.',
    initialRotation: 0.8,
  },
  {
    archiveNumber: 'ARCH-005',
    icon: EyeOff,
    title: 'Lo que pasa aquí, se queda aquí',
    description: 'Sin grabaciones. Sin historial. Sin datos innecesarios. La discreción es parte del ritual.',
    initialRotation: -1.5,
  },
] as const

export function ConceptSection() {
  const shouldReduceMotion = useReducedMotion()
  const shouldAnimate = !shouldReduceMotion

  return (
    <section id="concepto" className="relative w-full py-16 sm:py-24 lg:py-28 overflow-hidden" style={{ background: 'var(--color-bg-base)' }}>
      <div
        className="absolute inset-0 z-0"
        aria-hidden="true"
        style={{
          background: `
            radial-gradient(circle at 50% 20%, rgba(107, 32, 128, 0.25) 0%, transparent 50%),
            radial-gradient(circle at 20% 80%, rgba(201, 123, 27, 0.12) 0%, transparent 60%),
            radial-gradient(circle at 80% 60%, rgba(185, 48, 158, 0.15) 0%, transparent 65%)
          `,
        }}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 relative z-1">
        <motion.header
          variants={shouldAnimate ? headerVariants : undefined}
          initial={shouldAnimate ? 'hidden' : false}
          whileInView={shouldAnimate ? 'visible' : undefined}
          viewport={{ once: true, margin: '-20%' }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="font-(--font-jetbrains) text-[10px] uppercase tracking-[0.22em] text-(--color-text-muted) sm:text-[11px]">
            LO QUE NADIE MÁS TE DICE
          </p>
          <h2 className="mt-4 font-(--font-cormorant) text-3xl italic text-(--color-text-primary) sm:text-4xl">
            Cinco verdades sobre esta noche
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-(--font-inter) text-sm leading-relaxed text-(--color-text-secondary) sm:text-base">
            No hay que demostrar nada. Solo elegir el ritmo, el tono y el cuidado. Aquí, la tensión se diseña; la privacidad se protege.
          </p>
        </motion.header>

        <motion.div
          variants={shouldAnimate ? gridVariants : undefined}
          initial={shouldAnimate ? 'hidden' : false}
          whileInView={shouldAnimate ? 'visible' : undefined}
          viewport={{ once: true, margin: '-20%' }}
          className="mt-12 grid gap-5 sm:mt-16 sm:gap-6 md:grid-cols-6 lg:mt-20 lg:gap-8"
        >
          {/* Pirámide invertida (desktop): 2 arriba centradas, 3 abajo */}
          <div className="md:col-span-2 md:col-start-2">
            <DossierCard
              archiveNumber={DOSSIERS[0].archiveNumber}
              icon={DOSSIERS[0].icon}
              title={DOSSIERS[0].title}
              description={DOSSIERS[0].description}
              initialRotation={DOSSIERS[0].initialRotation}
              shouldAnimate={shouldAnimate}
            />
          </div>
          <div className="md:col-span-2">
            <DossierCard
              archiveNumber={DOSSIERS[1].archiveNumber}
              icon={DOSSIERS[1].icon}
              title={DOSSIERS[1].title}
              description={DOSSIERS[1].description}
              initialRotation={DOSSIERS[1].initialRotation}
              shouldAnimate={shouldAnimate}
            />
          </div>

          <div className="md:col-span-2">
            <DossierCard
              archiveNumber={DOSSIERS[2].archiveNumber}
              icon={DOSSIERS[2].icon}
              title={DOSSIERS[2].title}
              description={DOSSIERS[2].description}
              initialRotation={DOSSIERS[2].initialRotation}
              shouldAnimate={shouldAnimate}
            />
          </div>
          <div className="md:col-span-2">
            <DossierCard
              archiveNumber={DOSSIERS[3].archiveNumber}
              icon={DOSSIERS[3].icon}
              title={DOSSIERS[3].title}
              description={DOSSIERS[3].description}
              initialRotation={DOSSIERS[3].initialRotation}
              shouldAnimate={shouldAnimate}
            />
          </div>
          <div className="md:col-span-2">
            <DossierCard
              archiveNumber={DOSSIERS[4].archiveNumber}
              icon={DOSSIERS[4].icon}
              title={DOSSIERS[4].title}
              description={DOSSIERS[4].description}
              initialRotation={DOSSIERS[4].initialRotation}
              shouldAnimate={shouldAnimate}
            />
          </div>
        </motion.div>

        <div className="mt-10 flex justify-center sm:mt-14">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full border-2 px-7 py-3 font-(--font-jetbrains) text-[10px] uppercase tracking-[0.2em] transition-all duration-300 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 sm:text-[11px] group"
            style={{
              borderColor: 'var(--color-gold-light)',
              color: 'var(--color-gold-light)',
              background: 'rgba(244, 208, 63, 0.08)',
              boxShadow: 'inset 0 0 15px rgba(244, 208, 63, 0.1), 0 0 15px rgba(244, 208, 63, 0.15)',
            }}
            onClick={() => {
              const el = document.getElementById('experiencias-destacadas')
              el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }}
          >
            <span className="group-hover:translate-x-1 transition-transform duration-300">→ VER LAS EXPERIENCIAS</span>
          </button>
        </div>
      </div>
    </section>
  )
}
