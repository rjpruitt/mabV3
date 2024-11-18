import { HomeHero } from '@/components/sections/home/home-hero'
import { FeaturesBanner } from '@/components/sections/home/features-banner'
import { WhyChooseUs } from '@/components/sections/home/why-choose-us'
import { SolutionsShowcase } from '@/components/sections/home/solutions-showcase'

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
    </main>
  )
}
