'use client';

import { useState, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { Check, Copy } from 'lucide-react';

interface CodeBlockProps extends HTMLAttributes<HTMLPreElement> {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
  highlightLines?: number[];
  copyable?: boolean;
}

export function CodeBlock({
  code,
  language = 'fortran',
  filename,
  showLineNumbers = true,
  highlightLines = [],
  copyable = true,
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

  // Simple syntax highlighting (can be enhanced with Shiki or Prism)
  const highlightSyntax = (line: string, lineNum: number) => {
    // Keyword highlighting
    const keywords = /\b(program|module|use|implicit|type|integer|real|double|complex|character|logical|dimension|allocatable|allocate|deallocate|if|then|else|elseif|endif|do|enddo|while|select|case|end|function|subroutine|return|end|stop|print|write|read|format|open|close|parameter|data|common|equivalence|external|intent|optional|result|class|procedure|module|contains|end|program|subroutine|function|implementation|interface|abstract|final|sequence|bind|c|value|contiguous|pointer|target|private|public|protected|generic|operator|assignment)\b/gi;
    
    // Number highlighting
    const numbers = /\b(\d+\.?\d*([dDeE][+-]?\d+)?)\b/g;
    
    // String highlighting
    const strings = /(["'])(?:(?!\1)[^\\]|\\.)*\1/g;
    
    // Comment highlighting
    const comments = /(!.*$)/g;
    
    // Operator highlighting
    const operators = /(=>|==|\/=|<=|>=|\*\*|\/\/|&&|\|\|)/g;

    let highlighted = line
      .replace(keywords, '<span class="text-brand-cyan">$1</span>')
      .replace(numbers, '<span class="text-amber-500">$1</span>')
      .replace(strings, '<span class="text-brand-green">$&</span>')
      .replace(comments, '<span class="text-content-dark-tertiary italic">$&</span>')
      .replace(operators, '<span class="text-content-dark-primary">$1</span>');
    
    return highlighted;
  };

  return (
    <div className={cn('group relative overflow-hidden rounded-lg border border-border-dark bg-surface-dark-overlay', className)}>
      {/* Header */}
      {(filename || language) && (
        <div className="flex items-center justify-between border-b border-border-dark bg-surface-dark-secondary px-4 py-2">
          <div className="flex items-center gap-2">
            {filename && (
              <span className="text-sm font-medium text-content-dark-secondary">{filename}</span>
            )}
            {language && !filename && (
              <span className="text-xs uppercase text-content-dark-tertiary">{language}</span>
            )}
          </div>
          {copyable && (
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 rounded px-2 py-1 text-xs text-content-dark-tertiary hover:bg-surface-dark-tertiary hover:text-content-dark-secondary transition-colors"
              aria-label="Copy code"
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3 text-brand-green" />
                  <span className="text-brand-green">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  <span>Copy</span>
                </>
              )}
            </button>
          )}
        </div>
      )}

      {/* Code */}
      <pre
        className={cn(
          'overflow-x-auto p-4 font-code text-code leading-code',
          !filename && copyable && 'pt-4'
        )}
        {...props}
      >
        {showLineNumbers ? (
          <div className="flex">
            <div className="flex select-none flex-col pr-4 text-right text-content-dark-tertiary">
              {lines.map((_, i) => (
                <span key={i} className="leading-code">
                  {i + 1}
                </span>
              ))}
            </div>
            <div className="flex-1">
              {lines.map((line, i) => (
                <div
                  key={i}
                  className={cn(
                    'leading-code',
                    highlightLines.includes(i + 1) && 'bg-brand-cyan/10 -mx-4 px-4'
                  )}
                  dangerouslySetInnerHTML={{ __html: highlightSyntax(line, i + 1) || '&nbsp;' }}
                />
              ))}
            </div>
          </div>
        ) : (
          <code>{code}</code>
        )}
      </pre>
    </div>
  );
}

// Inline code component
interface InlineCodeProps extends HTMLAttributes<HTMLElement> {}

export function InlineCode({ className, ...props }: InlineCodeProps) {
  return (
    <code
      className={cn(
        'rounded bg-surface-dark-tertiary px-1.5 py-0.5 font-code text-code-sm text-brand-cyan',
        className
      )}
      {...props}
    />
  );
}
