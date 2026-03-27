import { Prisma } from "@prisma/client";

export const isForeignKeyError = (error: unknown): boolean => {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2003"
  );
};
