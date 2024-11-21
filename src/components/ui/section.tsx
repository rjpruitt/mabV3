'use client'

import { HeadingLevelProvider } from '@/hooks/use-heading-level'
import { Heading } from '@/components/ui/heading'

interface SectionProps {
  children: React.ReactNode
  className?: string
  title?: string
  titleClassName?: string
  description?: string
  descriptionClassName?: string
  /**
   * Whether to increment the heading level for this section
   * @default true
   */
  incrementLevel?: boolean
  /**
   * ARIA label for the section
   */
  ariaLabel?: string
}

export function Section({
  children,
  className = '',
  title,
  titleClassName = '',
  description,
  descriptionClassName = '',
  incrementLevel = true,
  ariaLabel
}: SectionProps) {
  return (
    <section 
      className={className}
      aria-label={ariaLabel}
    >
      <HeadingLevelProvider level={incrementLevel ? 1 : 0}>
        {title && (
          <Heading className={titleClassName}>
            {title}
          </Heading>
        )}
        {description && (
          <p className={descriptionClassName}>
            {description}
          </p>
        )}
        {children}
      </HeadingLevelProvider>
    </section>
  )
} 