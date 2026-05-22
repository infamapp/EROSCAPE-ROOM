'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'

import { buildWhatsAppAdvisorUrl } from '@/lib/contact'
import { useAdvisorFabOffset } from '@/hooks/useAdvisorFabOffset'
import { useIsReservarRoute } from '@/hooks/useIsReservarRoute'
import { cn } from '@/lib/utils'

const SENSUAL_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

const enterVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: SENSUAL_EASE } },
} as const

export interface AdvisorFloatingButtonProps {
  className?: string
}

export function AdvisorFloatingButton({ className }: AdvisorFloatingButtonProps) {
  const shouldReduceMotion = useReducedMotion()
  const isReservar = useIsReservarRoute()
  const { mobileBottomClass, desktopBottomClass } = useAdvisorFabOffset()
  const whatsAppUrl = buildWhatsAppAdvisorUrl()

  if (isReservar) return null

  return (
    <motion.div
      className={cn(
        'fixed right-4 z-40 pb-[env(safe-area-inset-bottom,0px)] lg:right-6',
        mobileBottomClass,
        desktopBottomClass,
        className,
      )}
      variants={shouldReduceMotion ? undefined : enterVariants}
      initial={shouldReduceMotion ? false : 'hidden'}
      animate={shouldReduceMotion ? undefined : 'visible'}
    >
      <a
        href={whatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Hablar con un asesor por WhatsApp"
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-full text-white transition-[filter,transform] duration-200',
          'hover:brightness-110 active:translate-y-px',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg-base)',
          'h-12 w-12 lg:h-auto lg:w-auto lg:px-5 lg:py-3',
          'font-(--font-jetbrains) text-[10px] font-semibold uppercase tracking-[0.16em] lg:text-[11px] lg:tracking-[0.18em]',
        )}
        style={{ background: 'var(--gradient-cta)', boxShadow: 'var(--glow-magenta)' }}
      >
        <MessageCircle className="size-5 shrink-0 lg:size-4" aria-hidden="true" strokeWidth={1.75} />
        <span className="hidden lg:inline">Habla con un asesor</span>
      </a>
    </motion.div>
  )
}
