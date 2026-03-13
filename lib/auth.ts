import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || "";
const ADMIN_PASSWORD_PLAIN = process.env.ADMIN_PASSWORD || "ardhisoko2025";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;

        const usernameMatch = credentials.username === ADMIN_USERNAME;
        if (!usernameMatch) return null;

        let passwordMatch = false;

        // Try bcrypt hash first
        if (ADMIN_PASSWORD_HASH && ADMIN_PASSWORD_HASH.startsWith("$2")) {
          try {
            passwordMatch = await bcrypt.compare(credentials.password, ADMIN_PASSWORD_HASH);
          } catch {
            passwordMatch = false;
          }
        }

        // Fall back to plain text
        if (!passwordMatch) {
          passwordMatch = credentials.password === ADMIN_PASSWORD_PLAIN;
        }

        if (passwordMatch) {
          return { id: "admin", name: "Admin", email: "admin@ardhisoko.co.ke" };
        }
        return null;
      },
    }),
  ],
  session: { strategy: "jwt", maxAge: 24 * 60 * 60 },
  pages: { signIn: "/login" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (session.user) (session.user as { id?: string }).id = token.id as string;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "ardhisoko-secret-key-change-in-production",
};
