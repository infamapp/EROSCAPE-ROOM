# Informe de cobertura de copy (`public/eros.json`)

Fecha: 2026-05-05  
Repo: `eroscape/`  
Fuente de verdad de copy: `eroscape/public/eros.json`

## Objetivo

Identificar qué contenido que existe en `public/eros.json` **no se está mostrando** en el sitio actual (rutas/sections implementadas), y señalar divergencias entre el copy del JSON y el copy “hardcodeado” en componentes.

## Alcance revisado

### Rutas detectadas (App Router)

- **Home**: `/` → `src/app/page.tsx`
- **Experiencias**: `/experiencias` → `src/app/(public)/experiencias/page.tsx`
- **Detalle experiencia**: `/experiencias/[ciudad]/[sala]` → `src/app/(public)/experiencias/[ciudad]/[sala]/page.tsx`
- **Reserva**: `/reservar` → `src/app/(public)/reservar/page.tsx`
- **La Sociedad**: `/la-sociedad` → `src/app/(public)/la-sociedad/page.tsx`
- **Seguridad/consentimiento**: `/la-sociedad/seguridad` → `src/app/(public)/la-sociedad/seguridad/page.tsx`
- **Boutique / El Tocador**: `/boutique` → `src/app/(public)/boutique/page.tsx`
- **App móvil**: `/app-movil` → `src/app/(public)/app-movil/page.tsx`
- **FAQ**: `/FAQ` → `src/app/(public)/FAQ/page.tsx`
- **Inversores**: `/inversores` → `src/app/(public)/inversores/page.tsx`

### Componentes relevantes revisados

- Home sections: `src/components/sections/HeroSection.tsx`, `ConceptSection.tsx`, `ComoFuncionaSection.tsx`
- Seguridad: `src/components/sociedad/seguridad/SeguridadHero.tsx` (y page compuesta)
- App móvil: `src/components/app-movil/*` (en especial `AppMovilLandingHero.tsx`, `AppMovilErosenseSection.tsx`)
- FAQ: `src/components/faq/FaqPage.tsx`
- Inversores: `src/components/inversores/InversoresLanding.tsx`
- Navbar: `src/components/layout/Navbar.tsx`

## Hallazgo principal (alto impacto)

Actualmente **`eros.json` no se consume en el código**.

- No hay imports/lecturas de `eros.json` en `src/` (búsqueda por `eros.json` y por frases clave del JSON no arrojó matches).
- La mayoría del contenido visible está **hardcodeado** en componentes TSX.

**Implicación:** casi todo el copy del JSON existe “en paralelo” y no gobierna lo que el usuario ve.

## Coincidencias parciales (copy del JSON que sí aparece, pero hardcodeado)

Estas frases/conceptos existen en `eros.json` y también aparecen en UI, pero no están conectadas (son coincidencias por duplicación manual):

- **Quote de consentimiento**: `"El consentimiento manda: sin él, no hay juego."`
  - Aparece en `src/components/sociedad/seguridad/SeguridadHero.tsx`
- **EROSENSE**:
  - Existe en `eros.json.technology.erosense.*`
  - Aparece como sección propia en `src/components/app-movil/AppMovilErosenseSection.tsx`, pero con copy distinto.

## Cobertura por sección del JSON (qué NO se muestra hoy)

A continuación, por cada bloque de `eros.json`, indico su estado en el sitio:

### `hero`

Contenido en JSON:
- `hero.headline`
- `hero.subheadline`
- `hero.franchise_cta`

Estado actual:
- **No se muestra** el `headline` y `subheadline` del JSON en `HeroSection` (usa otros textos).
- **No se muestra** `franchise_cta` en ninguna ruta/section revisada.

### `concept`

Contenido en JSON:
- `concept.title`
- `concept.description`
- `concept.core_experience`

Estado actual:
- `ConceptSection` muestra una propuesta distinta (“Lo que nadie más te dice” + valores), **no** el texto del JSON.
- `core_experience` (incluye “habitación final”, jacuzzi/columpio, etc.) **no se renderiza** tal cual en una sección dedicada.

### `experiences`

Contenido en JSON:
- `experiences.lovers|golf|libertino|secreto` (name/description)

Estado actual:
- No hay una sección que muestre explícitamente estos 4 “packs narrativos” por nombre y descripción desde el JSON.
- La ruta `/experiencias` muestra catálogo, pero no se evidenció render de estas descripciones exactas.

### `technology`

Contenido en JSON:
- `technology.game_master.title/description`
- `technology.erosense.title/description/features[]`

