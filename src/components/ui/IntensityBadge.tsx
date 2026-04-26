'use client'

import { motion, useReducedMotion } from 'framer-motion'

import { cn } from '@/lib/utils'
import { getIntensityColor, getMissionLevel } from '@/lib/utils'
import type { IntensityLevel, MissionLevel } from '@/types/booking'

const SENSUAL_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

function isMissionLevel(v: IntensityLevel | MissionLevel): v is MissionLevel {
  return v === 'ALPHA' || v === 'BETA' || v === 'OMEGA'
}

function missionLevelToIntensity(m: MissionLevel): IntensityLevel {
  switch (m) {
    case 'ALPHA':
      return 'bajo'
    case 'BETA':
      return 'medio'
    case 'OMEGA':
      return 'turbio'
  }
}

function resolveMissionLevel(level: IntensityLevel | MissionLevel): MissionLevel {
  return isMissionLevel(level) ? level : getMissionLevel(level)
}

function resolveIntensity(level: IntensityLevel | MissionLevel): IntensityLevel {
  return isMissionLevel(level) ? missionLevelToIntensity(level) : level
}

function missionLabel(m: MissionLevel): string {
  switch (m) {
    case 'ALPHA':
      return 'NIVEL ALPHA'
    case 'BETA':
      return 'NIVEL BETA'
    case 'OMEGA':
      return 'NIVEL OMEGA'
  }
}

export interface IntensityBadgeProps {
  level: IntensityLevel | MissionLevel
  /** Pulso en el punto (p. ej. OMEGA). */
  pulse?: boolean
  className?: string
}

export function IntensityBadge({ level, pulse = false, className }: IntensityBadgeProps) {
  const shouldReduceMotion = useReducedMotion()
  const mission = resolveMissionLevel(level)
  const intensity = resolveIntensity(level)
  const dotColor = getIntensityColor(intensity)
  const showPulse = pulse && mission === 'OMEGA' && !shouldReduceMotion

  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border px-2.5 py-1 font-[var(--font-jetbrains)] text-[10px] tracking-[0.12em]',
        className,
      )}
      style={{
        borderColor: `color-mix(in srgb, ${dotColor} 45%, transparent)`,
        background: `color-mix(in srgb, ${dotColor} 14%, var(--color-bg-elevated))`,
        color: 'var(--color-text-secondary)',
      }}
    >
      {showPulse ? (
        <motion.span
          className="inline-block h-2 w-2 shrink-0 rounded-full"
          style={{ background: dotColor }}
          animate={{ opacity: [1, 0.45, 1], scale: [1, 1.15, 1] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: SENSUAL_EASE }}
          aria-hidden="true"
        />
      ) : (
        <span className="inline-block h-2 w-2 shrink-0 rounded-full" style={{ background: dotColor }} aria-hidden="true" />
      )}
      <span className="text-white">{missionLabel(mission)}</span>
    </span>
  )
}
