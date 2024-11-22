interface SuccessMessageProps {
  title: string
  message: string
  onClose: () => void
}

export function SuccessMessage({ title, message, onClose }: SuccessMessageProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white p-8 rounded-sm max-w-md mx-4 relative">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
        <h3 className="text-2xl font-semibold text-[#2F2F2F] mb-4">
          {title}
        </h3>
        <p className="text-gray-600 mb-6">
          {message}
        </p>
        <button
          onClick={onClose}
          className="w-full bg-accent text-white hover:bg-accent/90 px-4 py-2 rounded-sm transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  )
} 