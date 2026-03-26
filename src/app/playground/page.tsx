'use client';

import { useState, useCallback, useEffect } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { CodeEditor, OutputPanel, EditorToolbar } from '@/components/playground';
import { playgroundTemplates, PlaygroundTemplate } from '@/lib/playground-templates';
import { useTheme } from '@/components/providers/theme-provider';
import { Container } from '@/components/ui/container';
import Link from 'next/link';
import { ChevronRight, Code } from 'lucide-react';

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

const STORAGE_KEY = 'fortran2-playground-code';
const FONT_SIZE_KEY = 'fortran2-playground-font-size';

// Default code template
const DEFAULT_CODE = `! Fortran² Playground
! Write your code here and click Run or press Ctrl+Enter

program hello
  implicit none
  
  print *, "Hello from Fortran²!"
  print *, "Welcome to the interactive playground!"
  
end program hello`;

export default function PlaygroundPage() {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [result, setResult] = useState<ExecutionResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [fontSize, setFontSize] = useState(14);
  const [editorKey, setEditorKey] = useState(0);
  const { theme, toggleTheme } = useTheme();

  // Load saved code on mount
  useEffect(() => {
    const savedCode = localStorage.getItem(STORAGE_KEY);
    if (savedCode) {
      setCode(savedCode);
    }
    
    const savedFontSize = localStorage.getItem(FONT_SIZE_KEY);
    if (savedFontSize) {
      setFontSize(parseInt(savedFontSize, 10));
    }
  }, []);

  // Save code to localStorage
  const handleSave = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, code);
    // Could add a toast notification here
  }, [code]);

  // Load code from localStorage
  const handleLoad = useCallback(() => {
    const savedCode = localStorage.getItem(STORAGE_KEY);
    if (savedCode) {
      setCode(savedCode);
    }
  }, []);

  // Handle template selection
  const handleTemplateSelect = useCallback((template: PlaygroundTemplate) => {
    setCode(template.code);
    setResult(null);
    // Force editor to re-render with new content
    setEditorKey((prev) => prev + 1);
  }, []);

  // Execute code via API
  const handleRun = useCallback(async () => {
    setIsRunning(true);
    setResult(null);

    try {
      const response = await fetch('/api/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          language: 'f2',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Execution failed');
      }

      const data = await response.json();
      setResult({
        stdout: data.stdout || '',
        stderr: data.stderr || '',
        exitCode: data.exitCode ?? 0,
        executionTime: data.executionTime ?? 0,
      });
    } catch (error) {
      setResult({
        stdout: '',
        stderr: error instanceof Error ? error.message : 'An error occurred',
        exitCode: 1,
        executionTime: 0,
      });
    } finally {
      setIsRunning(false);
    }
  }, [code]);

  // Clear editor and output
  const handleClear = useCallback(() => {
    setCode('');
    setResult(null);
    setEditorKey((prev) => prev + 1);
  }, []);

  // Format code (basic implementation - could use prettier)
  const handleFormat = useCallback(() => {
    // Basic formatting - add proper indentation
    const lines = code.split('\n');
    let indentLevel = 0;
    const formattedLines = lines.map((line) => {
      const trimmed = line.trim();
      if (!trimmed) return '';
      
      // Decrease indent for end statements
      if (trimmed.startsWith('end') || trimmed.startsWith('else') || trimmed.startsWith('case')) {
        indentLevel = Math.max(0, indentLevel - 1);
      }
      
      const formatted = '  '.repeat(indentLevel) + trimmed;
      
      // Increase indent for blocks
      if (trimmed.endsWith('then') || trimmed.endsWith('do') || trimmed.startsWith('select') || trimmed === 'else' || trimmed === 'case') {
        indentLevel++;
      }
      
      return formatted;
    });
    
    setCode(formattedLines.join('\n'));
  }, [code]);

  // Handle font size change
  const handleFontSizeChange = useCallback((newSize: number) => {
    setFontSize(newSize);
    localStorage.setItem(FONT_SIZE_KEY, newSize.toString());
  }, []);

  return (
    <div className="min-h-screen bg-carbon-gray-100">
      {/* Header */}
      <div className="border-b border-carbon-gray-80 bg-carbon-gray-90">
        <Container>
          <div className="flex items-center gap-2 py-4">
            <Link
              href="/"
              className="text-carbon-gray-40 hover:text-carbon-gray-20 transition-colors"
            >
              Home
            </Link>
            <ChevronRight className="h-4 w-4 text-carbon-gray-60" />
            <Link
              href="/demos"
              className="text-carbon-gray-40 hover:text-carbon-gray-20 transition-colors"
            >
              Demos
            </Link>
            <ChevronRight className="h-4 w-4 text-carbon-gray-60" />
            <span className="text-carbon-gray-10 font-medium flex items-center gap-2">
              <Code className="h-4 w-4" />
              Playground
            </span>
          </div>
        </Container>
      </div>

      {/* Main Content */}
      <div className="h-[calc(100vh-81px)]">
        <PanelGroup direction="horizontal" className="h-full">
          {/* Editor Panel */}
          <Panel defaultSize={60} minSize={30}>
            <div className="h-full flex flex-col p-4">
              <EditorToolbar
                onRun={handleRun}
                onClear={handleClear}
                onFormat={handleFormat}
                onThemeToggle={toggleTheme}
                onFontSizeChange={handleFontSizeChange}
                onTemplateSelect={handleTemplateSelect}
                onSave={handleSave}
                onLoad={handleLoad}
                isRunning={isRunning}
                fontSize={fontSize}
                templates={playgroundTemplates}
              />
              <div className="flex-1 mt-2">
                <CodeEditor
                  key={editorKey}
                  value={code}
                  onChange={setCode}
                  fontSize={fontSize}
                  showMinimap={false}
                  onRun={handleRun}
                />
              </div>
            </div>
          </Panel>

          {/* Resize Handle */}
          <PanelResizeHandle className="w-1 bg-carbon-gray-80 hover:bg-accent-cyan/50 transition-colors cursor-col-resize" />

          {/* Output Panel */}
          <Panel defaultSize={40} minSize={20}>
            <div className="h-full p-4">
              <OutputPanel
                result={result}
                isRunning={isRunning}
                onClear={() => setResult(null)}
              />
            </div>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
}