"use client";

import { useEffect, useState } from 'react';
import { getProductRecommendations } from '@/ai/flows/product-recommendations';
import { products as allProducts } from '@/lib/data';
import type { Product } from '@/lib/types';
import { ProductCard } from './product-card';
import { Skeleton } from './ui/skeleton';

interface ProductRecommendationsProps {
  product: Product;
}

export function ProductRecommendations({ product }: ProductRecommendationsProps) {
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecommendations() {
      try {
        const result = await getProductRecommendations({
          currentProductName: product.name,
          currentProductDescription: product.description,
          productCategory: product.category,
        });
        
        const recommended = allProducts.filter(p => 
          result.recommendedProducts.includes(p.name) && p.id !== product.id
        );
        
        setRecommendedProducts(recommended.slice(0, 3));
      } catch (error) {
        console.error("Failed to fetch AI recommendations:", error);
        // Fallback to simple category-based recommendations
        const fallback = allProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);
        setRecommendedProducts(fallback);
      } finally {
        setLoading(false);
      }
    }
    fetchRecommendations();
  }, [product]);

  return (
    <div className="mt-16">
      <h2 className="font-headline text-3xl font-bold tracking-tight">
        You Might Also Like
      </h2>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))
          : recommendedProducts.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}
