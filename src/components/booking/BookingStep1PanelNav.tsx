'use client'

import { cn } from '@/lib/utils'

export type BookingStep1Panel = 'escenario' | 'fecha' | 'hora'

export interface BookingStep1PanelNavProps {
  active: BookingStep1Panel
  canAccessFecha: boolean
  canAccessHora: boolean
  onSelect: (panel: BookingStep1Panel) => void
}

const PANELS: { id: BookingStep1Panel; label: string }[] = [
  { id: 'escenario', label: 'Lugar y experiencia' },
  { id: 'fecha', label: 'Fecha' },
  { id: 'hora', label: 'Hora' },
]

export function BookingStep1PanelNav({
  active,
  canAccessFecha,
  canAccessHora,
  onSelect,
}: BookingStep1PanelNavProps) {
  return (
    <nav
      className="flex flex-wrap items-center gap-2"
      aria-label="Pasos de la reserva"
    >
      {PANELS.map((panel, index) => {
        const isActive = active === panel.id
        const disabled =
          panel.id === 'fecha' ? !canAccessFecha : panel.id === 'hora' ? !canAccessHora : false

        return (
          <button
            key={panel.id}
            type="button"
            disabled={disabled}
            onClick={() => onSelect(panel.id)}
            className={cn(
              'inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-(--font-jetbrains) text-[10px] uppercase tracking-[0.14em] transition-colors sm:px-4 sm:text-[11px]',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta)',
              disabled && 'cursor-not-allowed opacity-40',
              isActive
                ? 'border-(--color-magenta)/60 bg-(--color-bg-elevated) text-white [box-shadow:var(--glow-magenta)]'
                : 'border-white/14 bg-transparent text-(--color-text-secondary) hover:border-white/25 hover:text-white',
            )}
            aria-current={isActive ? 'step' : undefined}
          >
            <span
              className={cn(
                'flex h-5 w-5 items-center justify-center rounded-full text-[9px]',
                isActive ? 'bg-(--color-magenta) text-white' : 'border border-white/20',
              )}
            >
              {index + 1}
            </span>
            {panel.label}
          </button>
        )
      })}
    </nav>
  )
}
