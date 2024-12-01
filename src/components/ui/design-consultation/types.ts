export type QuestionType = 
  | 'single-select'
  | 'multiselect'
  | 'photo'
  | 'contact'
  | 'open'
  | 'style'
  | 'bathroom-info'

export interface Option {
  id: string
  text: string
  description?: string
  icon?: React.ElementType
  features?: string[]
}

export type StepId = 
  | 'ownership-screening'
  | 'bathroom-info'
  | 'pain-points'
  | 'photos'
  | 'style-preferences'
  | 'timeline'
  | 'contact-preferences'
  | 'contact-info'

export interface ConversationStep {
  id: StepId
  question: string
  subtext?: string
  type: QuestionType
  required?: boolean
  options?: Option[]
}

export interface BaseQuestionProps {
  value: any
  onChange: (value: any) => void
  step: ConversationStep
}

export interface BaseResponse {
  isValid: boolean
  showError?: boolean
}

export interface SelectionValue extends BaseResponse {
  selection: string
}

export interface MultiSelectValue extends BaseResponse {
  selections: string[]
  otherText?: string
}

export interface ContactFormValue extends BaseResponse {
  name: string
  email: string
  phone: string
  preferredContact: 'phone' | 'email' | 'text'
  notes?: string
}

export interface PhotoUploadValue extends BaseResponse {
  files: File[]
}

export interface BathroomInfoValue extends BaseResponse {
  age?: SelectionValue
  type?: SelectionValue
  size?: SelectionValue
  notes?: string
}

export interface ConsultationResponse {
  'ownership-screening'?: SelectionValue
  'bathroom-info'?: BathroomInfoValue
  'pain-points'?: MultiSelectValue
  'photos'?: PhotoUploadValue
  'style-preferences'?: MultiSelectValue
  'timeline'?: SelectionValue
  'contact-preferences'?: SelectionValue
  'contact-info'?: ContactFormValue
}

export interface StepWithOptions extends ConversationStep {
  options: Option[]
} 