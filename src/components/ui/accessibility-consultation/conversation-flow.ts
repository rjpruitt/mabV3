import { AccessibilityStep } from './types'

export const accessibilityFlow: AccessibilityStep[] = [
  {
    id: 'relationship-ownership',
    question: "Let's start with understanding your situation",
    subtext: "This helps us determine how best to assist you",
    type: 'ownership',
    required: true
  },
  {
    id: 'medicare-status',
    question: "Medicare Status",
    subtext: "This helps us identify potential assistance programs",
    type: 'medicare',
    required: true
  },
  {
    id: 'mobility-needs',
    question: "Current Mobility Needs",
    subtext: "Select all that apply",
    type: 'multiselect',
    required: true,
    options: [
      { id: 'balance', text: "Balance concerns" },
      { id: 'wheelchair', text: "Wheelchair accessibility needed" },
      { id: 'walker', text: "Walker or mobility aid used" },
      { id: 'vision', text: "Vision limitations" },
      { id: 'strength', text: "Limited strength or grip" },
      { id: 'future', text: "Planning for future needs" },
      { id: 'other', text: "Other needs", description: "Tell us more..." }
    ]
  },
  {
    id: 'safety-concerns',
    question: "Current Safety Concerns",
    subtext: "Select all that apply",
    type: 'multiselect',
    required: true,
    options: [
      { id: 'falls', text: "Fear of falling" },
      { id: 'getting-in', text: "Difficulty getting in/out" },
      { id: 'reaching', text: "Hard to reach controls" },
      { id: 'slipping', text: "Slippery surfaces" },
      { id: 'lighting', text: "Poor lighting" },
      { id: 'space', text: "Limited space" },
      { id: 'other', text: "Other concerns", description: "Tell us more..." }
    ]
  },
  {
    id: 'timeline',
    question: "When would you like to make these modifications?",
    type: 'single-select',
    required: true,
    options: [
      { id: 'urgent', text: "As soon as possible", description: "Immediate safety concerns" },
      { id: '1-3', text: "Within 3 months" },
      { id: '3-6', text: "3-6 months" },
      { id: 'planning', text: "Just planning ahead" }
    ]
  },
  {
    id: 'contact-info',
    question: "Last step - how can we reach you?",
    subtext: "We'll confirm your free safety assessment details right away",
    type: 'contact',
    required: true
  }
] 