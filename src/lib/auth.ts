import { StringDecoder } from "string_decoder"
import { db } from "./db"
import bcrypt from "bcryptjs"
import { User } from "@prisma/client"
import jwt from "jsonwebtoken";

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

export const getMinimalUserById = async (id: string) => {
    try {
        return await db.user.findUnique({
            where: {
                id
            },
            select: {
                email: true,
                name: true,
                id: true
            }
        })

    } catch (error) {
        return
    }
}

export const generateAcessToken = (user: User) => {
    const { email, id, name } = user;

    return jwt.sign(
        { email, id, name },
        process.env.ACCESS_TOKEN_SECRET!,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    );
}

export const generateRefreshToken = (id: User['id']) => {
    return jwt.sign(
        { id },
        process.env.REFRESH_TOKEN_SECRET!,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    );
}

export const getHashedPassword = async (password: string) => await bcrypt.hash(password, 10);

export const comparePassword = async (password: string, hashedPassword: string) => await bcrypt.compare(password, hashedPassword)