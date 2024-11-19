'use client'

import React from 'react'
import Link from 'next/link'
import { Facebook, Instagram, Twitter, Phone, Mail } from 'lucide-react'

const serviceAreas = [
  'Tulsa and surrounding areas',
  'Oklahoma City and surrounding areas',
  'Central Oklahoma communities'
]

const solutions = [
  { name: 'Bathtubs', href: '/solutions/bathtubs' },
  { name: 'Showers', href: '/solutions/showers' },
  { name: 'Accessibility & Safety', href: '/solutions/accessibility' },
  { name: 'Walls & Surrounds', href: '/solutions/walls' }
]

const company = [
  { name: 'About Us', href: '/about' },
  { name: 'Our Process', href: '/process' },
  { name: 'Commercial', href: '/commercial' },
  { name: 'Careers', href: '/careers' }
]

const resources = [
  { name: 'Design Gallery', href: '/gallery' },
  { name: 'Blog', href: '/blog' },
  { name: 'FAQs', href: '/faqs' },
  { name: 'Financing', href: '/financing' }
]

export function Footer() {
  return (
    <footer className="bg-[#F8F6F3] pt-20 pb-8">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Company Info */}
          <div>
            <Link href="/">
              <div className="font-playfair-sc text-2xl text-[#2F2F2F] mb-6">
                Mid America<br />Bathworks
              </div>
            </Link>
            <div className="space-y-4 text-gray-600">
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <a href="tel:15555555555" className="hover:text-primary">1 (555) 555-5555</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <a href="mailto:info@midamericabathworks.com" className="hover:text-primary">
                  info@midamericabathworks.com
                </a>
              </div>
              <div className="flex gap-4 pt-4">
                <a href="#" className="text-gray-600 hover:text-primary">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-gray-600 hover:text-primary">
                  <Instagram size={20} />
                </a>
                <a href="#" className="text-gray-600 hover:text-primary">
                  <Twitter size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-[#2F2F2F]">Solutions</h3>
            <ul className="space-y-3">
              {solutions.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-gray-600 hover:text-primary">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-[#2F2F2F]">Company</h3>
            <ul className="space-y-3">
              {company.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-gray-600 hover:text-primary">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources & Service Areas */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-[#2F2F2F]">Resources</h3>
            <ul className="space-y-3 mb-8">
              {resources.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-gray-600 hover:text-primary">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            <h3 className="font-semibold text-lg mb-4 text-[#2F2F2F]">Service Areas</h3>
            <ul className="space-y-2">
              {serviceAreas.map((area) => (
                <li key={area} className="text-gray-600">
                  {area}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
            <div>
              © {new Date().getFullYear()} Mid America Bathworks. All rights reserved.
            </div>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-primary">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-primary">Terms of Service</Link>
              <Link href="/accessibility" className="hover:text-primary">Accessibility</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 