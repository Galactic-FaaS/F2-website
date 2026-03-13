import { NextRequest, NextResponse } from 'next/server';
import { search } from '@/lib/search-index';

// Rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 30; // Max requests per window (higher for search)
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT) {
    return false;
  }

  record.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { query, limit = 10 } = body;

    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      );
    }

    // Sanitize query - remove potentially dangerous characters
    const sanitizedQuery = query.replace(/[<>\"\'`;]/g, '').trim();

    const results = search(sanitizedQuery, limit);

    return NextResponse.json({
      results: results.map((item) => ({
        title: item.title,
        url: item.url,
        content: item.content,
        type: item.type,
        relevance: item.relevance,
      })),
      total: results.length,
      query: sanitizedQuery,
    });
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle GET requests for debugging
export async function GET(request: NextRequest) {
  // Rate limiting for GET as well
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 }
    );
  }

  return NextResponse.json({
    message: 'Use POST method for search',
    example: {
      query: 'differentiable programming',
      limit: 10,
    },
  });
}
