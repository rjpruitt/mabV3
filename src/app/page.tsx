import { HomeHero } from '@/components/sections/home/home-hero'
import { FeaturesBanner } from '@/components/sections/home/features-banner'
import { WhyChooseUs } from '@/components/sections/home/why-choose-us'
import { SolutionsShowcase } from '@/components/sections/home/solutions-showcase'
import { BrandShowcase } from '@/components/sections/home/brand-showcase'
import { ProcessOverview } from '@/components/sections/home/process-overview'
import { BeforeAfter } from '@/components/sections/home/before-after'
import { Testimonials } from '@/components/sections/home/testimonials'
import { DesignToolShowcase } from '@/components/sections/home/design-tool-showcase'
import { InspirationGallery } from '@/components/sections/home/inspiration-gallery'

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
      <DesignToolShowcase />
      <InspirationGallery />
      <Testimonials />
    </main>
  )
}
