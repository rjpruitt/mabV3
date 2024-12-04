'use client'

import { motion } from 'framer-motion'
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider'
import { useRef } from 'react'
import { useComparisonSlider } from '@/hooks/use-comparison-slider'
import { useTouchSlider } from '@/hooks/use-touch-slider'
import { GalleryItem as GalleryItemType } from './gallery-context'
import { getBudgetBadgeStyles } from './utils'

interface GalleryItemProps {
  item: GalleryItemType
  onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>, itemId: number) => void
}

type BudgetTier = 'premium' | 'luxury' | 'smart'

export function GalleryItem({ item, onKeyDown }: GalleryItemProps) {
  const sliderRef = useRef<HTMLDivElement>(null)
  const { position, setPosition } = useComparisonSlider({
    initialPosition: 50
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
      layout
      className="bg-[#F8F6F3] rounded-sm overflow-hidden focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2"
      variants={itemVariants}
      role="gridcell"
      tabIndex={0}
      aria-label={`${item.title} transformation`}
      onKeyDown={(e) => onKeyDown(e, item.id)}
    >
      <div 
        ref={sliderRef}
        className="relative aspect-[4/3]"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <ReactCompareSlider
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
}

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