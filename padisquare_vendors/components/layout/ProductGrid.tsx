import type { Product } from '@/lib/types/vendor';
import ProductCard from '@/components/ui/ProductCard';
import EmptyState from '@/components/ui/EmptyState';

interface ProductGridProps {
  products: Product[];
  emptyMessage?: string;
  emptyIcon?: 'search' | 'box' | 'filter';
}

export default function ProductGrid({ 
  products, 
  emptyMessage = "No products available.",
  emptyIcon = 'box'
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <EmptyState
        icon={emptyIcon}
        title={emptyMessage}
        description="Try adjusting your search or filters to find what you're looking for."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
