'use client'

import { motion, useReducedMotion } from 'framer-motion'

const SENSUAL_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

const ctaPulse = {
  rest: { filter: 'brightness(1)' },
  hover: {
    filter: 'brightness(1.08)',
    transition: { duration: 0.35, ease: SENSUAL_EASE },
  },
}

export interface ExperienceStickyReservaCtaProps {
  priceLabel: string
  onReserva: () => void
}

export function ExperienceStickyReservaCta({ priceLabel, onReserva }: ExperienceStickyReservaCtaProps) {
  const reduceMotion = useReducedMotion()

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-[rgba(185,48,158,0.2)] px-4 py-4 backdrop-blur-md sm:px-6"
      style={{ background: 'rgba(8,0,8,0.88)' }}
    >
      <div className="mx-auto flex max-w-3xl justify-center">
        <motion.button
          type="button"
          onClick={onReserva}
          initial="rest"
          animate="rest"
          whileHover={reduceMotion ? undefined : 'hover'}
          variants={ctaPulse}
          className="w-full max-w-xl rounded-full px-6 py-3.5 font-(--font-playfair) text-sm tracking-[0.14em] text-white sm:px-10 sm:py-4 sm:text-base"
          style={{ background: 'var(--gradient-cta)', boxShadow: 'var(--glow-magenta)' }}
        >
          <span className="block sm:inline">[ QUIERO ESTA NOCHE ]</span>
          <span className="mt-1 block text-center sm:ml-3 sm:mt-0 sm:inline sm:text-left">Desde {priceLabel}</span>
        </motion.button>
      </div>
    </div>
  )
}
