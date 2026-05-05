import { SEGURIDAD_PROMISES } from '@/lib/la-sociedad-seguridad'

export function SeguridadPromisesBar() {
  return (
    <section className="border-t border-white/5 px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <ul className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4 md:gap-8">
          {SEGURIDAD_PROMISES.map((label) => (
            <li key={label} className="flex items-center gap-4">
              <span
                className="size-3 shrink-0 rounded-full bg-[var(--color-magenta-glow)]"
                style={{ boxShadow: '0 0 14px color-mix(in srgb, var(--color-magenta-glow) 45%, transparent)' }}
                aria-hidden="true"
              />
              <span className="font-(--font-playfair) text-xs uppercase tracking-[0.28em] text-white sm:text-sm">
                {label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
