'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type ProductOrderItem = {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
};

export default function OrderSuccessPage() {
  const [order, setOrder] = useState<ProductOrderItem[]>([]);
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    const storedOrder = localStorage.getItem('submittedOrder');
    if (storedOrder) {
      const orderData = JSON.parse(storedOrder);
      setOrder(orderData);

      // Optional: generate and save order ID
      const id = '#ORD' + Math.floor(Math.random() * 10000).toString().padStart(4, '0');
      setOrderId(id);
      localStorage.setItem('lastOrderId', id);

      localStorage.removeItem('cart'); // Clear cart
    }
  }, []);

  const handlePrint = () => window.print();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 print:bg-white">
      {/* Confirmation */}
      <div className="print:hidden">
        <h1 className="text-3xl font-bold mb-4 text-green-600">✅ Order Submitted!</h1>
        <p className="mb-6 text-gray-600">
          Thank you for your purchase! Your order will be delivered within 3–5 business days.
        </p>

        <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
        <div className="space-y-4 mb-6">
          {order.length > 0 ? (
            order.map((item) => (
              <div key={item.id} className="flex justify-between items-center border p-4 rounded-md">
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <p className="font-medium">£{(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No order data found.</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4">
          <button
            onClick={handlePrint}
            className="bg-gray-800 text-white px-5 py-2 rounded hover:bg-gray-700"
          >
            🧾 Print Invoice
          </button>
          <Link href="/shop">
            <button className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>

      {/* Printable Invoice */}
      <div className="hidden print:block border p-6">
        <h1 className="text-2xl font-bold mb-4">Invoice</h1>
        <p className="mb-2"><strong>Order ID:</strong> {orderId}</p>
        <p className="mb-2"><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
        <p className="mb-6"><strong>Customer:</strong> John Doe</p>

        <table className="w-full text-sm border-t border-b">
          <thead>
            <tr className="text-left">
              <th className="py-2">Product</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {order.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="py-2">{item.name}</td>
                <td>{item.quantity}</td>
                <td>£{item.price.toFixed(2)}</td>
                <td>£{(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="text-right mt-4">
          <p className="text-lg font-semibold">
            Total:{' '}
            £
            {order.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
          </p>
        </div>

        <p className="mt-8 text-center text-sm text-gray-500">
          Thank you for shopping with us!
        </p>
      </div>
    </div>
  );
}
