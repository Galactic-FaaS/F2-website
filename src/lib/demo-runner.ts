/**
 * Demo Runner Utilities
 * Helper functions for running demo code with proper state management
 */

import { execute, ExecutionRequest, ExecutionResult, getExecutorType } from './executor';
import { config } from './config';

/**
 * Demo execution state
 */
export interface DemoExecutionState {
  isRunning: boolean;
  result: ExecutionResult | null;
  error: string | null;
}

/**
 * Demo result type for parsing execution output
 */
export interface DemoResult {
  stdout: string;
  stderr: string;
  exitCode: number;
  executionTime: number;
  parsedData?: Record<string, any>;
}

/**
 * Run a demo with the executor
 * Handles loading states, error handling, and result parsing
 */
export async function runDemo(
  code: string,
  language: 'f2' | 'fortran' = 'f2',
  options?: {
    timeout?: number;
    stdin?: string;
    onProgress?: (state: DemoExecutionState) => void;
  }
): Promise<DemoResult> {
  const { timeout, stdin, onProgress } = options || {};
  
  // Notify starting
  if (onProgress) {
    onProgress({
      isRunning: true,
      result: null,
      error: null,
    });
  }

  const request: ExecutionRequest = {
    code,
    language,
    stdin,
    timeout: timeout || config.executionTimeout,
  };

  try {
    const result = await execute(request);
    
    // Notify completion
    if (onProgress) {
      onProgress({
        isRunning: false,
        result,
        error: result.error || null,
      });
    }

    return {
      stdout: result.stdout,
      stderr: result.stderr,
      exitCode: result.exitCode,
      executionTime: result.executionTime,
      parsedData: parseExecutionOutput(result.stdout, result.stderr),
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Execution failed';
    
    // Notify error
    if (onProgress) {
      onProgress({
        isRunning: false,
        result: null,
        error: errorMessage,
      });
    }

    return {
      stdout: '',
      stderr: errorMessage,
      exitCode: 1,
      executionTime: 0,
      parsedData: undefined,
    };
  }
}

/**
 * Parse execution output into structured data
 */
function parseExecutionOutput(stdout: string, stderr: string): Record<string, any> {
  const data: Record<string, any> = {};
  
  // Parse key-value pairs from output
  const lines = stdout.split('\n');
  for (const line of lines) {
    const match = line.match(/^([A-Za-z_]+):\s*(.+)$/);
    if (match) {
      const [, key, value] = match;
      // Try to parse numeric values
      const numValue = parseFloat(value);
      data[key] = isNaN(numValue) ? value.trim() : numValue;
    }
  }
  
  return data;
}

/**
 * Check if executor is available
 */
export function isDemoExecutionAvailable(): boolean {
  const executorType = getExecutorType();
  return executorType === 'mock' || executorType === 'wasm';
}

/**
 * Get executor status message
 */
export function getExecutorStatusMessage(): string {
  const executorType = getExecutorType();
  
  switch (executorType) {
    case 'mock':
      return 'Using mock executor (development mode)';
    case 'wasm':
      return 'Using WASM executor';
    case 'remote':
      return 'Using remote executor';
    default:
      return 'Executor not configured';
  }
}

/**
 * Create demo runner hook for React components
 */
export function createDemoRunner() {
  let currentState: DemoExecutionState = {
    isRunning: false,
    result: null,
    error: null,
  };

  const listeners: Set<(state: DemoExecutionState) => void> = new Set();

  const notify = () => {
    listeners.forEach(listener => listener(currentState));
  };

  const run = async (code: string, language: 'f2' | 'fortran' = 'f2') => {
    currentState = { isRunning: true, result: null, error: null };
    notify();

    const result = await runDemo(code, language, {
      onProgress: (state) => {
        currentState = state;
        notify();
      },
    });

    return result;
  };

  const subscribe = (listener: (state: DemoExecutionState) => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  const getState = () => currentState;

  return {
    run,
    subscribe,
    getState,
    isAvailable: isDemoExecutionAvailable,
  };
}

/**
 * Parse specific demo outputs
 */
export function parseArithmeticOutput(stdout: string): Record<string, any> {
  const data: Record<string, any> = {};
  
  // Extract precision values
  const binary16Match = stdout.match(/Binary16:\s*([\d.]+)/);
  const binary32Match = stdout.match(/Binary32:\s*([\d.]+)/);
  const binary64Match = stdout.match(/Binary64:\s*([\d.]+)/);
  const bigFloatMatch = stdout.match(/BigFloat.*?:\s*([\d.]+)/);
  const positMatch = stdout.match(/Posit32:\s*([\d.]+)/);
  const intervalMatch = stdout.match(/Interval:\s*\[([\d.]+),\s*([\d.]+)\]/);
  
  if (binary16Match) data.binary16 = parseFloat(binary16Match[1]);
  if (binary32Match) data.binary32 = parseFloat(binary32Match[1]);
  if (binary64Match) data.binary64 = parseFloat(binary64Match[1]);
  if (bigFloatMatch) data.bigFloat = bigFloatMatch[1].substring(0, 50) + '...';
  if (positMatch) data.posit32 = parseFloat(positMatch[1]);
  if (intervalMatch) {
    data.interval = {
      lower: parseFloat(intervalMatch[1]),
      upper: parseFloat(intervalMatch[2]),
    };
  }
  
  return data;
}

export function parseDifferentiableOutput(stdout: string): Record<string, any> {
  const data: Record<string, any> = {};
  
  // Extract f(x) value
  const fxMatch = stdout.match(/f\([\d.]+\)\s*=\s*([\d.]+)/);
  const gradMatch = stdout.match(/df\/dx\s*=\s*([\d.]+)/);
  const hessianMatch = stdout.match(/d²f\/dx²\s*=\s*([\d.]+)/);
  const opsMatch = stdout.match(/AD Operations:\s*(\d+)/);
  const minMatch = stdout.match(/Minimum at theta\s*=\s*([\d.]+)/);
  
  if (fxMatch) data.fx = parseFloat(fxMatch[1]);
  if (gradMatch) data.grad = parseFloat(gradMatch[1]);
  if (hessianMatch) data.hessian = parseFloat(hessianMatch[1]);
  if (opsMatch) data.operations = parseInt(opsMatch[1], 10);
  if (minMatch) data.minimum = parseFloat(minMatch[1]);
  
  return data;
}

export function parseProbabilisticOutput(stdout: string): Record<string, any> {
  const data: Record<string, any> = {};
  
  // Extract posterior statistics
  const meanMatch = stdout.match(/Posterior mean:\s*([\d.]+)/);
  const stdMatch = stdout.match(/Posterior std:\s*([\d.]+)/);
  const ciMatch = stdout.match(/95% CI:\s*\[([\d.]+),\s*([\d.]+)\]/);
  const essMatch = stdout.match(/Effective sample size:\s*([\d,]+)/);
  const convergenceMatch = stdout.match(/MCMC convergence:\s*([\d.]+)/);
  
  if (meanMatch) data.mean = parseFloat(meanMatch[1]);
  if (stdMatch) data.std = parseFloat(stdMatch[1]);
  if (ciMatch) {
    data.ci95 = {
      lower: parseFloat(ciMatch[1]),
      upper: parseFloat(ciMatch[2]),
    };
  }
  if (essMatch) data.effectiveSampleSize = parseInt(essMatch[1].replace(',', ''), 10);
  if (convergenceMatch) data.convergence = parseFloat(convergenceMatch[1]);
  
  return data;
}

export function parseSymbolicOutput(stdout: string): Record<string, any> {
  const data: Record<string, any> = {};
  
  // Extract symbolic results
  const exprMatch = stdout.match(/Expression:\s*(.+)/);
  const simplMatch = stdout.match(/Simplified:\s*(.+)/);
  const derivMatch = stdout.match(/Derivative:\s*(.+)/);
  const integMatch = stdout.match(/Integral:\s*(.+)/);
  
  if (exprMatch) data.expression = exprMatch[1].trim();
  if (simplMatch) data.simplified = simplMatch[1].trim();
  if (derivMatch) data.derivative = derivMatch[1].trim();
  if (integMatch) data.integral = integMatch[1].trim();
  
  return data;
}