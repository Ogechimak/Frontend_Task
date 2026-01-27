import { notFound } from 'next/navigation';
import { getVendorBySlug } from '@/lib/data/vendors';
import type { Metadata } from 'next';
import HeroSection from '@/components/layout/HeroSection';
import VendorHeader from '@/components/layout/VendorHeader';
import ProductGrid from '@/components/layout/ProductGrid';

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

  if (!vendor) {
    notFound();
  }

  return (
    <div className="space-y-8 sm:space-y-12">
      {/* Hero Section */}
      <HeroSection heroImage={vendor.heroImage} vendorName={vendor.name} />

      {/* Vendor Header */}
      <VendorHeader
        name={vendor.name}
        description={vendor.description}
        logo={vendor.logo}
      />

      {/* Products Section */}
      <div className="border-t pt-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            Products
          </h2>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-50 dark:bg-brand-900/30 rounded-lg border border-brand-200 dark:border-brand-800">
            <span className="text-brand-700 dark:text-brand-300 font-semibold">
              {vendor.products.length}
            </span>
            <span className="text-gray-600 dark:text-gray-400 text-sm">
              {vendor.products.length === 1 ? 'product' : 'products'}
            </span>
          </div>
        </div>

        <ProductGrid 
          products={vendor.products}
          emptyMessage={`${vendor.name} has no products yet.`}
        />
      </div>
    </div>
  );
}