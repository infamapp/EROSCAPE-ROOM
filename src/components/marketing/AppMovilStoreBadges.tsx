export interface AppMovilStoreBadgeSvgProps {
  className?: string
}

/** Badge estilo tienda (prototipo, no oficial). */
export function AppStoreBadgeSvg({ className }: AppMovilStoreBadgeSvgProps) {
  return (
    <svg className={className} viewBox="0 0 132 44" role="img" aria-hidden="true">
      <rect width="132" height="44" rx="9" fill="var(--color-bg-elevated)" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
      <g transform="translate(14,10)" fill="white">
        <path d="M12 4.5c-1.2 0-2.2 1-2.2 2.2 0 1.2 1 2.2 2.2 2.2 1.2 0 2.2-1 2.2-2.2 0-1.2-1-2.2-2.2-2.2zm-1.5 6.2c-2 0-3.5 1.5-3.5 3.5V22h10v-7.8c0-2-1.5-3.5-3.5-3.5h-3z" opacity="0.95" />
        <path d="M14 2.5c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2z" opacity="0.85" />
      </g>
      <text x="44" y="19" fill="rgba(255,255,255,0.5)" fontSize="7" fontFamily="system-ui, sans-serif">
        Descargar en el
      </text>
      <text x="44" y="31" fill="white" fontSize="13" fontWeight="600" fontFamily="system-ui, sans-serif">
        App Store
      </text>
    </svg>
  )
}

export function GooglePlayBadgeSvg({ className }: AppMovilStoreBadgeSvgProps) {
  return (
    <svg className={className} viewBox="0 0 148 44" role="img" aria-hidden="true">
      <rect width="148" height="44" rx="9" fill="var(--color-bg-elevated)" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
      <g transform="translate(12,9)">
        <path d="M4 6L4 18L14 12Z" fill="var(--color-gm-terminal)" />
        <path d="M4 6L14 12L4 18V14L10 12L4 10Z" fill="var(--color-intensity-alpha)" />
        <path d="M4 18L14 12L18 15L8 22Z" fill="var(--color-gold)" />
        <path d="M4 6L14 12L18 9L8 2Z" fill="var(--color-magenta)" />
      </g>
      <text x="46" y="19" fill="rgba(255,255,255,0.5)" fontSize="7" fontFamily="system-ui, sans-serif">
        DISPONIBLE EN
      </text>
      <text x="46" y="31" fill="white" fontSize="13" fontWeight="600" fontFamily="system-ui, sans-serif">
        Google Play
      </text>
    </svg>
  )
}
