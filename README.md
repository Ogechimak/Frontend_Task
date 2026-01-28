# Padisquare Multi-Vendor Marketplace

A modern, production-ready multi-vendor marketplace built with **Next.js 14**, featuring real-time search, advanced filtering, dark mode, and a beautiful responsive UI.

## ✨ Features

### Core Functionality
- 🏪 **Multi-Vendor Support** - Browse products from multiple vendors
- 🔍 **Real-Time Search** - Instant, case-insensitive product search
- 🔄 **Advanced Sorting** - Sort by price (low/high) or most recent
- 📄 **Smart Pagination** - Navigate large product catalogs easily
- 🌓 **Dark Mode** - System preference + manual toggle support
- 📱 **Fully Responsive** - Beautiful on mobile, tablet, and desktop

### User Experience
- 🎨 **Modern UI** - Clean, intuitive interface with smooth animations
- ⚡ **Lightning Fast** - Optimized with Next.js 14 best practices
- ♿ **Accessible** - WCAG compliant with proper ARIA labels
- 🖼️ **Image Optimization** - Automatic WebP/AVIF conversion
- 🧭 **Breadcrumb Navigation** - Easy navigation with structured data
- 💾 **State Persistence** - Theme and preferences saved locally

### Developer Experience
- 🏗️ **Server Components** - Optimal performance with React Server Components
- 🎯 **Type Safety** - Full TypeScript coverage
- 📦 **Component Library** - 15+ reusable, well-documented components
- 🎨 **Tailwind CSS** - Utility-first styling with custom brand colors
- 📊 **SEO Optimized** - Dynamic metadata, Open Graph, structured data

---

## 🧠 Key Design & Technical Decisions

### 1. **Next.js App Router** (Instead of Pages Router)

**Why This Choice?**
- **Layout-based architecture**: Nested layouts allow us to have a shared header/footer across all pages while keeping content modular
- **Built-in SEO via Metadata API**: Type-safe metadata definition without manual `<Head>` management
- **Better performance and scalability**: Server Components enable rendering on the server, reducing JavaScript sent to the client
- **Streaming support**: Can render pages progressively for better perceived performance
- **Dynamic routing with `[params]`**: Easily create vendor-specific pages (`site/[vendorSlug]/page.tsx`)

**Impact**: This gives us a cleaner file structure, better SEO out-of-the-box, and improved Core Web Vitals.

---

### 2. **TypeScript with Strict Mode**

**Why This Choice?**
- **Type safety**: `Vendor` and `Product` interfaces prevent runtime errors
- **Better IDE support**: IntelliSense helps catch bugs early
- **Self-documenting code**: Types serve as inline documentation
- **Easier refactoring**: Changing types immediately shows what breaks

**Implementation**: All components and utilities are fully typed. tsconfig set to `"strict": true`.

---

### 3. **Tailwind CSS + Custom Brand Colors**

**Why This Choice?**
- **Utility-first approach**: No CSS file management, faster styling
- **Custom brand color palette**: 9-shade green brand colors (`brand-50` through `brand-900`) for consistency
- **Built-in dark mode support**: `dark:` prefixes handle theme switching automatically
- **Small bundle size**: Only used utilities are bundled
- **Developer velocity**: Quick iteration without context-switching to CSS files

**Example**: The green brand color (`#159C47`) is applied consistently across buttons, links, and accents.

---

### 4. **Client-Side Search & Filtering**

**Why This Choice?**
- **Instant feedback**: No network latency - users see results as they type
- **Reduced server load**: All filtering happens in the browser
- **Offline capability**: Works even with a slow connection
- **Better UX**: No loading states needed for basic interactions

**Implementation**: 
- Search uses case-insensitive matching on product names
- Sorting (price/recent) and pagination are managed in component state
- Uses `useMemo` to avoid re-filtering on every render

---

### 5. **JSON-Based Data Storage** (Not a Database)

