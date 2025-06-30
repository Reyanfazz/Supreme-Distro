'use client';

import Link from 'next/link';
import React from 'react';

const products = [
  { id: 'P001', name: 'Blueberry Ice Vape', category: 'Vapes', stock: 120, price: 9.99 },
  { id: 'P002', name: 'Strawberry Gummies', category: 'Confectionery', stock: 60, price: 3.49 },
  { id: 'P003', name: 'Battery Charger', category: 'Accessories', stock: 20, price: 14.99 },
];

export default function AdminProductsPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manage Products</h1>
        <Link
          href="/admin/products/add"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Product
        </Link>
      </div>

      <div className="overflow-auto border rounded shadow bg-white">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-amber-950">
            <tr>
              <th className="p-3">Product ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Category</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Price</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t text-black hover:bg-gray-200">
                <td className="p-3">{product.id}</td>
                <td className="p-3">{product.name}</td>
                <td className="p-3">{product.category}</td>
                <td className="p-3">{product.stock}</td>
                <td className="p-3">£{product.price.toFixed(2)}</td>
                <td className="p-3 space-x-2">
                  <Link href={`/admin/products/edit/${product.id}`} className="text-blue-600 hover:underline">
                    Edit
                  </Link>
                  <button className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
