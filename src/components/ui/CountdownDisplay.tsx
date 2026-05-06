'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'

const SENSUAL_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

type Urgency = 'normal' | 'amber' | 'red'

function pad2(n: number): string {
  return String(Math.max(0, n)).padStart(2, '0')
}

interface CountdownCellProps {
  char: string
  flash: boolean
  urgency: Urgency
  shouldReduceMotion: boolean | null
}

function CountdownCell({ char, flash, urgency, shouldReduceMotion }: CountdownCellProps) {
  const bg =
    urgency === 'red'
      ? 'color-mix(in srgb, var(--color-gm-alert) 22%, var(--color-bg-subtle))'
      : urgency === 'amber'
        ? 'color-mix(in srgb, var(--color-intensity-beta) 18%, var(--color-bg-subtle))'
        : 'var(--color-bg-subtle)'

  return (
    <motion.span
      className="inline-flex min-w-[2.5rem] items-center justify-center rounded-xl px-4 py-3 [font-family:var(--font-jetbrains)] text-4xl"
      style={{
        background: bg,
        color: 'var(--color-magenta)',
        boxShadow: 'var(--glow-magenta)',
      }}
      animate={shouldReduceMotion || !flash ? undefined : { scale: [1, 1.06, 1] }}
      transition={{ duration: 0.1, ease: SENSUAL_EASE }}
    >
      {char}
    </motion.span>
  )
}

export interface CountdownDisplayProps {
  targetIso: string
  timeSlot: string
}

export function CountdownDisplay({ targetIso, timeSlot }: CountdownDisplayProps) {
  const shouldReduceMotion = useReducedMotion()
  const [now, setNow] = useState(() => Date.now())
  const [prevDigitString, setPrevDigitString] = useState('')

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(id)
  }, [])

  const targetMs = useMemo(() => {
    const [y, m, d] = targetIso.split('-').map(Number)
    const [hh, mm] = timeSlot.split(':').map(Number)
    return new Date(y ?? 1970, (m ?? 1) - 1, d ?? 1, hh ?? 0, mm ?? 0, 0, 0).getTime()
  }, [targetIso, timeSlot])

  const remaining = Math.max(0, targetMs - now)
  const days = Math.floor(remaining / 86_400_000)
  const hours = Math.floor((remaining % 86_400_000) / 3_600_000)
  const minutes = Math.floor((remaining % 3_600_000) / 60_000)
  const seconds = Math.floor((remaining % 60_000) / 1_000)

  const urgency: Urgency = remaining < 3_600_000 ? 'red' : remaining < 86_400_000 ? 'amber' : 'normal'

  const dayDigits = days >= 100 ? String(days).padStart(3, '0').split('') : pad2(days).split('')
  const hDigits = pad2(hours).split('')
  const mDigits = pad2(minutes).split('')
  const sDigits = pad2(seconds).split('')

  const digitString = [...dayDigits, ...hDigits, ...mDigits, ...sDigits].join('')
  const flashArr = digitString.split('').map((c, i) => (i < prevDigitString.length ? prevDigitString[i] !== c : false))

  useEffect(() => {
    const t = window.setTimeout(() => setPrevDigitString(digitString), 0)
    return () => window.clearTimeout(t)
  }, [digitString])

  const groups = useMemo(() => {
    const blocks = [
      { label: 'DÍAS' as const, chars: dayDigits },
      { label: 'HRS' as const, chars: hDigits },
      { label: 'MIN' as const, chars: mDigits },
      { label: 'SEG' as const, chars: sDigits },
    ]
    let offset = 0
    return blocks.map((b) => {
      const start = offset
      offset += b.chars.length
      return { ...b, start }
    })
  }, [dayDigits, hDigits, mDigits, sDigits])

  return (
    <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
      {groups.map((g) => (
        <div key={g.label} className="flex flex-col items-center gap-2">
          <span
            className="[font-family:var(--font-jetbrains)] text-[10px] uppercase tracking-widest"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {g.label}
          </span>
          <div className="flex gap-1">
            {g.chars.map((ch, i) => (
              <CountdownCell
                key={`${g.label}-${g.start + i}`}
                char={ch}
                flash={flashArr[g.start + i] ?? false}
                urgency={urgency}
                shouldReduceMotion={shouldReduceMotion}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
