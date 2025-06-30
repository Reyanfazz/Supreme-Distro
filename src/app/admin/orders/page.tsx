'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Order {
  id: string;
  customer: string;
  status: 'Select' | 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
  total: string;
  address?: string;
}

const getStatusStyle = (status: Order['status']) => {
  const base = 'px-2 py-1 text-xs rounded font-semibold';
  switch (status) {
    case 'Pending':
      return `${base} bg-yellow-100 text-yellow-800`;
    case 'Shipped':
      return `${base} bg-blue-100 text-blue-800`;
    case 'Delivered':
      return `${base} bg-green-100 text-green-800`;
    case 'Cancelled':
      return `${base} bg-red-100 text-red-800`;
    default:
    case 'Select':
      return `${base} bg-gray-100 text-gray-800`;
  }
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('orders');
    if (stored) {
      setOrders(JSON.parse(stored) as Order[]);
    }
  }, []);

  const handleUpdateOrder = (updatedOrder: Order) => {
    const newOrders = orders.map((order) =>
      order.id === updatedOrder.id ? updatedOrder : order
    );
    setOrders(newOrders);
    localStorage.setItem('orders', JSON.stringify(newOrders));
    setSelectedOrder(null); // close modal
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-3xl font-bold mb-4">Manage Orders</h1>

      <div className="overflow-auto border rounded shadow bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-amber-950">
            <tr>
              <th className="p-3 text-left">Order ID</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Total</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center p-4 text-gray-500">
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((order, idx) => (
                <tr key={idx} className="border-t hover:bg-gray-50">
                  <td className="p-3">
                    <Link
                      href={`/admin/orders/${order.id.replace('#', '')}`}
                      className="text-blue-600 underline"
                    >
                      {order.id}
                    </Link>
                  </td>
                  <td className="p-3">{order.customer}</td>
                  <td className="p-3">
                    <span className={getStatusStyle(order.status)}>{order.status}</span>
                  </td>
                  <td className="p-3">{order.total}</td>
                  <td className="p-3 space-x-2">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="text-green-600 hover:underline"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* View/Edit Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <h2 className="text-xl font-semibold mb-4">Order Details</h2>
            <p><strong>ID:</strong> {selectedOrder.id}</p>
            <p><strong>Customer:</strong> {selectedOrder.customer}</p>
            <p><strong>Address:</strong> {selectedOrder.address || 'N/A'}</p>
            <p><strong>Total:</strong> {selectedOrder.total}</p>

            <div className="mt-4">
              <label className="block mb-1 font-medium">Update Status</label>
              <select
  value={selectedOrder.status}
  onChange={(e) =>
    setSelectedOrder({ ...selectedOrder, status: e.target.value as Order['status'] })
  }
  className="border rounded p-2 w-full"
>
  <option value="Select">Select Status</option>
  <option value="Pending">Pending</option>
  <option value="Shipped">Shipped</option>
  <option value="Delivered">Delivered</option>
  <option value="Cancelled">Cancelled</option>
</select>

            </div>

            <div className="mt-6 flex justify-between items-center">
              <button
                onClick={() => handleUpdateOrder({ ...selectedOrder, status: 'Cancelled' })}
                className="text-red-600 hover:underline"
              >
                Cancel Order
              </button>
              <div className="space-x-2">
                <button
                  onClick={() => handleUpdateOrder(selectedOrder)}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-600 hover:underline"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
