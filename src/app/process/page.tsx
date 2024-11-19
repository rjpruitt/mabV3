import { ProcessHero } from '@/components/sections/process/process-hero'
import { ProcessSteps } from '@/components/sections/process/process-steps'
import { ProcessFAQ } from '@/components/sections/process/process-faq'
import { ConsultationCTA } from '@/components/shared/consultation-cta'

export default function ProcessPage(): React.JSX.Element {
  return (
    <main 
      role="main"
      aria-label="Process page content"
    >
      <ProcessHero />
      <ProcessSteps />
      <ProcessFAQ />
      <ConsultationCTA />
    </main>
  )
} 