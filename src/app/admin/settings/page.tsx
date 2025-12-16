
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export default function AdminSettingsPage() {
  return (
    <>
      <div className="flex items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
      </div>
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Store Settings</CardTitle>
          <CardDescription>Manage your store's general settings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="store-name">Store Name</Label>
            <Input id="store-name" defaultValue="Riva Agro Exports" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="store-email">Contact Email</Label>
            <Input id="store-email" type="email" defaultValue="contact@rivaagro.com" />
          </div>
          <Button>Save Settings</Button>
        </CardContent>
      </Card>
    </>
  );
}
