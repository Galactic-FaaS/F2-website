/**
 * Code Executor Service
 * Supports multiple execution backends: Mock, WASM, and Remote API
 */

import { config, executorConfig } from './config';

/**
 * Execution request interface
 */
export interface ExecutionRequest {
  code: string;
  language: 'f2' | 'fortran';
  stdin?: string;
  timeout?: number;
}

/**
 * Execution result interface
 */
export interface ExecutionResult {
  stdout: string;
  stderr: string;
  exitCode: number;
  executionTime: number;
  error?: string;
}

/**
 * Executor type
 */
export type ExecutorType = 'mock' | 'wasm' | 'remote';

/**
 * Base executor interface
 */
export interface IExecutor {
  execute(request: ExecutionRequest): Promise<ExecutionResult>;
}

/**
 * Mock executor for development - simulates realistic results
 */
class MockExecutor implements IExecutor {
  async execute(request: ExecutionRequest): Promise<ExecutionResult> {
    const startTime = Date.now();
    
    // Simulate execution delay
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 700));
    
    const result = this.generateMockOutput(request.code, request.language);
    const executionTime = Date.now() - startTime;
    
    return {
      stdout: result.stdout,
      stderr: result.stderr,
      exitCode: result.exitCode,
      executionTime,
      error: result.error,
    };
  }

  private generateMockOutput(code: string, language: string): { stdout: string; stderr: string; exitCode: number; error?: string } {
    // Analyze code to generate relevant output
    const codeLower = code.toLowerCase();
    
    // Handle different demo types
    if (codeLower.includes('arithmetic') || codeLower.includes('bigint') || codeLower.includes('bigfloat') || codeLower.includes('posit')) {
      return {
        stdout: `Binary16: 3.140625
Binary32: 3.1415927
Binary64: 3.14159265358979
BigInt: 1881676371789151290892522652503214469065208479292333973965363746658794149765637207031250000000000000000000000000000000000000000000000000000
BigFloat (1000 bits): 3.14159265358979323846264338327950288419716939937510582097494459230781640628620899862803482534211706798214808651328230664709384460955058223172535940812848111745028410270193852110555964462294895493038196
Posit32: 3.140625
Interval: [1.0, 1.21]
Execution completed successfully.`,
        stderr: '',
        exitCode: 0,
      };
    }
    
    if (codeLower.includes('differentiable') || codeLower.includes('autodiff') || codeLower.includes('grad')) {
      return {
        stdout: `f(2.0) = 4.909297426825682
df/dx = 4.583663107385778
d²f/dx² = 1.9092974268256817
Minimum at theta = 1.8954070269089235
AD Operations: 23
Gradients computed successfully.`,
        stderr: '',
        exitCode: 0,
      };
    }
    
    if (codeLower.includes('probabilistic') || codeLower.includes('infer') || codeLower.includes('mcmc')) {
      return {
        stdout: `Posterior mean: 0.67
Posterior std: 0.12
95% CI: [0.44, 0.89]
Effective sample size: 1842 (92% efficiency)
MCMC convergence: 0.9999
Inference completed successfully.`,
        stderr: '',
        exitCode: 0,
      };
    }
    
    if (codeLower.includes('symbolic') || codeLower.includes('diff') || codeLower.includes('integrate')) {
      return {
        stdout: `Expression: x^2 + 2*x + 1
Simplified: (x + 1)^2
Derivative: 2*x + 2
Integral: x^3/3 + x^2 + x + C
Symbolic computation completed (partial implementation).`,
        stderr: 'Warning: Symbolic differentiation is a planned feature',
        exitCode: 0,
      };
    }
    
    // Default: simple Fortran program output
    if (language === 'fortran' || language === 'f2') {
      return {
        stdout: ` Fortran² v3.0.0
 Program executed successfully.
 
 Hello from Fortran²!
 
 Real-time: 1.23s
 Memory: 2.4MB`,
        stderr: '',
        exitCode: 0,
      };
    }
    
    return {
      stdout: 'Execution completed.',
      stderr: '',
      exitCode: 0,
    };
  }
}

/**
 * WASM executor for actual F2 code execution
 * Note: Requires actual F2 compiler compiled to WebAssembly
 */
class WasmExecutor implements IExecutor {
  private wasmModule: any = null;
  private initialized = false;

  async initialize(): Promise<void> {
    if (this.initialized) return;
    
    try {
      // Dynamic import of WASM module (placeholder for actual implementation)
      // In production, this would load the actual F2 WASM compiler
      console.log('[WASM Executor] Initializing F2 compiler WASM module...');
      this.initialized = true;
    } catch (error) {
      console.error('[WASM Executor] Failed to initialize:', error);
      throw new Error('WASM executor not available');
    }
  }

