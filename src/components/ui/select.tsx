import * as React from 'react'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  className?: string
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = '', ...props }, ref) => {
    return (
      <select
        className={`w-full px-3 py-2 border rounded-lg text-gray-900 ${className}`}
        ref={ref}
        {...props}
      />
    )
  }
)

Select.displayName = 'Select' 