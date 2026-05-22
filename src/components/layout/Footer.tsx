'use client'

import Link from 'next/link'
import { useIsReservarRoute } from '@/hooks/useIsReservarRoute'
import { Lock, Music, Send, Sparkles } from 'lucide-react'

import { buildWhatsAppAdvisorUrl } from '@/lib/contact'
import { CITIES } from '@/lib/constants'
import { cn } from '@/lib/utils'

const SOCIAL_LINKS = [
  { href: 'https://instagram.com/eroscape', label: 'Instagram', Icon: Sparkles },
  { href: 'https://twitter.com/eroscape', label: 'Twitter', Icon: Send },
  { href: 'https://tiktok.com/@eroscape', label: 'TikTok', Icon: Music },
] as const

export function Footer() {
  const isReservar = useIsReservarRoute()
  if (isReservar) return null

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
            <div className="[font-family:var(--font-playfair)] text-xl uppercase tracking-[0.2em] text-white">
              EROSCAPE
            </div>
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
                <a
                  href={buildWhatsAppAdvisorUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-white transition-colors"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  Contacto
                </a>
              </li>
              <li>
                <Link
                  href="/membresia"
                  className="text-sm hover:text-white transition-colors"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  Membresía
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

        <div className="mt-10 flex justify-center gap-5">
          {SOCIAL_LINKS.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="rounded-full p-2 transition-colors hover:text-(--color-text-secondary) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
              style={{ color: 'var(--color-text-muted)' }}
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
            </a>
          ))}
        </div>

        <p className="mt-6 text-center [font-family:var(--font-jetbrains)] text-[9px] tracking-[0.18em] uppercase">
          <span style={{ color: 'var(--color-text-muted)' }}>¿Quieres tu propio Eroscape? </span>
          <Link
            href="/franquicia"
            className="transition-colors hover:underline underline-offset-4"
            style={{ color: 'var(--color-text-muted)' }}
          >
            → Monta tu franquicia
          </Link>
        </p>

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
