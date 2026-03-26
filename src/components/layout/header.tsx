'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { SearchModal, SearchTrigger } from '@/components/ui/search';
import { useTheme } from '@/components/providers/theme-provider';
import { Menu, X, Sun, Moon, Github } from 'lucide-react';
import { MobileNav } from './mobile-nav';

const navigation = [
  { name: 'Features', href: '/features' },
  { name: 'Documentation', href: '/docs' },
  { name: 'Downloads', href: '/downloads' },
  { name: 'Community', href: '/community' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  // Handle Cmd+K / Ctrl+K keyboard shortcut
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      setSearchOpen(true);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Check if a nav item is active
  const isActive = (href: string) => {
    if (href === '/docs') {
      return pathname.startsWith('/docs');
    }
    return pathname === href;
  };

  return (
    <>
      <header className="sticky top-0 z-50 h-12 bg-carbon-gray-100/95 backdrop-blur-xl border-b border-carbon-gray-80">
        <Container>
          <div className="flex h-12 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex h-8 w-8 items-center justify-center bg-accent-cyan/10 border border-accent-cyan/30">
                <span className="font-mono font-semibold text-accent-cyan">F²</span>
              </div>
              <span className="font-sans text-lg font-semibold text-carbon-gray-10">
                Fortran<span className="text-accent-cyan">²</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center h-12">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'relative flex items-center h-12 px-4 text-sm font-normal transition-colors duration-75',
                    isActive(item.href)
                      ? 'text-carbon-blue-40'
                      : 'text-carbon-gray-30 hover:text-carbon-gray-10'
                  )}
                >
                  {item.name}
                  {isActive(item.href) && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-carbon-blue-60" />
                  )}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="hidden md:flex items-center gap-2">
              <SearchTrigger onClick={() => setSearchOpen(true)} />
              <Button
                variant="ghost"
                size="icon-sm"
                asChild
                aria-label="GitHub Repository"
              >
                <a
                  href="https://github.com/fortran2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={toggleTheme}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>
              <Button size="sm" variant="primary">
                Get Started
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-carbon-gray-30 hover:text-carbon-gray-10 transition-colors duration-75"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </Container>

        {/* Mobile Navigation */}
        <MobileNav
          open={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        />
      </header>

      {/* Search Modal */}
      <SearchModal open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
