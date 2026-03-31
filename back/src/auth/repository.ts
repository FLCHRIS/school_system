import { userSelectAll, userSelectLogIn } from "@/auth/queries/userSelect";
import { USER_STATUS } from "@/constants";
import { prisma } from "@/config/prisma";

export const findUserForLogin = async (username: string) => {
  return await prisma.user.findUnique({
    where: {
      username,
      statusId: USER_STATUS.ACTIVE,
    },
    select: userSelectLogIn,
  });
};

export const findUserForGetMe = async (userId: number) => {
  return await prisma.user.findUnique({
    where: {
      userId,
      statusId: USER_STATUS.ACTIVE,
    },
    select: userSelectAll,
  });
};
