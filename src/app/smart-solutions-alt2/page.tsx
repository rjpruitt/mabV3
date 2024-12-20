'use client'

import { LifestyleHero } from '@/components/sections/smart-solutions-alt2/lifestyle-hero'
import { WalkInPromotion } from '@/components/sections/smart-solutions-alt2/walk-in-promotion'
import { BeforeAfterGallery } from '@/components/sections/smart-solutions-alt2/gallery'
import { NoPressurePromise } from '@/components/sections/smart-solutions-alt2/no-pressure'
import { StyleExplorer } from '@/components/sections/smart-solutions-alt2/style-explorer'
import { InstallationProcess } from '@/components/sections/smart-solutions-alt2/installation'
import { QualityValue } from '@/components/sections/smart-solutions-alt2/quality'
import { BrandTrust } from '@/components/sections/smart-solutions-alt2/brand-trust'
import { FinanceBanner } from '@/components/sections/smart-solutions-alt2/finance-banner'
import { SectionDivider } from '@/components/ui/section-divider'
import { CleanJobPromise } from '@/components/sections/smart-solutions-alt2/clean-job-promise'
import { CleanJobBanner } from '@/components/ui/clean-job-banner'
import { MeetYourExpert } from '@/components/sections/smart-solutions-alt2/meet-your-expert'
import { AccessibilitySolutions } from '@/components/sections/smart-solutions-alt2/accessibility-solutions'
import { ValueBanner } from '@/components/ui/value-banner'
import { FullBathroomBanner } from '@/components/ui/full-bathroom-banner'
import { Testimonials } from '@/components/sections/smart-solutions-alt2/testimonials'

export default function SmartSolutionsAlt2Page() {
  return (
    <>
      <LifestyleHero />
      <WalkInPromotion />
      <FinanceBanner />
      <ValueBanner />
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
        <FullBathroomBanner />
      </div>
      <SectionDivider />
      
      <div className="bg-white">
        <AccessibilitySolutions />
      </div>
      <SectionDivider />
      
      <div className="bg-[#F8F6F3]">
        <InstallationProcess />
        <div className="container mx-auto px-4 pb-16">
          <CleanJobBanner />
        </div>
      </div>
      <SectionDivider />
      
      <MeetYourExpert />
      <SectionDivider />
      
      <CleanJobPromise />
      <SectionDivider />
      
      <div className="bg-[#F8F6F3]">
        <QualityValue />
      </div>
      <SectionDivider />
      
      <BrandTrust />
      <SectionDivider />
      <Testimonials />
      <SectionDivider />
    </>
  )
}
