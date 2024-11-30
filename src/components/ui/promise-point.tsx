'use client'

import { LucideIcon } from 'lucide-react'

interface PromisePointProps {
  icon: LucideIcon
  title: string
  description: string
}

export function PromisePoint({ icon: Icon, title, description }: PromisePointProps) {
  return (
    <div className="bg-white rounded-sm p-6 text-center">
      <div className="bg-primary/10 w-16 h-16 rounded-sm flex items-center justify-center mx-auto mb-4">
        <Icon className="w-8 h-8 text-primary" />
      </div>
      <h3 className="text-xl font-semibold text-[#2F2F2F] mb-2">
        {title}
      </h3>
      <p className="text-gray-600">
        {description}
      </p>
    </div>
  )
} 