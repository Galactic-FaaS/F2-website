'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/providers/theme-provider';
import { X, Sun, Moon, Search, Github, MessageCircle } from 'lucide-react';

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

const navigation = [
  { name: 'Features', href: '/features' },
  { name: 'Documentation', href: '/docs' },
  { name: 'Downloads', href: '/downloads' },
  { name: 'Community', href: '/community' },
];

export function MobileNav({ open, onClose }: MobileNavProps) {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (open) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open, onClose]);

  // Check if a nav item is active
  const isActive = (href: string) => {
    if (href === '/docs') {
      return pathname.startsWith('/docs');
    }
    return pathname === href;
  };

  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 bg-carbon-gray-100/80 backdrop-blur-sm md:hidden"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-in drawer */}
      <div
        className={cn(
          'fixed right-0 top-0 z-50 h-full w-72 bg-carbon-gray-90 border-l border-carbon-gray-80 md:hidden',
          'transform transition-transform duration-150 ease-out',
          'animate-slide-in-right'
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        {/* Header */}
        <div className="flex h-12 items-center justify-between border-b border-carbon-gray-80 px-4">
          <span className="text-sm font-semibold text-carbon-gray-10">Menu</span>
          <button
            onClick={onClose}
            className="p-2 text-carbon-gray-30 hover:text-carbon-gray-10 transition-colors duration-75"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col py-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={onClose}
              className={cn(
                'flex items-center px-4 py-3 text-sm transition-colors duration-75',
                isActive(item.href)
                  ? 'text-carbon-blue-40 bg-carbon-gray-80 border-l-2 border-carbon-blue-60'
                  : 'text-carbon-gray-10 hover:bg-carbon-gray-80 hover:text-carbon-gray-10'
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Divider */}
        <div className="mx-4 border-t border-carbon-gray-80" />

        {/* Actions */}
        <div className="flex flex-col gap-1 p-2">
          <button className="flex items-center gap-3 w-full px-4 py-3 text-sm text-carbon-gray-10 hover:bg-carbon-gray-80 transition-colors duration-75">
            <Search className="h-4 w-4" />
            Search
            <span className="ml-auto text-xs text-carbon-gray-50">⌘K</span>
          </button>
          <a
            href="https://github.com/fortran-lang"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 w-full px-4 py-3 text-sm text-carbon-gray-10 hover:bg-carbon-gray-80 transition-colors duration-75"
          >
            <Github className="h-4 w-4" />
            GitHub
          </a>
          <a
            href="/community/discord"
            className="flex items-center gap-3 w-full px-4 py-3 text-sm text-carbon-gray-10 hover:bg-carbon-gray-80 transition-colors duration-75"
          >
            <MessageCircle className="h-4 w-4" />
            Discord
          </a>
          <button
            onClick={toggleTheme}
            className="flex items-center gap-3 w-full px-4 py-3 text-sm text-carbon-gray-10 hover:bg-carbon-gray-80 transition-colors duration-75"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="h-4 w-4" />
                Light Mode
              </>
            ) : (
              <>
                <Moon className="h-4 w-4" />
                Dark Mode
              </>
            )}
          </button>
        </div>

        {/* CTA */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-carbon-gray-80 bg-carbon-gray-90">
          <Button variant="primary" className="w-full">
            Get Started
          </Button>
        </div>
      </div>
    </>
  );
}
