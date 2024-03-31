import { RequestHandler } from "express";
import { APIResponse } from "../lib/api-response";
import { db } from "../lib/db";
import { ChangePasswordPayload } from "../schema";
import { comparePassword, getHashedPassword } from "../lib/auth";
import { APIError } from "../lib/api-error";

//TODO : revisit this
const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
}

export const getCurrentUser: RequestHandler = async (req, res, next) => {
    try {
        return res.status(200).json(new APIResponse('Fetched current user', 200, { user: (req as any)?.user }));
    } catch (error) {
        next(error)
    }
}
export const changePassword: RequestHandler<any, any, ChangePasswordPayload> = async (req, res, next) => {
    try {
        const { newPassword, password } = req.body;

        const user = await db.user.findUnique({
            where: {
                id: (req as any).user?.id,
            }
        });
        if (!user) throw new APIError(401, 'User not found');

        const isPasswordCorrect = await comparePassword(password, user?.password);
        if (!isPasswordCorrect) throw new APIError(401, 'Password is incorrect');

        const hashedPassword = await getHashedPassword(newPassword);
        await db.user.update({
            where: {
                id: (req as any).user?.id
            },
            data: {
                password: hashedPassword
            }
        });
        return res.status(200).json(new APIResponse('Password changed successfully', 200));

    } catch (error) {
        next(error)
    }
}

export const logout: RequestHandler = async (req, res, next) => {
    try {
        await db.user.update({
            where: {
                id: (req as any).user.id
            },
            data: {
                refreshToken: null
            }
        });

        return res
            .status(200)
            .clearCookie('accessToken', cookieOptions)
            .clearCookie('refreshToken', cookieOptions)
            .json(new APIResponse('User logged out successfully', 200));
    }
    catch (error) {
        next(error)
    }
}
