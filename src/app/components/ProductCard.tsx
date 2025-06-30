'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Heart, Eye, Plus } from 'lucide-react';
import QuickViewModal from './QuickViewModal';

export default function ProductCard({ product, onAddToCart }: {
  product: {
    id: string;
    name: string;
    image: string;
    price: number;
    category: string;
  };
  onAddToCart: (productId: string) => void;
}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4 relative group">
        <div className="relative aspect-square w-full overflow-hidden rounded-lg">
          <Image
            src={product.image}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="mt-4 flex flex-col gap-1">
          <h3 className="font-semibold text-gray-800">{product.name}</h3>
          <p className="text-sm text-gray-500">{product.category}</p>
          <p className="font-bold text-lg text-indigo-600">£{product.price.toFixed(2)}</p>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
          <button
            onClick={() => setShowModal(true)}
            className="bg-white p-2 rounded-full shadow hover:bg-gray-100"
            title="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => alert('Added to wishlist!')}
            className="bg-white p-2 rounded-full shadow hover:bg-gray-100"
            title="Add to Wishlist"
          >
            <Heart className="w-4 h-4" />
          </button>
        </div>

        <button
          onClick={() => onAddToCart(product.id)}
          className="w-full mt-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex justify-center items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add to Cart
        </button>
      </div>

      {showModal && (
        <QuickViewModal
          product={product}
          onClose={() => setShowModal(false)}
          onAddToCart={onAddToCart}
        />
      )}
    </>
  );
}
