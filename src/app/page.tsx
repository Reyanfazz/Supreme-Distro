'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';

const featuredProducts = [
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
    image: '/products/puffx.png',
    category: 'Vapes',
    rating: 4.8,
    featured: true,
    originalPrice: 7.99,
  },
  {
    id: 'lost-mary-kiwi-passion',
    name: 'Lost Mary Kiwi Passion Fruit',
    image: '/products/puffx.png',
    category: 'Accessories',
    rating: 4.6,
    featured: false,
    originalPrice: 6.99,
  },
];

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  const [visibleCount] = useState(4);

  const [showWarning, setShowWarning] = useState(false);
  const [animateWarning, setAnimateWarning] = useState(false);

  useEffect(() => {
    setShowWarning(true);
    setTimeout(() => setAnimateWarning(true), 100);
  }, []);

  const handleAccept = () => {
    setAnimateWarning(false);
    setTimeout(() => setShowWarning(false), 300);
  };

  const filteredByCategory =
    category === 'All'
      ? featuredProducts
      : featuredProducts.filter((product) => product.category === category);

  const finalFiltered = filteredByCategory.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const visibleProducts = finalFiltered.slice(0, visibleCount);

  return (
    <>
      {/* Age Verification */}
      {showWarning && (
        <div className="fixed inset-0 z-[9999] bg-black bg-opacity-80 flex items-center justify-center px-4">
          <div
            className={`bg-white dark:bg-gray-900 rounded-2xl max-w-md w-full text-center p-8 shadow-2xl transform transition-all duration-300 ${
              animateWarning ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
            }`}
          >
            <h2 className="text-2xl font-extrabold mb-4 text-gray-900 dark:text-white tracking-wide">
              Age Verification
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed font-medium">
              This site contains vape products. You must be <span className="font-bold">18+</span> to enter.
            </p>
            <button
              onClick={handleAccept}
              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-400 rounded-lg text-white font-semibold transition-transform transform hover:scale-105 focus:scale-105"
            >
              I am 18 or older
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main
        className={`transition-all duration-300 ${
          showWarning ? 'blur-sm pointer-events-none select-none' : ''
        }`}
      >
        {/* Delivery Banner */}
        <section className="py-3 px-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white text-center shadow-lg">
          <h2 className="text-xl md:text-2xl font-semibold tracking-wide">
            Fast & Reliable UK Delivery
          </h2>
          <p className="text-sm md:text-base mt-1 max-w-xl mx-auto">
            Orders dispatched same-day before 3 PM. Free delivery on orders over £200.
          </p>
        </section>

        {/* Hero Section with Glassmorphism Overlay */}
        <section className="relative h-[60vh] md:h-[70vh] bg-cover bg-center overflow-hidden px-4 sm:px-6">
          <div
            className="absolute inset-0 bg-cover bg-center filter opacity-0.4 "
            style={{ backgroundImage: "url(/products/herobg.png)",
      filter: "opacity(0.3)" }}
          />
          {/* Glassmorphism overlay */}
          <div className="absolute inset-0 flex items-center justify-center px-6">
            <div className="bg-white/20 backdrop-blur-md rounded-3xl p-6 sm:p-10 max-w-3xl text-center shadow-xl border border-white/30">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg mb-4 tracking-tight leading-tight">
                Welcome to Supreme Distro
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-white drop-shadow-md max-w-lg mx-auto mb-8 font-semibold">
                Your trusted wholesale partner for vape, confectionery & accessories.
              </p>
              <Link className="inline-block px-8 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-full text-white font-semibold shadow-lg transition-transform transform hover:scale-105 focus:scale-105" href="/shop" passHref>
                
                  Browse Products
               
              </Link>
            </div>
          </div>
        </section>

        {/* Search and Filter */}
        <div className="px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center gap-5 max-w-5xl mx-auto">
          <input
            type="text"
            placeholder="Search products..."
            className="flex-grow min-w-[200px] px-5 py-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search products"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-5 py-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition min-w-[150px]"
            aria-label="Filter by category"
          >
            <option value="All">All Categories</option>
            <option value="Vapes">Vapes</option>
            <option value="Confectionery">Confectionery</option>
            <option value="Accessories">Accessories</option>
          </select>
        </div>

        {/* Product Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {visibleProducts.map((product) => (
            <div
              key={product.id}
              className="relative bg-white  rounded-2xl shadow-lg p-6 flex flex-col transform transition-transform duration-300 hover:scale-[1.03] hover:shadow-2xl group"
            >
              {product.featured && (
                <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md uppercase tracking-wider select-none">
                  Featured
                </span>
              )}
              {product.salePrice && (
                <span className="absolute top-4 right-4 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md uppercase tracking-wider select-none">
                  Sale
                </span>
              )}

              <Link
  href={`/product/${product.id}`}
  className="mb-5 flex justify-center rounded-xl overflow-hidden"
>
  <Image
    src={product.image}
    alt={product.name}
    width={240}
    height={240}
    className="object-contain transition-transform duration-300 group-hover:scale-105"
    priority={true}
  />
</Link>


              <h3 className="text-lg font-semibold text-gray-900 dark:text-black mb-1 truncate">
                {product.name}
              </h3>

              <div className="text-base mb-4">
                {product.salePrice ? (
                  <>
                    <span className="text-red-600 font-bold text-lg">£{product.salePrice}</span>
                    <span className="line-through text-gray-400 text-sm ml-2">£{product.originalPrice}</span>
                  </>
                ) : (
                  <span className="font-semibold text-gray-700 dark:text-gray-300">
                    £{product.originalPrice?.toFixed(2) || 'N/A'}
                  </span>
                )}
              </div>

              {/* Add to Cart Button */}
              <button
                className="self-end p-3 bg-indigo-600 hover:bg-indigo-700 rounded-full text-white shadow-lg  focus:outline-none focus:ring-2 focus:ring-indigo-400  transform hover:scale-110 focus:scale-110"
                title="Add to cart"
                aria-label={`Add ${product.name} to cart`}
              >
                <ShoppingCart size={20} />
              </button>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mb-16 px-4 sm:px-0">
  <Link
    href="/shop"
    className="inline-block px-8 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-full text-white font-semibold shadow-lg transition-transform transform hover:scale-105 focus:scale-105"
    aria-label="Go to shop page"
  >
    View All Products
  </Link>
</div>


        {/* Brand Logos */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 shadow-emerald-950  rounded-xl shadow-lg mb-20">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            Trusted Brands
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {/* Replace with your actual brand logos */}
            <Image
              src="/products/elfbar.png"
              alt="Brand 1"
              width={120}
              height={60}
              className="grayscale hover:grayscale-0 transition"
              priority
            />
            <Image
              src="/products/elfbar.png"
              alt="Brand 2"
              width={120}
              height={60}
              className="grayscale hover:grayscale-0 transition"
              priority
            />
            <Image
              src="/products/elfbar.png"
              alt="Brand 3"
              width={120}
              height={60}
              className="grayscale hover:grayscale-0 transition"
              priority
            />
            <Image
              src="/products/elfbar.png"
              alt="Brand 4"
              width={120}
              height={60}
              className="grayscale hover:grayscale-0 transition"
              priority
            />
          </div>
        </section>

        {/* Blog Section */}
<section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
  <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-gray-900 dark:text-white">
    Blog
  </h2>
  <p className="text-center text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
    Stay updated with the latest trends, product news, and industry insights.
  </p>
  <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
    {[1, 2, 3].map((_, idx) => (
      <div
        key={idx}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden group hover:shadow-2xl transition-shadow"
      >
        <Image
          src={`/products/herobg.png`} // placeholder paths
          alt={`Blog ${idx + 1}`}
          width={500}
          height={300}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
        />
        <div className="p-5">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Blog Post Title {idx + 1}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            A short preview of the blog content. Entice users to read more...
          </p>
          <Link
            href={`/blog/post-${idx + 1}`}
            className="text-indigo-600 font-semibold hover:underline"
          >
            Read More →
          </Link>
        </div>
      </div>
    ))}
  </div>
</section>

<footer className="bg-gray-900 text-white py-10 mt-12">
  <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
    <div>
      <h3 className="font-bold text-lg mb-3">Supreme Distro</h3>
      <p className="text-sm text-gray-400">Wholesale vape & accessories supplier in the UK.</p>
    </div>
    <div>
      <h4 className="font-semibold mb-2">Quick Links</h4>
      <ul className="space-y-1 text-sm text-gray-400">
        <li><Link href="/shop">Shop</Link></li>
        <li><Link href="/about">About Us</Link></li>
        <li><Link href="/faq">FAQs</Link></li>
        <li><Link href="/contact">Contact</Link></li>
      </ul>
    </div>
    <div>
      <h4 className="font-semibold mb-2">Customer Service</h4>
      <ul className="space-y-1 text-sm text-gray-400">
        <li><Link href="/terms">Terms & Conditions</Link></li>
        <li><Link href="/privacy">Privacy Policy</Link></li>
        <li><Link href="/shipping">Shipping Info</Link></li>
      </ul>
    </div>
    <div>
      <h4 className="font-semibold mb-2">Get In Touch</h4>
      <p className="text-sm text-gray-400">Email: support@supremedistro.co.uk</p>
      <p className="text-sm text-gray-400 mt-1">Phone: +44 123 456 7890</p>
    </div>
  </div>
  <div className="text-center text-xs text-gray-500 mt-6">© {new Date().getFullYear()} Supreme Distro. All rights reserved.</div>
</footer>

      </main>
    </>
  );
}
