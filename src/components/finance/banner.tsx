'use client'

import { useState } from 'react'
import { CreditCard } from 'lucide-react'
import { FinanceModal } from './modal'

export function FinanceBanner() {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <div className="bg-accent/10 border-l-4 border-accent p-6 md:p-8 rounded-sm my-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center md:text-left">
            <div className="shrink-0">
              <CreditCard className="w-8 h-8 md:w-10 md:h-10 text-accent" />
            </div>
            <div>
              <p className="font-semibold text-xl md:text-2xl text-[#2F2F2F] mb-1">
                Special Financing Available
              </p>
              <p className="text-gray-600 text-lg">
                No interest & no payments for up to 18 months.
              </p>
            </div>
            <button 
              onClick={() => setShowModal(true)}
              className="mt-4 md:mt-0 md:ml-8 bg-accent text-white px-6 py-3 rounded-sm hover:bg-accent/90 transition-colors"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>

      <FinanceModal 
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  )
} 