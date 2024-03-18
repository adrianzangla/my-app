import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isSignedIn = !!auth?.user;
      const isOnLogin = nextUrl.pathname.startsWith("/login");
      const isOnRegister = nextUrl.pathname.startsWith("/register");
      if (isOnLogin || isOnRegister)
        if (isSignedIn) {
          return Response.redirect(new URL("/", nextUrl));
        }
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
