export default function Custom404() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F6F3]">
      <div className="text-center px-4">
        <h1 className="font-pt-serif text-4xl text-[#2F2F2F] mb-4">
          404 - Page Not Found
        </h1>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
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