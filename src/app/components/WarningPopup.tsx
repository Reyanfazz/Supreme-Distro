'use client';

import { useEffect, useState } from 'react';

export default function WarningPopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hasAccepted = sessionStorage.getItem('ageConfirmed');
    if (!hasAccepted) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    sessionStorage.setItem('ageConfirmed', 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl max-w-md text-center space-y-4 shadow-lg">
        <h2 className="text-xl font-bold">Age Restriction</h2>
        <p>You must be 18+ to enter this site. Please confirm your age.</p>
        <button
          onClick={handleAccept}
          className="bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-800 transition"
        >
          I am 18 or older
        </button>
      </div>
    </div>
  );
}
