'use client';

import { useState } from 'react';
import { DemoContainer } from './demo-container';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine,
  Area,
  ComposedChart
} from 'recharts';

const sampleCode = `! Fortran² Symbolic Computation Demo
! Computer algebra system with symbolic differentiation

program symbolic_demo
  use f2_symbolic
  use f2_parser
  
  type(symbolic_expr) :: f, df, simplified
  type(symbolic_eqn) :: eqn
  real :: root
  
  ! Define f(x) = x² + 2x + 1
  f = parse("x^2 + 2*x + 1")
  
  ! Compute derivative: f'(x) = 2x + 2
  df = differentiate(f, "x")
  
  ! Simplify: (x + 1)²
  simplified = simplify(f)
  
  ! Solve f(x) = 0 for x
  eqn = f .eq. 0
  root = solve(eqn, "x")  ! Returns x = -1
  
  print *, "f(x) =", to_string(f)
  print *, "f'(x) =", to_string(df)
  print *, "Simplified:", to_string(simplified)
  print *, "Root:", root
  
end program symbolic_demo`;

interface SymbolicResult {
  expression: string;
  type: 'original' | 'derivative' | 'simplified' | 'integrated' | 'solved';
}

export function SymbolicDemo() {
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<SymbolicResult[] | null>(null);
  const [selectedDemo, setSelectedDemo] = useState<'polynomial' | 'trigonometric' | 'rational'>('polynomial');

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

  const runComputation = () => {
    setIsRunning(true);
    
    setTimeout(() => {
      const demo = demos[selectedDemo];
      const mockResults: SymbolicResult[] = [
        { expression: demo.latex.original, type: 'original' },
        { expression: demo.latex.derivative, type: 'derivative' },
        { expression: demo.latex.simplified, type: 'simplified' },
        { expression: demo.latex.integrated, type: 'integrated' },
      ];
      setResults(mockResults);
      setIsRunning(false);
    }, 1500);
  };

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
      {/* Expression Operations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card variant="outlined" padding="md">
          <CardHeader className="pb-2">
            <Badge variant="primary">Original</Badge>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-mono text-brand-cyan">
              {demos[selectedDemo].latex.original}
            </p>
          </CardContent>
        </Card>
        
        <Card variant="outlined" padding="md">
          <CardHeader className="pb-2">
            <Badge variant="secondary">Simplified</Badge>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-mono text-brand-green">
              {demos[selectedDemo].latex.simplified}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Derivative & Integral */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card variant="outlined" padding="md">
          <CardHeader>
            <CardTitle className="text-brand-purple">Derivative</CardTitle>
            <CardDescription>Automatic differentiation</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-mono text-brand-purple">
              {demos[selectedDemo].latex.derivative}
            </p>
            <p className="text-sm text-content-dark-secondary mt-2">
              Roots at x = {demos[selectedDemo].roots.join(', ') || 'none'}
            </p>
          </CardContent>
        </Card>
        
        <Card variant="outlined" padding="md">
          <CardHeader>
            <CardTitle className="text-brand-cyan">Integral</CardTitle>
            <CardDescription>Symbolic integration</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-mono text-brand-cyan">
              ∫ {demos[selectedDemo].latex.original} dx
            </p>
            <p className="text-xl font-mono text-content-dark-primary mt-2">
              = {demos[selectedDemo].latex.integrated} + C
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Function Plot */}
      <Card variant="default" padding="md">
        <CardHeader>
          <CardTitle>Function Visualization</CardTitle>
          <CardDescription>Original function f(x) and its derivative f'(x)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={generatePlotData()}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis 
                  dataKey="x" 
                  stroke="#94A3B8" 
                  label={{ value: 'x', position: 'bottom', fill: '#94A3B8' }}
                />
                <YAxis 
                  stroke="#94A3B8"
                  label={{ value: 'y', angle: -90, position: 'insideLeft', fill: '#94A3B8' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1E293B', 
                    border: '1px solid #334155',
                    borderRadius: '8px'
                  }}
                  labelStyle={{ color: '#F8FAFC' }}
                />
                <ReferenceLine y={0} stroke="#64748B" />
                <ReferenceLine x={-1} stroke="#64748B" strokeDasharray="5 5" />
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
              <div className="w-3 h-3 rounded-full bg-brand-cyan" />
              <span className="text-sm text-content-dark-secondary">f(x) = x² + 2x + 1</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-brand-purple" />
              <span className="text-sm text-content-dark-secondary">f'(x) = 2x + 2</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Operation Steps */}
      <Card variant="default" padding="md">
        <CardHeader>
          <CardTitle>Symbolic Operations</CardTitle>
          <CardDescription>Step-by-step computation details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { op: 'Parse', detail: `Expression "${demos[selectedDemo].expression}" parsed into AST` },
              { op: 'Differentiate', detail: `Applied d/dx to obtain ${demos[selectedDemo].derivative}` },
              { op: 'Simplify', detail: `Applied algebraic simplification: ${demos[selectedDemo].simplified}` },
              { op: 'Integrate', detail: `Indefinite integral computed: ${demos[selectedDemo].integrated}` },
            ].map((step, idx) => (
              <div key={idx} className="flex items-center gap-4 p-3 bg-surface-dark-overlay rounded-lg">
                <Badge variant={idx === 2 ? 'success' : 'default'}>{step.op}</Badge>
                <span className="text-sm text-content-dark-secondary">{step.detail}</span>
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
        description="Computer algebra system with differentiation, simplification, and equation solving"
        code={sampleCode}
        language="fortran"
        onRun={runComputation}
        isRunning={isRunning}
        output={outputContent}
      />
    </div>
  );
}
