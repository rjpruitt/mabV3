// @ts-nocheck
'use client'

// Utility function to combine class names
const classNames = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(' ')
}

interface ProgressStep {
  id: string
  label: string
  isComplete: boolean
  isCurrent: boolean
}

interface ProgressIndicatorProps {
  steps: ProgressStep[]
  onStepClick?: (stepId: string) => void
}

export function ProgressIndicator({ steps, onStepClick }: ProgressIndicatorProps) {
  return (
    <nav aria-label="Progress" className="mb-12 max-w-full">
      <ol role="list" className="flex items-center max-w-3xl mx-auto px-8">
        {steps.map((step, stepIdx) => (
          <li
            key={step.id}
            className={classNames(
              'relative flex flex-col items-center',
              stepIdx !== steps.length - 1 ? 'flex-1' : 'w-10'
            )}
          >
            <div className="flex items-center w-full">
              <button
                onClick={() => onStepClick?.(step.id)}
                className={classNames(
                  'relative flex h-8 w-8 items-center justify-center',
                  'rounded-full z-10',
                  step.isComplete ? 'bg-blue-600' : '',
                  step.isCurrent ? 'border-2 border-blue-600' : '',
                  !step.isComplete && !step.isCurrent ? 'border-2 border-gray-300' : '',
                  step.isComplete || step.isCurrent ? 'cursor-pointer hover:border-blue-700' : 'cursor-not-allowed'
                )}
                disabled={!step.isComplete && !step.isCurrent}
              >
                <span className="sr-only">{step.label}</span>
                {step.isComplete ? (
                  <svg 
                    className="h-5 w-5 text-white" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M5 13l4 4L19 7" 
                    />
                  </svg>
                ) : (
                  <span
                    className={classNames(
                      'h-2.5 w-2.5 rounded-full',
                      'bg-transparent'
                    )}
                  />
                )}
              </button>
              {stepIdx !== steps.length - 1 && (
                <div
                  className={classNames(
                    'h-0.5 absolute top-4 left-8 right-0',
                    step.isComplete ? 'bg-blue-600' : 'bg-gray-300'
                  )}
                />
              )}
            </div>
            <span
              className={classNames(
                'absolute text-xs font-medium text-center',
                'w-32 -left-12 top-10',
                step.isCurrent ? 'text-blue-600' : '',
                step.isComplete ? 'text-gray-900' : 'text-gray-500'
              )}
            >
              {step.label}
            </span>
          </li>
        ))}
      </ol>
    </nav>
  )
} 