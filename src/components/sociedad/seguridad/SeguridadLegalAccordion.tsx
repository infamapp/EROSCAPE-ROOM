'use client'

import { useId, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

import { SEGURIDAD_LEGAL_ITEMS } from '@/lib/la-sociedad-seguridad'
import { cn } from '@/lib/utils'

const SENSUAL_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

export function SeguridadLegalAccordion() {
  const baseId = useId()
  const reduceMotion = useReducedMotion()
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <section className="px-4 py-20 sm:px-6 sm:py-28" style={{ background: 'var(--color-bg-elevated)' }}>
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-10 text-center text-3xl font-bold uppercase tracking-[0.18em] text-white [font-family:var(--font-playfair)] sm:text-4xl">
          Aspectos legales
        </h2>
        <div className="flex flex-col gap-3">
          {SEGURIDAD_LEGAL_ITEMS.map((item) => {
            const isOpen = openId === item.id
            const panelId = `${baseId}-${item.id}-panel`
            const buttonId = `${baseId}-${item.id}-btn`
            return (
              <div
                key={item.id}
                className="overflow-hidden rounded-xl border-(--border-subtle) bg-(--color-bg-elevated) [box-shadow:var(--glow-card)] transition-colors hover:border-[color-mix(in_srgb,var(--color-magenta)_35%,transparent)]"
              >
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left text-base text-white [font-family:var(--font-playfair)] sm:p-6 sm:text-lg"
                  onClick={() => setOpenId((prev) => (prev === item.id ? null : item.id))}
                >
                  <span>{item.title}</span>
                  <ChevronDown
                    className={cn(
                      'size-5 shrink-0 text-(--color-text-muted) transition-transform duration-300',
                      isOpen && 'rotate-180',
                    )}
                    aria-hidden="true"
                    strokeWidth={1.35}
                  />
                </button>

                {reduceMotion ? (
                  isOpen ? (
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      className="border-t-(--border-subtle) p-5 text-sm leading-relaxed text-(--color-text-secondary) [font-family:var(--font-inter)] sm:p-6 sm:text-base"
                    >
                      {item.body}
                    </div>
                  ) : null
                ) : (
                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        key="content"
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: SENSUAL_EASE }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div className="border-t-(--border-subtle) p-5 text-sm leading-relaxed text-(--color-text-secondary) [font-family:var(--font-inter)] sm:p-6 sm:text-base">
                          {item.body}
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
