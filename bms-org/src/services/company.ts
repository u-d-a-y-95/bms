import { Company as ICompany, Prisma, PrismaClient } from "@prisma/client";
import { prisma as prismaClient } from "../db";
export class Company {
  private prisma;
  constructor(prisma: PrismaClient | Prisma.TransactionClient = prismaClient) {
    this.prisma = prisma;
  }
  create(company: ICompany) {
    return this.prisma.company.create({
      data: company,
    });
  }

  getById(id: string) {
    return this.prisma.company.findUnique({
      where: {
        id,
      },
    });
  }
  updateById(id: string, data: any) {
    return this.prisma.company.update({
      where: {
        id,
      },
      data,
    });
  }
}
