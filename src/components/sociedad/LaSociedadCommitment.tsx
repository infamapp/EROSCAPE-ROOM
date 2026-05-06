import Link from 'next/link'
import { EyeOff, Hand, LockKeyhole, MessageCircle } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import { SOCIEDAD_COMMITMENT } from '@/lib/la-sociedad'

const COMMITMENT_ICONS: Record<string, LucideIcon> = {
  privacidad: EyeOff,
  respeto: MessageCircle,
  opcional: Hand,
}

export function LaSociedadCommitment() {
  return (
    <section className="px-4 py-20 sm:px-6 sm:py-28">
      <div className="glass-card-detail relative mx-auto max-w-6xl overflow-hidden border-t-4 border-t-[color-mix(in_srgb,var(--color-magenta)_65%,transparent)]">
        <div
          className="pointer-events-none absolute inset-0 bg-linear-to-b from-[color-mix(in_srgb,var(--color-magenta)_8%,transparent)] to-transparent"
          aria-hidden="true"
        />
        <div className="relative px-6 py-14 sm:px-12 sm:py-20 md:px-16 md:py-24">
          <header className="mb-14 flex flex-col items-center text-center md:mb-16">
            <div
              className="mb-6 flex size-16 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--color-magenta)_12%,transparent)]"
              style={{
                boxShadow: '0 0 24px color-mix(in srgb, var(--color-magenta-glow) 25%, transparent)',
              }}
            >
              <LockKeyhole className="size-8 text-(--color-magenta-glow)" aria-hidden="true" strokeWidth={1.35} />
            </div>
            <h2 className="text-3xl font-bold uppercase tracking-[0.2em] text-white [font-family:var(--font-playfair)] sm:text-4xl">
              El compromiso Eroscape
            </h2>
            <div className="mt-4 h-px w-24 bg-[color-mix(in_srgb,var(--color-magenta)_70%,transparent)]" />
          </header>

          <ul className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-10 lg:gap-16">
            {SOCIEDAD_COMMITMENT.map((pillar) => {
              const Icon = COMMITMENT_ICONS[pillar.id] ?? Hand
              return (
                <li key={pillar.id} className="flex flex-col items-center text-center">
                  <span
                    className="mb-4 inline-flex size-12 items-center justify-center rounded-full text-(--color-gold-light)"
                    style={{
                      background: 'color-mix(in srgb, var(--color-gold) 10%, transparent)',
                      border: '1px solid color-mix(in srgb, var(--color-gold) 28%, transparent)',
                    }}
                    aria-hidden="true"
                  >
                    <Icon className="size-6" strokeWidth={1.4} />
                  </span>
                  <h3 className="text-xl font-bold text-(--color-gold-light) [font-family:var(--font-playfair)] sm:text-2xl">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-(--color-text-secondary) [font-family:var(--font-inter)] sm:text-base">
                    {pillar.body}
                  </p>
                </li>
              )
            })}
          </ul>

          <div className="mt-14 flex flex-col items-center gap-2 border-t-(--border-subtle) pt-8 text-center sm:mt-16 md:flex-row md:justify-center md:gap-4">
            <Link
              href="/la-sociedad/seguridad"
              className="text-[10px] uppercase tracking-[0.2em] text-(--color-magenta) transition-colors [font-family:var(--font-jetbrains)] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg-base)"
            >
              SEGURIDAD Y CONSENTIMIENTO
            </Link>
            <span className="hidden text-(--color-text-muted) md:inline" aria-hidden="true">
              ·
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-(--color-text-muted) [font-family:var(--font-jetbrains)]">
              ¿Planes de membresía?{' '}
              <Link
                href="/el-club"
                className="text-(--color-magenta) transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg-base)"
              >
                VER NIVELES EN EL CLUB
              </Link>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
