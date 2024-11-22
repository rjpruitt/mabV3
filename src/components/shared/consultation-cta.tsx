'use client'

import { Section } from '@/components/ui/section'
import { ScrollReveal } from '@/components/ui/scroll-reveal'

type ConsultationCTAProps = {
  variant?: 'tan' | 'white' | 'teal'
}

export function ConsultationCTA({ variant = 'white' }: ConsultationCTAProps) {
  const styles = {
    background: {
      tan: 'bg-[#F8F6F3]',
      white: 'bg-white',
      teal: 'bg-primary'
    },
    text: {
      heading: {
        tan: 'text-charcoal',
        white: 'text-charcoal',
        teal: 'text-white'
      },
      body: {
        tan: 'text-charcoal',
        white: 'text-charcoal',
        teal: 'text-white'
      },
      accent: 'text-accent'
    },
    button: 'bg-accent text-white hover:bg-accent/90'
  }

  return (
    <Section className={`w-full py-32 ${styles.background[variant]}`}>
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className={`font-pt-serif text-4xl mb-6 ${styles.text.heading[variant]}`}>
              Ready To Speak With A Mid America Bathworks Expert?
            </h2>
            <p className={`text-lg mb-8 ${styles.text.body[variant]}`}>
              Book a FREE consultation by calling us at{' '}
              <span className={styles.text.accent}>1 (555) 555-5555</span>{' '}
              or by using the link below to book a preferred date and time!
            </p>
            <button className={`${styles.button} px-8 py-3 rounded-sm transition-colors`}>
              BOOK A FREE CONSULTATION
            </button>
            <p className={`mt-4 text-2xl ${styles.text.accent} font-dancing`}>
              It's quick, free and easy!
            </p>
          </div>
        </ScrollReveal>
      </div>
    </Section>
  )
} 