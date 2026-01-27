import ProductGridSkeleton from '@/components/ui/ProductGridSkeleton';

export default function VendorLoading() {
  return (
    <div className="space-y-8 sm:space-y-12 animate-pulse">
      {/* Hero Skeleton */}
      <div className="h-48 sm:h-64 lg:h-80 bg-gray-200 dark:bg-gray-800 rounded-lg sm:rounded-xl" />

      {/* Vendor Header Skeleton */}
      <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
        <div className="h-16 w-16 sm:h-20 sm:w-20 bg-gray-200 dark:bg-gray-800 rounded-lg" />
        <div className="flex-1 space-y-3">
          <div className="h-8 w-64 bg-gray-200 dark:bg-gray-800 rounded" />
          <div className="h-4 w-full max-w-lg bg-gray-200 dark:bg-gray-800 rounded" />
        </div>
      </div>

      {/* Products Section Skeleton */}
      <div className="border-t pt-8 space-y-6">
        <div className="h-6 w-32 bg-gray-200 dark:bg-gray-800 rounded" />
        <ProductGridSkeleton count={6} />
      </div>
    </div>
  );
}