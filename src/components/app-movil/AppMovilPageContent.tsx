'use client'

import { AppMovilArchitectureSection } from '@/components/app-movil/AppMovilArchitectureSection'
import { AppMovilErosenseSection } from '@/components/app-movil/AppMovilErosenseSection'
import { AppMovilLandingHero } from '@/components/app-movil/AppMovilLandingHero'
import { AppMovilPreviewStrip } from '@/components/app-movil/AppMovilPreviewStrip'
import { AppMovilStoresStrip } from '@/components/app-movil/AppMovilStoresStrip'

export function AppMovilPageContent() {
  return (
    <main className="app-movil-page-root pb-8 pt-[calc(var(--layout-nav-height)+env(safe-area-inset-top,0px)+1rem)] sm:pt-[calc(var(--layout-nav-height)+env(safe-area-inset-top,0px)+1.5rem)]">
      <AppMovilLandingHero />
      <AppMovilArchitectureSection />
      <AppMovilErosenseSection />
      <AppMovilPreviewStrip />
      <AppMovilStoresStrip />
    </main>
  )
}
