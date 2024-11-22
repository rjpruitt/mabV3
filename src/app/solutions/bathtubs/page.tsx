import { BathtubsFeatures } from '@/components/sections/solutions/bathtubs/features'
import { DesignToolsShowcase } from '@/components/shared/design-tools-showcase'
import { ConsultationCTA } from '@/components/shared/consultation-cta'

export default function BathtubsPage() {
  return (
    <>
      <BathtubsFeatures />
      <DesignToolsShowcase />
      <ConsultationCTA variant="teal" />
    </>
  )
} 