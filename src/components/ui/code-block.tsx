'use client';

import { useState, HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Check, Copy, Terminal } from 'lucide-react';

/**
 * Carbon Design System Code Block Component
 * 
 * Features:
 * - Terminal-like styling with dark background
 * - Header bar with file name and language badge
 * - Copy button with hover effect
 * - Line numbers in gray
 * - Syntax highlighting for Fortran
 * 
 * Variants:
 * - default: Standard code block with gray-100 background
 * - terminal: Terminal style with #0b0b0b background
 * - inline: Inline code snippet
 */
const codeBlockVariants = cva(
  [
    'group relative overflow-hidden',
    'rounded-carbon-lg',
    'border',
    'transition-all duration-carbon-fast ease-carbon',
  ].join(' '),
  {
    variants: {
      variant: {
        // Default: Standard code block
        default: 'bg-carbon-gray-100 border-carbon-gray-80',
        
        // Terminal: Darker terminal-like style
        terminal: 'bg-[#0b0b0b] border-carbon-gray-80',
        
        // Ghost: No border, subtle background
        ghost: 'bg-carbon-gray-90 border-transparent',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

interface CodeBlockProps extends HTMLAttributes<HTMLPreElement>, VariantProps<typeof codeBlockVariants> {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
  highlightLines?: number[];
  copyable?: boolean;
  /** Show terminal prompt before each line */
  showPrompt?: boolean;
  /** Custom prompt character */
  prompt?: string;
}

export function CodeBlock({
  code,
  language = 'fortran',
  filename,
  showLineNumbers = true,
  highlightLines = [],
  copyable = true,
  variant = 'default',
  showPrompt = false,
  prompt = '$',
  className,
  ...props
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split('\n');

  // Carbon Design syntax highlighting colors
  const highlightSyntax = (line: string, lineNum: number) => {
    // Keywords - Carbon blue
    const keywords = /\b(program|module|use|implicit|type|integer|real|double|complex|character|logical|dimension|allocatable|allocate|deallocate|if|then|else|elseif|endif|do|enddo|while|select|case|end|function|subroutine|return|end|stop|print|write|read|format|open|close|parameter|data|common|equivalence|external|intent|optional|result|class|procedure|module|contains|end|program|subroutine|function|implementation|interface|abstract|final|sequence|bind|c|value|contiguous|pointer|target|private|public|protected|generic|operator|assignment)\b/gi;
    
    // Numbers - Carbon cyan
    const numbers = /\b(\d+\.?\d*([dDeE][+-]?\d+)?)\b/g;
    
    // Strings - Carbon green
    const strings = /(["'])(?:(?!\1)[^\\]|\\.)*\1/g;
    
    // Comments - Carbon gray
    const comments = /(!.*$)/g;
    
    // Operators - Carbon blue-40
    const operators = /(=>|==|\/=|<=|>=|\*\*|\/\/|&&|\|\|)/g;

    // Built-in functions - Accent purple
    const builtins = /\b(sin|cos|tan|sqrt|exp|log|abs|min|max|mod|floor|ceiling|real|int|present|allocated|associated|size|shape|lbound|ubound|merge|pack|unpack|spread|reshape|transpose|matmul|dot_product|sum|product|maxval|minval|maxloc|minloc|count|any|all|epsilon|huge|tiny|kind|precision|range|digits|bit_size|logical|char|achar|iachar|len|len_trim|trim|adjustl|adjustr|scan|verify|index|repeat|substring|new_line|cpu_time|system_clock|date_and_time|random_number|random_seed)\b/gi;

    let highlighted = line
      .replace(keywords, '<span class="text-carbon-blue-40">$1</span>')
      .replace(builtins, '<span class="text-accent-purple-30">$1</span>')
      .replace(numbers, '<span class="text-accent-cyan-40">$1</span>')
      .replace(strings, '<span class="text-status-success">$&</span>')
      .replace(comments, '<span class="text-carbon-gray-50 italic">$&</span>')
      .replace(operators, '<span class="text-carbon-blue-30">$1</span>');
    
    return highlighted;
  };

  return (
    <div className={cn(codeBlockVariants({ variant }), className)}>
      {/* Header bar with file name and language badge */}
      {(filename || language || copyable) && (
        <div className={cn(
          'flex items-center justify-between',
          'border-b px-carbon-04 py-carbon-02',
          variant === 'terminal' 
            ? 'border-carbon-gray-80 bg-carbon-gray-100/50' 
            : 'border-carbon-gray-80 bg-carbon-gray-90'
        )}>
          <div className="flex items-center gap-carbon-03">
            {/* Terminal icon for terminal variant */}
            {variant === 'terminal' && (
              <Terminal className="h-4 w-4 text-carbon-gray-50" />
            )}
            {/* File name */}
            {filename && (
              <span className="text-carbon-sm font-medium text-carbon-gray-30">
                {filename}
              </span>
            )}
            {/* Language badge */}
            {language && (
              <span className={cn(
                'rounded-carbon px-carbon-02 py-0.5',
                'text-carbon-xs font-medium uppercase tracking-wide',
                'bg-carbon-gray-80 text-carbon-gray-30'
              )}>
                {language}
              </span>
            )}
          </div>
          
          {/* Copy button */}
          {copyable && (
            <button
              onClick={handleCopy}
              className={cn(
                'flex items-center gap-carbon-01 rounded-carbon',
                'px-carbon-02 py-carbon-01',
                'text-carbon-xs text-carbon-gray-50',
                'hover:bg-carbon-gray-80 hover:text-carbon-gray-10',
                'transition-all duration-carbon-fast ease-carbon',
                'focus:outline-none focus:ring-1 focus:ring-carbon-blue-50'
              )}
              aria-label="Copy code"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-status-success" />
                  <span className="text-status-success">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          )}
        </div>
      )}

      {/* Code content */}
      <pre
        className={cn(
          'overflow-x-auto p-carbon-04',
          'font-mono text-carbon-sm leading-relaxed',
          'text-carbon-gray-10'
        )}
        {...props}
      >
        {showLineNumbers ? (
          <div className="flex">
            {/* Line numbers column */}
            <div 
              className="select-none pr-carbon-04 text-right"
              aria-hidden="true"
            >
              {lines.map((_, i) => (
                <div 
                  key={i} 
                  className={cn(
                    'text-carbon-gray-50',
                    highlightLines.includes(i + 1) && 'bg-carbon-blue-60/10'
                  )}
                >
                  {i + 1}
                </div>
              ))}
            </div>
            
            {/* Code column */}
            <div className="flex-1">
              {lines.map((line, i) => (
                <div
                  key={i}
                  className={cn(
                    highlightLines.includes(i + 1) && 'bg-carbon-blue-60/10 -mx-carbon-04 px-carbon-04'
                  )}
                >
                  {showPrompt && (
                    <span className="mr-carbon-02 text-accent-cyan-40">{prompt}</span>
                  )}
                  <span
                    dangerouslySetInnerHTML={{ __html: highlightSyntax(line, i + 1) || '&nbsp;' }}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <code>
            {showPrompt && lines.map((line, i) => (
              <div key={i}>
                <span className="mr-carbon-02 text-accent-cyan-40">{prompt}</span>
                <span dangerouslySetInnerHTML={{ __html: highlightSyntax(line, i + 1) }} />
              </div>
            ))}
            {!showPrompt && code}
          </code>
        )}
      </pre>
    </div>
  );
}

/**
 * Inline code component for inline code snippets
 */
interface InlineCodeProps extends HTMLAttributes<HTMLElement> {}

export function InlineCode({ className, ...props }: InlineCodeProps) {
  return (
    <code
      className={cn(
        'rounded-carbon',
        'bg-carbon-gray-80 px-carbon-02 py-0.5',
        'font-mono text-carbon-xs',
        'text-accent-cyan-40',
        'border border-carbon-gray-70',
        className
      )}
      {...props}
    />
  );
}

/**
 * Terminal Output Component
 * For displaying command output
 */
interface TerminalOutputProps extends HTMLAttributes<HTMLDivElement> {
  output: string;
  title?: string;
}

export function TerminalOutput({ output, title, className, ...props }: TerminalOutputProps) {
  return (
    <div
      className={cn(
        'rounded-carbon-lg',
        'bg-[#0b0b0b] border border-carbon-gray-80',
        className
      )}
      {...props}
    >
      {title && (
        <div className="border-b border-carbon-gray-80 px-carbon-04 py-carbon-02">
          <span className="text-carbon-xs text-carbon-gray-50">{title}</span>
        </div>
      )}
      <pre className="overflow-x-auto p-carbon-04 font-mono text-carbon-sm text-carbon-gray-30">
        {output}
      </pre>
    </div>
  );
}

/**
 * Keyboard Shortcut Component
 * For displaying keyboard shortcuts in documentation
 */
interface KeyboardShortcutProps extends HTMLAttributes<HTMLSpanElement> {
  keys: string[];
}

export function KeyboardShortcut({ keys, className, ...props }: KeyboardShortcutProps) {
  return (
    <span className={cn('inline-flex items-center gap-1', className)} {...props}>
      {keys.map((key, index) => (
        <kbd
          key={index}
          className={cn(
            'rounded-carbon',
            'bg-carbon-gray-80 px-carbon-02 py-0.5',
            'font-mono text-carbon-xs',
            'text-carbon-gray-30',
            'border border-carbon-gray-70',
            'shadow-sm'
          )}
        >
          {key}
        </kbd>
      ))}
    </span>
  );
}

export { codeBlockVariants };
