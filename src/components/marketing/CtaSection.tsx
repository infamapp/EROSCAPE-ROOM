import { CtaHelpSection } from '@/components/sections/CtaHelpSection'

export interface CtaSectionProps {
  className?: string
}

export function CtaSection({ className }: CtaSectionProps) {
  return <CtaHelpSection className={className} />
}
