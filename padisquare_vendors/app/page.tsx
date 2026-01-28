import Link from 'next/link';
import { getAllVendors, getAllProducts } from '@/lib/data/vendors';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Padisquare - Multi-Vendor Marketplace',
  description: 'Discover quality products from trusted vendors. Browse, search, and shop with confidence.',
  
  openGraph: {
    title: 'Padisquare - Multi-Vendor Marketplace',
    description: 'Discover quality products from trusted vendors.',
    type: 'website',
    url: '/',
    siteName: 'Padisquare',
  },

  twitter: {
    card: 'summary',
    title: 'Padisquare - Multi-Vendor Marketplace',
    description: 'Discover quality products from trusted vendors.',
  },

  keywords: [
    'marketplace',
    'vendors',
    'online shopping',
    'products',
    'e-commerce',
    'padisquare',
  ],

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: '/',
  },
};

export const revalidate = 3600;

export default function Home() {
  const vendors = getAllVendors();
  const totalProducts = getAllProducts().length;

  return (
    <div className="space-y-12">
      {/* Hero Section - Centered */}
      <div className="space-y-6 text-center py-12">
        <h1 className="text-4xl sm:text-5xl font-bold">
          Welcome to Padisquare Multi-Vendor
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Your multi-vendor marketplace is ready.
        </p>
        <div className="flex justify-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors font-medium text-lg"
          >
            Browse All Products
            <span className="px-2.5 py-0.5 bg-white/20 rounded-full text-sm">
              {totalProducts}
            </span>
          </Link>
        </div>
      </div>

      {/* Vendors Grid */}
      <div>
        <h2 className="text-2xl font-semibold mb-6 text-center">Browse Vendors</h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {vendors.map((vendor) => (
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
      </div>
    </div>
  );
}