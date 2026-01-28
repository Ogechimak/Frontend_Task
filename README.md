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




