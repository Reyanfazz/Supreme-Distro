'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import type * as RechartsType from 'recharts';
import {
  ChartBarIcon,
  CubeIcon,
  CurrencyPoundIcon,
  TruckIcon,
} from '@heroicons/react/24/outline';

interface Order {
  id: string;
  customer: string;
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
  total: string;
  date?: string;
}

const ordersPerDay = [
  { day: 'Mon', orders: 30 },
  { day: 'Tue', orders: 45 },
  { day: 'Wed', orders: 32 },
  { day: 'Thu', orders: 60 },
  { day: 'Fri', orders: 80 },
];

const stats = {
  totalOrders: 158,
  revenue: 3620.5,
  totalProducts: 48,
  pendingShipments: 12,
};

const getStatusStyle = (status: string) => {
  const base = 'px-2 py-1 text-xs rounded-full font-medium';
  switch (status) {
    case 'Pending':
      return `${base} bg-yellow-100 text-yellow-800`;
    case 'Shipped':
      return `${base} bg-blue-100 text-blue-800`;
    case 'Delivered':
      return `${base} bg-green-100 text-green-800`;
    default:
      return `${base} bg-gray-100 text-gray-800`;
  }
};

function StatCard({
  title,
  value,
  Icon,
}: {
  title: string;
  value: string | number;
  Icon: React.ElementType;
}) {
  return (
    <div className="flex items-center gap-4 bg-white p-5 rounded-lg shadow hover:shadow-md transition">
      <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [Recharts, setRecharts] = useState<typeof RechartsType | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    import('recharts').then((mod) => setRecharts(mod));

    const storedOrders = localStorage.getItem('orders');
    if (storedOrders) {
      const parsedOrders: Order[] = JSON.parse(storedOrders);
      setOrders(parsedOrders.reverse());
    }
  }, []);

  return (
    <main className="max-w-7xl mx-auto px-6 py-10 space-y-12">
      <h1 className="text-4xl font-bold tracking-tight mb-4">Admin Dashboard</h1>

      {/* Stat Cards */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Orders" value={orders.length} Icon={ChartBarIcon} />
          <StatCard title="Revenue" value={`£${stats.revenue.toFixed(2)}`} Icon={CurrencyPoundIcon} />
          <StatCard title="Products" value={stats.totalProducts} Icon={CubeIcon} />
          <StatCard title="Pending Shipments" value={stats.pendingShipments} Icon={TruckIcon} />
        </div>
      </section>

      {/* Orders Chart */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Orders This Week</h2>
        <div className="bg-white p-6 rounded-xl shadow h-80">
          {!Recharts ? (
            <p className="text-gray-500 text-center pt-10">Loading chart...</p>
          ) : (
            <Recharts.ResponsiveContainer width="100%" height="100%">
              <Recharts.BarChart data={ordersPerDay}>
                <Recharts.XAxis dataKey="day" />
                <Recharts.YAxis />
                <Recharts.Tooltip />
                <Recharts.Bar dataKey="orders" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </Recharts.BarChart>
            </Recharts.ResponsiveContainer>
          )}
        </div>
      </section>

      {/* Recent Orders */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Recent Orders</h2>
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="text-left px-5 py-3">Order ID</th>
                <th className="text-left px-5 py-3">Customer</th>
                <th className="text-left px-5 py-3">Status</th>
                <th className="text-left px-5 py-3">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-6 text-gray-500">
                    No orders available.
                  </td>
                </tr>
              ) : (
                orders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="border-t hover:bg-gray-50 transition">
                    <td className="px-5 py-3">
                      <Link
                        href={`/admin/orders/${order.id.replace('#', '')}`}
                        className="text-blue-600 underline"
                      >
                        {order.id}
                      </Link>
                    </td>
                    <td className="px-5 py-3">{order.customer}</td>
                    <td className="px-5 py-3">
                      <span className={getStatusStyle(order.status)}>{order.status}</span>
                    </td>
                    <td className="px-5 py-3">{order.total}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Google Maps */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Order Location Overview</h2>
        <div className="rounded-xl overflow-hidden shadow-lg">
          <iframe
            title="Order Locations Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2436.853214985441!2d-0.12775818422357384!3d51.50721777963498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761b333c8dca9f%3A0x24c68b6d76c6c36!2sLondon%2C%20UK!5e0!3m2!1sen!2sus!4v1719144212345"
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </main>
  );
}
