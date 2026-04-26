'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'

import { GAME_MASTER_INTRO_MESSAGES } from '@/lib/constants'
import { useTextScramble } from '@/hooks/useTextScramble'

const GM_STORAGE_KEY = 'gm_chat_viewed'

const SENSUAL_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

export interface GameMasterChatProps {
  onStartQuestionnaire: () => void
}

export function GameMasterChat({ onStartQuestionnaire }: GameMasterChatProps) {
  const shouldReduceMotion = useReducedMotion()
  const [hasViewed, setHasViewed] = useState(false)
  const [phase, setPhase] = useState(0)
  const [showTyping, setShowTyping] = useState(false)
  const [showCta, setShowCta] = useState(false)
  const timersRef = useRef<number[]>([])

  const msg0 = GAME_MASTER_INTRO_MESSAGES[0] ?? ''
  const msg1 = GAME_MASTER_INTRO_MESSAGES[1] ?? ''
  const msg2 = GAME_MASTER_INTRO_MESSAGES[2] ?? ''

  const t0 = useTextScramble({ text: msg0, trigger: phase >= 1 && !hasViewed && !shouldReduceMotion, speed: 28, scrambleDuration: 700 })
  const t1 = useTextScramble({ text: msg1, trigger: phase >= 2 && !hasViewed && !shouldReduceMotion, speed: 28, scrambleDuration: 700 })
  const t2 = useTextScramble({ text: msg2, trigger: phase >= 3 && !hasViewed && !shouldReduceMotion, speed: 28, scrambleDuration: 700 })

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((id) => window.clearTimeout(id))
    timersRef.current = []
  }, [])

  const schedule = useCallback((fn: () => void, ms: number) => {
    const id = window.setTimeout(fn, ms)
    timersRef.current.push(id)
  }, [])

  useEffect(() => {
    const id = window.setTimeout(() => {
      if (typeof window === 'undefined') return
      setHasViewed(window.localStorage.getItem(GM_STORAGE_KEY) === '1')
    }, 0)
    return () => window.clearTimeout(id)
  }, [])

  useEffect(() => {
    clearTimers()
    if (hasViewed || shouldReduceMotion) {
      const id = window.setTimeout(() => {
        setPhase(4)
        setShowCta(true)
        setShowTyping(false)
      }, 0)
      timersRef.current.push(id)
      return clearTimers
    }

    schedule(() => {
      setShowTyping(true)
      setPhase(1)
    }, 500)

    schedule(() => {
      setShowTyping(false)
      setPhase(2)
      setShowTyping(true)
    }, 2000)

    schedule(() => {
      setShowTyping(false)
      setPhase(3)
      setShowTyping(true)
    }, 3500)

    schedule(() => {
      setShowTyping(false)
      setPhase(4)
      setShowCta(true)
      try {
        window.localStorage.setItem(GM_STORAGE_KEY, '1')
      } catch {
        // ignore
      }
    }, 4500)

    return clearTimers
  }, [clearTimers, hasViewed, schedule, shouldReduceMotion])

  const display0 = hasViewed || shouldReduceMotion ? msg0 : t0.displayText
  const display1 = hasViewed || shouldReduceMotion ? msg1 : t1.displayText
  const display2 = hasViewed || shouldReduceMotion ? msg2 : t2.displayText

  return (
    <aside
      className="rounded-2xl border p-4"
      style={{ borderColor: 'rgba(22,163,74,0.25)', background: 'rgba(8,0,8,0.95)', boxShadow: 'var(--glow-card)' }}
    >
      <div className="flex items-center gap-2 border-b border-[rgba(22,163,74,0.2)] pb-3">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" style={{ background: 'var(--color-gm-terminal)' }} />
          <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: 'var(--color-gm-terminal)' }} />
        </span>
        <span className="font-[var(--font-jetbrains)] text-xs tracking-wide" style={{ color: 'var(--color-gm-terminal)' }}>
          EL MAESTRO
        </span>
        <span className="font-[var(--font-jetbrains)] text-[10px]" style={{ color: 'var(--color-text-muted)' }}>
          · ESCUCHÁNDOTE
        </span>
      </div>

      <div className="mt-4 space-y-3 font-[var(--font-jetbrains)] text-xs leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
        {phase >= 1 ? <p>{display0}</p> : null}
        {phase >= 2 ? <p>{display1}</p> : null}
        {phase >= 3 ? <p>{display2}</p> : null}
      </div>

      <AnimatePresence>
        {showTyping && phase < 4 && !hasViewed && !shouldReduceMotion ? (
          <motion.div
            key="typing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-3 flex items-center gap-2 font-[var(--font-jetbrains)] text-[10px]"
            style={{ color: 'var(--color-text-muted)' }}
          >
            <span>El Maestro está escribiendo...</span>
            <span className="flex gap-1" aria-hidden="true">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="inline-block h-1 w-1 rounded-full bg-current"
                  animate={{ y: [0, -4, 0], opacity: [0.35, 1, 0.35] }}
                  transition={{ duration: 0.55, repeat: Infinity, ease: SENSUAL_EASE, delay: i * 0.12 }}
                />
              ))}
            </span>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {showCta ? (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: SENSUAL_EASE }} className="mt-4">
            <button
              type="button"
              onClick={onStartQuestionnaire}
              className="w-full rounded-xl border px-4 py-3 font-[var(--font-jetbrains)] text-[11px] tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gm-terminal)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-base)]"
              style={{ borderColor: 'rgba(22,163,74,0.35)', color: 'var(--color-gm-terminal)' }}
            >
              CONTARLE MIS SECRETOS →
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </aside>
  )
}
