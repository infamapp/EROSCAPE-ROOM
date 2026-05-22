'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { Send } from 'lucide-react'

import { AppStoreBadgeSvg, GooglePlayBadgeSvg } from '@/components/marketing/AppMovilStoreBadges'
import { APP_STORE_URL, GOOGLE_PLAY_URL } from '@/lib/app-movil'

const SENSUAL_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

const colVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: SENSUAL_EASE } },
}

function AppMovilChatFrame() {
  return (
    <div
      className="relative mx-auto flex w-[min(100%,300px)] flex-col overflow-hidden rounded-4xl border border-white/10 bg-(--color-bg-elevated) md:w-[min(100%,380px)]"
      style={{ aspectRatio: '9 / 19.2' }}
    >
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-(--color-text-muted) [font-family:var(--font-jetbrains)]">
          CHAT DEMO
        </p>
        <p className="text-[10px] uppercase tracking-[0.2em] text-(--color-gm-terminal) [font-family:var(--font-jetbrains)]">
          Game Master IA
        </p>
      </div>
      <div className="flex min-h-0 flex-1 flex-col gap-3 px-4 py-4">
        <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-hidden">
          <div className="max-w-[88%] rounded-2xl rounded-tl-none border border-white/10 bg-[color-mix(in_srgb,var(--color-gm-terminal)_10%,transparent)] p-3 font-(--font-inter) text-[11px] leading-relaxed text-white">
            Recibido en la app. ¿Qué necesitas para que esta noche empiece suave?
          </div>
          <div className="ml-auto max-w-[88%] rounded-2xl rounded-tr-none border border-[color-mix(in_srgb,var(--color-magenta)_35%,transparent)] bg-[color-mix(in_srgb,var(--color-magenta)_16%,transparent)] p-3 text-right font-(--font-inter) text-[11px] leading-relaxed text-white">
            Quiero claridad: límites simples y sin sorpresas.
          </div>
          <div className="max-w-[88%] rounded-2xl rounded-tl-none border border-white/10 bg-[color-mix(in_srgb,var(--color-gm-terminal)_10%,transparent)] p-3 font-(--font-inter) text-[11px] leading-relaxed text-white">
            Perfecto. Tu palabra segura siempre manda. Y cada propuesta será opcional.
          </div>
          <div className="ml-auto max-w-[88%] rounded-2xl rounded-tr-none border border-[color-mix(in_srgb,var(--color-magenta)_35%,transparent)] bg-[color-mix(in_srgb,var(--color-magenta)_16%,transparent)] p-3 text-right font-(--font-inter) text-[11px] leading-relaxed text-white">
            Entonces sí. Guíame.
          </div>
        </div>
      </div>
      <div className="relative mt-auto border-t border-(--border-subtle) bg-(--color-bg-subtle) px-4 py-3">
          <label htmlFor="app-chat-demo" className="sr-only">
            Campo de mensaje (demostración)
          </label>
          <input
            id="app-chat-demo"
            readOnly
            placeholder="Escribe un mensaje…"
            className="w-full rounded-xl border border-white/10 bg-transparent px-3 py-2.5 font-(--font-inter) text-[11px] text-white placeholder:text-(--color-text-muted) focus:outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--color-magenta)_55%,transparent)]"
          />
          <span className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 text-(--color-magenta-glow)" aria-hidden="true">
            <Send className="size-4" strokeWidth={1.35} />
          </span>
      </div>
    </div>
  )
}

export function AppMovilLandingHero() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="app-movil-circuit-bg relative overflow-hidden px-4 py-16 sm:px-6 sm:py-20 md:px-10 md:py-24">
      <div
        className="pointer-events-none absolute -right-32 -top-40 size-[min(90vw,600px)] rounded-full blur-[120px]"
        style={{ background: 'color-mix(in srgb, var(--color-magenta) 14%, transparent)' }}
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-2 md:gap-16">
        <motion.div
          className="space-y-7 text-center md:text-left"
          variants={reduceMotion ? undefined : colVariants}
          initial={reduceMotion ? false : 'hidden'}
          animate={reduceMotion ? undefined : 'visible'}
        >
          <span className="inline-block border-b border-[color-mix(in_srgb,var(--color-magenta)_35%,transparent)] pb-2 font-(--font-jetbrains) text-[10px] uppercase tracking-[0.38em] text-(--color-magenta-glow) sm:text-[11px]">
            TECNOLOGÍA DEL PLACER
          </span>
          <h1 className="text-5xl font-semibold italic leading-[1.05] tracking-tight text-white [font-family:var(--font-cormorant)] sm:text-6xl">
            La app que te guía hacia el deseo
          </h1>
          <p className="mx-auto max-w-lg font-(--font-inter) text-base leading-relaxed text-(--color-text-muted) md:mx-0 md:text-lg">
            Mucho más que una utilidad: una extensión digital de la curación Eroscape. Orquesta cada detalle antes, durante y después de tu noche.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2 md:justify-start">
            <Link
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--color-magenta)_55%,transparent)] focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg-base)"
              aria-label="Descargar en App Store"
            >
              <AppStoreBadgeSvg className="h-11 w-auto sm:h-12" />
            </Link>
            <Link
              href={GOOGLE_PLAY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--color-magenta)_55%,transparent)] focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg-base)"
              aria-label="Descargar en Google Play"
            >
              <GooglePlayBadgeSvg className="h-11 w-auto sm:h-12" />
            </Link>
          </div>
        </motion.div>

        <motion.div
          className="relative flex justify-center"
          variants={reduceMotion ? undefined : colVariants}
          initial={reduceMotion ? false : 'hidden'}
          animate={reduceMotion ? undefined : 'visible'}
          transition={reduceMotion ? undefined : { delay: 0.12 }}
        >
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[min(100%,420px)] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]"
            style={{ background: 'color-mix(in srgb, var(--color-magenta) 18%, transparent)' }}
            aria-hidden="true"
          />
          <motion.div
            animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
            transition={reduceMotion ? undefined : { duration: 4.5, repeat: Infinity, ease: SENSUAL_EASE }}
          >
            <AppMovilChatFrame />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
