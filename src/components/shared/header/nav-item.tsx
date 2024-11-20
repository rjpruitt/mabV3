'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface NavItemProps {
  label: string
  hasDropdown?: boolean
  dropdownStyle?: 'solutions' | 'inspiration' | 'resources'
  children?: React.ReactNode
}

export function NavItem({ label, hasDropdown = false, dropdownStyle = 'solutions', children }: NavItemProps) {
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
      <div className={`flex items-center gap-1 cursor-pointer group`}>
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
            className="fixed left-0 w-full bg-white text-primary shadow-lg z-50"
            style={{ top: 'var(--header-height-normal)' }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 