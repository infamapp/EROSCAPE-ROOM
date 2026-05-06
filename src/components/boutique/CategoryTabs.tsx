 'use client'
 
 import { motion } from 'framer-motion'
 
 import { cn } from '@/lib/utils'
 
 export interface CategoryTabsProps {
   categories: readonly string[]
   activeCategory: string
   onChange: (next: string) => void
   className?: string
 }
 
 export function CategoryTabs({ categories, activeCategory, onChange, className }: CategoryTabsProps) {
   return (
     <div
       role="tablist"
       aria-label="Categorías"
       className={cn(
         '-mx-1 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
         className,
       )}
     >
       <div className="flex min-w-0 gap-2 px-1 sm:justify-center sm:gap-2.5">
         {categories.map((label) => {
           const isOn = label === activeCategory
           return (
             <motion.button
               key={label}
               type="button"
               role="tab"
               aria-selected={isOn}
               whileTap={{ scale: 0.98 }}
               onClick={() => onChange(label)}
               className={cn(
                 'shrink-0 rounded-full px-4 py-2 text-[10px] uppercase tracking-[0.18em] transition-[border-color,background-color,color,filter] duration-300 [font-family:var(--font-jetbrains)] sm:text-[11px]',
                 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg-base)',
                 isOn
                   ? 'text-white'
                   : 'border border-(--border-subtle) bg-transparent text-(--color-text-muted) hover:text-white',
               )}
               style={isOn ? { background: 'var(--gradient-cta)' } : undefined}
             >
               {label}
             </motion.button>
           )
         })}
       </div>
     </div>
   )
 }
