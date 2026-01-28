'use client';

import { useState, useCallback, useMemo } from 'react';
import type { Product } from '@/lib/types/vendor';
import ProductGrid from '@/components/layout/ProductGrid';
import SearchBar from '@/components/ui/SearchBar';
import SortDropdown, { type SortOption } from '@/components/ui/SortDropdown';
import Pagination from '@/components/ui/Pagination';
import EmptyState from '@/components/ui/EmptyState';
import { sortProducts } from '@/lib/utils/sortProducts';
import { paginate } from '@/lib/utils/pagination';

interface SearchableProductGridProps {
  products: Product[];
  showSearch?: boolean;
  showSort?: boolean;
  itemsPerPage?: number;
}

export default function SearchableProductGrid({ 
  products,
  showSearch = true,
  showSort = true,
  itemsPerPage = 8
}: SearchableProductGridProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('most-recent');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter and sort products
  const filteredAndSorted = useMemo(() => {
    const filtered = products.filter(product =>
  product.name.toLowerCase().includes(searchQuery.toLowerCase())
);

    return sortProducts(filtered, sortBy);
  }, [products, searchQuery, sortBy]);

  // Paginate the filtered and sorted results
  const paginatedData = useMemo(() => {
    return paginate(filteredAndSorted, currentPage, itemsPerPage);
  }, [filteredAndSorted, currentPage, itemsPerPage]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  }, []);

  const handleSort = useCallback((option: SortOption) => {
    setSortBy(option);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
    setCurrentPage(1);
  }, []);

  return (
    <div className="space-y-6">
      {/* Search and Sort Controls */}
      {(showSearch || showSort) && (
        <div className="flex flex-col gap-4">
          {showSearch && (
            <div className="w-full sm:max-w-md">
              <SearchBar 
                onSearch={handleSearch}
                placeholder="Search products by name..."
              />
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            {showSort && (
              <SortDropdown value={sortBy} onChange={handleSort} />
            )}

            <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg ml-auto">
              <span className="font-semibold text-gray-900 dark:text-white">
                {paginatedData.totalItems}
              </span>
              <span className="text-gray-600 dark:text-gray-400 text-sm">
                {searchQuery ? 'results' : 'products'}
              </span>
              {paginatedData.totalPages > 1 && (
                <>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-600 dark:text-gray-400 text-sm">
                    Page {paginatedData.currentPage} of {paginatedData.totalPages}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* No Search Results State */}
      {searchQuery && paginatedData.totalItems === 0 && (
        <div>
          <EmptyState
            icon="search"
            title="No products found"
            description={`We couldn't find any products matching "${searchQuery}". Try a different search term.`}
          />
          <div className="flex justify-center mt-6">
            <button
              onClick={handleClearSearch}
              className="px-6 py-3 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors font-medium"
            >
              Clear Search
            </button>
          </div>
        </div>
      )}

      {/* Product Grid */}
      {paginatedData.items.length > 0 && (
        <>
          <ProductGrid 
            products={paginatedData.items}
            emptyMessage="No products available"
            emptyIcon="box"
          />

          <Pagination
            currentPage={paginatedData.currentPage}
            totalPages={paginatedData.totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}

      {/* Empty State (no products at all) */}
      {!searchQuery && products.length === 0 && (
        <EmptyState
          icon="box"
          title="No products yet"
          description="This vendor hasn't added any products to their catalog yet. Check back soon!"
        />
      )}
    </div>
  );
}