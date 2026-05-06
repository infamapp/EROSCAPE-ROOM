# EROSCAPE — Prompts de Rediseño Completo v2.0
> Documento generado para Cursor Pro · Stack: Next.js 16 · React 19 · TypeScript 5 strict · Tailwind CSS v4 · Framer Motion · Lucide React  
> Leer siempre junto a: `DESIGN_SYSTEM_COMPACT.md` · `PAGES.md` · `ErosCopy.json`

---

## ÍNDICE

1. [Tokens y reglas globales de coherencia](#0-tokens-y-reglas-globales)
2. [HOME `/`](#1-home)
3. [EXPERIENCIAS `/experiencias`](#2-experiencias)
4. [DETALLE EXPERIENCIA `/experiencias/[ciudad]/[sala]`](#3-detalle-experiencia)
5. [RESERVAR `/reservar`](#4-reservar-flujo-completo)
6. [LA SOCIEDAD / SEGURIDAD `/la-sociedad` y `/la-sociedad/seguridad`](#5-la-sociedad--seguridad)
7. [EL TOCADOR (Boutique) `/boutique`](#6-el-tocador-boutique)
8. [EL CLUB `/el-club`](#7-el-club)
9. [LA APP `/app-movil`](#8-la-app)
10. [FAQ `/FAQ`](#9-faq)
11. [INVERSORES `/inversores`](#10-inversores)
12. [DASHBOARD POST-RESERVA `/mi-reserva/[id]`](#11-dashboard-post-reserva)
13. [CHROME: Navbar y Footer](#12-chrome-navbar--footer)

---

## 0. TOKENS Y REGLAS GLOBALES

> **Incluir este bloque al inicio de CUALQUIER prompt de rediseño.**  
> No hace falta re-explicar el DS — solo pegar esta sección como contexto.

### Regla maestra de coherencia entre páginas

Todas las páginas comparten los mismos cuatro pilares visuales, SIN excepciones:

| Pilar | Regla |
|---|---|
| **Fondos** | Siempre `var(--color-bg-base)` para body, `var(--color-bg-elevated)` para cards, `var(--color-bg-subtle)` para bandas separadoras |
| **Acentos** | Magenta (`--color-magenta`) para CTAs y activos; dorado (`--color-gold`) solo para rareza/premium/inversores |
| **Tipografía** | Playfair para H1/H2/H3, Cormorant para títulos éditoriales itálicos, Inter para body, JetBrains para eyebrows/monospace/terminal |
| **Animaciones** | Easing `[0.25, 0.46, 0.45, 0.94]` en todo; `useReducedMotion()` obligatorio; variants FUERA del componente |

### Eyebrow canónico (copiar literal)
```tsx
<p className="font-(--font-jetbrains) text-[10px] uppercase tracking-[0.22em] text-(--color-text-muted) sm:text-[11px]">
  {eyebrow}
</p>
```

### H1 canónico hero
```tsx
<h1 className="[font-family:var(--font-playfair)] font-bold tracking-[0.04em] text-(--color-text-primary) text-[clamp(2rem,5vw,3.25rem)]">
  {title}
</h1>
```

### Surface card canónica
```tsx
<div className="rounded-2xl border-(--border-subtle) bg-(--color-bg-elevated) [box-shadow:var(--glow-card)] p-6">
```

### CTA principal canónico
```tsx
<Link
  href="/reservar"
  className="rounded-full px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] font-(--font-jetbrains) text-white transition-[filter,transform] duration-200 hover:brightness-110 active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
  style={{ background: 'var(--gradient-cta)' }}
>
  RENDIRSE AL DESEO
</Link>
```

### Divider band canónico
```tsx
<div className="relative border-y border-[color-mix(in_srgb,var(--color-magenta-dim)_35%,transparent)] bg-(--color-bg-subtle)/50 py-20 sm:py-24">
  <div
    className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-70"
    style={{ background: 'linear-gradient(90deg, transparent, rgba(185,48,158,0.35), rgba(232,160,64,0.25), transparent)' }}
    aria-hidden="true"
  />
```

### Prohibido (nunca en JSX)
- ❌ Hex hardcodeados (excepciones: `Step4Legal` para wax seal `#8b0000`, Stripe Elements, QR canvas)
- ❌ `font-serif` o `font-[var(--font-playfair)]` — usar el patrón v4 `[font-family:var(--font-playfair)]`
- ❌ `setTimeout` para animar — usar Framer Motion
- ❌ `any` en TypeScript
- ❌ Texto "agente", "operación", "misión", "protocolo" en copy de cara al usuario (ver tabla DESIGN_SYSTEM_COMPACT § 4)
- ❌ Default exports salvo `page.tsx`

---

## 1. HOME

**Archivo**: `src/app/page.tsx` + componentes en `src/components/sections/`  
**Intent**: Entrada al funnel; describir TODO lo que ofrece Eroscape y llevar al usuario a `/reservar` o `/experiencias` en ≤3 scrolls.  
**Layout**: Server component con secciones client internas.  
**Estado actual**: Producción — rediseño total con gamificación v2 + mayor contenido descriptivo.

### Diagnóstico del estado actual
- Hero efectivo pero le falta la capa "Lo que nadie más te dice" como segunda sección
- Falta sección de "Cómo funciona" (5 pasos narrativos) — crítica para reducir fricción
- Mapa SVG de España es impactante pero pesado; refactorizar con lazy load
- Falta teaser de La Sociedad / El Club
- Falta prueba social básica (testimonios)
- No hay separación de oferta para inversores (solo CTA discreto en footer)

---

### PROMPT HOME — SECCIÓN 1: HeroSection

```
# Prompt: HeroSection.tsx — Rediseño v2

## Contexto
Soy Cursor Pro construyendo la página home de Eroscape (escape room erótico premium).
Adjunto DESIGN_SYSTEM_COMPACT.md. Seguir sus tokens sin excepción.

## Archivo de salida
src/components/sections/HeroSection.tsx

## Directiva 'use client'
Sí — usa useEffect, useRef, useReducedMotion, custom hooks.

## Props
```typescript
interface HeroSectionProps {
  isReturningUser?: boolean  // si existe cookie 'eroscape_visited', mostrar mensaje de bienvenida
}
```

## Estructura visual (top → bottom)
1. ParticleField fondo (componente existente, ver abajo)
2. Texto hero centrado con parallax suave
3. CTAs
4. Scroll indicator terminal

## Especificaciones detalladas

### Parallax engine
- useRef para mouse position; requestAnimationFrame para suavizar
- 3 capas: fondo sólido (estático), partículas (speed 0.02x), texto (speed 0.04x)
- Mobile: deshabilitar parallax (usar static gradient)
- Cleanup en unmount

### Texto hero
Eyebrow: "TECNOLOGÍA DEL PLACER" — ver patrón eyebrow canónico
H1: "El primer Escape Room Erótico del mundo"
  — [font-family:var(--font-playfair)] font-bold italic
  — tamaño: clamp(2.5rem, 6vw, 4rem)
  — animación typewriter: carácter a carácter, 50ms/char, empieza 600ms después del mount
  — cursor parpadeante "|" en magenta al final, desaparece a los 3s
  — RESPETAR useReducedMotion: si activo, mostrar texto directo sin typewriter
Subtexto terminal (JetBrains Mono, color --color-purple-muted):
  — líneas que aparecen una a una con 400ms de delay entre ellas:
    Line 1: "> Acceso nivel +18. Verificando..."
    Line 2: "> Consentimiento: REQUERIDO"
    Line 3: "> Iniciando protocolo de inmersión..."

### Toast de bienvenida (returningUser)
- Solo si isReturningUser === true
- Aparece top-right: "Ya te esperábamos." en JetBrains Mono
- bg-[var(--color-bg-elevated)] border border-[var(--color-magenta-dim)] rounded-xl px-4 py-2
- Framer Motion: opacity 0→1 a los 1.2s, desaparece a los 4s
- Nunca bloquea el flujo; es informativo

### CTAs
CTA primario: "RENDIRSE AL DESEO" → /reservar (patrón canónico)
CTA secundario ghost: "ELEGÍ TU NOCHE" → #experiencias-destacadas (scroll suave)
  — border border-[var(--color-magenta-dim)] text-[var(--color-text-secondary)]
  — hover: border-[var(--color-magenta)] text-white
Ambos entran con stagger delay 2.5s (después del typewriter)

### Scroll indicator
Texto: "> scroll_para_continuar()" en JetBrains Mono, tamaño 10px, color --color-text-muted
Framer Motion: bounce infinito vertical (y: 0 → 8 → 0), duration 1.5s
Desaparece en el primer evento scroll (removeEventListener en cleanup)

### Imagen/video de fondo
- <Image> con fill, objectFit cover, quality 85, priority
- Gradient overlay encima: bg-gradient-to-b from-[var(--color-bg-base)]/20 via-transparent to-[var(--color-bg-base)]
- Si no hay imagen: radial gradient magenta/púrpura desde --gradient-hero

## Animaciones (variants fuera del componente)
```typescript
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } }
}
const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] } }
}
```

## Cookie returning user
```typescript
// En useEffect al montar:
const visited = localStorage.getItem('eroscape_visited')
if (!visited) {
  setTimeout(() => localStorage.setItem('eroscape_visited', 'true'), 5000)
}
```

## TypeScript
- Sin any
- Tipos explícitos para refs y estado
- 'use client' en línea 1
```

---

### PROMPT HOME — SECCIÓN 2: ConceptSection ("Lo que nadie más te dice")

```
# Prompt: ConceptSection.tsx — Rediseño v2

## Contexto
Sección inmediatamente bajo el hero. Destruye la barrera vergüenza/miedo con 5 pilares.
Adjunto DESIGN_SYSTEM_COMPACT.md.

## Archivo de salida
src/components/sections/ConceptSection.tsx

## Directiva 'use client'
Sí — usa whileInView.

## Estructura visual

### Header de sección
Eyebrow: "LO QUE NADIE MÁS TE DICE" — patrón eyebrow canónico
H2: Tipografía Cormorant italic, tamaño text-3xl sm:text-4xl
   Texto: "Cinco verdades sobre esta noche"
Body lead: Inter, text-(--color-text-secondary), max-w-2xl mx-auto text-center

### Grid de 5 cards (DossierCard)
Crear componente interno DossierCard con props:
```typescript
interface DossierCardProps {
  archiveNumber: string   // "ARCH-001" hasta "ARCH-005"
  icon: LucideIcon
  title: string
  description: string
  initialRotation: number  // -1.5 a +1.5 grados, único por card
}
```

Contenido de las 5 cards:
1. archiveNumber: "ARCH-001" · icon: BookOpen · title: "Todo tiene una historia" · desc: "Cada sala es un universo narrativo construido a medida. No improvisamos — orquestamos."
2. archiveNumber: "ARCH-002" · icon: Flame · title: "Sin necesidad de ser explícito" · desc: "El erotismo más poderoso vive en la insinuación. La tensión es el juego."
3. archiveNumber: "ARCH-003" · icon: Brain · title: "El Maestro te conoce" · desc: "Nuestra IA procesa tus preferencias antes de que entres. La experiencia ya está calibrada para ti."
4. archiveNumber: "ARCH-004" · icon: Shield · title: "Tú tienes el control, siempre" · desc: "Una palabra detiene todo. Sin preguntas. Sin juicios. El control es tuyo, siempre."
5. archiveNumber: "ARCH-005" · icon: EyeOff · title: "Lo que pasa aquí, se queda aquí" · desc: "Sin grabaciones. Sin historial. Sin datos innecesarios. La discreción es parte del ritual."

### Diseño de DossierCard
- bg-(--color-bg-elevated) rounded-2xl border-(--border-subtle) p-6
- [box-shadow:var(--glow-card)]
- Top-left: badge "archiveNumber" en JetBrains Mono text-[9px] text-(--color-text-muted) uppercase tracking-[0.2em]
- Icono Lucide 24px color --color-magenta mb-3
- Título H3: [font-family:var(--font-playfair)] font-bold text-lg text-(--color-text-primary)
- Descripción: Inter text-sm leading-relaxed text-(--color-text-secondary)
- Border color: initial rgba(185,48,158,0.1); hover: rgba(185,48,158,0.4)
- Transition: border-color 0.2s

### Grid layout
Desktop: primera fila 3 cards, segunda fila 2 cards centradas (masonry-feel)
Mobile: columna única
Implementar con CSS grid: grid-cols-1 sm:grid-cols-2 lg:grid-cols-3

### Animación de entrada de cards (whileInView)
```typescript
const cardVariants = {
  hidden: { opacity: 0, rotate: initialRotation, y: 40 },
  visible: (rotation: number) => ({
    opacity: 1,
    rotate: rotation * 0.5,  // mantiene leve inclinación residual
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
  })
}
```
viewport: { once: true, margin: '-20%' }
staggerChildren: 0.1

### CTA al pie
Texto: "→ Ver las experiencias" → href="#experiencias-destacadas" (scroll suave)
Estilo ghost, centered
```

---

### PROMPT HOME — SECCIÓN 3: ExperienciasHomeFeatured

```
# Prompt: ExperienciasHomeFeatured.tsx — Rediseño v2

## Contexto
Sección "Experiencias destacadas" en la home. Combina selector de ciudad + grid de 3 cards featured.
Adjunto DESIGN_SYSTEM_COMPACT.md.

## Archivo de salida
src/components/sections/ExperienciasHomeFeatured.tsx

## Directiva 'use client'
Sí — gestiona estado activeCity.

## Props
```typescript
interface ExperienciasHomeFeaturedProps {
  id?: string  // para scroll desde CTA hero: id="experiencias-destacadas"
}
```

## Sub-secciones

### A. Selector de ciudad (SpainCitySelector)
Componente interno. NO usar el mapa SVG complejo.
Implementar como row de pills:
- Cities: Madrid · Barcelona · Valencia · Sevilla · Bilbao
- Pill style inactivo: border-(--border-subtle) bg-transparent text-(--color-text-muted) rounded-full px-4 py-1.5 text-xs font-(--font-jetbrains) uppercase tracking-[0.15em]
- Pill activo: style={{ background: 'var(--gradient-cta)' }} text-white
- Cada pill tiene un punto pulsante (Framer Motion scale 1→1.4→1, infinite, 2s) en magenta a su izquierda cuando está activo

### B. Grid de 3 ExperienceCard featured
Componente HomeFeaturedCard con props:
```typescript
interface HomeFeaturedCardProps {
  title: string
  teaser: string
  intensity: 'ALPHA' | 'BETA' | 'OMEGA'
  durationMin: number
  priceFrom: number
  city: string
  slug: string
  imageSrc?: string
}
```

Diseño de la card:
- rounded-2xl overflow-hidden border-(--border-subtle) [box-shadow:var(--glow-card)]
- Imagen superior: 200px altura, objectFit cover, gradient overlay en bottom
  gradient: linear-gradient(to bottom, transparent 40%, var(--color-bg-base) 100%)
- Badge intensidad (arriba izquierda sobre imagen):
  ALPHA: bg-[rgba(59,130,246,0.2)] text-[var(--color-intensity-alpha)] border border-[var(--color-intensity-alpha)]/40
  BETA:  bg-[rgba(245,158,11,0.2)] text-[var(--color-intensity-beta)] border border-[var(--color-intensity-beta)]/40
  OMEGA: bg-[rgba(185,48,158,0.2)] text-[var(--color-intensity-omega)] border border-[var(--color-intensity-omega)]/40
  Texto: JetBrains Mono text-[9px] uppercase tracking-[0.15em] px-2 py-0.5 rounded-full
  Valor display: "DESPERTAR · Suave" / "INTENSO · Sin frenos" / "SIN LÍMITES · Todo permitido"
- Body de la card: bg-(--color-bg-elevated) p-5
  H3: [font-family:var(--font-playfair)] text-lg font-bold
  Teaser: Inter text-sm text-(--color-text-secondary) line-clamp-2 mt-1
  Footer de card: flex justify-between items-center mt-4
    Izquierda: duración + capacidad (Lucide Clock + Users, text-xs text-(--color-text-muted))
    Derecha: "Desde €X" en [var(--color-gold-light)] font-semibold text-sm
- CTA: "VER ESTA EXPERIENCIA →" full-width mt-3, ghost con border-(--color-magenta-dim)
  hover: bg-(--color-magenta)/10 border-(--color-magenta)
- Hover en card: translateY -6px transition-transform duration-300

### C. AnimatePresence en cambio de ciudad
- Cuando cambia activeCity: grid hace fade-out/fade-in con key={activeCity}
- Stagger 0.08s entre las 3 cards al entrar

### D. CTA global al pie
"Ver catálogo completo →" → href="/experiencias"
Estilo: ghost, centered, max-w-xs mx-auto

### E. Header de sección
Eyebrow: "EXPERIENCIAS DESTACADAS" — patrón canónico
H2: "Tres noches para despertar el apetito"
Body: text-(--color-text-secondary) text-sm max-w-2xl mx-auto text-center

## Datos mock (mientras no hay fetch real)
Exportar const FEATURED_EXPERIENCES en src/lib/featured-experiences.ts con 5 entries por ciudad (15 total).
Mostrar solo las del activeCity.
```

---

### PROMPT HOME — SECCIÓN 4: ComoFuncionaSection

```
# Prompt: ComoFuncionaSection.tsx — Rediseño v2

## Contexto
5 pasos narrativos del flujo de reserva. Reduce fricción explicando el proceso antes de que el usuario lo visite.
Adjunto DESIGN_SYSTEM_COMPACT.md.

## Archivo de salida
src/components/sections/ComoFuncionaSection.tsx

## Directiva 'use client'
Sí — animación de línea de progreso y step reveal.

## Estructura

### Header
Eyebrow: "EL RITUAL"
H2: "¿Cómo funciona una noche en Eroscape?"
Body: "Cinco momentos que transforman una reserva en una experiencia."

### Timeline de 5 pasos
Datos de los pasos (hardcoded en el componente):
```typescript
const STEPS = [
  { act: 'I', label: 'EL ENCUENTRO', icon: Compass, desc: 'Elegís la experiencia y la ciudad. El universo se prepara para vosotros.' },
  { act: 'II', label: 'TUS DESEOS', icon: SlidersHorizontal, desc: 'Nos contás con quién venís y hasta dónde queréis llegar. Sin presión.' },
  { act: 'III', label: 'TU BAÚL', icon: Package, desc: 'Personalizás la noche con extras que elevan cada detalle.' },
  { act: 'IV', label: 'EL JURAMENTO', icon: PenLine, desc: 'Confirmás tus límites y elegís tu palabra mágica. El control es tuyo.' },
  { act: 'V', label: 'LAS PUERTAS SE ABREN', icon: Unlock, desc: 'La noche es vuestra. El resto es historia.' },
]
```

### Layout desktop: horizontal timeline
- Flex row con justify-between
- Línea conectora (div h-px) entre los steps
  width animado de 0 a 100% con Framer Motion `useInView` + `animate({ width: '100%' })`
  color: linear-gradient de --color-magenta-dim a --color-magenta
- Cada nodo: círculo 48px con borde magenta, número del acto en romano (JetBrains Mono)
  Activo al entrar al viewport: bg-(--gradient-cta), scale 1.1, glow-magenta
- Bajo cada nodo: label + descripción (centrado, max-w-32)
- stagger: 0.15s entre nodos

### Layout mobile: vertical timeline
- Columna con línea vertical izquierda (w-px bg-(--color-magenta-dim))
- Cada row: círculo + label + descripción en horizontal
- El círculo tiene línea vertical a su izquierda

### CTA al pie
"[ EMPEZAR AHORA ]" → /reservar (CTA primario canónico)
Centered, mt-12

## Importante
En mobile y desktop: cuando la sección entra en viewport, los 5 steps se revelan con stagger.
La línea de progreso animada es deseable pero si `useReducedMotion`, mostrar línea estática.
```

---

### PROMPT HOME — SECCIÓN 5: CtaHelpSection

```
# Prompt: CtaHelpSection.tsx — Rediseño v2

## Contexto
Sección penúltima de la home. Dos calls-to-action con propósitos distintos: ayuda para elegir y acceso al club.
Adjunto DESIGN_SYSTEM_COMPACT.md.

## Archivo de salida
src/components/sections/CtaHelpSection.tsx

## Directiva 'use client'
No — server component.

## Layout
Divider band canónico (ver bloque global)
Dentro: dos cards side-by-side en desktop, stack en mobile

### Card izquierda — "¿No sabés cuál elegir?"
bg: var(--gradient-help-cta-card)
border-(--border-subtle) rounded-2xl p-8
Eyebrow: "EL MAESTRO SUGIERE"
H3: "¿No sabés cuál elegir?"
Body: "Contestás un par de preguntas y te recomendamos la experiencia perfecta para vos."
CTA: "AYUDAME A ELEGIR" → /reservar (primario canónico)

### Card derecha — La Sociedad teaser
bg-(--color-bg-elevated) border-(--border-gold) [box-shadow:var(--glow-gold)] rounded-2xl p-8
Eyebrow: "PARA LOS QUE QUIEREN MÁS"
H3: "La Sociedad"
Body: "Acceso anticipado, eventos privados y una comunidad que entiende el placer como vos."
CTA: "DESCUBRIR LA SOCIEDAD" → /la-sociedad (ghost con border-gold)
  style: border: var(--border-gold); color: var(--color-gold-light)

## Animaciones
whileInView, viewport once, stagger 0.1s entre las dos cards
```

---

## 2. EXPERIENCIAS

**Archivo**: `src/app/(public)/experiencias/page.tsx` + `src/components/experiencias/`  
**Intent**: Catálogo interactivo; filtra y deriva al detalle de cada sala.  
**Layout**: `'use client'`

---

### PROMPT EXPERIENCIAS — Catálogo completo

```
# Prompt: /experiencias — Rediseño completo v2

## Contexto
Página de catálogo de Eroscape. Filtros por ciudad e intensidad. Grid de experiencias.
Adjunto DESIGN_SYSTEM_COMPACT.md y sección /experiencias de PAGES.md.

## Archivos de salida
src/app/(public)/experiencias/page.tsx  — server wrapper + metadata
src/components/experiencias/ExperienciasPage.tsx  — 'use client', lógica completa
src/components/experiencias/CatalogExperienceCard.tsx  — card del catálogo
src/components/experiencias/IntensityModeCard.tsx  — card de modo

## Estructura de la página (top → bottom)

### 1. Hero del catálogo
Eyebrow: "CATÁLOGO"
H1: "ELEGÍ TU NOCHE" — [font-family:var(--font-playfair)] font-bold text-5xl sm:text-6xl
  color: var(--gradient-cta) como text gradient (background-clip: text; -webkit-background-clip: text; color: transparent)
Body: "Dos decisiones te separan del deseo. Primero, elegí cómo jugás. Después, elegí dónde."
whileInView fade+up, once.

### 2. Sección "Las Reglas del Juego" (4 IntensityModeCard)
Eyebrow: "LA INTENSIDAD"
H2: "Las reglas del juego"
Body: "Elegí el modo que mejor define tu noche. Todo sucede con discreción, cuidado y consentimiento."

IntensityModeCard props:
```typescript
interface IntensityModeCardProps {
  title: string
  description: string
  isSelected?: boolean
  onClick?: () => void
}
```

Los 4 modos (hardcoded):
1. title: "Lovers" · desc: "Para parejas que quieren reconectarse, jugar y volver a mirarse distinto. Complicidad, tensión suave y un final cuidado."
2. title: "Plan Golfo" · desc: "Para amigos con tensión, rolletes o parejas aventureras. Risas nerviosas, adrenalina y decisiones rápidas."
3. title: "Libertino" · desc: "Para mentes muy abiertas. Tres niveles de intensidad hacia una exploración total, siempre consensuada."
4. title: "El Secreto" · desc: "No desvelamos pruebas ni recorrido. El misterio es parte del placer: entrás sin mapa, salís con historia."

Diseño IntensityModeCard:
- rounded-2xl p-5 border-(--border-subtle) bg-(--color-bg-elevated)
- Eyebrow arriba: "LAS REGLAS DEL JUEGO" en JetBrains
- H3 Playfair text-xl
- Descripción Inter text-sm
- NO tiene CTA interno — es solo informativa/decorativa
- whileInView stagger

### 3. Divider band: "EL ESCENARIO."
Texto centrado: "AHORA ELEGÍ TU ESCENARIO" eyebrow + H2 "EL ESCENARIO." en Playfair bold enorme
Body: "Cada sala es un universo irrepetible."
Usar patrón divider band canónico.

### 4. Filtros (sticky en desktop)
Tab de ciudades: MADRID · BARCELONA · VALENCIA · SEVILLA · BILBAO
  — underline activo magenta, transition 0.2s
Pills de intensidad: TODAS · ALPHA · BETA · OMEGA
  — Pill activo: bg-(--gradient-cta) text-white
  — Inactivo: border-(--border-subtle) text-(--color-text-muted)
  — Layout: Eyebrow "INTENSIDAD" + row de pills
En mobile: sticky top-[64px] (debajo del navbar) con backdrop-blur-md bg-(--color-bg-base)/80

### 5. Grid de CatalogExperienceCard
3 columnas desktop, 1 columna mobile.
AnimatePresence key={activeCity + activeIntensity} para animar cambio de filtros.
Stagger 0.06s entre cards.

CatalogExperienceCard props:
```typescript
interface CatalogExperienceCardProps {
  title: string
  teaser: string
  intensity: 'ALPHA' | 'BETA' | 'OMEGA'
  durationMin: number
  capacity: number
  priceFrom: number
  city: string
  slug: string
  availability: 'disponible' | 'pocas-plazas' | 'agotado'
  imageSrc?: string
}
```

Diseño CatalogExperienceCard:
- rounded-2xl overflow-hidden border-(--border-subtle) bg-(--color-bg-elevated) [box-shadow:var(--glow-card)]
- hover: translateY -6px, border-color -> --color-magenta (transition 0.25s)
- Imagen: 220px height, gradient overlay bottom
- Badge disponibilidad (top-right sobre imagen):
  'disponible': bg-green-900/40 text-green-400 border border-green-400/30 → "DISPONIBLE"
  'pocas-plazas': bg-amber-900/40 text-amber-400 border border-amber-400/30 → "POCAS PLAZAS"
  'agotado': bg-red-900/40 text-red-400/60 border border-red-400/20 → "AGOTADO"
- Badge intensidad (top-left sobre imagen): igual que en HomeFeaturedCard
- Omega badge adicional: si intensity === 'OMEGA', badge rojo extra con --color-omega-badge
- Body: p-5
  H3 Playfair text-lg font-bold
  Teaser Inter text-sm text-(--color-text-secondary) line-clamp-2 mt-1
  Row de metadatos: Clock + duration · Users + capacity — text-xs text-(--color-text-muted)
  Precio: "Desde €X" en var(--color-gold-light) font-semibold mt-3
  CTA: "VER ESTA EXPERIENCIA →" — full-width, ghost magenta, mt-3
    disabled+opacity-50 si availability === 'agotado'

### 6. Sección "La Habitación Final"
CTA card full-width al pie del catálogo:
bg: linear-gradient(135deg, rgba(185,48,158,0.15), rgba(159,52,155,0.08)) con border-(--border-subtle)
H3: "La Habitación Final" — Playfair italic
Body: "Llegues por donde llegues, el destino siempre es el placer. Un espacio diseñado para cruzar tus propios límites."
CTAs lado a lado: "CONFIRMAR MI NOCHE" (primario) + "Consentimiento →" (ghost link)

## Estado local
```typescript
const [activeCity, setActiveCity] = useState<string>('MADRID')
const [activeIntensity, setActiveIntensity] = useState<'TODAS' | 'ALPHA' | 'BETA' | 'OMEGA'>('TODAS')
```
El filtro combina ambas condiciones.

## TypeScript
Datos de experiencias vienen de src/lib/experiences/ — no hacer fetch en este componente.
Usar getExperiencesByCity(city) y filtrar por intensity en el cliente.
```

---

## 3. DETALLE EXPERIENCIA

**Archivo**: `src/app/(public)/experiencias/[ciudad]/[sala]/page.tsx`  
**Intent**: Detalle de sala + prefill sessionStorage → push a `/reservar`

---

### PROMPT DETALLE — ExperienceThresholdView

```
# Prompt: ExperienceThresholdView.tsx — Rediseño v2

## Contexto
Página de detalle de una sala. Formato "briefing de misión". Empuja a /reservar con contexto.
Adjunto DESIGN_SYSTEM_COMPACT.md.

## Archivo de salida
src/components/experiencias/ExperienceThresholdView.tsx  — 'use client'

## Props
```typescript
interface ExperienceThresholdViewProps {
  experience: Experience  // tipo existente en src/lib/experiences/types.ts
  relatedExperiences: Experience[]
}
```

## Estructura (top → bottom)

### 1. Hero de la experiencia
- Full-width, height 50vh min
- <Image> fill objectFit cover, priority
- Gradient overlay: to bottom, transparent 30% → var(--color-bg-base) 100%
- Sobre la imagen (posición absoluta centrada):
  Badge misión: "MISIÓN #N — NIVEL ALPHA/BETA/OMEGA" — JetBrains text-[10px] uppercase, color según intensidad
  Título H1: [font-family:var(--font-playfair)] font-bold italic, color white, text-shadow 0 2px 20px black/60
  Ciudad badge: rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1 text-xs

### 2. Body — 2 columnas (desktop) / 1 columna (mobile)

#### Columna izquierda (contenido)
Breadcrumb: Experiencias > {city} > {name} — JetBrains text-[10px] text-(--color-text-muted)

Tablas de specs ("Classified Data Table"):
Card con bg-(--color-bg-elevated) border-l-2 border-[var(--color-magenta)] rounded-xl p-5
Rows: DURACIÓN / OPERATIVOS / INTENSIDAD / PRECIO BASE / MAESTRO IA
  Label: JetBrains text-[10px] uppercase tracking text-(--color-text-muted)
  Valor: Inter font-semibold text-sm text-(--color-text-primary)
  Separadores: border-b border-(--border-subtle)
  Row hover: bg-(--color-magenta)/5

Descripción narrativa:
  [font-family:var(--font-cormorant)] italic text-lg sm:text-xl leading-relaxed text-(--color-text-secondary)
  Párrafos revelan whileInView con stagger 0.15s

FAQ rápido (2-3 items):
  Acordeón simple (sin librería externa), AnimatePresence para altura
  Pregunta: Inter font-semibold text-sm + ChevronDown Lucide
  Respuesta: Inter text-sm text-(--color-text-secondary)

#### Columna derecha (acciones)
Card sticky (desktop): top-24 self-start
  bg-(--color-bg-elevated) rounded-2xl border-(--border-subtle) [box-shadow:var(--glow-card)] p-6

  Precio: "Desde €X" en [var(--color-gold-light)] text-3xl font-bold
  Subtexto precio: "+ extras opcionales en El Baúl" Inter text-xs text-(--color-text-muted)
  
  CTA primario: "QUIERO ESTA NOCHE" → onClick guarda prefill y navega a /reservar?step=1
    Guardar en sessionStorage: { experienceId, city, salaSlug }
    Key: 'eroscape_booking_prefill'
    Patrón CTA canónico
  
  Link ghost: "Leer sobre consentimiento →" → /la-sociedad/seguridad

  Badges confianza (row de 3 debajo del CTA):
    ShieldCheck + "Discreción total"
    Clock + "90 min"
    Users + "2 personas"
    JetBrains text-[9px] text-(--color-text-muted)

### 3. Galería — Polaroid strip
3 imágenes en "polaroid frames":
  - bg-white/5 border border-white/10 rounded-sm p-2 pb-6 (aspecto polaroid)
  - rotation aleatoria ±3deg (Framer Motion initial rotate)
  - hover: rotate 0, scale 1.03
  - Click: lightbox con AnimatePresence (overlay bg-black/90, imagen centrada, cerrar con Escape)

### 4. Cross-sell: "También podría gustarte"
3 cards compactas de relatedExperiences (reusar HomeFeaturedCard en variante compact)
whileInView stagger

## sessionStorage prefill
```typescript
const handleReservar = () => {
  const prefill = {
    experienceId: experience.id,
    city: experience.city,
    salaSlug: experience.slug,
  }
  sessionStorage.setItem('eroscape_booking_prefill', JSON.stringify(prefill))
  router.push('/reservar?step=1')
}
```

## Sticky CTA mobile
Bar fija en bottom con precio + "QUIERO ESTA NOCHE"
Solo visible en mobile (hidden sm:hidden)
bg-(--color-bg-elevated)/95 backdrop-blur-md border-t border-(--border-subtle)
```

---

## 4. RESERVAR — FLUJO COMPLETO

**Archivos**:  
- `src/app/(public)/reservar/page.tsx`  
- `src/app/(public)/reservar/layout.tsx`  
- `src/app/(public)/reservar/reservar-client.tsx`  
- `src/components/booking/` (todos los steps)

---

### PROMPT RESERVAR — Layout y contexto

```
# Prompt: /reservar layout y contexto — Rediseño v2

## Archivos
src/app/(public)/reservar/layout.tsx
src/app/(public)/reservar/reservar-client.tsx
src/context/BookingContext.tsx  (si no existe, crear)

## BookingState type (si no existe, definir aquí)
```typescript
// src/lib/booking-types.ts
export type Intensity = 'ALPHA' | 'BETA' | 'OMEGA'
export type CompanyType = 'pareja' | 'rollete' | 'plan-golfo' | 'swinger'
export type ItemRarity = 'comun' | 'descomun' | 'raro' | 'epico'

export interface UpsellItem {
  id: string
  name: string
  description: string
  price: number
  rarity: ItemRarity
  icon: string  // nombre del icono Lucide
}

export interface BookingState {
  step: 1 | 2 | 3 | 4 | 5
  // Step 1
  city: string
  experienceId: string
  date: string
  timeSlot: string
  // Step 2
  companyType: CompanyType | null
  intensity: Intensity | null
  guestName: string
  partnerName: string
  // Step 3
  selectedUpsells: string[]  // ids
  // Step 4
  safeWord: string
  hasReadDocument: boolean
  ageConfirmed: boolean
  signatureData: string  // base64 de la firma
  // Step 5
  archetypeId: string | null
  // Meta
  tension: number  // 0-100, calculado
}
```

## MissionProgress (barra de tensión)
Crear src/components/booking/MissionProgress.tsx como 'use client'
- Fixed top-0 z-[100] w-full h-1
- NO mostrar fuera de /reservar (comprobar con usePathname)
- Valor calculado:
  - +20 por cada step completado
  - +5 si intensity === 'OMEGA'
  - +2 por cada upsell seleccionado
  - +10 si cuestionario completado (post-reserva)
- Gradiente dinámico según valor:
  0-33: hsl(260, 80%, 50%) → azul-púrpura
  34-66: hsl(35, 90%, 55%) → ámbar
  67-100: var(--color-magenta)
- transition-[width] duration-[600ms] ease-in-out
- Label "TEMPERATURA" visible solo desktop, right end de la barra rellena, JetBrains text-[8px]
- En 100%: Framer Motion glow pulse antes de redirect

## StepIndicator
Crear src/components/booking/StepIndicator.tsx
5 actos: ACTO I · EL ENCUENTRO / ACTO II · TUS DESEOS / ACTO III · TU BAÚL / ACTO IV · EL JURAMENTO / ACTO V · ACCESO

Props:
```typescript
interface StepIndicatorProps {
  currentStep: 1 | 2 | 3 | 4 | 5
}
```

Diseño:
- Horizontal en desktop (5 nodos con línea conectora)
- En mobile: solo "ACTO N de V · LABEL" en JetBrains text-[10px] uppercase centrado
- Nodo activo: círculo 40px bg-(--gradient-cta) con icono Lucide (Compass/SlidersH/Package/PenLine/Unlock)
  + glow pulsante (Framer Motion scale 1→1.05→1, infinite, 2s)
- Nodo completado: círculo 32px bg-(--color-magenta) con CheckIcon
- Nodo futuro: círculo 32px border-(--border-subtle) con icono en --color-text-muted
- Línea conectora: div h-px flex-1 entre nodos
  Completada: bg-(--color-magenta)
  Pendiente: bg-[rgba(185,48,158,0.2)]
- Label bajo cada nodo: JetBrains text-[9px] uppercase tracking-[0.12em]
  Activo: text-(--color-text-primary)
  Completado: text-(--color-magenta)
  Pendiente: text-(--color-text-muted)
```

---

### PROMPT RESERVAR — Step 1: El Encuentro

```
# Prompt: Step1Selection.tsx — Rediseño v2

## Archivo de salida
src/components/booking/Step1Selection.tsx  — 'use client'

## Props
```typescript
interface Step1SelectionProps {
  state: BookingState
  onChange: (updates: Partial<BookingState>) => void
}
```

## Estructura

### A. Selector de ciudad
Row de pills (igual que en /experiencias)
Si hay prefill en sessionStorage, pre-seleccionar esa ciudad al montar.
Pills: MADRID · BARCELONA · VALENCIA · SEVILLA · BILBAO

### B. Grid de experiencias por ciudad (compact)
2 columnas desktop, 1 mobile
ExperienceSelectCard:
  - Seleccionada: border-(--color-magenta) bg-(--color-magenta)/5 con CheckCircle2 icon top-right
  - No seleccionada: border-(--border-subtle)
  - Contenido: nombre + badge intensidad + precio
  - hover: border-(--color-magenta)/60

### C. Selector de fecha ("AGENDA")
Calendar dark: grid de días del mes
  - Días disponibles: text-(--color-text-primary) cursor-pointer hover:bg-(--color-magenta)/10
  - Día seleccionado: bg-(--gradient-cta) text-white rounded-full
  - Días no disponibles: text-(--color-text-muted) opacity-40 cursor-not-allowed
  - Navegación mes: ChevronLeft / ChevronRight

### D. Selector de hora
Pills de horarios: "19:00" · "20:30" · "22:00" · etc.
  - Disponible: border-(--border-subtle) text-(--color-text-secondary) hover:border-(--color-magenta)
  - Seleccionado: bg-(--gradient-cta) text-white
  - Lleno: opacity-40 cursor-not-allowed "COMPLETO" text

### E. Validación (isStepValid)
Step válido cuando: city + experienceId + date + timeSlot tienen valor.
Botón "SIGUIENTE →" en BookingBottomBar (ver abajo) se activa solo cuando válido.

## Pre-fill desde sessionStorage
```typescript
useEffect(() => {
  const raw = sessionStorage.getItem('eroscape_booking_prefill')
  if (raw) {
    const prefill = JSON.parse(raw)
    onChange({ city: prefill.city, experienceId: prefill.experienceId })
    sessionStorage.removeItem('eroscape_booking_prefill')
  }
}, [])
```
```

---

### PROMPT RESERVAR — Step 2: Tus Deseos

```
# Prompt: Step2Configurator.tsx — Rediseño v2

## Archivo de salida
src/components/booking/Step2Configurator.tsx  — 'use client'

## Props
```typescript
interface Step2ConfiguratorProps {
  state: BookingState
  onChange: (updates: Partial<BookingState>) => void
}
```

## Estructura

### A. Selector de compañía (CompanyTypeCard)
Grid 2x2 de cards:
  - "Pareja" (Heart icon) · "Rollete" (Users icon) · "Plan Golfo" (Zap icon) · "Para mí solo/a" (User icon)
  - Seleccionada: border-[var(--color-magenta)] bg-[var(--color-magenta)]/8 scale-[1.03]
    Framer Motion spring stiffness 300
  - Ícono seleccionado: color --color-magenta (default: --color-text-muted)
  - Nombre en Playfair text-base
  - Descripción de 1 línea aparece on-hover con Framer Motion height reveal (0→auto, duration 0.2s)
    Solo desktop; mobile: descripción siempre visible pero más pequeña

### B. Selector de intensidad (IntensityDial)
3 opciones horizontales grandes:
  - ALPHA: "DESPERTAR · Suave" · blue tones
  - BETA: "INTENSO · Sin frenos" · amber tones
  - OMEGA: "SIN LÍMITES · Todo permitido" · magenta/red tones

Cada opción es una card clickeable:
  - No seleccionada: border-(--border-subtle) text-(--color-text-muted)
  - Seleccionada ALPHA: border-[var(--color-intensity-alpha)] bg-[rgba(59,130,246,0.08)]
  - Seleccionada BETA: border-[var(--color-intensity-beta)] bg-[rgba(245,158,11,0.08)]
  - Seleccionada OMEGA: border-[var(--color-intensity-omega)] bg-[rgba(185,48,158,0.12)]
  - Cada card: icono badge de seguridad SVG que se "llena" cuando seleccionado
  - Transición de dot animado entre opciones (posición absoluta, Framer Motion layoutId)

### C. REACTIVE BACKGROUND
El contenedor del step cambia sutilmente de color cuando cambia intensity:
```typescript
const intensityBg = {
  ALPHA: 'hsl(260, 60%, 5%)',
  BETA: 'hsl(35, 50%, 6%)',
  OMEGA: 'hsl(340, 60%, 5%)',
}
// CSS transition 0.8s en el background-color del wrapper
```

### D. Game Master Message (solo cuando OMEGA)
AnimatePresence: solo monta cuando intensity === 'OMEGA'
Entry: opacity 0→1, height 0→auto, duration 0.4s
Card: bg-(--color-bg-elevated) border-l-[3px] border-[var(--color-magenta)] rounded-xl p-4
Header: "GAME_MASTER_IA >" en JetBrains text-[10px] color var(--color-gm-terminal)
Mensaje: typewriter effect (hook useTypewriter simple: interval 30ms por char)
  Texto: "> Protocolo SIN LÍMITES iniciado. La experiencia será directa e intensa. Elegí tu palabra mágica en el siguiente acto."
Cursor parpadeante "|" al final en --color-gm-terminal

### E. Campos de nombre
Label eyebrow: "¿CÓMO QUERÉIS QUE OS LLAMEMOS?"
Input nombre propio + input nombre pareja (si companyType !== 'para-mi-solo')
  - Estilo: bg-transparent border-b border-(--border-subtle) focus:border-(--color-magenta)
  - Placeholder en --color-text-muted
  - User icon Lucide a la izquierda

### F. Arquetipo emergente (preview)
Card pequeña bottom-right desktop / abajo del form mobile
Texto: "Tu perfil actual: El Explorador Curioso" — actualiza en tiempo real según selecciones
Cálculo básico en src/lib/archetype.ts (ver Step5 para definición completa)
Estilo discreto: bg-(--color-bg-elevated) border-(--border-subtle) rounded-xl p-3 text-xs
```

---

### PROMPT RESERVAR — Step 3: Tu Baúl (RPG Inventory)

```
# Prompt: Step3Upselling.tsx — Rediseño v2 (RPG Inventory)

## Archivo de salida
src/components/booking/Step3Upselling.tsx  — 'use client'
src/lib/constants.ts  — agregar UPSELL_ITEMS

## Datos de items (en constants.ts)
```typescript
export const UPSELL_ITEMS: UpsellItem[] = [
  { id: 'pack-sensorial', name: 'Pack Sensorial', description: 'Texturas, aromas y estímulos táctiles premium inspirados en nuestras salas.', price: 45, rarity: 'raro', icon: 'Sparkles' },
  { id: 'tiempo-15', name: 'Tiempo Extra +15 min', description: 'Porque a veces la noche merece más tiempo.', price: 25, rarity: 'descomun', icon: 'Clock' },
  { id: 'tiempo-30', name: 'Tiempo Extra +30 min', description: 'Para los que saben que lo bueno no se apresura.', price: 40, rarity: 'raro', icon: 'Clock' },
  { id: 'upgrade-ia', name: 'Upgrade IA Premium', description: 'El Maestro se adapta a vuestro ritmo en tiempo real con máxima granularidad.', price: 30, rarity: 'epico', icon: 'Brain' },
  { id: 'sorpresa', name: 'Sorpresa Especial', description: 'No lo desvelamos. Confiad en nosotros.', price: 20, rarity: 'descomun', icon: 'Gift' },
]

export const RARITY_COLORS: Record<ItemRarity, string> = {
  comun: '#6B7280',
  descomun: '#10B981',
  raro: '#B9309E',
  epico: '#CB7B1B',
}
```

## Props
```typescript
interface Step3UpsellingProps {
  state: BookingState
  onChange: (updates: Partial<BookingState>) => void
}
```

## Estructura

### A. Header del baúl
Eyebrow: "TU BAÚL"
H2: "Equipá tu noche" — Playfair

### B. Lista de UpsellItemCard
Componente interno UpsellItemCard:
```typescript
interface UpsellItemCardProps {
  item: UpsellItem
  isSelected: boolean
  onToggle: () => void
}
```

Diseño:
- Layout: flex row. Izquierda: hex frame + icono. Centro: nombre + rarity badge + desc. Derecha: precio + toggle.
- bg-(--color-bg-elevated) rounded-2xl border p-4 cursor-pointer
- Border: NO seleccionado → var(--border-subtle); seleccionado → rarityColor
- Hexagonal frame (SVG clipPath hexágono 56x56px):
  - Border color = rarityColor
  - Seleccionado: box-shadow 0 0 20px rarityColor
  - Icono Lucide 24px color rarityColor
  - Framer Motion selección: el hexágono rota 30°→0° (spring stiffness 400)
- Rarity badge: pill pequeño con rarityColor como border y text
  Texto: "RARO" / "ÉPICO" / "DESCOMÚN" / "COMÚN" — JetBrains text-[8px] uppercase
- Si item.rarity === 'epico': badge "MÁS POPULAR" gold crown arriba del card (absolute, top-right)
- Toggle: Lucide PlusCircle (no seleccionado) → CheckCircle2 (seleccionado, magenta)
- Precio: var(--color-gold) font-semibold text-sm

### C. Arsenal Panel (desktop sidebar / mobile bottom sheet)
Desktop: sidebar derecha fija durante el step, w-64
Mobile: bottom sheet que se expande al seleccionar 1+ item

Arsenal panel:
  Header: "TU BAÚL" en JetBrains text-[10px] uppercase + bag icon
  Lista de items seleccionados:
    Entrada: item "cae desde arriba" (y: -20→0, opacity 0→1, spring bounce)
    Framer Motion layout para reordenamiento
    Cada item: icono pequeño + nombre + precio en fila
  Empty state: "Baúl vacío. Sutil también es válido." — italic muted
  Total: "TOTAL EXTRAS: €X" en var(--color-gold) text-xl font-bold mt-auto
  
### D. Item add feedback (micro-animation)
Cuando se selecciona un item: clone del ícono "vuela" desde la card al arsenal panel.
Implementar con posición absoluta + Framer Motion animate desde coords de origen a destino.
Usar getBoundingClientRect() para calcular posiciones.
```

---

### PROMPT RESERVAR — Step 4: El Juramento

```
# Prompt: Step4Legal.tsx — Rediseño v2 (El Pacto)

## Archivo de salida
src/components/booking/Step4Legal.tsx  — 'use client'

## Props
```typescript
interface Step4LegalProps {
  state: BookingState
  onChange: (updates: Partial<BookingState>) => void
}
```

## Estructura

### A. Pergamino scrolleable
Container: max-height 45vh overflow-y-auto rounded-xl
  bg-(--color-bg-elevated) border-(--border-subtle)
  CSS noise texture: filter: url(#noise) — usar SVG filter inline para textura de papel
  Text: [font-family:var(--font-playfair)] text-sm leading-relaxed text-(--color-text-secondary)
  Padding: p-6

Barra de progreso de lectura (top del pergamino):
  Div h-[3px] bg-(--color-magenta) transition-[width]
  width = Math.round(scrollTop / (scrollHeight - clientHeight) * 100) + '%'
  Calcular en onScroll handler

Cuando progress >= 0.95 (ha leído todo):
  Sello de cera (WaxSeal SVG) aparece al final del pergamino:
  Framer Motion: initial scale 0 rotate -15 · animate scale 1.1→1 rotate 0
  spring stiffness 200 damping 10
  SVG: círculo con "ER" monograma, color #8B1A1A (excepción aceptable, Stripe-like constraint), border dorado
  box-shadow: 0 4px 20px rgba(139,26,26,0.4)

### B. "LA PALABRA QUE PARA EL TIEMPO" (Safe Word)
Sección con border-t border-(--color-gold)/30 pt-6 mt-6
H3: [font-family:var(--font-playfair)] italic "La Palabra que Para el Tiempo"
Body: "Esta palabra detiene todo. Inmediatamente. Sin preguntas."
Input: bg-transparent border-b border-(--border-subtle) focus:border-(--color-magenta)
  placeholder: "Elegí tu palabra..."
  text-[font-family:var(--font-playfair)] italic text-lg

Suggestion chips (3 chips animados):
  - "Lluvia" · "Mariposa" · "Pausa"
  - glass morphism: backdrop-blur-sm bg-white/5 border border-white/10 rounded-full px-3 py-1 text-sm
  - stagger entrada 0.1s, Framer Motion opacity 0→1 y -8→0
  - onClick: fills input con scale flash (scale 1→1.05→1)

### C. Área de firma (SignatureCanvas)
Importar signature_pad con next/dynamic { ssr: false }
Container: dark card bg-(--color-bg-elevated) rounded-xl overflow-hidden
  Altura: 140px, width 100%
Placeholder text "Firma aquí" centrado, fade-out en primer stroke
Botón clear: top-right, text-[10px] JetBrains "BORRAR"
Note: "Firma digital completa en producción — para la demo, el checkbox es suficiente"
  texto muted italic text-xs

### D. Confirmación de edad
Checkbox custom: cuadrado 16px border-(--border-subtle) rounded-sm
  Checked: bg-(--gradient-cta) con CheckIcon blanco
  Label: "Confirmo que soy mayor de 18 años" — Inter text-sm

### E. CTA "FIRMAR EL JURAMENTO"
Default: bg-(--color-cta-disabled) cursor-not-allowed text-white/50
Activo cuando: hasReadDocument && safeWord.length >= 2 && ageConfirmed
  Transición a activo: Framer Motion color change + glow-(--glow-magenta) aparece
  Texto: "FIRMAR EL JURAMENTO"
  Al click (activo): wax seal icon aparece en botón + brief press animation (scale 0.97→1)
  Después: onChange({ step: 5 })

## Estado derivado
```typescript
const isValid = state.hasReadDocument && state.safeWord.length >= 2 && state.ageConfirmed
```
```

---

### PROMPT RESERVAR — Step 5: Acceso Concedido

```
# Prompt: Step5Checkout.tsx — Rediseño v2

## Archivo de salida
src/components/booking/Step5Checkout.tsx  — 'use client'
src/lib/archetype.ts  — función getPlayerArchetype

## src/lib/archetype.ts
```typescript
export interface Archetype {
  id: string
  name: string
  description: string
  iconName: string  // nombre del icono Lucide
  gradient: string  // CSS gradient string
}

export function getPlayerArchetype(state: BookingState): Archetype {
  const { companyType, intensity, selectedUpsells } = state
  const hasIA = selectedUpsells.includes('upgrade-ia')
  
  if (hasIA) return { id: 'estratega', name: 'El Estratega Digital', description: 'La tecnología amplifica tu placer.', iconName: 'Bot', gradient: 'linear-gradient(135deg, #1e3a5f, #0f172a)' }
  if (companyType === 'rollete' && intensity === 'OMEGA') return { id: 'maestro', name: 'El Maestro del Caos', description: 'Sin reglas. Con estilo.', iconName: 'Swords', gradient: 'linear-gradient(135deg, #3f0f1a, #1a0008)' }
  if (companyType === 'pareja' && intensity && ['BETA','OMEGA'].includes(intensity)) return { id: 'romantico', name: 'El Romántico Atrevido', description: 'Dos mentes que se atreven juntas.', iconName: 'Flame', gradient: 'linear-gradient(135deg, #2d0f3a, #0f0a1a)' }
  return { id: 'explorador', name: 'El Explorador Curioso', description: 'El primer paso siempre es el más emocionante.', iconName: 'Compass', gradient: 'linear-gradient(135deg, #0f1a2d, #080008)' }
}
```

## Props
```typescript
interface Step5CheckoutProps {
  state: BookingState
  onChange: (updates: Partial<BookingState>) => void
}
```

## Estructura

### A. Access Granted Overlay (al montar el step)
Full-screen overlay bg-(--color-bg-base) z-50
Texto terminal centrado en JetBrains Mono color var(--color-gm-terminal):
  Line 1: "ACCESO CONCEDIDO" — text-2xl, aparece a los 200ms
  Line 2: "INICIANDO PROTOCOLO FINAL..." — text-sm text-(--color-text-muted), aparece a los 800ms
Overlay fade-out a los 1.8s (opacity 1→0 en 500ms), después remove del DOM
Si useReducedMotion: skip overlay, mostrar directamente el checkout

### B. Archetype Reveal
Después del overlay (delay 2s):
Card bg con gradient del arquetipo, rounded-2xl p-6 border-(--border-subtle)
Eyebrow: "TU PERFIL DE JUGADOR"
Icono Lucide 48px color white
Nombre: [font-family:var(--font-playfair)] text-2xl font-bold text-white
Descripción: italic text-(--color-text-secondary) text-sm
"Tu perfil ha sido determinado." — muted italic
Framer Motion: scale 0.8→1 opacity 0→1, spring delay 2s

### C. Dossier Summary (columna izquierda desktop)
Card bg-(--color-bg-elevated) rounded-2xl border-(--border-subtle) p-6
Header: "TU NOCHE" eyebrow

Experiencia seleccionada: nombre + ciudad — Playfair text-xl
Fecha y hora: text-sm text-(--color-text-secondary)
Ciudad: badge pill

Arsenal items seleccionados: lista con icono + nombre + precio
Empty state: "Sin extras · El ritual puro"

Caja de discreción (border gold):
  LockKeyhole icon + "Tu reserva aparecerá en tu extracto como: Ocio y Eventos SL"
  bg-(--color-bg-subtle) border border-[var(--color-gold)]/30 rounded-xl p-3 text-xs text-(--color-text-muted)

Desglose de precios:
  Experiencia base: €X
  Extras: €X (si hay)
  TOTAL: €X en var(--color-gold) text-xl font-bold

### D. Payment Section (columna derecha desktop)
Import dinámico de Stripe Elements (next/dynamic ssr:false)
Stripe Elements dark theme:
```typescript
const appearance = {
  theme: 'night' as const,
  variables: {
    colorBackground: 'var(--color-bg-elevated)',
    colorText: '#FFFFFF',
    colorPrimary: '#B9309E',
    borderRadius: '12px',
  }
}
```
Apple Pay / Google Pay Payment Request Button (auto-detect)
Fallback: card number + expiry + cvc fields

Trust badges row:
  Shield + "Cancelación 48h" · LockKeyhole + "Confidencialidad total" · Headphones + "Soporte humano"
  text-[10px] JetBrains text-(--color-text-muted)

CTA: "[ CONFIRMAR MI NOCHE ]" (brackets animados en hover: x-translate ±4px)
  bg-(--gradient-cta) rounded-full
  Loading: spinner magenta + "PROCESANDO..."
  
On success: confetti (canvas-confetti, dynamic import ssr:false, colors: ['#B9309E','#9F349B','#CB7B1B'])
  Redirect a /mi-reserva/{bookingId}
```

---

### PROMPT RESERVAR — BookingBottomBar

```
# Prompt: BookingBottomBar.tsx

## Archivo de salida
src/components/booking/BookingBottomBar.tsx  — 'use client'

## Props
```typescript
interface BookingBottomBarProps {
  currentStep: 1 | 2 | 3 | 4 | 5
  isValid: boolean
  onNext: () => void
  onBack: () => void
  subtotal?: number
}
```

## Diseño
- Posición: fixed bottom-0 left-0 right-0 z-40
- bg-(--color-bg-elevated)/95 backdrop-blur-md border-t border-(--border-subtle)
- Padding: px-4 py-3 flex items-center justify-between
- Izquierda: botón "← Volver" (ghost, solo si step > 1) · Inter text-sm text-(--color-text-muted)
- Centro (desktop): subtotal si hay upsells "€X" en var(--color-gold)
- Derecha: CTA "SIGUIENTE →" si step < 5, "CONFIRMAR MI NOCHE" si step === 5
  - isValid=false: bg-(--color-cta-disabled) cursor-not-allowed
  - isValid=true: bg-(--gradient-cta) hover:brightness-110
  - Labels por step: I→"SIGUIENTE", II→"SIGUIENTE", III→"CONTINUAR", IV→"FIRMAR EL JURAMENTO", V→"CONFIRMAR MI NOCHE"
- No renderizar en step 5 (el checkout tiene su propio CTA en el body)
```

---

## 5. LA SOCIEDAD & SEGURIDAD

**Archivos**: `src/app/(public)/la-sociedad/page.tsx` y `src/app/(public)/la-sociedad/seguridad/page.tsx`

---

### PROMPT LA SOCIEDAD

```
# Prompt: /la-sociedad — Rediseño v2

## Contexto
Página editorial. Estética de "salón secreto". Tono: misterio, elegancia, discreción.
Adjunto DESIGN_SYSTEM_COMPACT.md y sección /la-sociedad de PAGES.md.

## Archivos de salida
src/components/la-sociedad/LaSociedadHero.tsx  — 'use client' (scroll cue, reveal)
src/components/la-sociedad/LaSociedadUpcomingNights.tsx  — server
src/components/la-sociedad/LaSociedadCorporate.tsx  — server
src/components/la-sociedad/LaSociedadCommitment.tsx  — server

## SECCIÓN 1: LaSociedadHero
Eyebrow: ninguno (rompe patrón intencionalmente — hero muy editorial)
Logotipo simbólico: SVG círculo con calavera estilizada (no ominosa — elegante), 80px, color --color-magenta-dim
H1: "LA SOCIEDAD" — [font-family:var(--font-playfair)] font-bold tracking-[0.3em] text-5xl sm:text-7xl text-center
Quote: [font-family:var(--font-cormorant)] italic text-xl text-(--color-text-secondary)
  Texto: «Lo que ocurre aquí, no sale de aquí.»
  Comillas decorativas grandes en --color-magenta-dim
Body: Inter text-sm text-(--color-text-secondary) max-w-xl mx-auto text-center
  Texto: "Un espacio de libertad medida, para quienes desean explorar bajo el velo de la discreción. En Eroscape, la comunidad respira misterio, elegancia y una sensualidad cuidada."
Scroll cue: ChevronDown animado (bounce, desaparece en primer scroll)

Background: gradient radial desde --color-bg-elevated al 40% al --color-bg-base
Particles: <ParticleField particleCount={40} />

## SECCIÓN 2: LaSociedadUpcomingNights
Eyebrow: "PRÓXIMAS NOCHES"
H2: [font-family:var(--font-playfair)] font-bold tracking-[0.2em] uppercase "PRÓXIMAS NOCHES"

3 EventCard componente interno:
```typescript
interface EventCardProps {
  date: string     // "15 MAY · MADRID"
  title: string    // "Noche de máscaras"
  quote: string    // «...»
  status: 'cerrado' | 'ultimas-plazas' | 'disponible'
  href: string
}
```

Diseño EventCard:
- rounded-2xl overflow-hidden border-(--border-subtle) bg-(--color-bg-elevated)
- Imagen superior: 180px, gradient overlay bottom to top en --color-bg-elevated
- Badge status top-right:
  'cerrado': bg-red-900/40 text-red-400 border border-red-400/30 "CERRADO"
  'ultimas-plazas': bg-amber-900/40 text-amber-400 "ÚLTIMAS PLAZAS"
  'disponible': bg-green-900/40 text-green-400 "DISPONIBLE"
- Metadato fecha: JetBrains text-[9px] uppercase text-(--color-magenta) mt-3 px-5
- Título: [font-family:var(--font-playfair)] text-xl font-bold px-5
- Quote: [font-family:var(--font-cormorant)] italic text-sm text-(--color-text-secondary) px-5 mt-2
- CTA: "SABER MÁS" → href, ghost outline, text-xs, mx-5 mb-5 mt-4

Grid: 3 columnas desktop, 1 mobile
whileInView stagger

## SECCIÓN 3: LaSociedadCorporate
Divider band canónico
2 columnas desktop: izquierda texto, derecha grid 2x2 de servicio-cards

Texto izquierda:
  Eyebrow: "MÁS ALLÁ DE LO PRIVADO"
  H2: "Eventos & corporativo" — Playfair bold
  Body: "Llevamos nuestra filosofía de excelencia y comunicación consciente al ámbito profesional..."
  CTA: "CONSULTAR DISPONIBILIDAD" → /contacto, estilo gold (border-gold, text-gold-light)

Grid 2x2 de servicios:
  1. PartyPopper icon · "Despedidas memorables" · "CELEBRACIONES BAJO SELLO DE DISCRECIÓN"
  2. Heart icon · "Aniversarios y hitos" · "RITUALES A MEDIDA PARA DOS"
  3. Users icon · "Equipos y liderazgo" · "CONFIANZA Y COMUNICACIÓN CONSCIENTE"
  4. Moon icon · "Noches bajo un halo" · "CONEXIÓN DE HOY PARA TU GRUPO"
  Cada card: bg-(--color-bg-elevated) rounded-xl p-5 border-(--border-subtle)
  Icono: 24px var(--color-gold)
  Nombre: text-sm font-semibold text-(--color-text-primary) mt-2
  Descripción: text-[9px] JetBrains uppercase tracking-[0.12em] text-(--color-text-muted) mt-1

## SECCIÓN 4: LaSociedadCommitment
Glass card (patrón glass canónico) rounded-2xl p-8 max-w-3xl mx-auto
LockKeyhole icon 24px centered text-(--color-text-muted) mb-4
H2: "El compromiso Eroscape" — Playfair centered

3 columnas:
  1. EyeOff icon gold · "Sin grabaciones" · "Privacidad digital prioritaria..."
  2. MessageCircle icon gold · "Sin juicios" · "Un espacio cuidado para explorar..."
  3. Hand icon gold · "Todo opcional" · "Vos marcás el límite..."

Footer link bar: text-[10px] JetBrains text-(--color-text-muted) text-center
  "Seguridad y consentimiento · ¿Planes de membresía? Ver niveles en El Club."
  Links en --color-magenta
```

---

### PROMPT SEGURIDAD (Consentimiento)

```
# Prompt: /la-sociedad/seguridad — Rediseño v2

## Contexto
Página de consentimiento y seguridad. La quote hero es el copy más potente del sitio.
Adjunto DESIGN_SYSTEM_COMPACT.md.

## Archivos de salida
src/components/seguridad/SeguridadHero.tsx
src/components/seguridad/SeguridadProcess.tsx
src/components/seguridad/SeguridadGuaranteesGrid.tsx
src/components/seguridad/SeguridadPalabraSection.tsx
src/components/seguridad/SeguridadLegalAccordion.tsx

## SECCIÓN 1: SeguridadHero
Eyebrow: "✦ EL PODER DE LA PALABRA ✦" — pill con border-(--border-subtle) rounded-full px-4
H1: [font-family:var(--font-cormorant)] italic text-5xl sm:text-6xl font-bold
  "El consentimiento manda. Sin él, no hay juego."
  max-w-4xl mx-auto text-center
Body: Inter text-sm text-(--color-text-secondary) text-center max-w-2xl
  "En Eroscape, el placer solo existe con cuidado. Antes de empezar definís tus límites, elegís tu palabra segura y afinás la intensidad con vos, no contra vos."

## SECCIÓN 2: SeguridadProcess (4 steps del proceso)
4 steps horizontales (desktop) / vertical (mobile)
Con línea de progreso animada scaleX en X (igual que ComoFuncionaSection)

Steps:
  1. MessageSquare icon · "01" · "Consulta previa" · "Completás el cuestionario de límites y preferencias para que la noche te respete a tu ritmo."
  2. Shield icon · "02" · "Briefing personal" · "Conversación reservada sobre código y palabra segura con quienes cuidan el espacio."
  3. Eye icon · "03" · "Durante la experiencia" · "Voz y guía digital en sala; el equipo humano permanece a un toque en la app si lo necesitás."
  4. Heart icon · "04" · "Aftercare" · "Cierre opcional y un momento tranquilo para integrar lo vivido, sin prisa."

## SECCIÓN 3: SeguridadGuaranteesGrid (6 garantías)
Grid 3x2 desktop, 2x3 mobile
Cada card: bg-(--color-bg-elevated) rounded-xl border-(--border-subtle) p-5
Icono: 20px color var(--color-gm-terminal) (verde — connotación de seguridad verificada)
Título: text-sm font-semibold text-(--color-text-primary)
Descripción: text-xs text-(--color-text-secondary)

6 garantías:
  1. Shield · "Consentimiento guiado" · "Límites explícitos antes de empezar..."
  2. Lock · "Seguridad cuidada" · "Equipo disponible sin invadir tu intimidad..."
  3. Eye · "Privacidad garantizada" · "Sin grabaciones de ocio..."
  4. Sparkles · "Higiene premium" · "Limpieza profunda entre visitas..."
  5. Brain · "Curación digital en penumbra" · "Guía por voz y capas sensoriales..."
  6. FileText · "Documentación clara" · "Condiciones legibles y derecho a parar..."

## SECCIÓN 4: SeguridadPalabraSection
2 columnas desktop: texto (izquierda) + imagen sello de lacre (derecha)
Texto:
  H2: [font-family:var(--font-playfair)] italic text-4xl color var(--color-gold-light) "Tu palabra mágica"
  Body: "Una sola palabra lo detiene todo. En el acto. Sin preguntas incómodas. Solo recuperás el control absoluto sobre el espacio que habitás."
  CTA: "RECORDAR TU NOMBRE" (ghost, border-(--border-subtle), User icon izquierda)
Imagen: <Image> de la foto del sello de lacre (src: sello existente), rounded-xl

Bar de promesas (full-width debajo):
4 pills con dot magenta + texto: "SIN GRABACIONES" · "SIN JUICIOS" · "TODO OPCIONAL" · "VOS MANDÁS"
JetBrains text-[10px] uppercase tracking-[0.15em]
Separados por |

## SECCIÓN 5: SeguridadLegalAccordion
H2: "Aspectos legales" — Playfair centered
3 items de acordeón (AnimatePresence height reveal, NO Framer Motion layout):
  1. "¿Qué información recopilamos?"
  2. "¿Cómo protegemos tus datos?"
  3. "Política de cancelación"
  - Header: flex justify-between text-sm font-medium + ChevronDown (rotate 180 cuando abierto)
  - bg-(--color-bg-elevated) border-(--border-subtle) rounded-xl overflow-hidden
  - Contenido interno: Inter text-sm text-(--color-text-secondary) p-4

NOTA: esta sección NO usa 'use client' — el acordeón se maneja con useState en el componente padre.
Convertir a 'use client' solo esta sección.
```

---

## 6. EL TOCADOR (BOUTIQUE)

**Archivo**: `src/app/(public)/boutique/page.tsx` + `src/components/boutique/BoutiquePage.tsx`

---

### PROMPT EL TOCADOR

```
# Prompt: /boutique — Rediseño v2 (El Tocador)

## Contexto
Boutique de productos curados. Envío discreto. Estética: lujo oscuro + rareza RPG.
Adjunto DESIGN_SYSTEM_COMPACT.md.

## Archivos de salida
src/components/boutique/BoutiquePage.tsx  — 'use client'
src/components/boutique/ProductCard.tsx
src/components/boutique/CategoryTabs.tsx

## SECCIÓN 1: Hero
Eyebrow: "BOUTIQUE"
H1: "El Tocador" — [font-family:var(--font-playfair)] text-5xl font-bold color var(--gradient-cta) text-gradient
Body: "Objetos curados para extender la experiencia con discreción, elegancia y cuidado."
Chip: PackageCheck icon + "Packaging elegante, envío discreto"
  bg-(--color-bg-elevated) border-(--border-subtle) rounded-full px-4 py-1.5 text-xs

## SECCIÓN 2: CategoryTabs
6 tabs: TODO · KITS · JUEGOS · LENCERÍA · ACCESORIOS · MASAJES
Pill activo: bg-(--gradient-cta) text-white
Inactivo: border-(--border-subtle) text-(--color-text-muted)
AnimatePresence key={activeCategory} para animar grid al cambiar

## SECCIÓN 3: Grid de ProductCard
3 columnas desktop, 2 mobile, 1 muy-mobile
AnimatePresence + stagger 0.06s

ProductCard props:
```typescript
interface ProductCardProps {
  id: string
  name: string
  description: string
  category: string
  price: number
  rarity: 'esencial' | 'premium' | 'exclusivo'
  isInCart: boolean
  onToggle: () => void
  imageSrc?: string
}
```

Rareza → colores:
  esencial: #10B981 (verde)
  premium: #B9309E (magenta)
  exclusivo: #CB7B1B (dorado)

Diseño ProductCard:
- bg-(--color-bg-elevated) rounded-2xl border-(--border-subtle) overflow-hidden
- hover: translateY -4px, border-color -> rarityColor (transition 0.25s)
- Imagen: 180px height, gradient overlay bottom
- Top-right badge sobre imagen: "DISCRETO" (PackageLock icon) — JetBrains text-[8px] uppercase
  bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-2 py-0.5
- Categoría: eyebrow JetBrains text-(--color-text-muted)
- Rarity badge: pill con rarityColor border y text — "ESENCIAL" / "PREMIUM" / "EXCLUSIVO"
- Nombre: Playfair text-base font-bold
- Descripción: Inter text-sm text-(--color-text-secondary) line-clamp-2
- Precio: var(--color-gold-light) font-semibold
- Rating/curatorial: StarIcon 12px gold + "Curaduría sensorial" text-[10px] text-(--color-text-muted)
- CTA: si !isInCart → "AÑADIR" (bg--(gradient-cta)); si isInCart → "EN TU BAÚL ✓" (bg green-800/50)
  Framer Motion: scale flash en toggle (scale 1→0.95→1)

## SECCIÓN 4: Ofertas
Divider band canónico
Eyebrow: "PRIVILEGIOS"
H2: "Ofertas cuidadas"

2 cards (Offer):
  1. Eyebrow "EDICIÓN LIMITADA" · Título "Para Parejas Nuevas" · Desc "Kit de iniciación con descuento para quienes reserven su primera experiencia."
  2. Eyebrow "EDICIÓN LIMITADA" · Título "Membresía VIP" · Desc "Acceso a productos limitados y descuentos permanentes."
  Cada card: bg-(--color-bg-elevated) border-(--border-gold) rounded-2xl p-6

## SECCIÓN 5: Reviews
Eyebrow: "LO QUE SE SUSURRA"
1 review en card glass: texto entre comillas + "— Cliente verificado"
[font-family:var(--font-cormorant)] italic

## SECCIÓN 6: Newsletter
Eyebrow: "NEWSLETTER"
H2: "Dejá que te escribamos con discreción"
Body: "Suscribite y recibí novedades discretas y privilegios exclusivos."
Form: Input email + CTA "SUSCRIBIRME" (inline en desktop, stack mobile)
Input: bg-transparent border-(--border-subtle) rounded-full px-4 py-2.5 focus:border-(--color-magenta)
CTA: bg-(--gradient-cta) rounded-full px-5 py-2.5 text-xs font-(--font-jetbrains) uppercase

## Estado local (BoutiquePage)
```typescript
const [activeCategory, setActiveCategory] = useState<string>('TODO')
const [cart, setCart] = useState<string[]>([])
const filteredProducts = activeCategory === 'TODO'
  ? products
  : products.filter(p => p.category === activeCategory)
```
```

---

## 7. EL CLUB

**Archivo**: `src/app/(public)/el-club/page.tsx`

---

### PROMPT EL CLUB

```
# Prompt: /el-club — Rediseño v2

## Contexto
Upsell de membresía. 3 tiers. Demo activable en localStorage. Tono: protocolo cerrado, acceso exclusivo.
Adjunto DESIGN_SYSTEM_COMPACT.md.

## Archivos de salida
src/components/marketing/ElClubPageContent.tsx  — 'use client'

## SECCIÓN 1: Hero
Eyebrow: "PROTOCOLO CERRADO"
H1: "Eroscape es diferente cuando estás dentro." — Playfair bold italic text-4xl sm:text-5xl
Body: "Acceso anticipado. Eventos privados. Una comunidad que sabe lo que busca."
Background: --gradient-hero con ParticleField (30 particles)

## SECCIÓN 2: Tier Grid
3 tiers en grid. El central es "MÁS POPULAR" con badge gold y border-(--border-gold) [box-shadow:var(--glow-gold)]

Estructura de tier (datos en src/lib/club-tiers.ts):
  - Nombre del nivel
  - Precio mensual en var(--color-gold-light)
  - Lista de 4-5 beneficios (CheckCircle2 icon var(--color-magenta) + texto)
  - CTA: "ACTIVAR [NOMBRE]"

Tier "MÁS POPULAR": escala 1.04 en desktop, z-10, border dorado

CTA tiers: onClick → toast "Disponible próximamente · {feature}" (usar Sonner o toast custom)

## SECCIÓN 3: Comparison Table
Grid responsive de beneficios vs tiers
Columnas: Beneficio · Nivel 1 · Nivel 2 · Nivel 3
Check/Cross icons (CheckCircle2 magenta / X text-muted)
bg-(--color-bg-elevated) rounded-2xl overflow-hidden border-(--border-subtle)
Header row: bg-(--color-bg-subtle) font-(--font-jetbrains) text-[10px] uppercase

## SECCIÓN 4: Testimonials
3 testimonios anónimos en cards glass
[font-family:var(--font-cormorant)] italic text-lg
figcaption: arquetipo del usuario (El Explorador Curioso, etc.) — JetBrains text-[9px]

## SECCIÓN 5: Membership Actions
CTA final: "ACCEDER AL PANEL" (si hay localStorage club_member=true)
O: "ACTIVAR MEMBRESÍA" (demo, sin backend real)
Toast on click.
```

---

## 8. LA APP

**Archivo**: `src/app/(public)/app-movil/page.tsx`

---

### PROMPT LA APP

```
# Prompt: /app-movil — Rediseño v2

## Contexto
Presentar la app móvil. Hero con chat demo, features, EROSENSE™, previews, store badges.
Adjunto DESIGN_SYSTEM_COMPACT.md y sección /app-movil de PAGES.md.

## Archivos de salida
src/components/app-movil/AppMovilPageContent.tsx  — 'use client'

## Correcciones de inconsistencia a aplicar
- Reemplazar `text-[var(--color-text-muted)]` por `text-(--color-text-muted)` (v4 shorthand)
- Unificar fuente del hero: SOLO Cormorant (no mezclar con Playfair en el mismo H1)
- En el resto del documento: Playfair para H2 en adelante

## SECCIÓN 1: Hero
Eyebrow: "TECNOLOGÍA DEL PLACER"
H1: [font-family:var(--font-cormorant)] italic text-5xl sm:text-6xl
  "La app que te guía hacia el deseo"
Body: "Mucho más que una utilidad: una extensión digital de la curación Eroscape. Orquesta cada detalle antes, durante y después de tu noche."
Store badges: App Store + Google Play (links demo)
Chat demo (frame de teléfono) a la derecha (desktop) / debajo (mobile):
  mockup de conversación con el Maestro IA
  bg-(--color-bg-elevated) rounded-[2rem] border border-white/10 overflow-hidden
  Messages alternados (izquierda GM en green, derecha usuario en magenta)
  3-4 mensajes de demo
  Input al pie: bg-(--color-bg-subtle) border-t border-(--border-subtle)

## SECCIÓN 2: Arquitectura (6 features)
H2: "Arquitectura del placer" — Playfair
Body: "Funcionalidades pensadas para la inmersión total, sin ruido ni prisa."

6 FeatureCard en grid 2x3:
  1. RefreshCw · "Curación que aprende contigo" · "Sugerencias que se afinan con tu ritmo..."
  2. ShieldCheck · "Tu palabra segura" · "Acceso inmediato al historial anonimizado..."
  3. MessageSquare · "Comunicación velada" · "Canal reservado con conserjería y anfitriones..."
  4. BookOpen · "Diario de sensaciones" · "Un espacio privado para anotar lo vivido..."
  5. Music · "Ambientación adaptativa" · "Soundtrack que sigue el ritmo de la sala..."
  6. Bell · "Alertas de disponibilidad" · "Avisamos antes que nadie cuando tu sala favorita..."

Diseño FeatureCard: bg-(--color-bg-elevated) rounded-2xl p-5 border-(--border-subtle)
Icono: 20px var(--color-purple-muted)
Título: Playfair text-base font-bold color var(--color-gold-light)
Desc: Inter text-sm text-(--color-text-secondary)
hover: [box-shadow:var(--glow-card)] translateY -4px

## SECCIÓN 3: EROSENSE™
Divider band canónico (fondo diferente para separar)
H2: "EROSENSE™" — [font-family:var(--font-playfair)] italic text-4xl color var(--color-gold-light)
Body: "Tecnología sensorial que armoniza luz, aroma y vibración con lo que vivís en sala, en tiempo real, desde la app."
CTA: "SABER MÁS SOBRE LA TECNOLOGÍA" → ghost, border-gold
Decoración: SVG de onda sinusoidal animada (Framer Motion pathLength 0→1) a la derecha

## SECCIÓN 4: Preview Strip
3 previews como "capturas de pantalla" en frames de teléfono estilizados:
  1. Eyebrow "BIENVENIDA" · Título "Tu identidad discreta comienza aquí"
  2. Eyebrow "RESERVAS" · Título "Elegí tu noche"
  3. Eyebrow "GUÍA DIGITAL" · Título "Compañía silenciosa en el bolsillo"
Frames: rounded-[2rem] border border-white/10 overflow-hidden bg-(--color-bg-elevated)
Imágenes/placeholders con gradient atmosphérico

## SECCIÓN 5: Descarga
H2: "Descarga" — Playfair
Body: "En primer Eroscape Room Iónico del mundo. Próximamente App y QR Dinámico."
Store badges + QR decorativo (canvas o SVG estático)
QR: bg-white rounded-xl p-3 inline-block (fgColor blanco en dark bg — excepción aceptable para contraste)
```

---

## 9. FAQ

**Archivo**: `src/app/(public)/FAQ/page.tsx` → **NOTA**: renombrar a `/faq` para consistencia con el Footer (actualmente el Footer enlaza `/faq` pero la ruta es `/FAQ`). Crear redirect en `next.config.ts`: `{ source: '/FAQ', destination: '/faq', permanent: true }`.

---

### PROMPT FAQ

```
# Prompt: /faq — Rediseño v2

## Contexto
Página de preguntas frecuentes. Acordeón + filtro por categoría + CTA final.
Adjunto DESIGN_SYSTEM_COMPACT.md.

## Fix crítico
Renombrar src/app/(public)/FAQ/ a src/app/(public)/faq/
Agregar en next.config.ts: redirect permanente /FAQ → /faq

## Archivos de salida
src/app/(public)/faq/page.tsx
src/components/faq/FaqPage.tsx  — 'use client'

## Correcciones de inconsistencia
- Unificar tipografía H1: [font-family:var(--font-cormorant)] italic (NO mezclar con serif fallback)
- Los chips de categoría: usar patrón pills canónico (mismo que en /experiencias)

## SECCIÓN 1: Hero
Eyebrow: "LO QUE TODOS PREGUNTAN (PERO POCOS SE ATREVEN A DECIR)"
H1: [font-family:var(--font-cormorant)] italic text-5xl "Tus dudas, resueltas."
Body: "Si no encontrás lo que buscás, el Maestro puede guiarte con calma — sin exponer nada que no quieras revelar."
whileInView fade+up

## SECCIÓN 2: Category Chips
6 categorías: TODAS · LA EXPERIENCIA · RESERVAS · SEGURIDAD · PRIVACIDAD · EL MAESTRO IA
Patrón: pill activo bg-(--gradient-cta), inactivo border-(--border-subtle)
useState activeCategory, filtrar FAQ_ITEMS

## SECCIÓN 3: FAQ Accordion
FAQ_ITEMS (hardcoded en el componente, copiar de ErosCopy.json key faq_general):
Incluir todas las preguntas existentes + agregar:
  - "¿Qué es la palabra mágica y cómo funciona?"
  - "¿Aparecerá esto en mi extracto bancario?"
  - "¿Qué es el Maestro IA y qué puede hacer?"

Cada FaqItem:
  - bg-(--color-bg-elevated) rounded-xl border-(--border-subtle) overflow-hidden
  - Header: flex justify-between px-5 py-4 cursor-pointer
    Pregunta: Inter text-sm font-medium text-(--color-text-primary)
    ChevronDown: rotate 180deg cuando abierto (Framer Motion animate)
  - Respuesta: AnimatePresence + motion.div initial:{height:0,opacity:0} animate:{height:'auto',opacity:1}
    Inter text-sm text-(--color-text-secondary) px-5 pb-4
  - hover header: bg-(--color-magenta)/5
  - Abierto: border-l-2 border-[var(--color-magenta)]

## SECCIÓN 4: CTA Final
Glass card rounded-2xl p-8 max-w-2xl mx-auto
H3: [font-family:var(--font-cormorant)] italic text-2xl "¿Aún te queda una duda en la garganta?"
Body: "Escribinos con calma. Tu privacidad es parte del ritual: no pedimos más de lo necesario."
2 CTAs: "VER CONSENTIMIENTO" (ghost) + "CONTACTAR" (primario)
```

---

## 10. INVERSORES

**Archivo**: `src/app/(public)/inversores/page.tsx`

---

### PROMPT INVERSORES

```
# Prompt: /inversores — Rediseño v2

## Contexto
Landing para inversores. Tono: ejecutivo-premium. Mismo DNA visual pero más geométrico, menos sensual.
Paleta dominada por dorado (no magenta). Adjunto DESIGN_SYSTEM_COMPACT.md.

## Archivos de salida
src/components/inversores/InversoresLanding.tsx  — 'use client'

## Correcciones de inconsistencia
- Reemplazar `font-serif` por [font-family:var(--font-playfair)]
- Reemplazar rgba gold hardcodeados por var(--color-gold) y var(--color-gold-light)
- Logo /erosGold.png — no cambiar (Navbar detecta pathname='/inversores')

## SECCIÓN 1: Hero Inversor
Background: --color-bg-base con textura geométrica sutil (CSS repeating-linear-gradient de líneas muy tenues)
Logo /erosGold.png centrado, 80px
Eyebrow: "INVERSIÓN DISCRETA" — JetBrains text-(--color-gold) border border-[var(--color-gold)]/30 rounded-full px-4 py-1

H1: [font-family:var(--font-playfair)] text-5xl sm:text-7xl font-bold uppercase tracking-[0.06em] text-center text-(--color-text-primary)
  Línea 1: "UNA CATEGORÍA NUEVA."
  Línea 2: "UNA OPORTUNIDAD ÚNICA."

Body: Inter text-(--color-text-secondary) text-center max-w-xl mx-auto

3 métricas grandes (flex row centrado):
  Cada métrica: número grande [font-family:var(--font-playfair)] text-4xl font-bold text-(--color-gold-light) + label JetBrains text-[9px] uppercase text-(--color-text-muted)
  1. "5 ciudades" + "PRESENCIA"
  2. "25 experiencias" + "IPS ÚNICAS"
  3. "€180 ticket medio" + "MARGEN ALTO"
  Separados por pipe |

CTA primario: "SOLICITAR INFORMACIÓN" — style border: var(--border-gold); color: var(--color-gold-light)
  hover: bg-(--color-gold)/10
  Ancho: auto (no full-width — tono más ejecutivo)

## SECCIÓN 2: Potencial de mercado
Eyebrow: "POTENCIAL" — var(--color-gold)
H2: "La economía de la experiencia sigue creciendo." — Playfair
Body: párrafo sobre el mercado
Stats: "+42% CRECIMIENTO INTERANUAL ESTIMADO" + "€2.4B MERCADO EXPERIENCIAL (TAM)"
  JetBrains text-sm color var(--color-gold-light) font-bold

Panel de crecimiento: bar chart visual simple (divs CSS, no librería):
  Años: 2019-2020-2021-2026 (proyección)
  Barras: bg-(--color-gold-light) con altura proporcional
  Barra 2026: bg-(--color-gold) con badge "SEÑAL"

## SECCIÓN 3: Modelo de negocio
H2: "MODELO" — tracking-[0.3em] uppercase Playfair centrado

4 cards en grid 2x2:
  1. BarChart2 icon · "Reservas (Base)" · "Ticket premium con demanda dinámica y control de disponibilidad."
  2. TrendingUp icon · "El Baúl (Upsell)" · "Inventario en-sala para elevar la noche con intención."
  3. Crown icon · "El Tocador (Membresía)" · "Acceso recurrente no intrusivo: discreción y agenda prioritaria."
  4. Building2 icon · "Licencias (Expansión)" · "Crecimiento mediante acuerdos operativos con estándares de marca."

Diseño cards: bg-(--color-bg-elevated) rounded-2xl border border-[var(--color-gold)]/20 p-6
Icono: 24px var(--color-gold)
Título: Playfair text-base font-bold color var(--color-gold-light)
Desc: Inter text-sm text-(--color-text-secondary)

## SECCIÓN 4: Drivers del mercado (3 columnas numeradas)
01 · "CAMBIO CULTURAL"
02 · "ECONOMÍA DE LA EXPERIENCIA"
03 · "VENTAJA DE CATEGORÍA"
Cada columna: número en Playfair text-4xl color var(--color-gold)/40 · título JetBrains uppercase · desc Inter text-sm

## SECCIÓN 5: Formulario de contacto
H2: "Contacto" — Playfair centrado
Body: "Acceso solo para inversores acreditados. Sin sobreexposición: lo mínimo necesario, con la máxima discreción."

Campos:
  - Nombre completo
  - Email profesional
  - Perfil de inversor (radio pills: "FAMILY OFFICE" · "ÁNGEL" · "ESTRATÉGICO" · "OTRO")
  - Mensaje (textarea 4 rows)

Radio pills: border border-[var(--color-gold)]/30 rounded-full px-3 py-1 text-[10px] JetBrains uppercase cursor-pointer
  Seleccionado: border-[var(--color-gold)] bg-[var(--color-gold)]/10 text-(--color-gold-light)

Inputs: bg-transparent border-b border-[rgba(203,123,27,0.3)] focus:border-[var(--color-gold)] text-sm
Labels: JetBrains text-[9px] uppercase text-(--color-text-muted) mb-1

CTA: "INICIAR CONVERSACIÓN" — border border-[var(--color-gold)] text-(--color-gold-light) rounded-full
  Microcopy bajo el form: ShieldCheck icon + "Tu información es tratada con la misma discreción que ofrecemos a nuestros clientes."

Footer form: LockKeyhole icon + "CONFIDENCIAL · COMPARTIMOS MATERIAL SOLO BAJO SOLICITUD"
  JetBrains text-[9px] uppercase text-(--color-text-muted) text-center

## handleSubmit
```typescript
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault()
  // TODO: conectar con Resend/SendGrid en producción
  console.log('Inversor form submitted', formState)
  setSubmitted(true)
}
```
Si submitted: mostrar mensaje de confirmación animado (CheckCircle2 + "Responderemos con discreción.") en lugar del form.
```

---

## 11. DASHBOARD POST-RESERVA

**Archivo**: `src/app/(auth)/mi-reserva/[id]/page.tsx`

---

### PROMPT DASHBOARD

```
# Prompt: /mi-reserva/[id] — Rediseño v2 (Cuartel General)

## Contexto
Dashboard post-reserva. 4 tabs. Countdown. GM Chat. QR. Tono: íntimo, ya no militar.
Adjunto DESIGN_SYSTEM_COMPACT.md y sección /mi-reserva de PAGES.md.

## Archivos de salida
src/app/(auth)/mi-reserva/[id]/page.tsx
src/components/dashboard/AgentHeadquarters.tsx  — 'use client'
src/components/dashboard/MissionActiveTab.tsx
src/components/dashboard/AgentProfileTab.tsx
src/components/dashboard/CredentialTab.tsx
src/components/dashboard/ArchiveTab.tsx
src/components/ui/GameMasterChat.tsx  — 'use client'
src/components/ui/CountdownDisplay.tsx  — 'use client'

## CORRECCIÓN DE TONO (CRÍTICA)
Reemplazar todos los textos "de cara al usuario" siguiendo tabla:
  "MISIÓN ACTIVA" → "TU NOCHE"
  "PERFIL DE AGENTE" → "TUS DESEOS"
  "CREDENCIAL" → "TU ACCESO"
  "ARCHIVO" → "TU HISTORIAL"
  "Agente." → "Ya te esperábamos."
  "TIEMPO HASTA INFILTRACIÓN" → "CUENTA REGRESIVA HACIA TU NOCHE"

## AgentHeadquarters (layout de tabs)
Header eyebrow: "YA TE ESPERÁBAMOS." — JetBrains text-(--color-magenta)
4 tab pills: "TU NOCHE" · "TUS DESEOS" · "TU ACCESO" · "TU HISTORIAL"
  Activo: bg-(--gradient-cta)
  Inactivo: border-(--border-subtle) text-(--color-text-muted)
AnimatePresence key={activeTab} para transición de contenido (fade + x: 20→0)

## MissionActiveTab (tab "TU NOCHE")
Hero card bg-(--color-bg-elevated) rounded-2xl border-(--border-subtle) [box-shadow:var(--glow-card)] p-6

Status header: dot verde pulsante + "STATUS: CONFIRMADA" — JetBrains text-[9px] text-green-400
Título experiencia: [font-family:var(--font-playfair)] text-3xl font-bold
Metadato: "MADRID · 2025.12.15 · 21:00H" — JetBrains text-sm text-(--color-text-muted)

CountdownDisplay:
  Labels: DÍAS / HRS / MIN / SEG — JetBrains text-[8px] uppercase text-(--color-text-muted)
  Dígitos: bg-(--color-bg-subtle) rounded-xl px-4 py-3 [font-family:var(--font-jetbrains)] text-4xl text-(--color-magenta)
  [box-shadow:var(--glow-magenta)]
  En cada tick: Framer Motion scale 1→1.06→1, duration 0.1s (solo el dígito que cambia)
  Cuando < 24h: cells amber. Cuando < 1h: cells rojo.
  Usar useEffect + setInterval(1000)

Archetype badge (card): gradient del arquetipo + icono 32px + nombre Playfair + descripción

Safe word display:
  Label: "CÓDIGO DE PARADA:" — JetBrains text-[9px] uppercase text-(--color-text-muted)
  Valor: "•••••••" con toggle Eye/EyeOff icon
  Reveal: [font-family:var(--font-cormorant)] italic text-xl text-(--color-magenta)
  [box-shadow:var(--glow-magenta)] on reveal (0.5s then normalize)
  IMPORTANTE: el valor enmascarado no debe existir como texto plano en el DOM cuando está oculto.
  Implementar: {isRevealed ? safeWord : '•'.repeat(safeWord.length)}

## AgentProfileTab (tab "TUS DESEOS")
Circular progress ring SVG (magenta stroke, dark bg):
  r=45, circumference=283, dashoffset según progreso
  "X/10" centrado en JetBrains
  Label: "TUS DESEOS DEFINIDOS"
CTA: "COMPLETAR MIS DESEOS" → abre questionnaire
GameMasterChat (ver abajo)

## GameMasterChat
Scripted (NO real-time):
  bg-(--color-bg-elevated) rounded-2xl border-(--border-subtle) overflow-hidden
  Header: "GAME_MASTER_IA" JetBrains + dot verde online
  3 mensajes secuenciales con delay:
    1s: GM: "Ya te esperábamos." (typewriter)
    2.5s: GM: "He analizado tus preferencias. La noche se adapta a vos." (typewriter)
    4s: GM: "Tengo una pregunta antes de preparar tu experiencia." (typewriter)
    5.5s: CTA button "Responder al Maestro →" (Framer Motion fadeIn)
  Entre mensajes: "GM está escribiendo..." con 3 dots animation (opacity 0→1→0 en loop)
  Estilo mensajes GM: alineados izquierda, bg-(--color-bg-subtle) rounded-xl rounded-tl-none p-3 text-sm
  "GM >" prefix en var(--color-gm-terminal)
  Solo plays once (localStorage 'gm_intro_seen')

## CredentialTab (tab "TU ACCESO")
QR dinámico: qrcode.react con dynamic import ssr:false
  fgColor="#FFFFFF" bgColor="transparent" (excepción aceptable — contraste QR)
  Size: 200px
  Container: bg-white rounded-2xl p-4 inline-block
Eyebrow: "CREDENCIAL OPERATIVA"
3 pasos: numerados, styled como mission objectives
  1. "Descargá la App Eroscape"
  2. "Abrí el Escáner"
  3. "Accedé a tu sala"
Botón descarga QR

## ArchiveTab (tab "TU HISTORIAL")
Lista de reservas anteriores (mock data)
Empty state: "Sin noches anteriores." — Cormorant italic + icono discreto
```

---

## 12. CHROME: NAVBAR & FOOTER

---

### PROMPT NAVBAR (correcciones de coherencia)

```
# Prompt: Navbar.tsx — Correcciones de coherencia v2

## Contexto
No rediseño completo — solo correcciones de coherencia y copy.
Adjunto DESIGN_SYSTEM_COMPACT.md.

## Archivo
src/components/layout/Navbar.tsx

## Correcciones a aplicar

### 1. Fix de ruta FAQ
Cambiar href del link "FAQ" de '/FAQ' a '/faq'
(consistente con el redirect que creamos en next.config.ts)

### 2. Font wordmark
El wordmark "EROSCAPE" usa font-[family:var(--font-playfair)] — asegurar que usa el patrón v4:
  Cambiar cualquier `font-[var(--font-playfair)]` por `[font-family:var(--font-playfair)]`

### 3. CTA texto
Verificar que el CTA "Rendirse al deseo" sigue el patrón canónico (rounded-full, font-jetbrains, gradient-cta).
Si no cumple, actualizar sin cambiar el copy.

### 4. Accesibilidad
Verificar que todos los links tienen aria-label descriptivo cuando no tienen texto visible.
El botón hamburguesa: aria-label "Abrir menú" / "Cerrar menú" dinámico.

## NO TOCAR
- Estructura general del navbar
- Logo dorado en /inversores
- Drawer mobile existente
- Lógica de scroll/blur
```

---

### PROMPT FOOTER (correcciones de coherencia)

```
# Prompt: Footer.tsx — Correcciones de coherencia v2

## Contexto
Solo correcciones. No rediseño.
Adjunto DESIGN_SYSTEM_COMPACT.md.

## Archivo
src/components/layout/Footer.tsx

## Correcciones a aplicar

### 1. Fix de ruta FAQ
Cambiar href del link "FAQ" de '/faq' a '/faq' (ya debería estar bien — verificar)
Si el link actual es '/FAQ', cambiar a '/faq'.

### 2. Font wordmark
El wordmark "EROSCAPE" en el footer: asegurar [font-family:var(--font-playfair)] uppercase tracking-[0.2em]

### 3. Añadir CTA discreto para inversores
Bajo las columnas existentes, agregar una línea de texto sutil:
  [font-family:var(--font-jetbrains)] text-[9px] text-(--color-text-muted) text-center
  "¿Sos inversor? → Conocé el proyecto" con Link href="/inversores"
  El link en color text-(--color-text-muted) hover:text-(--color-text-secondary) (no magenta — debe ser discreto)

### 4. Redes sociales (añadir si no existen)
Row de 3 iconos: Instagram, Twitter, TikTok — SVG inline o Lucide equivalentes
  color: text-(--color-text-muted) hover:text-(--color-text-secondary)
  Arriba del copyright bar

## NO TOCAR
- Estructura de columnas
- Copyright text
- Disclaimer de discreción
```

---

## CHECKLIST FINAL DE COHERENCIA ENTRE PÁGINAS

Antes de hacer push a producción, verificar en TODAS las páginas:

- [ ] **Fonts**: Solo `[font-family:var(--font-playfair)]` para H1/H2/H3 display. Solo `font-(--font-cormorant)` para títulos éditoriales. Solo `font-(--font-jetbrains)` para eyebrows/mono. Solo `font-(--font-inter)` para body. Sin `font-serif`, sin `font-[var(--font-X)]`.
- [ ] **Colores**: Sin hex hardcodeados en JSX (excepciones documentadas: wax seal `#8b0000`, Stripe Elements, QR fgColor).
- [ ] **Copy tone**: Sin "agente", "operación", "misión", "protocolo" en copy de cara al usuario (excepciones: nomenclatura de actos en StepIndicator, que es lúdica y conocida por el usuario).
- [ ] **CTAs**: Todos usando el patrón canónico o variante glass. Sin CTAs con `border-radius: 0` o cuadrados (eso era v1).
- [ ] **Animaciones**: Todos los componentes client con `useReducedMotion()` y `prefers-reduced-motion` respetado. Variants FUERA del componente.
- [ ] **Server/Client**: Server components por defecto. `'use client'` solo cuando hay hooks/effects.
- [ ] **FAQ ruta**: Verificar que `/FAQ` redirige a `/faq` y el Footer enlaza `/faq`.
- [ ] **Imágenes**: Todas las `<Image>` tienen `sizes` correcto y `alt` descriptivo.
- [ ] **Focus rings**: Verificar en teclado — todos los interactivos tienen `focus-visible:outline-none focus-visible:ring-2`.
- [ ] **Contraste**: Mínimo 4.5:1 entre texto y fondo. Verificar especialmente text-muted sobre bg-elevated.

---

*Documento generado para Eroscape v2.0 · Stack: Next.js 16 · React 19 · TypeScript 5 strict · Tailwind CSS v4 · Framer Motion · Lucide React*  
*Basado en: DESIGN_SYSTEM_COMPACT.md + PAGES.md + ErosCopy.json + eroscape_v2_gamificado_md.pdf + screenshots de todas las páginas*
