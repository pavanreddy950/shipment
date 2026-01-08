import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'TradeIntel - Global Trade Intelligence Platform',
  description: 'Enterprise-grade trade intelligence and import-export analytics platform. Discover global buyers, analyze shipment data, and grow your business.',
  keywords: ['trade intelligence', 'import export', 'shipment data', 'buyer discovery', 'trade analytics'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
