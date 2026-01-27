import { getAllProducts } from '@/lib/data/vendors';
import ProductGrid from '@/components/layout/ProductGrid';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Products | My App',
  description: 'Browse all products from our vendors',
};

export default function AllProductsPage() {
  const products = getAllProducts();

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl sm:text-4xl font-bold">All Products</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Discover products from all our vendors
        </p>
      </div>

      <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg inline-flex">
        <span className="font-semibold text-gray-900 dark:text-white">
          {products.length}
        </span>
        <span className="text-gray-600 dark:text-gray-400 text-sm">
          total products
        </span>
      </div>

      <ProductGrid products={products} />
    </div>
  );
}