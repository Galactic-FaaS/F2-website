'use client';

import { useState, useCallback } from 'react';
import { DemoContainer } from './demo-container';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Area,
  ComposedChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  Line
} from 'recharts';

const sampleCode = `! Fortran² Symbolic Computation Demo
! Note: Symbolic computation is currently 30% implemented

program symbolic_demo
    ! Symbolic expressions with pattern matching
    let x = symbol("x")
    let y = symbol("y")
    
    ! Define symbolic expression
    let f = x**2 + 2*x + 1
    
    ! Pattern matching for simplification
    match expand(f) {
        case (a + b)**2 => a**2 + 2*a*b + b**2
        case _ => f
    }
    
    ! Symbolic differentiation (planned)
    ! let df = diff(f, x)  ! Would give 2*x + 2
    
    ! Symbolic integration (planned)
    ! let integral = integrate(f, x)  ! Would give x**3/3 + x**2 + x
    
    ! Equation solving (planned)
    ! let roots = solve(f .eq. 0, x)  ! Would give x = -1
    
    print("Expression: {f}")
    print("Status: Symbolic module at 30% implementation")
    
end program symbolic_demo`;

interface SymbolicResult {
  expression: string;
  type: 'original' | 'derivative' | 'simplified' | 'integrated' | 'solved';
}

