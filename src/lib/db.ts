import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const db = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;

export const connectToDB = async () => {
    try {
        await db.$connect();
        console.log('☘️  Connected to MongoDB!');
    } catch (error) {
        console.log('MongoDB Connection Failed!');
    }
}