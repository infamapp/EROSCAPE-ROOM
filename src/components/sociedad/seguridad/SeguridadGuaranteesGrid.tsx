import { Brain, Eye, FileText, Shield, Sparkles, Lock, type LucideIcon } from 'lucide-react'

import { SEGURIDAD_GUARANTEES, type SeguridadGuaranteeId } from '@/lib/la-sociedad-seguridad'

function guaranteeIcon(id: SeguridadGuaranteeId): LucideIcon {
  switch (id) {
    case 'consentimiento':
      return Shield
    case 'seguridad':
      return Lock
    case 'privacidad':
      return Eye
    case 'higiene':
      return Sparkles
    case 'digital':
      return Brain
    case 'documentacion':
      return FileText
  }
}

export function SeguridadGuaranteesGrid() {
  return (
    <section className="px-4 py-20 sm:px-6 sm:py-28" style={{ background: 'var(--color-bg-base)' }}>
      <div className="mx-auto max-w-7xl">
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {SEGURIDAD_GUARANTEES.map((item) => {
            const Icon = guaranteeIcon(item.id)
            return (
              <li key={item.id}>
                <article className="h-full rounded-xl border-(--border-subtle) bg-(--color-bg-elevated) p-5 [box-shadow:var(--glow-card)] transition-[box-shadow,border-color,transform] duration-500 hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--color-gm-terminal)_45%,transparent)] hover:[box-shadow:0_0_28px_color-mix(in_srgb,var(--color-gm-terminal)_22%,transparent)]">
                  <Icon
                    className="mb-4 block size-7 text-(--color-gm-terminal)"
                    style={{
                      filter:
                        'drop-shadow(0 0 12px color-mix(in srgb, var(--color-gm-terminal) 35%, transparent))',
                    }}
                    aria-hidden="true"
                    strokeWidth={1.4}
                  />
                  <h3 className="text-sm font-semibold text-white [font-family:var(--font-playfair)]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-(--color-text-secondary) [font-family:var(--font-inter)]">
                    {item.body}
                  </p>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
