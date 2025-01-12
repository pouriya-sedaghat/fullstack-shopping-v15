import { Session } from "next-auth";

import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      _id: string;
      username: string;
      email: string;
      password: string;
      isAdmin: boolean;
    };
  }

  interface User {
    _id: string;
    username: string;
    email: string;
    password: string;
    isAdmin: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id: string;
    username: string;
    password: string;
    isAdmin: boolean;
  }
}
