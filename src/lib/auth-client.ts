import { signIn, signOut, useSession } from 'next-auth/react';
import { Session } from 'next-auth';

/**
 * Client-side authentication utilities for the Fortran² website.
 * These functions provide easy access to authentication state and actions.
 */

/**
 * Custom hook to get the current session with typed user data.
 * Returns the session with extended user properties.
 */
export function useAuth() {
  const { data: session, status } = useSession();
  
  return {
    session: session as Session | null,
    isAuthenticated: !!session,
    isLoading: status === 'loading',
  };
}

/**
 * Sign in with GitHub OAuth.
 * @param callbackUrl - Optional URL to redirect to after sign in
 */
export async function signInWithGitHub(callbackUrl?: string) {
  await signIn('github', { callbackUrl: callbackUrl || '/' });
}

/**
 * Sign out the current user.
 * @param callbackUrl - Optional URL to redirect to after sign out
 */
export async function signOutUser(callbackUrl?: string) {
  await signOut({ callbackUrl: callbackUrl || '/' });
}

/**
 * Check if the current user is authenticated.
 * Use this for client-side route protection.
 */
export function useIsAuthenticated(): boolean {
  const { data: session } = useSession();
  return !!session;
}

/**
 * Get the current user from the session.
 * Returns null if not authenticated.
 */
export function useCurrentUser() {
  const { data: session } = useSession();
  return session?.user || null;
}

/**
 * Check if the current user has a specific role or permission.
 * This can be extended for role-based access control.
 */
export function useHasPermission(permission: string): boolean {
  const { data: session } = useSession();
  
  if (!session?.user) return false;
  
  // For now, all authenticated users have basic access
  // This can be extended with role-based checks
  const permissions: Record<string, string[]> = {
    admin: ['read', 'write', 'delete', 'manage'],
    user: ['read', 'write'],
    guest: ['read'],
  };
  
  const userRole = (session.user as any).role || 'guest';
  return permissions[userRole]?.includes(permission) || false;
}