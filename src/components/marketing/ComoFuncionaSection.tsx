'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import {
  CircleQuestionMark,
  DoorOpen,
  Package,
  PanelsTopLeft,
  ScrollText,
  UserRound,
} from 'lucide-react'

import { cn } from '@/lib/utils'

const SENSUAL_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

const headerVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: SENSUAL_EASE },
  },
}

const stepVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: SENSUAL_EASE, delay: 0.12 + index * 0.07 },
  }),
}

type StepIconId = 'door' | 'affinity' | 'chest' | 'scroll' | 'gates'

interface ComoFuncionaStep {
  step: number
  iconId: StepIconId
  title: string
  description: string
}

const STEPS: readonly ComoFuncionaStep[] = [
  {
    step: 1,
    iconId: 'door',
    title: 'El Encuentro',
    description: 'Reserva tu cita de forma discreta y anónima a través de nuestro portal.',
  },
  {
    step: 2,
    iconId: 'affinity',
    title: 'Tus Deseos',
    description: 'Rellena el test de afinidad para que personalicemos la habitación.',
  },
  {
    step: 3,
    iconId: 'chest',
    title: 'El Baúl',
    description: 'Recibe tu caja de herramientas y accesorios antes de entrar.',
  },
  {
    step: 4,
    iconId: 'scroll',
    title: 'El Juramento',
    description: 'Aceptación de las normas de seguridad y consentimiento mutuo.',
  },
  {
    step: 5,
    iconId: 'gates',
    title: 'Las Puertas se Abren',
    description: 'Entra en tu fantasía. Tienes 90 minutos para escapar... o quedarte.',
  },
] as const

const ICON_MAP: Record<Exclude<StepIconId, 'affinity'>, LucideIcon> = {
  door: DoorOpen,
  chest: Package,
  scroll: ScrollText,
  gates: PanelsTopLeft,
}

function StepCircleIcon({ iconId }: { iconId: StepIconId }) {
  const gold = 'var(--color-gold-light)'

  if (iconId === 'affinity') {
    return (
      <span className="relative inline-flex size-11 items-center justify-center sm:size-12" aria-hidden="true">
        <UserRound className="size-10 sm:size-11" strokeWidth={1.25} style={{ color: gold }} />
        <CircleQuestionMark
          className="absolute -right-0.5 top-0 size-4 sm:size-[18px]"
          strokeWidth={2}
          style={{ color: gold }}
        />
      </span>
    )
  }

  const Cmp = ICON_MAP[iconId]
  return <Cmp className="size-10 sm:size-11" strokeWidth={1.25} style={{ color: gold }} aria-hidden="true" />
}

interface TimelineStepProps {
  data: ComoFuncionaStep
  index: number
  shouldAnimate: boolean
}

function TimelineStep({ data, index, shouldAnimate }: TimelineStepProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.li
      custom={index}
      variants={shouldAnimate ? stepVariants : undefined}
      initial={shouldAnimate ? 'hidden' : false}
      whileInView={shouldAnimate ? 'visible' : undefined}
      viewport={{ once: true, margin: '-10% 0px' }}
      className="relative z-10 flex min-w-0 flex-1 flex-col items-center text-center"
    >
      <div className={cn('relative mb-5 sm:mb-6', !reduceMotion && 'motion-safe:transition-transform motion-safe:duration-300 motion-safe:hover:scale-[1.03]')}>
        <div
          className="flex h-24 w-24 items-center justify-center rounded-full border-2 sm:h-[5.5rem] sm:w-[5.5rem]"
          style={{
            borderColor: 'var(--color-gold-light)',
            background: 'rgba(17,0,17,0.55)',
            boxShadow: '0 0 0 1px rgba(203,123,27,0.12), inset 0 0 24px rgba(0,0,0,0.35)',
          }}
        >
          <StepCircleIcon iconId={data.iconId} />
        </div>
        <span
          className="absolute -bottom-0.5 -right-0.5 flex h-8 w-8 items-center justify-center rounded-full font-(--font-jetbrains) text-xs font-semibold text-white sm:h-9 sm:w-9 sm:text-sm"
          style={{
            background: 'var(--gradient-cta)',
            boxShadow: 'var(--glow-magenta)',
          }}
          aria-hidden="true"
        >
          {data.step}
        </span>
      </div>

      <h3 className="max-w-[14rem] font-(--font-cormorant) text-lg font-medium leading-snug text-white sm:text-xl">
        {data.title}
      </h3>
      <p className="mt-3 max-w-[15rem] font-(--font-inter) text-sm leading-relaxed text-(--color-text-muted) sm:max-w-[16rem] sm:text-[15px]">
        {data.description}
      </p>
    </motion.li>
  )
}

export function ComoFuncionaSection() {
  const shouldReduceMotion = useReducedMotion()
  const shouldAnimate = !shouldReduceMotion

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
          viewport={{ once: true, margin: '-12% 0px' }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2
            className="font-(--font-cormorant) font-medium leading-tight tracking-[0.02em] text-white"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)' }}
          >
            Cómo Funciona
          </h2>
          <p className="mt-4 font-(--font-inter) text-sm text-(--color-text-muted) sm:text-base">
            Cinco pasos hacia lo desconocido
          </p>
        </motion.header>

        <div className="relative mt-14 sm:mt-16 lg:mt-20">
          <div
            className="pointer-events-none absolute left-[8%] right-[8%] top-12 z-0 hidden h-px md:block"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1) 12%, rgba(255,255,255,0.14) 50%, rgba(255,255,255,0.1) 88%, transparent)',
            }}
            aria-hidden="true"
          />

          <ol className="relative z-10 flex list-none flex-col gap-14 md:flex-row md:justify-between md:gap-4 lg:gap-6">
            {STEPS.map((step, index) => (
              <TimelineStep key={step.step} data={step} index={index} shouldAnimate={shouldAnimate} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
