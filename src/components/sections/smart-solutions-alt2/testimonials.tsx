  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
    {testimonials.map((testimonial) => (
      <ScrollReveal key={testimonial.name}>
        <div className="bg-white p-6 rounded-sm shadow-sm hover:shadow-md transition-all h-full flex flex-col">
          <div className="mb-6 flex-grow">
            <Quote className="w-8 h-8 text-accent/20 mb-4" />
            <p className="text-gray-600 italic">
              {testimonial.quote}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12 rounded-full overflow-hidden">
              <Image
                src={testimonial.image}
                alt={testimonial.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-semibold text-[#2F2F2F]">{testimonial.name}</p>
              <p className="text-sm text-gray-600">{testimonial.location}</p>
            </div>
          </div>
        </div>
      </ScrollReveal>
    ))}
  </div> 