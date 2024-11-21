import { Suspense } from 'react'
import { InspirationHero } from '@/components/sections/inspiration/inspiration-hero'
import { StyleCollections } from '@/components/sections/inspiration/style-collections'
import { MaterialExplorer } from '@/components/sections/inspiration/material-explorer'
import { FeatureShowcase } from '@/components/sections/inspiration/feature-showcase'
import { InspirationBoards } from '@/components/sections/inspiration/inspiration-boards'
import { ConsultationCTA } from '@/components/shared/consultation-cta'
import { InspirationPageSkeleton } from '@/components/sections/inspiration/inspiration-skeleton'
import { Transition } from '@/components/ui/transition'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { Metadata } from 'next'
import { generateMetadata } from '@/lib/metadata'

export const metadata: Metadata = generateMetadata({
  title: 'Design Inspiration',
  description: 'Explore bathroom design ideas and inspiration. Browse our curated collections of styles, materials, and features to help envision your perfect bathroom.',
  path: '/inspiration',
  keywords: [
    'bathroom design ideas',
    'bathroom styles',
    'bathroom inspiration',
    'bathroom materials',
    'design features'
  ]
})

export default function InspirationPage(): React.JSX.Element {
  return (
    <Suspense fallback={<InspirationPageSkeleton />}>
      <main 
        role="main"
        aria-label="Inspiration page content"
      >
        <Transition>
          <InspirationHero />
        </Transition>
        
        <ScrollReveal variant="fadeInUp">
          <StyleCollections />
        </ScrollReveal>
        
        <ScrollReveal variant="slideIn" delay={0.2}>
          <MaterialExplorer />
        </ScrollReveal>
        
        <ScrollReveal variant="fadeInUp" delay={0.3}>
          <FeatureShowcase />
        </ScrollReveal>
        
        <ScrollReveal variant="fadeIn" delay={0.4}>
          <InspirationBoards />
        </ScrollReveal>
        
        <ScrollReveal variant="scale" delay={0.5}>
          <ConsultationCTA />
        </ScrollReveal>
      </main>
    </Suspense>
  )
} 