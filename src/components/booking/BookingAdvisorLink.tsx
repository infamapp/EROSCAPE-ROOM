'use client'

import { MessageCircle } from 'lucide-react'

import { buildWhatsAppAdvisorUrl } from '@/lib/contact'
import { cn } from '@/lib/utils'

export interface BookingAdvisorLinkProps {
  className?: string
}

export function BookingAdvisorLink({ className }: BookingAdvisorLinkProps) {
  return (
    <a
      href={buildWhatsAppAdvisorUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-white/18 bg-(--color-bg-elevated)/90 px-3 py-2.5 font-(--font-jetbrains) text-[10px] font-semibold uppercase tracking-[0.14em] text-(--color-text-secondary) transition-colors',
        'hover:border-(--color-magenta)/45 hover:text-white',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg-base)',
        'sm:px-4 sm:text-[11px] sm:tracking-[0.16em]',
        className,
      )}
    >
      <MessageCircle className="size-4 shrink-0" aria-hidden="true" strokeWidth={1.75} />
      <span className="hidden sm:inline">Habla con un asesor</span>
      <span className="sr-only sm:hidden">Hablar con un asesor por WhatsApp</span>
    </a>
  )
}
