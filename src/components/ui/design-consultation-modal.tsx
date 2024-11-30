'use client'

import React, { useState } from 'react'
import { X, Palette, Ruler, Heart, ArrowRight } from 'lucide-react'

interface DesignConsultationModalProps {
  isOpen: boolean
  onClose: () => void
}

type DesignFocus = 'style' | 'features' | 'undecided'

export function DesignConsultationModal({ isOpen, onClose }: DesignConsultationModalProps) {
  const [step, setStep] = useState(1)
  const [designFocus, setDesignFocus] = useState<DesignFocus | null>(null)

  if (!isOpen) return null

  const designQuestions = {
    style: [
      "Do you have a specific style in mind?",
      "Are you matching existing bathroom elements?",
      "What colors/finishes interest you?"
    ],
    features: [
      "What storage solutions do you need?",
      "Any specific accessibility features?",
      "Preferred shower head configuration?"
    ],
    undecided: [
      "What don't you like about your current shower?",
      "What's your ideal shower experience?",
      "Any must-have features?"
    ]
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-sm max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-semibold text-[#2F2F2F]">Design Your Perfect Shower</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-sm transition-colors group">
            <X className="w-5 h-5 text-gray-400 group-hover:text-[#2F2F2F] transition-colors" />
          </button>
        </div>

        <div className="p-6">
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-[#2F2F2F] mb-4">
                What would you like to focus on?
              </h3>
              
              <div className="grid gap-4">
                <button
                  onClick={() => {
                    setDesignFocus('style')
                    setStep(2)
                  }}
                  className="flex items-center gap-4 p-4 border rounded-sm hover:border-accent transition-colors text-left"
                >
                  <Palette className="w-6 h-6 text-accent shrink-0" />
                  <div>
                    <div className="font-semibold text-[#2F2F2F]">Style & Design</div>
                    <div className="text-sm text-gray-600">Colors, patterns, and overall aesthetic</div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setDesignFocus('features')
                    setStep(2)
                  }}
                  className="flex items-center gap-4 p-4 border rounded-sm hover:border-accent transition-colors text-left"
                >
                  <Ruler className="w-6 h-6 text-accent shrink-0" />
                  <div>
                    <div className="font-semibold text-[#2F2F2F]">Features & Function</div>
                    <div className="text-sm text-gray-600">Storage, fixtures, and practical elements</div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setDesignFocus('undecided')
                    setStep(2)
                  }}
                  className="flex items-center gap-4 p-4 border rounded-sm hover:border-accent transition-colors text-left"
                >
                  <Heart className="w-6 h-6 text-accent shrink-0" />
                  <div>
                    <div className="font-semibold text-[#2F2F2F]">Need Inspiration</div>
                    <div className="text-sm text-gray-600">Explore options with our design experts</div>
                  </div>
                </button>
              </div>
            </div>
          )}

          {step === 2 && designFocus && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-[#2F2F2F] mb-4">
                Let's Talk About Your Vision
              </h3>
              
              <div className="space-y-4">
                {designQuestions[designFocus].map((question, index) => (
                  <div key={index} className="p-4 bg-[#F8F6F3] rounded-sm">
                    <p className="text-[#2F2F2F]">{question}</p>
                  </div>
                ))}
              </div>

              <p className="text-gray-600">
                Your design consultant will discuss these points and more during your free consultation.
              </p>

              <button 
                onClick={() => {/* Open consultation scheduler */}}
                className="w-full bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-sm flex items-center justify-center gap-2 group"
              >
                Schedule Design Consultation
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 