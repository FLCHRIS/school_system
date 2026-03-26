import { JwtPayload } from "jsonwebtoken";

export type JWTPayload = {
  userId: number;
  username: string;
  roleId: number;
  statusId: number;
};

export type DecodedToken = JWTPayload & JwtPayload;
