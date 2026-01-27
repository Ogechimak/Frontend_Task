export interface PaginationResult<T> {
  items: T[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export function paginate<T>(
  items: T[],
  page: number,
  itemsPerPage: number
): PaginationResult<T> {
  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  // Clamp page to valid range
  const currentPage = Math.max(1, Math.min(page, totalPages || 1));
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  
  const paginatedItems = items.slice(startIndex, endIndex);

  return {
    items: paginatedItems,
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1,
  };
}