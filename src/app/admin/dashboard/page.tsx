
'use client';

import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminDashboardPage() {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-6">Admin Dashboard</h1>
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
