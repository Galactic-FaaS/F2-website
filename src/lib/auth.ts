import { NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import { callbacks } from './auth-callbacks';

/**
 * NextAuth configuration for the Fortran² website.
 * Uses GitHub OAuth for authentication.
 */
export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
      authorization: {
        params: {
          scope: 'read:user user:email',
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      // Persist user data from GitHub OAuth to the token
      if (account && profile) {
        const githubProfile = profile as {
          login?: string;
          avatar_url?: string;
          name?: string;
          email?: string;
        };
        
        token.id = account.providerAccountId;
        token.username = githubProfile.login || '';
        token.avatar = githubProfile.avatar_url || '';
        token.name = githubProfile.name || '';
        token.email = githubProfile.email || '';
      }
      return token;
    },
    async session({ session, token }) {
      // Add user data to session
      if (session.user) {
        session.user.id = token.id;
        session.user.username = token.username;
        session.user.avatar = token.avatar;
        session.user.name = token.name;
        session.user.email = token.email;
      }
      return session;
    },
  },
  pages: {
    signIn: '/',
    error: '/',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
};