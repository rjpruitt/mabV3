'use client'

import { ScrollReveal } from '@/components/ui/scroll-reveal'

type ConsultationCTAProps = {
  variant?: 'tan' | 'white' | 'teal'
  features?: string[]
}

export function ConsultationCTA({ 
  variant = 'white',
  features = []
}: ConsultationCTAProps) {
  const styles = {
    background: {
      tan: 'bg-[#F8F6F3]',
      white: 'bg-white',
      teal: 'bg-primary'
    },
    text: {
      heading: {
        tan: 'text-[#2F2F2F]',
        white: 'text-[#2F2F2F]',
        teal: 'text-white'
      },
      body: {
        tan: 'text-gray-600',
        white: 'text-gray-600',
        teal: 'text-white/90'
      }
    },
    button: {
      base: 'px-8 py-3 rounded-sm transition-colors font-montserrat font-semibold',
      variant: {
        tan: 'bg-accent text-white hover:bg-accent/90',
        white: 'bg-accent text-white hover:bg-accent/90',
        teal: 'bg-accent text-white hover:bg-accent/90'
      }
    },
    accent: {
      tan: 'text-accent text-xl',
      white: 'text-accent text-xl',
      teal: 'text-accent font-bold text-xl'
    },
    dancing: {
      tan: 'text-accent',
      white: 'text-accent',
      teal: 'text-white'
    }
  }

  return (
    <div className={`w-full py-32 ${styles.background[variant]}`}>
      <div className="container mx-auto px-4">
        <ScrollReveal variant="fadeInUp">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className={`font-pt-serif text-4xl mb-6 ${styles.text.heading[variant]}`}>
              Ready To Speak With A Mid America Bathworks Expert?
            </h2>
            
            {features.length > 0 && (
              <div className="mb-8">
                <ul className="flex flex-col md:flex-row justify-center gap-4 md:gap-8">
                  {features.map((feature, index) => (
                    <li 
                      key={index}
                      className={`flex items-center gap-2 ${styles.text.body[variant]}`}
                    >
                      <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <p className={`text-lg mb-8 ${styles.text.body[variant]}`}>
              Book a FREE consultation by calling us at{' '}
              <span className={styles.accent[variant]}>1 (555) 555-5555</span>{' '}
              or by using the link below to book a preferred date and time!
            </p>
            <button 
              className={`${styles.button.base} ${styles.button.variant[variant]}`}
            >
              BOOK A FREE CONSULTATION
            </button>
            <p className={`mt-4 text-2xl ${styles.dancing[variant]} font-dancing`}>
              It's quick, free and easy!
            </p>
          </div>
        </ScrollReveal>
      </div>
    </div>
  )
} 