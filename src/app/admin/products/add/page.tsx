'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import Image from 'next/image';

export default function AddProductPage() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    featured: false, // new field
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const target = e.target;
    const { name, type, value } = target;

    const checked = type === 'checkbox' && (target as HTMLInputElement).checked;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('stock', formData.stock);
    data.append('category', formData.category);
    data.append('featured', String(formData.featured));
    if (imageFile) {
      data.append('image', imageFile);
    }

    try {
      const response = await fetch('/api/admin/products', {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        console.log('Product added successfully!');
        setFormData({
          name: '',
          description: '',
          price: '',
          category: '',
          stock: '',
          featured: false,
        });
        setImageFile(null);
        setPreviewUrl(null);
      } else {
        console.error('Failed to add product');
      }
    } catch (error) {
      console.error('Error submitting product:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-white">Add New Product</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-gray-800 p-6 rounded-lg shadow text-gray-200"
      >
        <div>
          <label className="block mb-1 font-semibold">Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 bg-gray-900 text-white"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full border rounded px-3 py-2 bg-gray-900 text-white"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-semibold">Price (£)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 bg-gray-900 text-white"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Stock</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 bg-gray-900 text-white"
            />
          </div>
        </div>
        <div>
          <label className="block mb-1 font-semibold">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 bg-gray-900 text-white"
          >
            <option value="">Select Category</option>
            <option value="vapes">Vapes</option>
            <option value="confectionery">Confectionery</option>
            <option value="accessories">Accessories</option>
          </select>
        </div>

        {/* Featured Product */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="featured"
            checked={formData.featured}
            onChange={handleChange}
            className="w-4 h-4"
            id="featured"
          />
          <label htmlFor="featured" className="font-semibold">
            Mark as Featured Product
          </label>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block mb-1 font-semibold">Product Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {previewUrl && (
            <div className="mt-3 w-32 h-32 relative">
              <Image
                src={previewUrl}
                alt="Preview"
                fill
                className="object-cover rounded border"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Product
        </button>
      </form>
    </div>
  );
}
