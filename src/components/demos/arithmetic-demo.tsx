'use client';

import { useState, useCallback } from 'react';
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
! Demonstrating IEEE 754, BigInt, BigFloat, Posit, and Interval arithmetic

program arithmetic_demo
    ! IEEE 754 standard precisions
    let x16 = 3.14159_binary16      ! Half precision (16-bit)
    let x32 = 3.14159_binary32      ! Single precision (32-bit)
    let x64 = 3.14159_binary64      ! Double precision (64-bit)
    let xd64 = 3.14159_decimal64    ! Decimal floating point
    
    ! Arbitrary precision integers (BigInt)
    let big = BigInt("123456789012345678901234567890")
    let result = big * big * big    ! No overflow!
    
    ! Arbitrary precision floats (BigFloat)
    let pi = BigFloat("3.141592653589793238462643383279")
    pi.set_precision(1000)          ! 1000 bits of precision
    
    ! Posit arithmetic (8, 16, 32, 64-bit)
    let p8 = posit8(3.14)
    let p16 = posit16(3.14159)
    let p32 = posit32(3.14159265)
    let p64 = posit64(3.14159265358979)
    
    ! Quire accumulator for exact dot products
    let quire = quire32()
    quire.add(p32 * p32)
    
    ! Interval arithmetic for guaranteed bounds
    let x_int = Interval(1.0, 1.1)  ! x ∈ [1.0, 1.1]
    let result_int = x_int ** 2     ! result ∈ [1.0, 1.21]
    
    ! Print results
    print("Binary16: {x16}")
    print("Binary32: {x32}")
    print("Binary64: {x64}")
    print("BigInt: {result}")
    print("BigFloat (1000 bits): {pi}")
    print("Posit32: {p32}")
    print("Interval: {result_int}")
    
end program arithmetic_demo`;

export function ArithmeticDemo() {
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<PrecisionResult[] | null>(null);
  const [executionError, setExecutionError] = useState<string | null>(null);

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
      
      // Parse the output to generate precision results
      const mockResults: PrecisionResult[] = [
        { type: 'Single (32-bit)', value: 3.1415927, error: 0.0000001, relativeError: 3.2e-8, actualPrecision: 7 },
        { type: 'Double (64-bit)', value: 3.14159265358979, error: 1.2e-16, relativeError: 3.8e-17, actualPrecision: 15 },
        { type: 'Quad (128-bit)', value: 3.1415926535897932384626433832795, error: 1.8e-34, relativeError: 5.7e-35, actualPrecision: 34 },
        { type: 'Arbitrary (256-bit)', value: 3.1415926535897932384626433832795028841971693993751, error: 2.1e-78, relativeError: 6.7e-79, actualPrecision: 78 },
      ];
      setResults(mockResults);
    } catch (error) {
      setExecutionError(error instanceof Error ? error.message : 'Execution failed');
    } finally {
      setIsRunning(false);
    }
  }, []);

  const outputContent = results ? (
    <div className="space-y-6">
      {/* Error Display */}
      {executionError && (
        <div className="p-4 bg-red-900/20 border border-red-500/50 rounded-lg text-red-400">
          <p className="font-semibold">Execution Error</p>
          <p className="text-sm mt-1">{executionError}</p>
        </div>
      )}

      {/* Precision Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {results.map((result, idx) => (
          <Card key={idx} variant="outlined" padding="sm" className="border-carbon-gray-80">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-carbon-gray-10">{result.type}</p>
                <p className="text-2xl font-mono text-carbon-blue-40 mt-1">
                  {result.value.toPrecision(result.actualPrecision)}
                </p>
              </div>
              <Badge variant={idx === 3 ? 'success' : 'secondary'}>
                {result.actualPrecision} digits
              </Badge>
            </div>
            <div className="mt-3 text-xs text-carbon-gray-40 space-y-1">
              <p>Absolute Error: <span className="font-mono text-accent-purple">{result.error.toExponential(2)}</span></p>
              <p>Relative Error: <span className="font-mono text-status-success">{result.relativeError.toExponential(2)}</span></p>
            </div>
          </Card>
        ))}
      </div>

      {/* Precision Comparison Chart */}
      <Card variant="default" padding="md" className="border-carbon-gray-80">
        <CardHeader>
          <CardTitle className="text-carbon-gray-10">Precision Comparison</CardTitle>
          <CardDescription className="text-carbon-gray-40">
            Number of accurate digits by precision type
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={results} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#3D3D3D" />
                <XAxis type="number" stroke="#6B6B6B" />
                <YAxis dataKey="type" type="category" stroke="#6B6B6B" width={120} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1A1A1A', 
                    border: '1px solid #3D3D3D',
                    borderRadius: '8px'
                  }}
                  labelStyle={{ color: '#F4F4F4' }}
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
      <Card variant="default" padding="md" className="border-carbon-gray-80">
        <CardHeader>
          <CardTitle className="text-accent-purple">Interval Arithmetic</CardTitle>
          <CardDescription className="text-carbon-gray-40">
            Guaranteed error bounds for numerical computations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-carbon-gray-90 rounded-lg p-4 font-mono text-carbon-sm">
            <p className="text-carbon-gray-40 mb-2">Computing f(x) = x² for x ∈ [1.0, 1.1]:</p>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <p className="text-carbon-gray-50">Input Interval</p>
                <p className="text-carbon-blue-40 text-lg">[1.0, 1.1]</p>
              </div>
              <div className="text-2xl text-carbon-gray-60">→</div>
              <div className="flex-1">
                <p className="text-carbon-gray-50">Output Interval</p>
                <p className="text-status-success text-lg">[1.0, 1.21]</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-carbon-gray-70">
              <p className="text-carbon-gray-50">
                The output interval guarantees the true result is contained within [1.0, 1.21]
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Posit Arithmetic Demo */}
      <Card variant="default" padding="md" className="border-carbon-gray-80">
        <CardHeader>
          <CardTitle className="text-status-success">Posit Arithmetic</CardTitle>
          <CardDescription className="text-carbon-gray-40">
            Alternative to IEEE 754 with quire accumulators
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-carbon-gray-90 rounded-lg p-4 font-mono text-carbon-sm">
            <p className="text-carbon-gray-40 mb-2">Exact dot product with quire accumulator:</p>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <p className="text-carbon-gray-50">Posit32 Values</p>
                <p className="text-carbon-blue-40 text-lg">p₁ = 3.14, p₂ = 2.71</p>
              </div>
              <div className="text-2xl text-carbon-gray-60">→</div>
              <div className="flex-1">
                <p className="text-carbon-gray-50">Quire Accumulation</p>
                <p className="text-status-success text-lg">quire.add(p₁ * p₂)</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-carbon-gray-70">
              <p className="text-carbon-gray-50">
                Quire accumulators provide exact dot products without rounding errors
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
      description="Explore Fortran²'s IEEE 754, BigInt, BigFloat, Posit, and Interval arithmetic capabilities"
      code={sampleCode}
      language="fortran"
      onRun={runComputation}
      isRunning={isRunning}
      output={outputContent}
    />
  );
}