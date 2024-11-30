'use client'

import { X } from 'lucide-react'

interface SuccessMessageProps {
  onClose: () => void
}

export function SuccessMessage({ onClose }: SuccessMessageProps) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-sm max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-[#2F2F2F]">
            Thank You!
          </h3>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-sm transition-colors group"
          >
            <X className="w-5 h-5 text-gray-400 group-hover:text-[#2F2F2F] transition-colors" />
          </button>
        </div>
        <p className="text-gray-600 mb-6">
          We've received your design consultation request. Our team will contact you shortly to confirm your appointment.
        </p>
        <button
          onClick={onClose}
          className="w-full bg-accent text-white px-6 py-3 rounded-sm hover:bg-accent/90 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  )
} 