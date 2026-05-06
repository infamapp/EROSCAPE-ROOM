# PAGES.md — Mapa de páginas Eroscape

Documento denso para alimentar Claude (junto a screenshots) en sesiones de rediseño. Cada entrada describe qué hace una ruta, qué componentes la componen, qué tokens y tipografías domina, y de dónde vive su copy.

> **Leer junto a:** [DESIGN_SYSTEM_COMPACT.md](./DESIGN_SYSTEM_COMPACT.md) y [ErosCopy.json](./ErosCopy.json).

---

## Convenciones globales

- **Stack**: Next.js 16 (App Router) · React 19 · TypeScript 5 (strict) · Tailwind CSS v4 · Framer Motion · Lucide React.
- **Layout root** ([src/app/layout.tsx](../src/app/layout.tsx)): siempre incluye `Navbar`, `Footer`, `PanicMode`, `RouteTransitionLoader` y `BookingProvider`. Las páginas no deben re-renderizarlos.
- **Easing sensual**: `cubic-bezier(0.25, 0.46, 0.45, 0.94)`. Toda animación debe usarlo.
- **Tipografías** cargadas globalmente: `--font-playfair`, `--font-cormorant`, `--font-inter`, `--font-jetbrains`.
- **Idioma**: `es`. Tono "dark luxury", nunca militar, nunca explícito (ver `.cursorrules`).
- **Server components por defecto.** `'use client'` solo cuando hay estado/efectos.
- **Reservar es flow**: el flujo `/reservar` tiene su propio `layout.tsx` que oculta loader y monta `Suspense` + `BookingProvider`.
- **Animaciones**: siempre respetar `useReducedMotion()` y `prefers-reduced-motion`.

### Plantilla por página

```
- **Archivo**: ruta del page.tsx
- **Intent**: 1 línea (qué hace en el funnel)
- **Layout**: server | client | flow
- **Secciones (orden)**: lista de componentes top-level con propósito ≤8 palabras
- **Animaciones clave**: stagger | typewriter | scramble | particles | parallax | reveal | none
- **Tokens dominantes**: variables --color-* / --gradient-* / --glow-* más usadas
- **Tipografías**: dónde se usa cada familia
- **Copy source**: hardcoded | eros.json:<key> | mixto
- **Estado**: producción | placeholder | en rediseño
- **Notas**: peculiaridades (e.g. consume sessionStorage, tiene Stripe, etc.)
- **Para Claude**: imagen recomendada para acompañar el rediseño
```

---

## /

- **Archivo**: [src/app/page.tsx](../src/app/page.tsx)
- **Intent**: Entrada al funnel; marca + CTAs hacia reservar/explorar.
- **Layout**: flow (server con secciones client por dentro).
- **Secciones (orden)**:
  1. `HeroSection` — Hero con partículas y CTAs.
  2. `ConceptSection` — Propuesta de valor y garantías (5 cards).
  3. `ExperienciasHomeFeatured` — Mapa España + destacadas por ciudad.
  4. `ComoFuncionaSection` — 5 actos del flujo narrativo.
  5. `CtaSection` — Ayuda para elegir y empuje a reservar.
- **Animaciones clave**: scramble (tagline), particles (`ParticleField`), parallax, reveal stagger.
- **Tokens dominantes**: `--gradient-cta`, `--color-bg-base`, `--color-text-secondary`, `--color-magenta`, `--glow-card`, `--glow-magenta`, `--color-gold-light`.
- **Tipografías**: Playfair (logo, headings, CTAs), Cormorant (títulos secundarios), Inter (descripciones), JetBrains (eyebrows, microcopy).
- **Copy source**: hardcoded.
- **Estado**: producción.
- **Notas**:
  - Toast `"Ya te esperábamos."` si hay visita previa (localStorage / cookie).
  - Hero tagline animada con `useTextScramble`.
  - `ExperienciasHomeFeatured` compone `SpainMapSection` + `ExperienciasHomeCatalog` (modo featured).
- **Para Claude**: full-page screenshot 1440px (incluir hero + concept + mapa).

---

## /experiencias

- **Archivo**: [src/app/(public)/experiencias/page.tsx](../src/app/(public)/experiencias/page.tsx)
- **Intent**: Catálogo interactivo; filtra y deriva al detalle de cada sala.
- **Layout**: client (`'use client'`).
- **Secciones (orden)**:
  1. Header catálogo — Eyebrow + headline + body intro.
  2. Modos de intensidad — 4 cards (Lovers / Plan Golfo / Libertino / El Secreto).
  3. Divisor "El Escenario" — Banda editorial + intro a salas.
  4. Catálogo salas — Tabs ciudad + pills intensidad + grid `CatalogExperienceCard`.
  5. Habitación final — CTA a reservar + link a consentimiento.
- **Animaciones clave**: reveal `whileInView`, `AnimatePresence` en grid filtrado.
- **Tokens dominantes**: `--color-bg-base`, `--color-bg-elevated`, `--color-magenta`, `--color-gold-light`, `--gradient-cta`, `--gradient-help-cta-card`, `--glow-card`, `--border-subtle`.
- **Tipografías**: Playfair (H1/H2/tabs ciudad/CTAs secundarios), Inter (body), JetBrains (eyebrows/pills).
- **Copy source**: mixto — hace `fetch('/eros.json')` y puede sobrescribir títulos/desc de los modos y el intro de "escenario".
- **Estado**: producción.
- **Notas**:
  - Filtros por ciudad (`CITIES` en `src/lib/constants.ts`) + intensidad (ALPHA/BETA/OMEGA).
  - `CatalogExperienceCard` usa `ExperienceIntensityPill`.
- **Para Claude**: screenshot del grid filtrado + un modo card en hover.

---

## /experiencias/[ciudad]/[sala]

- **Archivo**: [src/app/(public)/experiencias/[ciudad]/[sala]/page.tsx](<../src/app/(public)/experiencias/[ciudad]/[sala]/page.tsx>)
- **Intent**: Detalle de sala + prefill; empuja a `/reservar` con contexto.
- **Layout**: flow (server page que renderiza client view).
- **Secciones (orden)**:
  1. `ExperienceThresholdView` — Hero + breadcrumbs + share + stats + content + CTA + FAQ + related.
- **Animaciones clave**: reveal, stagger.
- **Tokens dominantes**: `--surface-experience`, `--gradient-cta`, `--color-magenta`, `--color-gold-light`, `--color-text-primary`.
- **Tipografías**: Playfair (títulos), Inter (cuerpo/labels), JetBrains (breadcrumbs, CTA principal, tags).
- **Copy source**: mixto — datos vienen de `src/lib/experiences/`; copy de UI (labels, CTAs) hardcoded.
- **Estado**: producción.
- **Notas**:
  - Guarda prefill en `sessionStorage.eroscape_booking_prefill` y navega a `/reservar?step=1`.
  - Share usa Web Share API con fallback a clipboard.
  - **No** usa `ExperienceStickyReservaCta` ni `ExperienceNightCalendar` (existen pero no están conectados acá).
- **Para Claude**: screenshot del hero con stats + CTA inferior.

---

## /reservar

- **Archivos**:
  - [src/app/(public)/reservar/page.tsx](<../src/app/(public)/reservar/page.tsx>)
  - [src/app/(public)/reservar/layout.tsx](<../src/app/(public)/reservar/layout.tsx>)
  - `src/app/(public)/reservar/reservar-client.tsx`
- **Intent**: Flujo narrativo de reserva en 5 actos con guardrails por step.
- **Layout**: flow (client por completo, dentro de `Suspense`).
- **Secciones (orden)**:
  1. `MissionProgress` — Barra "TEMPERATURA" reactiva.
  2. `StepIndicator` — Acto romano + nombre del acto.
  3. `AnimatePresence` + `Step1Selection` — Ciudad, experiencia, fecha, hora.
  4. `Step2Configurator` — Compañía, intensidad, nombres, idioma.
  5. `Step3Upselling` — "El baúl" (rarezas RPG).
  6. `Step4Legal` — Juramento, palabra mágica, firma digital.
  7. `Step5Checkout` — Resumen, archetype reveal, Stripe.
  8. `BookingBottomBar` — Sticky bottom con CTA primario y back.
- **Animaciones clave**: slide+fade entre steps, progress bar width, step pulse, scramble GM, loot flight portal (Step3), wax seal reveal (Step4), `Access granted` overlay (Step5), confetti burst (Step5), acordeones privacy/discount.
- **Tokens dominantes**: `--gradient-cta`, `--gradient-alpha|beta|omega`, `--color-magenta*`, `--color-gold*`, `--color-cta-disabled`, `--glow-intense`, `--color-gm-terminal|gm-alert`, `--texture-parchment-noise`, `--color-wax-seal`, `--shadow-wax-seal`.
- **Tipografías**: Playfair (act titles), Inter (body), JetBrains (eyebrows, pills, terminal GM).
- **Copy source**: mixto (hardcoded + `src/lib/constants.ts` + `src/lib/agent-questionnaire.ts`).
- **Estado**: placeholder (Stripe demo / fallback, calendario simulado).
- **Notas**:
  - `ReservarClient` fuerza `step=1` si falta y bloquea saltos si `isStepValid` falla.
  - "Tensión" se calcula con bonus por OMEGA / upsells / consent.
  - Hay hex hardcodeados puntuales en Step1/Step5 (`#DC2626`, `#FDA4AF`, etc.) — ver `informe-consistencia-design-system.md`.
- **Para Claude**: 1 screenshot por step (5 imágenes) + 1 del bottom-bar móvil.

---

## /la-sociedad

- **Archivo**: [src/app/(public)/la-sociedad/page.tsx](<../src/app/(public)/la-sociedad/page.tsx>)
- **Intent**: Manifestar el espíritu de La Sociedad y derivar a seguridad / club.
- **Layout**: server (page) con `LaSociedadHero` client.
- **Secciones (orden)**:
  1. `LaSociedadHero` — Atmósfera de marca + scroll cue.
  2. `LaSociedadUpcomingNights` — 3 próximos eventos con estado.
  3. `LaSociedadCorporate` — Eventos privados / corporativo.
  4. `LaSociedadCommitment` — 3 pilares de discreción.
  5. Footer links — Hacia `/la-sociedad/seguridad` y `/el-club`.
- **Animaciones clave**: reveal hero, bounce chevron, hover transitions.
- **Tokens dominantes**: `--color-magenta`, `--color-magenta-glow`, `--color-gold-light`, `--surface-experience`, `--glow-card`, `--glow-gold`.
- **Tipografías**: Cormorant (títulos italic), Playfair (subtítulos), Inter (body), JetBrains (eyebrows / labels).
- **Copy source**: hardcoded — datos en `src/lib/la-sociedad.ts`.
- **Estado**: producción.
- **Notas**: Estética de "salón secreto", muy editorial.
- **Para Claude**: screenshot de upcoming-nights + commitment side-by-side.

---

## /la-sociedad/seguridad

- **Archivo**: [src/app/(public)/la-sociedad/seguridad/page.tsx](<../src/app/(public)/la-sociedad/seguridad/page.tsx>)
- **Intent**: Explicar consentimiento, seguridad y marco legal.
- **Layout**: server.
- **Secciones (orden)**:
  1. `SeguridadHero` — Quote del consentimiento.
  2. `SeguridadProcess` — Antes / durante / después (4 steps).
  3. `SeguridadGuaranteesGrid` — 6 garantías.
  4. `SeguridadPalabraSection` — Palabra mágica + CTA "Renegociar tu noche".
  5. `SeguridadPromisesBar` — Barra editorial con 4 promesas.
  6. `SeguridadLegalAccordion` — FAQ legal expandible.
- **Animaciones clave**: línea de progreso `scaleX` en proceso, hover scale en iconos, acordeón sin Motion.
- **Tokens dominantes**: `--color-gm-terminal`, `--color-magenta`, `--color-gold-light`, `--surface-experience`, `--color-bg-elevated`.
- **Tipografías**: Cormorant (h1 hero), Playfair (h2), Inter (body), JetBrains (eyebrows).
- **Copy source**: hardcoded — datos en `src/lib/la-sociedad-seguridad.ts`.
- **Estado**: producción.
- **Notas**: La quote `"El consentimiento manda. Sin él, no hay juego."` es la pieza más fuerte de toda la página.
- **Para Claude**: screenshot del hero + accordion abierto.

---

## /boutique

- **Archivos**:
  - [src/app/(public)/boutique/page.tsx](<../src/app/(public)/boutique/page.tsx>)
  - [src/components/boutique/BoutiquePage.tsx](../src/components/boutique/BoutiquePage.tsx)
- **Intent**: Catálogo "El Tocador" — productos curados con envío discreto.
- **Layout**: server (page) con `BoutiquePage` client.
- **Secciones (orden)**:
  1. Hero header — Eyebrow "Boutique" + headline desde `eros.json` + chip "Packaging elegante, envío discreto".
  2. Category tabs — 6 categorías (`Todo`, `Kits`, `Juegos`, `Lencería`, `Accesorios`, `Masajes`).
  3. Product grid — Cards con imagen, badge "Discreto", CTA "Añadir / En tu baúl".
  4. Offers — 2 cards de privilegios.
  5. Reviews — Testimoniales agradecidos.
  6. Newsletter — Form de suscripción discreta.
- **Animaciones clave**: `whileInView` reveal, `AnimatePresence` en cambio de categoría, ease sensual.
- **Tokens dominantes**: `--gradient-cta`, `--gradient-card`, `--glow-card`, `--color-magenta`, `--color-gold-light`, `--color-purple-mid`, `--color-bg-elevated`.
- **Tipografías**: Playfair (h1/h2/h3), Inter (body), JetBrains (eyebrows / pills / CTA).
- **Copy source**: mixto — `fetch('/eros.json')` para `boutique.title`, `boutique.intro`, `boutique.products[]`, `boutique.offers[]`, `boutique.reviews[]`, `boutique.newsletter`. Resto (eyebrows, labels, CTAs) hardcoded.
- **Estado**: producción.
- **Notas**:
  - Imágenes de productos usan `/placeholder.png` (asset real no existe).
  - Categorías inferidas desde el nombre del producto.
  - `FALLBACK_COPY` local para si falla el fetch.
- **Para Claude**: screenshot del grid + 1 card hover + sección newsletter.

---

## /el-club

- **Archivos**:
  - [src/app/(public)/el-club/page.tsx](<../src/app/(public)/el-club/page.tsx>)
  - [src/components/marketing/ElClubPageContent.tsx](../src/components/marketing/ElClubPageContent.tsx)
- **Intent**: Upsell de membresía recurrente + demo activable en el dispositivo.
- **Layout**: flow (page server, content client).
- **Secciones (orden)**:
  1. `ElClubHero` — Eyebrow "PROTOCOLO CERRADO" + headline + body.
  2. `ElClubTierGrid` — 3 niveles con CTA "ACTIVAR …" y badge "MÁS POPULAR".
  3. `ElClubComparisonTable` — Grid responsive de beneficios.
  4. `ElClubTestimonialsSection` — Testimonios anónimos con figcaption arquetipo.
  5. `ElClubMembershipActions` — Toasts + demo localStorage + entrada al panel.
- **Animaciones clave**: stagger en tiers, reveal whileInView, toast notify.
- **Tokens dominantes**: `--gradient-cta`, `--gradient-hero`, `--glow-card`, `--glow-magenta`, `--glow-intense`, `--texture-parchment-noise`, `--color-magenta`, `--color-gm-terminal`.
- **Tipografías**: Playfair (h1/h2/títulos), Inter (descripciones), JetBrains (eyebrows, badges, CTAs, tablas).
- **Copy source**: mixto — datos de tiers en `src/lib/`, copy de UI hardcoded.
- **Estado**: producción.
- **Notas**:
  - `setClubMemberLocalStorage(true)` activa demo en el dispositivo.
  - Toast prefijo: `"Disponible próximamente · {feature}"`.
- **Para Claude**: screenshot full-page (hero + tiers + tabla).

---

## /app-movil

- **Archivos**:
  - [src/app/(public)/app-movil/page.tsx](<../src/app/(public)/app-movil/page.tsx>)
  - [src/components/app-movil/AppMovilPageContent.tsx](../src/components/app-movil/AppMovilPageContent.tsx)
- **Intent**: Presentar la app móvil (features, EROSENSE, previews y descargas).
- **Layout**: flow (page server, content client).
- **Secciones (orden)**:
  1. `AppMovilLandingHero` — Headline + chat demo + store badges.
  2. `AppMovilArchitectureSection` — Grid de 6 features.
  3. `AppMovilErosenseSection` — Bloque dedicado a EROSENSE™.
  4. `AppMovilPreviewStrip` — 3 previews (Bienvenida / Reservas / Guía).
  5. `AppMovilStoresStrip` — Badges + QR demo.
- **Animaciones clave**: stagger grid, float frame, pulsos EROSENSE, reveal columnas.
- **Tokens dominantes**: `--color-magenta`, `--color-magenta-glow`, `--color-purple-mid`, `--color-gold-light`, `--color-gm-terminal`, `--color-bg-base|elevated|subtle`.
- **Tipografías**: Cormorant (h1 hero), Playfair (h2 secciones), Inter (body), JetBrains (eyebrows / badges).
- **Copy source**: hardcoded.
- **Estado**: placeholder (URLs de tienda son demo, QR decorativo, cuenta `eros.json.digital_experience` que no se está consumiendo).
- **Notas**:
  - Inconsistencia: `text-[var(--color-text-muted)]` en vez del shorthand v4 (ver informe DS).
  - Hay tipografía mezclada (Cormorant en hero, Playfair en secciones siguientes).
- **Para Claude**: screenshot hero + grid features + stores strip.

---

## /FAQ

- **Archivos**:
  - [src/app/(public)/FAQ/page.tsx](../src/app/(public)/FAQ/page.tsx)
  - [src/components/faq/FaqPage.tsx](../src/components/faq/FaqPage.tsx)
- **Intent**: Resolver dudas frecuentes con filtro por categoría y acordeón.
- **Layout**: client.
- **Secciones (orden)**:
  1. Hero intro — Eyebrow + headline + lead.
  2. Category filters — 6 chips (`Todas`, `La Experiencia`, `Reservas`, `Seguridad`, `Privacidad`, `El Maestro IA`).
  3. FAQ accordion — 7 preguntas en cards con expand/collapse.
  4. CTA panel — Duda final + 2 links (`Ver consentimiento`, `Contactar`).
- **Animaciones clave**: header fade+up, cards `whileInView`, acordeón height/opacity con `AnimatePresence`.
- **Tokens dominantes**: `--color-magenta`, `--color-gold`, `--gradient-cta`, `--color-bg-elevated`.
- **Tipografías**: Cormorant (titulares con fallback inline `font-(--font-cormorant,serif)`), sans default + JetBrains uppercase en chips.
- **Copy source**: hardcoded — `FAQ_ITEMS` y `CATEGORIES` locales (no consume `eros.json.faq_general` aunque existe).
- **Estado**: producción.
- **Notas**:
  - **Inconsistencia de ruta**: page está en `/FAQ` (mayúsculas) pero el Footer enlaza a `/faq` (minúsculas).
  - Falta tipografía estandarizada (mezcla Cormorant + serif fallback).
- **Para Claude**: screenshot del accordion abierto + chips activos.

---

## /inversores

- **Archivos**:
  - [src/app/(public)/inversores/page.tsx](<../src/app/(public)/inversores/page.tsx>)
  - [src/components/inversores/InversoresLanding.tsx](../src/components/inversores/InversoresLanding.tsx)
- **Intent**: Landing para relación con inversores + formulario de contacto (sin submit real).
- **Layout**: client.
- **Secciones (orden)**:
  1. Hero — Logo dorado + eyebrow "Inversión discreta" + headline + 3 métricas + CTA.
  2. Oportunidad / potencial — Texto + panel "Crecimiento referencial" con años.
  3. Modelo — Grid de 4 cards (Reservas, El Baúl, El Tocador, Licencias).
  4. Mercado / drivers — 3 columnas numeradas (01/02/03).
  5. Contacto — Form (nombre/email/perfil/mensaje) + microcopy confidencial.
- **Animaciones clave**: hero fade+up, panels `whileInView`, `AnimatePresence` en disclaimer.
- **Tokens dominantes**: `--color-gold`, `--color-bg-elevated`, gradientes/rgba dorados, bordes rgba blancos.
- **Tipografías**: Playfair (h1 via `[font-family:var(--font-playfair)]`), sans default en UI, JetBrains en labels uppercase.
- **Copy source**: hardcoded.
- **Estado**: placeholder (form `preventDefault()` sin envío real, imagen `/inversores-placeholder.png`).
- **Notas**:
  - Logo `/erosGold.png` (versión dorada exclusiva de inversores).
  - Navbar usa logo dorado cuando `pathname === '/inversores'`.
  - Tipografía con `font-serif` en algunas zonas (ver informe DS, tanda A).
- **Para Claude**: screenshot full-page incluyendo metrics + contacto.

---

## /mi-reserva/[id]

- **Archivos**:
  - [src/app/(auth)/mi-reserva/[id]/page.tsx](<../src/app/(auth)/mi-reserva/[id]/page.tsx>)
  - [src/app/(auth)/layout.tsx](<../src/app/(auth)/layout.tsx>)
- **Intent**: Panel privado post-checkout con tabs (estado, deseos, acceso QR, historial).
- **Layout**: client.
- **Secciones (orden)**:
  1. `AgentHeadquarters` — Header eyebrow `"YA TE ESPERÁBAMOS."` + tabs + content animado.
  2. `MissionActiveTab` — Status + countdown + safe word toggle + archetype card.
  3. `AgentProfileTab` — Cuestionario + GM chat + envío webhook.
  4. `CredentialTab` — QR + descarga + pasos + links stores.
  5. `ArchiveTab` — Historial (vacío o lista).
  6. `GameMasterChat` — Scripted scramble + typing dots + CTA.
- **Animaciones clave**: tab change slide+fade, badge club entrance, countdown cell flash, ping online, safe word reveal drop-shadow, GM scramble + typing, CTA `AnimatePresence`.
- **Tokens dominantes**: `--color-magenta`, `--color-gold`, `--glow-card`, `--color-gm-terminal|gm-alert`, `--texture-parchment-noise`.
- **Tipografías**: Playfair (titles), Inter (body), JetBrains (eyebrows / countdown / chat header).
- **Copy source**: mixto (hardcoded + `src/lib/constants.ts` para mensajes GM + `src/lib/agent-questionnaire.ts` para preguntas).
- **Estado**: placeholder (datos mock, QR a URL fija, stores genéricos, webhook IA sin garantías).
- **Notas**:
  - Si no hay `id`: error `"Credencial no válida."`.
  - `showClubBadge` mezcla mock + localStorage.
  - Cuestionario persiste en localStorage por `bookingId`.
  - Las 4 tabs: `["TU NOCHE", "TUS DESEOS", "TU ACCESO", "TU HISTORIAL"]`.
- **Para Claude**: 1 screenshot por tab (4 imágenes), priorizar "TU NOCHE" con countdown.

---

## CHROME: Navbar

- **Archivo**: [src/components/layout/Navbar.tsx](../src/components/layout/Navbar.tsx)
- **Intent**: Navegación global con CTA principal y drawer móvil animado.
- **Layout**: client (siempre montado en root).
- **Estructura**: header fijo con blur al scroll → logo + nav desktop + CTA + hamburguesa → overlay + drawer aside (mobile).
- **Animaciones**: header slide+fade, overlay fade, drawer slide-in/out (respeta `useReducedMotion`).
- **Tokens dominantes**: `--gradient-cta`, `--color-text-secondary`, `--color-bg-elevated`, `--color-magenta`, `--border-subtle`.
- **Tipografías**: sans default, "Eroscape" wordmark con tracking uppercase.
- **Notas**:
  - Logo dorado en `/inversores` (`/erosGold.png`), magenta en el resto.
  - 7 links: Experiencias, El Tocador, La Sociedad, Consentimiento, FAQ, Inversores, La App.
  - Link FAQ va a `/FAQ` (mayúsculas).
  - CTA `"Rendirse al deseo"` → `/reservar`.

---

## CHROME: Footer

- **Archivo**: [src/components/layout/Footer.tsx](../src/components/layout/Footer.tsx)
- **Intent**: Footer global con columnas (experiencias por ciudad, legal, contacto) y nota de discreción.
- **Layout**: shared (server).
- **Estructura**: marca + tagline → 3 columnas (Experiencias dinámicas / Legal / Contacto) → barra inferior (discreción + copyright).
- **Animaciones**: ninguna.
- **Tokens dominantes**: `--color-bg-elevated`, `--color-text-secondary`, `--color-text-muted`, `--border-subtle`.
- **Tipografías**: Playfair (marca "EROSCAPE"), sans en resto.
- **Notas**:
  - **Inconsistencia**: enlaza a `/faq` (minúsculas) pero la ruta real es `/FAQ`.
  - Columna Experiencias se construye dinámicamente desde `CITIES.displayName`.

---

## CHROME: PanicMode

- **Archivo**: [src/components/panic/PanicMode.tsx](../src/components/panic/PanicMode.tsx)
- **Intent**: Modo pánico que reemplaza la app por un sitio fake neutro y cambia `document.title`.
- **Layout**: client (provider + context + botón flotante).
- **Estructura**: botón flotante con tooltip → al activarse, full-replace por una "noticia" falsa de "InfoDiario" (header + nav + article + grid de 3 cards + footer legal).
- **Animaciones**: ninguna; solo timers para tooltip.
- **Tokens dominantes**: en modo normal usa tokens; en modo pánico **rompe el DS intencionalmente** (`#ffffff`, `#111111`, `#0000EE`, Georgia/Arial). Excepción aceptable.
- **Atajos**: `Ctrl+Shift+E` para activar/desactivar; triple tap en logo para desactivar.
- **Notas**: Es la única zona de la app que NO sigue el DS (por privacy).

---

## CHROME: RouteTransitionLoader

- **Archivo**: [src/components/ui/RouteTransitionLoader.tsx](../src/components/ui/RouteTransitionLoader.tsx)
- **Intent**: Overlay full-screen entre rutas con fondo + pulso sutil.
- **Layout**: client.
- **Estructura**: efecto `pathname` → muestra overlay durante `minVisibleMs` con `/back-2.png` + `/erosLogo.png` + tagline italic Playfair.
- **Animaciones**: fade in/out, pulso radial infinito (respeta reduced motion).
- **Tokens**: `--font-playfair` (tagline italic), fondos rgba magenta/negro hardcoded.
- **Notas**:
  - **Excluye** rutas que empiezan con `/reservar` (no muestra loader allí).
  - Tagline: `"bienvenido al lugar de tus fantasias"` (ortografía intencional sin tilde).
