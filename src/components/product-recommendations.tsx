"use client";

import { useMemo } from 'react';
import { products as allProducts } from '@/lib/data';
import type { Product } from '@/lib/types';
import { ProductCard } from './product-card';

interface ProductRecommendationsProps {
  product: Product;
}

export function ProductRecommendations({ product }: ProductRecommendationsProps) {
  const recommendedProducts = useMemo(() => {
    return allProducts
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 3);
  }, [product]);

  if (recommendedProducts.length === 0) {
    return null;
  }

  return (
    <div className="mt-16">
      <h2 className="font-headline text-3xl font-bold tracking-tight">
        You Might Also Like
      </h2>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {recommendedProducts.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}
