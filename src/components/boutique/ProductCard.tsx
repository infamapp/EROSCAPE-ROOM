 'use client'
 
 import Image from 'next/image'
 import { motion, useReducedMotion } from 'framer-motion'
import { Package, ShoppingBag, Star } from 'lucide-react'
 
 import { cn, formatCurrency } from '@/lib/utils'
 
 export type BoutiqueProductRarity = 'esencial' | 'premium' | 'exclusivo'
 
 export interface ProductCardProps {
   id: string
   name: string
   description: string
   category: string
   price: number
   rarity: BoutiqueProductRarity
   isInCart: boolean
   onToggle: () => void
   imageSrc?: string
   index?: number
 }
 
 const SENSUAL_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]
 
 const itemReveal = {
   hidden: { opacity: 0, y: 18 },
   visible: (index: number) => ({
     opacity: 1,
     y: 0,
     transition: { duration: 0.45, ease: SENSUAL_EASE, delay: index * 0.06 },
   }),
 }
 
 function rarityLabel(rarity: BoutiqueProductRarity): string {
   switch (rarity) {
     case 'esencial':
       return 'ESENCIAL'
     case 'premium':
       return 'PREMIUM'
     case 'exclusivo':
       return 'EXCLUSIVO'
     default: {
       const _exhaustive: never = rarity
       return _exhaustive
     }
   }
 }
 
 function rarityColorVar(rarity: BoutiqueProductRarity): string {
   switch (rarity) {
     case 'esencial':
       return 'var(--color-gm-terminal)'
     case 'premium':
       return 'var(--color-magenta)'
     case 'exclusivo':
       return 'var(--color-gold)'
     default: {
       const _exhaustive: never = rarity
       return _exhaustive
     }
   }
 }
 
 export function ProductCard({
   name,
   description,
   category,
   price,
   rarity,
   isInCart,
   onToggle,
   imageSrc,
   index = 0,
 }: ProductCardProps) {
   const reduceMotion = useReducedMotion()
   const rarityVar = rarityColorVar(rarity)
 
   return (
     <motion.article
       custom={index}
       variants={reduceMotion ? undefined : itemReveal}
       initial={reduceMotion ? false : 'hidden'}
       whileInView={reduceMotion ? undefined : 'visible'}
       viewport={{ once: true, margin: '-30%' }}
       className={cn(
         'group relative overflow-hidden rounded-2xl border-(--border-subtle) bg-(--color-bg-elevated) [box-shadow:var(--glow-card)]',
         'transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-1',
       )}
       style={{
         borderColor: 'color-mix(in srgb, var(--border-subtle) 60%, transparent)',
       }}
     >
       <div className="relative h-[180px] overflow-hidden" aria-hidden="true">
         <Image
           src={imageSrc ?? '/placeholder.png'}
           alt=""
           fill
           sizes="(max-width: 768px) 100vw, 33vw"
           className="object-cover opacity-90 transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.06]"
         />
         <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-(--color-bg-elevated) via-transparent to-transparent" />
 
         <div className="pointer-events-none absolute right-3 top-3">
           <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-2 py-0.5 text-[8px] uppercase tracking-[0.18em] text-white backdrop-blur-sm [font-family:var(--font-jetbrains)]">
             <Package className="h-3 w-3" aria-hidden="true" />
             DISCRETO
           </span>
         </div>
       </div>
 
       <div className="flex h-full flex-col p-5">
         <p className="text-[10px] uppercase tracking-[0.18em] text-(--color-text-muted) [font-family:var(--font-jetbrains)]">
           {category}
         </p>
 
         <div className="mt-3 flex items-start justify-between gap-3">
           <div className="min-w-0">
             <h3 className="text-base font-bold text-white [font-family:var(--font-playfair)]">{name}</h3>
             <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-(--color-text-secondary) [font-family:var(--font-inter)]">
               {description}
             </p>
           </div>
 
           <span
             className="shrink-0 rounded-full px-2.5 py-1 text-[9px] uppercase tracking-[0.18em] [font-family:var(--font-jetbrains)]"
             style={{
               color: rarityVar,
               border: `1px solid color-mix(in srgb, ${rarityVar} 45%, transparent)`,
               background: `color-mix(in srgb, ${rarityVar} 12%, transparent)`,
             }}
           >
             {rarityLabel(rarity)}
           </span>
         </div>
 
         <div className="mt-5 flex items-center justify-between gap-3">
           <p className="text-sm font-semibold text-(--color-gold-light) [font-family:var(--font-playfair)]">
             {formatCurrency(price)}
           </p>
 
           <div className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-(--color-text-muted) [font-family:var(--font-jetbrains)]">
             <Star className="h-3 w-3 text-(--color-gold-light)" aria-hidden="true" />
             Curaduría sensorial
           </div>
         </div>
 
         <motion.button
           type="button"
           onClick={onToggle}
           whileTap={reduceMotion ? undefined : { scale: [1, 0.95, 1] }}
           transition={reduceMotion ? undefined : { duration: 0.22, ease: SENSUAL_EASE }}
           className={cn(
             'mt-5 inline-flex w-full items-center justify-center rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-[filter,transform,background-color,border-color] duration-200 [font-family:var(--font-jetbrains)]',
             'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg-base)',
             isInCart ? 'bg-green-800/50' : '',
           )}
           style={isInCart ? undefined : { background: 'var(--gradient-cta)' }}
           aria-pressed={isInCart}
         >
           {isInCart ? 'EN TU BAÚL ✓' : 'AÑADIR'}
           <ShoppingBag className="ml-2 h-4 w-4" aria-hidden="true" />
         </motion.button>
       </div>
     </motion.article>
   )
 }
