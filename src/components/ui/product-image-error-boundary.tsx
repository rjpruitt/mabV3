import { ErrorBoundary } from './error-boundary'

interface Props {
  children: React.ReactNode
}

export function ProductImageErrorBoundary({ children }: Props) {
  return (
    <ErrorBoundary
      fallback={
        <div className="aspect-square bg-gray-50 flex items-center justify-center text-gray-400">
          <p className="text-sm">Failed to load image</p>
        </div>
      }
    >
      {children}
    </ErrorBoundary>
  )
} 