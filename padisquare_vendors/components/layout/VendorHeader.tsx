import Image from 'next/image';

interface VendorHeaderProps {
  name: string;
  description: string;
  logo: string;
}

export default function VendorHeader({ name, description, logo }: VendorHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
      {/* Logo */}
      <div className="relative h-16 w-16 sm:h-20 sm:w-20 flex-shrink-0 rounded-lg overflow-hidden bg-white dark:bg-gray-800 border-2 border-brand-500 shadow-sm">
        <Image
          src={logo}
          alt={`${name} logo`}
          fill
          sizes="80px"
          className="object-contain p-2"
        />
      </div>

      {/* Vendor Info */}
      <div className="flex-1 space-y-2">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
          {name}
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}