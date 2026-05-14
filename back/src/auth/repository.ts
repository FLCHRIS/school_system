import { userSelectAll, userSelectLogIn } from "@/auth/queries/userSelect";
import { prisma } from "@/config/prisma";

export const findUserForLogin = async (username: string) => {
  return await prisma.user.findUnique({
    where: { username },
    select: userSelectLogIn,
  });
};

export const findUserForGetMe = async (userId: number) => {
  return await prisma.user.findUnique({
    where: { userId },
    select: userSelectAll,
  });
};
