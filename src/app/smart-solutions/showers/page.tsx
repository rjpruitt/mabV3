import { SmartHero } from '@/components/sections/smart-solutions/hero'
import { InstallationOptions } from '@/components/sections/smart-solutions/installation'
import { ProductExplorer } from '@/components/sections/smart-solutions/product-explorer'
import { SolutionBenefits } from '@/components/sections/smart-solutions/benefits'
import { DesignOptions } from '@/components/sections/smart-solutions/design-options'
import { ConsultationCTA } from '@/components/shared/consultation-cta'

export default function SmartShowerPage() {
  return (
    <>
      <SmartHero />
      <InstallationOptions />
      <ProductExplorer />
      <SolutionBenefits />
      <DesignOptions />
      <ConsultationCTA variant="white" />
    </>
  )
} 