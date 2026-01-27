import { getAllProducts } from '@/lib/data/vendors';
import SearchableProductGrid from '@/components/layout/SearchableProductGrid';
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

      <SearchableProductGrid 
        products={products}
        itemsPerPage={6}
      />
    </div>
  );
}