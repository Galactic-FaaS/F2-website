'use client';

import { cn } from '@/lib/utils';
import { CodeBlock, InlineCode } from '@/components/ui/code-block';
import { 
  Info, 
  AlertTriangle, 
  AlertCircle, 
  Lightbulb, 
  CheckCircle2,
  XCircle
} from 'lucide-react';

type CalloutType = 'info' | 'warning' | 'error' | 'tip' | 'success';

interface CalloutProps {
  type: CalloutType;
  title?: string;
  children: React.ReactNode;
}

interface DocContentProps {
  children: React.ReactNode;
  className?: string;
}

// Callout component for styled boxes
function Callout({ type, title, children }: CalloutProps) {
  const styles = {
    info: {
      bg: 'bg-brand-cyan/10',
      border: 'border-brand-cyan/30',
      icon: Info,
      iconColor: 'text-brand-cyan',
      titleColor: 'text-brand-cyan',
    },
    warning: {
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/30',
      icon: AlertTriangle,
      iconColor: 'text-amber-500',
      titleColor: 'text-amber-500',
    },
    error: {
      bg: 'bg-red-500/10',
      border: 'border-red-500/30',
      icon: AlertCircle,
      iconColor: 'text-red-500',
      titleColor: 'text-red-500',
    },
    tip: {
      bg: 'bg-brand-green/10',
      border: 'border-brand-green/30',
      icon: Lightbulb,
      iconColor: 'text-brand-green',
      titleColor: 'text-brand-green',
    },
    success: {
      bg: 'bg-brand-green/10',
      border: 'border-brand-green/30',
      icon: CheckCircle2,
      iconColor: 'text-brand-green',
      titleColor: 'text-brand-green',
    },
  };
  
  const style = styles[type];
  const Icon = style.icon;
  
  return (
    <div className={cn('my-4 rounded-lg border p-4', style.bg, style.border)}>
      <div className="flex items-start gap-3">
        <Icon className={cn('mt-0.5 h-5 w-5 flex-shrink-0', style.iconColor)} />
        <div className="flex-1">
          {title && (
            <h4 className={cn('mb-1 font-semibold', style.titleColor)}>{title}</h4>
          )}
          <div className="text-content-dark-secondary text-sm leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

// API signature component
interface ApiSignatureProps {
  name: string;
  signature: string;
  description?: string;
  returns?: string;
}

function ApiSignature({ name, signature, description, returns }: ApiSignatureProps) {
  return (
    <div className="my-4 rounded-lg border border-border-dark bg-surface-dark-secondary">
      <div className="flex items-center gap-2 border-b border-border-dark bg-surface-dark-tertiary px-4 py-2">
        <span className="font-mono text-sm text-brand-purple">{name}</span>
      </div>
      <div className="p-4">
        <code className="block font-mono text-sm text-content-dark-primary">{signature}</code>
        {description && (
          <p className="mt-2 text-sm text-content-dark-secondary">{description}</p>
        )}
        {returns && (
          <p className="mt-1 text-sm text-content-dark-tertiary">
            <span className="font-medium">Returns:</span> {returns}
          </p>
        )}
      </div>
    </div>
  );
}

// Example component for code examples
interface ExampleProps {
  title?: string;
  code: string;
  language?: string;
  filename?: string;
  output?: string;
}

function Example({ title, code, language = 'fortran', filename, output }: ExampleProps) {
  return (
    <div className="my-6 rounded-lg border border-border-dark overflow-hidden">
      {title && (
        <div className="border-b border-border-dark bg-surface-dark-tertiary px-4 py-2">
          <span className="text-sm font-medium text-content-dark-secondary">{title}</span>
        </div>
      )}
      <CodeBlock code={code} language={language} filename={filename} />
      {output && (
        <div className="border-t border-border-dark bg-surface-dark-primary px-4 py-3">
          <div className="text-xs font-semibold uppercase text-content-dark-tertiary mb-1">Output</div>
          <pre className="text-sm font-mono text-brand-green">{output}</pre>
        </div>
      )}
    </div>
  );
}

// Section heading component with anchor link
interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  id?: string;
}

function Heading({ level, children, id }: HeadingProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  const sizes = {
    1: 'text-h1 font-heading font-bold text-content-dark-primary mt-8 mb-4',
    2: 'text-h2 font-heading font-semibold text-content-dark-primary mt-8 mb-3',
    3: 'text-h3 font-heading font-semibold text-content-dark-primary mt-6 mb-2',
    4: 'text-h4 font-heading font-medium text-content-dark-primary mt-4 mb-2',
    5: 'text-h5 font-heading font-medium text-content-dark-primary mt-3 mb-2',
    6: 'text-h6 font-heading font-medium text-content-dark-secondary mt-3 mb-2',
  };
  
  return (
    <Tag id={id} className={sizes[level]}>
      {children}
    </Tag>
  );
}

// Main content wrapper
export function DocContent({ children, className }: DocContentProps) {
  return (
    <div className={cn('prose prose-invert max-w-none', className)}>
      {/* Style the prose for dark theme */}
      <style jsx global>{`
        .prose-invert {
          --tw-prose-body: #94A3B8;
          --tw-prose-headings: #F8FAFC;
          --tw-prose-links: #00D4FF;
          --tw-prose-bold: #F8FAFC;
          --tw-prose-code: #00D4FF;
          --tw-prose-pre-bg: #111827;
          --tw-prose-pre-code: #F8FAFC;
        }
        
        .prose h1 {
          font-family: 'Space Grotesk', system-ui, sans-serif;
          font-weight: 700;
        }
        
        .prose h2, .prose h3, .prose h4 {
          font-family: 'Space Grotesk', system-ui, sans-serif;
          font-weight: 600;
        }
        
        .prose a {
          color: #00D4FF;
          text-decoration: none;
        }
        
        .prose a:hover {
          text-decoration: underline;
        }
        
        .prose code:not(pre code) {
          background: #1E293B;
          padding: 0.125rem 0.375rem;
          border-radius: 0.25rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.875em;
        }
        
        .prose pre {
          background: #111827;
          border: 1px solid #334155;
          border-radius: 0.5rem;
        }
        
        .prose ul, .prose ol {
          margin-left: 1.5rem;
        }
        
        .prose li {
          margin: 0.5rem 0;
        }
        
        .prose blockquote {
          border-left: 4px solid #00D4FF;
          padding-left: 1rem;
          color: #64748B;
          font-style: italic;
        }
        
        .prose table {
          width: 100%;
          border-collapse: collapse;
        }
        
        .prose th, .prose td {
          padding: 0.75rem;
          border: 1px solid #334155;
          text-align: left;
        }
        
        .prose th {
          background: #1E293B;
          font-weight: 600;
        }
        
        .prose hr {
          border-color: #334155;
        }
      `}</style>
      {children}
    </div>
  );
}

export { Callout, ApiSignature, Example, Heading };
export type { CalloutProps, ApiSignatureProps, ExampleProps, HeadingProps };