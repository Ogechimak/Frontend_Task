'use client';

import { useState, useCallback, useMemo } from 'react';
import Link from 'next/link';
import type { Vendor } from '@/lib/types/vendor';
import SearchBar from '@/components/ui/SearchBar';
import SortDropdown, { type SortOption } from '@/components/ui/SortDropdown';
import EmptyState from '@/components/ui/EmptyState';

interface SearchableVendorGridProps {
  vendors: Vendor[];
}

export default function SearchableVendorGrid({ vendors }: SearchableVendorGridProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('most-recent');

  // Filter and sort vendors
  const filteredAndSorted = useMemo(() => {
    const filtered = vendors.filter(vendor =>
      vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort vendors
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          // Sort by average product price (low to high)
          const avgPriceA = a.products.reduce((sum, p) => sum + p.price, 0) / a.products.length || 0;
          const avgPriceB = b.products.reduce((sum, p) => sum + p.price, 0) / b.products.length || 0;
          return avgPriceA - avgPriceB;
        case 'price-high':
          // Sort by average product price (high to low)
          const avgPriceA2 = a.products.reduce((sum, p) => sum + p.price, 0) / a.products.length || 0;
          const avgPriceB2 = b.products.reduce((sum, p) => sum + p.price, 0) / b.products.length || 0;
          return avgPriceB2 - avgPriceA2;
        case 'most-recent':
        default:
          // Keep original order
          return 0;
      }
    });
  }, [vendors, searchQuery, sortBy]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleSort = useCallback((option: SortOption) => {
    setSortBy(option);
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  return (
    <div className="space-y-6">
      {/* Search and Sort Controls */}
      <div className="flex flex-col gap-4">
        <div className="w-full sm:max-w-md">
          <SearchBar 
            onSearch={handleSearch}
            placeholder="Search vendors by name or description..."
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <SortDropdown value={sortBy} onChange={handleSort} />

          <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg ml-auto">
            <span className="font-semibold text-gray-900 dark:text-white">
              {filteredAndSorted.length}
            </span>
            <span className="text-gray-600 dark:text-gray-400 text-sm">
              {searchQuery ? 'results' : 'vendors'}
            </span>
          </div>
        </div>
      </div>

      {/* No Search Results State */}
      {searchQuery && filteredAndSorted.length === 0 && (
        <div>
          <EmptyState
            icon="search"
            title="No vendors found"
            description={`We couldn't find any vendors matching "${searchQuery}". Try a different search term.`}
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

      {/* Vendor Grid */}
      {filteredAndSorted.length > 0 && (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredAndSorted.map((vendor) => (
            <li key={vendor.id}>
              <Link
                href={`/site/${vendor.slug}`}
                className="block p-6 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-brand-500 hover:bg-brand-50 dark:hover:bg-brand-950 transition-all duration-200 hover:shadow-md group"
              >
                <div className="font-semibold text-lg mb-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                  {vendor.name}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {vendor.description}
                </div>
                <div className="mt-3 text-xs text-brand-600 dark:text-brand-400 font-medium">
                  {vendor.products.length} products →
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {/* Empty State (no vendors at all) */}
      {!searchQuery && vendors.length === 0 && (
        <EmptyState
          icon="box"
          title="No vendors yet"
          description="Check back later for new vendors."
        />
      )}
    </div>
  );
}
