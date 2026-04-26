'use client'

import { ShieldCheck } from 'lucide-react'
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { flushSync } from 'react-dom'

export interface PanicModeContextValue {
  isPanic: boolean
  activatePanic: () => void
  deactivatePanic: () => void
}

const PanicModeContext = createContext<PanicModeContextValue | null>(null)

export interface PanicModeProviderProps {
  children: React.ReactNode
}

interface BodyStyleSnapshot {
  /** Incluye shorthand `background` que usa el layout (p. ej. var(--color-bg-base)). */
  background: string
  color: string
}

function snapshotBodyStyles(): BodyStyleSnapshot {
  if (typeof document === 'undefined') {
    return { background: '', color: '' }
  }
  const s = document.body.style
  return { background: s.background || '', color: s.color || '' }
}

function applyPanicBodyStyles(): void {
  if (typeof document === 'undefined') return
  document.body.style.background = '#ffffff'
  document.body.style.color = '#111111'
}

function restoreBodyStyles(snapshot: BodyStyleSnapshot): void {
  if (typeof document === 'undefined') return
  document.body.style.background = snapshot.background
  document.body.style.color = snapshot.color
}

export function PanicModeProvider({ children }: PanicModeProviderProps) {
  const [isPanic, setIsPanic] = useState(false)
  const titleBeforeRef = useRef<string | null>(null)
  const bodyStyleBeforeRef = useRef<BodyStyleSnapshot>({ background: '', color: '' })

  const activatePanic = useCallback(() => {
    if (typeof document === 'undefined') return
    titleBeforeRef.current = document.title
    bodyStyleBeforeRef.current = snapshotBodyStyles()
    document.title = 'InfoDiario - Últimas Noticias'
    applyPanicBodyStyles()
    flushSync(() => {
      setIsPanic(true)
    })
  }, [])

  const deactivatePanic = useCallback(() => {
    if (typeof document === 'undefined') return
    document.title = titleBeforeRef.current ?? ''
    restoreBodyStyles(bodyStyleBeforeRef.current)
    flushSync(() => {
      setIsPanic(false)
    })
  }, [])

  const value = useMemo<PanicModeContextValue>(
    () => ({ isPanic, activatePanic, deactivatePanic }),
    [activatePanic, deactivatePanic, isPanic],
  )

  return (
    <PanicModeContext.Provider value={value}>
      {isPanic ? <FakeNewsPage deactivatePanic={deactivatePanic} /> : (
        <>
          {children}
          <PanicFloatingButton />
        </>
      )}
    </PanicModeContext.Provider>
  )
}

export function usePanicMode(): PanicModeContextValue {
  const ctx = useContext(PanicModeContext)
  if (!ctx) throw new Error('usePanicMode must be used within PanicModeProvider')
  return ctx
}

function PanicFloatingButton() {
  const { activatePanic } = usePanicMode()
  const [showTip, setShowTip] = useState(false)
  const [hovered, setHovered] = useState(false)
  const tipTimerRef = useRef<number | null>(null)

  const clearTipTimer = useCallback(() => {
    if (tipTimerRef.current !== null) {
      window.clearTimeout(tipTimerRef.current)
      tipTimerRef.current = null
    }
  }, [])

  useEffect(() => {
    return () => clearTipTimer()
  }, [clearTipTimer])

  const borderColor = hovered ? 'rgba(185,48,158,0.5)' : 'rgba(185,48,158,0.3)'

  return (
    <div className="fixed bottom-6 left-6 z-[9999]">
      {showTip ? (
        <div
          className="pointer-events-none absolute bottom-full left-0 mb-2 rounded px-2 py-1 font-[var(--font-jetbrains)] text-[10px] text-white shadow-md"
          style={{ background: 'rgba(8,0,8,0.92)', border: '1px solid rgba(185,48,158,0.35)' }}
          role="tooltip"
        >
          Modo privado
        </div>
      ) : null}
      <button
        type="button"
        aria-label="Activar modo privado"
        className="flex h-10 w-10 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-magenta)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-base)]"
        style={{
          background: 'rgba(8,0,8,0.7)',
          border: `1px solid ${borderColor}`,
        }}
        onMouseEnter={() => {
          setHovered(true)
          clearTipTimer()
          tipTimerRef.current = window.setTimeout(() => setShowTip(true), 700)
        }}
        onMouseLeave={() => {
          setHovered(false)
          clearTipTimer()
          setShowTip(false)
        }}
        onFocus={() => {
          setHovered(true)
          clearTipTimer()
          tipTimerRef.current = window.setTimeout(() => setShowTip(true), 700)
        }}
        onBlur={() => {
          setHovered(false)
          clearTipTimer()
          setShowTip(false)
        }}
        onClick={activatePanic}
      >
        <ShieldCheck className="h-[18px] w-[18px]" style={{ color: 'var(--color-magenta-dim)', opacity: 0.65 }} aria-hidden="true" />
      </button>
    </div>
  )
}

