'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { Gem, Info, Lock, Shield, Shirt } from 'lucide-react'

import { cn } from '@/lib/utils'

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
  hidden: { opacity: 0, y: 20 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: SENSUAL_EASE, delay: index * 0.08 },
  }),
}

type ValueIconId = 'shieldInfo' | 'lock' | 'gem' | 'shirt' | 'shield'

type ValueItem = {
  id: string
  iconId: ValueIconId
  title: string
  description: string
}

const VALUE_ITEMS: readonly ValueItem[] = [
  {
    id: 'anonimato',
    iconId: 'shieldInfo',
    title: 'Anonimato Total',
    description:
      'Protocolos de entrada y salida diseñados para que nunca te cruces con otros huéspedes.',
  },
  {
    id: 'sin-juicios',
    iconId: 'lock',
    title: 'Sin Juicios',
    description: 'Un espacio seguro para explorar cada una de tus fantasías bajo tus propios términos.',
  },
  {
    id: 'lujo-sensorial',
    iconId: 'gem',
    title: 'Lujo Sensorial',
    description: 'Sábanas de 1000 hilos, aromas curados y tecnología de vanguardia en cada habitación.',
  },
  {
    id: 'diseno-narrativo',
    iconId: 'shirt',
    title: 'Diseño Narrativo',
    description: 'No es solo una habitación, es una historia donde tú eres el protagonista absoluto.',
  },
  {
    id: 'seguridad',
    iconId: 'shield',
    title: 'Seguridad 360º',
    description: 'Botones de pánico discretos y personal formado en consentimiento y mediación.',
  },
] as const

const ICON_MAP: Record<Exclude<ValueIconId, 'shieldInfo'>, LucideIcon> = {
  lock: Lock,
  gem: Gem,
  shirt: Shirt,
  shield: Shield,
}

function ShieldWithInfoIcon() {
  return (
    <span className="relative inline-flex size-7 shrink-0 sm:size-8" aria-hidden="true">
      <Shield className="size-full stroke-[1.25]" style={{ color: 'var(--color-gold-light)' }} />
      <Info
        className="pointer-events-none absolute left-1/2 top-[52%] size-3.5 -translate-x-1/2 -translate-y-1/2 sm:size-4"
        strokeWidth={2.25}
        style={{ color: 'var(--color-gold-light)' }}
      />
    </span>
  )
}

interface ConceptValueCardProps {
  item: ValueItem
  index: number
  shouldAnimate: boolean
}

function ConceptLucideGlyph({ iconId }: { iconId: Exclude<ValueIconId, 'shieldInfo'> }) {
  const Cmp = ICON_MAP[iconId]
  return (
    <Cmp
      className="size-7 shrink-0 sm:size-8"
      strokeWidth={1.25}
      style={{ color: 'var(--color-gold-light)' }}
      aria-hidden="true"
    />
  )
}

function ConceptValueCard({ item, index, shouldAnimate }: ConceptValueCardProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.article
      custom={index}
      variants={shouldAnimate ? cardVariants : undefined}
      initial={shouldAnimate ? 'hidden' : false}
      whileInView={shouldAnimate ? 'visible' : undefined}
      viewport={{ once: true, margin: '-12% 0px' }}
      className={cn(
        'flex h-full flex-col rounded-xl  p-5 sm:p-6 lg:p-7',
        'bg-(--color-bg-elevated) [box-shadow:var(--glow-card)]',
        'transition-[box-shadow,transform,border-color] duration-300',
        !reduceMotion && 'hover:-translate-y-0.5',
        'hover:border-(--color-magenta)/35 hover:[box-shadow:var(--glow-magenta)]',
      )}
    >
      {item.iconId === 'shieldInfo' ? (
        <ShieldWithInfoIcon />
      ) : (
        <ConceptLucideGlyph iconId={item.iconId} />
      )}
      <h3 className="mt-4 font-(--font-cormorant) text-xl font-medium leading-snug text-white sm:text-2xl">
        {item.title}
      </h3>
      <p className="mt-3 font-(--font-inter) text-sm leading-relaxed text-(--color-text-muted) sm:text-[15px]">
        {item.description}
      </p>
    </motion.article>
  )
}

export function ConceptSection() {
  const shouldReduceMotion = useReducedMotion()
  const shouldAnimate = !shouldReduceMotion

  return (
    <section
      id="concepto"
      className="relative w-full py-16 sm:py-24 lg:py-28"
      style={{ background: 'var(--color-bg-base)' }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.header
          variants={shouldAnimate ? headerVariants : undefined}
          initial={shouldAnimate ? 'hidden' : false}
          whileInView={shouldAnimate ? 'visible' : undefined}
          viewport={{ once: true, margin: '-15% 0px' }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2
            className="font-(--font-cormorant) font-medium leading-tight tracking-[0.02em] text-white"
            style={{ fontSize: 'clamp(1.75rem, 4.2vw, 2.75rem)' }}
          >
            Lo que nadie más te dice
          </h2>
          <div
            className="mx-auto mt-5 h-1 w-14 rounded-full sm:mt-6 sm:w-16"
            style={{
              background: 'var(--color-magenta)',
              boxShadow: 'var(--glow-magenta)',
            }}
            aria-hidden="true"
          />
        </motion.header>

        <div className="mt-12 grid gap-5 sm:mt-16 sm:gap-6 md:grid-cols-6 lg:mt-20 lg:gap-8">
          {VALUE_ITEMS.slice(0, 3).map((item, idx) => (
            <div key={item.id} className="md:col-span-2">
              <ConceptValueCard item={item} index={idx} shouldAnimate={shouldAnimate} />
            </div>
          ))}

          <div className="hidden md:block md:col-span-1" aria-hidden="true" />
          {VALUE_ITEMS.slice(3, 5).map((item, i) => (
            <div key={item.id} className="md:col-span-2">
              <ConceptValueCard item={item} index={i + 3} shouldAnimate={shouldAnimate} />
            </div>
          ))}
          <div className="hidden md:block md:col-span-1" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}
