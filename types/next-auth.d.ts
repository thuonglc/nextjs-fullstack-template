import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      /** The user's postal address. */
      address: string;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    jwt: string;
  }
}

/**
 * The shape of the user object returned in the OAuth providers' `profile` callback,
 * or the second parameter of the `session` callback, when using a database.
 */
interface User {}
/**
 * Usually contains information about the provider being used
 * and also extends `TokenSet`, which is different tokens returned by OAuth Providers.
 */
interface Account {}
/** The OAuth profile returned from your provider */
interface Profile {}
