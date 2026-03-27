/**
 * PWA Utilities
 * Service worker registration, cache management, and update notifications
 */

export interface PWAConfig {
  enabled: boolean;
  cacheName: string;
  cacheVersion: string;
}

export interface ServiceWorkerState {
  isSupported: boolean;
  isRegistered: boolean;
  isOnline: boolean;
  updateAvailable: boolean;
  registration: ServiceWorkerRegistration | null;
}

// Default PWA configuration
const defaultConfig: PWAConfig = {
  enabled: true,
  cacheName: 'fortran2-cache',
  cacheVersion: 'v1',
};

// Current PWA configuration
let pwaConfig: PWAConfig = { ...defaultConfig };

// Service worker state
let swState: ServiceWorkerState = {
  isSupported: false,
  isRegistered: false,
  isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
  updateAvailable: false,
  registration: null,
};

// Callbacks for state changes
type StateChangeCallback = (state: ServiceWorkerState) => void;
const stateChangeCallbacks: StateChangeCallback[] = [];

/**
 * Initialize PWA with custom configuration
 */
export function initPWA(config: Partial<PWAConfig> = {}): void {
  pwaConfig = { ...defaultConfig, ...config };
  
  if (typeof window === 'undefined') {
    return;
  }

  // Check if service workers are supported
  swState.isSupported = 'serviceWorker' in navigator;

  // Listen for online/offline events
  window.addEventListener('online', () => {
    swState.isOnline = true;
    notifyStateChange();
  });

  window.addEventListener('offline', () => {
    swState.isOnline = false;
    notifyStateChange();
  });
}

/**
 * Register the service worker
 */
export async function registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if (typeof window === 'undefined' || !swState.isSupported) {
    console.log('[PWA] Service workers not supported');
    return null;
  }

  if (!pwaConfig.enabled) {
    console.log('[PWA] PWA is disabled');
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
      updateViaCache: 'none',
    });

    swState.isRegistered = true;
    swState.registration = registration;

    console.log('[PWA] Service worker registered:', registration.scope);

    // Check for updates
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      if (newWorker) {
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            swState.updateAvailable = true;
            notifyStateChange();
            showUpdateNotification();
          }
        });
      }
    });

    // Handle controller change (new service worker activated)
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      console.log('[PWA] New service worker activated');
      // Optionally reload the page
      // window.location.reload();
    });

    notifyStateChange();
    return registration;
  } catch (error) {
    console.error('[PWA] Service worker registration failed:', error);
    return null;
  }
}

/**
 * Unregister the service worker
 */
export async function unregisterServiceWorker(): Promise<boolean> {
  if (!swState.registration) {
    return false;
  }

  try {
    const result = await swState.registration.unregister();
    if (result) {
      swState.isRegistered = false;
      swState.registration = null;
      notifyStateChange();
      console.log('[PWA] Service worker unregistered');
    }
    return result;
  } catch (error) {
    console.error('[PWA] Service worker unregistration failed:', error);
    return false;
  }
}

/**
 * Check for service worker updates
 */
export async function checkForUpdates(): Promise<boolean> {
  if (!swState.registration) {
    return false;
  }

  try {
    await swState.registration.update();
    return swState.updateAvailable;
  } catch (error) {
    console.error('[PWA] Update check failed:', error);
    return false;
  }
}

/**
 * Apply pending service worker update
 */
export function applyUpdate(): void {
  if (!swState.registration || !swState.updateAvailable) {
    return;
  }

  const newWorker = swState.registration.waiting;
  if (newWorker) {
    newWorker.postMessage({ type: 'SKIP_WAITING' });
  }
}

/**
 * Get current service worker state
 */
export function getServiceWorkerState(): ServiceWorkerState {
  return { ...swState };
}

/**
 * Subscribe to service worker state changes
 */
export function onStateChange(callback: StateChangeCallback): () => void {
  stateChangeCallbacks.push(callback);
  
  // Return unsubscribe function
  return () => {
    const index = stateChangeCallbacks.indexOf(callback);
    if (index > -1) {
      stateChangeCallbacks.splice(index, 1);
    }
  };
}

/**
 * Notify all subscribers of state change
 */
function notifyStateChange(): void {
  stateChangeCallbacks.forEach((callback) => {
    try {
      callback({ ...swState });
    } catch (error) {
      console.error('[PWA] State change callback error:', error);
    }
  });
}

/**
 * Show update notification to user
 */
function showUpdateNotification(): void {
  // This can be customized to show a toast or modal
  console.log('[PWA] Update available! Refresh to get the latest version.');
  
  // Dispatch custom event for UI components to handle
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('pwa-update-available', {
        detail: { message: 'A new version is available!' },
      })
    );
  }
}

/**
 * Clear all caches
 */
