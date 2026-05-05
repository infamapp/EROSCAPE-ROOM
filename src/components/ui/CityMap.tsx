'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'

import { cn } from '@/lib/utils'

import spainPaths from '@/lib/geo/spain-paths.json'

const SENSUAL_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

const SPAIN_VIEWBOX = { x: 0, y: 0, width: 1000, height: 890 } as const

// Spain silhouette built from administrative shapes, rendered as a single path so it reads as one country outline.
// Source: https://simplemaps.com/static/svg/country/es/admin1/es.svg (downloaded and extracted).
const SPAIN_PATHS = spainPaths as readonly string[]

function unionBBox(a: DOMRect, b: DOMRect): DOMRect {
  const x1 = Math.min(a.x, b.x)
  const y1 = Math.min(a.y, b.y)
  const x2 = Math.max(a.x + a.width, b.x + b.width)
  const y2 = Math.max(a.y + a.height, b.y + b.height)
  return new DOMRect(x1, y1, x2 - x1, y2 - y1)
}

function padBBox(b: DOMRect, pad: number): DOMRect {
  const x = Math.max(0, b.x - pad)
  const y = Math.max(0, b.y - pad)
  const w = Math.min(SPAIN_VIEWBOX.width - x, b.width + pad * 2)
  const h = Math.min(SPAIN_VIEWBOX.height - y, b.height + pad * 2)
  return new DOMRect(x, y, w, h)
}

export interface CityMapCity {
  slug: string
  displayName: string
  lat?: number
  lon?: number
  svgX: string
  svgY: string
}

export interface CityMapProps {
  cities: readonly CityMapCity[]
  activeCitySlug: string
  onSelectCity: (slug: string) => void
  className?: string
}

interface ViewBoxRect {
  x: number
  y: number
  width: number
  height: number
}

const SPAIN_MAINLAND_BOUNDS = {
  // Rough mainland bounds in WGS84 (exclude Canaries).
  minLat: 35.5,
  maxLat: 43.8,
  // Calibrated to match the specific SVG silhouette projection.
  // Slightly extended west and slightly tightened east so Barcelona/Valencia
  // land inside the coastline for this asset.
  minLon: -8.40,
  maxLon: 3.1,
} as const

function parsePercent(pct: string): number {
  const n = Number(pct.replace('%', ''))
  return Number.isFinite(n) ? n / 100 : 0
}

function clamp01(n: number): number {
  if (n < 0) return 0
  if (n > 1) return 1
  return n
}

function projectLatLonToViewBox(lat: number, lon: number, viewBox: ViewBoxRect): { x: number; y: number } {
  const x01 =
    (lon - SPAIN_MAINLAND_BOUNDS.minLon) / (SPAIN_MAINLAND_BOUNDS.maxLon - SPAIN_MAINLAND_BOUNDS.minLon)
  const y01 =
    (SPAIN_MAINLAND_BOUNDS.maxLat - lat) / (SPAIN_MAINLAND_BOUNDS.maxLat - SPAIN_MAINLAND_BOUNDS.minLat)

  const x = viewBox.x + clamp01(x01) * viewBox.width
  const y = viewBox.y + clamp01(y01) * viewBox.height
  return { x, y }
}

function cityToViewBoxPoint(city: CityMapCity, viewBox: ViewBoxRect): { x: number; y: number } {
  if (typeof city.lat === 'number' && typeof city.lon === 'number') {
    return projectLatLonToViewBox(city.lat, city.lon, viewBox)
  }

  return {
    x: viewBox.x + parsePercent(city.svgX) * viewBox.width,
    y: viewBox.y + parsePercent(city.svgY) * viewBox.height,
  }
}

