import type { Product } from '@/lib/types/vendor';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 transition-all duration-200 hover:border-brand-500 hover:shadow-lg">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
        {/* Placeholder for product image */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-2 px-4">
            <div className="inline-block px-3 py-1 bg-white/80 dark:bg-gray-900/80 rounded-full backdrop-blur-sm">
              <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                Product Image
              </p>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-500 line-clamp-1">
              {product.image}
            </p>
          </div>
        </div>

        {/* Stock Badge */}
        {product.stock < 20 && (
          <div className="absolute top-2 right-2">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
              Low Stock
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="flex flex-1 flex-col p-4 space-y-2">
        {/* Category */}
        <p className="text-xs text-brand-600 dark:text-brand-400 font-medium uppercase tracking-wide">
          {product.category}
        </p>

        {/* Product Name */}
        <h3 className="text-base font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
          {product.name}
        </h3>

        {/* Price and Stock */}
        <div className="flex items-end justify-between pt-2 mt-auto">
          <div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              ${product.price.toFixed(2)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {product.stock} in stock
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}