export async function clearAllCaches(): Promise<void> {
  if (typeof caches === 'undefined') {
    return;
  }

  try {
    const cacheNames = await caches.keys();
    await Promise.all(
      cacheNames.map((cacheName) => caches.delete(cacheName))
    );
    console.log('[PWA] All caches cleared');
  } catch (error) {
    console.error('[PWA] Failed to clear caches:', error);
  }
}

/**
 * Clear specific cache by name
 */
export async function clearCache(cacheName: string): Promise<boolean> {
  if (typeof caches === 'undefined') {
    return false;
  }

  try {
    const result = await caches.delete(cacheName);
    console.log(`[PWA] Cache ${cacheName} cleared:`, result);
    return result;
  } catch (error) {
    console.error(`[PWA] Failed to clear cache ${cacheName}:`, error);
    return false;
  }
}

/**
 * Get cache size
 */
export async function getCacheSize(): Promise<number> {
  if (typeof caches === 'undefined') {
    return 0;
  }

  try {
    const cacheNames = await caches.keys();
    let totalSize = 0;

    for (const cacheName of cacheNames) {
      const cache = await caches.open(cacheName);
      const keys = await cache.keys();
      
      for (const request of keys) {
        const response = await cache.match(request);
        if (response) {
          const blob = await response.clone().blob();
          totalSize += blob.size;
        }
      }
    }

    return totalSize;
  } catch (error) {
    console.error('[PWA] Failed to calculate cache size:', error);
    return 0;
  }
}

/**
 * Get list of cached URLs
 */
export async function getCachedUrls(): Promise<string[]> {
  if (typeof caches === 'undefined') {
    return [];
  }

  try {
    const cacheNames = await caches.keys();
    const urls: string[] = [];

    for (const cacheName of cacheNames) {
      const cache = await caches.open(cacheName);
      const keys = await cache.keys();
      keys.forEach((request) => {
        urls.push(request.url);
      });
    }

    return urls;
  } catch (error) {
    console.error('[PWA] Failed to get cached URLs:', error);
    return [];
  }
}

/**
 * Pre-cache specific URLs
 */
export async function preCacheUrls(urls: string[]): Promise<void> {
  if (typeof caches === 'undefined') {
    return;
  }

  try {
    const cache = await caches.open(`${pwaConfig.cacheName}-${pwaConfig.cacheVersion}`);
    
    await Promise.all(
      urls.map(async (url) => {
        try {
          const response = await fetch(url);
          if (response.ok) {
            await cache.put(url, response);
          }
        } catch (error) {
          console.log(`[PWA] Failed to pre-cache ${url}:`, error);
        }
      })
    );

    console.log('[PWA] Pre-caching complete');
  } catch (error) {
    console.error('[PWA] Pre-caching failed:', error);
  }
}

/**
 * Check if app is installed as PWA
 */
export function isPWAInstalled(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  // Check if running in standalone mode
  if (window.matchMedia('(display-mode: standalone)').matches) {
    return true;
  }

  // Check for iOS standalone mode
  if ((window.navigator as any).standalone === true) {
    return true;
  }

  return false;
}

/**
 * Request to install PWA
 */
export async function promptInstall(): Promise<boolean> {
  if (typeof window === 'undefined') {
    return false;
  }

  // Get the deferred prompt event
  const deferredPrompt = (window as any).deferredPrompt;
  
  if (!deferredPrompt) {
    console.log('[PWA] No install prompt available');
    return false;
  }

  try {
    // Show the install prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond
    const { outcome } = await deferredPrompt.userChoice;
    
    console.log('[PWA] Install prompt outcome:', outcome);
    
    // Clear the deferred prompt
    (window as any).deferredPrompt = null;
    
    return outcome === 'accepted';
  } catch (error) {
    console.error('[PWA] Install prompt failed:', error);
    return false;
  }
}

/**
 * Listen for beforeinstallprompt event
 */
export function setupInstallPrompt(): void {
  if (typeof window === 'undefined') {
    return;
  }

  window.addEventListener('beforeinstallprompt', (event) => {
    // Prevent the mini-infobar from appearing on mobile
    event.preventDefault();
    
    // Store the event for later use
    (window as any).deferredPrompt = event;
    
    console.log('[PWA] Install prompt ready');
    
    // Dispatch event for UI components
    window.dispatchEvent(new CustomEvent('pwa-install-ready'));
  });

  window.addEventListener('appinstalled', () => {
    console.log('[PWA] App installed');
    (window as any).deferredPrompt = null;
    
    // Dispatch event for UI components
    window.dispatchEvent(new CustomEvent('pwa-installed'));
  });
}

// Initialize on module load
if (typeof window !== 'undefined') {
  initPWA();
  setupInstallPrompt();
}
