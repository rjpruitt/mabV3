'use client'

import React, { useState } from 'react'
import { ProductSelection } from '../../layout/DesignToolLayout'
import { FinishSelector } from '../../components/FinishSelector'
import { ProductVariant, SelectableProduct } from '../../types'

// Base product interface
interface BaseProduct {
  baseId: string
  name: string
  description: string
  variants: ProductVariant[]
  currentVariant: ProductVariant
  details?: {
    features: string[]
    specifications: Record<string, string>
    additionalImages: string[]
  }
}

interface BaseStepProps {
  onSelect: (product: SelectableProduct) => void  // Update to use the new interface
  selectedBaseId?: string
  projectType: 'tub-to-shower' | 'shower-replacement'
  shapeId?: string
}

type ShowerReplacementShapes = 'rectangular' | 'neo-angle' | 'curved' | 'alcove'

interface MockBasesType {
  'tub-to-shower': BaseProduct[]
  'shower-replacement': {
    [K in ShowerReplacementShapes]?: BaseProduct[]
  }
}

const mockBases: MockBasesType = {
  'tub-to-shower': [
    {
      baseId: 'base-1',
      name: 'Conversion Base',
      description: 'Standard tub-to-shower conversion base',
      variants: [
        {
          id: 'base-1-white',
          finish: 'White',
          finishImage: '/finishes/white.jpg',
          price: 299.99,
          image: '/placeholder-white.jpg'
        },
        {
          id: 'base-1-bone',
          finish: 'Bone',
          finishImage: '/finishes/bone.jpg',
          price: 319.99,
          image: '/placeholder-bone.jpg'
        }
      ],
      currentVariant: {
        id: 'base-1-white',
        finish: 'White',
        finishImage: '/finishes/white.jpg',
        price: 299.99,
        image: '/placeholder-white.jpg'
      },
      details: {
        features: [
          'Easy-to-clean surface',
          'Slip-resistant texture',
          'Reinforced construction'
        ],
        specifications: {
          'Dimensions': '60" x 32" x 4"',
          'Material': 'Acrylic',
          'Color': 'White',
          'Drain Location': 'Left or Right'
        },
        additionalImages: [
          '/placeholder.jpg',
          '/placeholder.jpg'
        ]
      }
    } as BaseProduct
  ],
  'shower-replacement': {
    'rectangular': [
      {
        baseId: 'base-2',
        name: 'Standard Rectangular Base',
        description: '60" x 32" shower base',
        variants: [
          {
            id: 'base-2-white',
            finish: 'White',
            finishImage: '/finishes/white.jpg',
            price: 249.99,
            image: '/placeholder-white.jpg'
          }
        ],
        currentVariant: {
          id: 'base-2-white',
          finish: 'White',
          finishImage: '/finishes/white.jpg',
          price: 249.99,
          image: '/placeholder-white.jpg'
        }
      } as BaseProduct
    ]
  }
} as const

