import NextAuth from "next-auth/next";

import CredentialsProvider from "next-auth/providers/credentials";

import db from "@/utils/db";

import User from "@/models/user.model";

import bcrypt from "bcryptjs";

import { AuthOptions, User as T } from "next-auth";

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user?._id) token._id = user._id;

      if (user?.username) token.username = user.username;

      if (user?.password) token.password = user.password;

      if (user?.isAdmin) token.isAdmin = user.isAdmin;

      return token;
    },
    async session({ session, token, user }) {
      if (token?._id) session.user._id = token._id;

      if (token?.username) session.user.username = token.username;

      if (token?.password) session.user.password = token.password;

      if (token?.isAdmin) session.user.isAdmin = token.isAdmin;

      return session;
    },
  },
  providers: [
    CredentialsProvider({
      name: "User",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials): Promise<T> {
        await db.connect();

        const user = await User.findOne({
          email: credentials!.email,
        });
        if (user && bcrypt.compareSync(credentials!.password, user.password)) {
          return {
            _id: user._id.toString(),
            username: user.username,
            email: user.email,
            password: user.password,
            isAdmin: user.isAdmin,
            image: "f",
          } as T;
        }

        throw new Error("Email Or Password Is Incorrect, Please Try Again.");
      },
    }),
  ],
  // pages: {
  //   signIn: "/auth/singin",
  //   signOut: "/auth/signout",
  //   error: "/auth/error",
  // },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
