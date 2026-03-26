'use client';

import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Terminal,
  AlertCircle,
  BarChart3,
  Copy,
  Trash2,
  Check,
  Loader2,
  Clock,
} from 'lucide-react';

interface ExecutionResult {
  stdout: string;
  stderr: string;
  exitCode: number;
  executionTime: number;
  visualizations?: VisualizationData[];
}

interface VisualizationData {
  type: 'table' | 'chart' | 'graph';
  title: string;
  data: Record<string, unknown>;
}

interface OutputPanelProps {
  result: ExecutionResult | null;
  isRunning: boolean;
  onClear: () => void;
}

type OutputTab = 'stdout' | 'stderr' | 'visualizations';

export function OutputPanel({ result, isRunning, onClear }: OutputPanelProps) {
  const [activeTab, setActiveTab] = useState<OutputTab>('stdout');
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    if (!result) return;
    
    const textToCopy = activeTab === 'stderr' ? result.stderr : result.stdout;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [result, activeTab]);

  const tabs = [
    { id: 'stdout' as const, label: 'Output', icon: Terminal },
    { id: 'stderr' as const, label: 'Errors', icon: AlertCircle },
    ...(result?.visualizations && result.visualizations.length > 0
      ? [{ id: 'visualizations' as const, label: 'Visualizations', icon: BarChart3 }]
      : []),
  ];

  const hasErrors = result?.stderr && result.stderr.trim().length > 0;
  const hasOutput = result?.stdout && result.stdout.trim().length > 0;

  return (
    <div className="flex h-full flex-col bg-carbon-gray-100 rounded-lg border border-carbon-gray-80 overflow-hidden">
      {/* Tab Bar */}
      <div className="flex items-center justify-between border-b border-carbon-gray-80 bg-carbon-gray-90 px-2">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors relative',
                activeTab === tab.id
                  ? 'text-carbon-blue-40'
                  : 'text-carbon-gray-40 hover:text-carbon-gray-20'
              )}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
              {tab.id === 'stderr' && hasErrors && (
                <span className="ml-1 rounded-full bg-accent-red/20 px-1.5 py-0.5 text-xs text-accent-red">
                  !
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1">
          {result && activeTab !== 'visualizations' && (
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={handleCopy}
              title="Copy output"
            >
              {copied ? (
                <Check className="h-4 w-4 text-accent-green" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onClear}
            title="Clear output"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto p-4 font-mono text-sm">
        {isRunning ? (
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-accent-cyan" />
            <p className="text-carbon-gray-40">Executing code...</p>
          </div>
        ) : !result ? (
          <div className="flex flex-col items-center justify-center h-full gap-4 text-carbon-gray-50">
            <Terminal className="h-12 w-12 text-carbon-gray-60" />
            <p>Run your code to see the output here</p>
            <p className="text-sm text-carbon-gray-50">
              Press <kbd className="px-1.5 py-0.5 bg-carbon-gray-80 rounded text-xs">Ctrl</kbd> +{' '}
              <kbd className="px-1.5 py-0.5 bg-carbon-gray-80 rounded text-xs">Enter</kbd> to run
            </p>
          </div>
        ) : (
          <>
            {/* Execution Info */}
            <div className="flex items-center gap-4 mb-4 pb-4 border-b border-carbon-gray-80">
              <div className="flex items-center gap-2">
                {result.exitCode === 0 ? (
                  <Check className="h-4 w-4 text-accent-green" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-accent-red" />
                )}
                <span
                  className={cn(
                    'text-sm',
                    result.exitCode === 0 ? 'text-accent-green' : 'text-accent-red'
                  )}
                >
                  Exit code: {result.exitCode}
                </span>
              </div>
              <div className="flex items-center gap-2 text-carbon-gray-40">
                <Clock className="h-4 w-4" />
                <span className="text-sm">{result.executionTime.toFixed(2)}ms</span>
              </div>
            </div>

            {/* Tab Content */}
            {activeTab === 'stdout' && (
              <pre
                className={cn(
                  'whitespace-pre-wrap',
                  !hasOutput && 'text-carbon-gray-50 italic'
                )}
              >
                {hasOutput ? result.stdout : 'No output'}
              </pre>
            )}

            {activeTab === 'stderr' && (
              <pre
                className={cn(
                  'whitespace-pre-wrap text-accent-red',
                  !hasErrors && 'text-carbon-gray-50 italic'
                )}
              >
                {hasErrors ? result.stderr : 'No errors'}
              </pre>
            )}

            {activeTab === 'visualizations' && result.visualizations && (
              <div className="space-y-4">
                {result.visualizations.map((viz, index) => (
                  <div
                    key={index}
                    className="rounded-lg border border-carbon-gray-80 bg-carbon-gray-90 p-4"
                  >
                    <h4 className="mb-3 font-semibold text-carbon-gray-10">
                      {viz.title}
                    </h4>
                    {viz.type === 'table' && (
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-carbon-gray-80">
                              {Object.keys(viz.data).map((key) => (
                                <th
                                  key={key}
                                  className="px-3 py-2 text-left text-carbon-gray-40"
                                >
                                  {key}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {Array.isArray(viz.data.values) ? (
                              (viz.data.values as unknown[]).map((row: unknown, i: number) => (
                                <tr
                                  key={i}
                                  className="border-b border-carbon-gray-80 hover:bg-carbon-gray-80"
                                >
                                  {Object.values(row as object).map((val: unknown, j: number) => (
                                    <td key={j} className="px-3 py-2">
                                      {String(val)}
                                    </td>
                                  ))}
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td
                                  colSpan={Object.keys(viz.data).length}
                                  className="px-3 py-2 text-carbon-gray-50"
                                >
                                  No data available
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    )}
                    {viz.type === 'chart' && (
                      <div className="flex items-center justify-center p-8 text-carbon-gray-50">
                        Chart visualization placeholder
                      </div>
                    )}
                    {viz.type === 'graph' && (
                      <div className="flex items-center justify-center p-8 text-carbon-gray-50">
                        Graph visualization placeholder
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default OutputPanel;