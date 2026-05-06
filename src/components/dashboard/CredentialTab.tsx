'use client'

import dynamic from 'next/dynamic'
import { Download } from 'lucide-react'
import { useCallback, useRef } from 'react'

const CredentialQr = dynamic(() => import('@/components/dashboard/CredentialQr').then((m) => m.CredentialQr), { ssr: false })

export interface CredentialTabProps {
  bookingId: string
}

export function CredentialTab({ bookingId }: CredentialTabProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const value = `https://app.eroscape.com/login?booking=${encodeURIComponent(bookingId)}`

  const handleDownload = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const url = canvas.toDataURL('image/png')
    const a = document.createElement('a')
    a.href = url
    a.download = `eroscape-credential-${bookingId}.png`
    a.click()
  }, [bookingId])

  return (
    <div className="space-y-10">
      <header className="text-center">
        <p
          className="[font-family:var(--font-jetbrains)] text-[10px] tracking-[0.25em]"
          style={{ color: 'var(--color-magenta)' }}
        >
          CREDENCIAL OPERATIVA
        </p>
        <h2 className="mt-2 [font-family:var(--font-playfair)] text-2xl text-white">Tu llave de entrada</h2>
        <p
          className="mt-2 [font-family:var(--font-inter)] text-sm"
          style={{ color: 'var(--color-text-muted)' }}
        >
          Cómo entrar la noche de tu experiencia.
        </p>
      </header>

      <div className="flex flex-col items-center gap-6">
        <div
          className="inline-block rounded-2xl p-4"
          style={{
            background: '#FFFFFF',
            boxShadow: 'var(--glow-card)',
          }}
        >
          <CredentialQr ref={canvasRef} value={value} />
        </div>

        <button
          type="button"
          onClick={handleDownload}
          className="inline-flex items-center gap-2 rounded-full border px-4 py-2 [font-family:var(--font-jetbrains)] text-xs tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta)"
          style={{
            borderColor: 'color-mix(in srgb, var(--color-magenta) 30%, transparent)',
            color: 'var(--color-text-secondary)',
          }}
        >
          <Download className="h-4 w-4" aria-hidden="true" />
          Descargar QR
        </button>
      </div>

      <ol className="mx-auto max-w-lg space-y-4">
        {[
          'Descargá la App Eroscape',
          'Abrí el Escáner',
          'Accedé a tu sala',
        ].map((step, i) => (
          <li
            key={step}
            className="flex items-start gap-4 rounded-xl p-4"
            style={{
              background: 'var(--color-bg-elevated)',
              border: 'var(--border-subtle)',
            }}
          >
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full [font-family:var(--font-jetbrains)] text-sm"
              style={{
                background: 'color-mix(in srgb, var(--color-magenta) 15%, transparent)',
                color: 'var(--color-magenta)',
              }}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="[font-family:var(--font-inter)] text-sm leading-relaxed text-white">{step}</span>
          </li>
        ))}
      </ol>

      <div className="flex flex-wrap justify-center gap-4">
        <a
          href="https://apps.apple.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 w-36 items-center justify-center rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta)"
          style={{
            border: 'var(--border-subtle)',
            background: 'var(--color-bg-elevated)',
          }}
          aria-label="Descargar en App Store"
        >
          <span className="[font-family:var(--font-jetbrains)] text-[11px] text-white">App Store</span>
        </a>
        <a
          href="https://play.google.com/store"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 w-40 items-center justify-center rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta)"
          style={{
            border: 'var(--border-subtle)',
            background: 'var(--color-bg-elevated)',
          }}
          aria-label="Descargar en Google Play"
        >
          <span className="[font-family:var(--font-jetbrains)] text-[11px] text-white">Google Play</span>
        </a>
      </div>
    </div>
  )
}
