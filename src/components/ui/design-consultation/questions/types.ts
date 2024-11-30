import { ConversationStep } from '../types'

export interface BaseQuestionProps {
  value: any
  onChange: (value: any) => void
  step: ConversationStep
}

export interface MultiSelectValue {
  selections: string[]
  otherText?: string
} 