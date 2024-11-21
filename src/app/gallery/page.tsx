import { Metadata } from 'next'
import { generateMetadata } from '@/lib/metadata'
import { Suspense } from 'react'
import { GalleryHero } from '@/components/sections/gallery/gallery-hero'
import { GalleryFilters } from '@/components/sections/gallery/gallery-filters'
import { GalleryGrid } from '@/components/sections/gallery/gallery-grid'
import { BudgetTiers } from '@/components/sections/gallery/budget-tiers'
import { ConsultationCTA } from '@/components/shared/consultation-cta'
import { GalleryProvider } from '@/components/sections/gallery/gallery-context'
import { GalleryPageSkeleton } from '@/components/sections/gallery/gallery-skeleton'
import { Transition } from '@/components/ui/transition'
import { ScrollReveal } from '@/components/ui/scroll-reveal'

export const metadata: Metadata = generateMetadata({
  title: 'Project Gallery',
  description: 'Browse our collection of bathroom transformations. From simple updates to complete renovations, see how we can transform your space.',
  path: '/gallery',
  keywords: [
    'bathroom gallery',
    'before and after',
    'bathroom transformations',
    'renovation examples'
  ]
})

export default function GalleryPage(): React.JSX.Element {
  return (
    <GalleryProvider>
      <Suspense fallback={<GalleryPageSkeleton />}>
        <main 
          role="main"
          aria-label="Gallery page content"
        >
          <Transition>
            <GalleryHero />
          </Transition>
          
          <ScrollReveal variant="fadeInUp">
            <BudgetTiers />
          </ScrollReveal>
          
          <ScrollReveal variant="fadeIn" delay={0.2}>
            <GalleryFilters />
          </ScrollReveal>
          
          <ScrollReveal variant="slideIn" delay={0.3}>
            <GalleryGrid />
          </ScrollReveal>
          
          <ScrollReveal variant="scale" delay={0.4}>
            <ConsultationCTA />
          </ScrollReveal>
        </main>
      </Suspense>
    </GalleryProvider>
  )
} 