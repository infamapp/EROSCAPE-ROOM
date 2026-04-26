'use client'

import { useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const SCRAMBLE_CHARS = '!@#$%^&*<>?'

const MAX_SCRAMBLE_MS = 1200

export interface UseTextScrambleProps {
  text: string
  trigger: boolean
  speed?: number
  scrambleDuration?: number
  replayToken?: number
}

export interface UseTextScrambleResult {
  displayText: string
  isComplete: boolean
}

function getRandomChar(): string {
  return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)] ?? '?'
}

export function useTextScramble({
  text,
  trigger,
  speed = 40,
  scrambleDuration = 800,
  replayToken,
}: UseTextScrambleProps): UseTextScrambleResult {
  const shouldReduceMotion = useReducedMotion()
  const [displayText, setDisplayText] = useState(text)
  const [isComplete, setIsComplete] = useState(!trigger)
  const runIdRef = useRef(0)

  const totalMs = Math.min(MAX_SCRAMBLE_MS, Math.max(1, scrambleDuration))

  useEffect(() => {
    runIdRef.current += 1
    const runId = runIdRef.current

    if (!trigger) {
      const t = window.setTimeout(() => {
        if (runIdRef.current !== runId) return
        setDisplayText(text)
        setIsComplete(false)
      }, 0)
      return () => window.clearTimeout(t)
    }

    if (shouldReduceMotion) {
      const t = window.setTimeout(() => {
        if (runIdRef.current !== runId) return
        setDisplayText(text)
        setIsComplete(true)
      }, 0)
      return () => window.clearTimeout(t)
    }

    const start = performance.now()
    const charCount = text.length

    const tick = () => {
      if (runIdRef.current !== runId) return true

      const now = performance.now()
      const t = Math.min(1, (now - start) / totalMs)

      const resolved = Math.floor(t * charCount)

      let out = ''
      for (let i = 0; i < charCount; i++) {
        const ch = text[i] ?? ''
        if (i < resolved) {
          out += ch
          continue
        }
        if (ch === ' ') {
          out += ' '
          continue
        }
        out += getRandomChar()
      }

      setDisplayText(out)

      if (t >= 1) {
        setDisplayText(text)
        setIsComplete(true)
        return true
      }
      return false
    }

    const t0 = window.setTimeout(() => {
      if (runIdRef.current !== runId) return
      setIsComplete(false)
    }, 0)
    tick()
    const id = window.setInterval(() => {
      const done = tick()
      if (done) window.clearInterval(id)
    }, Math.max(10, speed))

    return () => {
      window.clearTimeout(t0)
      window.clearInterval(id)
    }
  }, [replayToken, shouldReduceMotion, speed, text, totalMs, trigger])

  return { displayText, isComplete }
}
