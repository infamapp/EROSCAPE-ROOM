import { ComoFuncionaSection } from '@/components/marketing/ComoFuncionaSection'
import { ConceptSection } from '@/components/marketing/ConceptSection'
import { CtaSection } from '@/components/marketing/CtaSection'
import { ExperienciasHomeFeatured } from '@/components/marketing/ExperienciasHomeFeatured'
import { HeroSection } from '@/components/marketing/HeroSection'

export default function Home() {
  return (
    <>
      <HeroSection />
      <ConceptSection />
      <ExperienciasHomeFeatured />
      <ComoFuncionaSection />
      <CtaSection />
    </>
  )
}
