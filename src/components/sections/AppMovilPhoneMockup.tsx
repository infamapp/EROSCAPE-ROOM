'use client'

import { motion, useReducedMotion } from 'framer-motion'

const floatTransition = {
  duration: 3,
  repeat: Infinity,
  ease: 'easeInOut' as const,
}

export function AppMovilPhoneMockup() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      className="relative mx-auto w-[min(100%,220px)]"
      animate={shouldReduceMotion ? undefined : { y: [0, -10, 0] }}
      transition={shouldReduceMotion ? undefined : floatTransition}
    >
      <div
        className="pointer-events-none absolute inset-[-18%] rounded-[3rem] opacity-70 blur-2xl"
        style={{
          background:
            'radial-gradient(ellipse at 50% 40%, color-mix(in srgb, var(--color-magenta) 52%, transparent), transparent 65%)',
        }}
        aria-hidden="true"
      />
      <svg viewBox="0 0 200 400" className="relative z-[1] w-full drop-shadow-2xl" role="img" aria-label="Ilustración de smartphone Eroscape">
        <defs>
          <linearGradient id="appScreenGlow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--color-magenta)" stopOpacity={0.45} />
            <stop offset="55%" stopColor="var(--color-bg-base)" stopOpacity={0.98} />
            <stop offset="100%" stopColor="var(--color-bg-elevated)" stopOpacity={1} />
          </linearGradient>
          <linearGradient id="appFrameShine" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.06)" />
            <stop offset="40%" stopColor="rgba(255,255,255,0.02)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.35)" />
          </linearGradient>
        </defs>
        <rect x="8" y="8" width="184" height="384" rx="36" fill="var(--color-bg-elevated)" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
        <rect x="10" y="10" width="180" height="380" rx="34" fill="url(#appFrameShine)" />
        <rect x="22" y="44" width="156" height="320" rx="22" fill="url(#appScreenGlow)" stroke="rgba(185,48,158,0.35)" strokeWidth="1" />
        <rect x="78" y="22" width="44" height="8" rx="4" fill="var(--color-bg-base)" stroke="rgba(255,255,255,0.08)" />
        <rect x="36" y="72" width="128" height="10" rx="5" fill="rgba(185,48,158,0.35)" />
        <rect x="36" y="92" width="96" height="8" rx="4" fill="rgba(255,255,255,0.08)" />
        <rect x="36" y="108" width="112" height="8" rx="4" fill="rgba(255,255,255,0.06)" />
        <circle cx="100" cy="200" r="36" fill="none" stroke="rgba(185,48,158,0.25)" strokeWidth="2" strokeDasharray="6 8" />
        <rect x="52" y="268" width="96" height="36" rx="12" fill="rgba(185,48,158,0.2)" stroke="rgba(185,48,158,0.45)" strokeWidth="1" />
        <text x="100" y="290" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="11" fontFamily="system-ui, sans-serif">
          NOCHE
        </text>
      </svg>
    </motion.div>
  )
}
