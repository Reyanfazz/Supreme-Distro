'use client';

import { useEffect, useState, useRef } from 'react';

export default function WarningPopup() {
  const [visible, setVisible] = useState(false);
  const acceptBtnRef = useRef<HTMLButtonElement>(null);
  const declineBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const hasAccepted = localStorage.getItem('ageConfirmed');
    if (!hasAccepted) {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    if (visible) {
      // Focus the accept button when popup appears
      acceptBtnRef.current?.focus();

      // Trap focus inside the popup
      const handleTab = (e: KeyboardEvent) => {
        if (e.key !== 'Tab') return;

        const focusable = [acceptBtnRef.current, declineBtnRef.current].filter(Boolean) as HTMLElement[];
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            last.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === last) {
            first.focus();
            e.preventDefault();
          }
        }
      };

      document.addEventListener('keydown', handleTab);
      return () => document.removeEventListener('keydown', handleTab);
    }
  }, [visible]);

  const handleAccept = () => {
    localStorage.setItem('ageConfirmed', 'true');
    setVisible(false);
  };

  const handleDecline = () => {
    // You can customize this: redirect user or close tab
    // For now, redirect to google
    window.location.href = 'https://www.google.com';
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-popup-title"
      className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center animate-fadeIn"
    >
      <div
        className="bg-white p-6 rounded-xl max-w-md text-center space-y-6 shadow-lg"
        tabIndex={-1}
      >
        <h2 id="age-popup-title" className="text-xl font-bold">
          Age Restriction
        </h2>
        <p>You must be 18+ to enter this site. Please confirm your age.</p>
        <div className="flex justify-center gap-4">
          <button
            ref={acceptBtnRef}
            onClick={handleAccept}
            className="bg-black text-white px-6 py-2 rounded-xl hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          >
            I am 18 or older
          </button>
          <button
            ref={declineBtnRef}
            onClick={handleDecline}
            className="bg-gray-300 text-gray-700 px-6 py-2 rounded-xl hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          >
            I am under 18
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease forwards;
        }
      `}</style>
    </div>
  );
}
