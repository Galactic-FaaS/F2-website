import { NextRequest, NextResponse } from 'next/server';

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Mock contact form submissions (in production, use a database)
const contactSubmissions: Array<{
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: Date;
  ip?: string;
}> = [];

// Simple rate limiting (in production, use Redis or similar)
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

function validateContactForm(data: {
  name?: unknown;
  email?: unknown;
  message?: unknown;
}): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Validate name
  if (!data.name || typeof data.name !== 'string') {
    errors.push('Name is required');
  } else if (data.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters');
  } else if (data.name.trim().length > 100) {
    errors.push('Name must be less than 100 characters');
  }

  // Validate email
  if (!data.email || typeof data.email !== 'string') {
    errors.push('Email is required');
  } else if (!EMAIL_REGEX.test(data.email.trim())) {
    errors.push('Invalid email format');
  }

  // Validate message
  if (!data.message || typeof data.message !== 'string') {
    errors.push('Message is required');
  } else if (data.message.trim().length < 10) {
    errors.push('Message must be at least 10 characters');
  } else if (data.message.trim().length > 5000) {
    errors.push('Message must be less than 5000 characters');
  }

  return { valid: errors.length === 0, errors };
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
    const { name, email, message } = body;

    // Validate input
    const validation = validateContactForm({ name, email, message });
    if (!validation.valid) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.errors },
        { status: 400 }
      );
    }

    // Create submission
    const submission = {
      id: `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
      timestamp: new Date(),
      ip,
    };

    // Store submission (mock - in production, save to database)
    contactSubmissions.push(submission);

    // In production, you would:
    // 1. Send notification email to team
    // 2. Store in CRM or helpdesk system
    // 3. Trigger auto-response email to user

    console.log('Contact form submission:', submission);

    return NextResponse.json({
      success: true,
      message: 'Thank you for your message! We will get back to you soon.',
      id: submission.id,
    });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle GET requests - return API info
export async function GET() {
  return NextResponse.json({
    message: 'Contact API endpoint',
    methods: {
      POST: 'Submit contact form',
    },
    fields: {
      name: 'Your name (required, 2-100 characters)',
      email: 'Your email address (required)',
      message: 'Your message (required, 10-5000 characters)',
    },
  });
}
