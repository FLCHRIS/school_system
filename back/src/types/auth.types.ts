import { JwtPayload } from "jsonwebtoken";

export type JWTPayload = {
  userId: string;
  username: string;
  roleId: number;
  statusId: number;
};

export type DecodedToken = JWTPayload & JwtPayload;
