'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider'

const projects = [
  {
    id: 'bath',
    title: 'Bath Transformation',
    before: 'https://placehold.co/1200x800/016369/FFFFFF/png?text=Bath+Before',
    after: 'https://placehold.co/1200x800/016369/FFFFFF/png?text=Bath+After'
  },
  {
    id: 'shower',
    title: 'Shower Transformation',
    before: 'https://placehold.co/1200x800/016369/FFFFFF/png?text=Shower+Before',
    after: 'https://placehold.co/1200x800/016369/FFFFFF/png?text=Shower+After'
  },
  {
    id: 'accessibility',
    title: 'Accessibility & Safety',
    before: 'https://placehold.co/1200x800/016369/FFFFFF/png?text=Accessibility+Before',
    after: 'https://placehold.co/1200x800/016369/FFFFFF/png?text=Accessibility+After'
  },
  {
    id: 'tub-to-shower',
    title: 'Tub-to-Shower Conversion',
    before: 'https://placehold.co/1200x800/016369/FFFFFF/png?text=TubToShower+Before',
    after: 'https://placehold.co/1200x800/016369/FFFFFF/png?text=TubToShower+After'
  }
]

export function BeforeAfter() {
  const [activeProject, setActiveProject] = useState(projects[0])

  return (
    <section className="w-full py-32 bg-[#F8F6F3]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
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

          {/* Right Column - Slider and Tabs */}
          <div className="lg:col-span-2">
            <p className="font-dancing text-2xl text-primary text-center mb-4">
              Slide to see before and after!
            </p>

            <div className="bg-[#EDEBE8] p-4 rounded-sm">
              <div className="flex gap-3">
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
                  </div>
                </div>

                {/* Project Type Selector Tabs */}
                <div className="w-48 space-y-1 relative">
                  {projects.map((project) => (
                    <div key={project.id} className="relative">
                      <button
                        className={`w-full text-left p-3 flex items-center transition-colors
                          ${activeProject.id === project.id 
                            ? 'bg-white text-[#2F2F2F]' 
                            : 'bg-[#F5F4F2] hover:bg-white text-gray-600'
                          }`}
                        onClick={() => setActiveProject(project)}
                      >
                        <span className="font-medium text-sm">{project.title}</span>
                      </button>
                      {activeProject.id === project.id && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary -ml-4" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 