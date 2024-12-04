'use client'

import React from 'react'
import Link from 'next/link'
import { Facebook, Instagram, X, Phone, Mail } from 'lucide-react'

const serviceAreas = {
  tulsa: {
    main: 'Tulsa Metro Area',
    description: 'Serving Tulsa and surrounding communities within a 50-mile radius',
    cities: [
      'Tulsa', 'Broken Arrow', 'Owasso', 'Bixby', 'Jenks', 'Sand Springs', 
      'Sapulpa', 'Glenpool', 'Claremore', 'Catoosa', 'Collinsville'
    ]
  },
  okc: {
    main: 'Oklahoma City Metro Area',
    description: 'Serving OKC and surrounding communities within a 50-mile radius',
    cities: [
      'Oklahoma City', 'Edmond', 'Norman', 'Moore', 'Midwest City', 'Del City',
      'Yukon', 'Mustang', 'Bethany', 'El Reno', 'Choctaw'
    ]
  },
  central: {
    main: 'Central Oklahoma',
    description: 'Serving Seminole and surrounding communities within a 50-mile radius',
    cities: [
      'Seminole', 'Shawnee', 'Ada', 'Holdenville', 'Wewoka', 
      'Prague', 'Okemah', 'Wetumka', 'Konawa', 'Meeker',
      'Tecumseh', 'Stroud', 'Chandler', 'Henryetta', 'McAlester'
    ]
  }
}

export function Footer() {
  return (
    <footer className="bg-[#F8F6F3] pt-20 pb-8">
      <div className="container mx-auto px-4">
        {/* Service Areas - Primary Focus */}
        <div className="mb-16">
          <h2 className="text-center font-pt-serif text-3xl text-[#2F2F2F] mb-8">
            Service Areas
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {Object.values(serviceAreas).map((region) => (
              <div key={region.main} className="text-center">
                <h3 className="font-semibold text-xl text-[#2F2F2F] mb-2">
                  {region.main}
                </h3>
                <p className="text-gray-600 mb-4">
                  {region.description}
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {region.cities.map((city) => (
                    <span key={city} className="bg-white px-3 py-1 rounded-sm text-sm text-gray-600">
                      {city}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Company Info - Secondary */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <Link href="/">
                <div className="font-playfair-sc text-2xl text-[#2F2F2F] mb-4">
                  Mid America<br />Bathworks
                </div>
              </Link>
              <div className="space-y-2 text-gray-600">
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <Phone size={16} />
                  <a href="tel:15555555555" className="hover:text-primary">1 (555) 555-5555</a>
                </div>
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <Mail size={16} />
                  <a href="mailto:info@midamericabathworks.com" className="hover:text-primary">
                    info@midamericabathworks.com
                  </a>
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <a href="#" className="text-gray-600 hover:text-primary">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-primary">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-primary">
                <X size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Legal Footer */}
        <div className="border-t border-gray-200 mt-8 pt-8">
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