import { getAllProducts } from '@/lib/data/vendors';
import SearchableProductGrid from '@/components/layout/SearchableProductGrid';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Browse All Products - Discover Quality Items | My App',
  description: 'Explore our complete collection of products from trusted vendors. Search, sort, and find exactly what you need.',
  
  openGraph: {
    title: 'Browse All Products | My App',
    description: 'Explore our complete collection of products from trusted vendors.',
    type: 'website',
    url: '/products',
    siteName: 'My App',
  },

  twitter: {
    card: 'summary',
    title: 'Browse All Products | My App',
    description: 'Explore our complete collection of products from trusted vendors.',
  },

  keywords: [
    'products',
    'online shopping',
    'marketplace',
    'vendors',
    'e-commerce',
  ],

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: '/products',
  },
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