function ProductDetailsModal({ 
  product: initialProduct, 
  onClose,
  onSelect
}: { 
  product: BaseProduct
  onClose: () => void 
  onSelect: (product: SelectableProduct) => void
}) {
  const [product, setProduct] = useState<BaseProduct>(initialProduct)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const allImages = [product.currentVariant.image, ...(product.details?.additionalImages || [])]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <span className="sr-only">Close</span>
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Image Gallery */}
          <div className="mb-6">
            <div className="aspect-w-16 aspect-h-9 mb-4">
              <img
                src={allImages[currentImageIndex]}
                alt={`${product.name} view ${currentImageIndex + 1}`}
                className="object-cover rounded-lg"
              />
            </div>
            {allImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`w-20 h-20 flex-shrink-0 rounded-lg border-2 ${
                      currentImageIndex === idx ? 'border-teal-500' : 'border-transparent'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover rounded-lg" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Features</h4>
              <ul className="list-disc list-inside space-y-1">
                {product.details?.features.map((feature, idx) => (
                  <li key={idx} className="text-gray-600">{feature}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Specifications</h4>
              <dl className="grid grid-cols-2 gap-x-4 gap-y-2">
                {Object.entries(product.details?.specifications || {}).map(([key, value]) => (
                  <React.Fragment key={key}>
                    <dt className="text-gray-600">{key}</dt>
                    <dd className="text-gray-900">{value}</dd>
                  </React.Fragment>
                ))}
              </dl>
            </div>

            <div className="text-xl font-bold text-teal-600">
              ${product.currentVariant.price.toFixed(2)}
            </div>
          </div>

          {/* Add finish selector to modal */}
          {product.variants.length > 1 && (
            <div className="mb-6">
              <FinishSelector
                variants={product.variants}
                currentVariantId={product.currentVariant.id}
                onVariantSelect={(variant) => {
                  const updatedProduct: BaseProduct = {
                    baseId: product.baseId,
                    name: product.name,
                    description: product.description,
                    variants: product.variants,
                    currentVariant: variant,
                    details: product.details
                  }
                  setProduct(updatedProduct)
                  setCurrentImageIndex(0)
                  onSelect({
                    id: variant.id,
                    name: product.name,
                    image: variant.image,
                    price: variant.price
                  })
                }}
                size="lg"
              />
            </div>
          )}

          {/* Add select button */}
          <div className="mt-6">
            <button
              onClick={() => {
                onSelect({
                  id: product.currentVariant.id,
                  name: product.name,
                  image: product.currentVariant.image,
                  price: product.currentVariant.price
                })
                onClose()
              }}
              className="w-full px-4 py-2 bg-teal-600 text-white rounded-full hover:bg-teal-700"
            >
              Select This Base
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function BaseStep({ onSelect, selectedBaseId, projectType, shapeId }: BaseStepProps) {
  const [selectedForDetails, setSelectedForDetails] = useState<BaseProduct | null>(null)
  
  const getBases = (): BaseProduct[] => {
    if (projectType === 'tub-to-shower') {
      return mockBases['tub-to-shower']
    }
    if (shapeId && mockBases['shower-replacement'][shapeId as ShowerReplacementShapes]) {
      return mockBases['shower-replacement'][shapeId as ShowerReplacementShapes] || []
    }
    return []
  }

  const bases = getBases()

  return (
    <>
      <div className="space-y-6">
        <p className="text-gray-600">
          Select a shower base that fits your space and style.
        </p>
        <div className="grid grid-cols-1 gap-6">
          {bases.map(base => (
            <div
              key={base.baseId}
              className="border rounded-lg hover:border-teal-500 transition-colors"
            >
              <div className="flex gap-4 p-4">
                <button
                  onClick={() => {
                    // Map the base to the correct format before setting it
                    const baseForDetails: BaseProduct = {
                      baseId: base.baseId,
                      name: base.name,
                      description: base.description,
                      variants: base.variants,
                      currentVariant: base.currentVariant,
                      details: base.details
                    }
                    setSelectedForDetails(baseForDetails)
                  }}
                  className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded group"
                >
                  <div className="relative w-full h-full">
                    <img 
                      src={base.currentVariant.image} 
                      alt={base.name}
                      className="w-full h-full object-cover rounded"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 flex items-center justify-center transition-all">
                      <span className="text-white opacity-0 group-hover:opacity-100">
                        View Details
                      </span>
                    </div>
                  </div>
                </button>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{base.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{base.description}</p>
                  <div className="text-lg font-semibold text-teal-600 mb-2">
                    ${base.currentVariant.price.toFixed(2)}
                  </div>
                  
                  {base.variants.length > 1 && (
                    <div className="mb-4">
                      <FinishSelector
                        variants={base.variants}
                        currentVariantId={base.currentVariant.id}
                        onVariantSelect={(variant) => {
                          const updatedBase: BaseProduct = {
                            baseId: base.baseId,
                            name: base.name,
                            description: base.description,
                            variants: base.variants,
                            currentVariant: variant,
                            details: base.details
                          }
                          setSelectedForDetails(updatedBase)
                          onSelect({
                            id: variant.id,
                            name: base.name,
                            image: variant.image,
                            price: variant.price
                          })
                        }}
                      />
                    </div>
                  )}

                  <button
                    onClick={() => onSelect({
                      id: base.currentVariant.id,
                      name: base.name,
                      image: base.currentVariant.image,
                      price: base.currentVariant.price
                    })}
                    className={`px-4 py-2 rounded-full ${
                      selectedBaseId === base.currentVariant.id
                        ? 'bg-teal-600 text-white'
                        : 'border border-teal-600 text-teal-600 hover:bg-teal-50'
                    }`}
                  >
                    {selectedBaseId === base.currentVariant.id ? 'Selected' : 'Select This Base'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedForDetails && (
        <ProductDetailsModal
          product={selectedForDetails}
          onClose={() => setSelectedForDetails(null)}
          onSelect={onSelect}
        />
      )}
    </>
  )
} 