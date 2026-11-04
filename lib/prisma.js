import { PrismaClient } from '@prisma/client';

const globalForPrisma = global;

/**
 * Robust Prisma Client Singleton for Supabase PostgreSQL
 * Ensures a single shared instance across Next.js API routes in development and production.
 */
let prismaInstance = null;

if (process.env.DATABASE_URL) {
  try {
    prismaInstance = globalForPrisma.prisma || new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
    });

    if (process.env.NODE_ENV !== 'production') {
      globalForPrisma.prisma = prismaInstance;
    }
  } catch (err) {
    console.warn('Prisma initialization warning:', err.message);
    prismaInstance = null;
  }
}

export const prisma = prismaInstance;
export default prisma;