/** Página simulada de periódico genérico (sin marca Eroscape). */
function FakeNewsPage({ deactivatePanic }: { deactivatePanic: () => void }) {
  const tapRef = useRef({ count: 0, lastTs: 0 })

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && (e.key === 'E' || e.key === 'e')) {
        e.preventDefault()
        e.stopPropagation()
        deactivatePanic()
      }
    }
    window.addEventListener('keydown', onKey, true)
    return () => window.removeEventListener('keydown', onKey, true)
  }, [deactivatePanic])

  const formattedDate = useMemo(() => {
    return new Date().toLocaleDateString('es-ES', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }, [])

  const handleLogoTap = () => {
    const now = Date.now()
    if (now - tapRef.current.lastTs > 1000) {
      tapRef.current.count = 0
    }
    tapRef.current.lastTs = now
    tapRef.current.count += 1
    if (tapRef.current.count >= 3) {
      tapRef.current.count = 0
      deactivatePanic()
    }
  }

  const newsStyles = {
    root: {
      minHeight: '100vh',
      margin: 0,
      padding: 0,
      fontFamily: 'Georgia, "Times New Roman", serif',
      backgroundColor: '#ffffff',
      color: '#111111',
      fontSize: 16,
      lineHeight: 1.5,
    } as const,
    a: {
      color: '#0000EE',
      textDecoration: 'none',
    } as const,
    header: {
      borderBottom: '1px solid #cccccc',
      padding: '16px 24px',
      maxWidth: 1100,
      margin: '0 auto',
    } as const,
    logoRow: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      cursor: 'default',
      userSelect: 'none',
      marginBottom: 12,
    } as const,
    logoText: {
      fontSize: 28,
      fontWeight: 700,
      letterSpacing: '-0.02em',
    } as const,
    nav: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '4px 12px',
      fontSize: 13,
      fontFamily: 'Arial, Helvetica, sans-serif',
    } as const,
    main: {
      maxWidth: 1100,
      margin: '0 auto',
      padding: '24px',
    } as const,
    heroTitle: {
      fontSize: 32,
      lineHeight: 1.2,
      fontWeight: 700,
      margin: '0 0 12px 0',
    } as const,
    meta: {
      fontSize: 13,
      color: '#555555',
      marginBottom: 16,
    } as const,
    p: {
      margin: '0 0 14px 0',
      maxWidth: 720,
    } as const,
    chartBox: {
      height: 180,
      backgroundColor: '#e8e8e8',
      border: '1px solid #cccccc',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 14,
      color: '#444444',
      marginTop: 20,
      marginBottom: 32,
    } as const,
    grid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 24,
      marginTop: 8,
    } as const,
    smallCard: {
      borderTop: '1px solid #dddddd',
      paddingTop: 16,
    } as const,
    smallTitle: {
      fontSize: 17,
      fontWeight: 700,
      margin: '0 0 8px 0',
      lineHeight: 1.25,
    } as const,
    thumb: {
      width: '100%',
      height: 72,
      backgroundColor: '#dddddd',
      marginBottom: 10,
    } as const,
    footer: {
      borderTop: '1px solid #cccccc',
      marginTop: 48,
      padding: '24px',
      fontSize: 12,
      color: '#666666',
      fontFamily: 'Arial, Helvetica, sans-serif',
      maxWidth: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
      position: 'relative',
    } as const,
  }

  return (
    <div style={newsStyles.root}>
      <style>{`
        .fake-news-reset a:hover { text-decoration: underline; }
        .fake-news-reset a:focus-visible { outline: 2px solid #0000EE; outline-offset: 2px; }
        @media (max-width: 640px) {
          .fake-news-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <div className="fake-news-reset">
        <header style={newsStyles.header}>
          <button type="button" style={{ ...newsStyles.logoRow, background: 'none', border: 'none', padding: 0 }} onClick={handleLogoTap}>
            <span style={{ fontSize: 32 }} aria-hidden="true">
              📰
            </span>
            <span style={newsStyles.logoText}>InfoDiario</span>
          </button>
          <nav style={newsStyles.nav} aria-label="Secciones">
            <a href="#" style={newsStyles.a}>
              Inicio
            </a>
            <span style={{ color: '#cccccc' }}>|</span>
            <a href="#" style={newsStyles.a}>
              Nacional
            </a>
            <span style={{ color: '#cccccc' }}>|</span>
            <a href="#" style={newsStyles.a}>
              Internacional
            </a>
            <span style={{ color: '#cccccc' }}>|</span>
            <a href="#" style={newsStyles.a}>
              Economía
            </a>
            <span style={{ color: '#cccccc' }}>|</span>
            <a href="#" style={newsStyles.a}>
              Deportes
            </a>
            <span style={{ color: '#cccccc' }}>|</span>
            <a href="#" style={newsStyles.a}>
              Cultura
            </a>
          </nav>
        </header>

        <main style={newsStyles.main}>
          <article>
            <h1 style={newsStyles.heroTitle}>Los mercados europeos cierran con alzas moderadas</h1>
            <p style={newsStyles.meta}>
              {formattedDate} · Redacción Económica
            </p>
            <p style={newsStyles.p}>
              Los principales índices del Viejo Continente han registrado avances contenidos al cierre de la sesión, en un
              contexto de menor volatilidad en los tipos de interés de referencia. Los inversores mantienen la cautela ante
              las próximas reuniones de bancos centrales.
            </p>
            <p style={newsStyles.p}>
              En la zona euro, el tono dominante ha sido el de consolidación tras las últimas semanas de fluctuaciones
              acotadas en los mercados de renta variable, con volumen de negocio en línea con la media del trimestre.
            </p>
            <div style={newsStyles.chartBox}>Evolución del IBEX-35</div>
          </article>

          <div className="fake-news-grid" style={newsStyles.grid}>
            <article style={newsStyles.smallCard}>
              <div style={newsStyles.thumb} aria-hidden="true" />
              <h2 style={newsStyles.smallTitle}>El Congreso debate los presupuestos para el próximo ejercicio</h2>
              <p style={{ ...newsStyles.p, fontSize: 14, color: '#333333' }}>
                La cámara baja retoma el trámite parlamentario con enmiendas presentadas por varios grupos.
              </p>
            </article>
            <article style={newsStyles.smallCard}>
              <div style={newsStyles.thumb} aria-hidden="true" />
              <h2 style={newsStyles.smallTitle}>Previsiones meteorológicas para el fin de semana en toda España</h2>
              <p style={{ ...newsStyles.p, fontSize: 14, color: '#333333' }}>
                Anticiclón débil en el norte y posibles chubascos localizados en el litoral mediterráneo.
              </p>
            </article>
            <article style={{ ...newsStyles.smallCard, gridColumn: '1 / -1' }}>
              <div style={{ ...newsStyles.thumb, maxWidth: 200 }} aria-hidden="true" />
              <h2 style={newsStyles.smallTitle}>La selección española de fútbol prepara su próximo encuentro</h2>
              <p style={{ ...newsStyles.p, fontSize: 14, color: '#333333' }}>
                El cuerpo técnico ultima la convocatoria de cara al partido amistoso previsto para las próximas fechas FIFA.
              </p>
            </article>
          </div>
        </main>

        <footer style={newsStyles.footer}>
          © InfoDiario 2025 · Todos los derechos reservados ·{' '}
          <a href="#" style={newsStyles.a}>
            Aviso legal
          </a>{' '}
          ·{' '}
          <a href="#" style={newsStyles.a}>
            Privacidad
          </a>
          <div
            role="presentation"
            onClick={deactivatePanic}
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: 8,
              height: 8,
              opacity: 0,
              cursor: 'default',
            }}
            aria-hidden="true"
          />
        </footer>
      </div>
    </div>
  )
}
