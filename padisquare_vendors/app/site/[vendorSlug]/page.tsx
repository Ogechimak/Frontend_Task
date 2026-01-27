import { notFound } from 'next/navigation';
import { getVendorBySlug, getAllVendors } from '@/lib/data/vendors';
import type { Metadata } from 'next';
import HeroSection from '@/components/layout/HeroSection';
import VendorHeader from '@/components/layout/VendorHeader';
import SearchableProductGrid from '@/components/layout/SearchableProductGrid';
import VendorStructuredData from '@/components/seo/VendorStructuredData';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import BreadcrumbStructuredData from '@/components/seo/BreadcrumbStructuredData';

export async function generateStaticParams() {
  const vendors = getAllVendors();
  
  return vendors.map((vendor) => ({
    vendorSlug: vendor.slug,
  }));
}

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: { vendorSlug: string };
}): Promise<Metadata> {
  const vendor = getVendorBySlug(params.vendorSlug);

  if (!vendor) {
    return {
      title: 'Vendor Not Found | My App',
      description: 'The vendor you are looking for could not be found.',
    };
  }

  const productCount = vendor.products.length;
  const productWord = productCount === 1 ? 'product' : 'products';

  return {
    title: `${vendor.name} - Shop ${productCount} ${productWord}`,
    description: `${vendor.description} Browse ${productCount} quality ${productWord} from ${vendor.name}.`,
    
    openGraph: {
      title: vendor.name,
      description: vendor.description,
      type: 'website',
      url: `/site/${vendor.slug}`,
      siteName: 'My App',
      images: [
        {
          url: vendor.heroImage,
          width: 1200,
          height: 630,
          alt: `${vendor.name} - ${vendor.description}`,
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title: vendor.name,
      description: vendor.description,
      images: [vendor.heroImage],
    },

    keywords: [
      vendor.name,
      ...vendor.products.map(p => p.category),
      'online shopping',
      'products',
    ],

    robots: {
      index: true,
      follow: true,
    },

    alternates: {
      canonical: `/site/${vendor.slug}`,
    },
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

  const hasEnoughProducts = vendor.products.length > 3;

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Vendors', href: '/' }, // Links back to home where vendors are listed
    { label: vendor.name },
  ];

  return (
    <>
      <VendorStructuredData vendor={vendor} />
      <BreadcrumbStructuredData items={breadcrumbItems} />

      <div className="space-y-8 sm:space-y-12">
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbItems} />

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
              {hasEnoughProducts 
                ? `Browse, search, and sort through ${vendor.name}'s products`
                : `Browse ${vendor.name}'s products`
              }
            </p>
          </div>

          <SearchableProductGrid 
            products={vendor.products}
            showSearch={hasEnoughProducts}
            showSort={hasEnoughProducts}
          />
        </div>
      </div>
    </>
  );
}