'use client';

import { useEffect } from 'react';
import Link from 'next/link';
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

  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
        onClick={onClose}
      />

      {/* Slide-in menu */}
      <div
        className={cn(
          'fixed right-0 top-0 z-50 h-full w-72 bg-surface-dark-secondary border-l border-border-dark shadow-xl md:hidden',
          'transform transition-transform duration-300 ease-in-out',
          open ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Header */}
        <div className="flex h-16 items-center justify-between border-b border-border-dark px-4">
          <span className="font-heading font-bold text-content-dark-primary">Menu</span>
          <button
            onClick={onClose}
            className="p-2 text-content-dark-secondary hover:text-content-dark-primary"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col p-4">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={onClose}
              className="flex items-center rounded-lg px-4 py-3 text-base font-medium text-content-dark-secondary hover:bg-surface-dark-tertiary hover:text-content-dark-primary transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Divider */}
        <div className="mx-4 border-t border-border-dark" />

        {/* Actions */}
        <div className="flex flex-col gap-2 p-4">
          <Button variant="secondary" className="w-full justify-start gap-3">
            <Search className="h-4 w-4" />
            Search
          </Button>
          <Button variant="secondary" className="w-full justify-start gap-3">
            <Github className="h-4 w-4" />
            GitHub
          </Button>
          <Button variant="secondary" className="w-full justify-start gap-3">
            <MessageCircle className="h-4 w-4" />
            Discord
          </Button>
          <Button
            variant="ghost"
            onClick={toggleTheme}
            className="w-full justify-start gap-3"
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
          </Button>
        </div>

        {/* CTA */}
        <div className="absolute bottom-4 left-4 right-4">
          <Button className="w-full">Get Started</Button>
        </div>
      </div>
    </>
  );
}
