import { RequestHandler } from "express"
import { db } from "../lib/db";
import { comparePassword, generateAcessToken, generateRefreshToken, getHashedPassword, getUserByEmail } from "../lib/auth";
import { APIError } from "../lib/api-error";
import { APIResponse } from "../lib/api-response";
import { RegisterUserPayload } from "../typings";
import { LoginUserPayload } from "../schema";
import jwt from "jsonwebtoken"

//TODO : revisit this
const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
}


export const registerUserController: RequestHandler<any, any, RegisterUserPayload> = async (req, res, next) => {
    try {
        const { email, name, password } = req.body;

        const existingUser = await getUserByEmail(email);
        if (existingUser) throw new APIError(409, 'User already exists');

        const hashedPassword = await getHashedPassword(password);
        await db.user.create({
            data: {
                email,
                name,
                password: hashedPassword
            }
        });

        return res.status(201).json(new APIResponse('User created successfully', 201));

    } catch (error) {
        next(error)
    }
}

export const loginUserController: RequestHandler<any, any, LoginUserPayload> = async (req, res, next) => {

    try {
        const { email, password } = req.body;

        const user = await getUserByEmail(email);
        if (!user) throw new APIError(401, 'User not found');

        const isPasswordCorrect = await comparePassword(password, user.password);
        if (!isPasswordCorrect) throw new APIError(401, 'The password you have entered for the specified email is incorrect');

        const accessToken = generateAcessToken(user);
        const refreshToken = generateRefreshToken(user.id);

        const loggedInUser = await db.user.update({
            where: {
                id: user.id
            },
            data: {
                refreshToken
            },
            select: {
                email: true,
                name: true,
                id: true
            }
        });

        return res
            .status(200)
            .cookie('accessToken', accessToken, cookieOptions)
            .cookie('refreshToken', refreshToken, cookieOptions)
            .json(new APIResponse('User logged in successfully', 200, {
                user: loggedInUser,
                accessToken,
                refreshToken
            }));

    } catch (error) {
        next(error)
    }
} 

export const refreshAccessTokenController: RequestHandler = async (req, res, next) => {
    try {
        const incomingRefreshToken = req.cookies?.refreshToken || req.body?.refreshToken;
        if (!incomingRefreshToken) throw new APIError(401, 'Unauthorized request.');

        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET!);
        const user = await db.user.findUnique({
            where: {
                id: (decodedToken as any).id
            }
        });

        if (!user) throw new APIError(401, 'Invalid refresh token');
        if (user.refreshToken !== incomingRefreshToken) throw new APIError(401, "Refresh token is expired or used");

        const accessToken = generateAcessToken(user);
        const refreshToken = generateRefreshToken(user.id);

        await db.user.update({
            where: {
                id: user.id
            },
            data: {
                refreshToken
            }
        })

        return res
            .status(200)
            .cookie('accessToken', accessToken, cookieOptions)
            .cookie('refreshToken', refreshToken, cookieOptions)
            .json(new APIResponse('Access token refreshed successfully', 200, {
                accessToken,
                refreshToken
            }));
    } catch (error: any) {
        next(error)
    }
}

export const logoutHandler: RequestHandler = async (req, res, next) => {
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