import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth';

/**
 * NextAuth handler for all authentication routes.
 * This handles:
 * - GET /api/auth/signin - Sign in page
 * - POST /api/auth/signin - Sign in callback
 * - GET /api/auth/signout - Sign out
 * - POST /api/auth/signout - Sign out callback
 * - GET /api/auth/session - Get session
 * - GET /api/auth/csrf - CSRF token
 */
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };