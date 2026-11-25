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

const themeInitScript = `
(function() {
  try {
    var saved = localStorage.getItem('oceanus-theme');
    var root = document.documentElement;
    if (saved === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
    }
  } catch (e) {}
})();
`;

export const metadata: Metadata = {
  title: 'Dashboard Oceanus — Analitik 11.361 Kreator Musik',
  description:
    'Platform Business Intelligence interaktif untuk eksplorasi, filter, dan visualisasi 11.361 kreator musik di ekosistem Oceanus (1975–2040).',
  applicationName: 'Dashboard Oceanus',
  keywords: [
    'Business Intelligence',
    'Dashboard Analitik',
    'Oceanus',
    'Kreator Musik',
    'Visualisasi Data',
  ],
  openGraph: {
    title: 'Dashboard Oceanus — Analitik 11.361 Kreator Musik',
    description:
      'Eksplorasi dominasi genre Dream Pop, tren lonjakan kreator era 2020-an, komposisi peran musik, dan leaderboard musisi paling berpengaruh.',
    type: 'website',
    locale: 'id_ID',
    siteName: 'Dashboard Oceanus',
  },
  twitter: {
    card: 'summary',
    title: 'Dashboard Oceanus — Analitik 11.361 Kreator Musik',
    description:
      'Dashboard Business Intelligence untuk eksplorasi 11.361 kreator musik di dunia Oceanus.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${inter.variable} ${dmSerif.variable} ${jetbrainsMono.variable} dark`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="bg-ocean-950 text-text-primary antialiased selection:bg-signal/20 selection:text-signal">
        {children}
      </body>
    </html>
  );
}
