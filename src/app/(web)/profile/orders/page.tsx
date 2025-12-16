"use client";

import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { Order } from '@/lib/types';
import { ShoppingBag } from 'lucide-react';

// Mock order data
const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    userId: '1',
    items: [],
    total: 310,
    status: 'Delivered',
    shippingAddress: {},
    createdAt: '2023-10-26T10:00:00Z',
  },
  {
    id: 'ORD-002',
    userId: '1',
    items: [],
    total: 800,
    status: 'Shipped',
    shippingAddress: {},
    createdAt: '2023-10-28T14:30:00Z',
  },
  {
    id: 'ORD-003',
    userId: '1',
    items: [],
    total: 120,
    status: 'Processing',
    shippingAddress: {},
    createdAt: '2023-10-29T11:00:00Z',
  },
];

export default function OrdersPage() {
  const { user } = useAuth();
  const router = useRouter();

  if (!user) {
    router.replace('/login?redirect=/profile/orders');
    return null;
  }

  const getStatusVariant = (status: Order['status']) => {
    switch (status) {
      case 'Delivered': return 'default';
      case 'Shipped': return 'secondary';
      case 'Processing': return 'outline';
      default: return 'destructive';
    }
  };

  return (
    <div className="container py-12">
      <h1 className="font-headline text-4xl font-bold tracking-tight mb-8">My Orders</h1>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Order History</CardTitle>
          <CardDescription>View the status and details of your past orders.</CardDescription>
        </CardHeader>
        <CardContent>
          {mockOrders.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(order.status)}>{order.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
             <div className="text-center py-16">
                <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground" />
                <h2 className="mt-6 text-2xl font-semibold">No Orders Yet</h2>
                <p className="mt-2 text-muted-foreground">You haven't placed any orders with us.</p>
              </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