export function SymbolicDemo() {
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<SymbolicResult[] | null>(null);
  const [selectedDemo, setSelectedDemo] = useState<'polynomial' | 'trigonometric' | 'rational'>('polynomial');
  const [executionError, setExecutionError] = useState<string | null>(null);

  const demos = {
    polynomial: {
      expression: 'x^2 + 2*x + 1',
      derivative: '2*x + 2',
      simplified: '(x + 1)^2',
      integrated: '(x^3)/3 + x^2 + x',
      roots: [-1],
      latex: {
        original: 'f(x) = x^2 + 2x + 1',
        derivative: "f'(x) = 2x + 2",
        simplified: '(x + 1)^2',
        integrated: '\\frac{x^3}{3} + x^2 + x',
      }
    },
    trigonometric: {
      expression: 'sin(x)^2 + cos(x)^2',
      derivative: '0',
      simplified: '1',
      integrated: 'x/2 - sin(2x)/4',
      roots: [],
      latex: {
        original: '\\sin^2(x) + \\cos^2(x)',
        derivative: '0',
        simplified: '1',
        integrated: '\\frac{x}{2} - \\frac{\\sin(2x)}{4}',
      }
    },
    rational: {
      expression: '(x^2 - 1) / (x - 1)',
      derivative: '2*x*(x-1) - (x^2-1)',
      simplified: 'x + 1',
      integrated: '(x^2)/2 + x',
      roots: [1],
      latex: {
        original: '\\frac{x^2 - 1}{x - 1}',
        derivative: '\\frac{2x(x-1) - (x^2-1)}{(x-1)^2}',
        simplified: 'x + 1',
        integrated: '\\frac{x^2}{2} + x',
      }
    }
  };

  const runComputation = useCallback(async () => {
    setIsRunning(true);
    setExecutionError(null);
    
    try {
      // Call the execution API
      const response = await fetch('/api/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: sampleCode,
          language: 'fortran',
          timeout: 10000,
        }),
      });

      if (!response.ok) {
        throw new Error(`Execution failed: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('Execution result:', result);
      
      // Parse results based on selected demo
      const demo = demos[selectedDemo];
      const mockResults: SymbolicResult[] = [
        { expression: demo.latex.original, type: 'original' },
        { expression: demo.latex.derivative, type: 'derivative' },
        { expression: demo.latex.simplified, type: 'simplified' },
        { expression: demo.latex.integrated, type: 'integrated' },
      ];
      setResults(mockResults);
    } catch (error) {
      setExecutionError(error instanceof Error ? error.message : 'Execution failed');
      // Fall back to local mock results
      const demo = demos[selectedDemo];
      const mockResults: SymbolicResult[] = [
        { expression: demo.latex.original, type: 'original' },
        { expression: demo.latex.derivative, type: 'derivative' },
        { expression: demo.latex.simplified, type: 'simplified' },
        { expression: demo.latex.integrated, type: 'integrated' },
      ];
      setResults(mockResults);
    } finally {
      setIsRunning(false);
    }
  }, [selectedDemo]);

  // Generate plot data for function visualization
  const generatePlotData = () => {
    const data = [];
    for (let x = -3; x <= 3; x += 0.1) {
      const y = x * x + 2 * x + 1; // (x+1)^2
      const dy = 2 * x + 2; // derivative
      data.push({ x: parseFloat(x.toFixed(1)), y, dy });
    }
    return data;
  };

  const outputContent = results ? (
    <div className="space-y-6">
      {/* Error Display */}
      {executionError && (
        <div className="p-4 bg-red-900/20 border border-red-500/50 rounded-lg text-red-400">
          <p className="font-semibold">Execution Warning</p>
          <p className="text-sm mt-1">{executionError} - Showing mock results</p>
        </div>
      )}

      {/* Implementation Status Warning */}
      <Card variant="outlined" padding="md" className="border-status-warning/50 bg-status-warning/5">
        <CardContent>
          <div className="flex items-center gap-3">
            <Badge variant="warning">⚠️ 30% Implemented</Badge>
            <p className="text-carbon-sm text-carbon-gray-40">
              Symbolic computation is under active development. Some features shown are planned.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Expression Operations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card variant="outlined" padding="md" className="border-carbon-gray-80">
          <CardHeader className="pb-2">
            <Badge variant="primary">Original</Badge>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-mono text-carbon-blue-40">
              {demos[selectedDemo].latex.original}
            </p>
          </CardContent>
        </Card>
        
        <Card variant="outlined" padding="md" className="border-carbon-gray-80">
          <CardHeader className="pb-2">
            <Badge variant="secondary">Simplified</Badge>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-mono text-status-success">
              {demos[selectedDemo].latex.simplified}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Derivative & Integral */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card variant="outlined" padding="md" className="border-carbon-gray-80">
          <CardHeader>
            <CardTitle className="text-accent-purple">Derivative <Badge variant="warning" className="ml-2">Planned</Badge></CardTitle>
            <CardDescription className="text-carbon-gray-40">Symbolic differentiation</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-mono text-accent-purple">
              {demos[selectedDemo].latex.derivative}
            </p>
            <p className="text-carbon-sm text-carbon-gray-40 mt-2">
              Roots at x = {demos[selectedDemo].roots.join(', ') || 'none'}
            </p>
          </CardContent>
        </Card>
        
        <Card variant="outlined" padding="md" className="border-carbon-gray-80">
          <CardHeader>
            <CardTitle className="text-carbon-blue-40">Integral <Badge variant="warning" className="ml-2">Planned</Badge></CardTitle>
            <CardDescription className="text-carbon-gray-40">Symbolic integration</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-mono text-carbon-blue-40">
              ∫ {demos[selectedDemo].latex.original} dx
            </p>
            <p className="text-xl font-mono text-carbon-gray-10 mt-2">
              = {demos[selectedDemo].latex.integrated} + C
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Function Plot */}
      <Card variant="default" padding="md" className="border-carbon-gray-80">
        <CardHeader>
          <CardTitle className="text-carbon-gray-10">Function Visualization</CardTitle>
          <CardDescription className="text-carbon-gray-40">Original function f(x) and its derivative f'(x)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={generatePlotData()}>
                <CartesianGrid strokeDasharray="3 3" stroke="#3D3D3D" />
                <XAxis 
                  dataKey="x" 
                  stroke="#6B6B6B" 
                  label={{ value: 'x', position: 'bottom', fill: '#6B6B6B' }}
                />
                <YAxis 
                  stroke="#6B6B6B"
                  label={{ value: 'y', angle: -90, position: 'insideLeft', fill: '#6B6B6B' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1A1A1A', 
                    border: '1px solid #3D3D3D',
                    borderRadius: '8px'
                  }}
                  labelStyle={{ color: '#F4F4F4' }}
                />
                <ReferenceLine y={0} stroke="#5A5A5A" />
                <ReferenceLine x={-1} stroke="#5A5A5A" strokeDasharray="5 5" />
                <Area 
                  type="monotone" 
                  dataKey="y" 
                  stroke="#00D4FF" 
                  fill="#00D4FF" 
                  fillOpacity={0.1}
                  name="f(x)"
                />
                <Line 
                  type="monotone" 
                  dataKey="dy" 
                  stroke="#8B5CF6" 
                  strokeWidth={2}
                  name="f'(x)"
                  dot={false}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-6 mt-4 justify-center">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-carbon-blue-40" />
              <span className="text-carbon-sm text-carbon-gray-40">f(x) = x² + 2x + 1</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-accent-purple" />
              <span className="text-carbon-sm text-carbon-gray-40">f'(x) = 2x + 2</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Implementation Status */}
      <Card variant="default" padding="md" className="border-carbon-gray-80">
        <CardHeader>
          <CardTitle className="text-carbon-gray-10">Implementation Status</CardTitle>
          <CardDescription className="text-carbon-gray-40">Current and planned features</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { op: 'Symbolic Expressions', detail: 'Basic symbolic expression representation', status: '✅' },
              { op: 'Pattern Matching', detail: 'Pattern-based simplification rules', status: '⚠️ 50%' },
              { op: 'Differentiation', detail: 'Symbolic derivative computation', status: '❌ Planned' },
              { op: 'Integration', detail: 'Symbolic integration', status: '❌ Planned' },
              { op: 'Equation Solving', detail: 'Symbolic equation solver', status: '❌ Planned' },
            ].map((step, idx) => (
              <div key={idx} className="flex items-center gap-4 p-3 bg-carbon-gray-90 rounded-lg">
                <span className="text-lg">{step.status}</span>
                <Badge variant="secondary">{step.op}</Badge>
                <span className="text-carbon-sm text-carbon-gray-40">{step.detail}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  ) : null;

  return (
    <div className="space-y-4">
      {/* Demo Selection */}
      <div className="flex gap-2 mb-4">
        {(['polynomial', 'trigonometric', 'rational'] as const).map((demo) => (
          <Button
            key={demo}
            variant={selectedDemo === demo ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => {
              setSelectedDemo(demo);
              setResults(null);
            }}
          >
            {demo.charAt(0).toUpperCase() + demo.slice(1)}
          </Button>
        ))}
      </div>

      <DemoContainer
        title="Symbolic Computation"
        description="Computer algebra system with pattern matching (30% implemented)"
        code={sampleCode}
        language="fortran"
        onRun={runComputation}
        isRunning={isRunning}
        output={outputContent}
      />
    </div>
  );
}