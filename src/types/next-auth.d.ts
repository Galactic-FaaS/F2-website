import 'next-auth';

declare module 'next-auth' {
  /**
   * The user object from GitHub OAuth
   */
  interface User {
    id: string;
    username: string;
    avatar: string;
    name: string;
    email: string;
  }

  /**
   * Extended session interface for client-side usage
   */
  interface Session {
    user: {
      id: string;
      username: string;
      avatar: string;
      name: string;
      email: string;
    };
    accessToken?: string;
  }
}

declare module 'next-auth/jwt' {
  /**
   * Extended JWT interface for token management
   */
  interface JWT {
    id: string;
    username: string;
    avatar: string;
    name: string;
    email: string;
  }
}