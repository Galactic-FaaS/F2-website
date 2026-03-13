'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

interface TOCItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  items: TOCItem[];
  className?: string;
}

export function TableOfContents({ items, className }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState(true);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-80px 0px -80% 0px',
        threshold: 0,
      }
    );
    
    // Observe all heading elements
    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });
    
    return () => observer.disconnect();
  }, [items]);
  
  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 96; // Account for fixed header
      const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };
  
  if (items.length === 0) {
    return null;
  }
  
  return (
    <div className={cn('relative', className)}>
      {/* Toggle for mobile */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="mb-3 flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold uppercase tracking-wider text-content-dark-tertiary hover:bg-surface-dark-tertiary md:hidden"
      >
        <span>On This Page</span>
        <ChevronRight className={cn('h-4 w-4 transition-transform', isExpanded && 'rotate-90')} />
      </button>
      
      {/* TOC Content */}
      <nav
        className={cn(
          'space-y-1 border-l border-border-dark',
          !isExpanded && 'hidden md:block'
        )}
      >
        <div className="mb-3 hidden px-3 text-xs font-semibold uppercase tracking-wider text-content-dark-tertiary md:block">
          On This Page
        </div>
        
        {items.map((item) => {
          const isActive = activeId === item.id;
          const paddingLeft = (item.level - 1) * 12 + 12;
          
          return (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              className={cn(
                'flex w-full items-center gap-1 py-1.5 text-left text-sm transition-colors',
                // Indent based on heading level
                `pl-[${paddingLeft}px]`,
                isActive
                  ? 'border-l-2 border-brand-cyan bg-brand-cyan/10 pl-[calc(${paddingLeft}px-2px)] text-brand-cyan'
                  : 'text-content-dark-tertiary hover:text-content-dark-secondary'
              )}
              style={{ paddingLeft: `${paddingLeft}px` }}
            >
              {isActive && (
                <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan" />
              )}
              <span className={cn(isActive && 'font-medium')}>{item.title}</span>
            </button>
          );
        })}
      </nav>
      
      {/* Back to top */}
      {isExpanded && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="mt-4 hidden items-center gap-1 text-xs text-content-dark-tertiary hover:text-brand-cyan md:flex"
        >
          <ChevronRight className="h-3 w-3 rotate-180" />
          Back to top
        </button>
      )}
    </div>
  );
}

export type { TOCItem };