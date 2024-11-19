import { GalleryHero } from '@/components/sections/gallery/gallery-hero'
import { GalleryFilters } from '@/components/sections/gallery/gallery-filters'
import { GalleryGrid } from '@/components/sections/gallery/gallery-grid'
import { BudgetTiers } from '@/components/sections/gallery/budget-tiers'
import { ConsultationCTA } from '@/components/shared/consultation-cta'
import { GalleryProvider } from '@/components/sections/gallery/gallery-context'

export default function GalleryPage(): React.JSX.Element {
  return (
    <GalleryProvider>
      <main 
        role="main"
        aria-label="Gallery page content"
      >
        <GalleryHero />
        <BudgetTiers />
        <GalleryFilters />
        <GalleryGrid />
        <ConsultationCTA />
      </main>
    </GalleryProvider>
  )
} 