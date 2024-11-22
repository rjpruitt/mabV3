import { HomeHero } from '@/components/sections/home/home-hero'
import { FeaturesBanner } from '@/components/sections/home/features-banner'
import { WhyChooseUs } from '@/components/sections/home/why-choose-us'
import { SolutionsShowcase } from '@/components/sections/home/solutions-showcase'
import { BrandShowcase } from '@/components/sections/home/brand-showcase'
import { ProcessOverview } from '@/components/sections/home/process-overview'
import { BeforeAfter } from '@/components/sections/home/before-after'
import { DesignToolsShowcase } from '@/components/shared/design-tools-showcase'
import { Testimonials } from '@/components/sections/home/testimonials'

export default function Home() {
  return (
    <main 
      role="main"
      aria-label="Main content"
    >
      <HomeHero />
      <FeaturesBanner />
      <WhyChooseUs />
      <SolutionsShowcase />
      <BrandShowcase />
      <ProcessOverview />
      <BeforeAfter />
      <DesignToolsShowcase />
      <Testimonials />
    </main>
  )
}
