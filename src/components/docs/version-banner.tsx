'use client';

import { cn } from '@/lib/utils';
import { AlertTriangle, ArrowRight, Info, BookOpen } from 'lucide-react';
import Link from 'next/link';

type CompatibilityStatus = 'full' | 'partial' | 'deprecated' | 'experimental';

interface VersionBannerProps {
  fortranVersion?: string;
  compatibility: CompatibilityStatus;
  deprecatedFeatures?: string[];
  migrationGuideUrl?: string;
  className?: string;
}

export function VersionBanner({
  fortranVersion = 'Fortran 2018',
  compatibility,
  deprecatedFeatures = [],
  migrationGuideUrl,
  className
}: VersionBannerProps) {
  const styles = {
    full: {
      bg: 'bg-brand-green/10',
      border: 'border-brand-green/30',
      icon: Info,
      iconColor: 'text-brand-green',
      title: 'Full Compatibility',
      description: `This feature is fully compatible with ${fortranVersion} and all modern Fortran compilers.`,
    },
    partial: {
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/30',
      icon: AlertTriangle,
      iconColor: 'text-amber-500',
      title: 'Partial Compatibility',
      description: `This feature uses extensions beyond the ${fortranVersion} standard. Some functionality may not work on all compilers.`,
    },
    deprecated: {
      bg: 'bg-red-500/10',
      border: 'border-red-500/30',
      icon: AlertTriangle,
      iconColor: 'text-red-500',
      title: 'Deprecated',
      description: 'This feature is deprecated and may be removed in future versions. Consider migrating to the recommended alternatives.',
    },
    experimental: {
      bg: 'bg-brand-purple/10',
      border: 'border-brand-purple/30',
      icon: Info,
      iconColor: 'text-brand-purple',
      title: 'Experimental',
      description: 'This feature is under active development and may change in future releases.',
    },
  };
  
  const style = styles[compatibility];
  const Icon = style.icon;
  
  return (
    <div className={cn('rounded-lg border p-4', style.bg, style.border, className)}>
      <div className="flex items-start gap-3">
        <Icon className={cn('mt-0.5 h-5 w-5 flex-shrink-0', style.iconColor)} />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h4 className={cn('font-semibold', style.iconColor)}>{style.title}</h4>
            <span className="text-xs text-content-dark-tertiary">
              {fortranVersion}
            </span>
          </div>
          <p className="mt-1 text-sm text-content-dark-secondary">{style.description}</p>
          
          {/* Deprecated features list */}
          {compatibility === 'deprecated' && deprecatedFeatures.length > 0 && (
            <div className="mt-3">
              <p className="text-xs font-medium text-content-dark-tertiary uppercase tracking-wider mb-1">
                Affected Features
              </p>
              <ul className="space-y-1">
                {deprecatedFeatures.map((feature, index) => (
                  <li key={index} className="text-sm text-content-dark-secondary">
                    • {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Migration guide link */}
          {migrationGuideUrl && (
            <Link
              href={migrationGuideUrl}
              className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand-cyan hover:underline"
            >
              <BookOpen className="h-4 w-4" />
              View Migration Guide
              <ArrowRight className="h-3 w-3" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export type { CompatibilityStatus, VersionBannerProps };