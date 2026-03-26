import { NextRequest, NextResponse } from 'next/server';
import { emailService } from '@/lib/email-service';
import { config } from '@/lib/config';

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Mock subscription storage (in production, use a database)
const subscribers = new Set<string>();

// Rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 5; // Max requests per window
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
    const { email, action = 'subscribe' } = body;

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    if (!EMAIL_REGEX.test(normalizedEmail)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Handle unsubscribe
    if (action === 'unsubscribe') {
      if (!subscribers.has(normalizedEmail)) {
        return NextResponse.json(
          { error: 'Email not found in subscriptions' },
          { status: 404 }
        );
      }
      subscribers.delete(normalizedEmail);
      return NextResponse.json({
        success: true,
        message: 'Successfully unsubscribed from newsletter',
      });
    }

    // Handle subscribe
    if (subscribers.has(normalizedEmail)) {
      return NextResponse.json(
        { error: 'Email already subscribed' },
        { status: 409 }
      );
    }

    // Add to subscribers
    subscribers.add(normalizedEmail);

    // Send to email service
    const result = await emailService.subscribe(normalizedEmail);

    if (!result.success) {
      // Rollback the subscriber if email service failed
      subscribers.delete(normalizedEmail);
      
      // Check specific error types
      if (result.error === 'EMAIL_ALREADY_SUBSCRIBED') {
        return NextResponse.json(
          { error: 'Email already subscribed' },
          { status: 409 }
        );
      }
      
      return NextResponse.json(
        { error: result.message || 'Failed to subscribe' },
        { status: 500 }
      );
    }

    // Log in development mode
    if (config.isDevelopment) {
      console.log(`[Newsletter] New subscriber: ${normalizedEmail}`);
    }

    return NextResponse.json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    console.error('Newsletter API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle GET requests for checking subscription status
export async function GET(request: NextRequest) {
  // Rate limiting for GET as well
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 }
    );
  }

  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  if (!email) {
    return NextResponse.json(
      { error: 'Email parameter is required' },
      { status: 400 }
    );
  }

  const isSubscribed = subscribers.has(email.toLowerCase());

  return NextResponse.json({
    email: email.toLowerCase(),
    isSubscribed,
  });
}
