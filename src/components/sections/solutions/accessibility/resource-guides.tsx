'use client'

import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { Download, CheckSquare, FileText, Heart, DollarSign } from 'lucide-react'
import { useRouter } from 'next/navigation'

const resources = [
  {
    id: 'bathroom-safety-checklist',
    title: 'Bathroom Safety Checklist',
    description: 'A comprehensive guide to evaluate your bathroom\'s safety. Perfect for families and caregivers.',
    icon: CheckSquare,
    cta: 'Download Checklist',
    type: 'PDF Guide',
    highlights: ['Room-by-room evaluation', '20+ safety points', 'Expert recommendations']
  },
  {
    id: 'care-guide',
    title: 'Family Caregiver Guide',
    description: 'Essential tips and insights for family members helping loved ones maintain independence.',
    icon: Heart,
    cta: 'Get Your Guide',
    type: 'Digital Guide',
    highlights: ['Daily routines', 'Care tips', 'Support strategies']
  },
  {
    id: 'medicare-guide',
    title: 'Medicare Coverage Guide',
    description: 'Learn how to maximize your Medicare benefits for bathroom safety modifications.',
    icon: DollarSign,
    cta: 'Access Guide',
    type: 'PDF Guide',
    highlights: ['Coverage details', 'Documentation help', 'Appeals process']
  },
  {
    id: 'planning-guide',
    title: 'Accessibility Planning Guide',
    description: 'Step-by-step planning resource for creating an accessible bathroom that meets your needs.',
    icon: FileText,
    cta: 'Access Guide',
    type: 'Interactive PDF',
    highlights: ['Design tips', 'Product guides', 'Project timeline']
  }
]

export function ResourceGuides() {
  const router = useRouter()

  return (
    <div className="w-full py-32 bg-white">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-pt-serif text-4xl mb-6 text-[#2F2F2F]">
              Free Resources & Guides
            </h2>
            <p className="text-gray-600 text-lg">
              Access our library of free resources designed to help you make informed decisions 
              about bathroom safety, accessibility, and Medicare coverage.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {resources.map((resource) => (
              <ScrollReveal key={resource.id}>
                <div className="group bg-white rounded-sm shadow-sm hover:shadow-lg transition-all duration-300 p-8">
                  <div className="mb-6 relative">
                    <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                      <resource.icon className="w-8 h-8 text-primary" />
                    </div>
                    <span className="absolute top-0 right-0 text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-sm">
                      {resource.type}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-[#2F2F2F] mb-2">
                    {resource.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {resource.description}
                  </p>
                  
                  {/* Highlights */}
                  <div className="mb-6 space-y-2">
                    {resource.highlights.map((highlight, index) => (
                      <div key={index} className="text-sm text-gray-500 flex items-center gap-2">
                        <div className="w-1 h-1 bg-primary rounded-full" />
                        {highlight}
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={() => router.push(`/resources/${resource.id}`)}
                    className="flex items-center gap-2 text-primary hover:text-primary/90 transition-colors w-full justify-center bg-primary/5 py-2 rounded-sm group-hover:bg-primary/10"
                  >
                    <Download className="w-5 h-5" />
                    <span>{resource.cta}</span>
                  </button>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </div>
  )
} 