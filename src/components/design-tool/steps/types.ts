export type StepId = 
  | 'project-type'
  | 'shape'
  | 'plumbing'
  | 'base'
  | 'walls'
  | 'fixtures'
  | 'accessories'
  | 'review'

export type Step = {
  id: StepId
  title: string
  description: string
  isComplete: boolean
}

export type ProjectType = 'tub-to-shower' | 'shower-replacement' | 'tub-shower-combo'

export type StepProps = {
  onNext: () => void
  onBack: () => void
  onSave?: () => void
} 