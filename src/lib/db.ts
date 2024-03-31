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
        process.exit(1);
    }
};

export const getUserByEmail = async (email: string) => {
    try {
        return await db.user.findUnique({ where: { email } })
    } catch (error) {
        return null
    }
}
export const getUserByID = async (id: string) => {
    try {
        return await db.user.findUnique({ where: { id } })
    } catch (error) {
        return null
    }
}

export const getMinimalUserInfoById = async (id: string) => {
    try {
        return await db.user.findUnique({
            where: {
                id
            },
            select: {
                email: true,
                name: true,
                id: true,
                role: true
            }
        })

    } catch (error) {
        return
    }
}
