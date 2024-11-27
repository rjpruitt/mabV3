'use client'

import React from 'react'
import Link from 'next/link'
import { NavItem } from './nav-item'
import { Bath, ShowerHead, Heart, Grid, Package, Palette, Shapes, Lightbulb, PenTool, Book, HelpCircle, Banknote, FileText, Star } from 'lucide-react'

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
    title: 'Walls & Wainscoting',
    description: 'Wall surrounds, wainscoting, and decorative panels',
    href: '/solutions/walls'
  },
  {
    icon: Package,
    title: 'Accessories',
    description: 'Hardware, fixtures, and finishing touches',
    href: '/solutions/accessories'
  }
]

const inspiration = [
  {
    icon: Palette,
    title: 'Style Collections',
    description: 'Explore curated bathroom styles and design themes',
    href: '/inspiration#styles'
  },
  {
    icon: Shapes,
    title: 'Material Explorer',
    description: 'Discover our range of materials and finishes',
    href: '/inspiration#materials'
  },
  {
    icon: Lightbulb,
    title: 'Feature Showcase',
    description: 'See the latest in bathroom innovation and design',
    href: '/inspiration#features'
  },
  {
    icon: PenTool,
    title: 'Design Boards',
    description: 'Create and save your inspiration collections',
    href: '/inspiration#boards'
  }
]

const resources = [
  {
    icon: Book,
    title: 'Learning Center',
    description: 'Helpful guides and design tips for your project',
    href: '/resources/learning'
  },
  {
    icon: HelpCircle,
    title: 'FAQs',
    description: 'Answers to common questions about our process',
    href: '/resources/faqs'
  },
  {
    icon: Banknote,
    title: 'Financing',
    description: 'Flexible payment options to fit your budget',
    href: '/resources/financing'
  },
  {
    icon: FileText,
    title: 'Care Guides',
    description: "Maintain your bathroom's beauty and functionality",
    href: '/resources/care'
  },
  {
    icon: Star,
    title: 'Customer Stories',
    description: 'Real experiences from satisfied customers',
    href: '/resources/stories'
  }
]

interface MainNavProps {
  isCondensed?: boolean
}

export function MainNav({ isCondensed = false }: MainNavProps) {
  return (
    <nav 
      className={`
        bg-primary text-white font-montserrat
        transition-all duration-300 ease-in-out
      `}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className={`
        container mx-auto px-4 flex flex-col md:flex-row md:items-center justify-between
        transition-all duration-300 ease-in-out
        ${isCondensed ? 'h-[80px]' : 'h-auto md:h-[130px]'}
      `}>
        <Link 
          href="/" 
          className={`
            font-logo transition-all duration-300 ease-in-out
            py-4 md:py-0 text-center max-w-[400px]
            ${isCondensed ? 'text-xl md:text-2xl' : 'text-2xl md:text-3xl lg:text-4xl'}
          `}
        >
          <div className="whitespace-normal text-center">
            Mid America Bathworks
          </div>
        </Link>
        
        <div className={`flex flex-col md:flex-row md:items-center gap-4 md:gap-8 pb-4 md:pb-0 text-[17px] font-semibold leading-[40px] ${
          isCondensed ? 'md:text-[15px] md:leading-[32px]' : ''
        }`}>
          <NavItem label="Solutions" hasDropdown>
            <div className="container mx-auto px-4 py-8">
              <div className="grid grid-cols-5 gap-8">
                {solutions.map((item) => (
                  <Link 
                    key={item.title}
                    href={item.href}
                    className="group hover:bg-[#F8F6F3] p-4 rounded-sm transition-colors"
                  >
                    <item.icon className="w-8 h-8 text-primary mb-3" />
                    <h3 className="font-semibold text-[#2F2F2F] mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </NavItem>
          
          <NavItem label="Inspiration" hasDropdown>
            <div className="container mx-auto px-4 py-8">
              <div className="grid grid-cols-4 gap-8">
                {inspiration.map((item) => (
                  <Link 
                    key={item.title}
                    href={item.href}
                    className="group hover:bg-[#F8F6F3] p-4 rounded-sm transition-colors"
                  >
                    <item.icon className="w-8 h-8 text-primary mb-3" />
                    <h3 className="font-semibold text-[#2F2F2F] mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </NavItem>

          <NavItem label="Resources" hasDropdown>
            <div className="container mx-auto px-4 py-8">
              <div className="grid grid-cols-5 gap-8">
                {resources.map((item) => (
                  <Link 
                    key={item.title}
                    href={item.href}
                    className="group hover:bg-[#F8F6F3] p-4 rounded-sm transition-colors"
                  >
                    <item.icon className="w-8 h-8 text-primary mb-3" />
                    <h3 className="font-semibold text-[#2F2F2F] mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </NavItem>
          
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