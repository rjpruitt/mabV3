import { Metadata } from 'next'
import { generateMetadata } from '@/lib/metadata'
import { Suspense } from 'react'
import { ProcessHero } from '@/components/sections/process/process-hero'
import { ProcessSteps } from '@/components/sections/process/process-steps'
import { ProcessFAQ } from '@/components/sections/process/process-faq'
import { ConsultationCTA } from '@/components/shared/consultation-cta'
import { ProcessPageSkeleton } from '@/components/sections/process/process-skeleton'
import { Transition } from '@/components/ui/transition'
import { ScrollReveal } from '@/components/ui/scroll-reveal'

export const metadata: Metadata = generateMetadata({
  title: 'Our Process',
  description: 'Learn about our streamlined bathroom remodeling process. From initial consultation to final walkthrough, discover how we transform your space with minimal disruption.',
  path: '/process',
  keywords: [
    'bathroom remodeling process',
    'renovation timeline',
    'bathroom installation',
    'remodeling steps',
    'bathroom transformation'
  ]
})

export default function ProcessPage(): React.JSX.Element {
  return (
    <Suspense fallback={<ProcessPageSkeleton />}>
      <main 
        role="main"
        aria-label="Process page content"
      >
        <Transition>
          <ProcessHero />
        </Transition>
        
        <ScrollReveal>
          <ProcessSteps />
        </ScrollReveal>
        
        <ScrollReveal variant="fadeIn" delay={0.2}>
          <ProcessFAQ />
        </ScrollReveal>
        
        <ScrollReveal variant="scale" delay={0.3}>
          <ConsultationCTA />
        </ScrollReveal>
      </main>
    </Suspense>
  )
} 