import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  trustHost: true,
  session: { strategy: "jwt" },
  pages: { signIn: "/admin/login" },
  providers: [],
  callbacks: {
    authorized({ auth, request }) {
      const { pathname } = request.nextUrl;
      if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
        return Boolean(auth?.user);
      }
      return true;
    },
    jwt({ token, user }) {
      if (user) {
        const record = user as { id?: string; role?: string };
        token.id = record.id;
        token.role = record.role;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = String(token.id || "");
      session.user.role = String(token.role || "");
      return session;
    },
  },
} satisfies NextAuthConfig;
