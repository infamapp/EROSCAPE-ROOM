'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Share2 } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'

import { IntensityBadge } from '@/components/ui/IntensityBadge'
import { useTextScramble } from '@/hooks/useTextScramble'
import { cn, formatCurrency } from '@/lib/utils'
import type { IntensityLevel, MissionLevel } from '@/types/booking'

const SENSUAL_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

type ExperienceLike = {
  n: number
  slug: string
  citySlug: string
  title: string
  teaser: string
  synopsis: string[]
  intensity: IntensityLevel
  missionLevel: MissionLevel
  missionCode: string
  duration: number
  maxParticipants: number
  basePrice: number
  specs: {
    aiLevel: 'Estándar' | 'Avanzado' | 'Premium'
    theme: string
  }
}

export interface MissionBriefingProps {
  experience: ExperienceLike
  citySlug: string
}

const heroTitleVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: SENSUAL_EASE } },
}

const polaroidVariants = {
  hidden: (i: number) => ({ opacity: 0, y: 40, rotate: i % 2 === 0 ? -3 : 3 }),
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotate: i % 2 === 0 ? -3 : 3,
    transition: { duration: 0.6, delay: 0.15 * i, ease: SENSUAL_EASE },
  }),
}

const EXPERIENCE_IMAGES: Record<string, { src: string; alt: string }> = {
  'habitacion-veneciana': { src: '/habitacioveneciana.png', alt: 'La Habitación Veneciana' },
  'ritual-de-medianoche': { src: '/ritualmedianoche.png', alt: 'El Ritual de Medianoche' },
  'la-confesion': { src: '/laconfesion.png', alt: 'La Confesión' },
  'espejo-negro': { src: '/espejonegro.png', alt: 'Espejo Negro' },
  'el-coleccionista': { src: '/llave.png', alt: 'El Coleccionista' },
}

const GALLERY_ORDER = [
  'habitacion-veneciana',
  'ritual-de-medianoche',
  'la-confesion',
  'espejo-negro',
  'el-coleccionista',
] as const

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

function getMonthStart(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), 1)
}

function getDaysInMonth(d: Date): number {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate()
}

function getWeekdayIndexMon0(d: Date): number {
  const js = d.getDay() // 0 Sun..6 Sat
  return (js + 6) % 7 // 0 Mon..6 Sun
}

function isAvailableDay(date: Date): boolean {
  const day = date.getDay()
  const weekend = day === 0 || day === 6
  const someWeekdays = date.getDate() % 3 === 0
  return weekend || someWeekdays
}

function useInViewOnce(threshold = 0.2) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [inView, setInView] = useState(false)
  const reduce = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (reduce) {
      const t = window.setTimeout(() => setInView(true), 0)
      return () => window.clearTimeout(t)
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true)
          obs.disconnect()
        }
      },
      { threshold },
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [reduce, threshold])

  return { ref, inView }
}

function ScrambleParagraph({ text }: { text: string }) {
  const { ref, inView } = useInViewOnce(0.25)
  const reduce = useReducedMotion()

  const { displayText } = useTextScramble({
    text,
    trigger: inView && !reduce,
    speed: 40,
    scrambleDuration: 900,
  })

  return (
    <p ref={ref as unknown as React.RefObject<HTMLParagraphElement>} className="mt-4 text-sm leading-7" style={{ color: 'var(--color-text-secondary)' }}>
      {reduce ? text : displayText}
    </p>
  )
}

