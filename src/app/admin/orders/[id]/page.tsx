'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface Order {
  id: string;
  customer: string;
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
  total: string;
  date?: string;
  // You can extend with address, products, etc.
}

export default function OrderDetailsPage() {
  const params = useParams();
  const id = typeof params.id === 'string' ? params.id : Array.isArray(params.id) ? params.id[0] : '';
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (!id) return;

    const storedOrders = localStorage.getItem('orders');
    if (storedOrders) {
      const orders: Order[] = JSON.parse(storedOrders);
      const foundOrder = orders.find((o) => o.id.replace('#', '') === id);
      setOrder(foundOrder || null);
    }
  }, [id]);

  if (!order) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10">
        <p className="text-center text-gray-600">Order not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
      <h1 className="text-2xl font-bold">Order Details</h1>

      <div className="bg-white p-6 rounded shadow space-y-4">
        <p><strong>Order ID:</strong> {order.id}</p>
        <p><strong>Customer Name:</strong> {order.customer}</p>
        <p><strong>Status:</strong> {order.status}</p>
        <p><strong>Total Amount:</strong> {order.total}</p>
        <p><strong>Date:</strong> {order.date || 'N/A'}</p>
         <p><strong>address:</strong> 221B Baker Street London UK</p>
      </div>

      <Link href="/admin/orders" className="text-blue-600 underline">
        ← Back to Orders
      </Link>
    </div>
  );
}
