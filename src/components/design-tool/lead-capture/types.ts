export type LeadInfo = {
  name: string
  email: string
  phone: string
  zipCode: string
  projectTimeframe: 'immediate' | '1-3 months' | '3-6 months' | '6+ months'
  budgetRange?: string
}

export type LeadCaptureProps = {
  isOpen: boolean
  onClose: () => void
  onSubmit: (leadInfo: LeadInfo) => void
  trigger: 'get-price' | 'save-design' | 'share-design' | 'consultation'
} 