import { PrismaClient } from "@prisma/client";
import { Request } from "express";

const prisma = new PrismaClient();

export const createUserService = async (payload: Request) => {
  try {
    const user = await prisma.user.create({
      data: payload,
    });

    return user;
  } catch (error) {
    console.error("Error in createClub service:", error);
    return error;
  }
};

export const getUserByEmail = async (email: string) => {
  const getUserData = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  return getUserData;
};

export const getUserById = async (id: number) => {
  const getUserData = await prisma.user.findFirst({
    where: {
      id: id,
    },
  });

  return getUserData;
};

export const getUsersService = async (
  id: number,
  search: string,
  offset: number
) => {
  const dataPerPage: number = 4;
  const limit: number = dataPerPage * offset - dataPerPage;

  const userData = await prisma.user.findMany({
    where: {
      id: {
        not: id,
      },
      role: {
        not: "SUPER_ADMIN",
      },
      ...(search?.trim() && {
      OR: [
        {
          email: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          username: {
            contains: search,
            mode: "insensitive",
          },
        },
      ],
      })
    },
    skip: limit,
    take: dataPerPage,
  });

  const userCount = await prisma.user.count();

  return { userData, userCount };
};

export const updateUserService = async (
  id: number,
  updatedPayload: Request
) => {
  const userData = await prisma.user.update({
    where: {
      id: Number(id),
    },
    data: updatedPayload,
  });

  return userData;
};

export const changeUserPassService = async (
  id: number,
  updatedPayload: Request
) => {
  const userData = await prisma.user.update({
    where: {
      id: Number(id),
    },
    data: updatedPayload,
  });

  return userData;
};

export const deleteUserService = async (id: number) => {
  const userData = await prisma.user.delete({
    where: {
      id: Number(id),
    },
  });

  return userData;
};
