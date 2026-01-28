/** @type {import('next').NextConfig} */
const nextConfig = {
  // Increase static generation timeout to prevent timeouts during build
  staticPageGenerationTimeout: 120,
};

export default nextConfig;
