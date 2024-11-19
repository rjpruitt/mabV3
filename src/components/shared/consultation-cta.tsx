'use client'

import React from 'react'
import Link from 'next/link'

interface ConsultationCTAProps {
  className?: string
  darkMode?: boolean
}

export function ConsultationCTA({ className = '', darkMode = false }: ConsultationCTAProps): React.JSX.Element {
  const textColor = darkMode ? 'text-white' : 'text-[#2F2F2F]'
  const mutedTextColor = darkMode ? 'text-white/80' : 'text-gray-600'

  return (
    <section className="w-full py-32 bg-white">
      <div className={`max-w-[800px] mx-auto text-center px-4 ${className}`}>
        <h3 className={`font-pt-serif text-4xl ${textColor} mb-4`}>
          Ready To Speak With A Mid America Bathworks Expert?
        </h3>
        <p className={`${mutedTextColor} mb-8`}>
          Book a FREE consultation by calling us at <span className="text-accent">1 (555) 555-5555</span> or by using
          the link below to book a preferred date and time!
        </p>
        <Link
          href="/consultation"
          className="bg-accent px-8 py-3 rounded-sm font-montserrat font-semibold text-white hover:opacity-90 transition-opacity inline-block"
        >
          BOOK A FREE CONSULTATION
        </Link>
        <p className="font-dancing text-2xl mt-8 text-accent">
          It's quick, free and easy!
        </p>
      </div>
    </section>
  )
} 