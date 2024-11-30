import { ConversationStep } from './types'

export const conversationFlow: ConversationStep[] = [
  {
    id: 'situation',
    question: "Tell us about your current bathroom",
    subtext: "What's your starting point? This helps us understand your needs better.",
    type: 'open',
  },
  {
    id: 'pain-points',
    question: "What would you most like to change?",
    type: 'multiselect',
    options: [
      { id: 'space', text: "It feels cramped or awkward" },
      { id: 'outdated', text: "It's outdated and needs modernizing" },
      { id: 'maintenance', text: "Tired of constant cleaning and maintenance" },
      { id: 'accessibility', text: "Need better accessibility", description: "Concerned about safety and ease of use" },
      { id: 'storage', text: "Lack of storage space" },
      { id: 'safety', text: "Worried about slipping or falling", description: "Want built-in safety features" },
      { id: 'aging', text: "Planning for the future", description: "Want to age in place comfortably" },
      { id: 'mobility', text: "Difficulty getting in/out", description: "Need easier access" },
      { id: 'balance', text: "Need support features", description: "Like grab bars and built-in seating" },
      { id: 'other', text: "Something else (tell us more...)" }
    ]
  },
  {
    id: 'photos',
    question: "Would you like to show us your space?",
    subtext: "Photos help us understand your situation better and provide more personalized recommendations.",
    type: 'photo'
  },
  {
    id: 'style-preference',
    question: "What styles catch your eye?",
    subtext: "Select any styles that appeal to you - this helps us understand your taste.",
    type: 'style'
  },
  {
    id: 'must-haves',
    question: "What features are most important to you?",
    type: 'multiselect',
    options: [
      { id: 'storage', text: "Built-in storage" },
      { id: 'seating', text: "Shower seat" },
      { id: 'rainfall', text: "Rainfall shower head" },
      { id: 'glass', text: "Frameless glass" },
      { id: 'accessibility', text: "Safety features" },
      { id: 'undecided', text: "Would like to discuss options" }
    ]
  },
  {
    id: 'timeline',
    question: "Do you have a timeline in mind?",
    type: 'choice',
    options: [
      { id: 'asap', text: "As soon as possible" },
      { id: '1-3', text: "Within 1-3 months" },
      { id: '3-6', text: "Within 3-6 months" },
      { id: 'planning', text: "Just planning for now" }
    ]
  },
  {
    id: 'accessibility-needs',
    question: "Which safety and accessibility features interest you?",
    subtext: "Select all that apply - we can discuss these in detail during your consultation",
    type: 'multiselect',
    options: [
      { 
        id: 'zero-threshold', 
        text: "Zero-threshold entry",
        description: "No lip or barrier to step over"
      },
      { 
        id: 'grab-bars', 
        text: "Stylish grab bars",
        description: "Integrated safety that looks great"
      },
      { 
        id: 'seating', 
        text: "Built-in seating",
        description: "Comfortable, sturdy shower seat"
      },
      { 
        id: 'handheld', 
        text: "Handheld shower head",
        description: "For easier bathing and cleaning"
      },
      { 
        id: 'slip-resistant', 
        text: "Slip-resistant flooring",
        description: "Textured surface for better grip"
      },
      { 
        id: 'lighting', 
        text: "Enhanced lighting",
        description: "Better visibility and safety"
      },
      { 
        id: 'storage-access', 
        text: "Easy-reach storage",
        description: "Accessible built-in shelving"
      },
      { 
        id: 'other', 
        text: "Other accessibility needs",
        description: "Tell us what you're looking for"
      }
    ]
  }
] 