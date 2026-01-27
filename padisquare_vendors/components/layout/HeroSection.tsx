interface HeroSectionProps {
  heroImage: string;
  vendorName: string;
}

export default function HeroSection({ heroImage, vendorName }: HeroSectionProps) {
  return (
    <div className="relative h-48 sm:h-64 lg:h-80 overflow-hidden rounded-lg sm:rounded-xl shadow-lg">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-500/20 via-brand-600/30 to-brand-700/40" />
      
      {/* Placeholder Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-brand-50 to-brand-100 dark:from-brand-900 dark:to-brand-800">
        <div className="text-center space-y-2 px-4">
          <div className="inline-block px-3 py-1 bg-brand-500/10 dark:bg-brand-500/20 rounded-full">
            <p className="text-xs sm:text-sm text-brand-700 dark:text-brand-300 font-medium">
              Hero Image
            </p>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 max-w-md">
            {heroImage}
          </p>
        </div>
      </div>

      {/* Decorative Border */}
      <div className="absolute inset-0 rounded-lg sm:rounded-xl ring-1 ring-inset ring-brand-500/20" />
    </div>
  );
}