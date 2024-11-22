'use client'

import { Skeleton } from '@/components/ui/skeleton'

export function ShowersPageSkeleton() {
  return (
    <div>
      {/* Hero Section Skeleton */}
      <section className="w-full py-32 bg-[#F8F6F3]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Skeleton className="h-12 w-3/4 mx-auto mb-6" variant="text" />
            <Skeleton className="h-6 w-2/3 mx-auto" variant="text" />
          </div>
        </div>
      </section>

      {/* Features Section Skeleton */}
      <section className="w-full py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="w-12 h-12" variant="circular" />
                <Skeleton className="h-6 w-3/4" variant="text" />
                <Skeleton className="h-4 w-full" variant="text" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section Skeleton */}
      <section className="w-full py-20 bg-[#F8F6F3]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-sm overflow-hidden">
                <Skeleton className="w-full aspect-[4/3]" />
                <div className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-4" variant="text" />
                  <Skeleton className="h-4 w-full" variant="text" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
} 