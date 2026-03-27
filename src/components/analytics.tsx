'use client';

/**
 * Analytics Component
 * Privacy-focused analytics integration for Fortran² website
 * Supports Vercel Analytics and Google Analytics (GA4)
 */

import { useEffect, useState } from 'react';
import { 
  checkStoredConsent, 
  setAnalyticsConsent, 
  trackPageView,
  getAnalyticsStatus 
} from '@/lib/analytics';
import { config } from '@/lib/config';

interface AnalyticsProps {
  /**
   * Whether to show the consent banner
   * @default true
   */
  showConsentBanner?: boolean;
  
  /**
   * Position of the consent banner
   * @default 'bottom'
   */
  consentPosition?: 'top' | 'bottom';
}

/**
 * Analytics Component
 * Handles analytics initialization and consent management
 */
export function Analytics({ 
  showConsentBanner = true,
  consentPosition = 'bottom' 
}: AnalyticsProps) {
  const [showBanner, setShowBanner] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check for stored consent
    const hasStoredConsent = checkStoredConsent();
    
    // Show banner if no stored consent and banner is enabled
    if (!hasStoredConsent && showConsentBanner) {
      setShowBanner(true);
    }
    
    // Track initial page view if consent was already given
    if (hasStoredConsent) {
      trackPageView({
        path: window.location.pathname,
        title: document.title,
      });
    }
  }, [showConsentBanner]);

  // Track page views on route changes
  useEffect(() => {
    if (!mounted) return;

    const handleRouteChange = () => {
      const status = getAnalyticsStatus();
      if (status.enabled) {
        trackPageView({
          path: window.location.pathname,
          title: document.title,
        });
      }
    };

    // Listen for Next.js route changes
    window.addEventListener('popstate', handleRouteChange);
    
    // Also track on initial load
    handleRouteChange();

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, [mounted]);

  const handleAccept = () => {
    setAnalyticsConsent(true);
    setShowBanner(false);
    
    // Track the consent acceptance
    trackPageView({
      path: window.location.pathname,
      title: document.title,
    });
  };

  const handleDecline = () => {
    setAnalyticsConsent(false);
    setShowBanner(false);
  };

  // Don't render anything on server or if analytics is disabled
  if (!mounted || !config.analyticsEnabled) {
    return null;
  }

  // Don't show banner if consent was already given or banner is disabled
  if (!showBanner) {
    return null;
  }

  const positionClasses = consentPosition === 'top' 
    ? 'top-0' 
    : 'bottom-0';

  return (
    <div 
      className={`fixed ${positionClasses} left-0 right-0 z-50 p-4 bg-carbon-gray-90 border-t border-carbon-gray-80 shadow-lg`}
      role="dialog"
      aria-labelledby="analytics-consent-title"
      aria-describedby="analytics-consent-description"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex-1">
          <h3 
            id="analytics-consent-title"
            className="text-sm font-medium text-carbon-gray-10"
          >
            Cookie Consent
          </h3>
          <p 
            id="analytics-consent-description"
            className="mt-1 text-sm text-carbon-gray-30"
          >
            We use analytics to understand how you use our website and improve your experience. 
            Your data is processed anonymously and never shared with third parties.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleDecline}
            className="px-4 py-2 text-sm font-medium text-carbon-gray-30 hover:text-carbon-gray-10 transition-colors"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 text-sm font-medium bg-carbon-blue text-white rounded-md hover:bg-carbon-blue-60 transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Analytics Provider Component
 * Wraps the app with analytics functionality
 */
export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Analytics />
    </>
  );
}

/**
 * Analytics Debug Component
 * Shows analytics status in development mode
 */
export function AnalyticsDebug() {
  const [status, setStatus] = useState<ReturnType<typeof getAnalyticsStatus> | null>(null);

  useEffect(() => {
    setStatus(getAnalyticsStatus());
    
    // Update status periodically
    const interval = setInterval(() => {
      setStatus(getAnalyticsStatus());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!config.isDevelopment || !status) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 p-3 bg-carbon-gray-90 border border-carbon-gray-80 rounded-lg shadow-lg text-xs">
      <div className="font-medium text-carbon-gray-10 mb-2">Analytics Debug</div>
      <div className="space-y-1 text-carbon-gray-30">
        <div>Enabled: {status.enabled ? '✓' : '✗'}</div>
        <div>Consent: {status.consentGiven ? '✓' : '✗'}</div>
        <div>GA: {status.googleAnalytics ? '✓' : '✗'}</div>
        <div>Vercel: {status.vercelAnalytics ? '✓' : '✗'}</div>
      </div>
    </div>
  );
}
