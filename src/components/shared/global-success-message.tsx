'use client'

import React from 'react'
import { CheckCircle } from 'lucide-react'

interface GlobalSuccessMessageProps {
  title?: string
  message?: string
  onClose: () => void
}

export function GlobalSuccessMessage({ title = "Success!", message = "Your request has been submitted successfully.", onClose }: GlobalSuccessMessageProps) {
  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
      <div className="bg-white rounded-sm max-w-md w-full p-8 text-center">
        <div className="mb-4 flex justify-center">
          <CheckCircle className="w-16 h-16 text-accent" />
        </div>
        <h3 className="text-2xl font-semibold text-[#2F2F2F] mb-4">
          {title}
        </h3>
        <p className="text-gray-600 mb-8">
          {message}
        </p>
        <button
          onClick={onClose}
          className="bg-accent text-white px-6 py-3 rounded-sm hover:bg-accent/90 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  )
} 