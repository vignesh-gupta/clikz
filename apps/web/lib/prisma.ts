import { PrismaClient } from "@prisma/client"
 
// eslint-disable-next-line no-undef
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }
 
export const prisma = globalForPrisma.prisma || new PrismaClient()
 
// eslint-disable-next-line turbo/no-undeclared-env-vars
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma