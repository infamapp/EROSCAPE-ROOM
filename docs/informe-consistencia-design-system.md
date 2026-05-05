# Informe — Consistencia de Design System (Tokens + Tipografías)

Referencia obligatoria: `DesignTokens.md` y `EROSCAPE_MASTER_CURSOR.md`.

## Resumen ejecutivo

El proyecto **sí utiliza tokens** (`--color-*`, `--gradient-*`, `--glow-*`) en muchas áreas, pero hay **inconsistencias visibles** en:

- **Tipografías de headings**: mezcla de `font-(--font-playfair)`, `font-(--font-cormorant)`, `font-serif`, `font-[var(--font-playfair)]`, y en algunos lugares `font-(--font-cormorant,serif)` (con fallback inline).
- **Uso de colores en Tailwind v4**: conviven `text-(--color-text-muted)` con `text-[var(--color-text-muted)]` (shorthand recomendado), y varios **hex/rgba hardcodeados**.
- **Inline styles**: hay casos donde se define color/fondo/borde con `style={{ ... }}` aun existiendo tokens equivalentes.
- **Checkout/Stripe**: varios colores se encuentran hardcodeados en configuración de Stripe Elements (necesita normalización a tokens).

Este informe lista hallazgos con **archivo + evidencia + propuesta** y luego un plan de refactor en tandas.

---

## Checklist de consistencia (baseline)

### Tipografía (según Master)
- **Display/Heading**: Playfair Display (variable `--font-playfair`)
- **UI/Body**: Inter (variable `--font-inter`)
- **Mono**: JetBrains Mono (variable `--font-jetbrains`)

### Colores y superficies (según Tokens)
- Backgrounds: `--color-bg-base`, `--color-bg-elevated`, `--color-bg-subtle`
- Texto: `--color-text-primary`, `--color-text-secondary`, `--color-text-muted`
- Acentos/Gradientes: `--color-magenta*`, `--color-gold*`, `--gradient-*`
- Efectos: `--glow-card`, `--glow-magenta`, `--border-subtle`, etc.

### Tailwind v4
- Preferir `text-(--color-text-muted)` por encima de `text-[var(--color-text-muted)]`.

---

## Hallazgos (inconsistencias) — Alta prioridad

### 1) Colores hardcodeados (hex/rgba) en flujo de reservas y checkout

- **`src/components/booking/Step5Checkout.tsx`**
  - **Evidencia**: `cardAppearance.variables` y `rules` contienen `#110011`, `#FFFFFF`, `#B9309E`, `#EF4444`, etc.
  - **Impacto**: Checkout es crítico para conversión; si cambiamos tokens, checkout quedará fuera del sistema.
  - **Propuesta**: reemplazar por tokens (p. ej. `var(--color-bg-elevated)`, `var(--color-text-primary)`, `var(--color-magenta)`, `var(--color-gm-alert)` o `--color-omega-badge` según intención).

- **`src/components/booking/Step1Selection.tsx`**
  - **Evidencia**: `color: exp.missionLevel === 'OMEGA' ? '#FDA4AF' : 'var(--color-text-secondary)'` + varios `rgba(...)` para backgrounds/borders de badges.
  - **Impacto**: la UI del booking se ve distinta al marketing; además es difícil mantener consistencia.
  - **Propuesta**: mapear estos colores a tokens (o crear tokens derivados si hace falta).

### 2) Páginas/Secciones con tipografía divergente (heading/body)

En varios componentes se mezclan estrategias distintas:
- `font-(--font-playfair)` / `font-(--font-cormorant)` (patrón preferido)
- `font-[var(--font-playfair)]` (variante alternativa)
- `font-serif` (genérico, pierde precisión del DS)
- `font-(--font-cormorant,serif)` (incluye fallback inline, inconsistente)

Archivos con señales claras:
- `src/components/app-movil/AppMovilLandingHero.tsx` (`font-(--font-cormorant)` en H1)
- `src/components/inversores/InversoresLanding.tsx` (usa `font-serif` en un H1 grande)
- `src/components/faq/FaqPage.tsx` (usa `font-(--font-cormorant,serif)` en headings)
- `src/components/marketing/ElClubTestimonialsSection.tsx` (usa `font-[var(--font-playfair)]`)

**Propuesta**: estandarizar “tokens tipográficos” (ver Tanda A).

### 3) Tailwind v4 shorthand inconsistente (texto con var())

Archivos con `text-[var(--color-text-muted)]` / `text-[var(--color-text-secondary)]` (en vez de shorthand `text-(...)`):
- `src/components/app-movil/AppMovilLandingHero.tsx`
- `src/components/app-movil/AppMovilStoresStrip.tsx`
- `src/components/boutique/*` (ej. `ElTocadorHero.tsx`)
- `src/components/sociedad/LaSociedadUpcomingNights.tsx`

**Propuesta**: migrar sistemáticamente a `text-(--color-text-muted)`, `text-(--color-text-secondary)`, `bg-(--color-bg-elevated)` y equivalentes donde aplique.

---

## Hallazgos — Media prioridad

