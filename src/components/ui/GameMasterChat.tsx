'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'

import { GAME_MASTER_INTRO_MESSAGES } from '@/lib/constants'
import { useTextScramble } from '@/hooks/useTextScramble'

const GM_STORAGE_KEY = 'gm_intro_seen'

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
    }, 300)

    schedule(() => {
      setShowTyping(false)
      setPhase(1)
    }, 1000)

    schedule(() => {
      setShowTyping(true)
    }, 1800)

    schedule(() => {
      setShowTyping(false)
      setPhase(2)
    }, 2500)

    schedule(() => {
      setShowTyping(true)
    }, 3300)

    schedule(() => {
      setShowTyping(false)
      setPhase(3)
    }, 4000)

    schedule(() => {
      setPhase(4)
      setShowCta(true)
      try {
        window.localStorage.setItem(GM_STORAGE_KEY, '1')
      } catch {
        // ignore
      }
    }, 5500)

    return clearTimers
  }, [clearTimers, hasViewed, schedule, shouldReduceMotion])

  const display0 = hasViewed || shouldReduceMotion ? msg0 : t0.displayText
  const display1 = hasViewed || shouldReduceMotion ? msg1 : t1.displayText
  const display2 = hasViewed || shouldReduceMotion ? msg2 : t2.displayText

  return (
    <aside
      className="overflow-hidden rounded-2xl"
      style={{
        background: 'var(--color-bg-elevated)',
        border: 'var(--border-subtle)',
        boxShadow: 'var(--glow-card)',
      }}
    >
      <div
        className="flex items-center gap-2 px-4 py-3"
        style={{ borderBottom: 'var(--border-subtle)' }}
      >
        <span className="relative flex h-2 w-2">
          {!shouldReduceMotion ? (
            <span
              className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
              style={{ background: 'var(--color-gm-terminal)' }}
            />
          ) : null}
          <span
            className="relative inline-flex h-2 w-2 rounded-full"
            style={{ background: 'var(--color-gm-terminal)' }}
          />
        </span>
        <span
          className="[font-family:var(--font-jetbrains)] text-[11px] tracking-[0.2em]"
          style={{ color: 'var(--color-gm-terminal)' }}
        >
          GAME_MASTER_IA
        </span>
        <span
          className="[font-family:var(--font-jetbrains)] text-[10px] tracking-wide"
          style={{ color: 'var(--color-text-muted)' }}
        >
          · ONLINE
        </span>
      </div>

      <div className="space-y-3 p-4">
        {phase >= 1 ? <ChatBubble text={display0} /> : null}
        {phase >= 2 ? <ChatBubble text={display1} /> : null}
        {phase >= 3 ? <ChatBubble text={display2} /> : null}

        <AnimatePresence>
          {showTyping && phase < 4 && !hasViewed && !shouldReduceMotion ? (
            <motion.div
              key={`typing-${phase}`}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 0 }}
              className="flex items-center gap-2 [font-family:var(--font-jetbrains)] text-[10px]"
              style={{ color: 'var(--color-text-muted)' }}
            >
              <span>GM está escribiendo</span>
              <span className="flex gap-1" aria-hidden="true">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="inline-block h-1 w-1 rounded-full bg-current"
                    animate={{ opacity: [0.2, 1, 0.2], y: [0, -3, 0] }}
                    transition={{ duration: 0.9, repeat: Infinity, ease: SENSUAL_EASE, delay: i * 0.15 }}
                  />
                ))}
              </span>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <AnimatePresence>
          {showCta ? (
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
              animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: SENSUAL_EASE }}
              className="pt-2"
            >
              <button
                type="button"
                onClick={onStartQuestionnaire}
                className="w-full rounded-xl px-4 py-3 [font-family:var(--font-jetbrains)] text-[11px] tracking-[0.18em] uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-gm-terminal) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg-base)"
                style={{
                  border: '1px solid color-mix(in srgb, var(--color-gm-terminal) 35%, transparent)',
                  color: 'var(--color-gm-terminal)',
                  background: 'color-mix(in srgb, var(--color-gm-terminal) 8%, transparent)',
                }}
              >
                Responder al Maestro →
              </button>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </aside>
  )
}

interface ChatBubbleProps {
  text: string
}

function ChatBubble({ text }: ChatBubbleProps) {
  return (
    <div className="flex max-w-[92%] flex-col">
      <div
        className="rounded-xl rounded-tl-none p-3 [font-family:var(--font-jetbrains)] text-sm leading-relaxed"
        style={{
          background: 'var(--color-bg-subtle)',
          color: 'var(--color-text-secondary)',
        }}
      >
        <span className="mr-2" style={{ color: 'var(--color-gm-terminal)' }}>
          GM &gt;
        </span>
        <span>{text}</span>
      </div>
    </div>
  )
}
