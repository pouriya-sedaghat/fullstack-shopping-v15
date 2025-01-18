import NextAuth, { NextAuthConfig } from "next-auth";

import Credentials from "next-auth/providers/credentials";

import db from "@/utils/db";

import User from "@/models/user.model";

import bcrypt from "bcryptjs";

const authOptions: NextAuthConfig = {
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user?._id) token._id = user._id;

      if (user?.username) token.username = user.username;

      if (user?.isAdmin) token.isAdmin = user.isAdmin;

      return token;
    },
    async session({ session, token }) {
      if (token?._id) session.user._id = token._id;

      if (token?.username) session.user.username = token.username;

      if (token?.isAdmin) session.user.isAdmin = token.isAdmin;

      return session;
    },
  },
  providers: [
    Credentials({
      name: "User",
      credentials: {
        email: {
          label: "Eamil",
          type: "eamil",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        await db.connect();

        const user = await User.findOne({ email: credentials.email });

        if (
          user &&
          bcrypt.compareSync(credentials.password as string, user.password)
        )
          return user;

        throw new Error("Email Or Password Is Incorrect, Please Try Again.");
      },
    }),
  ],
};

export const { handlers, auth } = NextAuth(authOptions);
