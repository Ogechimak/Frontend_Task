import { getAllVendors, getAllProducts } from '@/lib/data/vendors';

export default function TestDataPage() {
  const vendors = getAllVendors();
  const products = getAllProducts();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Vendors ({vendors.length})</h2>
        <ul className="space-y-2">
          {vendors.map((vendor) => (
            <li key={vendor.id} className="p-4 border rounded">
              <strong>{vendor.name}</strong> - {vendor.products.length} products
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">All Products ({products.length})</h2>
        <ul className="space-y-2">
          {products.map((product) => (
            <li key={product.id} className="p-4 border rounded">
              {product.name} - ${product.price}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}