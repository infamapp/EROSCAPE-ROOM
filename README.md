# Eroscape v2.0 — Setup & Development Guide

Eroscape es una plataforma premium de reserva de escape rooms para adultos (sensual, elegante, no explícita), con UI oscura, lujosa e inmersiva, y un flujo de reserva narrativo en **5 ACTOS**.

## Requisitos

- Node.js 20+
- pnpm

## Variables de entorno

- Copia el ejemplo y crea tu archivo local:

```bash
cp .env.local.example .env.local
```

- Variables clave:
  - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
  - `STRIPE_SECRET_KEY`
  - `STRIPE_WEBHOOK_SECRET`
  - `NEXT_PUBLIC_APP_URL`
  - `IA_WEBHOOK_URL` (opcional en prototipo)
  - `IA_WEBHOOK_SECRET` (si lo defines, el webhook IA exige `Authorization: Bearer ...`)
## Instalar dependencias

```bash
pnpm install
```

## Desarrollo

```bash
pnpm dev
```

La app corre en `http://localhost:3000`.

## Estructura de carpetas (resumen)

- `src/app/(public)/.../page.tsx`: páginas públicas
- `src/app/(auth)/.../page.tsx`: páginas de auth
- `src/app/api/.../route.ts`: API routes (App Router)
- `src/components/ui/`: componentes reutilizables
- `src/components/sections/`: secciones de páginas
- `src/components/booking/`: flujo de reserva (5 actos)
- `src/components/dashboard/`: dashboard de misión activa
- `src/hooks/`: hooks (`use...`)
- `src/types/`: tipos de dominio
- `src/lib/`: utilidades, constantes, lógica de arquetipos

## Deploy (Vercel recomendado)

- **Framework**: Next.js (App Router)
- **Build command**: `pnpm build`
- **Output**: (Next.js default)
- **Env vars**: configura en Vercel las mismas claves de `.env.local.example` (especialmente Stripe).
- **Stripe webhooks**:
  - Endpoint: `/api/webhook/stripe`
  - Firma: `STRIPE_WEBHOOK_SECRET`

## Desarrollo asistido por IA

Las reglas del proyecto (stack, convenciones, privacidad, narrativa y restricciones) están en `.cursorrules`. Mantén Cursor/IA alineado con ese archivo para no romper el estilo y los requisitos de discreción.
