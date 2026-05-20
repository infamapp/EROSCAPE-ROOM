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

const NAV_MAX_WIDTH_CLASS = 'max-w-7xl'

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

interface LogoProps {
  href: string
  src: string
  alt: string
  size: 'desktop' | 'mobile'
  isVisible: boolean
}

function Logo({ href, src, alt, size, isVisible }: LogoProps) {
  const imageSize = size === 'desktop' ? 44 : 36
  const className = size === 'desktop' ? 'h-11 w-11' : 'h-9 w-9'

  return (
    <Link
      href={href}
      className={cn(
        'group inline-flex items-center gap-3 rounded-full px-2 py-1 transition-[opacity,transform,background-color] duration-300',
        isVisible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-1 pointer-events-none',
        'lg:opacity-100 lg:translate-y-0 lg:pointer-events-auto',
        'hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20',
      )}
      aria-label="Ir al inicio"
    >
      <Image src={src} alt={alt} width={imageSize} height={imageSize} quality={100} priority className={cn(className, 'select-none')} />
      {size === 'desktop' ? (
        <span className="[font-family:var(--font-playfair)] uppercase leading-none tracking-[0.12em] text-xl sm:text-2xl">
          Eroscape
        </span>
      ) : (
        <span className="sr-only">Eroscape</span>
      )}
    </Link>
  )
}

interface NavLinksProps {
  items: ReadonlyArray<NavItem>
  pathname: string
  onNavigate?: () => void
  variant: 'desktop' | 'mobile'
}

function NavLinks({ items, pathname, onNavigate, variant }: NavLinksProps) {
  const baseLink = variant === 'desktop' ? 'text-sm whitespace-nowrap' : 'text-base'

  return (
    <>
      {items.map((item) => {
        const active = isNavActive(pathname, item.href)
        const label = item.label

        if (variant === 'desktop') {
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                baseLink,
                'relative font-medium tracking-wide transition-colors',
                active ? 'text-white' : 'text-(--color-text-secondary) hover:text-white',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 rounded-md px-1 py-1',
              )}
              aria-current={active ? 'page' : undefined}
            >
              <span
                className={cn(
                  'relative inline-flex',
                  active && 'border-b border-[color-mix(in_srgb,var(--color-magenta)_55%,transparent)]',
                )}
              >
                {label}
              </span>
            </Link>
          )
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'rounded-2xl border px-4 py-3',
              baseLink,
              'transition-[border-color,background-color,color] duration-300',
              active ? 'text-white bg-white/5' : 'text-(--color-text-secondary) hover:text-white hover:bg-white/5',
            )}
            style={{ borderColor: 'color-mix(in srgb, var(--color-magenta) 18%, transparent)' }}
            aria-current={active ? 'page' : undefined}
            onClick={onNavigate}
          >
            {label}
          </Link>
        )
      })}
    </>
  )
}

