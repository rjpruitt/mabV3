import { Section } from '@/components/ui/section'

export default function AccessibilityLoading() {
  return (
    <div className="animate-pulse">
      {/* Hero Section Skeleton */}
      <Section className="w-full py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="h-12 bg-gray-200 rounded-sm mb-6" />
            <div className="h-6 bg-gray-200 rounded-sm w-3/4" />
          </div>
        </div>
      </Section>

      {/* Features Section Skeleton */}
      <Section className="w-full py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-sm shadow-sm p-6">
                <div className="aspect-[4/3] bg-gray-200 rounded-sm mb-6" />
                <div className="h-8 bg-gray-200 rounded-sm mb-4" />
                <div className="h-4 bg-gray-200 rounded-sm mb-2" />
                <div className="h-4 bg-gray-200 rounded-sm w-3/4" />
              </div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  )
} 