import { notFound } from 'next/navigation';
import { getProducts } from '@/lib/models/Product';
import { ProductDetails } from '@/components/product-details';
import type { Product } from '@/lib/types';

async function getProductBySlug(slug: string): Promise<Product | null> {
    const products = await getProducts();
    const product = products.find(p => p.slug === slug);
    return product || null;
}

type ProductPageProps = {
  params: {
    slug: string;
  };
};

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  return <ProductDetails product={product} />;
}
