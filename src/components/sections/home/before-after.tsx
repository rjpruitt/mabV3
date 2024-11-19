'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider'

type ProjectType = {
  id: string
  title: string
  count: number
  before: string
  after: string
  details: {
    duration: string
    location: string
    products: string[]
    features: string[]
  }
}

const projects: ProjectType[] = [
  {
    id: 'bath-transformation',
    title: 'Bath Transformation',
    count: 1,
    before: 'https://placehold.co/1200x800/016369/FFFFFF/png?text=Bath+Before',
    after: 'https://placehold.co/1200x800/016369/FFFFFF/png?text=Bath+After',
    details: {
      duration: '1 Day',
      location: 'Tulsa, OK',
      products: ['Acrylic Tub Liner', 'Wall Surround', 'Fixtures'],
      features: ['Easy-Clean Surface', 'Built-in Shelving', 'Lifetime Warranty']
    }
  },
  {
    id: 'shower-transformation',
    title: 'Shower Transformation',
    count: 2,
    before: 'https://placehold.co/1200x800/016369/FFFFFF/png?text=Shower+Before',
    after: 'https://placehold.co/1200x800/016369/FFFFFF/png?text=Shower+After',
    details: {
      duration: '1 Day',
      location: 'Oklahoma City, OK',
      products: ['Shower Base', 'Glass Door', 'Modern Fixtures'],
      features: ['Barrier-Free Entry', 'Custom Glass', 'Designer Finishes']
    }
  },
  {
    id: 'tub-to-shower',
    title: 'Tub-to-Shower Conversion',
    count: 3,
    before: 'https://placehold.co/1200x800/016369/FFFFFF/png?text=TubToShower+Before',
    after: 'https://placehold.co/1200x800/016369/FFFFFF/png?text=TubToShower+After',
    details: {
      duration: '2 Days',
      location: 'Broken Arrow, OK',
      products: ['Low-Entry Base', 'Safety Bars', 'Handheld Shower'],
      features: ['ADA Compliant', 'Anti-Slip Surface', 'Safety Features']
    }
  },
  {
    id: 'accessibility',
    title: 'Easy Access Shower',
    count: 4,
    before: 'https://placehold.co/1200x800/016369/FFFFFF/png?text=Accessible+Before',
    after: 'https://placehold.co/1200x800/016369/FFFFFF/png?text=Accessible+After',
    details: {
      duration: '1 Day',
      location: 'Norman, OK',
      products: ['Walk-In Shower', 'Safety Features', 'Comfort Height Fixtures'],
      features: ['Zero-Entry', 'Built-in Seat', 'Safety Handles']
    }
  }
]

export function BeforeAfter() {
  const [activeProject, setActiveProject] = useState(projects[0])

  return (
    <section className="w-full py-32 bg-[#F8F6F3]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Content */}
          <div>
            <h2 className="font-pt-serif text-4xl md:text-5xl text-[#2F2F2F] mb-6">
              Before & After
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              These bathroom transformations are real, not from reality TV. And all the 
              installations took as little as one day, without the mess of demolition. See for 
              yourself the difference we can make.
            </p>

            {/* CTAs */}
            <div className="space-y-4">
              <Link
                href="/consultation"
                className="bg-accent px-8 py-3 rounded-sm font-montserrat font-semibold text-white hover:opacity-90 transition-opacity inline-block w-full text-center"
              >
                CONTACT US FOR MORE INFORMATION
              </Link>
              <div className="text-center">
                <span className="text-gray-600">or you can </span>
                <Link
                  href="/gallery"
                  className="text-accent hover:text-accent/90 font-semibold"
                >
                  explore the full gallery
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column - Slider and Selector */}
          <div>
            <div className="bg-[#EDEBE8] p-8 rounded-sm mb-6">
              <div className="flex gap-6">
                {/* Slider */}
                <div className="flex-grow">
                  <div className="relative aspect-[4/3] w-full">
                    <ReactCompareSlider
                      itemOne={
                        <ReactCompareSliderImage
                          src={activeProject.before}
                          alt="Before renovation"
                        />
                      }
                      itemTwo={
                        <ReactCompareSliderImage
                          src={activeProject.after}
                          alt="After renovation"
                        />
                      }
                      position={50}
                      className="h-full"
                      style={{ height: '100%' }}
                    />
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                      <p className="font-dancing text-2xl text-white text-center drop-shadow-lg">
                        Slide to see before and after!
                      </p>
                    </div>
                  </div>
                </div>

                {/* Project Type Selector Tabs */}
                <div className="w-48 space-y-2">
                  {projects.map((project) => (
                    <button
                      key={project.id}
                      className={`w-full text-left p-4 flex items-center gap-3 ${
                        activeProject.id === project.id
                          ? 'bg-primary text-white'
                          : 'bg-white hover:bg-primary/5'
                      }`}
                      onClick={() => setActiveProject(project)}
                    >
                      <span className="text-2xl font-light">{project.count}</span>
                      <span className="font-semibold text-sm">{project.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Project Details Panel */}
            <div className="bg-white p-6 rounded-sm">
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <span className="text-sm text-gray-500">Duration</span>
                  <p className="font-semibold">{activeProject.details.duration}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Location</span>
                  <p className="font-semibold">{activeProject.details.location}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <span className="text-sm text-gray-500">Products Used</span>
                  <ul className="list-disc list-inside">
                    {activeProject.details.products.map((product, index) => (
                      <li key={index} className="text-gray-700">{product}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Features</span>
                  <ul className="list-disc list-inside">
                    {activeProject.details.features.map((feature, index) => (
                      <li key={index} className="text-gray-700">{feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 