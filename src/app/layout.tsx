import type { Metadata } from 'next';
import { IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import './globals.css';

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-ibm-plex-sans',
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://fortran2.io'),
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
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Fortran²',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Cross-platform',
    description: 'A cutting-edge multi-paradigm programming language for computational science and high-performance computing.',
    url: 'https://fortran2.io',
    author: {
      '@type': 'Organization',
      name: 'Fortran² Team',
      url: 'https://fortran2.io',
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    softwareVersion: '3.0',
    releaseNotes: 'https://fortran2.io/blog/fortran2-v3-release',
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://fortran2.io/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Documentation',
        item: 'https://fortran2.io/docs',
      },
    ],
  };

  return (
    <html
      lang="en"
      className="dark"
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#161616" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${ibmPlexSans.variable} ${ibmPlexMono.variable} font-sans min-h-screen bg-carbon-gray-100 text-carbon-gray-10 antialiased`}>
        <ThemeProvider>
          <a
            href="#main-content"
            className="skip-link"
          >
            Skip to main content
          </a>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main id="main-content" className="flex-1 pt-16">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
