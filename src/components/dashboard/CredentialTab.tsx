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
    <div className="space-y-8">
      <header>
        <h2 className="font-[var(--font-jetbrains)] text-sm tracking-[0.2em]" style={{ color: 'var(--color-gm-alert)' }}>
          TU LLAVE DE ENTRADA
        </h2>
        <p className="mt-2 font-[var(--font-inter)] text-sm" style={{ color: 'var(--color-text-muted)' }}>
          Cómo entrar la noche de tu experiencia.
        </p>
      </header>

      <div className="mx-auto flex max-w-sm flex-col items-center rounded-2xl border p-6" style={{ borderColor: 'rgba(185,48,158,0.2)', background: 'var(--color-bg-elevated)', boxShadow: 'var(--glow-card)' }}>
        <CredentialQr ref={canvasRef} value={value} />
        <button
          type="button"
          onClick={handleDownload}
          className="mt-4 inline-flex items-center gap-2 rounded-full border px-4 py-2 font-[var(--font-jetbrains)] text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-magenta)]"
          style={{ borderColor: 'rgba(185,48,158,0.3)', color: 'var(--color-text-secondary)' }}
        >
          <Download className="h-4 w-4" aria-hidden="true" />
          Guardar mi llave
        </button>
      </div>

      <ol className="mx-auto max-w-lg space-y-3 font-[var(--font-inter)] text-sm" style={{ color: 'var(--color-text-secondary)' }}>
        <li>
          <span className="font-[var(--font-jetbrains)] text-[var(--color-magenta)]">1.</span> Descarga la App Eroscape
        </li>
        <li>
          <span className="font-[var(--font-jetbrains)] text-[var(--color-magenta)]">2.</span> Abre el escáner en la App
        </li>
        <li>
          <span className="font-[var(--font-jetbrains)] text-[var(--color-magenta)]">3.</span> Tu sala te reconocerá
        </li>
      </ol>

      <div className="flex flex-wrap justify-center gap-4">
        <a
          href="https://apps.apple.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 w-36 items-center justify-center rounded-lg border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-magenta)]"
          style={{ borderColor: 'rgba(255,255,255,0.15)', background: 'var(--color-bg-elevated)' }}
          aria-label="Descargar en App Store"
        >
          <svg width="108" height="24" viewBox="0 0 108 24" aria-hidden="true">
            <text x="6" y="17" fill="white" className="font-[var(--font-jetbrains)] text-[11px]">
              App Store
            </text>
          </svg>
        </a>
        <a
          href="https://play.google.com/store"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 w-40 items-center justify-center rounded-lg border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-magenta)]"
          style={{ borderColor: 'rgba(255,255,255,0.15)', background: 'var(--color-bg-elevated)' }}
          aria-label="Descargar en Google Play"
        >
          <svg width="120" height="24" viewBox="0 0 120 24" aria-hidden="true">
            <text x="6" y="17" fill="white" className="font-[var(--font-jetbrains)] text-[11px]">
              Google Play
            </text>
          </svg>
        </a>
      </div>
    </div>
  )
}
