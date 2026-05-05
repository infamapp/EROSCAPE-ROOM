'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { Clock, Users } from 'lucide-react'
import { useMemo, useState } from 'react'

import { getExperienceCardImage } from '@/lib/experiences/visuals'
import type { City } from '@/types/experience'
import { cn, formatCurrency } from '@/lib/utils'

type ExperienceTemplate = {
  n: number
  slug: string
  title: string
  intensity: 'bajo' | 'medio' | 'turbio'
  missionLevel: 'ALPHA' | 'BETA' | 'OMEGA'
  duration: number
  maxParticipants: number
  basePrice: number
}

export interface ExperienceCardProps {
  experience: ExperienceTemplate
  city: City
}

const SENSUAL_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

function getIntensityBadgeClass(level: ExperienceTemplate['missionLevel']): string {
  switch (level) {
    case 'ALPHA':
      return 'bg-emerald-900/30 text-emerald-400 border border-emerald-400/20'
    case 'BETA':
      return 'bg-amber-900/30 text-amber-400 border border-amber-400/20'
    case 'OMEGA':
      return 'bg-rose-900/30 text-rose-400 border border-rose-400/25'
    default: {
      const _exhaustive: never = level
      return _exhaustive
    }
  }
}

function getCityAccent(slug: string): string {
  switch (slug) {
    case 'madrid':
      return 'var(--color-magenta)'
    case 'barcelona':
      return 'var(--color-purple)'
    case 'valencia':
      return 'var(--color-gold)'
    case 'sevilla':
      return 'var(--color-magenta-dim)'
    case 'bilbao':
      return 'var(--color-purple-mid)'
    default:
      return 'var(--color-magenta)'
  }
}

