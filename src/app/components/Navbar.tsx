'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Home, ShoppingBag, User } from 'lucide-react'; // Removed HelpCircle
import { Session } from 'next-auth';

interface ExtendedUser {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  isAdmin?: boolean;
}

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showBottomProfileMenu, setShowBottomProfileMenu] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const bottomProfileRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();
  const isAdmin = (session?.user as ExtendedUser)?.isAdmin;
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
      if (bottomProfileRef.current && !bottomProfileRef.current.contains(event.target as Node)) {
        setShowBottomProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setShowProfileMenu(false);
    setShowBottomProfileMenu(false);
    await signOut({ redirect: false });
    router.push('/');
  };

  return (
    <>
      <nav className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              SupremeDistro
            </Link>

            {isAdmin ? (
              <div className="absolute left-1/2 transform -translate-x-1/2">
                <NavLink href="/admin" label="Admin" className="text-red-600 font-semibold" />
              </div>
            ) : (
              <div className="hidden md:flex space-x-8 items-center">
                <NavLink href="/" label="Home" />
                <NavLink href="/shop" label="Shop" />
                <NavLink href="/faq" label="FAQs" />
              </div>
            )}

            <div className="hidden md:flex items-center space-x-4">
              {!session && !isAdmin && <NavLink href="/login" label="Login" />}

              {session && (
                <>
                  {!isAdmin && (
                    <NavLink
                      href="/cart"
                      label={
                        <span className="flex items-center gap-1">
                          <ShoppingBag size={16} /> Cart
                        </span>
                      }
                    />
                  )}
                  <div className="relative" ref={profileRef}>
                    <button
                      onClick={() => setShowProfileMenu((prev) => !prev)}
                      className="flex items-center space-x-2 text-gray-700 hover:text-black focus:outline-none"
                    >
                      <User size={20} />
                      <span>{session.user?.name?.split(' ')[0]}</span>
                    </button>
                    {showProfileMenu && (
                      <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-50">
                        <DropdownLinks onLogout={handleLogout} closeMenu={() => setShowProfileMenu(false)} />
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open menu"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-black hover:bg-gray-200"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 flex">
            <div className="fixed inset-0 bg-black bg-opacity-40" onClick={() => setMobileMenuOpen(false)} />
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

              {!isAdmin && (
                <>
                  <MobileNavLink href="/" label="Home" onClick={() => setMobileMenuOpen(false)} />
                  <MobileNavLink href="/shop" label="Shop" onClick={() => setMobileMenuOpen(false)} />
                  <MobileNavLink href="/faq" label="FAQs" onClick={() => setMobileMenuOpen(false)} />
                </>
              )}

              {!session && <MobileNavLink href="/login" label="Login" onClick={() => setMobileMenuOpen(false)} />}

              {session && (
                <>
                  {!isAdmin && <MobileNavLink href="/cart" label="Cart" onClick={() => setMobileMenuOpen(false)} />}
                  <MobileNavLink href="/profile" label="Profile" onClick={() => setMobileMenuOpen(false)} />
                  <MobileNavLink href="/settings" label="Settings" onClick={() => setMobileMenuOpen(false)} />
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </>
              )}

              {isAdmin && (
                <MobileNavLink
                  href="/admin"
                  label="Admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-red-600 font-semibold"
                />
              )}
            </div>
          </div>
        )}
      </nav>

      {!isAdmin && (
        <BottomNav
          session={session}
          showMenu={showBottomProfileMenu}
          setShowMenu={setShowBottomProfileMenu}
          onLogout={handleLogout}
          bottomProfileRef={bottomProfileRef}
        />
      )}
    </>
  );
}

// Reusable components below

function NavLink({ href, label, className = '' }: { href: string; label: React.ReactNode; className?: string }) {
  return (
    <Link href={href} className={`text-gray-700 hover:text-black px-3 py-2 rounded-md text-sm font-medium ${className}`}>
      {label}
    </Link>
  );
}

function MobileNavLink({
  href,
  label,
  onClick,
  className = '',
}: {
  href: string;
  label: string;
  onClick: () => void;
  className?: string;
}) {
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

function MobileIconLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center justify-center text-gray-700 hover:text-black focus:outline-none"
    >
      {icon}
      <span className="text-xs">{label}</span>
    </Link>
  );
}

function BottomNav({
  session,
  showMenu,
  setShowMenu,
  onLogout,
  bottomProfileRef,
}: {
  session: Session | null;
  showMenu: boolean;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
  onLogout: () => void;
  bottomProfileRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-inner md:hidden flex justify-around items-center h-14">
      <MobileIconLink href="/" label="Home" icon={<Home size={20} />} />
      <MobileIconLink href="/shop" label="Shop" icon={<ShoppingBag size={20} />} />

      <div className="relative" ref={bottomProfileRef}>
        {session ? (
          <>
            <button
              onClick={() => setShowMenu((prev) => !prev)}
              className="flex flex-col items-center justify-center text-gray-700 hover:text-black focus:outline-none"
              aria-label="User menu"
            >
              <User size={20} />
              <span className="text-xs truncate max-w-[70px]">{session.user?.name?.split(' ')[0]}</span>
            </button>
            {showMenu && (
              <div className="absolute bottom-14 left-1/2 transform -translate-x-1/2 w-40 bg-white border rounded shadow-lg z-50">
                <DropdownLinks onLogout={onLogout} closeMenu={() => setShowMenu(false)} />
              </div>
            )}
          </>
        ) : (
          <MobileIconLink href="/login" label="Login" icon={<User size={20} />} />
        )}
      </div>
    </div>
  );
}

function DropdownLinks({ onLogout, closeMenu }: { onLogout: () => void; closeMenu: () => void }) {
  return (
    <>
      <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={closeMenu}>
        Profile
      </Link>
      <Link href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={closeMenu}>
        Settings
      </Link>
      <button
        onClick={() => {
          onLogout();
          closeMenu();
        }}
        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
      >
        Logout
      </button>
    </>
  );
}
