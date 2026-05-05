'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useMemo, useState } from 'react'

import { cn } from '@/lib/utils'
import { useScrollTrigger } from '@/hooks/useScrollTrigger'

const SENSUAL_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

const navVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: SENSUAL_EASE },
  },
}

const mobileMenuVariants = {
  hidden: { x: '100%' },
  visible: {
    x: 0,
    transition: { duration: 0.3, ease: SENSUAL_EASE },
  },
  exit: {
    x: '100%',
    transition: { duration: 0.25, ease: SENSUAL_EASE },
  },
}

type NavItem = { label: string; href: string }

function isNavActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/'
  if (href === '/la-sociedad') return pathname === '/la-sociedad'
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function Navbar() {
  const pathname = usePathname()
  const { isScrolled } = useScrollTrigger({ threshold: 80 })
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  const navItems = useMemo<NavItem[]>(
    () => [
      { label: 'Experiencias', href: '/experiencias' },
      { label: 'El Tocador', href: '/boutique' },
      { label: 'La Sociedad', href: '/la-sociedad' },
      { label: 'Consentimiento', href: '/la-sociedad/seguridad' },
      { label: 'FAQ', href: '/FAQ' },
      { label: 'La App', href: '/app-movil' },
    ],
    [],
  )

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 py-3',
          'transition-[background-color,backdrop-filter,border-color] duration-300',
          isScrolled ? 'backdrop-blur-md border-b' : 'border-b border-transparent',
        )}
        style={{
          backgroundColor: isScrolled ? 'rgba(8,0,8,0.95)' : 'transparent',
          borderBottomColor: isScrolled ? 'rgba(185,48,158,0.2)' : 'transparent',
        }}
        variants={navVariants}
        initial={shouldReduceMotion ? false : 'hidden'}
        animate={shouldReduceMotion ? undefined : 'visible'}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className={cn(
              'group inline-flex items-center justify-center gap-3 transition-[opacity,transform] duration-300',
              isScrolled ? 'opacity-100 pointer-events-auto' : 'opacity-0 -translate-y-1 pointer-events-none',
              'lg:opacity-100 lg:translate-y-0 lg:pointer-events-auto',
            )}
          >
            <Image
              src="/eros-logo-ico.png"
              alt="Eroscape"
              width={80}
              height={80}
              quality={100}
              priority
              className="h-18 w-18"
            />
            <span className="uppercase leading-none tracking-[0.12em] text-2xl">Eroscape</span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => {
              const active = isNavActive(pathname, item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'text-sm transition-colors',
                    active ? 'text-white' : 'text-[var(--color-text-secondary)] hover:text-white',
                  )}
                  aria-current={active ? 'page' : undefined}
                >
                  <span className={cn(active && 'border-b border-[color-mix(in_srgb,var(--color-magenta)_55%,transparent)] pb-0.5')}>
                    {item.label}
                  </span>
                </Link>
              )
            })}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              href="/reservar"
              className={cn('rounded-full px-6 py-2 text-sm text-white')}
              style={{ background: 'var(--gradient-cta)' }}
            >
              RENDIRSE AL DESEO
            </Link>
          </div>

          <button
            type="button"
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full"
            aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setIsMenuOpen((v) => !v)}
            style={{ border: 'var(--border-subtle)' }}
          >
            {isMenuOpen ? <X className="h-5 w-5 text-white" /> : <Menu className="h-5 w-5 text-white" />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.aside
            className="fixed inset-0 z-60"
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0 }}
          >
            <button
              type="button"
              className="absolute inset-0 h-full w-full"
              aria-label="Cerrar menú"
              onClick={() => setIsMenuOpen(false)}
              style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
            />

            <motion.div
              className="absolute right-0 top-0 h-full w-[85%] max-w-sm border-l"
              style={{ background: 'var(--color-bg-elevated)', borderLeftColor: 'rgba(185,48,158,0.2)' }}
              variants={mobileMenuVariants}
              initial={shouldReduceMotion ? false : 'hidden'}
              animate={shouldReduceMotion ? undefined : 'visible'}
              exit={shouldReduceMotion ? undefined : 'exit'}
            >
              <div className="flex h-16 items-center justify-between px-4">
                <div className="inline-flex items-center gap-3">
                  <Image
                    src="/erosLogo.png"
                    alt="Eroscape"
                    width={36}
                    height={36}
                    quality={100}
                    priority
                    className="h-9 w-9"
                  />
                  <span className="sr-only">Eroscape</span>
                </div>
                <button
                  type="button"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full"
                  aria-label="Cerrar"
                  onClick={() => setIsMenuOpen(false)}
                  style={{ border: 'var(--border-subtle)' }}
                >
                  <X className="h-5 w-5 text-white" />
                </button>
              </div>

              <div className="flex flex-col gap-3 px-4 pt-6">
                {navItems.map((item) => {
                  const active = isNavActive(pathname, item.href)
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'rounded-xl px-4 py-3 text-base',
                        active ? 'text-white' : 'text-[var(--color-text-secondary)]',
                      )}
                      style={{ border: 'var(--border-subtle)' }}
                      aria-current={active ? 'page' : undefined}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="transition-colors hover:text-white">{item.label}</span>
                    </Link>
                  )
                })}

                <Link
                  href="/reservar"
                  className="mt-2 rounded-full px-6 py-3 text-center text-white"
                  style={{ background: 'var(--gradient-cta)' }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  RENDIRSE AL DESEO
                </Link>
              </div>
            </motion.div>
          </motion.aside>
        ) : null}
      </AnimatePresence>
    </>
  )
}
