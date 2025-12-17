
import Link from 'next/link';
import { ArrowUpRight, DollarSign, Package, ShoppingBag, Users } from 'lucide-react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

import { getOrders } from '@/lib/models/Order';
import { getProducts } from '@/lib/models/Product';
import { getUsers } from '@/lib/models/User';
import { format } from 'date-fns';

async function getDashboardData() {
    try {
        const [orders, products, users] = await Promise.all([
            getOrders(),
            getProducts(),
            getUsers()
        ]);

        const totalRevenue = orders
            .filter(order => order.status === 'Delivered')
            .reduce((sum, order) => sum + order.total, 0);

        const totalOrders = orders.length;

        const totalCustomers = users.filter(user => user.role === 'User').length;
        
        const salesData = orders.reduce((acc, order) => {
          const date = format(new Date(order.createdAt), 'yyyy-MM-dd');
          if (!acc[date]) {
            acc[date] = 0;
          }
          acc[date] += order.total;
          return acc;
        }, {} as Record<string, number>);

        const chartData = Object.entries(salesData).map(([date, total]) => ({
            name: format(new Date(date), 'MMM d'),
            total: total,
        })).slice(-7);


        const recentOrders = orders.slice(0, 5);

        return {
            totalRevenue,
            totalOrders,
            totalCustomers,
            chartData,
            recentOrders,
        };
    } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
        // Fallback to zeros in case of DB error
        return {
            totalRevenue: 0,
            totalOrders: 0,
            totalCustomers: 0,
            chartData: [],
            recentOrders: [],
        };
    }
}


export default async function AdminDashboardPage() {
  const { totalRevenue, totalOrders, totalCustomers, chartData, recentOrders } = await getDashboardData();
  
  const getStatusVariant = (status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled') => {
    switch (status) {
      case 'Delivered': return 'default';
      case 'Shipped': return 'secondary';
      case 'Processing': return 'outline';
      case 'Pending': return 'outline';
      case 'Cancelled': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-6">Admin Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3 mb-8">
         <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{totalRevenue.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Based on delivered orders</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{totalOrders}</div>
               <p className="text-xs text-muted-foreground">All-time orders</p>
            </CardContent>
          </Card>
           <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{totalCustomers}</div>
              <p className="text-xs text-muted-foreground">Registered users</p>
            </CardContent>
          </Card>
      </div>

      <div className="grid gap-4 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-1 lg:col-span-4">
           <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
             <ResponsiveContainer width="100%" height={350}>
                <BarChart data={chartData}>
                    <XAxis
                        dataKey="name"
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `₹${value}`}
                    />
                    <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card className="col-span-1 lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>
              You have {totalOrders} total orders.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Customer</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {recentOrders.map((order) => (
                        <TableRow key={order.id}>
                            <TableCell>
                                <div className="font-medium">{order.shippingAddress.name}</div>
                            </TableCell>
                            <TableCell>
                                <Badge variant={getStatusVariant(order.status)}>{order.status}</Badge>
                            </TableCell>
                            <TableCell className="text-right">₹{order.total.toFixed(2)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
