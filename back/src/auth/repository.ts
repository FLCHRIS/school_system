import { searchUserQuery } from "@/auth/queries/searchUser";
import { existsUserQuery } from "@/auth/queries/existsUser";
import { logInUserQuery } from "@/auth/queries/logInUser";
import { prisma } from "@/config/prisma";

export const findUserForLogin = async (username: string) => {
  return await prisma.user.findUnique({
    where: { username },
    select: logInUserQuery,
  });
};

export const findUserForGetMe = async (userId: number) => {
  return await prisma.user.findUnique({
    where: { userId },
    select: searchUserQuery,
  });
};

export const existsUser = async (userId: number) => {
  return await prisma.user.findUnique({
    where: { userId },
    select: existsUserQuery,
  });
};

export const getUserProfilePhoto = async (userId: number) => {
  return await prisma.user.findUnique({
    where: { userId },
    select: {
      userId: true,
      profilePhoto: {
        select: {
          publicId: true,
        },
      },
    },
  });
};

export const uploadUserProfilePhoto = async (
  userId: number,
  publicId: string,
  url: string
) => {
  return await prisma.user.update({
    where: { userId },
    data: {
      profilePhoto: {
        upsert: {
          create: { publicId, url },
          update: { publicId, url },
        },
      },
    },
  });
};
