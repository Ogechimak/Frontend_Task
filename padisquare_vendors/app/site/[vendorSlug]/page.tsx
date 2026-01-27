import { notFound } from 'next/navigation';
import { getVendorBySlug } from '@/lib/data/vendors';
import type { Metadata } from 'next';

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: { vendorSlug: string };
}): Promise<Metadata> {
  const vendor = getVendorBySlug(params.vendorSlug);

  if (!vendor) {
    return {
      title: 'Vendor Not Found',
    };
  }

  return {
    title: `${vendor.name} | My App`,
    description: vendor.description,
  };
}

export default function VendorPage({
  params,
}: {
  params: { vendorSlug: string };
}) {
  const vendor = getVendorBySlug(params.vendorSlug);

  // Handle vendor not found
  if (!vendor) {
    notFound();
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative h-64 overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-800">
        {/* Placeholder for hero image */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-sm text-gray-500">Hero Image: {vendor.heroImage}</p>
          </div>
        </div>
      </div>

      {/* Vendor Header */}
      <div className="flex items-start gap-6">
        {/* Logo */}
        <div className="h-20 w-20 flex-shrink-0 rounded-lg bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
          <p className="text-xs text-gray-500 text-center px-2">Logo</p>
        </div>

        {/* Vendor Info */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{vendor.name}</h1>
          <p className="text-gray-600 dark:text-gray-400">{vendor.description}</p>
        </div>
      </div>

      {/* Products Section (placeholder) */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Products</h2>
        <p className="text-gray-600 dark:text-gray-400">
          {vendor.products.length} products available
        </p>
      </div>
    </div>
  );
}