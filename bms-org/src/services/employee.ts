import { Employee as IEmployee, Prisma, PrismaClient } from "@prisma/client";
import { prisma as client } from "../db";
import { PrismaClientOptions } from "@prisma/client/runtime";
export class Employee {
  private prisma;
  constructor(prisma: PrismaClient | Prisma.TransactionClient = client) {
    this.prisma = prisma;
  }

  getRandomPassword() {
    return `bms${new Date().getTime().toString().slice(8)}`;
  }

  create(employe: IEmployee) {
    return this.prisma.employee.create({
      data: employe,
    });
  }
  getAll({ search, companyId, limit, offset, status }: any) {
    return this.prisma.employee.findMany({
      where: {
        companyId,
        ...(["ACTIVE", "INACTIVE"].includes(status) && { status }),
        OR: [
          {
            name: {
              contains: search,
            },
          },
          {
            email: {
              contains: search,
            },
          },
          {
            mobile: {
              contains: search,
            },
          },
        ],
      },
      take: Number(limit),
      skip: Number(offset),
      select: {
        id: true,
        name: true,
        email: true,
        status: true,
        mobile: true,
      },
    });
  }
  getAllCount({ search, companyId, status }: any) {
    return this.prisma.employee.count({
      where: {
        companyId,
        ...(["ACTIVE", "INACTIVE"].includes(status) && { status }),
        OR: [
          {
            name: {
              contains: search,
            },
          },
          {
            email: {
              contains: search,
            },
          },
          {
            mobile: {
              contains: search,
            },
          },
        ],
      },
    });
  }
  getById(id: string) {
    return this.prisma.employee.findUnique({
      where: {
        id,
      },
    });
  }
  deleteById(id: string) {
    return this.prisma.employee.delete({
      where: {
        id,
      },
    });
  }
  updateById(id: string, data: any) {
    return this.prisma.employee.update({
      where: {
        id,
      },
      data,
    });
  }
}
