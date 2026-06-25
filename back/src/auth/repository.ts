import { searchUserQuery } from "@/auth/queries/searchUser.query";
import { logInUserQuery } from "@/auth/queries/logInUser.query";
import { getUserQuery } from "@/auth/queries/getUser.query";
import { prisma } from "@/config/prisma.config";

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

export const getUser = async (userId: number) => {
  return await prisma.user.findUnique({
    where: { userId },
    select: getUserQuery,
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
