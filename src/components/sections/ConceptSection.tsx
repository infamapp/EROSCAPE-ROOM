'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { BookOpen, Brain, Flame, Lock, Shield } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'

import { cn } from '@/lib/utils'

const SENSUAL_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

type DossierIcon = 'BookOpen' | 'Flame' | 'Brain' | 'Shield' | 'Lock'

type DossierItem = {
  truthNumber: string
  lucideIcon: DossierIcon
  title: string
  description: string
}

const TRUTH_ITEMS: readonly DossierItem[] = [
  {
    truthNumber: '01',
    lucideIcon: 'BookOpen',
    title: 'Aquí todo tiene una historia',
    description:
      'Cada sala es un relato que te envuelve. Tú no eres espectador — eres protagonista desde el primer segundo.',
  },
  {
    truthNumber: '02',
    lucideIcon: 'Flame',
    title: 'El erotismo no necesita ser explícito para ser intenso',
    description: 'La tensión, la insinuación, la atmósfera. Lo que no se ve es lo que más excita.',
  },
  {
    truthNumber: '03',
    lucideIcon: 'Brain',
    title: 'El Maestro lee lo que deseas',
    description:
      'El Maestro escucha tus respuestas y moldea la experiencia en tiempo real. Nadie más lo hará así.',
  },
  {
    truthNumber: '04',
    lucideIcon: 'Shield',
    title: 'Tú tienes el control, siempre',
    description:
      'Consentimiento real, palabra mágica real, límites reales. El placer sin seguridad no es placer.',
  },
  {
    truthNumber: '05',
    lucideIcon: 'Lock',
    title: 'Lo que pasa aquí, se queda aquí',
    description: 'Confidencialidad total. Tu nombre, tus elecciones, tu noche. Nadie sabe nada.',
  },
] as const

const DOSSIER_ICON_MAP: Record<DossierIcon, LucideIcon> = {
  BookOpen,
  Flame,
  Brain,
  Shield,
  Lock,
}

interface DossierCardProps {
  truthNumber: string
  lucideIcon: DossierIcon
  title: string
  description: string
  initialRotation: number
  index: number
  shouldAnimate: boolean
}

function DossierCard({
  truthNumber,
  lucideIcon,
  title,
  description,
  initialRotation,
  index,
  shouldAnimate,
}: DossierCardProps) {
  const Icon = DOSSIER_ICON_MAP[lucideIcon]

  return (
    <motion.article
      className={cn('relative overflow-hidden rounded-2xl p-6')}
      style={{
        background: 'var(--color-bg-elevated)',
        border: 'var(--border-subtle)',
        boxShadow: 'var(--glow-card)',
      }}
      initial={
        shouldAnimate
          ? { rotate: initialRotation, y: 40, opacity: 0 }
          : { rotate: 0, y: 0, opacity: 1 }
      }
      animate={shouldAnimate ? { rotate: initialRotation, y: 0, opacity: 1 } : undefined}
      transition={
        shouldAnimate ? { duration: 0.6, delay: index * 0.15, ease: SENSUAL_EASE } : undefined
      }
      whileHover={
        shouldAnimate
          ? {
              rotate: 0,
              scale: 1.02,
              boxShadow: 'var(--glow-magenta)',
              transition: { type: 'spring', stiffness: 300, damping: 22 },
            }
          : undefined
      }
    >
      <div className="pointer-events-none absolute left-0 top-0 h-0.5 w-full opacity-80" style={{ background: 'var(--color-gold)' }} aria-hidden="true" />

      <div
        className="absolute left-4 top-4 font-[var(--font-playfair)] italic tracking-[0.08em]"
        style={{
          color: 'var(--color-gold)',
          fontSize: '28px',
        }}
      >
        {truthNumber}
      </div>

      <div className="flex flex-col items-center text-center">
        <Icon className="h-8 w-8" style={{ color: 'var(--color-magenta)' }} aria-hidden="true" />
        <h3 className="mt-4 font-[var(--font-playfair)] text-xl text-white">{title}</h3>
        <p className="mt-3 text-sm leading-6" style={{ color: 'var(--color-text-secondary)' }}>
          {description}
        </p>
      </div>

      {/* <motion.span
        className="pointer-events-none absolute -right-0 top-10 rotate-12 font-[var(--font-playfair)] italic"
        style={{ color: 'color-mix(in srgb, var(--color-gold) 55%, transparent)' }}
        initial={shouldAnimate ? { opacity: 0 } : { opacity: 1 }}
        animate={shouldAnimate ? { opacity: 1 } : undefined}
        transition={shouldAnimate ? { duration: 0.6, delay: 0.2 + index * 0.08, ease: SENSUAL_EASE } : undefined}
        aria-hidden="true"
      >
        de puertas adentro
      </motion.span> */}
    </motion.article>
  )
}

