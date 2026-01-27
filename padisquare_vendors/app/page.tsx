import Link from 'next/link';
import { getAllVendors } from '@/lib/data/vendors';

export default function Home() {
  const vendors = getAllVendors();

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold">Welcome</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Your Next.js 14 multi-vendor app is ready.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Browse Vendors</h3>
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