export function CityMap({ cities, activeCitySlug, onSelectCity, className }: CityMapProps) {
  const shouldReduceMotion = useReducedMotion()
  const [hoverSlug, setHoverSlug] = useState<string | null>(null)
  const [computedViewBox, setComputedViewBox] = useState<ViewBoxRect>(SPAIN_VIEWBOX)
  const [silhouettePath, setSilhouettePath] = useState<string>(() => SPAIN_PATHS.join(' '))

  // Compute a "mainland-first" viewBox so markers placed by % land on the country,
  // not on the whitespace created by islands in the source SVG.
  useEffect(() => {
    const svgNs = 'http://www.w3.org/2000/svg'
    const svg = document.createElementNS(svgNs, 'svg')
    svg.setAttribute('viewBox', `${SPAIN_VIEWBOX.x} ${SPAIN_VIEWBOX.y} ${SPAIN_VIEWBOX.width} ${SPAIN_VIEWBOX.height}`)
    svg.setAttribute('width', '0')
    svg.setAttribute('height', '0')
    svg.style.position = 'absolute'
    svg.style.left = '-9999px'
    svg.style.top = '-9999px'

    const paths = SPAIN_PATHS.map((d) => {
      const p = document.createElementNS(svgNs, 'path')
      p.setAttribute('d', d)
      svg.appendChild(p)
      return p
    })

    document.body.appendChild(svg)

    try {
      const bboxes = paths.map((p) => p.getBBox())

      // Canary Islands are far below; filtering them out removes the big lower whitespace.
      const mainlandCandidates = bboxes
        .map((bbox, i) => ({ bbox, d: SPAIN_PATHS[i] }))
        .filter(({ bbox }) => bbox.y < 650)

      const union = mainlandCandidates.reduce<DOMRect | null>((acc, cur) => {
        if (!acc) return cur.bbox
        return unionBBox(acc, cur.bbox)
      }, null)

      if (union) {
        const padded = padBBox(union, 18)
        const nextViewBox = { x: padded.x, y: padded.y, width: padded.width, height: padded.height }
        const nextPath = mainlandCandidates.map((c) => c.d).join(' ')
        const t = window.setTimeout(() => {
          setComputedViewBox(nextViewBox)
          setSilhouettePath(nextPath)
        }, 0)
        return () => window.clearTimeout(t)
      } else {
        const t = window.setTimeout(() => {
          setComputedViewBox(SPAIN_VIEWBOX)
          setSilhouettePath(SPAIN_PATHS.join(' '))
        }, 0)
        return () => window.clearTimeout(t)
      }
    } catch {
      const t = window.setTimeout(() => {
        setComputedViewBox(SPAIN_VIEWBOX)
        setSilhouettePath(SPAIN_PATHS.join(' '))
      }, 0)
      return () => window.clearTimeout(t)
    } finally {
      document.body.removeChild(svg)
    }
  }, [])

  const tooltip = useMemo(() => {
    if (!hoverSlug) return null
    const city = cities.find((c) => c.slug === hoverSlug)
    if (!city) return null
    const { x, y } = cityToViewBoxPoint(city, computedViewBox)
    const xPct = ((x - computedViewBox.x) / computedViewBox.width) * 100
    const yPct = ((y - computedViewBox.y) / computedViewBox.height) * 100
    return { city, xPct, yPct }
  }, [cities, computedViewBox, hoverSlug])

  return (
    <div
      className={cn('relative mx-auto w-full max-w-[980px]', className)}
      style={{ aspectRatio: `${computedViewBox.width} / ${computedViewBox.height}` }}
    >
      <svg
        viewBox={`${computedViewBox.x} ${computedViewBox.y} ${computedViewBox.width} ${computedViewBox.height}`}
        className="h-full w-full"
        aria-label="Mapa de España con ciudades disponibles"
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          d={silhouettePath}
          fill="var(--color-bg-elevated)"
          fillOpacity={0.55}
          stroke="var(--color-magenta-dim)"
          strokeOpacity={0.25}
          strokeWidth={2}
        />

        {cities.map((city, index) => {
          const { x, y } = cityToViewBoxPoint(city, computedViewBox)
          const isActive = city.slug === activeCitySlug
          const isHover = city.slug === hoverSlug

          return (
            <g
              key={city.slug}
              transform={`translate(${x} ${y})`}
              onMouseEnter={() => setHoverSlug(city.slug)}
              onMouseLeave={() => setHoverSlug((v) => (v === city.slug ? null : v))}
              onClick={() => onSelectCity(city.slug)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onSelectCity(city.slug)
                }
              }}
              aria-label={`Elegir ${city.displayName}`}
            >
              <motion.circle
                r="16"
                fill="none"
                stroke="var(--color-magenta)"
                initial={shouldReduceMotion ? false : { scale: 1, opacity: 0 }}
                animate={shouldReduceMotion ? undefined : { scale: [1, 2], opacity: [0.6, 0] }}
                transition={
                  shouldReduceMotion
                    ? undefined
                    : { duration: 2, repeat: Infinity, delay: index * 0.4, ease: SENSUAL_EASE }
                }
                aria-hidden="true"
              />
              <motion.circle
                r="6"
                fill={isActive ? 'var(--color-magenta)' : 'var(--color-magenta-dim)'}
                animate={shouldReduceMotion ? undefined : isHover ? { r: 10 } : { r: 6 }}
                transition={shouldReduceMotion ? undefined : { duration: 0.15, ease: SENSUAL_EASE }}
                aria-hidden="true"
              />
              <text
                x="0"
                y="26"
                textAnchor="middle"
                fontSize="10"
                style={{
                  fill: isActive ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
                  fontFamily: 'var(--font-jetbrains), ui-monospace, SFMono-Regular, Menlo, monospace',
                }}
              >
                {city.displayName}
              </text>
            </g>
          )
        })}
      </svg>

      <AnimatePresence>
        {tooltip ? (
          <motion.div
            className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full"
            style={{ left: `${tooltip.xPct}%`, top: `${tooltip.yPct}%` }}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, y: 6 }}
            transition={shouldReduceMotion ? undefined : { duration: 0.2, ease: SENSUAL_EASE }}
            aria-hidden="true"
          >
            <div
              className="rounded-xl px-4 py-3 text-sm"
              style={{
                background: 'rgba(17,0,17,0.92)',
                border: 'var(--border-subtle)',
                boxShadow: 'var(--glow-card)',
                backdropFilter: 'blur(10px)',
                color: 'var(--color-text-primary)',
              }}
            >
              <div className="font-(--font-playfair)">{tooltip.city.displayName}</div>
              <div className="mt-1 text-xs" style={{ color: 'var(--color-text-muted)' }}>
                6 experiencias disponibles
              </div>
              <div className="mt-2 text-xs" style={{ color: 'var(--color-magenta)' }}>
                Entrar →
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