Estado actual:
- `game_master` (descripción completa: “sin presencia física humana”, “contacto humano desde app”) **no está renderizado** como bloque con ese copy.
- `erosense.features[]` (lista de features y CTA a investigadores) **no se muestra**.

### `process`

Contenido en JSON:
- `process.title`
- `process.steps[]` (3 pasos)
- `process.quote`

Estado actual:
- `ComoFuncionaSection` existe, pero usa **5 actos** y copy distinto (no coincide con los 3 steps del JSON).
- La `quote` coincide conceptualmente, pero no está vinculada al JSON.

### `specific_experiences`

Contenido en JSON:
- `specific_experiences.el_vinculo|territorio_salvaje|la_mascarada` (name/tags/description/ideal_for)
- `specific_experiences.customization_note`

Estado actual:
- No se muestran estas experiencias específicas como sección/carrusel/cards con `tags` y descripciones del JSON.
- `customization_note` no aparece.

### `thematic_rooms`

Contenido en JSON:
- `thematic_rooms.title/intro`
- `thematic_rooms.themes[]` (5 temas)
- `thematic_rooms.uniqueness`

Estado actual:
- No hay sección dedicada que liste estos 5 temas con sus descripciones.

### `final_rooms`

Contenido en JSON:
- `final_rooms.title/description`
- `final_rooms.rooms[]` (Nocturna/Tenebrosa/Simulación)
- `final_rooms.summary`

Estado actual:
- No se muestra como sección “destino final” con estas habitaciones y copy.

### `safety`

Contenido en JSON:
- `safety.title/intro/quote`
- `safety.guarantees[]`
- `safety.process_steps[]`
- `safety.our_guarantees[]`

Estado actual:
- `/la-sociedad/seguridad` cubre la temática, pero **no se evidencia** que renderice:
  - `guarantees[]` exactamente como lista del JSON (y su wording).
  - `process_steps[]` como timeline con esos textos.
  - `our_guarantees[]` como bullets.
- Hay copy equivalente hardcodeado (y probablemente expandido), pero **no sincronizado** con el JSON.

### `boutique`

Contenido en JSON:
- `boutique.title/intro`
- `boutique.products[]` (6 productos)
- `boutique.offers[]` (2 ofertas)
- `boutique.reviews[]`
- `boutique.newsletter`

Estado actual:
- La ruta `/boutique` (El Tocador) es una membresía/beneficios, **no** una boutique de productos como en el JSON.
- Por lo tanto, **no se muestra** el listado de productos/ofertas/reviews/newsletter del JSON.

### `events`

Contenido en JSON:
- `events.title/intro`
- `events.types[]`
- `events.upcoming_events[]`
- `events.corporate_skills[]`
- `events.cta`

Estado actual:
- No se encontró una página/section dedicada que renderice estos eventos y listados desde el JSON.

### `pricing`

Contenido en JSON:
- `pricing.title/intro`
- `pricing.packs[]` (3 packs + descripción larga “Incluye:”)
- `pricing.extras.title/items[]`
- `pricing.payment_methods.title/guarantee`
- `pricing.policy.changes/duration`
- `pricing.terms[]`

Estado actual:
- No hay una página de “Precios, pagos & ofertas” que refleje este bloque.
- Es muy probable que parte de esto esté implícito en `/reservar`, pero el copy exacto del JSON **no se muestra**.

### `offers`

Contenido en JSON:
- `offers.title`
- `offers.items[]`
- `offers.promo_code`

Estado actual:
- No se muestra como sección/copy dedicado (ni en home, ni en reservar, ni en boutique) según lo revisado.

### `locations`

Contenido en JSON:
- `locations.title/current/upcoming`

Estado actual:
- No se muestra una sección explícita con “ciudades disponibles” y su copy.

### `booking`

Contenido en JSON:
- `booking.title/intro/step_1`

Estado actual:
- `/reservar` existe, pero el copy del JSON **no se confirmó** en UI (no está conectado al JSON).

### `digital_experience` + `faq_digital`

Contenido en JSON:
- `digital_experience.title/subtitle/intro`
- `digital_experience.burdel_venecia.*`
- `digital_experience.how_it_works.steps[]`
- `digital_experience.tech.*`
- `digital_experience.features[]`
- `digital_experience.platforms[]`
- `digital_experience.digital_rooms`
- `digital_experience.plans[]`
- `digital_experience.early_access`
- `faq_digital.questions[]`

