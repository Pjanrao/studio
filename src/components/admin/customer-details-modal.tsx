
'use client';

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { User, Order } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

interface CustomerDetailsModalProps {
  customer: User | null;
  isOpen: boolean;
  onClose: () => void;
}


export function CustomerDetailsModal({ customer, isOpen, onClose }: CustomerDetailsModalProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen && customer) {
      const fetchOrders = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(`/api/orders/user/${customer.id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch orders');
          }
          const data = await response.json();
          setOrders(data);
        } catch (error) {
          console.error(error);
          setOrders([]);
        } finally {
          setIsLoading(false);
        }
      };
      fetchOrders();
    }
  }, [isOpen, customer]);

  if (!customer) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Customer Details</DialogTitle>
          <DialogDescription>
            Information for {customer.name}.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="space-y-2">
                <h3 className="font-semibold">Contact Information</h3>
                <p>{customer.name}</p>
                <p>{customer.email}</p>
            </div>
             <div className="space-y-2">
                <h3 className="font-semibold">Role</h3>
                <div><Badge variant={customer.role === 'Admin' ? 'destructive' : 'secondary'}>{customer.role}</Badge></div>
            </div>
        </div>
        <Separator />
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Order History</CardTitle>
            </CardHeader>
            <CardContent>
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
                        {isLoading ? (
                            Array.from({length: 2}).map((_, i) => (
                                <TableRow key={i}>
                                    <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                                    <TableCell><Skeleton className="h-6 w-16 rounded-full" /></TableCell>
                                    <TableCell className="text-right"><Skeleton className="h-4 w-12" /></TableCell>
                                </TableRow>
                            ))
                        ) : orders.length > 0 ? (
                            orders.map(order => (
                                <TableRow key={order.id}>
                                    <TableCell>#{order.id.slice(-6).toUpperCase()}</TableCell>
                                    <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                                    <TableCell><Badge>{order.status}</Badge></TableCell>
                                    <TableCell className="text-right">₹{order.total.toFixed(2)}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center h-24">This customer has not placed any orders yet.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
