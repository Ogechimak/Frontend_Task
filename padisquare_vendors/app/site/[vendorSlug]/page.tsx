import { notFound } from 'next/navigation';
import { getVendorBySlug } from '@/lib/data/vendors';
import type { Metadata } from 'next';
import HeroSection from '@/components/layout/HeroSection';
import VendorHeader from '@/components/layout/VendorHeader';
import SearchableProductGrid from '@/components/layout/SearchableProductGrid';

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
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Products
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Browse and search through {vendor.name}'s products
          </p>
        </div>

        <SearchableProductGrid 
          products={vendor.products}
          showSearch={vendor.products.length > 3}
        />
      </div>
    </div>
  );
}