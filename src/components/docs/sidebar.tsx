'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ChevronRight, 
  BookOpen, 
  Code2, 
  Calculator, 
  Sigma, 
  Dice5, 
  Brain, 
  FileCode2,
  Menu,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface NavItem {
  title: string;
  href: string;
  icon?: React.ElementType;
  children?: NavItem[];
}

interface NavSection {
  title: string;
  icon: React.ElementType;
  items: NavItem[];
}

interface SidebarProps {
  currentVersion?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

const navigationSections: NavSection[] = [
  {
    title: 'Getting Started',
    icon: BookOpen,
    items: [
      { title: 'Introduction', href: '/docs/v3.0/getting-started' },
      { title: 'Installation', href: '/docs/v3.0/getting-started#installation' },
      { title: 'Quick Start', href: '/docs/v3.0/getting-started#quick-start' },
      { title: 'Your First Program', href: '/docs/v3.0/getting-started#first-program' },
    ],
  },
  {
    title: 'Language Basics',
    icon: Code2,
    items: [
      { title: 'Syntax Overview', href: '/docs/v3.0/language-basics#syntax' },
      { title: 'Variables & Types', href: '/docs/v3.0/language-basics#variables' },
      { title: 'Control Flow', href: '/docs/v3.0/language-basics#control-flow' },
      { title: 'Functions & Modules', href: '/docs/v3.0/language-basics#functions' },
    ],
  },
  {
    title: 'Core Modules',
    icon: Calculator,
    items: [
      { title: 'Advanced Arithmetic', href: '/docs/v3.0/advanced-arithmetic' },
      { title: 'Symbolic Computation', href: '/docs/v3.0/symbolic-computation' },
      { title: 'Probabilistic Programming', href: '/docs/v3.0/probabilistic' },
      { title: 'Differentiable Programming', href: '/docs/v3.0/differentiable' },
    ],
  },
  {
    title: 'Reference',
    icon: FileCode2,
    items: [
      { title: 'API Reference', href: '/docs/v3.0/api-reference' },
      { title: 'Standard Library', href: '/docs/v3.0/api-reference#stdlib' },
      { title: 'Module Reference', href: '/docs/v3.0/api-reference#modules' },
    ],
  },
];

// Legacy version navigation
const legacyNavigation: NavSection[] = [
  {
    title: 'v2.0 Documentation',
    icon: BookOpen,
    items: [
      { title: 'Getting Started', href: '/docs/v2.0/getting-started' },
      { title: 'Language Reference', href: '/docs/v2.0/language-reference' },
      { title: 'Standard Library', href: '/docs/v2.0/stdlib' },
    ],
  },
  {
    title: 'v1.5 Legacy',
    icon: BookOpen,
    items: [
      { title: 'Getting Started (Legacy)', href: '/docs/v1.5/getting-started' },
      { title: 'Migration Guide', href: '/docs/v1.5/migration' },
    ],
  },
];

export function Sidebar({ currentVersion = 'v3.0', isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState<string[]>(['Getting Started', 'Language Basics']);
  const [mobileOpen, setMobileOpen] = useState(false);
  
  // Expand section containing current page
  useEffect(() => {
    const currentSection = navigationSections.find(section =>
      section.items.some(item => pathname === item.href || pathname.startsWith(item.href + '/'))
    );
    if (currentSection && !expandedSections.includes(currentSection.title)) {
      setExpandedSections(prev => [...prev, currentSection.title]);
    }
  }, [pathname]);
  
  const toggleSection = (title: string) => {
    setExpandedSections(prev =>
      prev.includes(title)
        ? prev.filter(t => t !== title)
        : [...prev, title]
    );
  };
  
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');
  
  const currentNav = currentVersion === 'v1.5' ? legacyNavigation : navigationSections;

  return (
    <>
      {/* Mobile toggle button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed left-4 top-20 z-40 md:hidden"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Backdrop for mobile */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-72 overflow-y-auto border-r border-border-dark bg-deep-space transition-transform duration-300',
          // Mobile positioning
          'md:translate-x-0',
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        )}
      >
        <div className="p-4">
          {/* Mobile close button */}
          <div className="mb-4 flex justify-end md:hidden">
            <Button variant="ghost" size="icon-sm" onClick={() => setMobileOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Navigation sections */}
          <nav className="space-y-4">
            {currentNav.map((section) => {
              const SectionIcon = section.icon;
              const isExpanded = expandedSections.includes(section.title);
              
              return (
                <div key={section.title} className="rounded-lg bg-surface-dark-secondary/50">
                  {/* Section header */}
                  <button
                    onClick={() => toggleSection(section.title)}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-semibold text-content-dark-primary transition-colors hover:bg-surface-dark-tertiary"
                  >
                    <div className="flex items-center gap-2">
                      <SectionIcon className="h-4 w-4 text-brand-cyan" />
                      <span>{section.title}</span>
                    </div>
                    <ChevronRight 
                      className={cn(
                        'h-4 w-4 text-content-dark-tertiary transition-transform',
                        isExpanded && 'rotate-90'
                      )} 
                    />
                  </button>
                  
                  {/* Section items */}
                  {isExpanded && (
                    <div className="pb-2">
                      {section.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className={cn(
                            'flex items-center gap-2 px-3 py-1.5 pl-9 text-sm transition-colors',
                            isActive(item.href)
                              ? 'border-l-2 border-brand-cyan bg-brand-cyan/10 text-brand-cyan'
                              : 'text-content-dark-secondary hover:text-content-dark-primary hover:bg-surface-dark-tertiary'
                          )}
                        >
                          {item.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
          
          {/* External links */}
          <div className="mt-6 space-y-2 border-t border-border-dark pt-4">
            <Link
              href="/docs/v3.0/changelog"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-content-dark-secondary transition-colors hover:bg-surface-dark-tertiary hover:text-content-dark-primary"
            >
              <FileCode2 className="h-4 w-4" />
              Changelog
            </Link>
            <Link
              href="/docs/v3.0/faq"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-content-dark-secondary transition-colors hover:bg-surface-dark-tertiary hover:text-content-dark-primary"
            >
              <BookOpen className="h-4 w-4" />
              FAQ
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}

export type { NavItem, NavSection, SidebarProps };