'use client'

import React, { useState } from 'react'
import { Plus, Minus } from 'lucide-react'

export function ProcessFAQ(): React.JSX.Element {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: 'How long does the typical installation take?',
      answer: 'Most of our bathroom transformations are completed in 1-3 days, depending on the scope of work. Simple updates like installing grab bars can be done in a few hours, while complete transformations may take 2-3 days.'
    },
    {
      question: 'Do you handle all the necessary permits?',
      answer: 'Yes, we handle all required permits and ensure all work meets or exceeds local building codes and regulations.'
    },
    {
      question: 'What kind of warranty do you offer?',
      answer: 'We provide a comprehensive workmanship guarantee on our installations. Additionally, all products come with their respective manufacturer warranties.'
    },
    {
      question: 'How much mess and disruption should I expect?',
      answer: 'We take great care to minimize disruption to your home. Our teams use protective coverings and clean up thoroughly each day. While some noise and dust are unavoidable during renovation, we work efficiently to minimize any inconvenience.'
    },
    {
      question: 'Can you work with my existing plumbing?',
      answer: 'In most cases, yes. Our solutions are designed to work with existing plumbing configurations. During the consultation, we will assess your current setup and discuss any necessary modifications.'
    }
  ]

  return (
    <section className="w-full py-20 bg-[#F8F6F3]">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-pt-serif text-4xl text-[#2F2F2F] text-center mb-12">
            Common Questions
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-white rounded-sm"
              >
                <button
                  className="w-full flex items-center justify-between p-6 text-left"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <span className="font-semibold text-[#2F2F2F]">{faq.question}</span>
                  {openIndex === index ? (
                    <Minus className="w-5 h-5 text-primary shrink-0" />
                  ) : (
                    <Plus className="w-5 h-5 text-primary shrink-0" />
                  )}
                </button>
                
                {openIndex === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 