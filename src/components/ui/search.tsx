'use client';

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, FileText, Book, Code, ArrowRight, Keyboard } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { SearchResult } from '@/lib/search-index';

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
        <mark key={i} className="bg-brand-cyan/30 text-brand-cyan rounded px-0.5">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-deep-space/80 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl mx-4 animate-in fade-in zoom-in-95 duration-200">
        <div className="bg-surface-dark border border-border-dark rounded-xl shadow-2xl overflow-hidden">
          {/* Search Input */}
          <div className="flex items-center border-b border-border-dark px-4">
            <Search className="h-5 w-5 text-content-dark-tertiary" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search documentation, blog posts, API..."
              className="flex-1 bg-transparent px-4 py-4 text-content-dark-primary placeholder:text-content-dark-tertiary focus:outline-none"
            />
            <div className="flex items-center gap-2">
              {isLoading && (
                <div className="h-4 w-4 border-2 border-brand-cyan border-t-transparent rounded-full animate-spin" />
              )}
              <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border border-border-dark bg-surface-dark-tertiary px-1.5 text-xs text-content-dark-tertiary">
                ESC
              </kbd>
              <button
                onClick={() => onOpenChange(false)}
                className="p-1 text-content-dark-tertiary hover:text-content-dark-primary"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Results */}
          <div ref={resultsRef} className="max-h-[400px] overflow-y-auto">
            {results.length > 0 ? (
              <div className="py-2">
                {results.map((result, index) => (
                  <button
                    key={`${result.url}-${index}`}
                    onClick={() => {
                      router.push(result.url);
                      onOpenChange(false);
                    }}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={cn(
                      'w-full flex items-start gap-3 px-4 py-3 text-left transition-colors',
                      index === selectedIndex
                        ? 'bg-brand-cyan/10 text-content-dark-primary'
                        : 'text-content-dark-secondary hover:bg-surface-dark-tertiary'
                    )}
                  >
                    <div
                      className={cn(
                        'mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg',
                        index === selectedIndex
                          ? 'bg-brand-cyan/20 text-brand-cyan'
                          : 'bg-surface-dark-tertiary text-content-dark-tertiary'
                      )}
                    >
                      {getTypeIcon(result.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium truncate">
                          {highlightMatch(result.title, query)}
                        </span>
                        <span className="shrink-0 text-xs text-content-dark-tertiary">
                          {getTypeLabel(result.type)}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-content-dark-tertiary line-clamp-2">
                        {highlightMatch(result.content, query)}
                      </p>
                    </div>
                    {index === selectedIndex && (
                      <ArrowRight className="mt-1 h-4 w-4 text-brand-cyan" />
                    )}
                  </button>
                ))}
              </div>
            ) : query.trim() ? (
              <div className="py-12 text-center">
                <p className="text-content-dark-tertiary">No results found for "{query}"</p>
                <p className="mt-2 text-sm text-content-dark-tertiary">
                  Try different keywords or check your spelling
                </p>
              </div>
            ) : (
              <div className="py-8 px-4">
                <div className="flex items-center justify-center gap-2 text-sm text-content-dark-tertiary mb-4">
                  <Keyboard className="h-4 w-4" />
                  <span>Quick search tips</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="p-3 rounded-lg bg-surface-dark-tertiary">
                    <kbd className="font-mono text-brand-cyan">↑</kbd>
                    <kbd className="font-mono text-brand-cyan ml-1">↓</kbd>
                    <span className="ml-2 text-content-dark-tertiary">Navigate</span>
                  </div>
                  <div className="p-3 rounded-lg bg-surface-dark-tertiary">
                    <kbd className="font-mono text-brand-cyan">Enter</kbd>
                    <span className="ml-2 text-content-dark-tertiary">Select</span>
                  </div>
                  <div className="p-3 rounded-lg bg-surface-dark-tertiary">
                    <kbd className="font-mono text-brand-cyan">Esc</kbd>
                    <span className="ml-2 text-content-dark-tertiary">Close</span>
                  </div>
                  <div className="p-3 rounded-lg bg-surface-dark-tertiary">
                    <kbd className="font-mono text-brand-cyan">Cmd+K</kbd>
                    <span className="ml-2 text-content-dark-tertiary">Toggle</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-border-dark px-4 py-2 text-xs text-content-dark-tertiary">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="rounded border border-border-dark bg-surface-dark-tertiary px-1">↑</kbd>
                <kbd className="rounded border border-border-dark bg-surface-dark-tertiary px-1">↓</kbd>
                <span className="ml-1">Navigate</span>
              </span>
              <span className="flex items-center gap-1">
                <kbd className="rounded border border-border-dark bg-surface-dark-tertiary px-1.5">↵</kbd>
                <span className="ml-1">Open</span>
              </span>
            </div>
            <span>Fortran² Search</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Search trigger button for use in header
interface SearchTriggerProps {
  onClick: () => void;
}

export function SearchTrigger({ onClick }: SearchTriggerProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 rounded-lg border border-border-dark bg-surface-dark-secondary px-3 py-1.5 text-sm text-content-dark-tertiary hover:border-border-dark-emphasis hover:text-content-dark-secondary transition-colors"
    >
      <Search className="h-4 w-4" />
      <span className="hidden sm:inline">Search...</span>
      <kbd className="hidden md:inline-flex h-5 items-center gap-1 rounded border border-border-dark bg-surface-dark-tertiary px-1.5 text-xs">
        <span className="text-xs">⌘</span>K
      </kbd>
    </button>
  );
}
