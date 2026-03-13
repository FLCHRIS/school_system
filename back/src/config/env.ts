import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: Number(process.env.PORT) || 3000,
  JWT_SECRET: process.env.JWT_SECRET ?? "secret",
  NODE_ENV: process.env.NODE_ENV ?? "development",
  JWT_EXPIRES_IN: Number(process.env.JWT_EXPIRES_IN) || 21600,
  CLIENT_URL: process.env.CLIENT_URL ?? "http://localhost:8080",
};
