import Link from 'next/link'

import { APP_MOVIL_STORES_ANCHOR_ID } from '@/lib/app-movil'

/** Patrón tipo QR decorativo (no codifica datos reales). */
const QR_PATTERN: ReadonlyArray<ReadonlyArray<0 | 1>> = [
  [1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1],
  [0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0],
  [1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1],
  [0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0],
  [1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1],
  [1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1],
  [0, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1],
  [1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0],
  [1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1],
]

export interface AppMovilPlaceholderQrProps {
  className?: string
}

export function AppMovilPlaceholderQr({ className }: AppMovilPlaceholderQrProps) {
  const cell = 5
  const pad = 16
  const w = pad * 2 + QR_PATTERN[0]!.length * cell
  const h = pad * 2 + QR_PATTERN.length * cell

  return (
    <Link
      href={`#${APP_MOVIL_STORES_ANCHOR_ID}`}
      scroll
      className={className}
      aria-label="Ir a enlaces de descarga en App Store y Google Play"
    >
      <svg viewBox={`0 0 ${w} ${h}`} className="h-auto w-full max-w-[200px]" role="img">
        <title>Código QR de demostración</title>
        <rect width={w} height={h} rx="12" fill="white" opacity="0.96" />
        {QR_PATTERN.map((row, y) =>
          row.map((bit, x) =>
            bit ? (
              <rect
                key={`${y}-${x}`}
                x={pad + x * cell}
                y={pad + y * cell}
                width={cell - 1}
                height={cell - 1}
                rx="0.8"
                fill="var(--color-bg-base)"
              />
            ) : null,
          ),
        )}
      </svg>
    </Link>
  )
}
