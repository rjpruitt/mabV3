'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { productCategories } from './product-data'

export function ProductExplorer() {
  const [selectedCategory, setSelectedCategory] = useState(productCategories[0])
  const [selectedSubcategory, setSelectedSubcategory] = useState(productCategories[0].subcategories[0])
  const [selectedOption, setSelectedOption] = useState(productCategories[0].subcategories[0].options[0])
  const [selectedGlassType, setSelectedGlassType] = useState(
    selectedOption.glassOptions ? selectedOption.glassOptions[0] : null
  )

  const handleOptionSelect = (option: any) => {
    setSelectedOption(option)
    if (option.glassOptions) {
      setSelectedGlassType(option.glassOptions[0])
    } else {
      setSelectedGlassType(null)
    }
  }

  return (
    <section className="w-full py-20 bg-white">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="font-pt-serif text-4xl text-[#2F2F2F] mb-4">
              Create Your Perfect Bathroom
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-6">
              From classic to contemporary, choose from our wide selection of premium styles and features to bring your vision to life.
            </p>
            <div className="bg-[#F8F6F3] py-3 px-4 rounded-sm inline-block">
              <p className="text-gray-600 text-sm">
                This is just a sample of our extensive collection. Ask your design consultant about our full range of options and custom possibilities.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Category Selection - Horizontally scrollable on mobile */}
        <div className="flex justify-center gap-2 mb-12 -mx-4 px-4 overflow-x-auto pb-4">
          <div className="flex gap-2 min-w-min">
            {productCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category)
                  setSelectedSubcategory(category.subcategories[0])
                  handleOptionSelect(category.subcategories[0].options[0])
                }}
                className={`
                  px-6 py-3 rounded-sm whitespace-nowrap font-medium
                  ${selectedCategory.id === category.id
                    ? 'bg-primary text-white'
                    : 'bg-[#F8F6F3] text-gray-600 hover:bg-[#F8F6F3]/80'
                  }
                `}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Display Area - Takes up 8 columns */}
          <div className="lg:col-span-8 order-2 lg:order-1">
            {/* Main Image Display */}
            <div className="relative aspect-[4/3] mb-8">
              <Image
                src={selectedGlassType?.image || selectedOption.image}
                alt={selectedGlassType?.name || selectedOption.name}
                fill
                className="object-cover rounded-sm"
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="font-semibold text-xl text-[#2F2F2F] mb-2">
                {selectedOption.name}
                {selectedGlassType && ` - ${selectedGlassType.name}`}
              </h3>
              <p className="text-gray-600">
                {selectedCategory.description}
              </p>
            </div>

            {/* Glass Type Selection - Only show for glass doors */}
            {selectedOption.glassOptions && (
              <div className="mb-8">
                <h4 className="font-semibold text-lg text-[#2F2F2F] mb-4">
                  Select Glass Type
                </h4>
                <div className="grid grid-cols-3 gap-4">
                  {selectedOption.glassOptions.map((glassType) => (
                    <button
                      key={glassType.id}
                      onClick={() => setSelectedGlassType(glassType)}
                      className={`
                        p-4 rounded-sm border-2 
                        ${selectedGlassType?.id === glassType.id 
                          ? 'border-primary bg-primary/5' 
                          : 'border-transparent hover:bg-[#F8F6F3]'
                        }
                      `}
                    >
                      <p className="text-sm font-medium text-[#2F2F2F]">
                        {glassType.name}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Thumbnails */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {selectedSubcategory.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleOptionSelect(option)}
                  className={`
                    relative aspect-square rounded-sm overflow-hidden
                    ${selectedOption.id === option.id ? 'ring-2 ring-primary' : ''}
                  `}
                >
                  <Image
                    src={option.image}
                    alt={option.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Subcategory Tabs - Takes up 4 columns on the right */}
          <div className="lg:col-span-4 order-1 lg:order-2">
            {/* Horizontally scrollable on mobile, vertical on desktop */}
            <div className="flex lg:flex-col overflow-x-auto lg:overflow-visible -mx-4 px-4 lg:mx-0 lg:px-0 pb-4 lg:pb-0 gap-2 lg:gap-1">
              {selectedCategory.subcategories.map((subcategory) => (
                <button
                  key={subcategory.id}
                  onClick={() => {
                    setSelectedSubcategory(subcategory)
                    handleOptionSelect(subcategory.options[0])
                  }}
                  className={`
                    text-left px-4 py-3 rounded-sm whitespace-nowrap lg:whitespace-normal
                    ${selectedSubcategory.id === subcategory.id
                      ? 'bg-primary text-white'
                      : 'text-gray-600 hover:bg-[#F8F6F3]'
                    }
                  `}
                >
                  {subcategory.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 