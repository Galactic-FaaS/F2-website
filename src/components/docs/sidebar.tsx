'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ChevronRight, 
  BookOpen, 
  Code2, 
  Calculator, 
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
        className="fixed left-4 top-20 z-40 md:hidden text-carbon-gray-30 hover:text-carbon-gray-10 hover:bg-carbon-gray-80"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Backdrop for mobile */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 z-30 bg-carbon-gray-100/80 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
      
      {/* Sidebar - Carbon Design styling */}
      <aside
        className={cn(
          // Fixed positioning and dimensions
          'fixed left-0 top-12 z-40 h-[calc(100vh-3rem)] w-64 overflow-y-auto',
          // Carbon colors and border
          'bg-carbon-gray-90 border-r border-carbon-gray-80',
          // Smooth transition
          'transition-transform duration-300 ease-carbon',
          // Mobile positioning
          'md:translate-x-0',
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        )}
      >
        <div className="p-carbon-04">
          {/* Mobile close button */}
          <div className="mb-carbon-03 flex justify-end md:hidden">
            <Button 
              variant="ghost" 
              size="icon-sm" 
              onClick={() => setMobileOpen(false)}
              className="text-carbon-gray-30 hover:text-carbon-gray-10 hover:bg-carbon-gray-80"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Navigation sections */}
          <nav className="space-y-carbon-03">
            {currentNav.map((section) => {
              const SectionIcon = section.icon;
              const isExpanded = expandedSections.includes(section.title);
              
              return (
                <div key={section.title} className="rounded-carbon bg-carbon-gray-80/50">
                  {/* Section header - accordion style */}
                  <button
                    onClick={() => toggleSection(section.title)}
                    className={cn(
                      'flex w-full items-center justify-between',
                      'rounded-carbon px-carbon-03 py-carbon-02',
                      'text-carbon-xs font-semibold text-carbon-gray-10',
                      'transition-colors duration-carbon-01',
                      'hover:bg-carbon-gray-70',
                      'focus:outline-none focus:ring-2 focus:ring-carbon-blue-50 focus:ring-inset'
                    )}
                  >
                    <div className="flex items-center gap-carbon-02">
                      <SectionIcon className="h-4 w-4 text-accent-cyan" />
                      <span>{section.title}</span>
                    </div>
                    <ChevronRight 
                      className={cn(
                        'h-4 w-4 text-carbon-gray-30 transition-transform duration-carbon-01',
                        isExpanded && 'rotate-90'
                      )} 
                    />
                  </button>
                  
                  {/* Section items */}
                  {isExpanded && (
                    <div className="pb-carbon-02">
                      {section.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className={cn(
                            'flex items-center gap-carbon-02',
                            'px-carbon-03 py-carbon-02 pl-9',
                            'text-carbon-xs transition-colors duration-carbon-01',
                            'border-l-2 border-transparent',
                            isActive(item.href)
                              ? 'border-l-accent-cyan bg-accent-cyan/10 text-accent-cyan'
                              : 'text-carbon-gray-30 hover:text-carbon-gray-10 hover:bg-carbon-gray-70'
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
          <div className="mt-carbon-05 space-y-carbon-02 border-t border-carbon-gray-80 pt-carbon-04">
            <Link
              href="/docs/v3.0/changelog"
              className={cn(
                'flex items-center gap-carbon-02 rounded-carbon',
                'px-carbon-03 py-carbon-02',
                'text-carbon-xs text-carbon-gray-30',
                'transition-colors duration-carbon-01',
                'hover:bg-carbon-gray-80 hover:text-carbon-gray-10'
              )}
            >
              <FileCode2 className="h-4 w-4" />
              Changelog
            </Link>
            <Link
              href="/docs/v3.0/faq"
              className={cn(
                'flex items-center gap-carbon-02 rounded-carbon',
                'px-carbon-03 py-carbon-02',
                'text-carbon-xs text-carbon-gray-30',
                'transition-colors duration-carbon-01',
                'hover:bg-carbon-gray-80 hover:text-carbon-gray-10'
              )}
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
