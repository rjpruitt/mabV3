'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useGallery } from './gallery-context'
import { useCallback, useRef } from 'react'
import { GalleryItem } from './gallery-item'

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

export function GalleryGrid(): React.JSX.Element {
  const { filteredItems } = useGallery()
  const gridRef = useRef<HTMLDivElement>(null)

  const handleGridKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>, itemId: number) => {
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
              {filteredItems.map((item) => (
                <GalleryItem 
                  key={item.id} 
                  item={item} 
                  onKeyDown={handleGridKeyDown}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
} 