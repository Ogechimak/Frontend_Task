import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://myapp.com'), // Replace with your actual domain
  title: {
    default: 'My App - Multi-Vendor Marketplace',
    template: '%s | My App', // Page title will be inserted here
  },
  description: 'Discover quality products from trusted vendors. Browse, search, and shop with confidence.',
  applicationName: 'My App',
  authors: [{ name: 'My App Team' }],
  generator: 'Next.js',
  keywords: ['marketplace', 'vendors', 'e-commerce', 'online shopping'],
  
  // Verification tags (add your actual verification codes)
  // verification: {
  //   google: 'google-site-verification-code',
  //   yandex: 'yandex-verification-code',
  // },

  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'My App',
  },

  twitter: {
    card: 'summary_large_image',
    site: '@myapp', // Replace with your Twitter handle
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <div className="flex min-h-screen flex-col">
          <header className="border-b">
            <div className="container mx-auto px-4 py-4">
              <h1 className="text-xl font-bold">My App</h1>
            </div>
          </header>
          
          <main className="flex-1">
            <div className="container mx-auto px-4 py-8">
              {children}
            </div>
          </main>
          
          <footer className="border-t">
            <div className="container mx-auto px-4 py-4 text-center text-sm text-gray-600">
              © 2024 My App. All rights reserved.
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}