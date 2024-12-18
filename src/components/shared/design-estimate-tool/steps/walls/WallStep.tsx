'use client'

import React, { useState } from 'react'
import { ProductVariant, SelectableProduct } from '../../types'
import { FinishSelector } from '../../components/FinishSelector'

interface WallProduct {
  baseId: string
  name: string
  description: string
  variants: ProductVariant[]
  currentVariant: ProductVariant
  dimensions: {
    width: number
    height: number
    squareFeet: number
  }
  details?: {
    features: string[]
    specifications: Record<string, string>
    additionalImages: string[]
  }
}

interface WallSelection {
  wall: 'left' | 'back' | 'right'
  product: SelectableProduct
}

interface WallStepProps {
  onSelect: (selection: WallSelection) => void
  selectedWalls: WallSelection[]
  projectType: 'tub-to-shower' | 'shower-replacement'
  shapeId?: string
}

const mockWallPanels: WallProduct[] = [
  {
    baseId: 'wall-1',
    name: 'Classic Subway',
    description: 'Traditional subway tile pattern wall panels',
    variants: [
      {
        id: 'wall-1-white',
        finish: 'Bright White',
        finishImage: '/finishes/white.jpg',
        price: 199.99,
        image: '/placeholder-white.jpg'
      },
      {
        id: 'wall-1-bone',
        finish: 'Bone',
        finishImage: '/finishes/bone.jpg',
        price: 219.99,
        image: '/placeholder-bone.jpg'
      }
    ],
    currentVariant: {
      id: 'wall-1-white',
      finish: 'Bright White',
      finishImage: '/finishes/white.jpg',
      price: 199.99,
      image: '/placeholder-white.jpg'
    },
    dimensions: {
      width: 60,
      height: 96,
      squareFeet: 40
    },
    details: {
      features: [
        'Easy-to-clean surface',
        'Grout-free installation',
        'Moisture resistant'
      ],
      specifications: {
        'Material': 'Acrylic',
        'Thickness': '1/4 inch',
        'Installation': 'Direct-to-stud or over existing'
      },
      additionalImages: [
        '/placeholder.jpg',
        '/placeholder.jpg'
      ]
    }
  }
]

