'use client';

import { useState, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { CodeBlock } from '@/components/ui/code-block';
import { Play, Copy, RefreshCw, Check, Terminal } from 'lucide-react';

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
    <div className={cn('rounded-xl border border-carbon-gray-80 bg-carbon-gray-90 overflow-hidden', className)}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-carbon-gray-70 bg-carbon-gray-80 px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-lg bg-carbon-blue-60/10 flex items-center justify-center">
            <Terminal className="h-5 w-5 text-carbon-blue-40" />
          </div>
          <div>
            <h3 className="text-carbon-lg font-semibold text-carbon-gray-10">{title}</h3>
            {description && (
              <p className="text-carbon-sm text-carbon-gray-40 mt-0.5">{description}</p>
            )}
          </div>
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
                <Check className="h-4 w-4 text-status-success" />
                <span className="text-status-success">Copied</span>
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
      <div className="border-b border-carbon-gray-70">
        <CodeBlock
          code={code}
          language={language}
          showLineNumbers={true}
          copyable={false}
        />
      </div>

      {/* Output Area */}
      {(showOutput || output) && (
        <div className="bg-carbon-gray-100">
          <div className="flex items-center gap-2 border-b border-carbon-gray-70 px-4 py-2">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-status-error/70" />
              <div className="h-3 w-3 rounded-full bg-status-warning/70" />
              <div className="h-3 w-3 rounded-full bg-status-success/70" />
            </div>
            <span className="text-carbon-xs text-carbon-gray-50 ml-2">Output</span>
          </div>
          <div className="p-4">
            {output || children}
          </div>
        </div>
      )}
    </div>
  );
}