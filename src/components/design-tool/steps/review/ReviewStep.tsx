'use client'

import Image from 'next/image'
import { StepProps } from '../types'
import { useDesignStorage } from '../../storage/useDesignStorage'
import { ChevronRight, Pencil, ChevronDown, ChevronUp } from 'lucide-react'
import { DesignState } from '../../storage/types'
import { useState, useRef } from 'react'
import { PriceBreakdown } from '../../pricing/PriceBreakdown'
import { calculatePriceRange, formatPrice } from '../../utils/pricing'
import { motion, AnimatePresence, MotionConfig, useInView } from 'framer-motion'

type Design = DesignState

type ReviewSectionContent = {
  image?: string
  title: string
  details: string[]
}

type ReviewSection = {
  id: string
  title: string
  stepId: string
  getContent: (design: Design) => ReviewSectionContent | null
}

const REVIEW_SECTIONS: ReviewSection[] = [
  {
    id: 'project-type',
    title: 'Project Type',
    stepId: 'project-type',
    getContent: (design) => {
      if (!design.projectType) return null
      return {
        image: `/images/design-tool/steps/${design.projectType}.jpg`,
        title: design.projectType === 'tub-to-shower' 
          ? 'Tub to Shower Conversion'
          : 'Shower Replacement',
        details: ['Standard installation included']
      }
    }
  },
  {
    id: 'shape',
    title: 'Shape & Size',
    stepId: 'shape',
    getContent: (design) => {
      const choice = design.choices.find(c => c.category === 'shape')
      if (!choice?.productId) return null
      return {
        image: `/images/design-tool/steps/shape/${choice.productId}.jpg`,
        title: choice.productId.split('-').map(w => 
          w.charAt(0).toUpperCase() + w.slice(1)
        ).join(' '),
        details: ['Dimensions to be confirmed during measurement']
      }
    }
  },
  {
    id: 'plumbing',
    title: 'Plumbing Location',
    stepId: 'plumbing',
    getContent: (design) => {
      const choice = design.choices.find(c => c.category === 'plumbing')
      if (!choice?.productId) return null
      return {
        image: `/images/design-tool/steps/plumbing/${choice.productId}.jpg`,
        title: choice.productId.split('-').map(w => 
          w.charAt(0).toUpperCase() + w.slice(1)
        ).join(' '),
        details: ['Plumbing configuration will be verified during measurement']
      }
    }
  },
  {
    id: 'base',
    title: 'Shower Base',
    stepId: 'base',
    getContent: (design) => {
      const choice = design.choices.find(c => c.category === 'base')
      if (!choice?.productId) return null
      return {
        image: `/images/design-tool/steps/base/${choice.productId}.jpg`,
        title: choice.productId.split('-').map(w => 
          w.charAt(0).toUpperCase() + w.slice(1)
        ).join(' '),
        details: [
          'Professional installation included',
          'Lifetime warranty'
        ]
      }
    }
  },
  {
    id: 'walls',
    title: 'Wall System',
    stepId: 'walls',
    getContent: (design) => {
      const choice = design.choices.find(c => c.category === 'walls')
      if (!choice?.productId || !choice.selectedOptions?.pattern) return null
      const pattern = choice.selectedOptions.pattern
      if (typeof pattern !== 'string') return null

      return {
        image: `/images/design-tool/steps/walls/patterns/${pattern}.jpg`,
        title: `${choice.productId.split('-').map(w => 
          w.charAt(0).toUpperCase() + w.slice(1)
        ).join(' ')} - ${pattern.split('-').map(w => 
          w.charAt(0).toUpperCase() + w.slice(1)
        ).join(' ')}`,
        details: [
          'Professional installation included',
          'Grout-free system',
          'Lifetime warranty'
        ]
      }
    }
  },
  {
    id: 'fixtures',
    title: 'Fixtures & Controls',
    stepId: 'fixtures',
    getContent: (design) => {
      const choice = design.choices.find(c => c.category === 'fixtures')
      if (!choice?.selectedOptions) return null
      const options = choice.selectedOptions

      const details = Object.entries(options)
        .filter(([_, value]) => typeof value === 'string')
        .map(([category, id]) => {
          if (typeof id !== 'string') return ''
          const title = id.split('-').map(w => 
            w.charAt(0).toUpperCase() + w.slice(1)
          ).join(' ')
          return `${category.charAt(0).toUpperCase() + category.slice(1)}: ${title}`
        })
        .filter(detail => detail !== '')

      if (!options['shower-head'] || typeof options['shower-head'] !== 'string') return null

      return {
        image: `/images/design-tool/steps/fixtures/${options['shower-head']}.jpg`,
        title: 'Custom Fixture Package',
        details: [
          ...details,
          'Professional installation included'
        ]
      }
    }
  },
  {
    id: 'accessories',
    title: 'Accessories',
    stepId: 'accessories',
    getContent: (design) => {
      const choice = design.choices.find(c => c.category === 'accessories')
      if (!choice?.selectedOptions) return null
      const options = choice.selectedOptions

      const selectedIds = Object.entries(options)
        .filter(([_, value]) => value === true)
        .map(([id]) => id)
      
      if (selectedIds.length === 0) {
        return {
          title: 'No Accessories Selected',
          details: ['You can add accessories later if desired']
        }
      }

      const details = selectedIds.map(id => 
        id.split('-').map(w => 
          w.charAt(0).toUpperCase() + w.slice(1)
        ).join(' ')
      )

      return {
        image: `/images/design-tool/steps/accessories/${selectedIds[0]}.jpg`,
        title: `${selectedIds.length} Accessories Selected`,
        details: [
          ...details,
          'Professional installation included'
        ]
      }
    }
  }
]

