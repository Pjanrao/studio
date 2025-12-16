
'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { User } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface CustomerDetailsModalProps {
  customer: User | null;
  isOpen: boolean;
  onClose: () => void;
}

// Mock data, in a real app this would be fetched
const mockCustomerOrders = [
    {id: 'ORD-001', date: '2023-11-20', total: 310.00, status: 'Delivered'},
    {id: 'ORD-002', date: '2023-11-21', total: 800.50, status: 'Shipped'},
];

export function CustomerDetailsModal({ customer, isOpen, onClose }: CustomerDetailsModalProps) {
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
                        {mockCustomerOrders.map(order => (
                            <TableRow key={order.id}>
                                <TableCell>{order.id}</TableCell>
                                <TableCell>{order.date}</TableCell>
                                <TableCell><Badge>{order.status}</Badge></TableCell>
                                <TableCell className="text-right">₹{order.total.toFixed(2)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
