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
  
  // Scroll spy - highlight current section
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
      {/* Toggle for mobile - Carbon styling */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          'mb-carbon-03 flex w-full items-center justify-between',
          'rounded-carbon px-carbon-03 py-carbon-02',
          'text-carbon-xs font-semibold uppercase tracking-wider',
          'text-carbon-gray-30 hover:bg-carbon-gray-80 hover:text-carbon-gray-10',
          'transition-colors duration-carbon-01',
          'md:hidden'
        )}
      >
        <span>On This Page</span>
        <ChevronRight className={cn(
          'h-4 w-4 transition-transform duration-carbon-01',
          isExpanded && 'rotate-90'
        )} />
      </button>
      
      {/* TOC Content - Carbon styling */}
      <nav
        className={cn(
          'space-y-carbon-01 border-l border-carbon-gray-80',
          !isExpanded && 'hidden md:block'
        )}
      >
        {/* Title label */}
        <div className={cn(
          'mb-carbon-03 hidden px-carbon-03',
          'text-carbon-xs font-semibold uppercase tracking-wider text-carbon-gray-30',
          'md:block'
        )}>
          On This Page
        </div>
        
        {items.map((item) => {
          const isActive = activeId === item.id;
          // Indent based on heading level (h2 = 0, h3 = 1, h4 = 2)
          const indentLevel = item.level - 2;
          const paddingLeft = indentLevel * 12 + 12;
          
          return (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              className={cn(
                'flex w-full items-center gap-carbon-01 py-carbon-02',
                'text-left text-carbon-xs transition-colors duration-carbon-01',
                isActive
                  ? 'border-l-2 border-carbon-blue-40 text-carbon-blue-40 font-medium'
                  : 'border-l-2 border-transparent text-carbon-gray-30 hover:text-carbon-gray-10'
              )}
              style={{ paddingLeft: `${paddingLeft}px` }}
            >
              {isActive && (
                <span className="h-1.5 w-1.5 rounded-full bg-carbon-blue-40 flex-shrink-0" />
              )}
              <span className="truncate">{item.title}</span>
            </button>
          );
        })}
      </nav>
      
      {/* Back to top - Carbon styling */}
      {isExpanded && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={cn(
            'mt-carbon-04 hidden items-center gap-carbon-01',
            'text-carbon-xs text-carbon-gray-30',
            'hover:text-carbon-blue-40',
            'transition-colors duration-carbon-01',
            'md:flex'
          )}
        >
          <ChevronRight className="h-3 w-3 rotate-180" />
          Back to top
        </button>
      )}
    </div>
  );
}

export type { TOCItem };
