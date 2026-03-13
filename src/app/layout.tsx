import type { Metadata } from 'next';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Fortran² - Next-Generation Programming Language',
    template: '%s | Fortran²',
  },
  description: 'Fortran² is a cutting-edge multi-paradigm programming language for computational science, featuring advanced arithmetic, differentiable programming, symbolic computation, and probabilistic programming.',
  keywords: ['Fortran', 'programming language', 'computational science', 'high performance computing', 'scientific computing', 'numerical computing'],
  authors: [{ name: 'Fortran² Team' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://fortran2.io',
    siteName: 'Fortran²',
    title: 'Fortran² - Next-Generation Programming Language',
    description: 'A cutting-edge multi-paradigm programming language for computational science and high-performance computing.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Fortran²',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fortran² - Next-Generation Programming Language',
    description: 'A cutting-edge multi-paradigm programming language for computational science and high-performance computing.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#0A0E17" />
      </head>
      <body className="min-h-screen bg-deep-space font-body text-content-dark-primary antialiased">
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 pt-16">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
