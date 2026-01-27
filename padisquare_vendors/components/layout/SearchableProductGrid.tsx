'use client';

import { useState, useCallback, useMemo } from 'react';
import type { Product } from '@/lib/types/vendor';
import ProductGrid from '@/components/layout/ProductGrid';
import SearchBar from '@/components/ui/SearchBar';
import SortDropdown, { type SortOption } from '@/components/ui/SortDropdown';
import { sortProducts } from '@/lib/utils/sortProducts';

interface SearchableProductGridProps {
  products: Product[];
  showSearch?: boolean;
  showSort?: boolean;
}

export default function SearchableProductGrid({ 
  products,
  showSearch = true,
  showSort = true
}: SearchableProductGridProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('most-recent');

  // Filter and sort products
  const processedProducts = useMemo(() => {
    // First, filter by search query
    let filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Then, sort the filtered results
    return sortProducts(filtered, sortBy);
  }, [products, searchQuery, sortBy]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleSort = useCallback((option: SortOption) => {
    setSortBy(option);
  }, []);

  return (
    <div className="space-y-6">
      {/* Search and Sort Controls */}
      {(showSearch || showSort) && (
        <div className="flex flex-col gap-4">
          {/* Search Bar Row */}
          {showSearch && (
            <div className="w-full sm:max-w-md">
              <SearchBar 
                onSearch={handleSearch}
                placeholder="Search products by name..."
              />
            </div>
          )}

          {/* Sort and Count Row */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            {/* Sort Dropdown */}
            {showSort && (
              <SortDropdown value={sortBy} onChange={handleSort} />
            )}

            {/* Results Count */}
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg ml-auto">
              <span className="font-semibold text-gray-900 dark:text-white">
                {processedProducts.length}
              </span>
              <span className="text-gray-600 dark:text-gray-400 text-sm">
                {searchQuery ? 'results' : 'products'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* No Results Message */}
      {searchQuery && processedProducts.length === 0 && (
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
      {processedProducts.length > 0 && (
        <ProductGrid 
          products={processedProducts}
          emptyMessage="No products available."
        />
      )}
    </div>
  );
}