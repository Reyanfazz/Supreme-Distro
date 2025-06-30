'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ShoppingCart } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  image: string;
  category: string;
  rating: number;
  originalPrice?: number;
  salePrice?: number;
}

const productList: Product[] = [
  {
    id: 'elf-bar-600-blue-razz',
    name: 'Elf Bar 600 Blue Razz',
    image: '/products/elfbar.png',
    category: 'Vapes',
    rating: 4.5,
    originalPrice: 5.99,
  },
  {
    id: 'puff-x-cola-ice',
    name: 'Puff X Cola Ice',
    image: '/products/puffx.png',
    category: 'Confectionery',
    salePrice: 5.99,
    originalPrice: 7.99,
    rating: 4.0,
  },
  {
    id: 'crystal-bar-banana',
    name: 'Crystal Bar Banana Ice',
    image: '/products/crystal.png',
    category: 'Vapes',
    rating: 4.8,
    originalPrice: 7.99,
  },
];

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const found = productList.find((p) => p.id === id) || null;
    setProduct(found);
  }, [id]);

  if (!product) {
    return <div className="p-8 text-center">Loading product...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="rounded-2xl bg-white p-4 shadow-md">
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={400}
            className="w-full object-contain"
            priority
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
              {product.name}
            </h1>
            <p className="text-sm text-gray-500 mb-1">Category: {product.category}</p>
            <p className="text-yellow-500 font-semibold mb-4">★ {product.rating} / 5</p>

            {/* Price */}
            {product.salePrice ? (
              <div className="text-2xl font-bold text-red-600 mb-2">
                £{product.salePrice.toFixed(2)}{' '}
                <span className="text-gray-400 line-through text-lg ml-2">
                  £{product.originalPrice?.toFixed(2)}
                </span>
              </div>
            ) : (
              <div className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                £{product.originalPrice ? product.originalPrice.toFixed(2) : 'N/A'}
              </div>
            )}

            {/* Estimated Delivery */}
            <p className="text-sm text-green-600 mb-6">
              🚚 Estimated delivery: 1–2 working days (UK mainland)
            </p>

            {/* Add to Cart */}
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-semibold transition shadow-lg">
              <ShoppingCart size={20} />
              Add to Cart
            </button>
          </div>

          {/* Back to Shop */}
          <Link
            href="/shop"
            className="mt-6 text-indigo-600 hover:underline text-sm font-medium"
          >
            ← Back to Shop
          </Link>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          Related Products
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {productList
            .filter((p) => p.id !== product.id)
            .slice(0, 3)
            .map((p) => (
              <Link
                href={`/products/${p.id}`}
                key={p.id}
                className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md hover:shadow-lg transition"
              >
                <Image
                  src={p.image}
                  alt={p.name}
                  width={150}
                  height={150}
                  className="mx-auto mb-4"
                />
                <h3 className="text-lg font-semibold text-center">{p.name}</h3>
                <p className="text-center text-gray-500 text-sm mt-1">
                  £{(p.salePrice || p.originalPrice)?.toFixed(2)}
                </p>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