**Why This Choice?**
- **Simplicity**: No database setup or connection management needed
- **Demo-friendly**: Easy to version control and share
- **Fast to prototype**: Get MVP working immediately
- **Scalable approach**: Easy to swap with an API later

**Data Structure**:
```
lib/data/vendors.json → Static vendor/product data
lib/data/vendors.ts → TypeScript loader with full typing
```

**For Production**: Simply replace the JSON loader with API calls to your backend without changing component logic.

---

### 6. **React Server Components (RSC) + Next-Themes**

**Why This Choice?**
- **SSR-friendly dark mode**: `next-themes` handles client hydration correctly
- **No flash of unstyled content**: Theme loads synchronously
- **CSS variables approach**: Custom properties in `globals.css` make theme switching seamless
- **Lightweight**: Minimal bundle impact

**Implementation**: Wrap app with `ThemeProvider` in layout, use `ThemeToggle` component for user control.

---

### 7. **Component-Based Architecture**

**Why This Choice?**
Components are organized by responsibility:

```
components/
├── layout/        # Page-level layouts (HeroSection, ProductGrid, etc.)
├── ui/            # Reusable UI components (buttons, pagination, search)
├── seo/           # SEO-specific components (structured data)
└── providers/     # Context/Provider components
```

**Benefits**:
- **Clear separation of concerns**: Easy to find and modify features
- **Reusability**: `ProductCard`, `SearchBar` used across multiple pages
- **Testing ready**: Isolated components are easier to test
- **Performance**: Load skeletons while data fetches

---

### 8. **Pagination & Sorting Utilities**

**Why This Choice?**
- **Pagination helper** (`lib/utils/pagination.ts`): Handles offset/limit calculations, preventing bugs
- **Sort function** (`lib/utils/sortProducts.ts`): Centralized logic for price and date sorting
- **DRY principle**: Reuse logic across all product grid views

**Impact**: Consistent behavior across vendor pages, product pages, and homepage.

---

### 9. **SEO Optimization**

**Why This Choice?**
Implemented at multiple levels:

1. **Dynamic Metadata**: Each vendor page has custom title/description
2. **Breadcrumb Structured Data**: JSON-LD helps search engines understand hierarchy
3. **Vendor Structured Data**: Organization schema identifies each vendor
4. **Open Graph Tags**: Better social media sharing with preview images
5. **Sitemap-ready**: Pages follow Next.js conventions for easy sitemap generation

**Impact**: Better search ranking and social sharing appearance.

---

### 10. **Responsive Design Mobile-First**

**Why This Choice?**
- Tailwind's breakpoints (`sm`, `md`, `lg`, `xl`) ensure mobile-first approach
- Components adapt gracefully from phone (320px) to desktop (1920px+)
- Image optimization for different screen sizes
- Touch-friendly buttons and spacing

---

## 🏗️ Project Structure

```
padisquare_vendors/
├── app/
│   ├── page.tsx                 # Homepage with all vendors
│   ├── products/page.tsx        # All products across vendors
│   ├── site/[vendorSlug]/       # Dynamic vendor detail pages
│   └── layout.tsx               # Root layout with metadata
│
├── components/
│   ├── layout/                  # Page-level components
│   │   ├── ProductGrid.tsx      # Renders products with pagination
│   │   ├── SearchableProductGrid.tsx  # With search capabilities
│   │   └── VendorHeader.tsx     # Vendor detail header
│   ├── ui/                      # Reusable UI components
│   │   ├── SearchBar.tsx        # Real-time search input
│   │   ├── Pagination.tsx       # Page navigation
│   │   ├── SortDropdown.tsx     # Price/recent sorting
│   │   └── ThemeToggle.tsx      # Dark/light mode switch
│   ├── seo/                     # Structured data components
│   └── providers/               # Context providers
│
├── lib/
│   ├── data/
│   │   ├── vendors.json         # Vendor & product data
│   │   └── vendors.ts           # TypeScript data loader
│   ├── types/
│   │   └── vendor.ts            # TypeScript interfaces
│   └── utils/
│       ├── pagination.ts        # Pagination helpers
│       └── sortProducts.ts      # Sorting logic
│
└── public/
    ├── assets/logos/            # Brand logos
    ├── products/                # Product images
    └── vendors/                 # Vendor images
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
cd padisquare_vendors
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:3000` to see the marketplace.

