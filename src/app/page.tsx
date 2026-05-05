import { ComoFuncionaSection } from '@/components/sections/ComoFuncionaSection'
import { ConceptSection } from '@/components/sections/ConceptSection'
import { CtaSection } from '@/components/sections/CtaSection'
import { ExperienciasHomeFeatured } from '@/components/sections/ExperienciasHomeFeatured'
import { HeroSection } from '@/components/sections/HeroSection'

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
