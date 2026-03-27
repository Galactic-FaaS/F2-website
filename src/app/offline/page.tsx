'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';

export default function OfflinePage() {
  const [isOnline, setIsOnline] = useState(false);
  const [cachedDocs, setCachedDocs] = useState<string[]>([]);

  useEffect(() => {
    // Check online status
    setIsOnline(navigator.onLine);

    // Listen for online/offline events
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Get cached documentation pages
    if ('caches' in window) {
      caches.keys().then((cacheNames) => {
        cacheNames.forEach((cacheName) => {
          if (cacheName.includes('fortran2')) {
            caches.open(cacheName).then((cache) => {
              cache.keys().then((requests) => {
                const docPaths = requests
                  .filter((req) => req.url.includes('/docs'))
                  .map((req) => new URL(req.url).pathname);
                setCachedDocs((prev) => [...new Set([...prev, ...docPaths])]);
              });
            });
          }
        });
      });
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-carbon-gray-100 flex items-center justify-center px-4">
      <Container className="max-w-2xl text-center">
        {/* Offline Icon */}
        <div className="mb-8">
          <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-full bg-carbon-gray-90 border-2 border-carbon-gray-80">
            <svg
              className="w-12 h-12 text-carbon-gray-60"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414"
              />
            </svg>
            {isOnline && (
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-carbon-gray-10 mb-4">
          {isOnline ? 'Back Online!' : 'You\'re Offline'}
        </h1>

        {/* Description */}
        <p className="text-lg text-carbon-gray-40 mb-8">
          {isOnline
            ? 'Your connection has been restored. You can now access all features.'
            : 'It looks like you\'re not connected to the internet. Don\'t worry, you can still access cached documentation.'}
        </p>

        {/* Cached Documentation Section */}
        {!isOnline && cachedDocs.length > 0 && (
          <div className="mb-8 p-6 bg-carbon-gray-90 rounded-lg border border-carbon-gray-80">
            <h2 className="text-xl font-semibold text-carbon-gray-10 mb-4 flex items-center justify-center gap-2">
              <svg
                className="w-5 h-5 text-fortran-cyan"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                />
              </svg>
              Cached Documentation
            </h2>
            <p className="text-carbon-gray-40 mb-4 text-sm">
              These documentation pages are available offline:
            </p>
            <ul className="space-y-2 text-left">
              {cachedDocs.slice(0, 5).map((path) => (
                <li key={path}>
                  <Link
                    href={path}
                    className="text-fortran-cyan hover:text-fortran-cyan/80 transition-colors text-sm flex items-center gap-2"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    {path}
                  </Link>
                </li>
              ))}
              {cachedDocs.length > 5 && (
                <li className="text-carbon-gray-500 text-sm">
                  +{cachedDocs.length - 5} more pages cached
                </li>
              )}
            </ul>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {!isOnline && (
            <Button onClick={handleRetry} variant="primary" size="lg">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Retry Connection
            </Button>
          )}

          <Link href="/">
            <Button variant={isOnline ? 'primary' : 'secondary'} size="lg">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Go to Home
            </Button>
          </Link>

          {isOnline && (
            <Link href="/docs">
              <Button variant="secondary" size="lg">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
                View Documentation
              </Button>
            </Link>
          )}
        </div>

        {/* Tips Section */}
        {!isOnline && (
          <div className="mt-12 p-6 bg-carbon-gray-90 rounded-lg border border-carbon-gray-80">
            <h3 className="text-lg font-semibold text-carbon-gray-10 mb-4">
              Tips for Offline Access
            </h3>
            <ul className="text-left space-y-3 text-carbon-gray-40 text-sm">
              <li className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-fortran-cyan flex-shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>
                  <strong>Documentation is cached:</strong> Pages you've visited
                  before are available offline.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-fortran-cyan flex-shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>
                  <strong>Install the app:</strong> Add to home screen for quick
                  offline access.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-fortran-cyan flex-shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>
                  <strong>Check your connection:</strong> Ensure Wi-Fi or mobile
                  data is enabled.
                </span>
              </li>
            </ul>
          </div>
        )}

        {/* Connection Status Indicator */}
        <div className="mt-8 flex items-center justify-center gap-2 text-sm">
          <div
            className={`w-2 h-2 rounded-full ${
              isOnline ? 'bg-green-500' : 'bg-red-500'
            }`}
          />
          <span className="text-carbon-gray-500">
            {isOnline ? 'Connected' : 'Offline'}
          </span>
        </div>
      </Container>
    </div>
  );
}
