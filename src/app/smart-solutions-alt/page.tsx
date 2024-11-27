'use client'

import { SmartHeroWithBadges } from '@/components/sections/smart-solutions-alt/hero'
import { InstallationWithTimeline } from '@/components/sections/smart-solutions-alt/installation'
import { StyleExplorerWithSupport } from '@/components/sections/smart-solutions-alt/style-explorer'
import { BenefitsWithGuarantees } from '@/components/sections/smart-solutions-alt/benefits'
import { SafetyWithProcess } from '@/components/sections/smart-solutions-alt/safety'
import { TrustBadges } from '@/components/sections/smart-solutions-alt/trust-badges'
import { ConsultationCTA } from '@/components/shared/consultation-cta'
import { ShieldCheck, Star, CheckCircle, Calendar } from 'lucide-react'

const floatingBadges = [
  { icon: ShieldCheck, text: 'Fully Insured' },
  { icon: Star, text: '5-Star Rated' },
  { icon: CheckCircle, text: '100% Satisfaction Guarantee' }
]

const processSteps = [
  { 
    step: 1, 
    title: 'Free Consultation', 
    time: '1 hour',
    icon: Calendar,
    animation: 'pulse' as const
  },
  { step: 2, title: 'Professional Measurement', time: '1 hour', icon: Calendar, animation: 'pulse' as const },
  { step: 3, title: 'One-Day Installation', time: '8 hours', icon: Calendar, animation: 'pulse' as const },
  { step: 4, title: 'Final Inspection', time: '30 minutes', icon: Calendar, animation: 'pulse' as const }
]

const cleanlinessGuarantee = {
  title: 'Our Clean Job Site Promise',
  details: 'Dust barriers, daily cleanup, and thorough final cleaning'
}

export default function SmartSolutionsAltPage() {
  return (
    <>
      <SmartHeroWithBadges />
      <InstallationWithTimeline 
        processSteps={processSteps}
        cleanlinessGuarantee={cleanlinessGuarantee}
      />
      <StyleExplorerWithSupport 
        expertGuidance={{
          title: 'Expert Support Every Step',
          consultantInfo: 'Our design experts help you choose',
          sampleInfo: 'See and feel materials in your home'
        }}
        decisionSupport={{
          preDesigned: 'Choose from designer-curated collections',
          custom: 'Or create your own perfect combination'
        }}
      />
      <BenefitsWithGuarantees 
        warranties={[
          { type: 'Product', years: 'Lifetime' },
          { type: 'Installation', years: '5 Years' },
          { type: 'Workmanship', years: '2 Years' }
        ]}
        qualityPromise={{
          title: 'Our Quality Promise',
          details: 'Premium materials, expert installation, lasting beauty'
        }}
      />
      <SafetyWithProcess 
        teamInfo={{
          title: 'Meet Your Installation Team',
          experience: '15+ Years Average Experience',
          training: 'Factory-Certified Installers',
          background: 'Background Checked & Drug Tested'
        }}
        timelineInfo={{
          title: 'Your Installation Day',
          morning: 'Setup & Protection',
          midday: 'Installation Progress',
          afternoon: 'Completion & Cleanup'
        }}
      />
      <TrustBadges />
      <ConsultationCTA 
        variant="white"
        features={[
          'Lifetime Product Warranty',
          'Expert Installation',
          'Clean Job Site Promise'
        ]}
      />
    </>
  )
} 