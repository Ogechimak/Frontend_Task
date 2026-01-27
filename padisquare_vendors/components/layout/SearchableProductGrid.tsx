'use client';

import { useState, useCallback } from 'react';
import type { Product } from '@/lib/types/vendor';
import ProductGrid from '@/components/layout/ProductGrid';
import SearchBar from '@/components/ui/SearchBar';

interface SearchableProductGridProps {
  products: Product[];
  showSearch?: boolean;
}

export default function SearchableProductGrid({ 
  products,
  showSearch = true 
}: SearchableProductGridProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter products based on search query (case-insensitive)
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Memoize callback to prevent unnecessary re-renders
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      {showSearch && (
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="w-full sm:max-w-md">
            <SearchBar 
              onSearch={handleSearch}
              placeholder="Search products by name..."
            />
          </div>
          
          {/* Results Count */}
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <span className="font-semibold text-gray-900 dark:text-white">
              {filteredProducts.length}
            </span>
            <span className="text-gray-600 dark:text-gray-400 text-sm">
              {searchQuery ? 'results' : 'products'}
            </span>
          </div>
        </div>
      )}

      {/* No Results Message */}
      {searchQuery && filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
            No products found for "<span className="font-semibold">{searchQuery}</span>"
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Try adjusting your search term
          </p>
        </div>
      )}

      {/* Product Grid */}
      {filteredProducts.length > 0 && (
        <ProductGrid 
          products={filteredProducts}
          emptyMessage="No products available."
        />
      )}
    </div>
  );
}