export function ExperienceCard({ experience, city }: ExperienceCardProps) {
  const shouldReduceMotion = useReducedMotion()
  const [isHover, setIsHover] = useState(false)

  const href = `/experiencias/${city.slug}/${experience.slug}`
  const heroImage = getExperienceCardImage(experience.slug, experience.title)

  const teaser = useMemo(() => {
    const map: Record<string, string> = {
      'habitacion-veneciana': 'Para quienes saben que el placer más profundo empieza por los sentidos.',
      'ritual-de-medianoche': 'Hay rituales que no se explican. Solo se viven. ¿Estás listo?',
      'la-confesion': 'A veces lo que más excita es admitir lo que nunca te habías atrevido a decir.',
      'espejo-negro': 'El espejo no miente. Verás cosas de ti que preferías no saber.',
      'el-coleccionista': 'Guarda recuerdos de sus visitas. Esta noche, tú serás uno de ellos.',
      'la-mascarada': 'Un entorno elegante donde los roles se diluyen.',
    }
    return map[experience.slug] ?? 'Una experiencia inmersiva que se queda contigo.'
  }, [experience.slug])

  const intensityLabel =
    experience.missionLevel === 'ALPHA'
      ? 'DESPERTAR · Suave'
      : experience.missionLevel === 'BETA'
        ? 'INTENSO · Sin frenos'
        : 'SIN LÍMITES · Todo permitido'

  return (
    <Link href={href} className="block">
      <motion.article
        className={cn('relative overflow-hidden rounded-2xl')}
        style={{ background: 'var(--color-bg-elevated)', border: 'var(--border-subtle)' }}
        onHoverStart={() => setIsHover(true)}
        onHoverEnd={() => setIsHover(false)}
        whileHover={
          shouldReduceMotion
            ? undefined
            : {
                y: -8,
                scale: 1.01,
                boxShadow: 'var(--glow-magenta)',
                transition: { type: 'spring', stiffness: 280, damping: 22 },
              }
        }
      >
        <div className="relative h-40 overflow-hidden">
          <Image
            src={heroImage.src}
            alt={heroImage.alt}
            fill
            sizes="(max-width: 768px) 92vw, (max-width: 1024px) 44vw, 360px"
            className="object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              // Lighter veil so the photo reads, but keep enough darkness for text contrast.
              background: `linear-gradient(135deg, ${getCityAccent(city.slug)} 0%, rgba(8,0,8,0.72) 32%, rgba(8,0,8,0.88) 100%)`,
            }}
          />

          <div className="pointer-events-none absolute inset-0 opacity-30" aria-hidden="true">
            <div className="scanline absolute inset-x-0 h-12" />
          </div>

          <div
            className={cn(
              'absolute right-4 top-4 rounded-full px-3 py-1 text-[10px] font-(--font-jetbrains) tracking-[0.16em]',
              getIntensityBadgeClass(experience.missionLevel)
            )}
          >
            {intensityLabel}
          </div>

          {experience.missionLevel === 'OMEGA' ? (
            <motion.div
              className="absolute right-3 top-3 h-12 w-12 rounded-full"
              style={{ border: '1px solid rgba(244,63,94,0.45)' }}
              initial={shouldReduceMotion ? false : { scale: 1, opacity: 0.8 }}
              animate={shouldReduceMotion ? undefined : { scale: [1, 1.3], opacity: [0.8, 0] }}
              transition={shouldReduceMotion ? undefined : { duration: 1.4, repeat: Infinity, ease: SENSUAL_EASE }}
              aria-hidden="true"
            />
          ) : null}
        </div>

        <div className="p-6">
          <h3 className="font-(--font-playfair) text-lg text-white">{experience.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6" style={{ color: 'var(--color-text-secondary)' }}>
            {teaser}
          </p>

          <div
            className="mt-4 flex items-center gap-4 font-(--font-jetbrains) text-xs"
            style={{ color: 'var(--color-text-muted)' }}
          >
            <span className="inline-flex items-center gap-2">
              <Clock className="h-4 w-4" aria-hidden="true" />
              {experience.duration}m
            </span>
            <span className="inline-flex items-center gap-2">
              <Users className="h-4 w-4" aria-hidden="true" />
              {experience.maxParticipants}
            </span>
          </div>

          <div className="mt-5 flex items-end justify-between gap-4">
            <div className="font-(--font-playfair) text-lg" style={{ color: 'var(--color-gold)' }}>
              Desde {formatCurrency(experience.basePrice)}
            </div>
          </div>

          <div
            className="mt-5 w-full rounded-full px-5 py-3 text-center font-(--font-jetbrains) text-xs tracking-[0.18em] text-white"
            style={{ border: '1px solid rgba(185,48,158,0.55)' }}
          >
            VER ESTA EXPERIENCIA →
          </div>
        </div>

        <motion.div
          className="overflow-hidden px-6 pb-6"
          initial={{ height: 0, opacity: 0 }}
          animate={
            isHover
              ? {
                  height: 72,
                  opacity: 1,
                  transition: shouldReduceMotion ? undefined : { duration: 0.25, ease: SENSUAL_EASE },
                }
              : {
                  height: 0,
                  opacity: 0,
                  transition: shouldReduceMotion ? undefined : { duration: 0.2, ease: SENSUAL_EASE },
                }
          }
        >
          <div
            className="rounded-xl px-4 py-3 text-sm italic leading-5"
            style={{
              background: 'linear-gradient(180deg, rgba(122,31,104,0.55), rgba(8,0,8,0))',
              color: 'var(--color-text-muted)',
            }}
          >
            <div className="line-clamp-2">{teaser}</div>
          </div>
        </motion.div>

        <style jsx>{`
          .scanline {
            background: linear-gradient(
              180deg,
              rgba(255, 255, 255, 0) 0%,
              rgba(255, 255, 255, 0.12) 50%,
              rgba(255, 255, 255, 0) 100%
            );
            animation: scanline 3s linear infinite;
          }
          @keyframes scanline {
            0% {
              transform: translateY(-120%);
            }
            100% {
              transform: translateY(220%);
            }
          }
        `}</style>
      </motion.article>
    </Link>
  )
}

