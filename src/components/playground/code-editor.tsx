'use client';

import { useRef, useCallback } from 'react';
import Editor, { OnMount, BeforeMount } from '@monaco-editor/react';
import type { editor } from 'monaco-editor';
import { useTheme } from '@/components/providers/theme-provider';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  fontSize?: number;
  showMinimap?: boolean;
  readOnly?: boolean;
  onRun?: () => void;
}

const FORTRAN2_TOKENIZER = {
  // Tokenizer rules for Fortran²
  tokenizer: {
    root: [
      // Comments
      [/!.*$/, 'comment'],
      
      // Strings
      [/"([^"\\]|\\.)*"/, 'string'],
      [/'([^'\\]|\\.)*'/, 'string'],
      
      // Numbers
      [/\d+(\.\d+)?([eE][+-]?\d+)?/, 'number'],
      [/0x[0-9a-fA-F]+/, 'number'],
      
      // Keywords
      [
        /\b(program|module|subroutine|function|end|implicit|none|real|integer|logical|character|complex|double|precision|dimension|allocatable|parameter|intent|in|out|inout|optional|pointer|target|public|private|contains|use|interface|procedure|select|case|default|cycle|exit|continue|return|stop|pause|allocate|deallocate|nullify|allocate|print|read|write|format|open|close|rewind|backspace|inquire|flush|allocate|deallocate|if|then|else|elseif|do|while|where|mask|forall|call|save|entry|data|equivalence|nabstract|external|intrinsic|value|volatile)\b/i,
        'keyword'
      ],
      
      // Fortran² specific keywords
      [
        /\b(diff|grad|hessian|jacobian|dual|adjoint|derivative|symbolic|simplify|differentiate|integrate|expand|factor|expand|collect|subs|eval|normal|expand|expand|trace|solve|expand|limit|series|diff|jacobian|grad|hessian)\b/i,
        'keyword.control.f2'
      ],
      
      // Probabilistic keywords
      [
        /\b(normal_sample|uniform_sample|gamma_sample|beta_sample|exponential_sample|poisson_sample|bernoulli_sample|dirichlet_sample|multinomial_sample|random_variable|distribution|prior|posterior|likelihood|evidence|mcmc|metropolis|hastings|slice|sample|expect|var|cov|entropy|kl_divergence)\b/i,
        'keyword.control.probabilistic'
      ],
      
      // Operators
      [/[+\-*/%=<>!&|^~]+/, 'operator'],
      
      // Built-in functions
      [
        /\b(sin|cos|tan|asin|acos|atan|atan2|sinh|cosh|tanh|exp|log|log10|sqrt|abs|min|max|mod|int|real|cmplx|conjg|real|imag|sign|dim|sqrt|exp|log|sin|cos|tan|asin|acos|atan|sinh|cosh|tanh|abs|sign|mod|min|max|sqrt|exp|log|sin|cos|tan)\b/i,
        'support.function'
      ],
      
      // Identifiers
      [/[a-zA-Z_][a-zA-Z0-9_]*/, 'identifier'],
      
      // Punctuation
      [/[(),:;]/, 'delimiter'],
      
      // Arrow and special operators
      [/=>|->|\.\w+\./, 'operator'],
    ],
  },
};

