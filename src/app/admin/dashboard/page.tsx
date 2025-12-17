
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Package, ShoppingBag, Users } from 'lucide-react';
import { getOrders } from '@/lib/models/Order';
import { getProducts } from '@/lib/models/Product';
import { getUsers } from '@/lib/models/User';

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

        const activeProducts = products.filter(product => product.status === 'active').length;

        return {
            totalRevenue,
            totalOrders,
            totalCustomers,
            activeProducts,
        };
    } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
        // Fallback to zeros in case of DB error
        return {
            totalRevenue: 0,
            totalOrders: 0,
            totalCustomers: 0,
            activeProducts: 0,
        };
    }
}


export default async function AdminDashboardPage() {
  const { totalRevenue, totalOrders, totalCustomers, activeProducts } = await getDashboardData();

  const summaryCards = [
    { title: 'Total Revenue', icon: DollarSign, value: `₹${totalRevenue.toFixed(2)}`, change: 'Based on delivered orders' },
    { title: 'Total Orders', icon: ShoppingBag, value: `${totalOrders}`, change: 'All-time orders' },
    { title: 'Total Customers', icon: Users, value: `${totalCustomers}`, change: 'Registered users' },
    { title: 'Products Active', icon: Package, value: `${activeProducts}`, change: 'Currently active products' },
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
          <CardTitle>Welcome, Admin!</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This is your central hub for managing the e-commerce store. You can manage orders, products, and customers from the navigation on the left.</p>
          <p className="mt-4 text-sm text-muted-foreground">More dashboard widgets and analytics will be added here soon.</p>
        </CardContent>
      </Card>
    </div>
  );
}