export function ConceptSection() {
  const shouldReduceMotion = useReducedMotion()
  const ref = useRef<HTMLElement | null>(null)
  const [isInViewOnce, setIsInViewOnce] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (shouldReduceMotion) {
      const t = window.setTimeout(() => setIsInViewOnce(true), 0)
      return () => window.clearTimeout(t)
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsInViewOnce(true)
          obs.disconnect()
        }
      },
      { threshold: 0.25 },
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [shouldReduceMotion])

  const rotations = useMemo(() => [-2, 1.5, -1, 2, -1.5] as const, [])
  const shouldAnimate = isInViewOnce && !shouldReduceMotion

  const handleScrollToExperiencias = () => {
    const target = document.querySelector('#experiencias')
    if (!(target instanceof HTMLElement)) return
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section
      id="concepto"
      ref={ref}
      className="relative w-full py-20 sm:py-28"
      style={{ background: 'var(--color-bg-subtle)' }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative text-center">
          <h2
            className="font-[var(--font-playfair)] text-white tracking-[0.30em]"
            style={{ fontSize: 'clamp(18px, 2.6vw, 28px)' }}
          >
            LO QUE NADIE MÁS TE DICE
          </h2>

          <p className="mt-6 text-sm sm:text-base" style={{ color: 'var(--color-text-muted)' }}>
            Cinco verdades sobre lo que vas a vivir.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-6">
          {/* row 1: 3 cards */}
          {TRUTH_ITEMS.slice(0, 3).map((item, idx) => (
            <div key={item.truthNumber} className="md:col-span-2">
              <DossierCard
                {...item}
                index={idx}
                initialRotation={rotations[idx] ?? 0}
                shouldAnimate={shouldAnimate}
              />
            </div>
          ))}

          {/* row 2: 2 cards centered */}
          <div className="hidden md:block md:col-span-1" aria-hidden="true" />
          {TRUTH_ITEMS.slice(3, 5).map((item, i) => {
            const idx = i + 3
            return (
              <div key={item.truthNumber} className="md:col-span-2">
                <DossierCard
                  {...item}
                  index={idx}
                  initialRotation={rotations[idx] ?? 0}
                  shouldAnimate={shouldAnimate}
                />
              </div>
            )
          })}
          <div className="hidden md:block md:col-span-1" aria-hidden="true" />
        </div>

        <div className="mt-14 flex justify-center">
          <button
            type="button"
            onClick={handleScrollToExperiencias}
            className="group inline-flex items-center gap-2 rounded-full px-6 py-3 font-[var(--font-jetbrains)] text-sm"
            style={{
              color: 'var(--color-magenta)',
              border: 'var(--border-subtle)',
              background: 'rgba(17,0,17,0.35)',
              backdropFilter: 'blur(10px)',
            }}
          >
            {'> descubre lo que te excita...'}
            <span className="inline-block h-4 w-[10px] translate-y-[1px] bg-current opacity-80 animate-pulse" />
          </button>
        </div>
      </div>
    </section>
  )
}

