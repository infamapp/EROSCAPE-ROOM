 'use client'
 
 import type { ReactNode } from 'react'
 import { cn } from '@/lib/utils'
 
 export interface BookingBottomBarProps {
   summaryTitle?: string
   summary?: ReactNode
 
   onBack?: () => void
   backLabel?: string
 
   onPrimary?: () => void
   primaryLabel?: string
   isPrimaryDisabled?: boolean
 
   className?: string
   containerClassName?: string
 }
 
 export function BookingBottomBar({
   summaryTitle,
   summary,
   onBack,
   backLabel = '← VOLVER',
   onPrimary,
   primaryLabel = 'CONTINUAR →',
   isPrimaryDisabled = false,
   className,
   containerClassName,
 }: BookingBottomBarProps) {
   const showBack = typeof onBack === 'function'
   const showPrimary = typeof onPrimary === 'function'
 
   return (
     <div
       className={cn('fixed inset-x-0 bottom-0 z-120 border-t px-3 py-3 sm:px-4 sm:py-4', className)}
       style={{
         background: 'rgba(8,0,8,0.86)',
         borderColor: 'rgba(185,48,158,0.25)',
         backdropFilter: 'blur(12px)',
       }}
     >
       <div
         className={cn(
           'mx-auto flex max-w-6xl flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-3',
           containerClassName,
         )}
       >
         {summaryTitle || summary ? (
           <div className="min-w-0">
             {summaryTitle ? (
               <div className="font-(--font-jetbrains) text-[10px] tracking-[0.18em]" style={{ color: 'var(--color-text-muted)' }}>
                 {summaryTitle}
               </div>
             ) : null}
             {summary ? (
               <div className="mt-1 truncate text-[13px] sm:text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                 {summary}
               </div>
             ) : null}
           </div>
         ) : (
           <div />
         )}
 
         <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
           {showBack ? (
             <button
               type="button"
               onClick={onBack}
               className="rounded-full border border-[rgba(185,48,158,0.2)] px-4 py-2.5 font-(--font-jetbrains) text-[13px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg-base) sm:px-5 sm:py-3 sm:text-sm"
               style={{ color: 'var(--color-text-secondary)' }}
             >
               {backLabel}
             </button>
           ) : null}
 
           {showPrimary ? (
             <button
               type="button"
               onClick={onPrimary}
               disabled={isPrimaryDisabled}
               className="rounded-full px-4 py-2.5 font-(--font-jetbrains) text-[13px] text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-magenta) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg-base) disabled:cursor-not-allowed disabled:opacity-50 sm:px-5 sm:py-3 sm:text-[11px]"
               style={{ background: 'var(--gradient-cta)' }}
             >
               {primaryLabel}
             </button>
           ) : null}
         </div>
       </div>
     </div>
   )
 }

