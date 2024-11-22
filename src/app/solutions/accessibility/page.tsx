import { AccessibilityHero } from '@/components/sections/solutions/accessibility/hero'
import { AccessibilityFeatures } from '@/components/sections/solutions/accessibility/features'
import { SafetyAssessmentCTA } from '@/components/sections/solutions/accessibility/safety-assessment-cta'
import { ResourceGuides } from '@/components/sections/solutions/accessibility/resource-guides'

export default function AccessibilityPage() {
  return (
    <>
      <AccessibilityHero />
      <AccessibilityFeatures />
      <SafetyAssessmentCTA />
      <ResourceGuides />
    </>
  )
} 