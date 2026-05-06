'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'

import { cn } from '@/lib/utils'

const SENSUAL_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: SENSUAL_EASE, delay: index * 0.06 },
  }),
}

const SURFACE =
  'rounded-2xl border-(--border-subtle) bg-(--color-bg-elevated) [box-shadow:var(--glow-card)]'

export interface IntensityModeCardProps {
  title: string
  description: string
  imageSrc: string
  eyebrow?: string
  accentClassName?: string
  index?: number
  isSelected?: boolean
  onClick?: () => void
}

export function IntensityModeCard({
  title,
  description,
  imageSrc,
  eyebrow = 'Las reglas del juego',
  accentClassName,
  index = 0,
  isSelected = false,
  onClick,
}: IntensityModeCardProps) {
  const shouldReduceMotion = useReducedMotion()
  const isInteractive = typeof onClick === 'function'

  const sharedClasses = cn(
    'group relative flex h-full flex-col overflow-hidden p-6 backdrop-blur-xl transition-[box-shadow,border-color,transform] duration-500 sm:p-8',
    SURFACE,
    isInteractive && 'cursor-pointer hover:-translate-y-0.5',
    isSelected && '[box-shadow:var(--glow-magenta)]',
    accentClassName,
  )

  const innerStyle = isSelected
    ? { borderColor: 'color-mix(in srgb, var(--color-magenta) 60%, transparent)' }
    : undefined

  const inner = (
    <>
      <div className="pointer-events-none absolute inset-0 opacity-90" aria-hidden="true">
        <Image
          src={imageSrc}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover opacity-35"
        />
        <div className="absolute inset-0" style={{ background: 'var(--gradient-card)' }} />
      </div>

      <div className="relative flex h-full flex-col">
        <p className="font-(--font-jetbrains) text-[10px] uppercase tracking-[0.22em] text-(--color-text-muted) sm:text-[11px]">
          {eyebrow}
        </p>
        <h3 className="mt-3 text-2xl font-bold tracking-[0.04em] text-(--color-text-primary) [font-family:var(--font-playfair)] sm:text-3xl">
          {title}
        </h3>
        <p className="mt-4 line-clamp-5 max-w-xl font-(--font-inter) text-sm leading-relaxed text-(--color-text-secondary) sm:text-base">
          {description}
        </p>
        <div className="mt-auto pt-2" aria-hidden="true" />
      </div>
    </>
  )

  if (isInteractive) {
    return (
      <motion.button
        type="button"
        onClick={onClick}
        custom={index}
        variants={shouldReduceMotion ? undefined : cardVariants}
        initial={shouldReduceMotion ? false : 'hidden'}
        whileInView={shouldReduceMotion ? undefined : 'visible'}
        viewport={{ once: true, margin: '-30%' }}
        aria-pressed={isSelected}
        aria-label={title}
        style={innerStyle}
        className={cn(
          sharedClasses,
          'text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg-base)',
        )}
      >
        {inner}
      </motion.button>
    )
  }

  return (
    <motion.article
      custom={index}
      variants={shouldReduceMotion ? undefined : cardVariants}
      initial={shouldReduceMotion ? false : 'hidden'}
      whileInView={shouldReduceMotion ? undefined : 'visible'}
      viewport={{ once: true, margin: '-30%' }}
      aria-label={title}
      style={innerStyle}
      className={sharedClasses}
    >
      {inner}
    </motion.article>
  )
}
