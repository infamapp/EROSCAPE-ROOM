# DESIGN_SYSTEM_COMPACT.md — Eroscape

Hoja única para alimentar Claude (con [PAGES.md](./PAGES.md) y [ErosCopy.json](./ErosCopy.json)) en cualquier prompt de rediseño. **No reemplaza** al `.cursorrules` ni a `DesignTokens.md`; es la versión densa y suficiente para mantener consistencia visual y de tono.

---

## 1. Color tokens (CSS variables)

Definidos en [src/app/globals.css](../src/app/globals.css). Usar siempre vía `var(--token)` o utility shorthand v4 `text-(--token)` / `bg-(--token)`. Nunca hex en JSX.

### Fondos
- `--color-bg-base` `#080008` — body, fondo global.
- `--color-bg-elevated` `#110011` — cards, modales.
- `--color-bg-subtle` `#1A0A1A` — separadores, secciones alternadas.
- `--surface-experience` `#141316` — fichas de experiencia (referencia dark luxury).

### Acentos primarios (magenta = marca)
- `--color-magenta` `#B9309E` — CTA principal.
- `--color-magenta-glow` `#D040B8` — hover / activo.
- `--color-magenta-dim` `#7A1F68` — bordes secundarios.

### Acentos secundarios (púrpura)
- `--color-purple` `#9F349B`, `--color-purple-mid` `#6B2080`, `--color-purple-muted` `#9A8EBE`.

### Dorado / lujo
- `--color-gold` `#CB7B1B` — ornamentos, rareza épica.
- `--color-gold-light` `#E8A040` — hover dorado.

### Intensidad (semáforo)
- `--color-intensity-alpha` `#3B82F6` — bajo (azul frío).
- `--color-intensity-beta` `#F59E0B` — medio (ámbar).
- `--color-intensity-omega` `#B9309E` — turbio (magenta).
- `--color-omega-badge` `#ef4444` — variante "aviso rojo neón" para catálogo.

### Rareza RPG (Arsenal)
- `comun` → `#6B7280` · `descomun` → `#10B981` · `raro` → `#B9309E` · `epico` → `#CB7B1B`.

### Texto
- `--color-text-primary` `#FFFFFF`, `--color-text-secondary` `#C8B8D0`, `--color-text-muted` `#7A6A82`.

### Estados especiales
- `--color-gm-terminal` `#16a34a` — terminal del Game Master.
- `--color-gm-alert` `#dc2626` — alerta GM.
- `--color-wax-seal` `#8b0000` + `--shadow-wax-seal` — sello de lacre (Step 4).
- `--color-cta-disabled` `#4b5563`.

### Gradientes signature
- `--gradient-hero` — magenta → púrpura → negro (135deg).
- `--gradient-cta` — magenta → púrpura (90deg, todos los CTAs principales).
- `--gradient-card` — magenta translúcido → bg-base (overlay sobre imágenes).
- `--gradient-overlay` — transparent → bg-base (gradiente inferior).
- `--gradient-alpha|beta|omega` — fondos reactivos según intensidad.
- `--gradient-help-cta-card` — card cálida con tinte púrpura.

### Efectos (glows + bordes)
- `--glow-card` `0 8px 32px rgba(0,0,0,0.6)` — sombra estándar de card.
- `--glow-magenta` `0 0 40px rgba(185,48,158,0.4)` — glow de marca.
- `--glow-intense` `0 0 60px rgba(185,48,158,0.6)` — glow alto contraste.
- `--glow-gold` `0 0 30px rgba(203,123,27,0.4)` — glow dorado.
- `--neon-cta-bloom` — bloom para CTAs grandes.
- `--border-subtle` `1px solid rgba(185,48,158,0.2)`.
- `--border-active` `1px solid rgba(185,48,158,0.6)`.
- `--border-gold` `1px solid rgba(203,123,27,0.5)`.

---

## 2. Tipografía

3 familias cargadas en [layout.tsx](../src/app/layout.tsx) como CSS variables.

