'use client'

import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
  /**
   * The visual style of the skeleton
   * @default 'rectangular'
   */
  variant?: 'rectangular' | 'circular' | 'text'
  /**
   * The type of animation
   * @default 'pulse'
   */
  animation?: 'pulse' | 'wave'
  /**
   * Label for screen readers
   */
  label?: string
  /**
   * Whether to hide the skeleton from screen readers
   * @default false
   */
  hideFromScreenReader?: boolean
}

export function Skeleton({
  className,
  variant = 'rectangular',
  animation = 'pulse',
  label,
  hideFromScreenReader = false,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn(
        'bg-gray-200',
        {
          'animate-pulse': animation === 'pulse',
          'animate-shimmer': animation === 'wave',
          'rounded-full': variant === 'circular',
          'rounded h-4 w-3/4': variant === 'text',
        },
        className
      )}
      {...props}
      role="status"
      aria-busy="true"
      aria-hidden={hideFromScreenReader}
      aria-label={label || `Loading ${variant} content`}
    >
      {!hideFromScreenReader && (
        <span className="sr-only">
          {label || `Loading ${variant} content`}
        </span>
      )}
    </div>
  )
} 