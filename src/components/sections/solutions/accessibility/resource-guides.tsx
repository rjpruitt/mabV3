'use client'

import { Section } from '@/components/ui/section'
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
    type: 'PDF Guide'
  },
  {
    id: 'care-guide',
    title: 'Family Caregiver Guide',
    description: 'Essential tips and insights for family members helping loved ones maintain independence.',
    icon: Heart,
    cta: 'Get Your Guide',
    type: 'Digital Guide'
  },
  {
    id: 'medicare-guide',
    title: 'Medicare Coverage Guide',
    description: 'Learn how to maximize your Medicare benefits for bathroom safety modifications and navigate the coverage process.',
    icon: DollarSign,
    cta: 'Access Guide',
    type: 'PDF Guide'
  },
  {
    id: 'planning-guide',
    title: 'Accessibility Planning Guide',
    description: 'Step-by-step planning resource for creating an accessible bathroom that meets your needs.',
    icon: FileText,
    cta: 'Access Guide',
    type: 'Interactive PDF'
  }
]

export function ResourceGuides() {
  const router = useRouter()

  return (
    <Section className="w-full py-32 bg-white">
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
                <div className="bg-white rounded-sm shadow-sm p-8 hover:shadow-md transition-shadow">
                  <div className="mb-6">
                    <resource.icon className="w-12 h-12 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#2F2F2F] mb-2">
                    {resource.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {resource.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <button 
                      onClick={() => router.push(`/resources/${resource.id}`)}
                      className="flex items-center gap-2 text-primary hover:text-primary/90 transition-colors"
                    >
                      <Download className="w-5 h-5" />
                      <span>{resource.cta}</span>
                    </button>
                    <span className="text-sm text-gray-500">
                      {resource.type}
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </Section>
  )
} 