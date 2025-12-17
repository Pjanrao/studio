
'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  MoreHorizontal,
  PlusCircle,
  Search,
  Pencil,
  Trash2,
  Eye,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
    PaginationLink,
} from '@/components/ui/pagination';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from '@/components/ui/input';

const initialProducts = [
  { id: '1', name: 'Yellow Maize', status: 'active', price: 250, category: 'Pulses' },
  { id: '2', name: 'Red Onion', status: 'active', price: 150, category: 'Vegetables' },
  { id: '3', name: 'Chickpeas (Chana)', status: 'inactive', price: 400, category: 'Pulses' },
  { id: '4', name: 'Fresh Cow Milk', status: 'active', price: 60, category: 'Dairy' },
  { id: '5', name: 'Desi Eggs', status: 'inactive', price: 120, category: 'Poultry' },
  { id: '6', name: 'Alphonso Mangoes', status: 'active', price: 800, category: 'Fruits' },
];

export default function AdminProductsPage() {
    const [products, setProducts] = React.useState(initialProducts);

    const handleDelete = (productId: string) => {
        setProducts(products.filter(product => product.id !== productId));
    };

  return (
    <>
      <div className="flex items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Products</h1>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href="/admin/products/new">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Product
            </Link>
          </Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Product List</CardTitle>
          <CardDescription>
            Manage your products and view their sales performance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="inactive">Inactive</TabsTrigger>
              </TabsList>
              <div className="relative ml-auto flex-1 md:grow-0">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
                />
              </div>
            </div>
            <TabsContent value="all">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                       <TableCell>{product.category}</TableCell>
                      <TableCell>
                        <Badge variant={product.status === 'active' ? 'default' : 'outline'}>
                          {product.status === 'active' ? 'Active' : 'Inactive'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">₹{product.price.toFixed(2)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                           <Button variant="ghost" size="icon" asChild>
                            <Link href={`/admin/products/edit/${product.id}?readOnly=true`}>
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">View</span>
                            </Link>
                          </Button>
                          <Button variant="ghost" size="icon" asChild>
                            <Link href={`/admin/products/edit/${product.id}`}>
                              <Pencil className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Link>
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Delete</span>
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will permanently delete the
                                  product "{product.name}".
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(product.id)}>
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
         <CardContent>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#" isActive>1</PaginationLink>
                    </PaginationItem>
                     <PaginationItem>
                        <PaginationLink href="#">2</PaginationLink>
                    </PaginationItem>
                     <PaginationItem>
                        <PaginationNext href="#" />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </CardContent>
      </Card>
    </>
  );
}
