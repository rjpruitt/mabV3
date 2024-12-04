'use client'

export default function Error() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-semibold mb-4">Something Went Wrong</h1>
        <p className="text-gray-600 mb-8">
          Please try again later or contact us if the problem persists.
        </p>
        <a 
          href="/"
          className="inline-block bg-primary text-white px-6 py-3 rounded-sm hover:bg-primary/90"
        >
          Return Home
        </a>
      </div>
    </div>
  )
} 