import './globals.css';
import '../styles/index.scss';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React from 'react';
import Header from '@/components/Header';

const inter = Inter({
  subsets: ['latin'],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col gap-16">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: 'SPRA.BY',
  description: 'Spraby',
};
