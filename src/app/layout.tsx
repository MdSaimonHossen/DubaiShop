import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0f172a'
};

export const metadata: Metadata = {
  metadataBase: new URL('https://apexbattery.ae'),
  title: {
    default: 'Apex Auto | Mobile Car Battery Replacement & Diagnostics Dubai',
    template: '%s | Apex Auto Dubai'
  },
  description: 'On-site car battery replacement, testing, and emergency roadside assistance across Dubai. Diagnostic test before replacement. Genuine warranty.',
  keywords: [
    'car battery replacement dubai',
    'mobile car battery dubai',
    'car battery roadside assistance dubai',
    'emergency jump start dubai',
    'varta battery dubai',
    'amaron battery dubai',
    'battery change at home dubai',
    'agm battery replacement dubai'
  ],
  authors: [{ name: 'Apex Automotive Solutions Dubai' }],
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 selection:bg-sky-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
