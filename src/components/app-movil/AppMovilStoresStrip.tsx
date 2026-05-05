import Link from 'next/link'

import { AppMovilPlaceholderQr } from '@/components/marketing/AppMovilPlaceholderQr'
import { AppStoreBadgeSvg, GooglePlayBadgeSvg } from '@/components/marketing/AppMovilStoreBadges'
import { APP_MOVIL_STORES_ANCHOR_ID, APP_STORE_URL, GOOGLE_PLAY_URL } from '@/lib/app-movil'

export function AppMovilStoresStrip() {
  return (
    <section
      id={APP_MOVIL_STORES_ANCHOR_ID}
      className="scroll-mt-24 border-t border-white/10 px-4 py-14 sm:px-6"
      style={{ background: 'color-mix(in srgb, var(--color-bg-subtle) 90%, transparent)' }}
      aria-labelledby="app-stores-heading"
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-10 md:flex-row md:items-start md:justify-between">
        <div className="text-center md:text-left">
          <h2 id="app-stores-heading" className="font-(--font-playfair) text-2xl text-white">
            Descarga
          </h2>
          <p className="mt-2 max-w-md font-(--font-inter) text-sm text-[var(--color-text-muted)]">
            Enlaces de demostración. Próximamente deep link y QR dinámico.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:justify-center md:justify-start">
            <Link
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--color-magenta)_55%,transparent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-base)]"
              aria-label="Descargar en App Store"
            >
              <AppStoreBadgeSvg className="h-11 w-auto sm:h-12" />
            </Link>
            <Link
              href={GOOGLE_PLAY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--color-magenta)_55%,transparent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-base)]"
              aria-label="Descargar en Google Play"
            >
              <GooglePlayBadgeSvg className="h-11 w-auto sm:h-12" />
            </Link>
          </div>
        </div>
        <div
          className="flex flex-col items-center rounded-2xl border p-6"
          style={{
            borderColor: 'rgba(185,48,158,0.2)',
            background: 'var(--color-bg-elevated)',
            boxShadow: 'var(--glow-card)',
          }}
        >
          <p className="font-(--font-jetbrains) text-[10px] tracking-[0.2em] text-[var(--color-text-muted)]">QR (demo)</p>
          <div className="mt-4">
            <AppMovilPlaceholderQr className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--color-magenta)_55%,transparent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-elevated)]" />
          </div>
        </div>
      </div>
    </section>
  )
}
