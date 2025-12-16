
'use client';

import * as React from 'react';
import { MoreHorizontal } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered';

const mockOrders = [
  { id: 'ORD-001', customer: 'John Doe', date: '2023-11-20', status: 'Delivered' as OrderStatus, total: '₹310.00' },
  { id: 'ORD-002', customer: 'Jane Smith', date: '2023-11-21', status: 'Shipped' as OrderStatus, total: '₹800.50' },
  { id: 'ORD-003', customer: 'Bob Johnson', date: '2023-11-22', status: 'Processing' as OrderStatus, total: '₹120.00' },
  { id: 'ORD-004', customer: 'Alice Williams', date: '2023-11-23', status: 'Pending' as OrderStatus, total: '₹450.75' },
];

const getStatusVariant = (status: OrderStatus) => {
    switch (status) {
      case 'Delivered': return 'default';
      case 'Shipped': return 'secondary';
      case 'Processing': return 'outline';
      case 'Pending': return 'destructive';
      default: return 'outline';
    }
  };


export default function AdminOrdersPage() {
  return (
    <>
      <div className="flex items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Order History</CardTitle>
          <CardDescription>View and manage all customer orders.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(order.status)}>{order.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">{order.total}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Update Status</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
