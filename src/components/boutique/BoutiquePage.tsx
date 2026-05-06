'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { PackageCheck } from 'lucide-react'
import { useEffect, useMemo, useState, type FormEvent } from 'react'

import { CategoryTabs } from '@/components/boutique/CategoryTabs'
import { ProductCard, type BoutiqueProductRarity } from '@/components/boutique/ProductCard'
import { cn } from '@/lib/utils'

const SENSUAL_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

const CATEGORIES = ['TODO', 'KITS', 'JUEGOS', 'LENCERÍA', 'ACCESORIOS', 'MASAJES'] as const
type BoutiqueCategoryLabel = (typeof CATEGORIES)[number]

interface BoutiqueProduct {
  id: string
  name: string
  description: string
  category: BoutiqueCategoryLabel
  price: number
  rarity: BoutiqueProductRarity
  imageSrc?: string
}

interface BoutiqueCopy {
  title: string
  intro: string
  products: Array<{ name: string; desc: string }>
  offers: Array<{ name: string; desc: string }>
  reviews: string[]
  newsletter: string
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function getString(value: unknown): string | null {
  return typeof value === 'string' ? value : null
}

function parseBoutiqueCopy(raw: unknown): BoutiqueCopy | null {
  if (!isRecord(raw)) return null
  const boutique = raw.boutique
  if (!isRecord(boutique)) return null

  const title = getString(boutique.title)
  const intro = getString(boutique.intro)
  const newsletter = getString(boutique.newsletter)
  const productsRaw = boutique.products
  const offersRaw = boutique.offers
  const reviewsRaw = boutique.reviews

  if (!title || !intro || !newsletter) return null
  if (!Array.isArray(productsRaw) || !Array.isArray(offersRaw) || !Array.isArray(reviewsRaw)) return null

  const products = productsRaw
    .map((p): { name: string; desc: string } | null => {
      if (!isRecord(p)) return null
      const name = getString(p.name)
      const desc = getString(p.desc)
      if (!name || !desc) return null
      return { name, desc }
    })
    .filter((p): p is { name: string; desc: string } => Boolean(p))

  const offers = offersRaw
    .map((o): { name: string; desc: string } | null => {
      if (!isRecord(o)) return null
      const name = getString(o.name)
      const desc = getString(o.desc)
      if (!name || !desc) return null
      return { name, desc }
    })
    .filter((o): o is { name: string; desc: string } => Boolean(o))

  const reviews = reviewsRaw.map((r) => getString(r)).filter((r): r is string => Boolean(r))

  if (products.length === 0) return null

  return { title, intro, products, offers, reviews, newsletter }
}

function inferCategory(name: string): BoutiqueProduct['category'] {
  const n = name.toLowerCase()
  if (n.includes('kit') || n.includes('box')) return 'KITS'
  if (n.includes('carta')) return 'JUEGOS'
  if (n.includes('lencer')) return 'LENCERÍA'
  if (n.includes('máscara') || n.includes('mascara')) return 'ACCESORIOS'
  if (n.includes('masaje') || n.includes('vela')) return 'MASAJES'
  return 'ACCESORIOS'
}

function imageForProductName(name: string): string {
  const n = name.toLowerCase()
  if (n.includes('vela') || n.includes('masaje')) return '/velas.png'
  if (n.includes('máscara') || n.includes('mascara')) return '/mask.png'
  if (n.includes('lencer')) return '/lenc.png'
  if (n.includes('carta')) return '/cartas.png'
  if (n.includes('box')) return '/box.png'
  if (n.includes('kit')) return '/kit.png'
  return '/placeholder.png'
}

const headerReveal = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: SENSUAL_EASE } },
}

const FALLBACK_COPY: BoutiqueCopy = {
  title: 'El Tocador',
  intro: 'Objetos curados para extender la experiencia con discreción, elegancia y cuidado.',
  products: [
    { name: 'Kit Sensorial de Lujo', desc: 'Aceites aromáticos, plumas y elementos táctiles premium inspirados en nuestras salas.' },
    { name: 'Cartas del Deseo', desc: 'Baraja exclusiva con preguntas íntimas y desafíos sensuales para parejas aventureras.' },
    { name: 'Lencería Veneciana', desc: 'Diseños exclusivos inspirados en Venecia, disponibles en todas las tallas.' },
    { name: 'Máscaras Artesanales', desc: 'Máscaras venecianas auténticas hechas a mano para tus propios juegos de seducción.' },
    { name: 'Velas de Masaje Gourmet', desc: 'Set de velas con aromas que se convierten en aceites de masaje.' },
    { name: 'Box Experiencia Privada', desc: 'Kit completo para recrear una noche Eroscape en casa con guía paso a paso.' },
  ],
  offers: [
    { name: 'Para Parejas Nuevas', desc: 'Kit de iniciación con descuento para quienes reserven su primera experiencia.' },
    { name: 'Membresía VIP', desc: 'Acceso a productos limitados y descuentos permanentes.' },
  ],
  reviews: ['“Packaging increíblemente elegante. Se nota el cuidado en cada detalle.” — Cliente verificado'],
  newsletter: 'Suscribite y recibe novedades discretas y privilegios exclusivos.',
}

