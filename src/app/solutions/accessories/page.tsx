import { AccessoriesHero } from '@/components/sections/solutions/accessories/hero'
import { StorageSolutions } from '@/components/sections/solutions/accessories/storage'
import { ShowerEnclosures } from '@/components/sections/solutions/accessories/enclosures'
import { DecorativeHardware } from '@/components/sections/solutions/accessories/hardware'
import { DesignToolsShowcase } from '@/components/shared/design-tools-showcase'
import { ConsultationCTA } from '@/components/shared/consultation-cta'

export default function AccessoriesPage() {
  return (
    <>
      <AccessoriesHero />
      <StorageSolutions />
      <ShowerEnclosures />
      <DecorativeHardware />
      <DesignToolsShowcase />
      <ConsultationCTA variant="white" />
    </>
  )
} 