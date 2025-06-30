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
      acceptBtnRef.current?.focus();

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
    window.location.href = 'https://www.google.com';
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-popup-title"
      className="fixed inset-0 z-50 bg-[#0f172a]/90 flex items-center justify-center animate-fadeIn"
    >
      <div
        className="bg-[#1e293b] p-6 rounded-xl max-w-md text-center space-y-6 shadow-lg"
        tabIndex={-1}
      >
        <h2 id="age-popup-title" className="text-2xl font-bold text-white">
          Age Restriction
        </h2>
        <p className="text-gray-300">
          You must be 18+ to enter this site. Please confirm your age.
        </p>
        <div className="flex justify-center gap-4">
          <button
            ref={acceptBtnRef}
            onClick={handleAccept}
            className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
          >
            I am 18 or older
          </button>
          <button
            ref={declineBtnRef}
            onClick={handleDecline}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400 transition"
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
