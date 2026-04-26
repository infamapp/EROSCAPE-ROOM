'use client'

import Image from 'next/image'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

const SENSUAL_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

export interface RouteTransitionLoaderProps {
  /** Routes that start with any of these prefixes will never show the loader. */
  excludePathPrefixes?: readonly string[]
  /** Minimum time (ms) the loader stays visible after a route change. */
  minVisibleMs?: number
}

export function RouteTransitionLoader({
  excludePathPrefixes = ['/reservar'],
  minVisibleMs = 550,
}: RouteTransitionLoaderProps) {
  const shouldReduceMotion = useReducedMotion()
  const pathname = usePathname()

  const prevPathRef = useRef<string | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const prev = prevPathRef.current
    prevPathRef.current = pathname

    if (!prev || prev === pathname) return
    if (excludePathPrefixes.some((p) => pathname.startsWith(p))) return

    const t0 = window.setTimeout(() => setVisible(true), 0)
    const t1 = window.setTimeout(() => setVisible(false), minVisibleMs)
    return () => {
      window.clearTimeout(t0)
      window.clearTimeout(t1)
    }
  }, [excludePathPrefixes, minVisibleMs, pathname])

  if (excludePathPrefixes.some((p) => pathname.startsWith(p))) return null

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key={pathname}
          className="fixed inset-0 z-300 overflow-hidden"
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0.15 : 0.35, ease: SENSUAL_EASE }}
          aria-hidden="true"
        >
          <div className="absolute inset-0">
            <Image src="/back-2.png" alt="" fill priority sizes="100vw" className="object-cover" />
          </div>

          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at 30% 20%, rgba(159,52,155,0.25), rgba(8,0,8,0.88) 60%), linear-gradient(180deg, rgba(8,0,8,0.80) 0%, rgba(8,0,8,0.92) 55%, rgba(8,0,8,0.96) 100%)',
            }}
          />

          <motion.div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at 30% 20%, rgba(159,52,155,0.35), transparent 60%), radial-gradient(circle at 70% 60%, rgba(107,32,128,0.25), transparent 55%)',
              opacity: 0.28,
            }}
            animate={shouldReduceMotion ? undefined : { opacity: [0.22, 0.34, 0.22] }}
            transition={shouldReduceMotion ? undefined : { duration: 1.6, repeat: Infinity, ease: SENSUAL_EASE }}
          />

          <div className="relative z-10 flex h-full w-full items-center justify-center px-6">
            <div className="flex max-w-xl flex-col items-center text-center">
              <Image src="/erosLogo.png" alt="Eroscape" width={96} height={96} quality={100} priority />
              <div className="mt-6 font-(--font-playfair) text-xl italic text-white sm:text-2xl">
                bienvenido al lugar de tus fantasias
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

