import Link from 'next/link'
import { Lock } from 'lucide-react'

import { CITIES } from '@/lib/constants'
import { cn } from '@/lib/utils'

export function Footer() {
  return (
    <footer
      className={cn('mt-24')}
      style={{
        background: 'var(--color-bg-elevated)',
        borderTop: 'var(--border-subtle)',
      }}
    >
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="font-[var(--font-playfair)] text-xl tracking-[0.25em] text-white">EROSCAPE</div>
            <p className="mt-3 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              El primer Escape Room Erótico del mundo
            </p>
          </div>

          <div>
            <div className="text-xs uppercase tracking-[0.2em]" style={{ color: 'var(--color-text-muted)' }}>
              Experiencias
            </div>
            <ul className="mt-4 space-y-2">
              {CITIES.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/experiencias/${c.slug}`}
                    className="text-sm hover:text-white transition-colors"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    {c.displayName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-xs uppercase tracking-[0.2em]" style={{ color: 'var(--color-text-muted)' }}>
              Legal
            </div>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/legal/privacidad"
                  className="text-sm hover:text-white transition-colors"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  Privacidad
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/consentimiento"
                  className="text-sm hover:text-white transition-colors"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  Consentimiento
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/aviso-legal"
                  className="text-sm hover:text-white transition-colors"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  Aviso legal
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-xs uppercase tracking-[0.2em]" style={{ color: 'var(--color-text-muted)' }}>
              Contacto
            </div>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/contacto"
                  className="text-sm hover:text-white transition-colors"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  Contacto
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-sm hover:text-white transition-colors"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="inline-flex items-center gap-2 text-xs" style={{ color: 'var(--color-text-muted)' }}>
            <Lock className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Transacciones procesadas con total discreción · Ocio y Eventos SL</span>
          </div>
          <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
            © {new Date().getFullYear()} Eroscape
          </div>
        </div>
      </div>
    </footer>
  )
}
