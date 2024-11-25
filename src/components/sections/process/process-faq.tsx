'use client'

import React, { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAccessibility } from '@/providers/accessibility-provider'

export function ProcessFAQ(): React.JSX.Element {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const { announce } = useAccessibility()

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

  const handleToggle = (index: number) => {
    const isOpening = openIndex !== index
    const faq = faqs[index]
    
    if (isOpening) {
      setOpenIndex(index)
      announce(`Question expanded: ${faq.question}`, 'polite')
    } else {
      setOpenIndex(null)
      announce('Question collapsed', 'polite')
    }
  }

  return (
    <div 
      className="w-full py-20 bg-[#F8F6F3]"
      role="region"
      aria-labelledby="faq-heading"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 
            id="faq-heading"
            className="font-pt-serif text-4xl text-[#2F2F2F] text-center mb-12"
          >
            Common Questions
          </h2>

          <div 
            className="space-y-4"
            role="region"
            aria-label="Frequently Asked Questions"
          >
            {faqs.map((faq, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-sm overflow-hidden shadow-sm"
                initial={false}
                animate={{ 
                  backgroundColor: openIndex === index ? 'rgb(248, 246, 243)' : 'white',
                  boxShadow: openIndex === index ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none'
                }}
                transition={{ duration: 0.2 }}
              >
                <button
                  className={`
                    w-full flex items-center justify-between p-6 text-left 
                    focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                    hover:bg-[#F8F6F3] transition-colors
                  `}
                  onClick={() => handleToggle(index)}
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                  id={`faq-question-${index}`}
                  aria-label={`${faq.question}${openIndex === index ? ' (Click to collapse)' : ' (Click to expand)'}`}
                >
                  <span className="font-semibold text-[#2F2F2F] pr-8">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    aria-hidden="true"
                    className="shrink-0"
                  >
                    {openIndex === index ? (
                      <Minus className="w-5 h-5 text-primary" />
                    ) : (
                      <Plus className="w-5 h-5 text-primary" />
                    )}
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      role="region"
                      aria-labelledby={`faq-question-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="border-t border-gray-100"
                    >
                      <div className="px-6 py-4">
                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 