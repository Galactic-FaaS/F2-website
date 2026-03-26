'use client';

import { useState } from 'react';
import { DemoContainer } from './demo-container';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine,
  Cell 
} from 'recharts';

const PRECISION_LEVELS = {
  single: { bits: 32, label: 'Single (32-bit)', color: '#00D4FF' },
  double: { bits: 64, label: 'Double (64-bit)', color: '#8B5CF6' },
  quad: { bits: 128, label: 'Quad (128-bit)', color: '#10B981' },
  arbitrary: { bits: 256, label: 'Arbitrary (256-bit)', color: '#F59E0B' },
};

interface PrecisionResult {
  type: string;
  value: number;
  error: number;
  relativeError: number;
  actualPrecision: number;
}

const sampleCode = `! Fortran² Advanced Arithmetic Demo
! Demonstrating multiple precision systems and interval arithmetic

program arithmetic_demo
    use std::arithmetic
    use std::arithmetic::ieee754
    use std::arithmetic::arbitrary
    use std::arithmetic::interval
    use std::arithmetic::posit
    
    ! IEEE 754 standard precisions
    real(binary32) :: x_single
    real(binary64) :: x_double
    real(binary128) :: x_quad
    
    ! Arbitrary precision (100 decimal digits)
    real(arbitrary(precision=100)) :: x_arb, pi_arb
    
    ! Interval arithmetic for guaranteed bounds
    type(interval(binary64)) :: x_int, result_int
    
    ! Posit arithmetic (alternative to IEEE 754)
    real(posit32) :: x_posit
    
    ! Initialize values
    x_single = 3.14159265
    x_double = 3.141592653589793
    x_quad = 3.141592653589793238462643383279502884197
    
    ! Arbitrary precision computation
    x_arb = arbitrary_from_string("3.14159265358979323846264338327950288419716939937510")
    pi_arb = compute_pi(precision=100)
    
    ! Interval arithmetic: x ∈ [1.0, 1.1]
    x_int = interval(1.0, 1.1)
    result_int = x_int ** 2  ! Guaranteed: result ∈ [1.0, 1.21]
    
    ! Posit arithmetic
    x_posit = posit32_from_double(3.14159)
    
    ! Print precision comparison
    print *, "Single precision: ", x_single
    print *, "Double precision: ", x_double
    print *, "Quad precision: ", x_quad
    print *, "Arbitrary (100 digits): ", x_arb
    print *, "Interval result: ", result_int
    print *, "Posit value: ", x_posit
    
end program arithmetic_demo`;

export function ArithmeticDemo() {
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<PrecisionResult[] | null>(null);

  const runComputation = () => {
    setIsRunning(true);
    
    // Simulate computation delay
    setTimeout(() => {
      // Generate mock precision results
      const mockResults: PrecisionResult[] = [
        { type: 'Single (32-bit)', value: 3.1415927, error: 0.0000001, relativeError: 3.2e-8, actualPrecision: 7 },
        { type: 'Double (64-bit)', value: 3.14159265358979, error: 1.2e-16, relativeError: 3.8e-17, actualPrecision: 15 },
        { type: 'Quad (128-bit)', value: 3.1415926535897932384626433832795, error: 1.8e-34, relativeError: 5.7e-35, actualPrecision: 34 },
        { type: 'Arbitrary (256-bit)', value: 3.1415926535897932384626433832795028841971693993751, error: 2.1e-78, relativeError: 6.7e-79, actualPrecision: 78 },
      ];
      setResults(mockResults);
      setIsRunning(false);
    }, 1500);
  };

  const outputContent = results ? (
    <div className="space-y-6">
      {/* Precision Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {results.map((result, idx) => (
          <Card key={idx} variant="outlined" padding="sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-content-dark-primary">{result.type}</p>
                <p className="text-2xl font-mono text-brand-cyan mt-1">
                  {result.value.toPrecision(result.actualPrecision)}
                </p>
              </div>
              <Badge variant={idx === 3 ? 'success' : 'default'}>
                {result.actualPrecision} digits
              </Badge>
            </div>
            <div className="mt-3 text-xs text-content-dark-secondary space-y-1">
              <p>Absolute Error: <span className="font-mono text-brand-purple">{result.error.toExponential(2)}</span></p>
              <p>Relative Error: <span className="font-mono text-brand-green">{result.relativeError.toExponential(2)}</span></p>
            </div>
          </Card>
        ))}
      </div>

      {/* Precision Comparison Chart */}
      <Card variant="default" padding="md">
        <CardHeader>
          <CardTitle>Precision Comparison</CardTitle>
          <CardDescription>Number of accurate digits by precision type</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={results} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis type="number" stroke="#94A3B8" />
                <YAxis dataKey="type" type="category" stroke="#94A3B8" width={120} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1E293B', 
                    border: '1px solid #334155',
                    borderRadius: '8px'
                  }}
                  labelStyle={{ color: '#F8FAFC' }}
                />
                <Bar dataKey="actualPrecision" name="Significant Digits" radius={[0, 4, 4, 0]}>
                  {results.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={Object.values(PRECISION_LEVELS)[index].color} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Interval Arithmetic Demo */}
      <Card variant="default" padding="md">
        <CardHeader>
          <CardTitle className="text-brand-purple">Interval Arithmetic</CardTitle>
          <CardDescription>Guaranteed error bounds for numerical computations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-surface-dark-overlay rounded-lg p-4 font-mono text-sm">
            <p className="text-content-dark-secondary mb-2">Computing f(x) = x² for x ∈ [1.0, 1.1]:</p>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <p className="text-content-dark-tertiary">Input Interval</p>
                <p className="text-brand-cyan text-lg">[1.0, 1.1]</p>
              </div>
              <div className="text-2xl text-content-dark-tertiary">→</div>
              <div className="flex-1">
                <p className="text-content-dark-tertiary">Output Interval</p>
                <p className="text-brand-green text-lg">[1.0, 1.21]</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-border-dark">
              <p className="text-content-dark-tertiary">
                The output interval guarantees the true result is contained within [1.0, 1.21]
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dual Numbers Demo */}
      <Card variant="default" padding="md">
        <CardHeader>
          <CardTitle className="text-brand-green">Dual Numbers</CardTitle>
          <CardDescription>Automatic differentiation for gradient computation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-surface-dark-overlay rounded-lg p-4 font-mono text-sm">
            <p className="text-content-dark-secondary mb-2">Computing f(x) = x² at x = 1.0:</p>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <p className="text-content-dark-tertiary">Input</p>
                <p className="text-brand-cyan text-lg">x = 1.0 + 1.0ε</p>
              </div>
              <div className="text-2xl text-content-dark-tertiary">→</div>
              <div className="flex-1">
                <p className="text-content-dark-tertiary">Output</p>
                <p className="text-brand-green text-lg">f(x) = 1.0 + 2.0ε</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-border-dark">
              <p className="text-content-dark-tertiary">
                The ε coefficient (2.0) is exactly the derivative f'(x) = 2x at x = 1.0
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  ) : null;

  return (
    <DemoContainer
      title="Advanced Arithmetic Systems"
      description="Explore Fortran²'s arbitrary precision, interval arithmetic, and dual number capabilities"
      code={sampleCode}
      language="fortran"
      onRun={runComputation}
      isRunning={isRunning}
      output={outputContent}
    />
  );
}
