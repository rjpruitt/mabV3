import { SmartHero } from '@/components/sections/smart-solutions/hero'
import { InstallationOptions } from '@/components/sections/smart-solutions/installation'
import { StyleExplorer } from '@/components/sections/smart-solutions/style-explorer'
import { SolutionBenefits } from '@/components/sections/smart-solutions/benefits'
import { SafetyFeatures } from '@/components/sections/smart-solutions/safety-features'
import { TrustedBrands } from '@/components/sections/smart-solutions/trusted-brands'
import { ConsultationCTA } from '@/components/shared/consultation-cta'

export default function SmartShowerPage() {
  return (
    <>
      <SmartHero />
      <InstallationOptions />
      <StyleExplorer />
      <SolutionBenefits />
      <SafetyFeatures />
      <TrustedBrands />
      <ConsultationCTA variant="white" />
    </>
  )
} 