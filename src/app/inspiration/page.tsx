import { InspirationHero } from '@/components/sections/inspiration/inspiration-hero'
import { StyleCollections } from '@/components/sections/inspiration/style-collections'
import { MaterialExplorer } from '@/components/sections/inspiration/material-explorer'
import { FeatureShowcase } from '@/components/sections/inspiration/feature-showcase'
import { InspirationBoards } from '@/components/sections/inspiration/inspiration-boards'
import { ConsultationCTA } from '@/components/shared/consultation-cta'

export default function InspirationPage(): React.JSX.Element {
  return (
    <main>
      <InspirationHero />
      <StyleCollections />
      <MaterialExplorer />
      <FeatureShowcase />
      <InspirationBoards />
      <ConsultationCTA />
    </main>
  )
} 