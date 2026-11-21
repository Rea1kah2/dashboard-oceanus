import type { Metadata } from 'next';
import { Inter, DM_Serif_Display, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const dmSerif = DM_Serif_Display({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-dm-serif',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Dashboard Oceanus — Analitik 11.361 Kreator Musik',
  description:
    'Platform Business Intelligence komprehensif untuk eksplorasi dan visualisasi 11.361 kreator musik di dunia Oceanus.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${dmSerif.variable} ${jetbrainsMono.variable} dark`}
    >
      <body className="bg-ocean-950 text-text-primary antialiased selection:bg-signal/20 selection:text-signal">
        {children}
      </body>
    </html>
  );
}
