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
        <ul className="space-y-3">
          {vendors.map((vendor) => (
            <li key={vendor.id}>
              <Link
                href={`/site/${vendor.slug}`}
                className="block p-4 border rounded-lg hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950 transition"
              >
                <div className="font-semibold">{vendor.name}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {vendor.description}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
