import { User, Prisma, PrismaClient } from "@prisma/client";
import { prisma as client } from "../db";

export const getAll = async () => {
  try {
    const users = await client.user.findMany();
    return users;
  } catch (error) {
    return error;
  }
};

export const getOne = async (mobile: string) => {
  return client.user.findUnique({
    where: {
      mobile,
    },
  });
};
export const update = async (where: any, data: any) => {
  return client.user.updateMany({
    where,
    data,
  });
};

export class Employee {
  private prisma;
  constructor(prisma: PrismaClient | Prisma.TransactionClient = client) {
    this.prisma = prisma;
  }

  createUser(data: User) {
    return this.prisma.user.create({
      data,
    });
  }

  deletedUsers(where: any) {
    return this.prisma.user.deleteMany({
      where,
    });
  }
}
