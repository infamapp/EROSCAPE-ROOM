'use client'

import Link from 'next/link'
import Image from 'next/image'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'

import { useScrollTrigger } from '@/hooks/useScrollTrigger'
import { cn } from '@/lib/utils'
import { ParticleField } from '@/components/ui/ParticleField'

const SENSUAL_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: SENSUAL_EASE } },
}

const toastVariants = {
  hidden: { opacity: 0, y: -12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: SENSUAL_EASE } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.2, ease: SENSUAL_EASE } },
}

export interface HeroSectionProps {
  isReturningUser?: boolean
}

function isDesktopParallaxEnabled(): boolean {
  if (typeof window === 'undefined') return false
  return window.innerWidth >= 768
}

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n))
}

function useParallaxEngine(isEnabled: boolean) {
  const target = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const smooth = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const rafRef = useRef<number | null>(null)
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 })

  useEffect(() => {
    if (!isEnabled) return

    const handleMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      const nx = cx === 0 ? 0 : (e.clientX - cx) / cx
      const ny = cy === 0 ? 0 : (e.clientY - cy) / cy
      target.current = { x: clamp(nx, -1, 1), y: clamp(ny, -1, 1) }
    }

    const tick = () => {
      smooth.current.x += (target.current.x - smooth.current.x) * 0.08
      smooth.current.y += (target.current.y - smooth.current.y) * 0.08
      setPos({ x: smooth.current.x, y: smooth.current.y })
      rafRef.current = window.requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', handleMove, { passive: true })
    rafRef.current = window.requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current)
    }
  }, [isEnabled])

  return pos
}