export function MissionBriefing({ experience, citySlug }: MissionBriefingProps) {
  const router = useRouter()
  const shouldReduceMotion = useReducedMotion()
  const [stampGone, setStampGone] = useState(false)

  const [lightbox, setLightbox] = useState<null | number>(null)
  const [monthCursor, setMonthCursor] = useState(() => getMonthStart(new Date()))

  const priceText = useMemo(() => formatCurrency(experience.basePrice), [experience.basePrice])
  const accent = useMemo(() => getCityAccent(citySlug), [citySlug])
  const heroImage = useMemo(() => EXPERIENCE_IMAGES[experience.slug], [experience.slug])

  const gallery = useMemo(() => {
    const idx = Math.max(0, GALLERY_ORDER.indexOf(experience.slug as (typeof GALLERY_ORDER)[number]))
    const picks = [0, 1, 2].map((offset) => {
      const slug = GALLERY_ORDER[(idx + offset) % GALLERY_ORDER.length]
      return EXPERIENCE_IMAGES[slug]
    })
    return picks.filter(Boolean)
  }, [experience.slug])

  useEffect(() => {
    if (shouldReduceMotion) return
    const t = window.setTimeout(() => setStampGone(true), 500)
    return () => window.clearTimeout(t)
  }, [shouldReduceMotion])

  const monthDays = useMemo(() => {
    const days = getDaysInMonth(monthCursor)
    const start = getWeekdayIndexMon0(monthCursor)
    return { days, start }
  }, [monthCursor])

  const handlePickDate = (day: number) => {
    const date = new Date(monthCursor.getFullYear(), monthCursor.getMonth(), day)
    if (!isAvailableDay(date)) return

    const prefill = {
      citySlug,
      experienceSlug: experience.slug,
      date: date.toISOString().slice(0, 10),
    }
    try {
      sessionStorage.setItem('eroscape_booking_prefill', JSON.stringify(prefill))
    } catch {
      // ignore
    }
    router.push('/reservar?step=1')
  }

  const handleAcceptMission = () => {
    try {
      sessionStorage.setItem(
        'eroscape_booking_prefill',
        JSON.stringify({ citySlug, experienceSlug: experience.slug }),
      )
    } catch {
      // ignore
    }
    router.push('/reservar?step=1')
  }

  const handleShare = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : ''
    const title = `${experience.title} — Eroscape`

    if (typeof navigator !== 'undefined' && 'share' in navigator) {
      try {
        const nav = navigator as Navigator & { share?: (data: { title?: string; url?: string }) => Promise<void> }
        await nav.share?.({ title, url })
        return
      } catch {
        // fallthrough
      }
    }

    try {
      await navigator.clipboard.writeText(url)
    } catch {
      // ignore
    }
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-bg-base)' }}>
      <div className="mx-auto max-w-6xl px-4 pt-24 sm:px-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <IntensityBadge level={experience.intensity} pulse={experience.missionLevel === 'OMEGA'} />
            <span
              className="rounded-full px-3 py-1 font-(--font-jetbrains) text-[10px] tracking-[0.18em]"
              style={{ color: 'var(--color-text-secondary)', border: 'var(--border-subtle)', background: 'rgba(17,0,17,0.35)' }}
            >
              {citySlug.toUpperCase()}
            </span>
          </div>

          <button
            type="button"
            onClick={handleShare}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full"
            style={{ border: 'var(--border-subtle)', background: 'rgba(17,0,17,0.35)' }}
            aria-label="Compartir"
          >
            <Share2 className="h-5 w-5" style={{ color: 'var(--color-text-secondary)' }} />
          </button>
        </div>

        <div className="relative mt-6 h-[50vh] overflow-hidden rounded-3xl" style={{ border: 'var(--border-subtle)' }}>
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${accent} 0%, rgba(8,0,8,0.92) 70%, rgba(8,0,8,1) 100%)` }} />

          <div className="absolute inset-0 opacity-20" aria-hidden="true">
            {heroImage ? (
              <Image src={heroImage.src} alt="" fill sizes="100vw" className="object-cover" aria-hidden="true" />
            ) : null}
          </div>

          <motion.div
            className="pointer-events-none absolute left-1/2 top-1/2 w-[520px] -translate-x-1/2 -translate-y-1/2 rotate-45"
            initial={shouldReduceMotion ? false : { opacity: 0.15 }}
            animate={shouldReduceMotion ? undefined : stampGone ? { opacity: 0 } : { opacity: 0.15 }}
            transition={shouldReduceMotion ? undefined : { duration: 1, delay: 0.5, ease: SENSUAL_EASE }}
            aria-hidden="true"
          >
            <svg viewBox="0 0 600 180" className="h-auto w-full">
              <text
                x="50%"
                y="55%"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="var(--color-gold)"
                fontSize="64"
                fontFamily="var(--font-jetbrains), ui-monospace, SFMono-Regular, Menlo, monospace"
                letterSpacing="10"
              >
                DE PUERTAS ADENTRO
              </text>
            </svg>
          </motion.div>

          <div className="absolute inset-x-0 bottom-0 h-40" style={{ background: 'var(--gradient-overlay)' }} />

          <motion.h1
            className="absolute bottom-8 left-6 right-6 font-(--font-playfair) text-white"
            style={{ fontSize: 'clamp(36px, 5vw, 56px)' }}
            variants={heroTitleVariants}
            initial={shouldReduceMotion ? false : 'hidden'}
            animate={shouldReduceMotion ? undefined : 'visible'}
          >
            {experience.title}
          </motion.h1>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-10">
          <div className="lg:col-span-6">
            <div className="font-(--font-jetbrains) text-xs tracking-[0.2em] uppercase" style={{ color: 'var(--color-text-muted)' }}>
                  LO QUE TE ESPERA
            </div>

            {experience.synopsis.map((p) => (
              <ScrambleParagraph key={p} text={p} />
            ))}

            <div className="mt-10">
              <div className="font-(--font-jetbrains) text-xs tracking-[0.2em] uppercase" style={{ color: 'var(--color-text-muted)' }}>
                    LOS DETALLES
              </div>

              <div
                className="mt-4 overflow-hidden rounded-2xl"
                style={{ background: 'var(--color-bg-elevated)', border: 'var(--border-subtle)', borderLeft: '3px solid var(--color-magenta)' }}
              >
                <div className="divide-y" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                  {(
                    [
                      { k: 'DURACIÓN', v: `${experience.duration} min` },
                          { k: 'PARA CUÁNTOS', v: String(experience.maxParticipants) },
                          { k: 'EL MAESTRO', v: experience.specs.aiLevel },
                          { k: 'INTENSIDAD', intensity: true as const },
                          { k: 'PRECIO', v: priceText },
                    ] as const
                  ).map((row) => (
                    <div
                      key={row.k}
                      className="grid grid-cols-2 gap-4 px-5 py-4 transition-colors"
                      style={{ background: 'rgba(185,48,158,0)', color: 'var(--color-text-secondary)' }}
                    >
                      <div className="font-(--font-jetbrains) text-xs" style={{ color: 'var(--color-text-muted)' }}>
                        {row.k}
                      </div>
                      <div className="flex justify-end font-semibold text-white">
                        {'intensity' in row ? (
                          <IntensityBadge level={experience.intensity} pulse={experience.missionLevel === 'OMEGA'} />
                        ) : (
                          row.v
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="grid gap-6">
              <div>
                <div className="font-(--font-jetbrains) text-xs tracking-[0.2em] uppercase" style={{ color: 'var(--color-text-muted)' }}>
                      UNA MUESTRA
                </div>

                <div className="mt-4 grid grid-cols-3 gap-4">
                  {[0, 1, 2].map((i) => (
                    <motion.button
                      key={i}
                      type="button"
                      className={cn('relative aspect-3/4 w-full overflow-hidden rounded-xl')}
                      style={{ background: 'rgba(0,0,0,0.2)' }}
                      custom={i}
                      variants={polaroidVariants}
                      initial={shouldReduceMotion ? false : 'hidden'}
                      animate={shouldReduceMotion ? undefined : 'visible'}
                      whileHover={shouldReduceMotion ? undefined : { rotate: 0, scale: 1.04, transition: { duration: 0.2 } }}
                      onClick={() => setLightbox(i)}
                    >
                      <motion.div layoutId={`polaroid-${i}`} className="absolute inset-0">
                        {gallery[i] ? (
                          <Image
                            src={gallery[i].src}
                            alt={gallery[i].alt}
                            fill
                            sizes="(max-width: 1024px) 28vw, 180px"
                            className="object-cover"
                          />
                        ) : null}
                        <div
                          className="absolute inset-0"
                          style={{
                            background: `linear-gradient(135deg, ${accent} 0%, rgba(17,0,17,0.40) 55%, rgba(8,0,8,0.75) 100%)`,
                          }}
                        />
                        <div
                          className="absolute inset-0"
                          style={{
                            borderTop: '8px solid rgba(0,0,0,0.55)',
                            borderLeft: '8px solid rgba(0,0,0,0.55)',
                            borderRight: '8px solid rgba(0,0,0,0.55)',
                            borderBottom: '24px solid rgba(0,0,0,0.62)',
                          }}
                        />
                      </motion.div>
                    </motion.button>
                  ))}
                </div>
              </div>

              <div>
                <div className="font-(--font-jetbrains) text-xs tracking-[0.2em] uppercase" style={{ color: 'var(--color-text-muted)' }}>
                      ELIGE TU NOCHE
                </div>

                <div className="mt-4 rounded-2xl p-4" style={{ background: 'var(--color-bg-elevated)', border: 'var(--border-subtle)' }}>
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full"
                      style={{ border: 'var(--border-subtle)' }}
                      aria-label="Mes anterior"
                      onClick={() => setMonthCursor((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1))}
                    >
                      <ChevronLeft className="h-4 w-4" style={{ color: 'var(--color-text-secondary)' }} />
                    </button>
                    <div className="font-(--font-jetbrains) text-xs tracking-[0.18em]" style={{ color: 'var(--color-text-secondary)' }}>
                      {new Intl.DateTimeFormat('es-ES', { month: 'long', year: 'numeric' }).format(monthCursor).toUpperCase()}
                    </div>
                    <button
                      type="button"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full"
                      style={{ border: 'var(--border-subtle)' }}
                      aria-label="Mes siguiente"
                      onClick={() => setMonthCursor((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1))}
                    >
                      <ChevronRight className="h-4 w-4" style={{ color: 'var(--color-text-secondary)' }} />
                    </button>
                  </div>

                  <div className="mt-4 grid grid-cols-7 gap-2">
                    {Array.from({ length: monthDays.start }).map((_, i) => (
                      <div key={`sp-${i}`} />
                    ))}
                    {Array.from({ length: monthDays.days }).map((_, i) => {
                      const day = i + 1
                      const date = new Date(monthCursor.getFullYear(), monthCursor.getMonth(), day)
                      const available = isAvailableDay(date)
                      return (
                        <button
                          key={day}
                          type="button"
                          onClick={() => handlePickDate(day)}
                          className="relative flex h-10 w-10 items-center justify-center rounded-lg text-sm"
                          disabled={!available}
                          style={{
                            color: available ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
                            border: available ? '1px solid rgba(185,48,158,0.25)' : '1px solid rgba(255,255,255,0.06)',
                            background: available ? 'rgba(185,48,158,0.08)' : 'rgba(255,255,255,0.02)',
                            cursor: available ? 'pointer' : 'not-allowed',
                          }}
                        >
                          {day}
                          {available ? (
                            <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full" style={{ background: 'var(--color-magenta)' }} />
                          ) : null}
                        </button>
                      )
                    })}
                  </div>

                  <div className="mt-4 text-xs" style={{ color: 'var(--color-text-muted)' }}>
                    Disponibilidad simulada: fines de semana + algunos días laborables.
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 hidden lg:block">
              <motion.button
                type="button"
                className="group inline-flex w-full items-center justify-center gap-3 rounded-full px-6 py-4"
                style={{ background: 'var(--gradient-cta)', color: 'white' }}
                onClick={handleAcceptMission}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: -2,
                        boxShadow: 'var(--glow-magenta)',
                        transition: { duration: 0.2, ease: SENSUAL_EASE },
                      }
                }
                whileTap={shouldReduceMotion ? undefined : { scale: 0.99 }}
              >
                <motion.span
                  className="font-(--font-playfair) tracking-[0.14em]"
                  initial={false}
                  animate={shouldReduceMotion ? undefined : { opacity: 1 }}
                >
                  [ QUIERO ESTA NOCHE ]
                </motion.span>
                <span className="font-(--font-playfair)" style={{ color: 'rgba(255,255,255,0.9)' }}>
                  Desde {priceText}
                </span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-80 border-t p-4 lg:hidden" style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(8,0,8,0.92)', backdropFilter: 'blur(10px)' }}>
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
          <div className="font-(--font-playfair)" style={{ color: 'var(--color-gold)' }}>
            Desde {priceText}
          </div>
          <button
            type="button"
            className="rounded-full px-5 py-3 font-(--font-playfair) tracking-[0.14em] text-white"
            style={{ background: 'var(--gradient-cta)' }}
            onClick={handleAcceptMission}
          >
            [ QUIERO ESTA NOCHE ]
          </button>
        </div>
      </div>

      <AnimatePresence>
        {lightbox !== null ? (
          <motion.div
            className="fixed inset-0 z-200 flex items-center justify-center p-6"
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0 }}
            onClick={() => setLightbox(null)}
            style={{ background: 'rgba(0,0,0,0.75)' }}
          >
            <motion.div
              layoutId={`polaroid-${lightbox}`}
              className="relative aspect-3/4 w-full max-w-md overflow-hidden rounded-2xl"
              onClick={(e) => e.stopPropagation()}
              style={{
                background: `linear-gradient(135deg, ${accent} 0%, rgba(17,0,17,0.40) 55%, rgba(8,0,8,0.75) 100%)`,
                border: 'var(--border-subtle)',
              }}
            >
              {typeof lightbox === 'number' && gallery[lightbox] ? (
                <Image src={gallery[lightbox].src} alt={gallery[lightbox].alt} fill sizes="420px" className="object-cover" />
              ) : null}
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.08), rgba(0,0,0,0.42))' }}
              />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

