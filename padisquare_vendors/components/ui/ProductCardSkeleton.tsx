export default function ProductCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 animate-pulse">
      {/* Image Skeleton */}
      <div className="aspect-square bg-gray-200 dark:bg-gray-800" />

      {/* Content Skeleton */}
      <div className="flex flex-1 flex-col p-4 space-y-3">
        {/* Category */}
        <div className="h-3 w-20 bg-gray-200 dark:bg-gray-800 rounded" />

        {/* Product Name */}
        <div className="space-y-2">
          <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded" />
          <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-800 rounded" />
        </div>

        {/* Price and Stock */}
        <div className="flex items-end justify-between pt-2 mt-auto">
          <div className="h-6 w-24 bg-gray-200 dark:bg-gray-800 rounded" />
          <div className="h-3 w-16 bg-gray-200 dark:bg-gray-800 rounded" />
        </div>
      </div>
    </div>
  );
}