export function HeroSection({ isReturningUser }: HeroSectionProps) {
  const shouldReduceMotion = useReducedMotion()
  const { isScrolled } = useScrollTrigger({ threshold: 1 })

  const parallaxEnabled = !shouldReduceMotion && isDesktopParallaxEnabled()
  const { x: mouseX, y: mouseY } = useParallaxEngine(parallaxEnabled)

  const computedReturning = useMemo(() => {
    if (typeof window === 'undefined') return false
    return window.localStorage.getItem('eroscape_visited') === 'true'
  }, [])

  const isReturning = isReturningUser ?? computedReturning

  const [showToast, setShowToast] = useState(false)
  const [showScrollCue, setShowScrollCue] = useState(true)
  const [typedTitle, setTypedTitle] = useState(shouldReduceMotion ? 'El primer Escape Room Erótico del mundo' : '')
  const [showCursor, setShowCursor] = useState(!shouldReduceMotion)
  const [terminalLineCount, setTerminalLineCount] = useState(shouldReduceMotion ? 3 : 0)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (shouldReduceMotion) return

    const full = 'El primer Escape Room Erótico del mundo'
    const startDelayMs = 600
    const perCharMs = 50
    const cursorHideAtMs = 3000

    let rafId: number | null = null
    const t0 = window.performance.now()
    const tick = (now: number) => {
      const elapsed = now - t0
      const afterDelay = Math.max(0, elapsed - startDelayMs)
      const nextCount = clamp(Math.floor(afterDelay / perCharMs), 0, full.length)
      setTypedTitle(full.slice(0, nextCount))
      setShowCursor(elapsed < cursorHideAtMs)
      rafId = window.requestAnimationFrame(tick)
    }

    rafId = window.requestAnimationFrame(tick)
    return () => {
      if (rafId) window.cancelAnimationFrame(rafId)
    }
  }, [shouldReduceMotion])

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (shouldReduceMotion) return

    const lines = [
      '> Acceso nivel +18. Verificando...',
      '> Consentimiento: REQUERIDO',
      '> Iniciando protocolo de inmersión...',
    ] as const

    let rafId: number | null = null
    const t0 = window.performance.now()
    const tick = (now: number) => {
      const elapsed = now - t0
      const nextCount = clamp(Math.floor(elapsed / 400), 0, lines.length)
      setTerminalLineCount(nextCount)
      rafId = window.requestAnimationFrame(tick)
    }

    rafId = window.requestAnimationFrame(tick)
    return () => {
      if (rafId) window.cancelAnimationFrame(rafId)
    }
  }, [shouldReduceMotion])

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (isReturning) {
      let rafId: number | null = null
      const t0 = window.performance.now()
      const tick = (now: number) => {
        const elapsed = now - t0
        setShowToast(elapsed >= 1200 && elapsed < 5200)
        rafId = window.requestAnimationFrame(tick)
      }
      rafId = window.requestAnimationFrame(tick)
      return () => {
        if (rafId) window.cancelAnimationFrame(rafId)
      }
    }

    const t = window.setTimeout(() => {
      try {
        window.localStorage.setItem('eroscape_visited', 'true')
        document.cookie = 'eroscape_visited=true; path=/; max-age=31536000'
      } catch {
        // ignore
      }
    }, 5000)

    return () => window.clearTimeout(t)
  }, [isReturning, shouldReduceMotion])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleScroll = () => setShowScrollCue(false)
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const fogMotionStyle = parallaxEnabled ? { x: mouseX * 15, y: mouseY * 10 } : undefined
  const particlesMotionStyle = parallaxEnabled ? { x: mouseX * 6, y: mouseY * 4 } : undefined
  const contentMotionStyle = parallaxEnabled ? { x: mouseX * 10, y: mouseY * 7 } : undefined

  return (
    <section className="relative h-svh overflow-hidden bg-(--color-bg-base)">
      <div
        className="absolute inset-0 z-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 120% 85% at 50% -20%, color-mix(in srgb, var(--color-magenta) 26%, transparent) 0%, transparent 65%), radial-gradient(ellipse 90% 70% at 20% 30%, color-mix(in srgb, var(--color-purple-mid) 24%, transparent) 0%, transparent 60%), linear-gradient(180deg, rgba(8,0,8,0.20) 0%, rgba(8,0,8,0.05) 55%, rgba(8,0,8,1) 100%)',
        }}
      />

      <motion.div
        className="absolute inset-0 z-1"
        aria-hidden="true"
        animate={shouldReduceMotion ? undefined : particlesMotionStyle}
        transition={shouldReduceMotion ? undefined : { duration: 0.6, ease: SENSUAL_EASE }}
      >
        <ParticleField count={60} />
      </motion.div>

      <motion.div
        className="absolute inset-0 z-2"
        style={{
          background:
            'radial-gradient(circle at 30% 20%, rgba(159,52,155,0.35), transparent 60%), radial-gradient(circle at 70% 60%, rgba(107,32,128,0.25), transparent 55%)',
          opacity: 0.3,
        }}
        animate={shouldReduceMotion ? undefined : fogMotionStyle}
        transition={shouldReduceMotion ? undefined : { duration: 0.6, ease: SENSUAL_EASE }}
      />

      <div className="relative z-3 flex h-full items-center justify-center px-4">
        <motion.div
          className="flex w-full max-w-3xl flex-col items-center text-center"
          animate={shouldReduceMotion ? undefined : contentMotionStyle}
          transition={shouldReduceMotion ? undefined : { duration: 0.6, ease: SENSUAL_EASE }}
        >
          <motion.div
            variants={shouldReduceMotion ? undefined : containerVariants}
            initial={shouldReduceMotion ? false : 'hidden'}
            animate={shouldReduceMotion ? undefined : 'visible'}
            className="flex flex-col items-center"
          >
            <motion.div variants={shouldReduceMotion ? undefined : itemVariants} className="mb-4 flex flex-col items-center">
              <Image
                src="/eros-logo-ico.png"
                alt="Eroscape"
                width={100}
                height={100}
                priority
                className="h-28 w-28 select-none"
              />
              <span className=" [font-family:var(--font-playfair)] uppercase leading-none tracking-[0.12em] mt-3 text-xl sm:text-5xl">
                Eroscape  
              </span>
            </motion.div>

          <motion.p
            variants={shouldReduceMotion ? undefined : itemVariants}
            className="font-(--font-jetbrains) text-[10px] uppercase tracking-[0.22em] text-(--color-text-muted) sm:text-[11px]"
          >
            TECNOLOGÍA DEL PLACER
          </motion.p>

          <motion.h1
            variants={shouldReduceMotion ? undefined : itemVariants}
            className="mt-4 font-bold italic leading-[1.02] tracking-[0.02em] text-(--color-text-primary) [font-family:var(--font-playfair)]"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}
          >
            <span>{typedTitle}</span>
            {showCursor ? (
              <span
                className="ml-1 inline-block text-(--color-magenta-glow)"
                style={{ opacity: shouldReduceMotion ? 0 : undefined }}
              >
                |
              </span>
            ) : null}
          </motion.h1>

          <motion.div variants={shouldReduceMotion ? undefined : itemVariants} className="mt-6 w-full max-w-xl flex justify-center">
            <div className="rounded-2xl w-fit border border-white/10 bg-white/4 px-5 py-4 text-left [box-shadow:var(--glow-card)]">
              <p className="font-(--font-jetbrains) text-[11px] uppercase tracking-[0.18em] text-(--color-purple-muted)">
                {terminalLineCount >= 1 ? '> Acceso nivel +18. Verificando...' : '\u00A0'}
              </p>
              <p className="mt-1 font-(--font-jetbrains) text-[11px] uppercase tracking-[0.18em] text-(--color-purple-muted)">
                {terminalLineCount >= 2 ? '> Consentimiento: REQUERIDO' : '\u00A0'}
              </p>
              <p className="mt-1 font-(--font-jetbrains) text-[11px] uppercase tracking-[0.18em] text-(--color-purple-muted)">
                {terminalLineCount >= 3 ? '> Iniciando protocolo de inmersión...' : '\u00A0'}
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={shouldReduceMotion ? undefined : itemVariants}
            className="mt-8 flex w-full flex-col gap-3 sm:mt-10 sm:flex-row sm:justify-center"
            style={{ transitionDelay: shouldReduceMotion ? undefined : '2.5s' }}
          >
            <Link
              href="/reservar"
              className={cn(
                'w-full rounded-full px-6 py-3 text-center text-xs font-semibold uppercase tracking-[0.18em] text-white sm:w-auto',
                'transition-[filter,transform] duration-200 hover:brightness-110 active:translate-y-px',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20',
              )}
              style={{ background: 'var(--gradient-cta)' }}
            >
              <span className="font-(--font-jetbrains)">RENDIRSE AL DESEO</span>
            </Link>

            <button
              type="button"
              className={cn(
                'w-full rounded-full border px-6 py-3 text-center text-xs font-semibold uppercase tracking-[0.18em] sm:w-auto',
                'border-[color-mix(in_srgb,var(--color-magenta-dim)_70%,transparent)] text-(--color-text-secondary)',
                'transition-[border-color,color,background-color,transform] duration-200 hover:border-(--color-magenta) hover:text-white active:translate-y-px',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20',
              )}
              onClick={() => {
                const el = document.getElementById('experiencias-destacadas')
                el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }}
            >
              <span className="font-(--font-jetbrains)">ELEGÍ TU NOCHE</span>
            </button>
          </motion.div>

          <AnimatePresence>
            {!isScrolled && showScrollCue ? (
              <motion.div
                variants={toastVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="mt-10 font-(--font-jetbrains) text-[10px] uppercase tracking-[0.18em] text-(--color-text-muted) sm:mt-14"
              >
                <motion.span
                  initial={shouldReduceMotion ? false : { y: 0 }}
                  animate={shouldReduceMotion ? undefined : { y: [0, 8, 0] }}
                  transition={shouldReduceMotion ? undefined : { duration: 1.5, repeat: Infinity, ease: SENSUAL_EASE }}
                >
                  {'> scroll_para_continuar()'}
                </motion.span>
              </motion.div>
            ) : null}
          </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>

      <AnimatePresence>
        {showToast ? (
          <motion.div
            className="fixed right-4 top-20 z-70 rounded-xl border px-4 py-2 font-(--font-jetbrains) text-xs tracking-[0.14em]"
            style={{ background: 'var(--color-bg-elevated)', borderColor: 'var(--color-magenta-dim)', color: 'var(--color-text-primary)' }}
            variants={toastVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            Ya te esperábamos.
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  )
}

