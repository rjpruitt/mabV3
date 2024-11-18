'use client'

import Link from 'next/link'
import { NavItem } from './nav-item'

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
            <div className="flex gap-8 p-6">
              {/* Dropdown content will go here */}
            </div>
          </NavItem>
          
          <NavItem label="Commercial" hasDropdown />
          <NavItem label="Inspiration" hasDropdown />
          <NavItem label="Resources" hasDropdown />
          
          <Link 
            href="/consultation"
            className="bg-accent px-6 py-2 rounded hover:opacity-90 transition-opacity text-center"
          >
            BOOK A FREE CONSULTATION
          </Link>
        </div>
      </div>
    </nav>
  )
}