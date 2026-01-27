'use client';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  // Don't render if only one page
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showEllipsis = totalPages > 7;

    if (!showEllipsis) {
      // Show all pages if 7 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage <= 3) {
        // Near start: 1 2 3 4 ... last
        pages.push(2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Near end: 1 ... last-3 last-2 last-1 last
        pages.push('...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        // Middle: 1 ... current-1 current current+1 ... last
        pages.push('...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }

    return pages;
  };

  return (
    <nav 
      className="flex items-center justify-center gap-2 py-8"
      aria-label="Pagination navigation"
    >
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:border-brand-500 hover:text-brand-600 dark:hover:text-brand-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-200 dark:disabled:hover:border-gray-700 disabled:hover:text-gray-700 dark:disabled:hover:text-gray-300 transition-all font-medium text-sm"
        aria-label="Go to previous page"
      >
        ← Previous
      </button>

      {/* Page Numbers */}
      <div className="hidden sm:flex items-center gap-1">
        {getPageNumbers().map((page, index) => {
          if (page === '...') {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-3 py-2 text-gray-500 dark:text-gray-400"
              >
                ...
              </span>
            );
          }

          const pageNum = page as number;
          const isActive = pageNum === currentPage;

          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`px-3 py-2 rounded-lg border-2 font-medium text-sm transition-all ${
                isActive
                  ? 'border-brand-500 bg-brand-500 text-white'
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:border-brand-500 hover:text-brand-600 dark:hover:text-brand-400'
              }`}
              aria-label={`Go to page ${pageNum}`}
              aria-current={isActive ? 'page' : undefined}
            >
              {pageNum}
            </button>
          );
        })}
      </div>

      {/* Mobile: Current Page Indicator */}
      <div className="sm:hidden px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <span className="text-sm text-gray-600 dark:text-gray-400">
          Page <span className="font-semibold text-gray-900 dark:text-white">{currentPage}</span> of {totalPages}
        </span>
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:border-brand-500 hover:text-brand-600 dark:hover:text-brand-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-200 dark:disabled:hover:border-gray-700 disabled:hover:text-gray-700 dark:disabled:hover:text-gray-300 transition-all font-medium text-sm"
        aria-label="Go to next page"
      >
        Next →
      </button>
    </nav>
  );
}