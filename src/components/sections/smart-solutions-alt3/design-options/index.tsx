'use client'

interface OptionCardProps {
  title: string
  description: string
  buttonText: string
  onClick: () => void
}

function OptionCard({ title, description, buttonText, onClick }: OptionCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 text-center">
      <h3 className="text-xl font-semibold mb-4 text-gray-900">
        {title}
      </h3>
      <p className="text-gray-600 mb-6">
        {description}
      </p>
      <button
        onClick={onClick}
        className="inline-flex items-center justify-center px-6 py-3 
                 bg-blue-600 text-white font-semibold rounded-full
                 hover:bg-blue-700 transition-colors"
      >
        {buttonText}
      </button>
    </div>
  )
}

export function DesignOptions() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900">
          Choose Your Design Path
        </h2>

        <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          Select the approach that works best for you - no pressure, just options
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          <OptionCard
            title="Design Your Own"
            description="Create your perfect shower step-by-step and see your price in real-time"
            buttonText="Start Designing"
            onClick={() => {/* TODO */}}
          />

          <OptionCard
            title="Get Expert Help"
            description="Not sure? Our design experts will help you create your perfect shower"
            buttonText="Schedule Free Consultation"
            onClick={() => {/* TODO */}}
          />
        </div>
      </div>
    </section>
  )
} 