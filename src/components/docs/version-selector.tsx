'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, BookOpen, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Version {
  id: string;
  label: string;
  isLatest: boolean;
  isLegacy: boolean;
  changelogUrl: string;
  releaseDate: string;
}

const versions: Version[] = [
  {
    id: 'v3.0',
    label: 'v3.0 (Latest)',
    isLatest: true,
    isLegacy: false,
    changelogUrl: '/docs/v3.0/changelog',
    releaseDate: 'January 2025',
  },
  {
    id: 'v2.5',
    label: 'v2.5',
    isLatest: false,
    isLegacy: false,
    changelogUrl: '/docs/v2.5/changelog',
    releaseDate: 'August 2024',
  },
  {
    id: 'v2.0',
    label: 'v2.0',
    isLatest: false,
    isLegacy: false,
    changelogUrl: '/docs/v2.0/changelog',
    releaseDate: 'February 2024',
  },
  {
    id: 'v1.5',
    label: 'v1.5 (Legacy)',
    isLatest: false,
    isLegacy: true,
    changelogUrl: '/docs/v1.5/changelog',
    releaseDate: 'September 2023',
  },
];

interface VersionSelectorProps {
  currentVersion?: string;
  className?: string;
}

export function VersionSelector({ currentVersion = 'v3.0', className }: VersionSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  
  const currentVersionData = versions.find(v => v.id === currentVersion) || versions[0];
  
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  // Get current slug path without version
  const getPathForVersion = (versionId: string): string => {
    // Extract the slug portion from current pathname
    const parts = pathname.split('/').filter(Boolean);
    if (parts.length >= 3 && parts[0] === 'docs') {
      // Replace version in path
      return `/docs/${versionId}/${parts.slice(2).join('/')}`;
    }
    // Default to getting started for the selected version
    return `/docs/${versionId}/getting-started`;
  };

  return (
    <div className={cn('relative', className)} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2 rounded-lg border border-border-dark bg-surface-dark-secondary px-4 py-2 text-sm font-medium text-content-dark-primary transition-all hover:border-border-dark-emphasis hover:bg-surface-dark-tertiary',
          isOpen && 'border-brand-cyan ring-1 ring-brand-cyan/20'
        )}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <BookOpen className="h-4 w-4 text-brand-cyan" />
        <span>{currentVersionData.label}</span>
        {currentVersionData.isLatest && (
          <span className="rounded-full bg-brand-cyan/20 px-2 py-0.5 text-xs text-brand-cyan">
            Latest
          </span>
        )}
        <ChevronDown className={cn('h-4 w-4 text-content-dark-tertiary transition-transform', isOpen && 'rotate-180')} />
      </button>
      
      {isOpen && (
        <div className="absolute z-50 mt-2 w-64 rounded-xl border border-border-dark bg-surface-dark-secondary p-2 shadow-lg animate-fade-in">
          <div className="mb-2 px-3 py-2 text-xs font-semibold text-content-dark-tertiary uppercase tracking-wider">
            Select Version
          </div>
          
          {versions.map((version) => {
            const isCurrentVersion = version.id === currentVersion;
            return (
              <div key={version.id} className="relative">
                <Link
                  href={getPathForVersion(version.id)}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'flex items-center justify-between rounded-lg px-3 py-2.5 transition-colors',
                    isCurrentVersion
                      ? 'bg-brand-cyan/10 text-brand-cyan'
                      : 'text-content-dark-secondary hover:bg-surface-dark-tertiary hover:text-content-dark-primary'
                  )}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{version.label}</span>
                    {version.isLatest && (
                      <span className="rounded-full bg-brand-cyan/20 px-1.5 py-0.5 text-xs text-brand-cyan">
                        Latest
                      </span>
                    )}
                    {version.isLegacy && (
                      <span className="rounded-full bg-amber-500/20 px-1.5 py-0.5 text-xs text-amber-500">
                        Legacy
                      </span>
                    )}
                  </div>
                </Link>
                
                {/* Changelog link */}
                <Link
                  href={version.changelogUrl}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs transition-colors',
                    isCurrentVersion
                      ? 'text-brand-cyan/70 hover:text-brand-cyan'
                      : 'text-content-dark-tertiary hover:text-content-dark-secondary'
                  )}
                >
                  <AlertCircle className="h-3 w-3" />
                  <span>Changelog • {version.releaseDate}</span>
                </Link>
                
                {!version.isLegacy && <div className="my-1 border-t border-border-dark" />}
              </div>
            );
          })}
          
          <div className="mt-2 border-t border-border-dark pt-2">
            <Link
              href="/docs/versions"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-content-dark-tertiary transition-colors hover:text-brand-cyan"
            >
              <BookOpen className="h-4 w-4" />
              View All Versions
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export type { Version };