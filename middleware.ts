import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import type { NextFetchEvent } from "next/server";

const authMiddleware = withAuth({
  pages: {
    signIn: "/auth/sign-in",
  },
});

export function middleware(request: NextRequestWithAuth, event: NextFetchEvent) {
  const response = authMiddleware(request, event);

  return response;
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*", "/profile", "/auth/sign-in"],
};
