'use client';

import { useState } from 'react';
import { Button } from './button';
import {
  Twitter,
  Linkedin,
  Facebook,
  Reddit,
  Link2,
  Share2,
  Check,
} from 'lucide-react';
import {
  SharePlatform,
  ShareData,
  shareContent,
  getAvailablePlatforms,
} from '@/lib/share';
import { config } from '@/lib/config';

interface ShareButtonProps {
  data: ShareData;
  variant?: 'default' | 'compact' | 'icon-only';
  showLabels?: boolean;
  className?: string;
}

const platformConfig: Record<
  SharePlatform,
  { icon: React.ReactNode; label: string; color: string }
> = {
  twitter: {
    icon: <Twitter className="h-4 w-4" />,
    label: 'Twitter',
    color: 'hover:bg-blue-500/10 hover:text-blue-400',
  },
  linkedin: {
    icon: <Linkedin className="h-4 w-4" />,
    label: 'LinkedIn',
    color: 'hover:bg-blue-600/10 hover:text-blue-500',
  },
  facebook: {
    icon: <Facebook className="h-4 w-4" />,
    label: 'Facebook',
    color: 'hover:bg-blue-700/10 hover:text-blue-600',
  },
  reddit: {
    icon: <Reddit className="h-4 w-4" />,
    label: 'Reddit',
    color: 'hover:bg-orange-500/10 hover:text-orange-500',
  },
  copy: {
    icon: <Link2 className="h-4 w-4" />,
    label: 'Copy Link',
    color: 'hover:bg-gray-500/10 hover:text-gray-400',
  },
};

export function ShareButton({
  data,
  variant = 'default',
  showLabels = true,
  className = '',
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const [sharing, setSharing] = useState<SharePlatform | null>(null);

  if (!config.socialSharingEnabled) {
    return null;
  }

  const handleShare = async (platform: SharePlatform) => {
    setSharing(platform);
    const result = await shareContent(platform, data);

    if (platform === 'copy' && result.success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }

    setSharing(null);
  };

  const platforms = getAvailablePlatforms();

  if (variant === 'icon-only') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        {platforms.map((platform) => (
          <Button
            key={platform}
            variant="ghost"
            size="icon"
            onClick={() => handleShare(platform)}
            disabled={sharing === platform}
            className={`transition-colors ${platformConfig[platform].color}`}
            title={platformConfig[platform].label}
          >
            {platform === 'copy' && copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              platformConfig[platform].icon
            )}
          </Button>
        ))}
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <span className="text-sm text-content-dark-secondary flex items-center gap-1">
          <Share2 className="h-4 w-4" />
          Share
        </span>
        <div className="flex items-center gap-1">
          {platforms.map((platform) => (
            <Button
              key={platform}
              variant="ghost"
              size="icon"
              onClick={() => handleShare(platform)}
              disabled={sharing === platform}
              className={`h-8 w-8 transition-colors ${platformConfig[platform].color}`}
              title={platformConfig[platform].label}
            >
              {platform === 'copy' && copied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                platformConfig[platform].icon
              )}
            </Button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <span className="text-sm font-medium text-content-dark-secondary flex items-center gap-2">
        <Share2 className="h-4 w-4" />
        Share this post
      </span>
      <div className="flex flex-wrap items-center gap-2">
        {platforms.map((platform) => (
          <Button
            key={platform}
            variant="outline"
            size="sm"
            onClick={() => handleShare(platform)}
            disabled={sharing === platform}
            className={`gap-2 transition-colors ${platformConfig[platform].color}`}
          >
            {platform === 'copy' && copied ? (
              <>
                <Check className="h-4 w-4 text-green-500" />
                {showLabels && 'Copied!'}
              </>
            ) : (
              <>
                {platformConfig[platform].icon}
                {showLabels && platformConfig[platform].label}
              </>
            )}
          </Button>
        ))}
      </div>
    </div>
  );
}

/**
 * Share button for blog post cards (compact version)
 */
export function ShareButtonCompact({
  data,
  className = '',
}: {
  data: ShareData;
  className?: string;
}) {
  return (
    <ShareButton
      data={data}
      variant="compact"
      showLabels={false}
      className={className}
    />
  );
}

/**
 * Share button for blog post full view
 */
export function ShareButtonFull({
  data,
  className = '',
}: {
  data: ShareData;
  className?: string;
}) {
  return (
    <ShareButton
      data={data}
      variant="default"
      showLabels={true}
      className={className}
    />
  );
}