Estado actual:
- `/app-movil` existe pero tiene copy propio (“La app que te guía hacia el deseo”), **no** el bloque `digital_experience` del JSON.
- No se muestran:
  - Burdel de Venecia (title/desc)
  - Steps “Descarga / Elige / Conéctate / Vive”
  - Lista completa de features
  - Planes
  - Early access con contador social
  - FAQ digital (3 preguntas/respuestas)

### `franchise`

Contenido en JSON:
- `franchise.title/intro`
- `franchise.why[]`
- `franchise.what_includes`
- `franchise.benefits[]`
- `franchise.cta`
- `franchise.form`
- `franchise.territories`

Estado actual:
- No existe una ruta `/franquicia` (ni equivalente) que muestre este contenido.
- `hero.franchise_cta` y todo el bloque `franchise.*` **no se está mostrando**.

### `faq_general`

Contenido en JSON:
- `faq_general.title`
- `faq_general.categories[]`
- `faq_general.cta`

Estado actual:
- `/FAQ` existe, pero usa un FAQ hardcodeado y categorías distintas a las del JSON.
- No se muestra `faq_general.categories[]` ni `faq_general.cta`.

### `legal`

Contenido en JSON:
- `legal.*` (términos, privacidad, consentimiento, cancelación, conducta, info corporativa/GDPR, cookies, protocolos, propiedad intelectual, resolución de disputas, update)

Estado actual:
- No hay una ruta legal dedicada (p.ej. `/legal`) que renderice este bloque.
- Parte de la temática existe en `/la-sociedad/seguridad`, pero el contenido legal completo **no está publicado**.

### `closing`

Contenido en JSON:
- `closing.title/text`
- `closing.tags[]`
- `closing.promise`

Estado actual:
- No se encontró una sección de cierre (CTA final) que refleje este copy exacto.

## Páginas nuevas construidas vs `eros.json`

### `/FAQ` (`src/components/faq/FaqPage.tsx`)

- El JSON tiene `faq_general.*` (categorías + CTA) pero **no** define preguntas/respuestas (más allá de categorías).
- El sitio tiene preguntas/respuestas hardcodeadas y una taxonomía propia.

**Faltantes (del JSON):** `faq_general.title`, `faq_general.categories[]`, `faq_general.cta`.

### `/inversores` (`src/components/inversores/InversoresLanding.tsx`)

- No existe bloque “inversores” en `eros.json`.
- El contenido de inversores está bien como página independiente, pero queda **fuera del sistema de copy**.

## Resumen ejecutivo de faltantes (por prioridad)

### Prioridad A (copy del JSON completo sin superficie en UI)

- **Franquicia**: `hero.franchise_cta` + `franchise.*`
- **Legal completo**: `legal.*`
- **Digital experience completo**: `digital_experience.*` + `faq_digital.*`
- **Pricing/Offers/Locations**: `pricing.*`, `offers.*`, `locations.*`
- **Thematic/final rooms**: `thematic_rooms.*`, `final_rooms.*`
- **Events**: `events.*`
- **Boutique (productos)**: `boutique.*` (hoy `/boutique` es membresía, no tienda)

### Prioridad B (hay sección temática, pero copy no coincide / no está sincronizado)

- **Hero**: `hero.headline/subheadline`
- **Concept**: `concept.title/description/core_experience`
- **Technology**: `technology.game_master.*` y `technology.erosense.features[]`
- **Process**: `process.steps[]` (3) vs implementación actual (5)
- **Safety**: `safety.guarantees[] / process_steps[] / our_guarantees[]` (hay contenido, pero no conectado al JSON)

## Recomendación operativa (para cerrar el gap)

Este informe es de contenido; aun así, para cerrar la brecha de forma sostenible:

- **Centralizar el copy**: mover el consumo de `eros.json` a una capa de `src/lib/content/` (p.ej. `getErosCopy()` + tipos TS).
- **Definir ownership**: decidir si el JSON es “source of truth” real o solo referencia histórica.
- **Normalizar taxonomía**: alinear categorías y nombres (p.ej. FAQ general vs FAQ digital; proceso 3 pasos vs 5 actos).

## Próximos pasos sugeridos (si querés que lo implemente)

- Crear integración de `eros.json` con tipos y validación.
- Reemplazar copy hardcodeado en `HeroSection`, `ConceptSection`, `ComoFuncionaSection`, `/FAQ`, `/app-movil` por contenido del JSON (manteniendo el tono y reglas del proyecto).
- Crear rutas nuevas para cubrir bloques ausentes: `/franquicia`, `/legal`, `/precios`, `/eventos` (o consolidar en `/la-sociedad`).

