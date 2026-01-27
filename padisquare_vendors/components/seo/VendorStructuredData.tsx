import type { Vendor } from '@/lib/types/vendor';

interface VendorStructuredDataProps {
  vendor: Vendor;
}

export default function VendorStructuredData({ vendor }: VendorStructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Store',
    name: vendor.name,
    description: vendor.description,
    image: vendor.heroImage,
    url: `/site/${vendor.slug}`,
    logo: vendor.logo,
    // Add products as structured data
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${vendor.name} Products`,
      itemListElement: vendor.products.map((product, index) => ({
        '@type': 'Offer',
        position: index + 1,
        itemOffered: {
          '@type': 'Product',
          name: product.name,
          description: `${product.name} - ${product.category}`,
          image: product.image,
          offers: {
            '@type': 'Offer',
            price: product.price,
            priceCurrency: 'USD',
            availability: product.stock > 0 
              ? 'https://schema.org/InStock' 
              : 'https://schema.org/OutOfStock',
          },
        },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}