import { WallsHero } from '@/components/sections/solutions/walls/hero'
import { WallStyles } from '@/components/sections/solutions/walls/styles'
import { WallFeatures } from '@/components/sections/solutions/walls/features'
import { MaterialGuide } from '@/components/sections/solutions/walls/materials'
import { DesignToolsShowcase } from '@/components/shared/design-tools-showcase'
import { ConsultationCTA } from '@/components/shared/consultation-cta'

export default function WallsPage() {
  return (
    <>
      <WallsHero />
      <WallStyles />
      <WallFeatures />
      <MaterialGuide />
      <DesignToolsShowcase />
      <ConsultationCTA variant="white" />
    </>
  )
} 