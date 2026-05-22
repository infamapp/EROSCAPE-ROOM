 'use client'
 
 import Image from 'next/image'
 import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { BarChart2, Building2, CheckCircle2, Crown, LockKeyhole, TrendingUp } from 'lucide-react'
import { useState, type FormEvent } from 'react'
 
 import { FRANCHISE_METRICS } from '@/lib/franchise'
 import { cn } from '@/lib/utils'
 
 const SENSUAL_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]
 
 const heroVariants = {
   hidden: { opacity: 0, y: 18 },
   visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: SENSUAL_EASE } },
 } as const
 
 const panelVariants = {
   hidden: { opacity: 0, y: 14 },
   visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: SENSUAL_EASE } },
 } as const
 
 type InvestorProfile = 'family-office' | 'angel' | 'strategic' | 'otro'
 
interface InversorFormState {
  nombre: string
  email: string
  profile: InvestorProfile
  mensaje: string
}

interface FranquiciaFormState {
  nombre: string
  email: string
  telefono: string
  mensaje: string
}
 
 
 const MODEL_CARDS = [
   {
     id: 'base',
     icon: BarChart2,
     title: 'Reservas (Base)',
     description: 'Ticket premium con demanda dinámica y control de disponibilidad.',
   },
   {
     id: 'upsell',
     icon: TrendingUp,
     title: 'El Baúl (Upsell)',
     description: 'Inventario en-sala para elevar la noche con intención.',
   },
   {
     id: 'membership',
     icon: Crown,
     title: 'El Tocador (Membresía)',
     description: 'Acceso recurrente no intrusivo: discreción y agenda prioritaria.',
   },
   {
     id: 'licensing',
     icon: Building2,
     title: 'Licencias (Expansión)',
     description: 'Crecimiento mediante acuerdos operativos con estándares de marca.',
   },
 ] as const
 
 export interface InversoresLandingProps {
   className?: string
 }
 
 export function InversoresLanding({ className }: InversoresLandingProps) {
   const shouldReduceMotion = useReducedMotion()
  const [submitted, setSubmitted] = useState(false)
  const [franquiciaSubmitted, setFranquiciaSubmitted] = useState(false)
  const [formState, setFormState] = useState<InversorFormState>({
    nombre: '',
    email: '',
    profile: 'family-office',
    mensaje: '',
  })
  const [franquiciaForm, setFranquiciaForm] = useState<FranquiciaFormState>({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: '',
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // TODO: conectar con Resend/SendGrid en producción
    setSubmitted(true)
  }

  const handleFranquiciaSubmit = (e: FormEvent) => {
    e.preventDefault()
    // TODO: conectar con Resend/SendGrid en producción
    setFranquiciaSubmitted(true)
  }
 
   return (
     <main className={cn('min-h-screen pb-24', className)}>
       {/* SECCIÓN 1 — Hero Inversor */}
       <section className="relative isolate overflow-hidden">
         <div
           className="pointer-events-none absolute inset-0"
           aria-hidden="true"
           style={{
             background:
               'repeating-linear-gradient(90deg, color-mix(in_srgb, var(--color-gold) 8%, transparent) 0, color-mix(in_srgb, var(--color-gold) 8%, transparent) 1px, transparent 1px, transparent 64px), repeating-linear-gradient(0deg, color-mix(in_srgb, var(--color-gold) 6%, transparent) 0, color-mix(in_srgb, var(--color-gold) 6%, transparent) 1px, transparent 1px, transparent 72px)',
             opacity: 0.55,
           }}
         />
         <div
           className="pointer-events-none absolute inset-0 opacity-[0.07]"
           style={{ backgroundImage: 'var(--texture-parchment-noise)' }}
           aria-hidden="true"
         />
 
         <div className="mx-auto flex min-h-[92vh] max-w-6xl flex-col items-center justify-center px-4 py-14 text-center sm:px-6">
           <motion.div variants={heroVariants} initial={shouldReduceMotion ? false : 'hidden'} animate={shouldReduceMotion ? undefined : 'visible'}>
             <Image src="/erosGold.png" alt="Eroscape" width={80} height={80} priority className="h-20 w-20 select-none" />
           </motion.div>
 
           <motion.p
             className="mt-6 inline-flex items-center rounded-full border px-4 py-1 text-[10px] uppercase tracking-[0.28em] text-(--color-gold) [font-family:var(--font-jetbrains)]"
             style={{ borderColor: 'color-mix(in srgb, var(--color-gold) 30%, transparent)' }}
             variants={heroVariants}
             initial={shouldReduceMotion ? false : 'hidden'}
             animate={shouldReduceMotion ? undefined : 'visible'}
           >
             INVERSIÓN DISCRETA
           </motion.p>
 
           <motion.h1
             className="mt-6 text-balance text-5xl font-bold uppercase tracking-[0.06em] text-(--color-text-primary) [font-family:var(--font-playfair)] sm:text-7xl"
             variants={heroVariants}
             initial={shouldReduceMotion ? false : 'hidden'}
             animate={shouldReduceMotion ? undefined : 'visible'}
           >
             MONTA TU PROPIA FRANQUICIA
           </motion.h1>

           <motion.p
             className="mx-auto mt-6 max-w-xl text-pretty text-sm leading-relaxed text-(--color-text-secondary) [font-family:var(--font-inter)] sm:text-base"
             variants={heroVariants}
             initial={shouldReduceMotion ? false : 'hidden'}
             animate={shouldReduceMotion ? undefined : 'visible'}
           >
             Una de las franquicias únicas en el mundo. Con los mayores estándares de calidad, discreción y experiencia.
             ¿Te interesa abrir tu propio Eroscape?
           </motion.p>
 
           <motion.div
             className="mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-5"
             variants={heroVariants}
             initial={shouldReduceMotion ? false : 'hidden'}
             animate={shouldReduceMotion ? undefined : 'visible'}
           >
             {FRANCHISE_METRICS.map((m, idx) => (
               <div key={m.label} className="flex items-center gap-7">
                 <div className="text-center">
                   <div className="text-4xl font-bold text-(--color-gold-light) [font-family:var(--font-playfair)]">
                     {m.value}
                   </div>
                   <div className="mt-2 text-[9px] uppercase tracking-[0.22em] text-(--color-text-muted) [font-family:var(--font-jetbrains)]">
                     {m.label}
                   </div>
                 </div>
                 {idx < FRANCHISE_METRICS.length - 1 ? (
                   <span className="text-(--color-text-muted) [font-family:var(--font-jetbrains)]" aria-hidden="true">
                     |
                   </span>
                 ) : null}
               </div>
             ))}
           </motion.div>
 
           <motion.div className="mt-12" variants={heroVariants} initial={shouldReduceMotion ? false : 'hidden'} animate={shouldReduceMotion ? undefined : 'visible'}>
             <a
               href="#franquicia-form"
               className="inline-flex items-center justify-center rounded-full border px-7 py-3 text-[11px] font-bold uppercase tracking-[0.22em] text-(--color-gold-light) transition-[background-color,border-color,color] [font-family:var(--font-jetbrains)] hover:bg-(--color-gold)/10"
               style={{ borderColor: 'var(--border-gold)' }}
             >
               SOLICITAR INFORMACIÓN
             </a>
           </motion.div>
         </div>
       </section>
 
       {/* SECCIÓN 2 — Potencial de mercado */}
       <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
         <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
           <div>
             <p className="text-xs font-semibold uppercase tracking-[0.22em] text-(--color-gold) [font-family:var(--font-jetbrains)]">
               POTENCIAL
             </p>
             <h2 className="mt-4 text-balance text-3xl font-semibold text-white [font-family:var(--font-playfair)] sm:text-4xl">
               La economía de la experiencia sigue creciendo.
             </h2>
             <p className="mt-6 text-pretty text-sm leading-relaxed text-(--color-text-secondary) [font-family:var(--font-inter)] sm:text-base">
               Mercado en expansión: experiencias premium, repetición y estandarización operativa como base para crecimiento controlado.
             </p>
 
             <div className="mt-8 space-y-3">
               <p className="text-sm font-bold text-(--color-gold-light) [font-family:var(--font-jetbrains)]">
                 +42% CRECIMIENTO INTERANUAL ESTIMADO
               </p>
               <p className="text-sm font-bold text-(--color-gold-light) [font-family:var(--font-jetbrains)]">
                 €2.4B MERCADO EXPERIENCIAL (TAM)
               </p>
             </div>
           </div>
 
           <motion.div
             className="rounded-2xl border p-7 sm:p-8"
             style={{
               borderColor: 'color-mix(in srgb, var(--color-gold) 20%, transparent)',
               background: 'var(--color-bg-elevated)',
             }}
             variants={panelVariants}
             initial={shouldReduceMotion ? false : 'hidden'}
             whileInView={shouldReduceMotion ? undefined : 'visible'}
             viewport={{ once: true, margin: '-15% 0px -15% 0px' }}
           >
             <div className="flex items-center justify-between">
               <span className="text-[10px] uppercase tracking-[0.22em] text-(--color-text-muted) [font-family:var(--font-jetbrains)]">
                 Crecimiento (referencial)
               </span>
               <span className="text-[10px] uppercase tracking-[0.22em] text-(--color-gold) [font-family:var(--font-jetbrains)]">
                 SEÑAL
               </span>
             </div>
 
             <div className="mt-6 flex h-48 items-end gap-3">
               {(
                 [
                   { year: '2019', h: '32%' },
                   { year: '2020', h: '38%' },
                   { year: '2021', h: '46%' },
                   { year: '2026', h: '100%', signal: true },
                 ] as const
               ).map((b) => {
                 const isSignal = 'signal' in b && b.signal === true
                 return (
                 <div key={b.year} className="flex flex-1 flex-col items-center gap-3">
                   <div
                     className="relative w-full rounded-sm"
                     style={{
                       height: b.h,
                       background: isSignal ? 'var(--color-gold)' : 'var(--color-gold-light)',
                       opacity: isSignal ? 0.95 : 0.22,
                     }}
                     aria-hidden="true"
                   >
                     {isSignal ? (
                       <span
                         className="absolute -top-3 right-0 rounded-full border px-2 py-0.5 text-[9px] uppercase tracking-[0.2em] text-(--color-gold-light) [font-family:var(--font-jetbrains)]"
                         style={{
                           borderColor: 'color-mix(in srgb, var(--color-gold) 45%, transparent)',
                           background: 'color-mix(in srgb, var(--color-bg-elevated) 75%, transparent)',
                         }}
                       >
                         SEÑAL
                       </span>
                     ) : null}
                   </div>
                   <span className="text-[10px] uppercase tracking-[0.22em] text-(--color-text-muted) [font-family:var(--font-jetbrains)]">
                     {b.year}
                   </span>
                 </div>
                 )
               })}
             </div>
           </motion.div>
         </div>
       </section>
 
       {/* SECCIÓN 3 — Modelo de negocio */}
       <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
         <div className="text-center">
           <h2 className="text-3xl font-semibold uppercase tracking-[0.3em] text-white [font-family:var(--font-playfair)] sm:text-4xl">
             MODELO
           </h2>
         </div>
 
         <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
           {MODEL_CARDS.map((card) => {
             const Icon = card.icon
             return (
               <motion.div
                 key={card.id}
                 className="rounded-2xl border p-6"
                 style={{
                   background: 'var(--color-bg-elevated)',
                   borderColor: 'color-mix(in srgb, var(--color-gold) 20%, transparent)',
                 }}
                 variants={panelVariants}
                 initial={shouldReduceMotion ? false : 'hidden'}
                 whileInView={shouldReduceMotion ? undefined : 'visible'}
                 viewport={{ once: true, margin: '-15% 0px -15% 0px' }}
               >
                 <Icon className="h-6 w-6 text-(--color-gold)" aria-hidden="true" strokeWidth={1.6} />
                 <h3 className="mt-5 text-base font-bold text-(--color-gold-light) [font-family:var(--font-playfair)]">
                   {card.title}
                 </h3>
                 <p className="mt-3 text-sm leading-relaxed text-(--color-text-secondary) [font-family:var(--font-inter)]">
                   {card.description}
                 </p>
               </motion.div>
             )
           })}
         </div>
       </section>
 
       {/* SECCIÓN 4 — Drivers */}
       <section
         className="border-y py-20"
         style={{
           borderColor: 'color-mix(in srgb, var(--color-gold) 12%, transparent)',
           background: 'linear-gradient(180deg, color-mix(in srgb, var(--color-gold) 5%, transparent), transparent)',
         }}
       >
         <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 sm:px-6 md:grid-cols-3">
           {[
             { n: '01', title: 'CAMBIO CULTURAL', body: 'Mayor demanda de experiencias discretas, premium y orientadas a bienestar.' },
             { n: '02', title: 'ECONOMÍA DE LA EXPERIENCIA', body: 'Preferencia por vivencias con diseño, narrativa y exclusividad.' },
             { n: '03', title: 'VENTAJA DE CATEGORÍA', body: 'Propuesta diferenciada con potencial de estandarización y expansión.' },
           ].map((item) => (
             <div key={item.n} className="text-center md:px-6">
               <div className="text-4xl text-(--color-gold)/40 [font-family:var(--font-playfair)]">{item.n}</div>
               <div className="mt-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-white [font-family:var(--font-jetbrains)]">
                 {item.title}
               </div>
               <p className="mx-auto mt-3 max-w-sm text-pretty text-sm leading-relaxed text-(--color-text-secondary) [font-family:var(--font-inter)]">
                 {item.body}
               </p>
             </div>
           ))}
         </div>
       </section>
 
       {/* SECCIÓN 5 — Formulario de contacto */}
       <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6" id="contacto">
         <div className="text-center">
           <h2 className="text-3xl font-semibold text-white [font-family:var(--font-playfair)] sm:text-4xl">Contacto</h2>
           <p className="mx-auto mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-(--color-text-secondary) [font-family:var(--font-inter)] sm:text-base">
             Acceso solo para inversores acreditados. Sin sobreexposición: lo mínimo necesario, con la máxima discreción.
           </p>
         </div>
 
         <div
           className="mt-10 rounded-3xl border p-8 sm:p-10"
           style={{
             borderColor: 'color-mix(in srgb, var(--color-gold) 20%, transparent)',
             background: 'var(--color-bg-elevated)',
           }}
         >
           <AnimatePresence mode="wait">
             {submitted ? (
               <motion.div
                 key="submitted"
                 variants={panelVariants}
                 initial={shouldReduceMotion ? false : 'hidden'}
                 animate={shouldReduceMotion ? undefined : 'visible'}
                 className="flex flex-col items-center justify-center gap-3 py-12 text-center"
               >
                 <CheckCircle2 className="h-10 w-10 text-(--color-gold-light)" aria-hidden="true" />
                 <p className="text-sm font-semibold text-white [font-family:var(--font-playfair)]">Responderemos con discreción.</p>
                 <p className="max-w-md text-sm text-(--color-text-secondary) [font-family:var(--font-inter)]">
                   Gracias. Compartimos material únicamente bajo solicitud.
                 </p>
               </motion.div>
             ) : (
               <motion.form
                 key="form"
                 className="space-y-6"
                 onSubmit={handleSubmit}
                 variants={panelVariants}
                 initial={shouldReduceMotion ? false : 'hidden'}
                 animate={shouldReduceMotion ? undefined : 'visible'}
               >
                 <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                   <div>
                     <label className="mb-1 block text-[9px] uppercase tracking-[0.22em] text-(--color-text-muted) [font-family:var(--font-jetbrains)]" htmlFor="nombre">
                       Nombre completo
                     </label>
                     <input
                       id="nombre"
                       value={formState.nombre}
                       onChange={(e) => setFormState((s) => ({ ...s, nombre: e.target.value }))}
                       type="text"
                       required
                       className="w-full bg-transparent py-2 text-sm text-white outline-none [font-family:var(--font-inter)]"
                       style={{ borderBottom: '1px solid color-mix(in srgb, var(--color-gold) 30%, transparent)' }}
                     />
                   </div>
                   <div>
                     <label className="mb-1 block text-[9px] uppercase tracking-[0.22em] text-(--color-text-muted) [font-family:var(--font-jetbrains)]" htmlFor="email">
                       Email profesional
                     </label>
                     <input
                       id="email"
                       value={formState.email}
                       onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
                       type="email"
                       required
                       className="w-full bg-transparent py-2 text-sm text-white outline-none [font-family:var(--font-inter)]"
                       style={{ borderBottom: '1px solid color-mix(in srgb, var(--color-gold) 30%, transparent)' }}
                     />
                   </div>
                 </div>
 
                 <div className='flex flex-col gap-4'>
                   <label className="mb-1 block text-[9px] uppercase tracking-[0.22em] text-(--color-text-muted) [font-family:var(--font-jetbrains)]">
                     Perfil de inversor
                   </label>
                   <div className="flex flex-wrap gap-2">
                     {(
                       [
                         { id: 'family-office', label: 'FAMILY OFFICE' },
                         { id: 'angel', label: 'ÁNGEL' },
                         { id: 'strategic', label: 'ESTRATÉGICO' },
                         { id: 'otro', label: 'OTRO' },
                       ] as const
                     ).map((opt) => {
                       const active = opt.id === formState.profile
                       return (
                         <button
                           key={opt.id}
                           type="button"
                           onClick={() => setFormState((s) => ({ ...s, profile: opt.id }))}
                           className={cn(
                             'rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.22em] transition-[border-color,background-color,color] [font-family:var(--font-jetbrains)]',
                             active ? 'text-(--color-gold-light)' : 'text-(--color-text-muted) hover:text-white',
                           )}
                           style={{
                             borderColor: active ? 'var(--color-gold)' : 'color-mix(in srgb, var(--color-gold) 30%, transparent)',
                             background: active ? 'color-mix(in srgb, var(--color-gold) 10%, transparent)' : 'transparent',
                           }}
                           aria-pressed={active}
                         >
                           {opt.label}
                         </button>
                       )
                     })}
                   </div>
                   {/* <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-(--color-text-muted) [font-family:var(--font-jetbrains)]">
                     {profileLabel}
                   </p> */}
                 </div>
 
                 <div>
                   <label className="mb-1 block text-[9px] uppercase tracking-[0.22em] text-(--color-text-muted) [font-family:var(--font-jetbrains)]" htmlFor="mensaje">
                     Mensaje
                   </label>
                   <textarea
                     id="mensaje"
                     value={formState.mensaje}
                     onChange={(e) => setFormState((s) => ({ ...s, mensaje: e.target.value }))}
                     rows={4}
                     className="w-full bg-transparent py-2 text-sm text-white outline-none [font-family:var(--font-inter)]"
                     style={{ borderBottom: '1px solid color-mix(in srgb, var(--color-gold) 30%, transparent)' }}
                   />
                 </div>
 
                 <button
                   type="submit"
                   className="inline-flex w-full items-center justify-center rounded-full border px-7 py-3 text-[11px] font-bold uppercase tracking-[0.22em] text-(--color-gold-light) [font-family:var(--font-jetbrains)] sm:w-auto"
                   style={{ borderColor: 'var(--color-gold)' }}
                 >
                   INICIAR CONVERSACIÓN
                 </button>
  
                 <p className="flex items-center gap-2 text-[9px] uppercase tracking-[0.22em] text-(--color-text-muted) [font-family:var(--font-jetbrains)]">
                   <LockKeyhole className="h-4 w-4 text-(--color-gold)" aria-hidden="true" />
                   CONFIDENCIAL · COMPARTIMOS MATERIAL SOLO BAJO SOLICITUD
                 </p>
               </motion.form>
             )}
           </AnimatePresence>
         </div>
       </section>

       <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6" id="franquicia-form">
         <h2 className="text-3xl font-semibold text-white [font-family:var(--font-playfair)]">Solicitar información</h2>
         <p className="mt-4 font-(--font-inter) text-sm text-(--color-text-secondary)">
           Rellena el formulario y nos ponemos en contacto contigo con total discreción.
         </p>

         <motion.div
           className="mt-10 rounded-3xl border p-8 sm:p-10"
           style={{
             borderColor: 'color-mix(in srgb, var(--color-gold) 20%, transparent)',
             background: 'var(--color-bg-elevated)',
           }}
           variants={panelVariants}
           initial={shouldReduceMotion ? false : 'hidden'}
           whileInView={shouldReduceMotion ? undefined : 'visible'}
           viewport={{ once: true, margin: '-15% 0px -15% 0px' }}
         >
           <AnimatePresence mode="wait">
             {franquiciaSubmitted ? (
               <motion.div
                 key="franquicia-submitted"
                 variants={panelVariants}
                 initial={shouldReduceMotion ? false : 'hidden'}
                 animate={shouldReduceMotion ? undefined : 'visible'}
                 className="flex flex-col items-center justify-center gap-3 py-12 text-center"
               >
                 <CheckCircle2 className="h-10 w-10 text-(--color-gold-light)" aria-hidden="true" />
                 <p className="text-sm font-semibold text-white [font-family:var(--font-playfair)]">Responderemos con discreción.</p>
                 <p className="max-w-md text-sm text-(--color-text-secondary) [font-family:var(--font-inter)]">
                   Gracias por tu interés en abrir un Eroscape.
                 </p>
               </motion.div>
             ) : (
               <motion.form
                 key="franquicia-form"
                 className="space-y-6"
                 onSubmit={handleFranquiciaSubmit}
                 variants={panelVariants}
                 initial={shouldReduceMotion ? false : 'hidden'}
                 animate={shouldReduceMotion ? undefined : 'visible'}
               >
                 <motion.div>
                   <label
                     className="mb-1 block text-[9px] uppercase tracking-[0.22em] text-(--color-text-muted) [font-family:var(--font-jetbrains)]"
                     htmlFor="franquicia-nombre"
                   >
                     Nombre / empresa
                   </label>
                   <input
                     id="franquicia-nombre"
                     value={franquiciaForm.nombre}
                     onChange={(e) => setFranquiciaForm((s) => ({ ...s, nombre: e.target.value }))}
                     type="text"
                     required
                     className="w-full bg-transparent py-2 text-sm text-white outline-none [font-family:var(--font-inter)]"
                     style={{ borderBottom: '1px solid color-mix(in srgb, var(--color-gold) 30%, transparent)' }}
                   />
                 </motion.div>

                 <motion.div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                   <motion.div>
                     <label
                       className="mb-1 block text-[9px] uppercase tracking-[0.22em] text-(--color-text-muted) [font-family:var(--font-jetbrains)]"
                       htmlFor="franquicia-email"
                     >
                       Correo
                     </label>
                     <input
                       id="franquicia-email"
                       value={franquiciaForm.email}
                       onChange={(e) => setFranquiciaForm((s) => ({ ...s, email: e.target.value }))}
                       type="email"
                       required
                       className="w-full bg-transparent py-2 text-sm text-white outline-none [font-family:var(--font-inter)]"
                       style={{ borderBottom: '1px solid color-mix(in srgb, var(--color-gold) 30%, transparent)' }}
                     />
                   </motion.div>
                   <motion.div>
                     <label
                       className="mb-1 block text-[9px] uppercase tracking-[0.22em] text-(--color-text-muted) [font-family:var(--font-jetbrains)]"
                       htmlFor="franquicia-telefono"
                     >
                       Teléfono
                     </label>
                     <input
                       id="franquicia-telefono"
                       value={franquiciaForm.telefono}
                       onChange={(e) => setFranquiciaForm((s) => ({ ...s, telefono: e.target.value }))}
                       type="tel"
                       required
                       className="w-full bg-transparent py-2 text-sm text-white outline-none [font-family:var(--font-inter)]"
                       style={{ borderBottom: '1px solid color-mix(in srgb, var(--color-gold) 30%, transparent)' }}
                     />
                   </motion.div>
                 </motion.div>

                 <motion.div>
                   <label
                     className="mb-1 block text-[9px] uppercase tracking-[0.22em] text-(--color-text-muted) [font-family:var(--font-jetbrains)]"
                     htmlFor="franquicia-mensaje"
                   >
                     Mensaje
                   </label>
                   <textarea
                     id="franquicia-mensaje"
                     value={franquiciaForm.mensaje}
                     onChange={(e) => setFranquiciaForm((s) => ({ ...s, mensaje: e.target.value }))}
                     rows={4}
                     className="w-full bg-transparent py-2 text-sm text-white outline-none [font-family:var(--font-inter)]"
                     style={{ borderBottom: '1px solid color-mix(in srgb, var(--color-gold) 30%, transparent)' }}
                   />
                 </motion.div>

                 <button
                   type="submit"
                   className="inline-flex w-full items-center justify-center rounded-full border px-7 py-3 text-[11px] font-bold uppercase tracking-[0.22em] text-(--color-gold-light) [font-family:var(--font-jetbrains)] sm:w-auto"
                   style={{ borderColor: 'var(--color-gold)' }}
                 >
                   SOLICITAR INFORMACIÓN
                 </button>
               </motion.form>
             )}
           </AnimatePresence>
         </motion.div>
       </section>
     </main>
   )
 }

