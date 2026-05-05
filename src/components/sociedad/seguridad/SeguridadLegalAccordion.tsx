'use client'

import { useId, useState } from 'react'
import { ChevronDown } from 'lucide-react'

import { SEGURIDAD_LEGAL_ITEMS } from '@/lib/la-sociedad-seguridad'
import { cn } from '@/lib/utils'

export function SeguridadLegalAccordion() {
  const baseId = useId()
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <section className="px-4 py-20 sm:px-6 sm:py-28" style={{ background: 'var(--color-bg-elevated)' }}>
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-10 text-center font-(--font-playfair) text-3xl text-white sm:text-4xl">Aspectos legales</h2>
        <div className="flex flex-col gap-3">
          {SEGURIDAD_LEGAL_ITEMS.map((item) => {
            const isOpen = openId === item.id
            const panelId = `${baseId}-${item.id}-panel`
            const buttonId = `${baseId}-${item.id}-btn`
            return (
              <div
                key={item.id}
                className="overflow-hidden rounded-lg border border-white/10 glass-card-detail transition-colors hover:border-[color-mix(in_srgb,var(--color-magenta)_35%,transparent)]"
              >
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="flex w-full items-center justify-between gap-4 bg-[color-mix(in_srgb,var(--color-bg-subtle)_40%,transparent)] p-5 text-left font-(--font-playfair) text-base text-white sm:p-6 sm:text-lg"
                  onClick={() => setOpenId((prev) => (prev === item.id ? null : item.id))}
                >
                  <span>{item.title}</span>
                  <ChevronDown
                    className={cn('size-5 shrink-0 text-[var(--color-text-muted)] transition-transform duration-300', isOpen && 'rotate-180')}
                    aria-hidden="true"
                    strokeWidth={1.35}
                  />
                </button>
                {isOpen ? (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="border-t border-white/5 p-5 font-(--font-inter) text-sm leading-relaxed text-[var(--color-text-muted)] sm:p-6 sm:text-base"
                  >
                    {item.body}
                  </div>
                ) : null}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
