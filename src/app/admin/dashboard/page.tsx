
'use client';

import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Package, ShoppingBag, Users } from 'lucide-react';

export default function AdminDashboardPage() {
  const { user } = useAuth();

  const summaryCards = [
    { title: 'Total Revenue', icon: DollarSign, value: '₹45,231.89', change: '+20.1% from last month' },
    { title: 'Orders', icon: ShoppingBag, value: '+2350', change: '+180.1% from last month' },
    { title: 'Customers', icon: Users, value: '+1245', change: '+19% from last month' },
    { title: 'Products Active', icon: Package, value: '573', change: '+201 since last hour' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-6">Admin Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4 mb-8">
        {summaryCards.map((card, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <card.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground">{card.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Welcome, {user?.name ?? 'Admin'}!</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This is your central hub for managing the e-commerce store. You can manage orders, products, and customers from the navigation on the left.</p>
          <p className="mt-4 text-sm text-muted-foreground">More dashboard widgets and analytics will be added here soon.</p>
        </CardContent>
      </Card>
    </div>
  );
}
