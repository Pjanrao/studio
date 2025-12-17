
'use client';

import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { categories, products } from '@/lib/data';
import { notFound, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { Product } from '@/lib/types';


export default function EditProductPage({ params }: { params: { id: string }}) {
  const { id } = params;
  const searchParams = useSearchParams();
  const isReadOnly = searchParams.get('readOnly') === 'true';

  const [product, setProduct] = useState<Product | undefined>(undefined);

  useEffect(() => {
    // In a real app, you would fetch this by ID from your API
    const foundProduct = products.find(p => p.id === id);
    setProduct(foundProduct);
  }, [id]);


  if (!product) {
    // You can show a loading state here
    if (typeof window !== 'undefined') {
        // notFound() must be called in a client component that is not in loading state
        // so we check if window is defined before calling it.
        // A better approach would be a dedicated loading component
        return notFound();
    }
    return null;
  }
  
  const pageTitle = isReadOnly ? `View Product: ${product.name}` : `Edit Product: ${product.name}`;
  
  return (
    <>
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" className="h-7 w-7" asChild>
            <Link href="/admin/products">
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
            </Link>
        </Button>
        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
          {pageTitle}
        </h1>
        {!isReadOnly && (
          <div className="hidden items-center gap-2 md:ml-auto md:flex">
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin/products">Cancel</Link>
            </Button>
            <Button size="sm">Save Changes</Button>
          </div>
        )}
      </div>
      <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
        <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Product Details</CardTitle>
              <CardDescription>
                 {isReadOnly ? 'Details for this product.' : 'Update the details of the product.'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input id="name" defaultValue={product.name} readOnly={isReadOnly} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  defaultValue={product.description}
                   readOnly={isReadOnly}
                />
              </div>
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
              <CardTitle>Category & Variants</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select defaultValue={product.category} disabled={isReadOnly}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                        <SelectItem key={cat.id} value={cat.slug}>{cat.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
               <div className="space-y-2">
                <Label htmlFor="hs-code">HS Code</Label>
                <Input id="hs-code" defaultValue={product.hsCode} readOnly={isReadOnly} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Variants</Label>
                <Card className="p-4 space-y-4">
                    {product.variants.map((variant, index) => (
                         <div key={index} className="flex gap-4">
                            <Input defaultValue={variant.name} readOnly={isReadOnly} />
                            <Input type="number" defaultValue={variant.price} readOnly={isReadOnly} />
                            {!isReadOnly && <Button variant="outline">Remove</Button>}
                        </div>
                    ))}
                    {!isReadOnly && <Button variant="outline" className="w-full">Add Variant</Button>}
                </Card>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
                <CardTitle>Product Images</CardTitle>
                <CardDescription>Manage images for the product gallery.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="border-dashed border-2 border-muted-foreground/50 rounded-lg p-10 text-center">
                    <p className="text-muted-foreground">Drag & drop images here, or click to browse</p>
                </div>
            </CardContent>
          </Card>
        </div>
        <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Product Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="status">Active</Label>
                <Switch id="status" defaultChecked={product.status === 'active'} disabled={isReadOnly} />
              </div>
              <p className="text-sm text-muted-foreground">
                Inactive products will not be visible on the website.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Featured Product</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="flex items-center justify-between">
                <Label htmlFor="featured">Featured</Label>
                <Switch id="featured" defaultChecked={product.featured} disabled={isReadOnly} />
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Featured products will appear on the homepage slider.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      {!isReadOnly && (
        <div className="flex items-center justify-center gap-2 md:hidden mt-6">
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin/products">Cancel</Link>
            </Button>
            <Button size="sm">Save Changes</Button>
        </div>
      )}
    </>
  );
}
