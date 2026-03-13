'use client';

import { useState, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { CodeBlock } from '@/components/ui/code-block';
import { Play, Copy, RefreshCw, Check } from 'lucide-react';

interface DemoContainerProps {
  title: string;
  description?: string;
  code: string;
  language?: string;
  onRun?: () => void;
  isRunning?: boolean;
  output?: ReactNode;
  children?: ReactNode;
  className?: string;
}

export function DemoContainer({
  title,
  description,
  code,
  language = 'fortran',
  onRun,
  isRunning = false,
  output,
  children,
  className,
}: DemoContainerProps) {
  const [copied, setCopied] = useState(false);
  const [showOutput, setShowOutput] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRun = () => {
    if (onRun) {
      onRun();
    }
    setShowOutput(true);
  };

  return (
    <div className={cn('rounded-xl border border-border-dark bg-surface-dark-secondary overflow-hidden', className)}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border-dark bg-surface-dark-tertiary px-6 py-4">
        <div>
          <h3 className="text-lg font-semibold text-content-dark-primary">{title}</h3>
          {description && (
            <p className="text-sm text-content-dark-secondary mt-1">{description}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleCopy}
            className="gap-2"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-brand-green" />
                <span className="text-brand-green">Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span>Copy</span>
              </>
            )}
          </Button>
          {onRun && (
            <Button
              variant="primary"
              size="sm"
              onClick={handleRun}
              loading={isRunning}
              className="gap-2"
            >
              <Play className="h-4 w-4" />
              <span>Run</span>
            </Button>
          )}
        </div>
      </div>

      {/* Code Editor */}
      <div className="border-b border-border-dark">
        <CodeBlock
          code={code}
          language={language}
          showLineNumbers={true}
          copyable={false}
        />
      </div>

      {/* Output Area */}
      {(showOutput || output) && (
        <div className="bg-surface-dark-overlay">
          <div className="flex items-center gap-2 border-b border-border-dark px-4 py-2">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-red-500/70" />
              <div className="h-3 w-3 rounded-full bg-amber-500/70" />
              <div className="h-3 w-3 rounded-full bg-green-500/70" />
            </div>
            <span className="text-xs text-content-dark-tertiary ml-2">Output</span>
          </div>
          <div className="p-4">
            {output || children}
          </div>
        </div>
      )}
    </div>
  );
}
