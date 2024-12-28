'use client'

import { useState } from 'react'
import { CategoryStep, ImportFormData } from '../types'
import { DynamicCategoryStep } from '../steps/dynamic-category-step'
import { ProductSummaryHeader } from '../components/product-summary-header'
import { ProgressIndicator } from '../components/progress-indicator'
import { BasicInfoStep } from '../steps/basic-info-step'
import { ImageStep } from '../steps/image-step'
import { ReviewStep } from '../steps/review-step'
import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/server/prisma'
import { CATEGORY_STEPS } from '../config/category-steps'

const STANDARD_METALLIC_FINISHES = [
  'CHROME',                    // Bright chrome
  'BRUSHED_NICKEL',            // Brushed/satin nickel
  'MATTE_BLACK',               // Matte black
  'POLISHED_NICKEL',           // Polished nickel
  'BRUSHED_BRONZE',            // Brushed bronze
  'OIL_RUBBED_BRONZE',         // Oil-rubbed bronze
  'POLISHED_BRASS',            // Polished brass
  'BRUSHED_BRASS',             // Brushed/satin brass
  'GOLD',                      // Gold finish
  'BRUSHED_GOLD',              // Brushed gold
  'CHAMPAGNE_BRONZE',          // Champagne bronze
  'VENETIAN_BRONZE',           // Venetian bronze
  'STAINLESS_STEEL',           // Stainless steel
  'BRUSHED_STAINLESS'          // Brushed stainless
]

interface DynamicImportWizardProps {
  productData: any
  onClose: () => void
  onImport: (data: ImportFormData) => Promise<void>
  importing?: boolean
}

const WIZARD_STEPS = [
  { id: 'basic', label: 'Basic Information' },
  { id: 'category', label: 'Categorization' },
  { id: 'images', label: 'Images' },
  { id: 'review', label: 'Review' }
]

type ImportedProduct = Prisma.ProductCreateInput

export function DynamicImportWizard({ productData, onClose, onImport, importing }: DynamicImportWizardProps) {
  const [currentStep, setCurrentStep] = useState('basic')
  const [formData, setFormData] = useState<ImportFormData>(() => ({
    name: productData.name,
    internalName: '',
    brand: productData.brand,
    description: {
      supplier: productData.description || '',
      marketing: '',
      internal: ''
    },
    categorization: {},
    specifications: (productData.specifications || []).map((spec: any) => ({
      ...spec,
      source: 'supplier',
      visibility: { customer: true, team: true }
    })),
    images: (productData.images || []).map((img: any) => ({
      ...img,
      source: 'supplier',
      visibility: { customer: true, team: true }
    }))
  }))

  const [stepCompletion, setStepCompletion] = useState<Record<string, boolean>>({
    basic: false,
    category: false,
    review: false
  })

  const handleStepClick = (stepId: string) => {
    // Only allow navigation to completed steps or current step
    if (stepCompletion[stepId] || stepId === currentStep) {
      setCurrentStep(stepId)
    }
  }

  const handleCategoryChange = (selections: Record<string, string | string[]>) => {
    setFormData(prev => ({
      ...prev,
      categorization: selections
    }))
    
    // Mark category step as complete if there are any selections
    if (Object.keys(selections).length > 0) {
      setStepCompletion(prev => ({
        ...prev,
        category: true
      }))
    }
  }

  const handleBasicInfoChange = (data: Partial<ImportFormData>) => {
    setFormData(prev => ({
      ...prev,
      ...(data.images ? { images: data.images } : data)
    }))

    const updatedData = { ...formData, ...data }
    const isComplete = !!(
      updatedData.internalName &&
      updatedData.description.marketing &&
      updatedData.description.internal
    )

    setStepCompletion(prev => ({
      ...prev,
      basic: isComplete
    }))
  }

  const handleImageChange = (data: Partial<ImportFormData>) => {
    setFormData(prev => ({
      ...prev,
      images: data.images || prev.images
    }))
    
    setStepCompletion(prev => ({
      ...prev,
      images: !!(data.images?.length)
    }))
  }

  const handleStepEdit = (stepId: string) => {
    if (WIZARD_STEPS.some(step => step.id === stepId)) {
      setCurrentStep(stepId)
    }
  }

  const progressSteps = WIZARD_STEPS.map(step => ({
    ...step,
    isComplete: stepCompletion[step.id],
    isCurrent: step.id === currentStep
  }))

  const validateStep = (stepId: string): boolean => {
    switch (stepId) {
      case 'basic':
        return !!(
          formData.internalName &&
          formData.description.marketing &&
          formData.description.internal
        )
      case 'category':
        return Object.keys(formData.categorization).length > 0
      case 'images':
        // Allow next if we have any images, primary selection only required for review
        return !!(formData.images?.length)
      case 'review':
        return validateStep('basic') && 
          validateStep('category') && 
          !!(formData.images?.length && formData.images.some(img => img.isPrimary))
      default:
        return false
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 'basic':
        return (
          <BasicInfoStep
            data={formData}
            onChange={handleBasicInfoChange}
          />
        )
      case 'category':
        return (
          <DynamicCategoryStep
            steps={CATEGORY_STEPS}
            onChange={handleCategoryChange}
            initialSelections={formData.categorization}
          />
        )
      case 'images':
        return (
          <ImageStep
            data={formData}
            onChange={handleImageChange}
            supplierImages={productData.images || []}
          />
        )
      case 'review':
        return (
          <ReviewStep
            data={formData}
            onSubmit={onImport}
            importing={importing}
            onEdit={handleStepEdit}
            productData={productData}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center overflow-y-auto pt-[200px]">
      <div className="relative bg-white rounded-lg p-6 max-w-4xl w-full my-8 mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Import Product</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Close</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <ProductSummaryHeader product={productData} />

        <ProgressIndicator 
          steps={progressSteps}
          onStepClick={handleStepClick}
        />

        {renderStepContent()}

        <div className="mt-6 flex justify-between">
          <button
            onClick={() => {
              const currentIndex = WIZARD_STEPS.findIndex(step => step.id === currentStep)
              if (currentIndex > 0) {
                setCurrentStep(WIZARD_STEPS[currentIndex - 1].id)
              }
            }}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
            disabled={currentStep === WIZARD_STEPS[0].id}
          >
            Back
          </button>
          <button
            onClick={() => {
              const currentIndex = WIZARD_STEPS.findIndex(step => step.id === currentStep)
              if (currentIndex < WIZARD_STEPS.length - 1) {
                setCurrentStep(WIZARD_STEPS[currentIndex + 1].id)
              }
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            disabled={
              currentStep === WIZARD_STEPS[WIZARD_STEPS.length - 1].id ||
              !validateStep(currentStep)
            }
          >
            {currentStep === WIZARD_STEPS[WIZARD_STEPS.length - 2].id ? 'Review' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  )
} 