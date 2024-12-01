'use client'

import React, { useState, useCallback } from 'react'
import { BaseQuestionProps } from '../types'
import { Camera, X, Upload } from 'lucide-react'

interface PhotoUploadValue {
  files: File[]
  isValid: boolean
}

interface PhotoUploadProps extends Omit<BaseQuestionProps, 'value' | 'onChange'> {
  value?: PhotoUploadValue
  onChange: (value: PhotoUploadValue) => void
}

const MAX_PHOTOS = 3
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/heic']
const MAX_SIZE = 10 * 1024 * 1024 // 10MB

export function PhotoUpload({ 
  value = { files: [], isValid: true }, 
  onChange, 
  step 
}: PhotoUploadProps) {
  const [photos, setPhotos] = useState<File[]>(value.files)
  const [error, setError] = useState<string>('')

  const handlePhotos = useCallback((files: FileList | null) => {
    if (!files) return

    setError('')
    const file = files[0]

    // Validation
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError('Please upload a JPG, PNG, or HEIC image')
      return
    }
    if (file.size > MAX_SIZE) {
      setError('Image must be less than 10MB')
      return
    }
    if (photos.length >= MAX_PHOTOS) {
      setError(`Maximum ${MAX_PHOTOS} photos allowed`)
      return
    }

    const newPhotos = [...photos, file]
    setPhotos(newPhotos)
    onChange({ 
      files: newPhotos,
      isValid: true // Photos are optional, so always valid
    })
  }, [photos, onChange])

  const removePhoto = (index: number) => {
    const newPhotos = photos.filter((_, i) => i !== index)
    setPhotos(newPhotos)
    onChange({ 
      files: newPhotos,
      isValid: true
    })
  }

  return (
    <div className="space-y-6">
      {/* Photo Upload Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[...Array(MAX_PHOTOS)].map((_, index) => (
          <div
            key={index}
            className={`
              aspect-square border-2 rounded-sm relative
              ${photos[index] 
                ? 'border-accent' 
                : 'border-dashed border-gray-200 hover:border-accent/50'
              }
            `}
          >
            {photos[index] ? (
              // Photo Preview
              <div className="relative w-full h-full">
                <img
                  src={URL.createObjectURL(photos[index])}
                  alt={`Bathroom photo ${index + 1}`}
                  className="object-cover w-full h-full"
                />
                <button
                  onClick={() => removePhoto(index)}
                  className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                >
                  <X className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            ) : (
              // Upload Button
              <label className="absolute inset-0 cursor-pointer">
                <div className="flex flex-col items-center justify-center h-full p-4">
                  <Camera className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-600 text-center">
                    {index === 0 
                      ? "Add main photo" 
                      : `Add photo ${index + 1}`
                    }
                  </span>
                  <span className="text-xs text-gray-400 mt-1">
                    Click to upload
                  </span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handlePhotos(e.target.files)}
                />
              </label>
            )}
          </div>
        ))}
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}

      {/* Help Text */}
      <div className="bg-[#F8F6F3] p-4 rounded-sm">
        <h4 className="font-medium text-[#2F2F2F] flex items-center gap-2 mb-2">
          <Upload className="w-4 h-4" />
          Photo Tips
        </h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Take photos in good lighting</li>
          <li>• Show the full space if possible</li>
          <li>• Include any problem areas</li>
          <li>• Add multiple angles if needed</li>
        </ul>
      </div>
    </div>
  )
} 