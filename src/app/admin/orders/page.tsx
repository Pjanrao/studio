
'use client';

import * as React from 'react';
import { ListFilter, MoreHorizontal, Search, File } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuCheckboxItem } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { OrderDetailsModal } from '@/components/admin/order-details-modal';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { DateRange } from 'react-day-picker';
import { addDays, format } from 'date-fns';

type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

const mockOrders = [
  { 
    id: 'ORD-001', 
    customer: { name: 'John Doe', email: 'john.d@example.com'}, 
    date: '2023-11-20', 
    status: 'Delivered' as OrderStatus, 
    total: 310.00,
    paymentMethod: 'Razorpay',
    paymentStatus: 'Paid',
    items: [
        { id: '1', name: 'Yellow Maize (Feed Grade)', quantity: 1, price: 250 },
        { id: '2', name: 'Fresh Cow Milk (Skimmed)', quantity: 1, price: 60 },
    ],
    shippingAddress: {
        address: '123 Farm Lane',
        city: 'Greenville',
        country: 'India',
        zip: '12345'
    }
  },
  { 
    id: 'ORD-002', 
    customer: { name: 'Jane Smith', email: 'jane.s@example.com'}, 
    date: '2023-11-21', 
    status: 'Shipped' as OrderStatus, 
    total: 800.50,
    paymentMethod: 'Stripe',
    paymentStatus: 'Paid',
    items: [
        { id: '1', name: 'Alphonso Mangoes (Per Dozen)', quantity: 1, price: 800.50 },
    ],
    shippingAddress: {
        address: '456 Market St',
        city: 'Metropolis',
        country: 'India',
        zip: '67890'
    }
  },
  { 
    id: 'ORD-003', 
    customer: { name: 'Bob Johnson', email: 'bob.j@example.com'}, 
    date: '2023-11-22', 
    status: 'Processing' as OrderStatus, 
    total: 120.00,
    paymentMethod: 'Razorpay',
    paymentStatus: 'Pending',
    items: [
        { id: '1', name: 'Desi Eggs (Dozen)', quantity: 1, price: 120.00 },
    ],
     shippingAddress: {
        address: '789 Ocean Blvd',
        city: 'Seaside',
        country: 'India',
        zip: '101112'
    }
  },
  { 
    id: 'ORD-004', 
    customer: { name: 'Alice Williams', email: 'alice.w@example.com'}, 
    date: '2023-11-23', 
    status: 'Pending' as OrderStatus, 
    total: 450.75,
    paymentMethod: 'Stripe',
    paymentStatus: 'Paid',
    items: [
        { id: '1', name: 'Red Onion (55mm+)', quantity: 3, price: 150.25 },
    ],
     shippingAddress: {
        address: '321 Hilltop Rd',
        city: 'Mountain View',
        country: 'India',
        zip: '131415'
    }
  },
];

type Order = (typeof mockOrders)[0];

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
  const [orders, setOrders] = React.useState(mockOrders);
  const [selectedOrder, setSelectedOrder] = React.useState<Order | null>(null);
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2023, 10, 20),
    to: addDays(new Date(2023, 10, 20), 4),
  })

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    setOrders(prevOrders => 
        prevOrders.map(order => 
            order.id === orderId ? { ...order, status: newStatus } : order
        )
    );
  };

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
          <div className="flex items-center gap-2 mb-4">
              <div className="relative flex-1 md:grow-0">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search orders..." className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]" />
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant={"outline"}
                    className="w-[300px] justify-start text-left font-normal"
                  >
                    {date?.from ? (
                      date.to ? (
                        <>
                          {format(date.from, "LLL dd, y")} -{" "}
                          {format(date.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(date.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-10 gap-1">
                    <ListFilter className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Filter
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem checked>
                    Status
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Payment Status</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>
                    Payment Method
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button size="sm" variant="outline" className="h-10 gap-1">
                  <File className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Export
                  </span>
                </Button>
          </div>
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
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer.name}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>
                    {order.status === 'Delivered' || order.status === 'Cancelled' ? (
                        <Badge variant={getStatusVariant(order.status)}>{order.status}</Badge>
                    ) : (
                        <Select value={order.status} onValueChange={(value: OrderStatus) => handleStatusChange(order.id, value)}>
                            <SelectTrigger className="w-32 h-8 text-xs">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Pending">Pending</SelectItem>
                                <SelectItem value="Processing">Processing</SelectItem>
                                <SelectItem value="Shipped">Shipped</SelectItem>
                                <SelectItem value="Delivered">Delivered</SelectItem>
                                <SelectItem value="Cancelled">Cancelled</SelectItem>
                            </SelectContent>
                        </Select>
                    )}
                  </TableCell>
                  <TableCell className="text-right">₹{order.total.toFixed(2)}</TableCell>
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
                        <DropdownMenuItem onClick={() => setSelectedOrder(order)}>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Customer History</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      {selectedOrder && (
        <OrderDetailsModal 
            order={selectedOrder} 
            isOpen={!!selectedOrder} 
            onClose={() => setSelectedOrder(null)} 
        />
      )}
    </>
  );
}
