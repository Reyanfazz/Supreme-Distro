'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';

type Product = {
  id: string;
  name: string;
  image: string;
  category: string;
  rating: number;
  featured: boolean;
  salePrice?: number;
  originalPrice: number;
};

type CartItem = {
  product: Product;
  quantity: number;
};

const products: Product[] = [
  {
    id: 'elf-bar-600-blue-razz',
    name: 'Elf Bar 600 Blue Razz',
    image: '/products/elfbar.png',
    category: 'Vapes',
    rating: 4.5,
    featured: true,
    originalPrice: 5.99,
  },
  {
    id: 'puff-x-cola-ice',
    name: 'Puff X Cola Ice',
    image: '/products/puffx.png',
    category: 'Confectionery',
    rating: 4,
    featured: false,
    salePrice: 5.99,
    originalPrice: 7.99,
  },
  {
    id: 'voom-ice-mint',
    name: 'Voom Ice Mint',
    image: '/products/Vapeshot.png',
    category: 'Vapes',
    rating: 4.2,
    featured: false,
    originalPrice: 6.5,
  },
  {
    id: 'crystal-bar-banana',
    name: 'Crystal Bar Banana Ice',
    image: '/products/elfbar.png',
    category: 'Vapes',
    rating: 4.8,
    featured: true,
    originalPrice: 7.99,
  },
  {
    id: 'lost-mary-kiwi-passion',
    name: 'Lost Mary Kiwi Passion Fruit',
    image: '/products/Vapeshot.png',
    category: 'Accessories',
    rating: 4.6,
    featured: false,
    originalPrice: 6.99,
  },
  // Add more products as needed...
];

export default function ShopPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(8);

  // Explicitly type cart state as CartItem[]
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const filteredByCategory =
    category === 'All'
      ? products
      : products.filter((product) => product.category === category);

  const finalFiltered = filteredByCategory.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const visibleProducts = finalFiltered.slice(0, visibleCount);

  const loadMore = () => setVisibleCount((prev) => prev + 8);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.product.id === product.id
      );
      if (existingIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingIndex].quantity += 1;
        return updatedCart;
      } else {
        return [...prevCart, { product, quantity: 1 }];
      }
    });
    setCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  const changeQuantity = (productId: string, delta: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.product.id === productId) {
            return { ...item, quantity: Math.max(1, item.quantity + delta) };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const totalItemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

  const totalPrice = cart.reduce(
    (total, item) =>
      total +
      item.quantity *
        (item.product.salePrice ?? item.product.originalPrice ?? 0),
    0
  );


  return (
    <>
      <header className="fixed top-20 right-4 z-50">
        <button
          type="button"
          aria-label="View Cart"
          className="relative p-3 bg-indigo-600 rounded-full text-white shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          onClick={() => setCartOpen(true)}
        >
          <ShoppingCart size={24} />
          {totalItemsInCart > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 rounded-full w-5 h-5 text-xs flex items-center justify-center font-bold">
              {totalItemsInCart}
            </span>
          )}
        </button>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className={cartOpen ? 'blurred' : ''}>
          <h1 className="text-3xl font-bold mb-6 text-center">Shop Products</h1>

          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 w-full sm:w-1/3"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 w-full sm:w-1/4"
            >
              <option value="All">All</option>
              <option value="Vapes">Vapes</option>
              <option value="Confectionery">Confectionery</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>

          {visibleProducts.length === 0 ? (
            <p className="text-center text-gray-500">No products found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {visibleProducts.map((product) => (
                <div
                  key={product.id}
                  className="relative bg-white rounded-2xl shadow-md p-5 flex flex-col transition-transform hover:scale-[1.03] hover:shadow-xl"
                >
                  {product.featured && (
                    <span className="absolute top-3 left-3 bg-yellow-400 text-yellow-900 font-semibold px-2 py-1 rounded-md text-xs">
                      Featured
                    </span>
                  )}

                  {product.salePrice && (
                    <span className="absolute top-3 right-3 bg-red-600 text-white font-semibold px-2 py-1 rounded-md text-xs">
                      Sale
                    </span>
                  )}

                  <Link href={`/product/${product.id}`} className="mb-4 block">
                   
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={240}
                        height={240}
                        className="object-contain rounded-lg"
                        priority
                      />
                
                  </Link>

                  <Link href={`/product/${product.id}`}>
                    
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate">
                        {product.name}
                      </h3>
                    
                  </Link>

                  <div className="mb-4">
                    {product.salePrice ? (
                      <>
                        <span className="text-red-600 font-bold text-lg mr-2">
                          ${product.salePrice.toFixed(2)}
                        </span>
                        <span className="line-through text-gray-400 text-sm">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      </>
                    ) : (
                      <span className="text-gray-900 font-semibold text-lg">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <button
                    className="self-end p-3 bg-indigo-600 rounded-full text-white shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-transform hover:scale-110"
                    aria-label={`Add ${product.name} to cart`}
                    title="Add to cart"
                    onClick={() => addToCart(product)}
                  >
                    <ShoppingCart size={20} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {visibleCount < finalFiltered.length && (
            <div className="text-center mt-10">
              <button
                onClick={loadMore}
                className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </main>

      {cartOpen && (
        <>
          <div
            className="fixed inset-0 bg-black opacity-40 z-40"
            onClick={() => setCartOpen(false)}
            aria-hidden="true"
          />

          <aside className="fixed top-0 right-0 h-full w-96 bg-white shadow-lg z-50 p-6 overflow-y-auto flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Your Cart</h2>
              <button
                onClick={() => setCartOpen(false)}
                aria-label="Close cart"
                className="text-gray-700 hover:text-gray-900 focus:outline-none"
              >
                &#10005;
              </button>
            </div>

            {cart.length === 0 ? (
              <p className="text-gray-500">Your cart is empty.</p>
            ) : (
              <ul className="flex-grow overflow-y-auto space-y-4">
                {cart.map(({ product, quantity }) => (
                  <li
                    key={product.id}
                    className="flex items-center space-x-4 border-b border-gray-200 pb-4"
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={60}
                      height={60}
                      className="rounded-lg object-contain"
                    />
                    <div className="flex-grow">
                      <h3 className="font-semibold">{product.name}</h3>
                      <p className="text-sm text-gray-600">
                        Price: $
                        {(product.salePrice ?? product.originalPrice).toFixed(2)}
                      </p>
                      <div className="flex items-center mt-2 space-x-2">
                        <button
                          aria-label={`Decrease quantity of ${product.name}`}
                          onClick={() => changeQuantity(product.id, -1)}
                          className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
                        >
                          <Minus size={16} />
                        </button>
                        <span>{quantity}</span>
                        <button
                          aria-label={`Increase quantity of ${product.name}`}
                          onClick={() => changeQuantity(product.id, 1)}
                          className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                    <button
                      aria-label={`Remove ${product.name} from cart`}
                      onClick={() => removeFromCart(product.id)}
                      className="p-1 rounded-full text-red-600 hover:bg-red-100"
                    >
                      <Trash2 size={18} />
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {cart.length > 0 && (
              <footer className="mt-6 border-t border-gray-300 pt-4">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <button
                  className="w-full mt-4 bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700"
                  onClick={() => alert('Checkout flow not implemented')}
                >
                  Checkout
                </button>
              </footer>
            )}
          </aside>
        </>
      )}

      <style jsx>{`
        .blurred {
          filter: blur(5px);
          pointer-events: none;
          user-select: none;
          transition: filter 0.3s ease;
        }
      `}</style>
    </>
  );
}