export function CodeEditor({
  value,
  onChange,
  fontSize = 14,
  showMinimap = false,
  readOnly = false,
}: CodeEditorProps) {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const { theme } = useTheme();

  const handleEditorWillMount: BeforeMount = useCallback((monaco) => {
    // Register Fortran² language
    monaco.languages.register({ id: 'fortran2' });

    // Define Fortran² tokens
    monaco.languages.setMonarchTokensProvider('fortran2', {
      tokenizer: {
        root: [
          // Comments - Fortran style
          [/!.*$/, 'comment'],
          [/^C\s.*$/, 'comment'],
          [/^\*\s.*$/, 'comment'],
          
          // Strings
          [/"([^"\\]|\\.)*"/, 'string'],
          [/'([^'\\]|\\.)*'/, 'string'],
          
          // Numbers
          [/\b\d+(\.\d+)?([eE][+-]?\d+)?[qQ]?\b/, 'number'],
          [/0x[0-9a-fA-F]+/, 'number'],
          [/\b\d+[dD][+-]?\d+\b/, 'number'],
          
          // Keywords - Standard Fortran
          [
            /\b(program|module|submodule|use|import|implicit|none|contains|subroutine|function|end|type|class|procedure|interface|abstract|extension|select|case|default|if|then|else|elseif|do|while|cycle|exit|continue|return|stop|allocate|deallocate|nullify|allocate|deallocate|associate|where|mask|forall|call|print|read|write|open|close|rewind|backspace|flush|inquire|format|parameter|data|equivalence|save|entry|external|intent|optional|pointer|target|public|private|protected|contiguous|bind|call|value|volatile|abstract|asynchronous|intrinsic|action| delimited|direct|exist|file|form|iostat|name|new|number|opened|position|read|readwrite|sequential|status|write)\b/i,
            'keyword'
          ],
          
          // Fortran² specific keywords
          [
            /\b(diff|grad|hessian|jacobian|adjoint|derivative|symbolic|simplify|differentiate|integrate|expand|factor|collect|subs|eval|normal|limit|series|trace|solve|mcmc|metropolis|hastings|slice|prior|posterior|likelihood|evidence|sample|expect|var|cov|entropy|kl_divergence)\b/i,
            'keyword.control'
          ],
          
          // Built-in functions
          [
            /\b(sin|cos|tan|asin|acos|atan|atan2|sinh|cosh|tanh|exp|log|log10|sqrt|abs|min|max|mod|int|real|aimag|cmplx|conjg|real|imag|sign|dim|sqrt|exp|log|sin|cos|tan|asin|acos|atan|sinh|cosh|tanh|abs|sign|mod|min|max|date|time|system|date_and_time|random_number|random_seed|reshape|spread|transpose|pack|unpack|merge|reshape|maxloc|minloc|maxval|minval|sum|product|dot_product|matmul|transpose|eoshift|cshift|allocated|associated|null|present|allocated|size|lbound|ubound|shape|kind|selected_real_kind|selected_int_kind|digits|epsilon|huge|precision|radix|range|tiny|bit_size|leadz|trailz|popcnt|poppar|ibclr|ibset|ishft|ishftc|shifta|shiftl|shiftr|verify|scan|index|len|len_trim|adjustl|adjustr|repeat|trim|char|ichar|iachar|transfer|logical|real|int|nint|anint|aint|real|nearest|scale|set exponent|sign|spacing|fraction|exponent|dprod|cmplx|real|imag|dfloat|dreal|dimag|dcmplx|idint|idnint|idint|real|log|alog|dlog|alog10|dlog10|exp|aexp|dexp|alog|sqrt|dsqrt|dsqrt|asin|dasin|acos|dacos|atan|datan|atan2|datan2|sin|dsin|cos|dcos|tan|dtan)\b/i,
            'support.function'
          ],
          
          // Operators
          [/[+\-*/%]=|==|!=|>=|<=|<>|&&|\|\||::|\*\*|\/\/|=>|\.eq\.|\.ne\.|\.lt\.|\.le\.|\.gt\.|\.ge\.|\.and\.|\.or\.|\.not\.|\.eqv\.|\.neqv\./i, 'operator'],
          
          // Identifiers
          [/[a-zA-Z_][a-zA-Z0-9_]*/, 'identifier'],
          
          // Punctuation
          [/[(),:;]/, 'delimiter'],
          
          // Array indexing
          [/\([^)]+\)/, 'delimiter.bracket'],
          
          // Preprocessor directives
          [/#\s*\w+/, 'keyword.preprocessor'],
        ],
      },
    });

    // Define custom theme
    monaco.editor.defineTheme('fortran2-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6A737D', fontStyle: 'italic' },
        { token: 'keyword', foreground: '79C0FF' },
        { token: 'keyword.control', foreground: 'D2A8FF' },
        { token: 'support.function', foreground: '79C0FF' },
        { token: 'string', foreground: 'A5D6FF' },
        { token: 'number', foreground: '79C0FF' },
        { token: 'operator', foreground: 'FF7B72' },
        { token: 'identifier', foreground: 'E6EDF3' },
        { token: 'delimiter', foreground: 'E6EDF3' },
        { token: 'keyword.preprocessor', foreground: 'FF7B72' },
      ],
      colors: {
        'editor.background': '#0D1117',
        'editor.foreground': '#E6EDF3',
        'editor.lineHighlightBackground': '#161B22',
        'editor.selectionBackground': '#264F78',
        'editorCursor.foreground': '#79C0FF',
        'editorLineNumber.foreground': '#6E7681',
        'editorLineNumber.activeForeground': '#E6EDF3',
        'editor.selectionHighlightBackground': '#3B5070',
        'editorIndentGuide.background': '#21262D',
        'editorIndentGuide.activeBackground': '#30363D',
      },
    });

    monaco.editor.defineTheme('fortran2-light', {
      base: 'vs',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6A737D', fontStyle: 'italic' },
        { token: 'keyword', foreground: '0550AE' },
        { token: 'keyword.control', foreground: '8250DF' },
        { token: 'support.function', foreground: '0550AE' },
        { token: 'string', foreground: '0A3069' },
        { token: 'number', foreground: '0550AE' },
        { token: 'operator', foreground: 'CF222E' },
        { token: 'identifier', foreground: '24292F' },
        { token: 'delimiter', foreground: '24292F' },
        { token: 'keyword.preprocessor', foreground: 'CF222E' },
      ],
      colors: {
        'editor.background': '#FFFFFF',
        'editor.foreground': '#24292F',
        'editor.lineHighlightBackground': '#F6F8FA',
        'editor.selectionBackground': '#ADD6FF',
        'editorCursor.foreground': '#0969DA',
        'editorLineNumber.foreground': '#8C959F',
        'editorLineNumber.activeForeground': '#24292F',
        'editor.selectionHighlightBackground': '#ADD6FF40',
        'editorIndentGuide.background': '#E1E4E8',
        'editorIndentGuide.activeBackground': '#CFCFCF',
      },
    });

    // Register auto-completion provider
    monaco.languages.registerCompletionItemProvider('fortran2', {
      provideCompletionItems: (model, position) => {
        const word = model.getWordUntilPosition(position);
        const range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn,
        };

        const suggestions = [
          // Keywords
          ...['program', 'module', 'subroutine', 'function', 'end', 'if', 'then', 'else', 'do', 'while', 'select', 'case', 'return', 'stop'].map((kw) => ({
            label: kw,
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: kw,
            range,
          })),
          // Types
          ...['integer', 'real', 'double', 'complex', 'logical', 'character'].map((t) => ({
            label: t,
            kind: monaco.languages.CompletionItemKind.TypeParameter,
            insertText: t,
            range,
          })),
          // Built-in functions
          ...['print', 'write', 'read', 'sin', 'cos', 'tan', 'sqrt', 'abs', 'exp', 'log', 'max', 'min', 'sum', 'product'].map((fn) => ({
            label: fn,
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: fn,
            range,
          })),
          // Fortran² specific
          ...['diff', 'grad', 'jacobian', 'hessian', 'symbolic', 'simplify', 'sample', 'prior', 'posterior'].map((fn) => ({
            label: fn,
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: fn,
            range,
          })),
        ];

        return { suggestions };
      },
    });
  }, []);

  const handleEditorMount: OnMount = useCallback((editor, monaco) => {
    editorRef.current = editor;
    
    // Add keyboard shortcut for running code (Ctrl+Enter)
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      // This will be handled by parent component
    });
    
    // Focus the editor
    editor.focus();
  }, []);

  const handleChange = useCallback((value: string | undefined) => {
    onChange(value || '');
  }, [onChange]);

  const monacoTheme = theme === 'dark' ? 'fortran2-dark' : 'fortran2-light';

  return (
    <div className="h-full w-full overflow-hidden rounded-lg border border-carbon-gray-80 bg-[var(--editor-bg)]">
      <Editor
        height="100%"
        language="fortran2"
        value={value}
        onChange={handleChange}
        beforeMount={handleEditorWillMount}
        onMount={handleEditorMount}
        theme={monacoTheme}
        options={{
          fontSize,
          fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
          fontLigatures: true,
          minimap: { enabled: showMinimap },
          lineNumbers: 'on',
          renderLineHighlight: 'all',
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          insertSpaces: true,
          wordWrap: 'on',
          readOnly,
          cursorBlinking: 'smooth',
          cursorSmoothCaretAnimation: 'on',
          smoothScrolling: true,
          padding: { top: 16, bottom: 16 },
          scrollbar: {
            verticalScrollbarSize: 10,
            horizontalScrollbarSize: 10,
          },
        }}
      />
    </div>
  );
}

export default CodeEditor;