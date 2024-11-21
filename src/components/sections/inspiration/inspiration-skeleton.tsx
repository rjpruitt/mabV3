'use client'

import { Skeleton } from '@/components/ui/skeleton'

export function InspirationPageSkeleton() {
  return (
    <div>
      {/* Hero Section Skeleton */}
      <section className="relative mt-[var(--header-height-normal)] w-full bg-[#F8F6F3] overflow-hidden">
        <div className="container mx-auto px-4 py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content Side */}
            <div>
              <Skeleton className="h-14 w-4/5 mb-6" variant="text" />
              <Skeleton className="h-6 w-full mb-4" variant="text" />
              <Skeleton className="h-6 w-3/4 mb-8" variant="text" />
              <div className="flex flex-wrap gap-4">
                <Skeleton className="h-12 w-48" />
                <Skeleton className="h-12 w-48" />
              </div>
            </div>

            {/* Visual Side */}
            <div className="relative">
              <div className="relative aspect-square">
                <div className="grid grid-cols-2 gap-4 p-4">
                  {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="aspect-square" animation="wave" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Style Collections Skeleton */}
      <section className="w-full py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Skeleton className="h-10 w-64 mx-auto mb-4" variant="text" />
            <Skeleton className="h-6 w-2/3 mx-auto" variant="text" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="group">
                <Skeleton className="aspect-[4/3] mb-4" animation="wave" />
                <Skeleton className="h-6 w-48 mb-2" variant="text" />
                <Skeleton className="h-4 w-full" variant="text" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Material Explorer Skeleton */}
      <section className="w-full py-20 bg-[#F8F6F3]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Skeleton className="h-10 w-96 mx-auto mb-4" variant="text" />
            <Skeleton className="h-6 w-2/3 mx-auto" variant="text" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="group bg-white rounded-sm overflow-hidden">
                <div className="flex">
                  <Skeleton className="w-1/2 aspect-[4/3]" animation="wave" />
                  <div className="w-1/2 p-6">
                    <Skeleton className="h-6 w-3/4 mb-2" variant="text" />
                    <Skeleton className="h-4 w-full" variant="text" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
} 