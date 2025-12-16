
'use client';

import Link from 'next/link';
import { notFound } from 'next/navigation';
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
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

const mockCategories = [
  { id: '1', name: 'Pulses', status: 'active', featured: true },
  { id: '2', name: 'Dairy', status: 'active', featured: true },
  { id: '3', name: 'Fruits', status: 'active', featured: false },
  { id: '4', name: 'Vegetables', status: 'inactive', featured: true },
  { id: '5', name: 'Poultry', status: 'active', featured: false },
];

export default function EditCategoryPage({ params }: { params: { id: string } }) {
  const category = mockCategories.find(c => c.id === params.id);

  if (!category) {
    notFound();
  }

  return (
    <>
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" className="h-7 w-7" asChild>
          <Link href="/admin/categories">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
          Edit Category: {category.name}
        </h1>
        <div className="hidden items-center gap-2 md:ml-auto md:flex">
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/categories">Cancel</Link>
          </Button>
          <Button size="sm">Save Changes</Button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
        <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Category Details</CardTitle>
              <CardDescription>
                Update the details of the category.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Category Name</Label>
                <Input id="name" defaultValue={category.name} />
              </div>
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
                <CardTitle>Category Image</CardTitle>
                <CardDescription>Upload an image for the category.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="border-dashed border-2 border-muted-foreground/50 rounded-lg p-10 text-center">
                    <p className="text-muted-foreground">Drag & drop an image here, or click to browse</p>
                </div>
            </CardContent>
          </Card>
        </div>
        <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Category Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="status">Active</Label>
                <Switch id="status" defaultChecked={category.status === 'active'} />
              </div>
              <p className="text-sm text-muted-foreground">
                Inactive categories will not be visible on the website.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Featured Category</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="flex items-center justify-between">
                <Label htmlFor="featured">Featured</Label>
                <Switch id="featured" defaultChecked={category.featured} />
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Featured categories will appear on the homepage.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 md:hidden mt-6">
        <Button variant="outline" size="sm" asChild>
          <Link href="/admin/categories">Cancel</Link>
        </Button>
        <Button size="sm">Save Changes</Button>
      </div>
    </>
  );
}
