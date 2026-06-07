import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Admin Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter both email and password");
        }

        // 1. Check static admin credentials from environment variables
        const staticEmail = process.env.ADMIN_EMAIL;
        const staticPassword = process.env.ADMIN_PASSWORD;

        if (
          staticEmail &&
          staticPassword &&
          credentials.email === staticEmail &&
          credentials.password === staticPassword
        ) {
          return {
            id: "static-admin",
            email: staticEmail,
            name: "Super Admin",
          };
        }

        // 2. Fallback: Check MongoDB database via Prisma
        try {
          const admin = await prisma.admin.findUnique({
            where: { email: credentials.email }
          });

          if (admin) {
            const isPasswordValid = await bcrypt.compare(credentials.password, admin.password);
            if (isPasswordValid) {
              return {
                id: admin.id,
                email: admin.email,
                name: "Admin",
              };
            }
          }
        } catch (dbError) {
          console.error("Database lookup failed during admin auth:", dbError);
        }

        throw new Error("Invalid email or password");
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id as string;
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback-dev-secret-change-in-production",
};

export const authOption = authOptions;