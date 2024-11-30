'use client'

import { LucideIcon } from 'lucide-react'

interface PromisePointProps {
  icon: React.ElementType
  title: string
  description: string
}

export function PromisePoint({ icon: Icon, title, description }: PromisePointProps) {
  return (
    <div className="bg-white p-6 rounded-sm shadow-sm hover:shadow-md transition-all h-full flex flex-col">
      <div className="flex items-center gap-4 mb-4">
        <div className="bg-primary/10 p-3 rounded-sm">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-xl font-semibold text-[#2F2F2F]">
          {title}
        </h3>
      </div>
      <p className="text-gray-600 flex-grow">
        {description}
      </p>
    </div>
  )
} 