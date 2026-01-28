'use client';

import ErrorState from '@/components/ui/ErrorState';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="space-y-6">
      <ErrorState
        title="Vendor Not Found"
        message="The vendor you're looking for doesn't exist or may have been removed."
      />
      <div className="flex justify-center mt-6">
        <Link
          href="/"
          className="px-6 py-3 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors font-medium"
        >
          Browse All Vendors
        </Link>
      </div>
    </div>
  );
}