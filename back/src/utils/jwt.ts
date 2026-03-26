import { JWTPayload, DecodedToken } from "@/types/auth.types";
import { env } from "@/config/env";
import jwt from "jsonwebtoken";

export const signAccessToken = (payload: JWTPayload) => {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });
};

export const verifyToken = (token: string): DecodedToken => {
  return jwt.verify(token, env.JWT_SECRET) as DecodedToken;
};
