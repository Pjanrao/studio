
'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

type Order = { 
    id: string;
    customer: { name: string; email: string; };
    date: string;
    status: OrderStatus;
    total: number;
    paymentMethod: string;
    paymentStatus: string;
    items: { id: string; name: string; quantity: number; price: number; }[];
    shippingAddress: { address: string; city: string; country: string; zip: string; };
};

interface OrderDetailsModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

export function OrderDetailsModal({ order, isOpen, onClose }: OrderDetailsModalProps) {
  if (!order) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Order Details: {order.id}</DialogTitle>
          <DialogDescription>
            Date: {order.date}
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="space-y-2">
                <h3 className="font-semibold">Customer Details</h3>
                <p>{order.customer.name}</p>
                <p>{order.customer.email}</p>
            </div>
            <div className="space-y-2">
                <h3 className="font-semibold">Shipping Address</h3>
                <p>{order.shippingAddress.address}</p>
                <p>{order.shippingAddress.city}, {order.shippingAddress.zip}</p>
                <p>{order.shippingAddress.country}</p>
            </div>
             <div className="space-y-2">
                <h3 className="font-semibold">Payment Details</h3>
                <p>Method: {order.paymentMethod}</p>
                <div className="flex items-center gap-2">Status: <Badge variant={order.paymentStatus === 'Paid' ? 'default' : 'secondary'}>{order.paymentStatus}</Badge></div>
            </div>
        </div>
        <Separator />
        <div>
          <h3 className="font-semibold mb-2">Order Items</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.items.map(item => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell className="text-right">₹{item.price.toFixed(2)}</TableCell>
                  <TableCell className="text-right">₹{(item.price * item.quantity).toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Separator />
        <div className="flex justify-end items-center font-bold text-lg">
            <span>Total:</span>
            <span className="ml-4">₹{order.total.toFixed(2)}</span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
