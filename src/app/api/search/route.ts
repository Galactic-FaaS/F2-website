import { NextRequest, NextResponse } from 'next/server';
import { search } from '@/lib/search-index';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query, limit = 10 } = body;

    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      );
    }

    const results = search(query.trim(), limit);

    return NextResponse.json({
      results: results.map((item) => ({
        title: item.title,
        url: item.url,
        content: item.content,
        type: item.type,
        relevance: item.relevance,
      })),
      total: results.length,
      query: query.trim(),
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
export async function GET() {
  return NextResponse.json({
    message: 'Use POST method for search',
    example: {
      query: 'differentiable programming',
      limit: 10,
    },
  });
}
