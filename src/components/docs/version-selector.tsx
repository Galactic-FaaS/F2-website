'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, BookOpen, AlertCircle, Check } from 'lucide-react';
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
  
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
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
      {/* Trigger button - Carbon styling */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-carbon-02',
          'rounded-carbon border border-carbon-gray-70',
          'bg-carbon-gray-90 px-carbon-04 py-carbon-02',
          'text-carbon-xs font-medium text-carbon-gray-10',
          'transition-all duration-carbon-01',
          'hover:border-carbon-gray-50 hover:bg-carbon-gray-80',
          'focus:outline-none focus:ring-2 focus:ring-carbon-blue-50 focus:ring-offset-2 focus:ring-offset-carbon-gray-100',
          isOpen && 'border-carbon-blue-50 ring-1 ring-carbon-blue-50/20'
        )}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <BookOpen className="h-4 w-4 text-accent-cyan" />
        <span>{currentVersionData.label}</span>
        {currentVersionData.isLatest && (
          <span className="rounded-full bg-accent-cyan/20 px-2 py-0.5 text-carbon-xs text-accent-cyan">
            Latest
          </span>
        )}
        <ChevronDown className={cn(
          'h-4 w-4 text-carbon-gray-30 transition-transform duration-carbon-01',
          isOpen && 'rotate-180'
        )} />
      </button>
      
      {/* Dropdown - Carbon styling */}
      {isOpen && (
        <div className={cn(
          'absolute z-50 mt-2 w-64',
          'rounded-carbon-lg border border-carbon-gray-70',
          'bg-carbon-gray-90 p-carbon-02',
          'shadow-lg animate-fade-in'
        )}>
          <div className={cn(
            'mb-carbon-02 px-carbon-03 py-carbon-02',
            'text-carbon-xs font-semibold text-carbon-gray-30 uppercase tracking-wider'
          )}>
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
                    'flex items-center justify-between rounded-carbon',
                    'px-carbon-03 py-carbon-02',
                    'transition-colors duration-carbon-01',
                    isCurrentVersion
                      ? 'bg-accent-cyan/10 text-accent-cyan'
                      : 'text-carbon-gray-30 hover:bg-carbon-gray-80 hover:text-carbon-gray-10'
                  )}
                >
                  <div className="flex items-center gap-carbon-02">
                    {/* Checkmark indicator for active version */}
                    {isCurrentVersion && (
                      <Check className="h-4 w-4 text-accent-cyan" />
                    )}
                    <span className={cn('font-medium', !isCurrentVersion && 'ml-6')}>
                      {version.label}
                    </span>
                    {version.isLatest && (
                      <span className="rounded-full bg-accent-cyan/20 px-1.5 py-0.5 text-carbon-xs text-accent-cyan">
                        Latest
                      </span>
                    )}
                    {version.isLegacy && (
                      <span className="rounded-full bg-carbon-yellow-30/20 px-1.5 py-0.5 text-carbon-xs text-carbon-yellow-30">
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
                    'flex items-center gap-1.5 rounded-carbon',
                    'px-carbon-03 py-carbon-02',
                    'text-carbon-xs transition-colors duration-carbon-01',
                    isCurrentVersion
                      ? 'text-accent-cyan/70 hover:text-accent-cyan'
                      : 'text-carbon-gray-50 hover:text-carbon-gray-30'
                  )}
                >
                  <AlertCircle className="h-3 w-3" />
                  <span>Changelog • {version.releaseDate}</span>
                </Link>
                
                {!version.isLegacy && <div className="my-1 border-t border-carbon-gray-80" />}
              </div>
            );
          })}
          
          <div className="mt-carbon-02 border-t border-carbon-gray-80 pt-carbon-02">
            <Link
              href="/docs/versions"
              onClick={() => setIsOpen(false)}
              className={cn(
                'flex items-center gap-carbon-02 rounded-carbon',
                'px-carbon-03 py-carbon-02',
                'text-carbon-xs text-carbon-gray-30',
                'transition-colors duration-carbon-01',
                'hover:text-accent-cyan'
              )}
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
