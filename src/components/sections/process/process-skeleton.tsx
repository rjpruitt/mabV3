'use client'

import { Skeleton } from '@/components/ui/skeleton'

export function ProcessPageSkeleton() {
  return (
    <div>
      {/* Hero Section Skeleton */}
      <section className="relative w-full mt-[var(--header-height-normal)] pt-32 pb-32 bg-[#F8F6F3]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Skeleton className="h-14 w-4/5 mx-auto mb-6" variant="text" />
            <Skeleton className="h-6 w-3/4 mx-auto" variant="text" />
          </div>
        </div>
      </section>

      {/* Process Steps Skeleton */}
      <section className="w-full py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="space-y-20">
            {[1, 2, 3].map((i) => (
              <div key={i} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Content Side */}
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <Skeleton className="w-8 h-8" variant="circular" />
                    <Skeleton className="h-8 w-48" variant="text" />
                  </div>
                  <Skeleton className="h-5 w-3/4 mb-4" variant="text" />
                  <Skeleton className="h-5 w-full mb-8" variant="text" />
                  
                  <div className="bg-[#F8F6F3] p-8 rounded-sm">
                    <Skeleton className="h-6 w-48 mb-4" variant="text" />
                    <div className="space-y-3">
                      {[1, 2, 3, 4, 5].map((j) => (
                        <div key={j} className="flex items-start gap-3">
                          <Skeleton className="w-1.5 h-1.5 mt-2" variant="circular" />
                          <Skeleton className="h-4 w-full" variant="text" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Image Side */}
                <div className="relative aspect-[4/3]">
                  <Skeleton className="w-full h-full rounded-sm" animation="wave" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Skeleton */}
      <section className="w-full py-20 bg-[#F8F6F3]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Skeleton className="h-10 w-64 mx-auto mb-12" variant="text" />
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="bg-white rounded-sm p-6">
                  <Skeleton className="h-6 w-3/4" variant="text" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 