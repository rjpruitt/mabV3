'use client'

import { TransformationHero } from '@/components/sections/smart-solutions-alt2/hero'
import { BeforeAfterGallery } from '@/components/sections/smart-solutions-alt2/gallery'
import { NoPressurePromise } from '@/components/sections/smart-solutions-alt2/no-pressure'
import { StyleExplorer } from '@/components/sections/smart-solutions-alt2/style-explorer'
import { InstallationProcess } from '@/components/sections/smart-solutions-alt2/installation'
import { QualityValue } from '@/components/sections/smart-solutions-alt2/quality'
import { SocialProof } from '@/components/sections/smart-solutions-alt2/social-proof'
import { TransformationCTA } from '@/components/sections/smart-solutions-alt2/cta'
import { SectionDivider } from '@/components/ui/section-divider'

export default function SmartSolutionsAlt2Page() {
  return (
    <>
      <TransformationHero />
      <SectionDivider />
      
      <div className="bg-[#F8F6F3]">
        <BeforeAfterGallery />
      </div>
      <SectionDivider />
      
      <div className="bg-white">
        <NoPressurePromise />
      </div>
      <SectionDivider />
      
      <div className="bg-[#F8F6F3]">
        <StyleExplorer />
      </div>
      <SectionDivider />
      
      <div className="bg-white">
        <InstallationProcess />
      </div>
      <SectionDivider />
      
      <div className="bg-[#F8F6F3]">
        <QualityValue />
      </div>
      <SectionDivider />
      
      <div className="bg-white">
        <SocialProof />
      </div>
      <SectionDivider />
      
      <TransformationCTA />
    </>
  )
}
