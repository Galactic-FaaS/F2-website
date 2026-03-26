'use client';

import { cn } from '@/lib/utils';
import { CodeBlock, InlineCode } from '@/components/ui/code-block';
import { 
  Info, 
  AlertTriangle, 
  AlertCircle, 
  Lightbulb, 
  CheckCircle2,
  Link as LinkIcon
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

// Callout component for styled boxes - Carbon styling
function Callout({ type, title, children }: CalloutProps) {
  const styles = {
    info: {
      bg: 'bg-carbon-blue-90/30',
      border: 'border-carbon-blue-50',
      icon: Info,
      iconColor: 'text-carbon-blue-40',
      titleColor: 'text-carbon-blue-30',
    },
    warning: {
      bg: 'bg-carbon-yellow-10/10',
      border: 'border-carbon-yellow-30',
      icon: AlertTriangle,
      iconColor: 'text-carbon-yellow-30',
      titleColor: 'text-carbon-yellow-20',
    },
    error: {
      bg: 'bg-carbon-red-90/30',
      border: 'border-carbon-red-50',
      icon: AlertCircle,
      iconColor: 'text-carbon-red-40',
      titleColor: 'text-carbon-red-30',
    },
    tip: {
      bg: 'bg-accent-teal/10',
      border: 'border-accent-teal',
      icon: Lightbulb,
      iconColor: 'text-accent-teal',
      titleColor: 'text-accent-teal',
    },
    success: {
      bg: 'bg-carbon-green-90/30',
      border: 'border-carbon-green-50',
      icon: CheckCircle2,
      iconColor: 'text-carbon-green-40',
      titleColor: 'text-carbon-green-30',
    },
  };
  
  const style = styles[type];
  const Icon = style.icon;
  
  return (
    <div className={cn(
      'my-carbon-04 rounded-carbon border-l-4 p-carbon-04',
      style.bg, style.border
    )}>
      <div className="flex items-start gap-carbon-03">
        <Icon className={cn('mt-0.5 h-5 w-5 flex-shrink-0', style.iconColor)} />
        <div className="flex-1">
          {title && (
            <h4 className={cn('mb-carbon-01 font-semibold text-carbon-sm', style.titleColor)}>
              {title}
            </h4>
          )}
          <div className="text-carbon-gray-30 text-carbon-sm leading-carbon-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

// API signature component - Carbon styling
interface ApiSignatureProps {
  name: string;
  signature: string;
  description?: string;
  returns?: string;
}

function ApiSignature({ name, signature, description, returns }: ApiSignatureProps) {
  return (
    <div className="my-carbon-04 rounded-carbon border border-carbon-gray-80 bg-carbon-gray-90">
      <div className={cn(
        'flex items-center gap-carbon-02',
        'border-b border-carbon-gray-80 bg-carbon-gray-80',
        'px-carbon-04 py-carbon-02'
      )}>
        <span className="font-mono text-carbon-sm text-accent-purple">{name}</span>
      </div>
      <div className="p-carbon-04">
        <code className="block font-mono text-carbon-sm text-carbon-gray-10">{signature}</code>
        {description && (
          <p className="mt-carbon-02 text-carbon-sm text-carbon-gray-30">{description}</p>
        )}
        {returns && (
          <p className="mt-carbon-01 text-carbon-sm text-carbon-gray-50">
            <span className="font-medium">Returns:</span> {returns}
          </p>
        )}
      </div>
    </div>
  );
}

// Example component for code examples - Carbon terminal styling
interface ExampleProps {
  title?: string;
  code: string;
  language?: string;
  filename?: string;
  output?: string;
}

function Example({ title, code, language = 'fortran', filename, output }: ExampleProps) {
  return (
    <div className="my-carbon-05 rounded-carbon border border-carbon-gray-80 overflow-hidden">
      {title && (
        <div className="border-b border-carbon-gray-80 bg-carbon-gray-80 px-carbon-04 py-carbon-02">
          <span className="text-carbon-sm font-medium text-carbon-gray-30">{title}</span>
        </div>
      )}
      <CodeBlock code={code} language={language} filename={filename} />
      {output && (
        <div className="border-t border-carbon-gray-80 bg-carbon-gray-100 px-carbon-04 py-carbon-03">
          <div className="text-carbon-xs font-semibold uppercase text-carbon-gray-50 mb-carbon-01">
            Output
          </div>
          <pre className="text-carbon-sm font-mono text-accent-green">{output}</pre>
        </div>
      )}
    </div>
  );
}

// Section heading component with anchor link - Carbon styling
interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  id?: string;
}

function Heading({ level, children, id }: HeadingProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  
  const sizes = {
    1: 'text-carbon-h1 font-bold text-carbon-gray-10 mt-carbon-06 mb-carbon-04',
    2: 'text-carbon-h2 font-semibold text-carbon-gray-10 mt-carbon-06 mb-carbon-03',
    3: 'text-carbon-h3 font-semibold text-carbon-gray-10 mt-carbon-05 mb-carbon-02',
    4: 'text-carbon-h4 font-medium text-carbon-gray-10 mt-carbon-04 mb-carbon-02',
    5: 'text-carbon-h5 font-medium text-carbon-gray-10 mt-carbon-03 mb-carbon-02',
    6: 'text-carbon-h6 font-medium text-carbon-gray-30 mt-carbon-03 mb-carbon-02',
  };
  
  return (
    <Tag id={id} className={cn(sizes[level], 'group scroll-mt-16 relative')}>
      {id && (
        <a
          href={`#${id}`}
          className="absolute -left-6 top-0 hidden text-carbon-gray-50 hover:text-accent-cyan group-hover:flex items-center h-full"
          aria-label={`Link to ${id}`}
        >
          <LinkIcon className="h-4 w-4" />
        </a>
      )}
      {children}
    </Tag>
  );
}

// Main content wrapper - Carbon prose styling
export function DocContent({ children, className }: DocContentProps) {
  return (
    <div className={cn('carbon-prose max-w-none', className)}>
      {/* Carbon prose styles */}
      <style jsx global>{`
        .carbon-prose {
          font-family: 'IBM Plex Sans', system-ui, sans-serif;
          color: #C6C6C6; /* carbon-gray-30 */
          line-height: 1.5;
        }
        
        /* Headings */
        .carbon-prose h1 {
          font-family: 'IBM Plex Sans', system-ui, sans-serif;
          font-weight: 700;
          font-size: 2.5rem;
          line-height: 1.2;
          color: #F4F4F4; /* carbon-gray-10 */
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        
        .carbon-prose h2 {
          font-family: 'IBM Plex Sans', system-ui, sans-serif;
          font-weight: 600;
          font-size: 1.875rem;
          line-height: 1.25;
          color: #F4F4F4;
          margin-top: 2rem;
          margin-bottom: 0.75rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid #393939; /* carbon-gray-80 */
        }
        
        .carbon-prose h3 {
          font-family: 'IBM Plex Sans', system-ui, sans-serif;
          font-weight: 600;
          font-size: 1.5rem;
          line-height: 1.3;
          color: #F4F4F4;
          margin-top: 1.5rem;
          margin-bottom: 0.5rem;
        }
        
        .carbon-prose h4 {
          font-family: 'IBM Plex Sans', system-ui, sans-serif;
          font-weight: 500;
          font-size: 1.25rem;
          line-height: 1.4;
          color: #F4F4F4;
          margin-top: 1rem;
          margin-bottom: 0.5rem;
        }
        
        .carbon-prose h5, .carbon-prose h6 {
          font-family: 'IBM Plex Sans', system-ui, sans-serif;
          font-weight: 500;
          font-size: 1rem;
          color: #F4F4F4;
          margin-top: 0.75rem;
          margin-bottom: 0.5rem;
        }
        
        /* Links */
        .carbon-prose a {
          color: #00D4FF; /* accent-cyan */
          text-decoration: none;
          transition: color 70ms ease;
        }
        
        .carbon-prose a:hover {
          color: #33DDFF;
          text-decoration: underline;
        }
        
        /* Inline code */
        .carbon-prose code:not(pre code) {
          background: #262626; /* carbon-gray-90 */
          color: #00D4FF;
          padding: 0.125rem 0.375rem;
          border-radius: 0.125rem;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.875em;
        }
        
        /* Code blocks */
        .carbon-prose pre {
          background: #161616; /* carbon-gray-100 */
          border: 1px solid #393939; /* carbon-gray-80 */
          border-radius: 0.25rem;
          padding: 1rem;
          overflow-x: auto;
        }
        
        .carbon-prose pre code {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.875rem;
          color: #F4F4F4;
        }
        
        /* Lists */
        .carbon-prose ul, .carbon-prose ol {
          margin-left: 1.5rem;
          margin-top: 0.5rem;
          margin-bottom: 0.5rem;
        }
        
        .carbon-prose li {
          margin: 0.375rem 0;
        }
        
        .carbon-prose li::marker {
          color: #00D4FF;
        }
        
        /* Blockquotes */
        .carbon-prose blockquote {
          border-left: 4px solid #00D4FF;
          padding-left: 1rem;
          margin: 1rem 0;
          color: #8D8D8D; /* carbon-gray-50 */
          font-style: italic;
        }
        
        /* Tables - Carbon data table styling */
        .carbon-prose table {
          width: 100%;
          border-collapse: collapse;
          margin: 1rem 0;
        }
        
        .carbon-prose th {
          background: #262626; /* carbon-gray-90 */
          font-weight: 600;
          text-align: left;
          padding: 0.75rem 1rem;
          border-bottom: 2px solid #393939;
          color: #F4F4F4;
        }
        
        .carbon-prose td {
          padding: 0.75rem 1rem;
          border-bottom: 1px solid #393939;
          color: #C6C6C6;
        }
        
        .carbon-prose tr:hover td {
          background: #262626;
        }
        
        /* Horizontal rule */
        .carbon-prose hr {
          border: none;
          border-top: 1px solid #393939;
          margin: 2rem 0;
        }
        
        /* Paragraphs */
        .carbon-prose p {
          margin: 0.75rem 0;
        }
        
        /* Strong and emphasis */
        .carbon-prose strong {
          color: #F4F4F4;
          font-weight: 600;
        }
        
        .carbon-prose em {
          font-style: italic;
        }
        
        /* Images */
        .carbon-prose img {
          border-radius: 0.25rem;
          margin: 1rem 0;
        }
      `}</style>
      {children}
    </div>
  );
}

export { Callout, ApiSignature, Example, Heading };
export type { CalloutProps, ApiSignatureProps, ExampleProps, HeadingProps };
