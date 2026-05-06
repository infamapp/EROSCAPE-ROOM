# REDESIGN_BRIEF_TEMPLATE.md

Plantilla reutilizable para pedirle a Claude un rediseño de página manteniendo el design system de Eroscape con el mínimo consumo de tokens.

> **Cómo usarla**: copiá esta plantilla en una conversación nueva con Claude, reemplazá `<placeholders>`, adjuntá los archivos indicados y los screenshots.

---

## Inputs adjuntos

- `DESIGN_SYSTEM_COMPACT.md` (siempre).
- `PAGES.md` → solo la sección `/<ruta>` que vas a rediseñar (recortá el resto).
- `ErosCopy.json` → solo la key correspondiente a tu ruta (`home`, `reservar`, `boutique`, etc.).
- Screenshots:
  - `current-<ruta>.png` — estado actual full-page.
  - (opcional) `inspiration-1.png`, `inspiration-2.png` — referencias visuales.
- (opcional) Fragmentos del archivo TSX original solo si necesitas que Claude respete una estructura concreta.

---

## Prompt sugerido

```
# Rediseño: /<ruta>

## Contexto
Estoy rediseñando la página /<ruta> de Eroscape (escape room erótico premium).
Adjunto:
- DESIGN_SYSTEM_COMPACT.md → tokens, tipografía, animación y tono.
- PAGES.md (sección /<ruta>) → arquitectura actual de la página.
- ErosCopy.json (key <ruta>) → copy actual hardcodeado.
- Screenshot del estado actual.
- (opcional) Inspiración visual.

## Stack obligatorio
- Next.js 16 App Router (no Pages Router).
- React 19 + TypeScript 5 strict (sin `any`).
- Tailwind CSS v4 (usar shorthand `text-(--token)`, `bg-(--token)`, etc.).
- Framer Motion para todas las animaciones (con easing sensual `[0.25, 0.46, 0.45, 0.94]` y respetando `useReducedMotion()`).
- Lucide React para iconos.
- No instalar dependencias nuevas salvo que avise.

## Constraints
- Mantener tokens del DS. No inventar colores. No usar hex en JSX.
- Mantener tono dark luxury / gamificado v2 (ver tabla "prohibido / correcto" en DESIGN_SYSTEM_COMPACT.md).
- No tocar Navbar ni Footer (son chrome global, viven en src/components/layout/).
- Mantener accesibilidad: focus rings visibles, aria-labels, contraste 4.5:1 mínimo.
- Server components por defecto. `'use client'` solo si hay estado/efectos.
- Variants de Framer fuera del componente (no inline en JSX).

## Lo que cambio en este rediseño
- <bullet 1>
- <bullet 2>

## Lo que NO toco
- <bullet 1>
- <bullet 2>

## Output esperado
1. **Estructura propuesta**: lista de secciones con propósito (≤8 palabras cada una).
2. **TSX completo** de la(s) sección(es) modificada(s), pegable en src/components/<carpeta>/.
3. **Props/types**: interfaces TypeScript explícitas.
4. **Animaciones**: variants nombradas y duraciones.
5. **Notas**: cualquier asunción que hayas hecho o decisión a confirmar.

No expliques ni el DS ni los tokens (ya los conocés vía el archivo). Andá directo al código.
```

---

## Checklist antes de enviar a Claude

- [ ] Recorté `PAGES.md` para incluir SOLO la sección de la ruta que voy a rediseñar.
- [ ] Recorté `ErosCopy.json` para dejar solo la key relevante (`home`, `reservar.step3`, etc.) + `_meta` + `global` si aplica.
- [ ] Adjunté `DESIGN_SYSTEM_COMPACT.md` completo (es de 1 página, vale la pena).
- [ ] Tengo screenshot actual a 1440px de ancho.
- [ ] Llené "Lo que cambio" y "Lo que NO toco" con bullets concretos.
- [ ] Si hay inspiración visual, está marcada como referencia, no como copia literal.

---

## Tips para gastar menos tokens

1. **No subas el .cursorrules entero**: ya está condensado en `DESIGN_SYSTEM_COMPACT.md` § 4 y § 6.
2. **No subas globals.css**: los tokens están listados en § 1.
3. **No subas la plantilla en cada prompt**: solo la primera vez. Después podés decir "aplica el brief que subí en mi mensaje anterior con estos cambios: …".
4. **Si rediseñás solo UNA sección de una página** (ej. solo el hero de `/`), recortá el JSON a `home.hero` únicamente.
5. **Si pedís variantes**: numera las variantes (V1, V2) y pedile que devuelva solo el TSX, sin re-explicar el DS.

---

## Ejemplo concreto: rediseñar `/boutique`

Inputs que adjuntás a Claude:
1. `DESIGN_SYSTEM_COMPACT.md`.
2. Recorte de `PAGES.md` con solo `## /boutique`.
3. Recorte de `ErosCopy.json` con solo `_meta` + `global.shared_ctas` + `boutique`.
4. `current-boutique.png`.

Bullets de cambio:
- Cambiar el grid de 3 columnas por carrusel horizontal con scroll snap.
- Sumar un módulo de "wishlist" entre offers y reviews.
- Mantener el chip "Packaging elegante, envío discreto" pero moverlo arriba del grid.

Bullets de no-tocar:
- Categorías y CTAs (`Añadir` / `En tu baúl`) — son del flujo de carrito.
- Newsletter section — está aprobada.
- Carga de products desde `eros.json` — no rediseñar la lógica.

---

## Variantes del template

### Para rediseñar solo un componente (no página entera)

```
# Rediseño componente: <NombreComponente>

Adjunto:
- DESIGN_SYSTEM_COMPACT.md
- TSX actual del componente.
- Screenshot.

Cambios:
- <bullets>

Devolveme el TSX rediseñado, manteniendo la API de props.
```

### Para crear una página NUEVA desde cero

```
# Nueva página: /<ruta>

Adjunto:
- DESIGN_SYSTEM_COMPACT.md
- PAGES.md (para que entiendas el lenguaje de páginas existentes).
- (opcional) Inspiración visual.

Necesito una página que:
- <intent en 1 línea>
- Tenga estas secciones: <lista>
- Use copy en este tono: <referencia>

Devolveme:
1. Estructura.
2. page.tsx + componentes en src/components/<carpeta>/.
3. Sugerencias de qué agregar a ErosCopy.json para esta nueva ruta.
```
