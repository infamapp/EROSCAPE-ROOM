import { Check, Minus } from 'lucide-react'

import { CLUB_FEATURE_ROWS, CLUB_TIERS } from '@/lib/el-club'

export function ElClubComparisonTable() {
  return (
    <section aria-labelledby="club-compare-heading">
      <h2 id="club-compare-heading" className="font-[var(--font-playfair)] text-2xl text-white">
        Comparativa de protocolos
      </h2>
      <p className="mt-2 font-[var(--font-inter)] text-sm" style={{ color: 'var(--color-text-muted)' }}>
        Qué incluye cada nivel en una sola vista.
      </p>
      <div
        className="mt-8 overflow-x-auto rounded-2xl border border-[rgba(185,48,158,0.15)]"
        style={{ background: 'var(--color-bg-elevated)', boxShadow: 'var(--glow-card)' }}
      >
        <div
          className="grid min-w-[640px] gap-0"
          style={{ gridTemplateColumns: 'minmax(200px,2fr) repeat(3, minmax(120px,1fr))' }}
          role="grid"
          aria-label="Comparativa de beneficios por nivel"
        >
          <div role="row" className="contents text-xs">
            <div
              role="columnheader"
              className="border-b border-[rgba(185,48,158,0.12)] p-4 font-[var(--font-jetbrains)] tracking-wide"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Beneficio
            </div>
            {CLUB_TIERS.map((tier) => (
              <div
                key={tier.id}
                role="columnheader"
                className="border-b border-l border-[rgba(185,48,158,0.12)] p-4 text-center font-[var(--font-jetbrains)] text-[10px] tracking-[0.2em]"
                style={{ color: tier.accentVar }}
              >
                {tier.name}
              </div>
            ))}
          </div>
          {CLUB_FEATURE_ROWS.map((row) => (
            <div key={row.id} role="row" className="contents text-sm">
              <div
                role="rowheader"
                className="border-b border-[rgba(185,48,158,0.08)] p-4 font-[var(--font-inter)]"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {row.label}
              </div>
              {CLUB_TIERS.map((tier) => {
                const ok = tier.includes.has(row.id)
                return (
                  <div
                    key={`${row.id}-${tier.id}`}
                    role="gridcell"
                    className="flex items-center justify-center border-b border-l border-[rgba(185,48,158,0.08)] p-4"
                  >
                    {ok ? (
                      <Check className="h-5 w-5" style={{ color: tier.accentVar }} aria-label="Incluido" />
                    ) : (
                      <Minus className="h-5 w-5" style={{ color: 'var(--color-text-muted)' }} aria-label="No incluido" />
                    )}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
