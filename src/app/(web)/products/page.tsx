import { getCategories } from '@/lib/models/Category';
import { getProducts } from '@/lib/models/Product';
import { ProductsGrid } from '@/components/products-grid';

async function getData() {
    try {
        const [categories, products] = await Promise.all([
            getCategories(),
            getProducts()
        ]);
        return { categories, products };
    } catch (error) {
        console.error("Failed to fetch data, falling back to mock data.", error);
        // Fallback to empty arrays in case of DB error
        return { categories: [], products: [] };
    }
}

export default async function ProductsPage() {
  const { categories, products } = await getData();

  return <ProductsGrid categories={categories} products={products} />;
}
