// NextAuth Version 4

// import NextAuth from "next-auth/next";

// import CredentialsProvider from "next-auth/providers/credentials";

// import db from "@/utils/db";

// import User from "@/models/user.model";

// import bcrypt from "bcryptjs";

// import { AuthOptions, User as T } from "next-auth";

// export const authOptions: AuthOptions = {
//   secret: process.env.AUTH_SECRET,
//   session: {
//     strategy: "jwt",
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user?._id) token._id = user._id;

//       if (user?.username) token.username = user.username;

//       if (user?.isAdmin) token.isAdmin = user.isAdmin;

//       return token;
//     },
//     async session({ session, token, user }) {
//       if (token?._id) session.user._id = token._id;

//       if (token?.username) session.user.username = token.username;

//       if (token?.isAdmin) session.user.isAdmin = token.isAdmin;

//       return session;
//     },
//   },
//   providers: [
//     CredentialsProvider({
//       name: "User",
//       credentials: {
//         email: {
//           label: "Email",
//           type: "email",
//         },
//         password: {
//           label: "Password",
//           type: "password",
//         },
//       },
//       async authorize(credentials): Promise<T> {
//         await db.connect();

//         const user = await User.findOne({
//           email: credentials!.email,
//         });
//         if (user && bcrypt.compareSync(credentials!.password, user.password)) {
//           return {
//             _id: user._id.toString(),
//             username: user.username,
//             email: user.email,
//             password: user.password,
//             isAdmin: user.isAdmin,
//             image: "f",
//           } as T;
//         }

//         throw new Error("Email Or Password Is Incorrect, Please Try Again.");
//       },
//     }),
//   ],

//   // Optional

//   // pages: {
//   //   signIn: "/auth/singin",
//   //   signOut: "/auth/signout",
//   //   error: "/auth/error",
//   //   newUser: "/auth/new-user",
//   //   verifyRequest: "/auth/verify-request",
//   // },
// };

// const handlers = NextAuth(authOptions);

// export { handlers as GET, handlers as POST };

// NextAuth Version 5 (Beta 25)

import { handlers } from "@/auth";

export const { GET, POST } = handlers;
