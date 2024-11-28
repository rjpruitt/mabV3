'use client'

import { SmartHeroWithBadges } from '@/components/sections/smart-solutions-alt/hero'
import { InstallationWithTimeline } from '@/components/sections/smart-solutions-alt/installation'
import { StyleExplorerWithSupport } from '@/components/sections/smart-solutions-alt/style-explorer'
import { BenefitsWithGuarantees } from '@/components/sections/smart-solutions-alt/benefits'
import { SafetyWithProcess } from '@/components/sections/smart-solutions-alt/safety'
import { TrustBadges } from '@/components/sections/smart-solutions-alt/trust-badges'
import { ConsultationCTA } from '@/components/shared/consultation-cta'
import { ShieldCheck, Star, CheckCircle, Calendar, Ruler, Wrench, CheckSquare } from 'lucide-react'

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
    animation: 'pulse' as const,
    benefits: [
      'Meet your dedicated project team',
      'Discuss your vision and needs',
      'Get expert design recommendations',
      'Receive transparent, accurate pricing'
    ],
    customerValue: 'No salespeople, no pressure - just honest advice from the experts who will handle your project.'
  },
  { 
    step: 2, 
    title: 'Professional Measurement', 
    time: '1 hour', 
    icon: Ruler,
    animation: 'pulse' as const,
    benefits: [
      'Precise measurements by your installer',
      'Identify any structural considerations',
      'Confirm design and material choices',
      'Finalize installation timeline'
    ],
    customerValue: 'Your installer personally measures to ensure a perfect fit and smooth installation day.'
  },
  { 
    step: 3, 
    title: 'Installation Day', 
    time: '8 hours', 
    icon: Wrench,
    animation: 'pulse' as const,
    benefits: [
      'Expert installation by your project team',
      'Careful protection of your home',
      'Continuous communication',
      'Most projects completed in 1-3 days'
    ],
    customerValue: 'The same experts you\'ve been working with handle your installation with care and precision.'
  },
  { 
    step: 4, 
    title: 'Final Inspection', 
    time: '30 minutes', 
    icon: CheckSquare,
    animation: 'pulse' as const,
    benefits: [
      'Thorough quality inspection',
      'Usage and maintenance tutorial',
      'Answer any questions',
      'Ensure complete satisfaction'
    ],
    customerValue: 'Your project team ensures everything meets our high standards and you\'re delighted with the results.'
  }
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