### 4) Inline styles cuando existe token/clase equivalente

Ejemplos (no exhaustivo):
- `src/components/layout/Navbar.tsx`: `backgroundColor: 'rgba(0,0,0,0.6)'` y bordes hardcodeados en drawer móvil.
- `src/components/marketing/HeroSection.tsx`: bordes y colores inline (ej. `border: '1px solid rgba(255,255,255,0.7)'`).
- `src/components/inversores/InversoresLanding.tsx`: radial gradients con `rgba(207,156,43,...)` (posible reemplazo con `--color-gold` + `color-mix`).

**Propuesta**: reemplazar por utilidades Tailwind + `var()` / `color-mix` para mantener coherencia.

### 5) Mezcla de gradientes “signature” vs gradientes ad-hoc

Hay gradientes consistentes (`--gradient-cta`, `--gradient-hero`, `--gradient-help-cta-card`) y otros ad-hoc en componentes.

**Propuesta**: normalizar a `--gradient-*` cuando el propósito sea equivalente (hero glow, overlay, CTA).

---

## Hallazgos — Baja prioridad / Excepciones aceptables

### 6) `PanicMode` (intencionalmente rompe el DS)
- **`src/components/panic/PanicMode.tsx`**: cambia `document.body.style.background = '#ffffff'`, etc.
- **Razón**: por reglas de privacidad, “Panic Mode” debe parecer un sitio neutro. **Excepción válida**.

### 7) QR / librerías externas con parámetros estrictos
- **`src/components/dashboard/CredentialQr.tsx`**: `fgColor="#FFFFFF"`.
- **Razón**: QR necesita alto contraste. Puede mapearse a token, pero no es crítico.

---

## Propuesta de refactor por tandas

### Tanda A — Tipografía (alto impacto visual)
Objetivo: headings y body consistentes en todas las secciones.

1) Definir patrones (sin introducir “librería UI” nueva):
   - **Eyebrow**: `font-(--font-jetbrains) text-[10px] uppercase tracking-[0.22em] text-(--color-text-muted)`
   - **Heading principal**: `text-(--color-text-primary) [font-family:var(--font-playfair)]` + tamaños consistentes por nivel (h1/h2/h3).
   - **Body**: `font-(--font-inter) text-(--color-text-secondary) leading-relaxed`
2) Reemplazar:
   - `font-serif`, `font-[var(--font-playfair)]`, `font-(--font-cormorant,serif)` por un patrón único.
3) Targets sugeridos (orden):
   - `src/components/marketing/HeroSection.tsx`
   - `src/components/inversores/InversoresLanding.tsx`
   - `src/components/faq/FaqPage.tsx`
   - `src/components/app-movil/*`
   - `src/components/sociedad/*`

### Tanda B — Superficies, tokens y colores (reducción de drift)
Objetivo: minimizar `hex/rgba` y estilos inline donde exista token.

1) Sustituir `text-[var(--color-text-muted)]` → `text-(--color-text-muted)` (Tailwind v4)
2) Reemplazar `rgba(...)` por `color-mix` con tokens cuando sea “tinte” (ej. `var(--color-magenta)`).
3) Checkout/Stripe:
   - Mapear colores a tokens donde Stripe permita (variables/rules).
   - Aceptar algunos valores si Stripe no acepta `var()` en ese campo (documentar excepción).

### Tanda C — Primitivos reutilizables (si el drift continúa)
Objetivo: reducir divergencias sin reescribir páginas completas.

Propuesta mínima (opcionales, solo si aporta):
- `src/components/ui/SectionHeading.tsx` (Eyebrow + H2 + lead)
- `src/components/ui/GlassSurface.tsx` (surface + border + glow)
- `src/components/ui/DividerBand.tsx` (banda editorial con línea superior)

---

## Plan de verificación (tras cada tanda)

### Comandos
- `pnpm lint`
- `pnpm build`

### Smoke-check de rutas clave
- `/`
- `/experiencias`
- `/experiencias/madrid/habitacion-veneciana` (o cualquier `[ciudad]/[sala]`)
- `/FAQ`
- `/inversores`
- `/boutique`
- `/la-sociedad`
- `/la-sociedad/seguridad`
- `/reservar`
- `/mi-reserva/[id]` (si requiere datos mock/ID válido, se valida al menos render básico)

---

## Apéndice — Lista inicial de archivos con señales de inconsistencia

### Hex/rgba hardcodeados (de mayor impacto)
- `src/components/booking/Step5Checkout.tsx`
- `src/components/booking/Step1Selection.tsx`
- `src/components/booking/StepHeader.tsx`

### Tipografía inconsistente
- `src/components/inversores/InversoresLanding.tsx`
- `src/components/faq/FaqPage.tsx`
- `src/components/marketing/ElClubTestimonialsSection.tsx`
- `src/components/boutique/*`
- `src/components/sociedad/*`

### `text-[var(--color-text-muted)]` (Tailwind v4)
- `src/components/app-movil/*`
- `src/components/boutique/*`
- `src/components/sociedad/LaSociedadUpcomingNights.tsx`

