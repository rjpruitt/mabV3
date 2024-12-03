'use client'

import React, { useState } from 'react'
import { X } from 'lucide-react'
import { DesignConsultation } from '@/components/ui/design-consultation'
import type { ConsultationResponse } from '@/components/ui/design-consultation'

interface OfferModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  offer: {
    headline: string
    details: string[]
    savings: string
    validUntil: string
  }
  type: 'tub-conversion' | 'shower-replacement'
  onConsultationClick: () => void
}

export function OfferModal({ isOpen, onClose, title, offer, type, onConsultationClick }: OfferModalProps) {
  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-sm max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-2xl font-semibold text-[#2F2F2F]">{title}</h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-sm transition-colors group"
            >
              <X className="w-5 h-5 text-gray-400 group-hover:text-[#2F2F2F] transition-colors" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="bg-accent/10 p-4 rounded-sm mb-6">
              <h3 className="text-xl font-semibold text-[#2F2F2F] mb-2">
                {offer.headline}
              </h3>
              <ul className="space-y-2">
                {offer.details.map((detail, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-600">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2" />
                    {detail}
                  </li>
                ))}
              </ul>
              <p className="text-lg font-semibold text-primary mt-4">
                {offer.savings}
              </p>
            </div>

            <div className="text-sm text-gray-500 mb-6">
              Offer valid until {offer.validUntil}. Cannot be combined with other offers.
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button 
                onClick={onConsultationClick}
                className="w-full bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-sm transition-colors"
              >
                Schedule Free Consultation
              </button>
              <p className="text-center text-sm text-gray-600">
                Get a no-obligation estimate valid for 30 days.<br />
                No pressure, guaranteed.
              </p>
            </div>
          </div>
        </div>
      </div>

      <DesignConsultation
        isOpen={false}
        onClose={() => {}}
        onComplete={(responses: ConsultationResponse) => {
          console.log('Consultation responses:', responses)
        }}
      />
    </>
  )
} 