'use client'

interface ValuePropProps {
  icon: 'Design' | 'Calculator' | 'Calendar'
  title: string
  description: string
}

function ValueProp({ icon, title, description }: ValuePropProps) {
  return (
    <div className="text-center">
      <div className="mb-4">
        {/* TODO: Add actual icons */}
        <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto 
                      flex items-center justify-center">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

export function DesignToolIntro() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Main heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Design Your Perfect Shower & Get Your Price
        </h2>

        {/* Trust-building subheading */}
        <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          Our simple design tool lets you see exactly what your new shower will 
          cost - no sales pressure, no hidden fees, just transparent pricing
        </p>

        {/* Value props grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <ValueProp
            icon="Design"
            title="Simple Choices"
            description="Step-by-step guidance to create your perfect shower"
          />
          <ValueProp
            icon="Calculator"
            title="Instant Pricing"
            description="See your price update as you make selections"
          />
          <ValueProp
            icon="Calendar"
            title="Quick Installation"
            description="Schedule your installation when you're ready"
          />
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={() => {/* TODO: Open tool */}}
            className="bg-blue-600 text-white px-8 py-4 rounded-full 
                     text-lg font-semibold hover:bg-blue-700 
                     transition-colors"
          >
            Start Designing Your Shower
          </button>
        </div>
      </div>
    </section>
  )
} 