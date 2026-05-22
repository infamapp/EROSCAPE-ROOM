'use client'

export interface BookingFlowHeaderProps {
  actLabel: string
  title: string
  subtitle?: string
}

/** Cabecera compartida del flujo de reserva (misma línea que paso I). */
export function BookingFlowHeader({ actLabel, title, subtitle }: BookingFlowHeaderProps) {
  return (
    <header className="shrink-0 pb-3 pt-1">
      <p className="font-(--font-jetbrains) text-[10px] uppercase tracking-[0.2em] text-(--color-magenta-glow)">
        Paso {actLabel}
      </p>
      <h2 className="mt-1 font-(--font-playfair) text-xl text-white sm:text-2xl">{title}</h2>
      {subtitle ? (
        <p className="mt-2 max-w-2xl font-(--font-inter) text-sm leading-relaxed text-(--color-text-secondary)">
          {subtitle}
        </p>
      ) : null}
    </header>
  )
}
