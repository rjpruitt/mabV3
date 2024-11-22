import { ShowersHero } from '@/components/sections/solutions/showers/hero'
import { ShowersFeatures } from '@/components/sections/solutions/showers/features'
import { DesignToolsShowcase } from '@/components/shared/design-tools-showcase'
import { ConsultationCTA } from '@/components/shared/consultation-cta'

export default function ShowersPage() {
  return (
    <>
      <ShowersHero />
      <ShowersFeatures />
      <DesignToolsShowcase />
      <ConsultationCTA variant="teal" />
    </>
  )
} 