function ProductDetailsModal({ 
  product: initialProduct, 
  onClose,
  onSelect,
  selectedWall
}: { 
  product: WallProduct
  onClose: () => void 
  onSelect: (selection: WallSelection) => void
  selectedWall: 'left' | 'back' | 'right'
}) {
  const [product, setProduct] = useState<WallProduct>(initialProduct)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const allImages = [product.currentVariant.image, ...(product.details?.additionalImages || [])]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
              <p className="text-sm text-gray-600">
                {product.dimensions.width}" × {product.dimensions.height}" ({product.dimensions.squareFeet} sq ft)
              </p>
            </div>
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
              ${product.currentVariant.price.toFixed(2)} per wall
            </div>
          </div>

          {/* Finish selector */}
          {product.variants.length > 1 && (
            <div className="mb-6">
              <FinishSelector
                variants={product.variants}
                currentVariantId={product.currentVariant.id}
                onVariantSelect={(variant: ProductVariant) => {
                  const updatedProduct: WallProduct = {
                    ...product,
                    currentVariant: variant
                  }
                  setProduct(updatedProduct)
                  setCurrentImageIndex(0)
                  onSelect({
                    wall: selectedWall,
                    product: {
                      id: variant.id,
                      name: product.name,
                      image: variant.image,
                      price: variant.price
                    }
                  })
                }}
                size="lg"
              />
            </div>
          )}

          {/* Select button */}
          <div className="mt-6">
            <button
              onClick={() => {
                onSelect({
                  wall: selectedWall,
                  product: {
                    id: product.currentVariant.id,
                    name: product.name,
                    image: product.currentVariant.image,
                    price: product.currentVariant.price
                  }
                })
                onClose()
              }}
              className="w-full px-4 py-2 bg-teal-600 text-white rounded-full hover:bg-teal-700"
            >
              Select for {selectedWall} wall
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function WallStep({ onSelect, selectedWalls, projectType, shapeId }: WallStepProps) {
  const [selectedWall, setSelectedWall] = useState<'left' | 'back' | 'right'>('back')
  const [selectedForDetails, setSelectedForDetails] = useState<WallProduct | null>(null)

  // Get currently selected product for the active wall
  const currentWallSelection = selectedWalls.find(w => w.wall === selectedWall)

  return (
    <div className="space-y-6">
      {/* Wall selector */}
      <div className="flex gap-4 justify-center p-4 bg-gray-50 rounded-lg">
        <button
          onClick={() => setSelectedWall('left')}
          className={`px-4 py-2 rounded ${
            selectedWall === 'left' ? 'bg-teal-600 text-white' : 'bg-white'
          }`}
        >
          Left Wall
        </button>
        <button
          onClick={() => setSelectedWall('back')}
          className={`px-4 py-2 rounded ${
            selectedWall === 'back' ? 'bg-teal-600 text-white' : 'bg-white'
          }`}
        >
          Back Wall
        </button>
        <button
          onClick={() => setSelectedWall('right')}
          className={`px-4 py-2 rounded ${
            selectedWall === 'right' ? 'bg-teal-600 text-white' : 'bg-white'
          }`}
        >
          Right Wall
        </button>
      </div>

      {/* Wall panel selection */}
      <div className="grid grid-cols-1 gap-6">
        {mockWallPanels.map(panel => (
          <div
            key={panel.baseId}
            className="border rounded-lg hover:border-teal-500 transition-colors"
          >
            <div className="flex gap-4 p-4">
              <button
                onClick={() => setSelectedForDetails(panel)}
                className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded group"
              >
                <div className="relative w-full h-full">
                  <img 
                    src={panel.currentVariant.image} 
                    alt={panel.name}
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
                <h3 className="font-semibold text-gray-900">{panel.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{panel.description}</p>
                <div className="text-lg font-semibold text-teal-600 mb-2">
                  ${panel.currentVariant.price.toFixed(2)} per wall
                </div>
                
                {panel.variants.length > 1 && (
                  <div className="mb-4">
                    <FinishSelector
                      variants={panel.variants}
                      currentVariantId={panel.currentVariant.id}
                      onVariantSelect={(variant: ProductVariant) => {
                        const updatedPanel: WallProduct = {
                          ...panel,
                          currentVariant: variant
                        }
                        setSelectedForDetails(updatedPanel)
                        onSelect({
                          wall: selectedWall,
                          product: {
                            id: variant.id,
                            name: panel.name,
                            image: variant.image,
                            price: variant.price
                          }
                        })
                      }}
                    />
                  </div>
                )}

                <button
                  onClick={() => onSelect({
                    wall: selectedWall,
                    product: {
                      id: panel.currentVariant.id,
                      name: panel.name,
                      image: panel.currentVariant.image,
                      price: panel.currentVariant.price
                    }
                  })}
                  className={`px-4 py-2 rounded-full ${
                    currentWallSelection?.product.id === panel.currentVariant.id
                      ? 'bg-teal-600 text-white'
                      : 'border border-teal-600 text-teal-600 hover:bg-teal-50'
                  }`}
                >
                  {currentWallSelection?.product.id === panel.currentVariant.id 
                    ? 'Selected for ' + selectedWall + ' wall'
                    : 'Select for ' + selectedWall + ' wall'
                  }
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Selected walls summary */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-4">Selected Wall Panels</h3>
        <div className="space-y-4">
          {['left', 'back', 'right'].map(wall => {
            const selection = selectedWalls.find(w => w.wall === wall)
            return (
              <div key={wall} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-100 rounded">
                    {selection && (
                      <img 
                        src={selection.product.image} 
                        alt={selection.product.name}
                        className="w-full h-full object-cover rounded"
                      />
                    )}
                  </div>
                  <div>
                    <div className="font-medium">{wall.charAt(0).toUpperCase() + wall.slice(1)} Wall</div>
                    {selection ? (
                      <div className="text-sm text-gray-600">{selection.product.name}</div>
                    ) : (
                      <div className="text-sm text-gray-400">Not selected</div>
                    )}
                  </div>
                </div>
                {selection && (
                  <div className="text-teal-600 font-semibold">
                    ${selection.product.price.toFixed(2)}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {selectedForDetails && (
        <ProductDetailsModal
          product={selectedForDetails}
          onClose={() => setSelectedForDetails(null)}
          onSelect={onSelect}
          selectedWall={selectedWall}
        />
      )}
    </div>
  )
} 