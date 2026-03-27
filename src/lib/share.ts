/**
 * Social Sharing Utilities
 * Provides functions for generating share URLs and tracking share events
 */

import { config } from './config';
import { trackEvent } from './analytics';

export interface ShareData {
  url: string;
  title: string;
  description?: string;
  hashtags?: string[];
}

export type SharePlatform = 'twitter' | 'linkedin' | 'facebook' | 'reddit' | 'copy';

/**
 * Generate Twitter share URL
 */
export function getTwitterShareUrl(data: ShareData): string {
  const params = new URLSearchParams({
    url: data.url,
    text: data.title,
  });

  if (data.hashtags && data.hashtags.length > 0) {
    params.append('hashtags', data.hashtags.join(','));
  }

  if (config.twitterHandle) {
    params.append('via', config.twitterHandle);
  }

  return `https://twitter.com/intent/tweet?${params.toString()}`;
}

/**
 * Generate LinkedIn share URL
 */
export function getLinkedInShareUrl(data: ShareData): string {
  const params = new URLSearchParams({
    url: data.url,
    title: data.title,
  });

  if (data.description) {
    params.append('summary', data.description);
  }

  return `https://www.linkedin.com/sharing/share-offsite/?${params.toString()}`;
}

/**
 * Generate Facebook share URL
 */
export function getFacebookShareUrl(data: ShareData): string {
  const params = new URLSearchParams({
    u: data.url,
  });

  return `https://www.facebook.com/sharer/sharer.php?${params.toString()}`;
}

/**
 * Generate Reddit share URL
 */
export function getRedditShareUrl(data: ShareData): string {
  const params = new URLSearchParams({
    url: data.url,
    title: data.title,
  });

  return `https://reddit.com/submit?${params.toString()}`;
}

/**
 * Get share URL for a specific platform
 */
export function getShareUrl(platform: SharePlatform, data: ShareData): string {
  switch (platform) {
    case 'twitter':
      return getTwitterShareUrl(data);
    case 'linkedin':
      return getLinkedInShareUrl(data);
    case 'facebook':
      return getFacebookShareUrl(data);
    case 'reddit':
      return getRedditShareUrl(data);
    case 'copy':
      return data.url;
    default:
      throw new Error(`Unknown platform: ${platform}`);
  }
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }

    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    const result = document.execCommand('copy');
    document.body.removeChild(textArea);
    return result;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
}

/**
 * Track share event for analytics
 */
export function trackShareEvent(platform: SharePlatform, data: ShareData): void {
  trackEvent('share', {
    platform,
    url: data.url,
    title: data.title,
  });
}

/**
 * Share content on a specific platform
 */
export async function shareContent(
  platform: SharePlatform,
  data: ShareData
): Promise<{ success: boolean; message: string }> {
  try {
    if (platform === 'copy') {
      const success = await copyToClipboard(data.url);
      if (success) {
        trackShareEvent(platform, data);
        return { success: true, message: 'Link copied to clipboard!' };
      }
      return { success: false, message: 'Failed to copy link' };
    }

    const shareUrl = getShareUrl(platform, data);
    window.open(shareUrl, '_blank', 'width=600,height=400,scrollbars=yes');
    trackShareEvent(platform, data);
    return { success: true, message: `Sharing on ${platform}...` };
  } catch (error) {
    console.error(`Error sharing on ${platform}:`, error);
    return { success: false, message: `Failed to share on ${platform}` };
  }
}

/**
 * Get all available share platforms
 */
export function getAvailablePlatforms(): SharePlatform[] {
  return ['twitter', 'linkedin', 'facebook', 'reddit', 'copy'];
}

/**
 * Generate full share URL for a blog post
 */
export function getBlogPostShareUrl(slug: string): string {
  const baseUrl = config.siteUrl || 'https://fortran2.io';
  return `${baseUrl}/blog/${slug}`;
}
