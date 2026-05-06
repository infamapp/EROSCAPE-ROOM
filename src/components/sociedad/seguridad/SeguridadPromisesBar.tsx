import { Fragment } from 'react'

import { SEGURIDAD_PROMISES } from '@/lib/la-sociedad-seguridad'

export function SeguridadPromisesBar() {
  return (
    <section className="border-t-(--border-subtle) px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-4 gap-y-3">
        {SEGURIDAD_PROMISES.map((label, index) => (
          <Fragment key={label}>
            <span className="inline-flex items-center gap-2 rounded-full border-(--border-subtle) bg-(--color-bg-elevated) px-3 py-1.5 text-[10px] uppercase tracking-[0.15em] text-(--color-text-secondary) [font-family:var(--font-jetbrains)]">
              <span
                className="size-1.5 shrink-0 rounded-full bg-(--color-magenta)"
                style={{
                  boxShadow: '0 0 8px color-mix(in srgb, var(--color-magenta-glow) 55%, transparent)',
                }}
                aria-hidden="true"
              />
              {label}
            </span>
            {index < SEGURIDAD_PROMISES.length - 1 ? (
              <span aria-hidden="true" className="text-(--color-text-muted) [font-family:var(--font-jetbrains)]">
                |
              </span>
            ) : null}
          </Fragment>
        ))}
      </div>
    </section>
  )
}
