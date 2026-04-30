'use client';
import './globals.css';
import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';
import { useEffect } from 'react';
import { hydrateSeedData } from '@/lib/seed';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    hydrateSeedData();
  }, []);

  return (
    <html lang="en">
      <head>
        <title>EXPORTS — DJ Booking Platform</title>
        <meta name="description" content="The professional booking platform for the underground music industry" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#0a0a0a] text-[#ededed] min-h-screen">
        <Nav />
        <main className="pt-14 min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
