'use client';

import Image from 'next/image';
import { X } from 'lucide-react';

export default function QuickViewModal({ product, onClose, onAddToCart }: {
  product: {
    id: string;
    name: string;
    image: string;
    price: number;
    category: string;
  };
  onClose: () => void;
  onAddToCart: (productId: string) => void;
}) {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white max-w-md w-full rounded-xl p-6 relative shadow-xl">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-black">
          <X className="w-6 h-6" />
        </button>

        <div className="relative w-full h-64 mb-4">
          <Image src={product.image} alt={product.name} layout="fill" objectFit="cover" className="rounded-lg" />
        </div>

        <h2 className="text-2xl font-bold">{product.name}</h2>
        <p className="text-gray-500 mb-2">{product.category}</p>
        <p className="text-lg font-semibold text-indigo-600">£{product.price.toFixed(2)}</p>

        <button
          onClick={() => {
            onAddToCart(product.id);
            onClose();
          }}
          className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
