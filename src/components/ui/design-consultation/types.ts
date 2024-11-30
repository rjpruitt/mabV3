export type QuestionType = 'open' | 'choice' | 'photo' | 'multiselect' | 'style' | 'contact' | 'single-select' | 'bathroom-info'

export interface Option {
  id: string
  text: string
  description?: string
  icon?: React.ElementType
}

export interface ConversationStep {
  id: string
  question: string
  subtext?: string
  type: QuestionType
  required?: boolean
  options?: Option[]
}

export interface ConsultationResponse {
  [key: string]: any
} 