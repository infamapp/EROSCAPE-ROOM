import { Cpu, Droplets, Eye, FileText, Lock, ShieldCheck, type LucideIcon } from 'lucide-react'

import { SEGURIDAD_GUARANTEES, type SeguridadGuaranteeId } from '@/lib/la-sociedad-seguridad'

function guaranteeIcon(id: SeguridadGuaranteeId): LucideIcon {
  switch (id) {
    case 'consentimiento':
      return ShieldCheck
    case 'seguridad':
      return Lock
    case 'privacidad':
      return Eye
    case 'higiene':
      return Droplets
    case 'digital':
      return Cpu
    case 'documentacion':
      return FileText
  }
}

export function SeguridadGuaranteesGrid() {
  return (
    <section className="px-4 py-20 sm:px-6 sm:py-28" style={{ background: 'var(--color-bg-base)' }}>
      <div className="mx-auto max-w-7xl">
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {SEGURIDAD_GUARANTEES.map((item) => {
            const Icon = guaranteeIcon(item.id)
            return (
              <li key={item.id}>
                <article className="glass-card-detail h-full rounded-xl border-l-2 border-l-[color-mix(in_srgb,var(--color-gm-terminal)_45%,transparent)] p-8 transition-colors duration-500 hover:bg-[color-mix(in_srgb,var(--color-bg-elevated)_55%,transparent)] sm:p-10">
                  <Icon
                    className="mb-5 block size-9 text-[var(--color-gm-terminal)] sm:size-10"
                    style={{ filter: 'drop-shadow(0 0 12px color-mix(in srgb, var(--color-gm-terminal) 35%, transparent))' }}
                    aria-hidden="true"
                    strokeWidth={1.2}
                  />
                  <h3 className="font-(--font-playfair) text-xl text-white sm:text-2xl">{item.title}</h3>
                  <p className="mt-3 font-(--font-inter) text-sm leading-relaxed text-[var(--color-text-muted)] sm:text-base">
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