| Rol | Familia | Variable | Clase Tailwind v4 canónica |
|---|---|---|---|
| Display / H1 | Playfair Display | `--font-playfair` | `[font-family:var(--font-playfair)]` o `font-(--font-playfair)` |
| Display italic | Cormorant Garamond | `--font-cormorant` | `font-(--font-cormorant)` |
| Body | Inter | `--font-inter` | `font-(--font-inter)` |
| Mono / labels | JetBrains Mono | `--font-jetbrains` | `font-(--font-jetbrains)` |

### Jerarquía recomendada

```
Eyebrow:   font-(--font-jetbrains) text-[10px] uppercase tracking-[0.22em] text-(--color-text-muted)
H1 hero:   [font-family:var(--font-playfair)] font-bold tracking-[0.04em] text-(--color-text-primary)
           tamaño: clamp(2rem, 5vw, 3.25rem)
H2 sección: text-3xl sm:text-4xl font-bold tracking-[0.06em] [font-family:var(--font-playfair)]
H3 card:   text-xl font-bold tracking-[0.04em] [font-family:var(--font-playfair)]
Body:      font-(--font-inter) text-sm sm:text-base leading-relaxed text-(--color-text-secondary)
Mono CTA:  font-(--font-jetbrains) text-[10px] uppercase tracking-[0.18em]
```

> ⚠️ Evitar mezclar `font-serif`, `font-[var(--font-playfair)]`, `font-(--font-cormorant,serif)`. Usar el patrón v4 listado.

---

## 3. Animación (Framer Motion)

- **Easing sensual obligatorio**: `cubic-bezier(0.25, 0.46, 0.45, 0.94)` → en TS: `[0.25, 0.46, 0.45, 0.94] as const`.
- **Duraciones**: micro-interacciones 0.15s · UI 0.3s · page reveals 0.6s · hero 0.8s · momentos dramáticos (sello, archetype, access granted) 1-2s.
- **Reveal estándar**: `{ opacity: 0, y: 18 } → { opacity: 1, y: 0, duration: 0.45 }`. Usar `whileInView` con `viewport={{ once: true, margin: '-30%' }}`.
- **Stagger**: `staggerChildren: 0.06-0.1`, `delayChildren: 0.05`.
- **Reduced motion**: SIEMPRE `const reduceMotion = useReducedMotion()` + `initial={reduceMotion ? false : 'hidden'}`.
- **Solo animar `transform` + `opacity`**. Nunca `width/height/top/left`.
- **Variants fuera del componente** (no inline en JSX).

---

## 4. Reglas de tono — gamificación v2

Tabla mínima `prohibido / correcto`. Todo el copy debe seguir esta convención.

| Contexto | Prohibido | Correcto |
|---|---|---|
| Step indicator | "Paso 1 de 5" | "I · EL ENCUENTRO" |
| CTA inicial | "Reservar" / "COMENZAR MISIÓN" | "RENDIRSE AL DESEO" |
| CTA experiencia | "ACEPTAR MISIÓN" | "QUIERO ESTA NOCHE" |
| CTA legal | "SELLAR EL PACTO" | "FIRMAR EL JURAMENTO" |
| CTA checkout | "ACTIVAR MISIÓN" | "[ CONFIRMAR MI NOCHE ]" |
| Progress bar | "NIVEL DE TENSIÓN" | "TEMPERATURA" |
| Dashboard tab principal | "MISIÓN ACTIVA" | "TU NOCHE" |
| Countdown | "TIEMPO HASTA INFILTRACIÓN" | "CUENTA REGRESIVA HACIA TU NOCHE" |
| Upsells | "ARSENAL ACTIVO" | "TU BAÚL" |
| Cuestionario | "PERFIL DE AGENTE" | "TUS DESEOS" |
| Boutique | "LA ARMERÍA" | "EL TOCADOR" |
| GM saludo | "Agente." | "Ya te esperábamos." |
| Intensidad bajo | "NIVEL ALPHA" | "DESPERTAR · Suave" |
| Intensidad medio | "NIVEL BETA" | "INTENSO · Sin frenos" |
| Intensidad alto | "NIVEL OMEGA" | "SIN LÍMITES · Todo permitido" |
| Sección concept | "ARCHIVOS DESCLASIFICADOS" | "LO QUE NADIE MÁS TE DICE" |
| Selector ciudad | "ZONA DE OPERACIONES" | "¿DÓNDE QUIERES QUE OCURRA?" |