export function BoutiquePage() {
  const reduceMotion = useReducedMotion()
  const [copy, setCopy] = useState<BoutiqueCopy>(FALLBACK_COPY)
  const [activeCategory, setActiveCategory] = useState<string>('TODO')
  const [cart, setCart] = useState<string[]>([])
  const [email, setEmail] = useState('')
  const [newsletterState, setNewsletterState] = useState<'idle' | 'ok'>('idle')

  useEffect(() => {
    let isMounted = true
    async function loadCopy() {
      try {
        const res = await fetch('/eros.json', { cache: 'force-cache' })
        if (!res.ok) return
        const raw: unknown = await res.json()
        const parsed = parseBoutiqueCopy(raw)
        if (!parsed) return
        if (!isMounted) return
        setCopy(parsed)
      } catch {
        // fallback local
      }
    }
    void loadCopy()
    return () => {
      isMounted = false
    }
  }, [])

  const products: readonly BoutiqueProduct[] = useMemo(() => {
    return copy.products.map((p, idx) => {
      const id = `${idx}-${p.name}`.toLowerCase().replaceAll(' ', '-')
      const rarity: BoutiqueProductRarity = idx % 3 === 0 ? 'exclusivo' : idx % 3 === 1 ? 'premium' : 'esencial'
      const base = 18900 + idx * 4500
      return {
        id,
        name: p.name,
        description: p.desc,
        category: inferCategory(p.name),
        price: base,
        rarity,
        imageSrc: imageForProductName(p.name),
      }
    })
  }, [copy.products])

  const filtered: readonly BoutiqueProduct[] = useMemo(() => {
    if (activeCategory === 'TODO') return products
    return products.filter((p) => p.category === activeCategory)
  }, [activeCategory, products])

  function handleToggleCart(id: string) {
    setCart((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  function handleNewsletterSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setNewsletterState('ok')
  }

  const reviewText = useMemo(() => {
    const first = copy.reviews[0]
    if (!first) return null
    return first.replace(/\s*—\s*Cliente verificado\s*$/i, '')
  }, [copy.reviews])

  return (
    <div className="tocador-page-root relative min-h-screen">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[min(70vh,520px)]"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 120% 80% at 50% -20%, color-mix(in srgb, var(--color-purple-mid) 22%, transparent) 0%, transparent 65%)',
        }}
      />

      <main className="relative z-0 pt-20 sm:pt-24">
        <section className="border-t border-[color-mix(in_srgb,var(--color-magenta)_18%,transparent)] py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <motion.header
              variants={reduceMotion ? undefined : headerReveal}
              initial={reduceMotion ? false : 'hidden'}
              whileInView={reduceMotion ? undefined : 'visible'}
              viewport={{ once: true, margin: '-20%' }}
              className="mx-auto max-w-3xl text-center"
            >
              <p className="font-(--font-jetbrains) text-[10px] uppercase tracking-[0.22em] text-(--color-text-muted) sm:text-[11px]">
                BOUTIQUE
              </p>
              <h1
                className="mt-5 text-5xl font-bold [font-family:var(--font-playfair)] sm:text-6xl"
                style={{
                  background: 'var(--gradient-cta)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                {copy.title}
              </h1>
              <div className="mx-auto mt-3 flex justify-center">
                <div className="h-px w-24 bg-(--color-gold)/70" aria-hidden="true" />
              </div>
              <p className="mt-5 font-(--font-inter) text-sm leading-relaxed text-(--color-text-secondary) sm:text-base">
                {copy.intro}
              </p>
              <div className="mt-8 inline-flex items-center gap-2 rounded-full border-(--border-subtle) bg-(--color-bg-elevated) px-4 py-1.5 text-xs text-(--color-text-secondary)">
                <PackageCheck className="h-4 w-4 text-(--color-magenta-glow)" aria-hidden="true" />
                Packaging elegante, envío discreto
              </div>
            </motion.header>
          </div>
        </section>

        <section className="pb-6 sm:pb-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <CategoryTabs categories={CATEGORIES} activeCategory={activeCategory} onChange={setActiveCategory} />

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeCategory}
                initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
                transition={{ duration: reduceMotion ? 0 : 0.3, ease: SENSUAL_EASE }}
                className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
              >
                {filtered.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    description={product.description}
                    category={product.category}
                    price={product.price}
                    rarity={product.rarity}
                    isInCart={cart.includes(product.id)}
                    onToggle={() => handleToggleCart(product.id)}
                    imageSrc={product.imageSrc}
                    index={index}
                  />
                ))}
              </motion.div>
            </AnimatePresence>

            {filtered.length === 0 ? (
              <p className="mt-10 text-center font-(--font-inter) text-sm text-(--color-text-muted)">
                No hay productos en esta categoría por ahora.
              </p>
            ) : null}
          </div>
        </section>

        {copy.offers.length > 0 ? (
          <section className="border-t border-[color-mix(in_srgb,var(--color-magenta)_12%,transparent)] py-16 sm:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
              <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
                <p className="text-[10px] uppercase tracking-[0.22em] text-(--color-text-muted) [font-family:var(--font-jetbrains)] sm:text-[11px]">
                  PRIVILEGIOS
                </p>
                <h2 className="mt-4 text-3xl font-bold tracking-[0.06em] text-white [font-family:var(--font-playfair)] sm:text-4xl">
                  Ofertas cuidadas
                </h2>
              </div>

              <div className="mt-10 grid gap-5 sm:mt-12 md:grid-cols-2">
                {copy.offers.slice(0, 2).map((o) => (
                  <div
                    key={o.name}
                    className={cn(
                      'rounded-2xl border-(--border-gold) bg-(--color-bg-elevated) p-7 [box-shadow:var(--glow-card)] sm:p-8',
                    )}
                  >
                    <p className="font-(--font-jetbrains) text-[10px] uppercase tracking-[0.22em] text-(--color-text-muted)">
                      Edición limitada
                    </p>
                    <h3 className="mt-3 text-2xl font-bold tracking-[0.04em] text-(--color-text-primary) [font-family:var(--font-playfair)]">
                      {o.name}
                    </h3>
                    <p className="mt-3 font-(--font-inter) text-sm leading-relaxed text-(--color-text-secondary) sm:text-base">
                      {o.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {copy.reviews.length > 0 ? (
          <section className="border-t border-white/6 px-4 py-16 sm:px-6 sm:py-20" style={{ background: 'rgba(15, 14, 17, 0.92)' }}>
            <div className="mx-auto max-w-7xl">
              <h2 className="mb-10 text-center font-(--font-jetbrains) text-[11px] uppercase tracking-[0.42em] text-(--color-text-muted) sm:mb-14 sm:text-xs">
                Lo que se susurra
              </h2>
              <blockquote className="tocador-glass mx-auto max-w-3xl rounded-2xl p-8 sm:p-10">
                <p className="text-lg italic leading-relaxed text-(--color-text-secondary) [font-family:var(--font-cormorant)]">
                  {reviewText ?? copy.reviews[0]}
                </p>
                <figcaption className="mt-4 text-center text-[10px] uppercase tracking-[0.22em] text-(--color-text-muted) [font-family:var(--font-jetbrains)]">
                  — Cliente verificado
                </figcaption>
              </blockquote>
            </div>
          </section>
        ) : null}

        <section className="border-t border-[color-mix(in_srgb,var(--color-magenta)_12%,transparent)] py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <p className="font-(--font-jetbrains) text-[10px] uppercase tracking-[0.22em] text-(--color-text-muted) sm:text-[11px]">
              Newsletter
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-[0.06em] text-(--color-text-primary) [font-family:var(--font-playfair)] sm:text-4xl">
              Dejá que te escribamos con discreción
            </h2>
            <p className="mx-auto mt-4 max-w-2xl font-(--font-inter) text-sm leading-relaxed text-(--color-text-secondary) sm:text-base">
              {copy.newsletter}
            </p>

            <form onSubmit={handleNewsletterSubmit} className="mx-auto mt-10 flex max-w-xl flex-col gap-3 sm:flex-row sm:items-stretch">
              <label className="sr-only" htmlFor="boutique-email">
                Email
              </label>
              <input
                id="boutique-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                autoComplete="email"
                required
                placeholder="tu@email.com"
                className="w-full rounded-full border-(--border-subtle) bg-transparent px-4 py-2.5 font-(--font-inter) text-sm text-white placeholder:text-(--color-text-muted) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg-base) focus-visible:border-(--color-magenta)"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-xs uppercase tracking-[0.18em] text-white transition-[filter,transform] duration-200 [font-family:var(--font-jetbrains)] hover:brightness-110 active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
                style={{ background: 'var(--gradient-cta)' }}
              >
                SUSCRIBIRME
              </button>
            </form>

            {newsletterState === 'ok' ? (
              <p className="mt-4 font-(--font-inter) text-sm text-(--color-text-secondary)">
                Listo. Te escribiremos solo cuando haya algo que valga la pena.
              </p>
            ) : null}
          </div>
        </section>
      </main>
    </div>
  )
}

