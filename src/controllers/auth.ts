import { RequestHandler } from "express"
import { db } from "../lib/db";
import { comparePassword, generateAcessToken, generateRefreshToken, getHashedPassword, getUserByEmail } from "../lib/auth";
import { APIError } from "../lib/api-error";
import { APIResponse } from "../lib/api-response";
import { RegisterUserPayload } from "../typings";
import { LoginUserPayload } from "../schema";

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

        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
        }

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