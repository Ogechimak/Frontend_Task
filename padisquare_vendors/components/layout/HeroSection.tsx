import Image from 'next/image';

interface HeroSectionProps {
  heroImage: string;
  vendorName: string;
}

export default function HeroSection({ heroImage, vendorName }: HeroSectionProps) {
  return (
    <div className="relative h-48 sm:h-64 lg:h-80 overflow-hidden rounded-lg sm:rounded-xl shadow-lg">
      {/* Hero Image */}
      <Image
        src={heroImage}
        alt={`${vendorName} hero banner`}
        fill
        sizes="100vw"
        className="object-cover"
        priority
        quality={90}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-500/20 via-brand-600/30 to-brand-700/40" />

      {/* Decorative Border */}
      <div className="absolute inset-0 rounded-lg sm:rounded-xl ring-1 ring-inset ring-brand-500/20" />
    </div>
  );
}