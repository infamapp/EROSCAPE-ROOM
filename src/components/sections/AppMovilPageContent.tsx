import { AppMovilDownloadSection } from '@/components/sections/AppMovilDownloadSection'
import { AppMovilHero } from '@/components/sections/AppMovilHero'
import { AppMovilInRoomFeatures } from '@/components/sections/AppMovilInRoomFeatures'
import { AppMovilPhase2Preview } from '@/components/sections/AppMovilPhase2Preview'

export function AppMovilPageContent() {
  return (
    <main>
      <AppMovilHero />
      <div className="py-16">
        <AppMovilInRoomFeatures />
      </div>
      <AppMovilDownloadSection />
      <AppMovilPhase2Preview />
    </main>
  )
}
