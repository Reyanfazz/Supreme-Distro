'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Home, ShoppingBag, HelpCircle, LogIn, UserCog } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Mobile menu button - on the left */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(true)}
                type="button"
                aria-label="Open menu"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-black hover:bg-gray-200 focus:outline-none"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>

            {/* Logo */}
            <Link href="/" className="text-2xl font-bold text-gray-900">
              SupremeDistro
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8 items-center">
              <NavLink href="/" label="Home" />
              <NavLink href="/shop" label="Shop" />
              <NavLink href="/faq" label="FAQs" />
              <NavLink href="/login" label="Login" />
              <NavLink href="/admin" label="Admin" className="text-red-600 font-semibold" />
            </div>
          </div>
        </div>

        {/* Mobile Side Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 flex">
            <div
              className="fixed inset-0 bg-black bg-opacity-40"
              onClick={() => setMobileMenuOpen(false)}
            />

            <div className="relative bg-white w-64 h-full shadow-lg z-50 p-4 space-y-4">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="absolute top-4 right-4 text-gray-600 hover:text-black"
                aria-label="Close menu"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <MobileNavLink href="/" label="Home" onClick={() => setMobileMenuOpen(false)} />
              <MobileNavLink href="/shop" label="Shop" onClick={() => setMobileMenuOpen(false)} />
              <MobileNavLink href="/faq" label="FAQs" onClick={() => setMobileMenuOpen(false)} />
              <MobileNavLink href="/login" label="Login" onClick={() => setMobileMenuOpen(false)} />
              <MobileNavLink href="/admin" label="Admin" onClick={() => setMobileMenuOpen(false)} className="text-red-600 font-semibold" />
            </div>
          </div>
        )}
      </nav>

      {/* Bottom Nav - Mobile Only */}
      <BottomNav />
    </>
  );
}

function NavLink({ href, label, className = '' }: { href: string; label: string; className?: string }) {
  return (
    <Link
      href={href}
      className={`text-gray-700 hover:text-black px-3 py-2 rounded-md text-sm font-medium ${className}`}
    >
      {label}
    </Link>
  );
}

function MobileNavLink({ href, label, onClick, className = '' }: { href: string; label: string; onClick: () => void; className?: string }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`block px-4 py-2 text-lg font-medium text-gray-700 hover:bg-gray-100 rounded ${className}`}
    >
      {label}
    </Link>
  );
}

// Bottom Mobile Navigation Component
function BottomNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-inner md:hidden flex justify-around items-center h-14">
      <MobileIconLink href="/" label="Home" icon={<Home size={20} />} />
      <MobileIconLink href="/shop" label="Shop" icon={<ShoppingBag size={20} />} />
      <MobileIconLink href="/faq" label="FAQs" icon={<HelpCircle size={20} />} />
      <MobileIconLink href="/login" label="Login" icon={<LogIn size={20} />} />
      <MobileIconLink href="/admin" label="Admin" icon={<UserCog size={20} />} className="text-red-600" />
    </div>
  );
}

function MobileIconLink({
  href,
  label,
  icon,
  className = '',
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={`flex flex-col items-center text-gray-700 text-xs hover:text-black ${className}`}>
      {icon}
      <span>{label}</span>
    </Link>
  );
}
