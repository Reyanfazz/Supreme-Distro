'use client';

import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function EditProductPage() {
  const router = useRouter();
  const { id } = useParams();

  const [product, setProduct] = useState({
    name: '',
    price: '',
    image: '',
    description: '',
    featured: false,
    onSale: false,
  });

  useEffect(() => {
    // Replace with real API call
    const mockProduct = {
      name: 'Elfbar 600 Blue Razz',
      price: '5.99',
      image: '/products/elfbar.png',
      description: 'Popular disposable vape device.',
      featured: true,
      onSale: false,
    };
    setProduct(mockProduct);
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement; // Type assertion here
    const { name, type, value, checked } = target;

    setProduct({
      ...product,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Updated Product:', product);
    router.push('/admin/products');
  };

  return (
    <div className="min-h-screen bg-gray-900 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Edit Product
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="w-full border border-gray-300 text-gray-800 placeholder-gray-400 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
          />

          <input
            type="text"
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full border border-gray-300 text-gray-800 placeholder-gray-400 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
          />

          <input
            type="text"
            name="image"
            value={product.image}
            onChange={handleChange}
            placeholder="Image URL"
            className="w-full border border-gray-300 text-gray-800 placeholder-gray-400 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
          />

          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full border border-gray-300 text-gray-800 placeholder-gray-400 p-3 rounded-md h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
          />

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="featured"
              checked={product.featured}
              onChange={handleChange}
              id="featured"
              className="h-4 w-4 text-blue-600 accent-blue-600"
            />
            <label htmlFor="featured" className="text-sm text-gray-700">
              Mark as Featured
            </label>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="onSale"
              checked={product.onSale}
              onChange={handleChange}
              id="onSale"
              className="h-4 w-4 text-blue-600 accent-blue-600"
            />
            <label htmlFor="onSale" className="text-sm text-gray-700">
              Put on Sale
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
