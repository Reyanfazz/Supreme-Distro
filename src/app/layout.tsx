import './globals.css';
import type { Metadata } from 'next';

import Navbar from './components/Navbar';
import WarningPopup from './components/WarningPopup';
import { Poppins } from 'next/font/google';
import Providers from './providers';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600', '700'] });

export const metadata: Metadata = {
  title: 'Supreme Distro',
  description: 'Modern vaping & products distro website',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Providers>
          <WarningPopup />
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