### Production Build

```bash
npm run build
npm run start
```

---

## 📊 Performance Optimizations

- **Image Optimization**: Next.js `<Image>` component auto-converts to WebP/AVIF
- **Component Skeletons**: Loading states for smooth UX (`ProductCardSkeleton`, `ProductGridSkeleton`)
- **Memoization**: `useMemo` prevents unnecessary re-renders during search/filter
- **Code splitting**: Route-based code splitting via Next.js
- **Server Components**: By default, components render on server (smaller JS bundle)

---

## 🔧 Future Enhancements

- **Backend Integration**: Replace `vendors.json` with API endpoints
- **Database**: Add PostgreSQL/MongoDB for persistent data
- **Authentication**: User accounts, wishlists, order history
- **Payment Integration**: Stripe/PayPal checkout flow
- **Vendor Admin Panel**: Self-service product management
- **Analytics**: Track user behavior and sales
- **Reviews & Ratings**: Social proof and feedback system

---

## 📄 License

MIT License - Feel free to use this project for personal or commercial purposes.

---

## 👤 Author

**Faith Ogechi** - Built with ❤️ for the Padisquare platform

Node.js 18.0 or higher
npm or yarn package manager

1. Installation

  Clone the repository
  git clone https://github.com/Ogechimak/Frontend_Task.git
  cd padisquare-vendors

2. Install dependencies
   npm install

3. Run the development server

    npm run dev
```

5. **Open your browser**
```
http://localhost:3000
```

## 📁 Project Structure
```
padisquare-vendors/
├── app/                          # Next.js 14 App Router
│   ├── layout.tsx               # Root layout with theme provider
│   ├── page.tsx                 # Home page
│   ├── globals.css              # Global styles
│   ├── loading.tsx              # Global loading state
│   ├── products/
│   │   └── page.tsx             # All products page
│   ├── site/
│   │   └── [vendorSlug]/        # Dynamic vendor pages
│   │       ├── page.tsx
│   │       ├── loading.tsx
│   │       └── not-found.tsx
│   └── api/
│       └── revalidate/
│           └── route.ts         # On-demand revalidation
│
├── components/
│   ├── providers/
│   │   └── ThemeProvider.tsx    # Dark mode provider
│   ├── ui/                      # Reusable UI components
│   │   ├── ProductCard.tsx
│   │   ├── SearchBar.tsx
│   │   ├── SortDropdown.tsx
│   │   ├── Pagination.tsx
│   │   ├── Breadcrumbs.tsx
│   │   ├── ThemeToggle.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── EmptyState.tsx
│   │   └── ErrorState.tsx
│   ├── layout/                  # Layout components
│   │   ├── VendorHeader.tsx
│   │   ├── HeroSection.tsx
│   │   ├── ProductGrid.tsx
│   │   └── SearchableProductGrid.tsx
│   └── seo/                     # SEO components
│       ├── VendorStructuredData.tsx
│       └── BreadcrumbStructuredData.tsx
│
├── lib/
│   ├── data/
│   │   ├── vendors.json         # Mock data
│   │   └── vendors.ts           # Data access layer (cached)
│   ├── types/
│   │   └── vendor.ts            # TypeScript interfaces
│   └── utils/
│       ├── sortProducts.ts      # Sorting utility
│       └── pagination.ts        # Pagination utility
│
├── public/
│   └── assets/
│       ├── logos/               # Brand logos
│       ├── products/            # Product images
│       ├── heroes/              # Hero banners
│       └── vendors/             # Vendor assets
│
├── scripts/
│   └── download-images.sh       # Image download helper
│
├── next.config.js               # Next.js configuration
├── tailwind.config.ts           # Tailwind configuration
├── tsconfig.json                # TypeScript configuration
└── package.json