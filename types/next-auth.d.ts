import { Session } from "next-auth";

import { JWT } from "next-auth/jwt";

import mongoose from "mongoose";

declare module "next-auth" {
  interface Session {
    user: {
      _id: mongoose.Schema.Types.ObjectId;
      username: string;
      email: string;
      isAdmin: boolean;
    };
  }

  interface User {
    _id: mongoose.Schema.Types.ObjectId;
    username: string;
    email: string;
    password: string;
    isAdmin: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id: mongoose.Schema.Types.ObjectId;
    username: string;
    email: string;
    isAdmin: boolean;
  }
}
