import { CtaHelpSectionClient } from '@/components/sections/CtaHelpSectionClient'

export interface CtaHelpSectionProps {
  className?: string
}

export function CtaHelpSection({ className }: CtaHelpSectionProps) {
  return <CtaHelpSectionClient className={className} />
}

