export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  createdAt: string;
}

export interface Vendor {
  id: string;
  slug: string;
  name: string;
  description: string;
  logo: string;
  heroImage: string;
  createdAt: string;
  products: Product[];
}

export interface VendorsData {
  vendors: Vendor[];
}