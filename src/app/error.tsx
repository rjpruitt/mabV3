'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-semibold mb-4">Something Went Wrong</h1>
        <p className="text-gray-600 mb-8">
          Please try again later or contact us if the problem persists.
        </p>
        <button
          onClick={reset}
          className="inline-block bg-primary text-white px-6 py-3 rounded-sm hover:bg-primary/90"
        >
          Try Again
        </button>
      </div>
    </main>
  )
} 