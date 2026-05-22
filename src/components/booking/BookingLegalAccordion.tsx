'use client'

import { useId, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronDown, FileText } from 'lucide-react'

import { BOOKING_LEGAL_ACCORDION } from '@/lib/booking-legal-copy'
import { cn } from '@/lib/utils'

const SENSUAL_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

export interface BookingLegalAccordionProps {
  className?: string
}

export function BookingLegalAccordion({ className }: BookingLegalAccordionProps) {
  const baseId = useId()
  const reduceMotion = useReducedMotion()
  const [openId, setOpenId] = useState<string | null>(null)

  const handleToggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id))
  }

  return (
    <div className={cn('space-y-2', className)}>
      {BOOKING_LEGAL_ACCORDION.map((item) => {
        const isOpen = openId === item.id
        const panelId = `${baseId}-${item.id}-panel`
        const buttonId = `${baseId}-${item.id}-btn`

        return (
          <div
            key={item.id}
            className={cn(
              'overflow-hidden rounded-lg border transition-colors',
              isOpen
                ? 'border-(--color-magenta)/40 bg-(--color-bg-elevated)'
                : 'border-white/10 bg-(--color-bg-elevated)/80',
            )}
          >
            <button
              id={buttonId}
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => handleToggle(item.id)}
              className="flex w-full items-center justify-between gap-3 px-3 py-2.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta) focus-visible:ring-inset sm:px-4 sm:py-3"
            >
              <span className="flex min-w-0 items-center gap-2.5">
                <FileText className="h-4 w-4 shrink-0 text-(--color-magenta-glow)" aria-hidden="true" />
                <span className="font-(--font-playfair) text-sm text-white sm:text-[15px]">{item.title}</span>
              </span>
              <ChevronDown
                className={cn(
                  'h-4 w-4 shrink-0 text-(--color-text-muted) transition-transform duration-300',
                  isOpen && 'rotate-180',
                )}
                aria-hidden="true"
              />
            </button>

            {reduceMotion ? (
              isOpen ? (
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="max-h-[min(40vh,320px)] overflow-y-auto overscroll-contain border-t border-white/10 px-3 py-3 sm:px-4 sm:py-4"
                >
                  <LegalAccordionBody sections={item.sections} />
                </div>
              ) : null
            ) : (
              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    key="panel"
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: SENSUAL_EASE }}
                    className="overflow-hidden"
                  >
                    <div className="max-h-[min(40vh,320px)] overflow-y-auto overscroll-contain border-t border-white/10 px-3 py-3 sm:px-4 sm:py-4">
                      <LegalAccordionBody sections={item.sections} />
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            )}
          </div>
        )
      })}
    </div>
  )
}

interface LegalAccordionBodyProps {
  sections: (typeof BOOKING_LEGAL_ACCORDION)[number]['sections']
}

function LegalAccordionBody({ sections }: LegalAccordionBodyProps) {
  return (
    <div className="space-y-4">
      {sections.map((section) => (
        <div key={section.heading}>
          <h4 className="font-(--font-jetbrains) text-[10px] uppercase tracking-[0.18em] text-(--color-text-muted)">
            {section.heading}
          </h4>
          {section.paragraphs.map((paragraph) => (
            <p
              key={paragraph.slice(0, 48)}
              className="mt-2 font-(--font-inter) text-xs leading-relaxed text-(--color-text-secondary) sm:text-[13px]"
            >
              {paragraph}
            </p>
          ))}
        </div>
      ))}
    </div>
  )
}