export function Navbar() {
  const pathname = usePathname()
  const { isScrolled } = useScrollTrigger({ threshold: 80 })
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const shouldReduceMotion = useReducedMotion()
  const isInversores = pathname === '/inversores' || pathname.startsWith('/inversores/')

  const desktopLogoSrc = isInversores ? '/erosGold.png' : '/eros-logo-ico.png'
  const mobileLogoSrc = isInversores ? '/erosGold.png' : '/erosLogo.png'

  const navItems = useMemo<NavItem[]>(
    () => [
      { label: 'Experiencias', href: '/experiencias' },
      { label: 'La Sociedad', href: '/la-sociedad' },
      { label: 'El Tocador', href: '/boutique' },
      { label: 'Consentimiento', href: '/la-sociedad/seguridad' },
      { label: 'FAQ', href: '/faq' },
    ],
    [],
  )

  const appNavItem: NavItem = { label: 'La App', href: '/app-movil' }
  const isAppActive = isNavActive(pathname, appNavItem.href)

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-50',
          'transition-[background-color,backdrop-filter,border-color] duration-300',
          isScrolled ? 'backdrop-blur-md border-b' : 'border-b border-transparent',
        )}
        style={{
          backgroundColor: isScrolled ? 'rgba(8,0,8,0.95)' : 'transparent',
          borderBottomColor: isScrolled ? 'color-mix(in srgb, var(--color-magenta) 20%, transparent)' : 'transparent',
        }}
        variants={navVariants}
        initial={shouldReduceMotion ? false : 'hidden'}
        animate={shouldReduceMotion ? undefined : 'visible'}
      >
        <div className={cn('mx-auto flex h-[4.25rem] items-center px-4 sm:px-6', NAV_MAX_WIDTH_CLASS)}>
          <div className="shrink-0">
            <Logo href="/" src={desktopLogoSrc} alt="Eroscape" size="desktop" isVisible={isScrolled} />
          </div>

          <div className="ml-auto hidden min-w-0 items-center gap-5 lg:flex lg:gap-6">
            <nav className="flex items-center gap-4 lg:gap-5 xl:gap-6" aria-label="Navegación principal">
              <NavLinks items={navItems} pathname={pathname} variant="desktop" />
            </nav>

            <div
              className="flex shrink-0 items-center gap-2.5 border-l pl-5 lg:gap-3 lg:pl-6"
              style={{ borderColor: 'color-mix(in srgb, var(--color-magenta) 22%, transparent)' }}
            >
              <Link
                href={appNavItem.href}
                className={cn(
                  'rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition-colors',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20',
                  isAppActive ? 'text-white' : 'text-(--color-text-secondary) hover:text-white',
                )}
                style={{
                  border: '1px solid color-mix(in srgb, var(--color-gold) 45%, transparent)',
                  background: 'color-mix(in srgb, var(--color-gold) 12%, transparent)',
                }}
                aria-current={isAppActive ? 'page' : undefined}
              >
                <motion.span
                  animate={shouldReduceMotion ? undefined : { opacity: [0.88, 1, 0.88] }}
                  transition={shouldReduceMotion ? undefined : { duration: 2.2, repeat: Infinity, ease: SENSUAL_EASE }}
                >
                  {appNavItem.label}
                </motion.span>
              </Link>
              <Link
                href="/reservar"
                className={cn(
                  'rounded-full px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white whitespace-nowrap',
                  'transition-[filter,transform] duration-200 hover:brightness-110 active:translate-y-px',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20',
                )}
                style={{ background: 'var(--gradient-cta)' }}
              >
                Rendirse al deseo
              </Link>
              <Link
                href="/inversores"
                className={cn(
                  'rounded-full px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] whitespace-nowrap',
                  'transition-[filter,transform] duration-200 hover:brightness-110 active:translate-y-px',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20',
                  'text-(--color-bg-base)',
                )}
                style={{
                  background: 'var(--color-gold)',
                  boxShadow: 'var(--glow-gold)',
                }}
              >
                Franquicia
              </Link>
            </div>
          </div>

          <button
            type="button"
            className={cn(
              'lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full',
              'transition-colors hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20',
            )}
            aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isMenuOpen}
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
              style={{ background: 'var(--color-bg-elevated)', borderLeftColor: 'color-mix(in srgb, var(--color-magenta) 20%, transparent)' }}
              variants={mobileMenuVariants}
              initial={shouldReduceMotion ? false : 'hidden'}
              animate={shouldReduceMotion ? undefined : 'visible'}
              exit={shouldReduceMotion ? undefined : 'exit'}
            >
              <div className="flex h-16 items-center justify-between px-4">
                <Logo href="/" src={mobileLogoSrc} alt="Eroscape" size="mobile" isVisible />
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

              <div className="flex flex-col gap-2 px-4 pt-6">
                <NavLinks
                  items={navItems}
                  pathname={pathname}
                  variant="mobile"
                  onNavigate={() => setIsMenuOpen(false)}
                />
                <Link
                  href={appNavItem.href}
                  className={cn(
                    'rounded-2xl border px-4 py-3 text-center text-base transition-colors',
                    isAppActive ? 'text-white bg-white/5' : 'text-(--color-text-secondary) hover:text-white hover:bg-white/5',
                  )}
                  style={{
                    borderColor: 'color-mix(in srgb, var(--color-gold) 40%, transparent)',
                    background: 'color-mix(in srgb, var(--color-gold) 12%, transparent)',
                  }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {appNavItem.label}
                </Link>
                <Link
                  href="/reservar"
                  className={cn(
                    'mt-3 rounded-full px-6 py-3 text-center text-xs font-semibold uppercase tracking-[0.18em] text-white',
                    'transition-[filter,transform] duration-200 hover:brightness-110 active:translate-y-px',
                  )}
                  style={{ background: 'var(--gradient-cta)' }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Rendirse al deseo
                </Link>
                <Link
                  href="/inversores"
                  className={cn(
                    'rounded-full px-6 py-3 text-center text-xs font-semibold uppercase tracking-[0.18em] text-white',
                    'transition-[filter,transform] duration-200 hover:brightness-110 active:translate-y-px',
                  )}
                  style={{ background: 'var(--color-gold)', boxShadow: 'var(--glow-gold)' }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Franquicia
                </Link>
              </div>
            </motion.div>
          </motion.aside>
        ) : null}
      </AnimatePresence>
    </>
  )
}
