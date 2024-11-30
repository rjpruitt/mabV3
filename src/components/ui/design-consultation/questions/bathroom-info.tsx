'use client'

import React, { useState, useEffect } from 'react'
import { BaseQuestionProps } from './types'
import { SingleSelect } from './single-select'
import { OpenQuestion } from './open-question'

interface BathroomInfo {
  age?: string
  type?: string
  size?: string
  notes?: string
}

export function BathroomInfo({ value = {}, onChange, step }: BaseQuestionProps) {
  const [info, setInfo] = useState<BathroomInfo>(value)

  const isValid = info.age && info.type && info.size

  useEffect(() => {
    onChange({
      ...info,
      isValid
    })
  }, [info])

  return (
    <div className="space-y-8">
      {/* Age Question */}
      <div className="space-y-4">
        <h4 className="font-medium text-[#2F2F2F] flex items-center gap-2">
          How old is your current bathroom?
          <span className="text-red-500">*</span>
        </h4>
        <SingleSelect
          value={{ selection: info.age }}
          onChange={(val) => setInfo({ ...info, age: val.selection })}
          options={[
            { id: 'less-5', text: "Less than 5 years" },
            { id: '5-10', text: "5-10 years" },
            { id: '10-20', text: "10-20 years" },
            { id: 'more-20', text: "More than 20 years" },
            { id: 'not-sure', text: "Not sure" }
          ]}
        />
      </div>

      {/* Type Question */}
      <div className="space-y-4">
        <h4 className="font-medium text-[#2F2F2F] flex items-center gap-2">
          What type of shower/tub do you currently have?
          <span className="text-red-500">*</span>
        </h4>
        <SingleSelect
          value={{ selection: info.type }}
          onChange={(val) => setInfo({ ...info, type: val.selection })}
          options={[
            { id: 'tub-shower', text: "Tub with shower" },
            { id: 'tub-only', text: "Tub only" },
            { id: 'stand-up', text: "Stand-up shower" },
            { id: 'walk-in', text: "Walk-in shower" },
            { id: 'multiple', text: "Multiple bathrooms", description: "We'll discuss details during your consultation" }
          ]}
        />
      </div>

      {/* Size Question */}
      <div className="space-y-4">
        <h4 className="font-medium text-[#2F2F2F] flex items-center gap-2">
          How would you describe the space?
          <span className="text-red-500">*</span>
        </h4>
        <SingleSelect
          value={{ selection: info.size }}
          onChange={(val) => setInfo({ ...info, size: val.selection })}
          options={[
            { id: 'very-small', text: "Very small" },
            { id: 'average', text: "Average size" },
            { id: 'spacious', text: "Spacious" },
            { id: 'not-sure-size', text: "Not sure of dimensions" }
          ]}
        />
      </div>

      {/* Additional Notes */}
      <div className="space-y-4">
        <h4 className="font-medium text-[#2F2F2F]">
          Anything else you'd like to tell us about your bathroom?
        </h4>
        <textarea
          value={info.notes || ''}
          onChange={(e) => setInfo({ ...info, notes: e.target.value })}
          placeholder="Optional: Add any additional details"
          className="w-full h-24 p-3 border rounded-sm text-[#2F2F2F] focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent resize-none"
        />
      </div>
    </div>
  )
} 