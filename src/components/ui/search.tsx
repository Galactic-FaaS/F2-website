'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, FileText, Book, Code, ArrowRight, Keyboard } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SearchResult } from '@/lib/search-index';

/**
 * Carbon Design System Search Modal Component
 * 
 * Features:
 * - Overlay: Carbon gray-100/80 with backdrop blur
 * - Modal: Carbon gray-90 with glassmorphism effect
 * - Input: Carbon input styles with focus states
 * - Results: Hover states with Carbon gray-80
 * - Keyboard shortcuts: Carbon gray-80 background
 * 
 * Keyboard Navigation:
 * - ↑/↓: Navigate results
 * - Enter: Select result
 * - Escape: Close modal
 * - Cmd+K: Toggle modal
 */

interface SearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchModal({ open, onOpenChange }: SearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: query.trim() }),
        });
        const data = await response.json();
        setResults(data.results || []);
        setSelectedIndex(0);
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  // Focus input when modal opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery('');
      setResults([]);
    }
  }, [open]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((prev) => Math.max(prev - 1, 0));
          break;
        case 'Enter':
          e.preventDefault();
          if (results[selectedIndex]) {
            router.push(results[selectedIndex].url);
            onOpenChange(false);
          }
          break;
        case 'Escape':
          e.preventDefault();
          onOpenChange(false);
          break;
      }
    },
    [results, selectedIndex, router, onOpenChange]
  );

  // Scroll selected item into view
  useEffect(() => {
    const selectedElement = resultsRef.current?.children[selectedIndex] as HTMLElement;
    selectedElement?.scrollIntoView({ block: 'nearest' });
  }, [selectedIndex]);

  const getTypeIcon = (type: SearchResult['type']) => {
    switch (type) {
      case 'doc':
        return <Book className="h-4 w-4" />;
      case 'blog':
        return <FileText className="h-4 w-4" />;
      case 'api':
        return <Code className="h-4 w-4" />;
      case 'tutorial':
        return <ArrowRight className="h-4 w-4" />;
    }
  };

  const getTypeLabel = (type: SearchResult['type']) => {
    switch (type) {
      case 'doc':
        return 'Documentation';
      case 'blog':
        return 'Blog';
      case 'api':
        return 'API Reference';
      case 'tutorial':
        return 'Tutorial';
    }
  };

  const highlightMatch = (text: string, query: string) => {
    if (!query.trim()) return text;
    const regex = new RegExp(`(${query.trim()})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="bg-carbon-blue-60/30 text-carbon-blue-30 rounded-carbon px-0.5">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] animate-fade-in">
      {/* Backdrop - Carbon overlay with blur */}
      <div
        className="absolute inset-0 bg-carbon-gray-100/80 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
        aria-hidden="true"
      />

      {/* Modal - Carbon glassmorphism style */}
      <div className="relative w-full max-w-2xl mx-carbon-04 animate-slide-up">
        <div 
          className={cn(
            'bg-carbon-gray-90/95 backdrop-blur-xl',
            'border border-carbon-gray-70',
            'rounded-carbon-xl',
            'shadow-2xl shadow-carbon-gray-100/20',
            'overflow-hidden'
          )}
          role="dialog"
          aria-modal="true"
          aria-label="Search"
        >
          {/* Search Input */}
          <div className="flex items-center border-b border-carbon-gray-70 px-carbon-04">
            <Search className="h-5 w-5 text-carbon-gray-50" aria-hidden="true" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search documentation, blog posts, API..."
              className={cn(
                'flex-1 bg-transparent',
                'px-carbon-04 py-carbon-04',
                'text-carbon-gray-10 text-carbon-base',
                'placeholder:text-carbon-gray-50',
                'focus:outline-none'
              )}
              aria-label="Search"
              aria-autocomplete="list"
              aria-controls="search-results"
              aria-activedescendant={results[selectedIndex] ? `result-${selectedIndex}` : undefined}
            />
            <div className="flex items-center gap-carbon-02">
              {isLoading && (
                <div className="h-4 w-4 border-2 border-carbon-blue-50 border-t-transparent rounded-full animate-spin" />
              )}
              <kbd 
                className={cn(
                  'hidden sm:inline-flex h-5 items-center',
                  'rounded-carbon px-carbon-02',
                  'bg-carbon-gray-80 text-carbon-xs text-carbon-gray-30',
                  'border border-carbon-gray-70'
                )}
              >
                ESC
              </kbd>
              <button
                onClick={() => onOpenChange(false)}
                className={cn(
                  'p-carbon-01 rounded-carbon',
                  'text-carbon-gray-50',
                  'hover:bg-carbon-gray-80 hover:text-carbon-gray-10',
                  'transition-colors duration-carbon-fast',
                  'focus:outline-none focus:ring-1 focus:ring-carbon-blue-50'
                )}
                aria-label="Close search"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Results */}
          <div 
            ref={resultsRef} 
            className="max-h-[400px] overflow-y-auto"
            id="search-results"
            role="listbox"
          >
            {results.length > 0 ? (
              <div className="py-carbon-02">
                {results.map((result, index) => (
                  <button
                    key={`${result.url}-${index}`}
                    id={`result-${index}`}
                    role="option"
                    aria-selected={index === selectedIndex}
                    onClick={() => {
                      router.push(result.url);
                      onOpenChange(false);
                    }}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={cn(
                      'w-full flex items-start gap-carbon-03',
                      'px-carbon-04 py-carbon-03',
                      'text-left transition-all duration-carbon-fast',
                      index === selectedIndex
                        ? 'bg-carbon-blue-60/10 text-carbon-gray-10'
                        : 'text-carbon-gray-30 hover:bg-carbon-gray-80'
                    )}
                  >
                    {/* Icon */}
                    <div
                      className={cn(
                        'mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center',
                        'rounded-carbon',
                        index === selectedIndex
                          ? 'bg-carbon-blue-60/20 text-carbon-blue-40'
                          : 'bg-carbon-gray-80 text-carbon-gray-50'
                      )}
                    >
                      {getTypeIcon(result.type)}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-carbon-02">
                        <span className="font-medium truncate text-carbon-sm">
                          {highlightMatch(result.title, query)}
                        </span>
                        <span className="shrink-0 text-carbon-xs text-carbon-gray-50">
                          {getTypeLabel(result.type)}
                        </span>
                      </div>
                      <p className="mt-carbon-01 text-carbon-xs text-carbon-gray-50 line-clamp-2">
                        {highlightMatch(result.content, query)}
                      </p>
                    </div>
                    
                    {/* Arrow indicator */}
                    {index === selectedIndex && (
                      <ArrowRight className="mt-1 h-4 w-4 text-carbon-blue-40" aria-hidden="true" />
                    )}
                  </button>
                ))}
              </div>
            ) : query.trim() ? (
              <div className="py-carbon-08 text-center">
                <p className="text-carbon-gray-30">No results found for "{query}"</p>
                <p className="mt-carbon-02 text-carbon-sm text-carbon-gray-50">
                  Try different keywords or check your spelling
                </p>
              </div>
            ) : (
              <div className="py-carbon-06 px-carbon-04">
                <div className="flex items-center justify-center gap-carbon-02 text-carbon-sm text-carbon-gray-50 mb-carbon-04">
                  <Keyboard className="h-4 w-4" aria-hidden="true" />
                  <span>Quick search tips</span>
                </div>
                <div className="grid grid-cols-2 gap-carbon-03 text-carbon-sm">
                  <div className="p-carbon-03 rounded-carbon bg-carbon-gray-80 border border-carbon-gray-70">
                    <kbd className="font-mono text-carbon-blue-40">↑</kbd>
                    <kbd className="font-mono text-carbon-blue-40 ml-carbon-01">↓</kbd>
                    <span className="ml-carbon-02 text-carbon-gray-30">Navigate</span>
                  </div>
                  <div className="p-carbon-03 rounded-carbon bg-carbon-gray-80 border border-carbon-gray-70">
                    <kbd className="font-mono text-carbon-blue-40">Enter</kbd>
                    <span className="ml-carbon-02 text-carbon-gray-30">Select</span>
                  </div>
                  <div className="p-carbon-03 rounded-carbon bg-carbon-gray-80 border border-carbon-gray-70">
                    <kbd className="font-mono text-carbon-blue-40">Esc</kbd>
                    <span className="ml-carbon-02 text-carbon-gray-30">Close</span>
                  </div>
                  <div className="p-carbon-03 rounded-carbon bg-carbon-gray-80 border border-carbon-gray-70">
                    <kbd className="font-mono text-carbon-blue-40">Cmd+K</kbd>
                    <span className="ml-carbon-02 text-carbon-gray-30">Toggle</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-carbon-gray-70 px-carbon-04 py-carbon-02 text-carbon-xs text-carbon-gray-50">
            <div className="flex items-center gap-carbon-04">
              <span className="flex items-center gap-carbon-01">
                <kbd className="rounded-carbon bg-carbon-gray-80 px-carbon-02 py-0.5 border border-carbon-gray-70">↑</kbd>
                <kbd className="rounded-carbon bg-carbon-gray-80 px-carbon-02 py-0.5 border border-carbon-gray-70">↓</kbd>
                <span className="ml-carbon-01">Navigate</span>
              </span>
              <span className="flex items-center gap-carbon-01">
                <kbd className="rounded-carbon bg-carbon-gray-80 px-carbon-02 py-0.5 border border-carbon-gray-70">↵</kbd>
                <span className="ml-carbon-01">Open</span>
              </span>
            </div>
            <span className="text-carbon-gray-30">Fortran² Search</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Search Trigger Button
 * For use in header to open search modal
 */
interface SearchTriggerProps {
  onClick: () => void;
}

export function SearchTrigger({ onClick }: SearchTriggerProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-carbon-02',
        'rounded-carbon',
        'border border-carbon-gray-50',
        'bg-carbon-gray-90',
        'px-carbon-03 py-carbon-02',
        'text-carbon-sm text-carbon-gray-50',
        'hover:border-carbon-gray-30 hover:text-carbon-gray-30',
        'transition-all duration-carbon-fast ease-carbon',
        'focus:outline-none focus:ring-1 focus:ring-carbon-blue-50'
      )}
      aria-label="Open search"
    >
      <Search className="h-4 w-4" aria-hidden="true" />
      <span className="hidden sm:inline">Search...</span>
      <kbd 
        className={cn(
          'hidden md:inline-flex h-5 items-center gap-0.5',
          'rounded-carbon px-carbon-02',
          'bg-carbon-gray-80 text-carbon-xs text-carbon-gray-30',
          'border border-carbon-gray-70'
        )}
      >
        <span>⌘</span>K
      </kbd>
    </button>
  );
}

/**
 * Command Palette Hook
 * For handling Cmd+K keyboard shortcut
 */
export function useCommandPalette(onToggle: () => void) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onToggle();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onToggle]);
}
