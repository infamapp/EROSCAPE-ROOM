export interface GeometricMemberAvatarProps {
  variant: 1 | 2 | 3
  className?: string
}

export function GeometricMemberAvatar({ variant, className }: GeometricMemberAvatarProps) {
  const stroke = 'var(--color-purple-muted)'
  const fill = 'var(--color-bg-subtle)'

  if (variant === 1) {
    return (
      <svg className={className} viewBox="0 0 64 64" role="img" aria-label="Avatar geométrico anónimo">
        <rect width="64" height="64" rx="12" fill={fill} stroke={stroke} strokeWidth="1.5" />
        <circle cx="32" cy="26" r="10" fill="none" stroke={stroke} strokeWidth="2" />
        <path d="M16 52 Q32 40 48 52" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  }

  if (variant === 2) {
    return (
      <svg className={className} viewBox="0 0 64 64" role="img" aria-label="Avatar geométrico anónimo">
        <rect width="64" height="64" rx="12" fill={fill} stroke={stroke} strokeWidth="1.5" />
        <polygon points="32,14 48,46 16,46" fill="none" stroke={stroke} strokeWidth="2" strokeLinejoin="round" />
        <circle cx="32" cy="38" r="4" fill="none" stroke={stroke} strokeWidth="1.5" />
      </svg>
    )
  }

  return (
    <svg className={className} viewBox="0 0 64 64" role="img" aria-label="Avatar geométrico anónimo">
      <rect width="64" height="64" rx="12" fill={fill} stroke={stroke} strokeWidth="1.5" />
      <rect x="18" y="18" width="28" height="28" rx="4" fill="none" stroke={stroke} strokeWidth="2" transform="rotate(12 32 32)" />
      <line x1="20" y1="48" x2="44" y2="48" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
