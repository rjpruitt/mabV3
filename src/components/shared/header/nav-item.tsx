'use client'

import React from 'react'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface NavItemProps {
  label: string
  hasDropdown?: boolean
  children?: React.ReactNode
}

export function NavItem({ label, hasDropdown = false, children }: NavItemProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      role="menuitem"
      aria-expanded={isOpen}
      aria-haspopup={hasDropdown}
    >
      <div 
        className={`flex items-center gap-1 cursor-pointer group`}
      >
        <div className="flex items-center gap-1">
          <span>{label}</span>
          {hasDropdown && <ChevronDown size={16} />}
        </div>
        {isOpen && (
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white" />
        )}
      </div>

      <AnimatePresence>
        {isOpen && hasDropdown && (
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`fixed left-0 w-full bg-white text-primary shadow-lg ${
              label === 'Solutions' ? 'z-[60]' : 'z-50'
            }`}
            style={{ top: 'var(--header-height-normal)' }}
          >
            {children || (
              <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Categories</h3>
                    <ul className="space-y-2">
                      <li>Lorem ipsum dolor</li>
                      <li>Sit amet consectetur</li>
                      <li>Adipiscing elit sed</li>
                      <li>Do eiusmod tempor</li>
                    </ul>
                  </div>
                  <div className="col-span-3 grid grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="space-y-2">
                        <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                          <Image
                            src={`https://picsum.photos/400/300?random=${i}`}
                            alt={`Preview of ${label} category option ${i}`}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                            priority={i === 1}
                            className="object-cover"
                          />
                        </div>
                        <p className="font-medium">Lorem ipsum dolor sit</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 