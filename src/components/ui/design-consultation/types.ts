export type QuestionType = 'open' | 'choice' | 'photo' | 'multiselect' | 'style'

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
  options?: Option[]
}

export interface ConsultationResponse {
  [key: string]: any
} 