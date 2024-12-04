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
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white p-8 rounded-sm max-w-lg w-full mx-4">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>
        
        {/* Modal content */}
        <h2 className="text-2xl font-semibold mb-4">Finance Options</h2>
        {/* Add your finance content here */}
      </div>
    </div>
  )
} 