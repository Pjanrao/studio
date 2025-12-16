
'use client';

import * as React from 'react';
import { ListFilter, MoreHorizontal, Search, File, Calendar as CalendarIcon } from 'lucide-react';
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
import { addDays, format, isAfter, isBefore, parseISO } from 'date-fns';

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
      case 'Cancelled': return 'destructive';
      default: return 'outline';
    }
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = React.useState(mockOrders);
  const [selectedOrder, setSelectedOrder] = React.useState<Order | null>(null);
  const [search, setSearch] = React.useState('');
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  const [statusFilter, setStatusFilter] = React.useState<string[]>([]);
  const [paymentStatusFilter, setPaymentStatusFilter] = React.useState<string[]>([]);
  const [paymentMethodFilter, setPaymentMethodFilter] = React.useState<string[]>([]);


  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    setOrders(prevOrders => 
        prevOrders.map(order => 
            order.id === orderId ? { ...order, status: newStatus } : order
        )
    );
  };

  const filteredOrders = React.useMemo(() => {
    return orders.filter(order => {
        const orderDate = parseISO(order.date);
        const dateMatch = (!date?.from || isAfter(orderDate, date.from)) && (!date?.to || isBefore(orderDate, addDays(date.to, 0)));
        const searchMatch = order.id.toLowerCase().includes(search.toLowerCase()) || order.customer.name.toLowerCase().includes(search.toLowerCase());
        const statusMatch = statusFilter.length === 0 || statusFilter.includes(order.status);
        const paymentStatusMatch = paymentStatusFilter.length === 0 || paymentStatusFilter.includes(order.paymentStatus);
        const paymentMethodMatch = paymentMethodFilter.length === 0 || paymentMethodFilter.includes(order.paymentMethod);
        
        return dateMatch && searchMatch && statusMatch && paymentStatusMatch && paymentMethodMatch;
    });
  }, [orders, search, date, statusFilter, paymentStatusFilter, paymentMethodFilter]);

  const handleFilterChange = (setter: React.Dispatch<React.SetStateAction<string[]>>, value: string) => {
      setter(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
  }

  const exportToCsv = () => {
    const headers = ['Order ID', 'Customer', 'Date', 'Status', 'Total', 'Payment Method', 'Payment Status'];
    const rows = filteredOrders.map(order => [
        order.id,
        order.customer.name,
        order.date,
        order.status,
        order.total.toFixed(2),
        order.paymentMethod,
        order.paymentStatus
    ].join(','));

    const csvContent = "data:text/csv;charset=utf-t," 
        + [headers.join(','), ...rows].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "orders.csv");
    document.body.appendChild(link); 
    link.click();
    document.body.removeChild(link);
  }

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
          <div className="flex flex-wrap items-center gap-2 mb-4">
              <div className="relative flex-1 md:grow-0">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search orders..." className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]" value={search} onChange={e => setSearch(e.target.value)} />
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant={"outline"}
                    className="w-[260px] justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
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
                      <span>Filter by date</span>
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
                  <DropdownMenuCheckboxItem checked={statusFilter.includes('Pending')} onCheckedChange={() => handleFilterChange(setStatusFilter, 'Pending')}>Pending</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem checked={statusFilter.includes('Processing')} onCheckedChange={() => handleFilterChange(setStatusFilter, 'Processing')}>Processing</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem checked={statusFilter.includes('Shipped')} onCheckedChange={() => handleFilterChange(setStatusFilter, 'Shipped')}>Shipped</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem checked={statusFilter.includes('Delivered')} onCheckedChange={() => handleFilterChange(setStatusFilter, 'Delivered')}>Delivered</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem checked={statusFilter.includes('Cancelled')} onCheckedChange={() => handleFilterChange(setStatusFilter, 'Cancelled')}>Cancelled</DropdownMenuCheckboxItem>
                   <DropdownMenuSeparator />
                   <DropdownMenuLabel>Payment Status</DropdownMenuLabel>
                   <DropdownMenuSeparator />
                   <DropdownMenuCheckboxItem checked={paymentStatusFilter.includes('Paid')} onCheckedChange={() => handleFilterChange(setPaymentStatusFilter, 'Paid')}>Paid</DropdownMenuCheckboxItem>
                   <DropdownMenuCheckboxItem checked={paymentStatusFilter.includes('Pending')} onCheckedChange={() => handleFilterChange(setPaymentStatusFilter, 'Pending')}>Pending</DropdownMenuCheckboxItem>
                    <DropdownMenuSeparator />
                   <DropdownMenuLabel>Payment Method</DropdownMenuLabel>
                   <DropdownMenuSeparator />
                   <DropdownMenuCheckboxItem checked={paymentMethodFilter.includes('Stripe')} onCheckedChange={() => handleFilterChange(setPaymentMethodFilter, 'Stripe')}>Stripe</DropdownMenuCheckboxItem>
                   <DropdownMenuCheckboxItem checked={paymentMethodFilter.includes('Razorpay')} onCheckedChange={() => handleFilterChange(setPaymentMethodFilter, 'Razorpay')}>Razorpay</DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button size="sm" variant="outline" className="h-10 gap-1" onClick={exportToCsv}>
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
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer.name}</TableCell>
                  <TableCell>{format(new Date(order.date), "dd MMM, yyyy")}</TableCell>
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

    