'use client'

import Link from 'next/link'
import Image from 'next/image'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'

import { useParallax } from '@/hooks/useParallax'
import { useScrollTrigger } from '@/hooks/useScrollTrigger'
import { useTextScramble } from '@/hooks/useTextScramble'
import { cn } from '@/lib/utils'
import { ParticleField } from '@/components/ui/ParticleField'

const SENSUAL_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

const titleVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: SENSUAL_EASE, delay: 0.5 } },
}

const sublineVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: SENSUAL_EASE } },
}

const ctaContainerVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: SENSUAL_EASE, delay: 2.5 } },
}

const toastVariants = {
  hidden: { opacity: 0, y: -12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: SENSUAL_EASE } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.2, ease: SENSUAL_EASE } },
}

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion()
  const { mouseX, mouseY } = useParallax()
  const { isScrolled } = useScrollTrigger({ threshold: 1 })

  const [showToast, setShowToast] = useState(false)
  const [replayKey, setReplayKey] = useState(0)

  const isReturning = useMemo(() => {
    if (typeof window === 'undefined') return false
    return window.localStorage.getItem('eroscape_agent_visited') === 'true'
  }, [])

  const { displayText: taglineText } = useTextScramble({
    text: 'El primer Escape Room Erótico del mundo',
    trigger: !shouldReduceMotion,
    speed: 40,
    scrambleDuration: 800,
    replayToken: replayKey,
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    if (isReturning) {
      const t0 = window.setTimeout(() => setShowToast(true), 0)
      const t1 = window.setTimeout(() => setShowToast(false), 3000)
      return () => {
        window.clearTimeout(t0)
        window.clearTimeout(t1)
      }
    }

    const t = window.setTimeout(() => {
      try {
        window.localStorage.setItem('eroscape_agent_visited', 'true')
        document.cookie = 'eroscape_agent_visited=true; path=/; max-age=31536000'
      } catch {
        // ignore
      }
    }, 5000)

    return () => window.clearTimeout(t)
  }, [isReturning])

  // When navigating back to "/", the Hero can remain mounted and Framer Motion won't
  // replay `initial` animations. Force a remount when the page becomes visible again.
  useEffect(() => {
    if (typeof window === 'undefined') return

    const bump = () => setReplayKey((k) => k + 1)

    const handleVisibility = () => {
      if (document.visibilityState === 'visible') bump()
    }

    window.addEventListener('pageshow', bump)
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      window.removeEventListener('pageshow', bump)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [])

  const fogMotionStyle = shouldReduceMotion
    ? undefined
    : {
        x: mouseX * 15,
        y: mouseY * 10,
      }

  const contentMotionStyle = shouldReduceMotion
    ? undefined
    : {
        x: mouseX * 8,
        y: mouseY * 6,
      }

  const scrollCueHidden = isScrolled

  return (
    <section className="relative h-svh overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/back-1.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
          aria-hidden="true"
        />
      </div>
      <div
        className="absolute inset-0 z-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(circle at 30% 20%, rgba(159,52,155,0.25), rgba(8,0,8,0.88) 60%), linear-gradient(180deg, rgba(8,0,8,0.80) 0%, rgba(8,0,8,0.92) 55%, rgba(8,0,8,0.96) 100%)',
        }}
      />

      <ParticleField count={60} className="z-1" />

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

      <div key={replayKey} className="relative z-3 flex h-full items-center justify-center px-4">
        <motion.div
          className="flex w-full max-w-3xl flex-col items-center text-center"
          animate={shouldReduceMotion ? undefined : contentMotionStyle}
          transition={shouldReduceMotion ? undefined : { duration: 0.6, ease: SENSUAL_EASE }}
        >
  

          <motion.div
            className="mb-4"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? undefined : { duration: 0.6, ease: SENSUAL_EASE, delay: 0.35 }}
          >
            <Image
              src="/eros-logo-ico.png"
              alt="Eroscape"
              width={200}
              height={88}
              priority
              className="mx-auto"
            />
          </motion.div>
          <motion.svg
            width="260"
            height="24"
            viewBox="0 0 260 24"
            className="mb-6"
            aria-hidden="true"
          >
            <motion.path
              d="M4 12h252"
              stroke="rgba(232,160,64,0.9)"
              strokeWidth="2"
              strokeLinecap="round"
              initial={shouldReduceMotion ? false : { pathLength: 0 }}
              animate={shouldReduceMotion ? undefined : { pathLength: 1 }}
              transition={shouldReduceMotion ? undefined : { duration: 1, delay: 0.2, ease: SENSUAL_EASE }}
            />
          </motion.svg>
          <motion.h1
            className="font-(--font-playfair) text-white tracking-[0.25em] leading-none"
            style={{ fontSize: 'clamp(48px, 7vw, 72px)' }}
            variants={titleVariants}
            initial={shouldReduceMotion ? false : 'hidden'}
            animate={shouldReduceMotion ? undefined : 'visible'}
          >
            EROSCAPE
          </motion.h1>

          <div
            className={cn('mt-6 font-(--font-playfair) italic')}
            style={{ color: 'var(--color-text-secondary)', fontSize: 'clamp(22px, 3.2vw, 28px)' }}
          >
            {shouldReduceMotion ? 'El primer Escape Room Erótico del mundo' : taglineText}
          </div>

          <motion.p
            className="mt-4 font-(--font-jetbrains) text-sm sm:text-base"
            style={{ color: 'var(--color-purple-muted)' }}
            variants={sublineVariants}
            initial={shouldReduceMotion ? false : 'hidden'}
            animate={shouldReduceMotion ? undefined : 'visible'}
            transition={shouldReduceMotion ? undefined : { ...sublineVariants.visible.transition, delay: 2.2 }}
          >
            +18 · Erotismo sin límites innecesarios · Tu placer, tus reglas
          </motion.p>

          <motion.div
            className="mt-10 flex w-full flex-col gap-3 sm:flex-row sm:justify-center"
            variants={ctaContainerVariants}
            initial={shouldReduceMotion ? false : 'hidden'}
            animate={shouldReduceMotion ? undefined : 'visible'}
          >
            <Link
              href="/reservar"
              className="w-full rounded-full px-6 py-3 text-center text-white sm:w-auto"
              style={{ background: 'var(--gradient-cta)' }}
            >
              <span className="font-(--font-playfair) tracking-[0.12em]">RENDIRSE AL DESEO</span>
            </Link>
            <a
              href="#concepto"
              className="w-full rounded-full px-6 py-3 text-center sm:w-auto"
              style={{ border: '1px solid rgba(255,255,255,0.7)', color: 'white' }}
            >
              <span className="font-(--font-playfair) tracking-[0.12em]">DESCUBRIR EL SECRETO</span>
            </a>
          </motion.div>

          <motion.div
            className="mt-14 font-(--font-jetbrains) text-xs sm:text-sm"
            style={{ color: 'var(--color-text-muted)' }}
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={
              shouldReduceMotion
                ? undefined
                : scrollCueHidden
                  ? { opacity: 0, transition: { duration: 0.2 } }
                  : { opacity: 1, transition: { duration: 0.3, delay: 3 } }
            }
          >
            <motion.span
              initial={shouldReduceMotion ? false : { y: 0 }}
              animate={shouldReduceMotion ? undefined : { y: [0, 6, 0] }}
              transition={shouldReduceMotion ? undefined : { duration: 1.2, repeat: Infinity, ease: SENSUAL_EASE }}
            >
              {'> déjate caer...'}
            </motion.span>
          </motion.div>
        </motion.div>
      </div>

      <AnimatePresence>
        {showToast ? (
          <motion.div
            className="fixed right-4 top-20 z-70 rounded-xl px-4 py-3 text-sm"
            style={{
              background: 'rgba(17,0,17,0.9)',
              border: 'var(--border-subtle)',
              color: 'var(--color-text-primary)',
              boxShadow: 'var(--glow-card)',
              backdropFilter: 'blur(10px)',
            }}
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

