import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import ThemeToggle from "@/components/ui/ThemeToggle";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  metadataBase: new URL('https://padisquare.com'), // Replace with your actual domain
  title: {
    default: 'Padisquare - Multi-Vendor Marketplace',
    template: '%s | Padisquare',
  },
  description: 'Discover quality products from trusted vendors. Browse, search, and shop with confidence.',
  applicationName: 'Padisquare',
  authors: [{ name: 'Faith Ogechi' }],
  generator: 'Next.js',
  keywords: ['marketplace', 'vendors', 'e-commerce', 'online shopping', 'padisquare'],
  
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Padisquare',
  },

  twitter: {
    card: 'summary_large_image',
    site: '@padisquare',
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: '/assets/logos/logo-light.svg',
    apple: '/assets/logos/logo-light.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen antialiased bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
              <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                  {/* Logo */}
                  <Link 
                    href="/" 
                    className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                  >
                    <div className="relative h-10 w-auto">
                      {/* Light Mode Logo (shows on white/light background) */}
                      <Image
                        src="/assets/logos/logo-light.svg"
                        alt="Padisquare Logo"
                        width={140}
                        height={40}
                        className="h-10 w-auto dark:hidden"
                        priority
                      />
                      
                      {/* Dark Mode Logo (shows on black/dark background) */}
                      <Image
                        src="/assets/logos/logo-dark.svg"
                        alt="Padisquare Logo"
                        width={140}
                        height={40}
                        className="h-10 w-auto hidden dark:block"
                        priority
                      />
                    </div>
                  </Link>
                  
                  {/* Theme Toggle */}
                  <ThemeToggle />
                </div>
              </div>
            </header>
            
            <main className="flex-1 bg-gray-50 dark:bg-gray-900">
              <div className="container mx-auto px-4 py-8">
                {children}
              </div>
            </main>
            
            <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
              <div className="container mx-auto px-4 py-4 text-center text-sm text-gray-600 dark:text-gray-400">
                © 2026 Padisquare Multi-Vendor Marketplace.
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}