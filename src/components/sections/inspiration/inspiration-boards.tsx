'use client'

import React from 'react'
import Image from 'next/image'
import { Plus } from 'lucide-react'

const sampleBoards = [
  {
    id: 1,
    title: 'Modern Master Bath',
    items: [
      'https://placehold.co/300x300/016369/FFFFFF/png?text=Modern+1',
      'https://placehold.co/300x300/016369/FFFFFF/png?text=Modern+2',
      'https://placehold.co/300x300/016369/FFFFFF/png?text=Modern+3',
      'https://placehold.co/300x300/016369/FFFFFF/png?text=Modern+4'
    ]
  },
  {
    id: 2,
    title: 'Spa-Like Retreat',
    items: [
      'https://placehold.co/300x300/016369/FFFFFF/png?text=Spa+1',
      'https://placehold.co/300x300/016369/FFFFFF/png?text=Spa+2',
      'https://placehold.co/300x300/016369/FFFFFF/png?text=Spa+3',
      'https://placehold.co/300x300/016369/FFFFFF/png?text=Spa+4'
    ]
  }
]

export function InspirationBoards(): React.JSX.Element {
  return (
    <section className="w-full py-20 bg-[#F8F6F3]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-pt-serif text-4xl text-[#2F2F2F] mb-4">
            Create Your Inspiration Board
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Save and organize your favorite ideas. Share your inspiration board with our 
            design experts during your consultation to help bring your vision to life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Create New Board Button */}
          <div className="bg-white rounded-sm p-6 flex flex-col items-center justify-center min-h-[400px] hover:shadow-lg transition-shadow cursor-pointer">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Plus className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-semibold text-xl text-[#2F2F2F] mb-2">
              Start a New Board
            </h3>
            <p className="text-gray-600 text-center">
              Begin collecting ideas for your perfect bathroom
            </p>
          </div>

          {/* Sample Boards */}
          {sampleBoards.map((board) => (
            <div 
              key={board.id}
              className="bg-white rounded-sm p-6 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <h3 className="font-semibold text-xl text-[#2F2F2F] mb-4">
                {board.title}
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {board.items.map((item, index) => (
                  <div key={index} className="relative aspect-square">
                    <Image
                      src={item}
                      alt={`${board.title} inspiration ${index + 1}`}
                      fill
                      className="object-cover rounded-sm"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600">
            Your boards will be saved and ready to share during your consultation
          </p>
        </div>
      </div>
    </section>
  )
} 