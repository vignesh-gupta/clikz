import { Pool } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";

import { env } from "./env";

const connectionString = `${env.DATABASE_URL}`;

const pool = new Pool({ connectionString });
const adapter = new PrismaNeon(pool);

// eslint-disable-next-line no-undef
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const db = globalForPrisma.prisma || new PrismaClient({ adapter });

// eslint-disable-next-line turbo/no-undeclared-env-vars
if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;
