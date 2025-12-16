"use client";

import { useState } from 'react';
import type { Product } from '@/lib/types';
import { ProductImageGallery } from '@/components/product-image-gallery';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { ProductRecommendations } from '@/components/product-recommendations';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';

interface ProductDetailsProps {
  product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const { addToCart } = useCart();

  const [selectedVariantId, setSelectedVariantId] = useState<string | undefined>(
    product?.variants[0]?.id
  );

  const selectedVariant = product.variants.find(
    (v) => v.id === selectedVariantId
  );

  const handleAddToCart = () => {
    if (product && selectedVariant) {
      addToCart({
        productId: product.id,
        variantId: selectedVariant.id,
        name: product.name,
        variantName: selectedVariant.name,
        price: selectedVariant.price,
        image: product.images[0],
      });
    }
  };

  return (
    <div className="container py-12">
      <div className="grid md:grid-cols-2 gap-12">
        <ProductImageGallery imageIds={product.images} productName={product.name} />

        <div>
          <h1 className="font-headline text-4xl font-bold tracking-tight">
            {product.name}
          </h1>
          <p className="mt-4 text-2xl font-semibold">
            ₹{selectedVariant?.price.toFixed(2)}
          </p>
          <Separator className="my-6" />

          <div className="mt-6">
            <h3 className="font-semibold">Description</h3>
            <p className="mt-2 text-muted-foreground">{product.description}</p>
          </div>
          
          <div className="mt-6 space-y-4">
            <div>
              <Label htmlFor="variant">Variant</Label>
              <Select
                value={selectedVariantId}
                onValueChange={setSelectedVariantId}
              >
                <SelectTrigger id="variant" className="w-full md:w-[180px]">
                  <SelectValue placeholder="Select a variant" />
                </SelectTrigger>
                <SelectContent>
                  {product.variants.map((variant) => (
                    <SelectItem key={variant.id} value={variant.id}>
                      {variant.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <p className="text-sm text-muted-foreground">HS Code: {product.hsCode}</p>

            <Button size="lg" onClick={handleAddToCart} disabled={!selectedVariant}>
              <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
            </Button>
          </div>
        </div>
      </div>
      <ProductRecommendations product={product} />
    </div>
  );
}
