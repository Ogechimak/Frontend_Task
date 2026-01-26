import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "My App",
  description: "A production-ready Next.js application",
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