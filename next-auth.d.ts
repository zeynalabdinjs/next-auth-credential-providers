// types/next-auth.d.ts

import NextAuth from "next-auth";

declare module "next-auth" {
  // User interface that includes additional fields
  export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    bio: string | null;
    password: string;
    dataState: string;
    createdAt: string;
    updateAt: string | null;
    role: string;
    accessToken: string;
  }

  export interface Session {
    accessToken: string;
    user: User;
    iat: number;
    exp: number;
    jti: string;
  }

  export interface JWT {
    accessToken: string;
    user: User;
    iat: number;
    exp: number;
    jti: string;
  }
}
