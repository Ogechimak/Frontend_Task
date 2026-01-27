import type { Product } from '@/lib/types/vendor';
import type { SortOption } from '@/components/ui/SortDropdown';

export function sortProducts(products: Product[], sortBy: SortOption): Product[] {
  const sorted = [...products]; // Create copy to avoid mutation

  switch (sortBy) {
    case 'price-low':
      return sorted.sort((a, b) => a.price - b.price);
    
    case 'price-high':
      return sorted.sort((a, b) => b.price - a.price);
    
    case 'most-recent':
      return sorted.sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateB - dateA; // Most recent first
      });
    
    default:
      return sorted;
  }
}