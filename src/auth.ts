import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";
import { prisma } from "./lib/prisma";
import { hashKey } from "./lib/utils";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const email = String(credentials?.email || "")
          .toLowerCase()
          .trim();
        const password = String(credentials?.password || "");
        if (!email || !password) return null;
        const key = hashKey(`login:${email}`);
        const since = new Date(Date.now() - 15 * 60 * 1000);
        const failures = await prisma.rateLimit.count({ where: { key, createdAt: { gte: since } } });
        if (failures >= 8) return null;
        const user = await prisma.user.findUnique({ where: { email } });
        const valid = user ? await bcrypt.compare(password, user.passwordHash) : false;
        if (!user || !valid) {
          await prisma.rateLimit.create({ data: { key } });
          return null;
        }
        return { id: user.id, email: user.email, name: user.name, role: user.role };
      },
    }),
  ],
});