type ReviewStepProps = StepProps & {
  onEditStep: (stepId: string) => void
}

const buttonHoverVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.02 }
}

const editButtonVariants = {
  initial: { 
    backgroundColor: 'rgba(255, 255, 255, 0)',
    color: 'var(--color-primary)' 
  },
  hover: { 
    backgroundColor: 'var(--color-primary)',
    color: 'white'
  }
}

function ReviewSection({ section, index, currentDesign, onEditStep }: {
  section: ReviewSection
  index: number
  currentDesign: DesignState
  onEditStep: (stepId: string) => void
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  const content = section.getContent(currentDesign)
  if (!content) return null

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ delay: 0.1 * index }}
      className="bg-white rounded-lg shadow-sm border p-6"
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold">{section.title}</h3>
        <motion.button
          variants={editButtonVariants}
          initial="initial"
          whileHover="hover"
          onClick={() => onEditStep(section.stepId)}
          className="px-3 py-1 rounded-md flex items-center text-sm transition-colors"
        >
          <Pencil className="w-4 h-4 mr-1" />
          Edit
        </motion.button>
      </div>

      <div className="flex gap-6">
        {content.image && (
          <div className="relative w-32 h-32 flex-shrink-0">
            <Image
              src={content.image}
              alt={content.title}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        )}
        <div>
          <h4 className="font-medium mb-2">{content.title}</h4>
          <ul className="space-y-1">
            {content.details.map((detail, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-center">
                <span className="mr-2">•</span>
                {detail}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  )
}

export function ReviewStep({
  onNext,
  onBack,
  onEditStep
}: ReviewStepProps) {
  const { currentDesign } = useDesignStorage()
  const [showPriceBreakdown, setShowPriceBreakdown] = useState(false)

  if (!currentDesign) return null

  const { min, max } = calculatePriceRange(currentDesign)

  return (
    <MotionConfig transition={{ duration: 0.2 }}>
      <div>
        {/* Price Range Summary */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-6 bg-primary/5 rounded-lg"
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">Estimated Price Range</h3>
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl font-bold text-primary"
              >
                {formatPrice(min)} - {formatPrice(max)}
              </motion.div>
              <p className="text-sm text-gray-600 mt-1">
                Final price will be confirmed after professional measurement
              </p>
            </div>
            <motion.button
              variants={buttonHoverVariants}
              initial="initial"
              whileHover="hover"
              onClick={() => setShowPriceBreakdown(!showPriceBreakdown)}
              className="text-primary hover:text-primary/80 flex items-center text-sm"
            >
              {showPriceBreakdown ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center"
                >
                  Hide Details
                  <ChevronUp className="w-4 h-4 ml-1" />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center"
                >
                  Show Details
                  <ChevronDown className="w-4 h-4 ml-1" />
                </motion.div>
              )}
            </motion.button>
          </div>

          {/* Price Breakdown */}
          <AnimatePresence>
            {showPriceBreakdown && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="mt-6 pt-6 border-t">
                  <PriceBreakdown design={currentDesign} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Review Sections */}
        <div className="space-y-8">
          {REVIEW_SECTIONS.map((section, index) => (
            <ReviewSection
              key={section.id}
              section={section}
              index={index}
              currentDesign={currentDesign}
              onEditStep={onEditStep}
            />
          ))}
        </div>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 p-6 bg-blue-50 rounded-lg"
        >
          <h3 className="text-lg font-semibold mb-2">What's Next?</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm flex-shrink-0 mt-0.5 mr-3">
                1
              </span>
              <p className="text-gray-600">
                Submit your design to get an exact quote and schedule a free consultation
              </p>
            </li>
            <li className="flex items-start">
              <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm flex-shrink-0 mt-0.5 mr-3">
                2
              </span>
              <p className="text-gray-600">
                Professional measurement to confirm dimensions and installation requirements
              </p>
            </li>
            <li className="flex items-start">
              <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm flex-shrink-0 mt-0.5 mr-3">
                3
              </span>
              <p className="text-gray-600">
                Schedule your installation at a time that works for you
              </p>
            </li>
          </ul>
        </motion.div>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 flex justify-center"
        >
          <motion.button
            variants={buttonHoverVariants}
            initial="initial"
            whileHover="hover"
            onClick={onNext}
            className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 flex items-center shadow-sm"
          >
            Get Exact Quote
            <motion.div
              initial={{ x: 0 }}
              whileHover={{ x: 3 }}
            >
              <ChevronRight className="w-5 h-5 ml-2" />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </MotionConfig>
  )
} 