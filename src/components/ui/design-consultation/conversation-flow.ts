import { ConversationStep } from './types'

export const conversationFlow: ConversationStep[] = [
  {
    id: 'bathroom-age',
    question: "How old is your current bathroom?",
    type: 'single-select',
    required: true,
    options: [
      { id: 'less-5', text: "Less than 5 years" },
      { id: '5-10', text: "5-10 years" },
      { id: '10-20', text: "10-20 years" },
      { id: 'more-20', text: "More than 20 years" },
      { id: 'not-sure', text: "Not sure" }
    ]
  },
  {
    id: 'bathroom-type',
    question: "What type of shower/tub do you currently have?",
    type: 'single-select',
    required: true,
    options: [
      { id: 'tub-shower', text: "Tub with shower" },
      { id: 'tub-only', text: "Tub only" },
      { id: 'stand-up', text: "Stand-up shower" },
      { id: 'walk-in', text: "Walk-in shower" },
      { id: 'multiple', text: "Multiple bathrooms", description: "We'll discuss details during your consultation" }
    ]
  },
  {
    id: 'bathroom-size',
    question: "How would you describe the space?",
    type: 'single-select',
    required: true,
    options: [
      { id: 'very-small', text: "Very small" },
      { id: 'average', text: "Average size" },
      { id: 'spacious', text: "Spacious" },
      { id: 'not-sure-size', text: "Not sure of dimensions" }
    ]
  },
  {
    id: 'additional-notes',
    question: "Anything else you'd like to tell us about your bathroom?",
    type: 'open',
    required: false
  },
  {
    id: 'pain-points',
    question: "What would you most like to change?",
    subtext: "Please select all that apply",
    type: 'multiselect',
    required: true,
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
    subtext: "Please select all that appeal to you",
    type: 'multiselect',
    required: true,
    options: [
      { 
        id: 'modern', 
        text: "Clean & Modern",
        description: "Contemporary designs with sleek finishes and minimal ornamentation"
      },
      { 
        id: 'spa', 
        text: "Spa-Like Retreat",
        description: "Relaxing atmosphere with premium comfort features"
      },
      { 
        id: 'traditional', 
        text: "Timeless Classic",
        description: "Elegant designs that never go out of style"
      },
      { 
        id: 'transitional', 
        text: "Transitional Blend",
        description: "Perfect mix of traditional and contemporary elements"
      },
      { 
        id: 'accessible', 
        text: "Accessible Luxury",
        description: "Beautiful designs with integrated safety and comfort features"
      },
      { 
        id: 'undecided', 
        text: "Would like design guidance",
        description: "Our experts will help you explore options that match your taste"
      }
    ]
  },
  {
    id: 'must-haves',
    question: "What features are most important to you?",
    subtext: "Select any features you're interested in - we can discuss the details during your consultation",
    type: 'multiselect',
    required: true,
    options: [
      { 
        id: 'storage', 
        text: "Built-in storage",
        description: "Organized space for shower essentials"
      },
      { 
        id: 'seating', 
        text: "Shower seating",
        description: "Comfortable seating options for relaxation and safety"
      },
      { 
        id: 'rainfall', 
        text: "Premium shower heads",
        description: "Enhanced shower experience with multiple options"
      },
      { 
        id: 'glass', 
        text: "Glass enclosure",
        description: "Beautiful glass options to showcase your space"
      },
      { 
        id: 'safety', 
        text: "Safety features",
        description: "Integrated features that look great and provide peace of mind"
      },
      { 
        id: 'lighting', 
        text: "Enhanced lighting",
        description: "Better visibility and ambiance"
      },
      { 
        id: 'low-maintenance', 
        text: "Easy-care surfaces",
        description: "Materials that stay beautiful with minimal effort"
      },
      { 
        id: 'undecided', 
        text: "Would like expert guidance",
        description: "Our team will help you choose the perfect features"
      }
    ]
  },
  {
    id: 'timeline',
    question: "Do you have a timeline in mind?",
    subtext: "This helps us prioritize your consultation and prepare options that match your needs",
    type: 'multiselect',
    required: true,
    options: [
      { 
        id: 'asap', 
        text: "As soon as possible",
        description: "Ready to start - prioritize my consultation"
      },
      { 
        id: '1-3', 
        text: "Within 1-3 months",
        description: "Planning to start soon - want to explore options"
      },
      { 
        id: '3-6', 
        text: "Within 3-6 months",
        description: "Researching and planning ahead"
      },
      { 
        id: 'planning', 
        text: "Just planning for now",
        description: "Want to understand options and costs"
      }
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
  },
  {
    id: 'contact-preferences',
    question: "When would you like us to contact you?",
    subtext: "Help us schedule your consultation at a convenient time",
    type: 'multiselect',
    required: true,
    options: [
      {
        id: 'weekday-morning',
        text: "Weekday Mornings",
        description: "Monday-Friday, 8am-12pm"
      },
      {
        id: 'weekday-afternoon',
        text: "Weekday Afternoons",
        description: "Monday-Friday, 12pm-5pm"
      },
      {
        id: 'weekday-evening',
        text: "Weekday Evenings",
        description: "Monday-Friday, 5pm-8pm"
      },
      {
        id: 'saturday',
        text: "Saturday",
        description: "Flexible on Saturday times"
      }
    ]
  },
  {
    id: 'contact-info',
    question: "Last step - how can we reach you?",
    subtext: "We'll confirm your consultation details right away",
    type: 'contact'
  }
] 