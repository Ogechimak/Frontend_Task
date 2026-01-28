Next.js 14 Multi-Vendor Marketplace
A modern, performant multi-vendor e-commerce platform built with Next.js 14, featuring advanced search, dark mode, SEO optimization, and a scalable architecture.
📋 Table of Contents

Tech Stack
Architecture Decisions
Project Structure
Getting Started
Key Features
Development Guide
Future Roadmap

🛠 Tech Stack

Next.js 14 - App Router, Server Components, ISR
TypeScript - Type safety and better DX
Tailwind CSS - Utility-first styling with custom brand colors (#159C47)
next-themes - Zero-flash dark mode with system preference support
Next.js Image - Automatic WebP/AVIF optimization, lazy loading

🏗 Architecture Decisions
1. App Router with Server Components
Why: Better performance, smaller JS bundles, streaming, future-proof
Component Strategy:

Server (default): ProductGrid, VendorHeader, HeroSection - data fetching, static content
Client ('use client'): SearchBar, SortDropdown, Pagination - interactivity, state, events

Rule: Server by default, Client only when needed (useState, onClick, browser APIs)
2. ISR (Incremental Static Regeneration)
Why: Fast like static sites, fresh like dynamic sites, lower costs
typescriptexport const revalidate = 3600; // Regenerate every hour
Benefits: Static at build → CDN cached → Background updates → On-demand revalidation via API
3. JSON File → Database Migration Path
Current: lib/data/vendors.json (3 vendors, 10 products)

Zero setup, easy development, version controlled

When to migrate: >100 products, user-generated content, real-time inventory
Smart design: Data access layer abstracted - same function signatures work with both JSON and database
4. Client-Side Search & Sort
Why: Instant results, no server round-trips, works with ISR caching
typescriptconst filtered = products.filter(p => 
  p.name.toLowerCase().includes(query.toLowerCase())
);
When to switch to server: >1000 products, complex filters
5. URL-Based Pagination
Why: Shareable links, SEO-friendly, browser back button works
/products?page=2&search=laptop&sort=price-asc
6. SEO Strategy

Dynamic Metadata: Per-page title, description, Open Graph
Structured Data: JSON-LD for vendors (Store schema), breadcrumbs, products
Semantic HTML: <nav>, <main>, <article>, p



padisquare_vendor
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout with theme + header/footer
│   ├── page.tsx                  # Home page - vendor grid
│   ├── globals.css               # Global styles + Tailwind
│   │
│   ├── products/
│   │   └── page.tsx              # All products with search/sort/pagination
│   │
│   ├── site/
│   │   └── [vendorSlug]/
│   │       ├── page.tsx          # Dynamic vendor pages (ISR)
│   │       ├── loading.tsx       # Vendor skeleton
│   │       └── not-found.tsx     # Custom 404
│   │
│   ├── test-data/
│   │   └── page.tsx              # Dev utility - verify data structure
│   │
│   └── api/
│       └── revalidate/
│           └── route.ts          # On-demand ISR revalidation
│
├── components/
│   ├── providers/
│   │   └── ThemeProvider.tsx     # next-themes wrapper
│   │
│   ├── ui/                       # Reusable UI components
│   │   ├── ProductCard.tsx       # Product display with error handling
│   │   ├── ProductCardSkeleton.tsx
│   │   ├── SearchBar.tsx         # Search input (client)
│   │   ├── SortDropdown.tsx      # Sort controls (client)
│   │   ├── Pagination.tsx        # Page navigation (client)
│   │   ├── Breadcrumbs.tsx       # Navigation breadcrumbs
│   │   ├── ThemeToggle.tsx       # Dark mode toggle
│   │   ├── LoadingSpinner.tsx    # Loading indicator
│   │   ├── EmptyState.tsx        # No results UI
│   │   └── ErrorState.tsx        # Error display
│   │
│   ├── layout/                   # Layout-specific components
│   │   ├── VendorHeader.tsx      # Vendor page header (server)
│   │   ├── HeroSection.tsx       # Hero image section (server)
│   │   ├── ProductGrid.tsx       # Product grid (server)
│   │   └── SearchableProductGrid.tsx  # Grid with filters (client)
│   │
│   └── seo/                      # SEO components
│       ├── VendorStructuredData.tsx   # JSON-LD for vendors
│       └── BreadcrumbStructuredData.tsx
│
├── lib/
│   ├── data/
│   │   ├── vendors.json          # Mock data (3 vendors, 10 products)
│   │   └── vendors.ts            # Data access layer with caching
│   │
│   ├── types/
│   │   └── vendor.ts             # TypeScript interfaces
│   │
│   └── utils/
│       ├── sortProducts.ts       # Product sorting logic
│       └── pagination.ts         # Pagination utilities
│
├── public/
│   ├── assets/                   # Brand assets (to be added)
│   │   ├── logos/
│   │   ├── products/
│   │   ├── heroes/
│   │   └── vendors/
│   ├── vendors/                  # Temporary placeholders
│   └── products/                 # Temporary placeholders
│
├── scripts/
│   └── download-images.sh        # Utility for image migration
│
├── .env.local                    # Environment variables
├── next.config.js                # Next.js configuration
├── tailwind.config.ts            # Tailwind + brand colors
└── tsconfig.json                 # TypeScript configuration


# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env.local
# Add: REVALIDATION_SECRET=your-secret-key

# 3. Run development server
npm run dev

# 4. Open http://localhost:3000
npm run build
npm start

Routes:

1. / - Home with vendor grid
2. /products - All products (search, sort, pagination)
3. /site/[vendorSlug] - Individual vendor pages
4. /test-data - Data verification


