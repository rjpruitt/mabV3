export function ProductCardSkeleton() {
  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm animate-pulse">
      <div className="aspect-square bg-gray-200 mb-4 rounded" />
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
        <div className="h-4 bg-gray-200 rounded w-1/4" />
      </div>
    </div>
  )
} 