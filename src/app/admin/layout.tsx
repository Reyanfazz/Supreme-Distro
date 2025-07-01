'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const links = [
    { href: '/admin', label: 'Dashboard', icon: DashboardIcon },
    { href: '/admin/products', label: 'Products', icon: ProductsIcon },
    { href: '/admin/orders', label: 'Orders', icon: OrdersIcon },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-200">
      <div className="flex flex-1">
        {/* Desktop Sidebar */}
        <aside className="w-64 bg-gray-800 border-r border-gray-700 hidden md:flex flex-col p-6 sticky top-0 h-screen shadow-lg">
          <h2 className="text-2xl font-bold mb-8 text-blue-400">Admin Panel</h2>
          <nav className="space-y-3">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`block px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pathname === href
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>

      {/* Bottom Navigation - Only on Mobile */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-gray-800 border-t border-gray-700 flex justify-around py-2">
        {links.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center text-xs font-medium ${
              pathname === href
                ? 'text-blue-400'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            <Icon className="w-5 h-5 mb-1" />
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

/* Icons - simple inline SVGs or you can replace with any icon library */
function DashboardIcon({ className = '' }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8v-10h-8v10zm0-18v6h8V3h-8z" />
    </svg>
  );
}

function ProductsIcon({ className = '' }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path d="M20 13V4a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v9M3 21h18M9 17v4M15 17v4" />
    </svg>
  );
}

function OrdersIcon({ className = '' }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path d="M9 12l2 2 4-4M4 4h16v16H4z" />
    </svg>
  );
}
