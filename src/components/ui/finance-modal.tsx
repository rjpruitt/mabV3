'use client'

import React from 'react'
import { X, Calendar, CheckCircle } from 'lucide-react'

interface FinanceModalProps {
  isOpen: boolean
  onClose: () => void
}

export function FinanceModal({ isOpen, onClose }: FinanceModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-sm max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-semibold text-[#2F2F2F]">
            Special Financing Options
          </h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-sm transition-colors group"
          >
            <X className="w-5 h-5 text-gray-400 group-hover:text-[#2F2F2F] transition-colors" />
          </button>
        </div>

        <div className="p-6">
          {/* How It Works */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-[#2F2F2F] mb-4">
              How No Payments & No Interest Works:
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-[#2F2F2F]">No payments required for 18 months</p>
                  <p className="text-gray-600">Enjoy your new shower now, start paying later</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-[#2F2F2F]">0% interest if paid in full</p>
                  <p className="text-gray-600">Pay the full amount within 18 months and pay no interest</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-accent shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-[#2F2F2F]">Flexible payment options</p>
                  <p className="text-gray-600">Choose your payment date and method</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <button className="w-full bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-sm transition-colors">
              Schedule Free Consultation
            </button>
            <button className="w-full bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-sm transition-colors">
              Check If You Pre-Qualify
            </button>
            <p className="text-center text-sm text-gray-500">
              Checking if you pre-qualify won't affect your credit score
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 