  async execute(request: ExecutionRequest): Promise<ExecutionResult> {
    const startTime = Date.now();
    
    if (!this.initialized) {
      await this.initialize();
    }
    
    try {
      // Placeholder for actual WASM execution
      // In production, this would:
      // 1. Compile the F2 code using the WASM compiler
      // 2. Execute the compiled code
      // 3. Return the results
      
      // For now, fall back to mock behavior
      const mockExecutor = new MockExecutor();
      return await mockExecutor.execute(request);
    } catch (error) {
      const executionTime = Date.now() - startTime;
      return {
        stdout: '',
        stderr: error instanceof Error ? error.message : 'WASM execution failed',
        exitCode: 1,
        executionTime,
        error: 'WASM execution failed',
      };
    }
  }
}

/**
 * Remote executor for server-side execution
 */
class RemoteExecutor implements IExecutor {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async execute(request: ExecutionRequest): Promise<ExecutionResult> {
    const startTime = Date.now();
    
    try {
      const controller = new AbortController();
      const timeout = request.timeout || executorConfig.executionTimeout;
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(`${this.baseUrl}/execute`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Remote execution failed: ${response.status}`);
      }

      const result = await response.json();
      const executionTime = Date.now() - startTime;

      return {
        stdout: result.stdout || '',
        stderr: result.stderr || '',
        exitCode: result.exitCode ?? 0,
        executionTime: result.executionTime ?? executionTime,
        error: result.error,
      };
    } catch (error) {
      const executionTime = Date.now() - startTime;
      
      if (error instanceof Error && error.name === 'AbortError') {
        return {
          stdout: '',
          stderr: 'Execution timed out',
          exitCode: 124,
          executionTime,
          error: 'Execution timed out',
        };
      }
      
      return {
        stdout: '',
        stderr: error instanceof Error ? error.message : 'Remote execution failed',
        exitCode: 1,
        executionTime,
        error: 'Remote execution failed',
      };
    }
  }
}

/**
 * Executor factory - creates the appropriate executor based on configuration
 */
class ExecutorFactory {
  private static instance: IExecutor | null = null;
  private static type: ExecutorType = 'mock';

  static getExecutor(): IExecutor {
    const configuredType = executorConfig.executorType;
    
    // Return cached executor if type hasn't changed
    if (ExecutorFactory.instance && ExecutorFactory.type === configuredType) {
      return ExecutorFactory.instance;
    }

    ExecutorFactory.type = configuredType;

    switch (configuredType) {
      case 'wasm':
        console.log('[ExecutorFactory] Creating WASM executor');
        ExecutorFactory.instance = new WasmExecutor();
        break;
      
      case 'remote':
        console.log('[ExecutorFactory] Creating Remote executor');
        ExecutorFactory.instance = new RemoteExecutor(executorConfig.remoteExecutorUrl);
        break;
      
      case 'mock':
      default:
        console.log('[ExecutorFactory] Creating Mock executor');
        ExecutorFactory.instance = new MockExecutor();
        break;
    }

    return ExecutorFactory.instance;
  }

  static getExecutorType(): ExecutorType {
    return executorConfig.executorType;
  }
}

/**
 * Main execute function - uses the configured executor
 */
export async function execute(request: ExecutionRequest): Promise<ExecutionResult> {
  const executor = ExecutorFactory.getExecutor();
  
  // Apply timeout if specified
  const timeout = request.timeout || executorConfig.executionTimeout;
  const timeoutMs = Math.min(timeout, executorConfig.maxExecutionTime);
  
  try {
    return await Promise.race([
      executor.execute({ ...request, timeout: timeoutMs }),
      new Promise<ExecutionResult>((_, reject) => 
        setTimeout(() => reject(new Error('Execution timeout')), timeoutMs)
      ),
    ]);
  } catch (error) {
    const executionTime = Date.now();
    return {
      stdout: '',
      stderr: error instanceof Error ? error.message : 'Execution failed',
      exitCode: 1,
      executionTime,
      error: error instanceof Error ? error.message : 'Execution failed',
    };
  }
}

/**
 * Execute code and return just the output (convenience function)
 */
export async function executeCode(code: string, language: 'f2' | 'fortran' = 'f2'): Promise<string> {
  const result = await execute({ code, language });
  return result.stdout || result.stderr || result.error || '';
}

/**
 * Get the current executor type
 */
export function getExecutorType(): ExecutorType {
  return ExecutorFactory.getExecutorType();
}

/**
 * Check if the executor is ready
 */
export function isExecutorReady(): boolean {
  const type = ExecutorFactory.getExecutorType();
  return type === 'mock' || type === 'wasm';
}