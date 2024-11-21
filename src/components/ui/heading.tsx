'use client'

import { useHeadingLevel } from '@/hooks/use-heading-level'

interface HeadingProps {
  children: React.ReactNode
  className?: string
  id?: string
}

export function Heading({ children, className = '', id }: HeadingProps) {
  const level = useHeadingLevel()
  const Tag = `h${level}` as keyof JSX.IntrinsicElements

  return (
    <Tag id={id} className={className}>
      {children}
    </Tag>
  )
} 