import { Lock } from 'lucide-react'

import { SOCIEDAD_COMMITMENT } from '@/lib/la-sociedad'

export function LaSociedadCommitment() {
  return (
    <section className="px-4 py-20 sm:px-6 sm:py-28">
      <div className="relative mx-auto max-w-6xl overflow-hidden border-t-4 border-t-[color-mix(in_srgb,var(--color-magenta)_65%,transparent)] glass-card-detail">
        <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-[color-mix(in_srgb,var(--color-magenta)_8%,transparent)] to-transparent" aria-hidden="true" />
        <div className="relative px-6 py-14 sm:px-12 sm:py-20 md:px-16 md:py-24">
          <header className="mb-14 flex flex-col items-center text-center md:mb-16">
            <div
              className="mb-6 flex size-16 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--color-magenta)_12%,transparent)]"
              style={{
                boxShadow: '0 0 24px color-mix(in srgb, var(--color-magenta-glow) 25%, transparent)',
              }}
            >
              <Lock className="size-8 text-[var(--color-magenta-glow)]" aria-hidden="true" strokeWidth={1.35} />
            </div>
            <h2 className="font-(--font-playfair) text-3xl font-semibold text-white sm:text-4xl">El compromiso Eroscape</h2>
          </header>

          <ul className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-10 lg:gap-16">
            {SOCIEDAD_COMMITMENT.map((pillar) => (
              <li key={pillar.id} className="text-center">
                <h3 className="font-(--font-playfair) text-xl text-[var(--color-gold-light)] sm:text-2xl">{pillar.title}</h3>
                <p className="mt-4 font-(--font-inter) text-sm leading-relaxed text-[var(--color-text-muted)] sm:text-base">
                  {pillar.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