**Tono madre**: dark luxury, íntimo, ligeramente prohibido, siempre consensuado. Nunca vulgar. Nunca militar (sin "agente", "operación", "misión", "protocolo" en copy de cara al usuario). El usuario es deseado, no autorizado.

---

## 5. Patrones reutilizables (snippets)

### A. Eyebrow
```tsx
<p className="font-(--font-jetbrains) text-[10px] uppercase tracking-[0.22em] text-(--color-text-muted) sm:text-[11px]">
  {children}
</p>
```

### B. Surface card (la más usada)
```tsx
<div className="rounded-2xl border-(--border-subtle) bg-(--color-bg-elevated) [box-shadow:var(--glow-card)] p-6">
  …
</div>
```

### C. CTA principal (gradient)
```tsx
<Link
  href="/reservar"
  className="rounded-full px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-[filter,transform] duration-200 hover:brightness-110 active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
  style={{ background: 'var(--gradient-cta)' }}
>
  RENDIRSE AL DESEO
</Link>
```

### D. Divider band (entre secciones)
```tsx
<div className="relative border-y border-[color-mix(in_srgb,var(--color-magenta-dim)_35%,transparent)] bg-(--color-bg-subtle)/50 py-20 sm:py-24">
  <div
    className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-70"
    style={{ background: 'linear-gradient(90deg, transparent, rgba(185,48,158,0.35), rgba(232,160,64,0.25), transparent)' }}
    aria-hidden="true"
  />
  …
</div>
```

### E. Glass card (tocador / la-sociedad)
```tsx
<div className="tocador-glass rounded-xl p-8">…</div>
/* o inline: */
<div
  className="rounded-2xl"
  style={{
    background: 'rgba(20, 19, 22, 0.62)',
    backdropFilter: 'blur(16px)',
    border: '1px solid rgba(255,255,255,0.08)',
    boxShadow: 'inset 1px 1px 0 rgba(255,255,255,0.05)',
  }}
>
  …
</div>
```

### F. Intensity reactive background
```tsx
/* Se aplica a la sección que contiene la selección de intensidad. */
<section
  style={{
    background:
      intensity === 'ALPHA' ? 'var(--gradient-alpha)' :
      intensity === 'BETA'  ? 'var(--gradient-beta)'  :
      intensity === 'OMEGA' ? 'var(--gradient-omega)' :
      'var(--color-bg-base)'
  }}
>
  …
</section>
```

---

## 6. Reglas críticas (resumen)

- ❌ Nunca `any`, nunca hex en JSX, nunca default exports salvo `page.tsx`.
- ❌ Nunca `setTimeout` para animar (usar Framer Motion).
- ❌ Nunca ocultar focus rings sin alternativa visible.
- ❌ Nunca persistir datos sensibles (palabra mágica, tarjeta) fuera de estado controlado.
- ✅ Server components por defecto. `'use client'` solo si hay hook/efecto.
- ✅ Imágenes vía `<Image>` con `sizes` correcto. `sr-only` para iconos solos.
- ✅ Particle counts: 80 desktop · 30 mobile.
- ✅ Imports dinámicos (`next/dynamic`, `ssr: false`) para `signature_pad`, `qrcode.react`, `canvas-confetti`.
- ✅ Cualquier cambio en flow `/reservar` debe verificar `isStepValid` y `MissionProgress`.

---

## 7. Excepciones aceptables

- **PanicMode** ([src/components/panic/PanicMode.tsx](../src/components/panic/PanicMode.tsx)) rompe el DS intencionalmente: hex blancos/negros, fonts Georgia/Arial. Es un sitio fake neutro.
- **Stripe Elements** en Step 5: algunos colores se hardcodean porque Stripe no acepta `var()` en ciertos campos (mapear a tokens cuando se pueda).
- **QR canvas** (`CredentialQr.tsx`): `fgColor="#FFFFFF"` por contraste obligatorio.
