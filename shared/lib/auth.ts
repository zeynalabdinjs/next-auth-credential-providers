import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export const authenticateToken = async (req: NextRequest) => {
  const token = await getToken({ req, secret: process.env.JWT_SECRET });

  if (token) {
    return token;
  } else {
    throw new Error("Unauthorized");
  }
};
