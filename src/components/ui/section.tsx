'use client'

import { HeadingLevelProvider } from '@/hooks/use-heading-level'
import { Heading } from '@/components/ui/heading'

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
}

export function Section({ children, className, ...props }: SectionProps) {
  return (
    <section className={className} {...props}>
      {children}
    </section>
  )
} 