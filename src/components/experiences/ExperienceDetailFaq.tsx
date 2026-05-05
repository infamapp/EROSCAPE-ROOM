'use client'

import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

import type { ExperienceFaqItem } from '@/lib/experiences/detail-copy'
import { cn } from '@/lib/utils'

export interface ExperienceDetailFaqProps {
  items: readonly ExperienceFaqItem[]
}

export function ExperienceDetailFaq({ items }: ExperienceDetailFaqProps) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null)

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:py-28">
      <h2 className="text-center font-(--font-playfair) text-2xl text-white sm:text-3xl">
        Protocolo y consultas
      </h2>
      <div className="mt-10 space-y-4 sm:mt-12">
        {items.map((item) => {
          const isOpen = openId === item.id
          return (
            <div key={item.id} className="glass-card-detail rounded-xl p-5 sm:p-6">
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className="flex w-full items-start justify-between gap-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta) focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface-experience)]"
                aria-expanded={isOpen}
              >
                <span className="font-(--font-inter) text-base text-white sm:text-lg">{item.question}</span>
                <ChevronDown
                  className={cn(
                    'mt-0.5 size-6 shrink-0 text-(--color-gold-light) transition-transform duration-300',
                    isOpen && 'rotate-180',
                  )}
                  aria-hidden="true"
                />
              </button>
              {isOpen ? (
                <p className="mt-4 font-(--font-inter) text-sm leading-relaxed text-white/55 sm:text-base">
                  {item.answer}
                </p>
              ) : null}
            </div>
          )
        })}
      </div>
    </section>
  )
}
