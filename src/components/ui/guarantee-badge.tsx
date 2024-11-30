'use client'

import { Shield } from 'lucide-react'

interface GuaranteeBadgeProps {
  text: string
}

export function GuaranteeBadge({ text }: GuaranteeBadgeProps) {
  return (
    <div className="bg-white p-6 rounded-sm text-center">
      <div className="flex items-center justify-center gap-4">
        <Shield className="w-12 h-12 text-accent" />
        <p className="text-lg font-semibold text-[#2F2F2F]">
          {text}
        </p>
      </div>
    </div>
  )
} 