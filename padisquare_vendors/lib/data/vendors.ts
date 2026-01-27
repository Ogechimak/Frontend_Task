import vendorsData from './vendors.json';
import type { Vendor, Product, VendorsData } from '@/lib/types/vendor';

const data: VendorsData = vendorsData as VendorsData;

// Get all vendors
export function getAllVendors(): Vendor[] {
  return data.vendors;
}

// Get vendor by slug
export function getVendorBySlug(slug: string): Vendor | undefined {
  return data.vendors.find((vendor) => vendor.slug === slug);
}

// Get all products across all vendors
export function getAllProducts(): Product[] {
  return data.vendors.flatMap((vendor) => vendor.products);
}

// Get product by ID
export function getProductById(productId: string): Product | undefined {
  for (const vendor of data.vendors) {
    const product = vendor.products.find((p) => p.id === productId);
    if (product) return product;
  }
  return undefined;
}

// Get products by vendor slug
export function getProductsByVendorSlug(vendorSlug: string): Product[] {
  const vendor = getVendorBySlug(vendorSlug);
  return vendor ? vendor.products : [];
}

















