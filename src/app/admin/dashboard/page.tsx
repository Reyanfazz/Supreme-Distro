// app/admin/dashboard/page.tsx
'use client';

export default function AdminDashboard() {
  const stats = {
    totalOrders: 158,
    revenue: 3620.50,
    totalProducts: 48,
    pendingShipments: 12,
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Orders" value={stats.totalOrders} />
        <StatCard title="Revenue" value={`£${stats.revenue.toFixed(2)}`} />
        <StatCard title="Products" value={stats.totalProducts} />
        <StatCard title="Pending Shipments" value={stats.pendingShipments} />
      </div>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="border bg- p-6 rounded-lg shadow text-center">
      <p className="text-gray-500">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
