/**
 * Analytics Utilities
 * Privacy-focused analytics tracking for Fortran² website
 */

import { config } from './config';

// Types for analytics events
export interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

export interface PageViewEvent {
  path: string;
  title?: string;
  referrer?: string;
}

// Consent management
let analyticsEnabled = false;
let consentGiven = false;

/**
 * Check if analytics should be enabled based on environment and consent
 */
export function shouldEnableAnalytics(): boolean {
  // Check if analytics is enabled via environment variable
  const envEnabled = config.analyticsEnabled;
  
  // In development, only enable if explicitly set
  if (config.isDevelopment) {
    return envEnabled === true;
  }
  
  // In production, require both env enabled and consent
  return envEnabled === true && consentGiven;
}

/**
 * Set user consent for analytics tracking
 */
export function setAnalyticsConsent(granted: boolean): void {
  consentGiven = granted;
  
  // Store consent in localStorage for persistence
  if (typeof window !== 'undefined') {
    localStorage.setItem('analytics-consent', granted ? 'granted' : 'denied');
  }
  
  // Update analytics state
  if (granted && config.analyticsEnabled) {
    enableAnalytics();
  } else {
    disableAnalytics();
  }
}

/**
 * Check if user has previously given consent
 */
export function checkStoredConsent(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  
  const storedConsent = localStorage.getItem('analytics-consent');
  if (storedConsent === 'granted') {
    consentGiven = true;
    if (config.analyticsEnabled) {
      enableAnalytics();
    }
    return true;
  }
  
  return false;
}

/**
 * Enable analytics tracking
 */
function enableAnalytics(): void {
  analyticsEnabled = true;
  
  // Initialize Google Analytics if configured
  if (config.analyticsId && typeof window !== 'undefined') {
    initializeGoogleAnalytics(config.analyticsId);
  }
  
  // Initialize Vercel Analytics if configured
  if (config.vercelAnalytics && typeof window !== 'undefined') {
    initializeVercelAnalytics();
  }
}

/**
 * Disable analytics tracking
 */
function disableAnalytics(): void {
  analyticsEnabled = false;
  
  // Clean up Google Analytics
  if (typeof window !== 'undefined') {
    const gaScript = document.querySelector('script[src*="googletagmanager"]');
    if (gaScript) {
      gaScript.remove();
    }
    
    // Remove GA globals
    delete (window as any).gtag;
    delete (window as any).dataLayer;
  }
}

/**
 * Initialize Google Analytics (GA4)
 */
function initializeGoogleAnalytics(measurementId: string): void {
  if (typeof window === 'undefined') return;
  
  // Create dataLayer
  (window as any).dataLayer = (window as any).dataLayer || [];
  
  // Define gtag function
  function gtag(...args: any[]) {
    (window as any).dataLayer.push(args);
  }
  
  (window as any).gtag = gtag;
  
  // Initialize with current timestamp
  gtag('js', new Date());
  
  // Configure with measurement ID
  gtag('config', measurementId, {
    page_path: window.location.pathname,
    anonymize_ip: true,
    cookie_flags: 'SameSite=None;Secure',
  });
  
  // Load GA script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);
}

/**
 * Initialize Vercel Analytics
 */
function initializeVercelAnalytics(): void {
  if (typeof window === 'undefined') return;
  
  // Vercel Analytics is automatically initialized when the package is installed
  // This function can be used for any additional setup if needed
  console.log('Vercel Analytics enabled');
}

/**
 * Track page view
 */
export function trackPageView(event: PageViewEvent): void {
  if (!shouldEnableAnalytics() || !analyticsEnabled) {
    return;
  }
  
  // Track with Google Analytics
  if (config.analyticsId && typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'page_view', {
      page_path: event.path,
      page_title: event.title || document.title,
      page_referrer: event.referrer || document.referrer,
    });
  }
  
  // Track with Vercel Analytics (if enabled)
  if (config.vercelAnalytics && typeof window !== 'undefined') {
    // Vercel Analytics automatically tracks page views
    // Custom events can be added here if needed
  }
  
  // Log in development
  if (config.isDevelopment) {
    console.log('📊 Page View:', event);
  }
}

/**
 * Track custom event
 */
export function trackEvent(event: AnalyticsEvent): void {
  if (!shouldEnableAnalytics() || !analyticsEnabled) {
    return;
  }
  
  // Track with Google Analytics
  if (config.analyticsId && typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', event.action, {
      event_category: event.category,
      event_label: event.label,
      value: event.value,
    });
  }
  
  // Log in development
  if (config.isDevelopment) {
    console.log('📊 Event:', event);
  }
}

/**
 * Track user interaction
 */
export function trackInteraction(
  element: string,
  action: string,
  label?: string
): void {
  trackEvent({
    action,
    category: 'interaction',
    label: `${element}${label ? `:${label}` : ''}`,
  });
}

/**
 * Track download event
 */
export function trackDownload(fileName: string, fileType: string): void {
  trackEvent({
    action: 'download',
    category: 'engagement',
    label: `${fileName} (${fileType})`,
  });
}

/**
 * Track search query
 */
export function trackSearch(query: string, resultsCount: number): void {
  trackEvent({
    action: 'search',
    category: 'engagement',
    label: query,
    value: resultsCount,
  });
}

/**
 * Track newsletter signup
 */
export function trackNewsletterSignup(email: string): void {
  trackEvent({
    action: 'newsletter_signup',
    category: 'conversion',
    label: 'newsletter',
  });
}

/**
 * Track demo usage
 */
export function trackDemoUsage(demoName: string, action: string): void {
  trackEvent({
    action: `demo_${action}`,
    category: 'engagement',
    label: demoName,
  });
}

/**
 * Track documentation view
 */
export function trackDocView(docPath: string, version: string): void {
  trackEvent({
    action: 'view_doc',
    category: 'engagement',
    label: `${version}/${docPath}`,
  });
}

/**
 * Track external link click
 */
export function trackExternalLink(url: string): void {
  trackEvent({
    action: 'click_external_link',
    category: 'engagement',
    label: url,
  });
}

/**
 * Track error occurrence
 */
export function trackError(errorMessage: string, errorSource: string): void {
  trackEvent({
    action: 'error',
    category: 'error',
    label: `${errorSource}: ${errorMessage}`,
  });
}

/**
 * Get analytics status
 */
export function getAnalyticsStatus(): {
  enabled: boolean;
  consentGiven: boolean;
  googleAnalytics: boolean;
  vercelAnalytics: boolean;
} {
  return {
    enabled: analyticsEnabled,
    consentGiven,
    googleAnalytics: !!config.analyticsId,
    vercelAnalytics: !!config.vercelAnalytics,
  };
}
