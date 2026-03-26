/**
 * Code Execution API Route
 * POST endpoint for executing Fortran² code
 */

import { NextRequest, NextResponse } from 'next/server';
import { execute, ExecutionRequest, ExecutionResult } from '@/lib/executor';
import { config, executorConfig } from '@/lib/config';

// Rate limiting storage (in-memory for demo - use Redis in production)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

/**
 * Clean up old rate limit entries
 */
function cleanupRateLimits() {
  const now = Date.now();
  for (const [key, value] of rateLimitMap.entries()) {
    if (value.resetTime < now) {
      rateLimitMap.delete(key);
    }
  }
}

/**
 * Check rate limit for IP
 */
function checkRateLimit(ip: string): boolean {
  cleanupRateLimits();
  
  const now = Date.now();
  const windowMs = 60000; // 1 minute window
  const maxRequests = 10; // Max 10 requests per minute per IP
  
  const current = rateLimitMap.get(ip);
  
  if (!current || current.resetTime < now) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }
  
  if (current.count >= maxRequests) {
    return false;
  }
  
  current.count++;
  return true;
}

/**
 * Validate execution request
 */
function validateRequest(body: any): { valid: boolean; error?: string } {
  if (!body) {
    return { valid: false, error: 'Request body is required' };
  }
  
  if (typeof body.code !== 'string') {
    return { valid: false, error: 'Code is required and must be a string' };
  }
  
  if (body.code.length === 0) {
    return { valid: false, error: 'Code cannot be empty' };
  }
  
  if (body.code.length > 50000) {
    return { valid: false, error: 'Code exceeds maximum length (50KB)' };
  }
  
  const validLanguages = ['f2', 'fortran'];
  if (body.language && !validLanguages.includes(body.language)) {
    return { valid: false, error: `Language must be one of: ${validLanguages.join(', ')}` };
  }
  
  if (body.timeout !== undefined) {
    const timeout = parseInt(body.timeout, 10);
    if (isNaN(timeout) || timeout < 100 || timeout > executorConfig.maxExecutionTime) {
      return { 
        valid: false, 
        error: `Timeout must be between 100ms and ${executorConfig.maxExecutionTime}ms` 
      };
    }
  }
  
  return { valid: true };
}

/**
 * Sanitize code input - basic security checks
 */
function sanitizeCode(code: string): string {
  // Remove potentially dangerous patterns
  // Note: This is a basic check - in production, use a proper sandbox
  
  const dangerousPatterns = [
    /rm\s+-rf/i,
    /del\s+\/[fqs]/i,
    /format\s+:/i,
    /shutdown/i,
    /halt/i,
    /poweroff/i,
  ];
  
  // Allow the code through but log warning if dangerous patterns found
  for (const pattern of dangerousPatterns) {
    if (pattern.test(code)) {
      console.warn('[Execute API] Potentially dangerous pattern detected:', pattern);
    }
  }
  
  return code;
}

/**
 * POST handler for code execution
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() 
      || request.headers.get('x-real-ip') 
      || 'unknown';
    
    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { 
          error: 'Too many requests', 
          message: 'Rate limit exceeded. Please try again later.',
          retryAfter: 60,
        },
        { 
          status: 429,
          headers: {
            'Retry-After': '60',
          },
        }
      );
    }
    
    // Parse and validate request body
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON', message: 'Request body must be valid JSON' },
        { status: 400 }
      );
    }
    
    const validation = validateRequest(body);
    if (!validation.valid) {
      return NextResponse.json(
        { error: 'Validation Error', message: validation.error },
        { status: 400 }
      );
    }
    
    // Sanitize code input
    const sanitizedCode = sanitizeCode(body.code);
    
    // Build execution request
    const executionRequest: ExecutionRequest = {
      code: sanitizedCode,
      language: body.language || 'f2',
      stdin: body.stdin,
      timeout: body.timeout ? parseInt(body.timeout, 10) : executorConfig.executionTimeout,
    };
    
    // Execute code
    console.log(`[Execute API] Executing code (${executionRequest.code.length} chars) from ${ip}`);
    
    const startTime = Date.now();
    const result: ExecutionResult = await execute(executionRequest);
    const totalTime = Date.now() - startTime;
    
    console.log(`[Execute API] Execution completed in ${totalTime}ms (exit code: ${result.exitCode})`);
    
    // Return execution result
    return NextResponse.json({
      stdout: result.stdout,
      stderr: result.stderr,
      exitCode: result.exitCode,
      executionTime: result.executionTime,
      error: result.error,
      _meta: {
        executor: executorConfig.executorType,
        totalTime,
        timestamp: new Date().toISOString(),
      },
    });
    
  } catch (error) {
    console.error('[Execute API] Unexpected error:', error);
    
    return NextResponse.json(
      { 
        error: 'Execution Error', 
        message: error instanceof Error ? error.message : 'An unexpected error occurred',
      },
      { status: 500 }
    );
  }
}

/**
 * GET handler - return API info
 */
export async function GET(): Promise<NextResponse> {
  return NextResponse.json({
    name: 'Fortran² Code Execution API',
    version: '1.0.0',
    executor: executorConfig.executorType,
    limits: {
      maxCodeSize: '50KB',
      timeout: `${executorConfig.executionTimeout}ms`,
      maxTimeout: `${executorConfig.maxExecutionTime}ms`,
      rateLimit: '10 requests/minute',
    },
    supportedLanguages: ['f2', 'fortran'],
  });
}