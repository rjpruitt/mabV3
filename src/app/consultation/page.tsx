'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ConsultationPage() {
  const router = useRouter()
  
  return (
    <div className="min-h-screen bg-[#F8F6F3] py-16">
      <div className="container mx-auto px-4">
        <h1>Consultation Form</h1>
        {/* Form content */}
      </div>
    </div>
  )
} 