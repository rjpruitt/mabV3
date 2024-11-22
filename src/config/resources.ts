export const resources = {
  'safety-checklist': {
    id: 'safety-checklist',
    title: 'Bathroom Safety Checklist',
    description: 'A comprehensive guide to evaluate your bathroom\'s safety. Perfect for families and caregivers.',
    pdfPath: '/resources/guides/bathroom-safety-checklist.pdf',
    thumbnailPath: '/resources/thumbnails/safety-checklist-thumb.jpg',
    emailTemplate: 'd-0dabcdd6056340b4aa5cb6e6a65b31de',
    formFields: [
      {
        id: 'current_bathroom',
        label: 'Do you currently have safety features in your bathroom?',
        type: 'select',
        options: ['Yes', 'No', 'Not sure'],
        required: true
      }
    ],
    thankYouMessage: 'Your Safety Checklist is on its way! Check your email for additional bathroom safety tips.'
  },
  'care-guide': {
    id: 'care-guide',
    title: 'Family Caregiver Guide',
    description: 'Essential tips and insights for family members helping loved ones maintain independence.',
    pdfPath: '/resources/guides/family-caregiver-guide.pdf',
    thumbnailPath: '/resources/thumbnails/care-guide-thumb.jpg',
    emailTemplate: 'd-0dabcdd6056340b4aa5cb6e6a65b31de',
    formFields: [
      {
        id: 'caregiver_role',
        label: 'What is your caregiving role?',
        type: 'select',
        options: [
          'Primary caregiver',
          'Family member',
          'Professional caregiver',
          'Other'
        ],
        required: true
      }
    ],
    thankYouMessage: 'Your Family Caregiver Guide is on its way! Check your email for additional caregiving resources.'
  },
  'planning-guide': {
    id: 'planning-guide',
    title: 'Accessibility Planning Guide',
    description: 'Step-by-step planning resource for creating an accessible bathroom that meets your needs.',
    pdfPath: '/resources/guides/accessibility-planning-guide.pdf',
    thumbnailPath: '/resources/thumbnails/planning-guide-thumb.jpg',
    emailTemplate: 'd-0dabcdd6056340b4aa5cb6e6a65b31de',
    formFields: [
      {
        id: 'project_timeline',
        label: 'When are you planning to start your project?',
        type: 'select',
        options: [
          'Within 1 month',
          '1-3 months',
          '3-6 months',
          'Just researching'
        ],
        required: true
      }
    ],
    thankYouMessage: 'Your Planning Guide is on its way! Check your email for additional accessibility planning resources.'
  },
  'medicare-guide': {
    id: 'medicare-guide',
    title: 'Medicare Coverage Guide',
    description: 'Understanding and maximizing your Medicare benefits for bathroom accessibility modifications.',
    pdfPath: '/resources/guides/medicare-coverage-guide.pdf',
    thumbnailPath: '/resources/thumbnails/medicare-guide-thumb.jpg',
    emailTemplate: 'd-0dabcdd6056340b4aa5cb6e6a65b31de',
    formFields: [
      {
        id: 'medicare_status',
        label: 'Current Medicare Status',
        type: 'select',
        options: [
          'Currently on Medicare',
          'Medicare eligible soon',
          'Not sure about eligibility'
        ],
        required: true
      },
      {
        id: 'medical_necessity',
        label: 'Do you have a doctor\'s recommendation for bathroom modifications?',
        type: 'select',
        options: ['Yes', 'No', 'Not yet'],
        required: true
      }
    ],
    thankYouMessage: 'Your Medicare Coverage Guide is on its way! Check your email for additional Medicare coverage tips.'
  }
} 