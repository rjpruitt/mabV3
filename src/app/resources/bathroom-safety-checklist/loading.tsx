export default function BathroomSafetyChecklistLoading() {
  return (
    <div className="min-h-screen bg-gray-50 animate-pulse">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary to-primary-light py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto">
            <div className="w-full md:w-1/2 md:pr-12 mb-10 md:mb-0">
              <div className="h-12 bg-white/20 rounded-sm mb-6 w-3/4" />
              <div className="h-24 bg-white/20 rounded-sm mb-8" />
              <div className="h-12 bg-white/20 rounded-sm w-1/2" />
            </div>
            <div className="w-full md:w-1/2">
              <div className="bg-white/10 p-8 rounded-sm">
                <div className="h-8 bg-white/20 rounded-sm mb-6 w-1/2" />
                <div className="space-y-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-4 bg-white/20 rounded-sm" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="h-8 bg-gray-200 rounded-sm mb-4 w-1/3 mx-auto" />
            <div className="h-4 bg-gray-200 rounded-sm w-1/2 mx-auto" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="p-6 bg-gray-100 rounded-sm">
                <div className="h-12 w-12 bg-gray-200 rounded-sm mb-4" />
                <div className="h-6 bg-gray-200 rounded-sm mb-2 w-2/3" />
                <div className="h-16 bg-gray-200 rounded-sm" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="h-8 bg-gray-200 rounded-sm w-1/3 mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="p-8 bg-white rounded-sm">
                <div className="h-20 bg-gray-100 rounded-sm mb-4" />
                <div className="h-4 bg-gray-100 rounded-sm w-1/3" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
} 