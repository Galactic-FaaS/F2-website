'use client';

import { SessionProvider, SessionProviderProps } from 'next-auth/react';
import React, { ReactNode } from 'react';

/**
 * Auth Provider Component
 * Wraps the application with NextAuth SessionProvider for client-side authentication.
 * This provides session context to all child components.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}

/**
 * Props for the AuthProvider component
 * Extends SessionProviderProps for additional configuration options
 */
export type AuthProviderProps = SessionProviderProps;