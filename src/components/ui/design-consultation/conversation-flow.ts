import { ConversationStep } from './types'

export const conversationFlow: ConversationStep[] = [
  {
    id: 'ownership-screening',
    question: "Do you own your home?",
    subtext: "This helps us determine how best to assist you",
    type: 'single-select',
    required: true,
    options: [
      { id: 'own', text: "Yes, I own my home" },
      { id: 'rent', text: "No, I rent" }
    ]
  },
  {
    id: 'bathroom-info',
    question: "Tell us about your bathroom",
    subtext: "Please answer all questions to continue",
    type: 'open',
    required: true
  },
  {
    id: 'pain-points',
    question: "What would you most like to change?",
    subtext: "Select all that apply",
    type: 'multiselect',
    required: true,
    options: [
      { id: 'outdated', text: "Outdated style" },
      { id: 'safety', text: "Safety concerns" },
      { id: 'space', text: "Better use of space" },
      { id: 'storage', text: "More storage" },
      { id: 'accessibility', text: "Accessibility needs" },
      { id: 'maintenance', text: "Easier maintenance" },
      { id: 'other', text: "Other", description: "Tell us more..." }
    ]
  },
  {
    id: 'photos',
    question: "Would you like to show us your space?",
    subtext: "Photos help us understand your situation better",
    type: 'photo',
    required: false
  },
  {
    id: 'style-preferences',
    question: "What styles catch your eye?",
    subtext: "Select any styles that appeal to you",
    type: 'multiselect',
    required: true,
    options: [
      {
        id: 'modern',
        text: 'Modern',
        description: 'Clean lines and contemporary design',
        features: [
          'Frameless glass design',
          'Rainfall shower head',
          'Zero-threshold entry',
          'Built-in storage'
        ]
      },
      {
        id: 'spa',
        text: 'Spa Retreat',
        description: 'Your daily sanctuary',
        features: [
          'Rainfall shower head',
          'Premium finishes',
          'Soothing colors'
        ]
      },
      {
        id: 'transitional',
        text: 'Transitional',
        description: 'Blend of traditional and contemporary',
        features: [
          'Classic with modern touches',
          'Versatile design elements',
          'Timeless appeal'
        ]
      },
      {
        id: 'traditional',
        text: 'Timeless Classic',
        description: 'Enduring beauty and elegance',
        features: [
          'Classic patterns',
          'Elegant fixtures',
          'Lasting appeal'
        ]
      },
      {
        id: 'accessible',
        text: 'Safety & Style',
        description: 'Beautiful and accessible design',
        features: [
          'Zero-threshold entry',
          'Built-in seating',
          'Stylish grab bars'
        ]
      },
      {
        id: 'not-sure',
        text: 'Not Sure - Need Design Help',
        description: 'Our designers will help you explore options',
        features: [
          'Expert guidance',
          'Style discovery',
          'Personalized recommendations'
        ]
      },
      {
        id: 'other',
        text: 'Something Different',
        description: 'Tell us about your vision',
        features: [
          'Custom design options',
          'Unique combinations',
          'Your personal style'
        ]
      }
    ]
  },
  {
    id: 'timeline',
    question: "Do you have a timeline in mind?",
    type: 'single-select',
    required: true,
    options: [
      { id: 'asap', text: "As soon as possible" },
      { id: '1-3', text: "1-3 months" },
      { id: '3-6', text: "3-6 months" },
      { id: '6plus', text: "6+ months" },
      { id: 'planning', text: "Just planning", description: "No immediate timeline" }
    ]
  },
  {
    id: 'contact-info',
    question: "Last step - how can we reach you?",
    subtext: "We'll confirm your consultation details right away",
    type: 'contact',
    required: true
  }
] 