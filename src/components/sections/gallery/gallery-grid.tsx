'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useGallery } from './gallery-context'
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider'
import { useCallback, useRef, KeyboardEvent } from 'react'
import { useComparisonSlider } from '@/hooks/use-comparison-slider'
import { useTouchSlider } from '@/hooks/use-touch-slider'

// Container animation
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      when: "beforeChildren"
    }
  }
}

// Individual item animation
const itemVariants = {
  hidden: { 
    opacity: 0,
    y: 20,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.3
    }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.2
    }
  }
}

function getBudgetBadgeStyles(tier: string) {
  switch (tier) {
    case 'smart':
      return 'bg-primary/10 text-primary'
    case 'premium':
      return 'bg-accent/10 text-accent'
    case 'luxury':
      return 'bg-gray-100 text-gray-600'
    default:
      return 'bg-gray-100 text-gray-600'
  }
}

export function GalleryGrid(): React.JSX.Element {
  const { filteredItems } = useGallery()
  const gridRef = useRef<HTMLDivElement>(null)

  // Handle grid navigation
  const handleGridKeyDown = useCallback((e: KeyboardEvent<HTMLDivElement>, itemId: number) => {
    const currentElement = document.activeElement
    if (!currentElement?.parentElement) return

    const items = Array.from(gridRef.current?.querySelectorAll('[role="gridcell"]') || [])
    const currentIndex = items.indexOf(currentElement)
    let nextIndex: number

    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault()
        nextIndex = Math.min(currentIndex + 1, items.length - 1)
        break
      case 'ArrowLeft':
        e.preventDefault()
        nextIndex = Math.max(currentIndex - 1, 0)
        break
      case 'ArrowUp':
        e.preventDefault()
        nextIndex = Math.max(currentIndex - 3, 0) // Assuming 3 columns
        break
      case 'ArrowDown':
        e.preventDefault()
        nextIndex = Math.min(currentIndex + 3, items.length - 1) // Assuming 3 columns
        break
      case 'Home':
        e.preventDefault()
        nextIndex = 0
        break
      case 'End':
        e.preventDefault()
        nextIndex = items.length - 1
        break
      default:
        return
    }

    // Focus the next element
    ;(items[nextIndex] as HTMLElement)?.focus()
  }, [])

  return (
    <section 
      className="w-full py-20 bg-white"
      aria-label="Gallery of bathroom transformations"
    >
      <div className="container mx-auto px-4">
        <AnimatePresence mode="wait">
          {filteredItems.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <h3 className="text-2xl text-gray-600 mb-4">No matching projects found</h3>
              <p className="text-gray-500">Try adjusting your filters to see more results.</p>
            </motion.div>
          ) : (
            <motion.div 
              ref={gridRef}
              key="grid"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              role="grid"
              aria-label="Gallery grid"
            >
              <AnimatePresence>
                {filteredItems.map((item) => {
                  const sliderRef = useRef<HTMLDivElement>(null)
                  const { position, setPosition, handleKeyDown } = useComparisonSlider({
                    initialPosition: 50,
                    onPositionChange: (pos) => {
                      // Optional: Add any additional position change handling
                    }
                  })

                  const { 
                    handleTouchStart,
                    handleTouchMove,
                    handleTouchEnd,
                    isDragging
                  } = useTouchSlider({
                    onPositionChange: setPosition,
                    containerRef: sliderRef
                  })

                  return (
                    <motion.div 
                      key={item.id}
                      layout
                      className="bg-[#F8F6F3] rounded-sm overflow-hidden focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2"
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      role="gridcell"
                      tabIndex={0}
                      aria-label={`${item.title} transformation`}
                      onKeyDown={(e) => handleGridKeyDown(e, item.id)}
                    >
                      <div 
                        ref={sliderRef}
                        className="relative aspect-[4/3]"
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                      >
                        <ReactCompareSlider
                          id={`slider-${item.id}`}
                          itemOne={
                            <ReactCompareSliderImage 
                              src={item.before} 
                              alt={`${item.title} before transformation`}
                            />
                          }
                          itemTwo={
                            <ReactCompareSliderImage 
                              src={item.after} 
                              alt={`${item.title} after transformation`}
                            />
                          }
                          position={position}
                          onPositionChange={setPosition}
                          onKeyDown={handleKeyDown}
                          className={`h-full ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                          style={{
                            touchAction: 'none',
                            userSelect: 'none'
                          }}
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="font-semibold text-[#2F2F2F] mb-2">{item.title}</h3>
                          <span 
                            className={`text-sm px-2 py-1 rounded-sm capitalize ${getBudgetBadgeStyles(item.budgetTier)}`}
                            role="status"
                            aria-label={`Budget tier: ${item.budgetTier}`}
                          >
                            {item.budgetTier}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-4">{item.description}</p>
                        <div className="flex justify-between text-sm">
                          <span className="text-primary" aria-label="Project timeframe">{item.timeframe}</span>
                          <span className="text-gray-500" aria-label="Project location">{item.location}</span>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
} 