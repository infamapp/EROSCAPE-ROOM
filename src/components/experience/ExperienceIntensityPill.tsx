import { Swords } from 'lucide-react'

import {
  intensityPillClassName,
  intensityPillLabel,
  intensityShowsSwords,
} from '@/lib/experience-intensity'
import type { ExperienciasCatalogIntensity } from '@/types/experiencias-catalog'
import { cn } from '@/lib/utils'

export interface ExperienceIntensityPillProps {
  level: ExperienciasCatalogIntensity
  className?: string
}

export function ExperienceIntensityPill({ level, className }: ExperienceIntensityPillProps) {
  const showSwords = intensityShowsSwords(level)

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2.5 py-1 font-(--font-jetbrains) text-[10px] tracking-wide uppercase sm:text-[11px]',
        intensityPillClassName(level),
        className,
      )}
    >
      {intensityPillLabel(level)}
      {showSwords ? <Swords className="size-3.5 shrink-0" aria-hidden="true" /> : null}
    </span>
  )
}
