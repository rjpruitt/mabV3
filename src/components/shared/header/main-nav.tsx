'use client'

import React from 'react'
import Link from 'next/link'
import { NavItem } from './nav-item'
import { Bath, ShowerHead, Heart, Grid, Package } from 'lucide-react'

const solutions = [
  {
    icon: Bath,
    title: 'Bathtubs',
    description: 'Walk-in tubs, replacement tubs, and tub liners',
    href: '/solutions/bathtubs'
  },
  {
    icon: ShowerHead,
    title: 'Showers',
    description: 'Walk-in showers, shower replacements, and tub-to-shower conversions',
    href: '/solutions/showers'
  },
  {
    icon: Heart,
    title: 'Accessibility & Safety',
    description: 'Grab bars, low-entry showers, and safety features',
    href: '/solutions/accessibility'
  },
  {
    icon: Grid,
    title: 'Walls & Surrounds',
    description: 'Wall surrounds, wainscoting, and decorative panels',
    href: '/solutions/walls'
  }
]

export function MainNav() {
  return (
    <nav 
      className="bg-primary text-white font-montserrat"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4 flex flex-col md:flex-row md:items-center justify-between h-auto md:h-[130px]">
        <Link 
          href="/" 
          className="font-playfair-sc text-2xl md:text-3xl lg:text-4xl py-4 md:py-0 text-center max-w-[400px]"
        >
          <div className="whitespace-normal text-center">
            Mid America Bathworks
          </div>
        </Link>
        
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 pb-4 md:pb-0 text-[17px] font-semibold leading-[40px]">
          <NavItem label="Solutions" hasDropdown>
            <div className="container mx-auto px-4 py-8">
              <div className="grid grid-cols-4 gap-8">
                {solutions.map((solution) => (
                  <Link 
                    key={solution.title}
                    href={solution.href}
                    className="group hover:bg-[#F8F6F3] p-4 rounded-sm transition-colors"
                  >
                    <solution.icon className="w-8 h-8 text-primary mb-3" />
                    <h3 className="font-semibold text-[#2F2F2F] mb-2">{solution.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {solution.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </NavItem>
          
          {/* Commented out until implementation */}
          {/* <NavItem label="Commercial" hasDropdown /> */}
          
          <NavItem label="Inspiration" hasDropdown />
          <NavItem label="Resources" hasDropdown />
          
          <Link 
            href="/consultation"
            className="bg-accent px-6 py-2 rounded-sm hover:opacity-90 transition-opacity text-center"
          >
            BOOK A FREE CONSULTATION
          </Link>
        </div>
      </div>
    </nav>
  )
}