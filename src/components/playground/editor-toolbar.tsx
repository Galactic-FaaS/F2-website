'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/providers/theme-provider';
import { PlaygroundTemplate } from '@/lib/playground-templates';
import {
  Play,
  Trash2,
  Code2,
  Moon,
  Sun,
  Minus,
  Plus,
  ChevronDown,
  Save,
  FolderOpen,
} from 'lucide-react';

interface EditorToolbarProps {
  onRun: () => void;
  onClear: () => void;
  onFormat: () => void;
  onThemeToggle: () => void;
  onFontSizeChange: (size: number) => void;
  onTemplateSelect: (template: PlaygroundTemplate) => void;
  onSave: () => void;
  onLoad: () => void;
  isRunning: boolean;
  fontSize: number;
  templates: PlaygroundTemplate[];
}

export function EditorToolbar({
  onRun,
  onClear,
  onFormat,
  onThemeToggle,
  onFontSizeChange,
  onTemplateSelect,
  onSave,
  onLoad,
  isRunning,
  fontSize,
  templates,
}: EditorToolbarProps) {
  const { theme } = useTheme();
  const [templateDropdownOpen, setTemplateDropdownOpen] = useState(false);

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-carbon-gray-90 border-b border-carbon-gray-80 rounded-t-lg">
      {/* Left Section - Template Selection */}
      <div className="relative">
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setTemplateDropdownOpen(!templateDropdownOpen)}
            className="flex items-center gap-2"
          >
            <Code2 className="h-4 w-4" />
            <span>Templates</span>
            <ChevronDown className="h-3 w-3" />
          </Button>
        </div>

        {/* Template Dropdown */}
        {templateDropdownOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setTemplateDropdownOpen(false)}
            />
            <div className="absolute left-0 top-full mt-1 z-20 w-64 max-h-80 overflow-auto rounded-lg border border-carbon-gray-80 bg-carbon-gray-100 shadow-xl">
              <div className="p-2">
                <div className="text-xs font-medium text-carbon-gray-40 px-2 py-1">
                  Sample Code
                </div>
                {templates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => {
                      onTemplateSelect(template);
                      setTemplateDropdownOpen(false);
                    }}
                    className="w-full rounded-md px-3 py-2 text-left text-sm hover:bg-carbon-gray-80 transition-colors"
                  >
                    <div className="font-medium text-carbon-gray-10">
                      {template.name}
                    </div>
                    <div className="text-xs text-carbon-gray-40 truncate">
                      {template.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Center Section - Main Actions */}
      <div className="flex items-center gap-2">
        <Button
          variant="primary"
          size="sm"
          onClick={onRun}
          disabled={isRunning}
          className="flex items-center gap-2"
        >
          <Play className={cn('h-4 w-4', isRunning && 'animate-pulse')} />
          <span>{isRunning ? 'Running...' : 'Run'}</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={onFormat}
          title="Format code"
        >
          <Code2 className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={onClear}
          title="Clear editor"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Right Section - Settings */}
      <div className="flex items-center gap-2">
        {/* Save/Load */}
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onSave}
          title="Save code to localStorage"
        >
          <Save className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onLoad}
          title="Load code from localStorage"
        >
          <FolderOpen className="h-4 w-4" />
        </Button>

        {/* Divider */}
        <div className="h-6 w-px bg-carbon-gray-80 mx-1" />

        {/* Font Size Controls */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => onFontSizeChange(Math.max(10, fontSize - 1))}
            disabled={fontSize <= 10}
            title="Decrease font size"
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="text-sm text-carbon-gray-40 w-8 text-center">
            {fontSize}
          </span>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => onFontSizeChange(Math.min(24, fontSize + 1))}
            disabled={fontSize >= 24}
            title="Increase font size"
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>

        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onThemeToggle}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
        >
          {theme === 'dark' ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}

export default EditorToolbar;